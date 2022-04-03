<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>대상자 선택</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/campaign/cmpnCustom.js'/>"></script>
	</head>

	<body>
	
		<!--BODY-->
		<div id="h1">
			대상자 선택
		</div>
		<div id="pop_body">
			<!--타이틀-->
			<div class="stitle">
				대상자 조회
			</div>
			<!--"타이틀"-->
			<!-- 조회/검색 -->
			<div id="search2">
				<table class="search2_tbl">
					<tr>
						<th class="sel_80" style = "width: 50px;">기간</th>
						<td class="nemo_50">
							<input type="text" id="tfFrdt" class="text_ol keyDown" style="width: 30%;" readonly>~<input type="text" id="tfTodt" class="text_ol keyDown" style="width: 30%;'" readonly>
						</td> 
						<th>고객성향</th>
						<td class="sel_80" style="width: 80px;">
							<select class="select_al" id="selCustComp" style="width: 100%;"></select>
						</td>
						<th class="sel_80">전화번호</th>
						<td class="nemo_50" style="width: 80;">
							<select class="select_al" id = "selCntctType" style="width: 40%;">
								<option value="all" selected>전체</option>
								<option value="tel">일반전화</option>
								<option value="mobile">핸드폰번호</option>
							</select>
							<input type="text" class="text_ol keyDown" id = "tfCntctVal" maxlength="167" style="width: 50%;">
						</td>
						<td class="nemo_50" style="width: 130px;">
						</td>
						<td class="btn">
							<button type="button" id="btnCmpnCustmSrch" class="button">조회</button>
							<button type="button" id="btnCmpnCustmInit" class="button">초기화</button>
						</td>
					</tr> 
					<tr>
						<th>상담유형</th>
						<td class="nemo" colspan="5">
							<select id="selIntvLgCd" class="select_al" style="width: 100px;"></select>
							<select id="selIntvMdCd" class="select_al" style="width: 150px;"></select>
							<select id="selIntvSmCd" class="select_al" style="width: 300px;"></select>
						</td>
						<td colspan="2"></td>
					</tr>
				</table>
			</div><!--"조회/검색"-->

		    <!--그리드-->
			<div id="grid_all">
	 
				<!-- 미사용/버튼 테이블 -->
				<table class="info_tbl">
					<tr>
						<th></th>
						<td>
							<button type="button" id="btnCmpnCustmSave" class="button">추가</button>
						</td>
					</tr>
				</table><!--"미사용/버튼 테이블"-->

				<!--그리드-->
				<div id="grid_all">
					<table id = "cmpnCustm"></table>
					<div id = "pgInnerCustm"></div>
				</div>
		
			</div><!--"그리드"-->

		</div><!--"BODY"-->
	</body>
</html>