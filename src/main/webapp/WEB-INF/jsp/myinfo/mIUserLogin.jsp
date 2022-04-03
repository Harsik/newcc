<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
    <head>
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
        <title>나의접속정보</title>
		<link rel="icon" href="/resources/images/favicon.ico">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.css" type="text/css"/>
        
        <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/resources/js/myinfo/myInfo_UserLogin.js'/>"></script>
        
        <style>
            .grid-col
            {
                padding-left : 15px !important;
            }
        </style>
        
    </head>
    
    <body>
        <div id="h1">나의접속정보 </div>
        <div id="pop_body">
            <div class="stitle">접속이력 조회</div>
        <div id="search">
            <table class="search_tbl">
                <tr>
                    <th>검색어</th>
                    <td class="sel">
                        <select class="select_al" id="miuslg_optSrchtype">
                            <option value="all">전체</option>
                            <option value="loginId">이름</option>
                            <option value="innerNum">내선번호</option>
                        </select>
                    </td>
                    <td class="nemo_20">
                        <input type="text" class="text_ol" id="miuslg_idSrchVal" maxlength="20">
                    </td>
                    <!-- <th></th> -->
                    <th style="padding-left: 14px;">로그인일자</th>
                        <td class="nemo_50" style="width: 220px;">
                            <input type="text" class="text_ol_half" id="miuslg_loginInfoDtStr" readOnly style="text-align: center;">
                            <label> ~ </label>
                            <input type="text" class="text_ol_half" id="miuslg_loginInfoDtEnd" readOnly style="text-align: center;">
                        </td>
                        <td id="miuslg_nemo_30" class="nemo_30" style="left: 730px;font-weight:bold;width: 260px;">
                            <input name="serviceType" type="radio" value="day" checked>당일&nbsp;&nbsp;
                            <input name="serviceType" type="radio" value="week">1 주일전&nbsp;&nbsp;
                            <input name="serviceType" type="radio" value="month">1 개월전
                        </td>
                        <td class="btn">
                            <button type="button" id="miuslg_btnSearch"  class="button">조회</button>
                            <button type="button" id="miuslg_btnInit"  class="button">초기화</button>
                        </td>
                </tr>
            </table>
        </div>
        <div id="grid_all">
        <div class="stitle">접속이력</div>
            <div class="grid_tbl">
            <table style="width:100%; height:200px;">
                <tr>
                    <td>
                        <div class="info_tbl" style="text-align: right;">
                            <!-- <button type="button" id="miuslg_btnExcel"  class="button">엑셀저장</button> -->
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>         
                        <table id="miuslg_loginInfoList"></table>
                        <div id="miuslg_pgLoginInfoList"></div>
                    </td>
                </tr>
            </table>
            </div>
        </div>
        </div>  
    </body>
</html>