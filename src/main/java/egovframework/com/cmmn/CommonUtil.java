package egovframework.com.cmmn;

public class CommonUtil
{
	public static String nullString(String szOrg)
	{
		return isNull(szOrg) ? "" : szOrg;
	}

	public static boolean isNull(String str)
	{
		if(str == null)
			return true;
		
		return str.trim().equals("") || str.trim().equalsIgnoreCase("null");
	}
}
