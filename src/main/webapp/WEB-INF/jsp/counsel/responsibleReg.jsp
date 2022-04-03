<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>

<html>
	<head>
		<meta charset="UTF-8">
		<meta name="Generator" content="EditPlus">
		<meta name="Author20%" content="">
		<meta name="Keywords" content="">
		<meta name="Description" content="">
		
		<title>담당자 등록</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jstree/themes/default/style.min.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jstree/jstree.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/counsel/responsibleReg.js'/>"></script>
		<style>
			div.scrollable 
			{
			    width: 100%;
			    margin: 0;
			    padding: 0;
			    overflow: auto;
			}
			#gbox_tblEmp .ui-jqgrid-bdiv { overflow-y: scroll }
			.grid_cursor
			{
				cursor: pointer;
			}
		</style>
		
	</head>
	
	<body>
					
		<!--BODY-->
		<div id="h1">당담자등록</div>
		<div id="pop_body">
			<!--타이틀-->
			<div class="stitle">당담자등록	</div><!--"타이틀"-->
			
			<!-- 버튼 테이블 -->
			<table class="info_tbl_right">
				<tr>
					<td>
						<button type="button" id="btnResponClose" class="button">닫기</button>
					</td>
				</tr>
			</table><!--"버튼 테이블"-->
			
			<!--그리드-->
			<div id="grid_all">
				
				<!--왼쪽그리드-->
				<div id="code_left">
					      
					<!-- 조회/검색 -->
					<div id="search">
						<table class="search_tbl">
							<tr>
								<td class="sel">
									<select id = "optSrchType" class="select_al">
										<option value = "usrNm">이름</option>
										<option value = "usrId">사번</option>
									</select>
								</td>  
								<td class="nemo_30">
									<input type="text" id = "tfSrchVal" class="text_ol">
								</td> 
								<td class="btn">
									<button type="button" id="btnSearch"  class="button">조회</button>
									<button type="button" id="btnInit"  class="button">초기화</button>
								</td>
							</tr> 
						</table>
					</div><!--"조회/검색"-->
					
					<!-- 미사용/버튼 테이블 -->
					<table class="info_tbl">
						<tr>
							<th><label id = "totalRow"></label></th>
							<td>
								<input type="checkbox" id ="chkNotLowLevDept" class="checkbox" />
								<label for = "chkNotLowLevDept">하위부서 사원까지 포함</label>
							</td>
						</tr>
					</table><!--"미사용/버튼 테이블"-->
					
					<!-- 그리드테이블 -->
					<div class="grid_tbl">		 
						<table style="width:100%; height:260px;">
							<tr>
								<td valign=top  style = "width: 48%; text-align: left; height : 260px; border: 1px solid #acacac;">
				        			<div id = "listTeam" class = "scrollable" style = "height: 285px;"></div>
					        	</td>
					        	<td style = "width: 52%">
					        		<table id = "tblEmp"></table>
								</td>   
							</tr>
						</table>
					</div>	<!--"그리드테이블"-->
					
					<table class="profile_tbl">
						<tr>
							<td class="line_wb" rowspan="9" style = "text-align: center;">
								<img id = "imgPerson" alt="" src=""/>
							</td>
							<td class="line_c">성명</td>
							<td class="line_b">
								<label id = "txtName"></label>
							</td>
						</tr>
						<tr>
							<td class="line_c">팀/근무지역</td>
							<td class="line_b">
								<label id = "txtTeam"></label>
							</td>
						</tr>
						<tr>
							<td class="line_c">직급</td>
							<td class="line_b">
								<label id = "txtGrade"></label>
							</td>
						</tr>
						<tr>
							<td class="line_c">내선전화</td>
							<td class="line_b">
								<span id = "txtExtensionNum"></span>
							</td>
						</tr>
						<tr>
							<td class="line_c">직통전화</td>
							<td class="line_b">
								<span id = "txtDirectNum"></span>
							</td>
						</tr>
						<tr>
							<td class="line_c">휴대전화</td>
							<td class="line_b">
								<span id = "txtMobileNum"></span>
							</td>
						</tr>
						<tr>
							<td class="line_c">팩스</td>
							<td class="line_b">
								<span id="txtFaxNum"></span>
							</td>
						</tr>
						<tr>
							<td class="line_c">이메일</td>
							<td class="line_b">
								<label id = "txtMail"></label>
							</td>
						</tr>
						<tr>
							<td class="line_rb2">재직여부</td>
							<td class="line_wb">
								<label id = "txtWorkYn"></label>
							</td>
						</tr>
					</table>
					
				</div><!--"왼쪽그리드"-->
				
				<!--오른쪽그리드-->
				<div id="code_right_person">
					      
					<!--타이틀-->
					<div class="stitle">담당자</div><!--"타이틀"-->
					
					<!-- 조회/검색 -->
					<div id="search">
						<table class="search_tbl">
							<tr>
								<th>완료예정일</th>
								<td class="btn">
									<input type="text" id = "tfCompDt" readOnly>
								</td>
								<th>담당자</th>
								<td class="btn">
									<input type="text" id = "tfResposible" readOnly>
									<button type="button" id="btnReg"  class="button">등록</button>
								</td>
							</tr> 
						</table>
					</div><!--"조회/검색"-->
					
					<!-- 미사용/버튼 테이블 -->
					<table class="info_tbl">
						<tr>
						</tr>
					</table><!--"미사용/버튼 테이블"-->
					
					<!-- 그리드테이블 -->
					<div class="grid_tbl">		 
						<table style="width:100%; height:200px;">
							<tr>
								<td>
									<table id = "tblRespon"></table>
									<div id = "innerRespon"></div>
								</td>
							</tr>
						</table>
					</div>	<!--"그리드테이블"-->
					
					<!--타이틀-->
					<div class="stitle_bot">첨부파일</div><!--"타이틀"-->
					<table class="info_tbl">
						<tr>
							<td>
								<form id="frm1" name="frm1" action="/ajax/user/userManagement.do" method="post">
									<input type="file" id="JOB" name="JOB">
									<button type="button" id="btnFileSearch"  class="button">등록</button>
								</form>
							</td>
						</tr>
					</table>
					
					<!-- 그리드테이블 -->
					<div class="grid_tbl">		 
						<table style="width:100%; height:200px;">
							<tr>
								<td>
									<table id = "tblFile"></table>
									<div id = "innerFile"></div>
								</td>
							</tr>
						</table>
					</div>	<!--"그리드테이블"-->
					
				</div><!--"오른쪽그리드"-->
			</div><!--"그리드"-->
		</div><!--"BODY"-->
		
	</body>
</html>