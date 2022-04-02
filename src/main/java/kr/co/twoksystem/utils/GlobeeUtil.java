package kr.co.twoksystem.utils;

import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
//import java.nio.file.DirectoryStream;
//import java.nio.file.FileSystem;
//import java.nio.file.FileSystems;
//import java.nio.file.FileVisitResult;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.SimpleFileVisitor;
//import java.nio.file.StandardWatchEventKinds;
//import java.nio.file.WatchEvent;
//import java.nio.file.WatchKey;
//import java.nio.file.WatchService;
//import java.nio.file.attribute.BasicFileAttributes;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;

public class GlobeeUtil {

	private static final String HTTP_CONTENT_TYPE = "application/json; charset=UTF-8";
	private static final String CHARSET = "UTF-8";

	public static String getCurrentTimeStamp(String fmtStr) {
		SimpleDateFormat sdfDate = new SimpleDateFormat(fmtStr);
		return sdfDate.format(new Date());
	}
	public static String getCurrentTimeStamp() {
		String frmStr = "yyyy-MM-dd HH:mm:ss.SSS";
		return getCurrentTimeStamp(frmStr);
	}

	public static String getUniqueSeq() {
		String ls_ret = getCurrentTimeStamp("yyyyMMdd.HHmmss.SSS");
		Random random = new Random();
		ls_ret += String.format("%05d", random.nextInt(100000));
		return ls_ret;
	}

	public static Map<String, Object> mergeMap(Map<String, Object> map1, Map<String, Object> map2) {
	    Map<String, Object> mergeMap = new HashMap<String, Object>();
		mergeMap.putAll(map1);
		mergeMap.putAll(map2);
		return mergeMap;
	}
	public static void getMapInfo(Map<String, Object> map) {
	    for(String key : map.keySet()) {
            System.out.printf("키 : %s, 값 : %s\n", key, map.get(key));
        }
	}

	public static Map<String, Object> getMapFromObject(Object poClass) {
		Map<String, Object> map = new HashMap<String, Object>();
		if (poClass == null)
			return null;
		try {
			for (Field field : poClass.getClass().getDeclaredFields()) {
				if (Modifier.isStatic(field.getModifiers()))
					continue;
				String lsFieldName = field.getName();
				// setMethods Parameter에 맞게 선언된 method를 찾아서 파라메터 넘겨주면서 method 호출
				Class<?> loClass = field.getType();
				Class<?>[] laClass = new Class[1];
				laClass[0] = loClass;
				String methodName = "set"
						+ lsFieldName.substring(0, 1).toUpperCase()
						+ lsFieldName.substring(1);
				Method method = poClass.getClass().getDeclaredMethod(
						methodName, laClass);
				Object srcFieldObj = method.invoke(poClass,
						lsFieldName.toUpperCase());
				// getMethods Parameter없으므로 파라메터없이 method 호출
				methodName = "get" + lsFieldName.substring(0, 1).toUpperCase()
						+ lsFieldName.substring(1);
				method = poClass.getClass().getDeclaredMethod(methodName);
				srcFieldObj = method.invoke(poClass);
				map.put(lsFieldName, srcFieldObj);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	}

	public static int responseMapWrite(HttpServletResponse response,
			Map<String, Object> map) {
		response.setContentType(HTTP_CONTENT_TYPE);
		response.setCharacterEncoding(CHARSET);
		int liLength = 0;

		PrintWriter out = null;
		try {
			out = response.getWriter();
			ObjectMapper objectMapper = new ObjectMapper();
			String lsResult = objectMapper.writeValueAsString(map);
			liLength = lsResult.length();
			out.println(lsResult);
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return liLength;
	}

}
