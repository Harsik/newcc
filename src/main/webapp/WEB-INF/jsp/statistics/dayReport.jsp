<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
    <head>
        <meta charset="UTF-8">
        <title>업무보고</title>
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
        <script type="text/javascript" src="<c:url value='/resources/js/statistics/dayReport.js'/>"></script>
    </head>

    <body>
    
        <!--BODY-->
        <div id="h1">
            업무보고
        </div>
        <div id="pop_body" style="padding-bottom: 148px;">
            <!--타이틀-->
            <div class="stitle">
                일일 업무보고 조회
            </div>
            <!--"타이틀"-->
            <!-- 조회/검색 -->
            <div id="search">
                <table class="search_tbl">
                    <tr>
                        <th>일자</th>
                        <td width="40%" style="text-align: left;">
                            <input id="searchYears" type="text" class="text_ol_half" readonly="readonly" onchange="loadMemo()">
                        </td>
                        <td class="btn">
                            <button type="button" id="ozDayReport" class="button">출력</button>
                            <button type="button" id="ozDayReportInit" class="button">초기화</button>
                        </td>
                    </tr> 
                </table>
            </div>
                
            <div id="grid_all">
                <input type="hidden" id="taskSeq">
                <table class="profile_tbl" style="border-style: none;">
                    <tr>
                        <td style="text-align: right;" colspan="8">
                            <button type="button" id="dayReportNoteSave"  class="button" style="margin-bottom:10px;">저장</button><br/>
                        </td>
                    </tr>
                    <tr>
                        <td class="line_c" style="border-top-color: rgb(152, 165, 179); border-top-width: 1px; border-top-style: solid;">금일<p></p>특이사항</td>
                        <td class="" colspan="7">
                            <textarea id="dayReportNote" style="overflow: auto; height: 87px; width: 500px; border-radius: 3px; border: 1px solid #b5b5b5;" maxlength="3900"></textarea>
                        </td>
                    </tr>
                     <tr>
                        <td class="line_c">전체현황</td>
                        <td class="" colspan="7">
                            <textarea id="dayReportEntrSt" style="overflow: auto; height: 87px; width: 500px; border-radius: 3px; border: 1px solid #b5b5b5;" maxlength="3900"></textarea>
                        </td>
                    </tr>
                </table>
            </div>
            
            <table class="profile_tbl" style="border-style: none; margin-top: 20px;"></table>
            
            <div class="stitle">
                주간별 업무보고 조회
            </div>
            <!--"타이틀"-->
            <!-- 조회/검색 -->
            <div id="search">
                <table class="search_tbl">
                    <tr>
                        <th>일자</th>
                        <td width="33%" style="text-align: left;width:240px;">
                            <input id="strDay" type="text" class="text_ol_half" readonly>
                            ~
                            <input id="endDay" type="text" class="text_ol_half" readonly>
                        </td>
                        <td class="btn">
                            <button type="button" id="ozDayReportDay" class="button">출력</button>
                            <button type="button" id="ozDayReportDayInit" class="button">초기화</button>
                        </td>
                    </tr> 
                </table>
            </div>
            <!-- 
            일별 콜현황
             <div class="stitle">
                일별 콜 현황 조회
            </div>
            "타이틀"
            조회/검색
            <div id="search">
                <table class="search_tbl">
                    <tr>
                        <th>일자</th>
                        <td width="33%" style="text-align: left;width:240px;">
                            <input id="strDay" type="text" class="text_ol_half" readonly>
                            ~
                            <input id="endDay" type="text" class="text_ol_half" readonly>
                        </td>
                        <td class="btn">
                            <button type="button" id="excelgiganDay" class="button">출력</button>
                            <button type="button" id="excelgiganInit" class="button">초기화</button>
                        </td>
                    </tr> 
                </table>
            </div>
           
            상담코테고리 별 주간 총 인바운드 상담유형
              <div class="stitle">
                상담코테고리 별 주간 총 인바운드 상담유형  조회
            </div>
            "타이틀"
            조회/검색
            <div id="search">
                <table class="search_tbl">
                    <tr>
                        <th>일자</th>
                        <td width="33%" style="text-align: left;width:240px;">
                            <input id="strDay" type="text" class="text_ol_half" readonly>
                            ~
                            <input id="endDay" type="text" class="text_ol_half" readonly>
                        </td>
                        <td class="btn">
                            <button type="button" id="ozDayReportDay" class="button">출력</button>
                            <button type="button" id="ozDayReportDayInit" class="button">초기화</button>
                        </td>
                    </tr> 
                </table>
            </div>
             -->
            <!-- 월별통  -->
              <div class="stitle">
               순천시3114온누리콜센터 운영상담 현황
            </div>
            <!--"타이틀"-->
            <!-- 조회/검색 -->
            <div id="search">
                <table class="search_tbl">
                    <tr>
                        <th>월별</th>
                        <td width="33%" style="text-align: left;width:320px;">
                           <span id = "termDetail"></span> &nbsp;&nbsp;&nbsp;<!-- <input class="checkbox" id="chkNotUse" style="top: 4px;" type="checkbox">평일만 보기  -->
                           <!-- 
                           <select id="callBound" style="width: 80px;">
                              <option value="all">전체</option>
                              <option value="in">인바운드</option>
                              <option value="out">아웃바운드</option>
                           </select> 
                           -->
                        </td>
                        <td class="btn">
                            <button type="button" id="excelReportYear" class="button">출력</button>
                            <button type="button" id="excelReportYearInit" class="button">초기화</button>
                        </td>
                    </tr> 
                </table>
            </div>
            
        </div>
    </body>
</html>