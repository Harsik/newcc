package kr.co.twoksystem.config;

import java.util.ResourceBundle;

import org.apache.commons.lang.StringUtils;

public class Config {

	public static final String SERVICE_PACKAGE;
	public static final String BIZ_PACKAGE;
	public static final String PATH_FILE_UPLOAD;
	public static final int DBMS_COUNT;
	public static final String DBMS_DEFAULT;
	public static final String LBS_SERVERIP;
	public static final int LBS_SERVERPORT;
	public static final int LBS_CONNECT_TIMEOUT;
	public static final int LBS_READ_TIMEOUT;
	public static final String LBS_REQ_COMPANYID;
/*
	public static final String DBMS_MARIADB = "00";
	public static final String DBMS_ORACLE = "01";
	public static final String DBMS_SQLSERVER = "02";
	public static final String DBMS_SYBASE = "03";
	public static final String DBMS_DB2 = "04";
*/
	static {
		try {
			String propNm = "webapp";
			ResourceBundle res = ResourceBundle.getBundle(propNm);

			SERVICE_PACKAGE = StringUtils.trimToEmpty(res.getString("servicePackage"));
			BIZ_PACKAGE = StringUtils.trimToEmpty(res.getString("bizPackage"));
			PATH_FILE_UPLOAD = StringUtils.trimToEmpty(res.getString("pathFileUpload"));
			DBMS_COUNT = Integer.parseInt(StringUtils.trimToEmpty(res.getString("dbmsCount")), 10);
			DBMS_DEFAULT = StringUtils.trimToEmpty(res.getString("dbmsDefault"));
			LBS_SERVERIP = StringUtils.trimToEmpty(res.getString("LBS_serverIP"));
			LBS_SERVERPORT = Integer.parseInt(StringUtils.trimToEmpty(res.getString("LBS_serverPort")), 10);
			LBS_CONNECT_TIMEOUT = Integer.parseInt(StringUtils.trimToEmpty(res.getString("LBS_CONNECT_TIMEOUT")), 10);
			LBS_READ_TIMEOUT = Integer.parseInt(StringUtils.trimToEmpty(res.getString("LBS_READ_TIMEOUT")), 10);
			LBS_REQ_COMPANYID = StringUtils.trimToEmpty(res.getString("LBS_REQ_CompanyID"));
			
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new RuntimeException("Error.. initializing com.globee.core.config.Config class. cause : " + ex);
		}
	}

}
