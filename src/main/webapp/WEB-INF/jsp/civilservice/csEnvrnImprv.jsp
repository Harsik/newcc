<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="<c:url value='/resources/js/civilservice/csEnvrnImprv.js'/>"></script> 
    
<div id="csEnvrnImprv_table">
	
	<div>
	    <div id="search">
	    	<table class="search_tbl">
	        	<tr>
	              	<th>차량번호</th>              
	              	<td style="width: 100px;">
	              <input type="text" id="csEnvrnImprv_tfSrchCarNumb" class="text_ol" style="width: 150px;">
              </td>
					<td class="btn">
						<button type="button" id="csEnvrnImprv_btnSearch" class="button">조회</button>
						<button type="button" id="csEnvrnImprv_btnInit" class="button">초기화</button>
					</td>
				</tr> 
	      </table>
		</div>
		
		<!-- 합계 탭 -->
		<div id="csEnvrnImprv_summ">
	    	<table class="profile_tbl" style="width: 90%;">
				<tr>
					<td><input type="checkbox" id="csEnvrnImprv_chk_junggi"></td>
					<th class="line_thb">정기금액</th>								
					<td class="line_b"><label id="csEnvrnImprv_summ_junggi"></label></td>
					
					<td><input type="checkbox" id="csEnvrnImprv_chk_chenap"></td>
					<th class="line_thb">체납금액</th>								
					<td class="line_b" ><label id="csEnvrnImprv_summ_chenap"></label></td>
					
					<th class="line_thb">합계금액</th>								
					<td class="line_b"><label id="csEnvrnImprv_summ_totMney"></label></td>
					
					<td class="btn"><button type="button" id="csEnvrnImprv_btnSMS" class="button" style="margin-left: 35px;width: 70px; visibility: hidden;">문자발송</button></td>
				</tr>
	      	</table>
		</div>
		<br/>
		
		<table style="width: 100%; height: 318px;">
			<tr>
				<td>
					<table id="csEnvrnImprv_tblCsEnvrnImprvList"></table>
					<div id="csEnvrnImprv_pagingCsEnvrnImprvList"></div>
				</td>
			</tr>
		</table>
		<!--"그리드테이블"-->
	
		<br/>
		<table class="info_tbl_btn">
			<tr>
				<td style="text-align: left;">
					<div class="stitle" style="display: ruby-base;">상세내역조회</div>
					( 성명/상호 : <label id="csEnvrnImprv_cnNm"></label> )
				</td>
				<td>
<!-- 					<button type="button" id="csEnvrnImprv_BtnSmsSend" class="button">문자발송</button> -->
					<button type="button" id="csEnvrnImprv_BtnHistory" class="button">민원인 조회이력</button>
					<form id="csEnvrnImprv_lcTXform" name="csEnvrnImprv_lcTXform" method="post">
			            <input type="hidden" id="tckt_id" name="tckt_id" class="text_ol">
			            <input type="hidden" id="tntr_id" name="tntr_id" class="text_ol">
					</form>
					<!-- sms -->
					<form id="csEnvrnImprv_Smsform" name="csEnvrnImprv_Smsform" method="post">
						<input type="hidden" id="csEnvrnImprv_custName" name="custName" class="text_ol">
						<input type="hidden" id="csEnvrnImprv_totMney" name="totMney" class="text_ol">
						<input type="hidden" id="csEnvrnImprv_account" name="account1" class="text_ol">
					</form>
				</td>
			</tr>
		</table>
		<br/>
	 
		<table class="profile_tbl" id="csEnvrnImprv_tbl">
			<colgroup>
				<col width="80px">
				<col width="100px">
				<col width="80px">
				<col width="90px">
				<col width="80px">
				<col width="100px">
				<col width="80px">
				<col width="110px">
			</colgroup>
			<tbody>
				<tr>
					<th class="line_thb">전화번호</th>								
					<td class="line_b" style="width: 200px;"><label id="csEnvrnImprv_telNo"></label></td>
					<th class="line_thb">휴대전화번호</th>								
					<td class="line_b" ><label id="csEnvrnImprv_hpNo"></label></td>
					<th class="line_thb">납부자주소</th>								
					<td class="line_b" colspan="3"><label id="csEnvrnImprv_ownrAddr"></label></td>
				</tr>
				<tr>
					<th class="line_thb">차랑(시설물)번호</th>								
					<td class="line_b" ><label id="csEnvrnImprv_beaMneyNo"></label></td>
					<th class="line_thb">배기량(용수량)</th>								
					<td class="line_b" ><label id="csEnvrnImprv_exhQua"></label></td>
					<th class="line_thb">소재지주소</th>								
					<td class="line_b" colspan="3"><label id="csEnvrnImprv_useAddr"></label></td>
				</tr>
				<tr>
					<th class="line_thb">차량명(상호)</th>								
					<td class="line_b" ><label id="csEnvrnImprv_cnm"></label></td>
					<th class="line_thb">차종(총면적)</th>								
					<td class="line_b" ><label id="csEnvrnImprv_mtrVehSort"></label></td>
					<th class="line_thb">차대번호(연료량)</th>								
					<td class="line_b" ><label id="csEnvrnImprv_engnNo"></label></td>
					<th class="line_thb">적용기간(적용일수)</th>								
					<td class="line_b" ><label id="csEnvrnImprv_useDate"></label></td>
				</tr>
				<tr>
					<th class="line_thb">세목</th>								
					<td class="line_b" ><label id="csEnvrnImprv_taxCode"></label></td>
					<th class="line_thb">고지차수</th>								
					<td class="line_b" ><label id="csEnvrnImprv_ancChasu"></label></td>
					<th class="line_thb">고지구분</th>								
					<td class="line_b" ><label id="csEnvrnImprv_lvyGbn"></label></td>
					<th class="line_thb">고지금액</th>								
					<td class="line_b" ><label id="csEnvrnImprv_lvyMney"></label></td>
				</tr>
				<tr>
					<th class="line_thb">부과징수결의일</th>								
					<td class="line_b" ><label id="csEnvrnImprv_lvyYmd"></label></td>
					<th class="line_thb">접수일자</th>								
					<td class="line_b" ><label id="csEnvrnImprv_takeYmd"></label></td>
					<th class="line_thb">납기내일자</th>								
					<td class="line_b" ><label id="csEnvrnImprv_pymntDlnYmd"></label></td>
					<th class="line_thb">가산금</th>								
					<td class="line_b" ><label id="csEnvrnImprv_hadMney"></label></td>
				</tr>
				<tr>
					<th class="line_thb">전자납부번호</th>								
					<td class="line_b" ><label id="csEnvrnImprv_elecNo"></label></td>
					<th class="line_thb">수납일자</th>								
					<td class="line_b" ><label id="csEnvrnImprv_recptYmd"></label></td>
					<th class="line_thb">납기후일자</th>								
					<td class="line_b" ><label id="csEnvrnImprv_dlvdtYmd"></label></td>
					<th class="line_thb">납기후금액</th>								
					<td class="line_b" ><label id="csEnvrnImprv_dlvdtAmt"></label></td>
				</tr>
				<tr>
					<th class="line_thb">가상계좌번호</th>								
					<td class="line_b" ><label id="csEnvrnImprv_accNo"></label></td>
					<th class="line_thb">기존체납금</th>								
					<td class="line_b" ><label id="csEnvrnImprv_totalChenap"></label></td>
					<th class="line_thb">송달번지주소</th>								
					<td class="line_b" colspan="3"><label id="csEnvrnImprv_sondBunji"></label></td>
				</tr>
				<tr>
					<th class="line_thb">압류여부</th>								
					<td class="line_b" ><label id="csEnvrnImprv_atmtYn"></label></td>
					<th class="line_thb">송달구분</th>								
					<td class="line_b" ><label id="csEnvrnImprv_sondGbn"></label></td>
					<th class="line_thb">송달도로명주소</th>								
					<td class="line_b" colspan="3"><label id="csEnvrnImprv_sondRoad"></label></td>
				</tr>
			</tbody>
		</table>	
	</div>
</div>