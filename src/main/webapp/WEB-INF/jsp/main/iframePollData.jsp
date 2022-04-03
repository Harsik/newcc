<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
 response.setHeader("Cache-Control","no-cache");
 response.setHeader("Pragma","no-cache");
 response.setDateHeader("Expires",0);
%>

<!DOCTYPE html>

<html lang="ko">
	<head>

 		<title>온누리콜센터</title>
 		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
 		<meta http-equiv="Expires" content="Mon, 06 Jan 1990 00:00:01 GMT">
		<meta http-equiv="Expires" content="-1">
		<meta http-equiv="Pragma" content="no-cache">
		<meta http-equiv="Cache-Control" content="no-cache">

		<link rel="icon" href="/resources/images/favicon.ico">
 		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jstree/themes/default/style.custom.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.css" type="text/css"/>

		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jstree/jstree.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/dext5editor/js/dext5editor.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
				
		<!-- SoftPhone 관련 스크립트 -->
		<script type="text/javascript" src="<c:url value='/resources/js/cti/ws_cti.js'/>"></script>
		<!-- 녹취 관련 스크립트 -->
		<!-- 
		<script type="text/javascript" src="<c:url value='/resources/js/rec/VOC_RecSeeInterfaceWeb.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/rec/VOC_RecSeeClient.js'/>"></script>
	    -->

		<!-- --> 
		<script type="text/javascript" src="<c:url value='/resources/js/cti/WS_softPhone.js'/>"></script>
		 
		<%-- <script type="text/javascript" src="<c:url value='/resources/js/main/CallMain.js'/>"></script> --%>
		<script type="text/javascript" src="<c:url value='/resources/js/main/iframePollData.js'/>"></script>
		 
	</head>

	<body style="background-color: #17469E;">
		<div class="standby_num" id="custCount">대기고객 <p id="ifrLabMainWaitingCustCount">0</p></div>
	</body>	
	
			 
</html>