<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>

<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<title>키워드 상담 현황</title>
<link rel="icon" href="/resources/images/favicon.ico">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css" />

<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/counsel/KwrdListInqire.js'/>"></script>
<style type="text/css">
   #board_detail ul {
      width: 100%;
      margin: 0 10px 5px 0;
   }
   #board_detail li {
      width: 100%;
   }
   .unsearch_tbl th{
      font-weight:bold;
   }
</style>
</head>
<body>
<div id="h1">키워드 상담 현황</div>
    <div id="pop_body" style="overflow-y: scroll; overflow-x:hidden; height: 700px;">
        <div class="stitle">키워드 조회</div>
        <!-- 검색 -->
        <div id="search" style="height:auto;">
            <table class="unsearch_tbl">
               <tbody><tr>
                  <th style="width: 140px; text-align: right;">조회기간&nbsp;&nbsp;&nbsp;&nbsp;</th>
                  <td class="sel_left" style="width: 230px;">
                      <input id="kwliqi_tfKeywordStrtDt" type="text" class="text_ol_half" />&nbsp;~
                        <input id="kwliqi_tfKeywordEndDt" type="text" class="text_ol_half" />
                  </td>
                  <th style="width: 80px;">키워드</th>
                  <td style="width: 230px;">
                     <select class="select_al" id="kwliqi_selkeywordNm" style="width: 32%;"></select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     <input type="checkbox" class="checkbox" style=" margin-top:4px; " id="kwliqi_chkNotUse">미사용&nbsp;&nbsp;포함
                  </td>
                  <td class="btn" style="width:440px; margin-top:4px; text-align: right;">
                      <button class="button" id="kwliqi_btnKySearch" type="button">조회</button>
                     <button class="button" id="kwliqi_btnKyInit" type="button">초기화</button>
                     <button class="button" id="kwliqi_btnKyExcel" type="button">엑셀저장</button>
                  </td>
               </tr>
            </tbody>
             </table>
        </div>
       <div class="stitle">키워드 목록</div>
        <div id="grid_all" >
            <!-- 그리드테이블 -->
            <div class="grid_tbl" style="float: left; width: 100%;">       
                <table id="kwliqi_tblKeywordList"></table>
                <div id="kwliqi_pgKeywordList"></div>
            </div>
        </div>
          <br/>
    </div><!-- end of pop_body -->
</body>
</html>