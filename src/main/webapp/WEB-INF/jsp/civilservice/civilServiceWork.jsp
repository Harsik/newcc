<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<% 
// 	String ouCode  = request.getParameter("ouCode");
// 	String uid  = request.getParameter("uid");
// 	String fromDiv  = request.getParameter("fromDiv");
%>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta http-equiv="Cache-Control" content="no-cache"/>
<meta http-equiv="Expires" content="0"/>
<meta http-equiv="Pragma" content="no-cache"/>

<meta charset="UTF-8">
	<title>공무원 업무</title>
	<link rel="icon" href="/resources/images/favicon.ico">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/myinfo.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.css" type="text/css"/>
 		
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-1.12.4.min.js'/>"></script>
 	<script type="text/javascript" src="<c:url value='/resources/js/lib/json3.js'/>"></script>
<%-- 	<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/jquery.jqgrid4.7.min.js'/>"></script> --%>
<%-- 	<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/grid4.7.locale-en.js'/>"></script>  --%>
	
 	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script> 
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
	
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/dext5editor/js/dext5editor.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/moment.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/civilservice/civilServiceWork.js'/>"></script>
	<style>
			.ui-tabs-nav
			{
				background:#fff;
				border:0;
			}
			.ui-tabs .ui-tabs-panel
			{
				padding:0.5em 0.7em
			}
	</style>
	<!-- KukudocsEditor  -->
	<script type="text/javascript" src="<c:url value='/resources/KukudocsEditor/javascripts/build/Editor.bundle.js'/>"></script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/KukudocsEditor/stylesheets/style.css" type="text/css" />
</head>

<body style="display:none;">
	<div id="h1">공무원 업무
		<label id="user_Check" style="color:#ffffff;"></label>
	</div>
	<div id="pop_body" style="height: 920px;">
	
		
		<input type="hidden" id="cvsvwk_fromDiv" name="fromDiv" value="${param.fromDiv}"/>
		<input type="hidden" id="uid" name="uid" value="${param.uid}"/>
		<input type="hidden" id="ouCode" name="ouCode" value="${param.ouCode}"/>
		
		
		<!-- 대분류 TAB -->
		<div id="cvsvwk_civilServiceWorkLgTabs" style="height: 920px;">
			<p>
				<ul id="cvsvwk_tabLi">
		 			<li><a href="#cvsvwk_TrnsferVocDiv">이관민원</a></li>
					<li><a href="#cvsvwk_jisikRewordDiv">상담DB</a></li>
					<li><a href="#cvsvwk_NoticeDiv">공지사항</a></li>
					<li><a href="#cvsvwk_TrnsferAcceptDiv">콜센터담당지정</a></li>
<!-- 					<li><a href="#cvsvwk_TrnsferVactDiv">휴가지정</a></li> -->
					<li><a href="#cvsvwk_DeptCorprDiv">부서별협력도</a></li>
				</ul>
				
				<div id="popDiquest" style="margin:-25px 20px">
					<div class="subject-icon" onclick="go_pcrm()">
						<div class="standby_num">PCRM 연동</div>
					</div>
				</div>
			</p>
		<!-- 이관민원 -->
		<div id="cvsvwk_TrnsferVocDiv" style="display: block;">
			<%@include file="cswTrnsferVoc.jsp" %>
		</div>
		
		<!--상담DB  -->
		<div id="cvsvwk_jisikRewordDiv" style="display: block;">
			<%@include file="cswDbManage.jsp" %>	 
		</div>
	
		<!-- 부서게시판 -->
		<div id="cvsvwk_NoticeDiv" style="display: block;">
			<%@include file="cswDeptBoard.jsp" %>
		</div>

		<!-- 콜센터이관접수자 지정 -->
		<div id="cvsvwk_TrnsferAcceptDiv" style="display: block;">
			<%@include file="cswTrnsferAccept.jsp" %>
		</div>
		
		<!-- 휴가자 지정 -->
<!-- 		<div id="cvsvwk_TrnsferVactDiv" style="display: block;"> -->
<%-- 			<%@include file="cswTrnsferVact.jsp" %> --%>
<!-- 		</div> -->
				
		<!-- 부서별협력도 지정 -->
		<div id="cvsvwk_DeptCorprDiv" style="display: block;">
			<%@include file="cswDeptCooperation.jsp" %>
		</div>
	</div>
	</div>
</body>
</html>
