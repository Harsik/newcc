package egovframework.com.service;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import kr.co.twoksystem.mapper.IGlobeeMapper;
import kr.co.twoksystem.security.GlobeeSecurity;
import kr.co.twoksystem.service.IGlobeeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("commomService")
public class CommonService extends EgovAbstractServiceImpl implements IGlobeeService {

	@Autowired
//	@Resource(name="globeeMapper")
	private IGlobeeMapper globeeMapper;

//	public void setGlobeeMapper(IGlobeeMapper globeeMapper) {
//		this.globeeMapper = globeeMapper;
//	}

	private void deleteFiles(Map<String, Object> pMap) throws Exception {
		// 파일 수정이 없을 시에 리턴
		if (pMap.get("tbl_nm") == null || pMap.get("tbl_pk") == null || pMap.get("modYn") == "null") {
		    return;	
		}
		List<HashMap<String, Object>> rList = globeeMapper.selectList("om019.fileList", pMap);
		Iterator<HashMap<String, Object>> itr = rList.iterator();
	    while (itr.hasNext()) {
	    	HashMap<String, Object> iMap = itr.next();
			File file = new File((String) iMap.get("svr_sv_pth"));
			if (file.exists()) {
				file.delete();
			}
	    }
	    if(pMap.get("tbl_pk2") == null) {
	    globeeMapper.selectList("om019.deleteList", pMap);
	    }
	}

	private Map<String, Object> executeService(String queryTyp, String mapperId, Map<String, Object> pMap) throws Exception {
		Map<String, Object> rMap = new HashMap<String, Object>();
		switch (queryTyp) {
		case "selectList" :
			rMap.put("result", globeeMapper.selectList(mapperId, pMap));
			break;
		case "selectOne" :
		case "select" :
			rMap.put("result", globeeMapper.selectOne(mapperId, pMap));
			break;
		case "insert" :
			rMap.put("result", globeeMapper.insert(mapperId, pMap));
			break;
		case "update" :
			rMap.put("result", globeeMapper.update(mapperId, pMap));
			break;
		case "delete" :
			rMap.put("result", globeeMapper.delete(mapperId, pMap));
			break;
		case "default" :
			egovLogger.debug("mapperId : " + mapperId);
			break;
		}
		return rMap;
	}

	@SuppressWarnings("unchecked")
	private List<Map<String, Object>> batch(List<Map<String, Object>> pList, Map<String, Object> tMap) throws Exception {
		List<Map<String, Object>> rList = new ArrayList<Map<String, Object>>();
		Iterator<Map<String, Object>> itr = pList.iterator();
		while (itr.hasNext()) {
			Map<String, Object> iMap = itr.next();
			Map<String, Object> pMap = (Map<String, Object>) iMap.get("map");
			String queryTyp = (String) iMap.get("qt");
			String mapperId = (String) iMap.get("mi");
			queryTyp = new String(GlobeeSecurity.decodeBinary(queryTyp));
			mapperId = new String(GlobeeSecurity.decodeBinary(mapperId));

			pMap.putAll((Map<String, Object>) tMap.get("sMap"));
			
			Map<String, Object> rMap = new HashMap<String, Object>();
			Iterator<Map<String, Object>> iter = null;
			List<Map<String, Object>> fList = null;
			
			switch (queryTyp) {
			case "selectList" :
				pMap.putAll((Map<String, Object>) tMap.get("qMap"));
				rMap.put("map", pMap);
				rMap.putAll(executeService(queryTyp, mapperId, pMap));
				break;
			case "selectOne" :
			case "select" :
				rMap.putAll(executeService(queryTyp, mapperId, pMap));
				break;
			case "insert" :
				rMap.putAll(executeService(queryTyp, mapperId, pMap));
				
				// 20150810_jyjung 예외처리 추가 > fMap에 내용이 없는 경우 에러 발생함
				if(!tMap.get("fMap").toString().equals("{}"))
				{
					fList = (List<Map<String, Object>>) tMap.get("fMap");
					iter = fList.iterator();
				    while (iter.hasNext()) {
				    	Map<String, Object> map = iter.next();
						map.putAll((Map<String, Object>) tMap.get("sMap"));
						map.putAll((Map<String, Object>) tMap.get("qMap"));
						rMap.putAll(executeService(queryTyp, "om019.insert",  map));
				    }
				}
				break;
			case "update" :
//				deleteFiles(pMap);
				rMap.putAll(executeService(queryTyp, mapperId, pMap));
				
				// 20150810_jyjung 예외처리 추가 > fMap에 내용이 없는 경우 에러 발생함
				if(!tMap.get("fMap").toString().equals("{}"))
				{
					fList = (List<Map<String, Object>>) tMap.get("fMap");
					iter = fList.iterator();
				    while (iter.hasNext()) {
				    	Map<String, Object> map = iter.next();
						map.putAll((Map<String, Object>) tMap.get("sMap"));
						map.putAll((Map<String, Object>) tMap.get("qMap"));
						rMap.putAll(executeService(queryTyp, "om019.insert", map));
				    }
				}
				break;
			case "delete" :
//				deleteFiles(pMap);
				rMap.putAll(executeService(queryTyp, mapperId, pMap));
				break;
			case "default" :
				break;
			}
			
			rList.add(rMap);
		}
		return rList;
	}
	
	@SuppressWarnings("unchecked")
	@Transactional
	public Map<String, Object> service(Map<String, Object> tMap) throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		egovLogger.debug(objectMapper.writeValueAsString(tMap));
		Map<String, Object> rMap = new HashMap<String, Object>();
		Map<String, Object> jMap = (Map<String, Object>) tMap.get("jMap");
		Map<String, Object> pMap = (Map<String, Object>) jMap.get("map");
		String queryTyp = (String) jMap.get("qt");
		String mapperId = (String) jMap.get("mi");
		queryTyp = new String(GlobeeSecurity.decodeBinary(queryTyp));
		mapperId = new String(GlobeeSecurity.decodeBinary(mapperId));
		if ("batch".equalsIgnoreCase(queryTyp)) {
			List<Map<String, Object>> pList = (List<Map<String, Object>>) jMap.get("pList");
			rMap.put("result", batch(pList, tMap));
			return rMap;
		}
		pMap.putAll((Map<String, Object>) tMap.get("sMap"));

		List<Map<String, Object>> fList = null;
		Iterator<Map<String, Object>> iter = null;
		
		switch (queryTyp) {
		case "selectList" :
			pMap.putAll((Map<String, Object>) tMap.get("qMap"));
			rMap.putAll(executeService(queryTyp, mapperId, pMap));
			List<HashMap<String, Object>> rList = (List<HashMap<String, Object>>) rMap.get("result");
			if (rList != null && !rList.isEmpty()) {
				HashMap<String, Object> map = rList.get(0);
				rMap.put("rows"   , rList);
				rMap.put("page"   , map.get("PAGENUM"));
				rMap.put("total"  , map.get("TOTPAGECOUNT"));
				rMap.put("records", map.get("TOTROWCOUNT"));
			} else {
				rMap.put("rows"   , null);
				rMap.put("page"   , 1);
				rMap.put("total"  , 0);
				rMap.put("records", 0);
			}
			break;
		case "selectOne" :
		case "select" :
			rMap.putAll(executeService(queryTyp, mapperId, pMap));
			break;
		case "insert" :
			rMap.putAll(executeService(queryTyp, mapperId, pMap));
			
			// 20150810_jyjung 예외처리 추가 > fMap에 내용이 없는 경우 에러 발생함
			if(!tMap.get("fMap").toString().equals("{}"))
			{
				fList = (List<Map<String, Object>>) tMap.get("fMap");
				
				if(mapperId.substring(0, mapperId.indexOf(".")).equals("sms")) 
				{ // sms insert
					pMap.put("fList", fList);
					executeService(queryTyp, "sms.sendSmsContent",  pMap);
				}
				else
				{ // om019 insert
					
					iter = fList.iterator();
				    while (iter.hasNext()) {
				    	Map<String, Object> iMap = iter.next();
						iMap.putAll((Map<String, Object>) tMap.get("sMap"));
						iMap.putAll((Map<String, Object>) pMap);
						executeService(queryTyp, "om019.insert",  iMap);
//						rMap.putAll(executeService(queryTyp, "om019.insert",  iMap));
				    }
				}
				
			}
			rMap.put("result", pMap);
			break;
		case "update" :
			// 20.11.10 서버에있는 파일은 지우지 않는 방법으로 변경
//			deleteFiles(pMap);
			rMap.putAll(executeService(queryTyp, mapperId, pMap));
			
			// 20150810_jyjung 예외처리 추가 > fMap에 내용이 없는 경우 에러 발생함
			if(!tMap.get("fMap").toString().equals("{}"))
			{
				fList = (List<Map<String, Object>>) tMap.get("fMap");
				iter = fList.iterator();
			    while (iter.hasNext()) {
			    	Map<String, Object> iMap = iter.next();
					iMap.putAll((Map<String, Object>) tMap.get("sMap"));
					iMap.putAll((Map<String, Object>) pMap);
					executeService(queryTyp, "om019.insert",  iMap);
//					rMap.putAll(executeService(queryTyp, "om019.insert", iMap));
			    }
			}
			rMap.put("result", pMap);
			break;
		case "delete" :
//			deleteFiles(pMap);
			executeService(queryTyp, mapperId,  pMap);
			rMap.put("result", pMap);
//			rMap.putAll(executeService(queryTyp, mapperId, pMap));
			break;
		case "default" :
			break;
		}
		
		return rMap;
	}

}
