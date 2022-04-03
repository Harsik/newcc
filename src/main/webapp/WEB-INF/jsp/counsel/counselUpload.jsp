<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<title>상담이력업로드</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/counsel/counselUpload.js'/>"></script>
	</head>
	
	<body>
		<div id="h1">상담이력업로드</div>
		<div id="pop_body" style="height:830px;">
		<!-- <div id="pop_body" class="pop_body"> -->
			<!--타이틀-->
			<div class="stitle">
				상담이력업로드 조회
			</div>
			<!--"타이틀"-->
	 		<!-- 조회/검색 -->
			<div id="search2" style="height: 55px;">
				<table class="search2_tbl">
					<tr>
						<th>접수기간</th>
						<td class="sel_left" style="width:230px;">
							<input type="text" class="text_ol_half" id="selFrDate" maxlength="16" > ~ <input type="text" class="text_ol_half" id="selToDate" maxlength="16" >
						</td>
						<th style="width:40px;">상담사</th>
						<td style="width:130px;">
							<select class="select_al" id="selCounselNm" style="width: 92%;"></select>
							<!-- <input type="checkbox" class="checkbox" style="top:4px;" id="chkNotUse">퇴사자 -->
						</td>
						<th>처리유형</th>
						<td style="width:90px;">
							<select class="select_al" id="selActTypeCd"></select>
						</td>
						<th>상담결과</th>
						<td style="width:80px;">
							<select class="select_al" id="selActStCd"></select>
						</td>
						<th style="width:80px;">통화구분</th>
						<td style="width:80px;">
							<select class="select_al" id="selCallGb" style="width:80px;"></select>
						</td>
						<th></th>
						<td class="btn"  style="text-align:right;">
							<button type="button" id="btnSearch"  class="button">조회</button>
							<button type="button" id="btnInit"  class="button">초기화</button>
						</td>
					</tr>
					<tr>
						<th>상담유형</th>
						<td colspan="5">
							<input type="hidden" id="selPopupLv" value="GCHILD"/>
							<!-- <select class="select_al" style="width:100px;margin-left:4px;" id="selSrchIntvExCd"></select> -->
							<select class="select_al" style="width:100px;margin-left:4px;" id="selSrchIntvLgCd"></select>
							<select class="select_al" style="width:100px;" id="selSrchIntvMdCd"></select>
							<select class="select_al" style="width:361px;" id="selSrchIntvSmCd"></select>
						</td>
						<th>조회항목</th>
						<td>
							<select class="select_al" id="optSrchtype">
								<option value="all">전체</option>
								<option value="custNm">고객명</option>
								<option value="srchPhone">전화번호</option>
								<option value="srchContent">문의/답변</option> 
							</select>
						</td>
						<td colspan="2">
							<input type="text" class="text_ol" id="tfSrchval" style="margin-left: 5px;width:160px;">
								<select class="select_bl" style="width:113px;" id="selSrchKeyWordCd"></select>
						</td>
						<td colspan="2" style="text-align: center;" > 
						 	
					<!-- 	<label id="labIsChangeText" for="chkIsChange" style="font-size: 9pt;">변경내역</label><input type="checkbox" class="checkbox" style="top:4px;" id="chkIsChange" checked>   -->
						</td>
						
					</tr>
				</table>
			</div>
			<!--"조회/검색"-->
			
			<!-- 정보테이블 -->
			 

    		<!--그리드-->
			<div id="grid_all">
				<!-- 미사용/버튼 테이블 -->
				<table class="info_tbl">
					<tr>			
						<td>
						<button type="button" id="btnCounselUpload"  class="button">엑셀업로드</button>
						 	<!-- <button type="button" id="btnCounselDelete"  class="button">엑셀업로드삭제</button> -->
						<!-- 	<label id="labCnslListInOutCnt">IN : 0, OUT : 0</label>&nbsp;&nbsp;&nbsp;
							<button type="button" id="btnExcelPopup"  class="button">엑셀저장</button> -->
						</td>
					</tr>
				</table>
				<!--"미사용/버튼 테이블"-->		
				<!-- 그리드테이블 -->
				<table id="tblCounselList"></table>
				<div id="pgCounselList"></div>
				<!--"그리드테이블"-->
      </div><!--"그리드"-->
   	 
       <!--서브그리드-->
				<!-- 미사용/버튼 테이블 -->
				<table class="info_tbl">
					<tr>			
						<td>
						<button type="button" id="btnCounselConv"  class="button">상담이력변환</button>
						<!--   -->
						</td>
					</tr>
				</table>
				<!--"미사용/버튼 테이블"-->		
				<!-- 서브그리드테이블 -->
				<table id="tblSubCounselList"></table>
				<div id="pgSubCounselList"></div>
				<!--"서브그리드테이블"-->
     	 <!--"서브그리드"-->
     		
		</div>
	</body>
</html>