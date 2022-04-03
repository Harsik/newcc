var d = new Date();
var currentYear = d.getFullYear();
var currentMonth = d.getMonth() + 1;

if(currentMonth < 10)
	currentMonth = "0"+currentMonth;
var currentYM = currentYear + "-" + currentMonth;

// 검색조건
var selOptType = "day";
var strtDt = "";
var endDt = "";

//기간 셀렉트 박스별 상세 검색
function changeTerm() {
	
	var termType = $("#blockStat_optTerm").val();
	
	if(termType == "year") {
		$("#blockStat_dvYear").show();
		$("#blockStat_dvMonth").hide();
		$("#blockStat_dvDay").hide();

		$("#blockStat_schYearStart").val(currentYear);
		$("#blockStat_schYearEnd").val(currentYear);
		
		strtDt = $("#blockStat_schYearStart").val();
		endDt = $("#blockStat_schYearEnd").val();
	}
	else if(termType == "month") {	
		$("#blockStat_dvYear").hide();
		$("#blockStat_dvMonth").show();
		$("#blockStat_dvDay").hide();
			    
		$("#blockStat_schMonthStart").val( currentYM );
		$("#blockStat_schMonthEnd").val( currentYM );
		
		strtDt = $("#blockStat_schMonthStart").val();
		endDt = $("#blockStat_schMonthEnd").val();
	}
	else if(termType == "day") {	
		$("#blockStat_dvYear").hide();
		$("#blockStat_dvMonth").hide();
		$("#blockStat_dvDay").show();
		
		$("#blockStat_schDayStart").val(getDate1());
		$("#blockStat_schDayEnd").val(getDate());
		
		strtDt = $("#blockStat_schDayStart").val();
		endDt = $("#blockStat_schDayEnd").val();
	}
	
	strtDt = strtDt.replace(/-/g,"");
	endDt = endDt.replace(/-/g,"");
}

// 검색버튼 클릭 이벤트
function btnSearchClickEvent(){
	selOptType = $("#blockStat_optTerm").val();
	if(selOptType == "year") {
		strtDt = $("#blockStat_schYearStart").val();
		endDt = $("#blockStat_schYearEnd").val();
	}
	else if(selOptType == "month") {	
		strtDt = $("#blockStat_schMonthStart").val();
		endDt = $("#blockStat_schMonthEnd").val();
	}
	else if(selOptType == "day") {	
		strtDt = $("#blockStat_schDayStart").val();
		endDt = $("#blockStat_schDayEnd").val();
	}
	
	strtDt = strtDt.replace(/-/g,"");
	endDt = endDt.replace(/-/g,"");
	
	$("#blockStat_tbl1").jqGrid("setGridParam", 
			{postData : {pJson : getJsonStrBlockCstmrList(selOptType,strtDt,endDt)}, 
			 page : 1, 
			 sortname : "START_DT", 
			 sortorder : "desc"}).trigger("reloadGrid");
	
	$("#blockStat_tbl2").jqGrid("setGridParam", 
			{postData : {pJson : getJsonStrBlockIvrCstmrList(selOptType,strtDt,endDt)}, 
			 page : 1, 
			 sortname : "CRT_DT", 
			 sortorder : "desc"}).trigger("reloadGrid");
}

// 초기화버튼 클릭 이벤트
function btnInitClickEvent(){
	$("#blockStat_optTerm").val("day");
	changeTerm();
	
	$("#blockStat_useCategory").prop("checked",false);
	changeBlcokStatEvent();
	
	btnSearchClickEvent();
}

// 엑셀저장 클릭 이벤트
function btnExcelClickEvent(){
	
}

// 일반리스트
function getJsonStrBlockCstmrList(selOptType,strtDt,endDt){
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNTEuYmxvY2tDc3RtckNudA==",
		"map" : {
			"key" : "value",
			"selOptType" : selOptType,
			"strtDt" : strtDt,
			"endDt" : endDt
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 차단 이후 리스트
function getJsonStrBlockIvrCstmrList(selOptType,strtDt,endDt){
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNTEuYmxvY2tJdnJDc3RtckNudA==",
		"map" : {
			"key" : "value",
			"selOptType" : selOptType,
			"strtDt" : strtDt,
			"endDt" : endDt
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

// 일반리스트
function getBlockCstmrList()
{
	$("#blockStat_tbl1").jqGrid({
			url : getContextPath() + "/jqgrid/statistics/blockCstmr.do",
			datatype : "json",
			mtype : "POST",
			postData : {
				pJson : getJsonStrBlockCstmrList(selOptType,strtDt,endDt)
			},
			jsonReader : {
				repeatitems: false
			},
			colNames : ["일자","전화번호","횟수"],
			colModel : [
				{ name : "START_DT", index : "START_DT", align : "center", width : 40 },
				{ name : "CUST_TEL_NO", index : "CUST_TEL_NO", align : "center", width : 110 },
				{ name : "CNT", index : "CNT", align : "center", width : 50 }
			],
			sortname : "START_DT",
			sortorder : "desc",
			gridview : true,
			hidegrid : false,
			shrinkToFit : true,
			loadonce : false,
			scrollOffset : 0,
		   	height : "400",
		   	width : "100%",
		   	rowNum : 20,
		   	rowList : [20, 40, 60],
		   	autowidth : true,
		   	pager : "#blockStat_pg1",
		   	rownumbers : true,
		   	rownumWidth : 30,
		   	multiselect : false,
		   	emptyrecords : "",
		   	caption : "",
		   	loadui : "enable",
		   	viewrecords: true,
	}).jqGrid("navGrid", "#blockStat_pg1", {edit : false, add : false, del : false, search : false});
}

// 차단이후 리스트
function getBlockIvrCstmrList()
{
	$("#blockStat_tbl2").jqGrid({
		url : getContextPath() + "/jqgrid/statistics/blockCstmr.do",
			datatype : "json",
			mtype : "POST",
			postData : {
				pJson : getJsonStrBlockIvrCstmrList(selOptType,strtDt,endDt)
			},
			jsonReader : {
				repeatitems: false
			},
			colNames : ["일자","전화번호","횟수"],
			colModel : [
				{ name : "CRT_DT", index : "CRT_DT", align : "center", width : 40 },
				{ name : "CUST_TEL_NO", index : "CUST_TEL_NO", align : "center", width : 110 },
				{ name : "CNT", index : "CNT", width : 50, align: "center" ,cellattr: function ( rowId , tv , rowObject , cm , rdata){
	            	return 'style="text-decoration: underline;cursor:pointer;"' 
	            } }
			],
			sortname : "CRT_DT",
			sortorder : "desc",
			gridview : true,
			hidegrid : false,
			shrinkToFit : true,
			loadonce : false,
			scrollOffset : 0,
		   	height : "400",
		   	width : "100%",
		   	rowNum : 20,
		   	rowList : [20, 40, 60],
		   	autowidth : true,
		   	pager : "#blockStat_pg2",
		   	rownumbers : true,
		   	rownumWidth : 30,
		   	multiselect : false,
		   	emptyrecords : "",
		   	caption : "",
		   	loadui : "enable",
		   	viewrecords: true,
		   	onCellSelect : function(rowid, iCol, cellContent, e)
	        {
		   		var row = $("#blockStat_tbl2").getRowData(rowid);
		   		
		   		var dt = row.CRT_DT.replace(/-/g,"");
		   		var tel = row.CUST_TEL_NO.replace(/-/g,"");
		   		var type = $("#blockStat_optTerm").val();
		   		
		   		if(iCol==3){
		   			var width = 440;
		   			var height = 472;
		   			var top = ((screen.height - height) / 2) / 2;
		   			var left = (screen.width - width) / 2;
		   			var paramURL = getContextPath() + "/web/statistics/blockIvrPopup.do?type="+type+"&dt="+dt+"&tel="+tel;
		   			var newWindow = window.open(paramURL, "IVR인입리스트", "resizable");
		   			newWindow.moveTo(left, top);
		   			newWindow.resizeTo(width,height);
		   			newWindow.focus();
	        	}
	        }
	}).jqGrid("navGrid", "#blockStat_pg2", {edit : false, add : false, del : false, search : false});
}

// 차단 전 후 체크 이벤트
function changeBlcokStatEvent(){
	if($("#blockStat_useCategory").is(":checked"))
    {
    	$("#grid1").hide();
    	$("#grid2").show();
    }
    else
    {
    	$("#grid2").hide();
    	$("#grid1").show();
    }
}

$(document).ready(function()
{
	var selectBox = "";	
	for(var i = currentYear; i >= currentYear-5; i--)
	{
		selectBox +=  "<option value = '" + i + "'>" + i + "년"+"</option>";
	}
	
	$("#blockStat_schYearStart").html(selectBox);
	$("#blockStat_schYearEnd").html(selectBox);
	
	$("#blockStat_schMonthStart").MonthPicker({
		MaxMonth: 0
    });
	
	$("#blockStat_schMonthEnd").MonthPicker({
		MaxMonth: 0
    });
	
	datePicker("#blockStat_schDayStart");
	datePicker("#blockStat_schDayEnd");
	
//	btnInitClickEvent();
	$("#blockStat_optTerm").val("day");
	changeTerm();
	
	getBlockCstmrList();
	getBlockIvrCstmrList();
	$("#grid2").hide();
	
	// 검색버튼 클릭이벤트 등록
	$("#blockStat_btnSearch").bind("click", btnSearchClickEvent);
	
	// 초기화버튼 클릭이벤트 등록
	$("#blockStat_btnInit").bind("click", btnInitClickEvent);
	
	// 엑셀저장버튼 클릭이벤트 등록
	$("#blockStat_btnExcel").bind("click", btnExcelClickEvent);
	
	// 기간 조회조건 change 이벤트
	$("#blockStat_optTerm").bind("change", changeTerm);	
	
	// 차단 전 후 체크 이벤트 등록
	$("#blockStat_useCategory").bind("change", changeBlcokStatEvent);
});
