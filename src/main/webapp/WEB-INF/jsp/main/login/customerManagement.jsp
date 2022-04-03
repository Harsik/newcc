<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/main/login/customerManagement.js"></script>
<div style="height: 500px; background-color: antiqueWhite; border-radius: 10px;">
	<div style="height: 4%;"></div>
	<div style="width: 96%; height: 10%; margin-left: 2%; text-align: right; border-radius: 10px; background-color: white">
		<label id="custMn_date" style="font-size: 3em; font-weight: bolder; font-family: 'Gamja Flower', cursive; margin-right: 2%;">2018년 12월 07일 사원실적</label>
	</div>
	<div style="height: 2%; font-weight: bolder; font-family: 'Gamja Flower', cursive; font-size: 2em; margin-left: 2%; vertical-align: bottom;"></div>
	<div style="margin: 1%; padding-left: 3%;">
		<div style="width: 45%; height: 90%; margin: 1%; text-align: center; vertical-align: top; display: inline-block; border-radius: 10px; background-color: white;">
			<img id="custMn_img_face" class="img_face" src="<c:url value='/resources/images/counselor.jpg'/>" />
		</div>
		<div style="width: 45%; height: 90%; margin: 1%; display: inline-block; border-radius: 10px;">
			<div style="width: 100%; text-align: center; border-radius: 10px; background-color: white;">
				<label id="custMn_usr_nm" style="font-size: 5em; font-weight: bolder; font-family: 'Gamja Flower', cursive;"></label>
			</div>
			<div style="text-align: right; margin: 2%;">
				<label id="custMn_sumcnt" style="font-weight: bolder; font-family: 'Gamja Flower', cursive; font-size: 4em; margin: 2%;">상담민원 총 0건</label> <br> <label id="custMn_etcnt" style="font-weight: bolder; font-family: 'Gamja Flower', cursive; font-size: 1em; margin: 2%;"></label>
			</div>
		</div>
	</div>
</div>