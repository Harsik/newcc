<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="<c:url value='/resources/js/myinfo/jisikRewordManageHis.js'/>"></script>

	<table class="reword_search">
		<colgroup>
			<col style="width: 200px;">
			<col style="width: 100px;">
			<col style="width: 90px;">
			<col style="width: 120px;">
		</colgroup>
		<tr>
			<td>
				<label>요청일자</label>
				<input type="text" id="jskRwMngH_selFrDate" class="text_ol_half" readonly="readonly" style="width: 70px;" maxlength="16"/> ~
				<input type="text" id="jskRwMngH_selToDate" class="text_ol_half" readonly="readonly" style="width: 70px;" maxlength="16"/>
			</td>
			<td>
				<label>요청자</label>
				<select id="jskRwMngH_selJisikCounselNm"  class="select_bl"  style="width: 90px;"></select>
			</td>
			<td>
				<label>&nbsp;&nbsp;구&nbsp;&nbsp;분</label>
				<select id="jskRwMngH_optGbKnd_his" class="select_bl" style="width :70px;"></select>
			</td>
			<td>
				<button class="button" id="jskRwMngH_btnCommentSearch" style="margin-left: 2px;">검색</button>
				<button class="button" id="jskRwMngH_btnCommentInit" style="margin-left: 2px;">초기화</button>
				<button class="button" id="jskRwMngH_btnExcel" style="margin-left: 2px;">엑셀다운</button>
			</td>
		</tr>
		<tr>
			<td colspan="3">
				<label>상담유형</label>
				<select class="select_bl" id="jskRwMngH_commentCounselKnd1" style="width: 18%;"></select>
				<select class="select_bl" id="jskRwMngH_commentCounselKnd2" style="width: 19%;"></select>
				<select class="select_bl" id="jskRwMngH_commentCounselKnd3" style="width: 20%;"></select>
				<%--<select class="select_bl" id="commentCounselKnd4" style="width: 161px;"></select>--%>
			</td>
			<td>
				<label>진행상태</label>
				<select id="jskRwMngH_progKndCd1"  class="select_bl"  style="width: 101px;" ></select>
			</td>
	
		</tr>
	</table>
	<div>
		<table id="jskRwMngH_tblComments" class="comment_text"></table>
		<div id="jskRwMngH_pgTblComments"></div>
	</div>


<div class="reword_detail">
	<div class="stitle">
		수정요청 상세
	</div>
	<div class="btn">
		<button  type="button" id="jskRwMngH_btnSave" class="button">처리</button>
		<button  type="button" id="jskRwMngH_btnUpdate" class="button">수정</button>
	</div>
	<form id="jskRwMngH_writeHisForm" name="jskRwMngH_writeHisForm" action="/ajax/myinfo/jisikRewordHis.do" method="post">
		<input type="hidden" id="jskRwMngH_infosCommId"/>
		<table class="profile_tbl">
			<colgroup>
				<col style="width : 5%">			
				<col style="width : 5%">			
				<col style="width : 5%">			
				<col style="width : 5%">			
				<col style="width : 5%">			
				<col style="width : 5%">			
				<col style="width : 5%">			
				<col style="width : 5%">			
			</colgroup>
			<tr>
				<th class="line_rt">상담유형</th>
				<td class="line_b" colspan="3"  style="width: 480px;">
					<select class="select_bl" id="jskRwMngH_infosCounselKnd1" style="width: 25%;" disabled="disabled"></select>
					<select class="select_bl" id="jskRwMngH_infosCounselKnd2" style="width: 25%;" disabled="disabled"></select>
					<select class="select_bl" id="jskRwMngH_infosCounselKnd3" style="width: 45%;" disabled="disabled"></select>
					<%--<select class="select_bl" id="infosCounselKnd4" style="width: 26%;" disabled="disabled"></select>--%>
				</td> 
				<th class="line_c">구분</th>													
				<td class="line_b"><select id="jskRwMngH_infosGbKnd" disabled="disabled" style="width: 79px;"></select></td>
				<th class="line_c">진행상태</th>													
				<td class="line_b"><select id="jskRwMngH_progKndCd" disabled="disabled" style="width: 85px;"></select></td>
			</tr>
			<tr>
				<th class="line_rt">제목</th>													
				<td class="line_b" colspan="5"><input class="text_ol" id="jskRwMngH_infosCommTtl"/></td>
				<th class="line_c">요청구분</th>													
				<td class="line_b">
				<select  class="select_bl" id="jskRwMngH_infosCommNew" disabled="disabled" style="width: 85px;">
					<option value="all" selected="selected">요청구분</option>
					<option value="Y">신규</option>
					<option value="N">수정</option>
					<option value="D">삭제</option>
				</select></td>
			</tr>
			<tr>
				<th class="line_rt">요청내용</th>													
				<td class="line_b" colspan="7" id="jskRwMngH_infosCommCntn" ></td>
			</tr>
			<tr>
				<th class="line_rt">처리내용</th>													
				<td class="line_b" colspan="7"><textarea class="text_ol" id="jskRwMngH_infosRespCntn" style="width: 645px; height: 90px; margin-left: 0px;"  readonly="readonly"></textarea></td>
			</tr>
			<tr>
				<th class="line_rt">요청자</th>													
				<td class="line_b" id="jskRwMngH_infosCrtUsrNm"></td>
				<th class="line_c" style="width: 30px;">요청일자</th>													
				<td class="line_b" id="jskRwMngH_infosCrtDt"></td>
				<th class="line_c">처리자</th>													
				<td class="line_b" id="jskRwMngH_infosModUsrNm"></td>
				<th class="line_c" >처리일자</th>													
				<td class="line_b" id="jskRwMngH_infosModDt"></td>
			</tr>
			<tr>
				<th class="line_rt">첨부</th>
				<td class="line_b" colspan="7" style="height: 81px; vertical-align:top;">
					<table id="jskRwMngH_hisFileInfos" style="width: 100%;">
					<!-- <tr>
						<td colspan="4">
							<input type="hidden" name="record_XXX" value="" />
							<input type="file" id="HISMANUAL" name="MANUAL" style="width: 80%;"/>
						</td>
						<td>
							<img src="/resources/images/btn_del.png"  alt="삭제" class="icon_add"  id="jskRwMngH_rmHisFilebox" style="cursor: pointer;"  />
							<img src="/resources/images/btn_fileadd.png" onClick="addHisFileBox()" alt="파일폼추가" class="icon_add" style="cursor: pointer;"/>
						</td>
					</tr> -->
					</table>
				</td>
			</tr>
		</table>
	</form>
</div>

<table id="jskRwMngH_hisfileadd" style="display:none">
	<tr>
		<td colspan="4">
			<input type="hidden" name="record_XXX" value="" />
			<input type="file" id="HISMANUAL" name="HISMANUAL" style="width: 80%;"/>
		</td>
		<td>
			<img src="/resources/images/btn_del.png" onClick="removeHisFileBox(XXX)" class="icon_add" style="cursor: pointer;" alt="취소" />
		</td>
	</tr>
</table>