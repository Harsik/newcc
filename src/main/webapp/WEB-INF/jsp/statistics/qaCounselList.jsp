<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<title>평가대상 이력 생성</title>
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
		<script type="text/javascript" src="<c:url value='/resources/js/statistics/qaCounselList.js'/>"></script>
	</head>
	
	<body>
		<div id="h1">평가대상 이력 생성</div>
		<div id="pop_body" style="height:650px;">

			<!--타이틀-->
			<div class="stitle">
				상담이력목록 검색   
			</div>
			<!--"타이틀"-->
	 		<!-- 조회/검색 -->
			<div id="search2" style="height: 55px;">
				<table class="search2_tbl">
					<tr>
						<th>접수기간</th>
						<td class="sel_left" style="width:230px;">
							<input type="text" class="text_ol_half" id="selFrDate" maxlength="10" readonly > 
							~ 
							<input type="text" class="text_ol_half" id="selToDate" maxlength="10" readonly >
						</td>
						<th style="width:40px;">상담사</th>
						<td style="width:130px;">
							<select class="select_al" id="selCounselNm" style="width: 50%;"></select>
							<input type="checkbox" class="checkbox" style="top:4px;" id="chkNotUse">퇴사자
						</td>
						<th>처리유형</th>
						<td style="width:90px;">
							<select class="select_al" id="selActTypeCd"></select>
						</td>

						<th>통화구분</th>
						<td style="width:85px;">
							<select class="select_al" id="selCallGb" style="width:85px;"></select>
						</td>
						<th>보류횟수</th>
            <td style="width:60px;">
              <input type="text" style="width:20px; text-align:right;" class="text_ol" id="selRdyFrmScnt" maxlength="2">
              ~
              <input type="text" style="width:20px; text-align:right;" class="text_ol" id="selRdyToScnt" maxlength="2">
            </td>
						<td class="btn"  style="width:100px; text-align:right;">
						  <button type="button" id="btnSearch"  class="button">조회</button>						
							<button type="button" id="btnInit"  class="button">초기화</button>
						</td>
					</tr>
					<tr>
						<th>상담유형</th>
						<td colspan="5">
							<input type="hidden" id="selPopupLv" value="GCHILD"/>
              <%--<select class="select_al" style="width:100px;margin-left:4px;" id="selSrchIntvExCd"></select>--%>
              <select class="select_al" style="width:100px;margin-left:4px;" id="selSrchIntvLgCd"></select>
              <select class="select_al" style="width:150px;" id="selSrchIntvMdCd"></select>
              <select class="select_al" style="width:220px;" id="selSrchIntvSmCd"></select>
						</td>
            <th>통화시간</th>
            <td colspan="2">
              <input type="text" style="width:20px; text-align:center;" class="text_ol" id="selFrTime" maxlength="3">&nbsp;&nbsp;:
              <input type="text" style="width:20px; text-align:center;" class="text_ol" id="selFrSec" maxlength="2">
              ~
              <input type="text" style="width:20px; text-align:center;" class="text_ol" id="selToTime" maxlength="3">&nbsp;&nbsp;:
              <input type="text" style="width:20px; text-align:center;" class="text_ol" id="selToSec" maxlength="2">
            </td>            
            <th>전화번호</th>
            <td>
              <input type="text" class="text_ol" id="selTelNum" style="margin-left: 5px;width:110px;">
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
							<label id="labCnslListInOutCnt">IN : 0, OUT : 0</label>&nbsp;&nbsp;&nbsp;
							<button type="button" id="btnRecAdd"  class="button">추가</button>
						</td>
					</tr>
				</table>
				<!--"미사용/버튼 테이블"-->		
				<!-- 그리드테이블 -->
				<table id="tblCounselList"></table>
				<div id="pgCounselList"></div>
				<!--"그리드테이블"-->
     		</div><!--"그리드"-->

        <!--개인정보테이블-->
	      <div style="height: 330px">
	
	        <div id="counselComTable">
	          <table class="profile_tbl">
	            <tr>
	              <td class="line_rt">고객명</td>
	              <td class="line_b"><label id="custNm"></label></td>
	              <td class="line_c">상담사</td>
	              <td class="line_b" id="agtNm"></td>
	              <td class="line_c">보류횟수</td>
	              <td class="line_b" id="rdyScnt"></td>
	              <td class="line_c" id="custCompText">고객성향</td>
	              <td class="line_b" id="cstComp" nowrap></td>
	            </tr>
	            <tr>
	              <td class="line_rt">통화구분</td>
	              <td class="line_b" id="callGbCd"></td>
	              <td class="line_c">통화번호</td>
	              <td class="line_b" id="cntctInform"></td>
	              <td class="line_c">처리유형</td>
	              <td class="line_b" id="actTypeCd"></td>
	              <td class="line_c">통화시간</td>
	              <td class="line_b" id="callTime"></td>
	            </tr>
	            <tr>
	              <td class="line_rt">상담유형</td>
	              <td class="line_b" colspan="5" id="instClass" nowrap>
	              </td>       
	              <td class="line_c">상담결과</td>
	              <td class="line_b" id="actStCd"></td>
	            </tr>
	            <tr id="counselInfo">
	              <td class="line_rt" rowspan="4" style="height: 50px;">문의내용</td>
	              <td class="line_b" rowspan="4" colspan="3">
	                <textarea class="area_ol" style="height:90%;" rows="8" id="rcvCont" readonly></textarea>
	              </td>
	              <td class="line_c" rowspan="4">답변내용</td>
	              <td class="line_b" rowspan="4" colspan="3">
	                <textarea class="area_ol" style="height:90%;" id="actCont" readonly></textarea>
	              </td>
	            </tr>
	
	          </table>
	        </div>        
	      </div>
	      <!--"개인정보테이블"-->

		</div>
	</body>
</html>