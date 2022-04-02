package kr.co.twoksystem.view;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Repository;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.servlet.view.AbstractView;

@Repository("htmlExcelDownloadView")
public class HtmlExcelDownloadView extends AbstractView {

	private String createFileName(String param_str) {
        SimpleDateFormat fileFormat = new SimpleDateFormat("yyyyMMdd_HHmmss_SSS");
        return new StringBuilder(param_str).append("_").append(fileFormat.format(new Date())).append(".xls").toString();
    }

	public HtmlExcelDownloadView() {
		setContentType("application/download; charset=utf-8");
	}

	@Override
	protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response) throws Exception {
	    request.setCharacterEncoding("utf-8");
	    
	    String sHtml      = (request.getParameter("html") != null) ? request.getParameter("html") : "<table><tr><td>no data</td></tr></table>";
	    String sFileName  = (request.getParameter("filename") != null) ? (String)request.getParameter("filename") : "Excel";
	    
	    String tmpDir  = System.getProperty("java.io.tmpdir");
//System.out.println("tmpDir.substring(tmpDir.length()):" + tmpDir.substring(tmpDir.length()-1));
	    String tmpFile = tmpDir + createFileName("excel");
	    System.out.println("java.io.tmpdir:#" + tmpDir + "#, tmpFile:#" + tmpFile + "#,  sFileName:#" + sFileName);
	    FileWriter fw = new FileWriter(tmpFile);
	    fw.write(sHtml);
	    fw.close();
	    
		File file = new File(tmpFile);

		response.setContentType("text/html;charset=utf-8");
		response.setContentLength((int) file.length());

		response.setHeader("Content-Disposition", "attachment; filename=\"" + new String(sFileName.getBytes("euc-kr"),"8859_1") + ".xls\";");
		response.setHeader("Content-Transfer-Encoding", "binary");
		OutputStream out = response.getOutputStream();
		FileInputStream fis = null;
		try {
			fis = new FileInputStream(file);
			FileCopyUtils.copy(fis, out);
		} finally {
			if (fis != null)
				try {
					fis.close();
				} catch (IOException ex) {
				}
		}
		out.flush();
	}
    
}
