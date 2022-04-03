<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>상담DB 변경이력</title>
<link rel="icon" href="/resources/images/favicon.ico">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css" />
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/dext5editor/js/dext5editor.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/civilservice/cswcounseldbAltList.js'/>"></script>
<!-- KukudocsEditor  -->
<script type="text/javascript" src="<c:url value='/resources/KukudocsEditor/javascripts/build/Editor.bundle.js'/>"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/KukudocsEditor/stylesheets/style.css" type="text/css" />
</head>
<body>
	<div id="h1">상담DB 변경이력</div>
	<div id="pop_body" style="height: 900px;">
<!-- 		<div id="pop_left" style="float: left; width: 450px;"> -->
		<div id="pop_left" style="float: left; width: 380px;">
			<div class="stitle">상담DB 변경이력</div>
			<div id="search">
				<%
					String tbbs_id = request.getParameter("TBBS_ID");
				%>
				<input type="hidden" id="csdbalt_tfTbbsId" value="<%=tbbs_id%>" style="height: 0px;">
				<table class="search_tbl">
					<tr>
						<th>검색기간</th>
						<td style="width:210px;text-align: left;">
							<input type="text" style="width: 70px;" class="area_bl" id="csdbalt_selStrtDate" maxlength="16" readonly>~ <input type="text" style="width: 70px;" class="area_bl" id="csdbalt_selEndDate" maxlength="16" readonly>
						</td>
						<td class="btn">
							<button type="button" id="csdbalt_btnSearch" class="button">조회</button>
							<button type="button" id="csdbalt_btnInit" class="button">초기화</button>
						</td>
					</tr>
				</table>
			</div>
			<div id="csdbalt_grid_all">
				<div id="csdbalt_grid1" style="clear: both;">
					<table id="csdbalt_tblAltList" style="clear: both"></table>
					<div id="csdbalt_pgAltList"></div>
				</div>
			</div>
		</div>
		<div style="float: left; width: 1006px; margin-left: 8px;">
			<div class="stitle">상담DB 상세</div>
			<div id="grid_all" class="divInner">
				<input type="hidden" id="csdbalt_tfTbbsId" />
				<div id="csdbalt_divContentTab">
					<table class="profile_tbl" style="width: 100%;">
						<colgroup>
							<col style="width: 3.5%" />
							<col style="width: 12%" />
							<col style="width: 3.5%" />
							<col style="width: 4%" />
							<col style="width: 3.5%" />
							<col style="width: 4%" />
						</colgroup>
						<tr>
							<th class="line_rt" style="width: 6%">상담유형</th>
							<td class="line_b" colspan="5" style="padding-right: 0px; padding-left: 5px;">
								<select id="csdbalt_optCounselKnd1" class="select_bl" style="width: 20%;" disabled="disabled"></select>
								<select id="csdbalt_optCounselKnd2" class="select_bl" style="width: 22%;" disabled="disabled"></select>
								<select id="csdbalt_optCounselKnd3" class="select_bl" style="width: 26%;" disabled="disabled"></select>
								<%--<select id="csdbalt_optCounselKnd4" class="select_bl" style="width: 26%;" disabled="disabled"></select>--%>
							</td>
						</tr>

						<tr>
							<th class="line_rt" style="height: 30px;">제목</th>
							<td class="line_b" colspan="5" id="csdbalt_tfTbbsTtl" style="width: auto;"></td>
						<tr>
							<th class="line_rt">업무절차</th>
							<td class="line_b" colspan="5" id="csdbalt_taTbbsCntn"></td>
						</tr>

						<tr>
							<th class="line_rt">담당부서</th>
							<td class="line_b" id="csdbalt_tfCntrNm" colspan="1"></td>

							<th class="line_c">승인구분</th>
							<td class="line_b" colspan="3" id="csdbalt_appr_yn" style="align: center;" disabled="disabled">
							<select id="csdbalt_chkNotUseYN" class="select_bl" >
								<option value="Y">승인</option>
								<option value="N" selected="selected">미승인</option>
							</select>
							</td>

						</tr>

						<tr>
							<th class="line_rt">담당자</th>
							<td class="line_b" colspan="1">
							<textarea class="area_ol" id="csdbalt_tfRespNm" style="width:100%;"></textarea>
							</td>

							<th class="line_c" rowspan="4">첨부</th>
							<td class="line_b" colspan="3" rowspan="4" style="height: 80px;">
								<table id="csdbalt_tblFiles" style="width: 100%; word-break: break-all;"></table>
							</td>
						</tr>

						<tr>
							<th class="line_rt">전화번호</th>
							<td class="line_b" colspan="1">
							<textarea class="area_ol" id="csdbalt_tfResponTel" style="width:100%;"></textarea>
							</td>
						</tr>

						<tr>
							<th class="line_rt">등록</th>
							<td class="line_b" colspan="1" id="csdbalt_RsctDt"></td>
						</tr>

						<tr>
							<th class="line_rt">수정</th>
							<td class="line_b" colspan="1" id="csdbalt_UpdtDt"></td>

						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
</body>
</html>