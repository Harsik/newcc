<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
	
	
	<script type="text/javascript" src="<c:url value='/resources/js/civilservice/cswDeptBoard.js'/>"></script>

	<div class="stitle" id="csdpbd_title"></div>
	<!-- 검색 -->
	<div id="search">
        <table class="search_tbl">
		<tr>

			
			<td style="width: 90px;">
				<div class="select open">
					<select id="csdpbd_deptBbsoptSrchtype" class="select_bl">
						<option value="ttl">제목</option>
						<option value="cntn">내용</option>
						<option value="ttlCntn">제목 + 내용</option>
						<option value="usrNm">작성자</option>
					</select>
				</div>
			</td>
			
			<td class="nemo_30" style="width: 304px;">
			<input type="text" id="csdpbd_deptBbstfSrchval" class="text_ol_80" style="width: 304px; height: 15px;">
			</td>
			
			<th style="text-align: right;">게시기간</th>
			<td class="sel_left" colspan="2" style="width: 250px;">
			<input id="csdpbd_deptBbstfTbbsStrtDt" type="text" class="text_ol_half" style="width: 70px;">&nbsp; ~ <input id="csdpbd_deptBbstfTbbsEndDt" type="text" class="text_ol_half" style="width: 70px;">
			</td>
			
			<th style="width: 80px; padding-bottom: 3px;" >
              <input id="csdpbd_cvilMyNotice" type="checkbox" class="checkbox" name='checkbox'>
			  <label for="cvilMyNotice"> 전체 조회</label>
			</th>
			
			<td>
				<div class="btn" style="display: inline-block; float: right;">
					<button type="button" id="csdpbd_deptBbsbtnNotifySearch" class="button">조회</button>
					<button type="button" id="csdpbd_deptBbsbtnNotifyInit" class="button">초기화</button>
		        </div>
			</td>
		</tr>
	</table>
	</div>
	
	<!-- 하단 그리드 -->
	<div id="csdpbd_grid_all2" style="height: 854px;">
		<table class="info_tbl">
			<tr>
				<th id="csdpbd_deptBbspTotal"></th>
				<td>
					<div id="csdpbd_deptBbsdivInsrtDel">
						<button type="button" id="csdpbd_deptBbsbtnInsertMainNotify" class="button">등록</button>
<%-- 						<button type="button" id="csdpbd_deptBbsbtnDeleteMainNotify" class="button">삭제</button> --%>
					</div>
				</td>
			</tr>
		</table>
	
		<!-- 그리드테이블 -->
		<div class="grid_tbl">
			<table id="csdpbd_deptBbstblNotifyList"></table>
			<div id="csdpbd_deptBbspgNotifyList"></div>
		</div>
		
		<br>
		
		<!-- 본문시작 -->
	<div id="csdpbd_deptBbsboard_content" class="re_board" style="display: none; clear: both;">
		<ul>
			<li class="re_board_right" style="float: right;">
<!-- 				<button type="button" id="csdpbd_deptBbsbtnShowNotify" class="button">닫기</button> -->
				<div id="csdpbd_deptBbsdivModDel" style="display: inline;">
					<button type="button" id="csdpbd_deptBbsbtnCntnModify" class="button">수정</button>
					<button type="button" id="csdpbd_deptBbsbtnCntnDelete" class="button">삭제</button>
				</div>
			</li>
		</ul>
		<ul>
			<li class="re_board_left" style="height: 35px;">
				<p id="csdpbd_deptBbssTbbsTtl" class="re_board_gray"></p>
				<p id="csdpbd_deptBbspCommNum" class="re_board_red"></p>
			</li>
			<li class="re_board_right" style="padding-right:6px; width: 50%; float: right;">
				<span id="csdpbd_deptBbssUsrNm"></span>&nbsp;|&nbsp;조회수&nbsp;:
				<span id="csdpbd_deptBbssTbbsInQrCnt"></span>&nbsp;|&nbsp; 
				<span id="csdpbd_deptBbssModDt"></span>&nbsp;
				<span id="csdpbd_deptBbssModTm"></span> 
				<span id="csdpbd_deptBbssEmrgYN"></span>&nbsp;|&nbsp; 
				<span id="csdpbd_deptBbssTbbsStrtDt"></span>&nbsp;~&nbsp; 
				<span id="csdpbd_deptBbssTbbsEndDt"></span>
			</li>
		</ul>
		
		<!-- 본문내용 -->
		<div id="csdpbd_deptBbsdTbbsCntn" class="re_board_text" style="min-height: 150px; width: 100%;"></div>
		<table id="csdpbd_deptBbsfileInfos" class="tb_list" style="width: 100%"></table>

	</div>
	</div>
	<br>
	
	
	
