<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="<c:url value='/resources/js/civilservice/csLocalTax.js'/>"></script> 
    
<div id="csLocaltax_table">
	
	<div>
	    <div id="search">
	    	<table class="search_tbl">
	        	<tr>
					<th>부과일자</th>              
	              	<td style="width: 250px;">
		                <input type="text" class="text_Date" id="csLocaltax_tfSrchFrDate" maxlength="10"> ~ 
		                <input type="text" class="text_Date" id="csLocaltax_tfSrchToDate" maxlength="10" > 
	              	</td>
					<td class="btn">
						<button type="button" id="csLocaltax_btnSearch" class="button">조회</button>
						<button type="button" id="csLocaltax_btnInit" class="button">초기화</button>
					</td>
				</tr> 
	      </table>
		</div>
		
		<!-- 합계 탭 -->
		<div id="csLocaltax_Summ">
	    	<table class="profile_tbl" style="width: 90%;">
				<tr>
					<td><input type="checkbox" id="csLocaltax_chk_junggi"></td>
					<th class="line_thb">정기금액</th>								
					<td class="line_b"><label id="csLocaltax_summ_junggi"></label></td>
					
					<td><input type="checkbox" id="csLocaltax_chk_chenap"></td>
					<th class="line_thb">체납금액</th>								
					<td class="line_b" ><label id="csLocaltax_summ_chenap"></label></td>
					
					<th class="line_thb">합계금액</th>								
					<td class="line_b"><label id="csLocaltax_summ_totMney"></label></td>
					
					<td class="btn"><button type="button" id="csLocaltax_btnSMS" class="button" style="margin-left: 35px; width: 70px; visibility: hidden;">문자발송</button></td>
				</tr>
	      	</table>
		</div>
		<br/>
		
		<table style="width: 100%; height: 318px;">
			<tr>
				<td>
					<table id="csLocaltax_tblCsLocalTaxList"></table>
					<div id="csLocaltax_pagingCsLocalTaxList"></div>
				</td>
			</tr>
		</table>
		<!--"그리드테이블"-->
	
		<br/>
		<table class="info_tbl_btn">
			<tr>
				<td style="text-align: left;">
					<div class="stitle" style="display: ruby-base;">상세내역조회</div>
					( 성명/상호 : <label id="csLocaltax_cnNm"></label> )
				</td>
				<td>
					<button type="button" id="csLocaltax_BtnHistory" class="button">민원인 조회이력</button>
					<form id="csLocaltax_lcTXform" name="csLocaltax_lcTXform" method="post">
			            <input type="hidden" id="tckt_id" name="tckt_id" class="text_ol">
			            <input type="hidden" id="tntr_id" name="tntr_id" class="text_ol">
					</form>
					<!-- sms -->
					<form id="csLocaltax_lcTXSmsform" name="csLocaltax_lcTXSmsform" method="post">
						<input type="hidden" id="csLocaltax_saemokNm" name="saemokNm" class="text_ol">
						<input type="hidden" id="csLocaltax_totMney" name="totMney" class="text_ol">
						<input type="hidden" id="csLocaltax_account" name="account1" class="text_ol">
					</form>
				</td>
			</tr>
		</table>
		<br/>
	 
		<table class="profile_tbl" id="csLocaltax_tbl">
			<colgroup>
				<col width="10%">
				<col width="15%">
				<col width="10%">
				<col width="10%">
				<col width="10%">
				<col width="10%">
				<col width="13%">
				<col width="20%">
			</colgroup>
			<tbody>
				<tr>
					<th class="line_thb">과세구분</th>								
					<td class="line_b" ><label id="csLocaltax_cnGawseGb"></label></td>
					<th class="line_thb">과세물건</th>								
					<td class="line_b" colspan="5"><label id="csLocaltax_cnGwaseObj"></label></td>
				</tr>
				<tr>
					<th class="line_thb">과세년월</th>								
					<td class="line_b" ><label id="csLocaltax_cnGwaseYMD"></label></td>
					<th class="line_thb">수납</th>								
					<td class="line_b" ><label id="csLocaltax_cnSunapYn"></label></td>
					<th class="line_thb">자동이체여부</th>								
					<td class="line_b" ><label id="csLocaltax_cnJadongYn"></label></td>
					<th class="line_thb">예금주명</th>								
					<td class="line_b" ><label id="csLocaltax_cnYegmjuNm"></label></td>
				</tr>
				<tr>
					<th class="line_thb">대표세목명</th>								
					<td class="line_b" ><label id="csLocaltax_cnSaemokNm"></label></td>
					<th class="line_thb">본세</th>								
					<td class="line_b" ><label id="csLocaltax_cnBonse"></label></td>
					<th class="line_thb">부과일자</th>								
					<td class="line_b" ><label id="csLocaltax_cnBugwaYMD"></label></td>
					<th class="line_thb">가상계좌번호1(은행)</th>								
					<td class="line_b" ><label id="csLocaltax_cnGaccountNumb1"></label></td>
				</tr>
				<tr>
					<th class="line_thb">전자납부번호</th>								
					<td class="line_b" ><label id="csLocaltax_cnENapbuNumb"></label></td>
					<th class="line_thb">가산금</th>								
					<td class="line_b" ><label id="csLocaltax_cnGasanPrice"></label></td>
					<th class="line_thb">최초납기일</th>								
					<td class="line_b" ><label id="csLocaltax_cnFirstNapYMD"></label></td>
					<th class="line_thb">가상계좌번호2(은행)</th>								
					<td class="line_b" ><label id="csLocaltax_cnGaccountNumb2"></label></td>
				</tr>
				<tr>
					<th class="line_thb">과세번호</th>								
					<td class="line_b" ><label id="csLocaltax_cnGawseNumb"></label></td>
					<th class="line_thb">미납액</th>								
					<td class="line_b" ><label id="csLocaltax_cnMenapPrice"></label></td>
					<th class="line_thb">변경납기일</th>								
					<td class="line_b" ><label id="csLocaltax_cnNapYMD"></label></td>
					<th class="line_thb">가상계좌번호3(은행)</th>								
					<td class="line_b" ><label id="csLocaltax_cnGaccountNumb3"></label></td>
				</tr>
				<tr>
					<th class="line_thb">체납여부</th>								
					<td class="line_b" ><label id="csLocaltax_cnChenapYN"></label></td>
					<th class="line_thb">결손여부</th>								
					<td class="line_b" ><label id="csLocaltax_cnGamExstYN"></label></td>
					<th class="line_thb">납부일</th>								
					<td class="line_b" ><label id="csLocaltax_cnNapbuYMD"></label></td>	
					<th class="line_thb">가상계좌번호4(은행)</th>								
					<td class="line_b" ><label id="csLocaltax_cnGaccountNumb4"></label></td>	
				</tr>
			</tbody>
		</table>	
	</div>
</div>