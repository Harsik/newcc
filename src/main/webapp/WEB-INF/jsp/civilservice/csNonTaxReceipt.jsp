<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="<c:url value='/resources/js/civilservice/csNonTaxReceipt.js'/>"></script>

<div id="csNonTaxRcpt_table">
        <!-- 조회/검색 -->
        <div id="search">
          <table class="search_tbl">
				<tr>
					<th style="width: 50px;">납부자명</th>
					<td style="width: 130px;">
						<input type="text" id="csNonTaxRcpt_arrTXtfSrchCitizenNM" class="text_ol" style="width: 120px;">
					</td>
					<th style="width: 100px;">부과일자</th>              
	              	<td style="width: 250px;">
		                <input type="text" class="text_Date" id="csNonTaxRcpt_arrTXtfSrchFrDate" maxlength="10"> ~ 
		                <input type="text" class="text_Date" id="csNonTaxRcpt_arrTXtfSrchToDate" maxlength="10" > 
	              	</td>
					<td class="btn">
						<button type="button" id="csNonTaxRcpt_arrTXbtnTaxSearch" class="button">조회</button>
						<button type="button" id="csNonTaxRcpt_arrTXbtnTaxInit" class="button">초기화</button>
					</td>
				</tr>
			</table>
        </div><!--"조회/검색"--> 
        
        <!-- sms -->
		<form id="csNonTaxRcpt_Smsform" name="csNonTaxRcpt_Smsform" method="post">
			<input type="hidden" id="csNonTaxRcpt_totMney" name="totMney" class="text_ol">
			<input type="hidden" id="csNonTaxRcpt_totCnt" name="totCnt" class="text_ol">
			<input type="hidden" id="csNonTaxRcpt_account" name="account1" class="text_ol">
			<input type="hidden" id="csNonTaxRcpt_custNm" name="custName" class="text_ol">
		</form>
		
		<!-- 합계 탭 -->
		<div id="csNonTaxRcpt_Summ">
	    	<table class="profile_tbl" style="width: 90%;">
				<tr>
					<td><input type="checkbox" id="csNonTaxRcpt_chk_junggi"></td>
					<th class="line_thb">미납금액</th>								
					<td class="line_b"><label id="csNonTaxRcpt_summ_junggi"></label></td>
					
					<td><input type="checkbox" id="csNonTaxRcpt_chk_chenap"></td>
					<th class="line_thb">체납금액</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_summ_chenap"></label></td>
					
					<th class="line_thb">합계금액</th>								
					<td class="line_b"><label id="csNonTaxRcpt_summ_totMney"></label></td>
					
					<td class="btn"><button type="button" id="csNonTaxRcpt_btnSMS" class="button" style="margin-left: 35px;width: 70px; visibility: hidden;">문자발송</button></td>
				</tr>
	      	</table>
		</div>
		<br/>
       						
		<!-- 체납 그리드테이블 -->
		<table style="width: 100%; height: 318px; background-image: url('./img/sam.gif');">
			<tr>
				<td>
					<table id="csNonTaxRcpt_arrTXtblList"></table>
					<div id="csNonTaxRcpt_arrTXpagingList"></div>
				</td>
			</tr>
		</table>
		<!--체납 그리드테이블 끝-->	
		
		<br/>
		<table class="info_tbl_btn">
			<tr>
				<td style="text-align: left;">
					<div class="stitle" style="display: ruby-base;">상세내역조회</div>
				</td>
				<td>
					<button type="button" id="csNonTaxRcpt_arrTXBtnHistory" class="button">민원인 조회이력</button>
					<form id="csNonTaxRcpt_arrTXform" name="csNonTaxRcpt_arrTXform" method="post">
			            <input type="hidden" id="tckt_id" name="tckt_id" class="text_ol">
			            <input type="hidden" id="tntr_id" name="tntr_id" class="text_ol">
					</form>
				</td>
			</tr>
		</table>
		<br/>
		
		<table class="profile_tbl" id="csNonTaxRcpt_arrTXtbl">
			<colgroup>
				<col width="10%"/>
				<col width="20%"/>
				<col width="15%"/>
				<col width="20%"/>
				<col width="15%"/>
				<col width="20%"/>
			</colgroup>
			<tbody>
				<tr>
					<th class="line_thb">세목명</th>								
					<td class="line_b"><label id="csNonTaxRcpt_arrTXsemokNm"></label></td>
					<th class="line_thb">납부자명</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_arrTXperNm"></label></td>
					<th class="line_thb">전자납부번호</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_arrTXercNo"></label></td>
				</tr>
				
				<tr>
					<th class="line_thb">부과구분</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_arrTXlvyNm"></label></td>
					<th class="line_thb">수납구분</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_arrTXpayGbn"></label></td>
					<th class="line_thb">압류구분</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_arrTXattGbn"></label></td>
				</tr>
				
				<tr>
					<th class="line_thb">납부자주소</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_arrTXperAddr"></label></td>
					<th class="line_thb">전화번호</th>	
					<td class="line_b"><label id="csNonTaxRcpt_arrTXperTel"></label></td>															
					<th class="line_thb">휴대폰번호</th>	
					<td class="line_b"><label id="csNonTaxRcpt_arrTXperCell"></label></td>
				</tr>

				<tr>
							
					<th class="line_thb">최초부과금액</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_arrTXfstAmt"></label></td>
					<th class="line_thb">가산금</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_arrTXlstAddAmt"></label></td>		
					<th class="line_thb">납기금액</th>								
					<td class="line_b"><label id="csNonTaxRcpt_arrTXpatAmt"></label></td>																			
				</tr>	

				<tr>
					<th class="line_thb">부과일자</th>								
					<td class="line_b"><label id="csNonTaxRcpt_arrTXlvyYMD"></label></td>
					<th class="line_thb">최초납기일자</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_arrTXfstNapYMD"></label></td>
					<th class="line_thb">납기일자</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_arrTXlstNapYMD"></label></td>																			
				</tr>

				<tr>
					<th class="line_thb">은행명</th>								
					<td class="line_b"><label id="csNonTaxRcpt_arrTXbankNm"></label></td>
					<th class="line_thb">가상계좌번호</th>								
					<td class="line_b" ><label id="csNonTaxRcpt_arrTXaccountNo"></label></td>
					<th class="line_thb"></th>								
					<td class="line_b"><label id="#"></label></td>																			
				</tr>
			</tbody>
		</table>					
</div>
	 <!-- 체납탭 끝 -->
