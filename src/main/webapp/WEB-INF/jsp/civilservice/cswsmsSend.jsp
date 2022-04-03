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
		<script type="text/javascript" src="<c:url value='/resources/js/civilservice/cswsmsSend.js'/>"></script>
	</head>
	<body>
		<!--BODY-->
		<div id="h1">SMS발송</div>
		<div id="pop_body" style="float: left;">
			<!--타이틀-->
			<div class="stitle">SMS발송</div>
			<!--"타이틀"-->
			<!-- 조회/검색 -->
			<div id="cssdsm_search">
				<table class="search_tbl">
					<tr>
						<th>수신번호</th>
						<td style="width: 120px;">
							<input type="text" class="text_ol" id="cssdsm_tfSendPhoneNum" maxlength="20">
							<input type="hidden" class="text_ol" id="cssdsm_tfTcktId">
						</td>
						<td class="btn" style="float:right;">
							<button type="button" id="cssdsm_btnInit" class="button">초기화</button>
							<button type="button" id="cssdsm_btnSend" class="button">전송</button>
						</td>
					</tr>
				</table>
			</div>
			<!--"조회/검색"-->
			<div>
				<!-- 개인정보테이블 -->
				<form id="cssdsm_smsSendForm" name="smsSendForm" action="/ajax/civilservice/smsSendForm.do" method="post">
					<input type="hidden" id="cssdsm_tfCustId">
					<table class="profile_tbl">
						<tr>
							<th class="line_rt">발신자번호</th>
							<td class="line_b"><label id="cssdsm_labSendNum"></label></td>
							<th class="line_c">발신자이름</th>
							<td class="line_b"><label id="cssdsm_labSendUsrId"></label></td>
						</tr>
						<tr>
							<th class="line_rt">전송메세지<br/><label id="cssdsm_labCountTxt">0</label> byte</th>
							<td class="line_b" colspan="3" style="height:150px;">
								<textarea class="area_ol" style="height:80%;" id="cssdsm_tfSendCont" maxlength="667"></textarea>
								<label id="cssdsm_sendContFooter"></label>								
							</td>
						</tr>
						<!-- <tr>
							<th class="line_rb">이미지첨부</th>
							<td class="line_wb" colspan="3">
					         	<table id="cssdsm_fileInfos" style="margin-left: 1px; margin-right: 6px;">
									<tr>
										<td style="width: 30%;">
											<input type="hidden" name="record_XXX" value="" />
											<input type="file" id="cssdsm_tfSendImg" name="tfSendImg" class="file_board" style="width: 100%;" />
										</td>
										<td style="width: 20%">
											<img src="/resources/images/btn_cancel.png" id="cssdsm_btnFileCancle" style="cursor: pointer; margin-top: 4px; margin-left: 4px;" alt="취소" />
										</td>
									</tr>
								</table>
							</td>
						</tr> -->
					</table>
				</form>
				<!--"개인정보테이블"-->
				<!-- <div class="text_red">
					*80byte가 넘어가면 MMS로 발송됩니다. (이미지첨부: 300Kbyte 미만 jpg 파일만 가능)
				</div> -->
			</div>			
		</div>
		<!--"BODY"-->
	</body>
</html>
