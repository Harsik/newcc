<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<title>상담이력</title>
		<script type="text/javascript">
			var selAddr = "${param.selAddr}";
			var selAddrNm = "${param.selAddrNm}";
		</script>
		<link rel="shortcut icon" href="/resources/images/favicon.ico">
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
		<script type="text/javascript" src="<c:url value='/resources/js/counsel/counselListPcrm.js'/>"></script>		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-rate-picker.js'/>"></script>
		
		<style>
			.search2_tbl {
				border: 0;
			}
		</style>
	</head>
	
	<body>
		<div id="h1">상담이력</div>
		<div id="pop_body" style="height:820px;">
		<!-- <div id="cslist_pop_body" class="pop_body"> -->
			<!--타이틀-->
			<div class="stitle">
				상담이력 조회   
			</div>
			<!--"타이틀"-->
	 		<!-- 조회/검색 -->
			<div id="search2" style="height: 55px;">
				<table summary="상담이력조회" class="search2_tbl">
					<tr>
						<th scope="row">접수기간</th>
						<td class="sel_left" style="width:230px;">
						<input type="text" class="text_ol_half"  id="cslist_selFrDate" maxlength="16" alt="시작날짜" title="시작날짜"> ~ <input type="text" class="text_ol_half" id="cslist_selToDate" maxlength="16"  alt="종료날짜" title="종료날짜" >
						</td>
						<th scope="row" style="width:40px;">상담사</th>
						<td style="width:130px;">
							<select class="select_al" id="cslist_selCounselNm" style="width: 92%;" title="상담사"></select>
						</td>
						<th scope="row">처리유형</th>
						<td style="width:90px;">
							<select class="select_al" id="cslist_selActTypeCd" title="처리유형"></select>
						</td>
						<th scope="row">상담결과</th>
						<td style="width:80px;">
							<select class="select_al" id="cslist_selActStCd" title="상담결과"></select>
						</td>
						<th scope="row" style="width:80px;">통화구분</th>
						<td style="width:80px;">
							<select class="select_al" id="cslist_selCallGb" style="width:80px;" title="통화구분"></select>
						</td>
						<th scope="row" style="width:110px;"><button type="button" class="button" id="cslist_btnSearch">조회</button></th>
						<td class="btn"  style="text-align:left;">
							<button type="button" id="cslist_btnInit"  class="button">초기화</button>
						</td>
					</tr>
					<tr>
						<th scope="row">상담유형</th>
						<td colspan="3">
							<input type="hidden" id="cslist_selPopupLv" value="GCHILD" alt="팝업유형" title="팝업유형">
							<select class="select_al" style="width:91px;margin-left:4px;" id="cslist_selSrchIntvLgCd" title="대분류"></select>
							<select class="select_al" style="width:100px;" id="cslist_selSrchIntvMdCd" title="중분류"></select>
							<select class="select_al" style="width:200px;" id="cslist_selSrchIntvSmCd" title="소분류"></select>
						</td>
						<th scope="row">주소</th>
						<td><select class="select_bl" style="width:90px;" id="cslist_selAddr" title="주소"></select></td>
						<th scope="row">인식결과</th>
						<td><select class="select_bl" style="width:80px;" id="cslist_selAddrResult" title="인식결과"></select></td>
						<th scope="row">문의/답변</th>
						<td colspan="2">
							<input type="text" class="text_ol" id="cslist_tfSrchval" style="width:155px;" alt="검색어" title="검색어">
								<select class="select_bl" style="width:113px;" id="cslist_selSrchKeyWordCd" title="검색구분"></select>
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
							<label id="cslist_labCnslListInOutCnt">IN : 0, OUT : 0</label>&nbsp;&nbsp;&nbsp;
							<button type="button" id="cslist_btnExcelPopup"  class="button">엑셀저장</button>
						</td>
					</tr>
				</table>
				<!--"미사용/버튼 테이블"-->		
				<!-- 그리드테이블 -->
				<table id="cslist_tblCounselList"></table>
				<div id="cslist_pgCounselList"></div>
				<!--"그리드테이블"-->
     		</div><!--"그리드"-->
   	 	  	<%@include file="comCounselSpecPcrm.jsp"%>
		</div>
	</body>
</html>