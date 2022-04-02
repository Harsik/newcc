package egovframework.com.controller;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import kr.co.twoksystem.controller.GlobeeController;
import kr.co.twoksystem.service.IGlobeeService;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.HandlerMapping;

@SuppressWarnings("unused")
@Controller
@RequestMapping(value = "/web")
public class WebController extends GlobeeController
{
	@Resource(name = "commomService")
	protected IGlobeeService commomService;

	@RequestMapping(value = "/**/*.do", method = RequestMethod.GET)
	public String userLogin(HttpServletRequest req, Model model) throws Exception
	{
		Map<String, Object> pMap = getRequestParams(req);
		String restOfTheUrl = (String)req.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
		gbLogger.debug("restOfTheUrl          : " + restOfTheUrl);
		gbLogger.debug("execute WebController.serviceCommon RequestMethodMethod Get !!");
		gbLogger.debug("getContextPath        : " + req.getContextPath());
		gbLogger.debug("getLocalAddr          : " + req.getLocalAddr());
		gbLogger.debug("getLocalName          : " + req.getLocalName());
		gbLogger.debug("getLocalPort          : " + req.getLocalPort());
		gbLogger.debug("getMethod             : " + req.getMethod());
		gbLogger.debug("getPathInfo           : " + req.getPathInfo());
		gbLogger.debug("getProtocol           : " + req.getProtocol());
		gbLogger.debug("getQueryString        : " + req.getQueryString());
		gbLogger.debug("getRequestedSessionId : " + req.getRequestedSessionId());
		gbLogger.debug("getRequestURI         : " + req.getRequestURI());
		gbLogger.debug("getRequestURL         : " + req.getRequestURL());
		gbLogger.debug("getScheme             : " + req.getScheme());
		gbLogger.debug("getServerName         : " + req.getServerName());
		gbLogger.debug("getServerPort         : " + req.getServerPort());
		gbLogger.debug("getServletPath        : " + req.getServletPath());
		gbLogger.debug("getParameterNames     : " + req.getParameterNames());

		String lsServletPath = req.getServletPath();
		return getViewPath(lsServletPath, "/web", ".do");
	}

	@RequestMapping(value = "/**/*.do", method = RequestMethod.POST)
	public String serviceCommon(HttpServletRequest req, Model model) throws Exception
	{
		Map<String, Object> pMap = getRequestParams(req);
		gbLogger.debug("execute WebController.serviceCommon RequestMethodMethod Post !!");
		gbLogger.debug("getContextPath        : " + req.getContextPath());
		gbLogger.debug("getLocalAddr          : " + req.getLocalAddr());
		gbLogger.debug("getLocalName          : " + req.getLocalName());
		gbLogger.debug("getLocalPort          : " + req.getLocalPort());
		gbLogger.debug("getMethod             : " + req.getMethod());
		gbLogger.debug("getPathInfo           : " + req.getPathInfo());
		gbLogger.debug("getProtocol           : " + req.getProtocol());
		gbLogger.debug("getQueryString        : " + req.getQueryString());
		gbLogger.debug("getRequestedSessionId : " + req.getRequestedSessionId());
		gbLogger.debug("getRequestURI         : " + req.getRequestURI());
		gbLogger.debug("getRequestURL         : " + req.getRequestURL());
		gbLogger.debug("getScheme             : " + req.getScheme());
		gbLogger.debug("getServerName         : " + req.getServerName());
		gbLogger.debug("getServerPort         : " + req.getServerPort());
		gbLogger.debug("getServletPath        : " + req.getServletPath());
		gbLogger.debug("getParameterNames     : " + req.getParameterNames());

		String lsServletPath = req.getServletPath();

		return getViewPath(lsServletPath, "/web", ".do");
	}
}