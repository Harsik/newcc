<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<title>부서게시판</title>
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
<script type="text/javascript" src="<c:url value='/resources/js/civilservice/cswDeptBoardForm.js'/>"></script>
	<!-- KukudocsEditor  -->
	<script type="text/javascript" src="<c:url value='/resources/KukudocsEditor/javascripts/build/Editor.bundle.js'/>"></script>
    <link rel="stylesheet" href="<c:url value='/resources/KukudocsEditor/stylesheets/style.css'/>" type="text/css" />
</head>


<body style="height: 890px;">

	<div id="h1">부서게시판</div>
	<div id="pop_body">
		<!--타이틀-->
		<div class="stitle">
			<p id="b_title"></p>
		</div>

		<div id="grid_all">
			<!-- 버튼 테이블 -->
			<table class="info_tbl">
				<tr>
					<td>
						<button type="button" id="btnInsert" class="button">저장</button>
						<button type="button" id="btnInit" class="button">초기화</button>
						<button type="button" id="btnClose" class="button">닫기</button>
					</td>
				</tr>
			</table>

			<form id="writeForm" name="writeForm" action="/ajax/civilservice/csw.do" method="post">
				<table class="bbs_tbl">
					<tr>
						<td class="line_rt">제목</td>
						<td class="line_b" colspan="9">
							<input id="tfTbbsTtl" name="tfTbbsTtl" type="text" class="text_ol">
						</td>
					</tr>
					<tr>
						<td class="line_rt" style="height: 200px;">내용</td>
						<td class="line_b" colspan="9" style="padding-right: 10px;">
							<div id="divNotiEditor"></div>
						</td>
					</tr>
					<!-- 					<tr>
						<td class="line_rt">열람권한</td>
						<td class="line_b" colspan="9">
							<input id="tfRegBoardAuth" type="text" class="text_ol_80" readonly />
							<img id="btnRegBoardAuth" src="/resources/images/btn_add3.png" alt="등록" class="icon_add"/>
						</td>
					</tr> -->
					<tr>
						<!-- 	<td id="b_usrNm" class="line_rt"></td>
						<td class="line_b"><input id="tfUsrNm" type="text" class="text_ol" readonly></td> -->
						<td class="line_rr">긴급여부</td>
						<td class="line_b">
							<select id="optEmrgYN" name="optEmrgYN">
								<option value="N">일반</option>
								<option value="Y">긴급</option>
							</select>
						</td>
						<td class="line_rr">공지게시일</td>
						<td class="line_b" colspan="5">
							<input id="tfTbbsStrtDt" name="tfTbbsStrtDt" type="text" class="text_ol_half" readonly>&nbsp;~ <input id="tfTbbsEndDt" name="tfTbbsEndDt" type="text" class="text_ol_half">
						</td>
						<td id="b_dt" class="line_rr"></td>
						<td class="line_b">
							<input id="tfDt" type="text" class="text_ol" readonly>
						</td>
					</tr>
					<tr>
						<td class="line_rb" rowspan="8">첨부파일</td>
						<td class="" colspan="9">
							<div style="float: left; height: 100%;">
								<table id="fileInfos" style="margin-left: 5px; margin-right: 6px;">
									<tr>
										<td style="width: 30%;">
											<input type="hidden" name="record_XXX" value="" /> <input type="hidden" name="action" value="add" /> <input type="file" id="BOARD" name="BOARD" class="file_board" style="width: 300px;" />
										</td>
										<td style="width: 20%">
											<img src="/resources/images/btn_cancel.png" id="btnRmFilebox" style="cursor: pointer; margin-top: 4px; margin-left: 4px;" alt="취소" />
										</td>
										<td style="width: 20%; text-align: right;">
											<img src="/resources/images/btn_fileadd.png" onClick="addFileBox()" alt="파일추가" class="icon_add" style="cursor: pointer" />
										</td>
									</tr>
								</table>
							</div>

							<div style="float: right; text-align: center; line-height: 80px; width: 49%; height: 100%;">
								<p style="color: red; font-weight: bold;">※ 첨부파일은 보안해제후 첨부 바랍니다.</p>
							</div>

						</td>
					</tr>
				</table>
			</form>
		</div>
	</div>
	<table id="fileadd" style="display: none">
		<tr>
			<td style="width: 30%;">
				<input type="hidden" name="record_XXX" value="" /> <input type="hidden" name="action" value="add" /> <input type="file" name="BOARD" class="file_board" style="width: 300px;" />
			</td>
			<td style="width: 20%">
				<img src="/resources/images/btn_cancel.png" onClick="removeFileBox(XXX)" style="cursor: pointer; margin-top: 4px; margin-left: 4px;" alt="취소" />
			</td>
			<td style="width: 20%; text-align: right;"></td>
		</tr>
	</table>
</body>
<script type="text/javascript">
/* 	(function() {
		DEXT5.configInitServerXml = "http://172.17.100.100:8080/resources/js/lib/dext5editor/handler/upload_handler.ashx?f=dext_editor.xml";
		DEXT5.config.DevelopLangage = "JAVA";
		DEXT5.config.Runtimes = "html5";
		DEXT5.config.EditorHolder = "divNotiEditor";
		new Dext5editor("editor1");
	}()); */
</script>
</html>