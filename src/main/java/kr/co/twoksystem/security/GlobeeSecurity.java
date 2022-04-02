package kr.co.twoksystem.security;

import java.security.MessageDigest;

import org.apache.commons.codec.binary.Base64;

public class GlobeeSecurity {
    /**
     * 비밀번호를 암호화하는 기능(복호화가 되면 안되므로 SHA-256 인코딩 방식 적용)
     *
     * @param password 암호화될 패스워드
     * @param id salt로 사용될 사용자 ID 지정
     * @return
     * @throws Exception
     */
    public static String encryptPassword(String password, String id) throws Exception {

		if (password == null) {
		    return "";
		}

		byte[] hashValue = null; // 해쉬값

		MessageDigest md = MessageDigest.getInstance("SHA-256");

		md.reset();
		md.update(id.getBytes());

		hashValue = md.digest(password.getBytes());

		return new String(Base64.encodeBase64(hashValue));
    }

    /**
     * 데이터를 암호화하는 기능
     *
     * @param byte[] data 암호화할 데이터
     * @return String result 암호화된 데이터
     * @exception Exception
     * @example
     * String encStr = encodeBinary(mobile_no.getBytes());
     */
    public static String encodeBinary(byte[] data) throws Exception {
		if (data == null) {
		    return "";
		}

		return new String(Base64.encodeBase64(data));
    }

    /**
     * 데이터를 복호화하는 기능
     *
     * @param String data 복호화할 데이터
     * @return String result 복호화된 데이터
     * @exception Exception
     * @example
     * String decStr = new String(decodeBinary(encodeBinary(mobile_no.getBytes())));
     */
    public static byte[] decodeBinary(String data) throws Exception {
		if (data == null) {
		    return "".getBytes();
		}
    	return Base64.decodeBase64(data.getBytes());
    }

}
