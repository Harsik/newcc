<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <title>교육강사 관리</title>
	<link rel="icon" href="/resources/images/favicon.ico">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
    
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/edu/eduLecturer.js'/>"></script>
  </head>
  
  <body>
    
    <!--BODY-->
    <div id="h1">교육강사 관리</div>
    <div id="pop_body">
      <!--타이틀-->
      <div class="stitle">교육강사 조회</div>
      <!--"타이틀"-->
      <!-- 조회/검색 -->
      <div id="search">
        <table class="search_tbl">
					<tr>
						<th>강사명</th>
						<td>
							<input type="text" class="text_ol" style="width:150px;" id="edulec_srchLectNm" maxlength="60">
						</td>
						<th>강사구분</th>
						<td>
							<input type="radio" name="srhTchGbCd" value="100000" checked />내부강사
							<input type="radio" name="srhTchGbCd" value="200000"/>외부강사
						</td>   
						<th>사용여부</th>
            <td>
              <input type="radio" name="srhUseYn" value="Y" checked />사용
              <input type="radio" name="srhUseYn" value="N"/>미사용
            </td>
						<td class="btn">
							<button type="button" id="edulec_btnSearch"  class="button">조회</button>
							<button type="button" id="edulec_btnInit"  class="button">초기화</button>
						</td>
					</tr>
        </table>
      </div><!--"조회/검색"-->
    
    
      <!--타이틀-->
      <div class="stitle">교육강사 목록</div>
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
          <table id="edulec_tblLecturerList"></table>
          <div id="edulec_pgLecturerList"></div>
          </div><!--"그리드테이블"-->
      </div><!--"그리드"-->
      
    
      <!--타이틀-->
      <div class="stitle_bot">강사등록</div>
      <!--"타이틀"-->
      <!--버튼 테이블-->
      <table class="info_tbl_btn">
        <tr>
          <th></th>
          <td>
            <button type="button" id="edulec_btnInsert"  class="button">추가</button>
            <button type="button" id="edulec_btnUpdate"  class="button">저장</button>
            <button type="button" id="edulec_btnReset"  class="button">초기화</button>
          </td>
        </tr>
      </table><!--"버튼 테이블"-->
      
      <!-- 개인정보테이블 -->    
      <table class="profile_tbl">
        <tr>
          <td class="line_rt">강사 ID</td>
          <td class="line_b"><input type="text" class="text_ol" id="edulec_tch_Id" maxlength="34"></td>
          <td class="line_c">강사명</td>
          <td class="line_b"><input type="text" class="text_ol" id="edulec_tch_Nm" maxlength="50"></td>
          <td class="line_c">연락처</td>
          <td class="line_b"><input type="text" class="text_ol" id="edulec_tel_No" maxlength="20"></td>
        </tr>
        <tr>
          <td class="line_rt">소속</td>
          <td class="line_b"><input type="text" class="text_ol" id="edulec_corp_Nm" maxlength="100"></td>
          <td class="line_c">직책</td>
          <td class="line_b"><input type="text" class="text_ol" id="edulec_dty_Nm" maxlength="100"></td>
          <td class="line_c">이메일</td>
          <td class="line_b"><input type="text" class="text_ol" id="edulec_eml_Adr" maxlength="100"></td>
        </tr>
        <tr>
          <td class="line_rt" >강의명</td>
          <td class="line_b" colspan = "3"><input type="text" class="text_ol" id="edulec_lect_Nm" maxlength="100"></td>
          <td class="line_c">사용여부</td>
          <td class="line_b">
            <input type="radio" name="use_yn" value="Y" checked />사용
            <input type="radio" name="use_yn" value="N"/>미사용          
          </td>
        </tr>
        <tr>
          <td class="line_rt">비고</td>
          <td class="line_b" colspan = "5"><input type="text" class="text_ol" id="edulec_memo" maxlength="500"></td>
        </tr>
        <tr>
          <td class="line_rt">강사구분</td>
          <td class="line_b">
            <input type="radio" name="tch_Gb_Cd" value="100000" checked />내부강사
            <input type="radio" name="tch_Gb_Cd" value="200000"/>외부강사          
          </td>
          <td class="line_c">등록일</td>
          <td class="line_b" id="edulec_crtDt"></td>
          <td class="line_c">등록자</td>
          <td class="line_b" id="edulec_crtUsrId"></td>
        </tr>       
      </table><!--"개인정보테이블"-->
           
    </div>
  <!--"BODY"-->
  </body>
</html>