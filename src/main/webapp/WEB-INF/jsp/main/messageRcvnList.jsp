<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<title>쪽지 수신확인</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
			
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/main/messageRcvnList.js'/>"></script>
		
	</head>
	
	<body>
	 <% String note_id = request.getParameter("NOTE_ID"); %>
	 <c:set var="note_id" value="<%=note_id%>" />
   <input type="hidden" id="tfNoteId" value="${note_id }" style="height: 0px;" alt="ID" title="ID">
   
   <div id="h1">쪽지 수신확인</div>
  	 <!--그리드-->
	    <div id="pop_body" style="min-height: 325px;">
			  <!-- 그리드테이블 -->
			  <table id="rcvnConfirmList"></table>
			  <div id="pgRcvnConfirmList"></div>
			  <!--"그리드테이블"-->
       </div><!--"그리드"-->
	</body>
</html> 