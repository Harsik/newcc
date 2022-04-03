<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>교육이수 확인</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/edu/rptEduComplete.js'/>"></script>
		
	</head>
	
	<body>
			
		<!--BODY-->
		<div id="h1">교육이수 확인</div>
		
		<div id="pop_body">
			<!--타이틀-->
			<div class="stitle">교육이수 조회</div>
			<!--"타이틀"-->
			<!-- 조회/검색 -->
			<div id="search">
				<table class="search_tbl">
					<tr>
            <th>기간</th>
            <td>
              <input type="text" class="text_ol_half" id="rpedcp_selFrDate" maxlength="10" readonly>
               ~
              <input type="text" class="text_ol_half" id="rpedcp_selToDate" maxlength="10" readonly>   
            </td>     					
            <th>팀</th>
            <!-- <td class="sel"><select class="select_al" id="rpedcp_rpedcp_srchCntrCd"></select></td> -->
            <td class="sel"><select class="select_al" id="rpedcp_srchTeamCd"></select></td>
            <td class="sel"><select class="select_al" id="rpedcp_selAgent"></select></td>  
            <th>교육과정명</th>
            <td>
              <select class="select_bl" id="rpedcp_srchCrrcum"></select>
              <!-- <input type="text" class="text_ol" id="rpedcp_srchCrrcum" maxlength="60"> -->
            </td>
						<td class="btn">
							<button type="button" id="rpedcp_btnSearch"  class="button">조회</button>
							<button type="button" id="rpedcp_btnInit"  class="button">초기화</button>
						</td>
					</tr> 
				</table>
			</div><!--"조회/검색"-->
			
      <!-- 미사용/버튼 테이블 -->
      <table class="info_tbl">
        <tr>    
         <td>
          <button type="button" id="rpedcp_btnEduRpt" class="button">교육보고서 등록</button>
          <button type="button" id="rpedcp_btnSuvySave" class="button">설문결과 등록</button>
          <button type="button" id="rpedcp_btnSave" class="button">저장</button>
          <!-- <button type="button" id="rpedcp_btnExcel" class="button">엑셀저장</button> -->
         </td>
        </tr>
      </table><!--"미사용/버튼 테이블"-->			
			
			<!--왼쪽그리드-->
			<div id="grid_all" style="width: 63%; float:left;">
			      
				<!--타이틀-->
				<div class="stitle">교육과정 목록</div>
				<!--"타이틀"-->

				<!-- 그리드테이블 -->
				<div class="grid_tbl">		
				  <input type="hidden" id="rpedcp_getEduId"> 
				  <input type="hidden" id="rpedcp_getSuvyId"> 
				  <input type="hidden" id="rpedcp_getUsrId">
					<table style="width:100%; height:550px;">
						<tr>
							<td>
								<table id="rpedcp_tblTarget"></table>
								<div id="rpedcp_pgTarget"></div>
							</td>
						</tr>
					</table>
				</div>	<!--"그리드테이블"-->
			
			</div><!--"왼쪽그리드"-->
				
			<!--오른쪽그리드-->
			
			<div id="grid_all" style="width: 36%; float:right;">
			      
				<!--타이틀-->
				<div class="stitle">교육이수 확인</div>
				<!--"타이틀"-->
				
				<!-- 그리드테이블 -->
				<div class="grid_tbl">		 
					<table style="width:100%; height:550px;">
						<tr>
							<td>
								<table id="rpedcp_tblCmplt"></table>
								<div id="rpedcp_pgCmplt"></div> 								
							</td>
						</tr>
					</table>
				</div>	<!--"그리드테이블"-->
			
			</div><!--"오른쪽그리드"-->

			<!-- 개인정보테이블 -->
			<table class="profile_tbl_"></table><!--"개인정보테이블"-->
		
		</div><!--"BODY"-->
	</body>
</html>