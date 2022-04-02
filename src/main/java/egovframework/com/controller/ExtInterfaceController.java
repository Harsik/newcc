package egovframework.com.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.com.service.CommonService;
import kr.co.twoksystem.security.GlobeeSecurity;

@Controller
public class ExtInterfaceController {
	
	@Autowired
	CommonService commonService;
	
	// callback 저장 cm006
	@ResponseBody
	@RequestMapping(value = "/ivr/rstCallback.do")
	public String rstCallback(HttpServletRequest req, Model model, @RequestParam Map pMap) 
	{
		System.out.println("rstCallback paramMap >> " + pMap);
		
		// {ANI=0313333333, ReqNum=01011112222}
		String ani 	  = (String) pMap.get("ANI");	// ANI 	  : 인입된 전화번호
		String reqNum = (String) pMap.get("ReqNum");; // ReqNum : 콜백할 전화번호
		
		String result = "error"; 
		
		Map mResult = new HashMap<>();
		Map jMap = new HashMap<>();		// Query Type, Mapper ID
		Map tMap = new HashMap<>();		// Total Map
		
		try {
			if(ani == "" || ani == null) {
				result = "error - ANI";
			} else if(reqNum == "" || reqNum == null) {
				result = "error - ReqNum";
			} else {
				jMap.put("qt", GlobeeSecurity.encodeBinary(new String("insert").getBytes()));
				jMap.put("mi", GlobeeSecurity.encodeBinary(new String("cm006.insertCallback").getBytes()));
				jMap.put("map", pMap);
				
				tMap.put("jMap", jMap);
				tMap.put("sMap", new HashMap<>());
				tMap.put("fMap", new HashMap<>());
				
				mResult = commonService.service(tMap);
				
				result = "success";
			}
			
		} catch (Exception e) {
			result = "error";
		}
		
		return result;
	}
	
	@ResponseBody
	@RequestMapping(value="/ivr/blockCheck.do", produces = "text/html; charset=utf-8")
	public String blockCheck(HttpServletRequest req, Model model, @RequestParam Map pMap) {
		// http://172.17.100.100/ivr/blockCheck.do?ANI=01011111111
		// {ANI=0313333333}
		String ani = (String) pMap.get("ANI"); // ANI : 인입된 전화번호
		String result = "N"; 
		
		Map mResult = new HashMap<>();
		Map jMap = new HashMap<>();		// Query Type, Mapper ID
		Map tMap = new HashMap<>();		// Total Map
		Map rMap = new HashMap<>();		// Result Map
		
		try {
			if(ani == "" || ani == null) {
				result = "N";
				System.out.println("blockCheck error - ANI");
			} else {
				jMap.put("qt", GlobeeSecurity.encodeBinary(new String("selectOne").getBytes()));
				jMap.put("mi", GlobeeSecurity.encodeBinary(new String("om051.blockCheck").getBytes()));
				jMap.put("map", pMap);
				
				tMap.put("jMap", jMap);
				tMap.put("sMap", new HashMap<>());
				tMap.put("fMap", new HashMap<>());
				
				mResult = commonService.service(tMap);
				
				if(mResult.get("result") == "" || mResult.get("result") == null) {
					result = "N";
				}else {
					rMap = (Map) mResult.get("result");
					// 차단 후에 인입됐을 경우 insert 
					jMap.put("qt", GlobeeSecurity.encodeBinary(new String("insert").getBytes()));
					jMap.put("mi", GlobeeSecurity.encodeBinary(new String("om051.insertIvrBlock").getBytes()));
					pMap.put("blockCd", (String) rMap.get("block_cd"));
					jMap.put("map", pMap);
					
					tMap.put("jMap", jMap);
					tMap.put("sMap", new HashMap<>());
					tMap.put("fMap", new HashMap<>());
					
					mResult = commonService.service(tMap);
					
					result = "Y," + (String) rMap.get("rslt");
					
					
				}
			}
			
		} catch (Exception e) {
			result = "N";
			System.out.println("blockCheck error - Exception");
			e.printStackTrace();
		}
		
		return result;
	}
}
