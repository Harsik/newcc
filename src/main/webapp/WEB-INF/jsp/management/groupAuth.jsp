<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>그룹권한 관리</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/management/groupAuth.js'/>"></script>
		<style>
			.grid-col
			{
				padding-left : 15px !important;
			}
		</style>
		
	</head>
	
	<body>
			
		<!--BODY-->
		<div id="h1">그룹권한 관리</div>
		
		<div id="pop_body">
			<!--타이틀-->
			<!--  
			<div class="stitle">
			그룹 조회
			</div><!--"타이틀"-->
			
			<!-- 조회/검색 -->
			<div id="search">
				<table class="search_tbl">
				<!-- 2020.01.05 hhs 검색 기능 주석처리 -->
					<tr>
<!-- 						<th>검색어</th> -->
<!-- 						<td class="sel"> -->
<!-- 							<select id = "grpAth_optSrchType" class="select_al" > -->
<!-- 								<option value="all">전체</option> -->
<!-- 								<option value="authNm">권한명</option> -->
<!-- 							</select> -->
<!-- 						</td> -->
<!-- 						<td class="nemo_30"> -->
<!-- 							<input type="text" id="grpAth_tfSrchVal" class="text_ol" maxlength="20" disabled> -->
<!-- 						</td> -->
						<td class="btn">
<!-- 							<button type="button" id="grpAth_btnSrch"  class="button">조회</button> -->
							<button type="button" id="grpAth_btnInit"  class="button">초기화</button>
						</td>
					</tr> 
				</table>
			</div><!--"조회/검색"-->
			
			<!--그리드-->
			<div id="grid_all">
			
				<!--왼쪽그리드-->
				<div id="code_admin_left">
				      
					<!--타이틀-->
					<div class="stitle">
						그룹 목록
					</div>
					
					<!-- 미사용/버튼 테이블 -->
					<table class="info_tbl">
						<tr>
							<td>
								<input type="checkbox" name="" id="grpAth_chkNotUse" class="checkbox">
								<label for = "chkNotUse">미사용포함</label>
							</td>
						</tr>
					</table><!--"미사용/버튼 테이블"-->
					
					<!-- 그리드테이블 -->
					<div class="grid_tbl">		 
						<table style="width:100%; height:580px;">
							<tr>
								<td>
									<table id = "grpAth_tblGroup"></table>
									<div id = "grpAth_innerGrpPager"></div>
								</td>
							</tr>
						</table>
					</div>	<!--"그리드테이블"-->
				
				</div><!--"왼쪽그리드"-->
				
				<!--오른쪽그리드-->
				<div id="code_admin_right">
				      
					<!--타이틀-->
					<div class="stitle">
					메뉴 목록
					</div><!--"타이틀"-->
					
					<!-- 미사용/버튼 테이블 -->
					<table class="info_tbl">
						<tr>
							<td>
								<button type="button" id="grpAth_btnProHide"  class="button" style="visibility: hidden;">복사</button>
								<button type="button" id="grpAth_btnProCopy"  class="button">복사</button>
								<button type="button" id="grpAth_btnProPasty"  class="button">붙여넣기</button>
								<button type="button" id="grpAth_btnProUp"  class="button">저장</button>
							</td>
						</tr>
					</table><!--"미사용/버튼 테이블"-->
					
					<!-- 그리드테이블 -->
					<div class="grid_tbl">		 
						<table style="width:100%; height:580px;">
							<tr>
								<td>
									<table id = "grpAth_tblPro"></table>
									<div id = "grpAth_innerProPager"></div> 								
								</td>
							</tr>
						</table>
					</div>	<!--"그리드테이블"-->
				
				</div><!--"오른쪽그리드"-->
			
			</div><!--"그리드"-->
			
			<!-- 개인정보테이블 -->
			<table class="profile_tbl_"></table><!--"개인정보테이블"-->
		
		</div><!--"BODY"-->
	</body>
</html>