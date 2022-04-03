<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<title>통계관리</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/management/managementEtc.js'/>"></script>
	</head>
	
	<body>
		<div id="h1">
			통계관리
		</div>
		<div id="pop_body">
			<div class="_icon">
				<div class="left_tab_img" style="cursor: pointer;" id="divStatisticBtn">통계관리</div>
			</div>
			<div class="kmain_tbl_list" style="height: 105px;">
				<div style="margin-top: 5px; display: block;" id="divStatisticTab">
					<div class="search2" style="background-color: #e5e5e5; padding: 6px 6px 6px 6px; margin-bottom: 15px;">
						<table class="search2_tbl">
							<tbody>
								<tr>
									<td colspan="5">
										<input class="text_ol" id="txtStatStrtDt" type="text" style="width: 35%;">
										~
										<input class="text_ol" id="txtStatEndDt" type="text" style="width: 35%;">
									</td>
									<td style="text-align: center;">
										<button class="button" id="btnStatRun" type="button">재집계</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<label style="color:red;">※ 기간이 길어질 경우 작업에 다소 시간이 소요 될 수 있습니다.</label>
				</div>
			</div>
		</div>
	</body>
</html>