package egovframework.com.controller;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import kr.co.twoksystem.controller.GlobeeController;
import kr.co.twoksystem.service.IGlobeeService;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
@RequestMapping(value = "/api")
public class ApiController extends GlobeeController
{
	private ObjectMapper mapper = new ObjectMapper();

	@Resource(name = "commomService")
	protected IGlobeeService commomService;

	@RequestMapping(value = "/**/*")
	public String serviceCommon(HttpServletRequest req, Model model) throws Exception
	{
		gbLogger.debug("execute ApiController.serviceCommon RequestMethodMethod Get & Post !!");
		Map<String, Object> pMap = getRequestParams(req);
		return mapper.writeValueAsString(commomService.service(pMap));
	}
}