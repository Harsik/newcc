<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
  	<title>PCRM</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900" rel="stylesheet">
	
	<!--external css-->
  	<!-- font icon -->
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/bootstrap/css/elegant-icons-style.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/bootstrap/css/font-awesome.min.css" type="text/css"/>
	
	
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/pcrm/css/style.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.theme.css" type="text/css" />
	<!-- Custom styles -->
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/bootstrap/css/fullcalendar.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/bootstrap/css/widgets.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/bootstrap/css/style.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/bootstrap/css/style-responsive.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/bootstrap/css/xcharts.min.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/bootstrap/css/jquery-ui-1.10.4.min.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/pcrm/css/sub03.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/pcrm/css/common.css" type="text/css"/>
	
	
	<!-- rmate -->
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js\lib\rMateChartH5\Assets\Css\rMateChartH5.css" type="text/css" />
	<script type="text/javascript" src="<c:url value='/resources/js/lib\rMateChartH5\LicenseKey\rMateChartH5License.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib\rMateChartH5\JS\rMateChartH5.js'/>"></script>
  		
	
	<style type="text/css">
		header {
		    width:100%;
		    height:60px;
		    background: #1d1919;
		    padding: 10px 0px;
		}
		
		a.logo {
			font-size: 22px;
		    font-weight: 300;
		    color: #fed189;
		    text-transform: uppercase;
		    float: revert;
		    
		}
		
		a.logo span {
			font-size: 22px;
		    color: #688a7e;
		}
		
		.grid_td {
			  	color:#c55;
			  	font-size:18px;
			  	text-align:center;
			  }
			  #search .btn {
					float: right;
					text-align: right;
					right: 3px;
				}
				.button {
					display: inline-block;
					border-radius: 3px;
					border: 1px solid #2b91dd;
					line-height: 1;
					padding: 3px 4px;
					background: #0f71ba;
					background: -moz-linear-gradient(top, #3fa4f0 0%, #0f71ba 100%);
					background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #3fa4f0), color-stop(100%, #0f71ba));
					background: -webkit-linear-gradient(top, #3fa4f0 0%, #0f71ba 100%);
					background: -o-linear-gradient(top, #3fa4f0 0%, #0f71ba 100%);
					background: -ms-linear-gradient(top, #3fa4f0 0%, #0f71ba 100%);
					background: linear-gradient(to bottom, #3fa4f0 0%, #0f71ba 100%);
					font-family: 'Dotum', sans-serif;
					font-size: 9pt;
					text-align: center;
					font-weight: bold;
					color: #fff;
					text-decoration: none;
				}
		 
		 
	</style>	
  </head>
  <body style="overflow-y: hidden;">
		<header>
			<button type="button" id="sidebarCollapse" class="btn btn-primary">
            	<i class="fa fa-bars"></i>
            	<span class="sr-only">Toggle Menu</span>
            </button>
		<a href="https://www.suncheon.go.kr" class="logo">온누리콜센터 <span class="lite">PCRM</span></a>
		</header>
		
		<div class="wrapper d-flex align-items-stretch">
			<nav id="sidebar">
				<div class="p-4 pt-5">
		  		<a href="#" class="img logo rounded-circle mb-5" style="background-image: url(/resources/pcrm/images/logo.jpg); float: none;"></a>
			        <ul class="list-unstyled components mb-5">
			          	<li><a href="#statMapView">순천시 전도</a></li>
			          	<li><a href="#statKeyword">키워드별 지표</a></li>
			          	<li><a href="#statTypeTrend">지표비교</a></li>
			          	<li><a href="#statKeywordSumm">키워드Summary</a></li>
			          	<li><a href="#statCounselType">행정기관별상담현황</a></li>
			        </ul>
		
			        <div class="footer">
			        	<p>Copyright ©2021 SUNCHEON-CITY.</p>
						<p>All rights Reserved.</p>
			        </div>
	      		</div>
    		</nav>

        	<!-- Page Content  -->
		    <div id="content" class="p-4 p-md-5">
<!-- 		    	<h2 class="mb-4">Sidebar #01</h2> -->
<!-- 		       	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> -->
<!-- 		        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> -->
		    	<div id="statMapView" class="tabContent">
					<%@include file="statMapView.jsp" %>
<%-- 					<%@include file="statKeywordSumm.jsp" %> --%>
				</div>
				<div id="statKeyword" class="tabContent">
					<p>제목2제목2제목2</p>
					<p>내용2내용2내용2</p>		
				</div>
				<div id="statTypeTrend" class="tabContent">
					<p>제목3제목3제목3</p>
					<p>내용3내용3내용3</p>
				</div>
				<div id="statKeywordSumm" class="tabContent" style="position: relative;">
					<%@include file="statKeywordSumm.jsp" %>
				</div>
				<div id="statCounselType" class="tabContent">
					<p>제목5제목5제목5</p>
					<p>내용5내용5내용5</p>
				</div>
		    </div>
		    <!-- Page Content End -->
		    
		</div>
		<!-- wrapper End -->
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/pcrm/sample.js'/>"></script>
	
<%-- 	    <script src="${pageContext.request.contextPath}/resources/pcrm/js/jquery.min.js"></script> --%>
<%-- 	    <script src="${pageContext.request.contextPath}/resources/pcrm/js/popper.js"></script> --%>
<%-- 	    <script src="${pageContext.request.contextPath}/resources/pcrm/js/bootstrap.min.js"></script> --%>
	    <script src="${pageContext.request.contextPath}/resources/pcrm/js/main.js"></script>
	</body>
</html>
