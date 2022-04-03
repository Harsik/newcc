<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="UTF-8">
		<title>교육만족도 설문조사</title>
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
        <script type="text/javascript" src="<c:url value='/resources/js/edu/eduSuvySearch.js'/>"></script>
    </head>
    <body>
        <!--BODY-->
        <div id="h1">교육만족도 설문조사</div>
        <div id="pop_body">

            <div style="width: 100%;">

              <input type="hidden" id="mntId">                

              <div class="stitle" style="display: ruby-base;">교육만족도 설문조사 등록</div>
              <!--그리드-->
              <div id="grid_all">
                 <!-- 버튼 테이블 -->
                 <table class="info_tbl_btn">
                   <tr>
                     <th colspan="2">※ 기타의견 및 추후 받고자하는 교육내용을 기재란에 많이 기입 부탁드립니다.</th>
                     <td>                       
                       <button type="button" id="btnPrint" class="button">보고서 출력</button>
                       <button type="button" id="btnSave" class="button">저장</button> 
                     </td>
                   </tr>
                 </table><!--"버튼 테이블"-->
              </div><!--"그리드"-->
									 
              <div id="suvyQa" style = "width:990px; overflow:auto;/* border:1px solid red; */"></div>
        
            </div> 

        </div><!--"BODY"-->

    </body>
</html>