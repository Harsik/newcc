<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="UTF-8">
        <title>교육결과보고서 등록</title>
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
        <script type="text/javascript" src="<c:url value='/resources/js/lib/dext5editor/js/dext5editor.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/resources/js/edu/eduRptComment.js'/>"></script>
<!-- KukudocsEditor  -->
<script type="text/javascript" src="<c:url value='/resources/KukudocsEditor/javascripts/build/Editor.bundle.js'/>"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/KukudocsEditor/stylesheets/style.css" type="text/css" />
    </head>
    <body>
        <!--BODY-->
        <div id="h1">교육결과보고서 등록</div>
        <div id="pop_body">

          <div style="width: 100%;">

            <input type="hidden" id="edrpcm_mntId">                

            <div class="stitle" style="display: ruby-base;">교육결과보고서 등록</div>
            <!--그리드-->
            <div id="grid_all">
               <!-- 버튼 테이블 -->
               <table class="info_tbl_btn">
                 <tr>
                   <th></th>
                   <td>                       
                     <button type="button" id="edrpcm_btnPrint" class="button">보고서 출력</button>
                     <button type="button" id="edrpcm_btnSave" class="button">저장</button> 
                     <button type="button" id="edrpcm_btnInit" class="button">초기화</button>
                     <button type="button" id="edrpcm_btnClose"  class="button">닫기</button>
                   </td>
                 </tr>
               </table><!--"버튼 테이블"-->
            </div><!--"그리드"-->
        
            <table class="profile_tbl">      
              <tr>
                 <td>
			            <div id="edrpcm_divRptEditor">		
			            </div>
                 </td>
              </tr>
             
            </table>

          </div>
        </div><!--"BODY"-->

    </body>
    
<!--   <script type="text/javascript">
  (function() {
	   DEXT5.configInitServerXml = "http://172.17.100.100:8080/resources/js/lib/dext5editor/handler/upload_handler.ashx?f=dext_editor.xml";
	   DEXT5.config.Mode  = "edit";
     DEXT5.config.DevelopLangage = "JAVA";
     DEXT5.config.Runtimes = "html5";
     DEXT5.config.Height = "506px";
     DEXT5.config.Width = "992px";
     DEXT5.config.EditorHolder = "edrpcm_divRptEditor";
     new Dext5editor("editor1");
    }()); 
  </script>    -->
   
</html>