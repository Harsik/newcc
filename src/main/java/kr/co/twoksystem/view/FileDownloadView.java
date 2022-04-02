package kr.co.twoksystem.view;

import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Repository;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.servlet.view.AbstractView;

@Repository("fileDownloadView")
public class FileDownloadView extends AbstractView {

	public FileDownloadView() {
		setContentType("application/download; charset=utf-8");
	}
	
	@SuppressWarnings("unchecked")
	@Override
	protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		HashMap<String, Object> lm_result = new HashMap<String, Object>();
		lm_result = (HashMap<String, Object>) model.get("result");
		if (lm_result != null) {
	        String ls_local_name  = (String) lm_result.get("LOCFL_NM");;
			String ls_server_path = (String) lm_result.get("SVRFL_PTH");
	        
	        File lf_server = new File(ls_server_path);
	        if (lf_server.exists()) {
				response.setContentType(getContentType());
				response.setContentLength((int) lf_server.length());
				
				String userAgent = request.getHeader("User-Agent");
				boolean ie = userAgent.indexOf("MSIE") > -1;
				if (ie) {
					ls_local_name = URLEncoder.encode(ls_local_name, "utf-8");
					ls_local_name = StringUtils.replace(ls_local_name, "+", " ");
				} else {
					ls_local_name = new String(ls_local_name.getBytes("utf-8"), "iso-8859-1");
				}
				response.setHeader("Content-Disposition", "attachment; filename=\"" + ls_local_name + "\";");
				response.setHeader("Content-Transfer-Encoding", "binary");

				
				OutputStream out = response.getOutputStream();
				FileInputStream fis = null;
				try {
					fis = new FileInputStream(ls_server_path);
					FileCopyUtils.copy(fis, out);
				} finally {
					if (fis != null)
						try {
							fis.close();
						} catch (Exception ex) {
						}
				}
				out.flush();
				out.close();
	        }
		}
	}

}
