<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


  			<div id="cstrvc_subGrid_all" class="divInner">
			        <!-- 조회/검색 -->
			        <div id="search">
			          <table class="search_tbl">
			            <tr>
			              <th>접수일자</th>              
			              <td style="width: 250px;">
			                <input type="text" class="text_Date" id="cstrvc_srcStatsFrDate" maxlength="10"> ~ 
			                <input type="text" class="text_Date" id="cstrvc_srcStatsToDate" maxlength="10" > 
			              </td>
			              
			              <th style="width: 60px;">부서명</th>
					      <td>
					        <input id="cstrvc_StatsSrchRequstAt" class="text_ol" placeholder="부서명을 입력해주세요.">
					        <input id="cstrvc_deptVal" style="display:none;" >
					      </td>
			              
			              <th style="width: 100px;" >
				              <input type="checkbox" id ="chkStaticsDeptAllCount"  class="checkbox">
				              <label for="chkStaticsDeptAllCount" >부서별 통계</label>
			              </th>
              
			              <td class="btn">
			                <button type="button" id="cstrvc_btnStatisticsSearch" class="button">조회</button>
			                <button id="cstrvc_StatsSrchInit" class="button">초기화</button>
			                <button type="button" id="cstrvc_btnStatisticsExcelDown" class="button">엑셀다운</button>
			              </td>
			            </tr> 
			          </table>
			        </div><!--"조회/검색"-->
			        								
					<!-- 이관민원 그리드테이블 -->
					<div id="allStatistics" style="margin-bottom: 15px; clear: both;">
						<table id="cstrvc_tblStatistics"></table>
						<div id="cstrvc_pagingStatistics"></div>
					</div>
					
					<div id="deptStatistics" style="margin-bottom: 15px; clear: both;">
						<table id="cstrvc_tblStatistics_Dept"></table>
						<div id="cstrvc_pagingStatistics_Dept"></div>
					</div>		
        	</div>    