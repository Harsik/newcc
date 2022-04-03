<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
 <head>
  <meta charset="UTF-8">
  <title>상담유형별 상담DB 등록 현황</title>
	<link rel="icon" href="/resources/images/favicon.ico">
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
  
  <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
  <script type="text/javascript" src="<c:url value='/resources/js/statistics/jisjisikRegistration.js'/>"></script>
 </head>
 <body>
  <!--BODY-->
  <div id="h1">상담유형별 상담DB 등록 현황 </div>
  <div id="pop_body" style="height: 682px;">
   <!--타이틀-->
   <div class="stitle">상담유형별 상담DB 등록 현황  조회 </div>
   <!--"타이틀"-->
   <!-- 조회/검색 -->
   <div id="search">
    <table class="search_tbl">
     <tr>
      <th>검색기간</th>
      <td width="30%" style="text-align: left;">
       <span id = "searchYear"></span>
       
       <input id="jskRgs_tfTbbsStrtDt" type="text" class="text_ol_half">&nbsp;&nbsp;~&nbsp;
       <input id="jskRgs_tfTbbsEndDt" type="text" class="text_ol_half">  
      </td>
      <!-- <th>상담사</th>
      <td width="20%" style="text-align: left;">
       <span id = "searchYear"></span>
       <select class="select_bl" style="width: 36%;" id="jskRgs_optUsrNmList"></select>
      </td> -->
      <td class="btn">
       <button type="button" id="jskRgs_btnSearch" class="button">조회</button>
       <button type="button" id="jskRgs_btnInit" class="button">초기화</button>
       <button type="button" id="jskRgs_btnExcel2" class="button">엑셀다운</button>
     <%--   <button type="button" id="btnExcel" class="button">문서출력</button> --%>
      </td>
     </tr> 
    </table>
   </div>
   <!-- <div style="width: 100%; margin-top:60px;"> -->   
   <div id="grid_all">
     <!-- 미사용/버튼 테이블 -->
     <table class="info_tbl">
       <tr>
       </tr>
     </table><!--"미사용/버튼 테이블"-->   
	   <div class="grid_tbl">   
	    <table id="jskRgs_tblNotifyList"></table>
	    <div id="jskRgs_pgNotifyList"></div>
	   </div>
   </div>
  </div>
 </body>
</html>