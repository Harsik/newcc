			<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
			<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
			<script type="text/javascript" src="<c:url value='/resources/js/main/counselPackList.js'/>" ></script>
				<div id="search2" style="height: 60px;">
							<table summary="상담이력검색" class="search2_tbl" >
								<tr>
									<th scope="row" style="width: 6%">접수기간</th>
									<td colspan="3" style="text-align:left;width: 25%">
										<input type="text" class="text_Date" id="selFrDate" maxlength="10" alt="시작날짜" title="시작날짜"> ~ <input type="text" class="text_Date" id="selToDate" maxlength="10" alt="종료날짜" title="종료날짜">  
									</td>
									 
									<th scope="row" style="width: 6%" id="searchNm" >상담사</th>
									<td style="width: 15%">
										<select class="select_bl" id="selCounselNm" style="width:10em;" title="상담사"></select>
										<input type="text" class="text_ol" style="width:70px;" id="tfPetitioner" alt="상담사이름" title="상담사이름">
									</td>
									<th scope="row" style="width: 6%">처리유형</th>
									<td style="text-align:left;width:10%;"><select class="select_bl" id="selActTypeCd" style="width:7em;" title="처리유형"></select></td>
									<th scope="row" style="width: 6%">상담결과</th>
									<td><select id="selActStCd" class="select_bl" style="width:5em;" title="상담결과"></select></td>
									<th scope="row"> <button type="button" id="btnSearchCnsl" class="button" style="width:46px;">조회</button></th>
									<td><button type="button" id="btnOptInit" class="button">초기화</button>
									</td>
								</tr>
								<tr id="cnslType">
									<th scope="row" style="width: 6%">상담유형</th>
									<td colspan = "5">
										<input type="hidden" id="selPopupLv" value="CHILD" alt="팝업LV" title="팝업LV"/>
										<select class="select_bl" style="width:9em;" id="selCnslSrchIntvLgCd" title="대분류"></select>
										<select class="select_bl" style="width:9em;" id="selCnslSrchIntvMdCd" title="중분류"></select>
										<select class="select_bl" style="width:40%;" id="selCnslSrchIntvSmCd" title="소분류"></select>
									</td>
									<th scope="row" style="width: 6%">조회항목</th>
									<td>
										<select class="select_al" id="optSrchtype" style="width:6em;" title="조회항목">
											<option value="all">전체</option>
											<option value="custNm">고객명</option>
											<option value="srchPhone">전화번호</option>
											<option value="srchContent">문의/답변</option>
											<option value="srchKeyWord">키워드</option>
										</select>
									</td>
									<td colspan="2">
										<input type="text" class="text_ol" id="tfSrchval" style="width:9em;" alt="검색어" title="검색어">
										<select class="select_bl" style="width:113px;" id="selSrchKeyWordCd" title="검색종류"></select>
									</td>
									 
									<th scope="row" style="width: 6%">통화구분</th>
									<td><select class="select_bl" style="width:5em;" id="selCnslSrchCallGbCd" title="통화구분"></select></td>
								</tr>
							</table>
						</div>
			    		<!--프로그램목록-->
						<div id="item_type">
							<!--미사용포함 오른쪽 버튼이 있을경우-->
							<div style="text-align: right;">
								<label id="labCnslListInOutCnt">IN : 0, OUT : 0</label>&nbsp;&nbsp;&nbsp;
								<button type="button" id="btnExcel"  class="button">엑셀다운</button>
							</div>
						</div>
							<!--그리드부분-->
							<div>
								<div style="margin-top: 5px; display: block;" id="divCounselList">
									<table id="tblCounselList"></table>
									<div id="pgCounselList"></div>
								</div>
								<div style="margin-top: 5px; display: block;" id="divResvCallList">
									<table id="tblResvCallList"></table>
									<div id="pgResvCallList"></div>
								</div>
								<div style="margin-top: 5px; display: block;" id="divCallBackList">
									<table id="tblCallBackList"></table>
									<div id="pgCallBackList"></div>
								</div>
							</div>
			   	 	  		<%@include file="../counsel/comCounselSpec.jsp"%> 

