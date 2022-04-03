<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<title>반송</title>
		
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.css" type="text/css"/>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-1.12.4.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/civilservice/cswDbManage_return.js'/>"></script>
		<script>
	    var tbbsId = '${param.tbbsId}';
	    var reqId = '${param.reqId}';
	    var btnId = '${param.btnId}';
		</script>
	</head>
	<body>
		<div id="h1">반송사유를 입력해주세요</div>
		<div id="pop_body" style="height: 100px;">
			<textarea style="width: 99%; height: 80px;" id="csdbpr_chargerJobPrvonsh" class="text_ol" placeholder="반송사유를 입력해주세요."></textarea>
<!-- 			<input style="width: 99%; height: 80px;" id="csdbpr_chargerJobPrvonsh" class="text_ol" placeholder="반송사유를 입력해주세요."> -->
			<button type="button" id="returnBtn" class="button" style="display: block; float:left; margin-right:3px; margin-left:40%; margin-top:4px;">반송</button>
    		<button type="button" id="cancleBtn" class="button" style="display: block; float:left; margin-top:4px;">취소</button>
		</div>
	</body>
</html>