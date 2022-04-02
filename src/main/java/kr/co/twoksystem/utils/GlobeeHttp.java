package kr.co.twoksystem.utils;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

public class GlobeeHttp {
    private final static String HTTP_METHOD = "post";
	private final static String USER_AGENT = "Mozilla/5.0";

	public static String getHttpContent(String uri) throws Exception {
		Map<String, Object> param = null;
		return getHttpContent(uri, HTTP_METHOD, param);
	}

	public static String getHttpContent(String uri, Map<String, Object> param) throws Exception {
		return getHttpContent(uri, HTTP_METHOD, param);
	}

	public static String getHttpContent(String uri, String method) throws Exception {
		Map<String, Object> param = null;
		if (HTTP_METHOD.equalsIgnoreCase(method)) {
			return getHttpContent(uri, method, param);
		} else {
			return getHttpContent(uri, method, param);
		}
	}

	public static String getHttpContent(String uri, String method, Map<String, Object> param) throws Exception {
		if (HTTP_METHOD.equalsIgnoreCase(method)) {
			if (param == null) {
				return methodPostHttp(uri);
			} else {
				return methodPostHttp(uri, param);
			}
		} else {
			return methodGetHttp(uri, param);
		}
	}

	private static String methodGetHttp(String uri, Map<String, Object> param) throws Exception {
        String rMsg = "";
        CloseableHttpClient httpclient = HttpClients.createDefault();
        HttpGet httpGet = new HttpGet(uri);
        CloseableHttpResponse response = httpclient.execute(httpGet);
        try {
            System.out.println(response.getStatusLine());
            int status = response.getStatusLine().getStatusCode();
            if (status >= 200 && status < 300) {
                HttpEntity entity = response.getEntity();
                InputStream is = entity.getContent();
                rMsg = is.toString();
                System.out.println(EntityUtils.toString(entity) + "\nrMsg:" + rMsg);
                EntityUtils.consume(entity);
            } else {
                throw new ClientProtocolException("Unexpected response status: " + status);
            }
        } finally {
            response.close();
            httpclient.close();
        }
		return rMsg;
	}

	private static String methodPostHttp(String uri, Map<String, Object> param) throws Exception {
        String rMsg = "";
        CloseableHttpClient httpclient = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost(uri);
        List <NameValuePair> nvps = new ArrayList <NameValuePair>();
        for(Entry<String, Object> entry : param.entrySet()) {
            nvps.add(new BasicNameValuePair(entry.getKey(), (String) entry.getValue()));
        }
        httpPost.setEntity(new UrlEncodedFormEntity(nvps));
        CloseableHttpResponse response = httpclient.execute(httpPost);
        try {
            System.out.println(response.getStatusLine());
            int status = response.getStatusLine().getStatusCode();
            if (status >= 200 && status < 300) {
    			BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent(), "utf-8"));
    			StringBuffer result = new StringBuffer();
    			String line = "";
    			while ((line = rd.readLine()) != null) {
    				result.append(line);
    			}
    			rMsg = result.toString();
            } else {
                throw new ClientProtocolException("Unexpected response status: " + status);
            }
        } finally {
            response.close();
            httpclient.close();
        }
		return rMsg;
	}

	public static String methodPostHttp(String psUri) throws Exception {
        String rMsg = "";
        CloseableHttpClient httpclient = HttpClients.createDefault();
		HttpPost httpPost = new HttpPost(psUri);
        CloseableHttpResponse response = httpclient.execute(httpPost);
        try {
        	httpPost.setHeader("User-Agent", USER_AGENT);
			System.out.println("Response Code : " + response.getStatusLine().getStatusCode());
			BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent(), "utf-8"));
			StringBuffer result = new StringBuffer();
			String line = "";
			while ((line = rd.readLine()) != null) {
				result.append(line);
			}
			rMsg = result.toString();
        } finally {
            response.close();
            httpclient.close();
        }
		return rMsg;

	}
}
