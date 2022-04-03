<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<title>상담DB</title>
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
<script type="text/javascript" src="<c:url value='/resources/js/counsel/counseldbForm.js'/>"></script>
<!-- KukudocsEditor  -->
<script type="text/javascript" src="<c:url value='/resources/KukudocsEditor/javascripts/build/Editor.bundle.js'/>"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/KukudocsEditor/stylesheets/style.css" type="text/css" />
</head>

<body style="height: 885px;">

	<div id="h1">상담DB</div>
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
						<button type="button" id="btnCnslAltList" class="button">상담DB 변경이력 조회</button>
						<!-- <button type="button" id="btnExelSave"  class="button">엑셀저장</button> -->
						<button type="button" id="btnInsert" class="button"></button>
						<button type="button" id="btnInit" class="button">초기화</button>
						<button type="button" id="btnClose" class="button">닫기</button>
					</td>
				</tr>
			</table>

			<form id="writeForm" name="writeForm" action="/ajax/board/board_write.do" method="post">
				<table class="bbs_tbl">
					<tr>
						<td class="line_rt">상담유형</td>
						<td class="line_b" colspan="7">
							<select class="select_bl" id="instClass" style="width: 198px;"></select>
							<select class="select_bl" id="intvLgCd" style="width: 198px;"></select>
							<select class="select_bl" id="intvMdCd" style="width: 240px;"></select>
							<select class="select_bl" id="intvSmCd" style="width: 240px;"></select>
						</td>
					</tr>
					<tr>
						<td class="line_rt">업무명</td>
						<td class="line_b" colspan="7">
							<input id="tfTbbsTtl" name="tfTbbsTtl" type="text" class="text_ol">
						</td>
					</tr>
					<tr>
						<td class="line_rt" style="height: 200px;">업무절차</td>
						<td class="line_b" colspan="7" style="padding-right: 10px;">
							<script type="text/javascript">
								/* DEXT5.configInitServerXml = "http://172.17.100.100:8080/resources/js/lib/dext5editor/handler/upload_handler.ashx?f=dext_editor.xml";
								var editor = new Dext5editor("editor1"); */								
							</script>
							<textarea id="taTbbsCntn" name="taTbbsCntn" rows="10" cols="100" style="width: 100%; height: 250px; display: none;" class="area_ol">내용....</textarea>
						</td>
					</tr>
					<tr>
						<td class="line_rt">첨부파일</td>
						<td class="line_b" colspan="7">
							<table id="fileInfos" style="margin-left: 5px; margin-right: 6px;">
								<tr>
									<td style="width: 30%;">
										<input type="hidden" name="record_XXX" value="" /> <input type="hidden" name="action" value="add" /> <input type="file" id="BOARD" name="BOARD" class="file_board" style="width: 420px;" />
									</td>
									<td style="width: 20%">
										<img src="/resources/images/btn_cancel.png" id="btnRmFilebox" style="cursor: pointer; margin-top: 4px; margin-left: 4px;" alt="취소" />
									</td>
									<td style="width: 20%; text-align: right;">
										<img src="/resources/images/btn_fileadd.png" onClick="addFileBox()" alt="파일추가" class="icon_add" style="cursor: pointer" />
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td class="line_rt">담당부서</td>
						<td class="line_b">
							<input type="hidden" class="text_ol" id="departCd" name="departCd"> <span id="departNm"></span>
						</td>
						<td class=line_rr>담당자</td>
						<td class="line_b">
							<select class="select_bl" id="managerID" style="width: 115px;"></select>
							<!-- 							<input type="hidden" class="text_ol" id="managerID" name="managerID" maxlength="10">
						  <input type="text" class="text_ol" id="managerNM" name="managerNM" maxlength="10" style="width:72%;"  readonly>
						  <img src="/resources/images/icon_2.png" alt="" class="tbl_icon" id="btnManager2"/> -->
						</td>
						<td class="line_rr">등록일시</td>
						<td class="line_b">
							<span id="tfDt"></span>
						</td>
						<td class="line_rr">등록자</td>
						<td class="line_b">
							<span id="tfUsrNm"></span>
						</td>
					</tr>
					<tr>
						<td class="line_rt">수정일시</td>
						<td class="line_b">
							<span id="tfUpdateDt"></span>
						</td>
						<td class="line_rr">수정자</td>
						<td class="line_b">
							<span id="tfUpdateNm"></span>
						</td>
						<td class="line_rr">조회수</td>
						<td class="line_b">
							<span id="tfSearchCnt"></span>
						</td>
						<td class="line_rr">요청구분</td>
						<td class="line_b">
							<select class="select_bl" id="sel_req_gb" style="width: 115px;"></select>
						</td>
					</tr>
					<tr>
						<td class="line_rt">미사용사유</td>
						<td class="line_b" colspan="5">
							<input id="tfNtUseDesc" name="tfNtUseDesc" type="text" class="text_ol">
						</td>
						<td class="line_rr">처리상태</td>
						<td class="line_b">
							<select class="select_bl" id="sel_act_st" style="width: 115px;"></select>
						</td>
					</tr>

				</table>
			</form>
		</div>
	</div>
	<table id="fileadd" style="display: none">
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