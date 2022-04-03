<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>년도별 이직률 현황</title>
	<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<%-- <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jstree/themes/default/style.min.css" type="text/css"/> --%>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<%-- <script type="text/javascript" src="<c:url value='/resources/js/lib/jstree/jstree.js'/>"></script> --%>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/statistics/lflyStats.js'/>"></script>
		
		<base target="_self">
	</head>
	<body>
		<div id="h1">년도별 이직률 현황</div>
		<div id="pop_body" style="height: 682px;">
			<div class="stitle">년도별 이직률 조회</div><!--"타이틀"-->
			<div id="search">
				<table class="search_tbl">
					<tr>
						<th style = "width: 60px; padding-right : 15px">
							<label>검색 기간</label>
						</th>
						<td>
							<div style = "display: inline-block; width: 370px">
								<span id = "lfSt_termStart"></span>&nbsp;&nbsp;~&nbsp;&nbsp;
								<span id = "lfSt_termEnd"></span>
							</div>
						</td>
						<td class ="btn">
						<button type = "button" id = "lfSt_btnSearch" class="button">조회</button>
						<button type = "button" id = "lfSt_btnInit" class="button">초기화</button>
						</td>
					</tr>
				</table>
			</div>
			<!--"조회/검색"-->
			<div id="grid_all">
				<!-- 미사용/버튼 테이블 -->
				<table class="info_tbl">
					<tr>
						<th></th>
						<td>
							<button type="button" id="lfSt_btnExelDown" class="button">엑셀저장</button>
						</td>
					</tr>
				</table>
				<!--"미사용/버튼 테이블"-->
				<!--그리드-->
				<div style="width: 100%; margin-top:10px;">      
					<table id="lfSt_tbllflyStatsList"></table>
					<div id="lfSt_pglflyStatsList"></div>
				</div>
			</div>
		</div>
	</body>
</html>