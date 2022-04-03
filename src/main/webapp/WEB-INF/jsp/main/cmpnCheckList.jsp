<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="<c:url value='/resources/js/main/cmpnCheckList.js'/>"></script>
<div>
  <table summary="해피콜검색" id="cmpntable" style="background-color: #e5e5e5; border: 1px solid #c5c5c5; width: 100%; height: 45px; margin-bottom: 10px;"><!--  margin-bottom: 20px;-->
    <tr>
      <th scope="row" width="9%">해피콜기간</th>
      <td width="30%" style="text-align: left;">
        <input type="text" style="width: 80px;" class="text_ol_half" id="selCmpnFrDate" maxlength="16" alt="시작날짜" title="시작날짜">
         ~
        <input type="text" style="width: 80px;" class="text_ol_half" id="selCmpnToDate" maxlength="16" alt="종료날짜" title="종료날짜">   
      </td>
      <th scope="row" width="8%">해피콜명</th>
      <td class="nemo_50" style="" colspan="2">
        <input type="text" class="text_ol" id="cmpgNm" name="cmpgNm" maxlength="167" alt="해피콜명" title="해피콜명">
      </td>
      <th scope="row" width="7%">상담사</th>
      <td class="sel">
        <select class="select_al" id="selAgent" title="상담사">
        </select>
      </td>
      <td class="btn">
         <button type="button" id="btnCmpnTabSearch"  class="button">조회</button>
         <button type="button" id="btnCmpnTabReset"  class="button">초기화</button>
      </td> 
    </tr>
  </table>
  
  <div style="width: 100%;">        
    <table id="tbl010"></table>
    <div id="pg010"></div>
  </div>
  
  <div class="grid_all" style="width:50%; float:left;">
  <!-- 미사용/버튼 테이블 -->
    <table class="info_tbl">
      <tr>
        <td style="float: left;">
         <div class="stitle">처리결과</div>
         <select id="selProcSt" style="width: 90px; margin-bottom: 5px;" title="처리결과">
         </select>         
        </td>
      </tr>
    </table>
    <!-- <span style="clear: both">&nbsp;</span> -->
    <!-- "미사용/버튼 테이블" -->
    <!-- 그리드테이블 -->
		<div class="grid_tbl" style="margin-bottom: 10px;">
		  <table id="cmpgtbl012"></table>
		    <div id="cmpgpg012"></div>
		</div>
    <!-- "그리드테이블" -->

	  <div id="cmpgCustInfo1">
	     <table summary="고객목록" class="profile_tbl" >
	       <tr>
	         <th scope="row" style="width: 11%;" class="line_rt">고객명</th>
	           <td style="width: 13%;" class="line_b">
	           <span id="cmpgCustom6"></span>
	         </td>
	         <th scope="row" style="width: 10%;" class="line_c">전화1</th>
	         <td style="width: 30%;" class="line_b">
	           <span id="cmpgTel6"></span>
	         </td>
	         <th scope="row" style="width: 11%;" class="line_c">전화2</th>
	         <td style="width: 30%;" class="line_b">
	           <span id="cmpgHtel6"></span>
	         </td>
	       </tr>
	     </table>
	     <div class="btn" id="cmpgCustInfoBtn1" style = "float : right; margin-top: 5px; display: block;">
	       <button type="button" id="cmpgCustBtnInit" class="button">초기화</button>
	     </div>
	  </div>    
    
  </div>

  <div class="grid_all" style="width:49%; float:right;">
    <table class="info_tbl">
      <tr>
        <td style="float: left;">
         <div class="stitle">해피콜 설문지</div>
        </td>
		    <td>
			    <div style="float: right;">
			      <button type="button" id="btnScript" class="button" style="float: right; margin-bottom: 5px;">스크립트 보기</button>
			    </div>        
		    </td>    
      </tr>
    </table>    

    <table summary="해피콜설문지" class="profile_tbl">
      <tr>
        <th scope="row" class="line_rt">해피콜</th>
      </tr>
        <tr>
        <td class="line_b">
          <div id="custQa" style = "height :380px; overflow:auto;">
          </div>
        </td>
      </tr>
    </table>
    
		<div>
		  <table summary="해피콜상세" class="profile_tbl" style =" width:100%;" id="resultCmpg">
		     <tr>
		     <th scope="row" class="line_rt">남여구분</th>
		     <td class="line_b">
		       <label for="male">남</label><input type="radio" name="radioGndr" value="1" id="male">
		       <label for="female">여</label><input type="radio" name="radioGndr" value="2" id="female">
		      </td>
		     <th scope="row" class="line_c">수신동의</th>
		     <td class="line_b">
		       <label for="telyn">전화</label><input type="checkbox" name="telyn" id="telyn">
		       <label for="smsyn">SMS</label><input type="checkbox" name="smsyn" id="smsyn">
		      </td>
		     </tr>
		     <tr>
		       <th scope="row" class="line_rt">처리결과</th>
		       <td class="line_b">
		         <select id = "result" class="select_al" title="처리결과">
		         </select>
		       </td>
		       <th scope="row" class="line_c">불응답 사유</th>
		       <td class="line_b">
		         <select id = "unresponsiveness" class="select_al" title="불응답사유" >
		         </select>
		       </td>
		     </tr>
		     <tr>
		       <th scope="row" class="line_rt" style =" height : 43px;">메모</th>
		       <td class="line_b" colspan ="3">
		         <textarea rows="2" cols="100%" style = "width: 100%" id="cmpgMemo" maxlength="240" title="메모"></textarea>                  
		       </td>
		     </tr>
		  </table>
		 
		  <div class="btn" style = "float : right; margin-top: 5px;">
		      <button type="button" id="btnCmpnTabInsert" class="button">저장</button>
		  </div>
		</div>    
    
  </div>      
    

     

                 
</div>