<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="<c:url value='/resources/js/civilservice/cswDbManage_chargerAppn.js'/>"></script>
<style>
/* 	 .ui-autocomplete {
    max-height: 170px;
    overflow-y: auto;
    overflow-x: hidden;
  }  */
  
html .ui-autocomplete {
    height: 100px;
        overflow-y: auto;
    overflow-x: hidden;
  } 
  </style>
  
<input type="hidden" id="csdbch_deptJobChargerVal" value="">
<input type="hidden" id="csdbch_DepttblReqid" value="">
	
	<!-- 상단검색  -->
	<div id="search">
	
        <table class="search_tbl">
        <colgroup>
        	<col style="width:2%">
        	<col style="width:3%">
        	<col style="width:2%">
        	<col style="width:3%">
        	<col style="width:2%">
        	<col style="width:3%">
        	<col style="width:2%">
        	<col style="width:3%">
        	<col style="width:20%">
        </colgroup>
          <tr>
             	<%--<th style="width: 60px;">요청일자</th>
		      	<td colspan="2">
		        <input type="text" class="text_Date" id="csdbch_deptSrchSelFrDate" maxlength="10"> ~ <input type="text" class="text_Date" id="csdbch_deptSrchSelToDate" maxlength="10" >  
		      	</td>--%>
		        
		        <th>요청구분</th>
		        <td><select id="csdbch_deptSrchRequstSe" class="select_bl"></select></td>
		
		      	<th>DB구분</th>
		        <td><select id="csdbch_deptSrchDbSe" class="select_bl"></select></td>
		
		        <th>처리상태</th>
		        <td>
		        	<select id="csdbch_deptSrchProgrsSttus" class="select_bl"></select>
		        </td>
		        					
				<td style="width:20px;vertical-align:top;text-align:right;">
					<input class="checkbox" id="csdbch_ALLDept" type="checkbox" style="display:none;">
				</td>
				<th style="text-align:left;" id="csdbch_ALLDept_th"></th>	
				
		        <td>
		        <div class="btn" style="display: inline-block; float: right;">
		           	<button id="csdbch_deptSrchSearch" class="button">조회</button>
		           	<button id="csdbch_deptSrchInit" class="button">초기화</button>
		       	</div>
        		</td>
          </tr> 
        </table>
      </div><!--"조회/검색"--> 

  <!-- 그리드 -->
    <div style="margin-bottom: 15px; clear: both;">
      <table id="csdbch_tblDeptRceptList"></table>
      <div id="csdbch_pgDeptRceptList"></div>
    </div>		
    
  <!-- 하단 상세 내역 -->
  <div id="csdbch_deptJobChargerAppn">
    <div class="stitle">업무담당자 지정</div>
    <button type="button" id="csdbch_deptJobBtnRequstHis" class="button" style="margin-bottom: 4px; float: right;">이력보기</button>
    
  	  <!-- 버튼 -->
    
    <table class="profile_tbl">
       <colgroup>
        <col width="8.6%"/>
        <col width="20.6%"/>
        <col width="1%"/>
        <col width="8.6%"/>
        <col width="8.6%"/>
        <col width="23.3%"/>
        <col width="8.6%"/>
        <col width="23.3%"/>
      </colgroup> 
      <tr>
        <th class="line_rt">처리상태</th>
        <td  class="line_b" colspan="7">
        <div id="csdbch_progressbar">
        <div class="progress-label" style="left:12%;">부서접수</div>
        <div class="progress-label" style="left:32%;">담당자지정 </div>
        <div class="progress-label" style="left:59%;">처리중</div>
        <div class="progress-label" style="left:82%;">완료/반송</div>
        </div>
        </td>
     
      </tr>
      <tr>
        <th class="line_rt">요청구분</th>
        <td style="width: 400px;" id="csdbch_deptJobRequstSe" class="line_b" colspan="3"></td>
        
        <th class="line_c">DB구분</th>
        <td  class="line_b"><select id="csdbch_deptJobDbSe" class="select_bl" disabled="disabled" style="width: 40%"></select></td>						
        
        <th class="line_c">요청자</th>
        <td id="csdbch_deptJobRqester"  class="line_b"></td>						
      </tr>
      
      <tr>
        <th class="line_rt">상담유형</th>
        <td colspan="7" id="csdbch_deptJobCnsltTy"  class="line_b"></td>
      </tr>
       <tr>
        <th class="line_rt">제목</th>
        <td colspan="7" id="csdbch_deptJobCnsltTy2"  class="line_b"></td>
      </tr>
      <tr>
        <th class="line_rt" style="height: 90px;">요청내용</th>
        <td colspan="7" class="line_b" >
        <!-- <div  id="csdbch_deptJobCtns"  style="height: 80px; width:99%; padding:5px; overflow-y:scroll; background-color:rgba(239, 239, 239, 1); border: 1px solid rgba(186, 185, 185, 1);"></div> -->
        <div id="csdbch_deptJobCtns" style="height: 80px; width:99%; padding:5px;"></div>
        </td>
      </tr>
     
      <tr style="display:none;">
        <th class="line_rt">처리상태</th>
        <td  class="line_b" colspan="7">
          <input type="radio" class="radio" name="VDeptradio" id="csdbch_VDeptJobRcept" value="010100" style="width:12px;">부서접수
          <input type="radio" class="radio" name="VDeptradio" id="csdbch_VDeptJobChrgAppn" value="010200" style="width:12px;">담당자지정
          <input type="radio" class="radio" name="VDeptradio" id="csdbch_VChrgReassignment" value="010400" style="width:12px;">담당자(재)지정요청
          <input type="radio" class="radio" name="VDeptradio" id="csdbch_VDeptJobProcess" value="020100" style="width:12px;">담당자처리중
          <input type="radio" class="radio" name="VDeptradio" id="csdbch_VDeptJobCompt" value="030100" style="width:12px;">처리완료
          <input type="radio" class="radio" name="VDeptradio" id="csdbch_VDeptJobRetrn" value="020200" style="width:12px;">반송
        </td>
     
      </tr>
      <tr>
        <th class="line_rt">담당부서</th>
        <td style="width: 500px;" id="csdbch_deptJobChrg"  class="line_b" colspan="3"></td>
		<th class="line_c">서무</th>
        <td colspan="1"  class="line_b" style="width: 100%" id="csdbch_grfrsPrson"></td>
        <th class="line_c">담당자</th>
        <td colspan="1"  class="line_b" style="width: 100%" id="csdbch_grfrsPrson2"></td>
      </tr>      
      
      <tr>
        <th class="line_rt">담당자지정</th>
        <td colspan="7" class="line_b">
        <input type="hidden" id="csdbch_deptJobChargerCheck" class="text_ol" disabled="disabled" style="color:#5D5D5D; text-align: center; font-weight:bold; width: 12%;">
        <input  id="csdbch_deptJobCharger" class="text_ol"  style="width: 38%;" placeholder="담당자를 지정해주세요." >
        <button type="button" id="csdbch_deptJobBtnInsert" class="button" style="margin-left: 20px;">담당자지정</button>
        <button type="button" id="csdbch_deptJobBtnInsertRtn" class="button">반송</button>
        </td>
      </tr>
      
       <tr>
        <th class="line_rt" id="csdbch_HDeptJobPrvonsh">처리내용</th>
<!--         <td colspan="7" id="csdbch_deptJobPrvonsh" style="height: 40px;" class="line_b" style="display: none;"></td> -->
<!--         <td colspan="7" id="csdbch_deptJobProcessCtns" style="height: 40px;"  class="line_b"></td> -->
		<td colspan="7" class="line_b">
			<textarea id="csdbch_deptJobPrvonsh" class="text_ol" style="height: 55px; display: none;" onfocus="this.blur()" readonly></textarea>
			<textarea id="csdbch_deptJobProcessCtns" class="text_ol" style="height: 55px;" onfocus="this.blur()" readonly></textarea>
		</td>
      </tr>
       
      <tr id="csdbch_filedisplay">
        <th class="line_rt">첨부파일</th>
        <td colspan="7" style="height: 59px;" class="line_b" valign="middle">
        <table id="csdbch_deptJobAtchFile" style="width: 50%; margin: -5px 0;"></table>
        </td>
      </tr>
      
    </table>
  </div>

 