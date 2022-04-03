// 전역 변수
var gTermType = "";
var gUsrGrdCd = getUserGrdCode();

var gCenterArr = [];
var gTeamArr = [];
var gCounselArr = [];

var gCenterNm = "";
var gTeamNm = "";
var gCounselNm = "";

// 엑셀 정보
var gColWidth = [];
var gColName = [];
var gColHeader = [];
var gColAlign = [];

// 그리드 설정 정보
var gColNames = [];
var gColModel = [];
var gGroupHeaders = [];

//파라미터 셋팅_getJsonStrCheckedList
function getJsonStrCheckedList(term, startDate, endDate)
{
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "c3QwMDAuY2hlY2tlZExpc3RzZWw=",//st011.checkedList
			"map" : {
				"key" : "value",
				"term" : term,
				"startDate" : startDate,
				"endDate" : endDate,
				"centerNm" : gCenterNm,
				"teamNm" : gTeamNm,
				"counselNm" : gCounselNm,
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonStrCheckedListExcel
function getJsonStrCheckedListExcel(term, startDate, endDate)
{
	
	var titleCenter=($("#optCenter").val()=="all")?"전체":"순천시3114온누리콜센터";
	var titleteam=($("#optTeam").length==0)?" ":($("#optTeam").val()=="all")?" 전체":($("#optTeam").val()=="0004")?" 관리팀":($("#optTeam").val()=="0003")?" 중국어상담팀 ":($("#optTeam").val()=="0002")?" 일본어상담팀 ":"영어상담팀";
	var titleYear=($("#optYear").val()==null)?($("#optDayYear").val()==null)?($("#tfTimeStart").val()==null)?"":$("#tfTimeStart").val():$("#optDayYear").val():$("#optYear").val()+" 년 ";
	var titleTearm=($("#optTerm").val()=="month")?"월별":($("#optTerm").val()=="day")?"일별":($("#optTerm").val()=="time")?" 시간별":" 기간별";
	    //title" : "처리유형통계 ( "+titleCenter+titleteam+" 상담사의 "+titleYear+titleTearm+" )",
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "c3QwMDAuY2hlY2tlZExpc3RzZWw=",//st011.checkedList
			"map" : {
				"key" : "value",
				"term" : term,
				"startDate" : startDate,
				"endDate" : endDate,
				"centerNm" : gCenterNm,
				"teamNm" : gTeamNm,
				"counselNm" : gCounselNm,
				"sidx" : $("#tblWork").getGridParam("sortname"),
				"sord" : $("#tblWork").getGridParam("sortorder"),
				"title" : "처리유형통계("+titleCenter+titleteam+"_상담사의_"+titleYear+titleTearm+")",
				"colWidth" : gColWidth,
				"colName" : gColName,
				"colHeader" : gColHeader,
				"colAlign" : gColAlign
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonStrUnCheckedList
function getJsonStrUnCheckedList(term, termType, startDate, endDate)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c3QwMDAudW5DaGVja2VkTGlzdHNlbA==",//st011.unCheckedList
		"map" : {
			"key" : "value",
			"term" : term,
			"termType" : termType,
			"startDate" : startDate,
			"endDate" : endDate,
			"centerNm" : gCenterNm,
			"teamNm" : gTeamNm,
			"counselNm" : gCounselNm,
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonStrUnCheckedListExcel
function getJsonStrUnCheckedListExcel(term, termType, startDate, endDate)
{
	var titleCenter=($("#optCenter").val()=="all")?"전체":"순천시3114온누리콜센터";
	var titleteam=($("#optTeam").length==0)?" ":($("#optTeam").val()=="all")?" 전체":($("#optTeam").val()=="0004")?" 관리팀":($("#optTeam").val()=="0003")?" 중국어상담팀 ":($("#optTeam").val()=="0002")?" 일본어상담팀 ":"영어상담팀";
	var titleYear=($("#optYear").val()==null)?($("#optDayYear").val()==null)?($("#tfTimeStart").val()==null)?"":$("#tfTimeStart").val():$("#optDayYear").val():$("#optYear").val()+" 년 ";
	var titleTearm=($("#optTerm").val()=="month")?"월별":($("#optTerm").val()=="day")?"일별":($("#optTerm").val()=="time")?" 시간별":" 기간별";
    //title" : "처리유형통계 ( "+titleCenter+titleteam+" 상담사의 "+titleYear+titleTearm+" )",
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "c3QwMDAudW5DaGVja2VkTGlzdHNlbA==",//st011.unCheckedList
			"map" : {
				"key" : "value",
				"term" : term,
				"termType" : termType,
				"startDate" : startDate,
				"endDate" : endDate,
				"centerNm" : gCenterNm,
				"teamNm" : gTeamNm,
				"counselNm" : gCounselNm,
				"sidx" : $("#tblWork").getGridParam("sortname"),
				"sord" : $("#tblWork").getGridParam("sortorder"),
				"title" : "처리유형통계("+titleCenter+titleteam+"_상담사의_"+titleYear+titleTearm+")",
				"colWidth" : gColWidth,
				"colName" : gColName,
				"colHeader" : gColHeader,
				"colAlign" : gColAlign
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonStrUnCheckedList
function getJsonStrUnCheckedTimeList(termS, termE)
{
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "c3QwMDAudW5DaGVja2VkTGlzdHNkeg==",//st000.unCheckedListsdz
			"map" : {
				"key" : "value",
				"startDate" : termS,
				"endDate" : termE,
				"centerNm" : gCenterNm,
				"teamNm" : gTeamNm,
				"counselNm" : gCounselNm,
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonStrUnCheckedListExcel
function getJsonStrUnCheckedTimeListExcel(termS, termE)
{
	var titleCenter=($("#optCenter").val()=="all")?"전체":"순천시3114온누리콜센터";
	var titleteam=($("#optTeam").length==0)?" ":($("#optTeam").val()=="all")?" 전체":($("#optTeam").val()=="0004")?" 관리팀":($("#optTeam").val()=="0003")?" 중국어상담팀 ":($("#optTeam").val()=="0002")?" 일본어상담팀 ":"영어상담팀";
	var titleYear=($("#optYear").val()==null)?($("#optDayYear").val()==null)?($("#tfTimeStart").val()==null)?"":$("#tfTimeStart").val():$("#optDayYear").val():$("#optYear").val()+" 년 ";
	var titleTearm=($("#optTerm").val()=="month")?"월별":($("#optTerm").val()=="day")?"일별":($("#optTerm").val()=="time")?" 시간별":" 기간별";
    //title" : "처리유형통계 ( "+titleCenter+titleteam+" 상담사의 "+titleYear+titleTearm+" )",

	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "c3QwMDAudW5DaGVja2VkTGlzdHNkeg==",//st000.unCheckedListsdz
			"map" : {
				"key" : "value",
				"startDate" : termS,
				"endDate" : termE,
				"centerNm" : gCenterNm,
				"teamNm" : gTeamNm,
				"counselNm" : gCounselNm,
				"sidx" : $("#tblWork").getGridParam("sortname"),
				"sord" : $("#tblWork").getGridParam("sortorder"),
				"title" : "처리유형통계("+titleCenter+titleteam+"_상담사의_"+titleYear+titleTearm+")",
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

// 초기화 함수
function init()
{
	$("#chkCounselor").prop("checked", false);
	$("#optTerm").val("month");

	// 조회 조건 셀렉트 박스 등록
	regCenter();
	
	// 기간 셀렉트박스 체인지 이벤트 등록
	changeTerm();
	
	// 그리드 그리는 함수
	drawGrid();
}

function init2()
{
	$("#chkCounselor").prop("checked", false);
	$("#optTerm").val("month");

	// 조회 조건 셀렉트 박스 등록
	regCenter();
	
	// 기간 셀렉트박스 체인지 이벤트 등록
	changeTerm();
	
	// 그리드 그리는 함수
	drawGrid2();
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
		
/*		var tfTime =  "<input type = 'text' id = 'tfTime' style = 'width : 95px; margin-left : 5px;' readOnly/>";
		$("#termDetail").empty();
		$("#termDetail").append(tfTime);
		
		$("#tfTime").val(getPrvDay("D", 1, "-"));
		//$("#tfTime").val(weeked);
		
		datePicker("#tfTime");*/
		
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
	   	height : "526",
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
	}).jqGrid('setGroupHeaders', 
	{
	  useColSpanStyle : true, 
	  groupHeaders : groupHeadersValue
	}).jqGrid('setFrozenColumns');
}

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

//그리드 그리는 함수
function drawGrid(type)
{
	termType = $("#optTerm").val();
	
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
		
		gCenterNm = cdConvert(optCenterCd, gCenterArr);
		gTeamNm = cdConvert(optTeamCd, gTeamArr);
		gCounselNm = cdConvert(optCounselCd, gCounselArr);
		
//	}
	
	var pJsonTerm = "";
	var pJsonTermType = "";
	
	if(Boolean($("#chkCounselor").prop("checked")))
		gridAndExcleSetting();
	else
		gridAndExcleSetting(termType);
	
	if(termType == "month")
	{
		pJsonTerm = $("#optYear").val();
		pJsonTermType = "YYYY-MM";
		
		if(Boolean($("#chkCounselor").prop("checked")))
			grid(getJsonStrCheckedList(pJsonTerm), gColNames, gColModel, gGroupHeaders);
		else
			grid(getJsonStrUnCheckedList(pJsonTerm, pJsonTermType), gColNames, gColModel, gGroupHeaders);
		
	}
	else if(termType == "day")
	{
		var year = $("#optDayYear").val();
		var month = $("#optDayMonth").val();
		if(month < 10)
			month = "0" + month;
		pJsonTerm = year + month;
		pJsonTermType = "YYYY-MM-DD";
		
		if(Boolean($("#chkCounselor").prop("checked")))
			grid(getJsonStrCheckedList(pJsonTerm), gColNames, gColModel, gGroupHeaders);
		else
			grid(getJsonStrUnCheckedList(pJsonTerm, pJsonTermType), gColNames, gColModel, gGroupHeaders);
	}
	else if(termType == "time")
	{
		var startDate = $("#tfTimeStart").val().replace(/-/g, "");
		var endDate = $("#tfTimeEnd").val().replace(/-/g, "");
		//pJsonTerm = $("#tfTime").val().replace(/-/g, "");
		
		if(Boolean($("#chkCounselor").prop("checked")))
			grid(getJsonStrCheckedList("", startDate, endDate), gColNames, gColModel, gGroupHeaders);
			//grid(getJsonStrCheckedList(pJsonTerm), gColNames, gColModel, gGroupHeaders);
		else
			grid(getJsonStrUnCheckedTimeList(startDate, endDate), gColNames, gColModel, gGroupHeaders);
			//grid(getJsonStrUnCheckedTimeList(pJsonTerm), gColNames, gColModel, gGroupHeaders);
		
	}
	else if(termType == "term")
	{
		var startDate = $("#tfTermStart").val().replace(/-/g, "");
		var endDate = $("#tfTermEnd").val().replace(/-/g, "");
		pJsonTermType = "yyyy-mm-dd";
		
		if(Boolean($("#chkCounselor").prop("checked")))
			grid(getJsonStrCheckedList("", startDate, endDate), gColNames, gColModel, gGroupHeaders);
		else
			grid(getJsonStrUnCheckedList("", pJsonTermType, startDate, endDate), gColNames, gColModel, gGroupHeaders);
		
	}
	
}

function drawGrid2(type)
{
	
	termType = $("#optTerm").val();
	
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
		
		gCenterNm = cdConvert(optCenterCd, gCenterArr);
		gTeamNm = cdConvert(optTeamCd, gTeamArr);
		gCounselNm = cdConvert(optCounselCd, gCounselArr);
		
//	}
	
	var pJsonTerm = "";
	var pJsonTermType = "";
	
	if(Boolean($("#chkCounselor").prop("checked")))
		gridAndExcleSetting();
	else
		gridAndExcleSetting(termType);
	
	if(termType == "month")
	{
		
		pJsonTermType = "YYYY-MM";
		if(Boolean($("#chkCounselor").prop("checked")))
			grid(getJsonStrCheckedList(pJsonTerm), gColNames, gColModel, gGroupHeaders);
		else
			grid(getJsonStrUnCheckedList(pJsonTerm, pJsonTermType), gColNames, gColModel, gGroupHeaders);
		
	}
	
}


// 그리드 및 엑셀 정보 셋팅
function gridAndExcleSetting(termType) 
{
	gColNames = [];
	gColModel = [];
	gGroupHeaders = [];
	
	gColWidth = [];
	gColName = [];
	gColHeader = [];
	gColAlign = [];

	if(termType != null)
	{
		gColWidth.push(25);
		gColAlign.push("center");
		if(termType == "month")
		{
			gColHeader.push("기준월");
			gColNames.push("기준월");
		}
		else if(termType == "day")
		{
			gColHeader.push("기준일자");
			gColNames.push("기준일자");
		}
		else if(termType == "time")
		{
			gColHeader.push("기준시간");
			gColNames.push("기준시간");
		}
		else if(termType == "term")
		{
			gColHeader.push("기준일자");
			gColNames.push("기준일자");
		}
		gColName.push("WRK_DT");
		gColModel.push({"name" : "WRK_DT", align : "center", width : 60, frozen : true, sortable : false});
	}
 
	gColWidth.push(40, 20);
	gColAlign.push("center", "center");
	gColHeader.push("소속", "성명");
	gColName.push("TEAM_NM", "USR_NM");
	gColNames.push("소속", "성명");
	gColModel.push({"name" : "TEAM_NM", width : 200, align : "center", frozen : true, sortable : false}, {"name" : "USR_NM", width : 80, align : "center", frozen : true, sortable : false});
	
	gColWidth.push(20, 20, 20, 20, 20);
	gColAlign.push("center", "center", "center", "center");
	gColHeader.push("일반", "상담 후 호전환", "자동저장", "호전환");
	gColName.push("GNRL_ACT", "APNT_ACT", "VOC_REG", "CALLBCK_REG");
	gColNames.push("일반", "상담 후<br>호전환", "자동저장", "호전환");
	gColModel.push({"name" : "GNRL_ACT", width : 60, align : "center", sortable : false}, 
			{"name" : "APNT_ACT", width : 60, align : "center", sortable : false},
			{"name" : "VOC_REG", width : 60, align : "center", sortable : false}, 
			{"name" : "CALLBCK_REG", width : 60, align : "center", sortable : false});
	gGroupHeaders.push({startColumnName: "GNRL_ACT", numberOfColumns : 4, titleText : "처리유형"});
	
	gColWidth.push(20, 20, 20, 20, 20, 20, 20, 20, 20);
	gColAlign.push("center", "center", "center", "center", "center", "center", "center", "center", "center");
	gColHeader.push("접수건수", "IN", "OUT", "비율", "완료건수", "미완료건수", "처리완료율", "총후처리시간", "총상담시간");
	gColName.push("TRT_SCNT", "INBOUND", "OUTBOUND", "TRT_SCNT_RATE", "ACT_SCNT", "IMPF_SCNT", "ACT_RATE", "TOTA_ACW_TM", "TOTA_CALL_TM");
	gColNames.push("접수건수", "IN", "OUT", "비율", "완료건수", "미완료<br>건수", "처리<br>완료율", "총<br>후처리시간", "총<br>상담시간");
	gColModel.push({"name" : "TRT_SCNT", width : 60, align : "center", sortable : false}
	    , {"name" : "INBOUND", width : 60, align : "center", sortable : false}
		, {"name" : "OUTBOUND", width : 60, align : "center", sortable : false}
		, {"name" : "TRT_SCNT_RATE", width : 60, align : "right", sortable : false}
		, {"name" : "ACT_SCNT", width : 60, align : "center", sortable : false}
		, {"name" : "IMPF_SCNT", width : 60, align : "center", sortable : false}
		, {"name" : "ACT_RATE", width : 60, align : "right", sortable : false}
		, {"name" : "TOTA_ACW_TM", width : 60, align : "center", sortable : false}
		, {"name" : "TOTA_CALL_TM", width : 60, align : "center", sortable : false});
	
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
		var tag = "<select id = 'optTeam' style='width : 100px;'></select>" +
				"<span id = 'txtTeam'></span>";
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
							gTeamArr.push({"key" : state.CD, "value" : state.CD_NM});
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

// 상담사별 체크박스 체인지 이벤트 등록
function chkCounselor_changeEvent()
{
	drawGrid("search");
}

// 엑셀 다운 버튼 클릭 이벤트
function btnExelDown_clickEvent() 
{
	var termType = $("#optTerm").val();
	
	var url = "";
	var param = "";
	
	if(termType == "month")
	{
		var pJsonTerm = $("#optYear").val();
		var pJsonTermType = "YYYY-MM";
		if(Boolean($("#chkCounselor").prop("checked")))
			param = getJsonStrCheckedListExcel(pJsonTerm);
		else
			param = getJsonStrUnCheckedListExcel(pJsonTerm, pJsonTermType);
	}
	else if( termType == "day" )
	{
		var selectMonth = $("#optDayMonth").val();
		if(selectMonth < 10)
		{
			selectMonth = "0" + selectMonth; 
		}
		var pJsonTerm = $("#optDayYear").val() + selectMonth;
		var pJsonTermType = "YYYY-MM-DD";
		
		if(Boolean($("#chkCounselor").prop("checked")))
			param = getJsonStrCheckedListExcel(pJsonTerm);
		else
			param = getJsonStrUnCheckedListExcel(pJsonTerm, pJsonTermType);
	}
	else if( termType == "time" )
	{
		var startDate = $("#tfTimeStart").val().replace(/-/g, "");
		var endDate = $("#tfTimeEnd").val().replace(/-/g, "");
		//var pJsonTerm = $("#tfTime").val().replace(/-/g, "");
		
		if(Boolean($("#chkCounselor").prop("checked")))
			param = getJsonStrCheckedListExcel("", startDate, endDate);
			//param = getJsonStrCheckedListExcel(pJsonTerm);
		else
			param = getJsonStrUnCheckedTimeListExcel(startDate, endDate);
			//param = getJsonStrUnCheckedTimeListExcel(pJsonTerm);
	}
	else if( termType == "term" )
	{
		var startDate = $("#tfTermStart").val().replace(/-/g, "");
		var endDate = $("#tfTermEnd").val().replace(/-/g, "");
		var pJsonTermType = "yyyy-mm-dd";
		
		if(Boolean($("#chkCounselor").prop("checked")))
			param = getJsonStrCheckedListExcel("", startDate, endDate);
		else
			param = getJsonStrUnCheckedListExcel("", pJsonTermType, startDate, endDate);
	}
	
	url = getContextPath() + "/excel/statistics/excel.do";
	
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
	
	// 상담사별 체크박스 체인지 이벤트 등록
	$("#chkCounselor").bind("change", chkCounselor_changeEvent);
	
	// 엑셀 다운로드 버튼 클릭 이벤트 등록
	$("#btnExelDown").bind("click", btnExelDown_clickEvent);
	
});