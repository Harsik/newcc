<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript" src="<c:url value='/resources/js/main/emrgncyInfo.js'/>"></script>
					<div id="search2" style="height: 60px;">
						<table summary="긴급정보검색" class="search2_tbl">
							<tr>
								<th style="width: 7%">접수일자</th>
								<td colspan="3" style="text-align: left; width: 25%;"><input type="text" class="text_Date" id="selEmrgncyStart" maxlength="10" alt="시작날짜" title="시작날짜"> ~ <input type="text" class="text_Date" id="selEmrgncyEnd" maxlength="10" alt="종료날짜" title="종료날짜"></td>
								<th style="width: 7%;">상담유형</th>
								<td colspan="4" style="width: 45%; margin-top:30px;">
								    <select class="select_bl" style="width: 16%;" id="selemSrchIntvCd" title="상담유형">
								         <option value="90000000" disabled>긴급정보</option>
								    </select>&nbsp;
								    <select class="select_bl" style="width: 20%;" id="selemSrchIntvLgCd" title="대분류"></select>&nbsp; 
								    <select class="select_bl" style="width: 20%;" id="selemSrchIntvMdCd" title="중분류"></select>&nbsp;
								   <select class="select_bl" style="width: 30%;" id="selemSrchIntvSmCd" title="소분류"></select>&nbsp;
								</td>
								<td style="width:20%;">
								     <button type="button" id="btnSearchEmr" class="button" style="text-align: right;">조회</button>
								     <button type="button" id="btnemrInit" class="button">초기화</button>
				                     <button type="button" id="btnemrExcel"  class="button">엑셀저장</button>
				                </td>
						   </tr>
			       		<tr id="emrCnslType">
				             <th scope="row" id="searchNm">상담사</th>
				             <td colspan="1">
				                 <select class="select_bl" id="selemrgncylNm" title="상담사이름"></select> 
				             </td>
				             <th scope="row" colspan="1">상담결과</th>
				             <td>
				                 <select id="selEmStCd" class="select_bl" title="상담결과"></select>
				             </td>
				             <th scope="row" colspan="1">신고자</th> 
				             <td>
				                 <input type="text" class="text_ol" id="tfSrchemUsr" style="margin-left: 5px;" alt="신고자" title="신고자">
				             </td>
				              <th scope="row" colspan="1">전화번호</th>
				             <td>
				                 <input type="text" class="text_ol" id="tfSrchemTelNo" style="margin-left: 5px;" alt="전화번호" title="전화번호">
				             </td>
				             <th scope="row" colspan="1">신고내용</th>
				             <td>
				                 <input type="text" class="text_ol" id="tfSrchemSub" style="margin-left: 5px;" alt="신고내용" title="신고내용">
				             </td>
			               </tr>
						</table>
				</div> 
				                <!--프로그램목록-->
                  <div id="item_type" style="margin-bottom: 80px;"></div><!-- "margin-bottom: 100px; -->
                  
                  				<!-- 그리드테이블 -->
				    <div style=" display: block;" id="divemrgncyList">
									<table id="tblemrgncyInfoList"></table>
									<div id="pgEmrgncyList"></div>
					</div>
                  				<!-- 그리드테이블 -->
                  <div id="item_type2" style="margin-bottom: 14px;"></div>
				<div id="counselComTable">
					<table class="profile_tbl">
						<tr>
							<td class="line_rt" id="rcvDtText">접수일시</td>
							<td class="line_b"><label id="rcvDtemr"></label></td>
							<td class="line_c">민원인</td>
							<td class="line_b"><label id="cvplUsr"></label></td>
							<td class="line_c">민원인구분</td>
							<td class="line_b"><label id="cvplSe"></label></td>
							<td class="line_c" id="custCompText">민원인성향</td>
							<td class="line_b"><label id="cvplIncln"></label></td>
						</tr>
						<tr>
							<td class="line_rt">통화구분</td>
							<td class="line_b"><label id="crncySe"></label></td>
							<td class="line_c">통화번호</td>
							<td class="line_b"><label id="crncyNum"></label></td>
							
							<td class="line_c" id="counselText">통화시간</td>
							<td class="line_b"><label id="crncyTime"></label></td>
							<td class="line_c"></td> <!-- 메모 -->
							<td class="line_b"><label id="emrgncyMemo"></label></td>
						</tr>
						<tr>
							<td class="line_rt">처리유형</td>
							<td class="line_b"><label id="emr_CnslType"></label></td>
							<td class="line_c">상담결과</td>
							<td class="line_b"><label id="cnsltResult"></label></td>
							<td class="line_c">등록일시</td>
							<td class="line_b"><label id="emrSaveDt"></label></td>
							<td class="line_c" id="resvTelText">수정일시</td>
							<td class="line_b"><label id="modifyDt"></label></td>
						</tr>
						<tr>
							<td class="line_rt">신고자</td>
							<td class="line_b"><label id="sttemntUsr"></label></td>
							<td class="line_c">전화번호</td>
							<td class="line_b"><label id="emrgncyTelno"></label></td>
							<td class="line_c"></td><!-- 담당부서 -->
							<td class="line_b" colspan="3"><label id="chrgDept"></label></td>
						</tr>	
						<tr>
							<td class="line_c">상담유형</td>
							<td class="line_b" colspan="7"><label id="cnsltType"></label></td>	
						</tr>
						<tr id="counselInfo">
							<td class="line_rt" rowspan="4" style="height: 50px;">접수내용<br/>(신고내용)</td>
							<td class="line_b" rowspan="4" colspan="3">
								<textarea class="area_ol" style="height:90%;" rows="8" id="sttemntCont" title="접수내용(신고내용)"></textarea>
							</td>
							<td class="line_c" rowspan="4">답변내용</td>
							<td class="line_b" rowspan="4" colspan="3">
								<textarea class="area_ol" style="height:90%;" id="answerCont" title="답변내용"></textarea>
							</td>
						</tr>
					</table>
				</div>