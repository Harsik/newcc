<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>

<html lang="ko" style="height: 100%;">

<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>상담DB</title>
<script> var ref = "${param.ref}";</script>
<link rel="icon" href="/resources/images/favicon.ico">
<link rel="stylesheet" href="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.css'/>" type="text/css" />
<%-- <link rel="stylesheet" href="<c:url value='/resources/js/lib/jqgrid/css/ui.jqgrid.css'/>" type="text/css" /> --%>
<link rel="stylesheet" href="<c:url value='/resources/css/popup.css'/>" type="text/css" />
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
<%-- <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script> --%>
<%-- <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script> --%>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
<%-- <script type="text/javascript" src="<c:url value='/resources/js/lib/dext5editor/js/dext5editor.js'/>"></script> --%>
<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/main/jisikDetail.js'/>"></script>	
	<!-- KukudocsEditor  -->
	<script type="text/javascript" src="<c:url value='/resources/KukudocsEditor/javascripts/build/Editor.bundle.js'/>"></script>
    <link rel="stylesheet" href="<c:url value='/resources/KukudocsEditor/stylesheets/style.css'/>" type="text/css" />
</head>

<body>
	<%
		String tbbs_id = request.getParameter("TBBS_ID");
	%>
	<%
		String job = request.getParameter("JOB");
	%>
	<%
		String popup = request.getParameter("popup");
	%>

	<c:set var="tbbs_id" value="<%=tbbs_id%>" />
	<c:set var="job" value="<%=job%>" />
	<c:set var="popup" value="<%=popup%>" />

<%-- 	<input type="hidden" id="jsdeta_tfTbbsId" value="${tbbs_id }" title="게시물ID" alt="게시물ID"> --%>
	<input type="hidden" id="jsdeta_tfJob" value="${job }" title="작업종류" alt="작업종류">
	<input type="hidden" id="jsdeta_tfpopup" value="${popup }" title="팝업유형" alt="팝업유형">
	
	<!-- 
	<input type="hidden" id="jsdeta_prmIntvLgCd" alt="대분류" title="대분류">
	<input type="hidden" id="jsdeta_prmIntvMdCd" alt="중분류" title="중분류">
	<input type="hidden" id="jsdeta_prmIntvSmCd" alt="소분류" title="소분류">
	 -->
	<input type="hidden" id="jsdeta_prmCdbGbCd" alt="게시종류" title="게시종류">
	<input type="hidden" id="jsdeta_prmTbblTtl" alt="게시물명" title="게시물명">

	<div id="h1">상담DB상세</div>
	<div id="op_body" style="padding: 5px; height: 100%; float: left;">

		<div class="stitle" style="margin-top: 12px;">상담DB상세</div>
		<button id="jsdeta_btnClose" class="button" style="margin: 5px; float: right;">닫기</button>
		<button type="button" id="jsdeta_btnJisikDbPopup" class="button" style="display:none;margin: 5px; float: right;">상담DB요청등록</button>
		<button type="button" id="jsdeta_btnCnslAltList" class="button" style="margin: 5px; float: right;">상담DB변경이력</button>
		<button type="button" id="jsdeta_btChEdit" class="button" style="display:none;margin: 5px; float: right;">수정모드</button>
		<button type="button" id="jsdeta_btChView" class="button" style="display:none;margin: 5px; float: right;">보기모드</button>
		<button type="button" id="jsdeta_btnUpdate" class="button" style="display:none;margin: 5px; float: right;">저장</button>
		<div style="overflow: auto; float: left;">
			<form id="jsdeta_writeForm" name="writeForm" action="/ajax/civilservice/csw.do" method="post">
			<table class="profile_tbl" style="margin: 5px 0;">
				<colgroup>
					<col style="width: 3.5%" />
					<col style="width: 12%" />
					<col style="width: 3.5%" />
					<col style="width: 4%" />
					<col style="width: 3.5%" />
					<col style="width: 4%" />
				</colgroup>

				<tr>
					<td class="line_rt">상담유형</td>
					<td class="line_b" id="jsdeta_tfTbbsintvNM" colspan="3"></td>
					<td class="line_b" id="jsdeta_optCounselKnd" colspan="3">
						<select id="jsdeta_prmIntvLgCd" class="select_bl" style="width: 22%;"></select>
						<select id="jsdeta_prmIntvMdCd" class="select_bl" style="width: 23%;"></select>
						<select id="jsdeta_prmIntvSmCd" class="select_bl" style="width: 53%;"></select>
					</td>
					<!-- 	<td class="line_c">조회수</td>
					<td class="line_b" id="jsdeta_tfTbbsinqrCnt"></td> -->
					<td class="line_c">구분</td>
					<td class="line_b" colspan="">
						<label id="jsdeta_tfCdbGbNm"></label>
					</td>
				</tr>
				
				<tr>
					<th class="line_rt" style="height: 30px;">제목</th>
					<td class="line_b" colspan="5">
						<input type="text" id="jsdeta_tfTbbsTtl" class="text_ol" style="width: 99%;" />
					</td>
				</tr>
				
<!-- 				<tr> -->
<!-- 					<td class="line_rt" style="height: 30px;">제목</td> -->
<!-- 					<td class="line_b" colspan="5"> -->
<!-- 						<label id="jsdeta_tfTbbsTtl"></label>  -->
<!-- 						<div id="jsdeta_actRadio" style="float: right;"> -->
<!-- 						<input type="radio" class="radio" name="chargerradio" id="jsdeta_chargerJobProcess" style="width: 12px;"><label for="chargerJobProcess">처리중</label> -->
<!-- 						<input type="radio" class="radio" name="chargerradio" id="jsdeta_chargerJobCompt" style="width: 12px;" checked><label for="chargerJobCompt">처리완료</label> -->
<!-- 						</div> -->
<!-- 					</td> -->
					<!-- 				<td class="line_c">구분</td>
					<td class="line_b"  colspan="">
						<label id="jsdeta_tfCdbGbNm"></label>
					</td> -->
<!-- 				</tr> -->
				<tr>
					<td class="line_rt">업무절차</td>
					<td class="line_b" colspan="5">
						<div id="jsdeta_divTbbsCntn"></div>
					</td>
				</tr>
				<!-- <tr style="height: 85px; ">
					<td class="line_rt">첨부</td>
					<td class="line_b" colspan="7">
							<table id="jsdeta_tblFiles" style="width: 100%; margin: -5px 0;"></table>
					</td>
				</tr>
				<tr >
					<td class="line_rt">담당부서</td>
					<td class="line_b" id="jsdeta_responUsrNm" colspan="3"></td>
					<td class="line_c">전화번호</td>
					<td class="line_b" id="jsdeta_responTelno" colspan="3"></td>
				</tr>
				<tr >
					<td class="line_rt">수정자</td>
					<td class="line_b" id="jsdeta_modUsrNm"></td>
					<td class="line_c">수정일</td>
					<td class="line_b" id="jsdeta_modDtm"></td>
						<td class="line_rt">등록자</td>
					<td class="line_b" id="jsdeta_modUsrNm"></td>
					<td class="line_c">등록일</td>
					<td class="line_b" id="jsdeta_modDtm"></td>
				</tr> -->
				<tr>
					<th class="line_rt">담당부서</th>
					<td class="line_b" id="jsdeta_tfCntrNm" colspan="1"></td>

					<th class="line_c">승인구분</th>
					<td class="line_b" colspan="3" id="jsdeta_appr_yn" align="center"></td>

				</tr>

				<tr>
					<th class="line_rt">담당자</th>
					<td class="line_b" colspan="1" id="jsdeta_tfRespNm">
					<!-- <input type="text" id="jsdeta_txtRespNm" style="width:100%;"> -->
					<textarea class="area_ol" id="jsdeta_txtRespNm" style="width:100%; height:30px;"></textarea>
					</td>
					<!-- <th class="line_c">담당자 변경</th>
					<td class="line_b" colspan="3">
					<input type="text" id="jsdeta_inRespNm" style="display:none;width:80%;">
					<button id="jsdeta_btRespNm" class="button" style="display:none;">저장</button>
					</td> -->
					<th class="line_c" rowspan="4">첨부</th>
					<td class="line_b" colspan="3" rowspan="4" style="height: 80px;">
						<table id="jsdeta_tblFiles" style="width: 100%;"></table>
						
						<!-- 상담DB상세 화면 수정모드에서(공무원 전용) 사용할 파일첨부 테이블 -->
						<table id="csdbrg_fileInfos">
							<tr>
								<td>
									<input type="hidden" name="record_XXX" value="" />
									<input type="file" id="csdbrg_MANUAL" name="csdbrg_MANUAL" style="width: 200%; height: 25px;" />
								</td>
								<td>
									<img src="/resources/images/btn_del.png" alt="삭제" id="csdbrg_rmFilebox" class="icon_comm" style="margin-left: 130px;"/>
								</td>
								<td>
									<img src="/resources/images/btn_fileadd.png" alt="파일폼추가" onClick="addFileBox()" class="icon_comm" />
								</td>
							</tr>
						</table>
						
					</td>					
				</tr>

				<tr>
					<th class="line_rt">전화번호</th>
					<td class="line_b" colspan="1" id="jsdeta_tfResponTel">
					<!-- <input type="text" id="jsdeta_txtResponTel" style="width:100%;"> -->
					<textarea class="area_ol" id="jsdeta_txtResponTel" style="width:100%; height:30px;"></textarea>
					</td>
				</tr>

				<tr>
					<th class="line_rt">등록일시</th>
					<td class="line_b" colspan="1" id="jsdeta_RsctDt"></td>
				</tr>

				<tr>
					<th class="line_rt">수정일시</th>
					<td class="line_b" colspan="1" id="jsdeta_UpdtDt"></td>

				</tr>
			</table>
			
			<input type="hidden" id="jsdeta_tfTbbsId" value="${tbbs_id}" title="게시물ID" alt="게시물ID">
			<input type="hidden" id="jsdeta_tfReqId" value="${reqid}" title="게시물ID" alt="게시물ID">
			
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
				<img src="/resources/images/btn_del.png" onClick="removeFileBox(XXX)" style="cursor: pointer; margin-top: 4px; margin-left: 134px;" alt="취소" />
			</td>
			<td></td>
		</tr>
	</table>
</body>
<!-- 
<script type="text/javascript">
	(function() {
		//SetDivdext5Editor("100%","200px","divTbbsDtls","dtls");
		SetDivdext5Editor("100%", "600px", "jsdeta_divTbbsCntn", "tbbsCont");
	}());
</script> -->
</html>