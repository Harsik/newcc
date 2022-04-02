package kr.co.twoksystem.exception;

public class AuthException extends RuntimeException {
	private static final long serialVersionUID = 5111988884718165268L;

	public static int NORMAL = 1;
	public static int AJAX = 2;

	private int type;

	public AuthException(int type, String msg) {
		super(msg);
		this.type = type;
	}

	public boolean isNormal() {
		return (type == NORMAL);
	}

	public boolean isAjax() {
		return (type == AJAX);
	}
}
