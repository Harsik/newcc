<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <title>교육과정 조회</title>
	<link rel="icon" href="/resources/images/favicon.ico">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
    
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/edu/eduLearner.js'/>"></script>
  </head>
  
  <body>
    
    <!--BODY-->
    <div id="h1">교육과정 조회</div>
    <div id="pop_body" style="height:830px;">
      <!--타이틀-->
      <div class="stitle">교육과정 조회</div>
      <!--"타이틀"-->
      <!-- 조회/검색 -->
      <div id="search">
        <table class="search_tbl">
          <tr>
            <th>기간</th>
            <td>
              <input type="text" class="text_ol_half" id="edulea_selFrDate" maxlength="8">
               ~
              <input type="text" class="text_ol_half" id="edulea_selToDate" maxlength="8">   
            </td>             
	           <th>교육과정명</th>
	           <td>
	             <select class="select_bl" id="edulea_srchCrrcum"></select>
	            <!-- <input type="text" class="text_ol" id="edulea_srchCrrcum" maxlength="60"> -->
	           </td>
<!-- 	           <th>상담사</th>    
	           <td>
	             <select class="select_al" id="edulea_selAgent">
	             </select>
	           </td> -->
	           <td class="btn">
	             <button type="button" id="edulea_btnSearch"  class="button">조회</button>
	             <button type="button" id="edulea_btnInit"  class="button">초기화</button>
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
          </tr>
        </table><!--"미사용/버튼 테이블"-->
    
        <!-- 그리드테이블 -->
        <div class="grid_tbl">     
          <table id="edulea_tblCourseList"></table>
          <div id="edulea_pgCourseList"></div>
        </div><!--"그리드테이블"-->
      </div><!--"그리드"-->
    
      <!--타이틀-->
      <div class="stitle_bot" >교육과정 상세내용</div>
      <!--"타이틀"-->
      <!-- 버튼 테이블 --> 
      <table class="info_tbl_btn">
        <tr>
          <td>
            <!-- <button type="button" id="btnSuvy_Popup"  class="button">설문조사 작성</button> -->
          </td>
        </tr>
      </table><!--"버튼 테이블"-->
    
      <input type="hidden" id="edulea_getEduId">
      <input type="hidden" id="edulea_getSuvyId">
      <input type="hidden" id="edulea_getUsrId">
        
      <!-- 개인정보테이블 -->    
      <table class="profile_tbl">
        <tr>
          <td class="line_rt">교육과정명</td>
          <td class="line_b"  style="width:360px;" colspan="3" id="edulea_crrcum"></td>
          <td class="line_c">내/외 구분</td>
          <td class="line_b"  style="width:100px;">
            <input type="radio" name="edu_Gb_Cd" value="100000" checked />내부
            <input type="radio" name="edu_Gb_Cd" value="200000"/>외부
          </td>      
          <td class="line_c">필수여부</td>
          <td class="line_b" style="width:100px;">
            <input type="radio" name="ncss_Yn" value="Y" checked />예
            <input type="radio" name="ncss_Yn" value="N"/>아니오      
          </td>
        </tr>
        <tr>
          <td class="line_c">교육내용</td>
          <td class="line_b"colspan="3" id="edulea_edu_Cont"></td>
          <td class="line_c">1차교육</td>
          <td class="line_b" colspan="3" style = "text-align: center;" id="edulea_edu_Ord_1"></td>
        </tr>
        <tr>
          <td class="line_rt">교육기간</td>
          <td class="line_b" colspan="3" id="edulea_edu_Strt_Dt"></td>
          <td class="line_c">2차교육</td>
          <td class="line_b" colspan="3" style = "text-align: center;" id="edulea_edu_Ord_2"></td>
        </tr>
        <tr>
          <td class="line_rt">총교육시간</td>
          <td class="line_b" style = "text-align: center;" id="edulea_tota_Edu_Tm"></td>
          <td class="line_c">강사</td>
          <td class="line_b" id="edulea_tch_Id"></td>
          <td class="line_c">3차교육</td>
          <td class="line_b" colspan="3" style = "text-align: center;" id="edulea_edu_Ord_3"></td>
        </tr>
        <tr>
          <td class="line_rt">교육장소</td>
          <td class="line_b" id="edulea_edu_Plc"></td>
          <td class="line_c">교육상태</td>
          <td class="line_b" id="edulea_edu_St_Cd"></td>
          <td class="line_c">4차교육</td>
          <td class="line_b" colspan="3" style = "text-align: center;" id="edulea_edu_Ord_4"></td>
        </tr>
        <tr>
          <td class="line_rt">설문여부</td>
          <td class="line_b" id="edulea_eduSuvy_Yn"></td>
          <td class="line_c">교육대상자</td>
          <td class="line_b" style = "text-align: center;" id="edulea_tota_Edu_Trgt"></td>
          <td class="line_c">5차교육</td>
          <td class="line_b" colspan="3" style = "text-align: center;" id="edulea_edu_Ord_5"></td>
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
          <td class="line_b" style = "text-align: center;" id="edulea_crd_Dt"></td>
          <td class="line_c">수정</td>
          <td class="line_b" style = "text-align: center;" id="edulea_mod_Dt"></td>
        </tr>       
        <tr>
          <td class="line_rt">비고</td>
          <td class="line_b" colspan="7" id="edulea_memo"></td>
        </tr>
        <tr>
          <td class="line_rt">교육자료</td>
          <td class="line_b" colspan="7">
            <table id="edulea_fileInfos" style="margin-left: 5px; margin-right: 6px;">
              <tr>
                <td style="width: 30%;">
<!--                   <input type="hidden" name="record_XXX" value="" />
                  <input type="hidden" name="action" value="add" />
                  <input type="file" id="edulea_EDU_FILE" name="EDU_FILE" class="file_board" style="width:420px;" /> -->
                </td>
<!--                 <td style="width: 20%">
                  <img src="/resources/images/btn_cancel.png" id="edulea_btnRmFilebox" style="cursor: pointer; margin-top: 4px; margin-left: 4px;" alt="취소" />
                </td>
                <td style="width: 20%; text-align: right;">
                  <img src="/resources/images/btn_fileadd.png" onClick="addFileBox()" alt="파일추가" class="icon_add" style="cursor: pointer"/>
                </td> -->
              </tr>
            </table>
          </td>
        </tr>
      </table><!--"개인정보테이블"-->
      
      <!-- 첨부파일 -->
      <table id="edulea_fileadd" style="display:none">
        <tr>
          <td style="width: 30%;">
<!--             <input type="hidden" name="record_XXX" value="" />
            <input type="hidden" name="action" value="add" />
            <input type="file" name="EDU_FILE" class="file_board" style="width:420px;" /> -->
          </td>
<!--           <td style="width: 20%">
            <img src="/resources/images/btn_cancel.png" onClick="removeFileBox(XXX)" style="cursor: pointer; margin-top: 4px; margin-left: 4px;" alt="취소" />
          </td> -->
          <td style="width: 20%; text-align: right;"></td>
        </tr>
      </table><!-- "첨부파일" --> 
      
     </div>
  <!--"BODY"-->
  </body>
</html>