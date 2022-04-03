<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


  			<div id="cstrvc_subGrid_all" class="divInner">
			        <!-- 조회/검색 -->
			        <div id="search" style="height: 57px;margin-bottom:5px;">
			          <table class="search_tbl">
			            <tr>
			              <th>접수일자</th>              
			              <td style="width: 250px;">
			                <input type="text" class="text_Date" id="cstrvc_srcDeptFrDate" maxlength="10"> ~ 
			                <input type="text" class="text_Date" id="cstrvc_srcDeptToDate" maxlength="10" > 
			              </td>
			              
			              <th>처리상태</th>
			              <td style="width: 140px;">
			              	<select class="select_al" id="cstrvc_selDeptRcptSrchtype" name="cstrvc_selDeptRcptSrchtype">
								<option value="all">전체</option>
								<option value="010200">부서접수</option>
								<option value="010300">담당자지정</option>
								<option value="020100">담당자처리중</option>	
								<option value="020200">처리완료</option>								
								<option value="030100">담당자(재)지정요청</option>								
								<option value="030200">부서(재)지정요청</option>								
							</select>
			              </td>
			              
			              <th>경과기간</th>
			              <td style="width: 70px;" >			                
							<select class="select_al" id="cstrvc_selDeptRcptPassDayType" name="cstrvc_selDeptRcptPassDayType">
								<option value="all">전체</option>
								<option value="7">7일</option>
								<option value="14">14일</option>
							</select>
			              </td>
			              
			              <th style="width: 125px;">
				              <input type="checkbox" id="chkUnsetYn" class="checkbox" checked>
				              <label for="chkUnsetYn" >담당자 미지정건</label>
			              </th>
			              
			              <th style="width: 75px;">
				              <input type="checkbox" id="chkAllDeptReceipt" class="checkbox">
				              <label for="chkAllDeptReceipt" >전체부서</label>
			              </th>
              
			              <td class="btn">
			                <button type="button" id="cstrvc_btnDeptReceiptSearch" class="button">조회</button>
			                <button id="cstrvc_btnDeptReceiptInit" class="button">초기화</button>
			                <button type="button" id="cstrvc_btnDeptReceiptExcelDown" class="button">엑셀다운</button>
			              </td>
			            </tr>
			            
			            <tr>
		            	  <th>키워드</th>
			              <td>			                
							<select class="select_al" id="cstrvc_selDeptRcptKeyWord" name="cstrvc_selDeptRcptKeyWord" style="width: 70px;">
								<option value="all">전체</option>
								<option value="affsUsrNm">서무명</option>
								<option value="orgUsrNm">담당자명</option>
								<option value="orgFulNm">부서명</option>
							</select>
							<input type="text" id="cstrvc_srcKeyWord" class="text_ol" style="width: 140px;">
			              </td>
			              
			              <th style="width: 60px;">이관내용</th>
					      <td>
					        <input type="text" id="cstrvc_srcTntrCont" class="text_ol" style="width: 200px;">
					      </td>
				        </tr> 
			          </table>
			        </div>
			        <!--"조회/검색"-->
			        				
		<div id="cstrvc_divCh" style="margin:0 0 5px 0px">
<!-- 			<label id="cstrvc_stat" style="font-weight:bold;">처리상태변경</label> -->
<!-- 			<input type="radio" id="cstrvc_ch_cvlActSt_010200" name="ch_cvlActSt" value="010200"><label for="ch_cvlActSt_010200" style="font-size: 9pt;">부서재지정</label> -->
<!-- 			<input type="radio" id="cstrvc_ch_cvlActSt_010300" name="ch_cvlActSt" value="010300" checked><label for="ch_cvlActSt_010300" style="font-size: 9pt;">담당자재지정</label>			 -->
			<label id="cstrvc_charger" style="font-weight:bold;">선택담당자</label>
			<input type="hidden" class="text_ol_half" style="width: 100px;" id="cstrvc_ch_org_usr_id" disabled>
									<input type="hidden" class="text_ol_half" style="width: 100px;" id="cstrvc_ch_org_id" disabled>
									<input type="hidden" class="text_ol_half" style="width: 150px;" id="cstrvc_ch_org_ful_nm" disabled>
									<input type="hidden" class="text_ol_half" style="width: 100px;" id="cstrvc_ch_org_usr_nm" disabled>
									<input type="hidden" class="text_ol_half" style="width: 100px;" id="cstrvc_ch_ofce_tel_no" disabled>
									<input type="hidden" class="text_ol_half" style="width: 100px;" id="cstrvc_ch_org_usr_mobile" disabled>	
									<input type="hidden" class="text_ol_half" style="width: 100px;" id="cstrvc_ch_ofce_cc_affairs_yn" disabled>									
									<input type="text" class="text_ol_60" style="width: 470px;" placeholder="담당자명 또는 담당과를 입력해 주세요!" id="cstrvc_ch_tfTransfUser" maxlength="30" >			
			<label id="cstrvc_ch_rtn_rsn" style="font-weight:bold;">재지정요청사유</label>
			<input type="text" class="text_ol" id="cstrvc_txtrtn_rsn" style="width: 300px;">
			<button id="cstrvc_changeStateCharger" class="button">일괄변경</button>
			</div>				
					<!-- 이관민원 그리드테이블 -->
					<div style="margin-bottom: 15px; clear: both;">
								<table id="cstrvc_tblDeptReceiptList"></table>
								<div id="cstrvc_pagingDeptReceiptList"></div>
					</div>
					<!--"그리드테이블"-->
					
					<div class="stitle" style="display: ruby-base;">상담접수 상세내용</div><!--"타이틀"-->
					<button type="button" id="cstrvc_DeptReceiptHistory" class="button" style="margin-bottom: 4px; float: right;">이력보기</button>
					<br/>
					
					<table class="profile_tbl">
						<colgroup>
							<col width="8%"/>
							<col width="20%"/>
							<col width="8%"/>
							<col width="10%"/>
							<col width="8%"/>
							<col width="10%"/>
							<col width="8%"/>
							<col width="10%"/>
							<col width="8%"/>
							<col width="10%"/>
						</colgroup>
						
						<tbody>
							<tr>
							<th class="line_rt">처리상태</th>
								<td class="line_b" colspan="9">
									<div id="cswVocD_progressbar">
										<div class="progress-label" style="left:12%;">부서접수</div>
								        <div class="progress-label" style="left:32%;">담당자지정</div>
								        <div class="progress-label" style="left:59%;">처리중</div>
								        <div class="progress-label" style="left:82%;">완료</div>
									</div>
									<form id="cstrvc_hform" name="hform" method="post">
							            <input type="hidden" id="cstrvc_tckt_id" name="tckt_id" class="text_ol">
							            <input type="hidden" id="cstrvc_tntr_id" name="tntr_id" class="text_ol">
							            <input type="hidden" id="cstrvc_ord" name="ord" class="text_ol">									
									</form>	
								</td>
							</tr>
							<tr>
								<th class="line_thb">접수일자</th>								
								<td class="line_b"><label id="cstrvc_trnr_rqs_dtm"></label></td>
								<th class="line_thb">접수자</th>								
								<td class="line_b" ><label id="cstrvc_rqs_usr_nm"></label></td>
								<th class="line_thb">민원인</th>								
								<td class="line_b" >
									<label id="cstrvc_ctzn"></label>
									<input type="hidden" id="cstrvc_cust_id" name="cust_id" class="text_ol">
								</td>
								<th class="line_thb">연락처</th>								
								<td class="line_b" ><label id="cstrvc_ctzn_tel_no"></label></td>
								<th class="line_thb" >처리기한</th>								
								<td class="line_b" id="cstrvc_rd_cvl_rqs_gb_cd" disabled></td>	
								<!-- <td class="line_b" id="rd_cvl_rqs_gb_cd" disabled></td>	 -->
							</tr>
							
<!-- 							<tr> -->
								
<!-- 								<th class="line_thb">처리진행상태</th>								 -->
<!-- 								<td class="line_b" colspan='6' id="cstrvc_rd_cvl_act_st_cd" disabled></td>	 -->
								<!-- <td class="line_b" colspan='6' id="rd_cvl_act_st_cd" disabled></td>	 -->
<!-- 								<td class="line_b"> -->
<!-- 									<form id="cstrvc_hform" name="hform" method="post"> -->
<!-- 							            <input type="hidden" id="cstrvc_tckt_id" name="tckt_id" class="text_ol"> -->
<!-- 							            <input type="hidden" id="cstrvc_tntr_id" name="tntr_id" class="text_ol"> -->
<!-- 							            <input type="hidden" id="cstrvc_ord" name="ord" class="text_ol">									 -->
<!-- 									</form>																	 -->
<!-- 								</td>	 -->
<!-- 								<th class="line_thb">결과수신</th>								 -->
<!-- 								<td class="line_b">  -->
<!-- 									<input type="radio" id="cstrvc_rdCvlRsltRcvY" name="rd_cvl_rslt_rcv_yn" value="Y" disabled><label for="rdCvlRsltRcvY" style="font-size: 9pt;">수신</label> -->
<!-- 									<input type="radio" id="cstrvc_rdCvlRsltRcvN" name="rd_cvl_rslt_rcv_yn" value="N" disabled><label for="rdCvlRsltRcvN" style="font-size: 9pt;">거부</label> -->
<!-- 								</td>																 -->
<!-- 							</tr> -->

							<tr>
								<th class="line_thb">담당부서</th>								
								<td class="line_b" colspan='5'><label id="cstrvc_org_ful_nm"></label></td>		
								
								<th class="line_thb">서무처리자</th>								
								<td class="line_b">									
									<label id="cstrvc_affs_usr_nm"></label>
								</td>	
								<th class="line_thb">결과수신</th>								
								<td class="line_b"> 
									<input type="radio" id="cstrvc_rdCvlRsltRcvY" name="rd_cvl_rslt_rcv_yn" value="Y" disabled><label for="rdCvlRsltRcvY" style="font-size: 9pt;">수신</label>
									<input type="radio" id="cstrvc_rdCvlRsltRcvN" name="rd_cvl_rslt_rcv_yn" value="N" disabled><label for="rdCvlRsltRcvN" style="font-size: 9pt;">거부</label>
								</td>																		
							</tr>
							

							<tr>
								<th class="line_thb">이관내용</th>								
								<td class="line_b" colspan='5'  style="height: 60px;">
									
									<textarea style="width:100%; height:200px;" rows="15" id="cstrvc_tntr_cont" readonly="readonly"></textarea>
								</td>
																	
							
								<th class="line_thb">요청사유</th>								
								<td class="line_b" colspan='3'>
									
									<span id="cstrvc_rtn_rsn"></span>
								</td>																			
							</tr>
														


							<tr>
								
<!-- 								<th class="line_thb">처리상태변경</th>						 -->
<!-- 								<td class="line_b" >									 -->
<!-- 									<input type="radio" id="cstrvc_rd_cvlActSt_010300" name="rd_cvlActSt" value="010300" onclick="fnCvlActStChange(this.value)"><label for="rd_cvlActSt_010300" style="font-size: 9pt;">담당자지정</label> -->
<!-- 									<input type="radio" id="cstrvc_rd_cvlActSt_010200" name="rd_cvlActSt" value="010200" onclick="fnCvlActStChange(this.value)"><label for="rd_cvlActSt_010200" style="font-size: 9pt;">부서(재)지정</label>				 -->
<!-- 								</td> -->
								
								<th id='th010300' class="line_thb" style="display: table-cell;">담당자</th>						
								<td id='td010300' class="line_b" colspan='9' style="display: table-cell;">								
									<input type="hidden" class="text_ol_half" style="width: 100px;" id="cstrvc_r_org_usr_id" disabled>
									<input type="hidden" class="text_ol_half" style="width: 100px;" id="cstrvc_r_org_id" disabled>
									<input type="hidden" class="text_ol_half" style="width: 150px;" id="cstrvc_r_org_ful_nm" disabled>
									<input type="hidden" class="text_ol_half" style="width: 100px;" id="cstrvc_r_org_usr_nm" disabled>
									<input type="hidden" class="text_ol_half" style="width: 100px;" id="cstrvc_r_ofce_tel_no" disabled>
									<input type="hidden" class="text_ol_half" style="width: 100px;" id="cstrvc_r_org_usr_mobile" disabled>	
									<input type="hidden" class="text_ol_half" style="width: 100px;" id="cstrvc_r_ofce_cc_affairs_yn" disabled>									
									<input type="text" class="text_ol_60" style="width: 470px;" placeholder="담당자명 또는 담당과를 입력해 주세요!" id="cstrvc_tfTransfUser" maxlength="30" >	
									<img style="visibility: hidden;" width="20" height="20" class="icon_comm" id="cstrvc_cntrSearch1" alt="찾기" src="/resources/images/search_img.png" style="display: none;">
									<button type="button" id="cstrvc_DeptReceiptUsrSave" class="button">담당자지정</button>		
								</td>
								
								
								<!-- <th id='th010200' class="line_thb" style="display: none;">부서변경</th>						
								<td id='td010200' class="line_b" colspan='7' style="display: none;">										
									<input type="text" class="text_ol_half" style="width: 100px;" id="cstrvc_r_org_id" disabled>
									<input type="hidden" class="text_ol_half" style="width: 150px;" id="cstrvc_r_org_ful_nm" disabled>	
									<input type="hidden" class="text_ol_half" style="width: 100px;" id="cstrvc_r_affs_org_usr_id" disabled>
									<input type="hidden" class="text_ol_half" style="width: 100px;" id="cstrvc_r_affs_usr_nm" disabled>
									<input type="hidden" class="text_ol_half" style="width: 100px;" id="cstrvc_r_affs_ofce_tel_no" disabled>
									<input type="hidden" class="text_ol_half" style="width: 100px;" id="cstrvc_r_affs_mobile" disabled>
									<input type="text" class="text_ol_60" style="width: 470px;" placeholder="담당부서(서무)를 입력해 주세요!" id="cstrvc_tfTransfDept" maxlength="30" >		
									<img width="20" height="20" class="icon_comm" id="cstrvc_cntrSearch2" alt="찾기" src="/resources/images/search_img.png">
									&nbsp;&nbsp;&nbsp;								
									<button type="button" id="cstrvc_DeptReceiptOrgSave" class="button">부서지정</button>
								</td>		 -->						
																									
							</tr>											
				
								
							<tr id='cstrvc_tr010200' style="display: block;">
								<th class="line_thb">(재)지정 사유</th>								
								<td class="line_b" colspan='9'>
									<!-- 예시) "본 민원의 소관업무는 xxx과 입니다."<br/> -->
									<input type="text" class="text_ol" id="cstrvc_r_rtn_rsn" name="cstrvc_r_rtn_rsn" style="height: 50px;" placeholder='예시) "본 민원은 OOO의 사유로 인해 XXX과 XXX님에게 (재)지정 합니다."'>
								</td>																			
							</tr>
												
						</tbody>
					</table>
					
					
					
				
        	</div>    