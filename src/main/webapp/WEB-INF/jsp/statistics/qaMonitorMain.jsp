<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="UTF-8">
        <title>평가관리</title>
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
        <script type="text/javascript" src="<c:url value='/resources/js/common/listenRec.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/resources/js/statistics/qaMonitorMain.js'/>"></script>
    </head>
    <body>
        <!--BODY-->
        <div id="h1">평가관리</div>
        <div id="pop_body" style="height: 920px;">

          <div style="width: 100%;">

            <!-- 화면 왼쪽 영역 -->                                     
            <div class="stitle">평가대상자 조회</div>
            <!-- 조회/검색 -->
            <div id="search">
               <table class="search_tbl">
                  <tr>
                     <th>일자</th>
                     <td>
	                     <input type="text" style="width: 80px;" class="area_bl" id="qamoni_selFrDate" maxlength="10"> ~
	                     <input type="text" style="width: 80px;" class="area_bl" id="qamoni_selToDate" maxlength="10">
                     </td>       
			               <th>상담사</th>    
                     <td>
		                   <select class="select_al" style="width: 100px;" id="qamoni_srchTeamCd"></select>			                 
		                   <select class="select_al" style="width: 120px;" id="qamoni_selSrchAgtId"></select>
                     </td>
                     <td class="btn">
	                     <button type="button" id="qamoni_btnSearch" class="button">조회</button>
	                     <button type="button" id="qamoni_btnInit" class="button">초기화</button>
                     </td>
                  </tr> 
               </table>
            </div>
            <!--"조회/검색"--> 

		        <div class="grid_all">
		          <!-- 미사용/버튼 테이블 -->
		          <table class="info_tbl"></table>
                <!--"미사용/버튼 테이블"-->
                
               <div class="stitle" style="display: ruby-base;">모니터링평가 목록</div>
               <div id="grid_all">
                   <table id="qamoni_tblMntList"></table>
                   <div id="qamoni_pgTblMntList"></div>
               </div>
              </div>      
          
              <!-- 미사용/버튼 테이블 -->
              <div id="grid_all">
                 <!-- 버튼 테이블 -->
                 <table class="info_tbl_btn">
                    <tr>
                       <td>
                          <button type="button" id="qamoni_btnInsert"  class="button">저장</button>
                          <button type="button" id="qamoni_btnUpdate"  class="button">수정</button>
                          <button type="button" id="qamoni_btnDelete"  class="button">삭제</button>
                          <button type="button" id="qamoni_btnMagam"  class="button">평가마감</button>
                          <button type="button" id="qamoni_btnReset"  class="button">초기화</button>
                       </td>
                    </tr>
                 </table>
                 <!--"버튼 테이블"-->
              </div>
              <!-- 개인정보테이블 -->
              <table class="profile_tbl">
                 <tr>
                    <td class="line_rt" style="width: 8%;">평가기간</td>
                    <td class="line_b">
                       <input type="text" style="width: 80px;" class="area_bl" id="qamoni_selFrDate1" maxlength="10" readonly>
                       ~
                       <input type="text" style="width: 80px;" class="area_bl" id="qamoni_selToDate1" maxlength="10" readonly>      
                    </td>
                    <td class="line_c" style="width: 8%;">제목</td>
                    <td class="line_b">
                       <input type="text" class="text_ol" id="qamoni_selVltn_Ttl" maxlength="100">
                    </td>
                    <td class="line_c" style="width: 8%;">마감일자</td>
                    <td class="line_b">
                       <input type="text" style="width: 80px;" class="area_bl" id="qamoni_selMgmDt" maxlength="10" readonly>
                    </td>
                    <td class="line_c" style="width: 8%;">평가지</td>
                    <td class="line_b">
                      <select class="select_al" id="qamoni_selSuvy_Id"></select>
                    </td>
                 </tr>
              </table>
              <!--"개인정보테이블"-->
              
             <div id="grid_all">
               <!-- 버튼 테이블 -->
               <table class="info_tbl_btn" style="margin-top: 20px;">
                  <tr>
                      <td></td>
                  </tr>
               </table>
               <!--"버튼 테이블"-->
             </div>
             
             
             <!-- 화면 왼쪽 영역 -->                             
             <div style="width:60%; float: left;">
                        
	             <div class="stitle" style="display: ruby-base;">모니터링평가 대상</div>
	             <div id="qamoni_grid_all" style="margin-top: -32px;">	             
                 <!-- 버튼 테이블 -->
                 <table class="info_tbl">
                   <tr>
                     <td>
                       <button type="button" id="qamoni_btnChart"  class="button">평가실적 현황</button>
                       <button type="button" id="qamoni_btnPrcPrint"  class="button">출력[1차처리율]</button>
                     </td>
                   </tr>
                 </table>
                 <!--"버튼 테이블"-->	
   
		             <div id="grid_all">
		              <table id="qamoni_tblMntTarget"></table>
		              <div id="qamoni_pgTblMntTarget"></div>
		             </div>
	             </div>

	             <input type="hidden" id="qamoni_mntId">       <!-- 평가목록ID -->
	             <input type="hidden" id="qamoni_mntTargetId"> <!-- 상담사평가ID -->
	             <input type="hidden" id="qamoni_mntUsrId">    <!-- 평가대상상담사 -->
	             <input type="hidden" id="qamoni_mntSuvyId">
	             <input type="hidden" id="qamoni_mntTcktId">  <!-- TCKT ID -->
	             <!-- <input type="hidden" id="qamoni_mntSeq"> -->
	             <!-- <input type="hidden" id="qamoni_month"> -->
             
             </div>
             
             <!-- 화면 오른쪽 영역 -->
             <div style="width: 39%; float: right;">
             
              <div class="stitle" style="display: ruby-base;">평가의견 및 이의제기</div>
	            <!-- 미사용/버튼 테이블 -->
	            <div id="grid_all" style="margin-top: -35px;">
	            
	               <!-- 버튼 테이블 -->
	               <table class="info_tbl_btn">
	                 <tr>
	                   <td>
	                     <button type="button" id="qamoni_btnPrcInsert"  class="button">저장</button>
                       <!-- <button type="button" id="qamoni_btnUpdate"  class="button">수정</button> -->
                       <button type="button" id="qamoni_btnPrcDelete"  class="button">삭제</button>
                       <!-- <button type="button" id="qamoni_btnPrcReset"  class="button">초기화</button> -->
                     </td>
                   </tr>
	               </table>
	               <!--"버튼 테이블"-->
	            </div>      
	             
							<div class="_icon">
							  <div class="left_tab_img" style="cursor: pointer;" id="qamoni_divOnePrcBtn">1차평가</div>
							  <div class="left_tab_img_gray" style="cursor: pointer;" id="qamoni_divTwoPrcBtn">2차평가</div>
							</div>
							
							<!-- Tab height 설정 --> 
							<div class="kmain_tbl_list" style="height: 468px; margin-top: 21px;">
							
								<!-- 1차평가 START -->
								<div style="margin-top: 5px; display: block;" id="qamoni_divOnePrc">
								  <div style="width: 100%;">
								  
										<div id="grid_all">
										  <table class="profile_tbl">
										    <tr>
										      <th class="line_rt" style="width:5%; height:144px;">평가의견</th>
										      <td class="line_b">
										        <textarea class="area_ol" style="height:90%;" rows="5" id="qamoni_prc_Vltn_Opn1"></textarea>
										      </td>
										    </tr>
										    <tr>
										      <th class="line_rt" style="height:144px;">이의제기</th>
										      <td class="line_b">
										        <textarea class="area_ol" style="height:90%;" rows="5" id="qamoni_prc_Objct1"></textarea>
										      </td>
										    </tr>                                      
										    <tr>    
										      <th class="line_rt" style="height:144px;">이의답변</th>
										      <td class="line_b">
										        <textarea class="area_ol" style="height:90%;" rows="5" id="qamoni_prc_Ans1"></textarea>
										      </td>
										    </tr>                    
										  </table>            
										</div> 								  
								  
								  </div>
								  
			          </div> <!-- 1차평가 END -->
			          
			          <!-- 2차평가 START -->
			          <div style="margin-top: 5px; display: none;" id="qamoni_divTwoPrc">			          
			            <div style="width: 100%;">
							
                    <div id="qamoni_grid_all">
                      <table class="profile_tbl">
                        <tr>
                          <th class="line_rt" style="width:5%; height:144px;">평가의견</th>
                          <td class="line_b">
                            <textarea class="area_ol" style="height:90%;" rows="5" id="qamoni_prc_Vltn_Opn2"></textarea>
                          </td>
                        </tr>
                        <tr>
                          <th class="line_rt" style="height:144px;">이의제기</th>
                          <td class="line_b">
                            <textarea class="area_ol" style="height:90%;" rows="5" id="qamoni_prc_Objct2"></textarea>
                          </td>
                        </tr>                                      
                        <tr>    
                          <th class="line_rt" style="height:144px;">이의답변</th>
                          <td class="line_b">
                            <textarea class="area_ol" style="height:90%;" rows="5" id="qamoni_prc_Ans2"></textarea>
                          </td>
                        </tr>                    
                      </table>            
                    </div> 							
							
							    </div>
							  </div><!-- 2차평가 END -->
							  
							</div><!-- Tab height 설정 -->                
             
             </div>

          </div>

        </div><!--"BODY"-->

    </body>
</html>