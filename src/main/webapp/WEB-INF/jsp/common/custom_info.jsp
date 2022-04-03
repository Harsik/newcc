<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
					<div class="subject-icon">
						<img src="<c:url value='/resources/images/icon_2.png'/>"
							id="hid_getTicketId" alt="고객정보" />
					</div>
					<div class="subject">
						민원인정보&nbsp;&nbsp;
						<button type="button" id="btnCustInit" class="button">초기화</button>
						&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <label
							id="labArsService"></label>
					</div>

					<div class="b_item">
						<div>
							<!-- 
								<button type="button" id="btnCustSearchTest" class="button">검색Test</button>  
								-->
							<button type="button" id="btnCustSearch" class="button">민원인검색</button>
							<button type="button" id="btnCustSaveIns" class="button">추가</button>
							<button type="button" id="btnCustSave" class="button">수정</button>
						</div>
					</div>

					<!-- 고객상담정보 테이블 -->
					<div class="coustom_info">
						<table class="kmain_tbl">
							<tr>
								<td class="line_rt">
								<img src="<c:url value='/resources/images/list_style.png'/>" alt="화살표"/> 민원인명</td>
								<td class="line_b">
									<input type="text" class="text_ol_70"id="tfCustNm" maxlength="167" title="민원인명" />
									<input type="hidden" id="tfCustId" title="민원인ID" />
								</td>
									
								<td class="line_rt2" style="display: none;">
									<img src="<c:url value='/resources/images/list_style.png'/>" alt="화살표" /> 
									민원인구분
								</td>
								<td class="line_b" style="display: none;">
									<select class="select_kmain" id="selCustGbCd" style="width: 82%;" title="민원인구분"></select>
								</td>
								
								<td class="line_rt3">
									<img src="<c:url value='/resources/images/list_style.png'/>" alt="화살표" /> 
									민원인성향
								</td>
								<td class="line_b">
									<input type=text id="tfCustCstCompNm" class="text_ol_70" disabled title="민원인성향" /> 
									<input type=hidden id="tfCustCstComp" value="" title="민원인성향코드" />
									<!-- <select class="select_kmain" id="selCustCstComp" disabled ></select> -->
								</td>
								
								<td class="line_rt3" rowspan="1">
									<img src="<c:url value='/resources/images/list_style.png'/>"alt="화살표" /> 
									메모
								</td>
								<td class="line_b" rowspan="4">
									<textarea class="area_ol" style="width: 100%; height: 85px;" id="tfCustMemo" title="메모"></textarea>
								</td>
							</tr>
							<tr>
								<td class="line_rt">
									<img src="<c:url value='/resources/images/list_style.png'/>" alt="화살표" /> 
									핸드폰번호
								</td>
								<td class="line_b"><input type="text" class="text_ol_70" id="tfCustCelPhoneNum" maxlength="20" title="핸드폰번호"> 
									<img id="imgMainCellPhoneNum" style="cursor: pointer;" src="<c:url value='/resources/images/btn_cphone.gif'/>" alt="전화기" class="icon_cal2" />
								</td>
								<td class="line_rt2">
									<img src="<c:url value='/resources/images/list_style.png'/>" alt="화살표" /> 
									<label id="labMainCustPhoneNum">전화번호</label>
								</td>
								<td class="line_b"><input type="text" class="text_ol_70" id="tfCustPhoneNum" maxlength="20" title="전화번호"> 
									<img id="imgMainPhoneNum" src="<c:url value='/resources/images/btn_cphone.gif'/>" alt="전화기" class="icon_cal2" style="cursor: pointer;" />
								</td>
								<%-- <td class="line_rt3" rowspan="3"><img
									src="<c:url value='/resources/images/list_style.png'/>"
									alt="화살표"> 메모</td>
								<td class="line_b" rowspan="3"><textarea class="area_ol"
										style="width: 100%; height: 60px;" id="tfCustMemo"></textarea>
								</td> --%>
							</tr>
							<tr>
								<%-- <td class="line_rt">
									<img src="<c:url value='/resources/images/list_style.png'/>"alt="화살표"> 위치동의
								</td>
								<td class="line_b">
									<label id="labLocationInformAgree"></label>
									<button type="button" id="btnRequestAgree" class="button_2">ARS위치검색동의</button>
									&nbsp;
									<button type="button" id="btnMap" class="button_2">지도</button>
									<input type="hidden" id="hidMainSsNumber" value="" />&nbsp;
									<button type="button" id="btnAuthCust" class="button">주민번호</button>
								</td> --%>
								<td class="line_rt2">
									<img src="<c:url value='/resources/images/list_style.png'/>" alt="화살표" /> 
									FAX
								</td>
								<td class="line_b">
									<input type="text" class="text_ol_70"id="tfCustFaxNum" maxlength="20" title="FAX" /> <!-- 20170814 -->
									<img id="imgCustFaxNum" src="<c:url value='/resources/images/btn_cphone.gif'/>" alt="전화기" class="icon_cal2" style="cursor: pointer;" />
								</td>
							</tr>
							<tr>
								<td class="line_rt">
									<img src="<c:url value='/resources/images/list_style.png'/>" alt="화살표" /> 
									동의일시
								</td>
								<td class="line_b">
									<label id="labPersonInformAgree"></label>
								</td>
								<td class="line_rt2">
									<img src="<c:url value='/resources/images/list_style.png'/>" alt="화살표" /> 
									수신동의
								</td>
								<td class="line_b" style="padding-right:5px;">
									<input type="checkbox" id="chkAll" class="checkbox" alt="전체">
									<label id="labCheckAllText" for="chkAll" style="font-size: 9pt;">전체</label>
									<input type="checkbox" id="chkPhone" class="checkbox" alt="전화">
									<label id="labCheckPhoneText" for="chkPhone" style="font-size: 9pt;">전화</label>
									<input type="checkbox" id="chkSMS" class="checkbox" alt="SMS">
									<label id="labCheckSMSText" for="chkSMS" style="font-size: 9pt;">SMS</label>
									<input type="checkbox" id="chkFAX" class="checkbox" alt="FAX">
									<label id="labCheckFAX" for="chkFAX" style="font-size: 9pt;">거부</label>
									<input type="hidden" id="hidMainSsNumber" value="" alt="번호" />
								</td>
							</tr>

						</table>
					</div>
					<!-- 민원 상담정보 테이블 끝 -->