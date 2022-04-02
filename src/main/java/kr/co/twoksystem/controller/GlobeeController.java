package kr.co.twoksystem.controller;

import java.io.File;
//import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
//import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.apache.commons.lang.math.NumberUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.util.UrlPathHelper;

import com.fasterxml.jackson.core.JsonParseException;
//import com.fasterxml.jackson.core.JsonParseException;
//import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.com.cmm.CommonUtil;
import egovframework.com.vo.SessionVo;
import kr.co.twoksystem.config.Config;
import kr.co.twoksystem.exception.AuthException;
import kr.co.twoksystem.exception.CallbackException;
import kr.co.twoksystem.exception.MsgException;
import kr.co.twoksystem.exception.RedirectException;

public class GlobeeController {

	protected Logger gbLogger = LoggerFactory.getLogger(GlobeeController.class);
	protected final static String UNSECURED_CHAR_REGULAR_EXPRESSION = "select|delete|update|insert|create|alter|drop|union|--|/*/g";
	private int rowsPage = 20;
	private ObjectMapper objectMapper = new ObjectMapper();

	public Object changeToUpperMapKey(Object object){
		// System.out.println("object = " + object);
		// 파라메터 object가 ArrayList와 Map으로 갈림
		@SuppressWarnings("unchecked")
		boolean isArray = object instanceof ArrayList<?>;
		boolean isMap = object instanceof Map<?, ?>;

		if (object != null) {
			if (isArray) { // ArrayList일때
				ArrayList<Map> arrayList = (ArrayList<Map>) object;
				ArrayList<Map> resultArrayList = new ArrayList<Map>();
				for (int i = 0; i < arrayList.size(); i++) {
					// System.out.println("one index " + i + " : value " + arrayList.get(i));

					Map<String, Object> origin = (Map<String, Object>) arrayList.get(i);
					Map<String, Object> temp = new HashMap<String, Object>();
					// System.out.println("origin = " + origin);
					Set<String> set = origin.keySet();
					Iterator<String> e = set.iterator();

					while (e.hasNext()) {
						String key = e.next();
						Object value = (Object) origin.get(key);

						temp.put(key.toUpperCase(), value);
					}

					// System.out.println("temp = " + temp);
					origin = null;
					resultArrayList.add(temp);
				}

				return resultArrayList;
			} else { // Map일때
				Map<String, Object> origin = (Map<String, Object>) object;
				Map<String, Object> temp = new HashMap<String, Object>();
				// System.out.println("origin = " + origin);
				Set<String> set = origin.keySet();
				Iterator<String> e = set.iterator();

				while (e.hasNext()) {
					String key = e.next();
					Object value = (Object) origin.get(key);

					temp.put(key.toUpperCase(), value);
				}

				// System.out.println("temp = " + temp);
				origin = null;
				return temp;
			}
		} else {
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	private Map<String, Object> getFileInfos(HttpServletRequest req) {
		Pattern unsecuredCharPattern = Pattern.compile(UNSECURED_CHAR_REGULAR_EXPRESSION, Pattern.CASE_INSENSITIVE);
		
		Map<String, Object> rMap = new HashMap<String, Object>();
		Map<String, Object> qMap = new HashMap<String, Object>();
		Map<String, Object> iMap = new HashMap<String, Object>();
		Map<String, Object> jMap = new HashMap<String, Object>();
		List<Map<String, Object>> rList = new ArrayList<Map<String, Object>>();

		DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		String ls_date = dateFormat.format(new Date());
		String ls_folder = Config.PATH_FILE_UPLOAD + "/" + ls_date.substring(0, 4) + "/" + ls_date.substring(4, 6) + "/" + ls_date.substring(6, 8);

		File lf_folder = new File(ls_folder);
		if (!lf_folder.exists()) lf_folder.mkdirs();
        FileItemFactory factory = new DiskFileItemFactory();
        ServletFileUpload upload = new ServletFileUpload(factory);
        upload.setHeaderEncoding("utf-8");
        List<FileItem> items = null;
		int page = 0, rows = 20;
		boolean pMapEmpty = false;
		try {
			items = upload.parseRequest(req);
	        Iterator<FileItem> iterator = items.iterator();
	    	String server_filename = "";
	    	String lsKey = "", lsVal = "";
	        while(iterator.hasNext()) {
	            FileItem item = (FileItem) iterator.next();
	            lsKey = item.getFieldName();
	            //Handle Form Fields
	            if (!item.isFormField()) {
	                String ls_filename = item.getName();              
	                ls_filename = StringUtils.replace(ls_filename, "\\", "/");
	                ls_filename = ls_filename.substring(ls_filename.lastIndexOf("/")+1, ls_filename.length());              
	                String ls_fileExt = ls_filename.substring(ls_filename.lastIndexOf(".")+1, ls_filename.length());
				    File file = File.createTempFile(lsKey + '_', '.' + ls_fileExt, lf_folder);
				    server_filename = file.getPath();
//				    server_filename = server_filename.substring(server_filename.lastIndexOf("upload"), server_filename.length());
				    server_filename = server_filename.replace('\\', '/');
	                item.write(file);
	                iMap = new HashMap<String, Object>();
	                iMap.put("locfl_nm", ls_filename);
	                iMap.put("fl_sz", item.getSize());
	                iMap.put("fl_ext", ls_fileExt.toLowerCase());
	                iMap.put("svrfl_nm", server_filename.substring(server_filename.lastIndexOf("/")+1, server_filename.length()));
	                iMap.put("svrfl_pth", server_filename);
	                rList.add(iMap);
	            } else {
	            	lsVal = item.getString();
	    			if ("page".equals(lsKey)) {
	    			    page = (lsVal != null) ? NumberUtils.toInt(lsVal, page) : page;
	    			} else if ("rows".equals(lsKey)) {
	    				rows = (lsVal != null) ? NumberUtils.toInt(lsVal, rows) : rows;
	    			} else if ("pJson".equals(lsKey)) {
	    				if (StringUtils.isNotEmpty(lsVal)) {
	    					lsVal = URLDecoder.decode(CommonUtil.nullString(lsVal), "UTF-8");
	    					lsVal = StringUtils.replace(lsVal, "&quot;", "\'");
	    					try {
		    					jMap = objectMapper.readValue(lsVal, Map.class);
	    					} catch (JsonParseException e) {
		    					lsVal = URLDecoder.decode(CommonUtil.nullString(lsVal), "UTF-8");
		    					lsVal = StringUtils.replace(lsVal, "&quot;", "\'");
		    					jMap = objectMapper.readValue(lsVal, Map.class);
	    					}
	    					Map<String, Object> map = (Map<String, Object>) jMap.get("map");
	    					if (map.isEmpty()) {
	    						pMapEmpty = true;
	    					}
	    				}
	    			} else if ("sidx".equals(lsKey) || "sord".equals(lsKey)) {
	    			    Matcher matcher = unsecuredCharPattern.matcher(lsVal);
	    			    lsVal = matcher.replaceAll("");
	    				qMap.put(lsKey, CommonUtil.nullString(lsVal));
	    			} else {
	    				qMap.put(lsKey, CommonUtil.nullString(lsVal));
	    			}
	            }
	        }
		} catch (Exception e) {
			e.printStackTrace();
		}
        
        // 20150812_jyjung 쿼리 동적 사용을 위해 예외처리 합니다.
     	// 해당 필드들을 동적으로 셋팅하여 쿼리를 페이징용도의 쿼리인지 일반쿼리인지 구분하여 사용합니다.
     	// 페이징이 필요한 경우 클라이언트에서 해당 필드들을 셋팅하여 요청 합니다.
        if(page != 0)
        {
        	qMap.put("page", page);
        	qMap.put("rows", rows);
        	qMap.put("pageSize", rows);
        	qMap.put("pos", (page - 1) * rows);
        	qMap.put("limit", rows);
        }
		if (pMapEmpty) {
			jMap.put("map", qMap);
		}
        rMap.put("fMap", rList);
        rMap.put("qMap", qMap);
        rMap.put("jMap", jMap);

		return rMap;
	}
	
	@SuppressWarnings("unchecked")
	protected Map<String, Object> getRequestParams(HttpServletRequest req, int rows) {
		Pattern unsecuredCharPattern = Pattern.compile(UNSECURED_CHAR_REGULAR_EXPRESSION, Pattern.CASE_INSENSITIVE);
		
		Map<String, Object> fMap = new HashMap<String, Object>();  // upload file 정보 Map
		Map<String, Object> jMap = new HashMap<String, Object>();  // json String to Map
		Map<String, Object> qMap = new HashMap<String, Object>();  // request Map
		Map<String, Object> sMap = new HashMap<String, Object>();  // sessionInfo Map
		Map<String, Object> tMap = new HashMap<String, Object>();  // total Map
		
		SessionVo sessionDto = (SessionVo) req.getSession().getAttribute("sessionDto");
		if (sessionDto != null) {
			sMap.put("login_usr_id", StringUtils.defaultString(sessionDto.getLogin_usr_id(), ""));
			sMap.put("login_usr_nm", StringUtils.defaultString(sessionDto.getLogin_usr_nm(), ""));
			sMap.put("login_usr_ip", StringUtils.defaultString(sessionDto.getLogin_usr_ip(), ""));
		}
		tMap.put("sMap", sMap);
		
	    if (ServletFileUpload.isMultipartContent(req)) {
	    	tMap.putAll(getFileInfos(req));
	    } else {
			int page = 0;
	    	
			Enumeration<String> paramNames = req.getParameterNames();
			while (paramNames.hasMoreElements()) {
				String lsKey = paramNames.nextElement();
			    String lsVal = req.getParameter(lsKey);
				if ("page".equals(lsKey)) {
				    page = (lsVal != null) ? NumberUtils.toInt(lsVal, page) : page;
				} else if ("rows".equals(lsKey)) {
					rows = (lsVal != null) ? NumberUtils.toInt(lsVal, rows) : rows;
				} else if ("pJson".equals(lsKey)) {
					if (StringUtils.isNotEmpty(lsVal)) {
						try {
							lsVal = URLDecoder.decode(CommonUtil.nullString(lsVal), "UTF-8");
							lsVal = StringUtils.replace(lsVal, "&quot;", "\"");
							gbLogger.debug("========================================================================================================");
							gbLogger.debug(lsVal);
							gbLogger.debug(req.getRequestURI());
							gbLogger.debug("========================================================================================================");
							
							jMap = objectMapper.readValue(lsVal, Map.class);

						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				} else if ("sidx".equals(lsKey) || "sord".equals(lsKey)) {
				    Matcher matcher = unsecuredCharPattern.matcher(lsVal);
				    lsVal = matcher.replaceAll("");
					qMap.put(lsKey, CommonUtil.nullString(lsVal));
				} else {
					qMap.put(lsKey, CommonUtil.nullString(lsVal));
				}
			}
			
			// 20150812_jyjung 쿼리 동적 사용을 위해 예외처리 합니다.
			// 해당 필드들을 동적으로 셋팅하여 쿼리를 페이징용도의 쿼리인지 일반쿼리인지 구분하여 사용합니다.
			// 페이징이 필요한 경우 클라이언트에서 해당 필드들을 셋팅하여 요청 합니다.
			if(page != 0)
			{
				qMap.put("page", page);
				qMap.put("rows", rows);
				qMap.put("pageSize", rows);
				qMap.put("pos", (page - 1) * rows);
				qMap.put("limit", rows);
			}
			
			tMap.put("fMap", fMap);
			tMap.put("jMap", jMap);
			tMap.put("qMap", qMap);
			tMap.put("sMap", sMap);
	    }
		return tMap;
	}

//	@ModelAttribute("requestParams")
	protected Map<String, Object> getRequestParams(HttpServletRequest req) {
		Map<String, Object> rMap = new HashMap<String, Object> ();
		try {
			rMap = getRequestParams(req, rowsPage);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return rMap;
	}

	protected String getViewPath(String pPath, String sStr, String eStr) {
		if (StringUtils.isEmpty(pPath)) {
			return "";
		}
		return pPath.substring(pPath.indexOf(sStr) + sStr.length() + 1, pPath.indexOf(eStr));
	}

	@ExceptionHandler(AuthException.class)
	public ModelAndView authExceptionHandler(HttpServletRequest req, AuthException e) {
		if (e.isNormal()) {
			ModelAndView modelAndView = new ModelAndView("/common/redirect");
			UrlPathHelper urlPathHelper = new UrlPathHelper();
			String redirectUrl = urlPathHelper.getOriginatingRequestUri(req);
			try {
				modelAndView.addObject("redirect:/user/login.jsp?redirectUrl=" + URLEncoder.encode(redirectUrl, "UTF-8"));
			} catch (UnsupportedEncodingException e1) {
				e1.printStackTrace();
			}
			return modelAndView;
		}
		if (e.isAjax()) {
			ModelAndView modelAndView = new ModelAndView("/data/json/alert");
			modelAndView.addObject("message", "로그인이 필요합니다.");
			return modelAndView;
		}

		gbLogger.error("에러가 발생하였습니다.", e);
		ModelAndView modelAndView = new ModelAndView("/common/alert");
		modelAndView.addObject("message", "에러가 발생하였습니다.");
		modelAndView.addObject("description", ExceptionUtils.getStackTrace(e));
		return modelAndView;
	}

	@ExceptionHandler(MsgException.class)
	public ModelAndView msgExceptionHandler(HttpServletRequest req, MsgException e) {
		ModelAndView modelAndView = new ModelAndView("/data/json/alert");
		modelAndView.addObject("message", e.getMessage());
		return modelAndView;
	}

	@ExceptionHandler(RedirectException.class)
	public ModelAndView redirectExceptionHandler(HttpServletRequest req, RedirectException e) {
		ModelAndView modelAndView = new ModelAndView();
		if (req.getServletPath().endsWith("Proc.jsp")) {
			modelAndView.setViewName("/data/json/redirect");
		} else {
			modelAndView.setViewName("/common/redirect");
		}

		modelAndView.addObject("message", e.getMessage());
		if (e.getRedirectUrl() == null || e.getRedirectUrl().length() == 0) {
			modelAndView.addObject("redirectUrl", StringUtils.defaultIfEmpty(req.getParameter("redirectUrl"), ""));
		} else {
			modelAndView.addObject("redirectUrl", e.getRedirectUrl());
		}

		return modelAndView;
	}

	@ExceptionHandler(CallbackException.class)
	public ModelAndView callbackExceptionHandler(HttpServletRequest req, CallbackException e) {
		ModelAndView modelAndView = new ModelAndView("/data/json/callback");

		modelAndView.addObject("message", e.getMessage());
		if (e.getCallback() == null || e.getCallback().length() == 0) {
			modelAndView.addObject("callback", StringUtils.defaultIfEmpty(req.getParameter("callback"), ""));
		} else {
			modelAndView.addObject("callback", e.getCallback());
		}
		modelAndView.addObject("data", e.getData());

		return modelAndView;
	}

	@ExceptionHandler(Exception.class)
	public ModelAndView exceptionHandler(HttpServletRequest req, HttpServletResponse res, Exception e) {
		if (req.getServletPath().endsWith("List.jsp")) {
			gbLogger.error("에러가 발생하였습니다.", e);
			ModelAndView modelAndView = new ModelAndView("/data/json/alert");
			modelAndView.addObject("message", "에러가 발생하였습니다.");
			return modelAndView;
		} else {
			gbLogger.error("에러가 발생하였습니다.", e);
			res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return null;
		}
	}


}
