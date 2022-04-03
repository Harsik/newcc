

// 그리드 설정 정보
var gColNames = [];
var gColModel = [];
var gGroupHeaders = [];

//엑셀 정보
var gColName = [];
var gColWidth = [];
var gColAlign = [];
var gGroupHeader = [];
var gColHeader = [];


// 관리자 여부
var usr_grd_cd = window.sessionStorage.getItem("USR_GRD_CD");


//파라미터 셋팅_getJsonStsCounselingCntHoliday
function getJsonStsCounselingCntHoliday() {
		
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y2gwMDEuc3RzQ291bnNlbGluZ0NudEhvbGlkYXk=",//ch001.stsCounselingCntHoliday
			"map" : {
				"key" : "value" ,
				"schStartDt" : $("#cslCntHld_schDayStart").val().replace(/-/g, ""),
				"schEndDt" : $("#cslCntHld_schDayEnd").val().replace(/-/g, "")				
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}


//파라미터 셋팅_getJsonStsCounselingCntHolidayExcel
function getJsonStsCounselingCntHolidayExcel() {
	
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y2gwMDEuc3RzQ291bnNlbGluZ0NudEhvbGlkYXk=", //ch001.stsCounselingCntHoliday
			"map" : {
				"key" : "value" ,				
				"schStartDt" : $("#cslCntHld_schDayStart").val().replace(/-/g, ""),
				"schEndDt" : $("#cslCntHld_schDayEnd").val().replace(/-/g, ""),
				"title" : "공휴일_상담현황" + setDownLoadName($("#cslCntHld_schDayStart").val(), $("#cslCntHld_schDayEnd").val()),
				"colWidth" :gColWidth,
				"colName" : gColName,				
				"colAlign" :gColAlign,				
		        "colHeader1" : gGroupHeader,
			    "colHeader3" : gColHeader
				
			}
	};
	
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
	
}

// 초기화 함수
function init(){
	
	$("#cslCntHld_schDayStart").val(getDate());
	$("#cslCntHld_schDayEnd").val(getDate());

	// 그리드
	stsTypeSearch();
}



// 엑셀다운 버튼 클릭 이벤트
function stsTypeExelDown() {
	setGrid();
	param = getJsonStsCounselingCntHolidayExcel();
	url = getContextPath() + "/excel/mprows/mpRowsExcelDown.do";	
	excelDownLoad(url, param);
    
}


function setGrid(){

	// 그리드 설정 정보
	gColNames = [];
	gColModel = [];
	gGroupHeaders = [];

	//엑셀 정보	
	gColName = [];
	gColWidth = [];
	gColAlign = [];
	gGroupHeader = [];
	gColHeader = [];
	
	var positionS=0;
	
	gColNames.push("구분");
	gColModel.push(
				{"name" : "GB_NM", width : 200, align : "center", frozen : true, sortable : false}
	);
		
	gColName.push( "GB_NM");
	gColWidth.push(20);
	gColAlign.push("center");
	
	positionS = positionS + 1;
	gColHeader.push("구분, C, 0, 2");
	
	gColNames.push("IN", "OUT", "계");
	gColModel.push(
			{"name" : "IN_09", width : 70, align : "right", formatter: 'integer',  sortable : false, frozen : true}, 
			{"name" : "OUT_09", width : 70, align : "right", formatter: 'integer', sortable : false, frozen : true},			
			{"name" : "CNT_09", width : 70, align : "right", formatter: 'integer', sortable : false, frozen : true}
	);
	//gGroupHeaders.push({startColumnName: "IN_09", numberOfColumns : 3, titleText : "9시 이전"});
	gGroupHeaders.push({startColumnName: "IN_09", numberOfColumns : 3, titleText : "07시 ~ 09시"}); // 18.03.22 센타장 요청 명칭만 변경
	
	gColName.push( "IN_09", "OUT_09", "CNT_09");
	gColWidth.push(7, 7, 7);
	gColAlign.push("right", "right", "right");

	
	/*gGroupHeader.push("9시이전, R," + positionS +", 3");*/	
	gGroupHeader.push("07시 ~ 09시, R," + positionS +", 3");	// 18.03.22 센타장 요청 명칭만 변경
	gColHeader.push("IN, C, 1, 1","OUT, C, 1, 1","계, C, 1, 1");	
	positionS = positionS + 3;	
	
	gColNames.push("IN", "OUT", "계");
	gColModel.push(
			{"name" : "IN_17", width : 70, align : "right", formatter: 'integer',  sortable : false, frozen : true}, 
			{"name" : "OUT_17", width : 70, align : "right", formatter: 'integer', sortable : false, frozen : true},			
			{"name" : "CNT_17", width : 70, align : "right", formatter: 'integer', sortable : false, frozen : true}
	);
	gGroupHeaders.push({startColumnName: "IN_17", numberOfColumns : 3, titleText : "9시 ~ 18시"});
	
	gColName.push( "IN_17", "OUT_17", "CNT_17");
	gColWidth.push(7, 7, 7);
	gColAlign.push("right", "right", "right");

	
	gGroupHeader.push("9시 ~ 18시, R," + positionS +", 3");	
	gColHeader.push("IN, C, 1, 1","OUT, C, 1, 1","계, C, 1, 1");	
	positionS = positionS + 3;	
	
	gColNames.push("IN", "OUT", "계");
	gColModel.push(
			{"name" : "IN_18", width : 70, align : "right", formatter: 'integer',  sortable : false, frozen : true}, 
			{"name" : "OUT_18", width : 70, align : "right", formatter: 'integer', sortable : false, frozen : true},			
			{"name" : "CNT_18", width : 70, align : "right", formatter: 'integer', sortable : false, frozen : true}
	);
	// gGroupHeaders.push({startColumnName: "IN_18", numberOfColumns : 3, titleText : "18시 이후"});
	gGroupHeaders.push({startColumnName: "IN_18", numberOfColumns : 3, titleText : "18시 ~ 22시"}); // 18.03.22 센타장 요청 명칭만 변경
	gColName.push( "IN_18", "OUT_18", "CNT_18");
	gColWidth.push(7, 7, 7);
	gColAlign.push("right", "right", "right");

	
	// gGroupHeader.push("18시 이후, R," + positionS +", 3");	
	gGroupHeader.push("18시 ~ 22시, R," + positionS +", 3");	// 18.03.22 센타장 요청 명칭만 변경
	gColHeader.push("IN, C, 1, 1","OUT, C, 1, 1","계, C, 1, 1");	
	positionS = positionS + 3;	
	
	gColNames.push("IN", "OUT", "계");
	gColModel.push(
			{"name" : "IN_TOT", width : 70, align : "right", formatter: 'integer',  sortable : false, frozen : true}, 
			{"name" : "OUT_TOT", width : 70, align : "right", formatter: 'integer', sortable : false, frozen : true},			
			{"name" : "CNT_TOT", width : 70, align : "right", formatter: 'integer', sortable : false, frozen : true}
	);
	gGroupHeaders.push({startColumnName: "IN_TOT", numberOfColumns : 3, titleText : "합계"});
	
	gColName.push( "IN_TOT", "OUT_TOT", "CNT_TOT");
	gColWidth.push(7, 7, 7);
	gColAlign.push("right", "right", "right");

	
	gGroupHeader.push("합계, R," + positionS +", 3");	
	gColHeader.push("IN, C, 1, 1","OUT, C, 1, 1","계, C, 1, 1");	
	positionS = positionS + 3;
	
	gColNames.push("일평균");
	gColModel.push(
				{"name" : "AVG_CNT", width : 80, align : "center", frozen : false, sortable : false}
	);
		
	gColName.push( "AVG_CNT");
	gColWidth.push(7);
	gColAlign.push("center");
	
	positionS = positionS + 1;
	gColHeader.push("일평균, C, 0, 2");

	
}

var chkcell={cellId:undefined, chkval:undefined}; //cell rowspan 중복 체크
function jsFormatterCell(rowid, val, rowObject, cm, rdata){
    var result = "";
     
    if(chkcell.chkval != val){ //check 값이랑 비교값이 다른 경우
        var cellId = this.id + '_row_'+rowid+'-'+cm.name;
        result = ' rowspan="1" id ="'+cellId+'" + name="cellRowspan"';
        
        chkcell = {cellId:cellId, chkval:val};
    }else{
        result = 'style="display:none"  rowspanid="'+chkcell.cellId+'"'; //같을 경우 display none 처리
        
    }
    return result;
}
var chkcell2={cellId:undefined, chkval:undefined}; //cell rowspan 중복 체크
function jsFormatterCell2(rowid, val, rowObject, cm, rdata){
    var result = "";
     
    if(chkcell2.chkval != val){ //check 값이랑 비교값이 다른 경우
        var cellId = this.id + '_row_'+rowid+'-'+cm.name;
        result = ' rowspan="1" id ="'+cellId+'" + name="cellRowspan"';
        
        chkcell2 = {cellId:cellId, chkval:val};
    }else{
        result = 'style="display:none"  rowspanid="'+chkcell2.cellId+'"'; //같을 경우 display none 처리
        
    }
    return result;
}
var chkcell3={cellId:undefined, chkval:undefined}; //cell rowspan 중복 체크
function jsFormatterCell3(rowid, val, rowObject, cm, rdata){
    var result = "";
     
    if(chkcell3.chkval != val){ //check 값이랑 비교값이 다른 경우
        var cellId = this.id + '_row_'+rowid+'-'+cm.name;
        result = ' rowspan="1" id ="'+cellId+'" + name="cellRowspan"';
        
        chkcell3 = {cellId:cellId, chkval:val};
    }else{
        result = 'style="display:none"  rowspanid="'+chkcell3.cellId+'"'; //같을 경우 display none 처리
        
    }
    return result;
}

//조회 버튼 클릭 이벤트 
function stsTypeSearch(){
	setGrid();
	grid(getJsonStsCounselingCntHoliday(), gColNames, gColModel, gGroupHeaders);
}

//그리드 동적으로 만들기 위한 함수
function grid(jsonValue, colNamesValue, colModelValue, groupHeadersValue) 
{
	$("#cslCntHld_dvGridArea").empty();
	var tb = "<table id = 'cslCntHld_tblStsCounselingCntHoliday'></table>"; 
	$("#cslCntHld_dvGridArea").append(tb);
	
	$("#cslCntHld_tblStsCounselingCntHoliday").jqGrid(
	{
		url : getContextPath() + "/ajax/statistics/counselingCntHoliday.do",
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
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : false,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "460",
	   	width : "100%",	
	   	rowNum : 999999,
	   	autowidth : true,
	   	pgbuttons : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	rowNum : "10000",
	   	multiselect : false,
	   	emptyrecords : "0",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,	   	
	   	loadComplete: function() {
	   		
            var ids = $("#cslCntHld_tblStsCounselingCntHoliday").getDataIDs() ;
            
            $.each(ids, function(idx, rowId) {
            	var rowData = $("#cslCntHld_tblStsCounselingCntHoliday").getRowData(rowId) ;
            	
            	if(rowData.GB_NM =="합계"){
            		$("#cslCntHld_tblStsCounselingCntHoliday").setRowData( rowId ,false,{background:"#EAEAEA"});
            	}            	
           }) ;
               
       },
       gridComplete: function() {  /** 데이터 로딩시 함수 **/
           var grid = this;
            
           $('td[name="cellRowspan"]', grid).each(function() {
               var spans = $('td[rowspanid="'+this.id+'"]',grid).length+1;
               if(spans>1){
                $(this).attr('rowspan',spans);
               }
           });    
       },    



       
	}).jqGrid('setGroupHeaders', 
	{
	  useColSpanStyle : true, 
	  groupHeaders : groupHeadersValue
	}).jqGrid('setFrozenColumns');
	
	 
}


$(document).ready(function(){
	var isMngr= false;
	switch(usr_grd_cd) {
      case '020100'://파트매니저
      case '030100'://그룹매니저
      case '050100'://센터장
      case '060100'://통합센터장
      case '090100'://시스템관리자
         isMngr = true;
         break;
      default:
         isMngr = false;
         break;
	}

	if(isMngr){
		$("#cslCntHld_btnStsHolidayExelDown").show();
	}else{
		$("#cslCntHld_btnStsHolidayExelDown").hide();
	}

	
	$("#cslCntHld_schDayStart").bind("change",  function () {
		$( "#cslCntHld_schDayStart" ).datepicker( "option", "maxDate",getDate());
		$( "#cslCntHld_schDayEnd" ).datepicker( "option", "maxDate",getDate());
		$(".ui-datepicker-trigger").css("vertical-align","middle");
	});
	
	$("#cslCntHld_schDayEnd").bind("change",  function () {		
		$( "#cslCntHld_schDayStart" ).datepicker( "option", "maxDate",getDate());
		$( "#cslCntHld_schDayEnd" ).datepicker( "option", "maxDate",getDate());
		$(".ui-datepicker-trigger").css("vertical-align","middle");		
	});
	
	
	datePicker("#cslCntHld_schDayStart");
	datePicker("#cslCntHld_schDayEnd");
	
	/*
	setObjectSelectBoxWithCode2("selSrchIntvExCd", "전체", "1", "CHILD", "00000000", "all", "CHANGE");

	$("#selSrchIntvExCd").bind("change", function()
	{
		setObjectSelectBoxWithCode2("selSrchIntvLgCd", "전체", "2",  "CHILD", $("#selSrchIntvExCd").val(), "", "CHANGE");
	});
	
	$("#selSrchIntvLgCd").bind("change", function()
	{
		setObjectSelectBoxWithCode2("selSrchIntvMdCd", "전체", "3",  "CHILD", $("#selSrchIntvLgCd").val(), "", "CHANGE");
	});
	
	$("#selSrchIntvMdCd").bind("change", function() 
	{
		setObjectSelectBoxWithCode2("selSrchIntvSmCd", "전체", "4",  "CHILD", $("#selSrchIntvMdCd").val(),"","CHANGE");
	});
*/
	setObjectSelectBoxWithCode2("selSrchIntvLgCd", "전체", "1", "CHILD", "00000000", "all", "CHANGE");

	$("#selSrchIntvExCd").bind("change", function()
	{
		setObjectSelectBoxWithCode2("selSrchIntvMdCd", "전체", "2",  "CHILD", $("#selSrchIntvLgCd").val(), "", "CHANGE");
	});
	
	$("#selSrchIntvLgCd").bind("change", function()
	{
		setObjectSelectBoxWithCode2("selSrchIntvSmCd", "전체", "3",  "CHILD", $("#selSrchIntvMdCd").val(), "", "CHANGE");
	});

	//$("#selSrchIntvExCd").trigger("change");
	$("#selSrchIntvLgCd").trigger("change");
	
	// 초기화
	init();	
	
		
	// 초기화 버튼 클릭 이벤트 등록
	$("#cslCntHld_btnStsHolidayInit").bind("click", init);
	
	// 조회 버튼 클릭 이벤트 등록
	$("#cslCntHld_btnStsHolidaySearch").bind("click", stsTypeSearch);
	
	// 엑셀다운 버튼 클릭 이벤트 등록
	$("#cslCntHld_btnStsHolidayExelDown").bind("click", stsTypeExelDown);
});