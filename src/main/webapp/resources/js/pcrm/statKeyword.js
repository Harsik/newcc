var chartData = [];

$(document).ready(function(){
	getLayout();
	creatSelctBox();
	selCounselType();
	
    $("#optTerm").bind("change", changeTerm);
	
	fnbtnInit();
	
	//조회버튼 클릭 이벤트
    $("#btnStsKeywordSearch").bind("click", fnbtnSearch);
    
    //초기화버튼 클릭 이벤트
    $("#btnStsKeywordInit").bind("click", fnbtnInit);
    
    //엑셀다운버튼 클릭 이벤트
    $("#btnStsKeywordExelDown").bind("click", fnbtnExcelDown);
    
    $("#optTerm").bind("change", changeTerm);
    
    rMateChartH5.create("chart1", "chartHolder", "", "100%", "100%");
    
    //자동 그래프 실행시 주석 해제
    //setTimeout(testSetTime, 5000);
});

// 초단위로 데이터 가져와서 움직이게 하는 함수
function testSetTime(){
	
	// 테스트 데이터
//	document.getElementById("chart1").setData(test());
	// 서버 데이터
	document.getElementById("chart1").setData(fnbtnSearch());
	setTimeout(testSetTime, 1000);
}

function test(){
	chartData = [];
	data = [
	    {
	        "CNT": 400,
	        "CTG_CD": "012000000",
	        "CD_NM": "신청사건립추진단",
	        "RATE": 21
	    },
	    {
	        "CNT": 276,
	        "CTG_CD": "004000000",
	        "CD_NM": "기획예산실",
	        "RATE": 14
	    },
	    {
	        "CNT": 276,
	        "CTG_CD": "006000000",
	        "CD_NM": "홍보실",
	        "RATE": 14
	    },
	    {
	        "CNT": 1,
	        "CTG_CD": "",
	        "CD_NM": "기타",
	        "RATE": 0
	    }
	];
	
	for(var i = 0; i < data.length ; i++){
		chartData.push({
            CD_NM : data[i].CD_NM,
            CTG_CD: data[i].CTG_CD,
            CNT : data[i].CNT,
            RATE : Math.floor(Math.random(10) * 100)
      });
	}
	
	return chartData;
}

//날짜 셋팅
function fnDateSet(){
    $("#schMonthStart").MonthPicker({
        MaxMonth: 0
    });
    
    $("#schMonthEnd").MonthPicker({
        MaxMonth: 0
    });
    
    $('#schMonthStart').val( getDate().substr(0, 7) );
    $('#schMonthEnd').val( getDate().substr(0, 7) );
    
    
    //주별 set start
    $("#statKeywordWeekDay").val( getDate() );
    datePicker("#statKeywordWeekDay");
    //주별 set end
    
    //년도별 select box set start
    var selectBox = "";
    var d = new Date();
    var currentYear = d.getFullYear();
    for(var i = currentYear; i >= currentYear-10; i--)
    {
        selectBox +=  "<option value = '" + i + "'>" + i + "년"+"</option>";
    }
    $("#statKeywordYearStart").html(selectBox);
    $("#statKeywordYearEnd").html(selectBox);
    
    //년도별 select box set end
    
    $('#schDayStart').val( getDate() );
    $('#schDayEnd').val( getDate() );
    
    datePicker("#schDayStart");
    datePicker("#schDayEnd");
    
    changeTerm();
}

function fnbtnExcelDown(){
	excelDownLoad(getContextPath() + "/excel/pcrm/keywordListExcel.do", getJsonStrKeywordList());
}

function fnbtnInit(){
	// 검색조건 초기화
	$("#selCtgAddr").val("all");
	$("#checkZero").prop("checked",false);
	$("#selSrchIntvLgCd").val("all").trigger("change");
	$("#selCtgRank").val("20");
	
	// 날짜 초기화
	$("#optTerm").val("month");
	fnDateSet();
	
    // 재검색
	fnbtnSearch();
}

function fnCreateTable(data,totCnt){
	var str1 = "";
	var str2 = "";
	
	str1 += '<tr>';
	str1 += '<th nowrap="">행정동</th>';
	str1 += '<th nowrap="">합계</th>';
	str1 += '</tr>';
	str1 += '<tr>';
	str1 += '<td nowrap="">'+$("#selCtgAddr option:checked").text()+'</td>';	
	str1 += '<td nowrap="">'+numberFormat(totCnt)+'건</td>';
	str1 += '</tr>';
	
	str2 += '<tr>';
	for(var i=0; i<data.length; i++){
		str2 += '<th nowrap="">'+data[i].CD_NM+'</th>';
	}
	str2 += '</tr>';
	str2 += '<tr>';
	for(var i=0; i<data.length; i++){
		str2 += '<td nowrap="">'+numberFormat(data[i].CNT)+'건</td>';
	}
	str2 += '</tr>';
	
	$("#table1,#table2").empty();
	$("#table1").append(str1);
	$("#table2").append(str2);
}

function fnbtnSearch(){
	var TOT_CNT = 0;
	$("#table2").empty();
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/getCustInfo.do",
		data : "pJson=" + getJsonStrKeywordList(),
		success : function(data){
			if(data.length > 0){
				$.each(data , function(i){
					TOT_CNT += data[i].CNT;
				});
				
				console.log("TOT_CNT > " + TOT_CNT);
				
				$.each(data , function(i){
					data[i].RATE = Math.round(data[i].CNT / TOT_CNT * 100);
				});
			}else{
				alert("데이터가 없습니다. 다른 조건으로 검색해주세요.");
			}
			
			chartData = data;
			rMateChartH5.calls("chart1", {
				   "setLayout" : layoutStr,
				   "setData" : chartData
			});
			
			fnCreateTable(chartData,TOT_CNT);
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

function getJsonStrKeywordList(){
	
	var termType = $("#optTerm").val();
    
	//vaild 체크 start
	var stDt  = "";
	var endDt = "";
	var tmp1  = "";
	var tmp2  = "";
	    
	if(termType == "year"){
		stDt  = $('#statKeywordYearStart option:selected').val();
	    endDt  = $('#statKeywordYearEnd option:selected').val();
	}
	else if(termType == "month"){
		tmp1  = $('#schMonthStart');
	    tmp2  = $('#schMonthEnd');
	    stDt  = tmp1.val().replace(/[-, :, \s]/g, "");
	    endDt = tmp2.val().replace(/[-, :, \s]/g, "");
	}
	else if(termType == "day"){
		tmp1  = $('#schDayStart');
		tmp2  = $('#schDayEnd');
	    stDt  = $('#schDayStart').val().replace(/[-, :, \s]/g, "");
	    endDt = $('#schDayEnd').val().replace(/[-, :, \s]/g, "");
	}
	else if(termType == "week"){
		stDt  = $('#statKeywordWeekDay').val().replace(/[-, :, \s]/g, "");
	    if( !(stDt != "" && stDt != null) ){
	    	alert("조회일을 입력하세요.");
	        $('#statKeywordWeekDay').focus();
	        return;
	    }
	}
	    
	if( !(stDt != "" && stDt != null) ){
		alert("조회 시작일(월)을 입력하세요.");
	    tmp1.focus();
	    return;
	}
	    
	if(!(endDt != "" && endDt != null) && termType != "week"){
	    alert("조회 종료일(월)을 입력하세요.");
	    tmp2.focus();
	    return;
	}

	if(stDt > endDt && termType != "week"){
	    alert("시작일(월)을 확인하세요.");
	    tmp1.focus();
	    return;
	}

	var schStartDt = "";
	var schEndDt = "";

	//조회기간 set
	if(termType == "year"){
	    schStartDt = $('#statKeywordYearStart option:selected').val().replace(/[-, :, \s]/g, "");
	    schEndDt   = $('#statKeywordYearEnd option:selected').val().replace(/[-, :, \s]/g, "");
	}
	else if(termType == "month") {
	    schStartDt = $('#schMonthStart').val().replace(/[-, :, \s]/g,"");
	    schEndDt   = $('#schMonthEnd').val().replace(/[-, :, \s]/g,"");
	}
	else if(termType == "week") {
	    schStartDt = commWeekStartDay($('#statKeywordWeekDay').val().replace(/[-, :, \s]/g, ""));
	    schEndDt   = commWeekEndDay($('#statKeywordWeekDay').val().replace(/[-, :, \s]/g, ""));
	}
	else if(termType == "day") {
	    schStartDt = $("#schDayStart").val().replace(/[-, :, \s]/g,"");
	    schEndDt   = $("#schDayEnd").val().replace(/[-, :, \s]/g,"");
	}
	
	var ctgCd =  "";
	var checkCtgCd =  "";
	var checkCtgCdNum =  "";
	
	if($("#selSrchIntvLgCd").val() == "all") {	// 상담유형 체크 X
		ctgCd = "ctg_lg_cd";
		checkCtgCdNum = "00000000";
	} else if ($("#selSrchIntvLgCd").val() != "all" && $("#selSrchIntvMdCd").val() == "all"){	// 대분류 체크
		ctgCd = "ctg_md_cd";
		checkCtgCd = "ctg_lg_cd";
		checkCtgCdNum = $("#selSrchIntvLgCd").val();
	} else if ($("#selSrchIntvLgCd").val() != "all" && $("#selSrchIntvMdCd").val() != "all"){	// 중분류 체크
		ctgCd = "ctg_sm_cd";
		checkCtgCd = "ctg_md_cd";
		checkCtgCdNum = $("#selSrchIntvMdCd").val();
	}
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "cGNybS5zZWxlY3RLZXl3b3Jk",
		"map" : {
			"key" : "value",
			"termType" : termType,
			"schStartDt" : schStartDt,
			"schEndDt" : schEndDt,
			"ctgCd" : ctgCd,
			"checkCtgCd" 	: checkCtgCd,
			"checkCtgCdNum" : checkCtgCdNum,
			"checkZero" : $("#checkZero").is(":checked"), 
			"hAddr" : $("#selCtgAddr").val(),
			"rankCnt" : $("#selCtgRank").val(),
			
			//excel
			"title" : "키워드별지표"+ setDownLoadName(schStartDt, schEndDt),
			"colWidth" : [30, 25],
			"colName" : ["CD_NM", "CNT"],
			"colHeader" : ["유형명", "건수"],
		}
	};
		
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

function creatSelctBox(){
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/getCustInfo.do",
		data : "pJson=" + getJsonStrCtgCdSetSelectBox(),
		success : function(data){
			var str = "";
			$.each(data , function(i){
				str += '<option value="'+data[i].CD+'">'+data[i].CD_NM+'</option>';
			});
			$("#selCtgAddr").append(str);
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

function getJsonStrCtgCdSetSelectBox(){
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "cGNybS5zZWxlY3RBZGRyQ2Q=",
			"map" : {
				"key" : "value",
			}
		};
			
		console.log(JSON.stringify(loParam));
		return  encodeURIComponent(JSON.stringify(loParam));
}

function selCounselType(){
	g_popup="GCHILD";
	setObjectSelectBoxWithCode2("selSrchIntvLgCd", "전체", "1", g_popup, "00000000", "all", "CHANGE");

	$("#selSrchIntvLgCd").bind("change", function()
	{
	    setObjectSelectBoxWithCode2("selSrchIntvMdCd", "전체", "2", g_popup, $("#selSrchIntvLgCd").val(), "", "CHANGE");
	});
	 
	$("#selSrchIntvLgCd").trigger("change");
}

function changeTerm() {
	var termType = $("#optTerm").val();
	
	if(termType == "year") {
		$("#dvYear").show();
		$("#dvMonth").hide();
		$("#dvWeek").hide();
		$("#dvDay").hide();
	}
	else if(termType == "month") {	
		$("#dvYear").hide();
		$("#dvMonth").show();
		$("#dvWeek").hide();
		$("#dvDay").hide();
	}
	else if(termType == "week") {	
		$("#dvYear").hide();
		$("#dvMonth").hide();
		$("#dvWeek").show();
		$("#dvDay").hide();
	}
	else if(termType == "day") {	
		$("#dvYear").hide();
		$("#dvMonth").hide();
		$("#dvWeek").hide();
		$("#dvDay").show();
	}
}

function getLayout(){
	layoutStr =  '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
        +'<Options>'
        +'</Options>'
        +'<Column3DChart itemClickJsFunction="chartClickHanlder" showDataTips="true" columnWidthRatio="0.4">'
            +'<horizontalAxis>'
                  +'<CategoryAxis categoryField="CD_NM"/>'
               +'</horizontalAxis>'
             +'<verticalAxis>'
                +'<LinearAxis maximum="100" interval="10"/>'
             +'</verticalAxis>'
               +'<series>'
                  +'<Column3DSeries labelPosition="outside" yField="RATE" outsideLabelYOffset="-14" outsideLabelXOffset="7">'
                     +'<showDataEffect>'
                          +'<SeriesInterpolate duration="1200" elementOffset="60"/>'
                      +'</showDataEffect>'
                 +'</Column3DSeries>'
             +'</series>'
         +'</Column3DChart>'
      +'</rMateChart>';
}