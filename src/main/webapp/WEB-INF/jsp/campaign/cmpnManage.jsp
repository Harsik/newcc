<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset=utf-8>
<title>해피콜 관리</title>
<link rel="icon" href="/resources/images/favicon.ico">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/lib/jqgrid/css/ui.jqgrid.css" type="text/css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/popup.css" />
<!-- <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/tab.css" /> -->

<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jqgrid/js/jquery.jqGrid.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jqgrid/js/i18n/grid.locale-en.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/lib/jquery-ui-custom/jquery-ui.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/common/common.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/campaign/cmpnManage.js"></script>
	<style>
			.ui-tabs-nav{
				background:#fff;
				border:0;
			}
			.ui-tabs .ui-tabs-panel{
				padding:0.5em 0.7em
			}
			</style>
</head>

<body>
	<div id="h1">해피콜 관리</div>

	<div id="pop_body" style="height: 770px;">

		<ul id="tabs1">
			<li><a href="#sect1">해피콜 기본</a></li>
			<li><a href="#sect2">해피콜 대상자</a></li>
			<li><a href="#sect3">상담사 배정</a></li>
			<li><a href="#sect4">해피콜 결과</a></li>
			<li><a href="#sect5">해피콜 진행률</a></li>
		</ul>

		<div id="ctnt1">
			<!-- 캠페인 기본 시작  -->
			<div id="sect1">
				<!--"조회/검색"-->
				<div id="search">
					<table class="search_tbl">
						<tr>
							<th>해피콜기간</th>
							<td width="30%" style="text-align: left;">
								<input type="text" style="width: 80px;" class="text_ol_half" id="selFrDate_1" maxlength="16" /> ~ 
								<input type="text" style="width: 80px;" class="text_ol_half" id="selToDate_1" maxlength="16" />
							</td>
							<th>해피콜명</th>
							<td class="nemo_50" style="" colspan="2">
								<input type="text" class="text_ol" id="cmpgNm_1" name="cmpgNm_1" maxlength="167" />
							</td>
							<th>진행상태</th>
							<td class="sel">
								<select class="select_al"	id="progressStatus_1"></select>
							</td>
							<th>해피콜유형</th>
							<td class="sel_60">
								<select class="select_al" id="cmpgtype_1"></select>
							</td>
							<td class="btn">
								<button type="button" id="btnSearch_1" class="button">조회</button>
								<button type="button" id="btnReset_1" class="button">초기화</button>
							</td>
						</tr>
					</table>
				</div>
				<!--"조회/검색"-->

				<!--타이틀-->
				<div class="stitle">해피콜 목록</div>
				<!--"타이틀"-->
				<!--그리드-->
				<div class="grid_all">
					<!-- 미사용/버튼 테이블 -->
					<table class="info_tbl"></table>
					<!--"미사용/버튼 테이블"-->
					<!-- 그리드테이블 -->
					<div class="grid_tbl">
						<table id="tbl010"></table>
						<div id="pg010"></div>
					</div>
					<!--"그리드테이블"-->
				</div>
				<!--"그리드"-->
				<br />
				<div id="ctnt2">
					<ul id="tabs2">
						<li><a href="#sect11">해피콜 내용</a></li>
						<li><a href="#sect12">해피콜 문항</a></li>
					</ul>
					<!-- 캠페인 내용 시작 -->
					<div id="sect11">
						<!-- 버튼 테이블 -->
						<table class="info_tbl_btn" style="margin-top:-35px;">
							<tr>
								<td>
									<button type="button" id="btnInsert_2" class="button">추가</button>
									<button type="button" id="btnUpdate_2" class="button">수정</button>
									<button type="button" id="btnReset_2" class="button">초기화</button>
									<button type="button" id="btnDelete_2" class="button">삭제</button>
								</td>
							</tr>
						</table>
						<!--"버튼 테이블"-->
						<!-- 캠페인기본테이블 -->
						<form id="frm1" name="frm1" action="/ajax/user/userManagement.do" method="post">
							<table class="profile_tbl">
								<tr>
									<th class="line_rt">해피콜아이디</th>
									<td class="line_b">
										<input type="text" class="text_ol_70" id="cmpgId_2" name="cmpgId_2" maxlength="50" readonly="readonly" disabled="disabled" />
									</td>
									<th class="line_c">해피콜유형</th>
									<td class="line_b">
										<select class="select_al" id="cmpgtype_2"></select>
									</td>
									<th class="line_c">진행상태</th>
									<td class="line_b" id="">
										<select id="selProcSt"></select>
									</td>
								</tr>
								<tr>
									<th class="line_rt">해피콜기간</th>
									<td class="line_b">
										<input type="text" style="width: 75px;" class="text_ol_half" id="selFrDateC_2" maxlength="10"> ~ 
										<input type="text" style="width: 75px;" class="text_ol_half" id="selToDateC_2" maxlength="10">
									</td>
									<th class="line_c">해피콜문항수</th>
									<td class="line_b" id="surveyCnt_2"></td>
									<th class="line_c">해피콜대상자수</th>
									<td class="line_b" id="surveyNmCnt_2"></td>
								</tr>
								<tr>
									<th class="line_rt">해피콜명</th>
									<td class="line_b" colspan="5">
										<input type="text" class="text_ol" id="survetName_2" name="survetName_2" maxlength="167">
									</td>
								</tr>
								<tr>
									<th class="line_rb">해피콜안내<br />(스크립트)
									</th>
									<td class="line_wb" colspan="5">
										<textarea class="area_ol" id="surveyArea_2" name="surveyArea_2" rows="8" cols="100%" maxlength="990"></textarea>
									</td>
								</tr>
							</table>
						</form>
						<!--"개인정보테이블"-->
					</div>
					<!-- 캠페인 내용 종료  -->
					<!-- 캠페인 문항 시작  -->
					<div id="sect12" style="height: 20em;">
						<!-- 버튼 테이블 -->
						<table class="info_tbl_btn" style="margin-top:-35px;">
							<tr>
								<td>
									<button type="button" id="btnReset_3" class="button">초기화</button>
									<button type="button" id="btnInsert_3" class="button">등록</button>
									<button type="button" id="btnUpdate_3" class="button">수정</button>
									<button type="button" id="btnDelete_3" class="button">삭제</button>
								</td>
							</tr>
						</table>
						<!--"버튼 테이블"-->
						<!-- 그리드테이블 -->
						<div class="grid_all" style="width: 50%; float: left;">
							<!-- 미사용/버튼 테이블 -->
							<table class="info_tbl"></table>
							<!--"미사용/버튼 테이블"-->
							<!-- 그리드테이블 -->
							<div class="grid_tbl">
								<table id="tbl011"></table>
								<div id="pg011"></div>
							</div>
							<!--"그리드테이블"-->
						</div>
						<!--"그리드"-->

						<div class="grid_tbl" style="width: 49%; display: inline-block; border: 0px; padding-left:5px;">
							<table style="width: 100%; border: 1px solid #98a5b3; padding: 2px">
								<tr>
									<th>질문</th>
									<td class="line_t" colspan="5">
										<input type="text" id="survey_3" style="width: 90%" maxlength="167" />
									</td>
								</tr>
								<tr>
									<th>질문유형</th>
									<td class="line_t">
										<select class="select_al" id="surveyType_3"></select>
									</td>
									<th>답안수</th>
									<td class="line_t">
										<input type="text" id="surveyCnt_3" style="width: 50%" maxlength="2" />
									</td>
									<th>문항번호</th>
									<td class="line_t">
										<input type="text" id="surveyNum_3" style="width: 40%" maxlength="2" />
									</td>
								</tr>
							</table>
							<br />
							<table
								style="width: 100%; border: 1px solid #98a5b3; padding: 2px">
								<thead>
									<tr>
										<th style="width: 20%;">번호</th>
										<th>답안 내용(최대 5개)</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th style="width: 20%;">1</th>
										<td class="line_b" style="width: 80%;">
										  <input type="text" id="survey_nm_1" style="width: 92%;" maxlength="450" />
										</td>
									</tr>
									<tr>
										<th>2</th>
										<td class="line_c">
										  <input type="text" id="survey_nm_2" style="width: 92%;" maxlength="450" />
										</td>
									</tr>
									<tr>
										<th>3</th>
										<td class="line_b">
										  <input type="text" id="survey_nm_3" style="width: 92%;" maxlength="450" />
										</td>
									</tr>
									<tr>
										<th>4</th>
										<td class="line_c">
										  <input type="text" id="survey_nm_4" style="width: 92%;" maxlength="450" />
										</td>
									</tr>
									<tr>
										<th>5</th>
										<td class="line_b">
										  <input type="text" id="survey_nm_5" style="width: 92%;" maxlength="450" />
									  </td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<!-- 캠페인 문항 종료  -->
				</div>
			</div>
			<!-- 캠페인 기본 종료  -->

			<!-- 캠페인 대상자 시작  -->
			<div id="sect2">
				<!--타이틀-->
				<div class="stitle">대상 해피콜</div>
				<!--"타이틀"-->
				<!-- 	            <table class="profile_tbl">
	                <tr>
	                    <th class="line_rt">캠페인명</th>
	                    <td class="line_b" id="surveyName_4"></td>
	                    <th class="line_c">캠페인기간</th>
	                    <td class="line_b" id="surveyDay_4"></td>
	                    <td class="line_c">완료건수/총건수</td>
	                    <td class="line_b" id="surveyAssign_4"></td>
	                </tr>
	                <tr>
	                    <th class="line_rt">캠페인유형</th>
	                    <td class="line_b" id="cmpgType_4"></td>
	                    <th class="line_c">문항 수</th>
	                    <td class="line_b" id="surveyCnt_4"></td>
	                    <td class="line_c">배정건수/미배정건수</td>
	                    <td class="line_b" id="nonSurveyAssign_4"></td>
	                </tr>
	            </table><br /> -->

				<table class="profile_tbl">
					<tr>
						<th class="line_rt">해피콜명</th>
						<td class="line_b" id="surveyName_4"></td>
						<th class="line_c">해피콜기간</th>
						<td class="line_b" id="surveyDay_4"></td>
						<th class="line_c">해피콜유형</th>
						<td class="line_b" id="cmpgType_4"></td>
					</tr>
					<tr>
						<td class="line_rt">총대상건수</td>
						<td class="line_b" id="surveyAssign_4"></td>
						<td class="line_c">배정건수</td>
						<td class="line_b" id="surveyCnt_4"></td>
						<th class="line_c">미배정건수</th>
						<td class="line_b" id="nonSurveyAssign_4"></td>
					</tr>
				</table>
				<br />

				<!-- 조회/검색 -->
				<div id="search">
					<table class="search_tbl">
						<tr>
							<th>고객명</th>
							<td class="sel"><input type="text" class="text_ol" id="tfCustNm" name="tfCustNm" maxlength="10" /></td>
							<th>전화번호</th>
							<td class="sel"><input type="text" class="text_ol" id="tfTel" name="tfTel" maxlength="10" /></td>
							<th>배정여부</th>
							<td class="sel">
							 <select id="selDivAct">
									<option value="all">전체</option>
									<option value="div">배정</option>
									<option value="nondiv">미배정</option>
							 </select>
							</td>
<!-- 							<th class="counselor" style="display: none;">상담사</th>
							<td class="sel counselor" style="display: none;">
							 <select id="selCounselor">
									<option value="all">전체</option>
									<option value="cs1">상담사1</option>
									<option value="cs2">상담사2</option>
									<option value="cs3">상담사3</option>
									<option value="cs4">상담사4</option>
									<option value="cs5">상담사5</option>
							 </select>
							</td> -->
							<td class="btn">
								<button type="button" id="btnSearch_4" class="button">조회</button>
								<button type="button" id="btnInit_4" class="button">초기화</button>
							</td>
						</tr>
					</table>
				</div>
				<!--"조회/검색"-->

				<!-- 버튼 박스 시작 -->
				<div class="btn">
					<!-- <button type="button" id="btnCusInsert_4"  class="button">대상자 선정하기</button> -->
					<button type="button" id="btnCousInsert_4" class="button">대상자
						생성하기</button>
					<!-- <button type="button" id="btnViewInsert_4"  class="button">대상자 생성하기(시스템)</button> -->
					<button type="button" id="btnExelDown_4" class="button">엑셀양식 다운로드</button>
					<button type="button" id="btnExelInsert_4" class="button">엑셀업로드</button>
					<button type="button" id="btnCousDelete_4" class="button" style="float: right;">대상자 삭제</button>
					<!-- <form style="float : right">
										<input type="checkbox" name="check1" class="checkbox" id="chkNotUse1" checked value="Y"><label for="chkNotUse">비대상 &nbsp;</label>
										<input type="checkbox" name="check2" class="checkbox" id="chkNotUse2" value="Y"><label for="chkNotUse">대상 &nbsp;</label>
									</form> -->
					<!-- <form style="float : right">
									<input type="hidden" name="check1" class="checkbox" id="chkNotUse1" checked value="Y"><label for="chkNotUse"></label>
									<input type="hidden" name="check2" class="checkbox" id="chkNotUse2" value="Y"><label for="chkNotUse"></label>
									</form> -->
				</div>
				<!-- 버튼 박스 종료 -->

				<!-- 그리드테이블 -->
				<div class="grid_all">
					<br />
					<table id="tbl012"></table>
					<div id="pg012"></div>
				</div>
				<!--"그리드테이블"-->

			</div>
			<!-- 캠페인 대상자 종료  -->

			<!-- 상담사 배정 시작  -->
			<div id="sect3">
				<!--타이틀-->
				<div class="stitle">대상 해피콜</div>
				<!--"타이틀"-->
				<table class="profile_tbl">
					<!-- 	            
	                <tr>
	                    <th class="line_rt">캠페인명</th>
	                    <td class="line_b" id="surveyName_5"></td>
	                    <th class="line_c">캠페인기간</th>
	                    <td class="line_b" id="surveyDay_5"></td>
	                    <th class="line_c">완료건수/총건수</th>
	                    <td class="line_b" id="surveyAssign_5"></td>
	                </tr>
	                <tr>
	                    <th class="line_rt">캠페인유형</th>
	                    <td class="line_b" id="cmpgType_5"></td>
	                    <th class="line_c">문항 수</th>
	                    <td class="line_b" id="surveyCnt_5"></td>
	                    <th class="line_c">배정건수/미배정건수</th>
	                    <td class="line_b" id="nonSurveyAssign_5"></td>
	                </tr>
 -->

					<tr>
						<th class="line_rt">해피콜명</th>
						<td class="line_b" id="surveyName_5"></td>
						<th class="line_c">해피콜기간</th>
						<td class="line_b" id="surveyDay_5"></td>
						<th class="line_c">해피콜유형</th>
						<td class="line_b" id="cmpgType_5"></td>
					</tr>
					<tr>
						<th class="line_rt">총대상건수</th>
						<td class="line_b" id="surveyAssign_5"></td>
						<th class="line_c">배정건수</th>
						<td class="line_b" id="surveyCnt_5"></td>
						<th class="line_c">미배정건수</th>
						<td class="line_b" id="nonSurveyAssign_5"></td>
					</tr>
				</table>
				<br />
				<!-- 버튼 박스 시작 -->
				<div class="btn">
					<table style="border: 0px; width: 100%;">
						<tr>
							<td style="width: 50%;">
								<button type="button" id="btnSearch_5" class="button">체크한 상담사에 자동 배정하기</button>
							</td>
							<td style="width: 50%;; text-align: right">
								<input type="radio" class="text_ol_40" id="celNo_5" name="celNo_5" value="1" checked />
								<label for="celNo_5">배정</label> 
								<input type="radio" class="text_ol_40" id="celNo_6" name="celNo_5" value="2" />
								<label for="celNo_6">회수</label>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<button type="button" id="btnUpdate_5" class="button">저장</button>
							</td>
						</tr>
					</table>
				</div>
				<br />
				<!-- 버튼 박스 종료 -->
				<!-- 그리드테이블 -->
				<form name="frm_5" method="post">
					<div class="grid_tbl">
						<table id="tbl014"></table>
						<div id="pg014"></div>
					</div>
				</form>

			</div>
			<!--  sect3  -->


			<div id="sect4">
				<!--타이틀-->
				<div class="stitle">해피콜 결과</div>
				<!--"타이틀"-->

				<!--"조회/검색"-->
				<div id="search">
					<table class="search_tbl">
						<tr>
							<th>해피콜기간</th>
							<td width="30%" style="text-align: left;">
							 <input type="text" style="width: 80px;" class="text_ol_half" id="selFrDate_6" maxlength="16"> 
							 ~ 
							 <input type="text" style="width: 80px;" class="text_ol_half" id="selToDate_6" maxlength="16"></td>
							<th>해피콜명</th>
							<td class="nemo_50" style="" colspan="2">
							 <input type="text" class="text_ol" id="cmpgNm_6" name="cmpgNm_6" maxlength="50">
							</td>
							<th>진행상태</th>
							<td class="sel">
							 <select class="select_al" id="progressStatus_6"></select>
							</td>
							<th>해피콜유형</th>
							<td class="sel">
							 <select class="select_al" id="cmpgtype_6"></select>
							</td>
							<td class="btn">
								<button type="button" id="btnSearch_6" class="button">조회</button>
								<button type="button" id="btnReset_6" class="button">초기화</button>
							</td>
						</tr>
					</table>
				</div>

				<div class="grid_all" style="width: 50%; display:inline-block;">
					<!-- 미사용/버튼 테이블 -->
					<table class="info_tbl">
					</table>
					<!--"미사용/버튼 테이블"-->
					<!-- 그리드테이블 -->
					<div class="grid_tbl">
						<table id="tbl010_1"></table>
						<div id="pg010_1"></div>
					</div>
					<!--"그리드테이블"-->
				</div>

				<div style="display: inline-block; position: absolute; width: 49%; height: 100%;">
					<div>
						<button type="button" class="button" id="btnCmpnExcelDown" style="float: right; margin-bottom: 10px;">엑셀다운</button>
					</div>
					<table class="profile_tbl">
						<tr>
							<th class="line_rt">해피콜명</th>
							<td class="line_b" id="surveyName_6"></td>
							<th class="line_c">해피콜기간</th>
							<td class="line_b" id="surveyDay_6"></td>
						</tr>
						<tr>
							<th class="line_rt">해피콜유형</th>
							<td class="line_b" id="cmpgType_6"></td>
							<th class="line_c">문항수</th>
							<td class="line_b" id="surveyCnt_6"></td>
						</tr>
					</table>

					<!-- <div id="cmpgStats" style="width:55%; height:68%; position:absolute ; right:27px; bottom:35px; overflow:auto;">
		            	<table id="test">
		            		
		            	</table>
		            </div> -->
					<div id="cmpgStats" style="width: 100%; height: 64%; overflow: auto;"></div>
				</div>
			</div>
			<!--  sect4  -->

			<!-- 캠페인 진행률 시작  -->
			<div id="sect5">
				<!--타이틀-->
				<div class="stitle">전체 진행률 조회</div>
				<!--"타이틀"-->

				<!-- 조회/검색 -->
				<div id="search">
					<table class="search_tbl">
						<tr>
							<th>해피콜기간</th>
							<td width="30%" style="text-align: left;">
								<input type="text" style="width: 80px;" class="text_ol_half" id="selFrDate_Sect5" maxlength="16"> ~ 
								<input type="text" style="width: 80px;" class="text_ol_half" id="selToDate_Sect5" maxlength="16">
							</td>
							<th>해피콜명</th>
							<td class="nemo_50" style="" colspan="2">
							 <input type="text" class="text_ol" id="cmpgNm_Sect5" name="cmpgNm_Sect5" maxlength="167">
							</td>
							<th>상담사</th>
							<td class="sel">
							 <select class="select_al" id="selAgent_Sect5"></select>
							</td>
							<td class="btn">
								<button type="button" id="btnSearch_Sect5" class="button">조회</button>
								<button type="button" id="btnReset_Sect5" class="button">초기화</button>
							</td>
						</tr>
					</table>
				</div>
				<!-- 조회/검색 -->

				<!--타이틀-->
				<div class="stitle">전체 진행률</div>
				<!--"타이틀"-->

				<!--그리드-->
				<div id="grid_all">

					<div>
						<!-- 그리드테이블 -->
						<div class="grid_all">
							<!-- 미사용/버튼 테이블 -->
							<table class="info_tbl">
							</table>
							<!--"미사용/버튼 테이블"-->

							<!-- 그리드테이블 -->
							<div class="grid_tbl">
								<table id="tbl015_1"></table>
								<div id="pg015_1"></div>
							</div>
							<!--"그리드테이블"-->

						</div>
					</div>
				</div>
				<!--"그리드"-->
				<br />

				<!--타이틀-->
				<div class="stitle">상담사별 진행률</div>
				<!--"타이틀"-->

				<!--그리드-->
				<div id="grid_all">

					<div>
						<!-- 그리드테이블 -->
						<div class="grid_all">
							<!-- 미사용/버튼 테이블 -->
							<table class="info_tbl">
							</table>
							<!--"미사용/버튼 테이블"-->

							<!-- 그리드테이블 -->
							<div class="grid_tbl">
								<table id="tbl015_2"></table>
								<div id="pg015_2"></div>
							</div>
							<!--"그리드테이블"-->

						</div>
					</div>
				</div>
				<!--"그리드"-->

			</div>
			<!--  캠페인 진행률 종료  -->

		</div>
		<!-- ctnt1 -->

	</div>
	<!-- pop_body -->

</body>
</html>