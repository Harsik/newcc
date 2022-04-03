<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="<c:url value='/resources/js/main/jisikSearch.js'/>"></script>
<div>
	<table summary="지식검색" style="background-color: #e5e5e5; border: 1px solid #c5c5c5; width: 100%; height: 45px; margin-bottom: 20px;">
		<tr>
			<th scope="row" style="width: 4%;">검색</th>
			<td style="width: 25%;">
				<select id="tfSrchType" class="select_bl_my" style="width: 80px;" title="검색종류">
					<option value="ttl">제목</option>
					<option value="cntn">내용</option>
					<option value="ttlCntn">제목+내용</option>
				</select>
				<input type="text" id="tfSrchVal" class="text_ol" style="width: 112px; " alt="검색어" title="검색어"/>
			</td>
			<th scope="row" style="width: 3%; text-align: right;">구분</th>
			<td style="width: 7%;"><select id="optCdbKnd" class="select_bl" style="width: 100%;" title=""></select></td>
			<th scope="row" style="width: 6%; text-align: right;">상담유형</th>
			<td style="width: 40%">
				<select id="optCounselKnd1" class="select_bl" style="width: 40%;" title="대분류"></select>
				<select id="optCounselKnd2" class="select_bl" style="width: 30%;" title="중분류"></select>
				<select id="optCounselKnd3" class="select_bl" style="width: 25%;" title="소분류"></select>
				<!--<select id="optCounselKnd4" class="select_bl" style="width: 23%;"></select>-->
			</td>
			<td class="btn" style="width: 10%;">
				<button type="button" id="btnJisikSearch"  class="button">조회</button>
				<button type="button" id="btnJisikInit"  class="button">초기화</button>
			</td>
		</tr>
	</table>
	<div style="width: 100%;">				
		<table id="tblJisikSearch"></table>
		<div id="pgJisikSearch"></div>
	</div>
</div>

	
