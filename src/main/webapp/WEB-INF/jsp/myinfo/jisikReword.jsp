<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	<title>상담DB요청</title>
	<link rel="icon" href="/resources/images/favicon.ico">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/popup.css" type="text/css"/>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/myinfo.css" type="text/css"/>	
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery.form.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/lib/dext5editor/js/dext5editor.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/resources/js/myinfo/jisikReword.js'/>"></script>
	<!-- KukudocsEditor  -->
	<script type="text/javascript" src="<c:url value='/resources/KukudocsEditor/javascripts/build/Editor.bundle.js'/>"></script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/KukudocsEditor/stylesheets/style.css" type="text/css" />
	 <style>
	 	input:-ms-input-placeholder  { color: #BDBDBD; }
	 	
	   .ui-autocomplete{
	    max-height: 100px;
	    overflow-y: auto;
	    /* prevent horizontal scrollbar */
	    overflow-x: hidden;
	  }

	  </style>
	</head>

<body>
 
<% 
	//String ExCd = request.getParameter("ExCd")==null?"all":request.getParameter("ExCd");
	String LgCd = request.getParameter("LgCd")==null?"all":request.getParameter("LgCd"); 
	String MdCd = request.getParameter("MdCd")==null?"all":request.getParameter("MdCd"); 
	String SmCd = request.getParameter("SmCd")==null?"all":request.getParameter("SmCd");
	
	String PopLv = request.getParameter("PopLv")==null?"CHILD":request.getParameter("PopLv"); 
	String CdbGb = request.getParameter("CdbGb")==null?"all":request.getParameter("CdbGb");
	String TbblTbl = request.getParameter("TbblTbl")==null?"":request.getParameter("TbblTbl");
// 	TbblTbl = new String(TbblTbl.getBytes("ISO-8859-1"), "UTF-8");
%>
	
	<c:set var="LgCd" value="<%=LgCd%>" />
	<c:set var="MdCd" value="<%=MdCd%>" />
	<c:set var="SmCd" value="<%=SmCd%>" />

	<c:set var="PopLv" value="<%=PopLv%>" />
	<c:set var="CdbGb" value="<%=CdbGb%>" />
	<c:set var="TbblTbl" value="<%=TbblTbl%>" />
	
	<%--<input type="hidden" id="jisikr_tfExCd" value="<%= ExCd %>" style="height: 0px;">--%>
	<input type="hidden" id="jisikr_tfLgCd" value="${LgCd }" style="height: 0px;">
	<input type="hidden" id="jisikr_tfMdCd" value="${MdCd }" style="height: 0px;">
	<input type="hidden" id="jisikr_tfSmCd" value="${SmCd }" style="height: 0px;">
	<input type="hidden" id="jisikr_tfPopLv" value="${PopLv }" style="height: 0px;">
	<input type="hidden" id="jisikr_tfCdbGb" value="${CdbGb }" style="height: 0px;">
  	<input type="hidden" id="jisikr_tfTbblTbl" value="${TbblTbl }" style="height: 0px;">
  
	<input type="hidden" id="jisikr_ChargerUsrId">
	<input type="hidden" id="jisikr_ChargerOrgUsrId">
	<input type="hidden" id="jisikr_ChargerOrgFulNm">
	<input type="hidden" id="jisikr_ChargerDeptId">
	<input type="hidden" id="jisikr_ChargerOrgId">
	<input type="hidden" id="jisikr_CCAffair">
	<input type="hidden" id="jisikr_tfResponTel">
  
	<div id="h1">상담DB요청</div>
	<div id="pop_body" style="height: 845px;">
		<div id="pop_left" style="float:left; width: 665px;">
			<!-- 상단검색 -->
			<div id="search2">
        	<table class="search2_tbl">	
				<colgroup>
					<col style="width:60px;">				
					<col style="width:34%">				
					<col style="width:100px;">				
					<col style="width:78px;">				
					<col style="width:60px;">				
				</colgroup>
				<tr>
					<th>제목검색</th>
					<td colspan="2">
						<input type="text" id="jisikr_tfSrchVal" class="text_ol" style="width:329px;"/>
					</td>
					<th>승인구분</th>
					<td>	
						<select id="jisikr_chkNotUsetype" class="select_bl" style="width: 95%;">
							<option value="all">전체</option>
							<option value="Y">승인</option>
							<option value="N">미승인</option>
							<!-- <option value="P">처리중</option> -->
						</select>
					</td>
					<td colspan="2">
						<button id="jisikr_btnSearch" class="button" style="margin-left: 91px;">조회</button>
					</td>
				</tr>
				<tr>
					<th>상담유형</th>
					<td colspan="4">
						<select id="jisikr_optCounselKnd1_srch" class="select_bl" style="width: 22%;"></select>
						<select id="jisikr_optCounselKnd2_srch" class="select_bl" style="width: 23%;"></select>
						<select id="jisikr_optCounselKnd3_srch" class="select_bl" style="width: 52%;"></select>
						<%--<select id="jisikr_optCounselKnd4_srch" class="select_bl" style="width: 26%;"></select>--%>
					</td>
					<th>DB구분</th>
					<td>
						<select id="jisikr_optGbKnd_srch" class="select_bl"></select>
					</td>
				</tr>
			</table>
			</div>

			<!-- 그리드 -->
			<div style="margin-bottom: 15px; clear: both;">
				<table id="jisikr_tblManualList"></table>
				<div id="jisikr_pgManualList"></div>
			</div>
			
			<div  class="reword_detail">
				<div class="stitle" style="margin-top: 9px;">
					요청사항 입력
				</div>
				<!-- 버튼 -->
				<div class="btn">
					<button type="button" id="jisikr_btnRequstHistSrch" class="button">요청이력조회</button>
					<button type="button" id="jisikr_btnInsert" class="button">저장</button>
					<button type="button" id="jisikr_btnInit" class="button">초기화</button>
				</div>
			
				<form id="jisikr_writeForm" name="writeForm" action="/ajax/management/jisikReword.do" method="post">
					<table  class="profile_tbl">
						<colgroup>
							<col style="width: 5%">
							<col style="width: 5%">
							<col style="width: 5%">
							<col style="width: 5%">
							<col style="width: 5%">
							<col style="width: 5%">
						</colgroup>
						
						<tr>
							<th class="line_rt">요청구분</th>
							<td class="line_b" colspan="3">
								<input type="radio" id="jisikr_counselDbNewRegist" class="radio" name="dbRegist" style="width:12px;" checked="checked"/><label for="counselDbNewRegist">신규요청</label> &nbsp;&nbsp;
								<input type="radio" id="jisikr_counselDbModifyRegist" class="radio" name="dbRegist" style="width:12px;"/><label for="counselDbModifyRegist">수정요청</label>&nbsp;&nbsp;
								<input type="radio" id="jisikr_counselDbDelete" class="radio" name="dbRegist" style="width:12px;"/><label for="counselDbDelete">삭제요청</label>&nbsp;&nbsp;
							</td>
							<th class="line_c">DB구분</th>
							<td class="line_b"><select id="jisikr_optGbKnd_sc" class="select_bl" style="width: 85px;"></select></td>
						</tr>
												
						<tr>
							<th class="line_rt">상담유형</th>													
							<td class="line_b" colspan="5" style="padding-right: 2px;">
								<select id="jisikr_optCounselKnd1_sc" class="select_bl" style="width: 22%;"></select>
								<select id="jisikr_optCounselKnd2_sc" class="select_bl" style="width: 23%;"></select>
								<select id="jisikr_optCounselKnd3_sc" class="select_bl" style="width: 25%;"></select>
								<%--<select id="jisikr_optCounselKnd4_sc" class="select_bl" style="width: 131px;"></select>--%>
							</td>
						</tr>

						<tr>
							<th class="line_rt">유형검색</th>													
							<td class="line_b" colspan="5">
							<input type="text" id="jisikr_tfLgMdSmSearch_01" class="text_ol" placeholder="상담유형 소분류 검색어를 입력해 주세요!" style="width: 515px; background-color:#d9f2ff;" >
							</td>
						</tr>
						<tr>
							<th class="line_rt">제목</th>													
							<td class="line_b" colspan="5">
							<input type="text" id="jisikr_taCommTtl" class="text_ol" style="width: 515px;">
							</td>
						</tr>
						<tr>
							<th class="line_rt">요청내용</th>													
							<td class="line_b" colspan="5" id="jisikr_taCommCntn">
							</td>
						</tr>
						
						<tr>
							<th class="line_rt">담당부서</th>													
							<td colspan="3" class="line_b" style="padding-right : 8px;">
							<input type="text" id="jisikr_MnnstDept" class="text_ol"  placeholder="담당부서 서무를 지정해주세요." style="width: 88%;"/>	
							<img src="/resources/images/search_img.png" id="jisikr_cntrSearch" class="icon_comm" alt="찾기" width="20" height="20"/>					
							</td>
							
							<th class="line_c">담당자</th>													
							<td class="line_b" id="jisikr_Charger" style="text-align: center;">
							</td>
						</tr>
						
						<tr>
							<th class="line_rt" style="height: 70px;">첨부파일</th>
							<td class="line_b" colspan="5" valign="top">
								<table id="jisikr_fileInfos">
									<tr>
										<td colspan="4">
											<input type="hidden" name="record_XXX" value="" />
											<input type="file" id="jisikr_MANUAL" name="MANUAL" />
										</td>
										<td>
											<img src="/resources/images/btn_del.png"  alt="삭제" id="jisikr_rmFilebox" class="icon_comm" />
										</td>
										<td>
											<img src="/resources/images/btn_fileadd.png"  onClick="addFileBox()" alt="파일폼추가" class="icon_comm" />
										</td>
									</tr>
								</table>
						</tr>

						<tr>
							<th class="line_rt">요청일시</th>													
							<td class="line_b" colspan="5" id="jisikr_RequstDate">
							</td>
						</tr>
					</table>
				</form>
			</div>	
		</div>
		
		<!-- 오른쪽 box -->		
		<div style="float:left; width: 1006px; margin-left: 8px;">			
		<div class="stitle">상담DB 상세</div>
			<div id="grid_all" class="divInner">
			<input type="hidden" id="jisikr_tfTbbsId" />
				<div id="jisikr_divContentTab">
					<table class="profile_tbl" style="width: 100%;">				
						<colgroup>
							<col  style="width: 3.5%"/>
							<col  style="width: 12%"/>
							<col  style="width: 3.5%"/>
							<col  style="width: 4%"/>
							<col  style="width: 3.5%"/>
							<col  style="width: 4%"/>
						</colgroup>
						<tr>
							<th class="line_rt" style="width: 6%">상담유형</th>
							<td class="line_b" colspan="3" style="padding-right: 0px; padding-left: 5px;">
								<select id="jisikr_optCounselKnd1" class="select_bl" style="width: 20%;" disabled="disabled"></select>
								<select id="jisikr_optCounselKnd2" class="select_bl" style="width: 22%;" disabled="disabled"></select>
								<select id="jisikr_optCounselKnd3" class="select_bl" style="width: 26%;" disabled="disabled"></select>
								<%--<select id="jisikr_optCounselKnd4" class="select_bl" style="width: 26%;" disabled="disabled"></select>--%>
							</td>
							<th class="line_c">DB구분</th>
							<td class="line_b">
							<select id="jisikr_optGbKnd" class="select_bl" style="width: 100%;" disabled="disabled"></select>
							</td> 
						</tr>

						<tr>
							<th class="line_rt" style="height: 30px;">제목</th>
							<td class="line_b" colspan="5" id="jisikr_tfTbbsTtl" style="width: auto;"></td> 
							
						
						
						<tr>
							<th class="line_rt">업무절차</th>													
							<td class="line_b" colspan="5" id="jisikr_taTbbsCntn">
							</td>
						</tr>

						<tr>
							<th class="line_rt">담당부서</th>
							<td class="line_b"  id="jisikr_tfCntrNm" colspan="1"></td>
				
							<th class="line_c">승인구분</th>
							<td class="line_b" colspan="3" id="jisikr_appr_yn" style="align:center;"></td>
				
						</tr>

						<tr>
							<th class="line_rt">담당자</th>
							<td class="line_b" colspan="1" id="jisikr_tfRespNm">
							</td>
								
							<th class="line_c" rowspan="4">첨부</th>
							<td class="line_b" colspan="3" rowspan="4" style=" height: 80px;">
								<table  id="jisikr_tblFiles" style="width: 100%;  word-break:break-all;"></table>
							</td>
						</tr>

						<tr>
							<th class="line_rt">전화번호</th>
							<td class="line_b" colspan="1" id="jisikr_tfRespTel"></td>
						</tr>
						
						<tr>
							<th class="line_rt">등록</th>
							<td class="line_b" colspan="1" id="jisikr_RsctDt"></td>
						</tr>
						
						<tr>
							<th class="line_rt">수정</th>
							<td class="line_b" colspan="1" id="jisikr_UpdtDt"></td>
						
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
	
<table id="jisikr_hisfileadd" style="display:none">
	<tr>
		<td colspan="4">
			<input type="hidden" name="record_XXX" value="" />
			<input type="file" id="jisikr_HISMANUAL" name="HISMANUAL" style="width: 80%;"/>
		</td>
		<td>
			<img src="/resources/images/btn_del.png" onClick="removeHisFileBox(XXX)" class="icon_add" style="cursor: pointer;" alt="취소" />
		</td>
	</tr>
</table>
</body>
</html>