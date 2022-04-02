package kr.co.twoksystem.view;

import java.io.*;
import java.net.URLEncoder;
import java.util.Map;

import javax.servlet.http.*;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.servlet.view.AbstractView;

@Repository("downloadView")
public class DownloadView extends AbstractView {

	public DownloadView() {
		setContentType("application/download; charset=utf-8");
	}

	@Override
	protected void renderMergedOutputModel(Map<String, Object> model,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		
		String fileName = (String) model.get("locFileName");
		fileName = URLEncoder.encode(fileName, "utf-8");
		
		String svrFilePath = (String) model.get("svrFilePath");
		svrFilePath = StringUtils.replace(svrFilePath, "//", "/");
		File file = new File(svrFilePath);

		response.setContentType(getContentType());
		response.setContentLength((int) file.length());

		response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\";");
		response.setHeader("Content-Transfer-Encoding", "binary");

		try (OutputStream out = response.getOutputStream();
			 FileInputStream fis = new FileInputStream(file)) {
			FileCopyUtils.copy(fis, out);
			out.flush();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
