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
	
</head>

<script type="text/javascript" src="<c:url value='/resources/js/pcrm/statMapView.js'/>"></script> 
    
<div>
<!-- !!!!!!!!!!!!!!!! -->
<!--  왼쪽 -->
        	<div class="col-lg-4 col-md-12" style="">
	        	
	        	<div class="panel panel-default">
	              
	              <div class="panel-heading">
	                <h2><i class="fa fa-flag-o red"></i><strong style="">오늘의 민원 상세</strong></h2>
	                <div class="panel-actions">
	                </div>
	              </div>
	              
	              <div class="panel-body-map" style="height:140px;">
	              
	              	<div class="air_wrap">
						<div class="todayInfo today_bg" style="
						background-image: URL('<c:url value='/'/>resources/pcrm/images/info_bg.png');
						background-size: cover;
						background-position: 3px 3px;
						background-position-x: center;
						background-repeat: no-repeat;
						height: 100%;
						width: 100%;
						">
					
							<p class="today">
							<span id="air_year"></span>
							<span class="date" id="air_date"></span>
							<span class="time" id="air_time"></span> 기준
							</p>
						
							<div class="air_info" id="bj_air_info">
								<p class="info"><span id="todayText">오늘의</span><span class="spot" id="air_name"> 비전1동</span> 민원현황</p>
								<ul>
									<li></li>
									<li>&nbsp;</li>
								</ul>
							</div>
						</div>
						
						<div class="row"> <br> </div>
						<div class="row" style="display: block;" >
							<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
					            <div class="info-box brown-bg" style="width: 250px;">
									<i class="fa fa-phone"></i>
									<div class="count" id="totCnt" style="color:black">0</div>
									<br>
									<div class="title">전체 민원 수</div>
					            </div>
					            <!--/.info-box-->
					          </div>
					          <!--/.col-->
				
					          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
					            <div class="info-box green-bg">
									<div id = "areaCnt">		            	
										<i class="fa fa-comments-o" style="line-height: 55px;"></i>
										<div class="count" id="addrCnt" style="color:black">0</div>
										<div id="air_name2" class="title" style="margin-top:21px;">비전1동</div>
									</div>
					            </div>
					            <!--/.info-box-->
					          </div>
				          	<!--/.col-->
				          	</div>
          	
	              	</div>
	              	
              	</div>
              	<!-- // body map -->
              
              <div class="panel-body" style="height: 660px;margin-bottom: -20px;">
              
	          <div class="row"> <br> </div>
	          
	          <div id="search" style="height: 42px;">
			          <table class="search_tbl">
			            <tr>
			              <td>
				              <select id="optState" style="width: 80px; height: 25px;">
	                        	<option value = "0"  selected="selected">실시간</option>
	                            <option value = "1">기간설정</option>
	                          </select>
                          
	                          <div id="dvDate" style="padding-left: 10px; display: inline;">
				                <input type="text" class="text_Date" readonly="readonly" id="srcCnslFrDate" maxlength="10" style="height: 25px; width:80px; margin: 0px 2px 0px 2px;"> ~ 
				                <input type="text" class="text_Date" readonly="readonly" id="srcCnslToDate" maxlength="10" style="height: 25px; width:80px;margin: 0px 2px 0px 2px;"> 
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
	              
                <table class="table bootstrap-datatable countries" id="topCtgInfo">
                  
                  <thead>
                    <tr>
                      <th style="width: 90px;">분류</th>
                      <th colspan="2">지역 콜수</th>
                      <th colspan="2">전체 콜수</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                  <!-- 
                    <tr>
                      <td class="grid_td"><i class="fa fa-car"></i></td>
                      <td>주정차</td>
                      <td>2563</td>
                      <td>1025</td>
                      <td>
                        <div class="progress">
						  <div class="progress-bar progress-bar-striped" role="progressbar"
						  aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:40%">
						    40%
						  </div>
						</div>
                      </td>
                    </tr>
                    <tr>
                      <td class="grid_td"><i class="fa fa-tint"></i></td>
                      <td>상하수도</td>
                      <td>3652</td>
                      <td>2563</td>
                      <td>
                        <div class="progress">
						  <div class="progress-bar progress-bar-striped progress-bar-success" role="progressbar"
						  aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:57%">
						    57%
						  </div>
						</div>
                      </td>
                    </tr>
                    <tr>
                      <td class="grid_td"><i class="fa fa-won"></i></td>
                      <td>지방세</td>
                      <td>562</td>
                      <td>452</td>
                      <td>
                        <div class="progress">
						  <div class="progress-bar progress-bar-striped progress-bar-info" role="progressbar"
						  aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:93%">
						    57%
						  </div>
						</div>
                      </td>
                    </tr>
                    <tr>
                      <td class="grid_td"><i class="fa fa-mortar-board"></i></td>
                      <td>교육행정</td>
                      <td>1258</td>
                      <td>958</td>
                      <td>
                        <div class="progress">
						  <div class="progress-bar progress-bar-striped progress-bar-warning" role="progressbar"
						  aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:33%">
						    33%
						  </div>
						</div>
                      </td>
                    </tr>
                    <tr>
                      <td class="grid_td"><i class="fa fa-sort-amount-desc"></i></td>
                      <td>기타</td>
                      <td>4856</td>
                      <td>3621</td>
                      <td>
                        <div class="progress">
						  <div class="progress-bar progress-bar-striped progress-bar-danger" role="progressbar"
						  aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:20%">
						    20%
						  </div>
						</div>
                      </td>
                    </tr>
                    <tr>
                      <td class="grid_td"><i class="fa fa-sort-amount-desc"></i></td>
                      <td>기타</td>
                      <td>4856</td>
                      <td>3621</td>
                      <td>
                        <div class="progress">
						  <div class="progress-bar progress-bar-striped progress-bar-danger" role="progressbar"
						  aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:20%">
						    20%
						  </div>
						</div>
                      </td>
                    </tr>
                    <tr>
                      <td class="grid_td"><i class="fa fa-sort-amount-desc"></i></td>
                      <td>기타</td>
                      <td>4856</td>
                      <td>3621</td>
                      <td>
                        <div class="progress">
						  <div class="progress-bar progress-bar-striped progress-bar-danger" role="progressbar"
						  aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:20%">
						    20%
						  </div>
						</div>
                      </td>
                    </tr>
                    <tr>
                      <td class="grid_td"><i class="fa fa-sort-amount-desc"></i></td>
                      <td>기타</td>
                      <td>4856</td>
                      <td>3621</td>
                      <td>
                        <div class="progress">
						  <div class="progress-bar progress-bar-striped progress-bar-danger" role="progressbar"
						  aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:20%">
						    20%
						  </div>
						</div>
                      </td>
                    </tr>
                     -->
                  </tbody>
                  
                </table>
              
              </div>
              <!-- // panel-body -->
              

            </div>

          </div>
          <!--  // 왼쪽 -->
          
        
          <!--  오른쪽 -->
        	<div class="col-lg-7 col-md-12" style="margin-bottom: -20px;">
				<div>
				
		            <div class="panel panel-default">
		              
		              <div class="panel-heading">
		                <h2><i class="fa fa-map-marker red"></i><strong>순천시 전도</strong></h2>
		                <div class="panel-actions">
		                </div>
		              </div>
		              
		              <div class="panel-body-map" style="height:800px;">
		                	<div id="ptcityMap" style="
							background-image: URL('<c:url value='/'/>resources/pcrm/images/pycity.svg.png');
							background-size: contain;
							background-position: 3px 3px;
							background-position-x: center;
							background-position-y: center;
							background-repeat: no-repeat;
							height: 100%;
							width: 100%;
							">
								<div id="a01" style="position: absolute;"></div>
								<div id="a02" style="position: absolute;"></div>
								<div id="a03" style="position: absolute;"></div>
								<div id="a04" style="position: absolute;"></div>
								<div id="a05" style="position: absolute;"></div>
								<div id="a06" style="position: absolute;"></div>
								<div id="a07" style="position: absolute;"></div>
								<div id="a08" style="position: absolute;"></div>
								<div id="a09" style="position: absolute;"></div>
								<div id="a10" style="position: absolute;"></div>
								<div id="a11" style="position: absolute;"></div>
								<div id="a12" style="position: absolute;"></div>
								<div id="a13" style="position: absolute;"></div>
								<div id="a14" style="position: absolute;"></div>
								<div id="a15" style="position: absolute;"></div>
								<div id="a16" style="position: absolute;"></div>
								<div id="a17" style="position: absolute;"></div>
								<div id="a18" style="position: absolute;"></div>
								<div id="a19" style="position: absolute;"></div>
								<div id="a20" style="position: absolute;"></div>
								<div id="a21" style="position: absolute;"></div>
								<div id="a22" style="position: absolute;"></div>
								<div id="a23" style="position: absolute;"></div>
								<div id="a99" style="position: absolute;"></div>
							</div>
		              </div>
		              
		          </div>
          	</div>
          </div>
          <!--  // 오른쪽 -->

<!-- !!!!!!!!!!!!!!!! -->
</div>