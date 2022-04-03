<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
	<title>상담DB관리</title>
	<script type="text/javascript">
	    var checkInnerPopup = "${param.ap}";
	    var news = "${param.regist}";
	    var reqid="${param.reqid}";
	    var tbbsid="${param.tbbsid}";
	    var reqcd =  "${param.reqcd}"
	</script>
		<link rel="icon" href="/resources/images/favicon.ico">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-1.12.4.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
	<%-- <script type="text/javascript" src="<c:url value='/resources/js/lib/dext5editor/js/dext5editor.js'/>"></script> --%>
	<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/civilservice/cswDbManage_processRegist.js'/>"></script>
	<%-- <script type="text/javascript" src="<c:url value='/resources/js/civilservice/cswDbManage.js'/>"></script>	 --%>
	<!-- KukudocsEditor  -->
	<script type="text/javascript" src="<c:url value='/resources/KukudocsEditor/javascripts/build/Editor.bundle.js'/>"></script>
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
			padding : 5px;
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
		#jisiksearch th, #jisiksearch td{
			padding: 5px;
			height: 10px;
		} 
		
		input[type='text']:disabled{
		background-color: rgba(239, 239, 239, 1);
		}
		
	</style>

</head>
<body>
	<div id="h1">상담DB관리</div>
	<div id="pop_body" style="float:left;">
		<div style="float:left; width: 39%;">
			<!-- table style="background-color: #e5e5e5; border: 1px solid #c5c5c5; width: 100%; height: 30px; margin-bottom: 15px;"-->
			<table id="jisiksearch">
				<colgroup>
					<col width="4%">
					<col width="13%">
					<col width="4%">
					<col width="4%">
					<col width="4%">
					<col width="4%">
				</colgroup>
				<tr>
					<th>상담유형</th>
					<td colspan="5">
						<select id="csprrg_optCounselKnd1_srch" class="select_bl" style="width: 22%;"></select> 
						<select id="csprrg_optCounselKnd2_srch" class="select_bl" style="width: 23%;"></select> 
						<select id="csprrg_optCounselKnd3_srch" class="select_bl" style="width: 52%;"></select> 
						<%--<select id="csprrg_optCounselKnd4_srch" class="select_bl" style="width: 28%;"></select>--%>
					</td>
				</tr>
				<!--<tr>
					<th>유형검색</th>
					<td colspan="3">
						<input type="text" id="csprrg_tfLgMdSmSearch_01" class="text_ol" placeholder="상담유형 소분류 검색어를 입력해 주세요!" style="width: 567px; background-color:#d9f2ff;" />
				</tr> -->
				<tr>
					<th>등록일자</th>
					<td>
						<input type="text" id="csprrg_selFrDate" class="text_ol_half" readonly="readonly" style="width: 65px;" maxlength="10" /> ~ <input type="text" id="csprrg_selToDate" class="text_ol_half" readonly="readonly" style="width: 65px;" maxlength="10" />
					</td>
					<th style="text-align: right;">승인구분</th>
					<td>
						<select id="csprrg_chkNotUsetype" class="select_bl">
							<option value="all">전체</option>
							<option value="Y">승인</option>
							<option value="N">미승인</option>
							<!-- <option value="P">처리중</option> -->
						</select>
					</td>
					<th style="text-align: right;">구분</th>
					<td>
						<select id="csprrg_optGbKnd_srch" class="select_bl"></select>
					</td>
				</tr>
				<tr>
					<th>상세검색</th>
					<td colspan="3">
					<select id="csprrg_tfSrchType" class="select_bl_my" style="width: 20%;">
							<option value="ttl" selected="selected">제목</option>
							<option value="cntn">내용</option>
							<option value="ttlCntn">제목 + 내용</option>
					</select> 
					<input type="text" id="csprrg_tfSrchVal" class="text_ol" style="width: 75%;" /></td>

					<td colspan="2">
						<div class="btn">
						<button id="csprrg_btnSearch" class="button" style="float: right; " >검색</button>
						<button id="csprrg_btnExcelPopup" class="button" style="float: right; margin-right: 5px;">엑셀저장</button>
						</div>
					</td>
				</tr>
			</table>
				<input class="checkbox" id="csprrg_useyn" type="checkbox" style="margin-left: 569px;"><label for="useyn">미사용 포함</label>
			<div>
				<table id="csprrg_tblManualList"></table>
				<div id="csprrg_pgManualList"></div>
			</div>
		</div>
		<!-- right -->
		<div style="float:left; width: 60%; margin-left: 10px;">
			<div class="stitle" style="float: left;">상담DB 상세</div>
			<div style="float: right; margin-bottom: 5px; display: inline-block;">
				<button type="button" id="csprrg_btnInsert" class="button">등록</button>
				<button type="button" id="csprrg_btnUpdate" class="button">저장</button>
				<button type="button" id="csprrg_btnInit" class="button">요청DB초기화</button>
			</div>
			<form id="csprrg_writeForm" name="writeForm" action="/ajax/civilservice/csw.do" method="post">
				<input type="hidden" id="csprrg_langCd"/>
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
						<td class="line_b" colspan="4">
							<select id="csprrg_optCounselKnd1" class="select_bl" style="width: 22%;"></select>
							<select id="csprrg_optCounselKnd2" class="select_bl" style="width: 23%;"></select>
							<select id="csprrg_optCounselKnd3" class="select_bl" style="width: 50%;"></select>
							<%--<select id="csprrg_optCounselKnd4" class="select_bl" style="width: 26%;"></select>--%>
						</td>
						<th class="line_c">구분</th>
						<td class="line_b"><select id="csprrg_optGbKnd"></select></td>
					</tr>
					<tr>
						<th class="line_rt">유형검색</th>
						<td class="line_b" colspan="6" >
							<input type="text" id="csprrg_tfLgMdSmSearch_01" class="text_ol" placeholder="상담유형 소분류 검색어를 입력해 주세요!" style="width: 862px; background-color:#d9f2ff;" />
						</td> 
					</tr>
					<tr>
						<th class="line_rt">제목</th>
						<td class="line_b" colspan="6" >
							<input type="text" id="csprrg_tfTbbsTtl" class="text_ol" style="width: 862px;" />
						</td> 
					</tr>
					<tr>
						<th class="line_rt">내용</th>													
						<td class="line_b" colspan="6">
<!-- 							<script type="text/javascript">   
							  DEXT5.configInitServerXml = "http://172.17.100.100:8080/resources/js/lib/dext5editor/handler/upload_handler.ashx?f=dext_editor.xml";
								DEXT5.config.Height  = "562px";
								DEXT5.config.Width  = "100%";
								DEXT5.config.zStatusBar = "0";
							  DEXT5.config.zTopMenu = "1";
							  DEXT5.config.zToolBar  = "0";	
							  DEXT5.config.SkinName = "blue";
								var editor = new Dext5editor("tbbsCont");              	              
							</script> -->
							<div id="csprrg_divTbbsCntn"></div>
						</td>
					</tr>

					<tr>
						<th  class="line_rt">미사용 사유</th>
						<td  class="line_b" colspan="2" ><input type="text" id="csprrg_tfNtuseDesc" class="text_ol"/> </td>
						
						<th class="line_c">사용여부</th>
						<td class="line_b" >
							<select id="csprrg_optUseYN" class="select_bl" >
								<option value="Y" selected="selected">사용</option>
								<option value="N">미사용</option>
							</select>
						</td>
						<th class="line_c">승인여부</th>
						<td class="line_b" >
							<select id="csprrg_chkNotUseYN" class="select_bl" >
								<option value="Y">승인</option>
								<option value="N" selected="selected">미승인</option>
							</select>
						</td>
					</tr>
			
					<tr style="height: 87px;">
						<th class="line_rt" >첨부파일</th>
						<td class="line_b" rowspan="1" valign="middle" colspan="6">
							<div style="float: left; height: 100%;">
							<table id="csprrg_fileInfos">
								<tr>
									<td colspan="4"><input type="hidden" name="record_XXX" value="" /> <input type="file" id="csprrg_MANUAL" name="MANUAL" /></td>
									<td><img src="/resources/images/btn_del.png" alt="삭제" id="csprrg_rmFilebox" class="icon_comm" /></td>
									<td><img src="/resources/images/btn_fileadd.png" onClick="addFileBox()" alt="파일폼추가" class="icon_comm" /></td>
								</tr>
							</table>
							</div>
							<div style="z-index:3; text-align:center; line-height:80px; width:320px; position: absolute; right:0px; ">
							<p style="color: red; font-weight: bold;">※ 첨부파일은 보안해제후 첨부 바랍니다.</p>
							</div>
						</td>
					</tr>
							
					<tr>
						<th class="line_rt" >신규등록</th>
						<td class="line_b" colspan="2"><label id="csprrg_lbCrtInfo"></label></td>
						<th class="line_c">수정등록</th>
						<td class="line_b" colspan="3"><label id="csprrg_lbModInfo"></label></td>
					</tr>
				</table>
				<input type="hidden" id="csprrg_langCd"/>
				<input type="hidden" id="csprrg_tfTbbsId" />
			</form>
		</div>
	</div>
	<table id="csprrg_fileadd" style="display:none">
		<tr>
			<td colspan="4">
				<input type="hidden" name="record_XXX" value="" />
				<input type="file" name="MANUAL" class="file_board"/>
			</td>
			<td>
				<img src="/resources/images/btn_del.png" onClick="removeFileBox(XXX)" style="cursor: pointer; margin-top: 4px; margin-left: 4px;" alt="취소" />
			</td>
			<td></td>
		</tr>
	</table>
</body>
</html>