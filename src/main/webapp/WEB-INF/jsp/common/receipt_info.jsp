<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
					<!-- 민원접수테이블 -->

					<div class="kmain_ticon">
						<div class="subject-icon">
							<img src="<c:url value='/resources/images/icon_3.png'/>" id="hid_value" alt="민원상담접수" />
						</div>
						<div class="subject" style="width: 90%;">
							민원접수&nbsp;&nbsp;
							<button type="button" id="btnCnslInit" class="button">초기화</button>
							
							<!-- 
							<div class="b_item">
								<div style="margin-left: 170px;">
									<button type="button" id="btnShortcuts_01" class="btn-success" style="display:none;">여권절차</button>
									<button type="button" id="btnShortcuts_02" class="btn-success" style="margin-left: 4px;display:none;">특이민원</button>
									<button type="button" id="btnShortcuts_03" class="btn-success" style="margin-left: 4px;display:none;">착오전화</button>
									<button type="button" id="btnShortcuts_05" class="btn-success" style="margin-left: 4px;display:none;">긴급정보</button>
									<button type="button" id="btnShortcuts_04" class="btn-success" style="margin-left: 4px;display:none;">통역연결</button>
								</div>
							</div>
							 -->
							 
							<div class="b_item">
								<div style="margin-left: 30px; width: 500px; font-size: 9pt;">
									행정동  주소 : <select class="select_bl_20" id="selMainAddrCd" style="width: 105px;" title="행정동주소"></select>
									<label id="selMainAddrDetail"></label>
<!-- 									<label id="labCustAddr"></label>&nbsp;<button type="button" id="btnCustAddrSearch" class="button">주소검색</button> -->
								</div>
							</div>
							
							
						</div>
						
						<div class="b_item">
							<div>
								<button type="button" id="btnCnslSave" class="button">저장</button>
							</div>
						</div>
					</div>
					<!-- 민원상담접수 테이블 -->
					<div class="receipt_info">
						<div class="receipt_info_top">
							<!-- <div class="receipt_info_left"> -->
							<!-- <table id="main_tbl_con" class="kmain_tbl_con"> -->
							<table class="kmain_tbl">
								<tr>
									<td class="line_rt" style="width: 55px; text-align: left;">
										<img src="<c:url value='/resources/images/list_style.png'/>" alt="화살표"> 발신번호
									</td>
									<td class="line_b">
										<input type="text" class="text_ol" id="tfContactInform" disabled="disabled" alt="화살표" title="화살표">
									</td>
									<td class="line_rt" style="width: 62px;">
										<img src="<c:url value='/resources/images/list_style.png'/>" alt="화살표"> 접수일시
									</td>
									<td class="line_b">
										<label id="labMainRcvDt"></label> <label id="labMainRcvTm"></label>
									</td>
									<td class="line_rt">
										<img src="<c:url value='/resources/images/list_style.png'/>" alt="화살표"> 통화구분
									</td>
									<td class="line_b">
										<select class="select_kmain" id="selMainCallgbcd" disabled="disabled" title="통화구분" ></select>
									</td>
									<td class="line_rt" style="width: 66px;">
										<label id="labKind">친절도평가</label>
									</td>
									<td class="line_b">	
										<span id="star_rating" style="display: none;" ></span>								
									</td>
									<%-- 
									<td class="line_rt" style="width: 66px;">
										<img src="<c:url value='/resources/images/list_style.png'/>" alt="화살표"> 채널구분
									</td>
									<td class="line_b">
										<select class="select_kmain" id="selMainChnl" style="width: 147px;"></select>
									</td> --%>
								</tr>
								<tr>
									<td class="line_rt" style="text-align: left;">
										<img src="<c:url value='/resources/images/list_style.png'/>" alt="화살표"> 처리유형
									</td>
									<td class="line_b">
										<select class="select_bl_20" id="selMainActtypecd" style="width: 80px;" title="처리유형"></select> 
										<select class="select_bl_20" id="selMainActstcd" style="width: 52px;" title="처리완료여부"></select>
										<!-- <select class="select_bl_50" id="selMainActTypeAndActSt" style="width:145px;"></select> -->
									</td>
									<td class="line_rt" style="text-align: left;" id="tfVideoImage">
										<img src="<c:url value='/resources/images/list_style.png'/>" alt="화살표"> 이미지
									</td>
									<td class="line_b" id="tfVideoImageList" nowrap>
										<input type="hidden" id="tfVideoImageRoomUuid" value=""/>
									</td>
									<td class="line_rt" style="text-align: left;" id="mainAccepted" nowrap>
										<img id="imgMainAcctypecdText" src="<c:url value='/resources/images/list_style.png'/>" alt="화살표"> 
										<label class="hidText" id="labMainActtypecdText" style="font-size: 9pt;"></label> 
										<select class="select_bl" id="selMainArsService" style="width: 130px;" title="호전환"></select>
										<button type=button id="btnArsTransfer" class="button_3">호전환</button>
									</td>
									<td class="line_b" id="mainAcceptContent">
										<input type="text" class="text_ol hidInput" id="tfMainRescDtm" alt="접수일자" title="접수일자" >
										<input type="text" class="text_ol hidInput" id="tfMainOrganization" alt="담당부서" title="담당부서"> 
										<input type="text" class="text_ol hidInput" id="tfMainCallBackUsr" alt="담당자" title="담당자">
									</td>
									<td class="line_rt" style="text-align: left;">
										<img id="imgManAcceptedText" src="<c:url value='/resources/images/list_style.png'/>" alt="화살표" title="화살표"> 
										<label class="hidText" id="labManAcceptedText" style="font-size: 9pt;"></label>
									</td>
									<td class="line_b">
										<input type="text" class="text_ol hidInput" id="tfMainTrnrRcvnUsr" readonly="readonly" alt="접수자" title="접수자"> 
										<input type="text" id="tfManAccepted" class="text_ol hidInput" value="" style="width: 138px;" alt="담당자" title="담당자"> 
										<input type="text" id="tfClaimant" class="text_ol hidInput" value="" style="width: 138px;" alt="화살표" title="화살표">
									</td>
									<td class="line_rt" style="text-align: left;">
										<img id="imgMainResvPhoneNumText" src="<c:url value='/resources/images/list_style.png'/>" alt="화살표" title="화살표"> 
										<label class="hidText" id="labMainResvPhoneNumText" style="font-size: 9pt;"></label>
									</td>
									<td class="line_b" style="padding-right: 0px; margin-right: 0px;">
										<input type="text" class="text_ol hidInput" id="tfMainResvPhoneNum" maxlength="20" style="width: 143px;" alt="연락처" title="연락처"> 
										<input type="text" class="text_ol hidInput" id="tfMainCallbckRegPhoneNum" maxlength="20" style="width: 143px;" alt="콜백번호" title="콜백번호"> 
										<input type="text" class="text_ol hidInput" id="tfAcceptedPhoneNum" maxlength="20" style="width: 120px;" alt="담당부서 전화번호" title="담당부서 전화번호"> 
										<input type="text" class="text_ol hidInput" id="tfClaimantPhoneNum" maxlength="20" style="width: 143px;" onkeydown="onlyNumber(this)" alt="복합민원 담당부서 전화번호" title="복합민원 담당부서 전화번호"> 
										<img id="imgMainHidePhoneNum" src="<c:url value='/resources/images/btn_cphone.gif'/>" alt="전화기" class="icon_cal2" style="cursor: pointer;" alt="전화번호"  title="전화번호" />
									</td>
								</tr>
								<tr>
									<td class="line_rt" style="text-align: left;">
										<img src="<c:url value='/resources/images/list_style.png'/>" alt="화살표" title="화살표"> 상담유형
									</td>
									<td class="line_b" colspan="5" nowrap>
										<!-- <select class="select_bl_20" id="selMainIntvExCd"></select> --> 
										<input type="text" class="text_ol_60 hidInput" id="tfLgMdSmSearch_01" placeholder="상담유형 소분류 검색어를 입력해 주세요!" maxlength="30" style="width: 225px;" alt="상담유형" title="상담유형">
										<select class="select_bl_20" id="selMainIntvLgCd" style="width: 105px;" title="대분류"></select> 
										<select class="select_bl_30" id="selMainIntvMdCd" style="width: 90px;" title="중분류"></select>
										<select class="select_bl_30" id="selMainIntvSmCd" style="width: 370px;" title="소분류"></select> 
									</td>
									
									<td class="line_rt" style="display: none;">
										<img src="<c:url value='/resources/images/list_style.png'/>" alt="화살표"> 키워드
									</td>
									<td class="line_b" style="display: none;">
										<select class="select_kmain" id="selMainKeyword" style="width: 147px;" title="키워드"></select>
									</td>
								</tr>
								<!-- <tr>
									<td class="line_rt"></td>
									<td class="line_b" colspan="5" nowrap>
										<select class="select_bl_30" id="selMainIntvSmCd" style="width: 365px;"></select> 
										<input type="text" class="text_ol_60 hidInput" id="tfLgMdSmSearch_01" placeholder="상담유형 소분류 검색어를 입력해 주세요!" maxlength="30" style="width: 225px;">
									</td>
								</tr> -->

								<tr>
									<td class="line_rt">
										<img src="<c:url value='/resources/images/list_style.png'/>" alt="화살표"> 문의내용<br> 
										<label id="labMainRcvCont"></label>
										<div id="copyRcvCont" style="text-align: center;">
											<%-- <img style="cursor:pointer;" src="<c:url value='/resources/images/select_arrow.png'/>" id="copyChange" align="right"> --%>
											<img style="cursor: pointer;" src="<c:url value='/resources/images/sel_dub_arrow.png'/>" id="copyAttach" alt="화살표">
										</div>
									</td>
									<td class="line_b" colspan="3">
										<textarea class="area_ol" style="height: 220px;" id="tfMainRcvCont" maxlength="1333" title="문의내용"></textarea>
									</td>

									<td class="line_rt">
										<img src="<c:url value='/resources/images/list_style.png'/>" alt="화살표"> 답변내용<br>
										<div id="copyRcvCont2" style="text-align: center;">
											<img style="cursor: pointer;" src="<c:url value='/resources/images/sel_dub_arrow.png'/>" id="copyAttach2" alt="화살표">
										</div>
									</td>
									<td class="line_b" colspan="3">
										<textarea class="area_ol" style="height: 220px;" id="tfMainActCont" maxlength="1333" title="답변내용"></textarea>
									</td>
								</tr>

								<tr id="TrTransfer01">
									<td class="line_rt" rowspan="3">
										<div id="copyTransferCont" style="text-align: center;">
											<%-- <img style="cursor:pointer;" src="<c:url value='/resources/images/select_arrow.png'/>" id="copyChange" align="right"> --%>
											<img style="cursor: pointer;" src="<c:url value='/resources/images/cont_delete.png'/>" id="deleteCont" alt="삭제">
										</div> 
										<img src="<c:url value='/resources/images/list_style.png'/>" alt="화살표"> 
										<label class="hidText" style="font-size: 9pt;">이관내용</label>
									</td>
									<td class="line_b" colspan="3" rowspan="3">
										<textarea class="area_ol hidInput" style="height: 80px;" id="tfMainTransferCont" maxlength="1333" title="이관내용"></textarea>
									</td>
									<td class="line_rt">
										<img id="imgImmDeadlineText" src="<c:url value='/resources/images/list_style.png'/>" alt="화살표"> 
										<label class="hidText" id="labMainImmDeadlineText" style="font-size: 9pt;">처리기한</label>
									</td>
									<td class="line_b" nowrap>
										<input type="radio" id="rbReqImmediate" name="rbReq" value="010000" alt="긴급">
										<label id="labRboImmediateText" for="rbReqImmediate" style="font-size: 9pt;">긴급</label> 
										<input type="radio" id="rbReqSevenDays" name="rbReq" value="020000"  alt="7일이내">
										<label id="labRboSevenDaysText" for="rbReqSevenDays" style="font-size: 9pt;">7일이내</label>
									</td>
									<td class="line_rt">
										<img id="imgSubDepartmentText" src="<c:url value='/resources/images/list_style.png'/>" alt="화살표"> 
										<label class="hidText" id="labMainImmReqResultText" style="font-size: 9pt;">결과수신</label>
									</td>
									<td class="line_b" nowrap><input type="radio" id="rbReqYes" name="rbResult" value="Y">
										<label id="labReqYesText" for="rbReqYes" style="font-size: 9pt;">수신</label>
										<input type="radio" id="rbReqNo" name="rbResult" value="N" alt="수신/거부">
										<label id="labReqNoText" for="rbReqNo" style="font-size: 9pt;">거부</label>
									</td>
								</tr>
								<tr id="TrTransfer02">
									<td class="line_rt">
										<!--<img id="imgTransDepartmentText01" src="<c:url value='/resources/images/list_style.png'/>" alt="화살표">
											 <label id="labDeptText01" style="font-size: 9pt;">이관부서1</label> -->
										<button type="button" id="btnDept01" class="button" style="font-weight: normal;width: 65px;">이관부서1</button>
									</td>
									<td class="line_b" colspan="3" nowrap>
										<input type="text" class="text_ol_half" style="width: 50px;margin-left: 10px;" id="tfOrgDeptUser_01" maxlength="20" disabled alt="담당자" title="담당자"> 
										<input type="text" class="text_ol_60 hidInput" style="width: 300px;" placeholder="담당부서를 입력해 주세요!" id="tfTransfDept_01" maxlength="20" alt="담당부서" title="담당부서"> 
										<!-- <img id="imgSubDepartmentSearch" src="<c:url value='/resources/images/icon_2.png'/>" style="vertical-align:bottom;cursor:pointer;"> -->
									</td>
								</tr>
								<tr id="TrTransfer03">
									<td class="line_rt">
										<!-- 
										<img id="imgTransDepartmentText02" src="<c:url value='/resources/images/list_style.png'/>" alt="화살표"> 
										<label id="labDeptText02" style="font-size: 9pt;">이관부서2</label> 
										-->
										<button type="button" id="btnDept02" class="button" style="font-weight: normal;width: 65px;">이관부서2</button>
									</td>
									<td class="line_b" colspan="3" nowrap>
										<input type="text" class="text_ol_half" style="width: 50px;margin-left: 10px;" id="tfOrgDeptUser_02" maxlength="20" disabled alt="복합민원 담당자" title="복합민원 담당자"> 
										<input type="text" class="text_ol_60 hidInput" style="width: 300px;" placeholder="복합민원 담당부서를 입력해 주세요!" id="tfTransfDept_02" maxlength="20" alt="복합민원 담당부서" title="복합민원 담당부서"> 
										<!-- 
										<img id="imgDeptSearch" src="<c:url value='/resources/images/icon_2.png'/>" style="vertical-align:bottom;cursor:pointer;"> 
										-->
									</td>
								</tr>

							</table>
						</div>
					</div>