<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="<c:url value='/resources/js/civilservice/cswDbManage_statistics.js'/>"></script>


	<!-- 조회/검색 -->
     <div id="search">
       <table class="search_tbl">
         <tr>
           <th>요청일자</th>              
           <td style="width: 250px;">
             <input type="text" class="text_Date" id="csdbst_StatsSrchSelFrDate" maxlength="10"> ~ 
             <input type="text" class="text_Date" id="csdbst_StatsSrchSelToDate" maxlength="10" > 
           </td>
           
           <th style="width: 60px;">부서명</th>
	       <td>
	       	 <input id="csdbst_StatsSrchRequstAt" class="text_ol" placeholder="부서명을 입력해주세요.">
	       	 <input id="csdbch_deptVal" style="display:none;">
	       </td>
           
           <th style="width: 100px;">
             <input type="checkbox" id ="csdbst_chkStaticsDeptAllCount"  class="checkbox">
             <label for="csdbst_chkStaticsDeptAllCount" >부서별 통계</label>
           </th>
        
           <td class="btn">
             <button type="button" id="csdbst_StatsSrchSearch" class="button">조회</button>
             <button type="button" id="csdbst_StatsSrchInit" class="button">초기화</button>
             <button type="button" id="csdbst_StatsSrchExcelDown" class="button">엑셀다운</button>
           </td>
         </tr> 
       </table>
     </div>
     <!--"조회/검색"-->
  	 
  	<!-- 그리드 -->
	<div id="csdbst_allStatistics" style="margin-bottom: 15px; clear: both;">
		<table id="csdbst_tblStatsSttusList"></table>
		<div id="csdbst_pgStatsSttusList"></div>
	</div>
	
	<div id="csdbst_deptStatistics" style="margin-bottom: 15px; clear: both;">
		<table id="csdbst_tblStatsSttusList_Dept"></table>
		<div id="csdbst_pgStatsSttusList_Dept"></div>
	</div>	