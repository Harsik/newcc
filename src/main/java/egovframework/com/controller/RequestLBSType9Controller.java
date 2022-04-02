package egovframework.com.controller;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.twoksystem.config.Config; 
import kr.co.twoksystem.controller.GlobeeController;
import kr.co.twoksystem.mapper.IGlobeeMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.servlet.ModelAndView;
 
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketAddress;
import java.net.SocketTimeoutException;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;

 
   
//import java.io.OutputStream;

@Controller 
@RequestMapping(value="/requestLBS")
public class RequestLBSType9Controller extends GlobeeController
{

	private final String stx = "#";
	private final String etx = "$";
	
	private final String serverIp = Config.LBS_SERVERIP;              // "10.10.1.17"  //서버 IP
	private final int serverPort  = Config.LBS_SERVERPORT;            // 9702  //서버 포트
	
	private final int CONNECT_TIMEOUT = Config.LBS_CONNECT_TIMEOUT;   // 2000  // 접속시도 타임아웃 m초
	private final int READ_TIMEOUT = Config.LBS_READ_TIMEOUT;         // 46000 // 접속된후 응답 전문 대기 m초 

	private static final String req_companyNo = Config.LBS_REQ_COMPANYID; //"50"; //부여받은 회사번호 두자리 - 기관코드 50
	
	public static final Charset lbs_charset = Charset.forName("EUC-KR");
	
    @Autowired
	private IGlobeeMapper globeeMapper; 
  
	@RequestMapping(value = "/**/*.do")
	public void serviceCommon(HttpServletRequest req, HttpServletResponse res) throws Exception
	{
			gbLogger.debug("execute RequestLBSType9Controller RequestMethodMethod Get & Post!!");
	
			ObjectMapper objectMapper = new ObjectMapper();
			Map<String, Object> tMap = getRequestParams(req);
			Map<String, Object> qMap = (Map<String, Object>)tMap.get("qMap");
	
			String pHpNo = (String)qMap.get("CELL_PHONENUM");     //테스트 전화번호(테스트시 반드시 위치추적 동의된 사람만 테스트 할 것).
			String pCompanyNo = (String)qMap.get("COMPANY_CODE"); //부여받은 회사번호 두자리 - 기관코드 50
	 
			String companyNo = pCompanyNo.equals("")?req_companyNo:pCompanyNo;
			
			if(pHpNo.equals("")){
				qMap.put("result", "1" );
				qMap.put("messege", "휴대폰 번호 미입력!" );
			}
			else
			{
				String strResponse = null;
				RequestLBSType9Controller reqeust = new RequestLBSType9Controller();
				
				gbLogger.debug("CONTIMEOUT:"+CONNECT_TIMEOUT+",READTIMEOUT:"+READ_TIMEOUT+", remoteIp "+serverIp+":"+serverPort+", HpNo: " +pHpNo + ", companyNo: "+companyNo);
				
				// 서비스 요청 구간
		        try {
		            long startRunTime = System.currentTimeMillis();
		            
					strResponse = reqeust.requestPrivate(pHpNo, companyNo);
	
		            long endRunTime = System.currentTimeMillis();
		    		double diffRunTime = (endRunTime - startRunTime) * 0.001;
		    		gbLogger.debug("응답 소요 시간 : " + diffRunTime + "초 ======================");
		        } catch (Exception e) {
		        	gbLogger.debug("RequestLBSType9Controller", e);
		            if(e instanceof SocketTimeoutException) {
		            	gbLogger.debug("socket 타임아웃 오류!");
		            	qMap.put("result", "1" );
						qMap.put("messege", "socket 타임아웃" );
		            } 
		        }
		        
		        //gbLogger.debug("strResponse:" + strResponse);
		        if(strResponse != null) {
					Map<String, String> resultParam = reqeust.response_decoding_LBS(strResponse);
					gbLogger.debug("resultParam:" + resultParam.toString());
					
					qMap.put("result", "0" );
					qMap.put("messege", resultParam );
		        }
			}
			
			res.setContentType("text/html");
			res.setCharacterEncoding("utf-8");
			
			try(PrintWriter pw = res.getWriter())
			{
				pw.print(objectMapper.writeValueAsString(qMap));
				pw.flush();
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
	}
	 
	    
	public String requestPrivate(String hpNo, String companyNo) throws Exception {
		
		Socket socket = null;
		BufferedReader in = null;
		BufferedWriter out = null;
		
		String recieveMsg = null;
		
		try {
			socket = new Socket();
			SocketAddress addr = new InetSocketAddress(serverIp, serverPort);
			socket.connect(addr, CONNECT_TIMEOUT);
			socket.setSoTimeout(READ_TIMEOUT);
			socket.setTcpNoDelay(true);
			
			in = new BufferedReader(new InputStreamReader(socket.getInputStream(), "EUC-KR"));
			out = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream(), "EUC-KR"));
			
			if(hpNo.length() == 10) hpNo = hpNo + "  ";
			else if(hpNo.length() == 11) hpNo = hpNo + " ";
			
			String sendMessage = new StringBuffer().append(stx).append(hpNo).append(companyNo).append(etx).toString(); 
			out.write(sendMessage);
			out.flush();
			gbLogger.debug("SEND:" + sendMessage);  
			recieveMsg = in.readLine();
			gbLogger.debug("RECEIVED:" + recieveMsg);
			
		} catch(Exception e) {
			throw e;
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (IOException e) {}
			}
			if (out != null) {
				try {
					out.close();
				} catch (IOException e) {}
			}
			if (socket != null) {
				try {
					socket.close();
				} catch (IOException e) {}
			}
		}
		
		return recieveMsg;
		
	}
	
	
	
	
	public Map<String, String> response_decoding_LBS(String resMsg) {
		
		Map<String, String> resultParam = new HashMap<String, String>();
		
		int resultSize = resMsg.length();
		
		String resPosX = "", resPosY = ""; 
		String resStx = resMsg.substring(0, 1).trim();
		String resSendDatetime = resMsg.substring(1, 15).trim();
		String resHpNo = resMsg.substring(15, 27).trim();
		String resPosAddress = resMsg.substring(27, resultSize-41).trim();
		String resPosPostalCd = resMsg.substring(resultSize-41, resultSize-34).trim();
		resPosX = resMsg.substring(resultSize-34, resultSize-24).trim();
		//if(!"".equals(resPosX)) {
		//	resPosX = resPosX.substring(0,3) + "." + resPosX.substring(3,resPosX.length());
		//}
		resPosY = resMsg.substring(resultSize-24, resultSize-14).trim();
		//if(!"".equals(resPosY)) {
		//	resPosY = resPosY.substring(0,2) + "." + resPosY.substring(2,resPosY.length());
		//}
		String msType = resMsg.substring(resultSize-14, resultSize-11).trim();
		String telCom = resMsg.substring(resultSize-11, resultSize-7).trim();
		String resCode = resMsg.substring(resultSize-7, resultSize-1).trim();
		String resEtx = resMsg.substring(resultSize-1, resultSize).trim();
		
		resultParam.put("AnsZipCode", resPosPostalCd);
		resultParam.put("AnsAddress", resPosAddress);
		resultParam.put("AnsUtmX", resPosX);
		resultParam.put("AnsUtmY", resPosY);
		resultParam.put("AnsTime", resSendDatetime);
		resultParam.put("AnsResult", resCode);
		resultParam.put("MS_TYPE", msType);
		resultParam.put("TelCom", telCom);
		
		return resultParam;
		
		//		S00000	성공
		//		E00100	전원꺼짐/통화권이탈
		//		E00200 	단말기형식오류
		//		E00300 	메시지OVERFLOW
		//		E00400 	위치요청거부
		//		E00500 	비가입자,결번,서비스정지
		//		E00700 	이동통신사장애
		//		E00800 	원격통신오류
		//		E00900 	결과수신오류
		//		E90000 	기타
		
	}
 
 
}