<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>주야 및 공휴일 상담현황</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		

		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/statistics/counselingCntHoliday.js'/>"></script>
		
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.css" type="text/css"/>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.js'/>"></script>
		<base target="_self">
	</head>


	<body>
		<div id="h1">주야 및 공휴일 상담현황</div>
		<div id="pop_body" >
			<div class="stitle">주야 및 공휴일 상담현황 조회</div><!--"타이틀"-->
			
			<div id="search">
				<table class="search_tbl">
					<tr>

						<th style = "width: 50px; padding-right : 15px">
							<label>기간</label>
						</th>
						<td style = "width: 730px; ">
									<input type="text" class="text_Date" id="cslCntHld_schDayStart"  />
									<span>~</span>
									<input type="text" class="text_Date" id="cslCntHld_schDayEnd" />	
						</td>
						
						<td class="btn" rowspan='2'>
			                <button type="button" id="cslCntHld_btnStsHolidaySearch" class="button">조회</button>
			                <button type="button" id="cslCntHld_btnStsHolidayInit" class="button">초기화</button>
			                <button type="button" id="cslCntHld_btnStsHolidayExelDown" class="button">엑셀저장</button>
			            </td>						
					</tr>
								
				</table>
			</div><!--"조회/검색"-->
			<div style="text-align: right; color: red; float: right;">* 조회기간을 3개월이상 선택 할 경우 시스템 과부화를 일으킬 수 있으므로, 근무외 시간을 이용하시기 바랍니다.</div>
		<!-- 그리드테이블 -->		
				<div id = "cslCntHld_dvGridArea" style="margin-top: 97px;">
					<table id="cslCntHld_tblStsCounselingCntHoliday"></table>
				</div>
		<!--"그리드테이블"-->						
					
		</div>
	</body>
</html>