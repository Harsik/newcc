<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="<c:url value='/resources/js/civilservice/csWater.js'/>"></script>

		 <div id="search">
		     <table class="search_tbl">
				<tr>
					<th style="margin: 4px; float: left;">수용가번호</th>
					<td style="float: left;">
					<input type="text" class="text_ol" id="cvsvif_mkey" style="width:100%;">
					</td>
					<!-- 
					<th style="width: 3%">성명</th>
					<td style="text-align:left;width:5%;">	
					<input type="text" class="text_ol" id="cvsvif_nm" style="width:100%;">
					</td>
					<th style="width: 3%">주소</th>
					<td style="width: 15%">
					<input type="text" class="text_ol" id="cvsvif_addr" style="width:100%;">
					</td>
					 -->
					<td style="width: 20%;text-align:right;padding-right:5px;">
					<button type="button" class="button" id="cvsvif_btn_syuNosearch">수용가번호 찾기</button>
					<button type="button" class="button" id="cvsvif_btn_search">조회</button>
					<button type="button" class="button" id="cvsvif_btn_init">초기화</button>
					</td>
				</tr>
			</table>
		 </div> 
		
		<!-- sms -->
		<form id="csWater_Smsform" name="csWater_Smsform" method="post">
			<input type="hidden" id="csWater_totMney" name="totMney" class="text_ol">
			<input type="hidden" id="csWater_account0" name="account1" class="text_ol">
			<input type="hidden" id="csWater_account1" name="account2" class="text_ol">
		</form>
		
		<!-- 합계 탭 -->
		<div id="csWater_Summ">
	    	<table class="profile_tbl" style="width: 90%;">
				<tr>
					<td><input type="checkbox" id="csWater_chk_junggi"></td>
					<th class="line_thb">정기금액</th>								
					<td class="line_b"><label id="csWater_summ_junggi"></label></td>
					
					<td><input type="checkbox" id="csWater_chk_chenap"></td>
					<th class="line_thb">체납금액</th>								
					<td class="line_b" ><label id="csWater_summ_chenap"></label></td>
					
					<th class="line_thb">합계금액</th>								
					<td class="line_b"><label id="csWater_summ_totMney"></label></td>
					
					<td class="btn"><button type="button" id="csWater_btnSMS" class="button" style="margin-left: 35px;width: 70px;">문자발송</button></td>
				</tr>
	      	</table>
		</div>
		<br/>
		
		<!-- 수도요금 체납 목록 그리드테이블 -->
		<table class="profile_tbl" id="csWater_tbl">
                    <tr>
                        <th class="line_rt" style="width : 10%;">성명/상호</th>
                        <td class="line_b"><label id="suyNm"></label></td>
                        <th class="line_rt" style="width : 10%;">수용가번호</th>
                        <td class="line_b"><label id="syuNo"></label></td>
                        <th class="line_rt" style="width : 15%;">전자수용가번호</th>
                        <td class="line_b"><label id="eSuyNo"></label></td>
                        <th class="line_rt" style="width : 10%;">신주소</th>
                        <td class="line_b"><label id="newAddr"></label></td>
                    </tr>
                    <tr>
<!--                         <th class="line_rt">계량기번호</th> -->
<!--                         <td class="line_b"><label id="gyeryangNum"></label></td> -->
                        <th class="line_rt">상수도 업종</th>
                        <td class="line_b"><label id="sangsuUp"></label></td>
                        <th class="line_rt">하수도 업종</th>
                        <td class="line_b"><label id="hasuUp"></label></td>
                        <th class="line_rt">지하수 업종</th>
                        <td class="line_b"><label id="jihaUp"></label></td>
                        <th class="line_rt">구주소</th>
                        <td class="line_b"><label id="oldAddr"></label></td>
                    </tr>
                    <tr>
                        <th class="line_rt">구경</th>
                        <td class="line_b"><label id="gugCode"></label></td>
                        <th class="line_rt">상수도 조정</th>
                        <td class="line_b"><label id="sJojungCd"></label></td>
                        <th class="line_rt">하수도 조정</th>
                        <td class="line_b"><label id="hJojungCd"></label></td>
                        <th class="line_rt">지하수 조정</th>
                        <td class="line_b"><label id="jJojungCd"></label></td>
                    </tr>
                    <tr>
                    	<th class="line_rt">고지종류</th>
                        <td class="line_b"><label id="gojiKind"></label></td>
                        <th class="line_rt">상수세대수</th>
                        <td class="line_b"><label id="gaguSu"></label></td>
                        <th class="line_rt">총미납액</th>
                        <td class="line_b"><label id="unPaid"></label></td>
                        <th class="line_rt">가상계좌</th>
                        <td class="line_b"><label id="account0"></label></td>
                    </tr>
                    <tr>
                        <th class="line_rt">사용기간</th>
                        <td class="line_b"><label id="usagePeriod"></label></td>
                        <th class="line_rt">당월지침</th>
                        <td class="line_b"><label id="gichim"></label></td>
                        <th class="line_rt">전월지침</th>
                        <td class="line_b"><label id="preGichim"></label></td>
                        <th class="line_rt">가상계좌2</th>
                        <td class="line_b"><label id="account1"></label></td>
                    </tr>
                </table>
                
                <br />
		<!--"그리드테이블"-->	
		
		<table style="width: 100%; height: 150px; background-image: url('./img/sam.gif');">
			<tr>
				<td>
					<table id="cswter_tblWaterList"></table>
					<div id="cswter_pg"></div>				
				</td>
			</tr>
		</table>
		<!--"그리드테이블"-->			