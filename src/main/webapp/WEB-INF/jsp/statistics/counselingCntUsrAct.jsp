<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>상담사별 처리 현황</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		

		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/statistics/counselingCntUsrAct.js'/>"></script>
		
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.css" type="text/css"/>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.js'/>"></script>
		
		<link class="include" rel="stylesheet" type="text/css" href="/resources/js/lib/jquery.jqplot.1.0.8r1250/jquery.jqplot.min.css" />	    
	   	<script class="include" type="text/javascript" src="/resources/js/lib/jquery.jqplot.1.0.8r1250/jquery.jqplot.min.js"></script>
		<script class="include" type="text/javascript" src="/resources/js/lib/jquery.jqplot.1.0.8r1250/plugins/jqplot.barRenderer.min.js"></script>
		<script class="include" type="text/javascript" src="/resources/js/lib/jquery.jqplot.1.0.8r1250/plugins/jqplot.pieRenderer.min.js"></script>
		<script class="include" type="text/javascript" src="/resources/js/lib/jquery.jqplot.1.0.8r1250/plugins/jqplot.categoryAxisRenderer.min.js"></script> 
		<script class="include" type="text/javascript" src="/resources/js/lib/jquery.jqplot.1.0.8r1250/plugins/jqplot.pointLabels.min.js"></script>    
    
		<base target="_self">
	</head>


	<body>
		<div id="h1">상담사별 처리 현황</div>
		<div id="pop_body">
			<div class="stitle">상담사별 처리 현황 조회</div><!--"타이틀"-->
			
			<div id="search">
				<table class="search_tbl">
					<tr>

						<th style = "width: 30px; padding-right : 15px">
							<label>기간</label>
						</th>
						<td style = "width: 250px; ">
						
							<input type="text" class="text_Date" id="cslCntUsrAct_schDayStart"  />
							<span>~</span>
							<input type="text" class="text_Date" id="cslCntUsrAct_schDayEnd" />
														
						</td>
						
						<td>
					        <input type="checkbox" id="cslCntUsrAct_chkHoliday" name="" class="checkbox">
					        <label for="chkHoliday">주말 제외</label>
				        </td>
						
						<th style = "width: 50px; padding-right : 15px">
							<label>상담사</label>
						</th>
						<td style="width: 400px;">
							<select class="select_al" id="cslCntUsrAct_userTeamCd" style="width: 100px;"></select>
							<div class="dropdownBox" id="cslCntUsrAct_multiCheckbox" style="width: 150px;"></div>
							<input type="checkbox" id="cslCntUsrAct_chkRetire" name="" class="checkbox"><label for="chkRetire">퇴사자 포함</label>
						</td>
						
						<td class="btn">
			                <button type="button" id="cslCntUsrAct_btnStsActSearch" class="button">조회</button>
			                <button type="button" id="cslCntUsrAct_btnStsActInit" class="button">초기화</button>
			                <button type="button" id="cslCntUsrAct_btnStsActExelDown" class="button">엑셀저장</button>
			            </td>						
					</tr>
				</table>
			</div><!--"조회/검색"-->
			<div style="text-align: right; color: red; float: right;">* 조회기간을 3개월이상 선택 할 경우 시스템 과부화를 일으킬 수 있으므로, 근무외 시간을 이용하시기 바랍니다.</div>
			
			<div id="cslCntUsrAct_chart1" style="width:100%; height:200px; margin-top: 90px; "></div>
		
			
		<!-- 그리드테이블 -->		
				<div id = "cslCntUsrAct_dvGridArea" style="margin-top: 5px;">
					<table id="cslCntUsrAct_tblStsCounselingCntAct"></table>
				</div>
		<!--"그리드테이블"-->	
					
		</div>
	</body>
</html>