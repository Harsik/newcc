<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>비밀번호변경(관리자용)</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/user/modifyUserPassword.js'/> "></script>
	</head>
	<body>
		<div id="h1">비밀번호변경(관리자용)</div>
		<div id="pop_body" style="height: 314px;">
			<!-- 버튼 테이블 -->
			<table class="info_tbl_btn">
				<tr>
					<td>
						<button type="button" id="mdfUsrPw_btnUpdate"  class="button">저장</button>
						<button type="button" id="mdfUsrPw_btnExit"  class="button">취소</button>
					</td>
				</tr>
			</table>
			<!--"버튼 테이블"-->
			<form id="mdfUsrPw_userPwForm" name="mdfUsrPw_userPwForm" action="/ajax/user/userPwModify.do" method="post">
				<input type="hidden" id="resultCode"/>
				<input type="hidden" id="message" name="message" value="message"/>
				<table class="profile_tbl" style="height: 220px;">
					<tr>
						<td align="right" style="/* color: red; */ margin-right: 10px; border-bottom-color: rgb(152, 165, 179); border-bottom-width: 1px; border-bottom-style: solid;" colspan="2">
							<div id="chPwd" style="font-size: 11pt; margin-left: 20pt; float: left;"></div>
							<label style="float:right;">전체 상담사 변경</label>
							<input type="checkbox" name="chkAllAgent" id="chkAllAgent" style="margin:0px 5px 0px 0px;">
						</td>
					</tr>
					<tr>
						<th class="line_rt">아이디</th>
						<td class="line_b"><input type="text" class="text_ol" id="mdfUsrPw_usrId" name="usr_Id" maxlength="100" disabled="disabled" value=""></td>
					</tr>
					<tr>
						<th class="line_c">신규 비밀번호</th>
						<td class="line_b"><input type="password" class="text_ol" id="mdfUsrPw_newPw" name="new_Pw" maxlength="100"></td>
					</tr>
					<tr>
						<th class="line_c">신규 비밀번호확인</th>
						<td class="line_b"><input type="password" class="text_ol" id="mdfUsrPw_newPwChk" name="new_Pw_Chk" maxlength="100" ></td>
					</tr>
					<tr>
						<td colspan="2" align="center" style="color:red;">(영문, 숫자, 특수문자 조합하여 8~20자 이내로 입력하시기 바랍니다.)</td>
					</tr>
				</table>
			</form>
		</div>
	</body>
</html>