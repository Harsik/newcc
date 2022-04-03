<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>

<html lang="ko">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
		<title>민원인병합관리</title>
		<link rel="icon" href="/resources/images/favicon.ico">
		<link rel="stylesheet" href="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.css'/>" type="text/css"/>
		<link rel="stylesheet" href="<c:url value='/resources/js/lib/jqgrid/css/ui.jqgrid.css'/>" type="text/css"/>
		<link rel="stylesheet" href="<c:url value='/resources/css/popup.css'/>" type="text/css"/>
		
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-2.1.1.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/lib/jquery-ui-custom/jquery-ui.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/common/common.js'/>"></script>
		<script type="text/javascript" src="<c:url value='/resources/js/management/custMergeManagement.js'/>"></script>
	</head>
	
	<body>
		<div id="h1">
			민원인병합관리
		</div>
		<div id="pop_body">
		<!-- 
		<div class="_icon">
			<div class="left_tab_img" style="cursor: pointer;" id="cstMrgMng_divMergeBtn">민원인병합</div>
			<div class="left_tab_img_gray" style="cursor: pointer;" id="cstMrgMng_divCancelBtn">병합해제</div>
		</div> -->
				<ul>
				<li><a href="#cstMrgMng_divMerge">민원인병합</a></li>
				<li><a href="#cstMrgMng_divCancel">병합해제</a></li>
				</ul>
			<!-- <div class="kmain_tbl_list" style="height: 750px;"> -->
				<div style="margin-top: 5px; display: block;" id="cstMrgMng_divMerge">
					<div class="stitle">
						민원인조회
					</div>
					<div id="search" style="height: 54px; margin-bottom: 10px;">
						<table class="search2_tbl">
							<tr>
								<th class="sel_80" style="width: 150px;">
									<label>
										일반, 핸드폰, 팩스번호
									</label>
								</th>
								<td class="nemo_50">
									<input type="text" class="text_ol keyDown" id="cstMrgMng_tfContact" maxlength="200">
								</td>
								<th class="sel_80" style="width: 90px;">
									<label>
										민원인명
									</label>
								</th>
								<td class="nemo_50">
									<input type="text" class="text_ol keyDown" style="width: 90%;" id="cstMrgMng_tfNm" maxlength="167">
								</td>
								<th>민원구분</th>
								<td class="sel_80">
									<select class="select_al" id="cstMrgMng_optCustmType" style="width: 80px;">
									</select>
								</td>
								<td class="btn">
									<button type="button" id="cstMrgMng_btnCustmSrch" class="button">조회</button>
									<button type="button" id="cstMrgMng_btnCustmInit" class="button">초기화</button>
								</td>
							</tr> 
							<tr>
								<th>메모</th>
								<td class="nemo">
									<input type="text" class="text_ol keyDown" id="cstMrgMng_tfMemo" maxlength="667">
								</td>
								<th>수정일</th>
								<td class="nemo_50">
									<input type="text" class="text_ol_half" id="cstMrgMng_tfModDtStr" readOnly>
									<label> ~ </label>
									<input type="text" class="text_ol_half" id="cstMrgMng_tfModDtEnd" readOnly>
								</td>
								<th>민원인성향</th>
								<td class="sel_80">
									<select class="select_al" id="cstMrgMng_optCustmComp" style="width: 80px;">
									</select>
								</td>
							</tr>
						</table>
					</div>
					<div id="grid_all" style="display: inline-block;">
						<div style="text-align: right; margin-bottom: 5px;">
							<button type="button" id="cstMrgMng_btnMergeTarget" class="button">병합기준등록</button>
							<button type="button" id="cstMrgMng_btnMergeSource" class="button">병합대상등록</button>
						</div>
						<div id="grid_all">
							<table id="cstMrgMng_tblCustList"></table>
							<div id="cstMrgMng_pgCustList"></div>
						</div>
					</div>
					<div style="width: 100%; margin-top: 20px;">
						<div style="width: 60%; float: left; display:inline-block;">
							<div class="stitle" style="display: ruby-base;">
								병합기준
							</div>
							<div style="text-align: right;">
								<button type="button" id="cstMrgMng_btnMergeRun" class="button">민원인병합</button>
							</div>
							<table class="profile_tbl">
								<tr>
									<td class="line_rt">
										민원인명
									</td>
									<td class="line_b">
										<input type="text" class="text_ol" id="cstMrgMng_tfDtCustmNm" maxlength="167" style="width: 93%;">
										<!-- <select id = "optDtGndr" style="width: 25%;"> </select>-->
									</td>
									<td class="line_c" rowspan="2">
										민원인성향
									</td>
									<td class="line_b" rowspan="2">
										<select class="select_bl" id="cstMrgMng_optDtCustmComp" style="margin-bottom: 3px;"></select>
										<select class="select_bl" id="cstMrgMng_optDtCustmComp2"></select>
									</td>
									<td class="line_c" rowspan="3">
										메모
									</td>
									<td class="line_b"rowspan="3">
										<textarea class="area_ol" style="height:90%;" id="cstMrgMng_tfDtMemo" maxlength="667"></textarea>
									</td>
								</tr>
								<tr>
									<td class="line_r">
										민원구분
									</td>
									<td class="line_b">
										<select class="select_bl" id="cstMrgMng_optDtCustmType">
										</select>
									</td>
								</tr>
								<tr>
									<td class="line_r">
										등록
									</td>
									<td class="line_b">
										<div>
											<label id="cstMrgMng_txtCrt"></label>
										</div>
									</td>
									<td class="line_c">
										수정
									</td>
									<td class="line_b">
										<div>
											<label id="cstMrgMng_txtMod"></label>
										</div>
									</td>
								</tr>
								<tr>
									<td class="line_rb">
										일반번호
									</td>
									<td class="line_wb">
										<input type="text" class="text_ol_60" id="cstMrgMng_tfDtTel" maxlength="200" style="width: 100%;">
									</td>
									<td class="line_rb2">
										핸드폰번호
									</td>
									<td class="line_wb">
										<input type="text" class="text_ol_60" id="cstMrgMng_tfDtMobile" maxlength="200" style="width: 100%;">
									</td>
									<td class="line_rb2">
										팩스번호
									</td>
									<td class="line_wb">
										<input type="text" class="text_ol_60" id="cstMrgMng_tfDtFax" maxlength="200" style="width: 100%;">
									</td>
								</tr>
							</table>
						</div>
						<div style="width: 38%; margin-left: 10px; display:inline-block;">
							<div class="stitle" style="display: ruby-base;">
								병합기준
							</div>
							<div id="grid_all" style="margin-bottom: 10px;">
								<table id="cstMrgMng_tblCustMergeTarget" style="margin-bottom: 10px;"></table>
							</div>
							<div class="stitle" style="display: ruby-base;">
								병합대상
							</div>
							<div style="text-align: right;">
								<button type="button" id="cstMrgMng_btnCustMergeDelete" class="button" style="margin-bottom: 5px;">대상삭제</button>
							</div>
							<div id="grid_all">
								<table id="cstMrgMng_tblCustMergeSource"></table>
							</div>
						</div>
					</div>
				</div>
				<div style="margin-top: 5px; display: block;" id="cstMrgMng_divCancel">
					<div class="stitle">
						민원인조회
					</div>
					<div id="search" style="height: 54px; margin-bottom: 10px;">
						<table class="search2_tbl">
							<tr>
								<th class="sel_80" style="width: 140px;">
									<label>
										일반, 핸드폰, 팩스번호
									</label>
								</th>
								<td class="nemo_50">
									<input type="text" class="text_ol keyDownRelease" id="cstMrgMng_tfContactRelease" maxlength="200">
								</td>
								<th class="sel_80" style="width: 90px;">
									<label>
										민원인명
									</label>
								</th>
								<td class="nemo_50">
									<input type="text" class="text_ol keyDownRelease" id="cstMrgMng_tfNmRelease" maxlength="167">
								</td>
								<th>민원구분</th>
								<td class="sel_80" style="width: 80px;">
									<select class="select_al" id="cstMrgMng_optCustmTypeRelease" style="width: 80px;"></select>
								</td>
								<th><!-- 병합기준 --></th>
								<td class="sel_80" style="width: 90px;">
									<!-- 
									<select class="select_al" id="optMergeCondRelease" style="width: 90px;">
										<option value="mergeTarget">병합후민원인</option>
										<option value="mergeSource">병합전민원인</option>
									</select> 
									-->
								</td>
								<td class="btn">
									<button type="button" id="cstMrgMng_btnCustmSrchRelease" class="button">조회</button>
									<button type="button" id="cstMrgMng_btnCustmInitRelease" class="button">초기화</button>
								</td>
							</tr> 
							<tr>
								<th>메모</th>
								<td class="nemo">
									<input type="text" class="text_ol keyDownRelease" id="cstMrgMng_tfMemoRelease" maxlength="667">
								</td>
								<th>수정일</th>
								<td class="nemo_50">
									<input type="text" class="text_ol_half" id="cstMrgMng_tfModDtStrRelease" readOnly>
									<label> ~ </label>
									<input type="text" class="text_ol_half" id="cstMrgMng_tfModDtEndRelease" readOnly>
								</td>
								<th>민원인성향</th>
								<td class="sel_80" style="width: 80px;">
									<select class="select_al" id="cstMrgMng_optCustmCompRelease" style="width: 80px;">
									</select>
								</td>
								<th></th>
								<td class="sel_80" style="width: 80px;">
								</td>
							</tr>
						</table>
					</div>
					<div id="grid_all" style="display: inline-block;">
						<div style="float: left; width: 49%; margin-right: 15px;">
							<div class="stitle" style="display: ruby-base;">
								병합후민원인
							</div>
							<div style="text-align: right; margin-bottom: 5px;">
								<button type="button" id="btnMergeRelease" class="button">병합해제</button>
							</div>
							<div id="grid_all">
								<table id="cstMrgMng_tblCustListTarget"></table>
								<div id="cstMrgMng_pgCustListTarget"></div>
							</div>
							<table class="profile_tbl">
								<tr>
									<td class="line_rt">
										민원인명
									</td>
									<td class="line_b">
										<input type="text" class="text_ol" id="cstMrgMng_tfDtCustmNmReleaseLeft" maxlength="167" style="width: 90%;" readonly>
										<!-- <select id="optDtGndrReleaseLeft" style="width: 25%;" disabled></select> -->
									</td>
									<td class="line_c" rowspan="2">
										민원인성향
									</td>
									<td class="line_b" rowspan="2">
										<select class="select_bl" id="cstMrgMng_optDtCustmCompReleaseLeft" style="margin-bottom : 3px;" disabled></select>
										<select class="select_bl" id="cstMrgMng_optDtCustmComp2ReleaseLeft" disabled></select>
									</td>
								</tr>
								<tr>
									<td class="line_r">
										민원구분
									</td>
									<td class="line_b">
										<select class="select_bl" id="cstMrgMng_optDtCustmTypeReleaseLeft" disabled>
										</select>
									</td>
								</tr>
								<tr>
									<td class="line_r">
										일반번호
									</td>
									<td class="line_b">
										<input type="text" id="cstMrgMng_tfDtLeftTel" class="text_ol_60" style="width: 100%;" readonly>
									</td>
									<td class="line_r" rowspan="3" style="border-bottom: none; border-left : 1px solid #98a5b3;">
										메모
									</td>
									<td class="line_b" rowspan="3" style="border-bottom: none;">
										<textarea class="area_ol" style="height:90%;" id="cstMrgMng_tfDtMemoReleaseLeft" maxlength="667" readonly></textarea>
									</td>
								</tr>
								<tr>
									<td class="line_r">
										핸드폰번호
									</td>
									<td class="line_b">
										<input type="text" id="cstMrgMng_tfDtLeftMobile" class="text_ol_60" style="width: 100%;" readonly>
									</td>
								</tr>
								<tr>
									<td class="line_r" style="border-bottom: none;">
										팩스번호
									</td>
									<td class="line_b" style="border-bottom: none;">
										<input type="text" id="cstMrgMng_tfDtLeftFax" class="text_ol_60" style="width: 100%;" readonly>
									</td>
								</tr>
							</table>
						</div>
						<div style="float: left; width: 49%;">
							<div class="stitle" style="display: ruby-base;">
								병합전민원인
							</div>
							<div style="text-align: right; margin-bottom: 5px; height: 20px;">
								&nbsp;
							</div>
							<div id="grid_all">
								<table id="cstMrgMng_tblCustListSource"></table>
								<div id="cstMrgMng_pgCustListSource"></div>
							</div>
							<table class="profile_tbl">
								<tr>
									<td class="line_rt">
										민원인명
									</td>
									<td class="line_b">
										<input type="text" class="text_ol" id="cstMrgMng_tfDtCustmNmReleaseRight" maxlength="167" style="width: 90%;" readonly>
										<!-- <select id="optDtGndrReleaseRight" style="width: 25%;" disabled></select> -->
									</td>
									<td class="line_c" rowspan="2">
										민원인성향
									</td>
									<td class="line_b" rowspan="2">
										<select class="select_bl" id="cstMrgMng_optDtCustmCompReleaseRight" style="margin-bottom : 3px;" disabled></select>
										<select class="select_bl" id="cstMrgMng_optDtCustmComp2ReleaseRight" disabled></select>
									</td>
								</tr>
								<tr>
									<td class="line_r">
										민원구분
									</td>
									<td class="line_b">
										<select class="select_bl" id="cstMrgMng_optDtCustmTypeReleaseRight" disabled>
										</select>
									</td>
								</tr>
								<tr>
									<td class="line_r">
										일반번호
									</td>
									<td class="line_b">
									<input type="text" id="cstMrgMng_tfDtRightTel" class="text_ol_60" style="width: 100%;" readonly>
									</td>
									<td class="line_c" rowspan="3" style="border-bottom: none;">
										메모
									</td>
									<td class="line_b" rowspan="3" style="border-bottom: none;">
										<textarea class="area_ol" style="height:90%;" id="cstMrgMng_tfDtMemoReleaseRight" maxlength="667" readonly></textarea>
									</td>
								</tr>
								<tr>
									<td class="line_r">
										핸드폰번호
									</td>
									<td class="line_b">
										<input type="text" id="cstMrgMng_tfDtRightMobile" class="text_ol_60" style="width: 100%;" readonly>
									</td>
								</tr>
								<tr>
									<td class="line_r" style="border-bottom: none;">
										팩스번호
									</td>
									<td class="line_b" style="border-bottom: none;">
										<input type="text" id="cstMrgMng_tfDtRightFax" class="text_ol_60" style="width: 100%;" readonly>
									</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
			<!-- </div> -->
		</div>
	</body>
</html>