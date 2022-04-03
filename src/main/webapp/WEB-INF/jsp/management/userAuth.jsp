﻿<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>사용자 그룹 관리</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/management/userAuth.js'/>"></script>
	</head>
	<style>
		.grid-col
		{
			padding-left : 15px !important;
		}
	</style>
<body>
	<!--BODY-->
	<div id="h1">사용자 그룹 관리 </div>
	<div id="pop_body">
		<!--타이틀-->
		<div class="stitle">사용자 조회</div><!--"타이틀"-->
		<!-- 조회/검색 -->
		<div id="search">
			<table class="search_tbl">
				<tr>
					<th>검색어</th>
					<td class="sel">
						<select class="select_al" id = "usrAth_optSrchType">
							<option value = "all">전체</option>
							<option value="usrId">아이디</option>
							<option value="usrNm">이름</option>
						</select>
					</td>
					<td class="nemo_30">
						<input type="text" id="usrAth_tfSrchVal" class="text_ol" maxlength="167" disabled>
					</td>
					<td class="btn">
						<button type="button" id="usrAth_btnSrch"  class="button">조회</button>
<!-- 						<button type="button" id="usrAth_btnSrch"  class="button">초기화</button> -->
						<!-- 2020.01.04 hhs 초기화버튼 수정 -->
						<button type="button" id="usrAth_btnInit"  class="button">초기화</button>
					</td>
				</tr> 
			</table>
		</div><!--"조회/검색"-->
		   
		<!--그리드-->
		<div id="grid_all">
			<!--왼쪽그리드-->
			<div id="code_left">
				<!--타이틀-->
				<div class="stitle">
					사용자목록
				</div>
				
				<!-- 미사용/버튼 테이블 -->
				<table class="info_tbl">
					<tr>
						<td>
							<input type="checkbox" id="usrAth_chkRetire" name="" class="checkbox"><label for="chkRetire">퇴사자 포함</label>
						</td>
					</tr>
				</table><!--"미사용/버튼 테이블"-->
				
				<!-- 그리드테이블 -->
				<div class="grid_tbl">		 
					<table style="width:100%; height:580px;">
						<tr>
							<td>
								<table id = "usrAth_tblUsr"></table>
								<div id = "usrAth_innerUsrPager"></div>							
							</td>
						</tr>
					</table>
				</div>	<!--"그리드테이블"-->
				
			</div><!--"왼쪽그리드"-->
			
			<!--오른쪽그리드-->
			<div id="code_right">
				      
				<!--타이틀-->
				<div class="stitle">그룹 목록</div><!--"타이틀"-->
				
				<!-- 미사용/버튼 테이블 -->
				<table class="info_tbl">
					<tr>
						<td>
							<button type="button" class="button" style = "margin : 0px; margin-left : 10px; visibility: hidden;" >수정</button>
							<input type="checkbox" id = "usrAth_chkNotUse" name="" class="checkbox" checked disabled ><label for="chkNotUse">미선택 포함</label>
							<button type="button" id="usrAth_btnGroupUp"  class="button">저장</button>
						</td>
					</tr>
				</table><!--"미사용/버튼 테이블"-->
				
				<!-- 그리드테이블 -->
				<div class="grid_tbl">		 
					<table style="width:100%; height:580px;">
						<tr>
							<td>
							  	<table id = "usrAth_tblGroup"></table>
								<div id = "innerGrpPager"></div>
							</td>
						</tr>
					</table>
				</div>	<!--"그리드테이블"-->
				
			</div><!--"오른쪽그리드"-->
					
		</div><!--"그리드"-->
		
	</div><!--"BODY"-->
</body>
</html>