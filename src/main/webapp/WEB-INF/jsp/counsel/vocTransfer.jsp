<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset=utf-8>
<title>이관민원</title>
<link rel="icon" href="/resources/images/favicon.ico">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/popup.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/tab.css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jstree/themes/default/style.min.css" type="text/css"/>
		
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/common.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery.gbTabs.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/counsel/vocTransfer.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jstree/jstree.js"></script> 

	<style>
		div.scrollable 
		{
		    width: 100%;
		    height: 100%;
		    margin: 0;
		    padding: 0;
		    overflow: auto;
		}
		#gbox_tblInCorp .ui-jqgrid-bdiv { overflow-y: scroll }
		
	</style>
</head>
	
<body>
    <div id="h1">담당자지정 관리</div>

	<div id="pop_body" style="height: 795px;">

	    <ul id="tabs1">
	        <li data-tab="sect1">이관민원</li>
	        <li data-tab="sect2">상담DB</li>
	        <li data-tab="sect3">게시판</li>
	    </ul>
	    
	
	    <div id="ctnt1">
		    <!-- 이관민원 시작  -->
	        <div data-tab="sect1">
		        <ul id="tabs2">
		            <li data-tab="sect11" id='sect11'>담당자지정</li>
		            <li data-tab="sect12" id='sect12'>담당자처리</li>
		            <li data-tab="sect13" id='sect13'>통계현황</li>
		        </ul>
		        
		        <div id='top1'>

	                <!--"조회/검색"-->
	                <div id="search">
	                    <table class="search_tbl">
	                        <tr>
	                        	<th>기간</th>
															<td width="30%" style="text-align: left;">
																<input type="text" style="width: 80px;" class="text_ol_half" id="selFrDate_1" maxlength="16">
																 ~
																<input type="text" style="width: 80px;" class="text_ol_half" id="selToDate_1" maxlength="16">		
								  						</td>

	                            <th>처리상태</th>
	                          	  <td class="sel">
	                           	     <select class="select_al" id="search_act_st1">
	                            	  </select>
	                        	   </td>
	 						    
	                            <td class="sel">
	                                <select class="select_al" id="search_gb1">
																	<option value="all">전체</option>
																	<option value="name">민원인성명</option>
																	<option value="voc">이관민원</option>	                                
	                                </select>
	                            </td>
	                            
	                            <td class="nemo_50" style="" colspan="2">
	                                <input type="text" class="text_ol" id="txtSearch1" name="txtSearch1" maxlength="167">
	                            </td>	                            
	                             <td class="btn">
	                                <button type="button" id="btnSearch_1"  class="button">조회</button>
	                                <button type="button" id="btnReset_1"  class="button">초기화</button>
	                            </td> 
	                        </tr>
	                    </table>
	                </div>
	                <!--"조회/검색"-->
					
	                <!--그리드-->
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
	                <!--"그리드"-->
	            
	            <div id="ctnt2">
 
	                    <!-- 버튼 테이블 -->
	                    <table class="info_tbl_btn">
	                        <tr>
	                            <td>
	                                
	                                <button type="button" id="btnUpdate_1"  class="button">담당자지정</button>
	                                <button type="button" id="btnUpdate_2"  class="button">담당자처리</button>                             
	                                
	                            </td>
	                        </tr>
	                    </table>
	                    <!--"버튼 테이블"-->	            		                

	                    <!-- 담당자지정기본테이블 -->
	                    <form id="frm1" name="frm1" action="/ajax/user/userManagement.do" method="post">
	                <!--타이틀-->
	                <div class="stitle">상담접수 상세내용</div>
	                <!--"타이틀"-->	                    
	                        <table class="transfer_tbl">
														<colgroup>
															<col  width="100px"></col>
															<col  width=""></col>
															<col  width="100px"></col>
															<col  width=""></col>
															<col  width="100px"></col>
															<col  width=""></col>
															<col  width="100px"></col>
															<col  width=""></col>
														</colgroup>	                        
	                            <tr>
	                                <th class="line_rb">접수번호</th>
	                                <td class="line_b">
	                                    <span id="txtNo"></span>
	                                </td>
	                                <th class="line_rlb">접수일시</th>
	                                <td class="line_b">
	                                    <span id="txtTime"></span>
	                                </td>
	                                <th class="line_rlb">고객명</th>
	                                <td class="line_b" >
	                                	<span id="txtName"></span>
	                                </td>
	                               	<th class="line_rlb">발신자번호</th>
	                                <td class="line_b" >
	                                	<span id="txtTel"></span>
	                                </td>
	                            </tr>
	                            <tr>
	                                <th class="line_rb">채널구분</th>
	                                <td class="line_b">
	                                    <span id="txtChannel"></span>
	                                </td>
	                                <th class="line_rlb">통화구분</th>
	                                <td class="line_b">
	                                    <span id="txtName"></span>
	                                </td>
	                                <th class="line_rlb">처리유형</th>
	                                <td class="line_b" >
	                                	<span id="txtName"></span>
	                                </td>
	                               	<th class="line_rlb">민원인</th>
	                                <td class="line_b" >
	                                	<span id="txtName"></span>
	                                </td>
	                            </tr>
	                            <tr>
	                                <th class="line_rb">상담사</th>
	                                <td class="line_b">
	                                    <span id="txtName"></span>
	                                </td>
	                                <th class="line_rlb">수정사</th>
	                                <td class="line_b">
	                                    <span id="txtName"></span>
	                                </td>
	                                <th class="line_rlb">수정일시</th>
	                                <td class="line_b" >
	                                	<span id="txtName"></span>
	                                </td>
	                               	<th class="line_rlb">연락처</th>
	                                <td class="line_b" >
	                                	<span id="txtName"></span>
	                                </td>
	                            </tr>
	                            <tr>
	                                <th class="line_rb">상담유형</th>
	                                <td class="line_b" colspan='5'>
	                                    <span id="txtName"></span>
	                                </td>
	                                
	                               	<th class="line_rlb">처리결과</th>
	                                <td class="line_b" id="rd_act_result"></td>
	                            </tr>
	                            <tr style="height: 40px;">
	                                <th class="line_r">문의내용</th>
	                                <td colspan='3'>
	                                    <span id="txtName"></span>
	                                </td>
	                                
	                               	<th class="line_rl">답변내용</th>
	                                <td colspan='3'>
	                                    <span id="txtName"></span>
	                                </td>
	                            </tr>	                            
	                        </table>
	                        <br/>
	                <!--타이틀-->
	                <div class="stitle">처리부서 담당자 지정</div>
	                <!--"타이틀"-->
	                	                    <!-- 버튼 테이블 -->
	                    <table class="info_tbl_btn">
	                        <tr>
	                            <td>
	                                
	                                <button type="button" id="btnHistory"  class="button">이관민원변경이력</button>                        
	                                
	                            </td>
	                        </tr>
	                    </table>
	                    <!--"버튼 테이블"-->		                        
	                        <table class="transfer_tbl">
														<colgroup>
															<col  width="100px"></col>
															<col  width=""></col>
															<col  width="100px"></col>
															<col  width=""></col>
															<col  width="100px"></col>
															<col  width=""></col>
															<col  width="100px"></col>
															<col  width=""></col>
														</colgroup>	 	                        
	                            <tr style="height: 40px;">
	                                <th class="line_rb">이관민원</th>
	                                <td class="line_b" colspan='3'>
	                                    <span id="txtName"></span>
	                                </td>
	                                <th class="line_rlb">처리내용</th>
	                                <td class="line_b" colspan='3'>
	                                    <textarea class="area_ol" style="height:90%;" id = "tfDtMemo" maxlength="90%"></textarea>
	                                </td>
	                            </tr>
	                            
	                            <tr>	                             
																	<th class="line_rb">민원구분</th>
	                                <td class="line_b" id="rd_voc_gb" style="width: 350px;"></td>
	                                
	                                <th class="line_rlb">요청구분</th>
	                                <td class="line_b" id="rd_request_gb"></td>
	                                
	                                <th class="line_rlb">처리상태</th>
	                                <td class="line_b" colspan='3' id="rd_act_st"></td>
	                                
	                            </tr>
	                            <tr>
	                                <th class="line_r">주관부서</th>
	                                <td class="line_b">
	                                    <span id="depart"></span>
	                                </td>	                            
	                                <th class="line_rl">담당자</th>
	                                <td >
	                                    <input type="hidden" class="text_ol_60" id="managerID" name="managerID" maxlength="10">
	                                    <input type="text" class="text_ol_60" id="managerNM" name="managerNM" maxlength="10">
	                                    <img src="/resources/images/icon_2.png" alt="" class="tbl_icon" id="btnManager"/> <!-- 아이콘 -->
	                                </td>
	                                <th class="line_rl">보조부서</th>
	                                <td >
	                                    <span id="secDepart"></span>
	                                </td>	                            
	                                <th class="line_rl">담당자</th>
	                                <td >
	                                	<input type="hidden" class="text_ol_60" id="secManagerID" name="managerID" maxlength="10">
	                                    <input type="text" class="text_ol_60" id="secManagerNM" name="secManager2" maxlength="10">
	                                    <img src="/resources/images/icon_2.png"  class="tbl_icon" id="btnManagerSec"/>
	                                </td>	                                
	                            </tr>                       
	                            
	                        </table>	                        
	                    </form>
	                    <!--"담당자지정테이블"-->

	            </div>
	            </div> <!-- top1 close -->
	            
	            <div id=top2>
	                <!--"조회/검색"-->
	                <div id="search">
	                    <table class="search_tbl">
	                        <tr>
	                        	<th>기간</th>
									<td width="30%" style="text-align: left;">
										<input type="text" style="width: 80px;" class="text_ol_half" id="selFrDate_2" maxlength="16">
										 ~
										<input type="text" style="width: 80px;" class="text_ol_half" id="selToDate_2" maxlength="16">		
		  							</td>

	                            <th>처리상태</th>
	                          	  <td class="sel">
	                           	     <select class="select_al" id="search_act_st2">
	                            	  </select>
	                        	   </td>
	 						    
	                            <td class="sel_60">
	                                <select class="select_al" id="search_gb2">
	                                </select>
	                            </td>
	                            
	                            <td class="nemo_50" style="" colspan="2">
	                                <input type="text" class="text_ol" id="txtSearch2" name="txtSearch2" maxlength="167">
	                            </td>	                            
	                             <td class="btn">
	                                <button type="button" id="btnSearch_2"  class="button">조회2</button>
	                                <button type="button" id="btnReset_2"  class="button">초기화2</button>
	                            </td> 
	                        </tr>
	                    </table>
	                </div>
	                <!--"조회/검색"-->	   
	                <!--그리드-->
	                <div class="grid_all">
	                    <!-- 미사용/버튼 테이블 -->
	                    <table class="info_tbl">
	                    </table>						
	                </div>
	                <!--"그리드"-->
	            </div>
	        </div>
		    <!-- 이관민원  종료  -->
	
		    <!-- 상담DB 시작  -->
	        <div data-tab="sect2" style="height: 755px;">
		        <ul id="tabs3">
		            <li data-tab="sect21" id='sect21'>요청DB목록</li>
		            <li data-tab="sect22" id='sect22'>부서DB목록</li>
		            <li data-tab="sect23" id='sect23'>통계현황</li>
		        </ul>
		        <div id="ctnt3">
		        
		        	<!-- 요청DB목록 -->
			        <div data-tab="sect21">
		
			            <!-- 조회/검색 -->
			            <div id="search" style="height: 60px;">
			                <table class="search_tbl">
	                       <tr>
			                   		<th style="width:50px">요청일자</th>
														<td style="text-align:left;width:220px;">
															<input type="text" class="text_ol_half" id="schReqFrDt_T1" maxlength="16">
															~
															<input type="text" class="text_ol_half" id="schReqToDt_T1" maxlength="16">		
							  						</td>
				
		                        <th>요청자</th>
			                     	<td style="width:75px;">
			                      	<select class="select_al" id="schReqUsr_T1" style="width:70px;"></select>
			                   	  </td>
		                       	   
		                        <th>처리상태</th>
			                    	<td style="text-align:left;width:110px;">
				                    	<select class="select_al" id="schActSt_T1" style="width:100px;"></select>
			                  	  </td>
			                      <td class="btn">
				                    	<button type="button" id="btnSearch_21"  class="button">조회</button>
				                      <button type="button" id="btnReset_21"  class="button">초기화</button>
			                      </td> 
	                       </tr>
	                       
												<tr>
													<th style="width:50px">상담유형</th>
													<td colspan = "6">
														<select class="select_bl" id="schInstCd" style="width:100px;"></select>
														<select class="select_bl" id="schIntvLgCd" style="width:182px;"></select>
														<select class="select_bl" id="schIntvMdCd" style="width:247px;"></select>
														<select class="select_bl" id="schIntvSmCd" style="width:250px;"></select>
													</td>

												</tr>	                       

	                    </table>
			            </div>
			            <!--"조회/검색"-->
			
	                <!--그리드-->
	                <div class="grid_all">
	                    <!-- 미사용/버튼 테이블 -->
	                    <table class="info_tbl">
	                    </table>
											<!--"미사용/버튼 테이블"-->
	                    <!-- 그리드테이블 -->
	                    <div class="grid_tbl">
	                        <table id="tbl021"></table>
	                        <div id="pg021"></div>
	                    </div>
	                    <!--"그리드테이블"-->
	                </div>
	                <!--"그리드"-->	                
	                <!-- 요청DB목록-->
	                
	                <form id="frm2" name="frm2" action="/ajax/user/userManagement.do" method="post">	                
	                <!--타이틀-->
	                <div class="stitle">요청DB담당자 지정</div>
	                <!--"타이틀"-->
	                		<!-- 버튼 테이블 -->
	                    <table class="info_tbl_btn">
	                        <tr>
	                            <td>	                                
	                                <button type="button" id="btnSave_21"  class="button">저장</button> 
	                                <!-- <button type="button" id="btnDBInsert"  class="button">DB등록</button> -->                        
	                            </td>
	                        </tr>
	                    </table>
	                    <!--"버튼 테이블"-->		                        
	                    <table class="transfer_tbl">
												<colgroup>
													<col  width="110px"></col>
													<col  width=""></col>
													<col  width="110px"></col>
													<col  width=""></col>								
												</colgroup>
 	                       
	                      <tr>	   	                                                  
													<th class="line_rb">요청구분</th>
	                        		<td class="line_b">
	                        		  <input type="hidden" class="text_ol_60" id="cDbId_Tab1" name="cDbId_Tab1" maxlength="10"> 
                              	<span id="reqGbCd_Tab1"></span>
                              </td>	                            
                              <th class="line_rlb">요청자</th>
                              <td class="line_b">
																<span id="reqUsrNm_Tab1"></span>
                              </td>
                         </tr> 	                        
                        <tr style="height: 40px;">
                          <th class="line_rb">상담유형</th>
                          <td class="line_b" colspan='3'>
                              <span id="counselCd_Tab1"></span>
                          </td>	                                
                        </tr>
                        <tr style="height: 40px;">	                             
													<th class="line_rb">요청내용</th>
	                          <td class="line_b" colspan='3'>
	                              <span id="reqCont_Tab1"></span>
	                          </td>
                        </tr>
	                      <tr>	                             
													<th class="line_rb">담당부서</th>
                        		<td class="line_b">
                                 <span id="deptNm_Tab1"></span>
                             </td>	                            
                             <th class="line_rlb">담당자</th>
                             <td class="line_b">
                              <select class="select_bl" id = "orgUsrId_Tab1"></select>
                             <!-- 
                                 <input type="hidden" class="text_ol_60" id="orgUsrId_Tab1" name="orgUsrId_Tab1" maxlength="10">
                                 <input type="text" class="text_ol_60" id="orgUsrNm_Tab1" name="orgUsrNm_Tab1" maxlength="10" disabled>
                                 <img src="/resources/images/icon_2.png" alt="" class="tbl_icon" id="btnOrgUsr_Tab1"/>
                              -->    
                             </td>
                         </tr>
                         <tr>
                             <th class="line_rb">처리상태</th>
                             <!-- <td class="line_b" id="actStCd_Tab1"></td> -->
                             <td class="line_b">
									             <select class="select_bl" id = "actStCd_Tab1"></select>
									           </td>
                             <th class="line_rlb">상담DB</th>
                             <td class="line_b">
                                 <input type="hidden" class="text_ol_60" id="cTbbsId_Tab1" name="cTbbsId_Tab1" maxlength="10">
                                 <input type="text" class="text_ol_80" id="cDbNm_Tab1" name="cDbNm_Tab1" maxlength="10" disabled>
                                 <img src="/resources/images/btn_add3.png" alt="" class="tbl_icon" id="counselDB"/>
                             </td>                             
                         </tr>
                         <tr>	                             
														<th class="line_r">반송사유</th>
	                          <td class="line_b" colspan="3">
	                              <input type="text" class="text_ol_80" style="width: 990px;" id="rtnRsn_Tab1" name="rtnRsn_Tab1">
	                          </td>
                          </tr>
                      </table>	                        
                  </form>	                    	            		       
			        </div>
			        <!-- 요청DB목록 -->
			        
			        <!-- 부서DB목록 -->
			        <div data-tab="sect22">
			            <!-- 조회/검색 -->
			            <div id="search">
			            	<table class="search_tbl">
		                    <tr>
		                    	  <th>업무명</th>			                        	   
		                    	  <td class="nemo_20" style="">
		                        		<input type="text" class="text_ol" id="txtJobNm_T2" name="txtJobNm_T2" maxlength="45">
		                        </td>		 
		                        <th>담당부서</th>
	                      		<td class="sel" style="">
	                      		 <input type="text" class="text_ol" id="schDept_T2" name="schDept_T2" maxlength="30">
	                       	  	<!-- <select class="select_al" id="schDept_T2"></select> -->
	                    	   	</td>                   	   
		                        <th>담당자</th>
		                      	<td class="sel" style="">
		                      	 <input type="text" class="text_ol" id="schOrgUsr_T2" name="schOrgUsr_T2" maxlength="20">
		                       		<!-- <select class="select_al" id="schOrgUsr_T2"></select> -->
		                    	  </td>
		                        <th>요청구분</th>
		                      	<td class="sel">
		                       		<select class="select_al" id="schRreqGb_T2"></select>
		                    	  </td>		              
		                    	  <td class="line_b">
															<input type="checkbox" id="chkUse_T2" >미사용포함
															<input type="checkbox" id="chkComplete_T2" >미완료포함
														</td>
		                        <td class="btn">
		                            <button type="button" id="btnSearch_22"  class="button">조회</button>
		                            <button type="button" id="btnReset_22"  class="button">초기화</button>
		                        </td> 
		                    </tr>
			              </table>
			            </div>
			            <!--"조회/검색"-->			            							
										
									<!--그리드-->
									<div id="grid_all">
							
										<!--왼쪽그리드-->
										<div style="width:28%;">
						
											<div class="grid_tbl">
												<table style="width:100%; height:650px;">
													<tr>
									        	<td valign=top  style="width: 20%; text-align: left; height : 605px; border: 1px solid #acacac;">
															<div id="categoryList" class="scrollable" style="height: 605px;"></div>					 
									        	</td>			        										        	
													</tr>
												</table>
											</div>
										</div>

										<!--"왼쪽그리드"-->
						
										<!--오른쪽그리드-->
										<div style="left:30%; width:67%; position:absolute; left; top:175px; ">
										
											<!-- 그리드테이블 -->
											<div class="grid_tbl">		 
												<table style="width:100%; height:318px;">
													<tr>
														<td>
															<table id="tbl022"></table>
															<div id="pg022"></div>
														</td>
													</tr>
												</table>
											</div>
											<!--"그리드테이블"-->
						
											<!-- 버튼 테이블 -->
											<table class="info_tbl_btn">
												<tr>
													<th></th>
													<td>
														<button type="button" id="btnAddCounselDB" class="button">신규등록</button>
													</td>
												</tr>
											</table>
											<!--"버튼 테이블"-->
						
										</div>
										<!--"오른쪽그리드"-->
									</div>
									<!--"그리드"-->									
															
									
			        </div>
			        <!-- 부서DB목록 -->
			        
			        <!-- 통계현황 -->
			        <div data-tab="sect23">
	              <!--"조회/검색"-->
	              <div id="search">
	                  <table class="search_tbl">
	                      <tr>
	                      	<th>기간</th>
													<td width="30%" style="text-align: left;">
														<input type="text" style="width: 80px;" class="text_ol_half" id="selFrDate_23" maxlength="16">
														 ~
														<input type="text" style="width: 80px;" class="text_ol_half" id="selToDate_23" maxlength="16">		
						 							</td>
	
                          <th>처리상태</th>
                       	  <td class="sel">
                        		<select class="select_al" id="search_act_st2">
                         	  </select>
                     	   	</td>
                          <td class="sel_60">
                            <select class="select_al" id="search_gb2">
                            </select>
                          </td>                       
                          <td class="nemo_50" style="" colspan="2">
                              <input type="text" class="text_ol" id="txtSearch2" name="txtSearch23" maxlength="167">
                          </td>	                            
                         	<td class="btn">
                          	<button type="button" id="btnSearch_23"  class="button">조회23</button>
                            <button type="button" id="btnReset_23"  class="button">초기화23</button>
                          </td> 
	                      </tr>
	                  </table>
	              </div>
	              <!--"조회/검색"-->	  
		                 
								<!-- 그리드테이블 -->
								<div class="grid_tbl">
									<table style="width:100%; height:320px;">
										<tr>
								        	
										</tr>
									</table>
								</div><!-- 그리드테이블 -->

			        </div>	
			        <!-- 통계현황 -->
		        </div>
	
					</div>
		    	<!-- 상담DB 종료  -->
		    
		    
		    <!-- 게시판 시작  -->
	        <div data-tab="sect3"  style="height: 730px;">
	            <!--타이틀-->
	            <div class="stitle">게시판</div>
	            <!--"타이틀"--> 
	                       
	            <!-- 조회/검색 -->
	                <div id="search">
	                    <table class="search_tbl">
	                        <tr>
	                        	
	                        </tr>
	                    </table>
	                </div>
	            <!--"조회/검색"-->
	            	            
	            <!-- 버튼 박스 시작 -->
	            <div class="btn">
	            	
	            </div>
	            <!-- 버튼 박스 종료 -->
	
	            <!-- 그리드테이블 -->
	            <div class="grid_all">
	            	
	            </div>
	            <!--"그리드테이블"-->	        
			</div> <!--  sect3  -->
			
			

		</div>  <!-- ctnt1 -->
    
	</div> <!-- pop_body -->

</body>
</html>