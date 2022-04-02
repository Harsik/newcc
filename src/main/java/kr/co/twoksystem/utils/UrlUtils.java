package kr.co.twoksystem.utils;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
/**
 * 1. getSuffix
 * 2. getViewName
 * 3. getMenuName
 * */
public class UrlUtils {

	public static String getSuffix(String path) {
		try {
			return path.substring(path.lastIndexOf("."));
		} catch (Exception e) {
			return "";
		}
	}
	
	public static String getBoardType(HttpServletRequest req, String prefix, String suffix) {
		try {
			String path = req.getServletPath();
			if (path.startsWith(prefix) == false || path.endsWith(suffix) == false) {
				return "";
			}
			path = path.substring(prefix.length());
			return path.substring(0, path.indexOf(suffix));
		} catch (Exception e) {
			return "";
		}
	}
	
	public static String getMenuName(String path, String prefix, String suffix) {
		try {
			if (path.startsWith(prefix) == false || path.endsWith(suffix) == false) {
				return "";
			}
			path = path.substring(prefix.length());
			return path.substring(0, path.indexOf(suffix));
		} catch (Exception e) {
			return "";
		}
	}
	
	public static String getMenuName(String path, String prefix) {
		try {
			String suffix = "/" + getViewName(path) + getSuffix(path);
			if (path.startsWith(prefix) == false || path.endsWith(suffix) == false) {
				return "";
			}
			return getMenuName(path, prefix, suffix);
		} catch (Exception e) {
			return "";
		}
	}
	
	public static String getMenuName(HttpServletRequest req, String prefix) {
		try {
			String path = req.getServletPath();
			String suffix = "/" + getViewName(req) + getSuffix(req);
			if (path.startsWith(prefix) == false || path.endsWith(suffix) == false) {
				return "";
			}
			return getMenuName(path, prefix, suffix);
		} catch (Exception e) {
			return "";
		}
	}

	public static String getViewName(String path, String suffix) {
		try {
			if (path.endsWith(suffix) == false) {
				return "";
			}
			return path.substring(path.lastIndexOf("/") + 1, path.lastIndexOf(suffix));
		} catch (Exception e) {
			return "";
		}
	}

	public static String getViewName(String path) {
		try {
			String suffix = getSuffix(path);
			if (path.endsWith(suffix) == false) {
				return "";
			}
			return getViewName(path, suffix);
		} catch (Exception e) {
			return "";
		}
	}

	public static String getViewName(HttpServletRequest req, String suffix) {
		try {
			String path = req.getServletPath();
			if (path.endsWith(suffix) == false) {
				return "";
			}
			return getViewName(path, suffix); 
		} catch (Exception e) {
			return "";
		}
	}

	public static String getViewName(HttpServletRequest req) {
		return getViewName(req, getSuffix(req));
	}

	public static String getSuffix(HttpServletRequest req) {
		try {
			return getSuffix(req.getServletPath());
		} catch (Exception e) {
			return "";
		}
	}

	public static String encode(String url) {
		if (url == null) {
			return "";
		}
		try {
			return URLEncoder.encode(url, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			return "";
		}
	}

	public static String decode(String url) {
		if (url == null) {
			return "";
		}
		try {
			return URLDecoder.decode(url, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			return "";
		}
	}
}
