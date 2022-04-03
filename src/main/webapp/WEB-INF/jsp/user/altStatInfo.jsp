<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset=UTF-8">
	<title>상태변경이력</title>
	<link rel="icon" href="/resources/images/favicon.ico">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
	
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-2.1.1.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/common.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/user/altStatInfo.js"></script>

</head>
<body>
	<div id="h1">상태변경이력</div>
	<div id="pop_body" style="height: 700px;">
		<div class="stitle">상태변경이력 조회</div>
		<div id="search">
			<table class="search_tbl">
				<tr>
					<th>상담사</th>
					<td class="sel" style="width: 100px;">
						<select id = "altStIf_optSrchUsrNm" class="select_al" ></select>
					</td>
					<th>상태</th>
					<td class="sel">
						<select id = "altStIf_optSrchStatType" class="select_al" ></select>
					</td>
					<td>
						<input type="checkbox" id="altStIf_useCategory" class="checkbox" style="margin: 0; margin-left: 10px;"/>
						<label for="useCategory">상담사별</label>
					</td>
					<th>근무일</th>
					<td width="40%" style="text-align: left;">
						<input type="text" style="width: 80px;" class="area_bl" id="altStIf_selStrtDate" maxlength="16" readonly>~
						<input type="text" style="width: 80px;" class="area_bl" id="altStIf_selEndDate" maxlength="16" readonly>		
  					</td>
					<td class="btn">
						<button type="button" id="altStIf_btnSearch" class="button">조회</button>
						<button type="button" id="altStIf_btnInit" class="button">초기화</button>
					</td>
				</tr> 
			</table>
		</div>
		<div id="grid_all">
			<div class="info_tbl">
				<span id="total"></span>
				<button type="button" id="altStIf_btnExcel"  class="button" style="float: right; margin-bottom: 5px;">엑셀저장</button>
			</div>
			<div id="grid1" style="clear: both;">
				<table id="altStIf_tbl1" style="clear: both"></table>
				<div id="altStIf_pg1"></div>
			</div>
			<div id="grid2" style="clear: both;">
				<table id="altStIf_tbl2" style="clear: both"></table>
				<div id="altStIf_pg2"></div>
			</div>
		</div>
	</div>
</body>
</html>