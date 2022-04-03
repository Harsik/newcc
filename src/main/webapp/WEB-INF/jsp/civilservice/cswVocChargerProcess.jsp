<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


  			<div id="cstrvc_subGrid_all" class="divInner">
			        <!-- 조회/검색 -->
			        <div id="search">
			          <table class="search_tbl">
			            <tr>
			              <th>접수일자</th>              
			              <td style="width: 220px;">
			                <input type="text" class="text_Date" id="cstrvc_srcChargerFrDate" maxlength="10"> ~ 
			                <input type="text" class="text_Date" id="cstrvc_srcChargerToDate" maxlength="10" > 
			              </td>

			              <th>처리상태</th>              
			              <td style="width: 110px;" >			                
							<select class="select_al" id="cstrvc_srcChargerCvlActStCd">
								<option value="all">전체</option>
								<option value="010300">담당자지정</option>
								<option value="020100">담당자처리중</option>	
								<option value="020200">처리완료</option>								
							</select>
			              </td>
			              
			              <th style="width: 50px;">경과기간</th>
			              <td style="width: 70px;" >			                
							<select class="select_al" id="cstrvc_selChargerPassDayType" name="cstrvc_selChargerPassDayType">
								<option value="all">선택</option>
								<option value="7">7일</option>
								<option value="14">14일</option>
							</select>
			              </td>
			              			              			              
			              <th style="width: 120px; text-align: left;">항목
							<select class="select_al" id="cstrvc_selChargerSrchtype" style="width: 90px;">
								<option value="srchAll">전체</option>
								<option value="srchNm">민원인</option>
								<option value="srchTel">연락처</option>
								<option value="srchMsg">이관내용</option>								
							</select>
			              </th>              
			              <td  >
			                <input type="text" id="cstrvc_srcChargerText" class="text_ol" style="height: 18px; margin-bottom: 2px;">
			              </td>			              
			              
			              <th style="width: 100px;" >
				              <input type="checkbox" id ="cstrvc_chkFinishYn"  class="checkbox"  checked >
				              <label for="cstrvc_chkFinishYn" >미완료</label>
			              </th>
			              
			              <th style="width: 100px;" >
				              <input type="checkbox" id ="chkAllDeptChProcess" class="checkbox">
				              <label for="chkAllDeptChProcess" >전체부서</label>
			              </th>
              
			              <td class="btn">
			                <button type="button" id="cstrvc_btnChargerSearch" class="button">조회</button>
			                <button type="button" id="cstrvc_btnChargerInit" class="button">초기화</button>
			                <button type="button" id="cstrvc_btnChargerExcelDown" class="button">엑셀다운</button>
			              </td>
			            </tr> 
			          </table>
			        </div><!--"조회/검색"-->
			        								
					<!-- 이관민원 그리드테이블 -->
					<div id="cstrvc_divChargerList" style="margin-bottom: 15px; clear: both;">
								<table id="cstrvc_tblChargerList"></table>
								<div id="cstrvc_pagingChargerList"></div>
					</div>
					<!--"그리드테이블"-->
					
					<div class="stitle" style="display: ruby-base;">상담접수 상세내용</div><!--"타이틀"-->
					<div id="sideBtn" style="margin-bottom: 4px; float: right;">
						<button type="button" id="cstrvc_ChargerHistory" class="button">이력보기</button>
						<button type="button" id="cstrvc_btnIng" class="button">처리중</button>
						<button type="button" id="cstrvc_btnComplete" class="button">처리완료</button>
						<button type="button" id="cstrvc_btnSmsSend" class="button">SMS발송</button>
					</div>
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
									<div id="cswVocP_progressbar">
										<div class="progress-label" style="left:12%;">부서접수</div>
								        <div class="progress-label" style="left:32%;">담당자지정</div>
								        <div class="progress-label" style="left:59%;">처리중</div>
								        <div class="progress-label" style="left:82%;">완료</div>
									</div>
									<form id="cstrvc_hform2" name="hform2" method="post">
							            <input type="hidden" id="cstrvc_tckt_id_c" name="tckt_id" class="text_ol">
							            <input type="hidden" id="cstrvc_tntr_id_c" name="tntr_id" class="text_ol">
							            <input type="hidden" id="cstrvc_ord_c" name="ord" class="text_ol">									
									</form>
								</td>
							</tr>
							
							<tr>
								<th class="line_thb">접수일자</th>								
								<td class="line_b"><label id="cstrvc_trnr_rqs_dtm_c"></label></td>
								<th class="line_thb">접수자</th>								
								<td class="line_b" ><label id="cstrvc_rqs_usr_nm_c"></label></td>
								<th class="line_thb">민원인</th>								
								<td class="line_b" ><label id="cstrvc_ctzn_c"></label></td>
								<th class="line_thb">연락처</th>								
								<td class="line_b" ><label id="cstrvc_ctzn_tel_no_c"></label></td>
								<th class="line_thb" >처리기한</th>								
								<td class="line_b" id="cstrvc_rd_cvl_rqs_gb_cd_c" disabled></td>
							</tr>
							
														
<!-- 							<tr> -->
								
<!-- 								<th class="line_thb">처리진행상태</th>								 -->
<!-- 								<td class="line_b" colspan='5' id="cstrvc_rd_cvl_act_st_cd_c" disabled></td>	 -->
<!-- 								<td class="line_b" colspan='2'> -->
<!-- 									<button type="button" id="cstrvc_ChargerHistory" class="button">이력보기</button> -->
<!-- 									<form id="cstrvc_hform2" name="hform2" method="post"> -->
<!-- 							            <input type="hidden" id="cstrvc_tckt_id_c" name="tckt_id" class="text_ol"> -->
<!-- 							            <input type="hidden" id="cstrvc_tntr_id_c" name="tntr_id" class="text_ol"> -->
<!-- 							            <input type="hidden" id="cstrvc_ord_c" name="ord" class="text_ol">									 -->
<!-- 									</form> -->
													
<!-- 								</td>								 -->
																	
<!-- 								<th class="line_thb">결과수신</th>								 -->
<!-- 								<td class="line_b">  -->
<!-- 									<input type="radio" id="cstrvc_rdCvlRsltRcvY_c" name="rd_cvl_rslt_rcv_yn_c" value="Y" disabled><label for="rdCvlRsltRcvY_c" style="font-size: 9pt;">수신</label> -->
<!-- 									<input type="radio" id="cstrvc_rdCvlRsltRcvN_c" name="rd_cvl_rslt_rcv_yn_c" value="N" disabled><label for="rdCvlRsltRcvN_c" style="font-size: 9pt;">거부</label> -->
<!-- 								</td>																 -->
<!-- 							</tr> -->
							<tr>
								<th class="line_thb">담당부서</th>								
								<td class="line_b" colspan='3'><label id="cstrvc_org_ful_nm_c"></label></td>		
								
								<th class="line_thb">서무처리자</th>								
								<td class="line_b" >									
									<label id="cstrvc_affs_usr_nm_c"></label>
								</td>
								<th id='th010300' class="line_thb">담당자</th>						
								<td id='td010300' class="line_b" >
									<input type="hidden" id="cstrvc_ofce_tel_no" name="cstrvc_ofce_tel_no" class="text_ol">								
									<label id="cstrvc_org_usr_nm_c"></label>
								</td>			
								<th class="line_thb">결과수신</th>								
								<td class="line_b"> 
									<input type="radio" id="cstrvc_rdCvlRsltRcvY_c" name="rd_cvl_rslt_rcv_yn_c" value="Y" disabled><label for="rdCvlRsltRcvY_c" style="font-size: 9pt;">수신</label>
									<input type="radio" id="cstrvc_rdCvlRsltRcvN_c" name="rd_cvl_rslt_rcv_yn_c" value="N" disabled><label for="rdCvlRsltRcvN_c" style="font-size: 9pt;">거부</label>
								</td>																						
							</tr>
							
							
							<tr>
								<th class="line_thb">이관내용</th>								
								<td class="line_b" colspan='5'>
									
									<textarea style="width:100%;" rows="15" id="cstrvc_tntr_cont_c" readonly="readonly"></textarea>
								</td>
																	
							
								<th class="line_thb">민원처리내용</th>								
								<td class="line_b" colspan='3'>
									<textarea style="width:100%;" rows="15" id="cstrvc_cvl_act_cont" onclick="keyPressEvent(this)"></textarea>
								</td>																			
							</tr>
							

							<tr>
<!-- 								<th class="line_thb">처리상태변경</th>						 -->
<!-- 								<td class="line_b" style="padding: 3px 15px 3px 4px;"> -->
<!-- 									<input type="radio" id="cstrvc_rd_cvlActSt_c020100" name="rd_cvlActSt_c" value="020100" onclick="fnCvlActStChangeC(this.value)"><label for="rd_cvlActSt_c020100" style="font-size: 9pt;">처리중</label> -->
<!-- 									<input type="radio" id="cstrvc_rd_cvlActSt_c020200" name="rd_cvlActSt_c" value="020200" onclick="fnCvlActStChangeC(this.value)"><label for="rd_cvlActSt_c020200" style="font-size: 9pt;">처리완료</label>									 -->
<!-- 									<input type="radio" id="cstrvc_rd_cvlActSt_c030100" name="rd_cvlActSt_c" value="030100" onclick="fnCvlActStChangeC(this.value)"><label for="rd_cvlActSt_c030100" style="font-size: 9pt;">담당자/부서(재)지정</label> -->
<!-- 								</td> -->
								
								<th id='p_th010300' class="line_thb" style="display: table-cell;">담당자지정</th>						
								<td id='p_td010300' class="line_b" colspan='9' style="display: table-cell;">								
									<input type="hidden" class="text_ol_half" style="width: 100px;" id="cstrvc_p_org_usr_id" disabled>
									<input type="hidden" class="text_ol_half" style="width: 100px;" id="cstrvc_p_org_id" disabled>
									<input type="hidden" class="text_ol_half" style="width: 150px;" id="cstrvc_p_org_ful_nm" disabled>
									<input type="hidden" class="text_ol_half" style="width: 100px;" id="cstrvc_p_org_usr_nm" disabled>
									<input type="hidden" class="text_ol_half" style="width: 100px;" id="cstrvc_p_ofce_tel_no" disabled>
									<input type="hidden" class="text_ol_half" style="width: 100px;" id="cstrvc_p_org_usr_mobile" disabled>
									<input type="hidden" class="text_ol_half" style="width: 100px;" id="cstrvc_p_ofce_cc_affairs_yn" disabled>									
									<input type="text" class="text_ol_60" style="width: 470px;" placeholder="담당자명 또는 담당과를 입력해 주세요!" id="cstrvc_p_tfTransfUser" maxlength="30" onclick="keyPressEvent(this)">	
									<img style="visibility: hidden;" width="20" height="20" class="icon_comm" id="cstrvc_cntrSearch2" alt="찾기" src="/resources/images/search_img.png" style="display: none;">
									<button type="button" id="cstrvc_btnChargerSave" class="button">담당자지정</button>		
								</td>			
							</tr>											
				
								
							<tr id='cstrvc_trRtn_rsn' style="display: none;">
								<th class="line_thb">(재)지정 사유</th>								
								<td class="line_b" colspan='9'>
									<input type="text" class="text_ol" id="cstrvc_r_rtn_rsn_c" name="cstrvc_r_rtn_rsn_c" style="height: 50px;" placeholder='예시) "본 민원은 OOO의 사유로 인해 XXX과 XXX님에게 (재)지정 합니다."' onclick="keyPressEvent(this)">
								</td>																			
							</tr>
												
						</tbody>
					</table>
					
					
					
				
        	</div>    