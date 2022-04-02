package egovframework.com.controller;

import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.View;

import egovframework.com.service.CommonService;
import kr.co.twoksystem.security.GlobeeSecurity;

@Controller
public class PDSController {

	@Autowired
	@Qualifier("JacksonJsonView")
	protected View jsonView;
	
	@Autowired
	protected CommonService commonService;
	
	@RequestMapping(value = "/web/pds/scenarioStart.do")
	public View ScenarioStart(HttpServletRequest req, Model model, @RequestBody String params) throws Exception
	{
		System.out.println("PDS RequestParam : " + params);
		
		ObjectMapper om = new ObjectMapper();
		Map paramMap = om.readValue(params, Map.class);
		
		if(paramMap.get("call_number") == null) {
			System.out.println("PDS ScenarioStart : call_number is null");
			model.addAttribute("error", "call_number is null");
			return jsonView;
		}
		
		Map resultMap = GetScenario(paramMap);
		Map responseMap = (Map) resultMap.get("result");

		if(responseMap != null && !responseMap.isEmpty()) {
			model.addAttribute("campaign_id", responseMap.get("cmpg_id"));
			model.addAttribute("playText", responseMap.get("cmpg_dsc"));
		} else {
			model.addAttribute("error", "not found");
		}
		
		return jsonView;
	}

	@RequestMapping(value = "/web/pds/getQuestion.do")
	public View GetQuestion(HttpServletRequest req, Model model, @RequestBody String params) throws Exception
	{
		ObjectMapper om = new ObjectMapper();
		Map paramMap = om.readValue(params, Map.class);
		
		Map resultMap = GetQuestionList(paramMap);
		List responseList = (List) resultMap.get("result");
		Integer nCount = responseList.size();
		
		if(nCount == 0) {
			model.addAttribute("error", "not found");
			return jsonView;
		}
		
		for(Integer i = 0; i < nCount; i++) {
			Map rMap = new HashMap<>();
			rMap.putAll((Map) responseList.get(i));
			
			if(i == 0) {
				model.addAttribute("campaign_id", rMap.get("cmpg_id"));
				model.addAttribute("row_cnt", rMap.get("xamp_scnt"));
			}
			
			model.addAttribute(rMap.get("qst_no").toString(), rMap.get("qst_nm"));
			
		}
		
		return jsonView;
	}

	@RequestMapping(value = "/web/pds/resultQuestion.do")
	public View QuestionAnswer(HttpServletRequest req, Model model, @RequestBody String params) throws Exception
	{
		ObjectMapper om = new ObjectMapper();
		Map paramMap = om.readValue(params, Map.class);
		
		Map resultMap = InsertAnswer(paramMap);
		Map responseMap = (Map) resultMap.get("result");
		
		System.out.println("QuestionAnswer : " + resultMap.toString());
			
		model.addAttribute("campaign_id", resultMap.get("campaign_id"));
		model.addAttribute("row_cnt", resultMap.get("row_cnt"));
		model.addAttribute("response", resultMap.get("response"));
		
		return jsonView;
	}

	
	@SuppressWarnings("unchecked")
	private Map GetScenario(Map pMap) throws IOException {
		Map mResult = new HashMap<>();
		Map jMap = new HashMap<>();		// Query Type, Mapper ID
		Map tMap = new HashMap<>();		// Total Map
		
		try {
			jMap.put("qt", GlobeeSecurity.encodeBinary(new String("selectOne").getBytes()));
			jMap.put("mi", GlobeeSecurity.encodeBinary(new String("cm010.getcmpgList").getBytes()));
			jMap.put("map", pMap);
			
			tMap.put("jMap", jMap);
			tMap.put("sMap", new HashMap<>());
			
			mResult = commonService.service(tMap);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return mResult;
	}
	
	@SuppressWarnings("unchecked")
	private Map GetQuestionList(Map pMap) throws IOException {
		Map mResult = new HashMap<>();
		Map jMap = new HashMap<>();		// Query Type, Mapper ID
		Map tMap = new HashMap<>();		// Total Map
		
		try {
			
			jMap.put("qt", GlobeeSecurity.encodeBinary(new String("selectList").getBytes()));
			jMap.put("mi", GlobeeSecurity.encodeBinary(new String("cm011.GetQuestionList").getBytes()));
			jMap.put("map", pMap);
			
			tMap.put("jMap", jMap);
			tMap.put("qMap", pMap);
			tMap.put("sMap", new HashMap<>());
			
			mResult = commonService.service(tMap);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return mResult;
	}
	
	@SuppressWarnings({ "unchecked", "null" })
	private Map InsertAnswer(Map pMap) throws IOException {
		
		System.out.println("Insert Answer 1");
		
		Map mResult = new HashMap<>();
	
		Map jMap = new HashMap<>();		// Query Type, Mapper ID
		Map sMap = new HashMap<>();		// Param Map
		Map tMap = new HashMap<>();		// Total Map
		
		String sQuestionID = "";
		String sCustomerID = "";
		String sAnswerNo = "";
		String sAnswerTitle = "";
		String sUserID = pMap.get("from").toString();
		Integer nCount = 0;
		
		Boolean bSuccess = false;
		
		try {
			
			System.out.println("Insert Answer 2");
			
			sMap.put("cmpg_id", pMap.get("campaign_id"));
			
			jMap.put("qt", GlobeeSecurity.encodeBinary(new String("selectOne").getBytes()));
			jMap.put("mi", GlobeeSecurity.encodeBinary(new String("cm015.GetQuestionCount").getBytes()));
			jMap.put("map", sMap);
			
			tMap.put("jMap", jMap);
			tMap.put("sMap", new HashMap<>());
			
			mResult = (Map) commonService.service(tMap).get("result");
			System.out.println("Insert Answer 3-1 " + mResult);
			
			if (mResult != null) {

				if (mResult.get("qst_scnt") != null)
					nCount = Integer.parseInt(mResult.get("qst_scnt").toString());

				System.out.println("Insert Answer 3-3 " + nCount);

				for (Integer i = 1; i <= nCount; i++) {
					System.out.println("Insert Answer 4");
					jMap.clear();
					sMap.clear();
					tMap.clear();

					sMap.put("cmpg_id", pMap.get("campaign_id"));
					sMap.put("qst_no", i);
					sMap.put("tel_no", pMap.get("call_number"));

					jMap.put("qt", GlobeeSecurity.encodeBinary(new String("selectOne").getBytes()));
					jMap.put("mi", GlobeeSecurity.encodeBinary(new String("cm015.SelectAnswerParam").getBytes()));
					jMap.put("map", sMap);

					tMap.put("jMap", jMap);
					tMap.put("sMap", new HashMap<>());

					mResult = (Map) commonService.service(tMap).get("result");

					System.out.println("Insert Answer 5" + mResult);

					jMap.clear();
					sMap.clear();
					tMap.clear();

					if (mResult == null) {
						bSuccess = false;
						break;
					}

					System.out.println("Insert Answer 6");

					sAnswerNo = pMap.get(i.toString()).toString();

					sQuestionID = mResult.get("qst_id").toString();
					sCustomerID = mResult.get("cmpg_cust_id").toString();
					sAnswerTitle = mResult.get("xamp" + sAnswerNo).toString();

					sMap.put("qst_seq", sQuestionID);
					sMap.put("cmpg_cust_seq", sCustomerID);
					sMap.put("ans_no", sAnswerNo);
					sMap.put("ans_nm", sAnswerTitle);
					sMap.put("login_usr_id", sUserID);

					jMap.put("qt", GlobeeSecurity.encodeBinary(new String("insert").getBytes()));
					jMap.put("mi", GlobeeSecurity.encodeBinary(new String("cm015.InsertFromPDS").getBytes()));
					jMap.put("map", sMap);

					tMap.put("jMap", jMap);
					tMap.put("sMap", new HashMap<>());
					tMap.put("fMap", new HashMap<>());

					System.out.println("Insert Answer 6-1");
					mResult = commonService.service(tMap);

					System.out.println("Insert Answer 7" + mResult);

					bSuccess = true;
				}

				System.out.println("Insert Answer 8 : " + bSuccess);
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			bSuccess = false;
		}

		if(mResult != null) {
			mResult.clear();
		} else {
			mResult = new HashMap<>();
		}
		
		System.out.println("Insert Answer 9 : " + bSuccess);
		
		mResult.put("campaign_id", pMap.get("campaign_id"));
		mResult.put("row_cnt", nCount);
		
		if(bSuccess) {
			mResult.put("response", "OK");
		} else {
			mResult.put("response", "ERR");
		}
		
		return mResult;
	}

	
	
	@RequestMapping(value = "/web/myinfo/WeatherInfo.do")
	public String WeatherInfo(HttpServletRequest req, Model model, @RequestParam Map params) throws Exception
	{
		URL url = new URL(params.get("getUrl").toString());
		URLConnection connection = url.openConnection();
		connection.setRequestProperty("CONTENT-TYPE","text/html"); 
	    BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream(),"utf-8"));
	    String inputLine;
	    String buffer = "";
	    while ((inputLine = in.readLine()) != null){
	     	buffer += inputLine.trim();
	    }
	    System.out.println("buffer : " + buffer);
	    in.close();

	    model.addAttribute("result", buffer);
	    return "test/api1";
	}
}
