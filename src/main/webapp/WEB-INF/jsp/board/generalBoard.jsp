<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>

<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<title>일반게시판 관리</title>
<link rel="icon" href="/resources/images/favicon.ico">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css" />

<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/board/generalBoard.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/select.js'/>"></script>
</head>
<body>
	<div id="h1">일반게시판 관리</div>
	<div id="pop_body" style="overflow-y: scroll; height: 735px;">
		<div class="stitle">일반게시판 조회</div>
		<!-- 검색 -->
		<div id="search">
			<table class="search_tbl">
				<tr>
					<td class="sel" style="width: 40px;">&nbsp;검색</td>
					<td class="sel">
						<div class="select open" style="width: 100%;">
							<select id="gnrBrd_optSrchtype" class="select_bl">
								<option value="ttl">제목</option>
								<option value="cntn">내용</option>
								<option value="ttlCntn">제목 + 내용</option>
								<option value="usrNm">작성자</option>
							</select>
						</div>
					</td>
					<td class="nemo_30">
						<input type="text" id="gnrBrd_tfSrchval" class="text_ol_80">
					</td>
					<td class="btn">
						<button type="button" id="gnrBrd_btnSearch" class="button">조회</button>
						<button type="button" id="gnrBrd_btnInit" class="button">초기화</button>
					</td>
				</tr>
			</table>
		</div>

		<div id="gnrBrd_board_content" class="re_board" style="display: none;">
			<ul>
				<li class="re_board_left"></li>
				<li class="re_board_right">
					<button type="button" id="gnrBrd_btnShowGeneral" class="button">목록보기</button>
					<div id="gnrBrd_divModDel" style="display: inline;">
						<button type="button" id="gnrBrd_btnCntnModify" class="button">수정</button>
						<button type="button" id="gnrBrd_btnCntnDelete" class="button">삭제</button>
					</div>
				</li>
			</ul>
			<ul>
				<li class="re_board_left">
					<p id="gnrBrd_sTbbsTtl" class="re_board_gray">업무소개</p>
					<p id="gnrBrd_pCommNum" class="re_board_red"></p>
				</li>
				<li class="re_board_right"><span id="gnrBrd_sUsrNm"></span>&nbsp;|&nbsp;조회수&nbsp;: <span id="gnrBrd_sTbbsInQrCnt"></span>&nbsp;|&nbsp; <span id="gnrBrd_sModDt"></span>&nbsp;<span id="gnrBrd_sModTm"></span></li>
			</ul>
			<p id="gnrBrd_dTbbsCntn" class="re_board_text" style="min-height: 150px;"></p>
			<!-- 본문내용 -->

			<table id="gnrBrd_fileInfos" class="tb_list" style="width: 100%"></table>

			<div class="comment">
				<div class="comment_tab">
					<img src="<c:url value='/resources/images/comment_tab.png'/>" alt="덧글" />
				</div>

				<table id="gnrBrd_tblComments" class="comment_text">
				</table>

				<div class="comment_">
					<div class="comment_tab2">
						<img src="<c:url value='/resources/images/comm_title.png'/>" alt="덧글" />
					</div>
					<div class="re_board2" style="width: 1010px">
						<textarea id="gnrBrd_taCommCntn" class="area_ol_comm" style="overflow: auto;"></textarea>
					</div>
					<div class="re_board3" style="width: 8%;">
						<img id="gnrBrd_btnInsertComm" src="<c:url value='/resources/images/comm_btn.png'/>" alt="저장" class="savebtn" style="cursor: pointer;" />
					</div>
				</div>
			</div>
		</div>

		<div id="grid_all">
			<table class="info_tbl">
				<tr>
					<th id="gnrBrd_pTotal"></th>
					<td>
						<div id="gnrBrd_divInsrtDel">
							<button type="button" id="gnrBrd_btnInsert" class="button">등록</button>
							<button type="button" id="gnrBrd_btnDelete" class="button">삭제</button>
						</div>
					</td>
				</tr>
			</table>

			<!-- 그리드테이블 -->
			<div class="grid_tbl">
				<table id="gnrBrd_tblGeneralList"></table>
				<div id="gnrBrd_pgGeneralList"></div>
			</div>
		</div>
	</div>
	<!-- end of pop_body -->
</body>
</html>