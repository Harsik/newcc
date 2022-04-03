<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>권한 등록</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jstree/themes/default/style.min.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jstree/jstree.js'/>"></script>
		
		<!-- showModal -->		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/egovframework/showModalDialogCallee.js'/>"></script>

		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/board/regBoardAuth.js'/>"></script>
		
		<style type="text/css">
			li {
				float: left;
				list-style-type: none;
			}
			input {
				width: 135px;
			}
			p {
				margin-top: 5px;
			}

		</style>
	</head>
	<body>
	<!-- 조회/검색 -->
	<div id="h1">열람권한</div>
	<div id="pop_body" style="height: 382px;">
		<div>
			<ul>
<!-- 				<li><p>검색</p></li> -->
<!-- 				<li style='margin-left: 5px;'><input type="text" id="tfSrchVal" /></li> -->
				<li style="margin-left: 100px; margin-right: 3px;"><button id="btnInsertAuth" class="button">저장</button></li>
				<li><button id="btnInitAuth" class="button">초기화</button></li>
			</ul>
		</div>
		
		<!-- 부서트리 -->	
		<div style="width: 100%; height: 92%; float: left; overflow-y: auto; margin-top: 15px;">
			<div id="deptList"></div>
		</div>
	</div>
</body>
</html>
