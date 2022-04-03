<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
	<title>공무원 업무</title>
	<link rel="icon" href="/resources/images/favicon.ico">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/myinfo.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.css" type="text/css"/>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/dext5editor/js/dext5editor.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/civilservice/cswDbManage_processDetail.js'/>"></script>	
	<!-- KukudocsEditor  -->
	<script type="text/javascript" src="<c:url value='/resources/KukudocsEditor/javascripts/build/Editor.bundle.js'/>"></script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/KukudocsEditor/stylesheets/style.css" type="text/css" />
</head>
	
<body>
	<div id="h1">상담DB</div>
	<div id="pop_body" style="height: 845px;">
				<div class="stitle">상담DB상세-팝업</div>	
				
				<div class="btn" style="float: right">
					<button id="btnProcsDbRecode" class="button">상담DB변경이력 조회</button>
					<button id="btnProsInsert" class="button">저장</button>
				</div>
				<form id="writeForm" name="writeForm" action="/ajax/civilservice/CnsltDbProcessDetail.do" method="post">
					<table class="profile_tbl">
						<tr>
							<th class="line_rt">상담유형</th>
							<td  class="line_b" style="width: 40px;" colspan="9">
								<select id="procsCnsltKnd1" class="select_bl" style="width: 24%;"></select>
								<select id="procsCnsltKnd2" class="select_bl" style="width: 24%;"></select>
								<select id="procsCnsltKnd3" class="select_bl" style="width: 24%;"></select>
								<%--<select id="procsCnsltKnd4" class="select_bl" style="width: 25%;"></select>--%>
							</td>
						</tr>

						<tr>
							<th class="line_rt">업무명</th>
							<td colspan="9" class="line_b"><input type="text" id="ProcsJobName" class="text_ol"></td> 
										
						<tr>
							<th class="line_rt">업무절차</th>													
							<td colspan="9"  class="line_b" id="taCommCntn">
							</td>
						</tr>
						
						<tr>
							<th class="line_rt">첨부파일</th>
							<td colspan="9" class="line_b" style="height: 88px; vertical-align: top;">
							<table id="procsFiles">
								<tr>
									<td colspan="4">
										<input type="hidden" name="record_XXX" value="" />
										<input type="file" id="MANUAL" name="MANUAL" />
									</td>
									<td>
										<img src="/resources/images/btn_del.png"  alt="삭제"  onClick="removeFileBox(XXX)" id="rmFilebox" class="icon_comm" />
									</td>
									<td>
										<img src="/resources/images/btn_fileadd.png"  onClick="addFileBox()" alt="파일폼추가" class="icon_comm" />
									</td>
								</tr>
							</table>
							</td>
						</tr>
		
						<tr>
							<th class="line_rt">담당자</th>
							<td colspan="3" id="procsCharger" class="line_b"></td>
							
							<th class="line_c">요청구분</th>
							<td colspan="2" class="line_b" id="procsRequstSe"></td>
							
							<th class="line_c">DB구분</th>
							<td colspan="2" class="line_b"><select id="procsDbSe" class="select_bl"></select></td>
						</tr>
						
						<tr>
							<th class="line_rt">진행상태</th>
							<td colspan="3" id="procsIngStat" class="line_b"></td>
							<th class="line_c">변경사유</th>
							<td colspan="5" id="procschangeRea" class="line_b"></td>
						</tr>
					
						<tr>
							<th class="line_rt">등록일시</th>
							<td  colspan="3" id="procsRsctDt" class="line_b"></td>
							
							<th class="line_c">수정일시</th>
							<td  colspan="5" id="ProcsUpdtDt" class="line_b"></td>
						</tr>
					</table>
				</form>
			</div>

		<table id="fileadd" style="display: none">
			<tr>
				<td colspan="4"><input type="hidden" name="record_XXX" value="" /> <input type="file" name="MANUAL" class="file_board" /></td> 
				<td><img src="/resources/images/btn_del.png" style="cursor: pointer; margin-top: 4px; margin-left: 4px;" alt="취소" /></td>
				<td></td>
			</tr>
		</table>


</body>
<script type="text/javascript">
calledit(); 
</script>
</html>