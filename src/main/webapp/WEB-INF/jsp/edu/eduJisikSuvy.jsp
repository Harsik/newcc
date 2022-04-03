<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <title>업무지식 테스트 관리</title>
	<link rel="icon" href="/resources/images/favicon.ico">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/tab.css" />
    
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>    
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery.gbTabs.js"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/edu/eduJisikSuvy.js'/>"></script>
  </head>
  
  <body>
    
    <!--BODY-->
    <div id="h1">업무지식 테스트 관리</div>
    <div id="pop_body" style="height:880px;">
    
			<!--왼쪽 교육과정관리-->
			<div style="width: 65%; float:left;">    
	    <form id="writeForm" name="writeForm" action="/ajax/edu/wirteForm.do" method="post">
	      <!--타이틀-->
	      <div class="stitle">업무지식 조회</div>
	      <!--"타이틀"-->
	      <!-- 조회/검색 -->
	      <div id="search">
	        <table class="search_tbl">
	          <tr>
	             <th>일자</th>
	             <td>
	               <input type="text" class="text_ol_half" id="edjssv_selFrDate" maxlength="10" readonly>
	                ~
	               <input type="text" class="text_ol_half" id="edjssv_selToDate" maxlength="10" readonly>   
	             </td> 	          
		           <td class="btn">
		             <button type="button" id="edjssv_btnSearch"  class="button">조회</button>
		             <button type="button" id="edjssv_btnInit"  class="button">초기화</button>
		           </td>
	          </tr>
	        </table>
	      </div><!--"조회/검색"-->
	    
	      <!--타이틀-->
	      <div class="stitle">업무지식 목록</div>
	      <!--"타이틀"-->
	      <!--그리드-->
	      <div id="grid_all">
	        <!-- 미사용/버튼 테이블 -->
	        <table class="info_tbl">
	          <tr>
	           <!-- <td><button type="button" id="btnExcel" class="button">엑셀저장</button></td> -->
	          </tr>
	        </table><!--"미사용/버튼 테이블"-->
	    
	        <!-- 그리드테이블 -->
	        <div class="grid_tbl" style="margin-top:20px;">     
	          <table id="edjssv_tblJskSuvyList"></table>
	          <div id="edjssv_pgJskSuvyList"></div>
	        </div><!--"그리드테이블"-->
	      </div><!--"그리드"-->
	    
	      <!--타이틀-->
	      <div class="stitle_bot" >업무지식 등록</div>
	      <!--"타이틀"-->
	      <!-- 버튼 테이블 --> 
	      <table class="info_tbl_btn" >
	        <tr>
	          <td>
	            <button type="button" id="edjssv_btnInsert"  class="button">추가</button>
	            <button type="button" id="edjssv_btnUpdate"  class="button">저장</button>
	            <button type="button" id="edjssv_btnDelete"  class="button">삭제</button>
	            <button type="button" id="edjssv_btnReset"  class="button">초기화</button>
	          </td>
	        </tr>
	      </table><!--"버튼 테이블"-->
	      
	      <!-- 교육과정ID -->
	      <input type="hidden" id="edjssv_edu_Id">
	      
	      <!-- 개인정보테이블 -->    
	      <table class="profile_tbl">
	        <tr>
	          <td class="line_rt" style="width:13%;">등록일자</td>
	          <td class="line_b" colspan="2" style="width:45%;">
              <input type="text" class="text_ol_half" id="edjssv_reg_Dt" name="reg_Dt" maxlength="10" readonly>
            </td>
	          <td class="line_c" style="width:13%;">응시일시</td>
	          <td class="line_b"colspan="2">
              <input type="text" class="text_ol_half" id="edjssv_exam_Strt_Dt" name="exam_Strt_Dt" maxlength="10" readonly>
                ~
              <input type="text" class="text_ol_half" id="edjssv_exam_End_Dt" name="exam_End_Dt" maxlength="10" readonly>
	          </td>
	        </tr>
	        <tr>
	          <td class="line_rt">제목</td>
	          <td class="line_b"colspan="3"><input type="text" class="text_ol" id="edjssv_task_Knwg_Ttl"></td>
            <td class="line_c">응시인원</td>
            <td class="line_b" style = "text-align: center;" id="edjssv_usr_Cnt">
              
            </td>	          
	        </tr>
	        <tr>
            <td class="line_rt">실시목적</td>
            <td class="line_b" colspan="5"><input type="text" class="text_ol" id="edjssv_exec_Pps"></td>
	        </tr>

	        <tr>
	          <td class="line_rt">첨부파일</td>
	          <td class="line_b" colspan="5">
	            <table id="edjssv_fileInfos" style="margin-left: 5px; margin-right: 6px;">
	              <tr>
	                <td style="width: 30%;">
	                  <input type="hidden" name="record_XXX" value="" />
	                  <!-- <input type="hidden" name="action" value="add" /> -->
	                  <input type="file" id="edjssv_EDU_FILE" name="EDU_FILE" class="file_board" style="width:420px;" />
	                </td>
	                <td style="width: 20%">
	                  <img src="/resources/images/btn_cancel.png" id="edjssv_btnRmFilebox" style="cursor: pointer; margin-top: 4px; margin-left: 4px;" alt="취소" />
	                </td>
	                <td style="width: 20%; text-align: right;">
	                  <img src="/resources/images/btn_fileadd.png" onClick="addFileBox()" alt="파일추가" class="icon_add" style="cursor: pointer"/>
	                </td>
	              </tr>
	            </table>
	          </td>
	        </tr>
	      </table><!--"개인정보테이블"-->
  	  </form>
			</div><!--"왼쪽 교육과정관리"-->
			
        <!-- 첨부파일 -->
        <table id="edjssv_fileadd" style="display:none">
          <tr>
            <td style="width: 30%;">
              <input type="hidden" name="record_XXX" value="" />
			<!-- 2019.12.30 hhs 150행 주석처리 해제(파일첨부) -->
              <input type="hidden" name="action" value="add" />
              <input type="file" name="EDU_FILE" class="file_board" style="width:420px;" />
            </td>
            <td style="width: 20%">
              <img src="/resources/images/btn_cancel.png" onClick="removeFileBox(XXX)" style="cursor: pointer; margin-top: 4px; margin-left: 4px;" alt="취소" />
            </td>
            <td style="width: 20%; text-align: right;"></td>
          </tr>
        </table><!-- "첨부파일" -->
			
			
			<!--오른쪽 교육대상-->
			<div style="width: 34%; float:right;">
	
	      <!--타이틀-->
	      <div class="stitle" style="margin-top: 10px">업무지식 대상 및 확인</div>
	      <!--"타이틀"-->
	      <!-- 조회/검색 -->
	      <div id="search">
	        <table class="search_tbl">
	          <tr>
	             <th>상담사</th>    
		           <td><select class="select_al" id="edjssv_srchTeamCd"></select></td>	            
	             <td><select class="select_al" id="edjssv_selSrchAgtId"></select></td>
	             <td class="btn">
	               <button type="button" id="edjssv_btnTrgtSearch"  class="button">조회</button>
	               <button type="button" id="edjssv_btnTrgtInit"  class="button">초기화</button>
	             </td>
	          </tr>
	        </table>
	      </div><!--"조회/검색"-->
	
	      <!--타이틀-->
        <div class="stitle">업무지식결과</div>
        <!--"타이틀"-->
        <!--그리드-->
        <div id="grid_all">
          <!-- 미사용/버튼 테이블 -->
          <table class="info_tbl">
            <tr>
            <td>
              <button type="button" id="edjssv_btnChart"  class="button">평가실적 현황</button>
              <button type="button" id="edjssv_btnPrint"  class="button">보고서 출력</button>
            </td>            
            </tr>
          </table><!--"미사용/버튼 테이블"-->
      
          <!-- 그리드테이블 -->
          <div class="grid_tbl">     
            <table id="edjssv_tblTargetList"></table>
            <div id="edjssv_pgTargetList"></div>
          </div><!--"그리드테이블"-->
        </div><!--"그리드"-->
	
        <!--타이틀-->
        <div class="stitle_bot">업무지식 결과 등록</div>
        <!--"타이틀"-->
        <!-- 버튼 테이블 --> 
        <table class="info_tbl_btn" >
          <tr>
            <td>
              <button type="button" id="edjssv_btnInsertRtn"  class="button">추가</button>
              <button type="button" id="edjssv_btnUpdateRtn"  class="button">저장</button>
              <button type="button" id="edjssv_btnDeleteRtn"  class="button">삭제</button>
              <button type="button" id="edjssv_btnResetRtn"  class="button">초기화</button>
            </td>
          </tr>
        </table><!--"버튼 테이블"-->
        
        <!-- 개인정보테이블 -->    
        <table class="profile_tbl">
          <tr>
            <td class="line_rt">팀</td>
            <td class="line_b">
              <select class="select_al" id="edjssv_team_Id"></select>
            </td>
            <td class="line_c">상담사</td>
            <td class="line_b">
              <select class="select_al" id="edjssv_usr_Id"></select>
            </td>
          </tr>
          <tr>
            <td class="line_rt">1차점수</td>
            <!-- <td class="line_b"><input type="text" onkeypress="return isNumberKey(event)" class="text_ol_70" style="text-align:right;" id="edjssv_fst"> &nbsp; 점</td> -->
            <td class="line_b"><input type="text" class="text_ol_70" style="text-align:right;" id="edjssv_fst"> &nbsp; 점</td>
            <!-- 2차 사용하지 않음 
            <td class="line_c">2차점수</td>
            <td class="line_b"><input type="text" class="text_ol_70" style="text-align:right;" id="edjssv_sec"> &nbsp; 점</td>
             -->           
            <td class="line_c"></td>
            <td class="line_b"><input type="hidden" class="text_ol_70" style="text-align:right;" id="edjssv_sec"></td>             
          </tr>
          <tr>
            <td class="line_rt">소요시간</td>
            <td class="line_b">
              <input type="text" class="text_ol" style="text-align:center;width:40px" id="edjssv_dstb_Tm" maxlength="2"> &nbsp; 분 &nbsp;
              <input type="text" class="text_ol" style="text-align:center;width:40px" id="edjssv_dstb_Mm" maxlength="2"> &nbsp; 초
            </td>
            <td class="line_c">순위</td>
            <td class="line_b"><input type="text" class="text_ol" style="text-align:right;" id="edjssv_rnk"></td>
          </tr>
          <tr>
            <td class="line_rt">교육확인</td>
            <td class="line_b">
              <input type="radio" name="edu_Cfm_Dtm" value="Y" />예
              <input type="radio" name="edu_Cfm_Dtm" value="N" checked/>아니오            
            </td>
            <td class="line_c">확인일시</td>
            <td class="line_b" style = "text-align: center;" id="edjssv_edu_Cfm_Dtm"></td>
          </tr>
        </table><!--"개인정보테이블"-->
        

			</div><!--"오른쪽 교육대상"-->

    </div>
  <!--"BODY"-->
  </body>
</html>