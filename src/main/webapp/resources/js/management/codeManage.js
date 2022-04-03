// 조회 조건 및 조회 값
var g_srchtype = "all";
var g_srchval = "";
var parntCd = null;
// 파라미터 셋팅_CodeTypeList
function getJsonStrCodeTypeList(notuse){
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c20wMDEuY29kZXR5cGVsaXN0QWxs",
		"map" : {
			"key" : "value",
			"ext9nm" : "Y",
			"notuse" : notuse
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 파라미터 셋팅_CodeList
function getJsonStrCodeList(tp_cd, notuse){
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c20wMDIuY29kZU1hbmFnZXJsaXN0",
		"map" : {
			"key" : "value",
			"tp_cd" : tp_cd,
			"optSrchType"	: g_srchtype,
			"tfSrchVal" 	: g_srchval,
			"ext9nm" : "Y",
			"notuse" : notuse
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

// 파라미터 셋팅_CodeSpec
function getJsonStrCodeSpec(tp_cd, cd){
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
function getJsonStrInsertCode(){
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "c20wMDIuaW5zZXJ0TWFuYWdlcg==",
		"map" : {
			"key" : "value",
			"tp_cd" : parntCd,
			"cd" : $("#cdMng_tfCode_cd").val(),
			"cd_nm" : $("#cdMng_tfCode_cd_nm").val(),
			"ext1_cd" : $("#cdMng_tfCode_ext1_cd").val(),
			"ext2_cd" : "",
			"ext3_cd" : "",
			"ext4_cd" : "",
			"ext5_cd" : "",
			"ext6_cd" : "",
			"ext7_cd" : "",
			"ext8_cd" : "",
			"ext9_cd" : "",
			"parnt_cd" : "",
			"parnt_tp_cd" : "",
			"cd_seq" : $("#cdMng_tfCode_cd_seq").val(),
			"use_yn" : $(":radio[name='rdCode_use_yn']:checked").val()
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 파라미터 셋팅_UpdateCode
function getJsonStrUpdateCode(){
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "c20wMDIudXBkYXRl",
		"map" : {
			"key" : "value",
			"tp_cd" :$("#cdMng_tfCodeTp_cd").val(),
			"cd" : $("#cdMng_tfCode_cd").val(),
			"cd_nm" : $("#cdMng_tfCode_cd_nm").val(),
			"ext1_cd" : $("#cdMng_tfCode_ext1_cd").val(),
			"ext2_cd" : "",
			"ext3_cd" : "",
			"ext4_cd" : "",
			"ext5_cd" : "",
			"ext6_cd" : "",
			"ext7_cd" : "",
			"ext8_cd" : "",
			"ext9_cd" : "",
			"parnt_cd" : "",
			"parnt_tp_cd" : "",
			"cd_seq" : $("#cdMng_tfCode_cd_seq").val(),
			"use_yn" : $(":radio[name='rdCode_use_yn']:checked").val()
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 코드타입 상세 초기화
function initCodetypeSpec(){
	$("#jstree").jstree(true).refresh();
}

// 코드 상세 초기화
function initCodeSpec(){
	$("#cdMng_btnAddCode").show();
	$("#cdMng_btnModCode").hide();
	$("#cdMng_btnInitCode").show();
	$("#cdMng_tfCode_cd").prop("disabled", true);
	$("#cdMng_tfCodeTp_cd").val("");
	$("#cdMng_tfCode_cd").val("");
	$("#cdMng_tfCode_cd_nm").val("");
	$("#cdMng_tfCode_cd_seq").val("");
	$("input:radio[name=rdCode_use_yn]:input[value=Y]").prop("checked", true);
	$("#tfCode_parnt_cd").val("");
	$("#tfCode_parnt_tp_cd").val("");
	$("#cdMng_tfCode_ext1_cd").val("");
	$("#tfCode_ext2_cd").val("");
	$("#tfCode_ext3_cd").val("");
	$("#tfCode_ext4_cd").val("");
	$("#tfCode_ext5_cd").val("");
	$("#tfCode_ext6_cd").val("");
	$("#tfCode_ext7_cd").val("");
	$("#tfCode_ext8_cd").val("");
	$("#tfCode_ext9_cd").val("");
}

// 코드 미사용포함 체크박스 클릭 이벤트
function chkNotUseCode_clickEvent(){
	$("#cdMng_tblCode").jqGrid("setGridParam", {
		postData : {
			pJson : getJsonStrCodeList(parntCd, $("input[id=cdMng_chkNotUseCode]:checkbox").prop("checked"))
		}, page : $(this).getGridParam("page"), 
		sortname : "CD", 
		sortorder : "asc"}
	).trigger("reloadGrid");
	
	initCodeSpec();
}

// 조회 버튼 클릭 이벤트
function btnSearch_clickEvent(){
	g_srchtype = $("#cdMng_optSrchtype").val();
	g_srchval = $("#cdMng_tfSrchval").val();
	
	if(!parntCd){
	    return;
	}
	
	$("#cdMng_tblCode").jqGrid("setGridParam", {postData : {pJson : getJsonStrCodeList(parntCd, $("input[id=cdMng_chkNotUseCode]:checkbox").prop("checked"))}, page : 1, sortname : "CD_ORD", sortorder : "asc"});
	$("#cdMng_tblCode").trigger("reloadGrid");
	
	initCodetypeSpec();
	initCodeSpec();
}

// 초기화 버튼 클릭 이벤트
function btnInit_clickEvent(){
	g_srchtype = "all";
	g_srchval = "";
	parntCd = null;
	$("#cdMng_optSrchtype").val("all");
	$("#cdMng_tfSrchval").val("");
	$("#cdMng_tfSrchval").prop("disabled", true);
	$("input[id=cdMng_chkNotUseCodetype]:checkbox").prop("checked", false) ;
	$("input[id=cdMng_chkNotUseCode]:checkbox").prop("checked", false) ;
	
	
	$("#cdMng_tblCode").jqGrid("setGridParam", {postData : {pJson : getJsonStrCodeList("", $("input[id=cdMng_chkNotUseCode]:checkbox").prop("checked"))}, page : 1, sortname : "CD_ORD", sortorder : "asc"});
	$("#cdMng_tblCode").trigger("reloadGrid");
	
	initCodetypeSpec();
	initCodeSpec();
}

// 검색타입 선택 이벤트
function optSrchtype_changeEvent(){
	if($("#cdMng_optSrchtype").val() == "all"){
		$("#cdMng_tfSrchval").prop("disabled", true);
		$("#cdMng_tfSrchval").val("");
	}else{
		$("#cdMng_tfSrchval").prop("disabled", false);
	}
}

// 코드 타입 validator
function checkCodetype(){
    var rMsg = "";
    
	if($("#tfCodetype_tp_cd").val() == "")
		rMsg += "\n\n코드타입을 입력 해 주세요.";
	
	if($("#tfCodetype_tp_nm").val() == "")
		rMsg += "\n\n코드타입명을 입력 해 주세요.";
    
	return rMsg;
}

// 코드 validator
function checkCode(){
    var rMsg = "";
	
	if($("#cdMng_tfCode_cd_nm").val() == "")
		rMsg += "\n\n코드명을 입력 해 주세요.";
	
	if($("#cdMng_tfCode_cd_seq").val() == "")
		rMsg += "\n\n순서을 입력 해 주세요.";
    
	return rMsg;
}

// 코드 상세 추가 버튼 클릭 이벤트
function btnAddCode_clickEvent(){
	if(parntCd== null){
		alert(parntCd);
		return;
	}
	var rMsg = checkCode();
	
	if(rMsg !== ""){
		alert(rMsg);
		return;
	}
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/management/codespec.do",
		data : "pJson=" + getJsonStrCodeSpec(parntCd, $("#cdMng_tfCode_cd").val()),
		success : function(data){
			if(data != null){
				alert("중복된 코드가 존재 합니다.");
				$("#cdMng_tfCode_cd").focus();
			}else{
				$.ajax({
					type : "post",
					dataType: "json",
					async : true,
					url : getContextPath() + "/ajax/management/insertCode.do",
					data : "pJson=" + getJsonStrInsertCode(),
					success : function(data){
				   		$("#cdMng_tblCode").trigger("reloadGrid");
				   		
				   		initCodeSpec();
				   		
				   		alert("추가되었습니다.");
					},
					error : function(data, status, err){
						networkErrorHandler(data, status, err);
					}
				});
			}
		},
		error : function(data, status, err){
			networkErrorHandler(data, status, err);
		}
	});
}

// 코드 상세 수정 버튼 클릭 이벤트
function btnModCode_clickEvent(){
	var rMsg = checkCode();
	
	if(rMsg !== ""){
		alert(rMsg);
		return;
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/management/updateCode.do",
		data : "pJson=" + getJsonStrUpdateCode(),
		success : function(data){
	   		$("#cdMng_tblCode").trigger("reloadGrid");
	   		
	   		initCodeSpec();
	   		
	   		alert("수정되었습니다.");
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}
function fnCatagoryall(){
	$.ajax({
		type : "POST",
		async : false,
		url : getContextPath() + "/ajax/management/codetypelist.do",
		data : "pJson=" + getJsonStrCodeTypeList($("input[id=cdMng_chkNotUseCodetype]:checkbox").prop("checked")),
		success : function(data){
			$("#jstree").html("");
			
			if(jr != ''){
				// param값을 JSON으로 파싱
				var jr = JSON.parse(data);
						$("#jstree").jstree({
							"core" : {"data" : jr},
							"plugins" : [ "search" ]
						}).bind("loaded.jstree", function(event, data) {
							$(this).jstree("open_all");
						});
			}
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	$("#jstree").bind("select_node.jstree", function(event, data){
		parntCd = data.node.original.id;
	 
   		$("#cdMng_tblCode").jqGrid("setGridParam", {postData : {pJson : getJsonStrCodeList(parntCd, $("input[id=cdMng_chkNotUseCode]:checkbox").prop("checked"))}, page : 1, sortname : "CD_ORD", sortorder : "asc"});
   		$("#cdMng_tblCode").trigger("reloadGrid");
   		initCodeSpec();
   		$("#cdMng_btnAddCode").show();
	});	
	

}
// init Page
$(document).ready(function(){
	$("#cdMng_tfSrchval").prop("disabled", true);
	initCodeSpec();
	fnCatagoryall();
	
	// 코드 jqgrid
	$("#cdMng_tblCode").jqGrid({
		url : getContextPath() + "/jqgrid/management/codelist.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrCodeList("", $("input[id=cdMng_chkNotUseCode]:checkbox").prop("checked"))
		},
	   	colNames : ["코드", "코드명", "순서", "사용여부"],
	   	colModel :
	   	[
	   		{ name : "CD", index : "CD", width : 120, align : "center" },
	   		{ name : "CD_NM", index : "CD_NM", width : 200 },
	   		{ name : "CD_ORD", index : "CD_ORD", width : 80, align : "center" },
	   		{ name : "USE_YN", index : "USE_YN", width : 80, align : "center" },
	   	],
	   	sortname : "CD_ORD",
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
	   	pager : "#cdMng_pagingCode",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
	   	onSelectRow : function(rowid){
	   		$("#cdMng_btnAddCode").hide();
	   		$("#cdMng_btnModCode").show();
	   		$("#cdMng_btnInitCode").show();
	   		$("#cdMng_tfCode_cd").prop("disabled", true);
	   		
	   		var row = $("#cdMng_tblCode").getRowData(rowid);
	   		
	   		$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/management/codespec.do",
				data : "pJson=" + getJsonStrCodeSpec(parntCd, row.CD),
				success : function(data){
					
				      var to = false;
						if(to) { clearTimeout(to); }
					    to = setTimeout(function () {
					      var v = data.TP_NM;
					      $('#jstree').jstree(true).search(v);
					      $(" .jstree-search").focus();
					    }, 250);
					$("#cdMng_tfCodeTp_cd").val(data.TP_CD);
					$("#cdMng_tfCode_cd").val(data.CD);
			   		$("#cdMng_tfCode_cd_nm").val(data.CD_NM);
			   		$("#cdMng_tfCode_cd_seq").val(data.CD_ORD);
			   		$("input:radio[name=rdCode_use_yn]:input[value=" + data.USE_YN + "]").prop("checked", true);
			   		$("#tfCode_parnt_cd").val(data.PARNT_CD);
			   		$("#tfCode_parnt_tp_cd").val(data.PARNT_TP_CD);
			   		$("#cdMng_tfCode_ext1_cd").val(data.EXT1_CD);
				},
				error : function(data, status, err){
					networkErrorHandler(data, status, err);
				}
			});
	   	},
	   	onPaging : function(pgButton){
	   		//initCodeSpec();
	   	}
	}).jqGrid("navGrid", "#cdMng_pagingCode", {edit : false, add : false, del : false, search : false});
	
	// 조회 버튼 클릭 이벤트 등록
	$("#cdMng_btnSearch").bind("click", btnSearch_clickEvent);
	
	// 초기화 버튼 클릭 이벤트 등록
	$("#cdMng_btnInit").bind("click", btnInit_clickEvent);
	
	// 미사용포함 체크박스 클릭 이벤트 등록
	$("#cdMng_chkNotUseCode").bind("click", chkNotUseCode_clickEvent);
	
	// 검색어 텍스트인풋 엔터 키 이벤트 등록
	$("#cdMng_tfSrchval").bind("keydown", function (key){
		if (key.keyCode == 13)
			btnSearch_clickEvent();
	});
	
	// 검색타입 선택 이벤트 등록
	$("#cdMng_optSrchtype").bind("change", optSrchtype_changeEvent);
	
	// 코드 상세 추가 버튼 클릭 이벤트 등록
	$("#cdMng_btnAddCode").bind("click", btnAddCode_clickEvent);
	
	// 코드 상세 수정 버튼 클릭 이벤트 등록
	$("#cdMng_btnModCode").bind("click", btnModCode_clickEvent);
	
	// 코드 상세 초기화 버튼 클릭 이벤트 등록
	$("#cdMng_btnInitCode").bind("click", function(e){
		$("#cdMng_tblCode").trigger("reloadGrid");
		initCodeSpec();
	});
});