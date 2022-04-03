<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>행정정보</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.theme.css" type="text/css" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jstree/themes/default/style.custom.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jstree/jstree.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/civilservice/civilServiceInfo.js'/>"></script>
		
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
			.text_Date { width: 80px; }
			
		</style>
	</head>
	
	<body>
	
	        <input type="hidden" id="hidTaxSsNumber" value="" />
	        <input type="hidden" id="hidTaxSpNumber" value="" />
	        
		<!--BODY-->
		<div id="h1">행정정보</div>
		<div id="pop_body" style="height:875px;">
			<!--탭-->
			<ul id="cvsvif_divCorpTab" style="background: #ffffff; border: #ffffff;">
				<li><a href="#cvsvif_envrnImprvTab">환경개선부담금(<span id="envrnImprvCnt">0</span>)</a></li>	
				<li><a href="#cvsvif_divWaterTab">상하수도 업무</a></li>
				<li><a href="#cvsvif_divCarTab">주.정차과태료(<span id="carCnt">0</span>)</a></li>
				<li><a href="#cvsvif_divLocalTaxTab">지방세(<span id="localTaxsCnt">0</span>)</a></li>			
				<li><a href="#cvsvif_divNonTaxReceiptTab">세외수입(<span id="nonTaxReceiptCnt">0</span>)</a></li>			
				
				<li style="margin: 6px 0px 0px 10px;">
					<button type="button" id="cvsvif_btnIvrCall" class="button">ARS인증</button>
					<button type="button" id="devJumin" class="button" style="display: none; margin-right: 10px;">주민번호 입력</button>
					<p style="float: right; margin: 2px 0px 0px 5px;">
						<span>주민번호 :</span> <span id="juminSpan"></span> 
					</p>
				</li>
			</ul>
			
			<!--행정정보-->
			<!-- 조회/검색 -->
			<div id="cvsvif_envrnImprvTab">
				<%@include file="csEnvrnImprv.jsp" %>
			</div>
			<div id="cvsvif_divWaterTab">
				<%@include file="csWater.jsp" %>
			</div>
			<div id="cvsvif_divCarTab">
				<%@include file="csCar.jsp" %>
			</div>
			<div id="cvsvif_divLocalTaxTab">
				<%@include file="csLocalTax.jsp" %>				
			</div>
			<div id="cvsvif_divNonTaxReceiptTab">
				<%@include file="csNonTaxReceipt.jsp" %>
			</div>
			         	
			<!-- End Of 행정정보 -->
		</div>
		<!--BODY-->
	</body>
</html>