<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <title>설문 및 평가지 문항 관리</title>
	<link rel="icon" href="/resources/images/favicon.ico">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jstree/themes/default/style.custom.css" type="text/css"/>
    
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>    
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jstree/jstree.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/edu/eduSuvyForm.js'/>"></script>
  </head>
  
  <body>
    
    <!--BODY-->
    <div id="h1">설문 및 평가지 문항 관리</div>
    <div id="pop_body" style="height:875px;">
    
			<!--왼쪽 교육과정관리-->
			<div style="width: 55%; float:left;">     
	      <!--타이틀-->
	      <div class="stitle">문항유형</div>
	      <!--"타이틀"-->
	      <!--그리드-->
	      <div id="grid_all">
	        <table class="profile_tbl">
            <tr>
	            <td class="line_b">
	              <div id="edsvfm_eduSuvyTree" class="scrollable" style = "height :850px; overflow:auto;">
	              </div>
	            </td>
	          </tr>
	        </table>
	      </div><!--"그리드"-->
			</div><!--"왼쪽 교육과정관리"-->

			
			<!--오른쪽 교육대상-->
			<div style="width: 44%; float:right;">
	
	      <!--타이틀-->
        <div class="stitle">문항상세 등록</div>
        <!--"타이틀"-->
       
	        <!--그리드-->
	        <div id="grid_all">
	          <!-- 미사용/버튼 테이블 -->
	          <table class="info_tbl">
	            <tr></tr>
	          </table><!--"미사용/버튼 테이블"-->
	      
	          <!-- 그리드테이블 -->
	          <div class="grid_tbl">     
	            <table id="edsvfm_tblSuvyList"></table>
	            <div id="edsvfm_pgSuvyList"></div>
	          </div><!--"그리드테이블"-->
	        </div><!--"그리드"-->
                
	
        <!--타이틀-->
        <!-- <div class="stitle_bot">업무지식 결과 등록</div> -->
        <!--"타이틀"-->
        <!-- 버튼 테이블 --> 
        <table class="info_tbl_btn" >
          <tr>
            <td>
              <button type="button" id="edsvfm_btnInsert"  class="button">추가</button>
              <button type="button" id="edsvfm_btnUpdate"  class="button">저장</button>
              <button type="button" id="edsvfm_btnReset"  class="button">초기화</button>
            </td>
          </tr>
        </table><!--"버튼 테이블"-->
        
        <!-- 교육과정ID -->
        <!-- <input type="hidden" id="edsvfm_edu_Id"> -->
        
        <!-- 개인정보테이블 -->    
        <table class="profile_tbl">
          <tr>
            <td class="line_rt" style="width:7%;">항목명</td>
            <td class="line_b" colspan="3"><input type="text" class="text_ol" id="edsvfm_suvy_Nm"></td>
            <td class="line_c" style="width:7%;">부모ID</td>
            <td class="line_b" colspan="3"><input type="text" class="text_ol" id="edsvfm_parnt_Cd"></td>
          </tr>
          <tr>
            <td class="line_rt">항목ID</td>
            <td class="line_b" colspan="3"><input type="text" class="text_ol" id="edsvfm_suvy_Id" readonly="readonly" disabled="disabled"></td>
            <td class="line_c">순서</td>
            <td class="line_b" colspan="3"><input type="text" class="text_ol" id="edsvfm_suvy_Ord"></td>           
          </tr>
          <tr>
            <td class="line_rt">질문유형</td>
            <td class="line_b"><select class="select_bl" id="edsvfm_qst_Type_Cd"></select></td>
            <td class="line_c">답변유형</td>
            <td class="line_b"><select class="select_bl" id="edsvfm_ans_Type_Cd"></select></td>
            <td class="line_c">사용여부</td>
            <td class="line_b" colspan="3">
              <input type="radio" name="lbrUse_Yn" value="Y" checked />사용
              <input type="radio" name="lbrUse_Yn" value="N"/>미사용              
            </td>
          </tr>
          <tr>
            <td class="line_rt">답변1</td>
            <td class="line_b" style = "text-align: center;" id="edsvfm_ans1"></td>
            <td class="line_c">점수</td>
            <td class="line_b" style = "text-align: center;" id="edsvfm_scr1"></td>
            <td class="line_c">답변2</td>
            <td class="line_b" style = "text-align: center;" id="edsvfm_ans2"></td>
            <td class="line_c">점수</td>
            <td class="line_b" style = "text-align: center;" id="edsvfm_scr2"></td>
          </tr>  
          <tr>
            <td class="line_rt">답변3</td>
            <td class="line_b" style = "text-align: center;" id="edsvfm_ans3"></td>
            <td class="line_c">점수</td>
            <td class="line_b" style = "text-align: center;" id="edsvfm_scr3"></td>
            <td class="line_c">답변4</td>
            <td class="line_b" style = "text-align: center;" id="edsvfm_ans4"></td>
            <td class="line_c">점수</td>
            <td class="line_b" style = "text-align: center;" id="edsvfm_scr4"></td>
          </tr> 
          <tr>
            <td class="line_rt">답변5</td>
            <td class="line_b" style = "text-align: center;" id="edsvfm_ans5"></td>
            <td class="line_c">점수</td>
            <td class="line_b" style = "text-align: center;" id="edsvfm_scr5"></td>
            <td class="line_c"></td>
            <td class="line_b"></td>
            <td class="line_c"></td>
            <td class="line_b"></td>
          </tr>           
        </table><!--"개인정보테이블"-->
        

			</div><!--"오른쪽 교육대상"-->

    </div>
  <!--"BODY"-->
  </body>
</html>