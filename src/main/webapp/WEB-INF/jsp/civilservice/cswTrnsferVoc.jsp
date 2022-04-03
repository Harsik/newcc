<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="<c:url value='/resources/js/civilservice/cswTrnsferVoc.js'/>"></script>

			<!-- 상담DB 요청관리 TAB -->
			<div id="search_el" >
				<div class="s_item">
					<div id="cstrvc_TrnsferVocTab" class="left_tab_top_sm" style="height: 870px;">					
						<ul>
							<li><a href="#cstrvc_VocDeptReceiptTab" style="background-color: #E5E5E5;">부서민원</a></li>
							<li><a href="#cstrvc_VocChargerProcessTab" style="background-color: #E5E5E5;">나의민원</a></li>
							<li><a href="#cstrvc_VocStatisticsTab" style="background-color: #E5E5E5;">통계현황</a></li>
						</ul>
				<!-- div 부서접수목록 -->
						<div id="cstrvc_VocDeptReceiptTab" style="display: block;">
							<%@include file="cswVocDeptReceipt.jsp" %>
						</div>
				<!-- div 담당자 처리목록 -->
						<div id="cstrvc_VocChargerProcessTab" style="display: block;">
							<%@include file="cswVocChargerProcess.jsp" %>
						</div>
				<!-- div 통계현황 -->
						<div id="cstrvc_VocStatisticsTab" style="display: block;">
							<%@include file="cswVocStatistics.jsp" %>
						</div>
					</div>
				</div>
			</div>