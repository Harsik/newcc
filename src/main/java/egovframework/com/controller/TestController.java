package egovframework.com.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import net.sf.json.JSONObject;

@Controller
public class TestController {

	@Autowired
	private CommonService commonService;
	
	@RequestMapping(value = "/test/api1.do")
	public String api1(HttpServletRequest req, Model model, @RequestParam Map params) throws Exception {
		Map resultMap = getReturnResult(params);
		System.out.println(resultMap.toString());
		model.addAttribute("result", resultMap);

		return "test/api1";
	}

	@RequestMapping(value = "/test/api2.do")
	public void api2(HttpServletRequest req, HttpServletResponse res, Model model, @RequestParam Map params) throws Exception
	{
		Map resultMap = getReturnResult(params);
		JSONObject resultJson = new JSONObject();
		resultJson.put("result", resultMap);

		res.setContentType("application/json");
		res.setCharacterEncoding("utf-8");
		
		try(PrintWriter pw = res.getWriter()) {
			pw.print(resultJson);
			pw.flush();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	
	@Autowired
	@Qualifier("JacksonJsonView")
	protected View jsonView;
	
	@RequestMapping(value = "/test/api3.do")
	public View api3(HttpServletRequest req, Model model, @RequestParam Map params) throws Exception
	{
		Map resultMap = getReturnResult(params);
		model.addAttribute("result", resultMap);
		return jsonView;
	}
	
	@RequestMapping(value = "/test/api4.do")
	public View api4(HttpServletRequest req, Model model, @RequestBody Map params) throws Exception
	{
		try {
			System.out.println("params : " + params);
			System.out.println(params.get("wrk_id"));
		} catch(Exception e) {
			e.printStackTrace();
		}
		model.addAttribute("result", "true");
		return jsonView;
	}

	@RequestMapping(value = "/test/api5.do")
	public View api5(HttpServletRequest req, Model model, @RequestBody String params) throws Exception
	{
		try {
			System.out.println("params : " + params);
			ObjectMapper om = new ObjectMapper();
			Map paramMap = om.readValue(params, Map.class);
			System.out.println("paramMap : " + paramMap);
		} catch(Exception e) {
			e.printStackTrace();
		}
		model.addAttribute("result", "true");
		return jsonView;
	}
	
	
	@RequestMapping(value = "/test/api6.do")
	public String api6(HttpServletRequest req, Model model, @RequestParam Map params) throws Exception
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
	
	
	private Map getReturnResult(Map params) throws Exception {
		/*Map resultMap = new HashMap();
		resultMap.put("result", "success");
		resultMap.put("count", 1);

		Map subMap = new HashMap();
		subMap.put("userName", "JHIL");
		subMap.put("gender", "male");
		subMap.put("hp", params.get("hp"));

		resultMap.put("user", subMap);
*/		
		
		Map jMap = new HashMap();
		jMap.put("qt", GlobeeSecurity.encodeBinary(new String("selectOne").getBytes()));
		jMap.put("mi", GlobeeSecurity.encodeBinary(new String("ch003.selectOne").getBytes()));
		jMap.put("map", params);
		Map tMap = new HashMap();
		tMap.put("jMap", jMap);
		tMap.put("sMap", new HashMap());
		Map resultMap = commonService.service(tMap);
		
		

		return resultMap;
	}

}
