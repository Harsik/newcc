<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>SMS이력</title>
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
		<script type="text/javascript" src="<c:url value='/resources/js/counsel/smsSendList.js'/>"></script>
		
		<style>
		.ui-jqgrid tr.jqgrow td { white-space:nowrap !important; text-overflow: ellipsis;-o-text-overflow: ellipsis; }
		</style>
	</head>

	<body>
	
		<!--BODY-->
		<div id="h1">
			SMS이력
		</div>
		<div id="pop_body">
			<!--타이틀-->
			<div class="stitle">
				SMS이력 조회
			</div>
			<!--"타이틀"-->
			
			<!-- 조회/검색 -->
				<div id="search2" style="height: auto;">
				<table class="search2_tbl">
					<tr>
						<td class="sel_50" style="width: 65px;">
							<select class="select_al" id="smlist_selSrchDateType">
								<option value="req" selected="selected">요청일</option>
								<option value="resv">예약일</option>
							</select>
						</td>
						<td colspan="2" class="sel_80" style="width: 21%;">
							<input type="text" class="text_Date" id="smlist_tfSrchDate"  />
								<span>~</span>
							<input type="text" class="text_Date" id="smlist_tfSrchDateEn" />
						</td>
						
						<th>처리상태</th>
						<td class="sel_50">
							<select class="select_al" id="smlist_selSrchActStCd">
								<option value="all">전체</option>
								<option value="req">전송 대기중</option>
								<option value="complete">성공</option>
								<option value="fail">실패</option>
							</select>
						</td>
						
						<td class="sel_50">
							<select class="select_al" id="smlist_selSrchtype">
								<option value="cntct_infm">수신번호</option>
								<option value="cntct_infm_cont">내용</option>
							</select>
						</td>
						
						<td class="nemo_50" style="width: 15%;">
							<input type="text" class="text_ol" id="smlist_tfSrchVal">
						</td>
						
						<th>상담사</th>
						<td class="sel_50">
							<select class="select_al" id="smlist_selSrchUsr">
								<option value="all">전체</option>
							</select>
						</td>
						
						<td class="btn">
							<button type="button" id="smlist_btnSearch" class="button">조회</button>
							<button type="button" id="smlist_btnExcel" class="button">엑셀저장</button>
							<button type="button" id="smlist_btnInit" class="button">초기화</button>
						</td>
					</tr> 
				</table>
			</div>
			<!--"조회/검색"-->

			<!--그리드-->
			<div id="grid_all">

				<!-- 그리드테이블 -->
				<table style="width:100%; height:318px; background-image:url('./img/sam.gif');">
					<tr>
						<td>
							<table id="smlist_tblSmsSendList"></table>
							<div id="smlist_pagingSmsSendList"></div>
						</td>
					</tr>
				</table>
				<!--"그리드테이블"-->

			</div>
			<!--"그리드"-->
			
			<!-- SMS 정보테이블 -->
			<br/>
			<br/>
			<table summary="SMS Talbe" class="profile_tbl">
				<colgroup>
					<col  width="5%"/>
					<col  width="8%"/>
					<col  width="5%"/>
					<col />
				</colgroup>
				<tbody>
					<tr>
						<th scope="row" class="line_rt">발신자</th>
						<td class="line_b" ><label id="smlist_labSpecUsrNm"></label></td>
						<th scope="row" class="line_c" rowspan="9">전송메세지<br />
							<label id="smlist_labSpecCountTxtNum"></label> byte
						</th>
						<td class="line_b" rowspan="9">
							<textarea rows="1" cols="1" style="width: 100%; height: 95%;" id="smlist_tfSpecSndCont" title="전송메시지" readonly></textarea>
						</td>
					</tr>
					<tr>
						<th scope="row" class="line_rt">고객명</th>
						<td class="line_b" ><label id="smlist_labSpecCustNm"></label></td>
					</tr>
					<tr>
						<th scope="row" class="line_rt">발신자번호</th>
						<td class="line_b" ><label id="smlist_labSpecSendFrom"></label></td>
					</tr>
					<tr>
						<th scope="row" class="line_rt">수신자번호</th>
						<td class="line_b" ><label id="smlist_tfSpecChCntctInfm"></label></td>
					</tr>
					<tr>
						<th scope="row" class="line_rt">요청일시</th>
						<td class="line_b" ><label id="smlist_labSpecSndReqDtm"></label></td>
					</tr>
					<tr>
						<th scope="row" class="line_rt">예약일시</th>
						<td class="line_b" ><label id="smlist_tfSpecSndResvDtm"></label></td>
					</tr>
					<tr>
						<th scope="row" class="line_rt">발신일시</th>
						<td class="line_b" ><label id="smlist_labSpecSndEndDtm"></label></td>
					</tr>
					<tr>
						<th scope="row" class="line_rt">발신결과</th>
						<td class="line_b" ><label id="smlist_labSpecSndRsltNm"></label></td>
					</tr>
					<tr style="height: 70px;">
						<th scope="row" class="line_rt">이미지첨부</th>
						<td class="line_b" ><table id="smlist_smsFileInfos" style="width:100%; margin-left: 1px; margin-right: 6px;"></table></td>
					</tr>
				</tbody>
			</table>
			
		</div><!--"BODY"-->
	</body>
</html>