<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>근태이력</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-2.1.1.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/common.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/user/userInfo.js"></script>
		<style>
			.grid-col
			{
				padding-left : 15px !important;
			}
		</style>
		
	</head>
	
	<body>
			
		<!--BODY-->
		<div id="h1">근태이력</div>
		
		<div id="pop_body" style="height: 670px;">
			<!--타이틀-->
			<div class="stitle">
			근태이력 조회
			</div><!--"타이틀"-->
			<!-- 조회/검색 -->
			<div id="search">
				<table class="search_tbl">
					<tr>
						<th>상담사</th>
						<td class="sel" style="width: 100px;">
							<select id = "usrInf_optSrchType" class="select_al" >
							</select>
						</td>
						<th>근태</th>
						<td class="sel">
							<select id = "usrInf_commType" class="select_al" > 
							</select>
						</td>
						<th>근무일</th>
						<td width="40%" style="text-align: left;">
							<input type="text" style="width: 80px;" class="text_ol" id="usrInf_selFrDate" maxlength="16">
							 ~
							<input type="text" style="width: 80px;" class="text_ol" id="usrInf_selToDate" maxlength="16">		
	  					</td>
						<td class="btn">
							<button type="button" id="usrInf_btnSearch" class="button">조회</button>
							<button type="button" id="usrInf_btnInit" class="button">초기화</button>
						</td>
					</tr> 
				</table>
			</div><!--"조회/검색"-->
			
			<!--그리드-->
			<div id="grid_all">
				<div id="code_admin_left" style="width: 100%;">
				      
					<!--타이틀-->
					<div class="stitle">
						근태이력
					</div>
					
					<!-- 그리드테이블 -->
					<div class="grid_tbl">
						<div class="info_tbl" style="text-align: right;">
							<button type="button" id="usrInf_btnExcel"  class="button">엑셀저장</button>
						</div>
						<table style="width:263%; height:200px;">
							<tr>
								<td>
									<div style="width: 38%">
										<table id = "usrInf_tblGroup"></table>
										<div id = "usrInf_innerGrpPager"></div>
									</div>
								</td>
							</tr>
						</table>
					</div>	<!--"그리드테이블"-->
				
				</div>
				
			
			</div><!--"그리드"-->
			<div id="comtable">
			
				<div id="grid_all">
					<!-- 버튼 테이블 -->
					<table class="info_tbl_btn" style="height: 24px;">
						<tr>					
							<td id="usrInf_divBtn" class="btn">
								<button type="button" id="usrInf_btnInsertUser"  class="button">추가</button>
								<button type="button" id="usrInf_btnDelete"  class="button">삭제</button>
								<button type="button" id="usrInf_btnProp"  class="button">수정</button>
							</td>
						</tr>
					</table>
			<!--"버튼 테이블"-->
     			</div>
				<table class="profile_tbl" id ="usrInf_userInfoTable">
					 <colgroup>
				        <col width="25%"/>
				        <col width="50%"/>
				        <col width="20%"/>
				        <col width="25%"/>
				        <col width="20%"/>
				        <col width="20%"/>
				        <col width="25%"/>
				        <col width="20%"/>
				        <col width="25%"/>
				        <col width="20%"/>
				        <col width="20%"/>
				        <col width="20%"/>
				      </colgroup> 
					
					<tr>
						<td class="line_rt">근무자</td>
						<td class="line_b" colspan="2" id="cntr" style="width: 20%">
						<td class="line_c">상담사선택</td>
						<td class="line_b" colspan="2"  style="width: 20%">
							<select id="usrInf_userList" class="select_bl" style="width: 105px; "></select>
						</td>
						<td class="line_c" >근태</td>
						<td class="line_b" colspan="5">
							<select class="select_bl_10" id="usrInf_dyt_cd"></select>
						</td>
					</tr>
					<tr>
						<td class="line_rt">출근일</td>
						<td class="line_b" colspan="2">
							<div id="usrInf_clickPrevent">
								<input type="text" class="text_ol_80" id="usrInf_wrkDt" style="width: 112px;" readonly>
							</div>
						</td>
						<td class="line_c">출근시각</td>
						<td class="line_b" colspan="2"><input type="text" class="text_ol_80" id="usrInf_aawTime" name="aawTime" maxlength="8"></td>
						<td class="line_c">생성자</td>
						<td class="line_b" id="crtNm" colspan="2"></td>
						<td class="line_c" >생성일시</td>
						<td class="line_b" colspan="2" id="usrInf_crtDtTm"></td>
					</tr>
					<tr>
						<td class="line_rb">근무시간</td>
						<td class="line_wb" id="usrInf_totalTime" colspan="2"></td>
						<td class="line_rb2">퇴근시각</td>
						<td class="line_wb" colspan="2"><input type="text" class="text_ol_80" id="usrInf_lvofTime" name="lvofTime" maxlength="8"></td>
						<td class="line_rb2">수정자</td>
						<td class="line_wb" id="usrInf_modNm" colspan="2"></td>
						<td class="line_rb2">수정일시</td>
						<td class="line_wb" colspan="2" id="usrInf_modDtTm"></td>
					</tr>
				</table>
				<input type ="hidden" id="usrInf_deleteUsr"/>
			</div>
			

		
		</div><!--"BODY"-->
	</body>
</html>