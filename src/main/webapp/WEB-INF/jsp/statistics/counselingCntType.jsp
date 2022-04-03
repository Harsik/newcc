<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>카테고리별 상담 현황</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		

		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/statistics/counselingCntType.js'/>"></script>
		
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.css" type="text/css"/>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.js'/>"></script>
		<base target="_self">
	</head>


	<body>
		<div id="h1">카테고리별 상담 현황</div>
		<div id="pop_body" >
			<div class="stitle">카테고리별 상담 현황 조회</div><!--"타이틀"-->
			
			<div id="search2" style="height: 35px;">
				<table class="search2_tbl">
					<tr>
						<th style = "width: 50px; padding-right : 15px">
							<label>상담유형</label>
						</th>
						<td style = "width: 350px; ">							
							<select class="select_al" style="width:100px;" id="cslCntTp_selSrchIntvLgCd"></select>
							<select class="select_al" style="width:150px;" id="cslCntTp_selSrchIntvMdCd"></select>
						</td>
						
						<th style = "width: 50px; padding-right : 15px">
							<label>조회기간</label>
						</th>
						<td style = "width: 230px; ">
							<input type="text" class="text_Date" id="cslCntTp_schDayStart"  />
							<span>~</span>
							<input type="text" class="text_Date" id="cslCntTp_schDayEnd" />	
						</td>
						
						<td>
					        <input type="checkbox" id="cslCntTp_chkHoliday" name="" class="checkbox">
					        <label for="chkHoliday">주말 제외</label>
				        </td>
						
						<td class="btn">
			                <button type="button" id="cslCntTp_btnStsTypeSearch" class="button">조회</button>
			                <button type="button" id="cslCntTp_btnStsTypeInit" class="button">초기화</button>
			                <button type="button" id="cslCntTp_btnStsTypeExelDown" class="button">엑셀저장</button>
			            </td>
					</tr>
				</table>
			</div><!--"조회/검색"-->
			
			<div style="text-align: right; color: red; float: right;">* 조회기간을 3개월이상 선택 할 경우 시스템 과부화를 일으킬 수 있으므로, 근무외 시간을 이용하시기 바랍니다.</div>
			
		<!-- 그리드테이블 -->		
			<div id = "cslCntTp_dvGridArea" style="margin-top: 105px;">
			</div>
		<!--"그리드테이블"-->				
		</div>
	</body>
</html>