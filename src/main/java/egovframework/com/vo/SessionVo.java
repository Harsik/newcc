package egovframework.com.vo;

import java.io.Serializable;


public class SessionVo implements Serializable {

	private static final long serialVersionUID = 1L;

	private String login_usr_id;
	private String login_usr_nm;
	private String login_usr_ip;
	
	public String getLogin_usr_id() {
		return login_usr_id;
	}
	public void setLogin_usr_id(String login_usr_id) {
		this.login_usr_id = login_usr_id;
	}
	public String getLogin_usr_nm() {
		return login_usr_nm;
	}
	public void setLogin_usr_nm(String login_usr_nm) {
		this.login_usr_nm = login_usr_nm;
	}
	public String getLogin_usr_ip() {
		return login_usr_ip;
	}
	public void setLogin_usr_ip(String login_usr_ip) {
		this.login_usr_ip = login_usr_ip;
	}


}
