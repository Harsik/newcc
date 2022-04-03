<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="UTF-8">
        <title>모니터링평가</title>
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
        <script type="text/javascript" src="<c:url value='/resources/js/statistics/monitoring.js'/>"></script>
    </head>
    <body>
        <!--BODY-->
        <div id="h1">모니터링평가</div>
        <div id="pop_body">
            <div class="stitle">모니터링평가 조회</div>
            <!-- 조회/검색 -->
            <div id="search">
                <table class="search_tbl">
                    <tr>
                        <th>일자</th>
                        <td width="40%" style="text-align: left;">
                            <input type="text" style="width: 80px;" class="area_bl" id="selFrDate" maxlength="8"> ~
                            <input type="text" style="width: 80px;" class="area_bl" id="selToDate" maxlength="8">       
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
                <input type="hidden" id="mntId">
                <div style="width:38%; float: left; margin-left: 10px;">
                    <div class="stitle" style="display: ruby-base;">
                        모니터링평가 목록
                    </div>
                    <div id="grid_all" style="margin-bottom: 10px;">
                        <table id="tblMntList" style="margin-bottom: 10px;"></table>
                        <div id="pgTblMntList"></div>
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
                    <table class="profile_tbl">
                        <tr>
                            <td class="line_rt" style="width: 6%;">평가기간</td>
                            <td class="line_b">
                                <input type="text" style="width: 80px;" class="area_bl" id="selFrDate1" maxlength="8">
                                ~
                                <input type="text" style="width: 80px;" class="area_bl" id="selToDate1" maxlength="8">      
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
                <div class="stitle" style="display: ruby-base;">모니터링평가 대상</div>
                <div id="grid_all">
                    <table id="tblMntTarget"></table>
                    <div id="pgTblMntTarget"></div>
                </div>
            </div>
            <div style="width: 59%; float: right;">
                <input type="hidden" id="mntTargetId">
                <input type="hidden" id="mntUsrId">
                <input type="hidden" id="mntSeq">
                <input type="hidden" id="month">
                <div class="stitle" style="display: ruby-base;">
                    모니터링평가 등록
                </div>
                <!--그리드-->
                <div id="grid_all">
                    <!-- 버튼 테이블 -->
                    <table class="info_tbl_btn">
                        <tr>
                            <th></th>
                            <td>
                                <button type="button" id="btnCustmMod" class="button">저장</button>
                                <button type="button" id="btnCustmUdt" class="button">수정</button>
                                <button type="button" id="btnCustmDlt" class="button">삭제</button>
                                <button type="button" id="ozMonth" class="button">월별출력</button>
                                <button type="button" id="ozCounsel" class="button">상담사별출력</button>
                            </td>
                        </tr>
                    </table><!--"버튼 테이블"-->
                </div><!--"그리드"-->

                <!-- 모니터링 평가 항목 테이블 -->
                <form id="writeForm" name="writeForm" action="/ajax/management/mnt_write.do" method="post" style="background: rgb(230, 235, 246); padding: 5px 6px; border-radius: 5px; border: 1px solid rgb(221, 221, 221); border-image: none;">
										<table class="profile_tbl">
											<tr>
												<th class="line_rt" style = "width : 12%">항목 </th>
												<th class="line_rt" style = "width : 13%">세목(배점)</th>
												<th class="line_rt" style = "width : 42%">평가내용</th>
												<th class="line_rt" style = "width : 5%">  배점</th>
											</tr>
	                    <tr>
	                        <th class="line_rt">시작인사(10)</th>
	                        <td class="line_b">
	                            <span title="" style="CURSOR:hand;">첫인사(10)</span> </td>
	                        <td class="line_b">
	                            <select class="select" id="intro" onChange="calculateTotal()">
	                                <option value="10">(10)상황에 맞는 밝은 음성과 적절한 인사</option>
	                                <option value="7">(7)감사표현은 하였으나 상황에 맞지 않는 인사</option>
	                                <option value="4">(4)인사말, 소속, 이름 중 누락된 경우</option>
	                                <option value="1">(1)인사말을 하지 않은 경우</option>
	                            </select>
	                        </td>
	                        <td class="line_b" id="introScore" align="center"></td>
	                    </tr>
	                    <tr>
	                        <th class="line_rt" rowspan="4">커뮤니케이션 (30) </th>
	                        <td class="line_b">
	                            <span title="" style="CURSOR:hand;"> 친절성(10)</span>
	                        </td>
	                        <td class="line_b">
	                            <select class="select" id="kindness" onChange="calculateTotal()">
	                                <option value="10">(10)밝은 음성으로 정중하고 친절하게 진행</option>
	                                <option value="7">(7)성의있게 상담하였으나, 친절감 다소 부족</option>
	                                <option value="4">(4)전반적으로 친절감 부족</option>
	                                <option value="1">(1)성의없고 친절감 부족</option>
	                            </select>
	                        </td>
	                        <td class="line_b" id="kindnessScore" align="center">
	                        </td>
	                    </tr>
	                    <tr>
	                        <td class="line_b">
	                            <span title="" style="CURSOR:hand;">경청(10)</span>
	                        </td>
	                        <td class="line_b">
	                            <select class="select" id="listen" onChange="calculateTotal()">
	                                <option value="10">(10)고객의 말을 경청하고 적절한 호응어 사용</option>
	                                <option value="7">(7)고객의 말을 경청하나 호응어 사용 부족</option>
	                                <option value="4">(4)고객의 말을 경청하지 않고, 호응어 미 사용</option>
	                                <option value="1">(1)경청하지 않고, 재질문 3회, 말겹침 2회이상</option>
	                            </select>
	                        </td>
	                        <td class="line_b" id="listenScore" align="center"> </td>
	                    </tr>
	                    <tr>
	                        <td class="line_b">
	                            <span title="" style="CURSOR:hand;">발음(5)</span>
	                        </td>
	                        <td class="line_b">
	                            <select class="select" id="pronoun" onChange="calculateTotal()">
	                                <option value="5">(5)명확한 발음으로 상담 진행</option>
	                                <option value="3">(3)부분적 불분명한 발음으로 상담</option>
	                                <option value="1">(1)전반적 불분명한 발음으로 상담</option>
	                            </select>
	                        </td>
	                        <td class="line_b" id="pronounScore" align="center"></td>
	                    </tr>
	                    <tr>
	                        <td class="line_b">
	                            <span title="" style="CURSOR:hand;">속도(5)</span>
	                        </td>
	                        <td class="line_b">
	                            <select class="select" id="velocity" onChange="calculateTotal()">
	                                <option value="5">(5)고객의 속도에 맞추어 적절하게 상담</option>
	                                <option value="3">(3)속도가 다소 느리거나 빠른 상담</option>
	                                <option value="1">(1)고객이 알아듣지 못하는 속도의 상담</option>
	                            </select>
	                        </td>
	                        <td class="line_b" id="velocityScore" align="center"></td>
	                    </tr>
	                    <tr>
	                        <th class="line_rt" rowspan="6">상담처리(50)</th>
	                        <td class="line_b">
	                            <span title="" style="CURSOR:hand;"> 문의 이해(10)</span>
	                        </td>
	                        <td class="line_b">
	                            <select class="select" id="understand" onChange="calculateTotal()">
	                                <option value="10">(10)고객의 질문을 정확하고 빠르게 이해</option>
	                                <option value="7">(7)고객 질문 파악 다소 지연</option>
	                                <option value="4">(4)고객 질문 파악이 느려, 상담 지연</option>
	                                <option value="1">(1)고객 질문 이해하지 못하여 오안내</option>
	                            </select>
	                        </td>
	                        <td class="line_b" id="understandScore" align="center"></td>
	                    </tr>
	                    <tr>
	                        <td class="line_b">
	                            <span title="" style="CURSOR:hand;">문의 해결(20)</span>
	                        </td>
	                        <td class="line_b">
	                            <select class="select" id="solve" onChange="calculateTotal()">
	                                <option value="20">(20)정확하고 충분한 상담(필수안내사항 포함)</option>
	                                <option value="15">(15)일부 설명 미흡하나, 문의해결 완료</option>
	                                <option value="10">(10)일부 부정확한 설명 있으나, 문의해결 완료</option>
	                                <option value="5">(5)필수 안내 누락 및 부정확한 설명</option>
	                            </select>
	                        </td>
	                        <td class="line_b" id="solveScore" align="center"></td>
	                    </tr>
	                    <tr>
	                        <td class="line_b">
	                            <span title="" style="CURSOR:hand;"> &nbsp; - 멘트누락(-2) </span>
	                        </td>
	                        <td class="line_b">
	                            <select class="select" id="no_ment" onChange="calculateTotal()">
	                                <option value="0">&nbsp;(0)누락없음</option>
	                                <option value="-2">&nbsp;(-2)환불규정 안내 멘트가 누락된 경우</option>
	                                <option value="-2">&nbsp;(-2)메모 가능 멘트가 누락된 경우</option>
	                                <option value="-4">&nbsp;(-4)환불규정 안내 또는 메모 가능 멘트 둘 다 누락된 경우</option>
	                            </select>
	                        </td>
	                        <td class="line_b" id="no_mentScore" align="center"></td>
	                    </tr>
	                    <tr>
	                        <td class="line_b">
	                            <span title="" style="CURSOR:hand;">신속성(10)</span>
	                        </td>
	                        <td class="line_b">
	                            <select class="select" id="speed" onChange="calculateTotal()">
	                                <option value="10">(10)효율적이고 신속한 응대</option>
	                                <option value="7">(7)다소 신속하지 않음/통화중 대기 15초 이상</option>
	                                <option value="4">(4)오안내로 인한 상담 지연/통화중 대기 30초 이상</option>
	                                <option value="1">(1)상담 느려 고객불만 야기/통화중 대기 45초 이상</option>
	                            </select>
	                        </td>
	                        <td class="line_b" id="speedScore" align="center"></td>
	                    </tr>
	                    <tr>
	                        <td class="line_b">
	                            <span title="" style="CURSOR:hand;">대기예절(5)</span>
	                        </td>
	                        <td class="line_b">
	                            <select class="select" id="good_manners" onChange="calculateTotal()">
	                                <option value="5">(5)대기 없거나, 대기멘트 및 감사표현 적절히 사용</option>
	                                <option value="3">(3)대기 전, 중, 후 양해 멘트 누락</option>
	                                <option value="1">(1)대기시 양해/감사표현 누락</option>
	                            </select>
	                        </td>
	                        <td class="line_b" id="good_mannersScore" align="center"> </td>
	                    </tr>
	                    <tr>
	                        <td class="line_b">
	                            <span title="" style="CURSOR:hand;"> 콜백 및 이관(5)</span>
	                        </td>
	                        <td class="line_b">
	                            <select class="select" id="callback_etc" onChange="calculateTotal()">
	                                <option value="5">(5)콜백 미발생/콜백시 필수사항 안내</option>
	                                <option value="3">(3)콜백시 필수사항 1개 이상 누락</option>
	                                <option value="1">(1)콜백 안내 없이 종결/이관 안내 없이 이관</option>
	                            </select>
	                        </td>
	                        <td class="line_b" id="callback_etcScore" align="center">
	                        </td>
	                    </tr>
	                    
	                    <tr>
	                        <th class="line_rt"> 종료인사(10)</th>
	                        <td class="line_b">
	                            <span title="" style="CURSOR:hand;">끝인사(10)</span>
	                        </td>
	                        <td class="line_b">
	                            <select class="select" id="saygoodbye" onChange="calculateTotal()">
	                                <option value="10">(10)플러스멘트/마무리 인사</option>
	                                <option value="7">(7)플러스멘트/마무리 인사 일부 누락</option>
	                                <option value="4">(4)플러스멘트/마무리 인사 모두 누락</option>
	                            </select>
	                        </td> 
	                        <td class="line_b" id="saygoodbyeScore" align="center"></td>
	                    </tr>
	                    <tr>
	                        <th class="line_rt" rowspan="2">기타</th>
	                        <td class="line_b">
	                            <span title="" style="CURSOR:hand;">가점사항(5)</span>
	                        </td>
	                        <td class="line_b">
	                            <select class="select" id="praise" onChange="calculateTotal()">
	                                <option value="0">(0)가점없음</option>
	                                <option value="5">(5)고객의 진심어린 감사(칭찬) 표현</option>
	                            </select>
	                        </td>
	                        <td class="line_b" id="praiseScore" align="center"></td>
	                    </tr>
	                    
	                    <tr>
	                        <td class="line_b">
	                            <span title="" style="CURSOR:hand;">감점사항</span>
	                        </td>
	                        <td class="line_b">
	                            <select class="select" id="giveup" onChange="calculateTotal()">
	                                <option value="0">(0)감점없음</option>
	                                <option value="-5">(-5)고객과의 언쟁 및 다툼 발생</option>
	                            </select>
	                        </td>
	                        <td class="line_b" id="giveupScore" align="center"></td>
	                    </tr>
	                    <!-- <tr>
	                        <td class="line_br">
	                            <span title="" style="CURSOR:hand;">
	                                상담태도불량(-2)
	                            </span>
	                        </td>
	                        <td class="line_br">
	                            <select class="select" id="no_manners" onChange="calculateTotal()">
	                                <option value="0">(0)불량없음</option>
	                                <option value="-2">(-2)인사말, 소속, 이름 중 하나라도 누락되는 경우</option>
	                            </select>
	                        </td>
	                        <td class="line_b" id="no_mannersScore" align="center">
	                        </td>
	                    </tr> -->
	                    
	                    <tr>
	                        <th class="line_rt" colspan="3">총점</th>
	                        <td class="line_b" id="tot_score" align="center"></td>
	                    </tr>
	                    <tr>
	                        <th class="line_rt">비고</th>
	                        <td class="line_b" colspan="3">
	                            <textarea rows="3" cols="78" id="note" maxlength="1800"></textarea>
	                        </td>
	                    </tr>
	                    <tr>
	                        <td class="line_rt" rowspan="8">첨부파일</td>
	                        <td class="" colspan="3" style="height: 140px;" valign="top">
                            <table id="monitoringFile" style="margin-left: 5px; margin-right: 6px;">
                               <tr>
                                  <td style="width: 30%;">
                                      <input type="hidden" name="record_XXX" value="" />
                                      <!-- <input type="hidden" name="action" value="add" /> -->
                                      <input type="file" id="monitoring" name="monitoring" class="file_board" style="width:460px;" />
                                  </td>
                                  <td style="width: 20%">
                                      <img src="/resources/images/btn_cancel.png" id="mntRmFilebox" style="cursor: pointer; margin-top: 4px; margin-left: 4px;" alt="취소" />
                                  </td>
                                  <td style="width: 20%; text-align: right;">
                                      <img src="/resources/images/btn_fileadd.png" onClick="addFileBox()" alt="파일추가" class="icon_add" style="cursor: pointer"/>
                                  </td>
                               </tr>
                            </table>
	                        </td>
	                    </tr>
	                </table>
                </form> 
            </div>

            <!-- 개인정보테이블 -->
            <table class="profile_tbl" style="border-style: none;"></table>
            </div>
        </div><!--"BODY"-->
        <table id="fileadd" style="display:none">
            <tr>
                <td>
                    <input type="hidden" name="record_XXX" value="" />
                    <input type="file" name="monitoring" class="file_board" style="width:460px;" />
                </td>
                <td>
                    <img src="/resources/images/btn_cancel.png" onClick="removeFileBox(XXX)" style="cursor: pointer; margin-top: 4px; margin-left: 4px;" alt="취소" />
                </td>
                <td style="text-align: right;"></td>
            </tr>
        </table>
    </body>
</html>