// 조회 조건 및 조회 값
var g_srchval = "";
var g_srchopt = "";
var g_schuseyn = "";

// 파라미터 셋팅 LecturerList 강사정보 리스트
function getJsonStrLecturerList(tch_nm, tch_gb_cd, tch_use_yn)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNDEuc2VsZWN0VGNoTGlzdA==",
		"map" : {
			"key" : "value",
			"tch_nm" : tch_nm,
			"tch_gb_cd" : tch_gb_cd,
			"tch_use_yn" : tch_use_yn
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 Lecturerspec 강사정보 상세 조회
function getJsonStrLecturerSpec(tch_Id)
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b20wNDEuc2VsZWN0VGNoSW5mbw==",
		"map" : {
			"key" : "value",
			"tch_Id" : tch_Id
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅 InsertLecturer
function getJsonStrInsertLecturer()
{
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wNDEuaW5zZXJ0VGNoSW5mbw==",
		"map" : {
			"key" : "value",
			"tch_Nm" : $("#edulec_tch_Nm").val(),
			"tel_No" : $("#edulec_tel_No").val().replace(/[-, :, \s]/g,""),
			"corp_Nm" : $("#edulec_corp_Nm").val(),
			"dty_Nm" : $("#edulec_dty_Nm").val(),
			"eml_Adr" : $("#edulec_eml_Adr").val(),
			"lect_Nm" : $("#edulec_lect_Nm").val(),
			"memo" : $("#edulec_memo").val(),
			"tch_gb_cd" : $(":input:radio[name=tch_Gb_Cd]:checked").val(),
			"use_yn" : $(":input:radio[name=use_yn]:checked").val()
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_UpdateLecturer
function getJsonStrUpdateLecturer()
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wNDEudXBkYXRlVGNoSW5mbw==",
		"map" : {
			"key" : "value",
			"tch_Id" : $("#edulec_tch_Id").val(),
			"tch_Nm" : $("#edulec_tch_Nm").val(),
			"tel_No" : $("#edulec_tel_No").val().replace(/[-, :, \s]/g,""),
			"corp_Nm" : $("#edulec_corp_Nm").val(),
			"dty_Nm" : $("#edulec_dty_Nm").val(),
			"eml_Adr" : $("#edulec_eml_Adr").val(),
			"lect_Nm" : $("#edulec_lect_Nm").val(),
			"memo" : $("#edulec_memo").val(),
			"tch_gb_cd" : $(":input:radio[name=tch_Gb_Cd]:checked").val(),
			"use_yn" : $(":input:radio[name=use_yn]:checked").val()
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//강사 상세 초기화
function initLecturerSpec()
{
	$("#edulec_tch_Id").prop("disabled", true);
	$("#edulec_btnInsert").show();
	$("#edulec_btnUpdate").hide();
	
	$("#edulec_tch_Id").val("");
	$("#edulec_tch_Nm").val("");
	$("#edulec_tel_No").val("");
	$("#edulec_corp_Nm").val("");
	$("#edulec_dty_Nm").val("");
	$("#edulec_eml_Adr").val("");
	$("#edulec_lect_Nm").val("");
	$("#edulec_memo").val("");	
	$("input:radio[name=tch_Gb_Cd]:input[value='100000']").prop("checked", true);	
	$("input:radio[name=use_yn]:input[value='Y']").prop("checked", true);
	
	$("#edulec_crtDt").html("");
	$("#edulec_crtUsrId").html("");
}

//저장 및 수정 예외 처리
function checkLecturerSpec()
{
	var rMsg = "";
  
/*	if($("#edulec_tch_Id").val() == "")
		rMsg += "\n\n강사 ID를 입력 해 주세요.";*/
	
	if($("#edulec_tch_Nm").val() == "")
		rMsg += "\n\n강사명을 입력 해 주세요.";
		
	return rMsg;
}

//조회 버튼 클릭 이벤트
function btnSearch_clickEvent()
{
	g_srchval = $("#edulec_srchLectNm").val();
	g_srchopt = $(":input:radio[name=srhTchGbCd]:checked").val();
	g_schuseyn = $(":input:radio[name=srhUseYn]:checked").val();
	
	$("#edulec_tblLecturerList").jqGrid("setGridParam", {postData : {pJson : getJsonStrLecturerList(g_srchval, g_srchopt, g_schuseyn)}, page : 1, sortname : "TCH_NM", sortorder : "asc"});
	$("#edulec_tblLecturerList").trigger("reloadGrid");
	
	initLecturerSpec();
}

//초기화 버튼 클릭 이벤트
function btnInit_clickEvent()
{
	g_srchval = "";
	
	$("#edulec_tch_Id").prop("disabled", true);
	$("#edulec_btnInsert").show();
	$("#edulec_btnUpdate").hide();
	
	$("#edulec_srchLectNm").val("");
	$("input:radio[name=srhTchGbCd]:input[value='100000']").prop("checked", true);
	$("input:radio[name=srhUseYn]:input[value='Y']").prop("checked", true);
	g_srchopt = $(":input:radio[name=srhTchGbCd]:checked").val();
	g_schuseyn = $(":input:radio[name=srhUseYn]:checked").val();
	
	$("#edulec_tblLecturerList").jqGrid("setGridParam", {postData : {pJson : getJsonStrLecturerList(g_srchval, g_srchopt, g_schuseyn)}, page : 1, sortname : "TCH_NM", sortorder : "asc"});
	$("#edulec_tblLecturerList").trigger("reloadGrid");

	initLecturerSpec();	
}

//추가버튼 클릭 이벤트
function btnInsert_clickEvent()
{
var rMsg = checkLecturerSpec();
	
	if(rMsg !== "")
	{
		alert(rMsg);
		return;
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/edu/lecturerspec.do",
		data : "pJson=" + getJsonStrLecturerSpec($("#edulec_tch_Id").val()),
		success : function(data)
		{
			if(data != null)
			{
				alert("중복된 강사 ID가 존재 합니다.");
				initLecturerSpec();	
				$("#edulec_tch_Nm").focus();
			}
			else
			{
				$.ajax({
					type : "post",
					dataType: "json",
					async : true,
					url : getContextPath() + "/ajax/edu/insertLecturer.do",
					data : "pJson=" + getJsonStrInsertLecturer(),
					success : function(data)
					{
						g_srchopt = $(":input:radio[name=srhTchGbCd]:checked").val();
						g_schuseyn = $(":input:radio[name=srhUseYn]:checked").val();

						$("#edulec_tblLecturerList").jqGrid("setGridParam", {postData : {pJson : getJsonStrLecturerList("", g_srchopt, g_schuseyn)}, page : 1, sortname : "TCH_NM", sortorder : "asc"});
						$("#edulec_tblLecturerList").trigger("reloadGrid");

				   		initLecturerSpec();				   		
				   		alert("추가되었습니다.");
					},
					error : function(data, status, err) 
					{
						networkErrorHandler(data, status, err);
					}
				});
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

//메뉴 수정 버튼 클릭 이벤트
function btnUpdate_clickEvent()
{
	var rMsg = checkLecturerSpec();
	
	if(rMsg !== "")
	{
		alert(rMsg);
		return;
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/edu/updateLecturer.do",
		data : "pJson=" + getJsonStrUpdateLecturer(),
		success : function(data)
		{
			var srchopt = $(":input:radio[name=srhTchGbCd]:checked").val();
			var schuseyn = $(":input:radio[name=srhUseYn]:checked").val();
			
			$("#edulec_tblLecturerList").jqGrid("setGridParam", {
				postData : {
					pJson : getJsonStrLecturerList("", srchopt, schuseyn)
				}, 
				page : $(this).getGridParam("page"), 
				sortname : "TCH_NM", 
				sortorder : "asc"
			}).trigger("reloadGrid");
	   					
			initLecturerSpec();
	   		alert("저장되었습니다.");
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

//전화번호 형식
function getPhoneFormat(cellValue, options, rowdata, action) 
{
	var formatString = fnGetTelNoFormat(cellValue);
	
	return formatString;
}

// init Page
$(document).ready(function()
{
	// 초기 검색 입력 창 비활성화
	$("#edulec_tch_Id").prop("disabled", true);
	$("#edulec_btnInsert").show();
	$("#edulec_btnUpdate").hide();
		
	$('input:radio[name=srhTchGbCd]:input[value=100000]').prop("checked", true);
	$('input:radio[name=srhUseYn]:input[value=Y]').prop("checked", true);
	g_srchopt = $(":input:radio[name=srhTchGbCd]:checked").val();
	g_schuseyn = $(":input:radio[name=srhUseYn]:checked").val();
	
	$("#edulec_tblLecturerList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/edu/lecturerlist.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrLecturerList("", g_srchopt, g_schuseyn)
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["강사명", "소속", "직책", "강의명", "연락처", "이메일", "강사ID"],
	   	colModel :
	   	[
	   	 	{ name : "TCH_NM", index : "TCH_NM", width : 80, align : "center" },
			{ name : "CORP_NM", index : "CORP_NM", width : 150, align : "left" },
			{ name : "DTY_NM", index : "DTY_NM", width : 80, align : "center" },
			{ name : "LECT_NM", index : "LECT_NM", width : 200, align : "left" },
			{ name : "TEL_NO", index : "TEL_NO", width : 100, align : "center", formatter:getPhoneFormat },
			{ name : "EML_ADR", index : "EML_ADR", width : 140, align : "left" },
			{ name : "TCH_ID", index : "TCH_ID", hidden:true }
	   	],
	   	sortname : "TCH_NM",
	   	sortorder : "asc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "260",
	   	width : "100%",
	   	rowNum : 10,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#edulec_pgLecturerList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{
	   		var row = $("#edulec_tblLecturerList").getRowData(rowid);	   		
	   		
	   		$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/edu/lecturerspec.do",
				data : "pJson=" + getJsonStrLecturerSpec(row.TCH_ID),
				success : function(data)
				{					
					$("#edulec_tch_Id").val(data.TCH_ID);
					$("#edulec_tch_Nm").val(data.TCH_NM);
					
					if (data.TEL_NO != undefined)
					{
						if (data.TEL_NO.length > 0)
							$("#edulec_tel_No").val(fnGetTelNoFormat(data.TEL_NO));						
					}else
						$("#edulec_tel_No").val("");
					
					$("#edulec_corp_Nm").val(data.CORP_NM);
					$("#edulec_dty_Nm").val(data.DTY_NM);
					$("#edulec_eml_Adr").val(data.EML_ADR);
					$("#edulec_lect_Nm").val(data.LECT_NM);
					$("#edulec_memo").val(data.MEMO);

					$('input:radio[name=tch_Gb_Cd]:input[value=' + data.TCH_GB_CD + ']').prop("checked", true);
					$('input:radio[name="use_yn"]:input[value=' + data.USE_YN + ']').prop("checked", true);
										
					$("#edulec_crtDt").html(data.CRT_DT_TM);
					$("#edulec_crtUsrId").html(data.CRT_USR_NM);						
					
					$("#edulec_tch_Id").prop("disabled", true);
					$("#edulec_btnUpdate").show();
					$("#edulec_btnInsert").hide();					
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});
	   	},
	   	onPaging : function(pgButton)
	   	{	   		
	   		initLecturerSpec();
	   	}
	}).jqGrid("navGrid", "#edulec_pgLecturerList", {edit : false, add : false, del : false, search : false});

	// 조회 버튼 클릭 이벤트 등록
	$("#edulec_btnSearch").bind("click", btnSearch_clickEvent);	
	// 초기화 버튼 클릭 이벤트 등록
	$("#edulec_btnInit").bind("click", btnInit_clickEvent);
	
	// 추가 버튼 클릭 이벤트 등록
	$("#edulec_btnInsert").bind("click", btnInsert_clickEvent);
	// 수정 버튼 클릭 이벤트 등록
	$("#edulec_btnUpdate").bind("click", btnUpdate_clickEvent);
	// 초기화 버튼 클릭 이벤트 등록	
	$("#edulec_btnReset").bind("click", function(e)
	{
		$("#edulec_tblLecturerList").trigger("reloadGrid");
		initLecturerSpec();
	});

});