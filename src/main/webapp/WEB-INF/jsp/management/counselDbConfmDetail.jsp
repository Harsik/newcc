<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>상담DB상세</title>
<link rel="icon" href="/resources/images/favicon.ico">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/myinfo.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.css" type="text/css" />
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/dext5editor/js/dext5editor.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/management/counselDbConfmDetail.js'/>"></script>
<!-- query string setting -->
<script type="text/javascript">
	var reqId = '${param.reqId}';
	var tblId = '${param.tblId}';
	var reqCd = '${param.reqCd}';
	var wrkId = '${param.wrkId}';
</script>
<!-- KukudocsEditor  -->
<script type="text/javascript" src="<c:url value='/resources/KukudocsEditor/javascripts/build/Editor.bundle.js'/>"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/KukudocsEditor/stylesheets/style.css" type="text/css" />
</head>
<body>
	<div id="h1">상담DB상세</div>
	<div id="pop_body" style="height: 845px;">
		<div class="stitle">상담DB상세</div>

		<div class="btn" style="float: right">
			<button id="csdbdt_btnDbRecode" class="button">상담DB변경이력 조회</button>
			<button id="csdbdt_btnInsert" class="button">저장</button>
		</div>
		<form id="csdbdt_writeForm" name="writeForm" action="/ajax/management/CnsltDbProcessDetail.do" method="post">
			<table class="profile_tbl" style="width: 100%;">
				<colgroup>
					<col width="10%">
					<col width="10%">
					<col width="10%">
					<col width="10%">
					<col width="10%">
					<col width="10%">
					<col width="10%">
					<col width="10%">
				</colgroup>
				<tr>
					<th class="line_rt">상담유형</th>
					<td class="line_b" colspan="5">
						<select id="csdbdt_optCounselKnd1" class="select_bl" style="width: 22%;"></select>
						<select id="csdbdt_optCounselKnd2" class="select_bl" style="width: 23%;"></select>
						<select id="csdbdt_optCounselKnd3" class="select_bl" style="width: 50%;"></select>
						<%--<select id="csdbdt_optCounselKnd4" class="select_bl" style="width: 26%;"></select>--%>
					</td>
					<th class="line_c">DB구분</th>
					<td class="line_b">
						<select id="csdbdt_optGbKnd" disabled="disabled"></select>
					</td>
				</tr>
				<tr>
					<th class="line_rt">진행상태</th>
					<td colspan="5" class="line_b" id="csdbdt_ingStat" style="text-align: center">
						<input type="radio" class="radio" name="deptradio" id="csdbdt_jobRcept" style="width: 10px;" disabled="disabled"><label for="jobRcept">접수</label>
						 <input type="radio" class="radio" name="deptradio" id="csdbdt_jobChrgAppn" style="width: 10px;" disabled="disabled"><label for="jobChrgAppn">담당자지정</label> 
						 <input type="radio" class="radio" name="deptradio" id="csdbdt_jobChrgAppn2" style="width: 10px;" disabled="disabled"><label for="jobChrgAppn">담당자(재)지정</label> 
						 <input type="radio" class="radio" name="deptradio" id="csdbdt_jobProcess" style="width: 10px;" disabled="disabled"><label for="jobProcess">처리중</label> 
						 <input type="radio" class="radio" name="deptradio" id="csdbdt_jobCompt" style="width: 10px;" disabled="disabled"><label for="jobCompt">완료</label> 
						 <input type="radio" class="radio" name="deptradio" id="csdbdt_jobRetrn" style="width: 10px;" disabled="disabled"><label for="jobRetrn">반송</label>
						 <input type="radio" class="radio" name="deptradio" id="csdbdt_jobReqRsn" style="width: 10px;" disabled="disabled"><label for="jobReqRsn">재작성요청</label>
					</td>
					<th class="line_c">요청구분</th>
					<td class="line_b" id="csdbdt_requstSe" style="text-align: center;" disabled="disabled"></td>
				</tr>
				<tr>
					<th class="line_rt">제목</th>
					<td class="line_b" colspan="7">
						<input type="text" id="csdbdt_tfTbbsTtl" class="text_ol" style="width: 862px;" disabled="disabled"/>
					</td>
				</tr>
				<tr>
					<th class="line_rt">내용</th>
					<td class="line_b" colspan="7" id="csdbdt_tbbsCont"></td>					
				</tr>
				
				<tr style="height: 67px;">
					<th  class="line_rt">수정내용</th>
					<td  class="line_b" colspan="7" >
					<input type="text" id="csdbdt_tbbsModiCont" class="text_ol" style="width: 100%; height: 91%;" disabled="disabled"/> </td>
				</tr>
				
				<tr>
					<!-- <th  class="line_rt">미사용 사유</th>
						<td  class="line_b" colspan="2" ><input type="text" id="csdbdt_tfNtuseDesc" class="text_ol"/> </td> -->
					<th class="line_rt">담당부서</th>
					<td class="line_b" id="csdbdt_tfCntrNm" colspan="4"></td>
					<th class="line_c">사용여부</th>
					<td class="line_b" colspan="2">
						<select id="csdbdt_optUseYN" class="select_bl" disabled="disabled">
							<option value="Y" selected="selected">사용</option>
							<option value="N">미사용</option>
						</select>
					</td>				
				</tr>
				<tr>
					<th class="line_rt">담당자</th>
					<td class="line_b" colspan="4">
					<textarea class="area_ol" id="csdbdt_charger" style="width:100%;"></textarea>
					</td>
					
					<th class="line_c">승인여부</th>
					<td class="line_b" colspan="2">
						<select id="csdbdt_chkNotUseYN" class="select_bl">
							<option value="Y">승인</option>
							<option value="N" selected="selected">미승인(재작성요청)</option>
						</select>
					</td>
				</tr>
				<tr>
					<th class="line_rt">전화번호</th>
					<td class="line_b" colspan="4">					
					<textarea class="area_ol" id="csdbdt_tfResponTel" style="width:100%;"></textarea>
					</td>
					<th class="line_c" rowspan="2">재작성<br>요청사유</th>
					<td class="line_b" colspan="2" rowspan="2">
						<textarea title="요청사유" class="area_ol" id="csdbdt_tfReqRsn" style="width:100%;height:95%;" maxlengt="4000"></textarea>
					</td>
				</tr>

				<tr style="height: 57px;">
					<th class="line_rt">첨부파일</th>
					<td colspan="7" class="line_b" style="height: 53px;" valign="middle">
						<table id="csdbdt_Files">
						</table>
					</td>
				</tr>
			</table>	
				<input type="hidden" id="csdbdt_tfTbbsId" />
		</form>
	</div>

	<table id="csdbdt_fileadd" style="display: none">
		<tr>
			<td colspan="4">
				<input type="hidden" name="record_XXX" value="" /> <input type="file" name="MANUAL" class="file_board" />
			</td>
			<td>
				<img src="/resources/images/btn_del.png" style="cursor: pointer; margin-top: 4px; margin-left: 4px;" alt="취소" />
			</td>
		</tr>
	</table>
</body>
</html>