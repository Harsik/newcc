<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>쪽지</title>
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
		<script type="text/javascript" src="<c:url value='/resources/js/message/messageList.js'/>"></script>
<!-- KukudocsEditor  -->
<script type="text/javascript" src="<c:url value='/resources/KukudocsEditor/javascripts/build/Editor.bundle.js'/>"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/KukudocsEditor/stylesheets/style.css" type="text/css" />
	</head>

	<body>
	
		<!--BODY-->
		<div id="h1">
			쪽지
		</div>
		<div id="pop_body">
			<!--타이틀-->
			<div class="stitle">
				쪽지
			</div>
			<!--"타이틀"-->
			
			<table class="info_tbl">
				<tr>
					<th>
					</th>
					<td class ="btn">
					<button type = "button" id = "btnMsgExcel" class="button">문서출력</button>
						<button type = "button" id = "btnMsgSearch" class="button">조회</button>
						<button type = "button" id = "btnMsgInit" class="button">초기화</button>
					</td>
				</tr>
			</table><!--"미사용/버튼 테이블"-->
			
			<div id="search">
				<table class="search_tbl">
					<tr>
						<th>
							<label>쪽지함</label>
						</th>
						<td style = "width: 100px;">
							<select id = "optMsgList">
								<option value = "all" selected>전체</option>
								<option value = "rcvMsgList">발신</option>
								<option value = "sndMsgList">수신</option>
							</select>
						</td>
						<th>
							<label>상담사</label>
						</th>
						<td style = "width: 100px;">
							<select id = "selMsgCounselNm">
								<option value="all">전체</option>
							</select>
						</td>
						<th>
							<label>일자</label>
						</th>
						<td>
							<input type = "text" class="text_Date" id="tfMsgStartDt" readOnly/> ~ <input type = "text" class="text_Date" id="tfMsgEndDt" readOnly/>
						</td>
						<th>
							<label>내용</label>
						</th>
						<td>
							<input type = "text" id="tfMsg"/>
						</td>
					</tr>
				</table>
			</div><!--"조회/검색"-->
			
			<!--그리드-->
			<div id="grid_all">
				<!-- 그리드테이블 -->
				<table style="width:100%; ;height:318px; background-image:url('./img/sam.gif');">
					<tr>
						<td>
							<table id="tblMessageList"></table>
							<div id="pagingMessageList"></div>
						</td>
					</tr>
				</table>
				<!--"그리드테이블"-->
				
				<!-- 버튼 테이블 -->
				<table class="info_tbl_btn">
					<tr>
						<th></th>
						<td>
							<button type="button" id="btnMsgReply" class="button">답신</button>
							<button type="button" id="btnMsgModify" class="button">전송</button>
							<button type="button" id="btnMsgUpdate" class="button">수정</button>
							<button type="button" id="btnMsgDelete" class="button">삭제</button>
							<button type="button" id="btnMsgReset" class="button">새쪽지</button>
						</td>
					</tr>
				</table>
				<!--"버튼 테이블"-->

			</div>
			<!--"그리드"-->

			<!-- 개인정보테이블 -->
			<input type="hidden" id="tfSpecChSndId">
			<table class="profile_tbl">
				<tr>
					<td rowspan = "9" style = "width : 40%">
						<table id="tblUsrList"></table>
						<div id="pgUsrList"></div>
					</td>
					<td class="line_rb2" style = "width : 60%"><label id="messageType" >전송메세지</label><label> [ </label><label id="labMsgCountTxt">0 Byte</label><label> / 4000 Byte ]</label></td>
				</tr>
				<tr>
					<td class="line_wb" rowspan="8" style = "padding : 0px 2px 0px 0px;"><textarea rows="" cols="" style="width: 100%; height: 100%; padding :0px;" id="tfSpecSndCont"></textarea></td>
				</tr>
				<tr></tr>
				<tr></tr>
				<tr></tr>
				<tr></tr>
				<tr></tr>
				<tr></tr>
				<tr></tr>
			</table><!--"개인정보테이블"-->
		</div><!--"BODY"-->
	</body>
</html>