<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html>
	<head>
		<meta charset="utf-8">
		<title>공통코드 관리</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jstree/themes/default/style.min.css" type="text/css"/>
		<script src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script src="<c:url value='/resources/js/lib/jstree/jstree.js'/>"></script>
		<script src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script src="<c:url value='/resources/js/management/codeManage.js'/>"></script>
		<style>
	    	#pop_body {float:left;}
	    	#jstree {width:100%; height:430px; margin: 25px 2px 0 0; overflow-x: auto; overflow-y: auto; border:6px solid #bfd5e0; padding: 5px 2px;}
	    </style>
	</head>
	<body>
		<!--BODY-->
		<div id="h1">공통코드 관리</div>
		<div id="pop_body" style="float: left;">
			<!--타이틀-->
			<div class="stitle">공통코드 조회</div>
			<!--"타이틀"-->
			<!-- 조회/검색 -->
			<div id="search">
				<table class="search_tbl">
					<tr>
						<th>검색어</th>
						<td class="sel">
							<select class="select_al" id="cdMng_optSrchtype">
								<option value="all">전체</option>
								<option value="authCd">코드</option>
								<option value="authNm">코드명</option>
							</select>
						</td>
						<td class="nemo_30"><input type="text" class="text_ol" id="cdMng_tfSrchval" maxlength="20"></td>
						<td class="btn">
							<button type="button" id="cdMng_btnSearch" class="button">조회</button>
							<button type="button" id="cdMng_btnInit" class="button">초기화</button>
						</td>
					</tr> 
				</table>
			</div>
			<!--"조회/검색"-->
			<!--그리드-->
			<div id="grid_all">
				<!--왼쪽그리드-->
				<div id="code_admin_left">
					<!--타이틀-->
					<div class="stitle">코드타입</div>
					<!--"타이틀"-->
					<!-- 그리드테이블 -->
					<div class="grid_tbl">		 
								<div id="jstree"> 
								</div>
					</div>
				</div>
				<!--"왼쪽그리드"-->

				<!--오른쪽그리드-->
				<div id="code_admin_right">
					<!--타이틀-->
					<div class="stitle" style="float: left; width: 40%;">
						<label>상세코드명</label>
					</div>
					<!--"타이틀"-->
					<!-- 미사용/버튼 테이블 -->
					<table class="info_tbl" style="float: right; width: 50%; margin: 0;">
						<tr>
							<td><input type="checkbox" class="checkbox" id="cdMng_chkNotUseCode"><label for="cdMng_chkNotUseCode">미사용 포함</label></td>
						</tr>
					</table>
					<!--"미사용/버튼 테이블"-->
					<!-- 그리드테이블 -->
					<div class="grid_tbl" style="float: left; width: 100%;">		 
						<table id="cdMng_tblCode"></table>
						<div id="cdMng_pagingCode"></div>
					</div>
					<!--"그리드테이블"-->
					<!-- 버튼 테이블 -->
					<div class="grid_tbl" style="float: left;">
					<table class="info_tbl_btn">
						<tr>
							<th></th>
							<td>
								<button type="button" id="cdMng_btnAddCode" class="button">추가</button>
								<button type="button" id="cdMng_btnModCode" class="button">수정</button>
								<button type="button" id="cdMng_btnInitCode" class="button">초기화</button>
							</td>
						</tr>
					</table>
					<!--"버튼 테이블"-->
					<table class="profile_tbl">
						<tr>
							<td class="line_rt">코드</td>
							<td class="line_b"><input type="text" class="text_ol" id="cdMng_tfCode_cd" maxlength="6" onkeydown="return onlyNumber(event)"><input type="hidden"  id="cdMng_tfCodeTp_cd"/></td>
							<td class="line_c">코드명</td>
							<td class="line_b"><input type="text" class="text_ol" id="cdMng_tfCode_cd_nm" maxlength="20"></td>
						</tr>
						<tr>
							<td class="line_rt">순서</td>
							<td class="line_b"><input type="text" class="text_ol" id="cdMng_tfCode_cd_seq" maxlength="3" onkeydown="return onlyNumber(event)"></td>
							<td class="line_c">사용여부</td>
							<td class="line_b">
								<input type="radio" class="radio" name="rdCode_use_yn" id="rdCode_use_yn_y" value="Y" checked="checked"><label for="rdCode_use_yn_y">사용</label>
								<input type="radio" name="rdCode_use_yn" id="rdCode_use_yn_n" value="N"><label for="rdCode_use_yn_n">미사용</label>
							</td>
						</tr>
						<!-- 
						<tr>
							<td class="line_rt">부모타입</td>
							<td class="line_b"><input type="text" class="text_ol" id="tfCode_parnt_tp_cd" maxlength="10" onkeydown="return onlyNumber(event)"></td>
							<td class="line_c">부모코드</td>
							<td class="line_b"><input type="text" class="text_ol" id="tfCode_parnt_cd" maxlength="10" onkeydown="return onlyNumber(event)"></td>
						</tr>
						-->
						<tr>
							<td class="line_rt">확장코드1</td>
							<td class="line_b" colspan="3"><input type="text" class="text_ol" id="cdMng_tfCode_ext1_cd" maxlength="100"></td>
						</tr>
						<!-- 
						<tr>
							<td class="line_rt">확장코드2</td>
							<td class="line_b" colspan="3"><input type="text" class="text_ol" id="tfCode_ext2_cd" maxlength="40"></td>
						</tr>
						<tr>
							<td class="line_rt">확장코드3</td>
							<td class="line_b" colspan="3"><input type="text" class="text_ol" id="tfCode_ext3_cd" maxlength="40"></td>
						</tr>
						<tr>
							<td class="line_rt">확장코드4</td>
							<td class="line_b" colspan="3"><input type="text" class="text_ol" id="tfCode_ext4_cd" maxlength="40"></td>
						</tr>
						<tr>
							<td class="line_rt">확장코드5</td>
							<td class="line_b" colspan="3"><input type="text" class="text_ol" id="tfCode_ext5_cd" maxlength="40"></td>
						</tr>
						<tr>
							<td class="line_rt">확장코드6</td>
							<td class="line_b" colspan="3"><input type="text" class="text_ol" id="tfCode_ext6_cd" maxlength="40"></td>
						</tr>
						<tr>
							<td class="line_rt">확장코드7</td>
							<td class="line_b" colspan="3"><input type="text" class="text_ol" id="tfCode_ext7_cd" maxlength="40"></td>
						</tr>
						<tr>
							<td class="line_rt">확장코드8</td>
							<td class="line_b" colspan="3"><input type="text" class="text_ol" id="tfCode_ext8_cd" maxlength="40"></td>
						</tr>
						<tr>
							<td class="line_rb">확장코드9</td>
							<td class="line_wb" colspan="3"><input type="text" class="text_ol" id="tfCode_ext9_cd" maxlength="40"></td>
						</tr>
						-->
					</table>
					</div>
				</div>
				<!--"오른쪽그리드"-->
			</div>
			<!--"그리드"-->
		</div>
		<!--"BODY"-->
	</body>
</html>
