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
        <script type="text/javascript" src="<c:url value='/resources/js/statistics/kpi.js'/>"></script>
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
                            <span id="kpi_searchYear"></span>
                            
                            <select class="select_bl" style="width: 36%;" id="kpi_searchMonth">
                                <option value="" selected="selected">선택</option>
                                <option value="1">1월</option>
                                <option value="2">2월</option>
                                <option value="3">3월</option>
                                <option value="4">4월</option>
                                <option value="5">5월</option>
                                <option value="6">6월</option>
                                <option value="7">7월</option>
                                <option value="8">8월</option>
                                <option value="9">9월</option>
                                <option value="10">10월</option>
                                <option value="11">11월</option>
                                <option value="12">12월</option>
                            </select>           
                        </td>
                        <td class="btn">
                            <button type="button" id="kpi_btnSearch" class="button">조회</button>
                            <button type="button" id="kpi_btnInit" class="button">초기화</button>
                        </td>
                    </tr> 
                </table>
            </div>
            <!--"조회/검색"-->
            <!-- 성과관리 목록 테이블인 OM024가 DB상에 없는 것으로 확인 고로 조회되는 리스트 없음 -->
            <div style="width: 100%; margin-top: 20px;">
                <input type="hidden" id="kpi_kpiId">
                <input type="hidden" id="kpi_year">
                <input type="hidden" id="kpi_month">
                <div style="width:38%; float: left; margin-left: 10px;">
                    <div class="stitle" style="display: ruby-base;">
                        성과관리 목록
                    </div>
                    <div id="grid_all" style="margin-bottom: 10px;">
                        <table id="kpi_tblKpiList" style="margin-bottom: 10px;"></table>
                        <div id="kpi_pgTblKpiList"></div>
                    </div>
                    
                    <!-- 미사용/버튼 테이블 -->
                    <div id="grid_all">
                        <!-- 버튼 테이블 -->
                        <table class="info_tbl_btn">
                            <tr>
                                <td>
                                    <button type="button" id="kpi_btnInsert"  class="button">저장</button>
                                    <button type="button" id="kpi_btnUpdate"  class="button">수정</button>
                                    <button type="button" id="kpi_btnDelete"  class="button">삭제</button>
                                    <button type="button" id="kpi_btnReset"  class="button">초기화</button>
                                </td>
                            </tr>
                        </table>
                        <!--"버튼 테이블"-->
                    </div>
                    
                    <!-- 개인정보테이블 -->
                <form id="kpi_writeForm" name="writeForm" action="/ajax/management/wirteKpiForm.do" method="post">  
                    <table class="profile_tbl">
                        <tr>
                            <td class="line_rt" style="width: 6%;">평가기간</td>
                            <td class="line_lb">
                                <span id="kpi_years"></span>
                                
                                <select class="select_bl" style="width: 36%;" id="kpi_months">
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
                            <td class="line_lb">
                                <input type="text" class="text_ol" id="kpi_title" maxlength="90">       
                            </td>
                        </tr>
                        <tr>
                            <td class="line_rt">
                                비고
                            </td>
                            <td class="line_lb">
                                <textarea rows="3" id="kpi_note" cols="46" maxlength="1800"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td class="line_rt" rowspan="8">첨부파일</td>
                            <td class="" colspan="" style="height: 140px;" valign="top">
                                <table id="kpi_kpiFile" style="margin-left: 5px; margin-right: 6px;">
                                    <tr>
                                        <td style="width: 30%;">
                                            <input type="hidden" name="record_XXX" value="" />
                                            <input type="hidden" name="action" value="add" />
                                            <input type="file" id="kpi_KPI" name="KPI" class="file_board" style="width:250px;" />
                                        </td>
                                        <td style="width: 20%">
                                            <img src="/resources/images/btn_cancel.png" id="kpi_kpiRmFilebox" style="cursor: pointer; margin-top: 4px; margin-left: 4px;" alt="취소" />
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
                <div id="grid_all">
                    <!-- 버튼 테이블 -->
                    <table class="info_tbl_btn" style="margin-top: 28px;">
                        <tr>
                            <td>
                                <!-- <button type="button" id="kpi_btnOz"  class="button">오즈</button> -->
                            </td>
                        </tr>
                    </table>
                    <!--"버튼 테이블"-->
                </div>
            </div>
                        
            <div style="width: 58%; float: right;">
                <div class="stitle" style="display: ruby-base;">
                    성과지표 등록
                </div>
                <table class="info_tbl_btn">
                        <tr>
                            <td>
                                <button type="button" id="kpi_btnOz"  style="margin-top: -30px; float: right;" class="button">출력</button>
                            </td>
                        </tr>
                    </table>
                <!-- KPI 지표 테이블 -->
                <table class="profile_tbl">
                    <tr>
                        <td class="line_rt" style = "width : 12%">
                            부문
                        </td>
                        <td class="line_rt" style = "width : 31%">
                            지표
                        </td>
                        <td class="line_rt" style = "width : 22%">
                            목표
                        </td>
                        <td class="line_rt" style = "width : 12%">
                            성과지표
                        </td>
                        <td class="line_rt" style = "width : 9%">
                            배점
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="line_rt" rowspan="5">
                            생산성지표
                            (45%)
                        </td>
                        <td class="line_b" title="총 인입된 콜 중 응대된 콜 비율" style="cursor : pointer;">
                            <span>
                                &nbsp;응답률
                            </span>
                        </td>
                        <td class="line_lb" title="95% 이상 10점   90%이상 8점   85%이상 6점   85%미만 4점" style="cursor : pointer;">
                            &nbsp;95%
                        </td>
                        <td class="line_lb">
                            <input type="text" class="text_ol_60" id="kpi_res_rate" maxlength="6" onchange="calculate(1)">%
                        </td>
                        <td class="line_lb" id="kpi_res_rateScore" style="align:center;" onChange="totalScore()">
                        </td>
                    </tr>
                    <tr>
                        <td class="line_b" title="총 인입된 콜 중 20초 이내에 응대된 비율" style="cursor : pointer;">
                            <span>
                                &nbsp;Service Level
                            </span>
                        </td>
                        <td class="line_lb" title="90% 이상 10점   85%이상 8점   80%이상 6점   80%미만 4점" style="cursor : pointer;">
                            &nbsp;90%
                        </td>
                        <td class="line_lb">
                            <input type="text" class="text_ol_60" id="kpi_serv_lv" maxlength="6" onChange="calculate(2)">%
                        </td>
                        <td class="line_lb" id="kpi_serv_lvScore" style="align:center;">
                        </td>
                    </tr>
                    <tr>
                        <td class="line_b" title="전체 콜 중 첫 번째 콜로 고객문의 처리가 완료된 비율※ 이관호는 완료에 포함되지 않음" style="cursor : pointer;">
                            <span>
                                &nbsp;원콜 처리율
                            </span>
                        </td>
                        <td class="line_lb" title="75% 이상 10점   70%이상 8점   65%이상 6점   65%미만 4점" style="cursor : pointer;">
                            &nbsp;80% 
                        </td>
                        <td class="line_lb">
                            <input type="text" class="text_ol_60" id="kpi_fcr" maxlength="6" onChange="calculate(3)">%
                        </td>
                        <td class="line_lb" id="kpi_fcrScore" style="align:center;">
                        </td>
                    </tr>
                    <tr>
                        <td class="line_b" title="콜센터에서 즉시 처리가 어려워, 각 부서로 이관된 비율" style="cursor : pointer;">
                            <span>
                                &nbsp;콜 이관율
                            </span>
                        </td>
                        <td class="line_lb" title="15% 미만 10점   20%미만 8점   25%미만 6점   25%이상 4점" style="cursor : pointer;">
                            &nbsp;15% 미만
                        </td>
                        <td class="line_lb">
                            <input type="text" class="text_ol_60" id="kpi_trans_rate" maxlength="6" onChange="calculate(4)">%
                        </td>
                        <td class="line_lb" id="kpi_trans_rateScore" style="align:center;">
                        </td>
                    </tr>
                    <tr>
                        <td class="line_b" title="통화 중에 정보수집 등을 위해 고객을 일시적으로 대기시키는 시간(Hold Time)" style="cursor : pointer;">
                            <span>
                                &nbsp;통화 중 대기 시간<br>
                                &nbsp;(Hold Time)
                            </span>
                        </td>
                        <td class="line_lb" title="5초 미만 5점   10초 미만 3점   10초 이상 1점" style="cursor : pointer;">
                            &nbsp;5초 미만
                        </td>
                        <td class="line_lb">
                            <input type="text" class="text_ol_60" id="kpi_delay_tm" maxlength="6" onChange="calculate(5)">초
                        </td>
                        <td class="line_lb" id="kpi_delay_tmScore" style="align:center;">
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="line_rt" rowspan="4">
                            상담품질
                            (35%)
                        </td>
                        <td class="line_b" title="상담사의 상담내용에 대한 품질 모니터링 및 피드백 횟수" style="cursor : pointer;">
                            <span>
                                &nbsp;상담품질 모니터링 횟수(월)
                            </span>
                        </td>
                        <td class="line_lb" title="월 8회 이상 10점   월 6회 이상 8점   월 4회 이상 6점   월 3회 이하 4점" style="cursor : pointer;">
                            &nbsp;상담사별 주 2회 이상
                        </td>
                        <td class="line_lb">
                            <input type="text" class="text_ol_60" id="kpi_mnt_cnt" maxlength="6" onChange="calculate(6)">회
                        </td>
                        <td class="line_lb" id="kpi_mnt_cntScore" style="align:center;">
                        </td>
                    </tr>
                    <tr>
                        <td class="line_b" title="상담품질 모니터링 점수" style="cursor : pointer;">
                            <span>
                                &nbsp;상담품질 모니터링 점수(월평균)
                            </span>
                        </td>
                        <td class="line_lb" title="90점 이상 10점   85점 이상 8점   80점 이상 6점   80점 미만 4점" style="cursor : pointer;">
                            &nbsp;상담사평균 85점 이상
                        </td>
                        <td class="line_lb">
                            <input type="text" class="text_ol_60" id="kpi_mnt_scr" maxlength="6" onChange="calculate(7)">점
                        </td>
                        <td class="line_lb" id="kpi_mnt_scrScore" style="align:center;">
                        </td>
                    </tr>
                    <tr>
                        <td class="line_b" title="상담품질 개선을 위한 교육 및 기타 활동" style="cursor : pointer;">
                            <span>
                                &nbsp;상담품질 개선활동
                            </span>
                        </td>
                        <td class="line_lb" title="2회 이상 10점   1회 이상 7점   0회 4점" style="cursor : pointer;">
                            &nbsp;월 2회 이상
                        </td>
                        <td class="line_lb">
                            <input type="text" class="text_ol_60" id="kpi_imp_act" maxlength="6" onChange="calculate(8)">회
                        </td>
                        <td class="line_lb" id="kpi_imp_actScore" style="align:center;">
                        </td>
                    </tr>
                    <tr>
                        <td class="line_b" title="상담 중 고객에게 잘못된 내용을 안내한 건 수" style="cursor : pointer;">
                            <span>
                                &nbsp;오상담 발생 건수
                            </span>
                        </td>
                        <td class="line_lb" title="0건 5점   2건 이하 3점   3건 이상 1점" style="cursor : pointer;">
                            &nbsp;0건
                        </td>
                        <td class="line_lb">
                            <input type="text" class="text_ol_60" id="kpi_miss_cnt" maxlength="6" onChange="calculate(9)">건
                        </td>
                        <td class="line_lb" id="kpi_miss_cntScore" style="align:center;">
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="line_rt" rowspan="2">
                            관리능력
                            (20%)
                        </td>
                        <td class="line_b" title="연간 상담사 수 대비 퇴직 인원 비율                      ※ 연간 퇴사인력 / 정원 X 100%" style="cursor : pointer;">
                            <span>
                                &nbsp;이직인원
                            </span>
                        </td>
                        <td class="line_lb" title="월 0인 10점   월 1인 7점   월 2인 이상 4점" style="cursor : pointer;">
                            &nbsp;0명
                            
                        </td>
                        <td class="line_lb">
                            <input type="text" class="text_ol_60" id="kpi_trans_job_rate" maxlength="6" onChange="calculate(10)">명
                        </td>
                        <td class="line_lb" id="kpi_trans_job_rateScore" style="align:center;">
                        </td>
                    </tr>
                    <tr>
                        <td class="line_b" title="상담업무 및 상담DB 개선 등 제반 기여도               콜센터 운영개선을 위한 제반 운영 노력도" style="cursor : pointer;">
                            <span>
                                &nbsp;업무개선 기여도 및 종합 경영 노력도
                            </span>
                        </td>
                        <td class="line_lb" title="자료 및 실적활용 정성평가" style="cursor : pointer;">
                            &nbsp;기타활동
                        </td>
                        <td class="line_lb">
                            <input type="text" class="text_ol_60" id="kpi_imp_job_rate" maxlength="6" onChange="calculate(11)">점
                        </td>
                        <td class="line_lb" id="kpi_imp_job_rateScore" style="align:center;">
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="line_rt" rowspan="4">
                            기타<br>
                            (가감항목)
                        </td>
                        <td class="line_b" title="공식적으로 접수된 칭찬 건 수" style="cursor : pointer;">
                            <span>
                                &nbsp;칭찬사례 접수
                            </span>
                        </td>
                        <td class="line_lb" title="4건 이상 10점   3건 9점   2건 6점   1건 3점   0건이하 0점" style="cursor : pointer;">
                            -
                        </td>
                        <td class="line_lb">
                            <input type="text" class="text_ol_60" id="kpi_praise_scr" maxlength="6" onChange="calculate(12)">건
                        </td>
                        <td class="line_lb" id="kpi_praise_scrScore" style="align:center;">
                        </td>
                    </tr>
                    <tr>
                        <td class="line_b" title="기타 전당 업무 지원 건 수 (아웃바운드 등)" style="cursor : pointer;">
                            <span>
                                &nbsp;업무지원도
                            </span>
                        </td>
                        <td class="line_lb" title="5건 이상 10점   4건 8점   3건 6점   2건 4점   1건 2점   0건 이하 0점" style="cursor : pointer;">
                            -
                        </td>
                        <td class="line_lb">
                            <input type="text" class="text_ol_60" id="kpi_job_sppt" maxlength="6" onChange="calculate(13)">건
                        </td>
                        <td class="line_lb" id="kpi_job_spptScore" style="align:center;">
                        </td>
                    </tr>
                    <tr>
                        <td class="line_b" title="상담사 불친절 등으로 발생한 민원 건 수" style="cursor : pointer;">
                            <span>
                                &nbsp;상담민원 발생 수
                            </span>
                        </td>
                        <td class="line_lb" title="4건 이상 -10점   3건 -9점   2건 -6점   1건 -3점   0건 이하 0점" style="cursor : pointer;">
                            -
                        </td>
                        <td class="line_lb">
                            <input type="text" class="text_ol_60" id="kpi_complain_rate" maxlength="6" onChange="calculate(14)">건
                        </td>
                        <td class="line_lb" id="kpi_complain_rateScore" style="align:center;">
                        </td>
                    </tr>
                    <tr>
                        <td class="line_b" title="상담 처리 기준에 벗어난 심각한 오상담 건 수" style="cursor : pointer;">
                            <span>
                                &nbsp;기타 오상담
                            </span>
                        </td>
                        <td class="line_lb" title="5건 이상 -10점   4건 -8점   3건 -6점   2건 -4점   1건 -2점   0건 이하 0점" style="cursor : pointer;">
                            -
                        </td>
                        <td class="line_lb">
                            <input type="text" class="text_ol_60" id="kpi_etc_miss_cnt" maxlength="6" onChange="calculate(15)">건
                        </td>
                        <td class="line_lb" id="kpi_etc_miss_cntScore" style="align:center;">
                        </td>
                    </tr>
                    <tr>
                        <td class="line_rt" colspan="4">
                            총점
                        </td>
                        <td class="line_rt" id="kpi_tot_score" style="align:center;">
                        </td>
                    </tr>
                </table>    
            </div>

            <!-- 개인정보테이블 -->
            <table class="profile_tbl" style="border-style: none;">
            </table><!--"개인정보테이블"-->
            </div>
        </div><!--"BODY"-->
        <table id="kpi_fileadd" style="display:none">
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