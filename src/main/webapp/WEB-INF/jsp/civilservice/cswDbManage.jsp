<%
// 공무원업무 > 상담DB요청 TAB
// @author  개발팀 정승현
// @since 2018.01.05
// 
//  << 설명(Explanation) >>
//  TAB 구분
 %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- <style type="text/css"> -->
<!-- 		input:-ms-input-placeholder  { color: #BDBDBD; } /*#BDBDBD;   -->
<!-- </style> -->

<script>
    //EL set queryString
    var sendingOuCode = '${param.ouCode}';
    var sendingUid = '${param.uid}';
    var sendingUName="";
    var sendingOu="";
    var sendingOuName="";
    var sendingUTelNum="";
    sendingOuCode = sendingOuCode.replace("&quot;",'');
    sendingUid = sendingUid.replace("&quot;",'');
</script>

<script type="text/javascript" src="<c:url value='/resources/js/civilservice/cswDbManage.js'/>"></script>

<!-- 상담DB 요청관리 TAB -->
<div id="csdbmg_CnsltDbProcessManageTabs" style="height: 870px;">
	<ul>
		<li><a href="#csdbmg_DivDeptRceptList" style="background-color: #E5E5E5;">부서접수목록</a></li>
		<li><a href="#csdbmg_DivChargerProcesstList" style="background-color: #E5E5E5;">나의처리목록</a></li>
		<li><a href="#csdbmg_DivStatsSttusList" style="background-color: #E5E5E5;">통계현황</a></li>
		<li><a href="#csdbmg_DivCnslDbSrchList" style="background-color: #E5E5E5;">상담DB조회</a></li>
	</ul>

	<!-- div 부서접수목록 -->
	<div id="csdbmg_DivDeptRceptList">
		<%@include file="cswDbManage_chargerAppn.jsp"%>
	</div>

	<!-- div 담당자 처리목록 -->
	<div id="csdbmg_DivChargerProcesstList">
		<%@include file="cswDbManage_process.jsp"%>
	</div>

	<!-- div 통계현황 -->
	<div id="csdbmg_DivStatsSttusList">
		<%@include file="cswDbManage_statistics.jsp"%>
	</div>
	
	<!-- 상담DB조회 전체목록 -->
	<div id="csdbmg_DivCnslDbSrchList">
		<%@include file="cswDbManage_dbSearch.jsp"%>
	</div>
</div>

