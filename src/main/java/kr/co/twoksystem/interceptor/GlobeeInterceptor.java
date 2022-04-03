package kr.co.twoksystem.interceptor;

import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.context.request.WebRequestInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.ModelAndViewDefiningException;
import org.springframework.web.servlet.handler.WebRequestHandlerInterceptorAdapter;
//import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.util.UrlPathHelper;

import egovframework.com.vo.SessionVo;

public class GlobeeInterceptor extends WebRequestHandlerInterceptorAdapter
{
	/*
	 
	// 신규 공무원/센터 분리
	// 공무원 인증
	private static List<String> noCivilAuthUrls;
	{
		noCivilAuthUrls = new ArrayList<String>();
		noCivilAuthUrls.add("/ajax/main/CommonSetSelectBox.do");  // 공통코드리스트조회	

		noCivilAuthUrls.add("/web/civilservice/civilServiceWorkMain.do");  // 공무원업무관련
		noCivilAuthUrls.add("/web/civilservice/civilServiceWork.do");
		noCivilAuthUrls.add("/web/civilservice/csw");
		noCivilAuthUrls.add("/ajax/civilservice/csw");
		noCivilAuthUrls.add("/jqgrid/civilservice/csw");
		noCivilAuthUrls.add("/excel/civilservice/csw");		
			
		noCivilAuthUrls.add("/web/dashboard/index.do"); 
		noCivilAuthUrls.add("/ajax/dashboard"); 
			
		noCivilAuthUrls.add("/web/magicsso/");	
		noCivilAuthUrls.add("/file/");
			
		// 상담DB상세
		noCivilAuthUrls.add("/web/main/jisikDetail.do"); 
		noCivilAuthUrls.add("/ajax/main/jisikDetail.do");
		noCivilAuthUrls.add("/ajax/management/jisikDetail.do");
		noCivilAuthUrls.add("/ajax/management/counselDbConfmDetail.do");
		noCivilAuthUrls.add("/ajax/management/fileList.do");
		noCivilAuthUrls.add("/ajax/main/addInqrCnt.do");
	}
		
	// 콜센터 인증
	private static List<String> noAgentAuthUrls;
	{
		noAgentAuthUrls = new ArrayList<String>();
		noAgentAuthUrls.add("/web/user/login.do");
		noAgentAuthUrls.add("/ajax/user/login.do");
			
		// 공무원업무관련 (공무원화면 접근시 필요)
		noAgentAuthUrls.add("/web/civilservice/civilServiceWorkMain.do");  
		noAgentAuthUrls.add("/web/civilservice/civilServiceWork.do");
		noAgentAuthUrls.add("/web/civilservice/csw");
		noAgentAuthUrls.add("/ajax/civilservice/csw");
		noAgentAuthUrls.add("/jqgrid/civilservice/csw");
		noAgentAuthUrls.add("/excel/civilservice/csw");		
			
		noAgentAuthUrls.add("/web/dashboard/index.do"); 
		noAgentAuthUrls.add("/ajax/dashboard"); 

		noCivilAuthUrls.add("/web/magicsso/");	
		noAgentAuthUrls.add("/file/");
			
		// 상담DB상세 (검색서버 접근시 필요)
		noAgentAuthUrls.add("/web/main/jisikDetail.do"); 
		noAgentAuthUrls.add("/ajax/main/jisikDetail.do");
		noAgentAuthUrls.add("/ajax/management/jisikDetail.do");
		noAgentAuthUrls.add("/ajax/management/counselDbConfmDetail.do");
		noAgentAuthUrls.add("/ajax/management/fileList.do");
		noAgentAuthUrls.add("/ajax/main/addInqrCnt.do");
		
		// 외부 접근
		noAgentAuthUrls.add("/ivr/");
		//noAgentAuthUrls.add("/pds/");
		
		noAgentAuthUrls.add("/web/pcrm/");
		noAgentAuthUrls.add("/ajax/pcrm/");
		noAgentAuthUrls.add("/excel/pcrm/");
	}
	
	private static List<String> noauthIPs; {
		noauthIPs = new ArrayList<String>();

		// 콜센터망
		noauthIPs.add("172.17.10.");

		// 서버대역 - fax (원격 테스트용)
		noauthIPs.add("172.17.0.19");

		// 서버대역 - ivr
		noauthIPs.add("172.17.0.13");
		noauthIPs.add("172.17.0.14");
		// 개발시 로컬IP
		noauthIPs.add("0:0:0:0:0:0:0:1");
	}
	
	private boolean isCivilAuthNeed(HttpServletRequest request)
	{
		for(String url : noCivilAuthUrls) {
			if(request.getServletPath().startsWith(url)) {
				return false;
			}
		}
		return true;
	}
		
	private boolean isAgentAuthNeed(HttpServletRequest request)
	{
		for(String url : noAgentAuthUrls) {
			if(request.getServletPath().startsWith(url)) {
				return false;
			}
		}
		return true;
	}

	private boolean isAuthNeedIP(HttpServletRequest request) {
//		System.out.println("request.getRemoteAddr() >>> "+request.getRemoteAddr());
		for (String ip : noauthIPs) {
			if (request.getRemoteAddr().startsWith(ip)) {
				return false;
			}
		}
		return true;
	}
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception
	{
		response.setHeader("cache-control", "no-cache");
		response.setHeader("expires", "0");
		response.setHeader("pragma", "no-cache");
		
//		System.out.println("request.getServletPath() >>> "+request.getServletPath());
		
		if (isAuthNeedIP(request))
		{ 	// 콜센터 이외
//			System.out.println("--- isAuthNeedIP X ---");

			if(isCivilAuthNeed(request))
			{
				response.sendRedirect("/error.jsp");
				return false;
			}
		} 
		else 
		{ 	// 콜센터
			
			if(isAgentAuthNeed(request))
			{
				boolean lbError = false;
				SessionVo sessionDto = (SessionVo)request.getSession().getAttribute("sessionDto");
				
//				System.out.println("sessionDto >>> "+sessionDto);
				
				if(sessionDto == null)
				{
					lbError = true;
				}
				else
				{
					String lsUsr_ip = sessionDto.getLogin_usr_ip();
					String lsCur_ip = request.getRemoteAddr();
//					System.out.println("lsUsr_ip >>> "+lsUsr_ip);
//					System.out.println("lsCur_ip >>> "+lsCur_ip);
					if(!lsCur_ip.equals(lsUsr_ip))
					{
						lbError = true;
					}
				}
//				System.out.println("lbError >>> "+lbError);
				if(lbError)
				{
					UrlPathHelper urlPathHelper = new UrlPathHelper();
					String redirectUrl = urlPathHelper.getOriginatingRequestUri(request);
					if(request.getQueryString() != null)
						redirectUrl += "?" + request.getQueryString();
					ModelAndView mv = new ModelAndView("redirect:/web/user/login.do?redirectUrl=" + URLEncoder.encode(redirectUrl, "UTF-8"));
					throw new ModelAndViewDefiningException(mv);
				}
			}
		} //else 콜센터

		
		return true;
	}
	
	
	*/
	
	public GlobeeInterceptor(WebRequestInterceptor requestInterceptor) {
		super(requestInterceptor);
		// TODO Auto-generated constructor stub
	}

	// 기존
	private static List<String> noauthUrls;
	{
		noauthUrls = new ArrayList<String>();
		noauthUrls.add("/web/user/login.do");
		noauthUrls.add("/ajax/user/login.do");
		
		noauthUrls.add("/web/logout.do");

		noauthUrls.add("/ajax/main/CommonSetSelectBox.do");  // 공통코드리스트조회	

		noauthUrls.add("/web/civilservice/civilServiceWorkMain.do");  // 공무원업무관련
		noauthUrls.add("/web/civilservice/civilServiceWork.do");
		noauthUrls.add("/web/civilservice/csw");
		noauthUrls.add("/ajax/civilservice/csw");
		noauthUrls.add("/jqgrid/civilservice/csw");
		noauthUrls.add("/excel/civilservice/csw");		
		noauthUrls.add("/ajax/civilservice"); //hhs 29.06.05		
			
		noauthUrls.add("/web/dashboard/index.do"); 
		noauthUrls.add("/ajax/dashboard"); 
		
		noauthUrls.add("/web/magicsso/");	
		noauthUrls.add("/file/");
		
		// 상담DB상세
		noauthUrls.add("/web/main/jisikDetail.do"); 
		noauthUrls.add("/ajax/main/jisikDetail.do");
		noauthUrls.add("/ajax/management/jisikDetail.do");
		noauthUrls.add("/ajax/management/counselDbConfmDetail.do");
		noauthUrls.add("/ajax/management/fileList.do");
		noauthUrls.add("/ajax/main/addInqrCnt.do");
		
		//2019.11.27 PDS 
		noauthUrls.add("/web/pds");
		noauthUrls.add("/ajax/pds");

		// PCRM
		noauthUrls.add("/web/pcrm/");
		noauthUrls.add("/ajax/pcrm/");
		noauthUrls.add("/excel/pcrm/");
		
		noauthUrls.add("/web/pcrm2/");
		noauthUrls.add("/ajax/pcrm2/");
		noauthUrls.add("/excel/pcrm2/");
		
		noauthUrls.add("/ivr/rstCallback.do"); // IVR 콜백
		noauthUrls.add("/ivr/blockCheck.do"); // IVR 콜백
	}
	
	private boolean isAuthNeed(HttpServletRequest request)
	{
		for(String url : noauthUrls)
		{
//			System.out.println("url >>> " + url+ " - " + request.getServletPath().startsWith(url));
			if(request.getServletPath().startsWith(url))
			{
//				System.out.println(">>> isAuthNeed : false");
				return false;
			}
		}
//		System.out.println(">>> isAuthNeed : true");
		return true;
	}
			
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception
	{
		response.setHeader("cache-control", "no-cache");
		response.setHeader("expires", "0");
		response.setHeader("pragma", "no-cache");

//		if (isAuthNeedIP(request)) {
//			UrlPathHelper urlPathHelper = new UrlPathHelper();
//			String redirectUrl = urlPathHelper.getOriginatingRequestUri(request);
//			if (request.getQueryString() != null) redirectUrl += "?" + request.getQueryString();
//			ModelAndView mv = new ModelAndView("redirect:/web/user/login.do?redirectUrl=" + URLEncoder.encode(redirectUrl, "UTF-8"));
//			throw new ModelAndViewDefiningException(mv) ;
//		}

//		System.out.println("request.getServletPath() >> " + request.getServletPath());
		
		if(isAuthNeed(request))
		{
			boolean lbError = false;
			SessionVo sessionDto = (SessionVo)request.getSession().getAttribute("sessionDto");
//			System.out.println("1. lbError >> " + lbError);
			
			if(sessionDto == null)
			{
				lbError = true;
//				System.out.println("2. lbError >> " + lbError);
			}
			else
			{
				String lsUsr_id = sessionDto.getLogin_usr_id();
				String lsUsr_nm = sessionDto.getLogin_usr_nm();
				String lsUsr_ip = sessionDto.getLogin_usr_ip();
				String lsCur_ip = request.getRemoteAddr();
//				System.out.println("[SESSION INFO] USR_ID : " + lsUsr_id + ", USR_NM : " + lsUsr_nm + ", USR_IP : " + lsUsr_ip + ", " + ", REMOTE_IP : " + lsCur_ip);
//				System.out.println("lsUsr_ip >> " + lsUsr_ip);
//				System.out.println("lsCur_ip >> " + lsCur_ip);
				
				if(!lsCur_ip.equals(lsUsr_ip))
				{
					lbError = true;
//					System.out.println("3. lbError >> " + lbError);
				}
			}
			
			if(lbError)
			{
				System.out.println("로그인 화면으로, lbError >>" + lbError);
				UrlPathHelper urlPathHelper = new UrlPathHelper();
				String redirectUrl = urlPathHelper.getOriginatingRequestUri(request);
//				System.out.println("redirectUrl >> " + redirectUrl);
//				System.out.println("request.getQueryString() >> " + request.getQueryString());
				if(request.getQueryString() != null)
					redirectUrl += "?" + request.getQueryString();
				ModelAndView mv = new ModelAndView("redirect:/web/user/login.do?redirectUrl=" + URLEncoder.encode(redirectUrl, "UTF-8"));
				throw new ModelAndViewDefiningException(mv);
			}
		}
		else if(request.getServletPath().equals("/web/logout.do")){
			// 로그아웃 처리
			System.out.println("LOGOUT");
			request.getSession().invalidate();
			
			UrlPathHelper urlPathHelper = new UrlPathHelper();
			String redirectUrl = urlPathHelper.getOriginatingRequestUri(request);
			System.out.println("redirectUrl >> " + redirectUrl);
			System.out.println("request.getQueryString() >> " + request.getQueryString());
			if(request.getQueryString() != null)
				redirectUrl += "?" + request.getQueryString();
			ModelAndView mv = new ModelAndView("redirect:/web/user/login.do?redirectUrl=" + URLEncoder.encode(redirectUrl, "UTF-8"));
			throw new ModelAndViewDefiningException(mv);
			
		}
		return true;
	}
	

	@Override
	public void postHandle(HttpServletRequest req, HttpServletResponse res, Object handler, ModelAndView modelAndView) throws Exception
	{
	}

	@Override
	public void afterCompletion(HttpServletRequest req, HttpServletResponse res, Object handler, Exception ex) throws Exception
	{
	}
}