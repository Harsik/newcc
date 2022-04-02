package egovframework.com.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.twoksystem.controller.GlobeeController;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/file")
public class FileController extends GlobeeController
{
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/**/*.do")
	public ModelAndView serviceCommon(HttpServletRequest req, HttpServletResponse res) throws Exception
	{
		gbLogger.debug("execute FileController.serviceCommon file RequestMethodMethod Get & Post!!");
		Map<String, Object> pMap = getRequestParams(req);
		Map<String, Object> jMap = (Map<String, Object>)pMap.get("jMap");
		ModelAndView mv = new ModelAndView("downloadView");

		String lsMappingPath = getViewPath(req.getServletPath(), "/file", ".do");
		
		if("cmpnManage/excelFormDown".equals(lsMappingPath))
		{
			String svrFilePath = (String)jMap.get("svrFilePath");
			svrFilePath = req.getSession().getServletContext().getRealPath("/") + svrFilePath;
//			svrFilePath = "/shared/AgentApp" + svrFilePath;
			svrFilePath = StringUtils.replace(svrFilePath, "\\", "/");
			svrFilePath = StringUtils.replace(svrFilePath, "//", "/");
			jMap.put("svrFilePath", svrFilePath);
		}
		
		mv.addAllObjects(jMap);
		
		return mv;
	}
}