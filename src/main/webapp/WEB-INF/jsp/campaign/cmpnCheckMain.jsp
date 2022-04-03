<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%-- <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/campaign/cmpnCheck.js"></script> --%>
	
	<div><!--BODY-->
		<div id="h1">캠페인조회</div>
		
		<div id="pop_body" style="min-height: 830px;">
			<input type="hidden" id="campaignId">
			<!--타이틀-->
			<div class="stitle">
			캠페인조회
			</div><!--"타이틀"-->
			<!-- 조회/검색 -->
			<div id="search">
				<table class="search_tbl">
					<tr>
						<th>캠페인기간</th>
						<td style="text-align: left; width: 20%;">
							<input type="text" style="width: 80px;" class="area_bl" id="selFrDate" maxlength="16">
							 ~
							<input type="text" style="width: 80px;" class="area_bl" id="selToDate" maxlength="16">		
	  					</td>
	  					<th style="width: 30px;">소속</th>
						<td class="sel" style="width: 35%;">
							<select id="selSrchCntrCd" class="select_al" style="width: 24%;"></select>
							<select id="selSrchTeamCd" class="select_al" style="width: 24%;"></select>
							<select id="selSrchDeptCd" class="select_al" style="width: 24%;"></select>
							<select id="counsType1" class="select_al" style="width: 20%;"></select>
						</td>
						<th>진행상태</th>
						<td class="sel">
							<select id="optSrchType" class="select_al" ></select>
						</td>
						<th>캠페인유형</th>
						<td class="sel_60" style="width: 10%;">
							<select id="commType" class="select_al" ></select>
						</td>
						<td class="btn">
							<button type="button" id="btnSearch" class="button">조회</button>
							<button type="button" id="btnInit" class="button">초기화</button>
						</td>
					</tr> 
				</table>
			</div><!--"조회/검색"-->
			
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
		        	<tr><td style="float: left;">
							<input type="checkbox" name="check1" class="checkbox" id="chkNotUse1" checked value="Y"><label for="chkNotUse1">미처리 &nbsp;</label>
							<input type="checkbox" name="check2" class="checkbox" id="chkNotUse2" value="Y"><label for="chkNotUse2">완료 &nbsp;</label>
					</td></tr>
		        </table>
		        <span style="clear: both"></span>
				<!--"미사용/버튼 테이블"-->
		        <!-- 그리드테이블 -->
		        <div class="grid_tbl">
		        	<table id="cmpgtbl012"></table>
		            <div id="cmpgpg012"></div>
		        </div>
		        <!--"그리드테이블"-->
		   </div>
		   <div style="width:50%; float:right;">
   	            <div style="float: right;">
	            	<button type="button" id="btnScript" class="button" style="float: right; margin-bottom: 5px;">스크립트 보기</button>
	            	<button type="button" id="btnCmpnExcel" class="button" style="float: right; margin-bottom: 5px; margin-right: 10px;">엑셀저장</button>
            	</div>
	            <table class="profile_tbl">
	            	<tr>
	            		<th class="line_rt">캠페인</th>
	            	</tr>
	                <tr>
	            		<td class="line_b">
	            			<div id="custQa" style = "height :430px; overflow:auto;">
	            			</div>
	            		</td>
	            	</tr>
	            </table>
	       </div>
	       <div style="width:46.5%; display: block;" id="cmpgCustInfo1">
	        	<table class="profile_tbl" >
	        		<tr>
	        			<th class="line_rt">지역</th>
	        		    <td class="line_b">
	        				<!-- <div id="answer" style ="height :50px; overflow:auto;">
	        				</div> -->
	        				<input type="text" class="text_ol" id="cmpgLocal6" name="cmpgLocal6" maxlength="10"/>
	        			</td>
	        			<th class="line_rt">고객명</th>
	        		    <td class="line_b">
	        				<input type="text" class="text_ol" id="cmpgCustom6" name="cmpgCustom6" maxlength="10"/>
	        			</td>
	        		</tr>
	        	    <tr>
	        			<th class="line_rt">전화번호</th>
	        			<td class="line_b">
	        				<input type="text" class="text_ol" id="cmpgTel6" name="cmpgTel6" maxlength="20"/>
	        			</td>
	        			<th class="line_rt">핸드폰번호</th>
	        			<td class="line_b">
	        				<input type="text" class="text_ol" id="cmpgHtel6" name="cmpgHtel6" maxlength="20">
	        			</td>
	        		</tr>
	        		<tr>
	        			<th class="line_rt">상호</th>
	        			<td class="line_b" colspan="3">
	        				<input type="text" class="text_ol" id="cmpgCompany6" name="cmpgCompany6" maxlength="20">
	        			</td>
	        		</tr>
	        		<tr>
	        			<th class="line_rt">주소</th>
	        			<td class="line_b" colspan="3">
	        				<input type="text" class="text_ol" id="cmpgAddr6" name="cmpgAddr6" maxlength="100">
	        			</td>
	        		</tr>
	        		<tr>
	        			<th class="line_rt">기타1</th>
	        			<td class="line_b" colspan="3">
	        				<input type="text" class="text_ol" id="cmpgEtc1" name="cmpgAddr6" maxlength="100">
	        			</td>
	        		</tr>
	        		<tr>
	        			<th class="line_rt">기타2</th>
	        			<td class="line_b" colspan="3">
	        				<input type="text" class="text_ol" id="cmpgEtc2" name="cmpgAddr6" maxlength="100">
	        			</td>
	        		</tr>
	        		<tr>
	        			<th class="line_rt">기타3</th>
	        			<td class="line_b" colspan="3">
	        				<input type="text" class="text_ol" id="cmpgEtc3" name="cmpgAddr6" maxlength="100">
	        			</td>
	        		</tr>
	        		<tr>
	        			<th class="line_rt">기타4</th>
	        			<td class="line_b" colspan="3">
	        				<input type="text" class="text_ol" id="cmpgEtc4" name="cmpgAddr6" maxlength="100">
	        			</td>
	        		</tr>
	        		<tr>
	        			<th class="line_rt">기타5</th>
	        			<td class="line_b" colspan="3">
	        				<input type="text" class="text_ol" id="cmpgEtc5" name="cmpgAddr6" maxlength="100">
	        			</td>
	        		</tr>
	        	</table>
	        	<div class="btn" id="cmpgCustInfoBtn1" style = "float : right; margin-top: 5px; display: block;">
	        		<button type="button" id="cmpgCustBtnInit" class="button">초기화</button>
	                <button type="button" id="cmpgCustBtnInsert" class="button">추가</button>
	                <button type="button" id="cmpgCustBtnSearch" class="button">검색</button>
	            </div>
	       </div>
	       <div style="width:46.5%; display: none;" id="cmpgCustInfo2">
	        	<table class="profile_tbl" >
	        		<tr>
	        			<th class="line_rt">지역</th>
	        		    <td class="line_b">
	        				<!-- <div id="answer" style ="height :50px; overflow:auto;">
	        				</div> -->
	        				<label id="cmpgLocal6La"></label>
	        			</td>
	        			<th class="line_rt">고객명</th>
	        		    <td class="line_b">
	        				<label id="cmpgCustom6La"></label>
	        			</td>
	        		</tr>
	        	    <tr>
	        			<th class="line_rt">전화번호</th>
	        			<td class="line_b"  id="cmpgTel6La">
	        				<!-- <label id="cmpgTel6La"></label> -->
	        			</td>
	        			<th class="line_rt">핸드폰번호</th>
	        			<td class="line_b">
	        				<label id="cmpgHtel6La"></label>
	        			</td>
	        		</tr>
	        		<tr>
	        			<th class="line_rt">상호</th>
	        			<td class="line_b" colspan="3">
	        				<label id="cmpgCompany6La"></label>
	        			</td>
	        		</tr>
	        		<tr>
	        			<th class="line_rt">주소</th>
	        			<td class="line_b" colspan="3">
	        				<label id="cmpgAddr6La"></label>
	        			</td>
	        		</tr>
	        		<tr>
	        			<th class="line_rt">기타1</th>
	        			<td class="line_b" colspan="3">
	        				<label id="cmpgEtc1La"></label>
	        			</td>
	        		</tr>
	        		<tr>
	        			<th class="line_rt">기타2</th>
	        			<td class="line_b" colspan="3">
	        				<label id="cmpgEtc2La"></label>
	        			</td>
	        		</tr>
	        		<tr>
	        			<th class="line_rt">기타3</th>
	        			<td class="line_b" colspan="3">
	        				<label id="cmpgEtc3La"></label>
	        			</td>
	        		</tr>
	        		<tr>
	        			<th class="line_rt">기타4</th>
	        			<td class="line_b" colspan="3">
	        				<label id="cmpgEtc4La"></label>
	        			</td>
	        		</tr>
	        		<tr>
	        			<th class="line_rt">기타5</th>
	        			<td class="line_b" colspan="3">
	        				<label id="cmpgEtc5La"></label>
	        			</td>
	        		</tr>
	        	</table>
	        	<div class="btn" id="cmpgCustInfoBtn2" style = "float : right; margin-top: 5px; display: none;">
	                <button type="button" id="cmpgCustBtnInsert" class="button">추가</button>
	                <!-- <button type="button" id="cmpgCustBtnSearch" class="button">검색</button> -->
	            </div>
	            <div class="btn" id="cmpgCustInfoBtn3" style = "float : right; margin-top: 5px; display: none;">
	        		<button type="button" id="cmpgCustBtnInit2" class="button">초기화</button>
	            </div>
	       </div>
	       <div style="width:48.8%; position:absolute ; right:15px; bottom:18px;">
	       	
		       <table class="profile_tbl" style =" width:100%;" id="resultCmpg">
	        		<tr>
	        			<th class="line_rt">처리결과</th>
	        			<td class="line_b">
	        				<select id = "result" class="select_al" >
							</select>
	        			</td>
	        		    <th class="line_rt">불응답 사유</th>
	        			<td class="line_b">
	        				<select id = "unresponsiveness" class="select_al" >
							</select>
	        			</td>
	        		</tr>
	        	    <tr>
	        			<th class="line_rt" style =" height : 43px;">메모</th>
	        			<td class="line_b" colspan ="3">
							<textarea rows="2" cols="100%" style = "width: 100%" id="cmpgMemo" maxlength="240"></textarea>	        				
 	        			</td>
	        		</tr>
	        	</table>
	        
	            <div class="btn" style = "float : right; margin-top: 5px;">
	                <button type="button" id="btnInsert" class="button">저장</button>
	            </div>
	       </div>
	       
		</div>
	</div><!--"BODY"-->
</html>