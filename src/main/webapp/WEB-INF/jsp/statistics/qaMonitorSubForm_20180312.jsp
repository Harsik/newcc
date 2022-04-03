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
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/tab.css" />
        <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.gbTabs.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/resources/js/common/listenRec.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/resources/js/statistics/qaMonitorSubForm.js'/>"></script>
    </head>
    <body>
      <!--BODY-->
      <div id="h1">평가관리</div>
      <div id="pop_body">

		    <div class="_icon">
		      <div class="left_tab_img" style="cursor: pointer;" id="divQaMonitorBtn">상담품질</div>
		      <div class="left_tab_img_gray" style="cursor: pointer;" id="divPrcssRatioBtn">1차처리율</div>
		    </div>
	    
		    <div class="kmain_tbl_list" style="height: 870px;">
	  
	        <!-- 상담품질 START -->
	        <div style="margin-top: 5px; display: block;" id="divQaMonitor">
		        <div style="width: 100%;">
		
		          <!-- 화면 왼쪽 영역 -->		                          
		          <div style="width:49%; float: left;">
		
		            <div class="grid_all">
		
		              <!-- 미사용/버튼 테이블 -->
		              <table class="info_tbl">
		                 <tr>
		                    <td>
		                       <button type="button" id="btnRecInsert"  class="button">평가이력생성</button>
		                       <button type="button" id="btnRecDelete"  class="button">평가이력삭제</button>
		                    </td>
		                 </tr>
		              </table>
		              <!--"미사용/버튼 테이블"-->
		
		              <div id="grid_all">
		                  <table id="tblMntRecList"></table>
		                  <div id="pgTblMntRecList"></div>
		              </div>
		            </div>   
		                         
		            <div id="grid_all">
		              <table class="profile_tbl">
		                <tr>
		                  <th class="line_rt">전화번호</th>
		                  <td class="line_b" id = "cntct_Infm_Format"></td>
		                  <th class="line_c">통화구분</th>
		                  <td class="line_b" id = "call_Gb_Nm"></td>
		                </tr>
		                <tr>
		                  <th class="line_rt">처리유형</th>
		                  <td class="line_b" id = "act_Type_Nm"></td>
		                  <th class="line_c">상담결과</th>
		                  <td class="line_b" id = "act_St_Nm"></td>
		                </tr>                                      
		                <tr>    
		                  <th class="line_rt" style="width: 5%;">상담유형</th>
		                  <td class="line_b" colspan="3" id="intv_Nm">
		                  </td>
		                </tr>
										<tr>
											<th class="line_rt">문의내용</th>
											<td class="line_b" colspan="3">
											   <textarea rows="3" cols="96" id="qst_Cont" maxlength="1800" readonly></textarea>
											</td>
										</tr>
										<tr>
											<th class="line_rt">답변내용</th>
											<td class="line_b" colspan="3">
											   <textarea rows="3" cols="96" id="act_Cont" maxlength="1800" readonly></textarea>
											</td>
										</tr>                     
		              </table>            
		            </div>              
		          </div><!-- "화면 왼쪽 영역" -->
		                  
			        <!-- 화면 오른쪽 영역 -->
			        <div style="width: 50%; float: right;">
			      
			          <input type="hidden" id="mntId">       <!-- 평가목록ID -->
			          <input type="hidden" id="mntTargetId"> <!-- 상담사평가ID -->
			          <input type="hidden" id="mntUsrId">    <!-- 평가대상상담사 -->
			          <input type="hidden" id="mntTcktId">   <!-- TCKT ID -->
			          <input type="hidden" id="mntTabType">  <!-- Tab Type (rec:상담품질, prc:1차처리율 탭) -->
			          <!-- <input type="hidden" id="mntSeq"> -->
			          <!-- <input type="hidden" id="month"> -->
                
			          <!--그리드-->
			          <div id="grid_all">
			             <!-- 버튼 테이블 -->
			             <table class="info_tbl">
			               <tr>
			                 <th id="txtRecMent"></th>
			                 <td>
			                   <button type="button" id="btnCustmMod" class="button">저장</button>
			                   <button type="button" id="btnCustmUdt" class="button">수정</button>
			                   <button type="button" id="btnCustmDlt" class="button">삭제</button>                                      
			                   <!-- <button type="button" id="btnPrint" class="button">보고서 출력</button>  -->
			                 </td>
			               </tr>
			             </table><!--"버튼 테이블"-->
			          </div><!--"그리드"-->
			
			          <!-- 평가지 표현 -->
			          <div id="suvyQa" style = "width:100%; height:830px; overflow:auto; margin-top: -5px; /* border:1px solid red; */"></div>

				      </div><!-- "화면 오른쪽 영역" -->
		
		        </div>
		      </div> <!-- 상담품질 END -->
		      
		      <!-- 1차처리율 START -->
		      <div style="margin-top: 5px; display: none;" id="divPrcssRatio">
		      
            <div style="width: 100%;">
    
              <div id="grid_all">
  
                <!-- 미사용/버튼 테이블 -->
                <table class="info_tbl">
                   <tr>
                      <td>
                         <button type="button" id="btnPrcRecInsert"  class="button">평가이력생성</button>
                         <button type="button" id="btnPrcRecDelete"  class="button">평가이력삭제</button>
                      </td>
                   </tr>
                </table>
                <!--"미사용/버튼 테이블"-->
  
                <div id="grid_all">
                  <table id="tblPrcList"></table>
                  <div id="pgtblPrcList"></div>
                </div>
                
                <!-- 미사용/버튼 테이블 -->
                <table class="info_tbl">
                   <tr>
                      <td>
                         <button type="button" id="btnPrcMod" class="button">저장</button>
                         <!-- <button type="button" id="btnPrcUdt" class="button">수정</button> -->
                         <button type="button" id="btnPrcDlt" class="button">삭제</button>                       
                         <button type="button" id="btnPrcPrint" class="button">보고서 출력</button>
                      </td>
                   </tr>
                </table>
                <!--"미사용/버튼 테이블"-->                
                
                <div id="grid_all">
                  <table class="profile_tbl">
                    <tr>
                      <th class="line_rt">정확</th>
                      <td class="line_b">
                        <select class="select_al" id="prc_Crct">
                          <option value="all" selected>미선택</option>
	                        <option value="0">0</option>
	                        <option value="1">1</option>
                        </select>
                      </td>
                      <th class="line_c">부정확</th>
                      <td class="line_b">
                        <select class="select_al" id="prc_Incrct">
                          <option value="all" selected>미선택</option>
                          <option value="0">0</option>
                          <option value="1">1</option>                        
                        </select>
                      </td>
                      <th class="line_c">오안내</th>
                      <td class="line_b">
                        <select class="select_al" id="prc_Wndgd">
                          <option value="all" selected>미선택</option>
                          <option value="0">0</option>
                          <option value="1">1</option>                        
                        </select>
                      </td>    
                      <th class="line_c">BestCall</th>
                      <td class="line_b">
                        <select class="select_al" id="prc_Vltn_Gb_Cd"></select>
                      </td>                  
                    </tr>                   
                    <tr>
                      <th class="line_rt">처리유형</th>
                      <td class="line_b" id = "prc_Act_Type_Nm"></td>
                      <th class="line_c">상담결과</th>
                      <td class="line_b" id = "prc_Act_St_Nm"></td>
                      <th class="line_c">상담유형</th>
                      <td class="line_b" colspan="3" id="prc_Intv_Nm"></td>               
                    </tr>     
                    <tr>
                      <th class="line_rt">문의내용</th>
                      <td class="line_b" colspan="7">
                         <textarea class="area_ol" style="height:90%;" rows="5" id="prc_Qst_Cont" readonly></textarea>
                      </td>
                    </tr>
                    <tr>
                      <th class="line_rt">답변내용</th>
                      <td class="line_b" colspan="7">
                         <textarea class="area_ol" style="height:90%;" rows="5" id="prc_Act_Cont" readonly></textarea>
                      </td>
                    </tr>                     
                  </table>            
                </div>  
                                
              </div><!-- class="grid_all" -->  		
                    
		        </div><!-- style END -->
		      </div><!-- 1차처리율 END -->
		      
	      </div>
      </div><!--"BODY"-->

    </body>
</html>