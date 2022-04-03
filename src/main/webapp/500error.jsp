<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page isErrorPage="true" %>
<%@ page import="org.apache.log4j.Logger" %>
<%
Logger logger = Logger.getLogger(this.getClass());
logger.debug(exception.getClass().getName());
logger.debug(exception.getMessage());

%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Error Page</title>
</head>
<body>
<p>500 Not Found</p>
<h3>요청 처리 과정에서 에러가 발생하였습니다.</h3>
<%
	response.setStatus(HttpServletResponse.SC_OK);
%>
</body>
</html>