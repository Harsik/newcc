var objsMnt = {};
var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");

var chart_Dsk; 
var data_Dsk;
var options_Dsk;
var chart_Mem; 
var data_Mem;
var options_Mem;
var chart_Cpu; 
var data_Cpu;
var options_Cpu;
var chart_Net; 
var data_Net;
var options_Net;

var redFrmDsk = 80;
var redFrmMem = 80;
var redFrmCpu = 80;
var redFrmNet = 80;

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
			$("#dsk").val(data.DSK);
			$("#net").val(data.NET);
			$("#ping").val(data.PING);
			
			//var sendGubun = data.SENDGUBUN != "" ? data.SENDGUBUN : "";			
			//$("#sendGubun").val(sendGubun);
			$("#sendGubun").val(data.SENDGUBUN);
			
			$("#useYn").val(data.USE_YN);
			$("#stdSystemId").val(data.SYSTEMID);
			
			if (data.USE_YN == 1)
			{
				redFrmDsk = data.DSK;
				redFrmMem = data.MEM;
				redFrmCpu = data.CPU;
				redFrmNet = data.NET;				
			}
			else
			{
				redFrmDsk = 80;
				redFrmMem = 80;
				redFrmCpu = 80;
				redFrmNet = 80;		
			}

		    loadChartData(objsMnt); 

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
	   	sortorder : pMap.sortorder,
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
	pMap.colNames = ["분류", "시스템", "IP","OS", "SNMP", "Total (GB)", "Used (GB)","Rate (%)","Total (GB)","Used (GB)","Rate (%)","Rate (%)", "Rate (%)",
	                 "disk","memory","cpu","network","systemid"];
	pMap.colModel =
   	[
   	 	{ name : "SYSROLE_NM", index : "SYSROLE_NM", align : "center", width : 80 },
   	 	{ name : "SYSTNAME", index : "SYSTNAME", align : "center", width : 95 },
   	 	{ name : "IP_ADDR_1", index : "IP_ADDR_1", align : "left", width : 80 },
   	 	{ name : "OS_VER_NM" , index : "OS_VER_NN", hidden : true },
   	 	{ name : "SNMP_VER_NM", index : "SNMP_VER_NM", hidden : true },
   	 	{ name : "DSK_TOTAL", index : "DSK_TOTAL", align : "right", width : 90, formatter:'integer' },
   	 	{ name : "DSK_USED", index : "DSK_USED",  align : "right", width : 90, formatter:'integer' },
   	 	{ name : "DSK_RATE", index : "DSK_RATE",  align : "left", width : 145, formatter: setDskRateImage },
   	 	{ name : "MEM_TOTAL", index : "MEM_TOTAL",  align : "right", width : 90, formatter:'integer' },
   	 	{ name : "MEM_USED", index : "MEM_USED",  align : "right", width : 90, formatter:'integer' },
   	 	{ name : "MEM_RATE", index : "MEM_RATE", align : "left", width : 145, formatter: setMemRateImage },
   	    { name : "CPU_RATE", index : "CPU_RATE", align : "left", width : 145, formatter: setCpuRateImage },
   	    { name : "NET_RATE", index : "NET_RATE", align : "left", width : 145, formatter: setNetRateImage },
   	    { name : "DSK_RATE", index : "DSK_RATE", hidden : true },
   	    { name : "MEM_RATE", index : "MEM_RATE", hidden : true },
   	    { name : "CPU_RATE", index : "CPU_RATE", hidden : true },
   	    { name : "NET_RATE", index : "NET_RATE", hidden : true },
   	    { name : "SYSTEMID", index : "SYSTEMID", hidden : true },
   	];
	pMap.rowNum = "10";
	pMap.sortname = "SYSROLE_NM";
	pMap.sortorder = "asc";
	pMap.width = "100%";
	pMap.height = "200";	//"260";
	pMap.pager = "pgSysMnt";
	pMap.selectEvent = "tblSysMnt_SelectRow";
	pMap.rowNumber = false;
	pMap.formatter = {
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

function setDskRateImage(cellValue, options, rowObject) 
{
	var checkResult = "";
	var cellWidth = options.colModel.width;
	var dskPercent = rowObject.DSK_RATE;
	
	if ((rowObject.USE_YN == 1) && (rowObject.DSK <= rowObject.DSK_RATE))
		checkResult = "<div class='image'><img alt='' src='/resources/images/popbtn_over_.png' height = '10px' width ='"+dskPercent * cellWidth/160 + "px'><div class='text'><font style='color:red; font-weight:bold;'>" + dskPercent + "%</font></div></div>";
	else
		checkResult = "<div class='image'><img alt='' src='/resources/images/popbtn_.png' height = '10px' width ='"+dskPercent * cellWidth/160 + "px'><div class='text'>" + dskPercent + "%</div></div>";
	//console.log(rowObject); 
	return checkResult;
}

function setMemRateImage(cellValue, options, rowObject) 
{
	var checkResult = "";
	var cellWidth = options.colModel.width;
	var memPercent = rowObject.MEM_RATE;

	if ((rowObject.USE_YN == 1) && (rowObject.MEM <= rowObject.MEM_RATE))
		checkResult = "<div class='image'><img alt='' src='/resources/images/popbtn_over_.png' height = '13px' width ='"+memPercent * cellWidth/100 + "px'><div class='text'><font style='color:red; font-weight:bold;'>" + memPercent + "%</font></div></div>";
	else
		checkResult = "<div class='image'><img alt='' src='/resources/images/popbtn_.png' height = '13px' width ='"+memPercent * cellWidth/100 + "px'><div class='text'>" + memPercent + "%</div></div>";
	
	console.log(rowObject); 
	
	return checkResult;
}

function setCpuRateImage(cellValue, options, rowObject) 
{
	var checkResult = "";
	var cellWidth = options.colModel.width;	
	var cpuPercent = rowObject.CPU_RATE;
	
	if ((rowObject.USE_YN == 1) && (rowObject.CPU <= rowObject.CPU_RATE))
		checkResult = "<div class='image'><img alt='' src='/resources/images/popbtn_over_.png' height = '13px' width ='"+cpuPercent * cellWidth/100 + "px'><div class='text'><font style='color:red; font-weight:bold;'>" + cpuPercent + "%</font></div></div>";
	else
		checkResult = "<div class='image'><img alt='' src='/resources/images/popbtn_.png' height = '13px' width ='"+cpuPercent * cellWidth/100 + "px'><div class='text'>" + cpuPercent + "%</div></div>";
	
	return checkResult;
}

function setNetRateImage(cellValue, options, rowObject) 
{
	var checkResult = "";
	var cellWidth = options.colModel.width;	
	var netPercent = rowObject.NET_RATE;
	
	if ((rowObject.USE_YN == 1) && (rowObject.NET <= rowObject.NET_RATE))
		checkResult = "<div class='image'><img alt='' src='/resources/images/popbtn_over_.png' height = '13px' width ='"+netPercent * cellWidth/100 + "px'><div class='text'><font style='color:red; font-weight:bold;'>" + netPercent + "%</font></div></div>";
	else
		checkResult = "<div class='image'><img alt='' src='/resources/images/popbtn_.png' height = '13px' width ='"+netPercent * cellWidth/100 + "px'><div class='text'>" + netPercent + "%</div></div>";
	
	return checkResult;
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
   	 	{ name : "DSK_DESCR", index : "DSK_DESCR", align : "left", width : 150 },
   	 	{ name : "DSK_TOTAL", index : "DSK_TOTAL", align : "right", width : 115, formatter:'integer' },
   	 	{ name : "DSK_USED",  index : "DSK_USED", align : "right", width : 115, formatter:'integer' },
   	 	{ name : "DSK_RATE", index : "DSK_RATE", align : "right", width : 115 },
   	 	{ name : "SYSTEMID", index : "SYSTEMID", hidden : true },
   	 	{ name : "SEQ", index : "SEQ", hidden : true }
   	];
	pMap.rowNum = "10";
	pMap.sortname = "SEQ";
	pMap.sortorder = "asc";
	pMap.width = "100%";
	pMap.height = "130";
	pMap.pager = "pgDskPts";
	//pMap.selectEvent = "tblDskPts_SelectRow";
	pMap.rowNumber = true;
	pMap.formatter = {
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

	var ids = $("#tblSysMnt").jqGrid('getDataIDs');

	if (ids.length != 0)
	{
		objsMnt = $("#tblSysMnt").jqGrid('getRowData', ids[0]);
		loadChartData(objsMnt); 
	}


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
	var gDsk = $("#dsk").val();
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

function loadChartData(objSysMnt) 
{
	data_Dsk.setValue(0, 0, "Disk");
	data_Mem.setValue(0, 0, "Memory");
	data_Cpu.setValue(0, 0, "CPU");
	data_Net.setValue(0, 0, "Network");
	
	if (objSysMnt == undefined)
	{
		data_Dsk.setValue(0, 1, 0);
		data_Mem.setValue(0, 1, 0);		
		data_Cpu.setValue(0, 1, 0);		
		data_Net.setValue(0, 1, 0);
	}
	else
	{
		data_Dsk.setValue(0, 1, objSysMnt.DSK_RATE);
		data_Mem.setValue(0, 1, objSysMnt.MEM_RATE);
		data_Cpu.setValue(0, 1, objSysMnt.CPU_RATE);
		data_Net.setValue(0, 1, objSysMnt.NET_RATE);
	}

	initChartOptions();
	
	//data.setValue(point);
	chart_Dsk.draw(data_Dsk, options_Dsk);
	chart_Mem.draw(data_Mem, options_Mem);
	chart_Cpu.draw(data_Cpu, options_Cpu);
	chart_Net.draw(data_Net, options_Net);
}

//초기 컨트롤 셋팅
function initControl()
{
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
	$("#dsk").keyup(function(){$(this).val( $(this).val().replace(/[^0-9]/g,"") );} );
	$("#net").keyup(function(){$(this).val( $(this).val().replace(/[^0-9]/g,"") );} );

}

//init disk chart gauges 
function initDskChart() 
{
	data_Dsk = new google.visualization.DataTable();
	data_Dsk.addColumn('string', 'Label');
	data_Dsk.addColumn('number', 'Value');
	data_Dsk.addRows(1);
	chart_Dsk = new google.visualization.Gauge(document.getElementById('chart_div_Disk'));
	options_Dsk = {
		width: 150, 
		height: 150, 
		redFrom: redFrmDsk, 
		redTo: 110,
		yellowFrom: redFrmDsk - 20, 
		yellowTo: redFrmDsk, 
		//greenFrom: 0, 
		//greenTo: 80, 
		minorTicks: 5,
		min: 0, 
		max: 110, 
		animation: {
		duration: 400, 
		easing: 'out',
		},
	};
	loadChartData();
	//setInterval('loadChartData()', 15000);
}
//init memory chart gauges 
function initMemChart() 
{
	data_Mem = new google.visualization.DataTable();
	data_Mem.addColumn('string', 'Label');
	data_Mem.addColumn('number', 'Value');
	data_Mem.addRows(1);
	chart_Mem = new google.visualization.Gauge(document.getElementById('chart_div_Memory'));
	options_Mem = {
		width: 150, 
		height: 150, 
		redFrom: redFrmMem, 
		redTo: 110,
		yellowFrom: redFrmMem - 20, 
		yellowTo: redFrmMem, 
		//greenFrom: 0, 
		//greenTo: 80, 
		minorTicks: 5,
		min: 0, 
		max: 110, 
		animation: {
		duration: 400, 
		easing: 'out',
		},
	};
	loadChartData();
	//setInterval('loadChartData()', 15000);
}
//init cpu chart gauges 
function initCpuChart() 
{
	data_Cpu = new google.visualization.DataTable();
	data_Cpu.addColumn('string', 'Label');
	data_Cpu.addColumn('number', 'Value');
	data_Cpu.addRows(1);
	chart_Cpu = new google.visualization.Gauge(document.getElementById('chart_div_CPU'));
	options_Cpu = {
		width: 150, 
		height: 150, 
		redFrom: redFrmCpu, 
		redTo: 110,
		yellowFrom: redFrmCpu - 20, 
		yellowTo: redFrmCpu, 
		//greenFrom: 0, 
		//greenTo: 80, 
		minorTicks: 5,
		min: 0, 
		max: 110, 
		animation: {
		duration: 400, 
		easing: 'out',
		},
	};
	loadChartData();
	//setInterval('loadChartData()', 15000);
}
//init network chart gauges 
function initNetChart() 
{
	data_Net = new google.visualization.DataTable();
	data_Net.addColumn('string', 'Label');
	data_Net.addColumn('number', 'Value');
	data_Net.addRows(1);
	chart_Net = new google.visualization.Gauge(document.getElementById('chart_div_Network'));
	options_Net = {
		width: 150, 
		height: 150, 
		redFrom: redFrmNet, 
		redTo: 110,
		yellowFrom: redFrmNet - 20, 
		yellowTo: redFrmNet, 
		//greenFrom: 0, 
		//greenTo: 80, 
		minorTicks: 5,
		min: 0, 
		max: 110, 
		animation: {
		duration: 400, 
		easing: 'out',
		},
	};
	loadChartData();
	//setInterval('loadChartData()', 15000);
}
/*
//init System Rate chart  
function initSysRateChart() 
{
    var data = google.visualization.arrayToDataTable([
                  ['Year', 'Sales', 'Expenses'],
                  ['2013',  1000,      400],
                  ['2014',  1170,      460],
                  ['2015',  660,       1120],
                  ['2016',  1030,      540]
                ]);

    var options = {
      title: 'Company Performance',
      hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
      vAxis: {minValue: 0}
    };

    var chart = new google.visualization.AreaChart(document.getElementById('chart_div_SysRate'));
    chart.draw(data, options);
}
*/
function initChartOptions()
{
	options_Dsk = {
		width: 150, 
		height: 150, 
		redFrom: redFrmDsk, 
		redTo: 110,
		yellowFrom: redFrmDsk - 20, 
		yellowTo: redFrmDsk, 
		//greenFrom: 0, 
		//greenTo: 80, 
		minorTicks: 5,
		min: 0, 
		max: 110, 
		animation: {
		duration: 400, 
		easing: 'out',
		},
	};
	
	options_Mem = {
		width: 150, 
		height: 150, 
		redFrom: redFrmMem, 
		redTo: 110,
		yellowFrom: redFrmMem - 20, 
		yellowTo: redFrmMem, 
		//greenFrom: 0, 
		//greenTo: 80, 
		minorTicks: 5,
		min: 0, 
		max: 110, 
		animation: {
		duration: 400, 
		easing: 'out',
		},
	};
	
	options_Cpu = {
		width: 150, 
		height: 150, 
		redFrom: redFrmCpu, 
		redTo: 110,
		yellowFrom: redFrmCpu - 20, 
		yellowTo: redFrmCpu, 
		//greenFrom: 0, 
		//greenTo: 80, 
		minorTicks: 5,
		min: 0, 
		max: 110, 
		animation: {
		duration: 400, 
		easing: 'out',
		},
	};
	
	options_Net = {
		width: 150, 
		height: 150, 
		redFrom: redFrmNet, 
		redTo: 110,
		yellowFrom: redFrmNet - 20, 
		yellowTo: redFrmNet, 
		//greenFrom: 0, 
		//greenTo: 80, 
		minorTicks: 5,
		min: 0, 
		max: 110, 
		animation: {
		duration: 400, 
		easing: 'out',
		},
	};	
}
// 초기 데이터 셋팅
function initData()
{
	setSelectBoxWithCode("srchSysRole","전체","92007", "", "","all");	//시스템분류
	setSelectBoxWithCode("sendGubun","미선택","92020", "", "","all");	//sms 발송여부

}
//chart 셋팅
function initChart()
{
    google.charts.load('current', {'packages':['gauge']});
    google.charts.setOnLoadCallback(initDskChart);
    google.charts.setOnLoadCallback(initMemChart);
    google.charts.setOnLoadCallback(initCpuChart);
    google.charts.setOnLoadCallback(initNetChart);
    /*
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(initSysRateChart);
    */
}
// 초기셋팅
$(function()
{
	initEvent();
	initData();
	initControl();
	initChart();

	//$("#btnSearch").trigger("click");
});