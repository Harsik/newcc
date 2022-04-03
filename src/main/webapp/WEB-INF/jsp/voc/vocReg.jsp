<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>VOC 등록</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/css/popup.css'/>">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jstree/themes/default/style.min.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jstree/jstree.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/voc/vocReg.js'/>"></script>
	</head>
	
	<body>
		<!--BODY-->
		<div id="h1">VOC등록</div>
		<input type="hidden" id="vocId"> 
		<div id="pop_body">
			<!--타이틀-->
			<div class="stitle">VOC등록</div><!--"타이틀"-->
			
			<!-- 버튼 테이블 -->
			<table class="info_tbl_right">
				<tr>
					<td>
						<button type="button" id="vocSavebtn" class="button">저장</button>
					</td>
				</tr>
			</table><!--"버튼 테이블"-->
			
		<!--그리드-->
		<div id="grid_all">
			<form id="writeForm" name="writeForm" action="/ajax/voc/voc_write.do" method="post">
				<table class="profile_tbl">
				<tr>
					<td class="line_rt">
						채널구분
					</td>
					<td class="line_b">
						<select class="select_bl" id = "vocChgbcd"></select>
					</td>
					<td class="line_c">
						접수일시
					</td>
					<td class="line_b">
						<label id="vocRcvDt"></label> 
						<label id="vocRcvTm"></label>
					</td>
					<td class="line_c">
						상담사
					</td>
					<td class="line_b">
						<label id="vocReg1"></label>
					</td>
				</tr>
				<tr>
					<td class="line_r">
						고객명
					</td>
					<td class="line_b">
						<input type="text" class="text_ol" id="vocReg2" maxlength="167"/>
					</td>
					<!-- <td class="line_c">
						회사/부서
					</td>
					<td class="line_b">
						<input type="text" class="text_ol" id="vocReg3" maxlength="167"/>
					</td> -->
					<td class="line_c">
						연락처
					</td>
					<td class="line_b">
						<!-- <label id="vocReg4"></label> -->
						<input type="text" class="text_ol" id="vocReg4" maxlength="167"/>
					</td>
					<td class="line_c">
						농장식별번호
					</td>
					<td class="line_b">
						<label id="vocReg5"></label>
						<!-- <input type="text" class="text_ol" id="vocReg5" maxlength="167"/> -->
					</td>
				</tr>
				<tr>
					<td class="line_r">
						민원구분
					</td>
					<td class="line_b">
						<select class="select_bl" id = "vocType"></select>
					</td>
					<td class="line_c">
						시스템구분
					</td>
					<td class="line_b">
						<select class="select_al" id = "vocSystemType"></select>
					</td>
					<td class="line_c">
						오류유형
					</td>
					<td class="line_b">
						<select class="select_al" id = "vocErrorType"></select>
					</td>
				</tr>
				<tr>
					<td class="line_rt">
						제목
					</td>
					<td class="line_b" colspan="5">
						<span><input type="text" class="text_ol" style="width: 50%" id="vocTitle" maxlength="167"/>
						&nbsp;&nbsp; ※  일반 민원은 제목을, 시스템 민원은 프로그램명을 기록하세요.</span>
					</td>
				</tr>
				<tr>
					<td class="line_r" rowspan="3">
						문의내용
					</td>
					<td class="line_b" rowspan="3" colspan="5">
						<textarea class="area_ol" style="height:90%;" id = "vocContents" rows="8" maxlength="667"></textarea>
					</td>
				</tr>
				<tr></tr><tr></tr>
				<tr>
					<td class="line_rt">첨부서식</td>
					<td class="line_b" colspan="7">
						<table id="vocFile" style="margin-left: 5px; margin-right: 6px;">
							<tr>
								<td>
									<input type="hidden" name="record_XXX" value="" />
									<input type="hidden" name="action" value="add" />
									<input type="file" id="vocAddFile" name="vocAddFile" class="file_board" style="width:420px;"/>
								</td>
								<td>
									<img src="/resources/images/btn_cancel.png" id="btnRmFilebox" style="cursor: pointer; margin-top: 4px; margin-left: 4px;" alt="취소" />
								</td>
								<td style="text-align: right;">
									<img src="/resources/images/btn_fileadd.png"  onClick="addFileBox()" alt="파일추가" class="icon_add" style="cursor: pointer"/>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				
				<tr>
					<td class="line_r">
						이관부서
					</td>
					<td class="line_b">
						<select class="select_al" id = "vocLastDepthCd"></select>
					</td>
					<td class="line_c">
						관리자
					</td>
					<td class="line_b">
						<select class="select_al" id = "vocManager"></select>
					</td>
					<td class="line_c">
						이관구분
					</td>
					<td class="line_b">
						<input type="radio" class="radio" name="fast_yn" id="fast_yn_n" value="N" checked="checked"><label for="fast_yn_n">일반</label>
						<input type="radio" name="fast_yn" id="fast_yn_y" value="Y"><label for="fast_yn_y" style="color: red">긴급</label>
					</td>
				</tr>
				
			</table>
			</form>
		</div><!--"그리드"-->
			
		</div><!--"BODY"-->
		<table id="fileadd" style="display:none">
			<tr>
				<td>
					<input type="hidden" name="record_XXX" value="" />
					<input type="hidden" name="action" value="add" />
					<input type="file" name="vocAddFile" class="file_board" style="width:420px;" />
				</td>
				<td>
					<img src="/resources/images/btn_cancel.png" onClick="removeFileBox(XXX)" style="cursor: pointer; margin-top: 4px; margin-left: 4px;" alt="취소" />
				</td>
				<td style="text-align: right;"></td>
			</tr>
		</table>
	</body>
</html>