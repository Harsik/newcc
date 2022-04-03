<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<title>로그인이력</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/user/loginInfo.js'/>"></script>
		
		<style>
			.grid-col{
				padding-left : 15px !important;
			}
		</style>
	</head>
	<body>
		<div id="h1">로그인이력 </div>
		<div id="pop_body">
			<div class="stitle">로그인이력 조회</div>
		<div id="search">
			<table class="search_tbl">
        		<tr>
		  			<th>검색어</th>
          			<td class="sel">
            			<select class="select_al" id="lgnInf_optSrchtype">
              				<option value="all">전체</option>
							<option value="loginId">이름</option>
							<option value="innerNum">내선번호</option>
            			</select>
          			</td>
          			<td class="nemo_20">
						<input type="text" class="text_ol" id="lgnInf_idSrchVal" maxlength="20">
					</td>
					<!-- <th></th> -->
					<th style="padding-left: 30px;">로그인일자</th>
					<td class="nemo_50">
						<input type="text" class="text_Date" id ="lgnInf_loginInfoDtStr" disabled="disabled" />
						<label> ~ </label>
						<input type="text" class="text_Date" id ="lgnInf_loginInfoDtEnd" disabled="disabled" />
					</td>
         				<td class="btn">
						<button type="button" id="lgnInf_btnSearch"  class="button">조회</button>
						<button type="button" id="lgnInf_btnInit"  class="button">초기화</button>
	  				</td>
        		</tr>
      		</table>
		</div>
		<div id="grid_all">
		<div class="stitle">로그인이력</div>
			<div class="info_tbl" style="text-align: right;">
				<button type="button" id="lgnInf_btnExcel"  class="button">엑셀저장</button>
			</div>
	 		<div class="grid_tbl">
 				<table id="lgnInf_loginInfoList"></table>
				<div id="lgnInf_pgLoginInfoList"></div>
	   		</div>
     	</div>
		</div>	
	</body>
</html>