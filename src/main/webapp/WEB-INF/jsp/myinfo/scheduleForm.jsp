<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	<title>일정등록</title>
	<link rel="icon" href="/resources/images/favicon.ico">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-timepicki/css/timepicki.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/myinfo.css" type="text/css"/>
	
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-2.1.1.min.js"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-timepicki/js/timepicki.js'/>"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/common.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/myinfo/scheduleForm.js"></script>
</head>
<style>
.profile_tbl .line_b { /*입력칸 아래선*/
	width: auto;
}

.info_tbl_btn {
   margin: auto;
}
.profile_tbl th.line_rt {
   width: 8%;
}
</style>
<body>
<% 
	String id = request.getParameter("id")==null?"":request.getParameter("id"); 
%>
	<c:set var="id" value="<%=id%>" />
	<input type="hidden" id="tfId" value="${id }" style="height: 0px;">
	<div id="h1">일정등록 </div>
	<div id="pop_body" style=" float: left; height: 680px;">
		<table class="info_tbl_btn">
			<tr>
				<td>
					<button type="button" id="btnSchList" class="button">일정보기</button>
				</td>
			</tr>
		</table>
		<div class="stitle">일정등록</div>
		<div  style=" float: left;  padding : 10px; background-color: #E5EAF5; border: 1px solid #dddddd;">
			<table class="info_tbl_btn">
				<tr>
					<td style="height: 20px;">
						<button type="button" id="btnSave" class="button">등록</button>
						<button type="button" id="btnMod" class="button">수정</button>
						<button type="button" id="btnDel" class="button">삭제</button>
					</td>
				</tr>
			</table>
			<form id="writeForm" name="writeForm" action="/ajax/myinfo/wirteForm.do" method="post">
				<table class="profile_tbl" style="margin-bottom: 10px;">
					<tr>
						<th class="line_rt">일자</th>
						<td class="line_b"><input type="text" class="text_Date" id="schDate" disabled="disabled"/> </td>
						<th class="line_rt">시간</th>
						<td class="line_b" style="width: 19%;">
							<input type="text" class="text_Time" id="schTimeSt"/>
							<span>~</span>
							<input type="text" class="text_Time" id="schTimeEn"/>
						</td>
						<th class="line_rt">상담사</th>
						<td class="line_b"><select id="optCounselNm"></select></td>
						<th class="line_rt">구분</th>
						<td class="line_b">
<!-- 						<input name="optCdbKnd" class="radio" id="rdSearchGb_al1" type="radio"  value="all">전체 -->
						<input name="optCdbKnd" class="radio" id="rdSearchGb_al2" type="radio"  value="010000">개인
						<input name="optCdbKnd" class="radio" id="rdSearchGb_al3" type="radio"  value="020000">공통
						</td>
					</tr>
					<tr>
						<th class="line_rb">내용</th>
						<td class="line_wb" colspan="7">
							<textarea class="area_ol" style="height:542px;" id="tfCont" maxlength="1333"></textarea>
						</td>
					</tr>
				</table>
			</form>
		</div>
	</div>
</body>
</html>