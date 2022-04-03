//파라미터셋팅 commonList
function getJsonStrSystemMasterList()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "cnNtX3N5c3RlbV9tYXN0ZXIuc3lzdGVtTGlzdA==",
		"map" : {
			"key" : "value",
			"sysRole" : $("#srchSysRole").val(),
			"sysName" : $("#srchSystemNm").val()
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}
//get systemid
function getSystemId(sysRole) {
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "cnNtX3N5c3RlbV9tYXN0ZXIuZ2V0U3lzdGVtSWQ=",
			"map" : {
				"sysRole" : sysRole,
			}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}
//일반리스트
function getSystemMasterList()
{
	$("#tblSystemList").jqGrid({
		url : getContextPath() + "/jqgrid/rsm/sysMasterInfo.do",
			datatype : "json",
			mtype : "POST",
			postData : {
				pJson : getJsonStrSystemMasterList()
			},
			jsonReader : {
				repeatitems: false
			},
			colNames : ["시스템분류", "시스템", "호스트", "시스템구성", "시스템모델", "마스터구분", "IP주소1", "IP주소2", "CPU타입", "메모리합계", 
			            "OS타입", "OS버전", "SNMP버전", "COMMUNITY", "ICMP", "모니터링", "호현황",  "숨김",
			            "SYSTEMID", "CENTERCD", "SYSROLE", "SYSCONF", "MASTERGB", "SYSMODEL", "OS_TYPE", "SNMP_VER", "OS_VER"],
			colModel : [
				{ name : "SYSROLENM", index : "SYSROLENM", align : "center", width : 70, frozen: true },
				{ name : "SYSTNAME", index : "SYSTNAME", align : "center", width : 70, frozen: true },
				{ name : "HOSTNAME", index : "HOSTNAME", align : "left", width : 100 },
				{ name : "SYSCONFNM", index : "SYSCONFNM", align : "center", width : 80 },
				{ name : "SYSMODELNM", index : "SYSMODELNM", align : "center", width : 80 },			
				{ name : "MASTERGBNM", index : "MASTERGBNM", align : "center", width : 80 },			
				{ name : "IP_ADDR_1", index : "IP_ADDR_1", align : "left", width : 80 },
				{ name : "IP_ADDR_2", index : "IP_ADDR_2", align : "left", width : 80 },
				{ name : "CPU_TYPE", index : "CPU_TYPE", align : "center", width : 70 },
				{ name : "MEMORY", index : "MEMORY", align : "center", width : 70 },
				{ name : "OS_TYPENM", index : "OS_TYPENM", align : "center", width : 70 },
				{ name : "OS_VERNM", index : "OS_VERNM", align : "center", width : 70 },
				{ name : "SNMP_VERNM", index : "SNMP_VERNM", align : "center", width : 70 },
				{ name : "COMMUNITY", index : "COMMUNITY", align : "center", width : 90 },
				{ name : "ICMP_GB", index : "ICMP_GB", align : "center", width : 60, formatter: "checkbox" },
				{ name : "MONI_GB", index : "MONI_GB", align : "center", width : 60, formatter: "checkbox" },
				{ name : "CALLSTAT_GB", index : "CALLSTAT_GB", align : "center", width : 60, formatter: "checkbox" },
				{ name : "HIDDEN_GB", index : "HIDDEN_GB", align : "center", width : 60, formatter: "checkbox" },
				
				{ name : "SYSTEMID", index : "SYSTEMID", hidden:true },
				{ name : "CENTERCD", index : "CENTERCD", hidden:true },
				{ name : "SYSROLE", index : "SYSROLE", hidden:true },
				{ name : "SYSCONF", index : "SYSCONF", hidden:true },
				{ name : "MASTERGB", index : "MASTERGB", hidden:true },
				{ name : "SYSMODEL", index : "SYSMODEL", hidden:true },
				{ name : "OS_TYPE", index : "OS_TYPE", hidden:true },
				{ name : "SNMP_VER", index : "SNMP_VER", hidden:true },
				{ name : "OS_VER", index : "OS_VER", hidden:true }
			],
			sortname : "SYSROLENM",
			sortorder : "asc",
			gridview : true,
			hidegrid : false,
			shrinkToFit : false,		
			loadonce : false,
			scrollOffset : 0,
		   	height : "260",
		   	width : "100%",
		   	rowNum : 10,
		   	rowList : [10, 20, 40],
		   	autowidth : true,
		   	pager : "#pgSystemList",
		   	rownumbers : true,
		   	rownumWidth : 30,
		   	multiselect : false,
		   	emptyrecords : "",
		   	caption : "",
		   	loadui : "enable",
		   	viewrecords: true,
		   	onSelectRow : function(rowid) {
		   		var row = $("#tblSystemList").getRowData(rowid);	
		   		
		   		$("#rsmSystemId").val(row.SYSTEMID);
		   		$("#rsmSystemNm").val(row.SYSTNAME);
		   		$("#rsmHostNm").val(row.HOSTNAME);
		   		$("#rsmIpAddr1").val(row.IP_ADDR_1);
		   		$("#rsmIpAddr2").val(row.IP_ADDR_2);
		   		$("#rsmIntroYear").val(row.INTRO_YEAR);
		   		$("#rsmMemory").val(row.MEMORY);
		   		$("#rsmCommunity").val(row.COMMUNITY);
		   		$("#rsmCputype").val(row.CPU_TYPE);
		   		$("#rsmCenterCd").val(row.CENTERCD);
		   		$("#rsmSysRole").val(row.SYSROLE);
		   		$("#rsmSysconf").val(row.SYSCONF);
		   		$("#rsmMasterGb").val(row.MASTERGB);
		   		$("#rsmSysModel").val(row.SYSMODEL);
		   		$("#rsmOsType").val(row.OS_TYPE);
		   		$("#rsmSnmpVer").val(row.SNMP_VER);
		   		$("#rsmOsVer").val(row.OS_VER);

		   		//ICMP 여부 체크
		   		if (row.ICMP_GB == "Yes")
		   			$("#chkRsmIcmpGb").prop("checked", true);
		   		else
		   			$("#chkRsmIcmpGb").prop("checked", false);		   		
		   		//모니터링 여부 체크
		   		if (row.MONI_GB == "Yes")
		   			$("#chkRsmMoniGb").prop("checked", true);
		   		else
		   			$("#chkRsmMoniGb").prop("checked", false);
		   		//호현황 여부 체크
		   		if (row.CALLSTAT_GB == "Yes")
		   			$("#chkRsmCallGb").prop("checked", true);
		   		else
		   			$("#chkRsmCallGb").prop("checked", false);
		   		//숨김 여부 체크
		   		if (row.HIDDEN_GB == "Yes")
		   			$("#chkRsmHiddenGb").prop("checked", true);
		   		else
		   			$("#chkRsmHiddenGb").prop("checked", false);
		   		
		   		//버튼설정
		   		$("#btnInfoUpdate").show();
		   		$("#btnInfoDelete").show();
		   		$("#btnInfoInsert").hide();			   		
		   		
		   	},
		   	onPaging : function(pgButton) {	   		
			   		
		   	}
	}).jqGrid("navGrid", "#pgSystemList", {edit : false, add : false, del : false, search : false});
	
	$("#tblSystemList").jqGrid("setFrozenColumns");

}

//조회버튼 클릭이벤트
function btnSearchClickEvent()
{
	//버튼설정
	$("#btnInfoUpdate").hide();
	$("#btnInfoDelete").hide();
	$("#btnInfoInsert").show();
	
	$("#tblSystemList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSystemMasterList()}, 
		page : 1, sortname : "SYSROLENM", sortorder : "asc"}).trigger("reloadGrid");

}
/*
//엑셀저장버튼 클릭이벤트
function btnExcelClickEvent()
{
	var loParam = "";

	loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b2gwMjIuc2VsZWN0Q2F0Z3J5TElzdA==",
		"map" : {
			"key" : "value", 
			"sysRole" : $("#srchSysRole").val(),
			"sysName" : $("#srchSystemNm").val(),
			"sidx" : $("#tblSystemList").getGridParam("sortname"), 
			"sord" : $("#tblSystemList").getGridParam("sortorder"), 
			"title" : "상태변경이력", 
			"colWidth" : [20, 40, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20], 
			"colName" : ["STAT_ALT_DT", "CNTR_TEAM_NM", "USR_NM", "LOGIN", "WAIT", "CALL", "CLEAN", "LEAVE", "EAT", "EDU", "MEET", "BUSINESS", "BREAK", "MISSCALL", "CALLBACK"],
			"colHeader" : ["근무일", "소속", "상담사", "로그인", "대기", "통화중", "후처리", "이석", "식사", "교육", "미팅", "업무", "휴식", "미스콜", "콜백"]
		}
	};

	console.log(JSON.stringify(loParam));
	
	excelDownLoad(getContextPath() + "/excel/user/altStatInfoExcel.do", encodeURIComponent(JSON.stringify(loParam)));
	
}
*/
//초기화버튼 클릭이벤트
function btnInitClickEvent()
{
	$("#srchSystemId").val("");
	$("#srchSystemNm").val("");
	$("#srchSysRole").val("all");	
	
	$("#tblSystemList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSystemMasterList()}, 
		page : 1, sortname : "SYSROLENM", sortorder : "asc"}).trigger("reloadGrid");

}

//시스템등록 추가버튼 클릭이벤트 등록
function btnInfoInsertClickEvent()
{	
	if($("#rsmSystemNm").val() == null || $("#rsmSystemNm").val() == "")
	{
		alert("시스템명을 입력해 주세요.");
		$("#rsmSystemNm").focus;
	}
	else if($("#rsmSysRole").val() == null || $("#rsmSysRole").val() == "all")
	{
		alert("시스템분륳를 선택해 주세요.");
		$("#rsmSysRole").focus;
	}
	else if($("#chkRsmIcmpGb").checked == false && $("#chkRsmMoniGb").checked == false && $("#chkRsmCallGb").checked == false)
	{
		var result = confirm("시스템 모니터링을 원하지 않으십니까?");
		
		if(result)
			return;	//시스템 모니터링 안함
	}
	else	
	{
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/rsm/getSystemId.do",
			data : "pJson=" + getSystemId($("#rsmSysRole").val()),
			success : function(data)
			{
				$.ajax({
					type : "post",
					dataType : "json",
					async : true,
					url : getContextPath() + "/ajax/rsm/insertSystemMaster.do",
					data : "pJson=" + getJsonStr("aW5zZXJ0","cnNtX3N5c3RlbV9tYXN0ZXIuaW5zZXJ0",{
						 "systemId" : data.SYSTEMID,
						 "systemNm" : $("#rsmSystemNm").val(),
						 "centerCd" : $("#rsmCenterCd").val(),
						 "hostname" : $("#rsmHostNm").val(),
						 "sysRole" : $("#rsmSysRole").val(),
						 "sysConf" : $("#rsmSysconf").val(),
						 "masterGb" : $("#rsmMasterGb").val(),
						 "sysModel" : $("#rsmSysModel").val(),
						 "ipAddr1" : $("#rsmIpAddr1").val(),
						 "ipAddr2" : $("#rsmIpAddr2").val(),
						 "icmpGb" : $("input:checkbox[id='chkRsmIcmpGb']").is(":checked") ? "1" : "0",
						 "moniGb" : $("input:checkbox[id='chkRsmMoniGb']").is(":checked") ? "1" : "0",
						 "callGb" : $("input:checkbox[id='chkRsmCallGb']").is(":checked") ? "1" : "0",
						 "hiddenGb" : $("input:checkbox[id='chkRsmHiddenGb']").is(":checked") ? "1" : "0",
						 "introYear" : $("#rsmIntroYear").val(),
						 "cpuType" : $("#rsmCputype").val(),
						 "osType" : $("#rsmOsType").val(),
						 "snmpVer" : $("#rsmSnmpVer").val(),
						 "memory" : $("#rsmMemory").val(),
						 "osVer" : $("#rsmOsVer").val(),
						 "community" : $("#rsmCommunity").val()
					}),
					success : function(data) { 
						btnInfoInitClickEvent();
						btnSearchClickEvent();
						
						alert("저장되었습니다");						
					},
					error : function(data, status, err)
					{
						networkErrorHandler(data, status, err);
					}
				});				

			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}	
}

//시스템등록 수정버튼 클릭이벤트 등록
function btnInfoUpdateClickEvent()
{
	if($("#rsmSystemNm").val() == null || $("#rsmSystemNm").val() == "")
	{
		alert("시스템명을 입력해 주세요.");
		$("#rsmSystemNm").focus;
	}
	else if($("#rsmSysRole").val() == null || $("#rsmSysRole").val() == "all")
	{
		alert("시스템분륳를 선택해 주세요.");
		$("#rsmSysRole").focus;
	}
	else if($("#chkRsmIcmpGb").checked == false && $("#chkRsmMoniGb").checked == false && $("#chkRsmCallGb").checked == false)
	{
		var result = confirm("시스템 모니터링을 원하지 않으십니까?");
		
		if(result)
			return;	//시스템 모니터링 안함
	}
	else	
	{
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/rsm/updateSystemMaster.do",
			data : "pJson=" + getJsonStr("dXBkYXRl","cnNtX3N5c3RlbV9tYXN0ZXIudXBkYXRl",{
				 "systemId" : $("#rsmSystemId").val(),
				 "systemNm" : $("#rsmSystemNm").val(),
				 "centerCd" : $("#rsmCenterCd").val(),
				 "hostname" : $("#rsmHostNm").val(),
				 "sysRole" : $("#rsmSysRole").val(),
				 "sysConf" : $("#rsmSysconf").val(),
				 "masterGb" : $("#rsmMasterGb").val(),
				 "sysModel" : $("#rsmSysModel").val(),
				 "ipAddr1" : $("#rsmIpAddr1").val(),
				 "ipAddr2" : $("#rsmIpAddr2").val(),
				 "icmpGb" : $("input:checkbox[id='chkRsmIcmpGb']").is(":checked") ? "1" : "0",
				 "moniGb" : $("input:checkbox[id='chkRsmMoniGb']").is(":checked") ? "1" : "0",
				 "callGb" : $("input:checkbox[id='chkRsmCallGb']").is(":checked") ? "1" : "0",
				 "hiddenGb" : $("input:checkbox[id='chkRsmHiddenGb']").is(":checked") ? "1" : "0",
				 "introYear" : $("#rsmIntroYear").val(),
				 "cpuType" : $("#rsmCputype").val(),
				 "osType" : $("#rsmOsType").val(),
				 "snmpVer" : $("#rsmSnmpVer").val(),
				 "memory" : $("#rsmMemory").val(),
				 "osVer" : $("#rsmOsVer").val(),
				 "community" : $("#rsmCommunity").val()
			}),
			success : function(data)
			{
				btnInfoInitClickEvent();
				btnSearchClickEvent();
				
				alert("저장되었습니다");
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}		
}
//시스템등록 초기화버튼 클릭이벤트 등록
function btnInfoInitClickEvent()
{
	systemMasterInfoInit();	
	
	//버튼 설정
	$("#btnInfoUpdate").hide();
	$("#btnInfoDelete").hide();
	$("#btnInfoInsert").show();

}

//시스템등록 삭제버튼 클릭이벤트 등록
function btnInfoDeleteClickEvent()
{
	if($("#rsmSystemId").val() == null || $("#rsmSystemId").val() == "")
	{
		alert("삭제 대상 시스템을 선택해 주세요.");
	}
	else	
	{
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/rsm/deleteSystemMaster.do",
			data : "pJson=" + getJsonStr("ZGVsZXRl","cnNtX3N5c3RlbV9tYXN0ZXIuZGVsZXRl",{
				 "systemId" : $("#rsmSystemId").val()
			}),
			success : function(data)
			{
				btnInfoInitClickEvent();
				btnSearchClickEvent();
				
				alert("삭제되었습니다");
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}		
}

//system master info data clear
function systemMasterInfoInit()
{
		$("#rsmSystemId").val("");
   		$("#rsmSystemNm").val("");
   		$("#rsmHostNm").val("");
   		$("#rsmIpAddr1").val("");
   		$("#rsmIpAddr2").val("");
   		$("#rsmIntroYear").val("");
   		$("#rsmMemory").val("");
   		$("#rsmCommunity").val("");
   		$("#rsmCputype").val("");
   		$("#rsmCenterCd").val("all");
   		$("#rsmSysRole").val("all");
   		$("#rsmSysconf").val("all");
   		$("#rsmMasterGb").val("all");
   		$("#rsmSysModel").val("");
   		$("#rsmOsType").val("all");
   		$("#rsmSnmpVer").val("all");
   		$("#rsmOsVer").val("all");

   		//ICMP 여부 체크
		$("#chkRsmIcmpGb").prop("checked", true);  		
   		//모니터링 여부 체크
   		$("#chkRsmMoniGb").prop("checked", true);
   		//호현황 여부 체크
   		$("#chkRsmCallGb").prop("checked", true);
   		//숨김 여부 체크
   		$("#chkRsmHiddenGb").prop("checked", false);	
}

//selectbox code data init
function initSelectData()
{
	setSelectBoxWithCode("srchSysRole","전체","92007", "", "","all");	//시스템분류
	
	setSelectBoxWithCode("rsmCenterCd","미선택","92005", "", "","all");	//소속센터
	setSelectBoxWithCode("rsmSysRole","미선택","92007", "", "","all");	//시스템분류
	setSelectBoxWithCode("rsmSysconf","미선택","92006", "", "","all");	//시스템구성
	setSelectBoxWithCode("rsmMasterGb","미선택","92004", "", "","all");	//마스터구분
	/*setSelectBoxWithCode("sendGubun","미선택","90023", "", "","all");*/	//도입년도
	setSelectBoxWithCode("rsmOsType","미선택","92018", "", "","all");	//OS 타입
	setSelectBoxWithCode("rsmSnmpVer","미선택","92021", "", "","all");	//SNMP 버전
	setSelectBoxWithCode("rsmOsVer","미선택","92017", "", "","all");	//OS 버전

}

$(document).ready(function()
{
	//select데이터 셋팅
	initSelectData();
	//리스트 셋팅
	getSystemMasterList();
	
	
	//검색버튼 클릭이벤트 등록
	$("#btnSearch").bind("click", btnSearchClickEvent);
	//초기화버튼 클릭이벤트 등록
	$("#btnInit").bind("click", btnInitClickEvent);
	//엑셀저장버튼 클릭이벤트 등록
	/*$("#btnExcel").bind("click", btnExcelClickEvent);*/
	
	//시스템등록 추가버튼 클릭이벤트 등록
	$("#btnInfoInsert").bind("click", btnInfoInsertClickEvent);
	//시스템등록 수정버튼 클릭이벤트 등록
	$("#btnInfoUpdate").bind("click", btnInfoUpdateClickEvent);
	//시스템등록 초기화버튼 클릭이벤트 등록
	$("#btnInfoInit").bind("click", btnInfoInitClickEvent);
	//시스템등록 삭제버튼 클릭이벤트 등록
	$("#btnInfoDelete").bind("click", btnInfoDeleteClickEvent);
	
	//버튼설정
	$("#btnInfoInsert").show();
	$("#btnInfoUpdate").hide();
	$("#btnInfoDelete").hide();	
	
});
