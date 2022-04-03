<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>

<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<title>공지사항 관리</title>
<link rel="icon" href="/resources/images/favicon.ico">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css" />

<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/board/notifyBoard.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/dext5editor/js/dext5editor.js'/>"></script>
</head>
<body>
	<div id="h1">공지사항 관리</div>
	<div id="pop_body" style="overflow-y: scroll; height: 735px;">
		<div class="stitle">공지사항 조회</div>
		<!-- 검색 -->
		<div id="search">
			<table class="search_tbl">
				<tr>
					<td class="sel_left" colspan="2">
						&nbsp;게시기간 <input id="ntfBrd_tfTbbsStrtDt" type="text" class="text_ol_half" readonly>&nbsp;~ <input id="ntfBrd_tfTbbsEndDt" type="text" class="text_ol_half" readonly>
					</td>

					<td style="width: 54px;">부서구분</td>

					<td class="sel_left" colspan="1" style="width: 120px;">
						<select id="ntfBrd_deptDivision" class="select_bl" style="width: 80px;">
							<option value="all">전체</option>
							<option value="Y">공무원</option>
							<option value="N">콜센터</option>
						</select>
					</td>

					<td style="width: 30px;">검색</td>

					<td class="sel">
						<div class="select open" style="width: 100%;">
							<select id="ntfBrd_optSrchtype" class="select_bl">
								<option value="ttl">제목</option>
								<option value="cntn">내용</option>
								<option value="ttlCntn">제목 + 내용</option>
								<option value="usrNm">작성자</option>
							</select>
						</div>
					</td>
					<td class="nemo_30">
						<input type="text" id="ntfBrd_tfSrchval" class="text_ol_80">
					</td>

					<td class="btn">
						<button type="button" id="ntfBrd_btnNotifySearch" class="button">조회</button>
						<button type="button" id="ntfBrd_btnNotifyInit" class="button">초기화</button>
					</td>
				</tr>
			</table>
		</div>

		<div id="board_content" class="re_board" style="display: none;">
			<ul>
				<li class="re_board_left"></li>
				<li class="re_board_right">
					<button type="button" id="btnShowNotify" class="button">목록보기</button>
					<div id="divModDel" style="display: inline;">
						<button type="button" id="ntfBrd_btnCntnModify" class="button">수정</button>
						<button type="button" id="ntfBrd_btnCntnDelete" class="button">삭제</button>
					</div>
				</li>
			</ul>
			<ul>
				<li class="re_board_left">
					<div id="ntfBrd_sTbbsTtl" class="re_board_gray"></div>
					<div id="ntfBrd_pCommNum" class="re_board_red"></div> <!-- <p id="ntfBrd_sTbbsTtl" class="re_board_gray"></p>
					<p id="ntfBrd_pCommNum" class="re_board_red"></p> -->
				</li>
				<li class="re_board_right"><span id="ntfBrd_sUsrNm"></span>&nbsp;|&nbsp;조회수&nbsp;: <span id="ntfBrd_sTbbsInQrCnt"></span>&nbsp;|&nbsp; <span id="ntfBrd_sModDt"></span>&nbsp;<span id="sModTm"></span> <span id="ntfBrd_sEmrgYN"></span>&nbsp;|&nbsp; <span id="ntfBrd_sTbbsStrtDt"></span>&nbsp;~&nbsp; <span id="ntfBrd_sTbbsEndDt"></span></li>
			</ul>
			<!-- <p id="ntfBrd_dTbbsCntn" class="re_board_text" style="min-height: 150px;"></p> -->
			<!-- 본문내용 -->

			<div id="ntfBrd_dTbbsCntn" style="width: 100%; height: 200px; margin-bottom: 10px; overflow-y: scroll;"></div>

			<table id="ntfBrd_fileInfos" class="tb_list" style="width: 100%"></table>

			<div class="comment">
				<div class="comment_tab">
					<img src="<c:url value='/resources/images/comment_tab.png'/>" alt="덧글" />
				</div>

				<table id="ntfBrd_tblComments" class="comment_text">
				</table>

				<div class="comment_">
					<div class="comment_tab2">
						<img src="<c:url value='/resources/images/comm_title.png'/>" alt="덧글" />
					</div>
					<div class="re_board2" style="width: 1010px">
						<textarea id="ntfBrd_taCommCntn" class="area_ol_comm" style="overflow: auto;"></textarea>
					</div>
					<div class="re_board3" style="width: 8%;">
						<img id="ntfBrd_btnInsertComm" src="<c:url value='/resources/images/comm_btn.png'/>" alt="저장" class="savebtn" style="cursor: pointer;" />
					</div>
				</div>
			</div>
		</div>

		<div id="grid_all">
			<table class="info_tbl">
				<tr>
					<th id="ntfBrd_pTotal"></th>
					<td>
						<div id="ntfBrd_divInsrtDel">
							<button type="button" id="ntfBrd_btnInsertMainNotify" class="button">등록</button>
							<button type="button" id="ntfBrd_btnDeleteMainNotify" class="button">삭제</button>
						</div>
					</td>
				</tr>
			</table>

			<!-- 그리드테이블 -->
			<div class="grid_tbl">
				<table id="ntfBrd_tblNotifyList"></table>
				<div id="ntfBrd_pgNotifyList"></div>
			</div>
		</div>
	</div>
	<!-- end of pop_body -->
</body>
</html>