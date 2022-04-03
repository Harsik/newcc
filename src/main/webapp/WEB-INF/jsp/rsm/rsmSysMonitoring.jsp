<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>

<html lang="ko">

  <head>
    <meta charset="UTF-8">
    <title>시스템 자원현황</title>
	<link rel="icon" href="/resources/images/favicon.ico">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
    
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/common.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/rsm/rsmSysMonitoring.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/charts/loader.js"></script>
  
    <style type="text/css">
      .image {    
         position:relative;     
         float:left; /* optional */     
      }
      
      .image .text {      
         position:absolute;     
         top:0px;  /* in conjunction with left property, decides the text position */     
         left:15px;       
         width:100px; /* optional, though better have one */      
      }
    </style>  
  
  </head>
  
  <body>
      
    <!--BODY-->
    <div id="h1">시스템 자원현황</div>
    
    <div id="pop_body" style="min-height: 810px;">
      <!-- <input type="hidden" id="campaignId"> -->
      <!--타이틀-->
      <div class="stitle">
                시스템 자원현황
      </div><!--"타이틀"-->
      
      <!--"조회/검색"-->
      <div id="search">
        <table class="search_tbl">
          <tr>
            <th>시스템분류</th>
            <td class="sel">
              <select class="select_al" id="srchSysRole">
              </select>
            </td>
            <td class="btn">
             <button type="button" id="btnSearch"  class="button">조회</button>
             <!-- <button type="button" id="btnReset"  class="button">초기화</button> -->
            </td> 
          </tr>
        </table>
      </div>
      <!--"조회/검색"-->
                        
      <!--그리드-->
      <div id="grid_all">
      
        <div>
          <!-- 그리드테이블 -->
           <div class="grid_all">
            <!-- 미사용/버튼 테이블 -->
            <table class="info_tbl">
            </table>
            <!--"미사용/버튼 테이블"-->
            
            <!-- 그리드테이블 -->
            <div class="grid_tbl">
              <table id="tblSysMnt"></table>
              <div id="pgSysMnt"></div>
            </div>
            <!--"그리드테이블"-->
            
           </div>
        </div>
      </div><!--"그리드"-->
      <br />
      <div class="grid_all" style="width:44%; float:left;">
        <!-- 미사용/버튼 테이블 -->
        <table class="info_tbl">
          <tr>
            <td style="float: left;">
            <div class="stitle">파티션 세부조회</div>
            </td>
          </tr>
        </table>
        <span style="clear: both"></span>
        <!--"미사용/버튼 테이블"-->
        <!-- 그리드테이블 -->
        <div class="grid_tbl" style="margin-bottom: 10px;">
          <input type="hidden" id="snmpSystemId">
          <table id="tblDskPts"></table>
          <div id="pgDskPts"></div>
        </div>
        <!--"그리드테이블"-->
       
      </div>
      <br />

      <div style="width:55%; float:right;">

        <div class="stitle">임계치 설정</div>
        <div style="float: right;">          
          <button type="button" id="btnDelete" class="button" style="float: right; margin-bottom: 5px;">삭제</button>
          <button type="button" id="btnUpdate" class="button" style="float: right; margin-bottom: 5px; margin-right: 5px;">저장</button>
        </div>
         <!-- 임계치 적용 테이블 -->
         <input type="hidden" id="stdSystemId">
         <table class="profile_tbl">  
            <tr>
              <td class="line_rt">분류</td>
              <td class="line_b"><input type="text" class="text_ol" id="sysRole" readonly ></td>
              <td class="line_c">시스템</td>
              <td class="line_b"><input type="text" class="text_ol" id="systemNm" readonly ></td>     
            </tr>
            <tr>
              <td class="line_rt">호스트명</td>
              <td class="line_b"><input type="text" class="text_ol" id="hostName" readonly ></td>
              <td class="line_c">IP</td>
              <td class="line_b"><input type="text" class="text_ol" id="ipAddr1" readonly ></td>                
            </tr>
            <tr>
              <td class="line_rt">CPU</td>
              <td class="line_b"><input type="text" class="text_ol" id="cpu"></td>
              <td class="line_c">MEMORY</td>
              <td class="line_b"><input type="text" class="text_ol" id="mem"></td>
            </tr>                        
            <tr>
              <td class="line_rt">DISK</td>
              <td class="line_b"><input type="text" class="text_ol" id="dsk"></td>
              <td class="line_c">NET</td>
              <td class="line_b"><input type="text" class="text_ol" id="net"></td>
            </tr>
            <tr>
              <td class="line_rt">PING</td>
              <td class="line_b">
                <select class="select_al" id="ping">
                  <option value="">미선택</option>
                  <option value="1">예</option>
                  <option value="0">아니오</option>
                </select>              
              </td>
              <td class="line_c">SMS 발송상태</td>
              <td class="line_b">
                <select class="select_al" id="sendGubun">
                </select>              
              </td>               
            </tr>     
            <tr>
              <td class="line_rt">사용여부</td>
              <td class="line_b">
                <select class="select_al" id="useYn">
                  <option value="">미선택</option> 
                  <option value="1">사용</option>
                  <option value="0">미사용</option>
                </select>              
              </td>
              <td class="line_c"></td>
              <td class="line_b">
            
              </td>               
            </tr>   
          </table><!-- 임계치 적용 테이블 -->           
      
      </div>

      <br />
      
      <div style="width:100%; float:left;">
      
        <div class="stitle">System 사용율 현황</div>
          <br />
          <br />
          <div id="chart_div_Disk" style="float:left; width:24%;"></div>
          <div id="chart_div_Memory" style="float:left; width:24%;"></div>
          <div id="chart_div_CPU" style="float:left; width:24%;"></div>
          <div id="chart_div_Network" style="float:left; width:24%;"></div>

          <!-- <div id="chart_div_SysRate" style="float:left; width:97%; height: 230px; border: 1px solid red;"></div> -->
      </div>     

    </div><!--"BODY"-->
  </body>
</html>