<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<title>상담DB이력 보기</title>
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
		<script type="text/javascript" src="<c:url value='/resources/js/civilservice/cswDbManage_processDetailHist.js'/>"></script>
		<script>
	    var tbbsId = '${param.tbbsId}';
		</script>
	</head>
	<body>
	<div id="h1">상담DB이력 보기</div>
		<div id="pop_body" style="height: 766px;">
		<div class="stitle" style="margin-bottom: 6px;">상담DB이력 보기</div>	
    	<button type="button" id="btnCnslAltList" class="button" style="display: block;float:right;margin-bottom:3px;">상담DB 변경이력</button>						
<!-- 				<table style="background-color: #e5e5e5; border: 1px solid #c5c5c5; width: 100%; height: 45px; margin-bottom: 20px;">
					<tr>
             			<th style="width: 60px;">검색기간</th>
		      				<td colspan="2">
		       		 		<input type="text" class="text_Date" id="hisSrchSelFrDate" maxlength="10"> &nbsp; ~ &nbsp;  <input type="text" class="text_Date" id="hisSrchSelToDate" maxlength="10" >  
		      			</td>

						<td class="btn" style="width: 5%;">
							<button type="button" id="btnHisSearch" class="button">조회</button>
						</td>
					</tr>

				</table> -->
				<div style="width: 100%; clear: both;">				
					<table id="cdmpdh_tblHisSearch"></table>
					<div id="cdmpdh_pgHisSearch"></div>
				</div>			
		</div>
</body>
</html>