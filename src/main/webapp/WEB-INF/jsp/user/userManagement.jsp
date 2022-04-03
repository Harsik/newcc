<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">
<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>사용자 관리</title>
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
		<script type="text/javascript" src="<c:url value='/resources/js/user/userManagement.js'/> "></script>
	<style type="text/css">
	
	#imgView {
	    -webkit-transform:scale(1);
	    -moz-transform:scale(1);
	    -ms-transform:scale(1); 
	    -o-transform:scale(1);  
	    transform:scale(1);
	    -webkit-transition:.3s;
	    -moz-transition:.3s;
	    -ms-transition:.3s;
	    -o-transition:.3s;
	    transition:.3s;
	}
	#imgView:hover {
	    -webkit-transform:scale(1.5);
	    -moz-transform:scale(1.5);
	    -ms-transform:scale(1.5);   
	    -o-transform:scale(1.5);
	    transform:scale(1.5);
	}

	</style>
</head>
<body>
		<!--BODY-->
	<div id="h1">사용자 관리</div>
	<div id="pop_body" style="height: 745px;">
		<!--타이틀-->
		<div class="stitle">
		    <!-- <img src="/resources/images/icon_bullet.png" alt=""/> -->사용자 조회
		</div>
		<!--"타이틀"-->
	 	<!-- 조회/검색 -->
		<div id="search">
			<table class="search_tbl">
        		<tr>
        			
		  			<!-- 
		  			<th>등급</th>
          			<td class="sel">
            			<select class="select_al" id="optGrade"></select>
          			</td> 
          			-->
          			
          			<th>소속</th>
          			<td class="sel" style="width: 450px;">
            			<select class="select_al" style="width: 30%;" id="usrMngmnt_selCenter"></select>
            			<select class="select_al" style="width: 30%;" id="usrMngmnt_selTeam"></select>
            			<select class="select_al" style="width: 30%;" id="usrMngmnt_selDept"></select>
          			</td>
		  			<th>검색어</th>
          			<td class="sel">
            			<select class="select_al" id="usrMngmnt_optSrchtype">
              				<option value="all">전체</option>
							<option value="usrId">아이디</option>
							<option value="usrNm">이름</option>
            			</select>
          			</td>
          			<td class="nemo_20" >
            			<input type="text" class="text_ol" id="usrMngmnt_tfSrchval" maxlength="20">
          			</td>
          			<td class="btn">
						<button type="button" id="usrMngmnt_btnSearch"  class="button">조회</button>
						<button type="button" id="usrMngmnt_btnInit"  class="button">초기화</button>
		  			</td>
        		</tr> 		
      		</table>
		</div>
		<!--"조회/검색"-->
		<!--타이틀-->
		<div class="stitle">사용자 목록</div>
		<!--"타이틀"-->
    
    <!--그리드-->
		<div id="grid_all">
			<!-- 미사용/버튼 테이블 -->
			<table class="info_tbl">			
				<tr>				  			
					<td>
						<input type="checkbox" name="check1" class="checkbox" id="usrMngmnt_chkNotUse"><label for="chkNotUse">퇴사자 포함 &nbsp;</label>
						<button type="button" id="usrMngmnt_btnExcel"  class="button">엑셀저장</button>
					</td>
				</tr>
			</table><!--"미사용/버튼 테이블"-->
			<!-- 그리드테이블 -->
	 		<div class="grid_tbl">		 
		 		<table id="usrMngmnt_tblUserList"></table>
				<div id="usrMngmnt_pgUselList"></div>
	   		</div>
			<!--"그리드테이블"-->
			<!-- 버튼 테이블 -->
			<table class="info_tbl_btn">
				<tr>
					<td>
						<button type="button" id="usrMngmnt_btnInsert"  class="button">추가</button>
						<button type="button" id="usrMngmnt_btnModifyPw"  class="button">비밀번호변경</button>
						<button type="button" id="usrMngmnt_btnUpdate"  class="button">저장</button>
						<button type="button" id="usrMngmnt_btnReset"  class="button">초기화</button>
					</td>
				</tr>
			</table>
			<!--"버튼 테이블"-->
     	</div>
     	<!--"그리드"-->
		<!-- 개인정보테이블 -->
		<form id="usrMngmnt_frm1" name="frm1" action="/ajax/user/userManagement.do" method="post">
			<table class="profile_tbl">
				<tr>
                    <td class="line_rt">입사일</td>
					<td class="line_b">
						<input type="text" class="text_ol_70" id="usrMngmnt_entDt" name="entDt" readonly="readonly" maxlength="8">
					</td>
					<td class="line_c">퇴사일</td>
					<td class="line_b">
						<input type="text" class="text_ol_70" id="usrMngmnt_retDt" name="retDt" maxlength="8">
					</td>
					<td class="line_c" rowspan="8">사진</td>
					<td class="line_b" rowspan="8">
						<img src="" name="imgView" id="usrMngmnt_imgView" width="auto" height="175"><br>
						<input type="file" id="usrMngmnt_USR_IMG_PTH" name="USR_IMG_PTH" onchange="readURL(this);">
					</td>
				</tr>
                <tr>
					<td class="line_rt">아이디</td>
					<td class="line_b">
						<input type="text" class="text_ol" name="usrIdText" id="usrMngmnt_usrIdText" maxlength="20">
					</td>
					<td class="line_c">이름</td>
					<td class="line_b">
						<input type="text" class="text_ol" id="usrMngmnt_usrNmText" name="usrNmText" maxlength="160">
					</td>
				</tr>
				<tr>
					<td class="line_rt">등급</td>
					<td class="line_b">
						<select class="select_bl" id="usrMngmnt_usrGrdCd" name="usrGrdCd"></select>
					</td>
					<td class="line_c">직급</td>
					<td class="line_b">
						<select class="select_bl" id="usrMngmnt_dtyCd" name="dtyCd"></select>
					</td>
				</tr>
				<tr>
					<td class="line_rt">센터</td>
					<td class="line_b">
						<select class="select_bl" id="usrMngmnt_cntrCd" name="cntrCd"></select>
					</td>
					<td class="line_c">팀</td>
					<td class="line_b">
						<select class="select_bl" id="usrMngmnt_teamCd" name="teamCd"></select>
					</td>
				</tr>
				<tr>
					<td class="line_rt">부서</td>
					<td class="line_b">
						<select class="select_bl" id="usrMngmnt_deptCd" name="deptCd" disabled="disabled"></select>
					</td>
					<td class="line_c">퇴사사유</td>
					<td class="line_b">
						<select class="select_bl" id="usrMngmnt_usrGrdRetire" name="usrGrdRetire">
						</select>
					</td>
				</tr>
				<tr>
					<td class="line_rt">전화번호</td>
					<td class="line_b">
						<input type="text" class="text_ol_70" id="usrMngmnt_telNo" name="telNo" maxlength="50" onkeydown="return onlyNumber(event)">
					</td>
					<td class="line_c">핸드폰</td>
					<td class="line_b">
						<input type="text" class="text_ol_70" id="usrMngmnt_celNo" name="celNo" maxlength="50" onkeydown="return onlyNumber(event)">
					</td>
				</tr>
				<tr>
					<td class="line_rt">이메일</td>
					<td class="line_b">
						<input type="text" class="text_ol" id="usrMngmnt_emlAdr" name="emlAdr" maxlength="200">
					</td>
                    <td class="line_c">전화기IP주소</td>
					<td class="line_b">
						<input type="text" class="text_ol" id="usrMngmnt_pcIp" name="pcIp" maxlength="100">
					</td>
										
				</tr>
				<tr>
					<td class="line_rb" style="border-bottom: 1px solid #98a5b3;">수정일시</td>
					<td class="line_wb" style="border-bottom: 1px solid #98a5b3;">
						<input type="text" class="text_ol" id="usrMngmnt_modDt" name="modDt" disabled="disabled">
					</td>
					<td class="line_rb2" style="border-bottom: 1px solid #98a5b3;">수정자</td>
					<td class="line_wb" style="border-bottom: 1px solid #98a5b3;">
						<input type="text" class="text_ol" id="usrMngmnt_modUsrId" name="modUsrId" disabled="disabled">
					</td>
				</tr>
                <tr>
                    <td class="line_rt">내선번호</td>
					<td class="line_b">
						<input type="text" class="text_ol_70" id="usrMngmnt_extnNo" name="extnNo" maxlength="5">
					</td>
                    <td class="line_c">CTI사용여부</td>
					<td class="line_b">
						<input type="radio" name="ctiUsrYn" value="Y" checked />사용&nbsp;
						<input type="radio" name="ctiUsrYn" value="N"/>미사용      
					</td>
					<td class="line_c">CTI ID</td>
					<td class="line_b">
						<input type="text" class="text_ol" id="usrMngmnt_ctiLgnId" name="ctiLgnId" maxlength="20">
					</td>
                </tr>
			</table>
			<!--"개인정보테이블"-->
		</form>
	</div><!--"BODY"-->
</body>
</html>