<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
			<div class="coustom_area">
				<div class="list1">
					<%@include file="/WEB-INF/jsp/common/custom_info.jsp" %>
					<input type="hidden" id="tfMainTicketId" value="" alt="상담관리번호" title="상담관리번호"/>
					<!-- 상담관리번호 -->
					<input type="hidden" id="tfMainResvTicketId" value="" alt ="통화예약관리번호" title ="통화예약관리번호"/>
					<!-- 통화예약관리번호 -->
					<input type="hidden" id="callBckMainId" value="" alt="콜백관리번호" title="콜백관리번호" />
					<!-- 콜백관리번호 -->
					<input type="hidden" id="callBckTicketId" value="" alt="콜백티켓번호" title="콜백티켓번호" />
					<!-- 콜백티켓번호 -->
					<input type="hidden" id="responsibleUsrId" value="" alt="처리 상담사ID" title="처리 상담사ID" />
					<!-- 처리 상담사ID -->
					<input type="hidden" id="regCallbckTargetUsrId" value="" alt="콜백대상상담사" title="콜백대상상담사" />
					<!-- 콜백대상상담사 -->
					<input type="hidden" id="tfRecId" value="" alt="녹취관리ID" alt="녹취관리ID" />
					<!-- 녹취관리ID -->
					<input type="hidden" id="tfMainTrnrRcvTeamCd" value="" alt="대상팀코드" title="대상팀코드" />
					<!-- 대상팀코드 -->
					<input type="hidden" id="tfMainTrnrRcvDeptCd" value="" alt="대상부서코드" title="대상부서코드" />
					<!-- 대상부서코드 -->
					<input type="hidden" id="tfMainExtAgencyId" value="" alt="외부기관" title="외부기관" />
					<!-- 외부기관  -->
					<input type="hidden" id="tfMainTransferOrg" value="" alt="호전환 조직구분" title="호전환 조직구분" />
					<!-- 호전환 조직구분 -->

					<!-- 이관민원 관련 정보  -->
					<input type="hidden" id="mainDeptCd" value="" alt="주관부서 코드" title="주관부서 코드" />
					<!-- 주관부서 코드 -->
					<input type="hidden" id="mainTeamCd" value="" alt="주관부서 팀코드" title="주관부서 팀코드" />
					<!-- 주관부서 팀코드  -->
					<input type="hidden" id="mainAffairUsrId" value="" alt="주관부서 서무 사용자 ID" title="주관부서 서무 사용자 ID" />
					<!-- 주관부서 서무 사용자 ID -->
					<input type="hidden" id="mainAffairUsrNm" value="" alt="주관부서 서무 사용자명" title="주관부서 서무 사용자명" />
					<!-- 주관부서 서무 사용자명 -->
					<input type="hidden" id="mainAffairTelNo" value="" alt="주관부서 서무 전화번호" title="주관부서 서무 전화번호" />
					<!-- 주관부서 서무 전화번호 -->
					<input type="hidden" id="mainAffairMobile" value="" alt="주관부서 서무 휴대폰" title="주관부서 서무 휴대폰" />
					<!-- 주관부서 서무 휴대폰 -->
					<input type="hidden" id="mainAffairYN" value="" alt="주관부서 서무 여부" title="주관부서 서무 여부"/>
					<!-- 주관부서 서무 여부 -->

					<input type="hidden" id="subDeptCd" value="" alt="보조부서 코드" title="보조부서 코드" />
					<!-- 보조부서 코드 -->
					<input type="hidden" id="subTeamCd" value="" alt="보조부서 팀코드" title="보조부서 팀코드" />
					<!-- 보조부서 팀코드  -->
					<input type="hidden" id="subAffairUsrId" value="" alt="보조부서 서무 사용자 ID" title="보조부서 서무 사용자 ID" />
					<!-- 보조부서 서무 사용자 ID -->
					<input type="hidden" id="subAffairUsrNm" value="" alt="보조부서 서무 사용자명" title="보조부서 서무 사용자명" />
					<!-- 보조부서 서무 사용자명 -->
					<input type="hidden" id="subAffairTelNo" value="" alt="보조부서 서무 전화번호" title="보조부서 서무 전화번호" />
					<!-- 보조부서 서무 전화번호 -->
					<input type="hidden" id="subAffairMobile" value="" alt="보조부서 서무 휴대폰" title="보조부서 서무 휴대폰" />
					<!-- 보조부서 서무 휴대폰 -->
					<!-- 이관민원 관련 정보  -->

					<%@include file="/WEB-INF/jsp/common/receipt_info.jsp" %>
				</div>
				<!-- ".list1"-->
			</div>