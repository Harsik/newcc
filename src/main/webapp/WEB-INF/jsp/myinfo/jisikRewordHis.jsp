<%@page import="java.net.URLDecoder"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
	<title>상담DB요청이력 조회</title>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/myinfo.css" type="text/css"/>
	
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/dext5editor/js/dext5editor.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/myinfo/jisikRewordHis.js'/>"></script>
	
 	<script type="text/javascript">
	    var jisikTtl = decodeURIComponent("${param.jisikTtl}");
	    var jisikTbbsId = decodeURIComponent("${param.jisikTbbsId}");
	</script>

	<!-- KukudocsEditor  -->
	<script type="text/javascript" src="<c:url value='/resources/KukudocsEditor/javascripts/build/Editor.bundle.js'/>"></script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/KukudocsEditor/stylesheets/style.css" type="text/css" />
</head>
<body>

<div id="h1">상담DB요청이력 조회</div>
<div id="pop_body" style="overflow-y:auto; overflow-x:hidden; height: 804px;">
	<div class="stitle">
		상담DB요청이력 조회
	</div>
	<table class="reword_search" style="width: 1072px">
		<tr>
			<td style="width: 20%;">
				<label>요청일자</label>
				<input type="checkbox" class="checkbox" id="jsrwhs_checkbox">
				<input type="text" id="jsrwhs_selFrDate" class="text_ol_half" readonly="readonly" style="width: 70px;" maxlength="16"/> ~
				<input type="text" id="jsrwhs_selToDate" class="text_ol_half" readonly="readonly" style="width: 70px;" maxlength="16"/>
			</td>
			<td style="width: 10%;">
				<label>요청자</label>
				<select id="jsrwhs_selJisikCounselNm"  class="select_bl"  style="width: 100px;" disabled="disabled"></select>
			</td>
			<td style="width: 10%;">
				<label>&nbsp;&nbsp;구&nbsp;&nbsp;분</label>
				<select id="jsrwhs_optGbKnd_his" class="select_bl" style="width :102px;"></select>
			</td>
			<td style="width: 11%;">
				<label>진행상태</label>
				<select id="jsrwhs_progKndCd1"  class="select_bl"  style="width: 109px;" ></select>
			</td>
			<td style="width: 11%;">
				<button class="button" id="jsrwhs_btnCommentSearch" style="margin-left: 5px;">검색</button>
				<button class="button" id="jsrwhs_btnCommentInit" style="margin-left: 5px;">초기화</button>
				<button class="button" id="jsrwhs_btnExcel" style="margin-left: 5px;">엑셀다운</button>
			</td>
		</tr>
		<tr>
			<td colspan="3">
				<label>상담유형</label>
				<select class="select_bl" id="jsrwhs_commentCounselKnd1" style="width: 14%;"></select>
				<select class="select_bl" id="jsrwhs_commentCounselKnd2" style="width: 19%;"></select>
				<select class="select_bl" id="jsrwhs_commentCounselKnd3" style="width: 56%;"></select>
				<%--<select class="select_bl" id="jsrwhs_commentCounselKnd4" style="width: 161px;"></select>--%>
			</td>
		 	<td colspan="2">
				<label>검색</label>
				 <select id="jsrwhs_tfSrchType" class="select_bl" style="width: 25%;">
						<option value="ttl">제목</option>
						<option value="cntn">내용</option>
						<option value="ttlCntn">제목+내용</option>
				</select> 
				<input type="text" id="jsrwhs_progSrchVal"  class="text_ol"  style="width: 227px;">
			</td>
	
		</tr>
	</table>
	
	<div>
		<table id="jsrwhs_tblComments" class="comment_text"></table>
		<div id="jsrwhs_pgTblComments"></div>
	</div>


<div class="reword_detail" style="width: 1060px">
	<div class="stitle">
		수정요청 상세
	</div>
	<div class="btn">
		<button  type="button" id="jsrwhs_btnSave" class="button">처리</button>
		<button  type="button" id="jsrwhs_btnUpdate" class="button">수정</button>
	</div>
	<form id="jsrwhs_writeHisForm" name="writeHisForm" action="/ajax/myinfo/jisikRewordHis.do" method="post">
		<input type="hidden"id="jsrwhs_infosCommId"/>
		<table class="profile_tbl">
			<colgroup>
				<col style="width : 7%">			
				<col style="width : 20%">			
				<col style="width : 7%">			
				<col style="width : 10%">			
				<col style="width : 7%">			
				<col style="width : 10%">			
				<col style="width : 7%">			
				<col style="width : 10%">			
			</colgroup>
			<tr>
				<th class="line_rt">상담유형</th>
				<td class="line_b" colspan="3"  style="width: 480px;">
					<select class="select_bl" id="jsrwhs_infosCounselKnd1" style="width: 16%;" disabled="disabled"></select>
					<select class="select_bl" id="jsrwhs_infosCounselKnd2" style="width: 24%;" disabled="disabled"></select>
					<select class="select_bl" id="jsrwhs_infosCounselKnd3" style="width: 28%;" disabled="disabled"></select>
					<%--<select class="select_bl" id="jsrwhs_infosCounselKnd4" style="width: 28%;" disabled="disabled"></select>--%>
				</td> 
				<th class="line_c">구분</th>													
				<td class="line_b"><select id="jsrwhs_infosGbKnd" disabled="disabled" style="width: 119px;"></select></td>
				<th class="line_c">진행상태</th>													
				<td class="line_b"><select id="jsrwhs_progKndCd" disabled="disabled" style="width: 119px;"></select></td>
			</tr>
			<tr>
				<th class="line_rt">제목</th>													
				<td class="line_b" colspan="5"><input class="text_ol" id="jsrwhs_infosCommTtl"/></td>
				<th class="line_c">요청구분</th>													
				<td class="line_b">
				<select  class="select_bl" id="jsrwhs_infosCommNew" disabled="disabled" style="width: 117px;">
				</select></td>
			</tr>
			<tr>
				<th class="line_rt">요청내용</th>													
				<td class="line_b" colspan="7" id="jsrwhs_infosCommCntn" ></td>
			</tr>

			<tr>
				<th class="line_rt">처리내용</th>													
				<td class="line_b" colspan="7">
<!-- 				<textarea class="text_ol" id="jsrwhs_infosRespCntn" style="width: 944px; height: 90px; margin-left: 0px;"  readonly="readonly"></textarea> -->
				<div style="overflow-y: scroll; width: 946px; height: 110px; margin-left: 0px;  border: 1px solid rgba(186, 185, 185, 1);" id="jsrwhs_infosRespCntn">
				</div>
				</td>
			</tr>
			<tr>
				<th class="line_rt">요청자</th>													
				<td class="line_b" colspan="3" id="jsrwhs_infosCrtUsrNm"></td>
				<th class="line_c" style="width: 30px;">요청일자</th>													
				<td class="line_b" id="jsrwhs_infosCrtDt"></td>
				<th class="line_c" style="width: 30px;">수정일자</th>													
				<td class="line_b" id="jsrwhs_infosMotDt"></td>
				<!-- <th class="line_c">처리담당자</th>													
				<td class="line_b" id="jsrwhs_infosModUsrNm"></td>
				<th class="line_c" >처리일자</th>													
				<td class="line_b" id="jsrwhs_infosModDt"></td> -->
			</tr>
			
	 		<tr id="jsrwhs_changeTr">
				<th class="line_rt">처리부서</th>													
				<td class="line_b" colspan="3" id="jsrwhs_infosRespDept" ></td>
				<th class="line_c">처리담당자</th>													
				<td class="line_b" id="jsrwhs_infosModUsrNm">
				</td>
				<th class="line_c" >처리일자</th>													
				<td class="line_b" id="jsrwhs_infosProDt"></td>
			</tr>

			
			<tr>
				<th class="line_rt">요청첨부</th>
				<td class="line_b"colspan="7" style="height: 79px;" valign="top">
					<table id="jsrwhs_hisFileInfos" style="width: 100%;">
					<!-- <tr>
						<td colspan="4">
							<input type="hidden" name="record_XXX" value="" />
							<input type="file" id="jsrwhs_HISMANUAL" name="MANUAL" style="width: 80%;"/>
						</td>
						<td>
							<img src="/resources/images/btn_del.png"  alt="삭제" class="icon_add"  id="jsrwhs_rmHisFilebox" style="cursor: pointer;"  />
							<img src="/resources/images/btn_fileadd.png" onClick="addHisFileBox()" alt="파일폼추가" class="icon_add" style="cursor: pointer;"/>
						</td>
					</tr> -->
					</table>
				</td>
			</tr>
		</table>
	</form>
</div>

<table id="jsrwhs_hisfileadd" style="display:none">
	<tr>
		<td colspan="4">
			<input type="hidden" name="record_XXX" value="" />
			<input type="file" id="jsrwhs_HISMANUAL" name="HISMANUAL" style="width: 80%;"/>
		</td>
		<td>
			<img src="/resources/images/btn_del.png" onClick="removeHisFileBox(XXX)" class="icon_add" style="cursor: pointer;" alt="취소" />
		</td>
	</tr>
</table>
</div>
</body>
</html>