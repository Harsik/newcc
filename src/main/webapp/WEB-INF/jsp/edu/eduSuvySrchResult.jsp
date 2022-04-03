<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="UTF-8">
        <title>설문조사결과 등록</title>
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
        <script type="text/javascript" src="<c:url value='/resources/js/edu/eduSuvySrchResult.js'/>"></script>
    </head>
    <body>
        <!--BODY-->
        <div id="h1">설문조사결과 등록</div>
        <div id="pop_body">

          <div style="width: 100%;">

            <input type="hidden" id="edsvrs_mntId">                

            <div class="stitle" style="display: ruby-base;">설문조사결과 등록</div>
            <!--그리드-->
            <div id="edsvrs_grid_all">
               <!-- 버튼 테이블 -->
               <table class="info_tbl_btn">
                 <tr>
                   <th></th>
                   <td>                       
                     <button type="button" id="edsvrs_btnPrint" class="button">보고서 출력</button>
                     <button type="button" id="edsvrs_btnSave" class="button">저장</button> 
                     <button type="button" id="edsvrs_btnInit" class="button">초기화</button>
                   </td>
                 </tr>
               </table><!--"버튼 테이블"-->
            </div><!--"그리드"-->
        
            <table class="profile_tbl">      
              <tr>
                 <td class="line_b" colspan="7">
                    <textarea rows="10" cols="136" id="edsvrs_suvy_Infm" maxlength="2000"></textarea>
                 </td>                    
              </tr>
              <tr>
                 <th class="line_rt">설문</th>
                 <td class="line_b" colspan="6">
                    <textarea rows="5" cols="116" id="edsvrs_qst_Nm" maxlength="2000"></textarea>
                 </td>                    
              </tr>
              <tr>
                 <th class="line_rt">응답</th>
                 <td class="line_b" colspan="6">
                    <textarea rows="5" cols="116" id="edsvrs_ans_Nm" maxlength="2000"></textarea>
                 </td>
              </tr>

              <tr>
                 <th class="line_rt">기타의견</th>
                 <td class="line_b" colspan="6">
                    <textarea rows="10" cols="116" id="edsvrs_etc" maxlength="2000"></textarea>
                 </td>
              </tr>
             
            </table>

          <!-- 개인정보테이블 -->
          <table class="profile_tbl" style="border-style: none;"></table>
          </div>
        </div><!--"BODY"-->

    </body>
</html>