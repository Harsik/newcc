<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<% 

	String tckt_id  = request.getParameter("tckt_id");
	String tntr_id  = request.getParameter("tntr_id");
	String ord  = request.getParameter("ord");
	
%>

<c:set var="tckt_id" value="<%=tckt_id%>" />
<c:set var="tntr_id" value="<%=tntr_id%>" />
<c:set var="ord" value="<%=ord%>" />

<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta charset="UTF-8">
	<title>공무원 업무</title>
	<link rel="icon" href="/resources/images/favicon.ico">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/myinfo.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.css" type="text/css"/>
	
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/dext5editor/js/dext5editor.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/civilservice/cswVocHistory.js'/>"></script>	
</head>

<style>
.ui-jqgrid tr.ui-row-ltr td {
    height:auto;
    overflow:hidden;
    padding-right:2px;
    padding-left:2px;
    padding-top:4px;
    padding-bottom:4px;
    position:relative;
    vertical-align:text-top;
    white-space:normal !important;
}
</style>


<body>
	<div id="h1">이관민원 이력보기</div>
	<div id="pop_body" style="height: 685px;">
	
		
		<input type="hidden" id="tckt_id" name="tckt_id" value="${tckt_id}"/>
		<input type="hidden" id="tntr_id" name="tntr_id" value="${tntr_id}"/>
		<input type="hidden" id="ord" name="ord" value="${ord}"/>
		
			        <!-- 조회/검색 -->
			        <!-- <div id="search">
			          <table class="search_tbl">
			            <tr>
			              <td class="btn">
			                <button type="button" id="btnVocHistorySearch" class="button">조회</button>
			              </td>
			            </tr> 
			          </table>
			        </div> -->
			        <!--"조회/검색"-->

		<div class="stitle">이관이력 조회</div>

		<!-- 그리드테이블 -->
		<table
			style="width: 100%; height: 318px; background-image: url('./img/sam.gif');">
			<tr>
				<td>
					<table id="tblVocHistory"></table>
					<div id="pagingVocHistory"></div>
				</td>
			</tr>
		</table>
		<!--"그리드테이블"-->

	</div>
</body>
</html>