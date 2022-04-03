<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>휴가신청 관리</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/myinfo.css" type="text/css"/>
		
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-2.1.1.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery.form.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/common.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/myinfo/vcatnManage.js"></script>
		
	</head>
	<body>
		<!--BODY-->
		<div id="h1">휴가신청 관리</div>
		<div id="pop_body" style="float: left; height: 680px;">
			<div class="stitle">휴가 조회</div><!-- 타이틀 -->
			<!-- 조회/검색 -->
			<div id="search">
				<table class="search_tbl">
					<tr>
						<th>일자</th>
						<td style="text-align: left;">
							<input type="text"  class="text_Date" id="vcatmn_selFrDate" />
							 ~
							<input type="text" class="text_Date" id="vcatmn_selToDate" />		
	  					</td>
	  					<th>휴가구분</th>
						<td class="sel">
							<select id="vcatmn_consentTypes" class="select_bl" ></select>
						</td>
	  					<th>처리구분</th>
						<td class="sel">
							<select id="vcatmn_vcatnListType" class="select_al" ></select>
						</td>
	  					<th>상담사</th>
						<td class="sel" style="width: 100px;">
							<select id="vcatmn_optSrchType" class="select_al" ></select>
						</td>
						<td class="btn">
							<button type="button" id="vcatmn_btnSearch" class="button">조회</button>
							<button type="button" id="vcatmn_btnInit" class="button">초기화</button>
						</td>
					</tr> 
				</table>
			</div><!--"조회/검색"-->
			
			<!--그리드-->
			<div id="grid_all">
				<div id="code_admin_left" style="width: 100%;">
					<!--타이틀-->
					<div class="stitle">상세조회</div>
					<!-- 그리드테이블 -->
					<div class="grid_tbl">
						<div class="info_tbl" style="text-align: right;">
							<button type="button" id="vcatmn_btnExcel"  class="button">엑셀저장</button>
						</div>
						<table style="width:263%; height:200px;">
							<tr>
								<td>
									<div style="width: 38%">
										<table id="vcatmn_tblGroup"></table>
										<div id="vcatmn_innerGrpPager"></div>
									</div>
								</td>
							</tr>
						</table>
					</div>	<!--"그리드테이블"-->
				</div>
			</div><!--"그리드"-->
			<div id="vcatmn_comtable">
				<div class="grid_all" >
					<table class="info_tbl_btn">
						<tr>					
							<td id="vcatmn_divBtn" class="btn">
								<button type="button" id="vcatmn_btnSave"  class="button">저장</button>
								<button type="button" id="vcatmn_btnProp"  class="button">수정</button>
								<button type="button" id="vcatmn_btnDelete"  class="button">삭제</button>
								<button type="button" id="vcatmn_btnViewInit"  class="button">초기화</button>
							</td>
						</tr>
					</table>
     			</div>
     			<form id="vcatmn_writeForm" name="writeForm" action="/ajax/myinfo/vcatnManage.do" method="post">
     				<input type="hidden" id="vcatmn_inpPnctId" />
     				<input type="hidden" id="vcatmn_inpUsrId" />
					<table class="profile_tbl">
						<tr>
							<th class="line_rt" >신청일자</th>
							<td class="line_b">
								<div id="vcatmn_eventPrevent"><input type="text" class="text_Date" id="vcatmn_selRqStdt" /></div>
							</td>
							<th class="line_rt">휴가기간</th>
							<td class="line_b" colspan="2">
							<input type="text" class="text_Date" id="vcatmn_holStart"/> 
							&nbsp;~&nbsp; 
							<input type="text" class="text_Date" id="vcatmn_holEnd"/></td>
							<td class="line_b"></td>
						</tr>
						<tr>
							<th class="line_rt">근태구분</th>
							<td class="line_b"><select id="vcatmn_vcatnViewType" class="select_bl" ></select>
							
							</td>
							<th class="line_rt">신청자</th>
							<td class="line_b"><span id="vcatmn_applcnt"></span></td>
							<th class="line_rt">신청일자</th>
							<td class="line_b"><span id="vcatmn_rqstDt"></span></td>
						</tr>
						<tr>
							<th class="line_rt">처리구분</th>
							<td class="line_b">
							
							<!-- <select id="vcatmn_consentType" class="select_bl" ></select> -->
							<input type="radio" name="consentType" value="100000" id="vcatmn_contentAp" checked /><label for="contentAp">신청&nbsp;</label>
							<input type="radio" name="consentType" value="200000" id="vcatmn_contentCo"/><label for="contentCo">승인&nbsp;</label>
							<input type="radio" name="consentType" value="300000" id="vcatmn_contentRe"/><label for="contentRe">반려</label>
							</td>
							<th class="line_rt">승인자</th>
							<td class="line_b"><span id="vcatmn_confmer"></span></td>
							<th class="line_rt">승인일자</th>
							<td class="line_b"><span id="vcatmn_confmDt"></span></td>
						</tr>
						<tr>
							<th class="line_rb">반려사유</th>
							<td class="line_wb" colspan="5"><input type="text" class="text_ol" id="vcatmn_chgHy" name="chgHy"></td>
						</tr>
					</table>
				</form>
			</div>
		</div><!--"BODY"-->
	</body>
</html>