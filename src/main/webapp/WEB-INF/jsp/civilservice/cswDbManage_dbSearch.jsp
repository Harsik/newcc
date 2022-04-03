<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script type="text/javascript" src="<c:url value='/resources/js/civilservice/cswDbManage_dbSearch.js'/>"></script>

<table style="background-color: #e5e5e5; border: 1px solid #c5c5c5; width: 100%; height: 60px; margin-bottom: 5px;">
	<tr>
		<th style="width: 7%">상담유형</th>
		<td style="width: 50%">
			<input type="text" id="cswDb_dbSrchTfLgMdSmSearch_01" class="text_ol" placeholder="상담유형 소분류 검색어를 입력해 주세요!" style="width: 250px; background-color:#d9f2ff;" >
			<select id="cswDb_dbSrchCounselKnd1" class="select_bl" style="width: 13%;"></select>
			<select id="cswDb_dbSrchCounselKnd2" class="select_bl" style="width: 13%;"></select>
			<select id="cswDb_dbSrchCounselKnd3" class="select_bl" style="width: 37%;"></select>
			
		<input type="checkbox" id="cswDb_checkNotInOrg" style="margin-left:30px;">
		<label id="cswDb_NotInOrg" style="font-weight:bold;">변경부서</label>
		</td>
		
		<!-- <th style="width: 4%;">구분</th>
		<td style="width: 7%;">
			<select id="cswDb_dbSrchOptCdbKnd" class="select_bl" style="width: 100%;">
				<option value="all" selected="selected">전체</option>
				<option value="040101">상담DB</option>
				<option value="040102">참고DB</option>
				<option value="040103">기타</option>
			</select>
		</td> -->
		<td class="btn" style="width: 11%; padding-left: 50px;">
			<button type="button" id="cswDb_dbSrchbtnJisikSearch"  class="button">조회</button>
			<button type="button" id="cswDb_dbSrchbtnJisikInit"  class="button">초기화</button>
			<button type="button" id="cswDb_dbSrchbtnJisikExcel"  class="button">엑셀다운</button>
		</td>
	</tr>
	
	<tr>
		<th style="width: 4%;">검색</th>
		<td style="width: 20%;">
			<select id="cswDb_dbSrchTfSrchType" class="select_bl_my" style="width: 107px;">
				<option value="all">전체</option>
				<option value="ttl">제목</option>
				<option value="cntn">내용</option>
				<option value="ttlCntn">제목+내용</option>
				<option value="cntrNm">부서명</option>
				<option value="rspn">담당자명</option>
			</select>
			<input type="text" id="cswDb_dbSrchTfSrchVal" class="text_ol" style="width: 324px; "/>
		</td>
		<td>		
			<button type="button" id="cswDb_chargerJobBtnDbNew" class="button" style="display: block;float:right;margin-bottom:3px; margin-right:65px;">DB신규등록</button>
		</td>
		
		<!-- <th style="width: 6%;">승인구분</th>
		<td style="width: 7%;">
			<select id="cswDb_dbSrchChkNotUsetype" class="select_bl" style="width: 100%;">
				<option value="all">전체</option>
				<option value="Y">승인</option>
				<option value="N">미승인</option>
			</select>
		</td> -->
	</tr>
</table>
<div id="cswDb_divCh" style="margin:5px 0px 5px 0px;">
			<label id="cswDb_dept" style="font-weight:bold;">선택부서</label>
			<textarea class="area_ol" id="cswDb_txtDept" style="width:25%; height:30px;"></textarea>
			<label id="cswDb_charger" style="font-weight:bold;">선택담당자</label>
			<textarea class="area_ol" id="cswDb_txtCharger" style="width:25%; height:30px;"></textarea>
			<label id="cswDb_telNo" style="font-weight:bold;">선택전화번호</label>
			<textarea class="area_ol" id="cswDb_txttelNo" style="width:25%; height:30px;"></textarea>
			<button id="cswDb_changeDeptCharger" class="button">일괄변경</button>
			</div>
<div id="aaa" style="width: 100%;">				
	<table id="cswDb_dbSrchTblJisikSearch"></table>
	<div id="cswDb_dbSrchPgJisikSearch"></div>
</div>			
