var objsMnt = {};
var obj012 = {};
var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");

//system 임계치 설정 가져오기
function getInfoSmsStdMaster(systemid)
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/rsm/infoSmsStdMaster.do",
		data : "pJson=" + getJsonStr("c2VsZWN0T25l","cnNtX3Ntc19zdGRtYXN0ZXIuc21zU3RkbWFzdGVyTGlzdA==",{
			 "systemId" : systemid
		}),
		success : function(data)
		{
			$("#sysRole").val(data.SYSROLENM);
			$("#systemNm").val(data.SYSTNAME);
			$("#hostName").val(data.HOSTNAME);
			$("#ipAddr1").val(data.IP_ADDR_1);
			$("#cpu").val(data.CPU);
			$("#mem").val(data.MEM);
			$("#disk").val(data.DSK);
			$("#net").val(data.NET);
			$("#ping").val(data.PING);
			
			//var sendGubun = data.SENDGUBUN != "" ? data.SENDGUBUN : "";			
			//$("#sendGubun").val(sendGubun);
			$("#sendGubun").val(data.SENDGUBUN);
			
			$("#useYn").val(data.USE_YN);
			$("#stdSystemId").val(data.SYSTEMID);

		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});	
}
// 그리드 셋팅 함수
function init_grid(pMap)
{
    $("#"+pMap.tblId).jqGrid({
		url : getContextPath() + pMap.url,
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : pMap.postData
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : pMap.colNames,
	   	colModel : pMap.colModel,
	   	sortname : pMap.sortname,
	   	sortorder : "desc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : pMap.height,
	    width : pMap.width,
	   	rowNum : pMap.rowNum,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : false,
	   	pager : "#"+pMap.pager,
	   	rownumbers : pMap.rowNumber,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : window[pMap.selectEvent],
	   	ondblClickRow : window[pMap.dblClickEvent],
	   	onCellSelect : window[pMap.cellEvent],
	   	gridComplete : window[pMap.gridComplete]
	   	
	}).jqGrid("navGrid", "#"+pMap.pager, {edit : false, add : false, del : false, search : false});
}

// 상단 캠페인조회 그리드 셋팅
function tblSysMnt_init_grid()
{ 		
	pMap = {};
	pMap.tblId = "tblSysMnt";
	pMap.url   = "/jqgrid/rsm/tblSysMntGrid.do";
	pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "cnNtX3NubXBfbW9uaXRvci5zbm1wTW9uaXRvckxpc3Q=", {
		"key" : "value" ,
		"sysRole" : $("#srchSysRole").val(),
	});
	pMap.colNames = ["분류", "시스템", "IP","OS", "SNMP", "Total (GB)", "Used (GB)","Rate (%)","Total (GB)","Used (GB)","Rate (%)","Rate (%)", "Rate (%)","systemid"];
	pMap.colModel =
   	[
   	 	{ name : "SYSROLE_NM", index : "SYSROLE_NM", align : "center", width : 80 },
   	 	{ name : "SYSTNAME", index : "SYSTNAME", align : "center", width : 95 },
   	 	{ name : "IP_ADDR_1", index : "IP_ADDR_1", align : "left", width : 80 },
   	 	{ name : "OS_VER_NM" , index : "OS_VER_NN", align : "left", width : 95 },
   	 	{ name : "SNMP_VER_NM", index : "SNMP_VER_NM", align : "left", width : 120 },
   	 	{ name : "DSK_TOTAL", index : "DSK_TOTAL", align : "right", width : 90, formatter:'integer' },
   	 	{ name : "DSK_USED", index : "DSK_USED",  align : "right", width : 90, formatter:'integer' },
   	 	{ name : "DSK_RATE", index : "DSK_RATE",  align : "right", width : 90 },
   	 	{ name : "MEM_TOTAL", index : "MEM_TOTAL",  align : "right", width : 90, formatter:'integer' },
   	 	{ name : "MEM_USED", index : "MEM_USED",  align : "right", width : 90, formatter:'integer' },
   	 	{ name : "MEM_RATE", index : "MEM_RATE", align : "right", width : 90 },
   	    { name : "CPU_RATE", index : "CPU_RATE", align : "right", width : 90 },
   	    { name : "NET_RATE", index : "NET_RATE", align : "right", width : 90 },
   	    { name : "SYSTEMID", index : "SYSTEMID", hidden : true },
   	];
	pMap.rowNum = "10";
	pMap.sortname = "SYSROLE_NM";
	pMap.width = "100%";
	pMap.height = "260";
	pMap.pager = "pgSysMnt";
	pMap.selectEvent = "tblSysMnt_SelectRow";
	pMap.rowNumber = false;
	pMap. formatter = {
        integer : {thousandsSeparator: ",", defaultValue: '0'}
    }

	init_grid(pMap);
	
	// 멀티 헤더 설정
	$("#tblSysMnt").setGroupHeaders(
    {
        useColSpanStyle: true,
        groupHeaders: [
            { "numberOfColumns": 3, "titleText": "DISK", "startColumnName": "DSK_TOTAL" },
            { "numberOfColumns": 3, "titleText": "MEMORY", "startColumnName": "MEM_TOTAL" },
            { "numberOfColumns": 1, "titleText": "CPU", "startColumnName": "CPU_RATE" },
            { "numberOfColumns": 1, "titleText": "Network", "startColumnName": "NET_RATE" }
        ]
    });		
}

// 캠페인대상자 목록 그리드 셋팅
function tblDskPts_init_grid()
{ 		
	pMap = {};
	pMap.tblId = "tblDskPts";
	pMap.url   = "/jqgrid/campaign/tblDskPtsGrid.do";
	//pMap.postData = getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTIuc2VsZWN0TGlzdA==", {"key" : "value" ,
	//	"cmpg_id" : "00"
	//});
	pMap.colNames = ["파티션", "Total (GB)", "Used (GB)", "Rate (%)", "systemid", "seq"];
	pMap.colModel =
   	[
   	 	{ name : "DSK_DESCR", index : "DSK_DESCR", align : "left", width : 125 },
   	 	{ name : "DSK_TOTAL", index : "DSK_TOTAL", align : "right", width : 100, formatter:'integer' },
   	 	{ name : "DSK_USED",  index : "DSK_USED", align : "right", width : 100, formatter:'integer' },
   	 	{ name : "DSK_RATE", index : "DSK_RATE", align : "right", width : 100 },
   	 	{ name : "SYSTEMID", index : "SYSTEMID", hidden : true },
   	 	{ name : "SEQ", index : "SEQ", hidden : true }
   	];
	pMap.rowNum = "10";
	pMap.sortname = "SEQ";
	sortorder : "asc",
	pMap.width = "100%";
	pMap.height = "150";
	pMap.pager = "pgDskPts";
	//pMap.selectEvent = "tblDskPts_SelectRow";
	pMap.rowNumber = true;
	pMap. formatter = {
	        integer : {thousandsSeparator: ",", defaultValue: '0'}
	}
	
	init_grid(pMap);
}

// 캠페인 목록 클릭
function tblSysMnt_SelectRow(rowid)
{	
	objsMnt = $("#tblSysMnt").jqGrid('getRowData', rowid);
	
    $("#tblDskPts").jqGrid("setGridParam", {url : "/jqgrid/campaign/tblDskPtsGrid.do",postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "cnNtX2Rpc2tfbW9uaXRvci5kaXNrTW9uaXRvckxpc3Q=", {"key" : "value" ,
		"systemId" : objsMnt.SYSTEMID,
	})} , page : 1, sortname : "SEQ", sortorder : "asc"}).trigger("reloadGrid");
 
    //system 임계치 설정 가져오기
    getInfoSmsStdMaster(objsMnt.SYSTEMID);
    //rsm_snmp_monitor systemid
    $("#snmpSystemId").val(objsMnt.SYSTEMID);
}

//조회조건 검색버튼 클릭이벤트
function btnSearch_clickEvent()
{
	$("#tblSysMnt").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "cnNtX3NubXBfbW9uaXRvci5zbm1wTW9uaXRvckxpc3Q=", {
		"key" : "value",
		"sysRole" : $("#srchSysRole").val()
	})} , page : 1, sortname : "SYSROLE_NM", sortorder : "asc"});
	$("#tblSysMnt").trigger("reloadGrid");
	
}

//삭제버튼
function btnDelete_clickEvent()
{
	if ($("#stdSystemId").val() == null || $("#stdSystemId").val() == "")
		return;
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/rsm/deleteSmsStdMaster.do",
		data : "pJson=" + getJsonStr("ZGVsZXRl","cnNtX3Ntc19zdGRtYXN0ZXIuZGVsZXRl",{
			 "systemId" : $("#stdSystemId").val(),
		}),
		success : function(data)
		{
			getInfoSmsStdMaster($("#stdSystemId").val());
			
			alert("삭제되었습니다");
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});

}
//저장버튼
function btnUpdate_clickEvent()
{
	var gSystemId = $("#snmpSystemId").val();
	var gStdSystemId = $("#stdSystemId").val();
		
	var gCpu = $("#cpu").val();
	var gMem = $("#mem").val();
	var gDsk = $("#disk").val();
	var gNet = $("#net").val();
	var gPing = $("#ping").val();
	var gSndGb = $("#sendGubun").val();
	var gUseYn = $("#useYn").val();
	
	var qt = "";
	var mi = "";
	var vSystemId = "";

	if (gSystemId == null || gSystemId == "")
	{
		alert("임계치를 설정할 시스템을 선택해 주세요");
		return;
	}
	//Insert rsm_sms_stdmaster
	if (gStdSystemId == null || gStdSystemId == "")
	{
		qt = "aW5zZXJ0";
		mi = "cnNtX3Ntc19zdGRtYXN0ZXIuaW5zZXJ0";
		vSystemId = gSystemId;
	} 
	//Update rsm_sms_stdmaster
	else
	{
		qt = "dXBkYXRl";
		mi = "cnNtX3Ntc19zdGRtYXN0ZXIudXBkYXRl";
		vSystemId = gStdSystemId;
	}

	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/rsm/saveSmsStdMaster.do",
		data : "pJson=" + getJsonStr(qt, mi,{
			 "systemId" : vSystemId,
			 "ping" : gPing,
			 "cpu" : gCpu,
			 "mem" : gMem,
			 "dsk" : gDsk,
			 "net" : gNet,
			 "sndGb" : gSndGb,
			 "useYn" : gUseYn
		}),
		success : function(data) { 
			getInfoSmsStdMaster(vSystemId);
			
			alert("저장되었습니다");						
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}
	});	

}

//초기 컨트롤 셋팅
function initControl()
{
/*	datePicker("#selFrDate");
	datePicker("#selToDate");
	
	$("#selFrDate").val(getDate());
	$("#selToDate").val(getDate());*/
	

	/*setSelectBoxWithCode("result","","90013", "", "","");*/
	/*setSelectBoxWithCode("selProcSt","전체","90013", "", "","010000");*/
	/*setSelectBoxWithCode("unresponsiveness","","91001", "", "","");*/
	
/*	
	if(window.sessionStorage.getItem("USR_GRD_CD") != "060100" && window.sessionStorage.getItem("USR_GRD_CD") != "090100")
		$("#selSrchCntrCd").prop("disabled", true);
*/	
	
	tblSysMnt_init_grid();
	tblDskPts_init_grid();
}

// 초기 이벤트 셋팅
function initEvent()
{
	//조회조건 조회버튼
	$("#btnSearch").bind("click", btnSearch_clickEvent);
	
	$("#btnUpdate").bind("click", btnUpdate_clickEvent);
	$("#btnDelete").bind("click", btnDelete_clickEvent);
	
	//숫자만 입력 가능
	$("#cpu").keyup(function(){$(this).val( $(this).val().replace(/[^0-9]/g,"") );} );
	$("#mem").keyup(function(){$(this).val( $(this).val().replace(/[^0-9]/g,"") );} );
	$("#disk").keyup(function(){$(this).val( $(this).val().replace(/[^0-9]/g,"") );} );
	$("#net").keyup(function(){$(this).val( $(this).val().replace(/[^0-9]/g,"") );} );

	
}

// 초기 데이터 셋팅
function initData()
{
	setSelectBoxWithCode("srchSysRole","전체","92007", "", "","all");	//시스템분류
	setSelectBoxWithCode("sendGubun","미선택","92020", "", "","all");	//sms 발송여부

}

// 초기셋팅
$(function()
{
	initEvent();
	initData();
	initControl();
	
	$("#btnSearch").trigger("click");
});