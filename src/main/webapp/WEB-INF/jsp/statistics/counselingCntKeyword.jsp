<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
 
<!DOCTYPE html>
 
<html lang="ko">
	<head>
	<meta charset="UTF-8">
	<title>키워드별 상담 현황</title>
	<link rel="icon" href="/resources/images/favicon.ico">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
	 
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
	 
	 
	<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/statistics/counselingCntKeyword.js'/>"></script>
	 
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.css" type="text/css"/>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.js'/>"></script>
	<base target="_self">
	</head>
	
	
	<body>
		<div id="h1">키워드별 상담 현황</div>
		<div id="pop_body">
			<div class="stitle">키워드별 상담 현황 조회</div>
			<!--"타이틀"-->
	
			<div id="search">
				<table class="search_tbl">
					<tr>
	
						<th style="width: 30px; padding-right: 15px"><label>기간</label>
						</th>
						<td style="width: 350px;"><select id="cslCntKw_optTerm"
							style="width: 100px;">
								<option value="year">년도별</option>
								<option value="month">월별</option>
								<option value="day" selected="selected">일별</option>
						</select>
	
							<div id="cslCntKw_dvYear" style="display: inline;">
								<select id='cslCntKw_schYearStart'
									style='width: 70px; margin-left: 5px;'></select> <span>~</span>
								<select id='cslCntKw_schYearEnd'
									style='width: 70px; margin-left: 5px;'></select>
							</div>
	
							<div id="cslCntKw_dvMonth" style="display: inline;">
								<input type="text" class="text_Date"
									id="cslCntKw_schMonthStart" /> <span>~</span> <input
									type="text" class="text_Date" id="cslCntKw_schMonthEnd" />
							</div>
	
							<div id="cslCntKw_dvDay" style="display: inline;">
								<input type="text" class="text_Date"
									id="cslCntKw_schDayStart" /> <span>~</span> <input
									type="text" class="text_Date" id="cslCntKw_schDayEnd" />
							</div></td>
	
						<th style="width: 50px; padding-right: 15px"><label>상담사</label>
						</th>
						<td style="width: 400px;">
	
							<div class="dropdownBox" id="cslCntKw_multiCheckbox"></div> <input
							type="checkbox" id="cslCntKw_chkRetire" name=""
							class="checkbox"><label for="chkRetire">퇴사자 포함</label>
						</td>
	
						<td class="btn">
							<button type="button" id="cslCntKw_btnStsKeywordSearch"
								class="button">조회</button>
							<button type="button" id="cslCntKw_btnStsKeywordInit"
								class="button">초기화</button>
							<button type="button" id="cslCntKw_btnStsKeywordExelDown"
								class="button">엑셀저장</button>
						</td>
					</tr>
				</table>
			</div>
			<!--"조회/검색"-->
	
			<div
				style="text-align: right; color: blue; padding-top: 7px; padding-right: 7px;">*
				년도별, 월별은 당일데이타는 포함되지 않습니다.</div>
	
			<!-- 그리드테이블 -->
			<div id="cslCntKw_dvGridArea" style="margin-top: 5px;">
				<table id="cslCntKw_tblStsCounselingCntKeyword"></table>
			</div>
			<!--"그리드테이블"-->
	
		</div>
	</body>
</html>