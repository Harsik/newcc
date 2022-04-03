<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="<c:url value='/resources/js/common/listenRec.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/common/comCounselSpec.js'/>"></script>

 			<div id="grid_all">
				<!-- 버튼 테이블 -->
				<div id="cmscsp_btnControlCounsel">
					<table class="info_tbl_btn">
						<tr>
							<td scope="row" style="width: 70%; text-align:left; font-weight: bold;">
							행정동  주소 : <select class="select_bl_20" id="cmscsp_selMainAddrCd" style="width: 105px;" title="행정동주소"></select>
							<label id="cmscsp_selMainAddrDetail"></label>
<!-- 								<button type="button" id="cmscsp_btnCnslHistoryPopup" class="button">상담변경이력</button> -->
								<label id="cmscsp_labNote" style="color: #ff0080;"></label>
							</td>
							<td scope="row">
								<button type="button" id="cmscsp_btnCnslHistoryPopup" class="button">상담변경이력</button>
								<button type="button" id="cmscsp_btnSmsSpec" class="button">문자상세</button>
								<button type="button" id="cmscsp_btnSmsSend" class="button">문자발신</button>
								<button type="button" id="cmscsp_btnListenRec" class="button">청취</button>
								<button type="button" id="cmscsp_callbckBase" class="button">접수</button>
								<button type="button" id="cmscsp_btnOutBoundCall" class="button">아웃바운드</button>
								<button type="button" id="cmscsp_btnDelete" class="button">삭제</button>
								<button type="button" id="cmscsp_btnUpdate" class="button">저장</button>
								<!-- <button type="button" id="cmscsp_btnJisikDbPopup" class="button">상담DB요청등록</button> -->								
							</td>
						</tr>
					</table>
				</div>
				<!--"버튼 테이블"-->
			</div>
			<!-- 개인정보테이블 -->			
			<input type="hidden" id="cmscsp_POPUP" alt="popup" title="popup">
			<input type="hidden" id="cmscsp_tcktId" alt="tcktId" title="tcktId">
			<input type="hidden" id="cmscsp_callBckId" alt="callBckId" title="callBckId">
			<input type="hidden" id="cmscsp_custId" alt="custId" title="custId">
			<input type="hidden" id="cmscsp_reqTcktId" alt="reqTcktId" title="reqTcktId">
			<input type="hidden" id="cmscsp_oldActTypeCd" alt="oldActTypeCd" title="oldActTypeCd">
			<input type="hidden" id="cmscsp_refId" alt="refId" title="refId">
			<input type="hidden" id="cmscsp_callbackUsrId" alt="callbackUsrId" title="callbackUsrId">
			<input type="hidden" id="cmscsp_rcvnUserId" alt="rcvnUserId" title="rcvnUserId">
			<input type="hidden" id="cmscsp_trnrTeamCd" alt="trnrTeamCd" title="trnrTeamCd">
			<input type="hidden" id="cmscsp_trnrDeptCd" alt="trnrDeptCd" title="trnrDeptCd">
			<input type="hidden" id="cmscsp_extAgencyId" alt="extAgencyId" title="extAgencyId">
			<input type="hidden" id="cmscsp_transferOrg" alt="transferOrg" title="transferOrg">
			<input type="hidden" id="cmscsp_hidCallId" alt="hidCallId" title="hidCallId">
			
			<!-- 호출된 팝업이 참조  -->
			<input type="hidden" id="cmscsp_histPopCallMe" alt="" title="">
			
			<!-- 이관민원 관련  정보 -->
			<!-- 주관부서관련 -->
			<input type="hidden" id="cmscsp_cnslMainDeptCd" value="" alt="cnslMainDeptCd" title="cnslMainDeptCd" />
			<input type="hidden" id="cmscsp_cnslMainTeamCd" value="" alt="cnslMainTeamCd" title="cnslMainTeamCd" />
			<input type="hidden" id="cmscsp_cnslMainAffairUsrId" value="" alt="cnslMainAffairUsrId" title="cnslMainAffairUsrId" />
			<input type="hidden" id="cmscsp_cnslMainAffairUsrNm" value="" alt="cnslMainAffairUsrNm" title="cnslMainAffairUsrNm" />
			<input type="hidden" id="cmscsp_cnslMainAffairTelNo" value="" alt="cnslMainAffairTelNo" title="cnslMainAffairTelNo" />
			<input type="hidden" id="cmscsp_cnslMainAffairMobile" value="" alt="cnslMainAffairMobile" title="cnslMainAffairMobile" />
			<input type="hidden" id="cmscsp_cnslMainAffairYN" value="" alt="cnslMainAffairYN" title="cnslMainAffairYN" />
			<!-- 보조부서 관련  -->
            <input type="hidden" id="cmscsp_cnslSubDeptCd" value="" alt="cnslSubDeptCd" title="cnslSubDeptCd" />
            <input type="hidden" id="cmscsp_cnslSubTeamCd" value="" alt="cnslSubTeamCd" title="cnslSubTeamCd" />
            <input type="hidden" id="cmscsp_cnslSubAffairUsrId" value="" alt="cnslSubAffairUsrId" title="cnslSubAffairUsrId" />
            <input type="hidden" id="cmscsp_cnslSubAffairUsrNm" value="" alt="cnslSubAffairUsrNm" title="cnslSubAffairUsrNm" />
            <input type="hidden" id="cmscsp_cnslSubAffairTelNo" value="" alt="cnslSubAffairTelNo" title="cnslSubAffairTelNo" />
            <input type="hidden" id="cmscsp_cnslSubAffairMobile" value="" alt="cnslSubAffairMobile" title="cnslSubAffairMobile" />
            <input type="hidden" id="cmscsp_cnslSubAffairYN" value="" alt="cnslSubAffairYN" title="cnslSubAffairYN" />
            <!-- 이관민원 관련  정보 -->
			
			<input type="hidden" id="cmscsp_transfContSizeContinue" value="" alt="transfContSizeContinue" title="transfContSizeContinue" />
            <!-- 이관민원 크게 보기 -->
            
			<!-- 콜백시도 -->
			<input type="hidden" id="cmscsp_callBackRetryCnt" value="" alt="callBackRetryCnt" title="callBackRetryCnt" />
			
			<div style="height: 330px">
				<div id="cmscsp_callBackTable">
					<table class="profile_tbl">
						<tr>
							<td scope="row" class="line_rt" >접수일시</td>
							<td class="line_b" id="cmscsp_callbckReq"></td>
							<td scope="row" class="line_c">분배일시</td>
							<td class="line_b" id="cmscsp_callbckDiv"></td>
							<td scope="row" class="line_c" >최근시도</td>
							<td class="line_b" id="cmscsp_rctTry"></td>
							<td scope="row" class="line_c" >처리상태</td>
							<td class="line_b"><select class="select_bl" id="cmscsp_callbckActStCd" title="처리상태"></select></td>
						</tr>
						<tr>
							<td scope="row" class="line_rt">민원인명</td>
							<td class="line_b" id="cmscsp_callbckCustNm"></td>
							<td scope="row" class="line_c">콜백번호</td>
							<td class="line_b" id="cmscsp_callbckTelNo"></td>
							<!-- <td class="line_c" >발신자번호</td>
							<td  class="line_b" id="cmscsp_callbckAni"></td> -->
							<td scope="row" class="line_c" >자동/회수</td>
							<td class="line_b" id="cmscsp_textAutoRecl"></td>
							<td scope="row" class="line_c" >메모</td>
							<td class="line_b" ><input type="text" class="text_ol" id="cmscsp_callbckActRsn" alt="메모" title="메모" /> </td>
						</tr>
					</table>
				</div>
				<div id="cmscsp_counselComTable">
					<table class="profile_tbl">
						<tr>
							<td scope="row" class="line_rt" id="cmscsp_rcvDtText" style="width: 12%;">접수일시</td>
							<td class="line_b" id="cmscsp_rcvDt" style="width: 23%;"></td>
							<td scope="row" class="line_c" style="width: 12%;">민원인</td>
							<td class="line_b" style="width: 24%;"><label id="cmscsp_custNm"></label><button type="button" id="cmscsp_btnTabCustSearch" class="button">수정</button></td>
							<td scope="row" class="line_c">민원인구분</td>
							<td class="line_b" id="cmscsp_cstType" style="width:27%;"></td>
							<td scope="row" class="line_c" id="cmscsp_custCompText" style="width: 12%;">민원인성향</td>
							<td class="line_b" id="cmscsp_cstComp" nowrap></td>
						</tr>
						<tr>
							<td scope="row" class="line_rt">통화구분</td>
							<td class="line_b"><select class="select_bl" id="cmscsp_callGbCd" title="통화구분"></select></td>
							<td scope="row" class="line_c">통화번호</td>
<!-- 							<td class="line_b" id="cmscsp_cntctInform"></td> -->
							<td class="line_b"><label id="cmscsp_cntctInform"></label>
							<img class="icon_cal2" id="btnTabCustSMS" style="margin-left: 6px; display: inline; cursor: pointer;" alt="SMS" src="/resources/images/sms.png">
							<td scope="row" class="line_c">통화시간</td>
							<td class="line_b" id="cmscsp_callTime"></td>
							<td scope="row" class="line_c">메모</td>
							<td class="line_b"><input type="text" class="text_ol" id="cmscsp_tfCounselMemo" disabled alt="메모" title="메모"> </td>
						</tr>
						<tr>
							<td scope="row" class="line_rt">처리유형</td>
							<td class="line_b" style="padding-right:1px;">
								<select class="select_bl" id="cmscsp_actTypeCd" style="width: 58%;" title="처리유형"></select>
							 	<select class="select_bl" id="cmscsp_actStCd" style="width: 37%;" title="치리유형코드"></select>
							</td>
							<td class="line_c"></td>
							<!-- <td class="line_c">채널구분</td>
							<td class="line_b" id="cmscsp_chnlgb"></td>
							 --><td class="line_b" id="cmscsp_tdVideo"></td>
							<!-- <td class="line_c">등록/일시</td> -->
							<td class="line_c" id="cmscsp_tdkeyword"></td>
							<!-- <td class="line_b" id="cmscsp_crtUsrNm" style="padding: 0px;">-->	
							<td class="line_b" >
								<!-- <select class="select_bl" id="cmscsp_selCnslKeyWord" style="width:150px;"></select> -->
								<span id="cmscsp_star_rating" style="display:none;"></span>
							</td>
							<td scope="row" class="line_c">수정일시</td>
							<td class="line_b" id="cmscsp_modDt" style="padding: 0px;">
								<!-- <input type="text" class="text_ol" >
								<img id="cmscsp_imgMainResvPhone" style="cursor:pointer;" src="<c:url value='/resources/images/btn_cphone.gif'/>" alt="전화기" class="icon_cal2"/> -->
							</td>
						</tr>
						<tr>
							<td class="line_rt" id="cmscsp_counselText">
							</td>
							<td class="line_b" >
							  <input type="text" class="text_ol hidInput" id="cmscsp_tfResvDtm" alt="tfResvDtm" title="tfResvDtm" />
								<input type="text" class="text_ol hidInput" id="cmscsp_tfRcvnTeamNm" alt="tfRcvnTeamNm" title="tfRcvnTeamNm" />
								<input type="radio" id="cmscsp_rdoCnslImmediate" name="rdoCnslReq" value="010000" checked alt="rdoCnslImmediate"><label id="cmscsp_labRdoCnslImmediateText" for="cmscsp_rdoCnslImmediate" style="font-size: 9pt;">긴급</label>
								<input type="radio" id="cmscsp_rdoCnslSevenDays" name="rdoCnslReq" value="020000" alt="rdoCnslSevenDays"><label id="cmscsp_labRdoCnslSevenDaysText" for="cmscsp_rdoCnslSevenDays" style="font-size: 9pt;">7일이내</label>

								<input type="text" class="text_ol hidInput" id="cmscsp_tfRcvnUsr" alt="tfRcvnUsr" title="tfRcvnUsr" />
								<input type="text" class="text_ol hidInput" id="cmscsp_tfCnslClaimant" alt="tfCnslClaimant" title="tfCnslClaimant" />
							</td>
							<td class="line_c" id="cmscsp_resvTelText"></td>
							<td class="line_b" >
								<input type="text" class="text_ol hidInput" id="cmscsp_tfResvTelNo" alt="tfResvTelNo" title="tfResvTelNo"/>
								<input type="text" class="text_ol hidInput" id="cmscsp_tfCnslClaimantPhoneNum" onkeydown="onlyNumber(this)" alt="tfCnslClaimantPhoneNum" title="tfCnslClaimantPhoneNum" />
							</td>
							<td class="line_c" id="cmscsp_actCounselText"></td>
							<td class="line_b">
								<input type="text" class="text_ol hidInput" id="cmscsp_tfActCounselText" alt="tfActCounselText" title="tfActCounselText" />
							</td>
							<td class="line_c" id="cmscsp_transfRsltText"></td>
							<td class="line_b">
									<input type="radio" id="cmscsp_rdoCnslYes" name="rdoCnslResult" value="Y" checked alt="rdoCnslYes"><label id="cmscsp_labRdoYesText" for="cmscsp_rdoCnslYes" style="font-size: 9pt;">수신</label>
									<input type="radio" id="cmscsp_rdoCnslNo" name="rdoCnslResult" value="N" alt="rdoCnslNo" ><label id="cmscsp_labRdoNoText" for="cmscsp_rdoCnslNo" style="font-size: 9pt;">거부</label>
							</td>
						</tr>
						<tr>
							<td scope="row" class="line_rt">상담유형</td>
							<td class="line_b" colspan="7" nowrap>
								<%--<select class="select_bl" id="cmscsp_intvExCd" style="width:15%;"></select>--%>
								<input type="text" class="text_ol_60 hidInput" id="cmscsp_tfLgMdSmSearch_02" maxlength="30" style="width: 240px;" placeholder="상담유형 소분류 검색어를 입력해 주세요!" alt="검색어" title="검색어"> 
								<select class="select_bl" id="cmscsp_intvLgCd" style="width:10%;" title="대분류"></select>
								<select class="select_bl" id="cmscsp_intvMdCd" style="width:10%;" title="중분류"></select>
								<select class="select_bl" id="cmscsp_intvSmCd" style="width:49%;" title="소분류"></select>
							</td>	
						</tr>
						<tr id="cmscsp_counselInfo">
							<td scope="row" class="line_rt" style="height: 50px;">문의내용<br>
									<div id="cmscsp_cnslCopyCnslRcvCont" style="text-align:center;">
												<img style="cursor:pointer;" src="<c:url value='/resources/images/sel_dub_arrow.png'/>" id="cmscsp_copyCnslAttach" alt="화살표">
									</div>
							</td>
							<td class="line_b"  colspan="3">
								<textarea class="area_ol" style="height:173px;" rows="8" id="cmscsp_rcvCont" title="문의내용"></textarea>
							</td>
							<td scope="row" class="line_c" >답변내용 
											 <div id="cmscsp_cnslCopyTransferCont" style="text-align:center; margin-top: 3px;">
											 <img style="cursor:pointer;" src="<c:url value='/resources/images/sel_dub_arrow.png'/>" id="cmscsp_copyCnslAttach2" alt="화살표">
											 <label id="cmscsp_labTransfCont" style="color:#98a5b3;font-weight: bold;"></label>
												<img style="cursor:pointer; " src="<c:url value='/resources/images/cont_delete.png'/>" id="cmscsp_deleteCnslCont" alt="화살표">
											</div>
											<button type="button" id="cmscsp_btnTransfCont" class="button" style="font-size: 11px;font-weight: normal;">이관내용&lt;</button>
							</td>
							<td class="line_b"  colspan="3">
								<textarea class="area_ol" style="height:173px;" id="cmscsp_actCont" title="답변내용"></textarea>
								<br>
								<textarea class="area_ol hidInput" style="height:25px; margin-top:4px;" id="cmscsp_trnrMinCont" title="답변설명"></textarea>
							</td>
						</tr>
						 
						<tr id="cmscsp_TrMinwonProcStatus">
							<td scope="row" class="line_rt">처리상태</td>
							<td class="line_b"><select class="select_bl" id="cmscsp_cnslMainProcSt" title="처리상태"></select></td>
							<td scope="row" class="line_c">처리일자</td>
							<td class="line_b" id="cmscsp_cnslMainProcDtm"></td>
							<td scope="row" class="line_c">처리상태</td>
							<td class="line_b"><select class="select_bl" id="cmscsp_cnslSubProcSt" title="처리상태"></select></td>
							<td scope="row" class="line_c">처리일자</td>
							<td class="line_b" id="cmscsp_cnslSubProcDtm"></td>
						</tr>
						<tr id="cmscsp_minwonProcDeptInfo">
						  <td class="line_rt" ><button type="button" id="cmscsp_btnCnslMainDepartmentSearch"  class="button" style="font-weight: normal;">이관부서1</button></td>
						  <td class="line_b" colspan="3" nowrap>
						     <input type="text" class="text_ol" style="width: 7px;" id="cmscsp_tfCnslMainDepartment" disabled alt="이관부서1" title="이관부서1">
						 <!--  </td>
						  <td class="line_c">담당자</td> 
							<td class="line_b" > -->
								<input type="text" class="text_ol hidInput" style="width: 280px;" id="cmscsp_cnslMainUsr" placeholder="담당부서를 입력해 주세요!" alt="담당부서" title="담당부서"/>
								&nbsp; &nbsp;<button type="button" id="cmscsp_btnMainHis" class="button">이력</button>
							</td>
						  <td class="line_c">
						  	<button type="button" id="cmscsp_btnCnslSubDepartmentSearch" class="button" style="font-weight: normal;">이관부서2</button>
						  </td>
						  <td class="line_b" colspan="3" nowrap>
						      <input type="text" class="text_ol" style="width: 7px;" id="cmscsp_tfCnslSubDepartment" disabled alt="이관부서2" title="이관부서2">
						 <!--  </td>
						  <td class="line_c">담당자</td>
							<td class="line_b" > -->
								<input type="text" class="text_ol hidInput" style="width: 310px;" id="cmscsp_cnslSubUsr" placeholder="복합민원 담당부서를 입력해 주세요!" alt="복합민원 담당부서" title="복합민원 담당부서" />
								&nbsp; &nbsp;<button type="button" id="cmscsp_btnSubHis" class="button">이력</button>
							</td>
						</tr>
						<tr id="cmscsp_minwonProcCont">
               <td scope="row" class="line_rt">처리민원1</td>
               <td class="line_b" colspan="3">
                   <textarea class="area_ol hidInput" style="height:17px;" id="cmscsp_cnslMainProcCont" title="처리민원1"></textarea>
               </td>
               <td scope="row" class="line_c" >처리민원2</td>
               <td class="line_b" colspan="3">
                   <textarea class="area_ol hidInput" style="height:17px;" id="cmscsp_cnslSubProcCont" title="처리민원2"></textarea>
               </td>
						</tr>
						<tr id="cmscsp_minwonRtnCont">
                 <td scope="row" class="line_rt">반송사유</td>
                 <td class="line_b" colspan="3">
                      <input type="text" class="text_ol hidInput" id="cmscsp_tfCnslMainRtnCont" alt="반송사유" title="반송사유"/>                                
                 </td>
                 <td scope="row" class="line_c">반송사유</td>
                 <td class="line_b" colspan="3">
                      <input type="text" class="text_ol hidInput" id="cmscsp_tfCnslSubRtnCont" alt="반송사유" title="반송사유" />
                 </td>
						</tr>
					</table>
				</div>				
			</div>
			<!--"개인정보테이블"-->