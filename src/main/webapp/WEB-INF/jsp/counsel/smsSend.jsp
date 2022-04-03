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
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.MultiFile.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/counsel/smsSend.js'/>"></script>
		<script type="text/javascript">
			var tcktId = "${param.tcktId}";
			var cntctInform = "${param.cntctInform}";
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
							<input type="text" class="text_ol" id="tfSendPhoneNum" maxlength="20">
							<input type="hidden" class="text_ol" id="tfTcktId">
						</td>
						<th>예약일시</th>
						<td style="width: 120px;">
							<input type="text" class="text_ol" id="tfResvDtm">
						</td>
						<td class="btn">
							<button type="button" id="btnInit" class="button">초기화</button>
							<button type="button" id="btnSend" class="button">전송</button>
							<button type="button" id="btnCustSelect" class="button">고객선택</button>
						</td>
					</tr>
				</table>
			</div>
			<!--"조회/검색"-->
			<div>
				<!-- 개인정보테이블 -->
				<form id="smsSendForm" name="writeForm" action="/ajax/counsel/smsSendForm.do" method="post">
<!-- 				<form id="smsSendForm" name="writeForm" action="/ajax/board/board_write.do" method="post"> -->
					<input type="hidden" id="tfCustId">
					<table class="profile_tbl">
						<tr>
							<th class="line_rt">발신자번호</th>
							<td class="line_b"><label id="labSendNum"></label></td>
							<th class="line_c">발신상담사</th>
							<td class="line_b"><label id="labSendUsrId"></label></td>
						</tr>
						<tr>
							<th class="line_rt">전송메세지<br/><label id="labCountTxt">0</label> byte</th>
							<td class="line_b" colspan="3" style="height:150px;">
								<textarea class="area_ol" style="height:80%;" id="tfSendCont" maxlength="667"></textarea>
								<label id="sendContFooter"></label>								
							</td>
						</tr>
						<tr>
							<th class="line_rb">이미지첨부</th>
							<td class="line_wb" colspan="3">
					         	<table id="fileInfos" style="margin-left: 1px; margin-right: 6px;">
									<tr>
										<td style="width: 30%;">
											<input type="file" id="smsSendImg" name="smsSendImg" style="width: 100%;"/>
										</td>
									</tr>
								</table>
								<div id="fileList" style="min-height:50px"></div> 
							</td>
						</tr>
					</table>
				</form>
				<!--"개인정보테이블"-->
				<div class="text_red">
					*90byte가 넘어가면 MMS로 발송됩니다. (이미지첨부: 개당 100Kbyte 미만 jpg 파일만 가능, 최대 3개)
				</div>
			</div>
			<div class="stitle" style="float: none;">자주쓰는문자</div>
			<div>
				<div class="grid_all" style="width: 51%; float: left;">
					<div id="search" style="margin-bottom: 3px; border-radius: 5px;">
						<table class="info_tbl_btn" style="margin-top: 2px;">
							<tr>
							<!-- 
								<th>구분</th>
								<td><select class="select_bl" style="width: 80px;" id="selFrqntType"></select></td>
							 -->
							 <!-- 
							 	<th><input type="checkbox" id="chkCommon" class="checkbox" checked="checked"><label for="chkCommon">공통 포함</label></th>
							 -->
								<td class="btn"><button type="button" class="button" id="btnFrqntListSrch">조회</button></td>
							
							</tr>
						</table>
					</div>
					<!-- 자주쓰는 문자 그리드 -->
					<div style="width: 100%;  float: left;">
						<table id="tblSmsFrqntList"></table>
						<div id="pagingSmsFrqntList"></div>
					</div>
					<!-- 자주쓰는 문자 그리드 -->
				</div>
				<!-- 자주쓰는 문자 상세정보 -->
				<div class="grid_all" style="width: 46%; float: right; border-radius:5px; background-color: #e5e5e5; border: 1px solid #c5c5c5;margin: 0 4px 4px 4px; padding: 4px;">
					<!-- 버튼 테이블 -->
					<table class="info_tbl_btn" style="margin: 2px 0 10px 0;">
						<tr>
							<td>
								<button type="button" id="btnFrqntSave" class="button">등록</button>
								<button type="button" id="btnFrqntModi" class="button">수정</button>
								<button type="button" id="btnFrqntHide" class="button">삭제</button>
								<button type="button" id="btnFrqntReset" class="button">초기화</button>
							</td>
						</tr>
					</table>
					<form id="smsFrqntForm" name="smsFrqntForm" action="/ajax/counsel/smsFrqntForm.do" method="post">
						<input type="hidden" name="tfFrqTmpltId" id="tfFrqTmpltId"/>
						<table class="profile_tbl">
							<colgroup>
								<col width="18%"/>
								<col width="28%"/>
								<col width="18%"/>
								<col width="36%"/>
							</colgroup>
							<!--
							<tr>
								<th class="line_rt">구분</th>
								<td class="line_b" colspan="3"><input type="checkbox" id="chkPrfCommon" class="checkbox"><label for="chkPrfCommon">공통</label></td>
							</tr>
							-->
							<tr>
								<th class="line_rt">순서</th>
								<td class="line_b" colspan="3"><input type="text" id="tfFrqPrfOrd" style="width: 98%;"></td>
							</tr>
							<tr>
								<th class="line_rt">제목</th>
								<td class="line_b" colspan="3"><input type="text" id="tfFrqPrfTtl" style="width: 98%;"></td>
							</tr>
							<tr>
								<th class="line_rt">내용<br /><label id="labFrqPrfContSz">0</label> byte</th>
								<td class="line_b" colspan="3"><textarea rows="14" cols="42" name="tfFrqPrfCont"  id="tfFrqPrfCont" style="width: 98%;"></textarea></td>
							</tr>
							<tr>
								<th class="line_rb">수정자</th>
								<td class="line_wb"><label id="labFrqPrfCrtNm"></label></td>
								<th class="line_rb2">수정일자</th>
								<td class="line_wb"><label id="labFrqPrfCrtDh"></label></td>
							</tr>
						</table>
					</form>
				</div>
				<!-- 자주쓰는 문자 상세정보 -->
			</div>
		</div>
		<!--"BODY"-->
	</body>
</html>
