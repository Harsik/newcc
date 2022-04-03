<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=1200px, user-scalable=yes,initial-scale=0.3, maximum-scale=3.0">
	<meta name="keywords" content="">
	<meta name="description" content="">
	<meta name="author" content="">
	<meta name="Publisher" content="dewy.chang">
	<title>전광판</title>
	<link rel="icon" href="/resources/images/favicon.ico">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/slide.css"/>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/dashboard.css"/>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/base.css"/>
	
  <!-- End SlidesJS Optional-->
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/charts/loader.js'/>"></script>
  <!--  <script type="text/javascript" src="http://www.google.com/jsapi"></script> -->
	<script type="text/javascript" src="<c:url value='/resources/js/lib/charts/jquery.plugin.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/charts/jquery.gchart.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/slidejs/jquery.slides.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/dashboard/dashboard2.js'/>"></script>

 
		<style type="text/css">
			 
				.page2 svg g text { 
				  font-family: 'NanumBarunGothicBold' !important;
    		  font-weight: bold;
    			text-align: left;
    			  font-size: 3em;
    			z-index:900000; 
				}
				
				.page3 svg g text { 
				  font-family: 'NanumBarunGothicBold' !important;
    		  font-weight: bold;
    			text-align: left;
    			  font-size: 3em;
    			z-index:900000; 
				} 
 
				
		</style>
 
</head>
<body  style="margin:0px; padding:0px; overflow-y:hidden;"> <!-- overflow-y:hidden; -->
 	<% String mode = request.getParameter("mode"); %>
 	
 	<c:set var="mode" value="<%=mode%>" />
 	
 	<input type="hidden" id="tfMode" value="${mode }">
 
  <div class="container">
    <div id="slides">
				 <div class="img" id="wrap" style="margin:0px; padding:0px;">
						<div id="header">
							<div class="inner">
								<div class="page-title" id="currDate">실시간 상담 현황 </div>
								<div class="date" style="padding-left:58px;"> <span class="time" id="curDate1"></span><span class="time" id="curTime1"></span></div>
							</div>
						</div>
						<div class="middle">
							<div class="left-section">
								<div class="top-value">
									<span class="stit">대기호</span>
									<span class="t-value" id="custWait">0</span>
								</div>
								<ul class="value">
									<li>
										<div class="item">로그인 상담사</div>
										<div class="value"><span class="num" id="agentLogin">20</span> 명</div>
									</li>
									<li>
										<div class="item">상담대기</div>
										<div class="value"><span class="num" id="agentReady">3</span> 명</div>
									</li>
									<li>
										<div class="item">상담처리</div>
										<div class="value"><span class="num" id="agentBusy">20</span> 명</div>
									</li>
									<li>
										<div class="item">상담 후 업무처리</div>
										<div class="value"><span class="num" id="afterWork">20</span> 명</div>
									</li>
									<li>
										<div class="item">서비스 레벨</div>
										<div class="value"><span class="num" id="serviceLevel">100</span> %</div>
									</li>
								</ul>
							</div>
							<div class="right-section">
								<div class="top-value">
									<span class="stit">총처리호</span>
									<span class="t-value" id="IbObCall">1,200</span>
								</div>
								<ul class="value">
									<li>
										<div class="item">인입호</div>
										<div class="value"><span class="num" id="totalCall">1,900</span> 건</div>
									</li>
									<li>
										<div class="item">IB</div>
										<div class="value"><span class="num" id="inbound">1,000</span> 건</div>
									</li>
									<li>
										<div class="item">OB</div>
										<div class="value"><span class="num" id="outbound">300</span> 건</div>
									</li>
									<li>
										<div class="item">포기호</div>
										<div class="value"><span class="num" id="abandon">10</span> 건</div>
									</li>
									<li>
										<div class="item">응답율</div>
										<div class="value"><span class="num" id="answerRate">98.7</span> %</div>
									</li>
								</ul>
							</div>
						</div>
				
						
						<!--  footer -->
					</div>  
		 
			  	<div class="img page2" id="wrap">
						<div id="header">
							<div class="inner">
								<div class="page-title" style="width: 9.6em;">행정기관별 상담현황</div>
								<div class="date" style="padding-left:58px;"> <span class="time" id="curDate2"></span><span class="time" id="curTime2"></span></div>
							</div>
						</div>
						<div class="middle">
							<div class="all-section" >
								  <div class="g-title">&nbsp; </div>  
								 	<div class="graph" id="pie_div2" style="width: 53%; margin-left:25%; height: 570px;text-align:center;">			
								</div>
								<div class="table" style="position: relative;">
									<table>
										<thead>
										<tr>
											<th>제주도청</th>
											<th>제주시</th>
											<th>서귀포시</th>
											<th>기타</th>
											<th>합계</th>
										</tr>
										</thead>
										<tr>
											<td id="administCount01">30건</td>
											<td id="administCount02">30건</td>
											<td id="administCount03">30건</td>
											<td id="administCount04">10건</td>
											<td id="cnslCountt02" style="color:#009e71;">2,000건</td>
										</tr>
									</table>
								</div>
							 
							</div>
						</div>
				
					<!-- footer -->
					</div>  
		 
			 	<div class="img page3" id="wrap">
						<div id="header">
							<div class="inner">
								<div class="page-title">상담분야별 현황</div>
								<div class="date" style="padding-left:58px;"> <span class="time" id="curDate3"></span><span class="time" id="curTime3"></span></div>
							</div>
						</div>
						<div class="middle">
							<div class="all-section" >
								<div class="graph3" id="chart_div" style="width: 100%; height: 640px;">
								</div>
								<div class="table" style="position: relative;">
									<table>
										<thead>
										<tr>
											<th>기타</th>
											<th>청정환경</th>
											<th>문화관광</th>
											<th>보건복지</th>
											<th>농수축산</th>
											<th>도시건설</th>
											<th>교통</th>
											<th>일반행정</th>
										</tr>
										</thead>
										<tr>
											<td id="cnslCount01">2건</td>
											<td id="cnslCount02">4건</td>
											<td id="cnslCount03">4건</td>
											<td id="cnslCount04">8건</td>
											<td id="cnslCount08">12건</td>
											<td id="cnslCount05">12건</td>
											<td id="cnslCount06">30건</td>
											<td id="cnslCount07">40건</td>
										</tr>
									</table>
								</div>
									<div class="table" id="separate02" style="left: 820px; top: -164px; position: relative;">
									<table>
										<thead>
										<tr>
											<th>합계</th>
											 
										</tr>
										</thead>
										<tr>
											<td id="cnslCountt03" style="color:#009e71;">2,000건</td>
											 
										</tr>
									</table>
								</div>
							</div>
						</div>
				
						<!-- footer -->
					</div>  
	 
		</div>   
  </div> 
 		
 		<div id="footer">
			<div class="title" id="centerName">
				온누리콜센터
			</div>
			<div id="DashInput">
			 <span id="spanDashConfig" style="display:none;">슬라이드주기(초)|데이타주기(초)</span>  <input type=text id="tfDashConfig" class="text_ol" style="display:none;">
			</div>
			<div class="logo">
				<img src="/resources/images/pyeongtaek_logo.png" id="imgConfSet" alt="">
			</div>
	 </div> 
</body>
</html>