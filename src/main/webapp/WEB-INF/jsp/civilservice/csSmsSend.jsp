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
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/civilservice/csSmsSend.js'/>"></script>
		<script type="text/javascript">
			var custName = '${param.custName}';
			var totMoney = '${param.totMney}';
			var totCnt 	 = '${param.totCnt}';
			var account1 = '${param.account1}';
			var account2 = '${param.account2}';
			var saemokNm = '${param.saemokNm}';
		</script>
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
						<th>수신번호</th>
						<td style="width: 120px;">
							<input type="text" class="text_ol" id="tfSendPhoneNum" maxlength="20" readonly>
						</td>
						<td class="btn">
							<button type="button" id="btnSend" class="button">전송</button>
						</td>
					</tr>
				</table>
			</div>
			
			<div>
				<!-- 개인정보테이블 -->
				<form id="smsSendForm" name="smsSendForm" action="/ajax/counsel/smsSendForm.do" method="post">
					<input type="hidden" id="tfCustId">
					<table class="profile_tbl">
						<tr>
							<th class="line_rt">발신자번호</th>
							<td class="line_b"><label id="labSendNum"></label></td>
							<th class="line_c">발신상담사</th>
							<td class="line_b"><label id="labSendUsrId"></label></td>
						</tr>
						<tr>
							<th class="line_rt">전송메세지<br /><label id="labFrqPrfContSz">0</label> byte</th>
							<td class="line_b" colspan="3" style="height:150px;">
								<textarea class="area_ol" style="height:80%;" id="tfSendCont" maxlength="667"></textarea>
								<label id="sendContFooter"></label>								
							</td>
						</tr>
					</table>
				</form>
				<!--"개인정보테이블"-->
			</div>
		</div>
		<!--"BODY"-->
	</body>
</html>
