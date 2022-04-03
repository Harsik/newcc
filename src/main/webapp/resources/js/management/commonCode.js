// 조회 조건 및 조회 값
var g_srchtype = "all";
var g_srchval = "";

// 파라미터 셋팅_CodeTypeList
function getJsonStrCodeTypeList(srchtype, srchval, notuse)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c20wMDEuY29kZXR5cGVsaXN0",
		"map" : {
			"key" : "value",
			"srchtype" : srchtype,
			"srchval" : srchval,
			"notuse" : notuse
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 파라미터 셋팅_CodeTypeSpec
function getJsonStrCodeTypeSpec(tp_cd)
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "c20wMDEuY29kZXR5cGVzcGVj",
		"map" : {
			"key" : "value",
			"tp_cd" : tp_cd
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 파라미터 셋팅_InsertCodetype
function getJsonStrInsertCodeType()
{
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "c20wMDEuaW5zZXJ0",
		"map" : {
			"key" : "value",
			"tp_cd" : $("#cmCd_tfCodetype_tp_cd").val(),
			"tp_nm" : $("#cmCd_tfCodetype_tp_nm").val(),
			"ext1_nm" : $("#cmCd_tfCodetype_ext1_nm").val(),
			"ext2_nm" : $("#cmCd_tfCodetype_ext2_nm").val(),
			"ext3_nm" : $("#cmCd_tfCodetype_ext3_nm").val(),
			"ext4_nm" : $("#cmCd_tfCodetype_ext4_nm").val(),
			"ext5_nm" : $("#cmCd_tfCodetype_ext5_nm").val(),
			"ext6_nm" : $("#cmCd_tfCodetype_ext6_nm").val(),
			"ext7_nm" : $("#cmCd_tfCodetype_ext7_nm").val(),
			"ext8_nm" : $("#cmCd_tfCodetype_ext8_nm").val(),
			"ext9_nm" : $(":radio[name='tfCodetype_ext9_nm']:checked").val(),
			"use_yn" : $(":radio[name='rdCodetype_use_yn']:checked").val()
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 파라미터 셋팅_UpdateCodetype
function getJsonStrUpdateCodetype()
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "c20wMDEudXBkYXRl",
		"map" : {
			"key" : "value",
			"tp_cd" : $("#cmCd_tfCodetype_tp_cd").val(),
			"tp_nm" : $("#cmCd_tfCodetype_tp_nm").val(),
			"ext1_nm" : $("#cmCd_tfCodetype_ext1_nm").val(),
			"ext2_nm" : $("#cmCd_tfCodetype_ext2_nm").val(),
			"ext3_nm" : $("#cmCd_tfCodetype_ext3_nm").val(),
			"ext4_nm" : $("#cmCd_tfCodetype_ext4_nm").val(),
			"ext5_nm" : $("#cmCd_tfCodetype_ext5_nm").val(),
			"ext6_nm" : $("#cmCd_tfCodetype_ext6_nm").val(),
			"ext7_nm" : $("#cmCd_tfCodetype_ext7_nm").val(),
			"ext8_nm" : $("#cmCd_tfCodetype_ext8_nm").val(),
			"ext9_nm" :  $(":radio[name='tfCodetype_ext9_nm']:checked").val(),
			"use_yn" : $(":radio[name='rdCodetype_use_yn']:checked").val()
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 파라미터 셋팅_CodeList
function getJsonStrCodeList(tp_cd, notuse)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c20wMDIuY29kZWxpc3Q=",
		"map" : {
			"key" : "value",
			"tp_cd" : tp_cd,
			"notuse" : notuse
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

// 파라미터 셋팅_CodeSpec
function getJsonStrCodeSpec(tp_cd, cd)
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "c20wMDIuY29kZXNwZWM=",
		"map" : {
			"key" : "value",
			"tp_cd" : tp_cd,
			"cd" : cd
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 파라미터 셋팅_InsertCode
function getJsonStrInsertCode()
{
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "c20wMDIuaW5zZXJ0",
		"map" : {
			"key" : "value",
			"tp_cd" : $("#cmCd_tfCodetype_tp_cd").val(),
			"cd" : $("#cmCd_tfCode_cd").val(),
			"cd_nm" : $("#cmCd_tfCode_cd_nm").val(),
			"ext1_cd" : $("#cmCd_tfCode_ext1_cd").val(),
			"ext2_cd" : $("#cmCd_tfCode_ext2_cd").val(),
			"ext3_cd" : $("#cmCd_tfCode_ext3_cd").val(),
			"ext4_cd" : $("#cmCd_tfCode_ext4_cd").val(),
			"ext5_cd" : $("#cmCd_tfCode_ext5_cd").val(),
			"ext6_cd" : $("#cmCd_tfCode_ext6_cd").val(),
			"ext7_cd" : $("#cmCd_tfCode_ext7_cd").val(),
			"ext8_cd" : $("#cmCd_tfCode_ext8_cd").val(),
			"ext9_cd" : $("#cmCd_tfCode_ext9_cd").val(),
			"parnt_cd" : $("#cmCd_tfCode_parnt_cd").val(),
			"parnt_tp_cd" : $("#cmCd_tfCode_parnt_tp_cd").val(),
			"cd_seq" : $("#cmCd_tfCode_cd_seq").val(),
			"use_yn" : $(":radio[name='rdCode_use_yn']:checked").val()
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 파라미터 셋팅_UpdateCode
function getJsonStrUpdateCode()
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "c20wMDIudXBkYXRl",
		"map" : {
			"key" : "value",
			"tp_cd" : $("#cmCd_tfCodetype_tp_cd").val(),
			"cd" : $("#cmCd_tfCode_cd").val(),
			"cd_nm" : $("#cmCd_tfCode_cd_nm").val(),
			"ext1_cd" : $("#cmCd_tfCode_ext1_cd").val(),
			"ext2_cd" : $("#cmCd_tfCode_ext2_cd").val(),
			"ext3_cd" : $("#cmCd_tfCode_ext3_cd").val(),
			"ext4_cd" : $("#cmCd_tfCode_ext4_cd").val(),
			"ext5_cd" : $("#cmCd_tfCode_ext5_cd").val(),
			"ext6_cd" : $("#cmCd_tfCode_ext6_cd").val(),
			"ext7_cd" : $("#cmCd_tfCode_ext7_cd").val(),
			"ext8_cd" : $("#cmCd_tfCode_ext8_cd").val(),
			"ext9_cd" : $("#cmCd_tfCode_ext9_cd").val(),
			"parnt_cd" : $("#cmCd_tfCode_parnt_cd").val(),
			"parnt_tp_cd" : $("#cmCd_tfCode_parnt_tp_cd").val(),
			"cd_seq" : $("#cmCd_tfCode_cd_seq").val(),
			"use_yn" : $(":radio[name='rdCode_use_yn']:checked").val()
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 코드타입 상세 초기화
function initCodetypeSpec()
{
	$("#cmCd_btnAddCodetype").show();
	$("#cmCd_btnModCodetype").hide();
	$("#cmCd_btnInitCodetype").show();
	$("#cmCd_tfCodetype_tp_cd").prop("disabled", false);
	
	$("#cmCd_tfCodetype_tp_cd").val("");
	$("#cmCd_tfCodetype_tp_nm").val("");
	$("input:radio[name=rdCodetype_use_yn]:input[value=Y]").prop("checked", true);
	$("#cmCd_tfCodetype_ext1_nm").val("");
	$("#cmCd_tfCodetype_ext2_nm").val("");
	$("#cmCd_tfCodetype_ext3_nm").val("");
	$("#cmCd_tfCodetype_ext4_nm").val("");
	$("#cmCd_tfCodetype_ext5_nm").val("");
	$("#cmCd_tfCodetype_ext6_nm").val("");
	$("#cmCd_tfCodetype_ext7_nm").val("");
	$("#cmCd_tfCodetype_ext8_nm").val("");
	$("input:radio[name=tfCodetype_ext9_nm]:input[value=N]").prop("checked", true);
}

// 코드 상세 초기화
function initCodeSpec()
{
	$("#cmCd_btnAddCode").show();
	$("#cmCd_btnModCode").hide();
	$("#cmCd_btnInitCode").show();
	$("#cmCd_tfCode_cd").prop("disabled", false);
	
	$("#cmCd_tfCode_cd").val("");
	$("#cmCd_tfCode_cd_nm").val("");
	$("#cmCd_tfCode_cd_seq").val("");
	$("input:radio[name=rdCode_use_yn]:input[value=Y]").prop("checked", true);
	$("#cmCd_tfCode_parnt_cd").val("");
	$("#cmCd_tfCode_parnt_tp_cd").val("");
	$("#cmCd_tfCode_ext1_cd").val("");
	$("#cmCd_tfCode_ext2_cd").val("");
	$("#cmCd_tfCode_ext3_cd").val("");
	$("#cmCd_tfCode_ext4_cd").val("");
	$("#cmCd_tfCode_ext5_cd").val("");
	$("#cmCd_tfCode_ext6_cd").val("");
	$("#cmCd_tfCode_ext7_cd").val("");
	$("#cmCd_tfCode_ext8_cd").val("");
	$("#cmCd_tfCode_ext9_cd").val("");
}

// 코드타입 미사용포함 체크박스 클릭 이벤트
function chkNotUseCodetype_clickEvent()
{
	$("#cmCd_tblCodetype").jqGrid("setGridParam", {
		postData : {
			pJson : getJsonStrCodeTypeList(g_srchtype, g_srchval, $("input[id=cmCd_chkNotUseCodetype]:checkbox").prop("checked"))
		}, 
		page : $(this).getGridParam("page"), 
		sortname : "TP_CD", 
		sortorder : "asc"}
	).trigger("reloadGrid");
	
	$("#cmCd_tblCode").jqGrid("setGridParam", {
		postData : {
			pJson : getJsonStrCodeList("", $("input[id=cmCd_chkNotUseCode]:checkbox").prop("checked"))
		}, 
		page : $(this).getGridParam("page"), 
		sortname : "CD", 
		sortorder : "asc"
	}).trigger("reloadGrid");
	
	initCodetypeSpec();
	initCodeSpec();
}

// 코드 미사용포함 체크박스 클릭 이벤트
function chkNotUseCode_clickEvent()
{
	var tp_cd = $("#cmCd_tblCodetype").jqGrid("getRowData", $("#cmCd_tblCodetype").jqGrid("getGridParam", "selrow")).TP_CD;
	
	if(tp_cd == null)
		tp_cd = "";
	
	$("#cmCd_tblCode").jqGrid("setGridParam", {
		postData : {
			pJson : getJsonStrCodeList(tp_cd, $("input[id=cmCd_chkNotUseCode]:checkbox").prop("checked"))
		}, page : $(this).getGridParam("page"), 
		sortname : "CD", 
		sortorder : "asc"}
	).trigger("reloadGrid");
	
	initCodeSpec();
}

// 조회 버튼 클릭 이벤트
function btnSearch_clickEvent()
{
	g_srchtype = $("#cmCd_optSrchtype").val();
	g_srchval = $("#cmCd_tfSrchval").val();
	
	$("#cmCd_tblCodetype").jqGrid("setGridParam", {postData : {pJson : getJsonStrCodeTypeList(g_srchtype, g_srchval, $("input[id=cmCd_chkNotUseCodetype]:checkbox").prop("checked"))}, page : 1, sortname : "TP_CD", sortorder : "asc"});
	$("#cmCd_tblCodetype").trigger("reloadGrid");
	
	$("#cmCd_tblCode").jqGrid("setGridParam", {postData : {pJson : getJsonStrCodeList("", $("input[id=cmCd_chkNotUseCode]:checkbox").prop("checked"))}, page : 1, sortname : "CD", sortorder : "asc"});
	$("#cmCd_tblCode").trigger("reloadGrid");
	
	initCodetypeSpec();
	initCodeSpec();
}

// 초기화 버튼 클릭 이벤트
function btnInit_clickEvent()
{
	g_srchtype = "all";
	g_srchval = "";
	
	$("#cmCd_optSrchtype").val("all");
	$("#cmCd_tfSrchval").val("");
	//$("#cmCd_tfSrchval").prop("disabled", true);
	$("input[id=cmCd_chkNotUseCodetype]:checkbox").prop("checked", false) ;
	$("input[id=cmCd_chkNotUseCode]:checkbox").prop("checked", false) ;
	
	$("#cmCd_tblCodetype").jqGrid("setGridParam", {postData : {pJson : getJsonStrCodeTypeList("", "", $("input[id=cmCd_chkNotUseCodetype]:checkbox").prop("checked"))}, page : 1, sortname : "TP_CD", sortorder : "asc"});
	$("#cmCd_tblCodetype").trigger("reloadGrid");
	
	$("#cmCd_tblCode").jqGrid("setGridParam", {postData : {pJson : getJsonStrCodeList("", $("input[id=cmCd_chkNotUseCode]:checkbox").prop("checked"))}, page : 1, sortname : "CD", sortorder : "asc"});
	$("#cmCd_tblCode").trigger("reloadGrid");
	
	initCodetypeSpec();
	initCodeSpec();
}

// 검색타입 선택 이벤트
function optSrchtype_changeEvent()
{
	if($("#cmCd_optSrchtype").val() == "all")
	{
		//$("#cmCd_tfSrchval").prop("disabled", true);
		$("#cmCd_tfSrchval").val("");
	}
	else
		$("#cmCd_tfSrchval").prop("disabled", false);
}

// 코드 타입 validator
function checkCodetype()
{
    var rMsg = "";
    
	if($("#cmCd_tfCodetype_tp_cd").val() == "")
		rMsg += "\n\n코드타입을 입력 해 주세요.";
	
	if($("#cmCd_tfCodetype_tp_nm").val() == "")
		rMsg += "\n\n코드타입명을 입력 해 주세요.";
    
	return rMsg;
}

// 코드타입 상세 추가 버튼 클릭 이벤트
function btnAddCodetype_clickEvent()
{
	var rMsg = checkCodetype();
	
	if(rMsg !== "")
	{
		alert(rMsg);
		return;
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/management/codetypespec.do",
		data : "pJson=" + getJsonStrCodeTypeSpec($("#cmCd_tfCodetype_tp_cd").val()),
		success : function(data)
		{
			if(data != null)
			{
				alert("중복된 코드타입이 존재 합니다.");
				$("#cmCd_tfCodetype_tp_cd").focus();
			}
			else
			{
				$.ajax({
					type : "post",
					dataType: "json",
					async : true,
					url : getContextPath() + "/ajax/management/insertCodetype.do",
					data : "pJson=" + getJsonStrInsertCodeType(),
					success : function(data)
					{
						$("#cmCd_tblCodetype").trigger("reloadGrid");
						
						$("#cmCd_tblCode").jqGrid("setGridParam", {postData : {pJson : getJsonStrCodeList("", $("input[id=cmCd_chkNotUseCode]:checkbox").prop("checked"))}, page : 1, sortname : "CD", sortorder : "asc"});
				   		$("#cmCd_tblCode").trigger("reloadGrid");
				   		
				   		initCodetypeSpec();
				   		initCodeSpec();
				   		
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

// 코드타입 상세 수정 버튼 클릭 이벤트
function btnModCodetype_clickEvent()
{
	var rMsg = checkCodetype();
	
	if(rMsg !== "")
	{
		alert(rMsg);
		return;
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/management/updateCodetype.do",
		data : "pJson=" + getJsonStrUpdateCodetype(),
		success : function(data)
		{
			$("#cmCd_tblCodetype").trigger("reloadGrid");
			
			$("#cmCd_tblCode").jqGrid("setGridParam", {postData : {pJson : getJsonStrCodeList("", $("input[id=cmCd_chkNotUseCode]:checkbox").prop("checked"))}, page : $(this).getGridParam("page"), sortname : "CD", sortorder : "asc"});
	   		$("#cmCd_tblCode").trigger("reloadGrid");
	   		
	   		initCodetypeSpec();
	   		initCodeSpec();
	   		
	   		alert("수정되었습니다.");
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

// 코드 validator
function checkCode()
{
    var rMsg = "";
    
	if($("#cmCd_tfCode_cd").val() == "")
		rMsg += "\n\n코드를 입력 해 주세요.";
	
	if($("#cmCd_tfCode_cd_nm").val() == "")
		rMsg += "\n\n코드명을 입력 해 주세요.";
    
	return rMsg;
}

// 코드 상세 추가 버튼 클릭 이벤트
function btnAddCode_clickEvent()
{
	var rMsg = checkCode();
	
	if(rMsg !== "")
	{
		alert(rMsg);
		return;
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/management/codespec.do",
		data : "pJson=" + getJsonStrCodeSpec($("#cmCd_tblCodetype").jqGrid("getRowData", $("#cmCd_tblCodetype").jqGrid("getGridParam", "selrow")).TP_CD, $("#cmCd_tfCode_cd").val()),
		success : function(data)
		{
			if(data != null)
			{
				alert("중복된 코드가 존재 합니다.");
				$("#cmCd_tfCode_cd").focus();
			}
			else
			{
				$.ajax({
					type : "post",
					dataType: "json",
					async : true,
					url : getContextPath() + "/ajax/management/insertCode.do",
					data : "pJson=" + getJsonStrInsertCode(),
					success : function(data)
					{
				   		$("#cmCd_tblCode").trigger("reloadGrid");
				   		
				   		initCodeSpec();
				   		
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

// 코드 상세 수정 버튼 클릭 이벤트
function btnModCode_clickEvent()
{
	var rMsg = checkCode();
	
	if(rMsg !== "")
	{
		alert(rMsg);
		return;
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/management/updateCode.do",
		data : "pJson=" + getJsonStrUpdateCode(),
		success : function(data)
		{
	   		$("#cmCd_tblCode").trigger("reloadGrid");
	   		
	   		initCodeSpec();
	   		
	   		alert("수정되었습니다.");
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

// init Page
$(document).ready(function()
{
	//$("#cmCd_tfSrchval").prop("disabled", true);
	
	initCodetypeSpec();
	initCodeSpec();
	
	// 코드타입 jqgrid
	$("#cmCd_tblCodetype").jqGrid(
	{
		url : getContextPath() + "/jqgrid/management/codetypelist.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrCodeTypeList("", "", $("input[id=cmCd_chkNotUseCodetype]:checkbox").prop("checked"))
		},
		jsonReader :
		{
			repeatitems: false
		},
	   	colNames : ["타입", "타입명", "사용여부"],
	   	colModel :
	   	[
	   		{ name : "TP_CD", index : "TP_CD", width : 120, align : "center" },
	   		{ name : "TP_NM", index : "TP_NM", width : 200 },
	   		{ name : "USE_YN", index : "USE_YN", width : 80, align : "center" },
	   	],
	   	sortname : "TP_CD",
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
	   	pager : "#cmCd_pagingCodetype",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{
	   		$("#cmCd_btnAddCodetype").hide();
	   		$("#cmCd_btnModCodetype").show();
	   		$("#cmCd_btnInitCodetype").show();
	   		$("#cmCd_tfCodetype_tp_cd").prop("disabled", true);
	   		
	   		var row = $("#cmCd_tblCodetype").getRowData(rowid);
	   		
	   		$("#cmCd_tblCode").jqGrid("setGridParam", {postData : {pJson : getJsonStrCodeList(row.TP_CD, $("input[id=cmCd_chkNotUseCode]:checkbox").prop("checked"))}, page : 1, sortname : "CD", sortorder : "asc"});
	   		$("#cmCd_tblCode").trigger("reloadGrid");
	   		
	   		$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/management/codetypespec.do",
				data : "pJson=" + getJsonStrCodeTypeSpec(row.TP_CD),
				success : function(data)
				{
					$("#cmCd_tfCodetype_tp_cd").val(data.TP_CD);
			   		$("#cmCd_tfCodetype_tp_nm").val(data.TP_NM);
			   		$("input:radio[name=rdCodetype_use_yn]:input[value=" + data.USE_YN + "]").prop("checked", true);
			   		$("#cmCd_tfCodetype_ext1_nm").val(data.EXT1_NM);
			   		$("#cmCd_tfCodetype_ext2_nm").val(data.EXT2_NM);
			   		$("#cmCd_tfCodetype_ext3_nm").val(data.EXT3_NM);
			   		$("#cmCd_tfCodetype_ext4_nm").val(data.EXT4_NM);
			   		$("#cmCd_tfCodetype_ext5_nm").val(data.EXT5_NM);
			   		$("#cmCd_tfCodetype_ext6_nm").val(data.EXT6_NM);
			   		$("#cmCd_tfCodetype_ext7_nm").val(data.EXT7_NM);
			   		$("#cmCd_tfCodetype_ext8_nm").val(data.EXT8_NM);
			   		$("input:radio[name=tfCodetype_ext9_nm]:input[value=" + data.EXT9_NM + "]").prop("checked", true);
			   		
			   		initCodeSpec();
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});
	   	},
	   	onPaging : function(pgButton)
	   	{
	   		$("#cmCd_tblCode").jqGrid("setGridParam", {postData : {pJson : getJsonStrCodeList("", $("input[id=cmCd_chkNotUseCode]:checkbox").prop("checked"))}, page : 1, sortname : "CD", sortorder : "asc"});
	   		$("#cmCd_tblCode").trigger("reloadGrid");
	   		
	   		initCodetypeSpec();
	   		initCodeSpec();
	   	}
	}).jqGrid("navGrid", "#cmCd_pagingCodetype", {edit : false, add : false, del : false, search : false});
	
	// 코드 jqgrid
	$("#cmCd_tblCode").jqGrid(
	{
		url : getContextPath() + "/jqgrid/management/codelist.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrCodeList("", $("input[id=cmCd_chkNotUseCode]:checkbox").prop("checked"))
		},
	   	colNames : ["코드", "코드명", "순서", "사용여부"],
	   	colModel :
	   	[
	   		{ name : "CD", index : "CD", width : 120, align : "center" },
	   		{ name : "CD_NM", index : "CD_NM", width : 200 },
	   		{ name : "CD_ORD", index : "CD_ORD", width : 80, align : "center" },
	   		{ name : "USE_YN", index : "USE_YN", width : 80, align : "center" },
	   	],
	   	sortname : "CD",
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
	   	pager : "#cmCd_pagingCode",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
	   	onSelectRow : function(rowid)
	   	{
	   		$("#cmCd_btnAddCode").hide();
	   		$("#cmCd_btnModCode").show();
	   		$("#cmCd_btnInitCode").show();
	   		$("#cmCd_tfCode_cd").prop("disabled", true);
	   		
	   		var row = $("#cmCd_tblCode").getRowData(rowid);
	   		
	   		$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/management/codespec.do",
				data : "pJson=" + getJsonStrCodeSpec($("#cmCd_tblCodetype").jqGrid("getRowData", $("#cmCd_tblCodetype").jqGrid("getGridParam", "selrow")).TP_CD, row.CD),
				success : function(data)
				{
					$("#cmCd_tfCode_cd").val(data.CD);
			   		$("#cmCd_tfCode_cd_nm").val(data.CD_NM);
			   		$("#cmCd_tfCode_cd_seq").val(data.CD_ORD);
			   		$("input:radio[name=rdCode_use_yn]:input[value=" + data.USE_YN + "]").prop("checked", true);
			   		$("#cmCd_tfCode_parnt_cd").val(data.PARNT_CD);
			   		$("#cmCd_tfCode_parnt_tp_cd").val(data.PARNT_TP_CD);
			   		$("#cmCd_tfCode_ext1_cd").val(data.EXT1_CD);
			   		$("#cmCd_tfCode_ext2_cd").val(data.EXT2_CD);
			   		$("#cmCd_tfCode_ext3_cd").val(data.EXT3_CD);
			   		$("#cmCd_tfCode_ext4_cd").val(data.EXT4_CD);
			   		$("#cmCd_tfCode_ext5_cd").val(data.EXT5_CD);
			   		$("#cmCd_tfCode_ext6_cd").val(data.EXT6_CD);
			   		$("#cmCd_tfCode_ext7_cd").val(data.EXT7_CD);
			   		$("#cmCd_tfCode_ext8_cd").val(data.EXT8_CD);
			   		$("#cmCd_tfCode_ext9_cd").val(data.EXT9_CD);
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});
	   	},
	   	onPaging : function(pgButton)
	   	{
	   		initCodeSpec();
	   	}
	}).jqGrid("navGrid", "#cmCd_pagingCode", {edit : false, add : false, del : false, search : false});
	
	$("#cmCd_tfSrchval").focus();
	
	// 조회 버튼 클릭 이벤트 등록
	$("#cmCd_btnSearch").bind("click", btnSearch_clickEvent);
	
	// 초기화 버튼 클릭 이벤트 등록
	$("#cmCd_btnInit").bind("click", btnInit_clickEvent);
	
	// 미사용포함 체크박스 클릭 이벤트 등록
	$("#cmCd_chkNotUseCodetype").bind("click", chkNotUseCodetype_clickEvent);
	$("#cmCd_chkNotUseCode").bind("click", chkNotUseCode_clickEvent);
	
	// 검색어 텍스트인풋 엔터 키 이벤트 등록
	$("#cmCd_tfSrchval").bind("keydown", function (key)
	{
		if (key.keyCode == 13)
			btnSearch_clickEvent();
	});
	
	// 검색타입 선택 이벤트 등록
	$("#cmCd_optSrchtype").bind("change", optSrchtype_changeEvent);
	
	// 코드타입 상세 추가 버튼 클릭 이벤트 등록
	$("#cmCd_btnAddCodetype").bind("click", btnAddCodetype_clickEvent);
	
	// 코드타입 상세 수정 버튼 클릭 이벤트 등록
	$("#cmCd_btnModCodetype").bind("click", btnModCodetype_clickEvent);
	
	// 코드타입 상세 초기화 버튼 클릭 이벤트 등록
	$("#cmCd_btnInitCodetype").bind("click", function(e)
	{
		$("#cmCd_tblCodetype").trigger("reloadGrid");
		initCodetypeSpec();
	});
	
	// 코드 상세 추가 버튼 클릭 이벤트 등록
	$("#cmCd_btnAddCode").bind("click", btnAddCode_clickEvent);
	
	// 코드 상세 수정 버튼 클릭 이벤트 등록
	$("#cmCd_btnModCode").bind("click", btnModCode_clickEvent);
	
	// 코드 상세 초기화 버튼 클릭 이벤트 등록
	$("#cmCd_btnInitCode").bind("click", function(e)
	{
		$("#cmCd_tblCode").trigger("reloadGrid");
		initCodeSpec();
	});
});