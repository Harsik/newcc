<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<title>일반게시판</title>
<link rel="icon" href="/resources/images/favicon.ico">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css" />

<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>

<!-- 2016.11.15 jghwang dext5 editor 추가 -->
<!-- <script type="text/javascript" src="<c:url value='/resources/js/lib/smartedit/js/HuskyEZCreator.js' />" charset="utf-8"></script> -->
<script type="text/javascript" src="<c:url value='/resources/js/lib/dext5editor/js/dext5editor.js'/>"></script>

<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/board/generalForm.js'/>"></script>
	<!-- KukudocsEditor  -->
	<script type="text/javascript" src="<c:url value='/resources/KukudocsEditor/javascripts/build/Editor.bundle.js'/>"></script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/KukudocsEditor/stylesheets/style.css" type="text/css" />
</head>

<!-- <body style="height: 545px;"> -->
<body style="height: 805px;">
	<div id="h1">일반게시판</div>
	<div id="pop_body">
		<!--타이틀-->
		<div class="stitle">
			<p id="gnrFrm_b_title"></p>
		</div>

		<div id="grid_all">
			<!-- 버튼 테이블 -->
			<table class="info_tbl">
				<tr>
					<td>
						<button type="button" id="gnrFrm_btnInsert" class="button"></button>
						<button type="button" id="gnrFrm_btnInit" class="button">초기화</button>
						<button type="button" id="gnrFrm_btnClose" class="button">닫기</button>
					</td>
				</tr>
			</table>
			<form id="gnrFrm_writeForm" name="writeForm" action="/ajax/board/board_write.do" method="post">
				<table class="bbs_tbl">
					<tr>
						<td class="line_rt">제목</td>
						<td class="line_b" colspan="5">
							<input id="gnrFrm_tfTbbsTtl" name="tfTbbsTtl" type="text" class="text_ol">
						</td>
					</tr>
					<tr>
						<td class="line_rt" style="height: 200px;">내용</td>
						<td class="line_b" colspan="5" style="padding-right: 10px;">

							<!-- 2016.11.15 jghwang dext5 editor 추가 시작-->
							<script type="text/javascript">
								/* DEXT5.config.zTopMenu = "1";
								DEXT5.configInitServerXml = "http://172.17.100.100:8080/resources/js/lib/dext5editor/handler/upload_handler.ashx?f=dext_editor.xml";
								var editor = new Dext5editor("editor1"); */								
							</script>
							<!-- 2016.11.15 jghwang dext5 editor 추가 종료-->
							<div id="gnrFrm_divTbbsCntn"></div>
						</td>
					</tr>
					<tr>
						<td id="gnrFrm_b_usrNm" class="line_rt">작성자</td>
						<td class="line_b">
							<input id="gnrFrm_tfCrtUsrNm" type="text" class="text_ol" readonly>
						</td>
						<td class="line_b"></td>
						<td class="line_b"></td>
						<td id="gnrFrm_b_dt" class="line_rr"></td>
						<td class="line_b">
							<input id="gnrFrm_tfCrtDt" type="text" class="text_ol" readonly>
						</td>
					</tr>
					<tr>
						<td class="line_rb" rowspan="8">첨부파일</td>
						<td class="" colspan="9">
							<table id="gnrFrm_fileInfos" style="margin-left: 5px; margin-right: 6px;">
								<tr>
									<td style="width: 30%;">
										<input type="hidden" name="record_XXX" value="" /> <input type="hidden" name="action" value="add" /> <input type="file" id="gnrFrm_BOARD" name="gnrFrm_BOARD" class="file_board" style="width: 420px;" />
									</td>
									<td style="width: 20%">
										<img src="/resources/images/btn_cancel.png" id="gnrFrm_btnRmFilebox" style="cursor: pointer; margin-top: 4px; margin-left: 4px;" alt="취소" />
									</td>
									<td style="width: 20%; text-align: right;">
										<img src="/resources/images/btn_fileadd.png" onClick="addFileBox()" alt="파일추가" class="icon_add" style="cursor: pointer" />
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</form>
		</div>
	</div>
	<table id="gnrFrm_fileadd" style="display: none">
		<tr>
			<td style="width: 30%;">
				<input type="hidden" name="record_XXX" value="" /> <input type="hidden" name="action" value="add" /> <input type="file" name="BOARD" class="file_board" style="width: 420px;" />
			</td>
			<td style="width: 20%">
				<img src="/resources/images/btn_cancel.png" onClick="removeFileBox(XXX)" style="cursor: pointer; margin-top: 4px; margin-left: 4px;" alt="취소" />
			</td>
			<td style="width: 20%; text-align: right;"></td>
		</tr>
	</table>
</body>
</html>