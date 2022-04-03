<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<title>BestCall 이력</title>
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
		<script type="text/javascript" src="<c:url value='/resources/js/common/listenRec.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/statistics/qaBestcallList.js'/>"></script>
	</head>
	
	<body>
		<div id="h1">BestCall 이력</div>
		<div id="pop_body" style="height:650px;">
		<!-- <div id="pop_body" class="pop_body"> -->
			<!--타이틀-->
			<div class="stitle">BestCall 이력 조회</div>
			<!--"타이틀"-->
	 		<!-- 조회/검색 -->
			<div id="search">
				<table class="search_tbl">
					<tr>
						<th>접수기간</th>
						<td class="sel_left" style="width:230px;">
							<input type="text" class="text_ol_half" id="qabcli_selFrDate" maxlength="16" readonly > ~ <input type="text" class="text_ol_half" id="qabcli_selToDate" maxlength="16" readonly >
						</td>
						<th style="width:40px;">상담사</th>
						<td style="width:130px;">
							<select class="select_al" id="qabcli_selCounselNm" style="width: 50%;"></select>
							<input type="checkbox" class="checkbox" style="top:4px;" id="qabcli_chkNotUse">퇴사자
						</td>
						<th>BEST CALL</th>
						<td style="width:90px;">
							<select class="select_al" id="qabcli_selBestCall"></select>
						</td>
						<td class="btn"  style="width:300px; text-align:right;">
						  <button type="button" id="qabcli_btnSearch"  class="button">조회</button>						
							<button type="button" id="qabcli_btnInit"  class="button">초기화</button>
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
							<label id="qabcli_labCnslListInOutCnt">IN : 0, OUT : 0</label>&nbsp;&nbsp;&nbsp;
						</td>
					</tr>
				</table>
				<!--"미사용/버튼 테이블"-->		
				<!-- 그리드테이블 -->
				<table id="qabcli_tblCounselList"></table>
				<div id="qabcli_pgCounselList"></div>
				<!--"그리드테이블"-->
     		</div><!--"그리드"-->

        <!--개인정보테이블-->
	      <div style="height: 330px">
	
	        <div id="qabcli_counselComTable">
	          <table class="profile_tbl">
	            <tr>
	              <td class="line_rt">고객명</td>
	              <td class="line_b"><label id="qabcli_custNm"></label></td>
	              <td class="line_c">성별</td>
	              <td class="line_b" id="qabcli_gndr"></td>
	              <td class="line_c">연령대</td>
	              <td class="line_b" id="qabcli_agesCd"></td>
	              <td class="line_c" id="qabcli_custCompText">고객성향</td>
	              <td class="line_b" id="qabcli_cstComp" nowrap></td>
	            </tr>
	            <tr>
	              <td class="line_rt">통화구분</td>
	              <td class="line_b" id="qabcli_callGbCd"></td>
	              <td class="line_c">통화번호</td>
	              <td class="line_b" id="qabcli_cntctInform"></td>
	              <td class="line_c">처리유형</td>
	              <td class="line_b" id="qabcli_actTypeCd"></td>
	              <td class="line_c">통화시간</td>
	              <td class="line_b" id="qabcli_callTime"></td>
	            </tr>
	            <tr>
	              <td class="line_rt">상담유형</td>
	              <td class="line_b" colspan="5" id="qabcli_instClass" nowrap>
	              </td>       
	              <td class="line_c">상담결과</td>
	              <td class="line_b" id="qabcli_actStCd"></td>
	            </tr>
	            <tr id="qabcli_counselInfo">
	              <td class="line_rt" rowspan="4" style="height: 50px;">문의내용</td>
	              <td class="line_b" rowspan="4" colspan="3">
	                <textarea class="area_ol" style="height:90%;" rows="8" id="qabcli_rcvCont" readonly></textarea>
	              </td>
	              <td class="line_c" rowspan="4">답변내용</td>
	              <td class="line_b" rowspan="4" colspan="3">
	                <textarea class="area_ol" style="height:90%;" id="qabcli_actCont" readonly></textarea>
	              </td>
	            </tr>
	
	          </table>
	        </div>        
	      </div>
	      <!--"개인정보테이블"-->

		</div>
	</body>
</html>