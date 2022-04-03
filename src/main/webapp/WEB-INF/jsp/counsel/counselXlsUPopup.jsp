<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>상담이력 엑셀 업로드</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		 <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script> 
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.min.js'/>"></script> 
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script> 
		<script type="text/javascript" src="<c:url value='/resources/js/counsel/counselXlsUPopup.js'/>"></script>
		<style>
			.grid-col
			{
				padding-left : 15px !important;
			}
		</style>
		
	</head>
	
	<body>
			
		<!--BODY-->
		<div id="h1">상담이력 엑셀 업로드</div>
		
		<div id="pop_body">
			<!--타이틀-->
			<div class="stitle">엑셀 파일 선택</div>
			<!--"타이틀"-->
			
			<div id="comtable">
			
				<br />
				<br />
				상담이력 엑셀파일을 업로드 합니다.<br />
				 
				<form action="/xlUpload/counsel/counselXls.do" method="post" id="frm1" name="frm1">
					<input type ="file" id="xlFile" name="xlFile"/>
				</form>
			</div><br />

            <!-- 버튼 박스 시작 -->
            <div>
                <button type="button" id="btnXLUpload"  class="button">업로드</button>
            </div>
            <!-- 버튼 박스 종료 -->
		
		</div>
		<!--"BODY"-->
	</body>
</html>