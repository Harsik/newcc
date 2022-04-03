<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">
<head>
		<meta charset="UTF-8">
		<title>상담DB등록 요청</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/counsel/counseldbRequest.js'/> "></script>
</head>
<body>
	<div id="h1">상담DB등록 요청</div>
	<div id="pop_body">
		<!--타이틀-->
		<div class="stitle">
        	상담DB등록 요청
		</div>
		<!--"타이틀"-->
		<!-- 미사용/버튼 테이블 -->
		<div id="grid_all">
			<!-- 버튼 테이블 -->
			<table class="info_tbl_btn">
				<tr>
					<td>
						<button type="button" id="btnInit" class="button">초기화</button>
						<button type="button" id="btnUpdate"  class="button">저장</button>
						<!-- <button type="button" id="btnDelete"  class="button">삭제</button> -->
					</td>
				</tr>
			</table>
			<!--"버튼 테이블"-->
     	</div>
     	<!-- 개인정보테이블 -->
		<form id="counseldbRequestForm" name="counseldbRequestForm" action="/ajax/user/counseldbRequestForm.do" method="post">
			<table class="profile_tbl">
				<tr>
					<td class="line_rt">요청구분</td>
					<td class="line_b">
						<select class="select_bl" id = "reqGbCd">
						</select>
					</td>
					<td class="line_c">요청일자</td>
					<td class="line_b"><input type="text" class="text_ol" id="reqDt" name="reqDt" maxlength="160" readonly></td>
					<td class="line_c">요청자</td>				
					<td class="line_b">
						<input type="hidden" class="text_ol" id="reqUsrId" name="reqUsrId" maxlength="10">
						<input type="text" class="text_ol" id="reqUsrNm" name="reqUsrNm" maxlength="160" readonly>
					</td>
				</tr>
				<tr>
					<td class="line_rt">담당부서</td>												
					<td class="line_b" colspan="3">				
					 	<input type="hidden" class="text_ol" id="orgId" name="orgId" maxlength="10">
            <input type="hidden" class="text_ol" id="deptId" name="deptId" maxlength="10">
            <input type="text" class="text_ol" id="deptNm" name="deptNm" maxlength="100" style="width:625px;" disabled="disabled">
            <!-- <input type="text" class="text_ol" id="deptNm" name="deptNm" maxlength="100" style="width:596px;" disabled="disabled"> -->
            <!-- <img src="/resources/images/icon_2.png" alt="" class="tbl_icon" id="btnManager"/>	 -->							
					</td>
					<td class="line_c">담당자</td>
					<td class="line_b">
            <input type="hidden" class="text_ol" id="orgUsrId" name="orgUsrId" maxlength="10">
            <input type="text" class="text_ol" id="orgUsrNm" name="orgUsrNm" maxlength="100" disabled="disabled">
					</td>
				</tr>
				<tr>
					<td class="line_rt">상담유형</td>
					<td class="line_b" colspan="5">
						<select class="select_bl" id="instCd" style="width:200px;"></select>
						<select class="select_bl" id="intvLgCd" style="width:250px;"></select>
						<select class="select_bl" id="intvMdCd" style="width:270px;"></select>
						<select class="select_bl" id="intvSmCd" style="width:280px;"></select>
					</td>
				<tr>
					<td class="line_rt">요청내용</td>
					<td class="line_b" colspan="5"><textarea class="area_ol" style="height:90%;" id = "reqCont" maxlength="90%"></textarea></td>
				</tr>
				<tr>
					<td class="line_rt">처리상태</td>
					<td class="line_b" colspan="5" id="actStCd"></td>
				</tr>
				<tr>					
					<td class="line_rt">반송사유</td>
					<td class="line_b" colspan="5"><textarea class="area_ol" style="height:90%;" id = "rtnRsn" maxlength="90%" readonly></textarea></td>
				</tr>
			</table>
			<!--"개인정보테이블"-->
		</form>
	</div>
</body>
</html>