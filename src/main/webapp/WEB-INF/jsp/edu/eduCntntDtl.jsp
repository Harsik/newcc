<%@ page language="java" contentType="text/html; charset=utf-8" 	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
	<title>교육콘텐츠 관리</title>
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
	<script type="text/javascript" src="<c:url value='/resources/js/edu/eduCntntDtl.js'/>"></script>
<!-- KukudocsEditor  -->
<script type="text/javascript" src="<c:url value='/resources/KukudocsEditor/javascripts/build/Editor.bundle.js'/>"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/KukudocsEditor/stylesheets/style.css" type="text/css" />
</head>

<body style="height: 807px;">

	<div id="h1">교육콘텐츠 관리</div>
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
						<button type="button" id="btnInsert"  class="button"></button>
						<button type="button" id="btnInit"  class="button">초기화</button>
						<button type="button" id="btnClose"  class="button">닫기</button>
					</td>
				</tr>
			</table>
			
			<form id="writeFormEdu" name="writeFormEdu" action="/ajax/edu/board_write.do" method="post">
			<input style="visibility : hidden; WIDTH: 0px">
				<table class="bbs_tbl">
					<tr>
						<td class="line_rt">제목</td>
						<td class="line_b" colspan="9"><input id="txtTbbsTtl" name="txtTbbsTtl" type="text" class="text_ol"></td>
					</tr>
					
          <tr>
            <td class="line_rt">구분</td>
            <td class="line_b" colspan="4">
              <select class="select_al" id="optCdbGbCd"></select>
            </td>
            <td class="line_rr">대상팀</td>
            <td class="line_b" colspan="4">
              <select class="select_al" id="optTeamNm"></select>
            </td>
          </tr>										
					<tr>
						<td class="line_rt" style="height:200px;">내용</td>
						<td class="line_b" colspan="9" style="padding-right: 10px;">
						  <div id="divNotiEditor"></div>
						</td>
					</tr>
					<tr>
						<td class="line_rb" rowspan="8">첨부파일</td>
						<td class="" colspan="9">
							<table id="fileInfos" style="margin-left: 5px; margin-right: 6px;">
								<tr>
									<td style="width: 30%;">
										<input type="hidden" name="record_XXX" value="" />
										<input type="hidden" name="action" value="add" />
										<input type="file" id="BOARD" name="BOARD" class="file_board" style="width:420px;" />
									</td>
									<td style="width: 20%">
										<img src="/resources/images/btn_cancel.png" id="btnRmFilebox" style="cursor: pointer; margin-top: 4px; margin-left: 4px;" alt="취소" />
									</td>
									<td style="width: 20%; text-align: right;">
										<img src="/resources/images/btn_fileadd.png" 
												onClick="addFileBox()" alt="파일추가" class="icon_add" style="cursor: pointer"/>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</form>
		</div>
	</div>
	<table id="fileadd" style="display:none">
		<tr>
			<td style="width: 30%;">
				<input type="hidden" name="record_XXX" value="" />
				<input type="hidden" name="action" value="add" />
				<input type="file" name="BOARD" class="file_board" style="width:420px;" />
			</td>
			<td style="width: 20%">
				<img src="/resources/images/btn_cancel.png" onClick="removeFileBox(XXX)" style="cursor: pointer; margin-top: 4px; margin-left: 4px;" alt="취소" />
			</td>
			<td style="width: 20%; text-align: right;"></td>
		</tr>
	</table>
</body>
<script type="text/javascript">
	(function() {
		  DEXT5.configInitServerXml = "http://172.17.100.100:8080/resources/js/lib/dext5editor/handler/upload_handler.ashx?f=dext_editor.xml";
			DEXT5.config.DevelopLangage = "JAVA";
			DEXT5.config.Runtimes = "html5";
			DEXT5.config.EditorHolder = "divNotiEditor";
			DEXT5.config.Mode = "edit";
		  new Dext5editor("editor1");
		}());	
	</script>
</html>