﻿<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
      
        <!-- 조회/검색 -->
        <div id="search">
          <table class="search_tbl">
            <tr>
              <th style="width: 300px;">
                <input type="radio" class="radio" name="rdSearchGb" id="rdSearchGb_al" value="ALL" checked>전체검색 
                <input type="radio" class="radio" name="rdSearchGb" id="rdSearchGb_aj" value="JOB">업무명 
                <input type="radio" class="radio" name="rdSearchGb" id="rdSearchGb_am" value="DEPT" >부서명
                <input type="radio" class="radio" name="rdSearchGb" id="rdSearchGb_an" value="NAME">성명
                <input type="radio" class="radio" name="rdSearchGb" id="rdSearchGb_at" value="TEL">전화번호
              </th>
              <td class="nemo_30">
                <input type="text" id="tfSrchVal" class="text_ol" placeholder=" 업무명, 부서명, 성명, 전화번호를 입력해주세요!">
              </td>
                                       
              <th style="width: 100px;" >
	              <input type="checkbox" id ="chkAffairsYn"  class="checkbox"   >
	              <label for="chkAffairsYn"  >서무만 조회</label>
              </th>
              <th style="width: 160px;" >
	              <input type="checkbox" id ="chkIncludeYn"  class="checkbox"   >
	              <label for="chkIncludeYn"  >퇴직 포함</label>
              </th>
              
               
              <td class="btn">
                <button type="button" id="btnSearch" class="button">조회</button>
                <button type="button" id="btnExcel" class="button">엑셀저장</button>
                <button type="button" id="btnInit" class="button">초기화</button>
              </td>
            </tr> 
          </table>
        </div><!--"조회/검색"-->

      <div>
        <div class="stitle" style="margin-left : 0px;">전화걸기</div><br>
      </div>
      <div id="search">
        <table class="search_tbl">
          <tr>
            <th>
              <label>전화번호</label>
            </th>
            <td class="nemo_30">
              <input type="text" id="tfCallNum1" class="text_ol" maxlength="50">
            </td> 
            <td class="btn">
              <button type="button" id="btnCall1" class="button">전화걸기</button>
            </td>
          </tr> 
        </table>
      </div>
              
        <!-- 하위부서버튼 테이블 -->
        <table class="info_tbl">
          <tr>
            <th>
              <span class="stitle8" id="orgJobDtm"></span>
              <input type="text" class="text_ol_half" id="selJabDate" maxlength="16" style="width: 100px; margin-left: 35px">
              <button type="button" id="btnOrgBatch" class="button">배치실행</button>
            </th>
            <td><input type="checkbox" id ="chkNotLowLevDept" name="check1" class="checkbox"  checked >
              <label for="chkNotLowLevDept"  >하위부서 직원까지 포함</label>
              
            </td>
          </tr>
        </table><!--"하위부서버튼테이블"-->
        
        <!-- 그리드테이블 -->
        <div class="grid_tbl">
          <table style="width:100%; height:320px;">
            <tr>
                  <td valign=top  style="width: 18%; text-align: left; height : 320px; border: 1px solid #acacac;" id="teamTree" >
                    <div id="listTeam" class="scrollable" style="height: 406px;"></div>                                   
                  </td>
              <td id="listGrid">
                <table id="tblInCorp"></table>
                <div id="pagingInCorp"></div>
              </td>
            </tr>
          </table>
        </div><!-- 그리드테이블 -->
        
        <table class="info_tbl_btn" style="width:100%; height: 25px;">
          <tr>
            <td style="text-align: right;">
              <button type="button" id="btnSelection" class="button">선택</button>
              <button type="button" id="btnUpdate"  class="button">저장</button>
              
            </td>
          </tr>
        </table>
        
        <input type="hidden" id="adminAgencyMobile" value="" />
        <input type="hidden" id="adminAgencyUserId" value="" />
        <input type="hidden" id="adminAgencyDeptCd" value="" />
        <input type="hidden" id="txtAFFAIRS" value="" />
        
        <table class="profile_tbl">
			<colgroup>
				<col width="8%"/>
				<col width="17%"/>
				<col width="8%"/>
				<col width="17%"/>
				<col width="8%"/>
				<col width="42%"/>
				<%-- <col width="8%"/>
				<col width="17%"/> --%>
			</colgroup>
			        
            <tr>              
              <td class="line_c">전체부서명</td>
              <td class="line_b" colspan="3">
                    <input type="text" class="text_ol" id="txtFullDeptName" size="81" disabled/>
              </td>
              <td class="line_c">부서명</td>
              <td class="line_b" >
                <span id=""><input type="text" id="txtDeptName" size="42" class="text_ol" disabled></span>
              </td>
            </tr>
            
            <tr>
              <td class="line_c">성명</td>
              <td class="line_b">
                <span id=""><input type="text" class="text_ol" size="9.4" id="txtUsrName" disabled></span>
              </td>
              <td class="line_c">직급명</td>
              <td class="line_b">
                <span id=""><input type="text" class="text_ol" size="9.4" id="txtPositionName" disabled></span>
              </td>
              
              <td class="line_c" rowspan='6'>민원<br/>사무분장</td>
              <td class="line_b" rowspan='6'>
                <textarea class="area_ol" style="height:140px;" id="txtWorkName" readonly maxlength="90%"></textarea>
                <input type="hidden" class="area_ol" style="height:90%;" id="taTask" disabled maxlength="90%"/>
              </td>
            </tr>
            <tr>              
              <td class="line_c">직책명</td>
              <td class="line_b">
                <span id=""><input type="text" class="text_ol" size="9.4" id="txtJobPositionName" disabled></span>
              </td>
              <td class="line_c">임시조직</td>
              <td class="line_b">
                <span id=""><input type="text" id="txtTempDeptName" size="42" class="text_ol" disabled></span>
              </td>
            </tr>
            
            <tr>   
              <td class="line_c">전화번호</td>
              <td class="line_b">
                <span id=""><input type="text" class="text_ol" id="txtTelNo" size="81" disabled></span>
                 <%-- <img id="imgPhoneNum" src="<c:url value='/resources/images/btn_cphone.gif'/>" alt="전화기" class="icon_cal2" style="cursor:pointer;"/> --%>   
              </td>
              <td class="line_c">팩스번호</td>
              <td class="line_b">
                <span id=""><input type="text" class="text_ol" id="txtFaxNo" size="42" disabled></span>
              </td>
            </tr>
            <tr>              
              <td class="line_c">서무구분</td>
              <td class="line_b">
                <span id=""><input type="checkbox" class="checkbox" style="top:4px;" id="chkAffair" disabled>서무</span>
                <button type="button" id="btnReqDB" class="button">DB요청</button>
                <span id="mobile"></span>
              </td>
              <td class="line_c">근무형태</td>
              <td class="line_b">
                <span id=""><input type="text" class="text_ol" id="txtWorkType" size="42" disabled></span>
              </td>
            </tr>
           <!--              
            <tr>
              <td class="line_c">민원<br/>사무분장</td>
              <td class="line_b" colspan='3'>
                <span id=""><textarea class="area_ol" style="height:100px;" id="txtWorkName" readonly maxlength="90%"></textarea></span>
              </td>
              <td class="line_c">추가업무명<br/>(콜센터)</td>
              <td class="line_b" colspan='3'>
                
              </td>
            </tr>
             -->
            <tr>
              <td class="line_c">적용일자</td>
              <td class="line_b">
                <span id="txtApplyDt"></span>
              </td>
              <td class="line_c">적용시간</td>
              <td class="line_b">
                <span id="txtApplyTm"></span>
              </td>
            </tr>
            <tr>
              <td class="line_c">수정자</td>
              <td class="line_b">
                <span id="txtModName"></span>
              </td>
              <td class="line_c">수정일시</td>
              <td class="line_b">
                <span id="txtModDtm"></span>
              </td>
            </tr>                     
        </table>