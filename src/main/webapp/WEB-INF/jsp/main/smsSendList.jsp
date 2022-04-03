<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript" src="<c:url value='/resources/js/lib/dext5editor/js/dext5editor.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/main/smsSendList.js'/>"></script>
<!-- 조회/검색 -->
<div id="search_smsSandList">
	<table summary="SMS발송목록" class="search_tbl">
		<tr>
			<th scope="row" style="width: 4%;">기간</th>
			<td style="width: 7%;">
				<select class="select_al" id="selSrchDateType" style="height: 21px; width:60px; margin-top: 2px;" title="종류">
					<option value="req" selected="selected">요청일</option>
					<option value="resv">예약일</option>
				</select>
			</td>
			<td style="width: 25%;">
				<input type="text" class="text_Date" id="tfSrchDate" readonly="readonly" alt="시작날짜" title="시작날짜"/>
				<span>~</span>
				<input type="text" class="text_Date" id="tfSrchDateEn" readonly="readonly" alt="종료날짜" title="종료날짜"/>
			</td>
			<th scope="row" style="width: 50px;">처리상태</th>
			<td style="width: 9%;">
				<select class="select_al" id="selSrchActStCd" title="처리상태">
					<option value="all">전체</option>
					<option value="req">전송 대기중</option>
					<option value="complete">성공</option>
					<option value="fail">실패</option>
				</select>
			</td>
			<th scope="row" style="width: 6%;">상담사</th>
			<td style="width: 8%;">
				<select class="select_al" id="selSrchUsr" title="상담사명">
					<option value="all">전체</option>
			</select>
			</td>
			<td style="width: 8%;">
				<select class="select_al" id="selSrchtype" title="검색조건">
					<option value="cntct_infm">수신번호</option>
					<option value="cntct_infm_cont">내용</option>
				</select>
			</td>
			<td style="width: 7%;">
				<input type="text" class="text_ol" id="tfSrchVal" style="height: 18px; width:115px; margin-bottom: 2px;" alt="검색어" title="검색어">
			</td>			
			
			<td class="btn" style="float: right;">
				<button type="button" id="btnSearch" class="button">조회</button>
				<button type="button" id="btnInit" class="button">초기화</button>
			</td>
		</tr>
	</table>
</div>
<!--"조회/검색"-->


<br />
<!-- SMS 발신 시작 -->
<div>
	<div id="grid_all">
		<!-- 그리드테이블 -->
		<table style="width: 100%; height: 318px; background-image: url('./img/sam.gif');">
			<tr>
				<td>
					<table id="tblSmsSendList"></table>
					<div id="pagingSmsSendList"></div>
				</td>
			</tr>
		</table>
		<!--"그리드테이블"-->
	</div>
	<div style="margin-top: 30px; background: #e6ebf6; padding: 15px 6px; border: 1px solid #dddddd; border-radius: 5px; height: 345px;">
		<!-- SMS 정보테이블 -->
		<table summary="SMS 정보" class="profile_tbl">
			<colgroup>
				<col  width="5%"/>
				<col  width="8%"/>
				<col  width="5%"/>
				<col />
			</colgroup>
			<tbody>
				<tr>
					<th scope="row" class="line_rt">발신자</th>
					<td class="line_b" ><label id="labSpecUsrNm"></label></td>
					<th scope="row" class="line_c" rowspan="9">전송메세지<br />
						<label id="labSpecCountTxtNum"></label> byte
					</th>
					<td class="line_b" rowspan="9">
						<textarea rows="1" cols="1" style="width: 100%; height: 95%;" id="tfSpecSndCont" title="전송메시지" readonly></textarea>
					</td>
				</tr>
				<tr>
					<th scope="row" class="line_rt">고객명</th>
					<td class="line_b" ><label id="labSpecCustNm"></label></td>
				</tr>
				<tr>
					<th scope="row" class="line_rt">발신자번호</th>
					<td class="line_b" ><label id="labSpecSendFrom"></label></td>
				</tr>
				<tr>
					<th scope="row" class="line_rt">수신자번호</th>
					<td class="line_b" ><label id="tfSpecChCntctInfm"></label></td>
				</tr>
				<tr>
					<th scope="row" class="line_rt">요청일시</th>
					<td class="line_b" ><label id="labSpecSndReqDtm"></label></td>
				</tr>
				<tr>
					<th scope="row" class="line_rt">예약일시</th>
					<td class="line_b" ><label id="tfSpecSndResvDtm"></label></td>
				</tr>
				<tr>
					<th scope="row" class="line_rt">발신일시</th>
					<td class="line_b" ><label id="labSpecSndEndDtm"></label></td>
				</tr>
				<tr>
					<th scope="row" class="line_rt">발신결과</th>
					<td class="line_b" ><label id="labSpecSndRsltNm"></label></td>
				</tr>
				<tr style="height: 70px;">
					<th scope="row" class="line_rt">이미지첨부</th>
					<td class="line_b" ><table id="smsFileInfos" style="width:100%; margin-left: 1px; margin-right: 6px;"></table></td>
				</tr>
			</tbody>
		</table>
	</div>
	<!-- SMS 발신 종료  -->
</div>
