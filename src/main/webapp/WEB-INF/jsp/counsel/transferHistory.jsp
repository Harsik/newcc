<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<title>이관목록</title>
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
		<script type="text/javascript" src="<c:url value='/resources/js/counsel/transferHistory.js'/>"></script>
	</head>
	
	<body>
		<div id="h1">이관민원변경이력</div>
		<div id="pop_body">
			<!--타이틀-->
			<div class="stitle">
				이관민원변경이력
			</div>
			<!--"타이틀"-->
	                <!--"조회/검색"-->
	                <div id="search">
	                    <table class="search_tbl">
	                        <tr>
	                        	<th>검색기간</th>
									<td width="30%" style="text-align: left;">
										<input type="text" style="width: 80px;" class="text_ol_half" id="selFrDate" maxlength="16">
										 ~
										<input type="text" style="width: 80px;" class="text_ol_half" id="selToDate" maxlength="16">		
		  							</td>
                  
	                             <td class="btn">
	                                <button type="button" id="btnSearch_1"  class="button">조회</button>
	                            </td> 
	                        </tr>
	                    </table>
	                </div>
	                <!--"조회/검색"-->
					
	                <!--그리드-->
	                <div class="grid_all">
	                    <!-- 미사용/버튼 테이블 -->
	                    <table class="info_tbl">
	                    </table>
						<!--"미사용/버튼 테이블"-->
	                    <!-- 그리드테이블 -->
	                    <div class="grid_tbl">
	                        <table id="tblTransferList"></table>
	                        <div id="pgTransferList"></div>
	                    </div>
	                    <!--"그리드테이블"-->
	                </div>
	                <!--"그리드"-->
		</div>
	</body>
</html> 