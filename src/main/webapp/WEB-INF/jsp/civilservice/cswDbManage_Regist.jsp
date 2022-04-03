<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>상담DB등록</title>
<script type="text/javascript">
	var checkInnerPopup = "${param.ap}";
	var news = "${param.regist}";
	var reqid = "${param.reqid}";
	var tbbsid = "${param.tbbsid}";
	var reqcd = "${param.reqcd}";
    var commnew = "${param.commnew}";
</script>
<link rel="icon" href="/resources/images/favicon.ico">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css" />
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-1.12.4.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/dext5editor/js/dext5editor.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/civilservice/cswDbManage_Regist.js'/>"></script>
<%-- <script type="text/javascript" src="<c:url value='/resources/js/civilservice/cswDbManage.js'/>"></script>	 --%>
	<!-- KukudocsEditor  -->
	<script type="text/javascript" src="<c:url value='/resources/KukudocsEditor/javascripts/build/Editor.bundle.js'/>"></script>
	<%-- <script type="text/javascript" src="<c:url value='/resources/KukudocsEditor/externalLib/jquery-1.9.1.min.js'/>"></script> --%>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/KukudocsEditor/stylesheets/style.css" type="text/css" />
<style type="text/css">
#infos {
	border-collapse: collapse;
	border: 1px solid #c5c5c5;
}

#infos  td {
	border: 1px solid #c5c5c5;
	padding: 5px;
}

#infos th {
	background-color: #e5e5e5;
	border: 1px solid #c5c5c5;
	padding: 5px;
	height: 10px;
}

#infos input {
	width: 98%;
}

#fileInfos td {
	border: none;
	padding: 0;
}

#jisiksearch {
	border-collapse: collapse;
	width: 100%;
	background-color: #e5e5e5;
	border: 1px solid #c5c5c5;
	margin: 5px 0 15px 0;
}

#jisiksearch th, #jisiksearch td {
	padding: 5px;
	height: 10px;
}

input[type='text']:disabled {
	background-color: rgba(239, 239, 239, 1);
}
</style>

</head>
<body>
	<div id="h1">상담DB등록</div>
	<div id="pop_body">
		<div style="width: 99%; margin-left: 10px;">
			<div class="stitle" style="float: left;">상담DB상세</div>


			<div style="float: right; margin-bottom: 5px; display: inline-block;">
<!-- 				<button type="button" id="csdbrg_btnInsert" class="button">등록</button> -->
				<button type="button" id="csdbrg_btnInsert" class="button">등록요청</button>
				<button type="button" id="csdbrg_btnDelete" class="button">삭제처리</button>
				<!-- <button type="button" id="csdbrg_btnUpdate" class="button">저장</button> -->
				<button type="button" id="csdbrg_btnInit" class="button">요청DB초기화</button>
			</div>
			<form id="csdbrg_writeForm" name="writeForm" action="/ajax/civilservice/csw.do" method="post">
				<input type="hidden" id="csdbrg_langCd" />
				<input type="hidden" id="csdbrg_chargerJobProcessCtns" />
				<table class="profile_tbl" style="width: 100%;">
					<colgroup>
						<col width="10%">
						<col width="20%">
						<col width="10%">
						<col width="10%">
						<col width="10%">
						<col width="10%">
						<col width="15%">
					</colgroup>
					<tr>
						<th class="line_rt">상담유형</th>
						<td class="line_b">
							<input type="text" id="csdbrg_tfLgMdSmSearch_01" class="text_ol" placeholder="상담유형 소분류 검색어를 입력해 주세요!" style="width: 99%; background-color: #d9f2ff;" />
						</td>
						<td class="line_b" colspan="5">
							<select id="csdbrg_optCounselKnd1" class="select_bl" style="width: 22%;"></select>
							<select id="csdbrg_optCounselKnd2" class="select_bl" style="width: 23%;"></select>
							<select id="csdbrg_optCounselKnd3" class="select_bl" style="width: 50%;"></select>
							<%--<select id="csdbrg_optCounselKnd4" class="select_bl" style="width: 26%;"></select>--%>
						</td>

					</tr>
<!-- 					<tr> -->
<!-- 						<th class="line_c">구분</th> -->
<!-- 						<td class="line_b"> -->
<!-- 							<select id="csdbrg_optGbKnd" disabled="disabled"></select> -->
<!-- 						</td> -->
<!-- 						<th class="line_c">처리상태변경</th> -->
<!-- 						<td class="line_b" colspan="4"> -->
<!-- 							<div id="csdbrg_actRadio" style="float: left; display: none; margin-left: 25px;"> -->
<!-- 								<input type="radio" class="radio" name="chargerradio" id="csdbrg_chargerJobProcess" style="width: 12px;" checked><label for="chargerJobProcess">처리중</label> <input type="radio" class="radio" name="chargerradio" id="csdbrg_chargerJobCompt" style="width: 12px;"><label for="chargerJobCompt">처리완료</label> -->
<!-- 							</div> -->
<!-- 							<textarea class="text_ol" id="csdbrg_chargerJobProcessCtns" style="height: 50px;"></textarea> -->
<!-- 						</td> -->
<!-- 					</tr> -->
					<tr>
						<th class="line_rt">제목</th>
						<td class="line_b" colspan="6">
							<input type="text" id="csdbrg_tfTbbsTtl" class="text_ol" style="width: 99%;" />
						</td>
					</tr>
					<tr>
						<th class="line_rt">내용</th>
						<td class="line_b" colspan="6">
							<!-- <script type="text/javascript">
								DEXT5.configInitServerXml = "http://172.17.100.100:8080/resources/js/lib/dext5editor/handler/upload_handler.ashx?f=dext_editor.xml";
								DEXT5.config.Height = "562px";
								DEXT5.config.Width = "100%";
								DEXT5.config.zStatusBar = "0";
								DEXT5.config.zTopMenu = "1";
								DEXT5.config.zToolBar = "0";
								DEXT5.config.SkinName = "blue";
								var editor = new Dext5editor("tbbsCont");
							</script>	 -->						
							<div id="csdbrg_divTbbsCntn"></div>
						</td>
					</tr>

					<tr>
						<th class="line_rt">미사용 사유</th>
						<td class="line_b" colspan="2">
							<input type="text" id="csdbrg_tfNtuseDesc" class="text_ol" />
						</td>

						<th class="line_c">사용여부</th>
						<td class="line_b">
							<select id="csdbrg_optUseYN" class="select_bl">
								<option value="Y" selected="selected">사용</option>
								<option value="N">미사용</option>
							</select>
						</td>
						<th class="line_c">승인여부</th>
						<td class="line_b">
							<select id="csdbrg_chkNotUseYN" class="select_bl" disabled="disabled">
								<option value="Y">승인</option>
								<option value="N" selected="selected">미승인</option>
							</select>
						</td>
					</tr>

					<tr>
						<th class="line_rt">첨부파일</th>
						<td colspan="6" class="line_b" style="height: 88px;">
							<table id="csdbrg_fileInfos">
								<tr>
									<td>
										<input type="hidden" name="record_XXX" value="" />
										<input type="file" id="csdbrg_MANUAL" name="csdbrg_MANUAL" style="width: 200%; height: 25px;" />
									</td>
									<td>
										<img src="/resources/images/btn_del.png" alt="삭제" id="csdbrg_rmFilebox" class="icon_comm" style="margin-left: 250px;"/>
									</td>
									<td>
										<img src="/resources/images/btn_fileadd.png" alt="파일폼추가" onClick="addFileBox()" class="icon_comm" />
									</td>
								</tr>
							</table>
<!-- 							<div> -->
<!-- 								<p style="color: red; font-weight: bold;">※ 수정요청시 첨부파일은 한번 등록 후 삭제 가능합니다.</p> -->
<!-- 							</div> -->
						</td>
					</tr>
					
					<tr>
						<th class="line_rt">담당부서</th>
						<td class="line_b" colspan="6">
							<!-- <input type="text" id="csdbrg_tfCntrNm" class="text_ol" /> -->
							<textarea class="area_ol" id="csdbrg_tfCntrNm" style="width:100%;"></textarea>
						</td>
					</tr>
					<tr>						
						<th class="line_rt">담당자</th>
						<td class="line_b" id="csdbrg_tfRespNm" colspan="2">
							<!-- <input type="text" id="csdbrg_txtRespNm" style="width:100%;"> -->
							<textarea class="area_ol" id="csdbrg_txtRespNm" style="width:100%; height:30px;"></textarea>
						</td>
						<th class="line_rt">전화번호</th>
						<td class="line_b" id="csdbrg_tfResponTel" colspan="3">
							<!-- <input type="text" id="csdbrg_txtResponTel" style="width:100%;"> -->
							<textarea class="area_ol" id="csdbrg_txtResponTel" style="width:100%; height:30px;"></textarea>
						</td>
					</tr>
					
					<tr>
						<th class="line_rt">신규등록</th>
						<td class="line_b" colspan="2">
							<label id="csdbrg_lbCrtInfo"></label>
						</td>
						<th class="line_c">수정등록</th>
						<td class="line_b" colspan="3">
							<label id="csdbrg_lbModInfo"></label>
						</td>
					</tr>
				</table>
				<input type="hidden" id="csdbrg_langCd" /> <input type="hidden" id="csdbrg_tfTbbsId" />
			</form>
		</div>
	</div>
	<table id="csdbrg_fileadd" style="display: none">
		<tr>
			<td>
				<input type="hidden" name="record_XXX" value="" /> 
				<input type="file" name="MANUAL" class="file_board" style="width: 200%; height: 25px;" />
			</td>
			<td>
				<img src="/resources/images/btn_del.png" onClick="removeFileBox(XXX)" style="cursor: pointer; margin-top: 4px; margin-left: 254px;" alt="취소" />
			</td>
			<td></td>
		</tr>
	</table>
</body>
</html>