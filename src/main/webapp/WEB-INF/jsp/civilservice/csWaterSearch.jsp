<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>행정정보</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.theme.css" type="text/css" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jstree/themes/default/style.custom.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jstree/jstree.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/civilservice/csWaterSearch.js'/>"></script>
		
	</head>
	
	<body>
			
		<div id="h1">수용가 번호 찾기</div>
		
		<div id="pop_body" style="height: 600px;">
			<div id="search" style="height:50px;">
				<table class="search_tbl">
					<tr>
						<th style="margin: 4px; float: left;">구주소</th>
						<td style="float: left;">
							<input type="text" class="text_ol" id="suy_addr1" style="width:100%;" placeholder="장천동 26-7">
						</td>
						
						<th style="margin: 4px; float: left;">신주소</th>
						<td style="float: left;">
							<input type="text" class="text_ol" id="suy_addr2" style="width:100%;" placeholder="이수로 13">
						</td>
						
						<th style="margin: 4px; float: left;">성명</th>
						<td style="float: left;">
							<input type="text" class="text_ol" id="searchNm" style="width:100%;">
						</td>
						
						<td style="width: 20%;text-align:right;padding-right:5px;">
							<button type="button" id="btnSearch"  class="button">찾기</button>
				            <button type="button" id="btnCheck" class="button">확인</button>
				            <button type="button" id="btnReset" class="button">초기화</button>
						</td>
					</tr>
				</table>
				<span style="font-weight: bold; padding-left: 32px; font-size:12px;">1) 더블 클릭, 또는 선택 후 확인 버튼을 눌러주세요. 2) 주소 검색시 띄어쓰기에 유의해 주시기 바랍니다.</span>
			</div>

			<table style="width: 100%; height: 480px;">
				<tr>
					<td>
						<table id="cswterSearch_tblWaterList"></table>
						<div id="cswterSearch_pg"></div>				
					</td>
				</tr>
			</table>
		</div>

	</body>
</html>