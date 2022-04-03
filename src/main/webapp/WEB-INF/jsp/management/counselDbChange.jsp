<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>상담DB변경</title>
<link rel="icon" href="/resources/images/favicon.ico">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/myinfo.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.css" type="text/css" />
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/dext5editor/js/dext5editor.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/management/counselDbChange.js'/>"></script>
<!-- KukudocsEditor  -->
<script type="text/javascript" src="<c:url value='/resources/KukudocsEditor/javascripts/build/Editor.bundle.js'/>"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/KukudocsEditor/stylesheets/style.css" type="text/css" />
</head>
<body>
	<div id="h1">상담DB</div>
	<div id="pop_body" style="height: 910px;">
		<div class="stitle">상담DB 조회</div>						
		<table style="background-color: #e5e5e5; border: 1px solid #c5c5c5; width: 100%; height: 45px; margin-bottom: 20px;">
			<colgroup>
		       	<col style="width:7%">
		       	<col style="width:30%">
		       	<col style="width:7%">
		       	<col style="width:14%">
		       	<col style="width:7%">
		       	<col style="width:14%">
		       	<col style="width:7%">
		       </colgroup>
			<tr>
				<th>상담유형</th>
				<td colspan="5">
					<select id="csdbcg_optCounselKnd1" class="select_bl" style="width: 13%;"></select>
					<select id="csdbcg_optCounselKnd2" class="select_bl" style="width: 13%;"></select>
					<select id="csdbcg_optCounselKnd3" class="select_bl" style="width: 40%;"></select>
				</td>
				
				<td class="btn" style="width: 10%;">
					<button type="button" id="csdbcg_btnJisikSearch"  class="button">조회</button>
					<button type="button" id="csdbcg_btnJisikInit"  class="button">초기화</button>
				</td>
			</tr>
			
			<tr>
				<th>검색</th>
				<td> 
					<select id="csdbcg_tfSrchType" class="select_bl_my" style="width:20%;">
						<option value="ttl">제목</option>
						<option value="cntn">내용</option>
						<option value="ttlCntn" selected>제목+내용</option>
					</select>
					<input type="text" id="csdbcg_tfSrchVal" class="text_ol" style="width: 70%; "/>
				</td>
			</tr>
		</table>
			
		<div class="stitle">상담DB 변경</div>
		<table style="background-color: #e5e5e5; border: 1px solid #c5c5c5; width: 100%; height: 45px; margin-bottom: 20px;">
			<tr>
				<th style="width:7%;">일괄변경</th>
				<td colspan="5">
					<select id="csdbcg_optLgCd" class="select_bl" style="width: 13%;"></select>
					<select id="csdbcg_optMdCd" class="select_bl" style="width: 13%;"></select>
					<select id="csdbcg_optSmcd" class="select_bl" style="width: 40%;"></select>
				</td>
				<td>
					<button type="button" id="csdbcg_btnAllChange"  class="button" style="float: right; margin-right: 15px;">변경</button>
				</td>
			</tr>
		</table>
				
				
		<div style="width: 100%;">
			<table id="csdbcg_tblJisikSearch"></table>
			<div id="csdbcg_pgJisikSearch"></div>
		</div>			
	</div>
</body>
</html>