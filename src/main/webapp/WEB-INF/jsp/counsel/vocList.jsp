<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<title>VOC이관및결과입력</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/counsel/vocList.js'/>"></script>
		
	</head>
	
	<body>
		<div id="h1">VOC이관 및 결과입력</div>
		<div id="pop_body" style="min-height: 855px;">
			<input type="hidden" id="vocHiddenId">
			<input type="hidden" id="noticeYn">
			<input type="hidden" id="resultCode">
			<input type="hidden" id="noticeMethod">
			<!--타이틀-->
			<div class="stitle">
				VOC이관목록 검색
			</div>
			<!--"타이틀"-->
	 		<!-- 조회/검색 -->
			<div id="search2">
				<table class="search2_tbl">
					<tr>
						<th>접수일</th>
						<td class="sel_left" colspan="3">
							<input type="text" class="text_ol_half" id="vocFrDate" maxlength="16"> ~ <input type="text" class="text_ol_half" id="vocToDate" maxlength="16">
						</td>
						<td class="line_b" colspan="2" style="width: 15%">
							<input type="radio" class="radio" name="vocCodetype_term" id="rdCodetype_t" value="today" checked="checked"><label for="rdCodetype_t">당일</label>
							<input type="radio" name="vocCodetype_term" id="rdCodetype_w" value="week"><label for="rdCodetype_w">1주일</label>
							<input type="radio" name="vocCodetype_term" id="rdCodetype_m" value="month"><label for="rdCodetype_m">1개월</label>
						</td>
						<th>처리결과</th>
						<td class="line_b">
							<select class="select_al" id = "vocSrchType1"></select>
						</td>
						<th>이관구분</th>
						<td class="line_b">
							<select class="select_al" id = "vocSrchType2">
								<option value="all">전체</option>
								<option value="N">일반</option>
								<option value="Y">긴급</option>
							</select>
						</td>
						<td class="btn">
							<button type="button" id="vocbtnSearch" name="vocbtnSearch" class="button">조회</button>
							<button type="button" id="vocbtnInit" name="vocbtnInit" class="button">초기화</button>
						</td>
					</tr> 
					<tr>
						<th>검색</th>
						<td class="sel_80">
							<select class="select_al" id = "vocSrchType3">
								<option value="all">전체</option>
								<option value="usrNm">회사/부서</option>
								<option value="usrNm1">민원인</option>
								<option value="usrNm2">접수자</option>
								<option value="usrNm3">담당자</option>
							</select>
						</td>
						<td class="nemo_20" >
            				<input type="text" class="text_ol" id="vocSrchval" maxlength="20">
          				</td>
						<td>
						</td>
						<th>시스템구분</th>
						<td class="line_b">
							<select class="select_al" id = "vocSrchType4"></select>
						</td>
						<th>오류유형</th>
						<td class="line_b">
							<select class="select_al" id = "vocSrchType5"></select>
						</td>
						<th>민원구분</th>
						<td class="line_b">
							<select class="select_al" id = "vocSrchType6"></select>
						</td>
						
					</tr>
				</table>
			</div>
			<!--"조회/검색"-->

    		<!--그리드-->
			<div id="grid_all">
				<!-- 미사용/버튼 테이블 -->
				<div class="stitle">VOC이관목록</div>
				<table class="info_tbl">
					<tr>			
						<td>
							<button type="button" id="btnExcelVocPopup" class="button">엑셀저장</button>
						</td>
					</tr>
				</table>
				<!--"미사용/버튼 테이블"-->		
				<!-- 그리드테이블 -->
				<table id="vocListR"></table>
				<div id="pgVocListR"></div>
				<!--"그리드테이블"-->
     		</div><!--"그리드"-->
   	 	  	<!--그리드-->
			<%@include file="vocListSpec.jsp"%>	
		</div>
	</body>
</html> 