<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<title>이관목록</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.css" type="text/css"/>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" integrity="sha256-3dkvEK0WLHRJ7/Csr0BZjAWxERc5WH7bdeUya2aXxdU= sha512-+L4yy6FRcDGbXJ9mPG8MT/3UCDzwR9gPeyFNMCtInsol++5m3bk2bXWKdZjvybmohrAsn3Ua5x8gfLnbE1YkOg==" crossorigin="anonymous">
		<link rel="stylesheet" href="/stylesheets/style.css" integrity="sha256-OlSbjYBfrJGGd2zbT3qCsAZsPGxRwKOSGjqqfjF8aiY= sha512-1aDUINxj8c9UXJ76eIMAkG2/ofIjG8FBW4drgHUglwY/rGn+YWUtm8iSkrpAOtwZ9b9LEva02KPrTDx3M5ib3w==" crossorigin="anonymous">
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/counsel/transferList.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-rate-picker.js'/>"></script>
	</head>
	
	<body>
		<div id="h1">이관목록</div>
		<div id="pop_body">
			<!--타이틀-->
			<div class="stitle">
				이관목록
			</div>
			<!--"타이틀"-->
	 		<!-- 조회/검색 -->
			<div id="search2">
				<table class="search2_tbl">
					<tr>
						<td class="sel_80" colspan="2">
							<select class="select_al" id="optSrchtype">
								<option value="all">전체</option>
								<option value="custNm">고객명</option>
								<option value="corpNm">회사/부서</option>
							</select>
						</td>
						<td class="nemo_20" colspan="2">
							<input type="text" class="text_ol" id="tfSrchval" maxlength="166">
						</td>
						<th>채널구분</th>
						<td class="sel_80"><select class="select_al"id="selChGbCd"></select></td>
						<th>처리유형</th>
						<td class="sel_80"><select class="select_al" id="selActTypeCd"></select></td>
						<th>처리상태</th>
						<td class="sel_80"><select class="select_al" id="selActStCd"></select></td>
						<td class="btn" >
							<button type="button" id="btnSearch"  class="button">조회</button>
							<button type="button" id="btnInit"  class="button">초기화</button>
						</td>
					</tr> 
					<tr>
						<th>상담사</th>
						<td class="sel_80" colspan="2"><select class="select_al" id="selCounselNm"></select></td>
						<td class="sel_80"  colspan="2"><select class="select_al" id="selDtType"></select></td>
						<td class="sel_left" colspan="4">
							<input type="text" class="text_ol_half" id="selFrDate" maxlength="16"> ~ <input type="text" class="text_ol_half" id="selToDate" maxlength="16">
						</td>
					</tr>
				</table>
			</div>
			<!--"조회/검색"-->

    		<!--그리드-->
			<div id="grid_all">
				<!-- 미사용/버튼 테이블 -->
				<table class="info_tbl">
					<tr>			
						<td>
							<button type="button" id="btnExcelPopup"  class="button">엑셀저장</button>
						</td>
					</tr>
				</table>
				<!--"미사용/버튼 테이블"-->		
				<!-- 그리드테이블 -->
				<table id="tblTransferList"></table>
				<div id="pgTransferList"></div>
				<!--"그리드테이블"-->
     		</div><!--"그리드"-->
   	 	  	<%@include file="comCounselSpec.jsp"%>
		</div>
	</body>
</html> 