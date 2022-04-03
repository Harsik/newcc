<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
	<title>상담DB요청관리</title>
	<link rel="icon" href="/resources/images/favicon.ico">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/myinfo.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.css" type="text/css"/>
	
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
	
	<script type="text/javascript" src="<c:url value='/resources/js/lib/dext5editor/js/dext5editor.js'/>"></script>
	
	
	<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/myinfo/jisikRewordManage.js'/>"></script>
<!-- KukudocsEditor  -->
<script type="text/javascript" src="<c:url value='/resources/KukudocsEditor/javascripts/build/Editor.bundle.js'/>"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/KukudocsEditor/stylesheets/style.css" type="text/css" />
</head>
<body>
	<div id="h1">상담DB요청관리</div>
	<div id="pop_body" style="height: 810px;">
		
		<!-- 왼쪽 -->
		<div id="pop_left" style="float:left; width: 45%;">
			<%@include file="jisikRewordManageHis.jsp"%>
		</div>
		
		<input id="jskRwMng_wrkcl" type="hidden"/> 
		<!-- 오른쪽 -->
		<div style="float:right; width : 54%;">
				<div class="stitle">
					상담DB 상세
				</div>
				<div style="float: right; margin-bottom : 10px; ">
					<button type="button" id="jskRwMng_btnReInsert" class="button">등록</button>
					<button type="button" id="jskRwMng_btnReUpdate" class="button">수정</button>
					<button type="button" id="jskRwMng_btnReInit" class="button">초기화</button>
				</div>
				<form id="jskRwMng_writeForm" name="writeForm" action="/ajax/management/wirteForm.do" method="post">
					<input type="hidden" id="jskRwMng_tfTbbsId" />
					<input type="hidden" id="jskRwMng_langCd"/>
					<table class="profile_tbl">
						<colgroup>
							<col style="width: 4%">
							<col style="width: 5%">
							<col style="width: 5%">
							<col style="width: 5%">
							<col style="width: 4%">
							<col style="width: 5%">
						</colgroup>
						<tr>
							<th class="line_rt">상담유형</th>
							<td class="line_b" colspan="3">
								<select id="jskRwMng_optCounselKnd1" class="select_bl" style="width: 18%;"></select>
								<select id="jskRwMng_optCounselKnd2" class="select_bl" style="width: 23%;"></select>
								<select id="jskRwMng_optCounselKnd3" class="select_bl" style="width: 24%;"></select>
								<%--<select id="optCounselKnd4" class="select_bl" style="width: 29%;"></select>--%>
							</td>
							<th class="line_c">요청구분</th>													
							<td class="line_b">
								<select id="jskRwMng_optGbKnd" class="select_bl"></select>
							</td>
						</tr>
						<tr>
							<th class="line_rt">제목</th>
							<td class="line_b" colspan="5"><input type="text" class="text_ol" id="jskRwMng_tfTbbsTtl"/></td> 
						</tr>
<!-- 						<tr>
							<th>주의 및 특이사항</th>													
							<td colspan="5" id="taDtls">
							</td>
						</tr> -->
						<tr>
							<th class="line_rt">내용</th>													
							<td class="line_b" colspan="5" id="jskRwMng_taTbbsCntn">
							</td>
						</tr>
						<tr>
							<th style="height: 67px;" class="line_rt">첨부</th>
							<td class="line_b" colspan="5">
								<table id="jskRwMng_fileInfos" style="width: 100%;">
									<!-- <tr>
									<td colspan="4">
										<input type="hidden" name="record_XXX" value="" />
										<input type="file" id="MANUAL" name="MANUAL" />
									</td>
									<td>
										<img src="/resources/images/btn_del.png"  alt="삭제" class="icon_add" id="jskRwMng_rmFilebox" style="cursor: pointer;" />
										<img src="/resources/images/btn_fileadd.png" onClick="addFileBox()" alt="파일폼추가" class="icon_add" style="cursor: pointer;"/>
									</td>
								</tr> -->
								</table>
							</td>
						</tr>
						<tr>
							<th class="line_rt">담당부서</th>
							<td class="line_b">
								<input type="text" class="text_ol" id="tfCntrNm" style="width: 70%;" disabled="disabled" />
								<img width="20" height="20" class="icon_comm" id="jskRwMng_cntrSearch" alt="찾기" src="/resources/images/search_img.png">
							</td>
							<th class="line_c">담당자</th>
							<td class="line_b">
								<input type="text" class="text_ol" id="tfRespNm" disabled="disabled"/>
							</td>
							<th class="line_c">전화번호</th>
							<td class="line_b"><input type="text" class="text_ol" id="tfResponTel" disabled="disabled"/></td>
						</tr>
					</table>
				</form>
			</div>
		</div>
			<table id="fileadd" style="display:none">
				<tr>
					<td colspan="4">
						<input type="hidden" name="record_XXX" value="" />
						<input type="file" id="MANUAL" name="MANUAL"/>
					</td>
					<td>
						<img src="/resources/images/btn_del.png" onClick="removeFileBox(XXX)" class="icon_add" style="cursor: pointer;" alt="취소" />
					</td>
				</tr>
			</table>

</body>
</html>