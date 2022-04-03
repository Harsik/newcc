<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@ page import="kr.co.twoksystem.utils.Aria" %>

<% 
	//아리아의 암/복호화에는 키값이 필요합니다. (키값을 위와 같이 원하는 Stirng값으로 설정합니다.)	
	String key = "amVqdTEyMGNhbGxjZW50ZXI=";
	
	Aria aria = new Aria(key);
	
	String ouCode     = request.getParameter("ouCode")==null?"1":request.getParameter("ouCode"); 
	String uid       = request.getParameter("uid")==null?"1":request.getParameter("uid"); 
%>



<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
	<title>공무원 업무</title>
	<link rel="icon" href="/resources/images/favicon.ico">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/myinfo.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.css" type="text/css"/>
	
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/dext5editor/js/dext5editor.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>

</head>

<script type="text/javascript">




$(document).ready(function(){

	$("#btnEaria").on("click",  function () {
		 document.frm.submit(); 
		
<%		
	//암호화	
	String ariaEouCode = aria.Encrypt(ouCode);
	String ariaEuid = aria.Encrypt(uid);
	String ariaE = "ouCode=" + ariaEouCode + "&uid=" + ariaEuid; 
%>	
		
	});
	
	$("#btnDaria").on("click",  function () {
		 document.frm.submit(); 
<%
		//복호화	
		String ariaD = "ouCode=" + aria.Decrypt(ariaEouCode) + "&uid=" + aria.Decrypt(ariaEuid); 
%>		
		
	});	
	
});


</script>

<body>
	<div id="h1">민원센터 AriaSample</div>
	<div id="pop_body" style="height: 140px;">
	
<form name="frm" method="post">
		ouCode<input type="text" id="ouCode" name="ouCode" value="<%=ouCode%>"/>
		uid<input type="text" id="uid" name="uid" value="<%=uid%>"/>
		<br/><br/>
		<button type="button" id="btnEaria" class="button">암호화</button><span><%=ariaE%> </span>
		
		<br/> <br/>              
        <button type="button" id="btnDaria" class="button">복호화</button><span><%=ariaD%> </span>
</form>		
	</div>
</body>
</html>