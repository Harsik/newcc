package kr.co.twoksystem.exception;

public class CallbackException extends RuntimeException {
	private static final long serialVersionUID = 6288539278746574123L;

	private String callback;
	private Object data;

	/**
	 * 
	 * @param msg
	 *            브라우저에 alert할 메시지
	 * @param callback
	 *            브라우저에서 실행할 callback 함수
	 */
	public CallbackException(String msg, String callback) {
		super(msg);
		this.callback = callback;
	}

	/**
	 * 
	 * @param msg
	 *            브라우저에 alert할 메시지
	 * @param callback
	 *            브라우저에서 실행할 callback 함수
	 * @param data
	 *            브라우저에서 실행할 callback 함수가 인자로 넘겨 받는 값
	 */
	public CallbackException(String msg, String callback, Object data) {
		super(msg);
		this.callback = callback;
		this.data = data;
	}

	public String getCallback() {
		return callback;
	}

	public Object getData() {
		return data;
	}
}
