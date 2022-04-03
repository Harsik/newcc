<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <title>교육결과 현황</title>
	<link rel="icon" href="/resources/images/favicon.ico">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
    
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/edu/rptEduResult.js'/>"></script>
  </head>
  
  <body>
    
    <!--BODY-->
    <div id="h1">교육결과 현황</div>
    <div id="pop_body">
      <!--타이틀-->
      <div class="stitle">교육결과 조회</div>
      <!--"타이틀"-->
      <!-- 조회/검색 -->
      <div id="search">
        <table class="search_tbl">
          <tr>
						<th>기간</th>
						<td style="width:280px;">
							<input type="text" class="text_ol_half" id="rpedrs_selFrDate" maxlength="10" readonly>
							 ~
							<input type="text" class="text_ol_half" id="rpedrs_selToDate" maxlength="10" readonly>   
						</td>            
						<th>팀</th>
            <td class="sel"><select class="select_al" id="rpedrs_srchTeamCd"></select></td>
						<td class="sel"><select class="select_al" id="rpedrs_selAgent"></select></td>  
<!-- 						<th>교육과정명</th>
            <td>
             <input type="text" class="text_ol" id="rpedrs_srchCrrcum" maxlength="60">
            </td> -->
						<td class="btn">
							<button type="button" id="rpedrs_btnSearch"  class="button">조회</button>
							<button type="button" id="rpedrs_btnInit"  class="button">초기화</button>
						</td>
          </tr>
        </table>
      </div><!--"조회/검색"-->
    
      <!--타이틀-->
      <div class="stitle">교육결과 현황</div>
      <!--"타이틀"-->
      <!--그리드-->
      <div id="grid_all">
        <!-- 미사용/버튼 테이블 -->
        <table class="info_tbl">
          <tr>
           <td>
             <button type="button" id="rpedrs_btnExcel" class="button">엑셀저장</button>
           </td>
          </tr>        
        </table><!--"미사용/버튼 테이블"-->
    
        <!-- 그리드테이블 -->
        <div class="grid_tbl">     
          <table id="rpedrs_tblResultList"></table>
          <div id="rpedrs_pgResultList"></div>
        </div><!--"그리드테이블"-->
      </div><!--"그리드"-->
    
      <br />     
      
      <!--타이틀-->
      <div class="stitle_bot">교육과정 현황</div>
      <!--"타이틀"-->
			<!--그리드-->
			<div id="grid_all">

				<!-- 미사용/버튼 테이블 -->
				<table class="info_tbl">
				</table><!--"미사용/버튼 테이블"-->
				
				<!-- 그리드테이블 -->
				<div class="grid_tbl">
					<table id="rpedrs_tblDetailList"></table>
					<div id="rpedrs_pgDetailList"></div>
				</div><!--"그리드테이블"-->      

			</div><!--"그리드"-->
			
    </div>
  <!--"BODY"-->
  </body>
</html>