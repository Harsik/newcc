<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<%
	request.setCharacterEncoding("UTF-8");

	//POST&파라미터가있을 시
	if(request.getMethod().equals("POST") && (request.getParameter("isErp") != null && request.getParameter("isErp").equals("Y")))
	{
			pageContext.setAttribute("usrId", request.getParameter("usrId"));
			pageContext.setAttribute("isErp", "Y");
	}
	else
	{
		pageContext.setAttribute("isErp", "N");
	}
%>

<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>온누리콜센터</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/user/login.js'/>"></script>			
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/fullcalendar/moment.min.js"></script>
		
		<script type="text/javascript" src="<c:url value='/resources/KukudocsEditor/javascripts/build/Editor.bundle.js'/>"></script>
    	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/KukudocsEditor/stylesheets/style.css" type="text/css" />
		
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/bootstrap/css/bootstrap.css" type="text/css" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/bootstrap/css/bootstrap-theme.css" type="text/css" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css" />		
		
		
		<style>
			body {
				margin: 0 auto;
			}
			
			#content {
				background-image: url(${pageContext.request.contextPath}/resources/images/loginbg.png);
				background-repeat: repeat;
			}
			
			.center {
				margin: 0 auto;
				background-image: url(${pageContext.request.contextPath}/resources/images/log.png);
				background-repeat: no-repeat;
				margin-top: 170px;
				width: 879px;
				height: 607px;
			}
			
			.logo {
				float: left;
				display: inline;
				position: relative;
				padding-top: 100px;
				padding-left: 0px;
				text-align: left;
				/*
				height: 200px;
				width: 100px;
				background-image:  url(${pageContext.request.contextPath}/resources/images/logo.svg);
				background-repeat: no-repeat;
				*/
			}
			
			#form-id {
				padding-top: 320px;
				padding-left: 12px;
			}
			
			#form-id .ip1 {
				padding-bottom: 4px;
			}
			
			#form-id .ip3 {
				padding-top: 6px;
				float: left;
				font-family: "돋움", sans-serif;
				font-size: 8pt;
				color: #606060;
			}
			
			.input1 {
				width: 222px;
				height: 33px;
				color: #7a787a;
				font-family: "돋움", sans-serif;
				border-style: solid;
				border-width: 1px;
				border-color: #cbcbcb;
				padding-left: 4px;
			}
			
			.input2 {
				width: 222px;
				height: 33px;
				color: #7a787a;
				font-family: "돋움", sans-serif;
				border-style: solid;
				border-width: 1px;
				border-color: #cbcbcb;
				padding-left: 4px;
			}
			
			.center #btnLogin {
				float: left;
				margin-top: -80px;
				margin-left: 160px;
				border: 0;
			}
			
			.copy {
				text-align: center;
				padding-top: 8px;
				font-family: "돋움", sans-serif;
				font-size: 9pt;
				color: #807f7f;
			}
			
			/* 다운로드 select box  */
			div#select_box {
			    position: relative;
			    width: 200px;
			    height: 40px;
			    background: url(select_arrow.png) 180px center no-repeat; /* 화살표 이미지 */
			    border: 1px solid #E9DDDD;
			}
			div#select_box label {
			    position: absolute;
			    font-size: 14px;
			    /* color: #a97228; */
			    color: #c5a3a3;
			    top: 13px;
			    left: 12px;
			    letter-spacing: 1px;
			}
			div#select_box select#item {
			    width: 100%;
			    height: 40px;
			    min-height: 40px;
			    line-height: 40px;
			    padding: 0 10px;
			    opacity: 0;
			    filter: alpha(opacity=0); /* IE 8 */
			}
			
			.ui-dialog .ui-dialog-buttonpane { 
				text-align: center !important;
			}
			.ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset { 
				float: none !important;
			}
		</style>
	</head>

	<body>
<%
	if(pageContext.getAttribute("isErp").equals("Y"))
	{
%>
		<form action="#" name="form1" id="form-id">
			<input type="hidden" id="tfUserId" value="${usrId}"/>
			<input type="hidden" id="tfExtnNo" value=""/>
			<input type="hidden" id="isErp" value="${isErp}"/>
		</form>
<%
	}
	else
	{
%>
<!-- 		<div id="editor">
		</div>
  -->
		<div id="content">
			<div class="center">
				<span>
				<img id="logo" class="logo" src="/resources/images/logo.png" width="250">
				</span>
				<form action="#" name="form1" id="form-id" >
					<div class="ip1">
						<input type="text" class="input1" id="tfUserId" placeholder="아이디" />
					</div>
					<div class="ip1">
						<input type="password" class="input2" id="tfUserPass" placeholder="비밀번호"/>
					</div>
					<div class="ip1">
						<input type="text" class="input1" id="tfExtnNo" placeholder="내선번호"/>
					</div>
					<div class="ip3">
						<input type="checkbox" class="chk1" id="chkSave" /> <label for="chkSave" style="font-size: 8.5pt; vertical-align: text-bottom;">아이디저장</label>
					</div>
		
					<input type="hidden" id="isErp" value="${isErp}" />
				</form>
				<div><a href="#"><img src="<c:url value='/resources/images/btn_login.png'/>" alt="로그인"  id="btnLogin"></a></div>
			</div>
		</div>
		<!-- 			-->
		<div class="ip1">
			<div id="select_box">
		    <label for="item">소프트폰 설치파일</label>
		    <select id="item" title="select color">
		        <option value="#" selected="selected">소프트폰 설치파일</option>
		        <option value="http://172.17.100.100:8080/SoftPhone/Setup.exe">소프트폰 (Setup.exe)</option>
		        <option value="http://172.17.100.100:8080/SoftPhone/SoftPhone.exe">신규패치 (SoftPhone.exe)</option>
		        <option value="http://172.17.100.100:8080/SoftPhone/config.ini">설정파일 (config.ini)</option>
		        <option value="http://172.17.100.100:8080/SoftPhone/AnyDesk.exe">애니데스크 (AnyDesk.exe)</option>
		        <!-- <option value="http://172.17.100.100:8080/SoftPhone/사용자매뉴얼.doc">매뉴얼 (사용자매뉴얼.doc)</option> --> 
		    </select>
			</div>
		</div>
			
		<div class="copy">Copyright 2021 순천시청. All rights reserved</div>
		<div id="dialog" style="display:none;"></div>
<%
	}
%>
	</body>

</html>