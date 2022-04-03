<%@ page import="com.dext5.DEXT5GZipHandler" %><% 

	DEXT5GZipHandler dext5 = new DEXT5GZipHandler();
	String result = dext5.Process(request, response, application);
	
	if(!result.equals("")) {
		out.print(result);
	} else {
		out.clear();
	}

%>