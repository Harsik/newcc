<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>

<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<title>공지게시판</title>
<link rel="icon" href="/resources/images/favicon.ico">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css" />

<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/board/mYnotifyBoard.js'/>"></script>
</head>
<body>
	<div id="h1">공지 조회자 리스트</div>
	<div id="pop_body" style="overflow-y: scroll; height: 334px;">
		<div class="stitle">조회자 검색</div>
		<!-- 리스트 -->
		<div id="grid_all">
			<table class="info_tbl">
				<tr>
					<td></td>
				</tr>
			</table>
			<!-- 그리드테이블 -->
			<div class="grid_tbl">
				<table id="tblNotifyList"></table>
				<div id="pgNotifyList"></div>
			</div>
		</div>
	</div>
</body>
</html>