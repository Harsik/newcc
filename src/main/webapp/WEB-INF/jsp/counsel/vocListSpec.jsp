<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
<!--왼쪽그리드-->
<div id="code_left">
	<div class="stitle" style="margin-top: 13px;">VOC접수내용</div>

	<table class="profile_tbl">
		<tr>
			<td class="line_rt">이관구분</td>
			<td class="line_b">
				<!-- <label id="vocSpec1"></label> -->
				<input type="radio" class="radio" name="vocSpec1" id="vocSpec1_y" value="N" checked="checked"><label for="vocSpec1_y">일반</label>
				<input type="radio" name="vocSpec1" id="vocSpec1_n" value="Y"><label for="vocSpec1_n">긴급</label>
			</td>
			<td class="line_rt">민원구분</td>
			<td class="line_b">
				<select class="select_al" id = vocSpec2></select>
			</td>
		</tr>
		<tr>
			<td class="line_rt">시스템구분</td>
			<td class="line_b">
				<select class="select_al" id = "vocSpec3"></select>
			</td>
			<td class="line_rt">오류유형</td>
			<td class="line_b">
				<select class="select_al" id = "vocSpec4"></select>
			</td>
		</tr>
		<tr>
			<td class="line_rt">제목</td>
			<td class="line_b" colspan="3">
				<input type="text" class="text_ol" id="vocSpec5" maxlength="167">
			</td>
		</tr>
		<tr>
			<td class="line_rt" rowspan="3">접수내용</td>
			<td class="line_b" rowspan="3" colspan="3">
				<textarea class="area_ol" style="height:90%;" rows="6" id = "vocSpec6" maxlength="667"></textarea>
			</td>
		</tr>
		<tr></tr><tr></tr>
		<tr>
			<td class="line_r">첨부파일</td>
			<td class="line_b" colspan="3" id="vocFile"></td>
		</tr>
	</table>
	
	<div class="stitle" style="margin-top: 13px;">VOC이관 및 고객통보</div>
	<table class="profile_tbl">
		<tr>
			<td class="line_rt">이관대상</td>
			<td class="line_b" colspan="2">
				<select class="select_al" id = "vocSpec8" style="width: 35%;"></select>
				<select class="select_al" id = "vocSpec8_1" style="width: 30%;"></select>
				<button type="button" id="btnTransfer" class="button">이관</button>
			</td>
		</tr>
		<tr>
			<td class="line_rt" style="width: 40%">처리결과 고객통보</td>
			<td class="line_b">
				<select class="select_al" id = "vocSpec9"></select>
			</td>
			<td class="line_b btn">
				<button type="button" id="resultAlarm" class="button">저장</button>
			</td>
		</tr>
	</table>
</div>
<!--"왼쪽그리드"-->

<!--오른쪽그리드-->
<div id="code_right" style="top:530px;">
	<div class="stitle">VOC처리이력</div>
	<table class="profile_tbl">
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
			<td class="line_b" style="background-color: white;">
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
	
	<div class="stitle" style="margin-top: 13px;">VOC처리결과 등록</div>
	<table class="profile_tbl">
		<tr>
			<td class="line_rt">이관부서</td>
			<td class="line_b">
				<select class="select_al" id = "vocSpec10"></select>
			</td>
			<td class="line_c">처리담당자</td>
			<td class="line_b">
				<select class="select_al" id = "vocSpec11" name="vocSpec11"></select>
			</td>
		</tr>
		<tr>
			<td class="line_rt" rowspan="3">처리내용</td>
			<td class="line_b" rowspan="3" colspan="3">
				<textarea class="area_ol" style="height:90%;" id = "vocSpec12" maxlength="667"></textarea>
			</td>
		</tr>
		<tr>
		</tr>
		<tr>
		</tr>
		<tr>
			<td class="line_rt">처리결과</td>
			<td class="line_b">
				<select class="select_al" id = "vocSpec13" name="vocSpec13"></select>
			</td>
			<td class="line_rt">처리기한</td>
			<td class="line_b">
				<input type="text" class="text_ol" id="limitTime" maxlength="10" style="width: 80%;">
			</td>
		</tr>
		<tr>
			<td class="line_rt">고객통보</td>
			<td class="line_b">
				<input type="radio" class="radio" name="customAlam" id="customAlam_y" value="Y" checked="checked"><label for="customAlam_y">필요</label>
				<input type="radio" name="customAlam" id="customAlam_n" value="N"><label for="customAlam_n">불필요</label>
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