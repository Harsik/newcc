<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script type="text/javascript" src="<c:url value='/resources/js/civilservice/cswOldNotifyBoard.js'/>"></script>

		<div class="stitle">참고게시판</div>
		
		<!-- 검색 -->
		<div id="search">
			<table class="search_tbl">
        		<tr>
		 			<td class="sel" style="width: 40px;">&nbsp;검색</td>
		 			
		 			<td class="sel">
						<div class="select open" style="width:100%;">
							<select id="csodbd_optSrchtype" class="select_bl">
								<option value="ttl">제목</option>
								<option value="cntn">내용</option>
								<option value="ttlCntn">제목 + 내용</option>
								<option value="usrNm">작성자</option>
								<option value="team">기관/부서</option>
							</select>
						</div>
					</td>
					
					<td class="nemo_30">
						<input type="text" id="csodbd_tfSrchval" class="text_ol_80">
          			</td>
          			
		 			<td class="btn">
						<button type="button" id="csodbd_btnSearch" class="button">조회</button>
						<button type="button" id="csodbd_btnInit" class="button">초기화</button>
		  			</td>
       			</tr> 
      		</table>
		</div>
		
		
		<%-- 게시판내용 --%>
		<div id="csodbd_board_content" class="re_board" style="display: none;">
			<ul>
				<!-- <li class="re_board_left"></li> -->
				<li class="re_board_right">
					<button type="button" id="csodbd_btnShowGeneral" class="button">목록보기</button>
				</li>
			</ul>
			
			<ul>
				<li class="re_board_left"><p id="csodbd_sTbbsTtl" class="re_board_gray">제목</p></li>
				<li class="re_board_right">
					<span id="csodbd_sUsrNm"></span><!-- &nbsp;|&nbsp;조회수&nbsp;: -->
<!-- 					<span id="csodbd_sTbbsInQrCnt"></span>-->&nbsp;|&nbsp; 
					<span id="csodbd_sModDt"></span>&nbsp;<span id="csodbd_sModTm"></span>
				</li>
			</ul>
			
			<!-- 본문내용 -->
			<p id="csodbd_dTbbsCntn" class="re_board_text" style="min-height: 150px;"></p>
			
			<!-- 파일정보 -->
			<table id="csodbd_fileInfos" class="tb_list" style="width: 100%"></table>
		</div>
		
		<div id="csodbd_grid_all2">
			<table class="info_tbl">
				<tr>
					<th id="csodbd_pTotal"></th>
				</tr>
			</table>

			<!-- 그리드테이블 -->
	 		<div class="grid_tbl">		 
		 		<table id="csodbd_tblGeneralList"></table>
		 		<div id="csodbd_pgGeneralList"></div>
	   		</div>
		</div>