<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="<c:url value='/resources/js/civilservice/cswDeptCooperation.js'/>"></script>

<!-- 상단검색  -->
<div id="search">
	<table class="search_tbl">
		<tr>
			<th style="width: 60px;">등록일자</th>
			<td colspan="2" style="width: 246px;">
				<input type="text" class="text_Date" id="csdpcp_deptCooperFrDate" maxlength="10">
				 ~ <input type="text" class="text_Date" id="csdpcp_deptCooperToDate" maxlength="10">
			 </td>
              <td style="width: 200px;">
                <input type="text" id="csdpcp_deptCooperOrgVal" class="text_ol" placeholder="부서명을 입력해주세요!">
	       	    <input id="csdpcp_deptVal" style="display:none;" >
              </td>
              <td style="width: 390px; text-align: center" >
                <p style="color: red; font-weight: bold;">※ 등록일자 범위 외 조회시 날짜를 변경하세요.</p>
              </td> 
			<td>
				<div class="btn" style="display: inline-block; float: right;">
					<button id="csdpcp_deptCooperSearch" class="button">조회</button>
					<button id="csdpcp_deptCooperInit" class="button">초기화</button>
					<button id="csdpcp_deptCooperExcel" class="button">엑셀다운</button>
				</div>
			</td>
		</tr>
	</table>
</div>

<!-- 그리드 -->
<div style="margin-bottom: 15px; clear: both;">
	<table id="csdpcp_deptCooperationGrid"></table>
	<div id="csdpcp_pgDeptCooperationGrid"></div>
</div>
