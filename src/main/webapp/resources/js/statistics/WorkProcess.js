// 전역 변수
var gTermType = "";
var gUsrGrdCd = getUserGrdCode();

var gCenterArr = [];
var gTeamArr = [];
var gCounselArr = [];

var gCenterNm = "";
var gTeamNm = "";
var gCounselNm = "";

// 전역 엑셀 정보
var gColWidth = [];
var gColName = [];
var gColHeader = [];
var gColAlign = [];

// 전역 그리드 정보
var gColNames = [];
var gColModel = [];
var gGroupHeaders = [];

// 기간별 동적 컬럼
var gTrtPivotValue = "";
var gActPivotValue = "";
var gActTrtValueAll = "";
var gActTrtValueUsr = "";

//그리드 셀 병합 변수
var chkcell_Col1={cellId:undefined, chkval:undefined}; //cell rowspan 중복 체크
var chkcell_Col2={cellId:undefined, chkval:undefined}; //cell rowspan 중복 체크

//파라미터 셋팅_getJsonStrYearList
function getJsonStrYearList(year)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c3QwMDAueWVhckxpc3Rzbw==",//st001.yearList
		"map" : {
			"key" : "value",
			"year" : year,
			"centerNm" : gCenterNm,
			"teamNm" : gTeamNm,
			"counselNm" : gCounselNm,
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonStrYearListExcel
function getJsonStrYearListExcel(year)
{
	var titleCenter=($("#optCenter").val()=="all")?"전체":"온누리콜센터";
	var titleteam=($("#optTeam").length==0)?" ":($("#optTeam").val()=="all")?" 전체":($("#optTeam").val()=="0004")?" 관리팀":($("#optTeam").val()=="0003")?" 중국어상담팀 ":($("#optTeam").val()=="0002")?" 일본어상담팀 ":"영어상담팀";
	var titleYear=$("#optYear").val()+" 년 ";
	var titleTearm=($("#optTerm").val()=="month")?"월별":($("#optTerm").val()=="day")?"일별":($("#optTerm").val()=="time")?"시간별":"기간별";
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c3QwMDAueWVhckxpc3Rzbw==",//st001.yearList
		"map" : {
			"key" : "value",
			"year" : year,
			"centerNm" : gCenterNm,
			"teamNm" : gTeamNm,
			"counselNm" : gCounselNm,
			"sidx" : $("#tblWork").getGridParam("sortname"),
			"sord" : $("#tblWork").getGridParam("sortorder"),
			"title" : "상담사별접수현황("+titleCenter+titleteam+"_상담사의_"+titleYear+titleTearm+")",
			"colWidth" : gColWidth,
			"colName" : gColName,
			"colHeader" : gColHeader,
			"colAlign" : gColAlign,
			/*"out_type" : "excel",*/
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}
 
//파라미터 셋팅_getJsonStrMonthList
function getJsonStrMonthList(yearMonth, lastDay)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c3QwMDAubW9udGhMaXN0c28=",//st001.monthList
		"map" : {
			"key" : "value",
			"year" : yearMonth.substring(0, 4),
			"yearMonth" : yearMonth.substring(4, 7),
			"lastDay" : lastDay,
			"centerNm" : gCenterNm,
			"teamNm" : gTeamNm,
			"counselNm" : gCounselNm,
		}
	};

	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonStrMonthListExcel
function getJsonStrMonthListExcel(yearMonth, lastDay)
{
	var titleCenter=($("#optCenter").val()=="all")?"전체":"온누리콜센터";
	var titleteam=($("#optTeam").length==0)?" ":($("#optTeam").val()=="all")?" 전체":($("#optTeam").val()=="0004")?" 관리팀":($("#optTeam").val()=="0003")?" 중국어상담팀 ":($("#optTeam").val()=="0002")?" 일본어상담팀 ":"영어상담팀";
	var titleYear=$("#optDayYear").val()+" 년 ";
	var titleTearm=($("#optTerm").val()=="month")?"월별":($("#optTerm").val()=="day")?"일별":($("#optTerm").val()=="time")?"시간별":"기간별";
	var titleMonth=($("#optDayMonth").length==0)?"":$("#optDayMonth").val()+"월 의 ";
	//"title" : "상담사별접수현황 ( "+titleCenter+titleteam+" 상담사의 "+titleYear+titleMonth+titleTearm+" )",		
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c3QwMDAubW9udGhMaXN0c28=",//st001.monthList
		"map" : {
			"key" : "value",
			"year" : yearMonth.substring(0, 4),
			"yearMonth" : yearMonth.substring(4, 7),
			"lastDay" : lastDay,
			"centerNm" : gCenterNm,
			"teamNm" : gTeamNm,
			"counselNm" : gCounselNm,
			"sidx" : $("#tblWork").getGridParam("sortname"),
			"sord" : $("#tblWork").getGridParam("sortorder"),
			"title" : "상담사별접수현황("+titleCenter+titleteam+"_상담사의_"+titleYear+titleMonth+titleTearm+")",
			"colWidth" : gColWidth,
			"colName" : gColName,
			"colHeader" : gColHeader,
			"colAlign" : gColAlign
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonStrDayList
function getJsonStrDayList(timeS, timeE)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c3QwMDAudGltZUxpc3R6dA==",//st002.timeListzt
		"map" : {
			"key" : "value",
			"timeS" : timeS,
			"timeE" : timeE,
			"centerNm" : gCenterNm,
			"teamNm" : gTeamNm,
			"counselNm" : gCounselNm,
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonStrDayList
function getJsonStrDayListExcel(timeS, timeE)
{
	
	var titleCenter=($("#optCenter").val()=="all")?"전체":"온누리콜센터";
	var titleteam=($("#optTeam").length==0)?" ":($("#optTeam").val()=="all")?" 전체":($("#optTeam").val()=="0004")?" 관리팀":($("#optTeam").val()=="0003")?" 중국어상담팀 ":($("#optTeam").val()=="0002")?" 일본어상담팀 ":"영어상담팀";
	var titleYear=$("#tfTime").val()+" ";
	var titleTearm=($("#optTerm").val()=="month")?"월별":($("#optTerm").val()=="day")?"일별":($("#optTerm").val()=="time")?"시간별":"기간별";
	//"title" : "상담사별접수현황 ( "+titleCenter+titleteam+" 상담사의 "+titleYear+titleTearm+" )",
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c3QwMDAudGltZUxpc3R6dA==",//st002.timeListzt
		"map" : {
			"key" : "value",
			"time" : timeS,
			"centerNm" : gCenterNm,
			"teamNm" : gTeamNm,
			"counselNm" : gCounselNm,
			"sidx" : $("#tblWork").getGridParam("sortname"),
			"sord" : $("#tblWork").getGridParam("sortorder"),
			"title" : "상담사별접수현황("+titleCenter+titleteam+"_상담사의_"+titleYear+titleTearm+")",
			"colWidth" : gColWidth,
			"colName" : gColName,
			"colHeader" : gColHeader,
			"colAlign" : gColAlign
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonStrTermList
function getJsonStrTermList(startDate, endDate)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c3QwMDAudGVybUxpc3Rzbw==",//st001.termList
		"map" : {
			"key" : "value",
			"startDate" : startDate,
			"endDate" : endDate,
			"trtPivotValue" : gTrtPivotValue,
			"centerNm" : gCenterNm,
			"teamNm" : gTeamNm,
			"counselNm" : gCounselNm,
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonStrTermList
function getJsonStrTermListExcel(startDate, endDate)
{
	var titleCenter=($("#optCenter").val()=="all")?"전체":"온누리콜센터";
	var titleteam=($("#optTeam").length==0)?" ":($("#optTeam").val()=="all")?" 전체":($("#optTeam").val()=="0004")?" 관리팀":($("#optTeam").val()=="0003")?" 중국어상담팀 ":($("#optTeam").val()=="0002")?" 일본어상담팀 ":"영어상담팀";
	var titleTearm=($("#optTerm").val()=="month")?"월별":($("#optTerm").val()=="day")?"일별":($("#optTerm").val()=="time")?"시간별":"기간별";
	//"title" : "상담사별접수현황 ( "+titleCenter+titleteam+" 상담사의 "+titleTearm+" )",
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "c3QwMDAudGVybUxpc3Rzbw==",//st001.termList
			"map" : {
				"key" : "value",
				"startDate" : startDate,
				"endDate" : endDate,
				"trtPivotValue" : gTrtPivotValue,
				"centerNm" : gCenterNm,
				"teamNm" : gTeamNm,
				"counselNm" : gCounselNm,
				"sidx" : $("#tblWork").getGridParam("sortname"),
				"sord" : $("#tblWork").getGridParam("sortorder"),
				"title" : "상담사별접수현황("+titleCenter+titleteam+"_상담사의_"+titleTearm+")",
				"colWidth" : gColWidth,
				"colName" : gColName,
				"colHeader" : gColHeader,
				"colAlign" : gColAlign
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}


//파라미터 셋팅 usrList
function getJsonStrUserList(cntr_cd, team_cd)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",//om001.selectList
		"map" : {
			"key" : "value",
			"notuse" : true,
			"chkRetire" : true,
			"cntr_cd" : cntr_cd,
			"team_cd" : team_cd,
			"notuse" : false,
			"chkRetire" : false,
			"teamCd" : "1",
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//그리드 셀 병합
function arrtSetting(rowid, val, rowObject, cm, rdata) {
    var result = "";
    
    if (cm.name == "CNTR_NM")
    {
	    if(chkcell_Col1.chkval != val){ //check 값이랑 비교값이 다른 경우
	        var cellId = this.id + '_row_'+rowid+'-'+cm.name;
	        result = ' rowspan="1" id ="'+cellId+'" + name="cellRowspan"';
	        chkcell_Col1 = {cellId:cellId, chkval:val};
	    }else{
	        result = 'style="display:none"  rowspanid="'+chkcell_Col1.cellId+'"'; //같을 경우 display none 처리
	    }
    } else if (cm.name == "TEAM_NM")
    {
	    if(chkcell_Col2.chkval != val){ //check 값이랑 비교값이 다른 경우
	        var cellId = this.id + '_row_'+rowid+'-'+cm.name;
	        result = ' rowspan="1" id ="'+cellId+'" + name="cellRowspan"';
	        chkcell_Col2 = {cellId:cellId, chkval:val};
	    }else{
	        result = 'style="display:none"  rowspanid="'+chkcell_Col2.cellId+'"'; //같을 경우 display none 처리
	    }
    }
    return result;

}

// 초기화 함수
function init()
{
//	$("#optTerm").val("month");
//	if(window.sessionStorage.getItem("TEAM_NM") != "undefined")
//		gTeamNm = window.sessionStorage.getItem("TEAM_NM");
//	else
//		gCenterNm = "지원센터1";
//	gCounselNm = "";
	
	gColWidth = [];
	gColName = [];
	gColHeader = [];
	gColAlign = [];
	
	// 조회 조건 셀렉트 박스 등록
	regCenter();
	
	// 기간 체인지 이벤트 등록
	changeTerm();
	
	// 그리드 그리는 함수
	drawGrid();
}
/*
// 어제 주말인지 여부
function weeked()
{	
	var d = new Date();
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var date = d.getDate() -1 ;
	var yesterday = d.getDay() - 1;
	
	while( yesterday == 0 || yesterday == 6 )
	{
		if(yesterday == 0)
			yesterday = 6;
		else
			yesterday--;
		
		if(date == 1)
		{
			if(month == 1)
			{
				year = year -1;
				month = 12;
				date = ( new Date( year, month, 0) ).getDate();
			}
			else
			{
				month = month - 1;
				date = ( new Date( year, month, 0) ).getDate();
			}
		}
		else
		{
			date = date - 1;
		}
	}
	
	if(month < 10)
		month = "0" + month;
	
	if(date < 10)
		date= "0" + date;
	
	return year + "-" + month + "-" + date;	
}
*/
//기간 셀렉트 박스별 상세 검색
function changeTerm()
{
	var d = new Date();
	var termType = $("#optTerm").val();
	
	if(termType == "month")
	{
		var currentYear = d.getFullYear();
		var selectBox = "";
		selectBox +=  "<select id = 'optYear' style ='width : 100px; margin-left : 5px;' >";
		for(var i = 2015; i <= currentYear; i++)
		{
			selectBox +=  "<option value = '" + i + "'>" + i + "년"+"</option>";
		}
		selectBox +=  "</select>";
		
		$("#termDetail").empty();
		$("#termDetail").append(selectBox);
		$("#optYear").val(currentYear);
	}
	else if(termType == "day")
	{
		var currentYear = d.getFullYear();
		var optYear =  "";
		var currentMonth = d.getMonth() + 1;
		optYear +=  "<select id = optDayYear style ='width : 100px; margin-left : 5px;'>";
		for(var i = 2015; i <= currentYear; i++)
		{
			optYear +=  "<option value = '" + i + "'>" + i + "년"+"</option>";
		}
		optYear +=  "</select>";
		
		var optMonth = "";
		optMonth += "<select id = optDayMonth style ='width : 100px; margin-left : 10px;'>";
		for(var i = 1; i <= 12; i++)
		{
			optMonth +=  "<option value = '" + i + "'>" + i + "월"+"</option>";
		}
		optMonth += "</select>";
		
		$("#termDetail").empty();
		$("#termDetail").append(optYear);
		$("#termDetail").append(optMonth);
		$("#optDayYear").val(currentYear);
		$("#optDayMonth").val(currentMonth);
		
	}
	else if(termType == "time")
	{
		var tfTimeStart =  "<input type = 'text' id = 'tfTimeStart' style = 'width : 95px; margin-left : 5px;' readOnly/>";
		var tfTimeEnd =  "<input type = 'text' id = 'tfTimeEnd' style = 'width : 95px;' readOnly/>";
		
		$("#termDetail").empty();
		$("#termDetail").append(tfTimeStart);
		$("#termDetail").append(" ~ ");
		$("#termDetail").append(tfTimeEnd);
		
		$("#tfTimeStart").val(getPrvDay("D", 1, "-"));
		$("#tfTimeEnd").val(getPrvDay("D", 1, "-"));
		//$("#tfTime").val(weeked);
		
		datePicker("#tfTimeStart");
		datePicker("#tfTimeEnd");
	}
	else if(termType == "term")
	{
		var tfTermStart =  "<input type = 'text' id = 'tfTermStart' style = 'width : 95px; margin-left : 5px;' readOnly/>";
		var tfTermEnd =  "<input type = 'text' id = 'tfTermEnd' style = 'width : 95px;' readOnly/>";
		$("#termDetail").empty();
		$("#termDetail").append(tfTermStart);
		$("#termDetail").append(" ~ ");
		$("#termDetail").append(tfTermEnd);
		
		/*
		var d = new Date();
		var year = d.getFullYear();
		var month = d.getMonth() + 1;
		
		if(month < 10)
			month = "0" + month;
		
		$("#tfTermStart").val(year + "-" + month + "-01" );
		$("#tfTermEnd").val(weeked);
		*/
		
		$("#tfTermStart").val(getPrvDay("D", 7, "-"));
		$("#tfTermEnd").val(getPrvDay("D", 1, "-"));
		
		datePicker("#tfTermStart");
		datePicker("#tfTermEnd");
	}
}

// 그리드 동적으로 만들기 위한 함수
function grid(jsonValue, colNamesValue, colModelValue, groupHeadersValue) 
{
	$("#tblWorkArea").empty();
	var tb = "<table id = 'tblWork'></table>"; 
	$("#tblWorkArea").append(tb);
	
	$("#tblWork").jqGrid(
	{
		url : getContextPath() + "/ajax/statistics/workList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : jsonValue
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : colNamesValue,
		colModel : colModelValue,
		sortname : "USR_NM",
		sortorder : "asc",
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : false,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "405",
	   	width : "100%",
	   	rowNum : "10000",
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	pgbuttons : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "0",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
	   	pager : "",
	   	loadComplete : function(data) 
	   	{
			if(data.length == 1)
				data = "";
		},
		gridComplete : function() {  /** 데이터 로딩시 함수 **/		
            
			//대분류, 중분류 셀 병합
			var grid = this;
             
            $('td[name="cellRowspan"]', grid).each(function() {
                var spans = $('td[rowspanid="'+this.id+'"]',grid).length+1;
                if(spans>1){
                 $(this).attr('rowspan',spans);
                }
            });  
            
            chkcell_Col1={cellId:undefined, chkval:undefined};
            chkcell_Col2={cellId:undefined, chkval:undefined};
     
        },  		
	}).jqGrid('setGroupHeaders', 
	{
	  useColSpanStyle : true, 
	  groupHeaders : groupHeadersValue
	}).jqGrid('setFrozenColumns');
}
/*
// cd값을 nm값으로 변환
function cdConvert(cd, gArr) 
{
	var gNm = "";
	
	if(cd != undefined)
	{
		if(cd == "all")
			gNm = "";
		else
		{
			for(var i = 0 ; i < gArr.length; i++)
			{
				if( gArr[i].key == cd )
					gNm = gArr[i].value;
			}
		}
	}
	else
	{
		gNm = "";
	}
	
	return gNm;
}
*/
// 그리드 엑셀 정보 셋팅_머리
function gridAndExcelSettingHead() 
{
	gColWidth.push(30, 20, 20);
	gColAlign.push("center", "center", "center");
	gColHeader.push("센터", "팀", "성명");
	gColName.push("CNTR_NM", "TEAM_NM", "USR_NM");
	gColNames.push("센터", "팀", "성명");
	gColModel.push({"name" : "CNTR_NM", width : 120, align : "left", frozen : true, sortable : false, cellattr: arrtSetting}
				  , {"name" : "TEAM_NM", width : 100, align : "left", frozen : true, sortable : false, cellattr: arrtSetting}
				  , {"name" : "USR_NM", width : 80, align : "center", frozen : true, sortable : false});

}

//그리드 엑셀 정보 셋팅_꼬리
function gridAndExcelSettingTail() 
{
	gColWidth.push(20, 20, 20, 20, 20, 20, 20, 20, 20, 20);
	gColAlign.push("center", "center", "center", "center", "center", "center", "center", "center");
	gColHeader.push("접수건수", "IN", "OUT", "완료건수", "미완료건수", "처리완료율", "총후처리시간", "총상담시간");
	gColName.push("TRT_SCNT_TOT", "TRT_SCNT_IN_TOT", "TRT_SCNT_OUT_TOT", "ACT_SCNT_TOT", "IMPF_SCNT_TOT", "ACT_RATE", "ACW_TM_TOT", "CALL_TM_TOT");
	gColNames.push("접수건수", "IN", "OUT", "완료건수", "미완료건수", "처리완료율", "총후처리시간", "총상담시간");
	gColModel.push({"name" : "TRT_SCNT_TOT", width : 60, align : "center", sortable : false, formatter: 'integer', formatoptions:{thousandsSeparator:","}}				//접수건수
					, {"name" : "TRT_SCNT_IN_TOT", width : 60, align : "center", sortable : false, formatter: 'integer', formatoptions:{thousandsSeparator:","}}		//IN
					, {"name" : "TRT_SCNT_OUT_TOT", width : 60, align : "center", sortable : false, formatter: 'integer', formatoptions:{thousandsSeparator:","}}		//OUT
					, {"name" : "ACT_SCNT_TOT", width : 60, align : "center", sortable : false, formatter: 'integer', formatoptions:{thousandsSeparator:","}}			//완료건수
					, {"name" : "IMPF_SCNT", width : 80, align : "center", sortable : false, formatter: 'integer', formatoptions:{thousandsSeparator:","}}				//미완료건수
					, {"name" : "ACT_RATE", width : 80, align : "center", sortable : false}					//처리완료율
					, {"name" : "ACW_TM_TOT", width : 100, align : "center", sortable : false}				//총후처리시간
					, {"name" : "CALL_TM_TOT", width : 100, align : "center", sortable : false}				//총상담시간
			
				);				

}

//그리드 그리는 함수
function drawGrid(type)
{
	gTermType = $("#optTerm").val();
	
//	if(type == "search")
//	{
		var optCenterCd = $("#optCenter").val();
		var optTeamCd = $("#optTeam").val();
		var optCounselCd = $("#optWorkCounselNm").val();
		
		// 팀에 상담사가 존재 하는지 유무
		if(optCounselCd == "N")
		{
			alert("상담사가 없는 팀입니다.");
			return;
		}
		
		gCenterNm = $("#optCenter").val();
		gTeamNm = $("#optTeam").val();
		gCounselNm = $("#optWorkCounselNm").val();
		
/*		gCenterNm = cdConvert(optCenterCd, gCenterArr);
		gTeamNm = cdConvert(optTeamCd, gTeamArr);
		gCounselNm = cdConvert(optCounselCd, gCounselArr);*/
		
//	}
	
	gColNames = [];
	gColModel = [];
	gGroupHeaders = [];
	
	gColWidth = [];
	gColName = [];
	gColHeader = [];
	gColAlign = [];
	
	if(gTermType == "month")
	{
		gridAndExcelSettingHead();
		for(var i = 1  ; i <= 12; i++)
		{
			if(i < 10)
				i = "0"+i;
			
			gColWidth.push(20, 20, 20, 20);
			gColAlign.push("center", "center", "center", "center");
			gColHeader.push(i + "월 접수건수", i + "월 IN", i + "월 OUT", i + "월 완료건수");
			gColName.push("TRT" + i + "_TRT", "TRT" + i + "_TRT_IN", "TRT" + i + "_TRT_OUT", "TRT" + i + "_ACT");
			gColNames.push("접수건수", "IN", "OUT", "완료건수");
			gColModel.push({"name" : "TRT" + i + "_TRT", width : 60, align : "center", sortable : false, formatter: 'integer', formatoptions:{thousandsSeparator:","}}, 
							{"name" : "TRT" + i + "_TRT_IN", width : 60, align : "center", sortable : false, formatter: 'integer', formatoptions:{thousandsSeparator:","}}, 
							{"name" : "TRT" + i + "_TRT_OUT", width : 60, align : "center", sortable : false, formatter: 'integer', formatoptions:{thousandsSeparator:","}}, 
							{"name" : "TRT" + i + "_ACT", width : 60, align : "center", sortable : false, formatter: 'integer', formatoptions:{thousandsSeparator:","}});
			gGroupHeaders.push({startColumnName: "TRT" + i + "_TRT", numberOfColumns : 4, titleText : i + "월"});

		}
		gridAndExcelSettingTail();
		
		var year = $("#optYear").val();
		
		grid(getJsonStrYearList(year), gColNames, gColModel, gGroupHeaders);
	}
	else if(gTermType == "day")
	{
		var lastDay = ( new Date( $("#optDayYear").val(), $("#optDayMonth").val(), 0) ).getDate();
		var selectMonth = $("#optDayMonth").val();
		if(selectMonth < 10)
		{
			selectMonth = "0" + selectMonth; 
		}
		var yearMonth = $("#optDayYear").val() + selectMonth;
		
		gridAndExcelSettingHead();
		for(var i = 1  ; i <= lastDay; i++)
		{
			if(i < 10)
				i = "0"+i;
			
			gColWidth.push(20, 20, 20, 20);
			gColAlign.push("center", "center", "center", "center");
			gColHeader.push(i + "일 접수건수", i + "일 IN", i + "일 OUT", i + "일 완료건수");
			gColName.push("TRT" + i + "_TRT", "TRT" + i + "_TRT_IN", "TRT" + i + "_TRT_OUT", "TRT" + i + "_ACT");
			gColNames.push("접수건수", "IN", "OUT", "완료건수");
			gColModel.push({"name" : "TRT" + i + "_TRT", width : 60, align : "center", sortable : false, formatter: 'integer', formatoptions:{thousandsSeparator:","}}, 
							{"name" : "TRT" + i + "_TRT_IN", width : 60, align : "center", sortable : false, formatter: 'integer', formatoptions:{thousandsSeparator:","}}, 
							{"name" : "TRT" + i + "_TRT_OUT", width : 60, align : "center", sortable : false, formatter: 'integer', formatoptions:{thousandsSeparator:","}}, 
							{"name" : "TRT" + i + "_ACT", width : 60, align : "center", sortable : false, formatter: 'integer', formatoptions:{thousandsSeparator:","}});
			gGroupHeaders.push({startColumnName: "TRT" + i + "_TRT", numberOfColumns : 4, titleText : i + "일"});

		}
		gridAndExcelSettingTail();
		
		grid(getJsonStrMonthList(yearMonth, lastDay), gColNames, gColModel, gGroupHeaders);
		
	}
	else if(gTermType == "time")
	{
/*		if($("#tfTime").val().replace(/-/g,"") == "")
		{
			alert("검색할 기간을 입력해주세요.");
			return;
		}*/
		
		if($("#tfTimeStart").val().replace(/-/g,"") == "" || $("#tfTimeEnd").val().replace(/-/g,"") == "")
		{
			alert("검색할 기간을 입력해주세요.");
			return;
		}
		
		gridAndExcelSettingHead();
		for(var i = 0  ; i <= 23; i++)
		{
			if(i < 10)
				i = "0"+i;
			
			gColWidth.push(20, 20, 20, 20);
			gColAlign.push("center", "center", "center", "center");
			gColHeader.push(i + "시 접수건수", i + "시 IN", i + "시 OUT", i + "시 완료건수");
			gColName.push("TRT" + i + "_TRT", "TRT" + i + "_TRT_IN", "TRT" + i + "_TRT_OUT", "TRT" + i + "_ACT");
			gColNames.push("접수건수", "IN", "OUT", "완료건수");
			gColModel.push({"name" : "TRT" + i + "_TRT", width : 60, align : "center", sortable : false, formatter: 'integer', formatoptions:{thousandsSeparator:","}}, 
							{"name" : "TRT" + i + "_TRT_IN", width : 60, align : "center", sortable : false, formatter: 'integer', formatoptions:{thousandsSeparator:","}}, 
							{"name" : "TRT" + i + "_TRT_OUT", width : 60, align : "center", sortable : false, formatter: 'integer', formatoptions:{thousandsSeparator:","}}, 
							{"name" : "TRT" + i + "_ACT", width : 60, align : "center", sortable : false, formatter: 'integer', formatoptions:{thousandsSeparator:","}});
			gGroupHeaders.push({startColumnName: "TRT" + i + "_TRT", numberOfColumns : 4, titleText : i + "시"});

		}
		gridAndExcelSettingTail();
		
		var timeStart = $("#tfTimeStart").val().replace(/-/g, "");
		var timeEnd = $("#tfTimeEnd").val().replace(/-/g, "");
		//var time = $("#tfTime").val().replace(/-/g, "");
		
		grid(getJsonStrDayList(timeStart, timeEnd), gColNames, gColModel, gGroupHeaders);
		
	}
	else if(gTermType == "term")
	{
		var startYear = $("#tfTermStart").val().split("-")[0];
		var endYear = $("#tfTermEnd").val().split("-")[0];
		var startMonth = $("#tfTermStart").val().split("-")[1];
		var endMonth = $("#tfTermEnd").val().split("-")[1];
		var startDay = $("#tfTermStart").val().split("-")[2];
		var endDay = $("#tfTermEnd").val().split("-")[2];
		
		if($("#tfTermStart").val().replace(/-/g,"") == "" || $("#tfTermEnd").val().replace(/-/g,"") == "")
		{
			alert("검색할 기간을 입력해주세요.");
			return;
		}
		else if(startMonth == "11" )
		{
			if( startYear - endYear > 0 || startYear - endYear < -1 || (startMonth - endMonth != 0 && startMonth - endMonth != -1 && startMonth - endMonth != 10))
			{
				alert("최대 세달까지 검색 가능합니다.");
				return;
			}
		}
		else if(startMonth == "12" )
		{
			if( startYear - endYear > 0 || startYear - endYear < -1 || (startMonth - endMonth != 0 && startMonth - endMonth != 11 && startMonth - endMonth != 10))
			{
				alert("최대 세달까지 검색 가능합니다.");
				return;
			}
		}
		else if(startYear - endYear > 0 || startYear - endYear < -1 || startMonth - endMonth < -2 || startMonth - endMonth > 0)
		{
			alert("최대 세달까지 검색 가능합니다.");
			return;
		}
		
		gTrtPivotValue = "";
		gActPivotValue = "";
		gActTrtValueAll = "";
		gActTrtValueUsr = "";
		var isWhile = true;
		var workTermStartYear = $("#tfTermStart").val().split("-")[0];
		var workTermEndYear = $("#tfTermEnd").val().split("-")[0];
		var workTermStartMonth = parseInt($("#tfTermStart").val().split("-")[1].replace(/-/g,""));
		var workTermEndMonth = parseInt($("#tfTermEnd").val().split("-")[1].replace(/-/g,""));
		
		if(workTermStartYear != workTermEndYear)
			workTermEndMonth = 12 + workTermEndMonth;
		
		gridAndExcelSettingHead();
		do
		{
			/*alert(startMonth - endMonth);*/
			
			var startMonthLastDay = ( new Date( startYear, startMonth, 0) ).getDate();
			
			if(startMonth == $("#tfTermStart").val().split("-")[1] && startMonth == endMonth) // 기간이 한달인 경우 ex) 9월1일 ~ 9월 25일
			{
				for(var i = startDay  ; i <= endDay; i++)
					termValueReg(i);
			}
			else if(startMonth == $("#tfTermStart").val().split("-")[1] && startMonth != endMonth) // 시작달 하고 끝달이 같지 않을 경우 ex) 9월1일 ~ 10월15일 일 때 startMonth값이 10일 경우
			{
				for(var i = startDay  ; i <= startMonthLastDay; i++)
					termValueReg(i);
			}
			else if( startMonth == endMonth ) // 시작달이 끝달인 경우 ex) 9월1일 ~ 10월15일일 때 startMonth값이 10인 경우
			{
				for(var i = 1 ; i <= endDay; i++)
					termValueReg(i);
			}
			else // 나머지 경우 ex) 9월 15일 ~ 11월 28일 일 때 startMonth 값이 10월인 경우
			{
				var lastDay = ( new Date( startYear, startMonth, 0) ).getDate();
				for(var i = 1 ; i <= lastDay; i++)
					termValueReg(i);
			}
			if( workTermStartMonth - workTermEndMonth == 0)
				isWhile = false;
			
			if(startMonth ==12)
				startMonth = 1;
			
			startMonth++;
			workTermStartMonth++;
			
			if(startMonth < 10)
				startMonth = "0" + startMonth;
			
		}while( isWhile);
		gridAndExcelSettingTail();
		
		function termValueReg(i)
		{
			var v = i;
			if( v != $("#tfTermStart").val().split("-")[2] && v < 10 )
				v = "0" + v;
			
			if(gTrtPivotValue.length == "0")
			{
				gTrtPivotValue += startYear + startMonth + v + " AS TRT" + startYear + startMonth + v;
			}
			else
			{
				gTrtPivotValue += ", " + startYear + startMonth + v + " AS TRT" + startYear + startMonth + v;
			}
			
			gColWidth.push(30, 30, 30, 30);
			gColAlign.push("center", "center", "center", "center");
			gColHeader.push(startYear + "년" + startMonth + "월" + v + "일 접수건수", startYear + "년" + startMonth + "월" + v + "일 IN", startYear + "년" + startMonth + "월" + v + "일 OUT", startYear + "년" + startMonth+ "월" + v + "일 완료건수");
			gColName.push("TRT" + startYear + startMonth + v + "_TRT", "TRT" + startYear + startMonth + v + "_TRT_IN", "TRT" + startYear + startMonth + v + "_TRT_OUT", "TRT" + startYear + startMonth + v + "_ACT");
			gColNames.push("접수건수", "IN", "OUT", "완료건수");
			gColModel.push({"name" : "TRT" + startYear + startMonth + v + "_TRT", width : 60, align : "center", sortable : false, formatter: 'integer', formatoptions:{thousandsSeparator:","} }, 
							{"name" : "TRT" + startYear + startMonth + v + "_TRT_IN", width : 60, align : "center", sortable : false, formatter: 'integer', formatoptions:{thousandsSeparator:","} }, 
							{"name" : "TRT" + startYear + startMonth + v + "_TRT_OUT", width : 60, align : "center", sortable : false, formatter: 'integer', formatoptions:{thousandsSeparator:","} }, 
							{"name" : "TRT" + startYear + startMonth + v + "_ACT", width : 60, align : "center", sortable : false, formatter: 'integer', formatoptions:{thousandsSeparator:","} });
			gGroupHeaders.push({startColumnName: "TRT" + startYear + startMonth + v + "_TRT", numberOfColumns : 4, titleText : startYear + "년 " + startMonth + "월 " + v + "일"});	

		}
		
		var start = $("#tfTermStart").val().replace(/-/g,"");
		var end = $("#tfTermEnd").val().replace(/-/g,"");
		
		grid(getJsonStrTermList(start, end), gColNames, gColModel, gGroupHeaders);
	}
	
}

//조회 조건 중 팀 셀렉트 박스 체인지 이벤트
function optTeam_changeEvent() {
	if($("#optTeam").val() == "all") {
		$("#txtTeam").empty();
	} else {
		var optCounselNm = "<select id = 'optWorkCounselNm' style = 'width : 100px'></select>";
		$("#txtTeam").html(optCounselNm);
		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : getContextPath() + "/ajax/user/userList.do",
			data : "pJson=" + getJsonStrUserList($("#optCenter").val(), $("#optTeam").val()),
			success : function(data) {
				$("#optWorkCounselNm").empty();		
				// param값을 JSON으로 파싱
				var options = "";
				if(data.length == 0) {
					options += "<option value='N'>인원 없음</option>";
				} else {
					options += "<option value='all'>전체</option>";
					$.each(data, function(key, state) {
						options += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
						gCounselArr.push({"key" : state.USR_ID, "value" : state.USR_NM});
					});
				}
				$("#optWorkCounselNm").append(options);
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	}
}

// 조회 조건 중 센터 셀렉트 박스 체인지 이벤트
function optCenter_changeEvent() {
	// 셀렉트 박스 셋팅
	if($("#optCenter").val() == "all") {
		$("#txtCenter").empty();
	} else {
		var tag = "<select id = 'optTeam' style = 'width : 100px;'></select><span id = 'txtTeam'></span>";
		$("#txtCenter").html(tag);
		$.ajax({
			type : "post",
			async : false,
			url : getContextPath() + "/ajax/main/CommonSetSelectBox.do",
			data : "pJson=" + getJsonStrCommonSetSelectBox("90003", "90002", $("#optCenter").val()),
			success : function(data) {
				$("#optTeam").empty();
				// param값을 JSON으로 파싱
				var jr = JSON.parse(data);
				var options = "";
				if(data.length <= 0) {
					options += "<option value='N'>팀 없음</option>";
				} else {
					//~팀장급
					if(gUsrGrdCd < 50000) {
						$.each(jr, function(key, state) {
							if(state.CD == window.sessionStorage.getItem("TEAM_CD")) {
								
								options += "<option value='" + state.CD + "' >" + state.CD_NM + "</option>";
								gTeamArr.push({"key" : state.CD, "value" : state.CD_NM});
							}
						});
						//팀장급 이상
					} else {
						options += "<option value='all'>전체</option>";
						$.each(jr, function(key, state) {
							
							options += "<option value='" + state.CD + "' >" + state.CD_NM + "</option>";
							//gTeamArr.push({"key" : state.CD, "value" : state.CD_NM});
						});
					}
				}
				$("#optTeam").append(options).bind("change", optTeam_changeEvent);
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}
}

// 조회 조건 중 센터 등록
function regCenter() {
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : getContextPath() + "/ajax/user/cntrList.do",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "c20wMDIuc2VsZWN0Q250ckNk", {"key" : "value"}),
		success : function(data)
		{
			var options = "";
		
			// ~센터장급
			if(gUsrGrdCd < 60000)
			{
				for(var i in data)
				{
					if(data[i].CD == window.sessionStorage.getItem("CNTR_CD"))
					{
						options += "<option value='" + data[i].CD + "' >" + data[i].CD_NM + "</option>";
						gCenterArr.push({"key" : data[i].CD, "value" : data[i].CD_NM});
						break;
					}
				}
			//센터장급 이상
			}
			else
			{
				options += "<option value='all'>전체</option>";
			
				for(var i in data)
				{
					options += "<option value='" + data[i].CD + "' >" + data[i].CD_NM + "</option>";
					gCenterArr.push({"key" : data[i].CD, "value" : data[i].CD_NM});
				}
			}
			
			$("#optCenter").html(options).trigger("change").trigger("load");
			optCenter_changeEvent();
		},
		error : function(data, status, err)
		{
			networkErrorHandler(data, status, err);
		}
	});	
}

// 엑셀 다운 버튼 클릭 이벤트
function btnExelDown_clickEvent() 
{
	
	var termType = $("#optTerm").val();
	
	var url = "";
	var param = "";
	
	if(termType == "month")
		param = getJsonStrYearListExcel($("#optYear").val());
	else if( termType == "day" )
	{
		var lastDay = ( new Date( $("#optDayYear").val(), $("#optDayMonth").val(), 0) ).getDate();
		var selectMonth = $("#optDayMonth").val();
		if(selectMonth < 10)
			selectMonth = "0" + selectMonth; 
		
		var yearMonth = $("#optDayYear").val() + selectMonth;
		
		param = getJsonStrMonthListExcel( yearMonth, lastDay );
	}
	else if( termType == "time" )
	{
		//var time = $("#tfTime").val().replace(/-/g, "");
		var timeStart = $("#tfTimeStart").val().replace(/-/g, "");
		var timeEnd = $("#tfTimeEnd").val().replace(/-/g, "");
		
		param = getJsonStrDayListExcel(timeStart, timeEnd);
	}
	else if( termType == "term" )
	{
		var start = $("#tfTermStart").val().replace(/-/g,"");
		var end = $("#tfTermEnd").val().replace(/-/g,"");
		
		param = getJsonStrTermListExcel(start, end);
	}
	url = getContextPath() + "/excel/statistics/workProcessExcel.do";
	
	excelDownLoad(url, param);
}

$(document).ready(function()
{
	
	
	init();
	//센터 셀렉트박스 체인지 이벤트 등록'
	$("#optCenter").bind("change", optCenter_changeEvent);
	// 기간 셀렉트박스 체인지 이벤트 등록
	$("#optTerm").bind("change", changeTerm);
	// 초기화 버튼 클릭 이벤트 등록
	$("#btnInit").bind("click", init);
	// 조회 버튼 클릭 이벤트 등록
	$("#btnSearch").bind("click", function() 
	{
		drawGrid("search");
	});
	// 엑셀 다운로드 버튼 클릭 이벤트 등록
	$("#btnExelDown").bind("click", btnExelDown_clickEvent);
});