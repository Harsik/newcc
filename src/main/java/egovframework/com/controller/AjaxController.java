package egovframework.com.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.com.vo.SessionVo;
import kr.co.twoksystem.controller.GlobeeController;
import kr.co.twoksystem.service.IGlobeeService;

@Controller
@RequestMapping(value = "/ajax")
public class AjaxController extends GlobeeController
{
	@Autowired
	protected IGlobeeService commomService;
/*GlobeeController로 이전
	public Map<String, Object> changeToUpperMapKey(Object object){
		   @SuppressWarnings("unchecked")
		   Map<String, Object> origin = (Map<String, Object>) object;
		   Map<String, Object> temp = new HashMap<String, Object>();   
		   
		   Set<String> set = origin.keySet();
		   Iterator<String> e = set.iterator();

		   while(e.hasNext()){
		     String key = e.next();
		     Object value = (Object) origin.get(key);

		     temp.put(key.toUpperCase(), value);
		   }

		   origin = null;
		  return temp;
	}
	*/
	private void setSessionDto(HttpServletRequest req, Map<String, Object> pMap)
	{
		SessionVo sessionDto = new SessionVo();
		sessionDto.setLogin_usr_id((String)pMap.get("USR_ID"));
		sessionDto.setLogin_usr_nm((String)pMap.get("USR_NM"));
		sessionDto.setLogin_usr_ip(req.getRemoteAddr());
		req.getSession().setAttribute("sessionDto", sessionDto);
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/**/*.do")
	public void serviceCommon(HttpServletRequest req, HttpServletResponse res) throws Exception, JsonParseException, JsonMappingException, IOException 
	{
		gbLogger.debug("execute AjaxController.serviceCommon RequestMethodMethod Get & Post!!");

		Map<String, Object> pMap = getRequestParams(req);
		
		if (pMap == null) {
			gbLogger.debug("==================================================================================================");
			gbLogger.debug(req.getRequestURL().toString());
			gbLogger.debug("pMap is null");
			gbLogger.debug("==================================================================================================");
			return ;
		}
		
		ObjectMapper objectMapper = new ObjectMapper();
		
		if (commomService == null) {
			gbLogger.debug("★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★commomService is null!!!");
			gbLogger.debug(req.getRequestURL().toString());
			return;
		}
		
		Map<String, Object> rMap = commomService.service(pMap);
		
		String lsMappingPath = getViewPath(req.getServletPath(), "/ajax", ".do");
		
		if("user/login".equals(lsMappingPath))
		{
			Map<String, Object> map = (Map<String, Object>) changeToUpperMapKey((Map<String, Object>)rMap.get("result"));
			//Map<String, Object> map = (Map<String, Object>)rMap.get("result");
			
			if("200".equals(map.get("LOGIN_CODE")))
			{
				((Map<String, Object>) changeToUpperMapKey((Map<String, Object>)rMap.get("result"))).put("IPADDR", req.getRemoteAddr());
				//((Map<String, Object>)rMap.get("result")).put("IPADDR", req.getRemoteAddr());
				setSessionDto(req, map);
			}
		}
		
		res.setContentType("text/html");
		res.setCharacterEncoding("utf-8");
		
		try(PrintWriter pw = res.getWriter())
		{
//			System.out.println("rMap.get(\"result\") = " + rMap.get("result"));
			Object result = rMap.get("result");
			if(!("main/getUserMenu".equals(lsMappingPath)) && 
					!("counsel/teamUsrList".equals(lsMappingPath)) && 
					!("management/getCategoryAll".equals(lsMappingPath)) && 
					!("management/codetypelist".equals(lsMappingPath))&& 
					!("edu/getEduSuvyTree".equals(lsMappingPath)))
			{
				result = changeToUpperMapKey(result);
			}
			pw.print(objectMapper.writeValueAsString(result));
			//pw.print(objectMapper.writeValueAsString(rMap.get("result")));
			pw.flush();
		}	
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}
}
