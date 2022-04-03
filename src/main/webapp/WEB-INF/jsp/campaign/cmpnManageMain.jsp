<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
 				<div>
	                <!--"조회/검색"-->
	                <div id="search2">
						<table class="search2_tbl">
	                        <tr>
	                        	<th>설문기간</th>
								<td class="sel_left" colspan="5" style="width: 80%">
									<input type="text" style="width: 80px;" class="area_bl" id="selFrDate_1" maxlength="16" style="width: 20%; margin-left: 15px">
									 ~
									<input type="text" style="width: 80px;" class="area_bl" id="selToDate_1" maxlength="16" style="width: 20%; margin-left: 15px">		
	  							</td>
	  							<td class="btn" rowspan="2" style="width: 20%">
									<button type="button" id="btnSearch_1"  class="button">조회</button>
									<button type="button" id="btnReset_1"  class="button">초기화</button>
								</td>
	  						</tr>
	  						<tr>
	                            <th>설문명</th>
	                            <td class="nemo_al	">
	                                <input type="text" class="text_ol" id="cmpgNm_1" name="cmpgNm_1">
	                            </td>
								<th>진행상태</th>
								<td class="sel_60">
									<select class="select_bl" id="progressStatus_1"></select>
								</td>
								<th>설문유형</th>
								<td class="sel_60">
									<select class="select_bl" id="cmpgtype_1"></select>
								</td>
							</tr>
						</table>
					</div>
	                
	                <!--그리드-->
	                <div id="item_type">
							<!--미사용포함 오른쪽 버튼이 있을경우-->
							<div style="text-align: right;">
								<button type="button" id="btnExcel"  class="button">엑셀다운</button>
							</div>
						</div>
						<div style="margin-top: 5px; width: 100%" id="gridMain">
							<table id="tbl010"></table>
							<div id="pg010"></div>
						</div>
	                <!-- <div class="grid_all">
	                    미사용/버튼 테이블
	                    <table class="info_tbl">
	                    </table>
						"미사용/버튼 테이블"
	                    그리드테이블
	                    <div class="grid_tbl">
	                        <table id="tbl010"></table>
	                        <div id="pg010"></div>
	                    </div>
	                    "그리드테이블"
	                </div>
	                "그리드" -->
	            <br />
	            <ul id="tabs2">
	                <li data-tab="sect11">설문 내용</li>
	                <li data-tab="sect12">설문 문항</li>
	            </ul>
	            <div id="ctnt2">			
	                <!-- 설문 내용 시작 -->
	                <div data-tab="sect11">
	                    <!-- 버튼 테이블 -->
	                    <table class="info_tbl_btn">
	                        <tr>
	                            <td>
	                                <button type="button" id="btnInsert_2"  class="button">추가</button>
	                                <button type="button" id="btnUpdate_2"  class="button">저장</button>
	                                <button type="button" id="btnReset_2"  class="button">초기화</button>
	                                <button type="button" id="btnDelete_2"  class="button">삭제</button>
	                            </td>
	                        </tr>
	                    </table>
	                    <!--"버튼 테이블"-->
	                    <!-- 설문기본테이블 -->
	                    <form id="frm1" name="frm1" action="/ajax/user/userManagement.do" method="post">
	                        <table class="profile_tbl">
	                            <tr>
	                                <th class="line_rt">설문아이디</th>
	                                <td class="line_b">
	                                    <input type="text" class="text_ol_70" id="cmpgId_2" name="cmpgId_2" maxlength="50" readonly="readonly">
	                                </td>
	                                <th class="line_c">설문유형</th>
	                                <td class="line_b">
	                                    <select class="select_al" id="cmpgtype_2">
	                                	</select>
	                                </td>
	                                
	                            </tr>
	                            <tr>
	                            	<th class="line_rt">진행상태</th>
	                                <td class="line_b" id="radioBox"></td>
	                            	<th class="line_rt">설문기간</th>
	                                <td class="line_b">
	                                    <input type="text" style="width: 80px;" class="area_bl" id="selFrDate_2" maxlength="16">
										 ~
										<input type="text" style="width: 80px;" class="area_bl" id="selToDate_2" maxlength="16">
	                                </td>
	                            </tr>
	                            <tr>
	                                <th class="line_c">설문문항수</th>
	                                <td class="line_b">
	                                    <input type="text" class="text_ol" id="surveyCnt_2" name="surveyCnt_2" maxlength="200">
	                                </td>
	                                <th class="line_c">설문대상자수</th>
	                                <td class="line_b" id="surveyNmCnt_2"></td>
	                            </tr>
	                            <tr>
	                                <th class="line_rt">설문 명</th>
	                                <td class="line_b" colspan="3">
	                                    <input type="text" class="text_ol" id="survetName_2" name="survetName_2" maxlength="50">
	                                </td>
	                            </tr>
	                            <tr>
	                                <th class="line_rb">설문안내<br />(스트립트)</th>
	                                <td class="line_wb" colspan="3">
	                                    <textarea class="area_ol" id="surveyArea_2" name="surveyArea_2" rows="8" cols="100%"></textarea>
	                                </td>
	                            </tr>
	                        </table>
	                    </form>
	                    <!--"개인정보테이블"-->
	                </div>
		            <!-- 설문 내용 종료  -->
		            <!-- 설문 문항 시작  -->
	                <div data-tab="sect12" style="height:21em;">
	                    <!-- 버튼 테이블 -->
	                    <table class="info_tbl_btn">
	                        <tr>
	                            <td>
	                          		<button type="button" id="btnReset_3"  class="button">초기화</button>
	                                <button type="button" id="btnInsert_3"  class="button">등록</button>
	                                <button type="button" id="btnUpdate_3"  class="button">수정</button>
	                                <button type="button" id="btnDelete_3"  class="button">삭제</button>
	                            </td>
	                        </tr>
	                    </table>
	                    <!--"버튼 테이블"-->
	                    <!-- 그리드테이블 --> 
		                <div class="grid_all" style="width:50%; float:left;" id="grid_50">
		                    <!-- 미사용/버튼 테이블 -->
		                    <table class="info_tbl">
		                    </table>
							<!--"미사용/버튼 테이블"-->
		                    <!-- 그리드테이블 -->
		                    <div class="grid_tbl">
		                        <table id="tbl011" ></table>
		                        <div id="pg011"></div>
		                    </div>
		                    <!--"그리드테이블"-->
		                </div>
		                <!--"그리드"-->
	                    
	                    <div class="grid_tbl"  style="width:50%; display:inline-block; border:0px; margin-top: 7px;">
	                    	<table style="width:100%; border:1px solid #98a5b3; padding:2px">
	                    		<tr>
	                    			<th>설문</th>
	                    			<td  class ="line_t" colspan ="5"><input type="text" id="survey_3" style="width:90%" /></td>
	                    		</tr>
	                    		<tr>
	                    			<th>질문유형</th>
	                    			<td class ="line_t" >    
	                    				<select class="select_al" id="surveyType_3">
	                                	</select>
	                                </td>
	                    			<th>답안수</th>
	                    			<td class ="line_t" ><input type="text" id="surveyCnt_3" style="width:50%" /></td>
	                    			<th>문항번호</th>
	                    			<td class ="line_t" ><input type="text" id="surveyNum_3" style="width:40%" /></td>
	                    		</tr>
	                    	</table><br />
	                    	<table style="width:100%; border:1px solid #98a5b3; padding:2px">
	                    		<thead>
	                    		<tr>
	                    			<th style="width:20%;">번호</th>
	                    			<th>답안 내용(최대 5개)</th>
	                    		</tr>
	                    		</thead>
	                    		<tbody>
	                    		<tr>
	                    			<th style="width:20%;">1</th>
	                    			<td class ="line_b" style="width:80%;"><input type="text" id="survey_nm_1" style="width:92%;" /></td>
	                    		</tr>
	                    		<tr>
	                    			<th>2</th>
	                    			<td class ="line_c" ><input type="text" id="survey_nm_2" style="width:92%;" /></td>
	                    		</tr>
	                    		<tr>
	                    			<th>3</th>
	                    			<td class ="line_b" ><input type="text" id="survey_nm_3" style="width:92%;" /></td>
	                    		</tr>
	                    		<tr>
	                    			<th>4</th>
	                    			<td class ="line_c" ><input type="text" id="survey_nm_4" style="width:92%;" /></td>
	                    		</tr>
	                    	    <tr>
	                    			<th>5</th>
	                    			<td class ="line_b" ><input type="text" id="survey_nm_5" style="width:92%;" /></td>
	                    		</tr>
	                    		</tbody>
	                    	</table>
	                  	</div>
		            </div>
		            <!-- 설문 문항 종료  -->
	            </div>
	        </div>
		    <!-- 설문 기본 종료  -->