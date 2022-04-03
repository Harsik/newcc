<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <title>교육콘텐츠관리</title>
	<link rel="icon" href="/resources/images/favicon.ico">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
    
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/edu/eduCntntList.js'/>"></script>
  </head>
  
  <body>
    
    <!--BODY-->
    <div id="h1">교육콘텐츠관리</div>
    <div id="pop_body">
      <!--타이틀-->
      <div class="stitle">교육콘텐츠관리</div>
      <!--"타이틀"-->
      <!-- 조회/검색 -->
      <div id="search">
        <table class="search_tbl">
					<tr>
						<th>구분</th>
						<td>
							<select class="select_al" id="srchGubun"></select>
						</td>
						<th>대상팀</th>
<!-- 						<td>
						  <select class="select_al" id="srchCntr"></select>
						</td> -->
						<td>
							<select class="select_al" id="srchTeam"></select>
						</td>   
            <th>제목</th>
            <td>
              <input type="text" class="text_ol_70" id=srchTtl maxlength="167">
            </td>						
						<td class="btn">
							<button type="button" id="btnSearch"  class="button">조회</button>
							<button type="button" id="btnInit"  class="button">초기화</button>
						</td>
					</tr>
        </table>
      </div><!--"조회/검색"-->
    
      <input type="hidden" id="eduTbbsId">    <!-- 게시판ID -->
      <input type="hidden" id="eduCdbGbCd">   <!-- 게시물구분 1:평가문제지, 2:교육자료 -->
      <input type="hidden" id="eduTeamNm">    <!-- 대상팀 -->
      <input type="hidden" id="boardType">    <!-- 게시물구분 -->
      
      <!--타이틀-->
      <div class="stitle">교육콘텐츠 목록</div>
      <!--"타이틀"-->      
      <!--그리드-->
      <div id="grid_all">
        <!-- 미사용/버튼 테이블 -->
        <table class="info_tbl">
          <tr>
	          <td>
	            <button type="button" id="btnInsert"  class="button">등록</button>
	            <button type="button" id="btnDelete"  class="button">삭제</button>
	          </td>          
          </tr>
        </table><!--"미사용/버튼 테이블"-->
    
        <!-- 그리드테이블 -->
        <div class="grid_tbl">    
          <table id="tblCntntList"></table>
          <div id="pgCntntList"></div>
        </div><!--"그리드테이블"-->
      </div><!--"그리드"-->
           
    </div>
  <!--"BODY"-->
  </body>
</html>