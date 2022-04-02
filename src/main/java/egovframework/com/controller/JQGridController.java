package egovframework.com.controller;

import java.io.PrintWriter;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.twoksystem.controller.GlobeeController;
import kr.co.twoksystem.service.IGlobeeService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.com.cmm.CommonUtil;

@Controller
@RequestMapping(value="/jqgrid")
public class JQGridController extends GlobeeController
{
    @Autowired
    protected IGlobeeService commomService;
    
   @SuppressWarnings("unchecked")
   @RequestMapping(value="/**/*.do")
   public void serviceCommon(@RequestParam(value="pJson", required=false) String pJson, HttpServletRequest req, HttpServletResponse res) throws Exception
   {
      gbLogger.debug("execute JQGridController.serviceCommon jqgrid RequestMethodMethod Get & Post!!");
      
      ObjectMapper objectMapper = new ObjectMapper();
      Map<String, Object> pMap = new HashMap<String, Object>();
      
      if(StringUtils.isNotEmpty(pJson))
         pMap = objectMapper.readValue(URLDecoder.decode(CommonUtil.nullString(pJson), "UTF-8"), Map.class);

      pMap.putAll(getRequestParams(req));
      pMap.remove("pJson");
      
      ((Map<String, Object>)pMap.get("map")).put("PAGE", pMap.get("page"));
      ((Map<String, Object>)pMap.get("map")).put("ROWS", pMap.get("rows"));
      ((Map<String, Object>)pMap.get("map")).put("SIDX", pMap.get("sidx"));
      ((Map<String, Object>)pMap.get("map")).put("SORD", pMap.get("sord"));
      
      Map<String, Object> rMap = commomService.service(pMap);
      List<?> al = (List<?>)rMap.get("result");
      HashMap<String, Object> prop = new HashMap<String, Object>();
      
      String page = "";
      String total = "";
      String records = "";
      
      if(al != null && al.size() > 0)
      {
         prop = (HashMap<String, Object>)al.get(0);
         page = prop.get("PAGENUM").toString();
         total = prop.get("TOTPAGECOUNT").toString();
         records = prop.get("TOTROWCOUNT").toString();
      }
      else
      {
         prop = new HashMap<String, Object>();
         
         page = "1";
         total = "0";
         records = "0";
      }
      
      // 반환타입으로 변환
      JSONArray ja = new JSONArray();
      ja = JSONArray.fromObject(changeToUpperMapKey(rMap.get("result")));
      JSONObject resultJson = new JSONObject();
      resultJson.put("rows", ja);
      resultJson.put("page", page);
      resultJson.put("total", total);
      resultJson.put("records", records);
      
      res.setContentType("text/html");
      res.setCharacterEncoding("utf-8");
      
      try(PrintWriter pw = res.getWriter())
      {
         pw.print(resultJson);
         pw.flush();
      }
      catch(Exception e)
      {
         e.printStackTrace();
      }
   }
}