<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<title>상담DB승인 관리</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.css" type="text/css"/>
				<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jstree/themes/default/style.custom.css" type="text/css"/>
				
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jstree/jstree.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/management/counselDbConfmManage.js'/>"></script>
	</head>
	
	<body>
	<div id="h1">상담DB승인 관리</div>
		<div id="pop_body" style="height: 786px;">
		<div class="stitle">상담DB승인 관리 조회</div>						
			<div id="search2">
        	<table class="search2_tbl">	
				 <colgroup>
					<col style="width:60px">				
					<col style="width:110px">				
					<col style="width:110px">				
					<col style="width:60px">				
					<col style="width:60px">				
					<col style="width:60px">				
					<col style="width:60px">				
					<col style="width:60px">				
					<col style="width:80px">				
					<col style="width:40px">				
				</colgroup> 
				<tr>
					<th>기준일자</th>
			      	<td colspan="2" style="">
			        <input type="text" class="text_Date" id="cscfmg_srchSelFrDate" maxlength="10"> ~ <input type="text" class="text_Date" id="cscfmg_srchSelToDate" maxlength="10" >  
			      	</td>
					
					<th>승인구분</th>
					<td>
						<select  id="cscfmg_srchConfmSe" class="select_bl">
							<option value="all">전체</option>
							<option value="Y" >승인</option>
							<option value="N" selected="selected">미승인</option>
						</select>
					</td>
					<th>부서구분</th>
					<td><select  id="cscfmg_srchStat" class="select_bl"></select></td>
					<th>
					부서구분
					</th>
					<td colspan="2" >
<!-- 					<select  id="cscfmg_srchDeptSe" class="select_bl" style="width: 182px;">
					</select> -->
<!-- 						<div id="cscfmg_listTeam" class="scrollable ztree" style="height: 345px; width:250px;  position: absolute; overflow-y:scroll; top:79px; z-index: 200; border: 1px solid rgba(196, 196, 196, 1); background: white">
						</div> -->
						<input type="text" class="text_ol" id="cscfmg_MnnstDept" style="width: 178px;" placeholder="부서를 검색해주세요!">
						<!-- <button id="cscfmg_srchDeptSe" class="button">부서선택</button> -->
					</td>
					<td colspan="1" class="btn">
						<button id="cscfmg_srchBtnSearch" class="button">조회</button>
						<button id="cscfmg_srchBtnSrchInit" class="button">초기화</button>
						<button id="cscfmg_srchBtnExcelDown" class="button">엑셀다운</button>
					</td>
		
				</tr>
				<tr>
					<th>상담유형</th>
					<td colspan="8">
						<select id="cscfmg_srchCounselTy1" class="select_bl" style="width: 20%;"></select>
						<select id="cscfmg_srchCounselTy2" class="select_bl" style="width: 23%;"></select>
						<select id="cscfmg_srchCounselTy3" class="select_bl" style="width: 25%;"></select>
						<%--<select id="cscfmg_srchCounselTy4" class="select_bl" style="width: 26%;"></select>--%>
					</td>
					<th>제목</th>
					<td>
						<input id="cscfmg_srchCounseJobNm" type="text" class="text_ol">
					</td>
				</tr>
			</table>
			
			</div>
	
 		<div style="width: 100%; clear: both;">
			<table id="cscfmg_tblCounselDbComfm"></table>
			<div id="cscfmg_pgCounselDbComfm"></div>
		</div>  
	
	</div>
</body>
</html>