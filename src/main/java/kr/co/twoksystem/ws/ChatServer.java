package kr.co.twoksystem.ws;


import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

//import kr.co.twoksystem.mapper.IGlobeeMapper;






import kr.co.twoksystem.mapper.IGlobeeMapper;
import kr.co.twoksystem.service.IGlobeeService;

import org.apache.commons.lang3.StringUtils;
//import org.springframework.beans.factory.annotation.Autowired;

import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@SuppressWarnings("unused")
@ServerEndpoint(value = "/ws/{usr_id}/{usr_nm}")
public class ChatServer {
//	@Autowired
//	private static IGlobeeMapper globeeMapper;

	private static final Set<ChatServer> connections = new CopyOnWriteArraySet<ChatServer>();
	private Session session;
	private String ws_usr_id;
	private String ws_usr_nm;

	private WsMapper wsMapper;
	
	public ChatServer() {
		wsMapper = new WsMapper();
		
		//Use this if you want to use Java API configuration
		//sqlSessionFactory = MyBatisUtil.getSqlSessionFactoryUsingJavaAPI();
	}

	/**
	 * 열 연결
	 * 
	 * @param session
	 * @param nickName
	 * @throws IOException
	 * @throws JsonMappingException
	 * @throws JsonParseException
	 */
	@OnOpen
	public void onOpen(Session session,
	@PathParam(value = "usr_id") String usr_id,
	@PathParam(value = "usr_nm") String usr_nm) throws Exception {
		this.session = session;
		this.ws_usr_id = usr_id;
		this.ws_usr_nm = usr_nm;
		connections.add(this);
		// String message = String.format("System> %s %s", this.ws_usr_id,
		// " has joined.");
		// ChatServer.broadCast(message);
	}

	/**
	 * 연결 끊기
	 */
	@OnClose
	public void onClose() {
		connections.remove(this);
		// String message = String.format("System> %s, %s", this.ws_usr_id,
		// " has disconnection.");
		// ChatServer.broadCast(message);
	}

	/**
	 * 수신 메시지
	 * @param message
	 * @param nickName
	 * @throws IOException
	 * @throws JsonMappingException
	 * @throws JsonParseException
	 */
	@SuppressWarnings("unchecked")
	@OnMessage
	public void onMessage(String message,
	@PathParam(value = "usr_id") String usr_id,
	@PathParam(value = "usr_nm") String usr_nm) throws Exception {
		if (StringUtils.isEmpty(message)) {
			return;
		}
		ChatServer.broadCast(message);
		// ChatServer.broadCast(ws_usr_id + ">" + message);
		
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, Object> pMap = new HashMap<String, Object>();
		try {
			pMap = objectMapper.readValue(message, Map.class);
			pMap.put("send_usr_id", usr_id);
			pMap.put("note_cntn", pMap.get("msg"));
			wsMapper.insert("om030.insert", pMap);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 오류 메시지 응답
	 * @param throwable
	 */
	@OnError
	public void onError(Throwable throwable) {
		System.out.println(throwable.getMessage());
	}

	/**
	 * 방송 정보 보내기 또는
	 * @param message 
	 * @throws IOException
	 * @throws JsonMappingException
	 * @throws JsonParseException
	 */
	@SuppressWarnings("unchecked")
	private static void broadCast(String message) {
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, Object> pMap = new HashMap<String, Object>();
		try {
			map = objectMapper.readValue(message, Map.class);
			pMap.put("type", map.get("type"));
			pMap.put("sender_id", map.get("sender_id"));
			pMap.put("sender_nm", map.get("sender_nm"));
			pMap.put("msg", map.get("msg"));
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		String sender_id = (String) map.get("sender_id");
		String lsReceiver = (String) map.get("receivers");

		if (StringUtils.equals(lsReceiver, "*")) {
			for (ChatServer chatServer : connections) {
				if (chatServer.ws_usr_id.equals(sender_id)) {
					continue;
				}
				try {
					synchronized (chatServer) {
						pMap.put("receiver", chatServer.ws_usr_id);
						chatServer.session.getBasicRemote().sendText(objectMapper.writeValueAsString(pMap));
					}
				} catch (IOException e) {
					connections.remove(chatServer);
					try {
						chatServer.session.close();
					} catch (IOException e1) {
					}
				}
			}
		} else {
			String[] laReceiver = StringUtils.split(lsReceiver, ',');
			if (laReceiver.length < 1) {
				laReceiver[0] = lsReceiver;
			}
			for(String receiver : laReceiver) {
				receiver = StringUtils.trim(receiver);
				for(Iterator<ChatServer> it = connections.iterator(); it.hasNext();) {
					ChatServer chatServer = it.next();
					if (chatServer.ws_usr_id.equals(sender_id)) {
						continue;
					}
					if (chatServer.ws_usr_id.equals(receiver)) {
						pMap.put("receiver", receiver);
						synchronized (chatServer) {
							try {
								chatServer.session.getBasicRemote().sendText(objectMapper.writeValueAsString(pMap));
							} catch (JsonProcessingException e) {
								e.printStackTrace();
							} catch (IOException e) {
								connections.remove(chatServer);
								try {
									chatServer.session.close();
								} catch (IOException e1) {
								}
							}
						}
						break;
					}
				}
//				try {
//					globeeMapper.insert("oh020.insert", pMap);
//				} catch (Exception e) {
//					e.printStackTrace();
//				}
			}
		}
	}
	
	
}
