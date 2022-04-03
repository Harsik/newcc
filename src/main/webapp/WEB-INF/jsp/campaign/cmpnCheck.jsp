<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>

<html lang="ko">

	<head>
		<meta charset="UTF-8">
		<title>해피콜조회</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-2.1.1.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/common.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/campaign/cmpnCheck.js"></script>
	</head>
	
	<body>
			
		<!--BODY-->
		<div id="h1">해피콜조회</div>
		
		<div id="pop_body" style="min-height: 830px;">
			<input type="hidden" id="campaignId">
			<!--타이틀-->
			<div class="stitle">
			해피콜조회
			</div><!--"타이틀"-->
			
      <!--"조회/검색"-->
      <div id="search">
          <table class="search_tbl">
              <tr>
              	<th>해피콜기간</th>
								<td width="30%" style="text-align: left;">
									<input type="text" style="width: 80px;" class="text_ol_half" id="selFrDate" maxlength="16">
									 ~
									<input type="text" style="width: 80px;" class="text_ol_half" id="selToDate" maxlength="16">		
								</td>
                <th>해피콜명</th>
                <td class="nemo_50" style="" colspan="2">
                	<input type="text" class="text_ol" id="cmpgNm" name="cmpgNm" maxlength="167">
                </td>
                <th>상담사</th>
            	  <td class="sel">
             	  	<select class="select_al" id="selAgent" style="width: 120px;">
              	  </select>
          	   	</td>
                <td class="btn">
                   <button type="button" id="btnSearch"  class="button">조회</button>
                   <button type="button" id="btnReset"  class="button">초기화</button>
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
	            <table id="tbl010"></table>
	            <div id="pg010"></div>
	          </div>
	          <!--"그리드테이블"-->
	          
           </div>
				</div>
			</div><!--"그리드"-->
			<br />
			<div class="grid_all" style="width:50%; float:left;">
		    	<!-- 미사용/버튼 테이블 -->
		        <table class="info_tbl">
		        	<tr>
		        		<td style="float: left;">
		        		<div class="stitle">처리결과</div>
		        			<select id="selProcSt" style="width: 65px;">
		        			</select>
								</td>
							</tr>
		        </table>
		        <span style="clear: both"></span>
						<!--"미사용/버튼 테이블"-->
		        <!-- 그리드테이블 -->
		        <div class="grid_tbl" style="margin-bottom: 10px;">
		        	<table id="cmpgtbl012"></table>
		            <div id="cmpgpg012"></div>
		        </div>
		        <!--"그리드테이블"-->
		  </div>
		  <div style="width:50%; float:right;">
		  	<div class="stitle">해피콜 설문지</div>
   	 		<div style="float: right;">
         	<button type="button" id="btnScript" class="button" style="float: right; margin-bottom: 5px;">스크립트 보기</button>
         	<!-- <button type="button" id="btnCmpnExcel" class="button" style="float: right; margin-bottom: 5px; margin-right: 10px;">엑셀저장</button> -->
        </div>
        <table class="profile_tbl">
        	<tr>
        		<th class="line_rt">해피콜</th>
        	</tr>
            <tr>
        		<td class="line_b">
        			<div id="custQa" style = "height :430px; overflow:auto;">
        			</div>
        		</td>
        	</tr>
        </table>
	    </div>
	       <div style="width:47%; display: block;" id="cmpgCustInfo1">
	        	<table class="profile_tbl" >
	        		<tr>
	        			<th class="line_rt">고객명</th>
	        		    <td style="width: 20%;" class="line_b">
	        				<span id="cmpgCustom6"></span>
	        			</td>
	        			<th class="line_c">전화번호</th>
	        			<td class="line_b">
	        				<span id="cmpgTel6"></span>
	        			</td>
	        			<th class="line_c">핸드폰</th>
	        			<td class="line_b">
	        				<span id="cmpgHtel6"></span>
	        			</td>
	        		</tr>
	        	</table>
	        	<div class="btn" id="cmpgCustInfoBtn1" style = "float: left; margin-top: 5px; display: block;">
	        		<button type="button" id="cmpgCustBtnInit" class="button">초기화</button>
	            </div>
	       </div>
	       
	       <div style="width:48.8%; position:absolute ; right:15px; bottom:18px;">
		       <table class="profile_tbl" style =" width:100%;" id="resultCmpg">
		       		<tr>
						<th class="line_rt">수신동의</th>
						<td class="line_b" colspan="3" style="width:44%;">
							<label for="telyn">전화</label><input type="checkbox" name="telyn" id="telyn">
							<label for="smsyn">SMS</label><input type="checkbox" name="smsyn" id="smsyn">						
							<label for="faxyn">거부</label><input type="checkbox" name="faxyn" id="faxyn">
						</td>
						<!-- <th class="line_c">남여구분</th>
						<td class="line_b">
							<label for="male">남</label><input type="radio" name="radioGndr" value="1" id="male">
							<label for="female">여</label><input type="radio" name="radioGndr" value="2" id="female">
						</td> -->
		       		</tr>
	        		<tr>
	        			<th class="line_rt">처리결과</th>
	        			<td class="line_b">
	        				<select id = "result" class="select_al" >
									</select>
	        			</td>
	        		    <th class="line_c">불응답 사유</th>
	        			<td class="line_b">
	        				<select id = "unresponsiveness" class="select_al" >
									</select>
	        			</td>
	        		</tr>
	        	    <tr>
	        			<th class="line_rt" style =" height : 43px;">메모<br>( 답변내용 )</th>
	        			<td class="line_b" colspan ="3">
							<textarea rows="2" cols="100%" style = "width: 100%" id="cmpgMemo" maxlength="240"></textarea>	        				
 	        			</td>
	        		</tr>
	        	</table>
	        
	            <div class="btn" style = "float : right; margin-top: 5px;">
	                <button type="button" id="btnInsert" class="button">저장</button>
	            </div>
	       </div>
	       
		</div><!--"BODY"-->
	</body>
</html>