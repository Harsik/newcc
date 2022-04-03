<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>상담DB요청등록</title>
<link rel="icon" href="/resources/images/favicon.ico">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/myinfo.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.css" type="text/css" />
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/dext5editor/js/dext5editor.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-datetimepicker/jquery.datetimepicker.js'/>"></script>
<script type="text/javascript" src="<c:url value='/resources/js/myinfo/jisikDbManage.js'/>"></script>
	<!-- KukudocsEditor  -->
	<script type="text/javascript" src="<c:url value='/resources/KukudocsEditor/javascripts/build/Editor.bundle.js'/>"></script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/KukudocsEditor/stylesheets/style.css" type="text/css" />
<style>
#chargerJobCtns {
	background-color: rgba(239, 239, 239, 1);
}

textarea:disabled {
	background-color: rgba(239, 239, 239, 1);
}
</style>
</head>
<body>
	<input type="hidden" id="jisikd_ChargerUsrId">
	<input type="hidden" id="jisikd_ChargerOrgUsrId">
	<input type="hidden" id="jisikd_ChargerOrgFulNm">
	<input type="hidden" id="jisikd_OrgMobile">
	<input type="hidden" id="jisikd_ChargerDeptId">
	<input type="hidden" id="jisikd_ChargerOrgId">
	<input type="hidden" id="jisikd_CCAffairId">
	<input type="hidden" id="jisikd_CCAffairNm">
	<input type="hidden" id="jisikd_CCAffairMobile">
	<input type="hidden" id="jisikd_CCAffair">
	<div id="h1">상담DB요청등록</div>
	<div id="pop_body" style="height: 785px;">
		<input type="hidden" id="jisikd_ChargerJobChargerVal"> <input type="hidden" id="jisikd_chargerTblReqid"> <input type="hidden" id="jisikd_sendPopupReq" value=""> <input type="hidden" id="jisikd_sendPopupIngStat" value=""> <input type="hidden" id="jisikd_sendPopupRequSe" value=""> <input type="hidden" id="jisikd_sendPopupChageRea" value="">

		<div class="stitle">상담DB요청등록</div>
		<!-- 상단검색 -->
		<div id="search">
			<table class="search_tbl">
				<tr>
					<th style="width: 60px;">요청일자</th>
					<td colspan="2">
						<input type="text" class="text_Date" id="jisikd_chargerSrchSelFrDate" maxlength="10"> ~ <input type="text" class="text_Date" id="jisikd_chargerSrchSelToDate" maxlength="10">
					</td>

					<th style="width: 60px;">요청구분</th>
					<td>
						<select id="jisikd_chargerSrchRequstSe" class="select_bl"></select>
					</td>

					<th style="width: 60px;">DB구분</th>
					<td>
						<select id="jisikd_chargerSrchDbSe" class="select_bl">
						</select>
					</td>

					<th style="width: 60px;">처리상태</th>
					<td>
						<select id="jisikd_chargerSrchProgrsSttus" class="select_bl">
						</select>
					</td>
					<!-- 
					<td>
						<input type="checkbox" id="jisikd_chargerUse" style="float: right;">
					</td>
					<th style="width: 60px;">승인 포함</th> -->
					<td>
						<div class="btn" style="display: inline-block; float: right;">
							<button id="jisikd_chargerSrchSearch" class="button">조회</button>
							<button id="jisikd_chargerSrchInit" class="button">초기화</button>
						</div>
					</td>
				</tr>
			</table>
		</div>

		<!-- 그리드 -->
		<div style="margin-bottom: 15px; clear: both;">
			<table id="jisikd_tblChargerProcesstList"></table>
			<div id="jisikd_pgChargerProcesstList"></div>
		</div>
		<div class="reword_detail">
			<div class="stitle" style="margin-top: 9px;">요청사항 입력</div>
			<!-- 버튼 -->
			<div class="btn">
				<button type="button" id="jisikd_btnInsert" class="button">저장</button>
			</div>

			<form id="jisikd_writeForm" name="writeForm" action="/ajax/myinfo/jisikDbManage.do" method="post">
				<input type="hidden"id="jisikd_infosCommId"/>
				<table class="profile_tbl">
					<colgroup>
						<col style="width: 5%">
						<col style="width: 5%">
						<col style="width: 5%">
						<col style="width: 5%">
						<col style="width: 5%">
						<col style="width: 5%">
					</colgroup>

					<!-- <tr>
							<th class="line_rt">요청구분</th>
							<td class="line_b" colspan="3">
								<input type="radio" id="jisikd_counselDbNewRegist" class="radio" name="dbRegist" style="width:12px;" checked="checked"/><label for="counselDbNewRegist">신규요청</label> &nbsp;&nbsp;
								<input type="radio" id="jisikd_counselDbModifyRegist" class="radio" name="dbRegist" style="width:12px;"/><label for="counselDbModifyRegist">수정요청</label>&nbsp;&nbsp;
								<input type="radio" id="jisikd_counselDbDelete" class="radio" name="dbRegist" style="width:12px;"/><label for="counselDbDelete">삭제요청</label>&nbsp;&nbsp;
							</td>
							<th class="line_c">DB구분</th>
							<td class="line_b"><select id="jisikd_optGbKnd_sc" class="select_bl" style="width: 85px;"></select></td>			
							<th class="line_c">진행상태</th>													
							<td class="line_b"><select id="jisikd_progKndCd" style="width: 119px;"></select></td>		
						</tr>
												 -->
					<tr>
						<th class="line_rt">상담유형</th>
						<td class="line_b" style="width: 480px;" colspan="5">
							<select class="select_bl" id="jisikd_infosCounselKnd1" style="width: 16%;"></select>
							<select class="select_bl" id="jisikd_infosCounselKnd2" style="width: 24%;"></select>
							<select class="select_bl" id="jisikd_infosCounselKnd3" style="width: 48%;"></select>
							<%--<select class="select_bl" id="jisikd_infosCounselKnd4" style="width: 28%;" disabled="disabled"></select>--%>
						</td>
					</tr>
					<tr>
						<th class="line_c">처리상태</th>
						<td class="line_b">
							<select id="jisikd_progKndCd" style="width: 119px;"></select>
						</td>

						<th class="line_c">요청구분</th>
						<td class="line_b">
							<select class="select_bl" id="jisikd_infosCommNew" style="width: 117px;">
							</select>
						</td>

						<th class="line_c">DB구분</th>
						<td class="line_b">
							<select id="jisikd_infosGbKnd" style="width: 119px;"></select>
						</td>
					</tr>
					<tr>
						<th class="line_rt">제목</th>
						<td class="line_b" colspan="5">
							<input class="text_ol" id="jisikd_infosCommTtl" />
						</td>
					</tr>
					<%-- <tr>
						<th class="line_rt">상담유형</th>
						<td class="line_b" colspan="5" style="padding-right: 2px;">
							<select id="jisikd_optCounselKnd1_sc" class="select_bl" style="width: 22%;"></select>
							<select id="jisikd_optCounselKnd2_sc" class="select_bl" style="width: 23%;"></select>
							<select id="jisikd_optCounselKnd3_sc" class="select_bl" style="width: 25%;"></select>
							<select id="jisikd_optCounselKnd4_sc" class="select_bl" style="width: 131px;"></select>
						</td>
					</tr> --%>

					<!-- <tr>
						<th class="line_rt">유형검색</th>
						<td class="line_b" colspan="5">
							<input type="text" id="jisikd_tfLgMdSmSearch_01" class="text_ol" placeholder="상담유형 소분류 검색어를 입력해 주세요!" style="width: 515px; background-color: #d9f2ff;">
						</td>
					</tr>
					<tr>
						<th class="line_rt">제목</th>
						<td class="line_b" colspan="5">
							<input type="text" id="jisikd_taCommTtl" class="text_ol" style="width: 515px;">
						</td>
					</tr> -->
					<tr>
						<th class="line_rt">요청내용</th>
						<td class="line_b" colspan="5" id="jisikd_taCommCntn" style="height: auto;"></td>
					</tr>

					<tr>
						<th class="line_rt">처리내용</th>
						<td class="line_b" colspan="5">
							<textarea class="text_ol" id="jisikd_infosRespCntn" style="width: 100%; height: 100%;" readonly="readonly" disabled="disabled"></textarea>
						</td>
					</tr>

					<tr>
						<th class="line_rt">담당부서</th>
						<td colspan="3" class="line_b" style="padding-right: 8px;">
							<input type="text" id="jisikd_MnnstDept" class="text_ol" placeholder="담당부서 서무를 지정해주세요." style="width: 88%;" />
							<img src="/resources/images/search_img.png" id="jisikd_cntrSearch" class="icon_comm" alt="찾기" width="20" height="20" />
						</td>

						<th class="line_c">담당자</th>
						<td class="line_b" id="jisikd_Charger" style="text-align: center;"></td>
					</tr>
					<tr>
						<th class="line_rt">첨부</th>
						<td class="line_b" colspan="5" style="height: 81px; vertical-align: top;">
							<table id="jisikd_hisFileInfos" style="width: 100%;">
								<!-- <tr>
									<td colspan="4">
										<input type="hidden" name="record_XXX" value=""> 
										<input type="file" id="jisikd_HISMANUAL" name="MANUAL" style="width: 80%;">
									</td>
									<td>
										<img src="/resources/images/btn_del.png" alt="삭제" class="icon_add" id="jisikd_rmHisFilebox" style="cursor: pointer;"> 
										<img src="/resources/images/btn_fileadd.png" onClick="addHisFileBox()" alt="파일폼추가" class="icon_add" style="cursor: pointer;">
									</td>
								</tr> -->
							</table>
						</td>
					</tr>
					</table>
			</form>
		</div>
		<%--  <!-- 하단 상세 내역 -->
	  <div id="jisikd_chargerJobChargerAppn" class="reword_detail">
	    
	      <div class="stitle">업무담당자 지정</div>
	  	  <!-- 버튼 -->
	    <button type="button" id="jisikd_chargerJobBtnDbNewSr" class="button" style="display: inline-block; margin-left:5px; float: right; margin-bottom: 5px;">DB신규등록</button>
	    <table class="profile_tbl">
	       <colgroup>
	        <col width="130px"/>
	        <col width="130px"/>
	        <col width="130px"/>
	        <col width="130px"/>
	        <col width="130px"/>
	        <col width="130px"/>
	        <col width="130px"/>
	        <col width="130px"/>
	      </colgroup> 
	      <tr>
	        <th class="line_rt">요청구분</th>
	        <!-- <td style="width: 400px;" id="jisikd_chargerJobRequstSe" class="line_b"></td> -->
	        <td style="width: 200px;" id="jisikd_chargerJobRequstSe" class="line_b"></td>
	        <th class="line_rt">승인구분</th>
	        <td class="line_b">
	        <select id="jisikd_rewordUse" class="select_bl">
		        	<option value="all">전체</option>
		        	<option value="Y">승인</option>
		        	<option value="N">미승인</option>
	        </select>
	        </td>
		        
	        <th class="line_c">DB구분</th>
	        <td class="line_b"><select id="jisikd_chargerJobDbSe" class="select_bl" disabled="disabled"></select></td>						
	        
	        <th class="line_c">요청자</th>
	        <td id="jisikd_chargerJobRqester" class="line_b"></td>						
	      </tr>
	      <tr>
	        <th class="line_rt">상담유형</th>
	        <td colspan="7" id="jisikd_chargerJobCnsltTy" class="line_b"></td>
	      </tr>
	      <tr>
	        <th class="line_rt">제목</th>
	        <td colspan="7" id="jisikd_chargerJobCnsltTy2" class="line_b"></td>
	      </tr>
	      
	      <tr>
	        <th class="line_rt" style="height: 110px;">요청내용</th>
	        <td colspan="7" class="line_b">
	        <div id="jisikd_chargerJobCtns" style="height: 100px; width:100%; padding:5px; overflow-y:scroll; border: 1px solid rgba(186, 185, 185, 1);"></div> 
	        </td>
	      </tr>
	      
	       <tr>
	        <th class="line_rt">처리상태</th>
	        <td  class="line_b" colspan="7">
	          <input type="radio" class="radio" name="Vchargerradio" id="jisikd_VchargerJobRcept" value="010100" style="width:12px;">콜센터접수
	          <input type="radio" class="radio" name="Vchargerradio" id="jisikd_VDchargerJobProcess" value="020100" style="width:12px;">처리중
	          <input type="radio" class="radio" name="Vchargerradio" id="jisikd_VchargerJobCompt" value="030100" style="width:12px;">처리완료
	          <input type="radio" class="radio" name="Vchargerradio" id="jisikd_VchargerJobRetrn" value="020200" style="width:12px;">반송
	          <button type="button" id="jisikd_chargerJobBtnRequstHis" class="button" style="display: inline-block; margin-left: 50px;">이력보기</button>
	       </td>
	      </tr>
	      
	      <tr>
	        <th class="line_rt">처리내용</th>
	        <td colspan="7" style="width: 100%; height: 62px;" class="line_b">
	        <textarea id="jisikd_chargerJobProcessCtns" class="text_ol" style="height: 55px;" ></textarea>
	        </td>
	      </tr>
	      
	      <tr>
	        <th class="line_rt">처리상태변경</th>
	        <td colspan="2" class="line_b">
	          <input type="radio" class="radio" name="chargerradio" id="jisikd_chargerJobProcess" style="width:12px;"><label for="chargerJobProcess">처리중</label>
	          <input type="radio" class="radio" name="chargerradio" id="jisikd_chargerJobCompt" style="width:12px;"><label for="chargerJobCompt">완료</label>
	          <input type="radio" class="radio" name="chargerradio" id="jisikd_chargerJobRetrn" style="width:12px;"><label for="chargerJobRetrn">반송</label>
	          <button type="button" id="jisikd_chargerJobBtnInsert" class="button" style="margin-left:10px;">저장</button>
	          <button type="button" id="jisikd_chargerJobBtnDbNew" class="button" style="display: inline-block; margin-left:5px;">DB신규등록</button>
		 	  <button type="button" id="jisikd_chargerJobBtnDbRegist" class="button" style="display: inline-block; margin-left:5px;">DB수정등록</button>	
	        </td>
	        
	        <th class="line_c">반송사유</th>
	        <td colspan="4" class="line_b" style="height: 21px;">
	        <input style="width: 99%;" id="jisikd_chargerJobPrvonsh" class="text_ol" placeholder="반송사유를 입력해주세요.">
	        </td>
	      </tr>
	
	      <tr>
	        <th class="line_rt">첨부파일</th>
	        <td colspan="7" style="height: 69px;" class="line_b">
	          <table id="jisikd_chargerJobAtchFile" style="width: 50%; margin: -5px 0;"></table>
	        </td>
	      </tr>
	    </table>
	  </div> --%>
	</div>

	<table id="jisikd_hisfileadd" style="display: none">
		<tr>
			<td colspan="4">
				<input type="hidden" name="record_XXX" value="" /> <input type="file" id="HISMANUAL" name="HISMANUAL" style="width: 80%;" />
			</td>
			<td>
				<img src="/resources/images/btn_del.png" onClick="removeHisFileBox(XXX)" class="icon_add" style="cursor: pointer;" alt="취소" />
			</td>
		</tr>
	</table>
</body>
</html>