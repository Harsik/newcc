<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
    <head>
        <meta charset="UTF-8">
        <title>성과관리</title>
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
        <script type="text/javascript" src="<c:url value='/resources/js/statistics/kpi_jjcc.js'/>"></script>
    </head>

    <body>
    
        <!--BODY-->
        <div id="h1">
            성과관리
        </div>
        <div id="pop_body">
            <!--타이틀-->
            <div class="stitle">
                성과관리 조회
            </div>
            <!--"타이틀"-->
            <!-- 조회/검색 -->
            <div id="search">
              <table class="search_tbl">
                <tr>
                  <th>일자</th>
                  <td width="30%" style="text-align: left;">
	                   <span id = "searchYear"></span>
	                   
	                   <select class="select_bl" style="width: 36%;" id="searchMonth">
	                     <option value="" selected="selected">선택</option>
	                     <option value="01">1월</option>
	                     <option value="02">2월</option>
	                     <option value="03">3월</option>
	                     <option value="04">4월</option>
	                     <option value="05">5월</option>
	                     <option value="06">6월</option>
	                     <option value="07">7월</option>
	                     <option value="08">8월</option>
	                     <option value="09">9월</option>
	                     <option value="10">10월</option>
	                     <option value="11">11월</option>
	                     <option value="12">12월</option>
	                   </select>           
                  </td>
                  <td class="btn">
	                   <button type="button" id="btnSearch" class="button">조회</button>
	                   <button type="button" id="btnInit" class="button">초기화</button>
                  </td>
                </tr> 
              </table>
            </div>
            <!--"조회/검색"-->
            
            <div style="width: 100%; margin-top: 20px;">
                <input type="hidden" id="kpiId">
                <input type="hidden" id="year">
                <input type="hidden" id="month">
                <div style="width:38%; float: left; margin-left: 10px;">
                    <div class="stitle" style="display: ruby-base;">
                        성과관리 목록
                    </div>
                    <div id="grid_all" style="margin-bottom: 10px;">
                        <table id="tblKpiList" style="margin-bottom: 10px;"></table>
                        <div id="pgTblKpiList"></div>
                    </div>
                    
                    <!-- 미사용/버튼 테이블 -->
                    <div id="grid_all">
                        <!-- 버튼 테이블 -->
                        <table class="info_tbl_btn">
                            <tr>
                                <td>
                                    <button type="button" id="btnInsert"  class="button">저장</button>
                                    <button type="button" id="btnUpdate"  class="button">수정</button>
                                    <button type="button" id="btnDelete"  class="button">삭제</button>
                                    <button type="button" id="btnReset"  class="button">초기화</button>                                    
                                </td>
                            </tr>
                        </table>
                        <!--"버튼 테이블"-->
                    </div>
                    
                    <!-- 개인정보테이블 -->
                <form id="writeForm" name="writeForm" action="/ajax/management/wirteKpiForm.do" method="post">  
                    <table class="profile_tbl">
                        <tr>
                          <td class="line_rt" style="width: 6%;">평가기간</td>
                          <td class="line_b">
                             <span id = "years"></span>
                             
                             <select class="select_bl" style="width: 36%;" id="months">
                               <option value="01">1월</option>
                               <option value="02">2월</option>
                               <option value="03">3월</option>
                               <option value="04">4월</option>
                               <option value="05">5월</option>
                               <option value="06">6월</option>
                               <option value="07">7월</option>
                               <option value="08">8월</option>
                               <option value="09">9월</option>
                               <option value="10">10월</option>
                               <option value="11">11월</option>
                               <option value="12">12월</option>
                             </select>       
                          </td>
                        </tr>
                        <tr>
                          <td class="line_rt" style="width: 6%;">목록명</td>
                          <td class="line_b">
                              <input type="text" class="text_ol" id="title" maxlength="90">       
                          </td>
                        </tr>
                        <tr>
                          <td class="line_rt">
                              비고
                          </td>
                          <td class="line_b">
                              <textarea rows="3" id="note" cols="46" maxlength="1800"></textarea>
                          </td>
                        </tr>
                        <tr>
                          <td class="line_rt" rowspan="8">첨부파일</td>
                          <td class="" colspan="" style="height: 140px;" valign="top">
                            <table id="kpiFile" style="margin-left: 5px; margin-right: 6px;">
                               <tr>
                                  <td style="width: 30%;">
                                      <input type="hidden" name="record_XXX" value="" />
                                      <input type="hidden" name="action" value="add" />
                                      <input type="file" id="KPI" name="KPI" class="file_board" style="width:250px;" />
                                  </td>
                                  <td style="width: 20%">
                                      <img src="/resources/images/btn_cancel.png" id="kpiRmFilebox" style="cursor: pointer; margin-top: 4px; margin-left: 4px;" alt="취소" />
                                  </td>
                                  <td style="width: 20%; text-align: right;">
                                      <img src="/resources/images/btn_fileadd.png" onClick="addFileBox()" alt="파일추가" class="icon_add" style="cursor: pointer"/>
                                  </td>
                               </tr>
                            </table>
                          </td>
                        </tr>
                    </table>
                    <!--"개인정보테이블"-->
                </form>
            </div>
                        
            <div style="width: 60%; float: right;" id="dvData">
                <div class="stitle" style="display: ruby-base;">
                    성과지표 등록
                </div>
                
                <table class="info_tbl_btn" style="margin-top: -28px;">
                  <tr>
                    <td>
                       <button type="button" id="btnExcel"  class="button">엑셀저장</button>
                    </td>
                  </tr>
                </table>
                
                <!-- KPI 지표 테이블 -->
                <table class="profile_tbl">
									<colgroup>
										<col style="width:10%">            
										<col style="width:30%;">            
										<col style="width:11%;">            
										<col style="width:10%;">            
										<col style="width:10%;">   
										<col style="width:10%;">            
	                  <col style="width:10%;">            
	                  <col style="width:10%;">         
									</colgroup>                
                  <tr>
                     <td class="line_rt" colspan=2 rowspan=2>지표명</td>
                     <td class="line_rt" rowspan=2 >목표</td>
                     <td class="line_rt" style="height:35px;" colspan=2 >당월</td>
                     <td class="line_rt" style="height:35px;" colspan=2 >전월</td>
                     <td class="line_rt" rowspan=2 >증감</td>
                  </tr>
                  <tr>
                     <td class="line_rt" style="height:35px;">실적</td>
                     <td class="line_rt" style="height:35px;">달성율</td>
                     <td class="line_rt" style="height:35px;">실적</td>
                     <td class="line_rt" style="height:35px;">달성율</td>
                  </tr>
                  <tr>
                    <td class="line_rt" rowspan="6">상담<br>운용<br>능력</td>
                    <td class="line_b_dot" style="cursor:hand;height:35px;"><span>&nbsp;고객응대율(%)</span></td>
                    <td class="line_b_dot" style="cursor:hand;margin: auto; text-align: center;"id="cust_rspn_goal">95</td>
                    <td class="line_b_dot">
                      <input type="text" class="text_ol" style="margin: auto; text-align: center;" id="cust_rspn_rate" maxlength="6" onchange="calculate(1)">
                    </td>
                    <td class="line_b_dot" id="cust_rspn_thsmon_achiv" align="center"></td>
                    <td class="line_b_dot" id="cust_rspn_lsmth_acmslt" align="center"></td>
                    <td class="line_b_dot" id="cust_rspn_lsmth_achiv" align="center"></td>
                    <td class="line_b_dot" id="cust_rspn_irds" align="center"></td>
                  </tr>
                  <tr>
                    <td class="line_b_dot" style="cursor:hand;height:35px;"><span>&nbsp;콜센터 생산성(콜)</span></td>
                    <td class="line_b_dot" style="cursor:hand;margin: auto; text-align: center;"id="prdt_goal">95</td>
                    <td class="line_b_dot">
                      <input type="text" class="text_ol" style="margin: auto; text-align: center;" id="prdt" maxlength="6" onChange="calculate(2)">
                    </td>
                    <td class="line_b_dot" id="prdt_thsmon_achiv" align="center"></td>
                    <td class="line_b_dot" id="prdt_lsmth_acmslt" align="center"></td>
                    <td class="line_b_dot" id="prdt_lsmth_achiv" align="center"></td>
                    <td class="line_b_dot" id="prdt_irds" align="center"></td>
                  </tr>
                  <tr>
                    <td class="line_b_dot" style="cursor:hand;height:35px;"><span>&nbsp;FCR(1차 처리율)(%)</span></td>
                    <td class="line_b_dot" style="cursor:hand;margin: auto; text-align: center;"id="fcr_goal">85</td>
                    <td class="line_b_dot">
                      <input type="text" class="text_ol" style="margin: auto; text-align: center;" id="fcr" maxlength="6" onChange="calculate(3)">
                    </td>
                    <td class="line_b_dot" id="fcr_thsmon_achiv" align="center"></td>
                    <td class="line_b_dot" id="fcr_lsmth_acmslt" align="center"></td>
                    <td class="line_b_dot" id="fcr_lsmth_achiv" align="center"></td>
                    <td class="line_b_dot" id="fcr_irds" align="center"></td>                  
                  </tr>
                  <tr>
                    <td class="line_b_dot" style="cursor:hand;height:35px;"><span>&nbsp;상담사 만족도(점)</span></td>
                    <td class="line_b_dot" style="cursor:hand;margin: auto; text-align: center;"id="agt_stsfdg_goal">90</td>
                    <td class="line_b_dot">
                      <input type="text" class="text_ol" style="margin: auto; text-align: center;" id="agt_stsfdg" maxlength="6" onChange="calculate(4)">
                    </td>
                    <td class="line_b_dot" id="agt_stsfdg_thsmon_achiv" align="center"></td>
                    <td class="line_b_dot" id="agt_stsfdg_lsmth_acmslt" align="center"></td>
                    <td class="line_b_dot" id="agt_stsfdg_lsmth_achiv" align="center"></td>
                    <td class="line_b_dot" id="agt_stsfdg_irds" align="center"></td>                
                  </tr>
                  <tr>
                    <td class="line_b_dot" style="cursor:hand;height:35px;"> <span>&nbsp;20초내 상담개시율(%)</span></td>
                    <td class="line_b_dot" style="cursor:hand;margin: auto; text-align: center;"id="sec20_cnsl_goal">90</td>
                    <td class="line_b_dot">
                      <input type="text" class="text_ol" style="margin: auto; text-align: center;" id="sec20_cnsl_rate" maxlength="6" onChange="calculate(5)">
                    </td>
                    <td class="line_b_dot" id="sec20_cnsl_thsmon_achiv" align="center"></td>
                    <td class="line_b_dot" id="sec20_cnsl_lsmth_acmslt" align="center"></td>
                    <td class="line_b_dot" id="sec20_cnsl_lsmth_achiv" align="center"></td>
                    <td class="line_b_dot" id="sec20_cnsl_irds" align="center"></td>                  
                  </tr>
                  <tr>
                    <td class="line_b" style="cursor:hand;height:35px;"> <span>&nbsp;상담사 이직인원</span></td>
                    <td class="line_b" style="cursor:hand;margin: auto; text-align: center;"id="agt_ret_goal">3명이내<br>(정원 35)</td>
                    <td class="line_b">
                      <input type="text" class="text_ol" style="margin: auto; text-align: center;" id="agt_ret_prsn" maxlength="6" onChange="calculate(6)">
                    </td>
                    <td class="line_b" id="agt_ret_thsmon_achiv" align="center"></td>
                    <td class="line_b" id="agt_ret_lsmth_acmslt" align="center"></td>
                    <td class="line_b" id="agt_ret_lsmth_achiv" align="center"></td>
                    <td class="line_b" id="agt_ret_irds" align="center"></td>                 
                  </tr>
                  
                  <tr>
                    <td class="line_rt" rowspan="3">상담<br>품질</td>
                    <td class="line_b_dot" style="cursor:hand;height:35px;"><span> &nbsp;모니터링 평가(점)</span></td>
                    <td class="line_b_dot" style="cursor:hand;margin: auto; text-align: center;"id="vltn_scr_goal">90</td>
                    <td class="line_b_dot">
                      <input type="text" class="text_ol" style="margin: auto; text-align: center;" id="vltn_scr" maxlength="6" onChange="calculate(7)">
                    </td>
                    <td class="line_b_dot" id="vltn_scr_thsmon_achiv" align="center"></td>
                    <td class="line_b_dot" id="vltn_scr_lsmth_acmslt" align="center"></td>
                    <td class="line_b_dot" id="vltn_scr_lsmth_achiv" align="center"></td>
                    <td class="line_b_dot" id="vltn_scr_irds" align="center"></td>                  
                  </tr>
                  <tr>
                    <td class="line_b_dot" style="cursor:hand;height:35px;"><span> &nbsp;고객만족도(점)</span></td>
                    <td class="line_b_dot" style="cursor:hand;margin: auto; text-align: center;"id="cust_stsfdg_goal">87</td>
                    <td class="line_b_dot">
                      <input type="text" class="text_ol" style="margin: auto; text-align: center;" id="cust_stsfdg" maxlength="6" onChange="calculate(8)">
                    </td>
                    <td class="line_b_dot" id="cust_stsfdg_thsmon_achiv" align="center"></td>
                    <td class="line_b_dot" id="cust_stsfdg_lsmth_acmslt" align="center"></td>
                    <td class="line_b_dot" id="cust_stsfdg_lsmth_achiv" align="center"></td>
                    <td class="line_b_dot" id="cust_stsfdg_irds" align="center"></td>                 
                  </tr>
                  <tr>
                    <td class="line_b" style="cursor:hand;height:35px;"><span> &nbsp;상담사 업무지식평가(점)</span></td>
                    <td class="line_b" style="cursor:hand;margin: auto; text-align: center;"id="task_knwg_goal">85</td>
                    <td class="line_b">
                      <input type="text" class="text_ol" style="margin: auto; text-align: center;" id="task_knwg_scr" maxlength="6" onChange="calculate(9)">
                    </td>
                    <td class="line_b" id="task_knwg_thsmon_achiv" align="center"></td>
                    <td class="line_b" id="task_knwg_lsmth_acmslt" align="center"></td>
                    <td class="line_b" id="task_knwg_lsmth_achiv" align="center"></td>
                    <td class="line_b" id="task_knwg_irds" align="center"></td>                   
                  </tr>
 
              </table>    
            </div>

            <!-- 개인정보테이블 -->
            <table class="profile_tbl" style="border-style: none;">
            </table><!--"개인정보테이블"-->
            </div>
        </div><!--"BODY"-->
        <table id="fileadd" style="display:none">
          <tr>
             <td>
               <input type="hidden" name="record_XXX" value="" />
               <!-- <input type="hidden" name="action" value="add" /> -->
               <input type="file" name="KPI" class="file_board" style="width:250px;" />
             </td>
             <td>
               <img src="/resources/images/btn_cancel.png" onClick="removeFileBox(XXX)" style="cursor: pointer; margin-top: 4px; margin-left: 4px;" alt="취소" />
             </td>
             <td style="text-align: right;"></td>
          </tr>
        </table>
    </body>
</html>