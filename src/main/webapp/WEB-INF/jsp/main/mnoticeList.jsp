<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript" src="<c:url value='/resources/js/main/mnoticeList.js'/>"></script>

<div>
	<table style="background-color: #e5e5e5; border: 1px solid #c5c5c5; width: 100%; height: 45px; margin-bottom: 20px;">
		<tr>
			<th style="width: 10%;">검색조건</th>
			<td style="width: 10%;">
			<select id="optSrchtypes" class="select_bl_my" style="width: 100px;" title="검색조건">
					<option value="ttl">제목</option>
					<option value="cntn">내용</option>
					<option value="ttlCntn">제목 + 내용</option>
					<option value="usrNm">작성자</option>
			</select>
			</td>
			<td style="width: 18%;">
			<input type="text" id="tfSrchNt" class="text_ol" style="width: 220px; margin-left: 20px; float: left;" alt="검색어" title="검색어" /></td>
			<th style="margin-top: 12px; float: right;">작성 일시</th>
			<td style="width: 30%; padding-left: 30px;">
			    <input id="tfTbbsStrtDt" type="text" class="text_ol_half" readonly alt="시작날짜" title="시작날짜">&nbsp;~&nbsp;
                 <input id="tfTbbsEndDt" type="text" class="text_ol_half" readonly alt="종료날짜" title="종료날짜">
			</td>
			<td class="btn" style="width: 10%;">
				<button type="button" id="btnNotifySearch" class="button">조회</button>
				<button type="button" id="btnNotifyInit" class="button">초기화</button>
			</td>
		</tr>
	</table>
	<div style="width: 100%;">      
                <table id="tblNotifyList"></table>
                <div id="pgNotifyList"></div>
	</div>
</div>
