<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<title>문자상담분배 관리</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/counsel/cnsSmsManage.js'/>"></script>
	</head>
	
	<body>
		<div id="h1">문자상담분배 관리</div>
		<div id="pop_body">
			<!--타이틀-->
			<div class="stitle">
				문자상담분배 조회
			</div>
			<!--"타이틀"-->
	 		<!-- 조회/검색 -->
			<div id="search2" style="height: 30px;">
				<table class="search2_tbl">
					<tr>
						<th>일자</th>
						<td class="sel_left" colspan="3">
							<input type="text" class="text_ol_half" id="cnsmma_selFrDate" maxlength="16" style="width: 20%; margin-left: 15px">
							~
							<input type="text" class="text_ol_half" id="cnsmma_selToDate" maxlength="16" style="width: 20%">
						</td>
						<th>처리상태</th>
						<td class="sel_60">
							<select class="select_al" id="cnsmma_selRcvActStCd"></select>
						</td>
						<th>상담사</th>
						<td class="sel_60" colspan="1"><select class="select_al" id="cnsmma_selCounselNm"></select></td>
						<td class="btn" >
							<button type="button" id="cnsmma_btnSearch" class="button">조회</button>
							<button type="button" id="cnsmma_btnInit" class="button">초기화</button>
						</td>
					</tr> 
				</table>
			</div>
			<!--"조회/검색"-->
			<br/>
			<table class="profile_tbl">
                <tr>
                    <th class="line_rt">총건수</th>
                    <td class="line_b"><label id="cnsmma_labTotalCnt"></label></td>
                    <th class="line_c">접수건수</th>
                    <td class="line_b"><label id="cnsmma_labRcvCnt"></label></td>
                    <td class="line_c">회수건수</td>
                    <td class="line_b"><label id="cnsmma_labNoDivCnt"></label></td>
                </tr>
                <tr>
                    <th class="line_rt">분배건수</th>
                    <td class="line_b"><label id="cnsmma_labDivCnt"></label></td>
                    <th class="line_c">미처리건수</th>
                    <td class="line_b"><label id="cnsmma_labNotCompCnt"></label></td>
                    <td class="line_c">처리완료건수</td>
                    <td class="line_b"><label id="cnsmma_labCompCnt"></label></td>
                </tr>
            </table><br/>

    		<!--그리드-->
			<div id="cnsmma_grid_all">
				<div style="width: 65%; display: inline-block; margin-left: 10px;">
					<div style="text-align: right; margin-bottom: 5px;">
						<button type="button" id="cnsmma_btnRelease" class="button">회수</button>
						<button type="button" id="cnsmma_btnDelete" class="button">삭제</button>
					</div>
					<table id="cnsmma_tblcnsSmaRcvList"></table>
				</div>
				<div style="width: 30%; display: inline-block; margin-left: 45px;">
					<div style="text-align: right; margin-bottom: 5px;">
						<button type="button" id="cnsmma_btnDivToUser" class="button">체크한 상담사에 분배하기</button>
					</div>
					<table id="cnsmma_tbldivUsrList"></table>
				</div>
			</div>
		</div>
	</body>
</html>