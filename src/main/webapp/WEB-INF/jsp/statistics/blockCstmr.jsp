<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset=UTF-8">
	<title>악성민원 통계</title>
	<link rel="icon" href="/resources/images/favicon.ico">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.css" type="text/css"/>
	
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-2.1.1.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/common.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/statistics/blockCstmr.js"></script>

</head>
<body>
	<div id="h1">악성민원 통계</div>
	<div id="pop_body" style="height: 577px;">
		<div class="stitle">악성민원통계 조회</div>
		<div id="search">
			<table class="search_tbl">
				<tr>
					<th>조회일</th>
					<td style="text-align: left; width:50%">
						<select id = "blockStat_optTerm" style = "width: 100px;">
							<option value = "year">년도별</option>
							<option value = "month">월별</option>
							<option value = "day" selected="selected">일별</option>									
						</select>
								
						<div id="blockStat_dvYear" style="display: inline;">
							<select id = 'blockStat_schYearStart' style ='width : 70px; margin-left : 5px;' ></select>
							<span>~</span>
							<select id = 'blockStat_schYearEnd' style ='width : 70px; margin-left : 5px;' ></select>
						</div>
																
						<div id="blockStat_dvMonth" style="display: inline;">
							<input type="text" class="text_Date" id="blockStat_schMonthStart"  />									
							<span>~</span>
							<input type="text" class="text_Date" id="blockStat_schMonthEnd" />									
						</div>
								
						<div id="blockStat_dvDay" style="display: inline;">
							<input type="text" class="text_Date" id="blockStat_schDayStart"  />
							<span>~</span>
							<input type="text" class="text_Date" id="blockStat_schDayEnd" />								
						</div>		
  					</td>
  					<td>
						<input type="checkbox" id="blockStat_useCategory" class="checkbox" style="margin: 0; margin-left: 10px;"/>
						<label for="useCategory">차단이후 인입건수</label>
					</td>
					<td class="btn">
						<button type="button" id="blockStat_btnSearch" class="button">조회</button>
						<button type="button" id="blockStat_btnInit" class="button">초기화</button>
					</td>
				</tr> 
			</table>
		</div>
		<div id="grid_all">
			<div class="info_tbl">
				<span id="total"></span>
				<button type="button" id="blockStat_btnExcel"  class="button" style="float: right; margin-bottom: 5px;">엑셀저장</button>
			</div>
			<div id="grid1" style="clear: both;">
				<table id="blockStat_tbl1" style="clear: both"></table>
				<div id="blockStat_pg1"></div>
			</div>
			<div id="grid2" style="clear: both;">
				<table id="blockStat_tbl2" style="clear: both"></table>
				<div id="blockStat_pg2"></div>
			</div>
		</div>
	</div>
</body>
</html>