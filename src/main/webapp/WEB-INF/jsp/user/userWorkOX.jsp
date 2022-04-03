<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>출근부</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		

		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/user/userWorkOX.js'/>"></script>
		
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.css" type="text/css"/>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.js'/>"></script>
		<base target="_self">
	</head>


	<body>
		<div id="h1">출근부</div>
		<div id="pop_body" >
			<div class="stitle">출근부 조회</div><!--"타이틀"-->
			
			<div id="search">
				<table class="search_tbl">
					<tr>

						<th style = "width: 50px; padding-right : 15px">
							<label>조회월</label>
						</th>
						<td style = "width: 200px; ">
							<input type="text" class="text_Date" id="wrk_dt"  />		
						</td>
						<th>상담사</th>
						<!--  <td><select class="select_al" id="usrWrkOx_userWorkTeamCd" style="width: 100px;"></select></td>-->
						<td>
						<div class="dropdownBox" id="usrWrkOx_multiCheckbox"></div>
							<input type="checkbox" id="usrWrkOx_chkRetire" name="" class="checkbox"><label for="chkRetire">퇴사자 포함</label>
							<input type="checkbox" id="usrWrkOx_chkVcatn" name="" class="checkbox" checked="checked"><label for="chkVcatn">휴가 포함</label>
							</td>
						<td class="btn">
			                <button type="button" id="usrWrkOx_btnWorkSearch" class="button">조회</button>
			                <button type="button" id="usrWrkOx_btnWorkExelDown" class="button">엑셀저장</button>
			            </td>						
					</tr>
				</table>
			</div><!--"조회/검색"-->
			
		<!-- 그리드테이블 -->		
				<div id = "dvGridArea" style="margin-top: 77px;">
					<table id="usrWrkOx_tblWorkOX"></table>
				</div>
		<!--"그리드테이블"-->	
					
		</div>
	</body>
</html>