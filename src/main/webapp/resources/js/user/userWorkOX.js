var d = new Date();
var currentYear = d.getFullYear();
var currentMonth = d.getMonth() + 1;

if (currentMonth < 10)
	currentMonth = "0" + currentMonth;
var currentYM = currentYear + "-" + currentMonth;

// 그리드 설정 정보
var gColNames = [];
var gColModel = [];
var gGroupHeaders = [];

// 엑셀 정보
var gColName = [];
var gColWidth = [];
var gColAlign = [];
var gGroupHeader = [];
var gColHeader = [];

// 관리자 여부
var usr_grd_cd = window.sessionStorage.getItem("USR_GRD_CD");

var gUserArr = [];
var gUserArrNm = [];

// 파라미터 셋팅 usrList
function getJsonStrUserList() {
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",// om001.selectList
		"map" : {
			"key" : "value",
			"chkRetire" : $("#usrWrkOx_chkRetire").prop("checked"), // 퇴사여부
			"cntr_cd" : "010000",
			"notuse" : false,
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc"
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

function getJsonUservcatn() {

	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNzUudmNhdG5JbmZv",
		"map" : {
			"key" : "value",
			"wrk_dt" : $("#wrk_dt").val().replace(/-/g, ""),
			"appr" : "200000"
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

function getJsonUserWorkOX() {

	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b2gwMjEuc2VsZWN0V29ya09Y",
		"map" : {
			"key" : "value",
			"wrk_dt" : $("#wrk_dt").val().replace(/-/g, ""),
			"cntr_cd" : '010000',
			// "team_cd" : $('#usrWrkOx_userWorkTeamCd').val(),
			"gUserArr" : gUserArr
		}
	};

	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

function getJsonUserWorkOXExcel() {

	var titleType = $("#wrk_dt").val() + "월_온누리콜센터_출근부";

	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b2gwMjEuc2VsZWN0V29ya09Y",
		"map" : {
			"key" : "value",
			"wrk_dt" : $("#wrk_dt").val().replace(/-/g, ""),
			"cntr_cd" : '010000',
			// "team_cd" : $('#usrWrkOx_userWorkTeamCd').val(),
			//20191029 oh021.selectWorkOX foreach문에서 사용할 유저값 파라미터 추가 
			"gUserArr" : gUserArr,
			"title" : titleType,
			"colWidth" : gColWidth,
			"colName" : gColName,
			"colAlign" : gColAlign,
			"colHeader1" : gGroupHeader,
			"colHeader3" : gColHeader
		}
	};

	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

function setGrid() {

	// 그리드 설정 정보
	gColNames = [];
	gColModel = [];
	gGroupHeaders = [];

	// 엑셀 정보
	gColName = [];
	gColWidth = [];
	gColAlign = [];
	gGroupHeader = [];
	gColHeader = [];

	gColNames.push("팀명", "상담사", "상담사아이디", "LASTDAY", "1일", "2일", "3일", "4일",
			"5일", "6일", "7일", "8일", "9일", "10일", "11일", "12일", "13일", "14일",
			"15일", "16일", "17일", "18일", "19일", "20일", "21일", "22일", "23일",
			"24일", "25일", "26일", "27일", "28일", "29일", "30일", "31일");

	gColModel.push({
		"name" : "TEAM_NM",
		width : 100,
		align : "center",
		sortable : false
	}, {
		"name" : "USR_NM",
		width : 100,
		align : "center",
		sortable : false
	}, {
		"name" : "USR_ID",
		width : 100,
		align : "center",
		hidden : true
	}, {
		"name" : "LASTDAY",
		width : 170,
		align : "center",
		hidden : true
	}, {
		"name" : "DD_01",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_02",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_03",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_04",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_05",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_06",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_07",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_08",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_09",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_10",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_11",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_12",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_13",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_14",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_15",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_16",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_17",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_18",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_19",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_20",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_21",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_22",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_23",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_24",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_25",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_26",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_27",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_28",
		width : 50,
		align : "center",
		sortable : false
	},

	{
		"name" : "DD_29",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_30",
		width : 50,
		align : "center",
		sortable : false
	}, {
		"name" : "DD_31",
		width : 50,
		align : "center",
		sortable : false
	});

	gColHeader.push("팀명, C, 1, 1");
	gColName.push("TEAM_NM");
	gColWidth.push(8);
	gColAlign.push("center");

	gColHeader.push("상담사, C, 1, 1");
	gColName.push("USR_NM");
	gColWidth.push(8);
	gColAlign.push("center");

	gColHeader.push("확인, C, 1, 1");
	gColName.push("");
	gColWidth.push(15);
	gColAlign.push("");

	gColHeader.push("1일, C, 1, 1", "2일, C, 1, 1", "3일, C, 1, 1", "4일, C, 1, 1",
			"5일, C, 1, 1");
	gColName.push("DD_01", "DD_02", "DD_03", "DD_04", "DD_05");
	gColWidth.push(8, 8, 8, 8, 8);
	gColAlign.push("center", "center", "center", "center", "center");
	gColHeader.push("6일, C, 1, 1", "7일, C, 1, 1", "8일, C, 1, 1", "9일, C, 1, 1",
			"10일, C, 1, 1");
	gColName.push("DD_06", "DD_07", "DD_08", "DD_09", "DD_10");
	gColWidth.push(8, 8, 8, 8, 8);
	gColAlign.push("center", "center", "center", "center", "center");

	gColHeader.push("11일, C, 1, 1", "12일, C, 1, 1", "13일, C, 1, 1",
			"14일, C, 1, 1", "15일, C, 1, 1");
	gColName.push("DD_11", "DD_12", "DD_13", "DD_14", "DD_15");
	gColWidth.push(8, 8, 8, 8, 8);
	gColAlign.push("center", "center", "center", "center", "center");
	gColHeader.push("16일, C, 1, 1", "17일, C, 1, 1", "18일, C, 1, 1",
			"19일, C, 1, 1", "20일, C, 1, 1");
	gColName.push("DD_16", "DD_17", "DD_18", "DD_19", "DD_20");
	gColWidth.push(8, 8, 8, 8, 8);
	gColAlign.push("center", "center", "center", "center", "center");

	gColHeader.push("21일, C, 1, 1", "22일, C, 1, 1", "23일, C, 1, 1",
			"24일, C, 1, 1", "25일, C, 1, 1");
	gColName.push("DD_21", "DD_22", "DD_23", "DD_24", "DD_25");
	gColWidth.push(8, 8, 8, 8, 8);
	gColAlign.push("center", "center", "center", "center", "center");
	gColHeader.push("26일, C, 1, 1", "27일, C, 1, 1", "28일, C, 1, 1",
			"29일, C, 1, 1", "30일, C, 1, 1", "31일, C, 1, 1");
	gColName.push("DD_26", "DD_27", "DD_28", "DD_29", "DD_30", "DD_31");
	gColWidth.push(8, 8, 8, 8, 8, 8);
	gColAlign.push("center", "center", "center", "center", "center", "center");
}

// 그리드 동적으로 만들기 위한 함수
function grid(jsonValue, colNamesValue, colModelValue, groupHeadersValue) {
	$("#dvGridArea").empty();
	var tb = "<table id = 'usrWrkOx_tblWorkOX'></table>";
	$("#dvGridArea").append(tb);

	$("#usrWrkOx_tblWorkOX")
			.jqGrid(
					{
						url : getContextPath() + "/ajax/user/userWorkOX.do",
						datatype : "json",
						mtype : "POST",
						postData : {
							pJson : jsonValue
						},
						jsonReader : {
							repeatitems : false
						},
						colNames : colNamesValue,
						colModel : colModelValue,
						gridview : true,
						hidegrid : false,
						shrinkToFit : false,
						loadonce : false,
						scrollOffset : 0,
						height : "680",
						width : "100%",
						rowNum : 999999,
						autowidth : true,
						pgbuttons : true,
						rownumbers : true,
						rownumWidth : 30,
						multiselect : false,
						emptyrecords : "0",
						caption : "",
						loadui : "enable",
						viewrecords : true,
						gridComplete : function() {

							// 전체 사용자 휴무일 검색
							if ($("#usrWrkOx_chkVcatn").prop("checked")) {
								$
										.ajax({
											type : "post",
											dataType : "json",
											async : true,
											url : getContextPath()
													+ "/ajax/user/userWorkOXvcatn.do",
											data : "pJson="
													+ getJsonUservcatn(),
											success : function(data) {
												if (data != null) {

													var ids = $(
															"#usrWrkOx_tblWorkOX")
															.getDataIDs();

													// 그리드 row 찾기
													for (var i = 0; i < ids.length; i++) {
														var rowId = ids[i];
														var row = $(
																"#usrWrkOx_tblWorkOX")
																.getRowData(
																		rowId);
														var j;
														var isIdEqual = false;
														// data에서 해당 row의 아이디와
														// 맞는 data 찾기
														for (j = 0; j < data.length; j++) {
															if (data[j].USR_ID == row['USR_ID']) {
																isIdEqual = true;
																break;
															}
														}
														if (isIdEqual) {
															var wkdt = $(
																	"#wrk_dt")
																	.val()
																	.replace(
																			/-/g,
																			"");
															var stdt = data[j].STRT_DT;
															var eddt = data[j].END_DT;
															// 시작일과 종료일이 같은 월에
															// 있을시
															if (stdt.substring(
																	0, 6) == wkdt
																	&& eddt
																			.substring(
																					0,
																					6) == wkdt) {
																for (var k = stdt
																		.substring(
																				6,
																				8) * 1; k < eddt
																		.substring(
																				6,
																				8) * 1 + 2; k++) {
																	var colnum = k
																			+ "";
																	if (colnum.length < 2) {
																		colnum = "0"
																				+ colnum;
																	}
																	row["DD_"
																			+ colnum] = "X";

																	// $("#usrWrkOx_tblWorkOX").setCell(rowId,"DD_"+colnum,"",{background:'#FFD73C'});

																}
															} else if (stdt
																	.substring(
																			0,
																			6) == wkdt
																	&& eddt
																			.substring(
																					0,
																					6) != wkdt) {// 시작일만
																									// 같은
																									// 월에
																									// 있을시
																for (var k = stdt
																		.substring(
																				6,
																				8) * 1; k < $(
																		"#usrWrkOx_tblWorkOX")
																		.getRowData(
																				1).LASTDAY + 1; k++) {
																	var colnum = k
																			+ "";
																	if (colnum.length < 2) {
																		colnum = "0"
																				+ colnum;
																	}
																	row["DD_"
																			+ colnum] = "X";
																	// $("#usrWrkOx_tblWorkOX").setCell(rowId,"DD_"+colnum,"",{background:'#FFD73C'});
																}
															} else if (stdt
																	.substring(
																			0,
																			6) != wkdt
																	&& eddt
																			.substring(
																					0,
																					6) == wkdt) {// 종료일만
																									// 같은
																									// 월에
																									// 있을시
																for (var k = 0; k < eddt
																		.substring(
																				6,
																				8) * 1 + 2; k++) {
																	var colnum = k
																			+ "";
																	if (colnum.length < 2) {
																		colnum = "0"
																				+ colnum;
																	}
																	row["DD_"
																			+ colnum] = "X";
																	// $("#usrWrkOx_tblWorkOX").setCell(rowId,"DD_"+colnum,"",{background:'#FFD73C'});
																}
															}

															$(
																	"#usrWrkOx_tblWorkOX")
																	.setRowData(
																			rowId,
																			row);

														}
													}
												}
											},
											error : function(data, status, err) {
												networkErrorHandler(data,
														status, err);
											}
										});
							}
						},
						loadComplete : function(e) {
							if ($("#usrWrkOx_tblWorkOX")
									.getGridParam("records") > 0) {
								if ($("#usrWrkOx_tblWorkOX").getRowData(1).LASTDAY < 31) {
									$('#usrWrkOx_tblWorkOX').hideCol('DD_31');
								}

								if ($("#usrWrkOx_tblWorkOX").getRowData(1).LASTDAY < 30) {
									$('#usrWrkOx_tblWorkOX').hideCol('DD_30');
								}
								if ($("#usrWrkOx_tblWorkOX").getRowData(1).LASTDAY < 29) {
									$('#usrWrkOx_tblWorkOX').hideCol('DD_29');
								}
							}

						}

					}).jqGrid('setGroupHeaders', {
				useColSpanStyle : true,
				groupHeaders : groupHeadersValue
			}).jqGrid('setFrozenColumns');
}

// 조회 버튼 클릭 이벤트
function workSearch() {
	setGrid();
	grid(getJsonUserWorkOX(), gColNames, gColModel, gGroupHeaders);
}

// 엑셀다운 버튼 클릭 이벤트
function workExelDown() {
	setGrid();
	param = getJsonUserWorkOXExcel();
	url = getContextPath() + "/excel/mprows/mpRowsExcelDown.do";
	excelDownLoad(url, param);
}

function ulUserListSet() {
	var dropdownBoxHtml = "<dl><dt><span class='multiCheckValues'></span><span class='dropBtn'>▼</span></dt><dd><ul id='ulUserList'></ul></dd></dl>";
	$("#usrWrkOx_multiCheckbox").html(dropdownBoxHtml);

	$
			.ajax({
				type : "post",
				dataType : "json",
				async : false,
				url : getContextPath() + "/ajax/user/userList.do",
				data : "pJson=" + getJsonStrUserList(),
				success : function(data) {

					// param값을 JSON으로 파싱
					var ulUserList = "";
					$
							.each(
									data,
									function(key, state) {
										var tempTxt = "";
										if (state.RET_YN != undefined)
											tempTxt = "(" + state.RET_YN + ")";
										ulUserList += "<li><input type='checkbox' name='liUser' value='"
												+ state.USR_ID
												+ "' data='"
												+ state.USR_NM
												+ tempTxt
												+ "' /> "
												+ state.USR_NM
												+ "<font color='red'>"
												+ tempTxt + "</font>" + "</li>";

									});

					$("#ulUserList").html(ulUserList);
					$("#usrWrkOx_multiCheckbox").dropdownMultiCheckbox();
				},
				error : function(data, status, err) {
					networkErrorHandler(data, status, err);
				}
			});

	// 상담사 전체 선택 이벤트
	$("#ulUserList .allmultichk").on('click', function(e) {
		gUserArr = [];
		gUserArrNm = [];
		var chk = $(this).is(':checked');
		if (chk) {
			$("dd input[name='liUser']").each(function() {
				gUserArr.push($(this).val());
				gUserArrNm.push($(this).attr('data'));
			});
		}
	});
	// 상담사 개별 선택 이벤트
	$("dd input[name='liUser']").on('click', function(e) {

		var chk = $(this).is(':checked');
		if (chk) {
			gUserArr.push($(this).val());
			gUserArrNm.push($(this).attr('data'));
		} else {
			var pos = gUserArr.indexOf($(this).val());
			gUserArr.splice(pos, 1);
			gUserArrNm.splice(pos, 1);
		}
	});
}

$(document).ready(function() {
	$('#wrk_dt').val(currentYM);
	$("#wrk_dt").MonthPicker({
		MaxMonth : 0
	});

	// 팀 셀렉트 박스 셋팅
	// setObjSelectBoxWithCode("usrWrkOx_userWorkTeamCd", "전체", "", "CHILD",
	// "90003", "all");

	// 조회 버튼 클릭 이벤트 등록
	$("#usrWrkOx_btnWorkSearch").bind("click", workSearch);

	// 엑셀다운 버튼 클릭 이벤트 등록
	$("#usrWrkOx_btnWorkExelDown").bind("click", workExelDown);

	ulUserListSet();
	workSearch();
});