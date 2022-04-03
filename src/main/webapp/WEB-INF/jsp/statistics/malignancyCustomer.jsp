<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
<head>
<meta charset="UTF-8">
<title>특이민원인 현황</title>
	<link rel="icon" href="/resources/images/favicon.ico">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css" />

<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/statistics/malignancyCustomer.js'/>"></script>

		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.css" type="text/css"/>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.js'/>"></script>
</head>

<body>
	<!--BODY-->
	<div id="h1">특이민원인 현황</div>
	<div id="pop_body" style="height: 682px;">
		<!--타이틀-->
		<div class="stitle">특이민원인 현황 조회</div>
		<!--"타이틀"-->
		<!-- 조회/검색 -->
		<div id="search" style="height: 27px;">
			<table class="search_tbl">
				<tr>
					<!-- <th>검색기간</th>
					<td width="25%" style="text-align: left;"><input id="mgCtm_tfTbbsStrtDt" type="text" class="text_ol_half" style="width: 25%;" /> &nbsp;&nbsp;~&nbsp; <input
						id="mgCtm_tfTbbsEndDt" type="text" class="text_ol_half" style="width: 25%;" /></td> -->
						<th style = "width: 30px; padding-right : 15px">
						<label>기간</label>
						</th>
						<td style = "width: 350px; ">
							
								<select id = "mgCtm_optTerm" style = "width: 100px;">
									<option value = "month">월별</option>
									<option value = "day" selected="selected">일별</option>									
								</select>
																								
								<div id="mgCtm_dvMonth" style="display: inline;">
									<input type="text" class="text_Date" id="mgCtm_schMonthStart"  />									
									<span>~</span>
									<input type="text" class="text_Date" id="mgCtm_schMonthEnd" />									
								</div>
								
								<div id="mgCtm_dvDay" style="display: inline;">
									<input type="text" class="text_Date" id="mgCtm_schDayStart"  />
									<span>~</span>
									<input type="text" class="text_Date" id="mgCtm_schDayEnd" />								
								</div>
							
						</td>
					
					<th>전화번호</th>
					<td width="10%" style="text-align: left;">
						<input id="mgCtm_customer_tel" type="text" class="text_ol" style="width:90%;">
					</td>
					
					<th>민원인성향</th>
					<td width="10%" style="text-align: left;">
						<!-- <select class="select_bl" id="mgCtm_optUsrNmList"></select> -->
						<select class="select_bl" id="mgCtm_optDtCustmComp"></select>
					</td>

					<td class="btn">
						<button type="button" id="mgCtm_btnSearch" class="button">조회</button>
						<button type="button" id="mgCtm_btnInit" class="button">초기화</button>
						<button type="button" id="mgCtm_btnExcel" class="button">엑셀저장</button>
					</td>
				</tr>
			</table>			
		</div>
			
		<div id="delCumtomerJqgrid" style="width: 100%; margin-top: 60px; clear: both;">
			<table id="mgCtm_tblNotifyList"></table>
			<div id="mgCtm_pgNotifyList"></div>
		</div>
		
	</div>
</body>
</html>
