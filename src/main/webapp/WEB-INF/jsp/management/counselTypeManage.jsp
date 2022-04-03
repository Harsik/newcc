<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <title>상담유형코드 관리</title>
	<link rel="icon" href="/resources/images/favicon.ico">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jstree/themes/default/style.custom.css" type="text/css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
    
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
     <script type="text/javascript" src="<c:url value='/resources/js/lib/jstree/jstree.js'/>"></script>
     
    <script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/management/counselTypeManage.js'/>"></script>
    <style type="text/css">
    	#pop_body {float:left;}
    	#jstree {width:100%; height:650px; margin: 25px 2px 0 0; overflow-x: auto; overflow-y: auto; border:6px solid #bfd5e0; padding: 5px 2px;}
    </style>
  </head>

  <body>
    <!--BODY-->
    <div id="h1">상담유형코드 관리</div>
    <div id="pop_body">
			<div id="grid_all">
				<!--왼쪽그리드-->
				<div id="code_admin_left">
					<div class="stitle">코드타입</div>
					<div  class="grid_tbl">
						<div id="jstree"> 
						</div>
					</div>
				</div>
				<!--"왼쪽그리드"-->
				<!--오른쪽그리드-->
				<div id="code_admin_right">
					<div class="stitle">상세코드명</div>
					<!-- 미사용/버튼 테이블 -->
					<table class="info_tbl">
						<tr>
							<td>
								<input type="checkbox" class="checkbox" id="cslTpMng_chkNotUseCode"><label for="chkNotUseCode">미사용 포함</label>
							</td>
						</tr>
					</table>
					<!--"미사용/버튼 테이블"-->
					<!-- 그리드테이블 -->
					<div class="grid_tbl">	
							<table id="cslTpMng_tblCategory"></table>
							<div id="cslTpMng_pagingCode"></div>
					</div>
					<!--"그리드테이블"-->
					<!-- 버튼 테이블 -->
					<table class="info_tbl_btn">
						<tr>
							<td>
								<button type="button" id="cslTpMng_btnAddCategory" class="button">추가</button>
								<button type="button" id="cslTpMng_btnModCategory" class="button">수정</button>
								<button type="button" id="cslTpMng_btnInitCotegory" class="button">초기화</button>
							</td>
						</tr>
					</table>
					<!--"버튼 테이블"-->

					<table class="profile_tbl">
						<tr>
							<th class="line_rt">상담유형코드</th>
							<td class="line_b">
								<input type="text" class="text_ol" id="cslTpMng_tfCategory_cd">
							</td>
							<th class="line_c">상담유형구분</th>
							<td class="line_b">
								<input type="text" class="text_ol" id="cslTpMng_tfCategory_gb" >
							</td>							
						</tr>
						<tr>
							<th class="line_rt">상담유형명</th>
							<td class="line_b">
								<input type="text" class="text_ol" id="cslTpMng_tfCategory_nm" maxlength="20">
							</td>
							<th class="line_c">부모코드</th>
							<td class="line_b">
								<input type="text" class="text_ol" id="cslTpMng_tfParnt_cd">
							</td>
						</tr>						
						<tr>
							<th class="line_rt">순서</th>
							<td class="line_b">
								<input type="text" class="text_ol" id="cslTpMng_tfOrder_no" maxlength="3" onkeydown="return onlyNumber(event)">
							</td>
							<th class="line_c">사용여부</th>
							<td class="line_b">
								<input type="radio" class="radio" name="rdUse_yn" id="rdUse_yn_y" value="Y" checked="checked"><label for="rdUse_yn_y">사용</label>
								<input type="radio" name="rdUse_yn" id="rdUse_yn_n" value="N"><label for="rdUse_yn_n">미사용</label>
							</td>
						</tr>
						<tr>
							<th class="line_rt">확장코드1</th>
							<td class="line_b" >
								<input type="text" class="text_ol" id="cslTpMng_tfExt1_cd" maxlength="20">
							</td>
							<th class="line_c">확장코드2</th>
							<td class="line_b">
								<input type="text" class="text_ol" id="cslTpMng_tfExt2_cd" maxlength="20">
							</td>
						</tr>
						<tr>
							<th class="line_rt">메모</th>
							<td class="line_b" colspan="3">
								<input type="text" class="text_ol" id="cslTpMng_tfMemo" maxlength="40">
							</td>
						</tr>

					</table>
				</div>
				<!--"오른쪽그리드"-->
			</div>
			<!--"그리드"-->
		</div>
		<!--"BODY"-->
	</body>
</html>
