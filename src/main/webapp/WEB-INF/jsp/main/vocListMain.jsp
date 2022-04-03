<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="<c:url value='/resources/js/counsel/vocList.js'/>"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
	<div style="overflow-x: hidden; overflow-y: scroll; height: 100%; width: 100%;">
		<input type="hidden" id="vocHiddenId">
		<input type="hidden" id="noticeYn">
		<input type="hidden" id="resultCode">
		<div id="search2" style="width: 99%;">
			<table class="search2_tbl" style="margin-left: -20px;">
				<tr>
					<th>접수일</th>
					<td class="sel_left" colspan="3">
						<input type="text" class="text_ol_half" id="vocFrDate" maxlength="16" alt="시작일자" title="시작일자"> ~ <input type="text" class="text_ol_half" id="vocToDate" maxlength="16" alt="종료일자" title="종료일자">
					</td>
					<td class="line_b" colspan="2" style="width: 18%">
						<input type="radio" class="radio" name="vocCodetype_term" id="rdCodetype_t" value="today" checked="checked" alt="당일"><label for="rdCodetype_t">당일</label>
						<input type="radio" name="vocCodetype_term" id="rdCodetype_w" value="week" alt="1주일"><label for="rdCodetype_w">1주일</label>
						<input type="radio" name="vocCodetype_term" id="rdCodetype_m" value="month" alt="1개월"><label for="rdCodetype_m">1개월</label>
					</td>
					<th>처리결과</th>
					<td class="line_b">
						<select class="select_al" id = "vocSrchType1" title="처리결과"></select>
					</td>
					<th>이관구분</th>
					<td class="line_b">
						<select class="select_al" id = "vocSrchType2" title="이관구분">
							<option value="all">전체</option>
							<option value="N">일반</option>
							<option value="Y">긴급</option>
						</select>
					</td>
					<td class="btn">
						<button type="button" id="vocbtnSearch" name="vocbtnSearch" class="button">조회</button>
					</td>
				</tr> 
				<tr>
					<th>검색</th>
					<td class="sel_80">
						<select class="select_al" id = "vocSrchType3" title="검색조건">
							<option value="all">전체</option>
							<option value="usrNm">회사/부서</option>
							<option value="usrNm2">접수자</option>
							<option value="usrNm3">담당자</option>
						</select>
					</td>
					<td class="nemo_50" style="width: 30%" colspan="2">
            			<input type="text" class="text_ol" id="vocSrchval" maxlength="20" alt="검색어" title="검색어">
          			</td>
					<th style="">시스템구분</th>
					<td class="line_b">
						<select class="select_al" id = "vocSrchType4" title="시스템구분"></select>
					</td>
					<th>오류유형</th>
					<td class="line_b">
						<select class="select_al" id = "vocSrchType5" title="오류유형"></select>
					</td>
					<th>민원구분</th>
					<td class="line_b">
						<select class="select_al" id = "vocSrchType6" title="민원구분"></select>
					</td>
					<td class="btn">
						<button type="button" id="vocbtnInit" name="vocbtnInit" class="button">초기화</button>
					</td>
				</tr>
			</table>
		</div>
		<!--"조회/검색"-->

    	<!--그리드-->
		<div id="grid_tbl">
			<!-- 미사용/버튼 테이블 -->
			<table class="info_tbl">
				<tr>			
					<td>
						<!-- <button type="button" id="btnExcelPopup"  class="button">엑셀저장</button> -->
					</td>
				</tr>
			</table>
			<!--"미사용/버튼 테이블"-->		
			<!-- 그리드테이블 -->
			<table id="vocListR"></table>
			<div id="pgVocListR"></div>
			<!--"그리드테이블"-->
     	</div><!--"그리드"-->
   	 	<!--그리드-->
			
	<!--왼쪽그리드-->
	<div id="code_left">
		<div class="stitle" style="margin-top: 13px;">VOC접수내용</div>
		<table class="profile_tbl">
			<tr>
				<td class="line_rt">이관구분</td>
				<td class="line_b">
					<input type="radio" class="radio" name="vocSpec1" id="vocSpec1_y" value="N" checked="checked" alt="일반"><label for="vocSpec1_y">일반</label>
					<input type="radio" name="vocSpec1" id="vocSpec1_n" value="Y" alt="긴급"><label for="vocSpec1_n">긴급</label>
				</td>
				<td class="line_rt">민원구분</td>
				<td class="line_b">
					<select class="select_al" id = vocSpec2 title="민원구분"></select>
				</td>
			</tr>
			<tr>
				<td class="line_rt">시스템구분</td>
				<td class="line_b">
					<select class="select_al" id = "vocSpec3" title="시스템구분"></select>
				</td>
				<td class="line_rt">오류유형</td>
				<td class="line_b">
					<select class="select_al" id = "vocSpec4" title="오류유형"></select>
				</td>
			</tr>
			<tr>
				<td class="line_rt">제목</td>
				<td class="line_b" colspan="3">
					<input type="text" class="text_ol" id="vocSpec5" maxlength="200" alt="제목" title="제목">
				</td>
			</tr>
			<tr>
				<td class="line_rt" rowspan="3">접수내용</td>
				<td class="line_b" rowspan="3" colspan="3">
					<textarea class="area_ol" style="height:90%;" rows="6" id = "vocSpec6" maxlength="667" title="접수내용"></textarea>
				</td>
			</tr>
			<tr></tr><tr></tr>
			<tr>
				<td class="line_r">첨부파일</td>
				<td class="line_b" colspan="3" id="vocFile"></td>
			</tr>
		</table>
	
		<table class="profile_tbl">
		<div class="stitle" style="margin-top: 13px;">VOC이관 및 고객통보</div>
			<tr>
				<td class="line_rt">이관대상</td>
				<td class="line_b" colspan="2">
					<select class="select_al" id = "vocSpec8" style="width: 35%;" title="이관대상1"></select>
					<select class="select_al" id = "vocSpec8_1" style="width: 30%;" title="이관대상2"></select>
					<button type="button" id="btnTransfer" class="button">이관</button>
				</td>
			</tr>
			<tr>
				<td class="line_rt" style="width: 40%">처리결과 고객통보</td>
				<td class="line_b">
					<select class="select_al" id = "vocSpec9" title="처리결과 고객통보"></select>
				</td>
				<td class="line_b btn">
					<button type="button" id="resultAlarm"  class="button">저장</button>
				</td>
			</tr>
		</table>
	</div>
	<!--"왼쪽그리드"-->

	<!--오른쪽그리드-->
	<div id="code_right" style="top:459px; margin-left: -16px;">
		<table class="profile_tbl">
		<div class="stitle">VOC처리이력</div>
			<tr>
				<td class="line_rt" style="background-color: #E4F2FB ">처리결과</td>
				<td class="line_rt" style="background-color: #E4F2FB ">일자</td>
				<td class="line_rt" style="background-color: #E4F2FB ">이관부서</td>
				<td class="line_rt" style="background-color: #E4F2FB ">처리담당자</td>
				<td class="line_rt" style="background-color: #E4F2FB; border-right: 1px #98a5b3;">처리기한</td>
			</tr>
			<tr>
				<td class="line_r" style="background-color: white;">
					<div><label id = "receipt"></label>접수</div>
				</td>
				<td class="line_r" style="background-color: white;">
					<div><label id = "receipt1"></label></div>
				</td>
				<td class="line_r" style="background-color: white;">
					<div><label id = "receipt2"></label></div>
				</td>
				<td class="line_r" style="background-color: white;">
					<div><label id = "receipt3"></label></div>
				</td>
				<td class="line_r" style="background-color: white; border-right: 1px #98a5b3;">
					<div><label id = "receipt4"></label></div>
				</td>
			</tr>
			<tr>
				<td class="line_r" style="background-color: white;">
					<div><label id = "handle"></label>처리중</div>
				</td>
				<td class="line_r" style="background-color: white;">
					<div><label id = "handle1"></label></div>
				</td>
				<td class="line_r" style="background-color: white;">
					<div><label id = "handle2"></label></div>
				</td>
				<td class="line_r" style="background-color: white;">
					<div><label id = "handle3"></label></div>
				</td>
				<td class="line_r" style="background-color: white; border-right: 1px #98a5b3;">
					<div><label id = "handle4"></label></div>
				</td>
			</tr>
			<tr id="complete">
				<td class="line_r" style="background-color: white;">
					<div><label id = "complete"></label>완료</div>
				</td>
				<td class="line_r" style="background-color: white;">
					<div><label id = "complete1"></label></div>
				</td>
				<td class="line_r" style="background-color: white;">
					<div><label id = "complete2"></label></div>
				</td>
				<td class="line_r" style="background-color: white;">
					<div><label id = "complete3"></label></div>
				</td>
				<td class="line_r" style="background-color: white; border-right: 1px #98a5b3;">
					<div><label id = "complete4"></label></div>
				</td>
			</tr>
		</table>
	
		<table class="profile_tbl">
		<div class="stitle" style="margin-top: 33px;">VOC처리결과</div>
			<tr>
				<td class="line_rt">이관부서</td>
				<td class="line_b">
					<select class="select_al" id = "vocSpec10" title="이관부서"></select>
				</td>
				<td class="line_c">처리담당자</td>
				<td class="line_b">
					<select class="select_al" id = "vocSpec11" name="vocSpec11" title="처리담당자"></select>
				</td>
			</tr>
			<tr>
				<td class="line_rt" rowspan="3">처리내용</td>
				<td class="line_b" rowspan="3" colspan="3">
					<textarea class="area_ol" style="height:90%;" id = "vocSpec12" maxlength="667" title="처리내용"></textarea>
				</td>
			</tr>
			<tr></tr><tr></tr>
			<tr>
				<td class="line_rt">처리결과</td>
				<td class="line_b">
					<select class="select_al" id = "vocSpec13" name="vocSpec13" title="처리결과"></select>
				</td>
				<td class="line_rt">처리기한</td>
				<td class="line_b">
					<input type="text" class="text_ol" id="limitTime" maxlength="10" style="width: 75%;" alt="처리기한" title="처리기한">
				</td>
			</tr>
			<tr>
				<td class="line_rt">고객통보</td>
				<td class="line_b">
					<input type="radio" class="radio" name="customAlam" id="customAlam_y" value="Y" checked="checked" alt="필요"><label for="customAlam_y">필요</label>
					<input type="radio" name="customAlam" id="customAlam_n" value="N" alt="불필요"><label for="customAlam_n">불필요</label>
				</td>
				<td class="line_rt">초과일수</td>
				<td class="line_b" style="background-color: white;">
					<div><label id = "overDay"></label></div>
				</td>
			</tr>
			
		</table>
	
		<table class="info_tbl_btn">
			<tr>
				<td>
					<button type="button" id="handlingInsert" class="button">저장</button>
				</td>
			</tr>
		</table>
	
	</div>
	<!--"오른쪽그리드"-->
</div>