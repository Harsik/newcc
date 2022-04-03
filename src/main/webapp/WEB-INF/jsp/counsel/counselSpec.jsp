<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<title>상담이력상세</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.css" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/listenRec.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/counsel/counselSpec.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-rate-picker.js'/>"></script>
	</head>
	
	<body>
		<div id="h1">상담이력상세</div>
		<div id="pop_body">
			<!--타이틀-->
			<div class="stitle">
				상담이력상세    
			</div>
			<!--"타이틀"-->
    		<!--프로그램목록-->			
			<div id="grid_all">
				<!-- 버튼 테이블 -->
				<div id="btnControlCounsel">
					<table class="info_tbl_btn">
						<tr>
							<td>
								<button type="button" id="btnSmsSpecPopup" class="button">문자상세</button>
								<button type="button" id="btnSmsSendPopup" class="button">문자발신</button>
								<button type="button" id="btnListenRecPopup" class="button">청취</button>
								<button type="button" id="btnOutBoundCall" class="button">아웃바운드</button>
								<button type="button" id="btnUpdate" class="button">저장</button>
							</td>
						</tr>
					</table>
				</div>
				<!--"버튼 테이블"-->
			</div>
			<!-- 개인정보테이블 -->
			<input type="hidden" id="POPUP">
			<input type="hidden" id="tcktId">
			<input type="hidden" id="callBckId">
			<input type="hidden" id="custId">
			<input type="hidden" id="reqTcktId">
			<input type="hidden" id="oldActTypeCd">
			<input type="hidden" id="refId">
			<input type="hidden" id="callbackUsrId">
			<input type="hidden" id="rcvnUserId">
			<input type="hidden" id="trnrTeamCd">
			<input type="hidden" id="trnrDeptCd">
			<input type="hidden" id="extAgencyId">
			<input type="hidden" id="transferOrg">
			<input type="hidden" id="hidCallId">
			
			<!-- 호출된 팝업이 참조  -->
			<input type="hidden" id="histPopCallMe">
			
			<!-- 이관민원 관련  정보 -->
			<!-- 주관부서관련 -->
			<input type="hidden" id="cnslMainDeptCd" value="" />
			<input type="hidden" id="cnslMainTeamCd" value="" />
			<input type="hidden" id="cnslMainAffairUsrId" value="" />
			<input type="hidden" id="cnslMainAffairUsrNm" value="" />
			<input type="hidden" id="cnslMainAffairTelNo" value="" />
			<input type="hidden" id="cnslMainAffairMobile" value="" />
			<input type="hidden" id="cnslMainAffairYN" value="" />
			<!-- 보조부서 관련  -->
            <input type="hidden" id="cnslSubDeptCd" value="" />
            <input type="hidden" id="cnslSubTeamCd" value="" />
            <input type="hidden" id="cnslSubAffairUsrId" value="" />
            <input type="hidden" id="cnslSubAffairUsrNm" value="" />
            <input type="hidden" id="cnslSubAffairTelNo" value="" />
            <input type="hidden" id="cnslSubAffairMobile" value="" />
            <input type="hidden" id="cnslSubAffairYN" value="" />
            <!-- 이관민원 관련  정보 -->
			
            <!-- 이관민원 크게 보기 -->
			<input type="hidden" id="transfContSizeContinue" value="" />
            
			<!-- 콜백시도 -->
			<input type="hidden" id="callBackRetryCnt" value="" />
			
			<!--"개인정보테이블"-->
			<div id="counselComTable">
				<table class="profile_tbl">
					<tr>
						<td class="line_rt" id="rcvDtText">접수일시</td>
						<td class="line_b" id="rcvDt"></td>
						<td class="line_c">민원인</td>
						<td class="line_b">
							<label id="custNm"></label>
							<button type="button" id="btnTabCustSearch" class="button">수정</button>
						</td>
						<td class="line_c">민원인구분</td>
						<td class="line_b" id="cstType" >순천시민</td>
						<td class="line_c">민원인성향</td>
						<td class="line_b" id="cstComp"></td>
					</tr>
					<tr>
						<td class="line_rt" id="">통화구분 </td>
						<td class="line_b">
						<select class="select_bl" id="callGbCd"></select>
						</td>
						<td class="line_c">통화번호</td>
						<td class="line_b" id="cntctInform"></td>
						<td class="line_c">통화시간</td>
						<td class="line_b" id="callTime"></td>
						<td class="line_c">메모</td>
						<td class="line_b"><input type="text" class="text_ol" id="tfCounselMemo" disabled></td>
					</tr>
					<tr>
						<td class="line_rt">처리유형</td>
						<td class="line_b" style="padding-right:2px;">
							<select class="select_bl" id="actTypeCd" style="width: 58%;"></select>
						 	<select class="select_bl" id="actStCd" style="width: 37%;"></select>
						</td>
						<td class="line_c"></td>
						<td class="line_b"></td>
						<td class="line_c" id="tdkeyword"></td>
						<td class="line_b" >
							<span id="star_rating" style="display:none;"></span>
						</td>
						<td class="line_c">수정일시</td>
						<td class="line_b" id="modDt" style="padding: 0px;"></td> 
					</tr>
					<tr>
						<td class="line_rt" id="counselText"></td>
						<td class="line_b" >
						  	<input type="text" class="text_ol hidInput" id="tfResvDtm" />
							<input type="text" class="text_ol hidInput" id="tfRcvnTeamNm" />
							<input type="radio" id="rdoCnslImmediate" name="rdoCnslReq" value="010000" checked><label id="labRdoCnslImmediateText" for="rdoCnslImmediate" style="font-size: 9pt;">긴급</label>
							<input type="radio" id="rdoCnslSevenDays" name="rdoCnslReq" value="020000"><label id="labRdoCnslSevenDaysText" for="rdoCnslSevenDays" style="font-size: 9pt;">7일이내</label>
	
							<input type="text" class="text_ol hidInput" id="tfRcvnUsr" />
							<input type="text" class="text_ol hidInput" id="tfCnslClaimant" />
						</td>
						<td class="line_c" id="resvTelText"></td>
						<td class="line_b" >
							<input type="text" class="text_ol hidInput" id="tfResvTelNo" />
							<input type="text" class="text_ol hidInput" id="tfCnslClaimantPhoneNum" onkeydown="onlyNumber(this)" />
						</td>
						<td class="line_c" id="actCounselText"></td>
						<td class="line_b">
							<input type="text" class="text_ol hidInput" id="tfActCounselText" />
						</td>
						<td class="line_c" id="transfRsltText"></td>
						<td class="line_b">
							<input type="radio" id="rdoCnslYes" name="rdoCnslResult" value="Y" checked><label id="labRdoYesText" for="rdoCnslYes" style="font-size: 9pt;">수신</label>
							<input type="radio" id="rdoCnslNo" name="rdoCnslResult" value="N" ><label id="labRdoNoText" for="rdoCnslNo" style="font-size: 9pt;">거부</label>
						</td>
					</tr>
					<tr>
						<td class="line_rt">상담유형</td>
						<td class="line_b" colspan="7">
							<select class="select_bl" id="intvLgCd" style="width:200px;"></select>
							<select class="select_bl" id="intvMdCd" style="width:250px;"></select>
							<select class="select_bl" id="intvSmCd" style="width:300px;"></select>
						</td>
					</tr>
					<tr id="counselInfo">
						<td class="line_rt" style="height: 50px;">문의내용<br>
							<div id="cnslCopyCnslRcvCont" style="text-align:center;">
								<img style="cursor:pointer;" src="<c:url value='/resources/images/sel_dub_arrow.png'/>" id="copyCnslAttach"  alt="화살표">
							</div>
						</td>
						<td class="line_b"  colspan="3"><textarea class="area_ol" style="height:173px;" rows="8" id="rcvCont"></textarea></td>
						<td class="line_c" >답변내용 
							 <div id="cnslCopyTransferCont" style="text-align:center; margin-top: 3px;">
								 <img style="cursor:pointer;" src="<c:url value='/resources/images/sel_dub_arrow.png'/>" id="copyCnslAttach2"  alt="화살표">
								 <label id="labTransfCont" style="color:#98a5b3;font-weight: bold;"></label>
								 <img style="cursor:pointer; " src="<c:url value='/resources/images/cont_delete.png'/>" id="deleteCnslCont"  alt="삭제">
							</div>
							<button type="button" id="btnTransfCont" class="button" style="font-size: 11px;font-weight: normal;">이관내용&lt;</button>
						</td>
						<td class="line_b"  colspan="3">
							<textarea class="area_ol" style="height:173px;" id="actCont"></textarea>
							<br>
							<textarea class="area_ol hidInput" style="height:25px; margin-top:4px;" id="trnrMinCont"></textarea>
						</td>
					</tr>
					<tr id="TrMinwonProcStatus">
						<td class="line_rt">처리상태</td>
						<td class="line_b"><select class="select_bl" id="cnslMainProcSt"></select></td>
						<td class="line_c">처리일자</td>
						<td class="line_b" id="cnslMainProcDtm"></td>
						<td class="line_c">처리상태</td>
						<td class="line_b"><select class="select_bl" id="cnslSubProcSt"></select></td>
						<td class="line_c">처리일자</td>
						<td class="line_b" id="cnslSubProcDtm"></td>
					</tr>
					<tr id="minwonProcDeptInfo">
						<td class="line_rt" ><button type="button" id="btnCnslMainDepartmentSearch"  class="button" style="font-weight: normal;">이관부서1</button></td>
						<td class="line_b" colspan="3" nowrap>
							<input type="text" class="text_ol" style="width: 7px;" id="tfCnslMainDepartment" disabled>
							<input type="text" class="text_ol hidInput" style="width: 280px;" id="cnslMainUsr" placeholder="담당부서를 입력해 주세요!"/>
							&nbsp; &nbsp;
							<button type="button" id="btnMainHis" class="button">이력</button>
						</td>
						<td class="line_c">
						  	<button type="button" id="btnCnslSubDepartmentSearch" class="button" style="font-weight: normal;">이관부서2</button>
						</td>
						<td class="line_b" colspan="3" nowrap>
							<input type="text" class="text_ol" style="width: 7px;" id="tfCnslSubDepartment" disabled>
							<input type="text" class="text_ol hidInput" style="width: 310px;" id="cnslSubUsr" placeholder="복합민원 담당부서를 입력해 주세요!"/>
							&nbsp; &nbsp;
							<button type="button" id="btnSubHis" class="button">이력</button>
						</td>
					</tr>
						<tr id="minwonProcCont">
			            <td class="line_rt">처리민원1</td>
			            <td class="line_b" colspan="3">
			            	<textarea class="area_ol hidInput" style="height:17px;" id="cnslMainProcCont"></textarea>
			            </td>
			            <td class="line_c" >처리민원2</td>
			            <td class="line_b" colspan="3">
			            	<textarea class="area_ol hidInput" style="height:17px;" id="cnslSubProcCont"></textarea>
			            </td>
					</tr>
					<tr id="minwonRtnCont">
		                <td class="line_rt">반송사유</td>
		                <td class="line_b" colspan="3">
		                	<input type="text" class="text_ol hidInput" id="tfCnslMainRtnCont"/>                                
		                </td>
		                <td class="line_c">반송사유</td>
		                <td class="line_b" colspan="3">
		                	<input type="text" class="text_ol hidInput" id="tfCnslSubRtnCont"/>
		                </td>
					</tr>
				</table>
			</div>	
		</div>
		<!--"개인정보테이블"-->		
	</body>
</html>