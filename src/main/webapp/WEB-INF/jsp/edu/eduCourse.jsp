<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <title>교육과정 관리</title>
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
    <script type="text/javascript" src="<c:url value='/resources/js/edu/eduCourse.js'/>"></script>
  </head>
  
  <body>
    
    <!--BODY-->
    <div id="h1">교육과정 관리</div>
    <div id="pop_body" style="height:875px;">
    
			<!--왼쪽 교육과정관리-->
			<div style="width: 65%; float:left;">    
	    <form id="educou_writeForm" name="writeForm" action="/ajax/edu/wirteForm.do" method="post">
	      <!--타이틀-->
	      <div class="stitle">교육과정 조회</div>
	      <!--"타이틀"-->
	      <!-- 조회/검색 -->
	      <div id="search">
	        <table class="search_tbl">
	          <tr>
	             <th>기간</th>
	             <td>
	               <input type="text" class="text_ol_half" id="educou_selFrDate" maxlength="8" readonly>
	                ~
	               <input type="text" class="text_ol_half" id="educou_selToDate" maxlength="8" readonly>   
	             </td> 	          
		           <th>교육유형</th>
		           <td>
		            <select class="select_bl" id="educou_srch_Edu_Class_Cd"></select>
		            <!-- <input type="text" class="text_ol" id="educou_srchCrrcum" maxlength="60"> -->
		           </td>
		           <td class="btn">
		             <button type="button" id="educou_btnSearch"  class="button">조회</button>
		             <button type="button" id="educou_btnInit"  class="button">초기화</button>
		           </td>
	          </tr>
	        </table>
	      </div><!--"조회/검색"-->
	    
	      <!--타이틀-->
	      <div class="stitle">교육과정 목록</div>
	      <!--"타이틀"-->
	      <!--그리드-->
	      <div id="grid_all">
	        <!-- 미사용/버튼 테이블 -->
	        <table class="info_tbl">
	          <tr>
	           <td>
	             <button type="button" id="educou_btnExcel" class="button">엑셀저장</button>
	           </td>
	          </tr>
	        </table><!--"미사용/버튼 테이블"-->
	    
	        <!-- 그리드테이블 -->
	        <div class="grid_tbl">     
	          <table id="educou_tblCourseList"></table>
	          <div id="educou_pgCourseList"></div>
	        </div><!--"그리드테이블"-->
	      </div><!--"그리드"-->
	    
	      <!--타이틀-->
	      <div class="stitle_bot" >교육과정 상세내용</div>
	      <!--"타이틀"-->
	      <!-- 버튼 테이블 --> 
	      <table class="info_tbl_btn" >
	        <tr>
	          <td>
	            <button type="button" id="educou_btnInsert"  class="button">추가</button>
	            <button type="button" id="educou_btnUpdate"  class="button">저장</button>
	          	<button type="button" id="educou_btnDelete"  class="button">삭제</button>
	            <button type="button" id="educou_btnReset"  class="button">초기화</button>
	          </td>
	        </tr>
	      </table><!--"버튼 테이블"-->
	      
	      <!-- 교육과정ID -->
	      <input type="hidden" id="educou_edu_Id">
	      
	      <!-- 개인정보테이블 -->    
	      <table class="profile_tbl">
	        <tr>
	          <td class="line_rt" style="width:90px;">교육유형</td>
	          <td class="line_b" style="width:380px;" colspan="3">
	           <select class="select_bl" style="width:82%;" id="educou_edu_Class_Cd"></select>
	           <button type="button" id="educou_btnCodePop"  class="button">코드등록</button>
	           <!-- <input type="text" class="text_ol" id="educou_crrcum"> -->
	          </td>
	          <td class="line_c" style="width:90px;">내/외 구분</td>
	          <td class="line_b" style="width:138px;">
	            <input type="radio" name="edu_Gb_Cd" id="educou_edu_Gb_Cd_In" value="100000" checked />내부
              <input type="radio" name="edu_Gb_Cd" id="educou_edu_Gb_Cd_Out" value="200000"/>외부
	          </td>
	          <td class="line_c" style="width:90px;">필수여부</td>
	          <td class="line_b" style="width:138px;">
              <input type="radio" name="ncss_Yn" value="Y" checked />예
              <input type="radio" name="ncss_Yn" value="N"/>아니오      
	          </td>
	        </tr>
	        <tr>
	          <td class="line_rt">교육과정명</td>
	          <td class="line_b"colspan="3"><input type="text" class="text_ol" id="educou_edu_ttl"></td>
            <td class="line_c">1차교육</td>
            <td class="line_b" colspan="6">
              <input type="text" class="text_ol_half" id="educou_edu_Strt_Dt1" name="edu_Strt_Dt1" style="width:60px;" maxlength="10" readonly>
                ~
              <input type="text" class="text_ol_half" id="educou_edu_End_Dt1" name="edu_End_Dt1" style="width:60px;" maxlength="10" readonly>
              <select class="select_bl"  style="width:40px;"id="educou_edu_Strt_Tm1"></select> 
              <select class="select_bl"  style="width:40px;"id="educou_edu_Strt_Mm1"></select> 
              ~
              <select class="select_bl"  style="width:40px;"id="educou_edu_End_Tm1"></select> 
              <select class="select_bl"  style="width:40px;"id="educou_edu_End_Mm1"></select>                  
            </td>	          
	        </tr>
	        <tr>
            <td class="line_rt">교육기간</td>
            <td class="line_b" colspan="3">
              <input type="text" class="text_ol_half" id="educou_app_Strt_Dt" name="app_Strt_Dt" maxlength="8" readonly>
                ~
              <input type="text" class="text_ol_half" id="educou_app_End_Dt" name="app_End_Dt" maxlength="8" readonly>          
            </td>	        
            <td class="line_c">2차교육</td>
            <td class="line_b" colspan="6">
              <input type="text" class="text_ol_half" id="educou_edu_Strt_Dt2" name="edu_Strt_Dt2" style="width:60px;" maxlength="10" readonly>
                ~
              <input type="text" class="text_ol_half" id="educou_edu_End_Dt2" name="edu_End_Dt2" style="width:60px;" maxlength="10" readonly>
              <select class="select_bl"  style="width:40px;"id="educou_edu_Strt_Tm2"></select> 
              <select class="select_bl"  style="width:40px;"id="educou_edu_Strt_Mm2"></select> 
              ~
              <select class="select_bl"  style="width:40px;"id="educou_edu_End_Tm2"></select> 
              <select class="select_bl"  style="width:40px;"id="educou_edu_End_Mm2"></select>                 
            </td>
	        </tr>
	        <tr>	          
	          <td class="line_rt">총교육시간
	           <input type="hidden" id="educou_tota_Edu_Minutes">
	          </td>
	          <td class="line_b" style = "text-align: center;width:150px;" id="educou_tota_Edu_Tm"></td>
	          <td class="line_c">강사</td>
	          <td class="line_b"  style="width:150px;">
	            <select class="select_bl" id="educou_tch_Id"></select>
	          </td>
            <td class="line_c">3차교육</td>
            <td class="line_b" colspan="6">
              <input type="text" class="text_ol_half" id="educou_edu_Strt_Dt3" name="edu_Strt_Dt3" style="width:60px;" maxlength="10" readonly>
                ~
              <input type="text" class="text_ol_half" id="educou_edu_End_Dt3" name="edu_End_Dt3" style="width:60px;" maxlength="10" readonly>
              <select class="select_bl"  style="width:40px;"id="educou_edu_Strt_Tm3"></select> 
              <select class="select_bl"  style="width:40px;"id="educou_edu_Strt_Mm3"></select> 
              ~
              <select class="select_bl"  style="width:40px;"id="educou_edu_End_Tm3"></select> 
              <select class="select_bl"  style="width:40px;"id="educou_edu_End_Mm3"></select>                 
            </td>
	        </tr>
	        <tr>
	          <td class="line_rt">교육장소</td>
	          <td class="line_b">
	           <input type="text" class="text_ol" id="educou_edu_Plc">
	          </td>
	          <td class="line_c">교육상태</td>
	          <td class="line_b">
	            <select class="select_bl" id="educou_edu_St_Cd"></select>
	          </td>
            <td class="line_c">4차교육</td>
            <td class="line_b" colspan="6">
              <input type="text" class="text_ol_half" id="educou_edu_Strt_Dt4" name="edu_Strt_Dt4" style="width:60px;" maxlength="10" readonly>
                ~
              <input type="text" class="text_ol_half" id="educou_edu_End_Dt4" name="edu_End_Dt4" style="width:60px;" maxlength="10" readonly>
              <select class="select_bl" style="width:40px;"id="educou_edu_Strt_Tm4"></select> 
              <select class="select_bl" style="width:40px;"id="educou_edu_Strt_Mm4"></select> 
              ~
              <select class="select_bl" style="width:40px;"id="educou_edu_End_Tm4"></select> 
              <select class="select_bl" style="width:40px;"id="educou_edu_End_Mm4"></select>                 
            </td>
	        </tr>	        
	        <tr>
	          <td class="line_rt">설문여부</td>
            <td class="line_b">
              <select class="select_bl" style="width:45%;" id="educou_eduSuvy_Yn">
		            <option value="N">미작성</option>
		            <option value="Y">작성</option>              
              </select>
              <select class="select_bl" style="width:49%;" id="educou_eduSuvy_Id"></select>              
            </td>
            <td class="line_c">교육대상자</td>
            <td class="line_b" style = "text-align: center;" id=tota_Edu_Trgt></td>
            <!-- 
            <td class="line_c">신청자</td>
            <td class="line_b" style = "text-align: center;" id="educou_tota_Edu_Prpsr"></td>
             -->
            <td class="line_c">5차교육</td>
            <td class="line_b" colspan="6">
              <input type="text" class="text_ol_half" id="educou_edu_Strt_Dt5" name="edu_Strt_Dt5" style="width:60px;" maxlength="10" readonly>
                ~
              <input type="text" class="text_ol_half" id="educou_edu_End_Dt5" name="edu_End_Dt5" style="width:60px;" maxlength="10" readonly>
              <select class="select_bl"  style="width:40px;"id="educou_edu_Strt_Tm5"></select> 
              <select class="select_bl"  style="width:40px;"id="educou_edu_Strt_Mm5"></select> 
              ~
              <select class="select_bl"  style="width:40px;"id="educou_edu_End_Tm5"></select> 
              <select class="select_bl"  style="width:40px;"id="educou_edu_End_Mm5"></select>                 
            </td>
	        </tr>
	        
	        <tr>
            <td class="line_rt">교육비지급</td>
            <td class="line_b">
              <input type="radio" name="eduExp_Pay_Yn" value="Y" checked />예
              <input type="radio" name="eduExp_Pay_Yn" value="N"/>아니오            
            </td>
            <td class="line_c">노동부신고</td>
            <td class="line_b">
              <input type="radio" name="lbrEpt_Yn" value="Y" checked />예
              <input type="radio" name="lbrEpt_Yn" value="N"/>아니오            
            </td>	        
            <td class="line_c">등록</td>
            <td class="line_b" style = "text-align: center;" id="educou_crd_Dt"></td>
            <td class="line_c">수정</td>
            <td class="line_b" style = "text-align: center;" id="educou_mod_Dt"></td>
	        </tr>
      
	        <tr>
	          <td class="line_rt">비고</td>
	          <td class="line_b" colspan="7"><input type="text" class="text_ol" id="educou_memo"></td>
	        </tr>
	        <tr>
	          <td class="line_rt">교육자료</td>
	          <td class="line_b" colspan="7">
	            <table id="educou_fileInfos" style="margin-left: 5px; margin-right: 6px;">
	              <tr>
	                <td style="width: 30%;">
	                  <input type="hidden" name="record_XXX" value="" />
	                  <!-- <input type="hidden" name="action" value="add" /> -->
	                  <input type="file" id="educou_EDU_FILE" name="EDU_FILE" class="file_board" style="width:420px;" />
	                </td>
	                <td style="width: 20%">
	                  <img src="/resources/images/btn_cancel.png" id="educou_btnRmFilebox" style="cursor: pointer; margin-top: 4px; margin-left: 4px;" alt="취소" />
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
        <table id="educou_fileadd" style="display:none">
          <tr>
            <td style="width: 30%;">
              <input type="hidden" name="record_XXX" value="" />
              <!-- <input type="hidden" name="action" value="add" /> -->
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
	      <div class="stitle" style="margin-top: 10px">교육대상</div>
	      <!--"타이틀"-->
	      <!-- 조회/검색 -->
	      <div id="search">
	        <table class="search_tbl">
	          <tr>
	             <th>상담사</th>    
		           <td><select class="select_al" id="educou_srchTeamCd"></select></td>	            
	             <td><select class="select_al" id="educou_selSrchAgtId"></select></td>
	             <td class="btn">
	               <button type="button" id="educou_btnTrgtSearch"  class="button">조회</button>
	               <button type="button" id="educou_btnTrgtInit"  class="button">초기화</button>
	             </td>
	          </tr>
	        </table>
	      </div><!--"조회/검색"-->
	
	      <!--타이틀-->
        <div class="stitle">교육대상자</div>
        <!--"타이틀"-->
        <!--그리드-->
        <div id="grid_all">
          <!-- 미사용/버튼 테이블 -->
          <table class="info_tbl">
            <tr>
            <td>
              <button type="button" id="educou_btnSave"  class="button">등록</button>
              <!-- <button type="button" id="educou_btnCancel"  class="button">취소</button> -->
            </td>            
            </tr>
          </table><!--"미사용/버튼 테이블"-->
      
          <!-- 그리드테이블 -->
          <div class="grid_tbl">     
            <table id="educou_tblTargetList"></table>
            <div id="educou_pgTargetList"></div>
          </div><!--"그리드테이블"-->
        </div><!--"그리드"-->
	
        <!--타이틀-->
        <div class="stitle_bot">교육대상 및 이수 확정</div>
        <!--"타이틀"-->

			    <ul id="tabs1">
			      <li data-tab="sect1">교육 대상자</li>
			      <li data-tab="sect2">교육 이수자</li>
			    </ul>
			
			    <div id="ctnt1">
			      <!-- 교육신청자  -->
			      <div data-tab="sect1">
			
			<!-- ++++++++++++++++++++++++++++++++++++++++++++++++++ -->        
			        <!--그리드-->
			        <div id="grid_all">
			          <!-- 미사용/버튼 테이블 -->
			          <table class="info_tbl">
			            <tr>
				            <td>
				              <button type="button" id="educou_btnConfirm"  class="button">저장</button>
				              <button type="button" id="educou_btnDelConfirm"  class="button">삭제</button>
				            </td>              
			            </tr>
			          </table><!--"미사용/버튼 테이블"-->
			      
			          <!-- 그리드테이블 -->
			          <div class="grid_tbl">     
			            <table id="educou_tblApplyList"></table>
			            <div id="educou_pgApplyList"></div>
			          </div><!--"그리드테이블"-->
			        </div><!--"그리드"-->	
			        
			<!-- ++++++++++++++++++++++++++++++++++++++++++++++++++ -->   
			        
			      </div>  <!-- "교육신청자 -->
			      
			      <!-- 교육 이수자  -->
			      <div data-tab="sect2">
			
			        <!--그리드-->
			        <div id="grid_all">
			          <!-- 미사용/버튼 테이블 -->
<!-- 			          <table class="info_tbl">
			            <tr>
			              <td>
			                <button type="button" id="educou_btnConfirm"  class="button">저장</button>
			              </td>              
			            </tr>
			          </table> --><!--"미사용/버튼 테이블"-->
			      
			          <!-- 그리드테이블 -->
			          <div class="grid_tbl">     
			            <table id="educou_tblConfirmList"></table>
			            <div id="educou_pgConfirmList"></div>
			          </div><!--"그리드테이블"-->
			        </div><!--"그리드"-->  
			        
			      </div> <!-- "교육 이수자" -->          
			        
			    </div>  <!-- "ctnt1" -->
        

			</div><!--"오른쪽 교육대상"-->

    </div>
  <!--"BODY"-->
  </body>
</html>