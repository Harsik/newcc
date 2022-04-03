<%@ page language="java" contentType="text/html; charset=utf-8" 	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
	<title>일일보고</title>
	<link rel="icon" href="/resources/images/favicon.ico">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css" />
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/dext5editor/js/dext5editor.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/edu/eduMange.js'/>"></script>
</head>
<body>
 <!--BODY-->
    <div id="h1">일일교육</div>
    <div id="pop_body" style="height:845px;">
    
			<!--왼쪽 교육일정-->
			<div style="width: 65%; float:left;"> 
			   
	      <!--타이틀-->
	      <div class="stitle">일일교육</div>
	      <!--"타이틀"-->
	      
	      <!-- 조회/검색 -->
	      <div id="search">
	        <table class="search_tbl">
	          <tr>
	             <th>일자</th>
	             <td style="width:20%;">
	               <input type="text" class="text_ol_half" id="selFrDate" style="width:120px;" maxlength="8" readonly>
	             </td> 	          
		           <th>교육 명</th>
		           <td style="width:40%;">
		            <input type="text" class="text_ol" id="srchCrrcum" maxlength="60" style="width:420px;">
		           </td>
		           <td class="btn">
		             <button type="button" id="btnSearch"  class="button">조회</button>
		             <button type="button" id="btnSearch"  class="button">출력</button>
		             <button type="button" id="btnInit"  class="button">초기화</button>
		           </td>
	          </tr>
	        </table>
	      </div>
	      <!--"조회/검색"-->
	    
	      <!--타이틀-->
	      <div class="stitle">교육내용</div>
	     
	      <!-- 일일교육테을 -->    
	      <table class="profile_tbl">
	        <tr>
	          <td class="line_rt">교육일시</td>
	          <td class="line_b"  style="width:100px;" colspan="2">
	                                    교육일시
	          </td>
	          <td class="line_c" colspan="1">교육강사</td>
	          <td class="line_b"  style="width:100px;" colspan="2">
	                                   가사명
	          </td>
	        </tr>
	        <tr>
	          <td class="line_rt">교육장소</td>
	          <td class="line_b" style = "text-align: center;" id="tota_Edu_Tm"  colspan="2"></td>
	          <td class="line_c" colspan="1">교육내용</td>
	          <td class="line_b"  colspan="2">
	            <select class="select_bl" id="tch_Id"></select>
	          </td>
	        </tr>
	      </table>
	      <!--"일일교육테을"-->
			</div>
		<!--"왼쪽 교육내용"-->

			<!--오른쪽 교육대상-->
			<div style="width: 34%; float:right;">
	      <!--타이틀-->
	      <div class="stitle" style="margin-top: 3px">교육대상</div>
	      <!--"타이틀"-->
	      <!-- 조회/검색 -->
	      <div id="search">
	        <table class="search_tbl">
	          <tr>
	             <th>상담사</th>    
		           <td><select class="select_al" id="srchTeamCd"></select></td>	            
	             <td><select class="select_al" id="selSrchAgtId"></select></td>
	             <td class="btn">
	               <button type="button" id="btnTrgtSearch"  class="button">조회</button>
	               <button type="button" id="btnTrgtInit"  class="button">초기화</button>
	             </td>
	          </tr>
	        </table>
	      </div><!--"조회/검색"-->
	
	      <!--타이틀-->
        <div class="stitle">교육대상자</div>
        <!--"타이틀"-->
        <!--그리드-->
        <div id="grid_all">

          <!-- 그리드테이블 -->
          <div class="grid_tbl">     
            <table id="tblTargetList"></table>
            <div id="pgTargetList"></div>
          </div><!--"그리드테이블"-->
        </div><!--"그리드"-->
        
			    <div id="ctnt1">
			      <!-- 교육신청자  -->
			      <div data-tab="sect1">
			          <!-- 그리드테이블 -->
			          <div class="grid_tbl">     
			            <table id="tblApplyList"></table>
			            <div id="pgApplyList"></div>
			          </div><!--"그리드테이블"-->
			      </div>  <!-- "교육신청자 -->
			    </div>  
			    <!-- "ctnt1" -->
			</div><!--"오른쪽 교육대상"-->
    </div>
  <!--"BODY"-->
</body>
</html>