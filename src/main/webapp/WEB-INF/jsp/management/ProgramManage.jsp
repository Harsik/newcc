<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<title>메뉴 관리</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/management/ProgramManage.js'/>"></script>
	</head>
	
	<body>
		
		<!--BODY-->
		<div id="h1">메뉴 관리</div>
		<div id="pop_body">
			<!--타이틀-->
			<div class="stitle">메뉴 조회</div>
			<!--"타이틀"-->
			<!-- 조회/검색 -->
			<div id="search">
				<table class="search_tbl">
			        <tr>
						<th>검색어</th>
			          	<td class="sel">
			            	<select class="select_al" id="prgrmMng_optSrchtype">
								<option value="all">전체</option>
								<option value="mnu_nm">메뉴명</option>
								<option value="mnu_url">메뉴URL</option>
							</select>
			          	</td>
						<td class="nemo_30">
				        	<input type="text" class="text_ol" id="prgrmMng_tfSrchval" maxlength="60">
			     		</td>
			        	<td class="btn">
							<button type="button" id="prgrmMng_btnSearch"  class="button">조회</button>
							<button type="button" id="prgrmMng_btnInit"  class="button">초기화</button>
						</td>
			      	</tr>
				</table>
			</div><!--"조회/검색"-->
		
			<!--타이틀-->
			<div class="stitle">메뉴 목록</div>
			<!--"타이틀"-->
		    <!--그리드-->
			<div id="grid_all">
				<!-- 미사용/버튼 테이블 -->
				<table class="info_tbl">
					<tr>
						<td>
							<input type="checkbox" name="check1" class="checkbox" id="prgrmMng_chkNotUse"><label for="chkNotUse">미사용 포함</label>
							<button type="button" id="prgrmMng_btnExcel"  class="button">엑셀저장</button>
						</td>
					</tr>
				</table>
				<!--"미사용/버튼 테이블"-->
		
				<!-- 그리드테이블 -->
			 	<div class="grid_tbl">		 
				 	<table id="prgrmMng_tblProgramList"></table>
					<div id="prgrmMng_pgProgramList"></div>
					<!-- 버튼 테이블 -->			
			   	</div>
				<!--"그리드테이블"-->
			</div>
			<!--"그리드"-->
		
			<!--타이틀-->
			<div class="stitle_bot">메뉴 상세</div>
			<!--"타이틀"-->
			<table class="info_tbl_btn">
				<tr>
					<th></th>
					<td>
						<button type="button" id="prgrmMng_btnInsert"  class="button">추가</button>
						<button type="button" id="prgrmMng_btnUpdate"  class="button">저장</button>
						<button type="button" id="prgrmMng_btnReset"  class="button">초기화</button>
					</td>
				</tr>
			</table>
			<!--"버튼 테이블"-->
			<!-- 개인정보테이블 -->		
			<table class="profile_tbl">
				<tr>
					<td class="line_rt">메뉴 ID</td>
					<td class="line_b"><input type="text" class="text_ol" id="prgrmMng_mnuId" maxlength="20"></td>
					<td class="line_c">부모메뉴 ID</td>
					<td class="line_b"><input type="text" class="text_ol" id="prgrmMng_parntMnuId" maxlength="20"></td>
				</tr>
				<tr>
					<td class="line_rt">메뉴 URL</td>
					<td class="line_b"><input type="text" class="text_ol" id="prgrmMng_mnuUrl" maxlength="60"></td>
					<td class="line_c">부모메뉴 URL</td>
					<td class="line_b"><input type="text" class="text_ol" id="prgrmMng_parntMnuUrl" maxlength="60"></td>
				</tr>
				<tr>
					<td class="line_rt">메뉴명</td>
					<td class="line_b"><input type="text" class="text_ol" id="prgrmMng_mnuNm" maxlength="20"></td>
					<td class="line_c">사용여부</td>
					<td class="line_b">
						<input type="radio" class="radio" name="program_use_yn" id="program_use_yn_y" value="Y" checked="checked"><label for="program_use_yn_y">사용</label>
						<input type="radio" name="program_use_yn" id="program_use_yn_n" value="N"><label for="program_use_yn_n">미사용</label>
					</td>
				</tr>
				<tr>
					<td class="line_rt">메뉴 넓이</td>
					<td class="line_b" ><input type="text" class="text_ol" id="prgrmMng_wdtSz" maxlength="4"></td>
					<td class="line_c">메뉴 높이</td>
					<td class="line_b"><input type="text" class="text_ol" id="prgrmMng_hghtSz" maxlength="4"></td>
				</tr>
				<tr>
					<td class="line_rt">등록일</td>
					<td class="line_b" id="prgrmMng_crtDt"></td>
					<td class="line_c">수정일</td>
					<td class="line_b" id="prgrmMng_modDt"></td>
				</tr>				
				<tr>
					<td class="line_rb">등록자</td>
					<td class="line_wb" id="prgrmMng_crtUsrId"></td>
					<td class="line_rb2">수정자</td>
					<td class="line_wb" id="prgrmMng_modUsrId"></td>
				</tr>
			</table>
			<!--"개인정보테이블"-->
		</div>
	<!--"BODY"-->
	</body>
</html>