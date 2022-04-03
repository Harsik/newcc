<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="<c:url value='/resources/js/civilservice/cswDbManage_process.js'/>"></script>

	<input type="hidden" id="csdbpr_ChargerJobChargerVal">
	<input type="hidden" id="csdbpr_chargerTblReqid">
	<input type="hidden" id="csdbpr_chargerTblTbbsid"> <!-- hhs  -->
	<input type="hidden" id="csdbpr_sendPopupReq" value="">
	<input type="hidden" id="csdbpr_sendPopupIngStat" value="">
	<input type="hidden" id="csdbpr_sendPopupRequSe" value="">
	<input type="hidden" id="csdbpr_sendPopupChageRea" value="">
  <!-- 상단검색 -->
 <div id="search">
     <table class="search_tbl">
     
        <colgroup>
        	<col style="width:7%">
        	<col style="width:15%">
        	<col style="width:7%">
        	<col style="width:7%">
        	<col style="width:10%">
        	<col style="width:7%">
        	<col style="width:10%">
        	<col style="width:7%">
        	<col style="width:10%">
        	<col style="width:7%">
        	<col style="width:7%">
        	<col style="width:30%">
        </colgroup>
	    <tr>
	        <th>요청일자</th>
	      	<td colspan="2">
	        <input type="text" class="text_Date" id="csdbpr_chargerSrchSelFrDate" maxlength="10"> ~ <input type="text" class="text_Date" id="csdbpr_chargerSrchSelToDate" maxlength="10" >  
	      	</td>
	        
	        <th>요청구분</th>
	        <td><select id="csdbpr_chargerSrchRequstSe" class="select_bl"></select></td>
	
	      	<th>DB구분</th>
	        <td><select id="csdbpr_chargerSrchDbSe" class="select_bl"></select></td>
	
	        <th>처리상태</th>
	        <td>
			<select id="csdbpr_chargerSrchProgrsSttus" class="select_bl"></select>
	        </td>
	        					
			<td style="width:20px;vertical-align:top;text-align:right;">
			<input class="checkbox" id="csdbpr_ALLDept" type="checkbox" style="display:none;">
			</td>
			
			<th style="text-align:left;" id="csdbpr_ALLDept_th"></th>	
	        <td>
	        	<div class="btn" style="display: inline-block; float: right;">
	           		<button id="csdbpr_chargerSrchSearch"  class="button">조회</button>
	           		<button id="csdbpr_chargerSrchInit" class="button">초기화</button>
	           </div>
	        </td>
	    </tr>
  	</table>
 </div>

  <!-- 그리드 -->
    <div style="margin-bottom: 15px; clear: both;">
      <table id="csdbpr_tblChargerProcesstList"></table>
      <div id="csdbpr_pgChargerProcesstList"></div>
    </div>		
    
  <!-- 하단 상세 내역 -->
  <div id="csdbpr_chargerJobChargerAppn">
    
      <div class="stitle">업무담당자 지정</div>
      <button type="button" id="csdbpr_chargerJobBtnRequstHis" class="button" style="float:left; display: inline-block; margin-left: 1224px; margin-bottom:4px;">이력보기</button>
  	  <!-- 버튼 -->
    
    <table class="profile_tbl">
       <colgroup>
        <col width="8.3%"/>
        <col width="1%"/>
        <col width="1%"/>
        <col width="27%"/>
        <col width="8.3%"/>
        <col width="22.5%"/>
        <col width="8.3%"/>
        <col width="22.5%"/>
      </colgroup> 
      <tr>
        <th class="line_rt">처리상태</th>
        <td  class="line_b" colspan="7">
        <div id="csdpro_progressbar">
        <div class="progress-label" style="left:12%;">부서접수</div>
        <div class="progress-label" style="left:32%;">담당자지정</div>
        <div class="progress-label" style="left:59%;">처리중</div>
        <div class="progress-label" style="left:82%;">완료/반송</div>
        </div>
        </td>
     
      </tr>
      <tr>
        <th class="line_rt">요청구분</th>
        <td style="width: 400px;" id="csdbpr_chargerJobRequstSe" class="line_b"  colspan="3"></td>
        
        <th class="line_c">DB구분</th>
        <td class="line_b"><select id="csdbpr_chargerJobDbSe" class="select_bl" disabled="disabled" style="width: 40%"></select></td>						
        
        <th class="line_c">요청자</th>
        <td id="csdbpr_chargerJobRqester" class="line_b"></td>						
      </tr>
      <tr>
        <th class="line_rt">상담유형</th>
        <td colspan="7" id="csdbpr_chargerJobCnsltTy" class="line_b"></td>
      </tr>
            <tr>
        <th class="line_rt">제목</th>
        <td colspan="7" id="csdbpr_chargerJobCnsltTy2" class="line_b"></td>
      </tr>
      <tr>
        <th class="line_rt" style="height: 90px; ">요청내용</th>
        <td colspan="7" class="line_b">
        <!-- <div id="csdbpr_chargerJobCtns" style="height: 80px; background-color:rgba(239, 239, 239, 1);  width:99%; padding:5px; overflow-y:scroll; border: 1px solid rgba(186, 185, 185, 1);"></div> -->
        <div id="csdbpr_chargerJobCtns" style="height: 80px; width:99%; padding:5px;"></div> 
        </td>
      </tr>
      
       <tr style="display:none;">
        <th class="line_rt">처리상태</th>
        <td  class="line_b" colspan="7">
          <input type="radio" class="radio" name="Vchargerradio" id="csdbpr_VchargerJobRcept" value="010100" style="width:12px;">부서접수
          <input type="radio" class="radio" name="Vchargerradio" id="csdbpr_VchargerJobChrgAppn" value="010200" style="width:12px;">담당자지정
          <input type="radio" class="radio" name="Vchargerradio" id="csdbpr_VCchargerReassignment" value="010400" style="width:12px;">담당자(재)지정요청
          <input type="radio" class="radio" name="Vchargerradio" id="csdbpr_VDchargerJobProcess" value="020100" style="width:12px;">담당자처리중
          <input type="radio" class="radio" name="Vchargerradio" id="csdbpr_VchargerJobCompt" value="030100" style="width:12px;">처리완료
          <input type="radio" class="radio" name="Vchargerradio" id="csdbpr_VchargerJobRetrn" value="020200" style="width:12px;">반송
          <input type="radio" class="radio" name="Vchargerradio" id="csdbpr_VRequestReason" value="020300" style="width:12px;">재작성요청
       </td>
      </tr>
        
      <tr>
        <th class="line_rt">담당부서</th>
        <td style="width: 500px;" id="csdbpr_chargerJobChrg"  class="line_b" colspan="3"></td>
           <th class="line_c">서무</th>
        <td colspan="1"  class="line_b" style="width: 100%" id="csdbpr_pgrfrsPrson"></td>
        <th class="line_c">담당자</th>
        <td colspan="1"  class="line_b" style="width: 100%" id="csdbpr_pgrfrsPrson2"></td>
      </tr> 
      
      <tr>
        <th class="line_rt">처리상태변경</th>
        <td class="line_b"  colspan="3">
          <button type="button" id="csdbpr_chargerJobBtnRetrn" class="button">반송</button>
          <button type="button" id="csdbpr_chargerJobBtnDbNew" class="button" style="display: inline-block;">DB신규등록</button>
	 	  <button type="button" id="csdbpr_chargerJobBtnDbRegist" class="button" style="display: inline-block;">DB수정등록</button>
		  <button type="button" id="csdbpr_chargerJobBtnDbDelete" class="button" style="display: inline-block;">DB삭제처리</button>
		  <button type="button" id="csdbpr_chargerBtnDelete" class="button" style="display: inline-block;">삭제</button>
        
        <th class="line_c">반송사유</th>
        <td colspan="3" id="csdbpr_chargerJobPrvonsh" class="line_b"></td>
      </tr>

      <tr>
        <th class="line_rt">처리내용</th>
<!--         <td colspan="7" id="csdbpr_chargerJobProcessCtns" class="line_b"></td> -->
		<td colspan="7" class="line_b">
        <textarea id="csdbpr_chargerJobProcessCtns" class="text_ol" style="height: 55px;" onfocus="this.blur()" readonly></textarea>
      	</td>
      </tr>
      <tr style="display:none;" id="csdbpr_trReqRsn">
        <th class="line_rt">요청사유</th>
        <td colspan="7" id="csdbpr_tfReqRsn" style="color: red; font-weight: bold;" class="line_b"></td>
      </tr>
      
      <tr>
        <th class="line_rt">첨부파일</th>
        <td colspan="7" style="height: 59px;" class="line_b" valign="middle">
          <table id="csdbpr_chargerJobAtchFile" style="width: 50%; margin: -5px 0;"></table>
        </td>
      </tr>
    </table>
  </div>
