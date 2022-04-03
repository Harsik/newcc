<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<footer>
		<div class="btn_container" style="margin-left: 30px;">
			<div class="vCenter">
				<div class="item">
					<div class="campaign">통화</div>
				</div>
			</div>
		</div>
		<div class="btn_container">
			<div class="vCenter">
				<div class="item">
					<div class="ntot" style="cursor: pointer;" id="divUnderInOutCnt">0</div>
				</div>
			</div>
		</div>
		<div class="btn_container">
			<div class="vCenter">
				<div class="item">
					<div class="campaign">미완료</div>
				</div>
			</div>
		</div>
		<div class="btn_container">
			<div class="vCenter">
				<div class="item">
					<div class="ntot" style="cursor: pointer;" id="divUnderNotyetCnt">0</div>
				</div>
			</div>
		</div>
		<div class="btn_container">
			<div class="vCenter">
				<div class="item">
					<div class="rsv">통화예약</div>
				</div>
			</div>
		</div>
		<div class="btn_container">
			<div class="vCenter">
				<div class="item">
					<div class="rtot" style="cursor: pointer;" id="divUnderResvCnt">0</div>
				</div>
			</div>
		</div>

		<div class="btn_container">
			<div class="vCenter">
				<div class="item">
					<div class="non">쪽지</div>
				</div>
			</div>
		</div>
		<div class="btn_container">
			<div class="vCenter">
				<div class="item">
					<div class="rtot" style="cursor: pointer;" id="divUnderMessageCnt">0</div>
					<!-- 쪽지 -->
				</div>
			</div>
		</div>
		<!-- <div class="btn_container">
				<div class="vCenter">
					<div class="item">
						<div class="campaign">캠페인</div>
					</div>
				</div>
			</div> 
			<div class="btn_container">
				<div class="vCenter">
					<div class="item">
						<div class="rtot" style="cursor: pointer;" id="divUnderCmpgCnt">0</div>
					</div>
				</div>
			</div>-->
		<div class="btn_container">
			<div class="vCenter">
				<div class="item">
					<div class="campaign">SMS</div>
				</div>
			</div>
		</div>
		<div class="btn_container">
			<div class="vCenter">
				<div class="item">
					<div class="rtot" style="cursor: pointer;" id="divUnderComplaintCnt">0</div>
				</div>
			</div>
		</div>
		<div class="btn_container">
			<div class="vCenter">
				<div class="item">
					<div class="callback">콜백</div>
				</div>
			</div>
		</div>
		<div class="btn_container">
			<div class="vCenter">
				<div class="item">
					<div class="ctot" style="cursor: pointer;" id="divUnderCallbackCnt">0</div>
				</div>
			</div>
		</div>
		<div class="btn_container">
			<div class="vCenter">
				<div class="item">
					<div class="campaign">교육</div>
				</div>
			</div>
		</div>
		<div class="btn_container">
			<div class="vCenter">
				<div class="item">
					<div class="rtot" style="cursor: pointer;" id="divUnderCmpgCnt">0</div>
				</div>
			</div>
		</div>

		<div class="btn_container">
			<div class="vCenter">
				<div class="item">
					<div class="non">이관대기</div>
				</div>
			</div>
		</div>

		<div class="btn_container">
			<div class="vCenter">
				<div class="item">
					<div class="rtot" style="cursor: pointer;" id="civilComplaint">0</div>
				</div>
			</div>
		</div>

		<div class="btn_container">
			<div class="vCenter">
				<div class="item">
					<div class="line">
						<img src="<c:url value='/resources/images/line_footer.gif'/>" alt="" />
					</div>
				</div>
			</div>
		</div>
		<div class="btn_container">
			<div class="vCenter">
				<div class="item" style="width: 550px;">
					<div id="notice5" class="news" style="margin-top: 9px; padding-top: 0; position: relative;; zoom: 1;">
						<div class="open-event fl" style="width: 550px; margin: 1px 0 0 0; overflow: hidden; height: 18px;" id="scrollNoticeBar">
							<ul class="notice-list" id="mrqNoticeBar"></ul>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 
			<div class="btn_container" style="margin-left: 30px;">
				<div class="vCenter">
					<div class="item">
						<div class="aut" style="width: 100px;">
							<label for="spanUnderAutoRcv" style="cursor: pointer;">자동대기 : </label>
							<span class="color-yellow" style="cursor: pointer;" id="spanUnderAutoRcv">ON</span>
						</div>
					</div>
				</div>
			</div>
			<div class="btn_container">
				<div class="vCenter">
					<div class="item">
						<div class="non">IN</div>
					</div>
				</div>
			</div>
			<div class="btn_container">
				<div class="vCenter">
					<div class="item">
						<div class="ntot" style="cursor: pointer;" id="divUnderInboundCnt">0</div>
					</div>
				</div>
			</div>
			<div class="btn_container">
				<div class="vCenter">
					<div class="item">
						<div class="non">OUT</div>
					</div>
				</div>
			</div>
			<div class="btn_container">
				<div class="vCenter">
					<div class="item">
						<div class="ntot" style="cursor: pointer;" id="divUnderOutboundCnt">0</div>
					</div>
				</div>
			</div>
			<div class="btn_container">
				<div class="vCenter">
					<div class="item">
						<div class="non">통화시간</div>
					</div>
				</div>
			</div>
			<div class="btn_container">
				<div class="vCenter">
					<div class="item">
						<div class="ntot" style="cursor: pointer; width: 130px;" id="divUnderCallTimeCnt">00:00:00</div>
					</div>
				</div>
			</div>
			<div class="btn_container">
				<div class="vCenter">
					<div class="item">
						<div class="line">
							<img src="<c:url value='/resources/images/line_footer.gif'/>" alt=""/>
						</div>
					</div>
				</div>
			</div>
			<div class="btn_container">
				<div class="vCenter">
					<div class="item">
						<div class="non">미처리</div>
					</div>
				</div>
			</div>
			<div class="btn_container">
				<div class="vCenter">
					<div class="item">
						<div class="ntot" style="cursor: pointer;" id="divUnderNotyetCnt">0</div>
					</div>
				</div>
			</div>
			<div class="btn_container">
				<div class="vCenter">
					<div class="item">
						<div class="callback">콜백</div>
					</div>
				</div>
			</div>
			<div class="btn_container">
				<div class="vCenter">
					<div class="item">
						<div class="ctot" style="cursor: pointer;" id="divUnderCallbackCnt">0</div>
					</div>
				</div>
			</div>
			<div class="btn_container">
				<div class="vCenter">
					<div class="item">
						<div class="rsv">예약</div>
					</div>
				</div>
			</div>
			<div class="btn_container">
				<div class="vCenter">
					<div class="item">
						<div class="rtot" style="cursor: pointer;" id="divUnderResvCnt">0</div>
					</div>
				</div>
			</div>
			<div class="btn_container">
				<div class="vCenter">
					<div class="item">
						<div class="campaign">캠페인</div>
					</div>
				</div>
			</div>
			<div class="btn_container">
				<div class="vCenter">
					<div class="item">
						<div class="rtot" style="cursor: pointer;" id="divUnderCmpgCnt">0</div>
					</div>
				</div>
			</div>
			<div class="btn_container">
				<div class="vCenter">
					<div class="item">
						<div class="line">
							<img src="<c:url value='/resources/images/line_footer.gif'/>" alt=""/>
						</div>
					</div>
				</div>
			</div>
			<div class="btn_container">
				<div class="vCenter">
					<div class="item" style="width: 550px;">
						<div id="notice5" class="news" style="margin-top:7px; padding-top:0;">
							<div class="open-event fl" style="width:550px;">
								<ul class="notice-list" id="mrqNoticeBar">
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			-->
		<div class="btn_container_right_" style="margin-right: 50px;">
			<div class="vCenter">
				<div class="item">
					<div id="user_info">
						<label id="labMainTicktId"></label> 
						<label id="labMainStatusUserNm"></label> 
						<label>님</label>
						<label id="labMainRightDown1">(</label>
						<label id="labMainStatusExtnNo"></label>
						<label id="labMainRightDown2">)</label>
					</div>
				</div>
			</div>
		</div>
	</footer>