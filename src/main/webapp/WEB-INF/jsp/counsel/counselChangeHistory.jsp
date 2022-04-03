<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<title>상담이력 변경 내역</title>
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
		<script type="text/javascript" src="<c:url value='/resources/js/common/listenRec.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/counsel/counselChangeHistory.js'/>"></script>
	</head>
	
	
	<body>
		<div id="h1">상담이력 변경 내역</div>
		<div id="pop_body" style="height:820px;">
		<!-- <div id="pop_body" class="pop_body"> -->
			<!--타이틀-->
			<div class="stitle">
				상담이력 변경 내역 조회  
			</div>
			<!--"타이틀"-->
	 		<!-- 조회/검색 -->
			<div id="search2" style="height: 55px;">
				<table class="search2_tbl" style="border: 0;">
					<tr>
						<th>접수기간</th>
						<td class="sel_left" style="width:230px;">
							<input type="text" class="text_ol_half" id="cschhi_selFrDate" maxlength="16" > ~ <input type="text" class="text_ol_half" id="cschhi_selToDate" maxlength="16" >
						</td>
						<th style="width:40px;">상담사</th>
						<td style="width:130px;">
							<select class="select_al" id="cschhi_selCounselNm" style="width: 92%;"></select>
							<!-- <input type="checkbox" class="checkbox" style="top:4px;" id="cschhi_chkNotUse">퇴사자 -->
						</td>
						<th>처리유형</th>
						<td style="width:90px;">
							<select class="select_al" id="cschhi_selActTypeCd"></select>
						</td>
						<th>상담결과</th>
						<td style="width:80px;">
							<select class="select_al" id="cschhi_selActStCd"></select>
						</td>
						<th style="width:80px;">통화구분</th>
						<td style="width:80px;">
							<select class="select_al" id="cschhi_selCallGb" style="width:80px;"></select>
						</td>
						<th style="width:80px;"><button type="button" id="cschhi_btnSearch"  class="button">조회</button></th>
						<td class="btn"  style="text-align:left;">
							<button type="button" id="cschhi_btnInit"  class="button">초기화</button>
						</td>
					</tr>
					<tr>
						<th>상담유형</th>
						<td colspan="5">
							<input type="hidden" id="cschhi_selPopupLv" value="GCHILD"/>
							<%--<select class="select_al" style="width:100px;margin-left:4px;" id="cschhi_selSrchIntvExCd"></select>--%>
							<select class="select_al" style="width:100px;margin-left:4px;" id="cschhi_selSrchIntvLgCd"></select>
							<select class="select_al" style="width:150px;" id="cschhi_selSrchIntvMdCd"></select>
							<select class="select_al" style="width:311px;" id="cschhi_selSrchIntvSmCd"></select>
						</td>
						<th>조회항목</th>
						<td>
							<select class="select_al" id="cschhi_optSrchtype">
								<option value="all">전체</option>
								<option value="custNm">고객명</option>
								<option value="srchPhone">전화번호</option>
								<option value="srchContent">문의/답변</option>
								<option value="srchKeyWord">키워드</option>
							</select>
						</td>
						<td colspan="2">
							<input type="text" class="text_ol" id="cschhi_tfSrchval" style="margin-left: 5px;width:160px;">
								<select class="select_bl" style="width:113px;" id="cschhi_selSrchKeyWordCd"></select>
						</td>
						<!-- <th>민원처리결과</th>-->
						<!-- <td> -->
						<!-- 	<select class="select_al" id="cschhi_selTrnrActStCd"></select> -->
						<!-- </td> -->
						
						<!--<th>위치동의</th>-->
						<!--<td>-->
						<!--	<select class="select_al" id="cschhi_selLocationAgree"  style="width:60px;"><option value="">전체</option><option value="N">아니오</option><option value="Y">예</option></select>-->
						<!--</td>-->
						<td colspan="2" style="text-align: center;" > 
						 
						<!-- 	  <select class="select_bl" style="width:60px;" id="cschhi_selChGbCd"></select> --> 
						<label id="cschhi_labIsChangeText" for="chkIsChange" style="font-size: 9pt;">변경내역</label><input type="checkbox" class="checkbox" style="top:4px;" id="cschhi_chkIsChange" checked>  
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
						<!-- 	<label id="labCnslListInOutCnt">IN : 0, OUT : 0</label>&nbsp;&nbsp;&nbsp;
							<button type="button" id="btnExcelPopup"  class="button">엑셀저장</button> -->
						</td>
					</tr>
				</table>
				<!--"미사용/버튼 테이블"-->		
				<!-- 그리드테이블 -->
				<table id="cschhi_tblCounselList"></table>
				<div id="cschhi_pgCounselList"></div>
				<!--"그리드테이블"-->
      </div><!--"그리드"-->
   	 
       <!--서브그리드-->
				<!-- 미사용/버튼 테이블 -->
				<table class="info_tbl">
					<tr>			
						<td>
						<!--   -->
						</td>
					</tr>
				</table>
				<!--"미사용/버튼 테이블"-->		
				<!-- 서브그리드테이블 -->
				<table id="cschhi_tblSubCounselList"></table>
				<div id="cschhi_pgSubCounselList"></div>
				<!--"서브그리드테이블"-->
     	 <!--"서브그리드"-->
     		
		</div>
	</body>
</html>