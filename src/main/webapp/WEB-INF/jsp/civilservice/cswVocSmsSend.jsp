<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>SMS 발송</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/civilservice/cswVocSmsSend.js'/>"></script>
	</head>
	<body>
		<!--BODY-->
		<div id="h1">SMS발송</div>
		<div id="pop_body" style="float: left;">
			<!--타이틀-->
			<div class="stitle">SMS발송</div>
			<!--"타이틀"-->
			<!-- 조회/검색 -->
			<div id="search">
				<table class="search_tbl">
					<tr>
						<th>예약일시</th>
						<td style="width: 120px;">
							<input type="text" class="text_ol" id="cstrvc_tfResvDtm">
						</td>
						
						<td class="btn">
							<input type="hidden" class="text_ol" id="cstrvc_tfTcktId">
							<button type="button" id="cstrvc_btnInit" class="button">초기화</button>
							<button type="button" id="cstrvc_btnSend" class="button">전송</button>
						</td>
					</tr>
				</table>
			</div>
			<!--"조회/검색"-->
			<div>
				<!-- 개인정보테이블 -->
				<form id="cstrvc_smsSendForm" name="cstrvc_smsSendForm" action="/ajax/civilservice/cswsmsSendForm.do" method="post">
					<input type="hidden" id="cstrvc_tfCustId">
					<table class="profile_tbl">
						<tr>
							<th class="line_rt">발신자번호</th>
							<td class="line_b">
								<input type="text" class="text_ol" id="cstrvc_labSendNum" disabled="disabled"/>
							</td>
							<th class="line_c">수신번호</th>
							<td class="line_b">
								<input type="text" class="text_ol" id="cstrvc_tfSendPhoneNum" disabled="disabled"/>
							</td>
						</tr>
						<tr>
							<th class="line_rt">전송메세지<br/><label id="cstrvc_labCountTxt">0</label> byte</th>
							<td class="line_b" colspan="3" style="height:150px;">
								<textarea class="area_ol" style="height:80%;" id="cstrvc_tfSendCont" maxlength="667"></textarea>
								<label id="cstrvc_sendContFooter"></label>								
							</td>
						</tr>
					</table>
				</form>
				<!--"개인정보테이블"-->
				<div class="text_red">
					*90byte가 넘어가면 MMS로 발송됩니다.
				</div>
			</div>
		</div>
		<!--"BODY"-->
	</body>
</html>