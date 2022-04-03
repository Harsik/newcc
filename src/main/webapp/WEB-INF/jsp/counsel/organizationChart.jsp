<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>조직도 검색</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jstree/themes/default/style.custom.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jstree/jstree.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/counsel/organizationChart.js'/>"></script>
		
		<style>
			div.scrollable 
			{
			    width: 100%;
			    height: 100%;
			    margin: 0;
			    padding: 0;
			    overflow: auto;
			}
			#gbox_tblInCorp .ui-jqgrid-bdiv { overflow-y: scroll }
		
			.ui-jqgrid.ui-widget.ui-widget-content.ui-corner-all {width:100% !important;}
			.ui-jqgrid-view {width:100% !important;}
			.ui-jqgrid-hdiv {width:100% !important;}
			.ui-jqgrid .ui-jqgrid-hbox {width:100% !important;&nbsp;padding:0 !important;}
			.ui-jqgrid-htable {width:100% !important;}
			.ui-jqgrid-bdiv {width:100% !important;}
			.ui-jqgrid-btable {width:100% !important;}
			.ui-jqgrid-pager {width:100% !important;}	
			
			html{height:100%;}
			body{height:100%;}
		</style>
		

	</head>
	
	<body style="display:none;">
		<!--BODY-->
		<div id="pop_body" style="height:100%; min-height:986px; min-width: 1400px; box-sizing: border-box;">
		<div id="h1" style="position: relative; top:-12px; left:-8px; width: 100.3%;line-height: 0">조직도검색</div>
			
			<!--타이틀-->
			<div class="stitle" style="display: ruby-base;">조직도 검색</div><!--"타이틀"
			<br/><br/>-->
			<!--탭-->
			<div id="search_el" >
				<!--<div class="s_item">
					<div id="divCorpTab" class="left_tab_top_sm">
						<div id="divAdminAgency" class="left_tab110_img" style="cursor:pointer" >행정기관</div>
						<div id="divCallCenter" class="left_tab100_img_gray" style="cursor:pointer">콜센터</div>
						<div id="divExternAgency" class="left_tab100_img_gray" style="cursor:pointer">외부기관</div>-->
						<!-- <div id="divSitemove" class="left_tab100_img_gray" style="cursor:pointer">현장출동</div> -->
					<!--</div>
				</div> -->
			
			<ul id="divCorpTab">
			<li><a href="#divAdminAgencyTab">행정기관</a></li>
			<li><a href="#divCallCenterTab">콜센터</a></li>
			<li><a href="#divExternAgencyTab">외부기관</a></li>
			</ul>
			
			<!--조직도-->
			<div id="grid_all" class="divInner">
				<!-- 조회/검색 -->
				<div id="divAdminAgencyTab">
					<%@include file="organizationAdminAgency.jsp" %>				
				</div>
				<div id="divCallCenterTab">
					<%@include file="organizationCallCenter.jsp" %>
				</div>
				<div id="divExternAgencyTab">
					<%@include file="organizationExternAgency.jsp" %>
				</div>				
			</div><!-- End Of 조직도 -->
		</div>
				<!--<table class="info_tbl">
				</table> -->
		</div><!--BODY-->
	</body>
</html>