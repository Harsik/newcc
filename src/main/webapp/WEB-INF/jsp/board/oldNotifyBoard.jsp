<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<title>참고게시판</title>
<link rel="icon" href="/resources/images/favicon.ico">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css" />
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/board/oldNotifyBoard.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/dext5editor/js/dext5editor.js'/>"></script>
</head>

<body>
	<div id="h1">참고게시판</div>
	<div id="pop_body" style="overflow-y: scroll; height: 735px;">
		<div class="stitle">참고게시판</div>

		<!-- 검색 -->
		<div id="search">
			<table class="search_tbl">
				<tr>
					<td class="sel" style="width: 40px;">&nbsp;검색</td>

					<td class="sel">
						<div class="select open" style="width: 100%;">
							<select id="oldNtfBrd_optSrchtype" class="select_bl">
								<option value="ttl">제목</option>
								<option value="cntn">내용</option>
								<option value="ttlCntn">제목 + 내용</option>
								<option value="usrNm">작성자</option>
							</select>
						</div>
					</td>

					<td class="nemo_30">
						<input type="text" id="oldNtfBrd_tfSrchval" class="text_ol_80">
					</td>

					<td class="btn">
						<button type="button" id="oldNtfBrd_btnSearch" class="button">조회</button>
						<button type="button" id="oldNtfBrd_btnInit" class="button">초기화</button>
					</td>
				</tr>
			</table>
		</div>


		<%-- 게시판내용 --%>
		<div id="board_content" class="re_board" style="display: none;">
			<ul>
				<li class="re_board_left"></li>
				<li class="re_board_right">
					<button type="button" id="oldNtfBrd_btnShowGeneral" class="button">목록보기</button>
				</li>
			</ul>

			<ul>
				<li class="re_board_left">
					<p id="oldNtfBrd_sTbbsTtl" class="re_board_gray">제목</p>
				</li>
				<li class="re_board_right"><span id="oldNtfBrd_sUsrNm"></span>
				<!-- &nbsp;|&nbsp;조회수&nbsp;: --> <!-- 					<span id="sTbbsInQrCnt"></span>-->&nbsp;|&nbsp; <span id="oldNtfBrd_sModDt"></span>&nbsp; <span id="oldNtfBrd_sModTm"></span></li>
			</ul>

			<!-- 본문내용 -->
			<p id="oldNtfBrd_dTbbsCntn" class="re_board_text" style="min-height: 150px;"></p>

			<!-- 파일정보 -->
			<table id="oldNtfBrd_fileInfos" class="tb_list" style="width: 100%"></table>
		</div>

		<div id="grid_all">
			<table class="info_tbl">
				<tr>
					<th id="oldNtfBrd_pTotal"></th>
				</tr>
			</table>

			<!-- 그리드테이블 -->
			<div class="grid_tbl">
				<table id="oldNtfBrd_tblGeneralList"></table>
				<div id="oldNtfBrd_pgGeneralList"></div>
			</div>
		</div>
	</div>
	<!-- end of pop_body -->

</body>
</html>