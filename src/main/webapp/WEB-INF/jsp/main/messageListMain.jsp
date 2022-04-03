<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="<c:url value='/resources/js/lib/dext5editor/js/dext5editor.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/main/messageListMain.js'/>"></script>

	<script type="text/javascript" src="<c:url value='/resources/KukudocsEditor/javascripts/build/Editor.bundle.js'/>"></script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/KukudocsEditor/stylesheets/style.css" type="text/css" />
<%-- 알람 ON off--%>
<style>
      .messageSwitch {
          border: solid 1px #ccc;
          border-radius: 20px;
          display: inline-block;
          height: 20px;
          overflow: hidden;
          -ms-user-select: none;
          -moz-user-select: none;
          -o-user-select: none;
          -webkit-user-select: none;
          user-select: none;
          width: 50px;
      }
      .messageSwitch [type=checkbox] {
          display: none;
      }
      .messageSwitch .label {
          cursor: pointer;
          margin-left: -30px;
          -ms-transition: margin .1s;
          -moz-transition: margin .1s;
          -o-transition: margin .1s;
          -webkit-transition: margin .1s;
          transition: margin .1s;
          white-space: nowrap;
      }
      .messageSwitch :checked + .label {
          margin-left: 0;
      }
      .messageSwitch .label > * {
          vertical-align: top;
      }
      .messageSwitch .on,
      .messageSwitch .off {
          display: inline-block;
          height: 20px;
          line-height: 20px;
          text-align: center;
          width: 40px;
          font-size: 10px;
      }
      .messageSwitch .on {
          background-color: #00f;
          background-image: -ms-linear-gradient(
              top,
              hsl(214,90%,40%),
              hsl(214,90%,70%)
              );
          background-image: -moz-linear-gradient(
              top,
              hsl(214,90%,40%),
              hsl(214,90%,70%)
              );
          background-image: -o-linear-gradient(
              top,
              hsl(214,90%,40%),
              hsl(214,90%,70%)
              );
          background-image: -webkit-linear-gradient(
              top,
              hsl(214,90%,40%),
              hsl(214,90%,70%)
              );
          background-image: linear-gradient(
              top,
              hsl(214,90%,40%),
              hsl(214,90%,70%)
              );
          box-shadow:
              3px 2px 10px rgba(0,0,0,.2) inset,
              -3px 2px 10px rgba(0,0,0,.2) inset;
          color: #fff;
          text-shadow: -1px -1px rgba(0,0,0,.3);

      }
      .messageSwitch .separator {
          background-color: #eee;
          border: solid 1px #999;
          border-radius: 50%;
          box-sizing: border-box;
          box-shadow:
               1px 2px #fff inset,
              -1px 2px #fff inset,
              1px 1px 5px rgba(0,0,0,.2);
          display: inline-block;
          height: 20px;
          margin: 0 -14px;
          position: relative;
          width: 20px;
      }
      .messageSwitch .off {
          background-color: #eee;
          box-shadow: 5px 5px 10px rgba(0,0,0,.2) inset;
          color: #777;
          text-shadow: 1px 1px #fff;        
      }
</style>
<div id="search">
	<table summary="쪽지함검색" class="search_tbl">
		<tr>
      		<th scope="row" style="width: 5%;"><label>쪽지함</label> </th>
      		<td style="width: 4%;">
        		<select class="select_bl" id = "optMsgList" title="쪽지유형">
          			<option value = "all" selected>전체</option>
          			<option value = "rcvMsgList">발신</option>
          			<option value = "sndMsgList">수신</option>
        		</select>
      		</td>
      		<th scope="row" style="width: 5%;"><label>상담사</label></th>
      		<td style = "width: 9%;">
        		<select class="select_bl" id = "selMsgCounselNm" title="상담사이름">
          			<option value="all">전체</option>
        		</select>
      		</td>
      		<th scope="row" style="width: 4%;"><label>일자</label></th>
      		<td style="width: 25%;">
        		<input type = "text" class="text_Date" id="tfMsgStartDt" readonly="readonly" alt="시작날짜" title="시작날짜"/> 
        		<label>~</label> 
        		<input type = "text" class="text_Date" id="tfMsgEndDt" readonly="readonly" alt="종료날짜" title="종료날짜"/>
      		</td>
      		<!--  
      		<th scope="row" style="width: 4%;"><label>제목</label> </th>
      		<td style="width: 20%;">
				<input type = "text" id="tfMsg" class="text_ol" alt="메세지" title="메세지"/>
      		</td>
      		-->
      		<th scope="row" style="width: 4%;"><label>검색</label> </th>
      		<td style="width: 50px;">
			<select class="select_al" id="tfMsgOptSrchtype" style="width:50px;" title="검색">
				<option value="all">전체</option>
				<option value="tfMsgTitle">제목</option>
				<option value="tfMsgContent">내용</option>
			</select>
			</td>
			<td style="width: 15%;">
				<input type = "text" id="tfMsg" class="text_ol" alt="메세지" title="메세지"/>
      		</td>
	    	<td class ="btn">
	    	<td class="btn" style="width: 175px;">
          		<button type = "button" id = "btnMsgSearch" class="button">조회</button>
	      		<button type = "button" id = "btnMsgInit" class="button">초기화</button>
	       		<button type = "button" id = "btnMsgExcel" class="button">엑셀저장</button>
	    	</td>
    	</tr>
	</table>
</div><!--"조회/검색"-->
<div id="grid_all"><!--그리드-->
	<form id="writeForm" name="writeForm" action="/ajax/management/wirteForm.do" method="post">
		<input type="hidden" id="tfSpecChSndId" alt="상담ID" title="상담ID"/>
		<div class="grid_all" style="width: 100%; height: 335px; float: left; margin-bottom: 3px;">
			<!-- 그리드테이블 -->
			<table style="width: 100%;; height: 318px; background-image: url('./img/sam.gif');">
				<tr>
					<td>
						<table id="tblMessageList"></table>
						<div id="pagingMessageList"></div>
					</td>
				</tr>
			</table>
			<!--"그리드테이블"-->
		</div>
		<!-- 상담사 선택 -->
		<div id="tfSelAgt" style="width: 40%; float: left;">
			<div style="background: #e6ebf6; height: 24px; padding: 5px 5px; margin-bottom: 2px; border: 1px solid #dddddd; border-radius: 5px;">
				<select class="select_bl" style="width: 15%;" id="selMsgUsrListCntr" title="수신센터"></select>
				<select class="select_bl" style="width: 20%;" id="selMsgUsrListTeam" title="수신팀"></select>
				<input type="text" class="text_ol" style="width: 47%;" id="tfMsgUsrListSrchVal" alt="검색어" title="검색어">
				<button type="button" class="button" id="btnMsgUsrListSrch">조회</button>
			</div>
			<div style="float: left; width: 100%;">
				<table id="tblUsrList"></table>
			</div>
		</div>
		<!--"상담사 선택"-->
		<!-- 에디터 -->
		<div id="tfEditbox" style="width: 58%; float: right; background: #e6ebf6; padding: 5px 6px; border: 1px solid #dddddd; border-radius: 5px;">
			<table class="info_tbl_btn" style="margin-top: 0px; margin-bottom: 5px;">
				<tr>
					<td>
						<div style="float: left">
							<span style="line-height: 24px; font-weight: bold;">알람&nbsp;</span>
						</div>
						<div id="alarmSwitch" style="float: left">
							<label class="messageSwitch">
							 <input type="checkbox" checked alt="알람 ON/OFF" title="알람 ON/OFF"> 
								 <span class="label"> 
									 <span class="on">ON</span> 
									 <span class="separator">&nbsp;</span> 
									 <span class="off">OFF</span>
								</span>
							</label>
						</div>
						<button type="button" id="btnMsgCollect" class="button">회수</button>
						<button type="button" id="btnMsgReply" class="button">답신</button>
						<button type="button" id="btnMsgModify" class="button">전송</button>
						<button type="button" id="btnMsgUpdate" class="button">수정</button>
						<button type="button" id="btnMsgDelete" class="button">삭제</button>
						<button type="button" id="btnMsgReset" class="button">새쪽지</button>
					</td>
				</tr>
			</table>
			<table summary="쪽지생성" class="profile_tbl" style="border-radius: 5px;width: auto;">
			<colgroup>
				<col style="width:1%;">
				<col style="width:1%;">
				<col style="width:1%;">
				<col style="width:1%;">
				<col style="width:1%;">
				<col style="width:1%;">
			</colgroup>
				<tr>
					<th scope="row" class="line_r" >제목</th>
					<td colspan="5" class="line_b"><input type="text" id="messgeTtl" class="text_ol" alt="제목" title="제목"></td>
				</tr>
				<tr>
					<th scope="row" class="line_r" >내용</th>
					<td colspan="5" id="messageCntn" class="line_wb" style="padding: 2px; border-bottom: 1px solid #98a5b3;"></td>
				</tr>
				<tr>
					<td class="line_rb">첨부파일</td>
					<td>
						<div id="con" style="display: ''">
							<table id="msgFileInfos" style="margin-left: 5px; margin-right: 6px;">
								<tr>
									<td style="width: 30%;">
										<input type="hidden" name="record_XXX" value="" alt="첨부파일ID" title="첨부파일ID" />
										<input type="file" id="MESSAGE" name="MESSAGE" class="file_board" style="width: 320px;" alt="첨부파일" title="첨부파일"/>
									</td>
									<td>
											<img src="/resources/images/btn_del.png"  alt="삭제" id="rmFilebox" class="icon_comm" />
										</td>
										<td>
											<img src="/resources/images/btn_fileadd.png"  onClick="addFileBox()" alt="파일폼추가" class="icon_comm" />
										</td>
								</tr>
							</table>
						</div>
						<div id="con1" style="display: none">
								<table id="tblFiles" style="width: 450px;"></table>
						</div>
					</td>
				</tr>
			</table>
		</div>
	</form>
	<table id="msgFileadd" style="display:none">
		<tr>
			<td style="width: 30%;">
				<input type="hidden" name="record_XXX" value="" alt="첨부파일ID" title="첨부파일ID" />
				<input type="file" name="MESSAGE" class="file_board" style="width: 320px;" alt="첨부파일" title="첨부파일"/>
			</td>
			<td>
				<img src="/resources/images/btn_del.png" onClick="removeFileBox(XXX)" class="icon_comm" alt="삭제" />
			</td>
			<td></td>
		</tr>
	</table>
</div>