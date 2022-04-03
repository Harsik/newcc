<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<title>상담DB 조회</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/counsel/counselDbSearch.js'/>"></script>
		<style type="text/css">	
    	.ui-jqgrid tr.jqgrow td { white-space:nowrap !important; text-overflow: ellipsis;-o-text-overflow: ellipsis; }
    	</style>
	</head>
	
	<body>
	<div id="h1">상담DB 조회</div>
		<div id="pop_body" style="height: 846px;">
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
							<input type="text" id="csdbsc_tfLgMdSmSearch_01" class="text_ol" placeholder="상담유형 소분류 검색어를 입력해 주세요!" style="width: 300px; background-color:#d9f2ff;" >
							<select id="csdbsc_optCounselKnd1" class="select_bl" style="width: 13%;"></select>
							<select id="csdbsc_optCounselKnd2" class="select_bl" style="width: 13%;"></select>
							<select id="csdbsc_optCounselKnd3" class="select_bl" style="width: 40%;"></select>
						</td>
						
						<td class="btn" style="width: 10%;">
							<button type="button" id="csdbsc_btnJisikSearch"  class="button">조회</button>
							<button type="button" id="csdbsc_btnJisikInit"  class="button">초기화</button>
						</td>
					</tr>
					
					<tr>
						<th>검색</th>
						<td> 
							<select id="csdbsc_tfSrchType" class="select_bl_my" style="width:20%;">
								<option value="ttl">제목</option>
								<option value="cntn">내용</option>
								<option value="ttlCntn">제목+내용</option>
							</select>
							<input type="text" id="csdbsc_tfSrchVal" class="text_ol" style="width: 70%; "/>
						</td>
						
						<th>구분</th>
						<td><select id="csdbsc_optCdbKnd" class="select_bl" style="width: 100%;"></select></td>
						
						<th>승인구분</th>
						<td>
							<select id="csdbsc_chkNotUsetype" class="select_bl" style="width: 93%;">
								<option value="all">전체</option>
								<option value="Y">승인</option>
								<option value="N">미승인</option>
							</select>
						</td>
					</tr>
				</table>
				<div style="width: 100%;">				
					<table id="csdbsc_tblJisikSearch"></table>
					<div id="csdbsc_pgJisikSearch"></div>
				</div>			
		</div>
</body>
</html>