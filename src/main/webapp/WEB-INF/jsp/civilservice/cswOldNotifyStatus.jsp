<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="<c:url value='/resources/js/civilservice/cswOldNotifyStatus.js'/>"></script>

<!-- 상단검색  -->
<div id="search">
	<table class="search_tbl">
		<tr>
			<th style="width: 60px;">등록일자</th>
			<td colspan="2" style="width: 246px;">
				<input type="text" class="text_Date" id="csodst_oldStatusFrDate" maxlength="10" style="pointer-events: none;">
				 ~ <input type="text" class="text_Date" id="csodst_oldStatusToDate" maxlength="10" style="pointer-events: none;">
			 </td>
              <td style="width: 200px;">
                <input type="text" id="csodst_oldStatusOrgVal" class="text_ol" placeholder=" 기관/부서명을 입력해주세요!">
              </td>
              <td style="width: 430px; text-align: center" >
                <p style="color: red; font-weight: bold;">※ 날짜를 변경하세요.(2018.01.03 이전까지 조회가능)</p>
              </td> 
			<td>
				<div class="btn" style="display: inline-block; float: right;">
					<button id="csodst_oldStatusSearch" class="button">조회</button>
					<button id="csodst_oldStatusExcel" class="button">엑셀다운</button>
				</div>
			</td>
		</tr>
	</table>
</div>

<!-- 그리드 -->
<div style="margin-bottom: 15px; clear: both;">
	<table id="csodst_oldStatusGrid"></table>
	<div id="csodst_pgOldStatusGrid"></div>
</div>
