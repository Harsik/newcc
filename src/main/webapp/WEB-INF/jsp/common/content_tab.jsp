<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript" src="<c:url value='/resources/js/common/content_tab.js'/>" ></script>
  <style>
  #dialog label, #dialog input { display:block; }
  #dialog label { margin-top: 0.5em; }
  #dialog input, #dialog textarea { width: 95%; }
  #tabs { margin-top: 1em; }
  #tabs li .ui-icon-close { float: left; margin: 0.4em 0.2em 0 0; cursor: pointer; }
  #add_tab { cursor: pointer; }  
  #divRContentTab {border:1px solid #a2aab2;}  
  </style>
  
	<div class="tab_top" id="divRContentTab" style="width:100%; height:835px;">
		<ul id="tabLi">
		<!--
			<li><a href="#divRCTabSetting">*</a></li>
			<li><a href="#divRCTabSearch">지식검색</a></li>
			<li><a href="#divRCTabCnslList">상담이력</a></li>
			<li><a href="#divRCTabSMSList">SMS이력</a></li>
			<li><a href="#divRCTabEmrgncyInfo">긴급정보 </a></li>
			<li><a href="#divRCTabMessage">쪽지</a></li>
			<li><a href="#divRCTabHappyCall">해피콜조사</a></li>
			<li><a href="#divRCTabCnsSms">문자상담</a></li>
			 -->
		</ul>
		<div id="popDiquest">
			<input type="text" class="text_ol" id="searchTotal" placeholder="검색어를 입력해주세요!" title="검색어"/>
			<img src="/resources/images/icon_search.png" id="cntrSearch" class="icon_comm" alt="찾기" />
			<img src="/resources/images/tabSetting.png" id="btn_tabSetting" class="icon_comm" style="vertical-align:middle; margin-bottom:2px;"  alt="설정" >
			<img src="/resources/images/locked.png" id="btn_tabLocked" class="icon_comm" style="width:10%; height:10%;vertical-align:middle; margin-bottom:2px; margin-left:3px;" alt="잠금">
		</div>	    
				<jsp:include page="/WEB-INF/jsp/main/TabSetting.jsp"/>
	            <!-- 지식검색 JSP 파일  -->
				<div class="kmain_tbl_tab" style="display: none;" id="divRCTabSearch">
					<jsp:include page="/WEB-INF/jsp/main/jisikSearch.jsp"/>
				</div>
				<!-- 상담이력 JSP 파일  -->
				<div class="kmain_tbl_tab" style="display: none;" id="divRCTabCnslList">
					<jsp:include page="/WEB-INF/jsp/main/counselPackList.jsp"/>
				</div>
				<!-- SMS이력 JSP 파일  -->
				<div class="kmain_tbl_tab" style="display: none;" id="divRCTabSMSList">
					<jsp:include page="/WEB-INF/jsp/main/smsSendList.jsp"/>
				</div>
				<!-- 공지사항 JSP 파일  -->
				<div class="kmain_tbl_tab" style="display: none;" id="divRCTabEmrgncyInfo">
					<jsp:include page="/WEB-INF/jsp/main/emrgncyInfo.jsp"/>
				</div>
				<!-- 쪽지관련 JSP 파일  -->
				<div class="kmain_tbl_tab" style="display: none;" id="divRCTabMessage">
					<jsp:include page="/WEB-INF/jsp/main/messageListMain.jsp"/>
				</div>
				<!-- 해피콜조사 JSP 파일  -->
				<div class="kmain_tbl_tab" style="display: none;" id="divRCTabHappyCall">
					<jsp:include page="/WEB-INF/jsp/main/cmpnCheckList.jsp"/>
				</div>
				<!-- 영상상담 JSP 파일  -->
				<div class="kmain_tbl_tab" style="display: none;" id="divRCTabSample">
					<jsp:include page="/WEB-INF/jsp/test/Sample.jsp"/>
				</div>
			</div>