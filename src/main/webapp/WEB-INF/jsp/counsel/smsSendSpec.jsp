<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>SMS 발송상세</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/counsel/smsSendSpec.js'/>"></script>
	</head>

	<body>
	
		<!--BODY-->
		<div id="h1">
			SMS 발송상세
		</div>
		<div id="pop_body">
			<!--타이틀-->
			<div class="stitle">
				SMS 발송상세
			</div>
			<!--"타이틀"-->
			
			<!-- 버튼 테이블 -->
			<table class="info_tbl_btn">
				<tr>
					<th></th>
					<td>
						<button type="button" id="btnModify" class="button">저장</button>
						<button type="button" id="btnDelete" class="button">삭제</button>
					</td>
				</tr>
			</table>
			<!--"버튼 테이블"-->
			
			<!-- 개인정보테이블 -->
			<input type="hidden" id="tfSpecChSndId">
			<table class="profile_tbl">
				<tr>
					<td class="line_rt">발신상담사</td>
					<td class="line_b"><label id="labSpecUsrNm"></label></td>
					<td class="line_rb2" rowspan="10">전송메세지<br/><label id="labSpecCountTxtNum"></label> byte</td>
					<td class="line_wb" rowspan="10"><textarea rows="" cols="" style="width: 100%; height: 95%;" id="tfSpecSndCont"></textarea></td>
				</tr>
				<tr>
					<td class="line_rt">회사/부서</td>
					<td class="line_b"><label id="labSpecCorpNm"></label></td>
				</tr>
				<tr>
					<td class="line_rt">고객명</td>
					<td class="line_b"><label id="labSpecCustNm"></label></td>
				</tr>
				<tr>
					<td class="line_rt">발신자번호</td>
					<td class="line_b"><label id="labSpecSendFrom"></label></td>
				</tr>
				<tr>
					<td class="line_rt">수신자번호</td>
					<td class="line_b"><input type="text" class="text_ol" id="tfSpecChCntctInfm"></td>
				</tr>
				<tr>
					<td class="line_rt">요청일시</td>
					<td class="line_b"><label id="labSpecSndReqDtm"></label></td>
				</tr>
				<tr>
					<td class="line_rt">예약일시</td>
					<td class="line_b"><input type="text" class="text_ol" id="tfSpecSndResvDtm">
				</tr>
				<tr>
					<td class="line_rt">발신일시</td>
					<td class="line_b"><label id="labSpecSndEndDtm"></label></td>
				</tr>
				<tr>
					<td class="line_rt">발신결과</td>
					<td class="line_b"><label id="labSpecSndRsltNm"></label></td>
				</tr>
				<tr>
					<td class="line_rb">접수번호</td>
					<td class="line_wb"><label id="labSpecTcktId"></label></td>
				</tr>
			</table><!--"개인정보테이블"-->
			<div class="text_red"><!-- *80자가 넘으면 나뉘어 발송됩니다. --></div>
		</div>
	</body>
</html>