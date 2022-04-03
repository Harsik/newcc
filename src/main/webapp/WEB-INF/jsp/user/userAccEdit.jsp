<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">
<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>내정보 수정</title>
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
		<script type="text/javascript" src="<c:url value='/resources/js/user/userAccEdit.js'/> "></script>
</head>
<body>
	<div id="h1">내정보수정</div>
	<div id="pop_body">
		<!--타이틀-->
		<div class="stitle">
        	내정보수정
		</div>
		<!--"타이틀"-->
		<!-- 미사용/버튼 테이블 -->
		<div id="grid_all">
			<!-- 버튼 테이블 -->
			<table class="info_tbl_btn">
				<tr>
					<td>
						<button type="button" id="btnUpdate"  class="button">저장</button>
					</td>
				</tr>
			</table>
			<!--"버튼 테이블"-->
     	</div>
     	<!-- 개인정보테이블 -->
		<form id="userAccForm" name="userAccForm" action="/ajax/user/userAccEdit.do" method="post">
			<table class="profile_tbl">
				<tr>
					<td class="line_rt">아이디</td>
					<td class="line_b"><input type="text" class="text_ol" name="usrIdText" id="usrIdText" maxlength="20"></td>
					<td class="line_c">이름</td>
					<td class="line_b"><input type="text" class="text_ol" id="usrNmText" name="usrNmText" maxlength="160"></td>
					<td class="line_c" rowspan="3">사진</td>
					<td class="line_b" rowspan="3">
						<img name="imgView" id="imgView" width="100" height="70"><br>
						<input type="file" id="USR_IMG_PTH" name="USR_IMG_PTH">
					</td>
				</tr>
				<tr>
					<td class="line_rt">비밀번호</td>
					<td class="line_b"><input type="password" class="text_ol" id="pwdNoEncCntn" name="pwdNoEncCntn" maxlength="100"></td>
					<td class="line_c">비밀번호확인</td>
					<td class="line_b"><input type="password" class="text_ol" id="pwdNoEncCntnChk" name="pwdNoEncCntnChk" maxlength="100" disabled="disabled"></td>
				</tr>
				<tr>
					<td class="line_rt">입사일</td>
					<td class="line_b"><input type="text" class="text_ol_70" id="entDt" name="entDt" readonly="readonly" maxlength="8"></td>
					<td class="line_c">퇴사일</td>
					<td class="line_b"><input type="text" class="text_ol_70" id="retDt" name="retDt" maxlength="8"></td>
				</tr>
				<tr>
					<td class="line_rt">등급</td>
					<td class="line_b">
						<select class="select_bl" id="usrGrdCd" name="usrGrdCd"></select>
					</td>
					<td class="line_c">직급</td>
					<td class="line_b">
						<select class="select_bl" id="dtyCd" name="dtyCd"></select>
					</td>
					<td class="line_c">CTI사용여부</td>
					<td class="line_b">
						<input type="radio" class="radio" name="ctiUsrYn" id="ctiUsrYn_y" value="Y" checked="checked"><label for="ctiUsrYn_y">사용</label>
						<input type="radio" name="ctiUsrYn" id="ctiUsrYn_n" value="N"><label for="ctiUsrYn_n">미사용</label>
					</td>
				</tr>
				<tr>
					<td class="line_rt">센터</td>
					<td class="line_b">
						<select class="select_bl" id="cntrCd" name="cntrCd"></select>
					</td>
					<td class="line_c">팀</td>
					<td class="line_b">
						<select class="select_bl" id="teamCd" name="teamCd"></select>
					</td>
					<td class="line_c">부서</td>
					<td class="line_b">
						<select class="select_bl" id="deptCd" name="deptCd"></select>
					</td>
				</tr>
<!--  			<tr>
					<td class="line_rt">CTI사용여부</td>
					<td class="line_b">
						<input type="radio" class="radio" name="ctiUsrYn" id="ctiUsrYn_y" value="Y" checked="checked"><label for="ctiUsrYn_y">사용</label>
						<input type="radio" name="ctiUsrYn" id="ctiUsrYn_n" value="N"><label for="ctiUsrYn_n">미사용</label>
					</td>
					<td class="line_c">CTI ID</td>
					<td class="line_b"><input type="text" class="text_ol" id="ctiLgnId" name="ctiLgnId" maxlength="20"></td>
				</tr>  
-->
				<tr>
					<td class="line_rt">전화번호</td>
					<td class="line_b">
						<input type="text" class="text_ol_70" id="telNo" name="telNo" maxlength="50" onkeydown="return onlyNumber(event)">
					</td>
					<td class="line_c">핸드폰</td>
					<td class="line_b">
						<input type="text" class="text_ol_70" id="celNo" name="celNo" maxlength="50" onkeydown="return onlyNumber(event)">
					</td>
					<td class="line_c">내선번호</td>
					<td class="line_b">
						<input type="text" class="text_ol_70" id="extnNo" name="extnNo" maxlength="5">
					</td>
				</tr>
				<tr>
					<td class="line_rt">FAX번호</td>
					<td class="line_b">
						<input type="text" class="text_ol" id="faxNo" name="faxNo" maxlength="50" onkeydown="return onlyNumber(event)">
					</td>
					<td class="line_c">이메일</td>
					<td class="line_b">
						<input type="text" class="text_ol" id="emlAdr" name="emlAdr" maxlength="200">
					</td>
					<td class="line_c">IP주소</td>
					<td class="line_b">
						<input type="text" class="text_ol" id="pcIp" name="pcIp" maxlength="100">
					</td>
				</tr>
				<tr>
					<td class="line_rb">수정일시</td>
					<td class="line_wb">
						<input type="text" class="text_ol" id="modDt" name="modDt" disabled="disabled">
					</td>
					<td class="line_rb2">수정자</td>
					<td class="line_wb">
						<input type="text" class="text_ol" id="modUsrId" name="modUsrId" disabled="disabled">
					</td>
					<td class="line_rb2">MAC주소</td>
					<td class="line_wb">
						<input type="text" class="text_ol" id="pcMac" name="pcMac" maxlength="100">
					</td>
				</tr>
			</table>
			<!--"개인정보테이블"-->
		</form>
	</div>
</body>
</html>