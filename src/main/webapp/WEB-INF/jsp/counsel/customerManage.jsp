<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>민원인 정보 관리</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/counsel/customerManage.js'/>"></script>
	</head>

	<body>
		<% String popup=request.getParameter("popup"); %>
		
		<c:set var="popup" value="<%=popup%>" />
		
 		<input type="hidden" id="cstmng_tfPopUp" value="${popup}">
 		
		<!--BODY-->
		<div id="h1">
			민원인 정보 관리
		</div>
		<div id="pop_body">
			<!--타이틀-->
			<div class="stitle">
				민원인 정보 조회
			</div>
			<!--"타이틀"-->
			<!-- 조회/검색 -->
			<div id="search">
				<table class="search_tbl">
					<tr>
						<th class="sel_80">
							<label>
								연락처정보
							</label>
						</th>
						<td class="nemo_50" style = "width: 120px;">
							<input type="text" class="text_ol keyDown" id="cstmng_tfContact" style = "width: 120px;" maxlength="200">
						</td>
						
						<th>메모</th>
						<td class="nemo" style = "width: 130px;">
							<input type="text" class="text_ol keyDown" id="cstmng_tfMemo"  style = "width: 130px;" maxlength="667">
						</td>
						
						<th>민원인성향</th>
						<td class="sel_80" style = "width: 80px;">
							<select class="select_al" id="cstmng_optCustmComp" style = "width: 80px;">
							</select>
						</td>
						
						<th>민원인구분</th>
						<td class="sel_80" style = "width: 70px;">
							<select class="select_al" id="cstmng_optCustmType" style = "width: 70px;">
							</select>
						</td>
						<%-- 
						<th class="sel_80" style = "width: 90px;">
							<label>
								민원인명
							</label>
						</th>
						<td class="nemo_50">
							<input type="text" class="text_ol keyDown" id="cstmng_tfNm" maxlength="167">
						</td>
						--%>
						
						<th><input id="cstmng_searchOneYear" class="checkbox" type="checkbox"><label for="searchOneYear">수정일</label></th>
						<td class="nemo_50" style = "width: 280px;">
						<div id="cstmng_eventPrevent">
							<input type="text" class="text_ol_half" id="cstmng_tfModDtStr" readOnly>
							<label> ~ </label>
							<input type="text" class="text_ol_half" id="cstmng_tfModDtEnd" readOnly>
						</div>
						</td>

						<td class="btn">
							<button type="button" id="cstmng_btnCustmSrch" class="button">조회</button>
							<button type="button" id="cstmng_btnCustmInit" class="button">초기화</button>
						</td>
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
							<button type="button" id="cstmng_btnExelSave" class="button">엑셀저장</button>
						</td>
					</tr>
				</table><!--"미사용/버튼 테이블"-->

				<!--그리드-->
				<div id="grid_all">
					<table id="cstmng_tblCustm"></table>
					<div id="cstmng_innerCustm"></div>
				</div>
		
				<!-- 버튼 테이블 -->
				<table class="info_tbl_btn">
					<tr>
						<th></th>
						<td>
							<button type="button" id="cstmng_btnSelection" class="button">선택</button>
							<button type="button" id="cstmng_btnCustmIns" class="button">추가</button>
							<button type="button" id="cstmng_btnCustmDlt" class="button">삭제</button>
							<button type="button" id="cstmng_btnCustmMod" class="button">저장</button>
						</td>
					</tr>
				</table><!--"버튼 테이블"-->
			</div><!--"그리드"-->

			<!-- 개인정보테이블 -->
			<table class="profile_tbl">
				<tr>
					<td class="line_rt" style="width: 10%;">
						민원인명
					</td>
					<td class="line_b" style="width: 24%;" colspan="3">
						<input type="text" class="text_ol" id="cstmng_tfDtCustmNm" maxlength="167">
					</td>
					<!-- <td class="line_c" style="width: 7%;">
						성별
					</td>
					<td class="line_b" style="width: 8%;">
						<select class="select_bl" id="cstmng_optDtGndr"></select>
					</td> -->
					<td class="line_c" style="width: 10%;">
						민원구분
					</td>
					<td class="line_b" style="width: 23%;">
						<select class="select_bl" id="cstmng_optDtCustmType"></select>
					</td>
					<td class="line_c" rowspan="2" style="width: 10%;">
						민원인성향
					</td>
					<td class="line_b" rowspan="2" style="line-height:25px;width:23%;">
						<select class="select_bl" id="cstmng_optDtCustmComp"></select><BR>
						<select class="select_bl" id="cstmng_optDtCustmComp2"></select>
					</td>
				</tr>
				<tr>
					<td class="line_rt">
						핸드폰번호
					</td>
					<td class="line_b" colspan="3" >
						<input type="text" class="text_ol" id="cstmng_tfDtMobile" maxlength = "200">
					</td>
				<!-- 	<td class="line_c">
						연령대
					</td>
					<td class="line_b">
						<select class="select_bl" id="cstmng_optDtAgesCD"></select>
					</td> -->
					<td class="line_c">
						전화번호
					</td>
					<td class="line_b">
						<input type="text" class="text_ol" id="cstmng_tfDtTel" maxlength = "200">
					</td>
					<!-- <td class="line_c" id="cstmng_cstCompText">
						악성/특이민원
					</td>
					<td class="line_b">
						<select class="select_bl" id="cstmng_optDtCustComp2"></select>
					</td>
					-->
				</tr>
				<tr>
					<td class="line_r">
						FAX
					</td>
					<td class="line_b" colspan="3">
						<input type="text" class="text_ol" id="cstmng_tfDtFax" maxlength = "200" >
					</td>
					<td class="line_c">
						위치동의
					</td>
					<td class="line_b" id="cstmng_dtPosAgrmnt">
					</td>
					<td class="line_c" rowspan="3" style="width: 7%;">
						메모
					</td>
					<td class="line_b" rowspan="3" style="width:18%;">
						<textarea class="area_ol" style="height:90%;" id="cstmng_tfDtMemo" maxlength="667"></textarea>
					</td>
				</tr>
				<tr>
					<td class="line_r">
						동의항목
					</td>
					<td class="line_b" colspan="3">	
							<input type="checkbox" class="checkbox" id="cstmng_chkDtAll"><label for="chkDtAll">전체</label>
							<input type="checkbox" class="checkbox" id="cstmng_chkDtSMS"><label for="chkDtSMS">SMS</label>					
							<input type="checkbox" class="checkbox" id="cstmng_chkDtTel"><label for="chkDtTel">전화</label>
							<input type="checkbox" class="checkbox" id="cstmng_chkDtFAX"><label for="chkDtFAX">거부</label>
					</td>
					<td class="line_c">
						개인정보수집
					</td>
					<td class="line_b" id="cstmng_dtPersonAgrmnt" >
						<!-- <input type="text" class="text_ol" id="cstmng_tfDtTel" maxlength = "200"> -->
					</td>
				</tr>
				<tr>
					<td class="line_r">
						등록
					</td>
					<td class="line_b" id="cstmng_dtCrtDtm" colspan="3">
					</td>
					<td class="line_c">
						수정
					</td>
					<td class="line_b" id="cstmng_dtModDtm">
					</td>
				</tr>
			</table><!--"개인정보테이블"-->
		</div><!--"BODY"-->
	</body>
</html>