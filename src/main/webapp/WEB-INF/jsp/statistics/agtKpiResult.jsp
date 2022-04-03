<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="UTF-8">
        <title>상담사 등급평가 결과</title>
		<link rel="icon" href="/resources/images/favicon.ico">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
        <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/resources/js/statistics/agtKpiResult.js'/>"></script>
<!--  
		 <style>
		.ui-datepicker-calendar {
		    display: none;
		    }
		</style>
 -->
    </head>
    <body>
      <!--BODY-->
      <div id="h1">상담사 등급평가 결과</div>
      <div id="pop_body">

	      <!-- 조회/검색 -->
	      <div id="search" style="float:right; background:none; border:none; width:85%; margin-bottom:0px;">
	        <table class="search_tbl">
	          <tr>
	            <th>해당월</th>
	            <td style="width:200px;">
	               <input type="text" class="text_Date" id="agtkpi_selDate" maxlength="7" readonly>
	              <!-- <input type="text" class="date-picker" id="agtkpi_selDate" maxlength="7" readonly> -->
	            </td>  
              <th style="width:100px; padding-left:10px">생산성 집계 일자</th>
              <td style="width: 220px;">
                 <input type="text" class="text_Date" id="agtkpi_selFrDate" maxlength="10" readonly>
                  ~
                 <input type="text" class="text_Date" id="agtkpi_selToDate" maxlength="10" readonly>  
              </td>         
	            <td class="btn">
	              <button type="button" id="agtkpi_btnSearch"  class="button">조회</button>
	              <button type="button" id="agtkpi_btnInit"  class="button">초기화</button>
	            </td>
	          </tr> 
	        </table>
	      </div><!--"조회/검색"-->
      <!-- 
		    <div class="_icon">
		      <div class="left_tab_img_l" style="cursor: pointer;" id="agtkpi_divKpiDataBtn">등급평가</div>
		      <div class="left_tab_img_gray_l" style="cursor: pointer;" id="agtkpi_divKpiResultBtn">등급평가결과</div>
		    </div>
	     
		    <div class="kmain_tbl_list" style="margin-top: 41px; height: 830px; width: 99.5%;">-->
	  		<ul>
	  		<li><a href="#agtkpi_divKpiData">등급평가</a></li>
	  		<li><a href="#agtkpi_divKpiResult">등급평가결과</a></li>
	  		</ul>
	        <!-- 등급평가 START -->
	        <div style="margin-top: 5px; display: block;" id="agtkpi_divKpiData">
		        <div style="width: 100%;">
		
		            <div class="grid_all">
		
	              <!-- 미사용/버튼 테이블 -->
	              <table class="info_tbl">
	                 <tr>
	                    <td>
	                       <button type="button" id="agtkpi_btnExcelDown"  class="button">등급생성 엑셀다운</button>
	                    </td>
	                 </tr>
	              </table>
	              <!--"미사용/버튼 테이블"-->
	
	              <div id="grid_all">
                  <table id="tblagtkpi_KpiDataList"></table>
                  <div id="pgagtkpi_KpiDataList"></div>
	              </div>
	            </div>   
    
		        </div>
		      </div> <!-- 등급평가 END -->
		      
		      <!-- 등급평가결과 START -->
		      <div style="margin-top: 5px; display: none;" id="agtkpi_divKpiResult">
		      
            <div style="width: 100%;">
    
              <div id="grid_all">
							  
                <!-- 미사용/버튼 테이블 -->
                <table class="info_tbl">
                   <tr>
                      <td style="position:absolute; right:85px;">
				                <form action="/xlUpload/kpiUpload/saveKpiResult.do" method="post" id="agtkpi_frm1" name="frm1">
				                  <input type ="file" id="agtkpi_xlFile" name="xlFile"/>
				                </form>
                      </td>
                      <td>
                         <button type="button" id="agtkpi_btnExcelUpload"  class="button">업로드</button>
                      </td>
                   </tr>
                </table>
                <!--"미사용/버튼 테이블"-->
  
                <div id="grid_all">
                  <table id="tblagtkpi_KpiResultList"></table>
                  <div id="pgagtkpi_KpiResultList"></div>
                </div>
                                
              </div><!-- class="grid_all" -->  		
                    
		        </div><!-- style END -->
		      </div><!-- 등급평가결과 END -->
		
	      <!-- </div> -->
      </div><!--"BODY"-->

    </body>
</html>