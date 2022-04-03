<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<title>민원인정보 수정이력</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/management/custModHistory.js'/>"></script>
	</head>
	
	<body>
		<div id="h1">민원인정보 수정이력</div>
		<div id="pop_body">
			<div class="stitle">민원인정보 수정이력</div>
			<div id="search">
				<table class="search_tbl">
			        <tr>
						<th>소속</th>
			          	<td style="width: 400px;">
			            	<select id="selSrchCntrCd" class="select_al" style="width: 24%;"></select>
							<select id="selSrchTeamCd" class="select_al" style="width: 24%;"></select>
							<select id="selSrchDeptCd" class="select_al" style="width: 24%;"></select>
							<select id="counsType1" class="select_al" style="width: 20%;"></select>
			          	</td>
			          	<th>민원인</th>
			          	<td  style="width: 25%;">
			          		<input type="hidden" id="srchCustID">
			          		<input type="text" style="width: 150px;" disabled="disabled" id="srchCustNM">
			          		<button type="button" id="btnSelectCust" class="button">민원인선택</button>
			          	</td>
			          	<th>작업유형</th>
			          	<td>
			          		<select id="selSrchWrkCl" class="select_al" style="width: 100px;">
			          			<option value="all" selected="selected">전체</option>
			          			<option value="INSERT">추가</option>
			          			<option value="UPDATE">수정</option>
			          			<option value="DELETE">삭제</option>
			          		</select>
			          	</td>
			        	<td style="width: 100px;">
							<button type="button" id="btnSearch" class="button">조회</button>
							<button type="button" id="btnInit" class="button">초기화</button>
						</td>
			      	</tr>
				</table>
			</div>
			<div class="stitle">수정이력 목록</div>
			<div id="grid_all">
				<table class="info_tbl">
					<tr>
						<td>
						</td>
					</tr>
				</table>
			 	<div class="grid_tbl">		 
				 	<table id="tblModHistory"></table>
					<div id="pgModHistory"></div>
			   	</div>
			</div>
			<div class="stitle_bot">수정이력 상세</div>
			<table class="profile_tbl">
				<tr>
					<td class="line_rt">작업 ID</td>
					<td class="line_b" id="tdWrkId"></td>
					<td class="line_c">작업일시</td>
					<td class="line_b" id="tdWrkDtm"></td>
				</tr>
				<tr>
					<td class="line_rt">소속</td>
					<td class="line_b" id="tdCntrNm"></td>
					<td class="line_c">상담사</td>
					<td class="line_b" id="tdUsrNm"></td>
				</tr>
				<tr>
					<td class="line_rt">민원인명</td>
					<td class="line_b" id="tdCustNm"></td>
					<td class="line_c"></td>
					<td class="line_b" id="tdCorpNm"></td>
				</tr>
				
			</table>
			<div class="stitle_bot">수정한 민원인정보</div>
			<table class="profile_tbl">
				<tr>
					<td class="line_rt">민원인명</td>
					<td class="line_b" id="specCustNm"></td>
					<td class="line_c">민원인성향</td>
					<td class="line_b" id="specComp"></td>
					<td class="line_c" rowspan="4">메모</td>
					<td class="line_b"rowspan="4" id="specMemo"></td>
				</tr>
				<tr>
					<td class="line_r">민원인유형</td>
					<td class="line_b" id="specCustType"></td>
					<td class="line_c">전화번호</td>
					<td class="line_b" id="specOfficeNo"></td>
				</tr>
				<tr>
										
					<td class="line_rt">핸드폰번호</td>
					<td class="line_b" id="specCellNo"></td>
					<td class="line_c">FAX번호</td>
					<td class="line_b" id="specFaxNo"></td>
				</tr>
			   <%-- <tr>
					<td class="line_r">집전화번호</td>
					<td class="line_b" id="specPhoneNo"></td>
					<td class="line_c">주소일련번호</td>
					<td class="line_b" id="specAddrNo"></td>
				</tr> --%>
			</table>
		</div>
	</body>
</html>