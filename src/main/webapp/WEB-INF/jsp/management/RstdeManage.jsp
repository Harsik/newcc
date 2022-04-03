<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <title>휴무일 관리</title>
	<link rel="icon" href="/resources/images/favicon.ico">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
   <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.css" type="text/css"/>
   <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-timepicki/css/timepicki.css" type="text/css"/>
   <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
   <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/myinfo.css" type="text/css"/>
   <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/fullcalendar/fullcalendar.min.css" type="text/css"/>
   
   	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/fullcalendar/moment.min.js"></script>
   <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-2.1.1.min.js"></script>
   <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
   <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js'/>"></script>
   <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-timepicki/js/timepicki.js'/>"></script>
   <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/common.js"></script>
   <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
   <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
   <script type="text/javascript" src="<c:url value='/resources/js/lib/jstree/jstree.js'/>"></script>
   <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/fullcalendar/fullcalendar.min.js"></script>
   <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/fullcalendar/locale-all.js"></script>
    <script type="text/javascript" src="<c:url value='/resources/js/management/RstdeManage.js'/>"></script>
    <style>
	#rstdeMng_calendar {
		padding: 5px;
		background-color: white;
		
	}
	
	.profile_tbl .line_b { /*입력칸 아래선*/
		width: auto;
	}
	
		.info_tbl_btn {
	   margin: auto;
	}
	
	   
	    .fc-sat span, .fc-sat .fc-day-number{  
	    	color:#0054FF; 
	    }    
		.fc-sun span, .fc-sun .fc-day-number{  
	    	color:#FF0000; 
	    } 
	
	.fc-event, .fc-event-dot{
		background-color: rgba(0, 0, 0, 0);
		border-color:white;
	    left:15%; 
	    top:20%; 
	    margin-right:30px;
	    border-color:rgba(0, 0, 0, 0);
	}

	button.fc-prev-button,button.fc-next-button {
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
		font-family: '돋움', sans-serif;
		font-size: 9pt;
		text-align: center;
		font-weight: bold;
		color: #fff;
		text-decoration: none;
	}
	
	button.fc-prev-button:hover,button.fc-next-button:hover {
		border: 1px solid #336ac8;
		background: #2f65c0;
		background: -moz-linear-gradient(top, #427cdb 0%, #2559b1 100%);
		background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #427cdb), color-stop(100%, #2559b1));
		background: -webkit-linear-gradient(top, #427cdb 0%, #2559b1 100%);
		background: -o-linear-gradient(top, #427cdb 0%, #2559b1 100%);
		background: -ms-linear-gradient(top, #427cdb 0%, #2559b1 100%);
		background: linear-gradient(to bottom, #427cdb 0%, #2559b1 100%);
		color: #f4f4f4;
	}
	
	button.fc-prev-button:active,button.fc-next-button:active {
		border: 1px solid #336ac8;
		background: #2f65c0;
		background: -moz-linear-gradient(top, #427cdb 0%, #2559b1 100%);
		background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #427cdb), color-stop(100%, #2559b1));
		background: -webkit-linear-gradient(top, #427cdb 0%, #2559b1 100%);
		background: -o-linear-gradient(top, #427cdb 0%, #2559b1 100%);
		background: -ms-linear-gradient(top, #427cdb 0%, #2559b1 100%);
		background: linear-gradient(to bottom, #427cdb 0%, #2559b1 100%);
	}
	.fc-title{
	   color:#FF0000;
	}
	</style>
  </head>
  
  <body>
    
    <!--BODY-->
    <div id="h1">휴무일 관리</div>
    <div id="pop_body" style="height:910px;">
    
         <!--촤즉 공휴일 달력관리-->
         <div style="width: 65%; float:left;">    
      
         <!--타이틀-->
         <div class="stitle">휴무일 조회</div>
         <!--"타이틀"-->
         <!-- 조회/검색 -->
         <div id="search">
           <table class="search_tbl">
             <tr>
                <th>날짜검색</th>
                <td>
                 <span id = "rstdeMng_termDetail"></span>
                </td>              
                 <td class="btn">
                     <button type="button" id="rstdeMng_btnRmSearch" class="button">조회</button>
                   <button type="button" id="rstdeMng_btnRmInit"  class="button">초기화</button>
                 </td>
             </tr>
           </table>
         </div>
         <!--"조회/검색"-->
         <!--"타이틀"-->
         <!--그리드-->
         		<div style=" float: left;  padding : 10px; margin-bottom: 10px;	background-color: #E5EAF5; border: 1px solid #dddddd; height: 50%;">
				<div id="rstdeMng_calendar" style=""></div>
				<!-- <div id="optColor" style="padding: 10px 0 0 0;"> -->
			</div>
         <!--"그리드"-->
       </div>
     
         <!--오른쪽 법정공휴일 관리-->
         <div style="width: 34%; float:right;">
         <!--타이틀-->
         <div class="stitle" style="margin-top: 4px">법정공휴일</div>
         <!--"타이틀"-->
         <!-- 조회/검색 -->
         <div id="search" style="border-image: none;">
         <input class="checkbox" id="rstdeMng_checkBoxId" style="margin-top: 5px;" type="checkbox">&nbsp;&nbsp;<B>전체보기</B>&nbsp;&nbsp;&nbsp;&nbsp;<span><b><label id="yearId">2018</label>년 공휴일 총 </b><span id="s_date">69</span><b>&nbsp;일</b></span>
           <button type="button" id="rstdeMng_btnlbInit"  style="margin-top: 5px; margin-right:6px; float:right;" class="button">초기화</button>
           <button type="button" id="rstdeMng_btnlbSave"  style="margin-top: 5px; margin-right:6px; float:right;" class="button">저장</button>
           <button type="button" id="rstdeMng_btnlbUpdate"  style="display:none; margin-top: 5px; margin-right:6px; float:right;" class="button">수정</button>
           <button type="button" id="rstdeMng_btnlbDelete"  style="display:none; margin-top: 5px; margin-right:6px; float:right;" class="button">삭제</button>
         </div><!--"조회/검색"-->
                   <div id="search" style="border-image: none; height: 52px; margin-bottom: 10px;">
              		<table id="chartData">
	               <%--  	<colgroup>
	                		<col width="50%">
	                		<col width="50%">
	                	</colgroup> --%>
	                 	<tbody><tr>
	                   		<th colspan="2">공휴일명</th><th colspan="2">공휴일자</th>
	                  	</tr>
	                    <tr style="color: rgb(13, 160, 104);">
	                        <td style="color: rgb(0, 0, 255);" colspan="2">
	                        <input class="text_ol" id="rstdeMng_HldyNm" size="10" type="text" style="border-color: rgb(255, 255, 255); width: 90%;" type="text">
	                        </td>
	                        <td style="color: rgb(0, 0, 255);" colspan="2">
	                             <input class="text_ol" id="rstdeMng_HldyUsr"  type="text" style="border-color: rgb(255, 255, 255); width: 85%;" type="text">
	                        </td>
	                    </tr>
	                   </tbody>
					</table>
        		 </div>
        	<div id="search" style="border-image: none; height: 32px; margin-bottom: 3px;">
              		<table id="chartData">
	               <%--  	<colgroup>
	                		<col width="50%">
	                		<col width="50%">
	                	</colgroup> --%>
	                 	<tbody>
         	                    <tr>
	                    	<th colspan="1">선택 년도</th>
	                    	 <td style="color: rgb(0, 0, 255);">
	                    		 <span id = "rstdeMng_copyDetail" style="border-color: rgb(255, 255, 255); width: 90%;"></span> 
	                    		 <!-- <input class="text_ol" id="copyDayYear" size="10" type="number" style="border-color: rgb(255, 255, 255); width: 90%;" type="text"> -->
	                        </td>
	                    	<th style="background: none; border: currentColor; border-image: none;" colspan="1">
	                    	<button class="button" id="rstdeMng_btnCopty" style="width: 94px;" type="button">복사하기</button></th>
	                    	 <td style="color: rgb(0, 0, 255);">
	                    		<span id = "rstdeMng_saveDetail" style="border-color: rgb(255, 255, 255); width: 90%;" ></span>
	                    		 <!-- <input class="text_ol" id="saveDayYear" size="10" type="number" style="border-color: rgb(255, 255, 255); width: 90%;" type="text"> -->
	                        </td>
	                     </tr>
	                   </tbody>
					</table>
        		 </div>
        <!--그리드-->
        <div id="grid_all">
          <!-- 그리드테이블 -->
          <div id="grid_all" style="padding-top: 200px;">     
            <table id="rstdeMng_tblRstdeManageList"></table>
            <div id="rstdeMng_pgRstdeManageList"></div>
          </div><!--"그리드테이블"-->
        </div><!--"그리드"-->
        <br/>
      </div>
         
      <!--"하단 문자상담설정"-->
       <div>   
         <!--타이틀-->
         <div class="stitle_bot" style="margin-top: 0px;">문자상담설정</div>
         <!--"타이틀"-->
         <!-- 버튼 테이블 --> 
         <table class="info_tbl_btn" style="margin-top: 0px;">
           <tr>
             <td>
               <button type="button" id="rstdeMng_btnStSave"  class="button">저장</button>
               <button type="button" id="rstdeMng_btnstInit"  class="button">초기화</button>
             </td>
           </tr>
         </table>
         <!--"버튼 테이블"-->
         
         <!-- 문자상담정보테이블 -->    
         <table class="profile_tbl">
           <tr>
             <td class="line_rt" style="width:60px;">
				<span id="wdJob" style="padding-left: 6px;">평일 근무 시간</span>
             </td>
             <td class="line_b" style="width:138px;">
               <input type="radio" name="wd_Gb_Cd" value="Y"/>근무
               <input type="radio" name="wd_Gb_Cd" value="N"/>휴무
             </td>
             <td class="line_c" style="width:40px;">근무시간</td>
             <td class="line_b" style="width:180px;">
                <input type="text" class="text_Time" id="rstdeMng_schTimeSt" style="width:130px; text-align: center;" maxlength="10"/>
				<span>~</span>
            	<input type="text" class="text_Time" id="rstdeMng_schTimeEn" style="width:130px; text-align: center;" maxlength="10"/>      
             </td>
             <td class="line_c" style="width:60px;">머리말</td>
             <td class="line_b" style="width:138px;">
               <input type="text" class="text_ol_half" id="rstdeMng_rm_prologue" name="prologue" style="width:240px;" maxlength="100">
             </td>
           </tr>
           <tr>
             <td class="line_rt">
             	<span id="hdJob" style="padding-left: 0px;">휴일 근무 시간</span>
             </td>
             <td class="line_b" colspan="1">
             <input type="radio" name="hd_Gb_Cd" value="Y"/>근무
              <input type="radio" name="hd_Gb_Cd" value="N"/>휴무
             </td>
            <td class="line_c">근무시간</td>
            <td class="line_b" colspan="1">
                 <input type="text" class="text_Time" id="rstdeMng_hdschTimeSt" style="width:130px; text-align: center;" maxlength="10"/>
               <span>~</span>
            <input type="text" class="text_Time" id="rstdeMng_hdschTimeEn" style="width:130px; text-align: center;" maxlength="10"/>           
            </td>
                <td class="line_c">꼬릿말</td>
            <td class="line_b" colspan="1">
              <input type="text" class="text_ol_half" id="rstdeMng_rm_remarks" name="rm_remarks" style="width:240px;" maxlength="100">           
            </td>      
           </tr>
           
         </table><!--"개인정보테이블"-->
       
         </div><!--"하단 문자상담설정"-->
    </div>
  <!--"BODY"-->
  </body>
</html>