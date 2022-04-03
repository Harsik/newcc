// 사용자목록에서 선택한 행의 id 값
var gSelectUser="";
var gTpCd = "90006";
var gRowLength = 0;
var gUpdcnt = 0;

var g_use_yn = true;
//파라미터 셋팅_getJsonStrUserList
function getJsonStrUserList(usrAth_optSrchType, usrAth_tfSrchVal, usrAth_chkRetire)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"optSrchType" : usrAth_optSrchType,
			"tfSrchVal" : usrAth_tfSrchVal,
			"chkRetire" : usrAth_chkRetire,
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonStrAuthList
function getJsonStrAuthList()
{
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "c20wMDIuY29kZWxpc3Q=",
			"map" : {
				"key" : "value",
				"tp_cd" : gTpCd,
				"notuse" : false
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 파라미터 셋팅_getJsonStrCntrCodeList
function getJsonStrCntrCodeList(tp_cd)
{
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "c20wMDIuY29kZWxpc3Q=",
			"map" : {
				"key" : "value",
				"parnt_cd" : $("#cntrCd").val(),
				"tp_cd" : tp_cd,
			}
		};
		
		console.log(JSON.stringify(loParam));
		return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonStrUseAuthList
function getJsonStrUseAuthList(usr_id, usrAth_chkNotUse)
{
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b3IwMDIudXNlQXV0aExpc3Q=",
			"map" : {
				"key" : "value",
				"tp_cd" : gTpCd,
				"usr_id" : usr_id,
				"chkNotUse" : usrAth_chkNotUse
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonStrUsrAuthList
function getJsonStrUsrAuthList(usr_id, usrAth_chkNotUse)
{
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b3IwMDIudXNyQXV0aExpc3Q=",
			"map" : {
				"key" : "value",
				"usr_id" : usr_id,
				"chkNotUse" : usrAth_chkNotUse
			}
	};
	
	console.log("check" + JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_getJsonStrGroupListUpdate
function getJsonStrGroupListUpdate(usr_id, use_yn, cd)
{
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "b3IwMDIudXNlckF1dGhVcGRhdGU=",
			"map" : {
				"key" : "value",
				"usr_id" : usr_id,
				"use_yn" : use_yn,
				"cd" : cd
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 조회 버튼 클릭 이벤트
function userSearch_clickEvent()
{
	var usrAth_optSrchType = $("#usrAth_optSrchType").val(),
		usrAth_tfSrchVal = $.trim($("#usrAth_tfSrchVal").val()), 
		usrAth_chkRetire = $("#usrAth_chkRetire").prop("checked");
	
	$("#usrAth_tblUsr").jqGrid("setGridParam", {postData : {pJson : getJsonStrUserList(usrAth_optSrchType, usrAth_tfSrchVal, usrAth_chkRetire)}, page : 1, sortname : "USR_ID", sortorder : "asc"});
	$("#usrAth_tblUsr").trigger("reloadGrid");
	initGroupList();
}

// 초기화 버튼 클릭 이벤트
function btnInit_clickEvent() 
{
	$("#usrAth_optSrchType").val("all");
	$("#usrAth_tfSrchVal").val("");
	$("#usrAth_tfSrchVal").prop("disabled",true);
	$("#usrAth_chkRetire").prop("checked", false);
	
	userSearch_clickEvent();
	initGroupList();
}

//검색타입 선택 이벤트
function srchType_changeEvent()
{
	if($("#usrAth_optSrchType").val() == "all")
	{
		$("#usrAth_tfSrchVal").prop("disabled", true);
		$("#usrAth_tfSrchVal").val("");
	}
	else
		$("#usrAth_tfSrchVal").prop("disabled", false);
}

// 권한 체크박스 클릭 이벤트
function chkNotUse_clickEvent() 
{
	var use_yn = $("#usrAth_chkNotUse").prop("checked");
	
	if(use_yn == true)
	{
		$("#usrAth_tblGroup").jqGrid("setGridParam", {
			postData :  {
				pJson : getJsonStrAuthList(use_yn)
			}, 
			page : $(this).getGridParam("page"), 
			sortname : "CD", sortorder : "asc"
		}).trigger("reloadGrid");
	}
	else
	{
		$("#usrAth_tblGroup").jqGrid("setGridParam", {
			postData :  {
				pJson : getJsonStrUseAuthList(gSelectUser.USR_ID, use_yn)
			}, 
			page : $(this).getGridParam("page"),
			sortname : "CD",
			sortorder : "asc"
		}).trigger("reloadGrid");
	}
	
	g_use_yn = true;
}

// 그룹 리스트 리셋
function initGroupList() 
{
	g_use_yn = true;
	$("#usrAth_btnGroupUp").hide();
	$("#line1").css("display","block");
	
	$("#usrAth_chkNotUse").prop({"checked" : true, "disabled" : true});
	gSelectUser = "";
	
	$("#usrAth_tblGroup").jqGrid("setGridParam", { postData :  {pJson : getJsonStrAuthList($("#usrAth_chkNotUse").prop("checked"))}, page : 1, sortname : "CD", sortorder : "asc"});
	$("#usrAth_tblGroup").trigger("reloadGrid");
}

// 선택 컬럼 클릭 시 전체 선택/해제 클릭 이벤트
function useYn_clickEvent() 
{
	var rowNum = $('#usrAth_tblGroup').getGridParam('rowNum');
	if(g_use_yn)
	{
		for( var j = 1; j <= rowNum; j++)
		{
			$("#usrAth_tblGroup").setCell(j, 2, "1");
		}
		g_use_yn = false;
	}
	else
	{
		for( var j = 1; j <= rowNum; j++)
		{
			$("#usrAth_tblGroup").setCell(j, 2, "0");
		}
		g_use_yn = true;
	}
}

// 업데이트 성공 시 Alert창 띄우는 함수
function updateAlert() 
{
	gUpdcnt++;
	
	if(gUpdcnt == gRowLength)
		alert("저장되었습니다.");
	
}

// 그룹 업데이트 버튼 클릭 이벤트
function btnGroupUp_clickEvent() 
{
	var rowNum = $("#usrAth_tblGroup").getGridParam("rowNum");
	var currentPageNum = $("#usrAth_tblGroup").getGridParam("page");
	
	gUpdcnt = 0;
	gRowLength = $("#usrAth_tblGroup").getGridParam("reccount");
	if(confirm("저장 하시겠습니까?"))
	{
		for(var i = 1 ; i <= currentPageNum * rowNum; i++ )
		{
			var currentRow = $("#usrAth_tblGroup").getRowData(i);
			
			if(jQuery.isEmptyObject(currentRow))
				continue;
			
			var jqUseYN = "N";
			if(currentRow.USE_YN_DN == "1")
				jqUseYN = "Y";
			
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/management/groupUseUpdate.do",
				data : "pJson=" + getJsonStrGroupListUpdate(gSelectUser.USR_ID, jqUseYN, currentRow.CD),
				success : function(data)
				{
					if(data != 0)
						updateAlert();
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});
		}
	}
}

// 해당 유저의 권한을 가지고 오는 함수
function usrAuthList()
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/management/usrAuthList.do",
		data : "pJson=" + getJsonStrUsrAuthList(gSelectUser.USR_ID, $("#usrAth_chkNotUse").prop("chkecked")),
		success : function(data)
		{
			if(data.length != 0)
			{
				var rowNum = $('#usrAth_tblGroup').getGridParam('rowNum');
				var gUsrAuth = data;
				for( var i = 0; i < gUsrAuth.length; i++)
				{
					for( var j = 1; j <= rowNum; j++)
					{
						var currentRow = $("#usrAth_tblGroup").getRowData(j);
						if(gUsrAuth[i].AUTH_CD == currentRow.CD)
						{
							var $use_yn = $("#usrAth_tblGroup").find(" tr[id="+j+"]").find(" input[type=checkbox]");
							if(gUsrAuth[i].USE_YN == "Y")
							{
								$use_yn.prop("checked", true);
								$use_yn.prop("value", "y");
							}
							else
							{
								$use_yn.prop("checked", false);
								$use_yn.prop("value", "n");
							}
						}
					}
				}
			}
			else
			{
				var rowNum = $('#usrAth_tblGroup').getGridParam('rowNum');
				for( var j = 1; j <= rowNum; j++)
				{
					var $use_yn = $("#usrAth_tblGroup").find(" tr[id="+j+"]").find(" input[type=checkbox]");
					$use_yn.prop("checked", false);
					$use_yn.prop("value", "n");
				}
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
	
}

$(document).ready(function()
{
	$("#usrAth_btnGroupUp").hide();
	
	$("#usrAth_tblUsr").jqGrid(
	{		
		url : getContextPath() + "/jqgrid/management/userList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrUserList("", "", $("#usrAth_chkRetire").prop("checked"))
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : [ "센터코드", "센터", "사용자ID", "사용자명" ],
		colModel : 
		[
		 	{ name : "CNTR_CD", index : "CNTR_CD", hidden : true },
		 	{ name : "CNTR_NM", index : "CNTR_NM", align : "left", classes : "grid-col" },
            { name : "USR_ID", index : "USR_ID", align : "left", classes : "grid-col" },
            { name : "USR_NM", index : "USR_NM", align : "left", classes : "grid-col" }
		],
		sortname : "CNTR_CD",
		sortorder : "asc",
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "520",
	   	width : "100%",
	   	rowNum : 20,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
		pager : "#usrAth_innerUsrPager",
		onSelectRow : function(rowid) 
		{
			g_use_yn = true;
			$("#usrAth_btnGroupUp").show();
			$("#line1").css("display","none");
			$("#usrAth_chkNotUse").prop({"checked" : true, "disabled" : false});
			gSelectUser = $("#usrAth_tblUsr").getRowData(rowid);
			
			$("#usrAth_tblGroup").jqGrid("setGridParam", {postData : { pJson : getJsonStrAuthList() }, page : 1, sortname : "CD", sortorder : "asc" }).trigger("reloadGrid");
			
//			usrAuthList();
		},
		onPaging : function() 
		{
			g_use_yn = true;
			initGroupList();
		}
	}).jqGrid("navGrid", "#usrAth_innerUsrPager", {edit : false, add : false, del : false, search : false});
	
	$("#usrAth_tblGroup").jqGrid(
	{		
		url : getContextPath() + "/jqgrid/management/authList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrAuthList()
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : [ "그룹명", "선택", "코드"],
		colModel : [
            { name : "CD_NM", index : "CD_NM", width : 450, classes : "grid-col"},
            { name : "USE_YN_DN", index : "USE_YN", formatter:'checkbox', editoptions:{value : "1:0", defaultVaule : "0"}, formatoptions:{disabled:false}, align : "center", width : 80, sortable : false },
            { name : "CD", index : "CD", hidden : true }
		],
		sortname : "CD",
		sortorder : "asc",
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "520",
	   	width : "100%",
	   	rowNum : 20,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
		pager : "#usrAth_innerGrpPager",
		onSelectRow : function(rowid) 
		{	
			// 행 클릭 시 체크 박스 선택/해제 이벤트
			var row = $("#usrAth_tblGroup").getRowData(rowid);
			var $use_yn = $("#usrAth_tblGroup").find(" tr[id="+rowid+"]").find(" input[type=checkbox]");
			
			if(row.USE_YN_DN == true)
			{
				$use_yn.prop("checked", false);
				$use_yn.prop("value", "n");
			}else 
			{
				$use_yn.prop("checked", true);
				$use_yn.prop("value", "y");
			}
			
		},
		gridComplete : function()
		{	
			if(gSelectUser == "")
				return;
			
			usrAuthList();
		},
		onPaging : function name() {
			g_use_yn = true;
		}
	}).jqGrid("navGrid", "#usrAth_innerGrpPager", {edit : false, add : false, del : false, search : false});
	
	// 권한 테이블에 클리어 스타일 추가
	$("#gview_tblGroup").css("clear","both");
	$("#gbox_tblGroup").css("clear","both");
	
	// 조회 버튼 클릭 이벤트
	$("#usrAth_btnSrch").bind("click", userSearch_clickEvent);
	
	// 초기화 버튼 클릭 이벤트
	$("#usrAth_btnInit").bind("click", btnInit_clickEvent);
	
	// 검색 타입 선택 이벤트
	$("#usrAth_optSrchType").bind("change", srchType_changeEvent);
	
	// 검색어 엔터 키 이벤트 등록
	$("#usrAth_tfSrchVal").bind("keydown", function(key) 
	{
		if (key.keyCode == 13)
			userSearch_clickEvent();
	});
	
	// 퇴사자 포함 체크박스 클릭 이벤트 등록
	$("#usrAth_chkRetire").bind("click", userSearch_clickEvent);
	
	// 미사용 포함 체크박스 클릭 이벤트 등록
	$("#usrAth_chkNotUse").bind("click", chkNotUse_clickEvent);
	
	// 그룹 목록 선택항목 업데이트 등록
	$("#usrAth_btnGroupUp").bind("click", btnGroupUp_clickEvent);
	
	// 선택 컬럼 클릭 시 전체 선택/해제 클릭 이벤트 등록
	$("#tblGroup_USE_YN_DN").bind("click", useYn_clickEvent);
});