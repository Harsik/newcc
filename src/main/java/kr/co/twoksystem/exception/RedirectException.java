package kr.co.twoksystem.exception;

public class RedirectException extends RuntimeException {

	private static final long serialVersionUID = -9099766281866162877L;
	
	private String redirectUrl;

	public RedirectException(String msg, String redirectUrl) {
		super(msg);
		this.redirectUrl = redirectUrl;
	}

	public String getRedirectUrl() {
		return redirectUrl;
	}

}
