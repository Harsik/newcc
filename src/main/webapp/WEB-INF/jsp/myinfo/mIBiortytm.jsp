<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>바이오리듬</title>
	<link rel="icon" href="/resources/images/favicon.ico">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/> 
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jstree/themes/default/style.min.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.css" type="text/css"/> 
	 
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-2.1.1.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/myinfo/myInfo_CrossBrows.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/common.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/myinfo/myInfo_Biortytm.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/myinfo/myInfo_BiortytmChart.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.js"></script>
</head>
    <body>
        <!--BODY-->
        <div id="h1">바이오리듬</div>
        
        <div id="pop_body" style="height:706px;">
            <!--타이틀-->
            <div class="stitle">바이오리듬 조회</div>
            <!--"타이틀"-->
            <!-- 조회/검색 -->
            <div id="search" style="height: auto;">
            <table class="usearch_tbl">
              	<tr>
              		<th>생년월일</th>
              		<td>
                       <select id="mibotm_syear" class="select_bl" style="width: 60px;"></select>
                       <label>년</label>
                        <select id="mibotm_sm" class="select_bl" style="width: 60px;"></select>
                        <label>월</label>
                        <input type="number" class="text_ol" style="width: 60px;" name="bdays" id="mibotm_bdays" maxlength="2">
                        <!-- <input type="text" class="text_ol" style="width: 60px;" name="bdays" id="bdays" numberonly="true" maxlength="2"> -->
                        <label>일</label>
                    </td>
                    <th>검색일시</th>
                	<td>
                  		<input id="mibotm_tfTbbsStrtDt" type="text" class="text_Date" disabled="disabled" />
                  		<input type="radio" name="serviceType" value="day" checked="checked" /><label>당일</label>
                  		<input type="radio" name="serviceType" value="pmonth" /><label>한달전</label>
                  		<input type="radio" name="serviceType" value="nmonth"/><label>한달후</label>
                	</td>
					<td style="width: 120px">
						<button type="button" id="mibotm_btnSearch" class="button">조회</button>
						<button type="button" id="mibotm_btnInit" class="button">초기화</button>
					</td>
				</tr>
              </table>
            </div>
            <div id="muser_info">
               <label id="mibotm_labMainStatusUserNm" style="color:#404040; font-size:11pt"></label>(<label id="mibotm_labMainStatusExtnId" style="font-size:13pt"></label>)님의 바이오리듬
            </div>
            <div  id="c_search">
	            <!-- 바이오리듬  -->
				<div class="stitle">&nbsp;<label id="mibotm_mStitle"></label>&nbsp;&nbsp;월의 바이오리듬</div>
				<div id="mibotm_chart"></div>
			</div>
			<div id="c_detail">
	             <div id="b_weather">
	             	<div class="stitle">오늘의 날씨</div>
	             	<span id="mibotm_userDong"></span>
	                <div id="weather">
	                	<span id="mibotm_werhr" style="height: 65px; text-align: center;">
	                		<img src="/resources/images/ico_Clear.png" style="margin: 0px 31px; width: 60px; height: 60px;" title="흐림"/>
	                		<em></em>
	                	</span>
	                	<span id="mibotm_tmprt">기온 : <em></em> </span>
	                	<span id="mibotm_humidity">습도 : <em></em></span>
	                	<span id="mibotm_dnsty">평균농도 : <em></em></span>
	                	<span id="mibotm_arpltn">대기환경  : <em></em> <em></em></span>
	                 </div>
	                 <div id ="gdcc">
	                 	<label>현지사정이나 수신 상태에 의해 차이가 발생할 수 있습니다.<br/>(제공 한국환경공단)</label>
	                 </div>
	             </div>  
	            <div  id="r_search">
	            	<div class="stitle" style="float:none;" id="mibotm_stitle"></div><br />
	                <table id="chartData"><!-- 서식이 있는 id -->
	                	<colgroup>
	                		<col width="10%"/>
	                		<col width="30%"/>
	                		<col width="30%"/>
	                		<col width="30%"/>
	                	</colgroup>
	                 	<tr>
	                   		<th>구분</th><th>어제</th><th>오늘</th><th>내일</th>
	                  	</tr>
	                    <tr style="color: #0DA068">
	                        <th>신체</th><td></td><td></td><td></td>
	                    </tr>
	                  	<tr style="color: #194E9C">
	                        <th>감성</th><td></td><td></td><td></td>
	                    </tr>
	                    <tr style="color: #ED9C13">
	                         <th>지성</th><td></td><td></td><td></td>
	                     </tr>
	                </table>
	                <div class="stitle" style="color: red; font-weight: bolder;">해석</div><br/>
	                 <div class="stext" id="mibotm_stext"></div> 
	            </div>
            </div>
        </div>
    </body>
</html>