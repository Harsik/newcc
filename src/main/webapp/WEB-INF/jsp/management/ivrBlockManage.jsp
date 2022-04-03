<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>악성민원관리</title>
	<link rel="icon" href="/resources/images/favicon.ico">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
	
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-2.1.1.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/common.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/listenRec.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/management/ivrBlockManage.js"></script>

</head>
<body style="overflow-x:hidden;">
	<div id="h1">악성민원 관리</div>
	<div id="pop_body">
		<div class="stitle">악성민원 조회</div>
		<div id="search">
			<table class="search_tbl">
				<tr>
					<th>상담사</th>
					<td class="sel" style="width: 100px;">
						<select id = "blockManage_optSrchUsr" class="select_al" ></select>
					</td>
					<th>유형</th>
					<td class="sel" style="width: 215px;">
						<select id = "blockManage_optSrchStatType" class="select_al" >
							<option value="all">전체</option>
							<option value="7021">욕설/폭언/협박/모욕</option>
							<option value="7022">성희롱</option>
							<option value="7023">민원요지불명/장시간통화/반복억지</option>
							<option value="7024">상습강요</option>
						</select>
					</td>
					<th style="padding-left: 40px;">
						<select id="blockManage_optSrchDateType">
							<option value="blockDt">차단일</option>
							<option value="crtDt">생성일</option>
						</select>
					</th>
					<td width="30%" style="text-align: left;">
						<input type="text" style="width: 80px;" class="area_bl" id="blockManage_selStrtDate" maxlength="16" readonly>~
						<input type="text" style="width: 80px;" class="area_bl" id="blockManage_selEndDate" maxlength="16" readonly>		
  					</td>
  					<td>
						<input type="checkbox" id="blockManage_useCategory" class="checkbox" style="margin: 0; margin-left: 10px;"/>
						<label for="useCategory">미사용포함</label>
					</td>
					<td class="btn">
						<button type="button" id="blockManage_btnSearch" class="button">조회</button>
						<button type="button" id="blockManage_btnInit" class="button">초기화</button>
					</td>
				</tr> 
			</table>
		</div>
	
		<!-- 그리드 -->
        <div id="grid_all">
			<div id="code_admin_left" style="width: 100%;">
				<!-- 그리드테이블 -->
				<div class="grid_tbl">
					<div class="info_tbl" style="text-align: right;">
						<button type="button" id="blockManage_btnExcel"  class="button">엑셀저장</button>
					</div>
					<table style="width:263%; height:200px;">
						<tr>
							<td>
								<div style="width: 38%">
									<table id = "blockManage_tblBlockList"></table>
									<div id = "blockManage_pgBlockList"></div>
								</div>
							</td>
						</tr>
					</table>
				</div>	
				<!--"그리드테이블"-->
			</div>
		</div>
		<!--"그리드"-->
        
            <div id="blockManage_comtable">
                <div id="grid_all">
                    <!-- 버튼 테이블 -->
                    <table class="info_tbl_btn" style="height: 24px;">
                        <tr>                    
                            <td id="blockManage_divBtn" class="btn" style="display: none;">
                                <button type="button" id="blockManage_btnHistory"  class="button">상담이력</button>
                                <button type="button" id="blockManage_btnUpdate"  class="button">수정</button>
                            </td>
                        </tr>
                    </table>
            <!--"버튼 테이블"-->
                </div>
                <input type="hidden" id="blockManage_blockId">
                <input type="hidden" id="blockManage_tcktId">
                <table class="profile_tbl">
					<tr>
						<th class="line_rt" >전화번호</th>
						<td class="line_b" id="blockManage_custTelNo"></td>
						<th class="line_rt">차단시작일</th>
						<td class="line_b" id="blockManage_startDt"></td>
						<th class="line_rt">생성일</th>
						<td class="line_b" id="blockManage_crtDttm"></td>
					</tr>
					<tr>
						<th class="line_rt">사용유무</th>
							<td class="line_b">
							<input type="radio" name="consentType" value="Y" id="blockManage_useY" checked /><label for="useY">사용&nbsp;</label>
							<input type="radio" name="consentType" value="N" id="blockManage_useN"/><label for="useN">미사용&nbsp;</label>
						</td>
						<th class="line_rt">차단종료일</th>
						<td class="line_b"><span id="blockManage_endDt"></span></td>
						<th class="line_rt">수정일</th>
						<td class="line_b"><span id="blockManage_modDttm"></span></td>
						</tr>
					<tr>
						<th class="line_rb">메모</th>
						<td class="line_wb" colspan="5"><input type="text" class="text_ol" id="blockManage_memo"></td>
					</tr>
				</table>
            </div>
	
	</div>
</body>
</html>