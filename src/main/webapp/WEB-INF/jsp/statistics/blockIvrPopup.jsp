<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset=UTF-8">
	<title>악성민원 IVR 조회</title>
	<link rel="icon" href="/resources/images/favicon.ico">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
	
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-2.1.1.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/common.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/statistics/blockIvrPopup.js"></script>
	
	<script type="text/javascript">
	var dt = '${param.dt}';
	var tel = '${param.tel}';
	var type = '${param.type}';
	</script>
</head>
<body>
	<div id="h1">IVR 인입 시간 조회</div>
		
		<div id="pop_body">
			<table style="width: 95%;">
				<tr>
					<td>
						<table id="blockIvrPop_tb"></table>
					</td>
				</tr>
			</table>
		</div>
</body>
</html>