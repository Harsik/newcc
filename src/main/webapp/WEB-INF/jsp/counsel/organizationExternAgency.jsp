<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!-- 조회/검색 -->
<div id="search" style="margin-bottom:10px;">
	<table class="search_tbl">
		<tr>
			<th style="width: 150px;">
     			<input type="radio" class="radio" name="rdSearchGb" id="rdSearchGb_ec" value="INST_NM">회사/기관명 
     			<input type="radio" class="radio" name="rdSearchGb" id="rdSearchGb_en" value="RSPN_PRSN">성명
			</th>
			<td class="nemo_30">
				<input type="text" id="tfSrchExtrnVal" class="text_ol" style="width: 200px;"> &nbsp;<input class="checkbox" id="selUseYn" type="checkbox"><b>미사용</b>
				<!-- <select id="selUseYn" class="select_bl" style="width: 60px;"></select> -->
				
     	</td>
     	<td class="btn">
         	<button type="button" id="btnExternSearch" class="button">조회</button>
         	<button type="button" id="btnExternExcelA" class="button">엑셀저장</button>
         	<button type="button" id="btnExternInit" class="button">초기화</button>
    	</td>
   	</tr>
	</table>
</div>
<!--"조회/검색"-->   
      
<div class="stitle" style="margin-left: 0px;">전화걸기</div><br/>
<div id="search" style="margin-bottom: 10px;">
	<table class="search_tbl">
		<tr>
			<th><label>전화번호</label></th>
			<td class="nemo_30">
				<input type="text" id="tfCallNum3" class="text_ol" maxlength="50">
			</td>
			<td class="btn">
				<button type="button" id="btnCall3" class="button">전화걸기</button>
			</td>
		</tr>
	</table>
</div>

<div id="code_admin_left" style="width:49%; display:inline-block;">
	<div class="stitle">외부기관명</div>
	<!-- 그리드테이블 -->
	<div class="grid_tbl" >
	    <table style="width: 100%; height: 318px;">
        <tr>
            <td id="listGrid">
                <table id="tblInExternAgeny"></table>
                <div id="pagingInExternAgeny"></div>
            </td>
        </tr>
	    </table>
	</div>
	<!--"그리드테이블"-->

	<!-- 버튼 테이블 -->
	<table class="info_tbl_btn" style="margin-top:5px;">
    <tr>
	    <th></th>
	       <td>
			     <button type="button" id="btnRelatedInsert" class="button">추가</button>
			     <button type="button" id="btnRelatedUpdate" class="button">수정</button>
			     <button type="button" id="btnRelatedReset" class="button">초기화</button>
	       </td>
    </tr>
	</table>
	<input type="hidden" id="extAgencyId" value="">
	<input type="hidden" id="extAgencyMobile" value="">
	<!--"버튼 테이블"-->
	<table class="profile_tbl" style="width: 100%;">
     <tr>
         <th class="line_rt" style="width: 7%;">기관명</th>
         <td class="line_b" colspan="2">
             <input type="text" class="text_ol" id="tfInst_nm" maxlength="20">
         </td>
         <th class="line_c" style="width: 7%;">URL</th>
         <td class="line_b" colspan="2">
             <input type="text" class="text_ol" id="tfInst_url" style="width: 85%" placeholder="'http://' 또는 'https://' 를 입력해주세요!"><button type="button" id="btn_url" class="button" style="margin-left: 6px;">열기</button>
         </td>         
     </tr>
     <tr>
         <th class="line_rt" rowspan="2" style="width: 7%;">주소</th>
         <td class="line_b" colspan="5">
           <input type="text" class="text_ol" id="tfRd_nm_addr1" style="width: 80%;" maxlength="20">
           <button type="button" id="btnZip" class="button">주소 검색</button>
         </td>
     </tr>
       <tr>
         <td class="line_b" colspan="5">
             <input type="text" class="text_ol" id="tfRd_nm_addr2" maxlength="20">
         </td>
     </tr>
     <tr>
         <th class="line_rt" style="width: 7%;">메모</th>
         <td class="line_b" colspan="5">
             <textarea class="area_ol" style="height:100px;" id="tfMemo" maxlength="90%"></textarea>
         </td>
     </tr>
     <tr>
       <th class="line_rt" style="width: 7%;">사용여부</th>
       <td class="line_b" colspan="2">
           <select id="tfUSE_YN">
              <option value="Y">사용</option>
              <option value="N">미사용</option>
           </select>
       </td>
     <th class="line_c" style="width: 5%;"><!-- 외부기관 홈페이지 --></th>
       <td class="line_b" colspan="2">
             <!-- <input type="text" class="text_ol" id="tfInst_Url" maxlength="20">  -->
       </td>      
     </tr>     
     <tr>
         <th class="line_rt" style="width: 7%;">등록</th>
         <td class="line_b" colspan="2">
         	  <span id="crt_dt"></span>
         </td>
         <th class="line_c" style="width: 7%;">수정</th>
         <td class="line_b" colspan="2">
         	  <span id="mod_dt"></span>
         </td>
     </tr>
	</table>
</div>

<div id="code_admin_right"  style="width: 49%; display:inline-block;">
    <div class="stitle">유관기관 담당자</div>
    <!-- 그리드테이블 -->
    <div class="grid_tbl" >
        <table style="width: 100%; height: 318px;">
           <tr>
              <td id="listGrid">
                 <table id="tblInExternAgenyCode"></table>
              </td>
           </tr>
        </table>
    </div>
    <!--"그리드테이블"-->
            
    <!-- 버튼 테이블 -->
    <table class="info_tbl_btn">
       <tr>
	        <th></th>
          <td>           
	          <button type="button" id="btnExternSelection" class="button">선택</button>
		        <button type="button" id="btnuInsert" class="button">추가</button>
		        <button type="button" id="btnuUpdate" class="button">수정</button>
		        <button type="button" id="btnuReset" class="button">초기화</button>
          </td>
       </tr>
    </table>
    <!--"버튼 테이블"-->
            
    <table class="profile_tbl" style="width: 100%; margin-top: 20px;">
       <tr>
           <td class="line_rt">부서명</td>
           <td class="line_b">
               <input type="text" class="text_ol" id="udept_nm" maxlength="20">
               <input type="hidden" class="text_ol" id="hid_udept_id" maxlength="20">
           </td>
           <td class="line_c">담당자</td>
           <td class="line_b">
               <input type="text" class="text_ol" id="urspn_prsn" maxlength="20">
               <input type="hidden" class="text_ol" id="hid_urspn_id" maxlength="20">
           </td>
       </tr>
       <tr>
           <td class="line_rt" rowspan="1">전화번호</td>
           <td class="line_b" style="width:30%;">
               <div id="career">
                  <div>
                   <select id="selectTel1"  style="width:30%;"></select>
                   <input type="text" id="tfTelNo1" name="tfTelNo1" size="50" style="width:40%;" class="text_ol" maxlength="13">
                   <button type="button" id="btnaddCompany" class="button">추가</button>
                  </div>
                  <div id="devlNo2" style="display: none;">
                   <select name="selectTel2" id="selectTel2" style="width: 30%;">
                      <option value="all">전체</option>
                      <option value="11000">전화</option>
                      <option value="11001">집전화</option>
                      <option value="11002">사무실전화</option>
                      <option value="11003">휴대전화</option>
                    </select>
                     <input name="tfTelNo2" id="tfTelNo2" style="width: 114px;" type="text" size="50"  class="text_ol" maxlength="13">
                     <input class="button" type="button" value="삭제" id="delTel2">
                  </div>

                  <div id="devlNo3"  style="display: none;">
                     <select name="selectTel3" id="selectTel3" style="width: 30%;">
                      <option value="all">전체</option>
                      <option value="11000">전화</option>
                      <option value="11001">집전화</option>
                      <option value="11002">사무실전화</option>
                      <option value="11003">휴대전화</option>
                     </select>
                     <input name="tfTelNo3" id="tfTelNo3" style="width: 114px;" type="text" size="50"  class="text_ol" maxlength="13">
                     <input class="button" type="button" value="삭제" id="delTel3">
                  </div>
               </div>&nbsp;&nbsp;&nbsp;&nbsp;<br />
           </td>
           <td class="line_c" rowspan="1">업무명</td>
           <td class="line_b">
              <textarea class="area_ol" style="height:100px;" id="ujob_nm" maxlength="90%"></textarea>
              <!-- <textarea class="area_ol" colspan="1" style="height:100px;" id="ujob_nm" maxlength="90%"></textarea> -->
           </td>
       </tr>
       <!-- 전화번호  -->
       <tr>
           <td class="line_rt">이메일</td>
           <td class="line_b">
               <input type="text" class="text_ol" id="ueml_adr" maxlength="20">
           </td>
           <td class="line_c">팩스번호</td>
           <td class="line_b">
               <input type="text" class="text_ol" id="ufax_no" maxlength="13">
           </td>
       </tr>
       <tr>
           <td class="line_rt">메모</td>
           <td class="line_b" colspan="3">
               <input type="text" class="text_ol" id="umemo" maxlength="20">
           </td>
       </tr>
       <tr>
           <td class="line_rt">사용여부</td>
           <td class="line_b">
               <select id="uuse_yn">
                  <option value="Y">사용</option>
                  <option value="N">미사용</option>
               </select>
           </td>
           <td class="line_c"></td>
           <td class="line_b"></td>
       </tr>       
       <tr>
           <td class="line_rt">등록</td>
           <td class="line_b" >
                <!-- <div class="text_ol" id="ucrt_dt"></div> -->
                <span id="ucrt_dt"></span>
           </td>
           <td class="line_c">수정</td>
           <td class="line_b">
                <!-- <div class="text_ol" id="umod_dt"></div> -->
                <span id="umod_dt"></span>
           </td>
       </tr>
   </table>
</div>