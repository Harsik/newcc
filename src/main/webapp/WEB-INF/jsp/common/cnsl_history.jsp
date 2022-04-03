<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
			<div class="_icon">
				<div class="left_tab_top">
					<!-- <div class="left_tab_img" style="cursor: pointer;" id="divCnslTabMainBtn">상담이력</div> -->
					<div class="subject-icon">
						<img id="toggleCmd" src="<c:url value='/resources/images/icon_2.png'/>" alt="상담이력" />
					</div>
					<div class="subject">
						민원통화이력&nbsp;&nbsp;
						<button type="button" id="btnSendCmd" class="button">명령</button>
						<button type="button" id="btRegCmd" class="button">등록</button>
						<input type="text" class="text_ol" style="width: 400px;" id="tfMainExeFileName" value="C:\Windows\system32\SnippingTool.exe" alt="파일명" title="파일명">
					</div>
					<!-- <div class="left_tab_img_gray_l" style="cursor: pointer;" id="divCnslTabFaxBtn">이관이력</div> -->
					<!-- <div class="left_tab_img_gray_l" style="cursor: pointer;" id="divCnslTabNotCompleteBtn">미처리이력</div> -->
					<!-- <div class="left_tab_img_gray_l" style="cursor: pointer;" id="divCnslTabSMSBtn">SMS</div> -->
				</div>
			</div>
			<div class="kmain_tbl_list2">
				<!-- 그리드테이블 -->
				<div style="margin-top: 5px; display: block;" id="divCnslTabMain">
					<table id="tblCnslHistoryTabMain"></table>
					<div id="pagingCnslHistoryTabMain"></div>
				</div>
				<div style="margin-top: 5px; display: block;" id="divCnslTabNotComplete">
					<table id="tblCnslHistoryTabNotComplete"></table>
					<div id="pagingCnslHistoryTabNotComplete"></div>
				</div>
				<div style="margin-top: 5px; display: block;" id="divCnslTabFax">
					<table id="tblCnslHistoryTabFax"></table>
					<div id="pagingCnslHistoryTabFax"></div>
				</div>
				<div style="margin-top: 5px; display: block;" id="divCnslTabSMS">
					<table id="tblCnslHistoryTabSMS"></table>
					<div id="pagingCnslHistoryTabSMS"></div>
				</div>
				<!--"그리드테이블"-->
			</div>