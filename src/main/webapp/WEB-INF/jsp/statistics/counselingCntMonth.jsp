<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>운영 상담 현황</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		

		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/statistics/counselingCntMonth.js'/>"></script>
		
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.css" type="text/css"/>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-month-picker/MonthPicker.min.js'/>"></script>
		
		<!-- Sheet JS -->
		<script type="text/javascript" src="<c:url value='/resources/js/lib/xlsx.full.min.js'/>"></script>
		<base target="_self">
	</head>


	<body>
		<div id="h1">순천시3114온누리콜센터 운영상담현황</div>
		<div id="pop_body">

		<!--search start-->		
		<div id="search">
			<table class="search_tbl">
				<tr>
					<th style = "width: 50px; padding-right : 15px">
		            <label>조회기준</label>
					</th>
		            <td>
						<input type="text" class="text_Date" id="cslCntM_srcFrDate" maxlength="10"> ~ 
		                <input type="text" class="text_Date" id="cslCntM_srcToDate" maxlength="10" >
		            </td>	
		            
		            <td>
		            <input type="checkbox" id="cslCntM_chkHoliday" name="" class="checkbox">
		            <label for="chkHoliday">주말 제외</label>
		            </td>					
						
					<td class="btn">
		                <button type="button" id="cslCntM_btnSearch" class="button">조회</button>
		                <button type="button" id="cslCntM_btnExcelSave" class="button">엑셀저장</button>
		            </td>	
				</tr>
			</table>
		</div>
		<!--search end-->
		
		<div>	
			<!-- 콜현황 -->
			<div class="stitle" >콜 현황 (CTI 기준)</div><!--"타이틀"-->
			<table class="statistics_tbl" id='call_tbl' style="width:100%;">
				<tr>
					<th class="line_rb_g" rowspan="2" style="width: 180px;">구분</th>
					<th class="line_rb_g" colspan="4">I V R</th>
					<th class="line_rb_g" colspan="5">C T I</th>
				</tr>
				<tr>
					<th class="line_rb_g">인입호</th>
					<th class="line_rb_g">응답호</th>
					<th class="line_rb_g">응답률<br/>(%)</th>
					<th class="line_rb_g">포기호</th>
					<th class="line_rb_g">상담요청호</th>
					<th class="line_rb_g">응답호</th>
					<th class="line_rb_g">응답률<br/>(%)</th>
					<th class="line_rb_g">포기호</th>
					<th class="line_rb_g">콜백</th>
				</tr>
				<tr>
					<td class="line_rb_r" id="CALL_GB"></td>
					<td class="line_rb_r" id="CALL_IVR_IN"></td>
					<td class="line_rb_r" id="CALL_IVR_ANS"></td>
					<td class="line_rb_r" id="CALL_IVR_RATE"></td>
					<td class="line_rb_r" id="CALL_IVR_POGI"></td>
					<td class="line_rb_r" id="CALL_CTI_IN"></td>
					<td class="line_rb_r" id="CALL_CTI_ANS"></td>
					<td class="line_rb_r" id="CALL_CTI_RATE"></td>
					<td class="line_rb_r" id="CALL_CTI_POGI"></td>
					<td class="line_rb_r" id="CALL_CTI_CALLBACK"></td>
				</tr>
			</table>
			<!-- end -->
				
			<div class="stitle" style="margin-top: 10px;">이용 실적 종합 (일일평균 대비 )</div><!--"타이틀"-->
				
			<table class="statistics_tbl" id='result_tbl' style="width:100%;">
				<tr>
					<th class="line_rb_g" >구분</th>
						
					<th class="line_rb_g" id='result_year1'></th>
					<th class="line_rb_g" id='result_year2'></th>
				</tr>
				
				<tr>
					<th class="line_rb">전체건수</th>
						
					<td class="line_rb_r" id="result_tot_cnt1"></td>	
					<td class="line_rb_r" id="result_tot_cnt2"></td>
				</tr>						
				<tr>
					<th class="line_rb">일일평균</th>
						
					<td class="line_rb_r"  id="result_day_age_res1" ></td>
					<td class="line_rb_r"  id='result_day_age_res2' ></td>
				</tr>		
				
				<tr>
					<th class="line_r">전년대비 증가율</th>
						
					<td class="line_r_r"  id="result_with_rate1" ></td>
					<td class="line_r_r"  id='result_with_rate2' ></td>
				</tr>						
			</table>
			
			<!-- 상담유형별 현황 -->
			<div class="stitle" style="margin-top: 10px;">상담유형별 현황 : OB건수 제외(콜백건수 포함)</div><!--"타이틀"-->
				
			<table class="statistics_tbl" id='ctg_tbl' style="width:100%;">
				<tr>
					<th class="line_rb_g" id="ctg_nm0"></th>
					<th class="line_rb_g" id="ctg_nm1"></th>
					<th class="line_rb_g" id="ctg_nm2"></th>
					<th class="line_rb_g" id="ctg_nm3"></th>
					<th class="line_rb_g" id="ctg_nm4"></th>
					<th class="line_rb_g" id="ctg_nm5"></th>
					<th class="line_rb_g" id="ctg_nm6"></th>
					<th class="line_rb_g" id="ctg_nm7"></th>
					<th class="line_rb_g" id="ctg_nm8"></th>
					<th class="line_rb_g" id="ctg_nm9"></th>
				</tr>

				<tr>
					<td class="line_rb_r" id="ctg_cnt0"></td>
					<td class="line_rb_r" id="ctg_cnt1"></td>	
					<td class="line_rb_r" id="ctg_cnt2"></td>
					<td class="line_rb_r" id="ctg_cnt3"></td>
					<td class="line_rb_r" id="ctg_cnt4"></td>
					<td class="line_rb_r" id="ctg_cnt5"></td>
					<td class="line_rb_r" id="ctg_cnt6"></td>
					<td class="line_rb_r" id="ctg_cnt7"></td>
					<td class="line_rb_r" id="ctg_cnt8"></td>
					<td class="line_rb_r" id="ctg_cnt9"></td>
				</tr>
				<tr>
					<td class="line_rb_r"  id="ctg_rate0" ></td>
					<td class="line_rb_r"  id="ctg_rate1" ></td>
					<td class="line_rb_r"  id='ctg_rate2' ></td>
					<td class="line_rb_r"  id='ctg_rate3' ></td>
					<td class="line_rb_r"  id='ctg_rate4' ></td>
					<td class="line_rb_r"  id='ctg_rate5' ></td>
					<td class="line_rb_r"  id='ctg_rate6' ></td>
					<td class="line_rb_r"  id='ctg_rate7' ></td>
					<td class="line_rb_r"  id='ctg_rate8' ></td>
					<td class="line_rb_r"  id='ctg_rate9' ></td>
				</tr>
			</table>

			
			<!-- 시간대별 상담실적 -->
<!-- 			(<span id='cslCntM_holi_year'></span>)  -->
			<div class="stitle" style="margin-top: 10px;">시간대별 상담실적</div><!--"타이틀"-->
				
			<table class="statistics_tbl" id='holi_tbl' style="width:100%;">
				<tr>
					<th class="line_rb_g" >구분</th>
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
					<th class="line_rb_g">일평균</th>
				</tr>
				<tr>
					<th class="line_rb">건수</th>
					<td class="line_rb_r" id="holi_H08"></td>
					<td class="line_rb_r" id="holi_H09"></td>
					<td class="line_rb_r" id="holi_H10"></td>
					<td class="line_rb_r" id="holi_H11"></td>
					<td class="line_rb_r" id="holi_H12"></td>
					<td class="line_rb_r" id="holi_H13"></td>
					<td class="line_rb_r" id="holi_H14"></td>
					<td class="line_rb_r" id="holi_H15"></td>
					<td class="line_rb_r" id="holi_H16"></td>
					<td class="line_rb_r" id="holi_H17"></td>
					<td class="line_rb_r" id="holi_H18"></td>
					<td class="line_rb_r" id="holi_TOT_CNT"></td>						
					<td class="line_rb_r" id="holi_DAY_AVG"></td>
				</tr>
			</table>

			<!-- 처리유형별 현황  -->
			<div class="stitle" style="margin-top: 10px;">처리유형별 현황</div><!--"타이틀"-->
			<br/><br/>
			<table class="statistics_tbl" id='act_tbl' style="width:100%;">
			<!-- 
				<tr>
					<th class="line_rb_g" id="act_nm0"></th>
					<th class="line_rb_g" id="act_nm1"></th>
					<th class="line_rb_g" id="act_nm2"></th>
					<th class="line_rb_g" id="act_nm3"></th>
					<th class="line_rb_g" id="act_nm4"></th>
					<th class="line_rb_g" id="act_nm5"></th>
					<th class="line_rb_g" id="act_nm6"></th>
					<th class="line_rb_g" id="act_nm7"></th>
					<th class="line_rb_g" id="act_nm8"></th>
					<th class="line_rb_g" id="act_nm9"></th>
				</tr>
				
				<tr class='act_1'>
					<td class="line_rb_r" id="act_0_CNT1"></td>
					<td class="line_rb_r" id="act_1_CNT1"></td>	
					<td class="line_rb_r" id="act_2_CNT1"></td>
					<td class="line_rb_r" id="act_3_CNT1"></td>
					<td class="line_rb_r" id="act_4_CNT1"></td>
					<td class="line_rb_r" id="act_5_CNT1"></td>	
					<td class="line_rb_r" id="act_6_CNT1"></td>
					<td class="line_rb_r" id="act_7_CNT1"></td>						
					<td class="line_rb_r" id="act_8_CNT1"></td>
					<td class="line_rb_r" id="act_9_CNT1"></td>
				</tr>
				<tr class='act_1'>
					<td class="line_rb_r"  id="act_0_RATE1" ></td>
					<td class="line_rb_r"  id="act_1_RATE1" ></td>
					<td class="line_rb_r"  id='act_2_RATE1' ></td>
					<td class="line_rb_r"  id='act_3_RATE1' ></td>
					<td class="line_rb_r"  id="act_4_RATE1" ></td>
					<td class="line_rb_r"  id="act_5_RATE1" ></td>
					<td class="line_rb_r"  id='act_6_RATE1' ></td>
					<td class="line_rb_r"  id='act_7_RATE1' ></td>
					<td class="line_rb_r"  id="act_8_RATE1"></td>
					<td class="line_rb_r"  id="act_9_RATE1"></td>
				</tr>	
				 -->			
			</table>
		</div>
					
		</div>
	</body>
</html>