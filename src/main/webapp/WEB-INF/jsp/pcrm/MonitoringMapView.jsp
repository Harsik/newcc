<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<head>
  <title> title </title>  
    <meta charset="utf-8">
    <!-- Bootstrap CSS -->
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/bootstrap/css/bootstrap.min.css" type="text/css"/>
	<!-- bootstrap theme -->
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/bootstrap/css/bootstrap-theme.css" type="text/css"/>
	<!-- font icon -->
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/bootstrap/css/elegant-icons-style.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/bootstrap/css/font-awesome.min.css" type="text/css"/>
	
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js\lib\rMateChartH5\Assets\Css\rMateChartH5.css" type="text/css" />
	
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
	    <script type="text/javascript" src="<c:url value='/resources/js/lib\rMateChartH5\LicenseKey\rMateChartH5License.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib\rMateChartH5\JS\rMateChartH5.js'/>"></script>
	    
	
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
<%-- 		<script type="text/javascript" src="<c:url value='/resources/js/pcrm/sample.js'/>"></script> --%>
		<script type="text/javascript" src="<c:url value='/resources/js/pcrm/MonitoringMapView.js'/>"></script>
	
<%-- 	    <script src="${pageContext.request.contextPath}/resources/pcrm/js/jquery.min.js"></script> --%>
	    <script src="${pageContext.request.contextPath}/resources/pcrm/js/popper.js"></script>
	    <script src="${pageContext.request.contextPath}/resources/pcrm/js/bootstrap.min.js"></script>
	    <script src="${pageContext.request.contextPath}/resources/pcrm/js/main.js"></script>
	    
	    
	<style type="text/css">
		header {
		    width:100%;
		    height:60px;
		    background: #1d1919;
		    padding: 10px 0px;
		    margin-bottom: 50px;
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
			<a href="https://www.suncheon.go.kr" class="logo">온누리콜센터 <span class="lite">PCRM</span></a>
			<div class="btn" id="pcrmPopup">
				<button type="button" class="button" id="goPcrm" value="keywordSumm">키워드Summary</button>
				<button type="button" class="button" id="goPcrm" value="counselType">유형별별상담현황</button>
				<button type="button" class="button" id="goPcrm" value="typeTrend">유형별지표추이</button>
				<button type="button" class="button" id="goPcrm" value="keyword">키워드별지표</button>
			</div>
		</header>
<!-- !!!!!!!!!!!!!!!! -->
<!--  왼쪽 -->
        	<div class="col-lg-4 col-md-12" style="margin-left: 50px;">
	        	
	        	<div class="panel panel-default">
	              
	              <div class="panel-heading" style="height: 20px;">
	                <h2><i class="fa fa-flag-o red"></i><strong style="">오늘의 민원 상세</strong></h2>
	                <div class="panel-actions">
	                </div>
	              </div>
	              
				<div>
					<div class="row" style="display: block;">
						<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
					    	<div class="info-box brown-bg">
								<i class="fa fa-phone"></i>
								<div class="count" id="totCnt" style="color:black">57</div>
								<br>
								<div class="title">전체 민원 수</div>
					        </div>
					    </div>
					    
				
					    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
					    	<div class="info-box green-bg">
								<div id="areaCnt" style="display: block;">		            	
								<i class="fa fa-comments-o" style="line-height: 55px;"></i>
								<div class="count" id="addrCnt" style="color:black">0</div>
								<div id="air_name2" class="title" style="margin-top:21px;">장천동</div>
							</div>
					    	</div>
				        </div>
					</div>
				</div>
              	<!-- // body map -->
              
              <div class="panel-body" style="height: 660px;margin-bottom: -20px;">
	          
	          <div id="search" style="height: 42px;">
			          <table class="search_tbl">
			            <tr>
			              <td>
				              <select id="optState" style="width: 80px; height: 25px;">
	                        	<option value = "0"  selected="selected">실시간</option>
	                            <option value = "1">기간설정</option>
	                          </select>
                          
	                          <div id="dvDate" style="padding-left: 10px; display: inline;">
				                <input type="text" class="text_Date" readonly="readonly" id="srcCnslFrDate" maxlength="10" style="width: 95px;margin: 0px 5px 0px 5px;"> ~ 
				                <input type="text" class="text_Date" readonly="readonly" id="srcCnslToDate" maxlength="10" style="width: 95px;margin: 0px 5px 0px 5px;"> 
				              </div>
			              </td>
			              
			              <td class="btn" style="padding: 0px;">
			              	<button id="btnCnslSearch" class="button">조회</button>
			              	<button id="btnCnslExcel" class="button">엑셀다운</button>
			              	<button id="btnCnslInit" class="button">초기화</button>
			              </td>
			            </tr>
			          </table>
			 </div>
	             <div id="chartHolder1" style="height:580px;"></div> 
                <!-- 
                <table class="table bootstrap-datatable countries" id="topCtgInfo">
                  
                  <thead>
                    <tr>
                      <th style="width: 90px;">분류</th>
                      <th colspan="2">지역 콜수</th>
                      <th colspan="2">전체 콜수</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                  
                  </tbody>
                  
                </table>
              	 -->
              </div>
              <!-- // panel-body -->
              

            </div>

          </div>
          <!--  // 왼쪽 -->
          
        
	        <!--  오른쪽 -->
	       	<div class="col-lg-7 col-md-12" style="margin-bottom: -20px;width: 60%;">
				<div>
				
		        	<div class="panel panel-default">
		              
		            	<div class="panel-heading" style="height: 20px;">
		                	<h2><i class="fa fa-map-marker red"></i><strong>순천시 전도</strong></h2>
		                	<div class="panel-actions">
		                	</div>
		           		</div>
		              
		            	<div class="panel-body-map" style="height:800px;">
		            		<div id="ptcityMap" style="
								background-image: URL('<c:url value='/'/>resources/pcrm/images/map.png');
								background-color: white;
								background-size: contain;
								background-position: 3px 3px;
								background-position-x: center;
								background-position-y: center;
								background-repeat: no-repeat;
								height: 100%;
								width: 100%;
							">
							</div>
		             </div>
		              
		  	</div>
          	</div>
      </div>
      <!--  // 오른쪽 -->

<!-- !!!!!!!!!!!!!!!! -->
</body>