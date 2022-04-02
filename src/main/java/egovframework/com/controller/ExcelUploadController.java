package egovframework.com.controller;

import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.co.twoksystem.controller.GlobeeController;
import kr.co.twoksystem.service.IExcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
@RequestMapping(value = "/xlUpload")
public class ExcelUploadController extends GlobeeController
{
	@Autowired
	protected IExcelService excelService;

	@RequestMapping(value = "/**/*.do")
	public void serviceCommon(HttpServletRequest req, HttpServletResponse res) throws Exception
	{
		gbLogger.debug("execute ExcelUploadController.serviceCommon xlUpload RequestMethodMethod Get & Post!!");
		
		ObjectMapper objectMapper = new ObjectMapper();
		
		Map<String, Object> tMap = getRequestParams(req);
		
		Map<String, Object> rMap = excelService.xlService(tMap);
		res.setContentType("text/html");
		res.setCharacterEncoding("utf-8");
		
		try(PrintWriter pw = res.getWriter())
		{
			pw.print(objectMapper.writeValueAsString(rMap));
			pw.flush();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}
}