<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>고객검색</title>
		<link rel="icon" href="/resources/images/favicon.ico">	
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/campaign/cmpnCustomSearch.js'/>"></script>
	</head>

	<body>
	
		<!--BODY-->
		<div id="h1">
			고객검색
		</div>
		<div id="pop_body">
			<!--타이틀-->
			<div class="stitle">
				고객검색
			</div>
			<!--"타이틀"-->
			<!-- 조회/검색 -->
			<div id="search">
				<table class="search2_tbl">
					<tr>
						<th class="sel_80" style = "width: 140px;">
							<label>
								핸드폰, 사무실번호
							</label>
						</th>
						<td class="sel_80">
							<input type="text" class="text_ol keyDown" id = "findCmpnCustmSearch1" maxlength="200">
						</td>
						
						<th>회사/부서</th>
						<td class="sel_80">
							<input type="text" class="text_ol keyDown" id = "findCmpnCustmSearch2" maxlength="167">
						</td>
						<th class="sel_80">
							<label>
								고객명
							</label>
						</th>
						<td class="sel_80">
							<input type="text" class="text_ol keyDown" id = "findCmpnCustmSearch3" maxlength="167">
						</td>
						<th style="width: 9%">농장식별번호</th>
						<td class="sel_80">
							<input type="text" class="text_ol keyDown" id = "findCmpnCustmSearch4" maxlength="167">
						</td>
						<td class="btn">
							<button type="button" id="findCmpnCustmSearch" class="button">조회</button>
							<button type="button" id="btnCmpnCustmSearchInit" class="button">초기화</button>
						</td>
					</tr> 
				</table>
			</div><!--"조회/검색"-->

		    <!--그리드-->
			<div id="grid_all">
	 
				<!-- 미사용/버튼 테이블 -->
				<table class="info_tbl">
					<tr>
						<!-- <th></th>
						<td>
							<button type="button" id="btnCmpnCustmSearchSave" class="button">저장</button>
						</td> -->
					</tr>
				</table><!--"미사용/버튼 테이블"-->

				<!--그리드-->
				<div id="grid_all">
					<table id = "cmpnCustmSearch"></table>
					<div id = "pgInnerCustmSearch"></div>
				</div>
		
			</div><!--"그리드"-->
			<div id="grid_all">
				<div class="stitle" style="margin-top: 10px;">고객상세정보</div>
				<div>
					<table class="info_tbl">
						<tr>
							<td>
								<button type="button" id="btnCmpnCustmSearchInit2" class="button">초기화</button>
								<button type="button" id="btnCmpnCustmSearchChoice" class="button">선택</button>
							</td>
						</tr>
					</table>
				
					<table class="profile_tbl">
						<tr>
							<td class="line_rt">
								고객명
							</td>
							<td class="line_b">
								<label id="cmpnCustmSearch1"></label>
							</td>
							<td class="line_c">
								회사/부서
							</td>
							<td class="line_b">
								<label id="cmpnCustmSearch2"></label> 
							</td>
							<td class="line_c">
								사업자번호
							</td>
							<td class="line_b">
								<label id="cmpnCustmSearch3"></label>
							</td>
						</tr>
						<tr>
							<td class="line_rt">
								핸드폰번호
							</td>
							<td class="line_b">
								<label id="cmpnCustmSearch4"></label>
							</td>
							<td class="line_c">
								사무실번호
							</td>
							<td class="line_b">
								<label id="cmpnCustmSearch5"></label> 
							</td>
							<td class="line_c">
								농장식별번호
							</td>
							<td class="line_b">
								<label id="cmpnCustmSearch6"></label>
							</td>
						</tr>
						<tr>
							<td class="line_rt">
								생년월일
							</td>
							<td class="line_b">
								<label id="cmpnCustmSearch7"></label>
							</td>
							<td class="line_c">
								법인번호
							</td>
							<td class="line_b">
								<label id="cmpnCustmSearch8"></label> 
							</td>
							<td class="line_c">
								주소일련번호
							</td>
							<td class="line_b">
								<label id="cmpnCustmSearch9"></label>
							</td>
						</tr>
						<tr>
							<td class="line_rt">
								주소
							</td>
							<td class="line_b" colspan="5">
								<label id="cmpnCustmSearch10"></label>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div><!--"BODY"-->
	</body>
</html>