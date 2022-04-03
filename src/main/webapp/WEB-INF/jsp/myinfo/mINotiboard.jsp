<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>

<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<title>공지게시판</title>
<link rel="icon" href="/resources/images/favicon.ico">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css" />

<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/dext5editor/js/dext5editor.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/myinfo/myInfo_Notiboard.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/select.js'/>"></script>
<!-- KukudocsEditor  -->
<script type="text/javascript" src="<c:url value='/resources/KukudocsEditor/javascripts/build/Editor.bundle.js'/>"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/KukudocsEditor/stylesheets/style.css" type="text/css" />
<style type="text/css">
	#mintbd_board_detail ul {
		width: 100%;
		margin: 0 10px 5px 0;
	}
	#mintbd_board_detail li {
		width: 100%;
	}
	.unsearch_tbl th{
		font-weight:bold;
	}
</style>
</head>
<body>
 <div id="h1">공지게시판</div>
    <div id="pop_body" style="overflow-y: scroll; overflow-x:hidden; height: 704px;">
        <div class="stitle">공지사항 조회</div>
        <!-- 검색 -->
        <div id="search" style="height:auto;">
            <table class="unsearch_tbl">
            	<colgroup>
            		<col width="65px"/>
            		<col width="25%"/>
            		<col width="50%"/>
            	</colgroup>
                <tr>
                	<th>작성 일시</th>
                    <td>
                        <input id="mintbd_tfTbbsStrtDt" type="text" class="text_ol_half"/>&nbsp;~
                        <input id="mintbd_tfTbbsEndDt" type="text" class="text_ol_half"/>
                    </td> 
                    <td>
	                    <input type="radio" name="serviceType" value="day" checked>당일&nbsp;
	                    <input type="radio" name="serviceType" value="week">1주일전&nbsp;
	                    <input type="radio" name="serviceType" value="month">1개월전
                    </td>
                    <td rowspan="2" style="text-align: right;">
                    	<div style="display: inline-block;  margin-right: 30px;">
	                      <button type="button" id="mintbd_btnNotifySearch" class="button">조회</button>
	                      <button type="button" id="mintbd_btnNotifyInit" class="button">초기화</button>
                    	</div>
                    </td>
               	</tr>
                  <tr>
                    <th>기타 조건</th>
                    <td colspan="2">
                         <select id="mintbd_optSrchtypes" style="width: 100px;">
                             <option value="ttl">제목</option>
                             <option value="cntn">내용</option>
                             <option value="ttlCntn">제목 + 내용</option>
                             <option value="usrNm">작성자</option>
                         </select>
                         <input type="text" id="mintbd_tfSrchval" class="text_ol" style="width:60%;"/>
                    </td>
                </tr>
             </table>
        </div>
        <div class="stitle">검색현황</div>
           <div id="searchSttus">
	           <ul>
	           		<li class="title">전체</li><li id="mintbd_upTotal"></li>
	           		<li class="title">확인</li><li id="mintbd_nTotal"></li>
	           		<li class="title">미확인</li><li id="mintbd_rTotal"></li>
	           </ul>
          </div>
       <div class="stitle">공지사항 목록</div>
        <div id="grid_all" >
            <!-- 그리드테이블 -->
            <div class="grid_tbl" style="float: left; width: 100%;">       
                <table id="mintbd_tblNotifyList"></table>
                <div id="mintbd_pgNotifyList"></div>
            </div>
        </div>
          <br/>  
        <div id="mintbd_board_content" class="re_board" style="width:1150px; display: none;">
        	<div style = "padding: 15px 0;">
	        	<div class="stitle">공지사항상세</div>
	        	<div style="float: right;"><button type="button" id="mintbd_btnShowNotify" class="button">목록보기</button></div>
        	</div>
        	<div  id="mintbd_board_detail" style = " padding: 15px 0;">
                <ul>
	               	<li style="text-align: right;">
	                    <span id="mintbd_sUsrNm"></span>&nbsp;|&nbsp;조회수&nbsp;:
	                    <span id="mintbd_sTbbsInQrCnt"></span>&nbsp;|&nbsp;
	                    <span id="mintbd_sModDt"></span>&nbsp;<span id="mintbd_sModTm"></span>&nbsp;|&nbsp;
	                    <span id="mintbd_sEmrgYN"></span>&nbsp;|&nbsp; 
	                    <span id="mintbd_sTbbsStrtDt"></span>&nbsp;~&nbsp;
	                    <span id="mintbd_sTbbsEndDt"></span>                   
	                </li>
            	</ul>
            	<br />
	            <ul>
	                <li>
	                	<p id="mintbd_sTbbsTtl" style="font-family: '돋움', sans-serif; font-size: 20px; font-weight: bold; display: inline-block;"></p>
	                	<p id="mintbd_pCommNum" style="display: inline-block; color: #f41016; font-weight: bold; font-family: 'Dotum', 'sans-serif'; font-size: 13pt;"></p>
	                </li>
	            </ul>
            	<p id="mintbd_dTbbsCntn" style="width: 100%; min-height: 150px;"></p><!-- 본문내용 -->
            	<table id="mintbd_fileInfos" class="tb_list" style="width: 100%"></table>
            </div>
			<div class="comment" style="width: 1140px;">
			    <div class="comment_tab">
			        <img src="<c:url value='/resources/images/comment_tab.png'/>" alt="덧글"  />
				</div>  
				<table id="mintbd_tblComments" class="comment_text"></table>    
				<div class="comment_">
				    <div class="comment_tab2">
				        <img src="<c:url value='/resources/images/comm_title.png'/>" alt="덧글"  />
					</div>  
					<div class="re_board2" style="width:1000px">
						<textarea id="mintbd_taCommCntn" class="area_ol_comm" style="overflow: auto;"></textarea>
					</div>
					<div class="re_board3" style="width: 8%;">
						<img id="mintbd_btnInsertComm" src="<c:url value='/resources/images/comm_btn.png'/>" alt="저장" class="savebtn" style="cursor: pointer;"/>
				    </div>    
			    </div>
			</div>
        </div>
    </div><!-- end of pop_body -->
</body>
</html>