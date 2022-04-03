<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<title>예약통화목록</title>
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
		<script type="text/javascript" src="<c:url value='/resources/js/counsel/resvCallList.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-rate-picker.js'/>"></script>
	</head>
	
	<body>
		<div id="h1">예약통화목록</div>
		<div id="pop_body">
			<!--타이틀-->
			<div class="stitle">
				예약통화목록    
			</div>
			<!--"타이틀"-->
	 		<!-- 조회/검색 -->
			<div id="search2" style="height: 30px;">
				<table class="search2_tbl">
				    <tr>
				    	<th>조회기간</th>
				    	<td class="sel_left" style="width:65px;">
				    		<select class="select_al" id="selDtType"></select>
				    	</td>
				    	<td class="sel_left" style="width:230px;" colspan="2">
				    		<input type="text" class="text_ol_half" id="selFrDate" maxlength="16" > ~ <input type="text" class="text_ol_half" id="selToDate" maxlength="16" >
				    	</td>
				    	<th style="width:45px;">상담사</th>
				    	<td style="width:160px;">
				    		<select class="select_al" id="selCounselNm" style="width:60%;"></select>
				    		<input type="checkbox" class="checkbox" style="top:4px;" id="chkNotUse">퇴사자
				    	</td>
				    	<th>상담결과</th>
				    	<td>
				    		<select class="select_al" id="selActStCd" style="width:100px;"></select>
				    	</td>
				    	<th style="width:55px;">조회항목</th>
				    	<td class="sel_left" style="width:70px;">
				    		<select class="select_al" id="selSrchType">
				    			<option value="all">전체</option>
				    			<option value="custNm">고객명</option>
				    			<option value="resvPhone">예약번호</option>
				    			<option value="srchPhone">발신번호</option>
				    		</select>
				    	</td>
				    	<td>
				    		<input type="text" class="text_ol" id="tfSrchVal">
				    	</td>
				    	<td class="btn">
				    		<button type="button" id="btnSearch"  class="button">조회</button>
							<button type="button" id="btnInit"  class="button">초기화</button>
				    	</td>
				    </tr>
				    <!-- 
				    <tr>
				    	<th>고객명</th>
				    	<td colspan="3">
				    		<input type="text" id="tfCustName" class="text_ol" style="width:170px;margin-left:4px;">
				    	</td>
				    	<th>전화번호</th>
				    	<td>
				    		<input type="text" class="text_ol" id="tfCnfmTelNo" style="width:160px;">
				    	</td>
				    	<th>통화구분</th>
				    	<td>
				    		<select class="select_al" id="selCallGb" style="width:100px;"></select>
				    	</td>
				    </tr>
				    -->
					<!-- 
					<tr>
						<td class="sel_60" colspan="2">
							<select class="select_al" id="optSrchtype">
								<option value="all">전체</option>
								<option value="custNm">고객명</option>
								<option value="corpNm">회사/부서</option>
								<option value="srchPhone">전화번호</option>
							</select>
						</td>
						<td class="nemo_30" colspan="2">
							<input type="text" class="text_ol" id="tfSrchval" maxlength="166">
						</td>
						<th><label id="chgb">채널구분</label></th>
						<td class="sel_60">
							<select class="select_al"id="selChGbCd"></select>
						</td>
						<th><label id="actType">처리유형</label></th>
						<td class="sel_60"><select class="select_al" id="selActTypeCd"></select></td>
						<th>처리상태</th>
						<td class="sel_60">
							<select class="select_al" id="selActStCd"></select>
						</td>
						<td class="btn" >
							<button type="button" id="btnSearch"  class="button">조회</button>
							<button type="button" id="btnInit"  class="button">초기화</button>
						</td>
					</tr> 
					<tr>
						<td class="sel_60"  colspan="2">
							
						</td>
						<td class="nemo_30" colspan="2"></td>
						<th>상담사</th>
						<td class="sel_60" colspan="1"><select class="select_al" id="selCounselNm"></select></td>
						<th>일자</th>
						<td class="sel_60"  colspan="1"><select class="select_al" id="selDtType"></select></td>
						<td class="sel_left" colspan="3">
							<input type="text" class="text_ol_half" id="selFrDate" maxlength="16" style="width: 20%; margin-left: 15px"> ~ <input type="text" class="text_ol_half" id="selToDate" maxlength="16" style="width: 20%">
						</td>
					</tr>
					<tr>
						<td colspan="6">
							<select style="width: 40%; margin-left: 5px;" id="selCnslSrchIntvLgCd"></select>
							<select style="width: 55%;" id="selCnslSrchIntvMdCd"></select>
						</td>
						<th>통화구분</th>
						<td colspan="4">
							<select style="width: 40%; margin-left: 5px;" id="selCnslSrchCallGbCd"></select>
						</td>
					</tr>
					 -->
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
				<table id="tblResvCallList"></table>
				<div id="pgResvCallList"></div>
				<!--"그리드테이블"-->
     		</div><!--"그리드"-->
   	 	  	<%@include file="comCounselSpec.jsp"%>
		</div>
	</body>
</html>