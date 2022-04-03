<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
 
<!DOCTYPE html>
 
<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>일일업무현황</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		 
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/statistics/counselingCntDay.js'/>"></script>
		 
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.css" type="text/css"/>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.js'/>"></script>
		
		<!-- Sheet JS -->
		<script type="text/javascript" src="<c:url value='/resources/js/lib/xlsx.full.min.js'/>"></script>
		
		<base target="_self">
	</head>
 
 
	<body>
		<div id="h1">순천시3114온누리콜센터 일일업무현황</div>
		<div id="pop_body" style = "height: 1180px; ">
 
			<div id="search">
				<table class="search_tbl">
					<tr>
 
						<th style = "width: 50px; padding-right : 15px">
							<label>조회일자</label>
						</th>
						<td style = "width: 350px; "> 
							<input type="text" class="text_Date" id="cslCntD_schDay"  /> 
						</td>
						
						<td>
				            <input type="checkbox" id="cslCntD_chkHoliday" name="" class="checkbox">
				            <label for="chkHoliday">주말 제외</label>
			            </td>
 
						<td class="btn">
			                <button type="button" id="cslCntD_btnStsDaySearch" class="button">조회</button>                 
			                <button type="button" id="cslCntD_btnStsDayInit" class="button">초기화</button>
			                <button type="button" id="cslCntD_btnStsDayAllExcel" class="button">엑셀다운로드</button>
<!-- 			                <button type="button" id="cslCntD_btnStsDaySave" class="button">수정</button> -->
<!-- 			                <button type="button" id="cslCntD_btnStsDayPrint" class="button">출력</button> -->
<!-- 			                <button type="button" id="cslCntD_btnStsDayBatch" class="button_4">데이타가져오기</button> -->
           				</td> 
					</tr>
				</table>
	</div><!--"조회/검색"-->
 
<!-- 	<div style="padding-top: 7px;"> -->
<!-- 		<input type="hidden" class="text_Date" id="cslCntD_tdate"  /> -->
<!-- 		<div style="width: 40%; float: left;"><b>조회기준일 : <span id='cslCntD_tday'></span></b>/<b>전월동요일 : <span id='cslCntD_yday'></span></b></div> -->
<!-- 		<div style="width: 60%; text-align: right; color: red; float: right;">* 데이타 가져오기 실행시 해당일자의 데이이타를 현재기준으로 재집계되오니 주의하시기 바랍니다.</div> -->
<!-- 	</div> -->
	<div style="width: 100%; overflow-x: scroll;">
 		<div class="stitle">1. 일일업무현황</div><!--"타이틀"-->
		<table class="statistics_tbl" id="cslCntD_tblStsCounselingCntDay" style="width:1900px;">
			<tr>
					<th class="line_rb_g" rowspan="3" style="width: 85px;">구분</th>
					
					<th class="line_rb_g" colspan="4">IVR</th>
					
					<th class="line_rb_g" colspan="7" >CTI(상담사 연결 큐 기준)</th>
					
					<th class="line_rb_g" colspan="12" style="width: 870px;">인/아웃바운드</th>

					<th class="line_rb_g" colspan="2">호전환</th>
					
					<th class="line_rb_g" colspan="3">콜백</th>
					
					<th class="line_rb_g" rowspan="3">SMS<br/>발송<br/>건수</th>
					
					<th class="line_rb_g" colspan="3">팩스</th>
			</tr>
			<tr>
					<th class="line_rb" rowspan="2">인입호</th>
					<th class="line_rb" rowspan="2">응답호</th>
					<th class="line_rb" rowspan="2">응답률<br/>(%)</th>
					<th class="line_rb" rowspan="2">포기호</th>
					 
					<th class="line_rb" rowspan="2">상담<br/>요청호</th>
					<th class="line_rb" rowspan="2">응답호</th> 
					<th class="line_rb" rowspan="2">응답률<br/>(%)</th>
					<th class="line_rb" rowspan="2">포기호</th>
					<th class="line_rb" rowspan="2">콜백</th>
					<th class="line_rb" rowspan="2">20초이내<br/>성공호</th>
					<th class="line_rb" rowspan="2">20초이내<br/>성공율(%)</th>
					
					<th class="line_rb" rowspan="2">인입호</th>
					<th class="line_rb" rowspan="2">응답호</th> 
					<th class="line_rb" rowspan="2">응답률<br/>(%)</th>
					<th class="line_rb" rowspan="2">포기호</th>
					<th class="line_rb" rowspan="2">총 통화<br/>시간</th>
					<th class="line_rb" rowspan="2">평균 통화<br/>시간</th>
					<th class="line_rb" rowspan="2">총 OB 성공호<br/>(콜백포함)</th>
					<th class="line_rb" rowspan="2">총 OB<br/>성공호</th>
					<th class="line_rb" rowspan="2">상담<br/>인원</th>
					<th class="line_rb_g" rowspan="2">CPH<br/>주1)</th>
					<th class="line_rb_g" rowspan="2">CPD<br/>주2)</th>
					<th class="line_rb" rowspan="2">총처리<br/>건수</th>
				 
					<th class="line_rb" rowspan="2">건수</th>
					<th class="line_rb" rowspan="2">비중(%)</th> 
					 
					<th class="line_rb" rowspan="2">접수</th>
					<th class="line_rb" rowspan="2">처리</th>
					<th class="line_rb" rowspan="2">처리율<br/>(%)</th> 
					
					<th class="line_rb_g" rowspan="2">송신</th>
					<th class="line_rb_g" colspan="2">수신</th>
			</tr>
			<tr>
					<th class="line_rb_g">성공</th>
					<th class="line_rb_g">실패</th>
			</tr> 
			
			<tr>
					<th class="line_rb">당일</th>
					<td class="line_rb_r" id="cslCntD_TD_ivr_in_call"></td>
					<td class="line_rb_r" id="cslCntD_TD_ivr_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_TD_ivr_ans_rate"></td>
					<td class="line_rb_r" id="cslCntD_TD_ivr_abnd_call"></td>
					
					<td class="line_rb_r" id="cslCntD_TD_cti_in_call"></td>
					<td class="line_rb_r" id="cslCntD_TD_cti_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_TD_cti_ans_rate"></td> 
					<td class="line_rb_r" id="cslCntD_TD_cti_abnd_call"></td>
					<td class="line_rb_r" id="cslCntD_TD_cti_callbck"></td>
					<td class="line_rb_r" id="cslCntD_TD_cti_sec20succ_call"></td>
					<td class="line_rb_r" id="cslCntD_TD_cti_sec20succ_rate"></td>
					
					
					<td class="line_rb_r" id="cslCntD_TD_in_call"></td>
					<td class="line_rb_r" id="cslCntD_TD_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_TD_ans_rate"></td>
					<td class="line_rb_r" id="cslCntD_TD_abnd_call"></td>
					<td class="line_rb_r" id="cslCntD_TD_tota_call_tm"></td>
					<td class="line_rb_r" id="cslCntD_TD_avrg_call_tm"></td>
					<td class="line_rb_r" id="cslCntD_TD_ob_succ_call_callback"></td>
					<td class="line_rb_r" id="cslCntD_TD_ob_succ_call"></td>
					<td class="line_rb_r" id="cslCntD_TD_cnsl_prsn"></td>
					<td class="line_rb_r" id="cslCntD_TD_cph"></td>
					<td class="line_rb_r" id="cslCntD_TD_cpd"></td>
					<td class="line_rb_r" id="cslCntD_TD_tota_act_scnt"></td>
					
					<td class="line_rb_r" id="cslCntD_TD_call_tntr_scnt"></td>
					<td class="line_rb_r" id="cslCntD_TD_call_tntr_rate"></td>
					
					<td class="line_rb_r" id="cslCntD_TD_callbck_rcv"></td>
					<td class="line_rb_r" id="cslCntD_TD_callbck_act"></td>
					<td class="line_rb_r" id="cslCntD_TD_callbck_act_rate"></td>
					
					<td class="line_rb_r" id="cslCntD_TD_sms_snd_scnt"></td>
					
					<td class="line_rb_r" id="cslCntD_TD_fax_snd_succ"></td>
					<td class="line_rb_r" id="cslCntD_TD_fax_snd_fail"></td>
					<td class="line_rb_r" id="cslCntD_TD_fax_rcv_succ"></td>
			</tr>
			
			<tr>
					<th class="line_rb">전일</th>
					<td class="line_rb_r" id="cslCntD_YD_ivr_in_call"></td>
					<td class="line_rb_r" id="cslCntD_YD_ivr_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_YD_ivr_ans_rate"></td>
					<td class="line_rb_r" id="cslCntD_YD_ivr_abnd_call"></td>
					
					<td class="line_rb_r" id="cslCntD_YD_cti_in_call"></td>
					<td class="line_rb_r" id="cslCntD_YD_cti_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_YD_cti_ans_rate"></td> 
					<td class="line_rb_r" id="cslCntD_YD_cti_abnd_call"></td>
					<td class="line_rb_r" id="cslCntD_YD_cti_callbck"></td>
					<td class="line_rb_r" id="cslCntD_YD_cti_sec20succ_call"></td>
					<td class="line_rb_r" id="cslCntD_YD_cti_sec20succ_rate"></td>
					
					
					<td class="line_rb_r" id="cslCntD_YD_in_call"></td>
					<td class="line_rb_r" id="cslCntD_YD_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_YD_ans_rate"></td>
					<td class="line_rb_r" id="cslCntD_YD_abnd_call"></td>
					<td class="line_rb_r" id="cslCntD_YD_tota_call_tm"></td>
					<td class="line_rb_r" id="cslCntD_YD_avrg_call_tm"></td>
					<td class="line_rb_r" id="cslCntD_YD_ob_succ_call_callback"></td>
					<td class="line_rb_r" id="cslCntD_YD_ob_succ_call"></td>
					<td class="line_rb_r" id="cslCntD_YD_cnsl_prsn"></td>
					<td class="line_rb_r" id="cslCntD_YD_cph"></td>
					<td class="line_rb_r" id="cslCntD_YD_cpd"></td>
					<td class="line_rb_r" id="cslCntD_YD_tota_act_scnt"></td>
					
					<td class="line_rb_r" id="cslCntD_YD_call_tntr_scnt"></td>
					<td class="line_rb_r" id="cslCntD_YD_call_tntr_rate"></td>
					
					<td class="line_rb_r" id="cslCntD_YD_callbck_rcv"></td>
					<td class="line_rb_r" id="cslCntD_YD_callbck_act"></td>
					<td class="line_rb_r" id="cslCntD_YD_callbck_act_rate"></td>
					
					<td class="line_rb_r" id="cslCntD_YD_sms_snd_scnt"></td>
					
					<td class="line_rb_r" id="cslCntD_YD_fax_snd_succ"></td>
					<td class="line_rb_r" id="cslCntD_YD_fax_snd_fail"></td>
					<td class="line_rb_r" id="cslCntD_YD_fax_rcv_succ"></td>
			</tr>
			
			<tr>
					<th class="line_rb">전일대비 증감</th>
					<td class="line_rb_r" id="cslCntD_TDYD_ivr_in_call"></td>
					<td class="line_rb_r" id="cslCntD_TDYD_ivr_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_TDYD_ivr_ans_rate"></td>
					<td class="line_rb_r" id="cslCntD_TDYD_ivr_abnd_call"></td>
					
					<td class="line_rb_r" id="cslCntD_TDYD_cti_in_call"></td>
					<td class="line_rb_r" id="cslCntD_TDYD_cti_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_TDYD_cti_ans_rate"></td> 
					<td class="line_rb_r" id="cslCntD_TDYD_cti_abnd_call"></td>
					<td class="line_rb_r" id="cslCntD_TDYD_cti_callbck"></td>
					<td class="line_rb_r" id="cslCntD_TDYD_cti_sec20succ_call"></td>
					<td class="line_rb_r" id="cslCntD_TDYD_cti_sec20succ_rate"></td>
					
					
					<td class="line_rb_r" id="cslCntD_TDYD_in_call"></td>
					<td class="line_rb_r" id="cslCntD_TDYD_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_TDYD_ans_rate"></td>
					<td class="line_rb_r" id="cslCntD_TDYD_abnd_call"></td>
					<td class="line_rb_r" id="cslCntD_TDYD_tota_call_tm"></td>
					<td class="line_rb_r" id="cslCntD_TDYD_avrg_call_tm"></td>
					<td class="line_rb_r" id="cslCntD_TDYD_ob_succ_call_callback"></td>
					<td class="line_rb_r" id="cslCntD_TDYD_ob_succ_call"></td>
					<td class="line_rb_r" id="cslCntD_TDYD_cnsl_prsn"></td>
					<td class="line_rb_r" id="cslCntD_TDYD_cph"></td>
					<td class="line_rb_r" id="cslCntD_TDYD_cpd"></td>
					<td class="line_rb_r" id="cslCntD_TDYD_tota_act_scnt"></td>
					
					<td class="line_rb_r" id="cslCntD_TDYD_call_tntr_scnt"></td>
					<td class="line_rb_r" id="cslCntD_TDYD_call_tntr_rate"></td>
					
					<td class="line_rb_r" id="cslCntD_TDYD_callbck_rcv"></td>
					<td class="line_rb_r" id="cslCntD_TDYD_callbck_act"></td>
					<td class="line_rb_r" id="cslCntD_TDYD_callbck_act_rate"></td>
					
					<td class="line_rb_r" id="cslCntD_TDYD_sms_snd_scnt"></td>
					
					<td class="line_rb_r" id="cslCntD_TDYD_fax_snd_succ"></td>
					<td class="line_rb_r" id="cslCntD_TDYD_fax_snd_fail"></td>
					<td class="line_rb_r" id="cslCntD_TDYD_fax_rcv_succ"></td>
			</tr>
			 
			<tr>
					<th class="line_rb">당월누계</th>
					<td class="line_rb_r" id="cslCntD_DMS_ivr_in_call"></td>
					<td class="line_rb_r" id="cslCntD_DMS_ivr_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_DMS_ivr_ans_rate"></td>
					<td class="line_rb_r" id="cslCntD_DMS_ivr_abnd_call"></td>
					
					<td class="line_rb_r" id="cslCntD_DMS_cti_in_call"></td>
					<td class="line_rb_r" id="cslCntD_DMS_cti_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_DMS_cti_ans_rate"></td> 
					<td class="line_rb_r" id="cslCntD_DMS_cti_abnd_call"></td>
					<td class="line_rb_r" id="cslCntD_DMS_cti_callbck"></td>
					<td class="line_rb_r" id="cslCntD_DMS_cti_sec20succ_call"></td>
					<td class="line_rb_r" id="cslCntD_DMS_cti_sec20succ_rate"></td>
					
					
					<td class="line_rb_r" id="cslCntD_DMS_in_call"></td>
					<td class="line_rb_r" id="cslCntD_DMS_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_DMS_ans_rate"></td>
					<td class="line_rb_r" id="cslCntD_DMS_abnd_call"></td>
					<td class="line_rb_r" id="cslCntD_DMS_tota_call_tm"></td>
					<td class="line_rb_r" id="cslCntD_DMS_avrg_call_tm"></td>
					<td class="line_rb_r" id="cslCntD_DMS_ob_succ_call_callback"></td>
					<td class="line_rb_r" id="cslCntD_DMS_ob_succ_call"></td>
					<td class="line_rb_r" id="cslCntD_DMS_cnsl_prsn"></td>
					<td class="line_rb_r" id="cslCntD_DMS_cph"></td>
					<td class="line_rb_r" id="cslCntD_DMS_cpd"></td>
					<td class="line_rb_r" id="cslCntD_DMS_tota_act_scnt"></td>
					
					<td class="line_rb_r" id="cslCntD_DMS_call_tntr_scnt"></td>
					<td class="line_rb_r" id="cslCntD_DMS_call_tntr_rate"></td>
					
					<td class="line_rb_r" id="cslCntD_DMS_callbck_rcv"></td>
					<td class="line_rb_r" id="cslCntD_DMS_callbck_act"></td>
					<td class="line_rb_r" id="cslCntD_DMS_callbck_act_rate"></td>
					
					<td class="line_rb_r" id="cslCntD_DMS_sms_snd_scnt"></td>
					
					<td class="line_rb_r" id="cslCntD_DMS_fax_snd_succ"></td>
					<td class="line_rb_r" id="cslCntD_DMS_fax_snd_fail"></td>
					<td class="line_rb_r" id="cslCntD_DMS_fax_rcv_succ"></td>
			</tr>
			
			<tr>
					<th class="line_rb">전월</th>
					<td class="line_rb_r" id="cslCntD_YM_ivr_in_call"></td>
					<td class="line_rb_r" id="cslCntD_YM_ivr_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_YM_ivr_ans_rate"></td>
					<td class="line_rb_r" id="cslCntD_YM_ivr_abnd_call"></td>
					
					<td class="line_rb_r" id="cslCntD_YM_cti_in_call"></td>
					<td class="line_rb_r" id="cslCntD_YM_cti_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_YM_cti_ans_rate"></td> 
					<td class="line_rb_r" id="cslCntD_YM_cti_abnd_call"></td>
					<td class="line_rb_r" id="cslCntD_YM_cti_callbck"></td>
					<td class="line_rb_r" id="cslCntD_YM_cti_sec20succ_call"></td>
					<td class="line_rb_r" id="cslCntD_YM_cti_sec20succ_rate"></td>
					
					
					<td class="line_rb_r" id="cslCntD_YM_in_call"></td>
					<td class="line_rb_r" id="cslCntD_YM_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_YM_ans_rate"></td>
					<td class="line_rb_r" id="cslCntD_YM_abnd_call"></td>
					<td class="line_rb_r" id="cslCntD_YM_tota_call_tm"></td>
					<td class="line_rb_r" id="cslCntD_YM_avrg_call_tm"></td>
					<td class="line_rb_r" id="cslCntD_YM_ob_succ_call_callback"></td>
					<td class="line_rb_r" id="cslCntD_YM_ob_succ_call"></td>
					<td class="line_rb_r" id="cslCntD_YM_cnsl_prsn"></td>
					<td class="line_rb_r" id="cslCntD_YM_cph"></td>
					<td class="line_rb_r" id="cslCntD_YM_cpd"></td>
					<td class="line_rb_r" id="cslCntD_YM_tota_act_scnt"></td>
					
					<td class="line_rb_r" id="cslCntD_YM_call_tntr_scnt"></td>
					<td class="line_rb_r" id="cslCntD_YM_call_tntr_rate"></td>
					
					<td class="line_rb_r" id="cslCntD_YM_callbck_rcv"></td>
					<td class="line_rb_r" id="cslCntD_YM_callbck_act"></td>
					<td class="line_rb_r" id="cslCntD_YM_callbck_act_rate"></td>
					
					<td class="line_rb_r" id="cslCntD_YM_sms_snd_scnt"></td>
					
					<td class="line_rb_r" id="cslCntD_YM_fax_snd_succ"></td>
					<td class="line_rb_r" id="cslCntD_YM_fax_snd_fail"></td>
					<td class="line_rb_r" id="cslCntD_YM_fax_rcv_succ"></td>
			</tr> 
			
			<tr>
					<th class="line_rb">전월누계</th>
					<td class="line_rb_r" id="cslCntD_YMS_ivr_in_call"></td>
					<td class="line_rb_r" id="cslCntD_YMS_ivr_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_YMS_ivr_ans_rate"></td>
					<td class="line_rb_r" id="cslCntD_YMS_ivr_abnd_call"></td>
					
					<td class="line_rb_r" id="cslCntD_YMS_cti_in_call"></td>
					<td class="line_rb_r" id="cslCntD_YMS_cti_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_YMS_cti_ans_rate"></td> 
					<td class="line_rb_r" id="cslCntD_YMS_cti_abnd_call"></td>
					<td class="line_rb_r" id="cslCntD_YMS_cti_callbck"></td>
					<td class="line_rb_r" id="cslCntD_YMS_cti_sec20succ_call"></td>
					<td class="line_rb_r" id="cslCntD_YMS_cti_sec20succ_rate"></td>
					
					
					<td class="line_rb_r" id="cslCntD_YMS_in_call"></td>
					<td class="line_rb_r" id="cslCntD_YMS_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_YMS_ans_rate"></td>
					<td class="line_rb_r" id="cslCntD_YMS_abnd_call"></td>
					<td class="line_rb_r" id="cslCntD_YMS_tota_call_tm"></td>
					<td class="line_rb_r" id="cslCntD_YMS_avrg_call_tm"></td>
					<td class="line_rb_r" id="cslCntD_YMS_ob_succ_call_callback"></td>
					<td class="line_rb_r" id="cslCntD_YMS_ob_succ_call"></td>
					<td class="line_rb_r" id="cslCntD_YMS_cnsl_prsn"></td>
					<td class="line_rb_r" id="cslCntD_YMS_cph"></td>
					<td class="line_rb_r" id="cslCntD_YMS_cpd"></td>
					<td class="line_rb_r" id="cslCntD_YMS_tota_act_scnt"></td>
					
					<td class="line_rb_r" id="cslCntD_YMS_call_tntr_scnt"></td>
					<td class="line_rb_r" id="cslCntD_YMS_call_tntr_rate"></td>
					
					<td class="line_rb_r" id="cslCntD_YMS_callbck_rcv"></td>
					<td class="line_rb_r" id="cslCntD_YMS_callbck_act"></td>
					<td class="line_rb_r" id="cslCntD_YMS_callbck_act_rate"></td>
					
					<td class="line_rb_r" id="cslCntD_YMS_sms_snd_scnt"></td>
					
					<td class="line_rb_r" id="cslCntD_YMS_fax_snd_succ"></td>
					<td class="line_rb_r" id="cslCntD_YMS_fax_snd_fail"></td>
					<td class="line_rb_r" id="cslCntD_YMS_fax_rcv_succ"></td>
			</tr>
			<tr>
					<th class="line_r">전월대비 증감</th>
					<td class="line_rb_r" id="cslCntD_TDYM_ivr_in_call"></td>
					<td class="line_rb_r" id="cslCntD_TDYM_ivr_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_TDYM_ivr_ans_rate"></td>
					<td class="line_rb_r" id="cslCntD_TDYM_ivr_abnd_call"></td>
					
					<td class="line_rb_r" id="cslCntD_TDYM_cti_in_call"></td>
					<td class="line_rb_r" id="cslCntD_TDYM_cti_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_TDYM_cti_ans_rate"></td> 
					<td class="line_rb_r" id="cslCntD_TDYM_cti_abnd_call"></td>
					<td class="line_rb_r" id="cslCntD_TDYM_cti_callbck"></td>
					<td class="line_rb_r" id="cslCntD_TDYM_cti_sec20succ_call"></td>
					<td class="line_rb_r" id="cslCntD_TDYM_cti_sec20succ_rate"></td>
					
					
					<td class="line_rb_r" id="cslCntD_TDYM_in_call"></td>
					<td class="line_rb_r" id="cslCntD_TDYM_ans_call"></td>
					<td class="line_rb_r" id="cslCntD_TDYM_ans_rate"></td>
					<td class="line_rb_r" id="cslCntD_TDYM_abnd_call"></td>
					<td class="line_rb_r" id="cslCntD_TDYM_tota_call_tm"></td>
					<td class="line_rb_r" id="cslCntD_TDYM_avrg_call_tm"></td>
					<td class="line_rb_r" id="cslCntD_TDYM_ob_succ_call_callback"></td>
					<td class="line_rb_r" id="cslCntD_TDYM_ob_succ_call"></td>
					<td class="line_rb_r" id="cslCntD_TDYM_cnsl_prsn"></td>
					<td class="line_rb_r" id="cslCntD_TDYM_cph"></td>
					<td class="line_rb_r" id="cslCntD_TDYM_cpd"></td>
					<td class="line_rb_r" id="cslCntD_TDYM_tota_act_scnt"></td>
					
					<td class="line_rb_r" id="cslCntD_TDYM_call_tntr_scnt"></td>
					<td class="line_rb_r" id="cslCntD_TDYM_call_tntr_rate"></td>
					
					<td class="line_rb_r" id="cslCntD_TDYM_callbck_rcv"></td>
					<td class="line_rb_r" id="cslCntD_TDYM_callbck_act"></td>
					<td class="line_rb_r" id="cslCntD_TDYM_callbck_act_rate"></td>
					
					<td class="line_rb_r" id="cslCntD_TDYM_sms_snd_scnt"></td>
					
					<td class="line_rb_r" id="cslCntD_TDYM_fax_snd_succ"></td>
					<td class="line_rb_r" id="cslCntD_TDYM_fax_snd_fail"></td>
					<td class="line_rb_r" id="cslCntD_TDYM_fax_rcv_succ"></td>
			</tr> 
		</table>
	</div>
 
	<div style="text-align: left; padding-top: 5px; padding-left: 7px;"><font style="color: blue;">주1) 1시간 1인당 응답호 : </font>총처리건수(인바운드 응답호 + 아웃바운드 성공호) / 상담인원 / 근무시간(8시간)</div>
	<div style="text-align: left; padding-top: 5px; padding-left: 7px;"><font style="color: blue;">주2) 1일 1인당 응답호 : </font>총처리건수(인바운드 응답호 + 아웃바운드 성공호) / 상담인원 </div>
	 
	<div style="width: 40%; margin-top: 10px; float:left;">
			<div class="stitle" >2. 처리유형별 상담실적</div><!--"타이틀"--> 
			<!-- 그리드테이블 --> 
			<div id = "cslCntD_dvGridAreaAct" style="padding-top: 27px; ">
				<table id="cslCntD_tblStsCounselingCntDayAct" ></table>
			</div>
			<!--"그리드테이블"-->
	</div>
 
	<div style="width: 59%; margin-top: 10px; float:right;">
		<div class="stitle"  >3. 상담유형별 현황</div><!--"타이틀"-->
			<!-- 그리드테이블 --> 
			<div id = "cslCntD_dvGridAreaCtg" style="padding-top: 27px; ">
				<table id="cslCntD_tblStsCounselingCntDayCtg" ></table>
			</div>
			<!--"그리드테이블"-->
	</div>
	
	<div style="width: 100%; margin-top: 10px; float: left;">
		<div class="stitle"  >4. 콜백처리 현황</div><!--"타이틀"-->
			<!-- 그리드테이블 --> 
			<div id = "cslCntD_dvGridAreaCallback" style="padding-top: 27px; ">
				<table id="cslCntD_tblStsCounselingCntDayCallback" ></table>
			</div>
			<!--"그리드테이블"-->
	</div>
	
	<div style="width: 100%; margin-top: 10px; float: left;">
		<div class="stitle"  >5. 시간대별 상담현황</div><!--"타이틀"-->
			<table id="cslCntD_tblStsCounselingCntDayTime" class="statistics_tbl" style="width:100%;">
				<tr>
					<th class="line_rb_g">구분</th>
					<th class="line_rb_g">9시 이전</th>
					<th class="line_rb_g">9시</th>
					<th class="line_rb_g">10시</th>
					<th class="line_rb_g">11시</th>
					<th class="line_rb_g">12시</th>
					<th class="line_rb_g">13시</th>
					<th class="line_rb_g">14시</th>
					<th class="line_rb_g">15시</th>
					<th class="line_rb_g">16시</th>
					<th class="line_rb_g">17시</th>
					<th class="line_rb_g">18시 이후</th>
					<th class="line_rb_g">합계</th>
				</tr>
				<tr>
					<th class="line_rb">건수</th>
					<td class="line_rb_r" id="day_H08"></td>
					<td class="line_rb_r" id="day_H09"></td>
					<td class="line_rb_r" id="day_H10"></td>
					<td class="line_rb_r" id="day_H11"></td>
					<td class="line_rb_r" id="day_H12"></td>
					<td class="line_rb_r" id="day_H13"></td>
					<td class="line_rb_r" id="day_H14"></td>
					<td class="line_rb_r" id="day_H15"></td>
					<td class="line_rb_r" id="day_H16"></td>
					<td class="line_rb_r" id="day_H17"></td>
					<td class="line_rb_r" id="day_H18"></td>
					<td class="line_rb_r" id="day_TOT_CNT"></td>						
				</tr>
			</table>
	</div>
 
 
	</div>
	</body>
</html>