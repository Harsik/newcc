var gActCdArr = [];
var gActNmArr = [];

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


//파라미터 셋팅_getJsonStsCounselingCntType
function getJsonStsCounselingCntType() {
		
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y2gwMDEuc3RzQ291bnNlbGluZ0NudFR5cGU=",//ch001.stsCounselingCntType
			"map" : {
				"key" : "value" ,
				"schStartDt" : $("#cslCntTp_schDayStart").val().replace(/-/g, ""),
				"schEndDt" : $("#cslCntTp_schDayEnd").val().replace(/-/g, ""),	
				"chkHoliday" : $("#cslCntTp_chkHoliday").is(":checked") ? "Y" : "N",
				"schIntvLgCd" : $("#cslCntTp_selSrchIntvLgCd").val(),
				"schIntvMdCd" : $("#cslCntTp_selSrchIntvMdCd").val(),
				"gActCdArr" : gActCdArr
			}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_getJsonStsCounselingCntTypeExcel
function getJsonStsCounselingCntTypeExcel() {
	
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y2gwMDEuc3RzQ291bnNlbGluZ0NudFR5cGU=", //ch001.stsCounselingCntType
			"map" : {
				"key" : "value" ,				
				"schStartDt" : $("#cslCntTp_schDayStart").val().replace(/-/g, ""),
				"schEndDt" : $("#cslCntTp_schDayEnd").val().replace(/-/g, ""),	
				"chkHoliday" : $("#cslCntTp_chkHoliday").is(":checked") ? "Y" : "N",
				"schIntvLgCd" : $("#cslCntTp_selSrchIntvLgCd").val(),
				"schIntvMdCd" : $("#cslCntTp_selSrchIntvMdCd").val(),
				"schIntvSmCd" : $("#selSrchIntvSmCd").val(),
				"title" : "카테고리별_상담현황" + setDownLoadName($("#cslCntTp_schDayStart").val(), $("#cslCntTp_schDayEnd").val()),
				"gActCdArr" : gActCdArr,
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
	$("#cslCntTp_selSrchIntvLgCd").trigger("change");
	
	$("#cslCntTp_schDayStart").val(getDate());
	$("#cslCntTp_schDayEnd").val(getDate());

	// 그리드
	stsTypeSearch();
}



// 엑셀다운 버튼 클릭 이벤트
function stsTypeExelDown() {
	setGrid();
	param = getJsonStsCounselingCntTypeExcel();
	url = getContextPath() + "/excel/mprows/mpRowsExcelDown.do";	
	excelDownLoad(url, param);
    
}

//처리유형코드리스트
function getJsonActCdList()
{
    var loParam = {
        "qt" : "c2VsZWN0TGlzdA==",
        "mi" : "c20wMDIuYWN0VHlwZUxpc3Q=", 	// sm002.actTypeList
        "map" : {
        "key" : "value",
            }
    };
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}


function setGrid(){ // 여기1
	
	gActCdArr = [];
	gActNmArr = [];
	 
	$.ajax({
	    type : "post",
	    dataType: "json",
	    async : false,
	    url : getContextPath() + "/ajax/code/actCodeList.do",
	    data : "pJson=" + getJsonActCdList(),
	    success : function(data) { 
	        // param값을 JSON으로 파싱
	 
	        $.each(data, function(key, state) {
	            gActCdArr.push(state.CD);
	            gActNmArr.push(state.CD_NM); 
	        });
	    },
	    error : function(data, status, err) {
	        networkErrorHandler(data, status, err);
	    }
	}); 
	
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
	
	gGroupHeaders.push({startColumnName: "CTG_LG_NM", numberOfColumns : 3, titleText : "상담유형"});
	gGroupHeaders.push({startColumnName: "IN_"+gActCdArr[0], numberOfColumns : gActCdArr.length, titleText : "인바운드"});
	gGroupHeaders.push({startColumnName: "OUT_"+gActCdArr[0], numberOfColumns : gActCdArr.length, titleText : "아웃바운드"});
	gGroupHeaders.push({startColumnName: "IN_CNT", numberOfColumns : 3, titleText : "건수"});
	
	gGroupHeader.push("상담유형, R, 0, 3");
	gGroupHeader.push("인바운드, R, 3, "+gActCdArr.length);
	gGroupHeader.push("아웃바운드, R, "+(3+gActCdArr.length)+", "+gActCdArr.length);
	gGroupHeader.push("건수, R, "+(3+gActCdArr.length*2)+", "+3);
	
	gColNames.push("대분류", "중분류", "소분류");
	gColModel.push(
				{"name" : "CTG_LG_NM", width : 150, align : "center", sortable : false, cellattr:jsFormatterCell2}, 
				{"name" : "CTG_MD_NM", width : 130, align : "center", sortable : false, cellattr:jsFormatterCell3}, 
				{"name" : "CTG_SM_NM", width : 130, align : "center", sortable : false}
	);
	
	gColName.push( "CTG_LG_NM", "CTG_MD_NM", "CTG_SM_NM");	
	gColWidth.push(15,20,20);
	gColAlign.push("center","center","center");
	gColHeader.push("대분류, C, 1, 1", "중분류, C, 1, 1", "소분류, C, 1, 1");
	
	for(var i = 0  ; i < gActCdArr.length; i++){ 
		 
	    if(gActNmArr[i]=="상담후호전환") gColNames.push("상담후<br/>호전환");
	    else if(gActNmArr[i]=="담당자전환") gColNames.push("담당자<br/>전환");
	    else gColNames.push(gActNmArr[i]);
	    gColModel.push( 
	            {"name" : "IN_"+gActCdArr[i], width : 70, align : "right", sortable : false}
	    );
	    
	    gColName.push("IN_"+gActCdArr[i]);	
		gColWidth.push(10);
		gColAlign.push("center");
		gColHeader.push(gActNmArr[i]+", C, 1, 1");
	}
	
	for(var i = 0  ; i < gActCdArr.length; i++){ 
		 
	    if(gActNmArr[i]=="상담후호전환") gColNames.push("상담후<br/>호전환");
	    else if(gActNmArr[i]=="담당자전환") gColNames.push("담당자<br/>전환");
	    else gColNames.push(gActNmArr[i]);
	    gColModel.push( 
	            {"name" : "OUT_"+gActCdArr[i], width : 70, align : "right", sortable : false}
	    );
	    
	    gColName.push("OUT_"+gActCdArr[i]);	
		gColWidth.push(10);
		gColAlign.push("center");
		gColHeader.push(gActNmArr[i]+", C, 1, 1");
	}
	
	gColNames.push("IN", "OUT", "TOTAL");
	gColModel.push(
				{"name" : "IN_CNT", width : 60, align : "center", sortable : false}, 
				{"name" : "OUT_CNT", width : 60, align : "center", sortable : false}, 
				{"name" : "TOTAL_CNT", width : 60, align : "center", sortable : false}
	);
	
	gColName.push( "IN_CNT", "OUT_CNT", "TOTAL_CNT");	
	gColWidth.push(10,10,10);
	gColAlign.push("center","center","center");
	gColHeader.push("IN, C, 1, 1", "OUT, C, 1, 1", "TOTAL, C, 1, 1");
	
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
	grid(getJsonStsCounselingCntType(), gColNames, gColModel, gGroupHeaders);
}

//그리드 동적으로 만들기 위한 함수
function grid(jsonValue, colNamesValue, colModelValue, groupHeadersValue) // 여기2
{
	$("#cslCntTp_dvGridArea").empty();
	
	var tb = "<table id = 'cslCntTp_tblStsCounselingCntType'></table>"; 
	
	$("#cslCntTp_dvGridArea").append(tb);
	
	$("#cslCntTp_tblStsCounselingCntType").jqGrid(
	{
		url : getContextPath() + "/ajax/statistics/counselingCntType.do",
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
	   	height : "640",
	   	width : "100%",	
	   	rowNum : 999999,
	   	autowidth : true,
	   	pgbuttons : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "0",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,	   	
	   	loadComplete: function() {
	   		
            var ids = $("#cslCntTp_tblStsCounselingCntType").getDataIDs() ;
            
            $.each(ids, function(idx, rowId) {
            	var rowData = $("#cslCntTp_tblStsCounselingCntType").getRowData(rowId);
            	
            	if(rowData.CTG_SM_NM =="소계"){
            		$("#cslCntTp_tblStsCounselingCntType").setRowData( rowId ,false,{background:"#EDE5DB"});
            	}
            	else if(rowData.CTG_MD_NM =="소계"){
            		$("#cslCntTp_tblStsCounselingCntType").setRowData( rowId ,false,{background:"#DFD8D2"});
            	}
            	else if(rowData.CTG_LG_NM =="총합계"){
            		$("#cslCntTp_tblStsCounselingCntType").setRowData( rowId ,false,{background:"#CDC7C1"});
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
		$("#cslCntTp_btnStsTypeExelDown").show();
	}else{
		$("#cslCntTp_btnStsTypeExelDown").hide();
	}

	
	$("#cslCntTp_schDayStart").bind("change",  function () {
		$( "#cslCntTp_schDayStart" ).datepicker( "option", "maxDate",getDate());
		$( "#cslCntTp_schDayEnd" ).datepicker( "option", "maxDate",getDate());
		$(".ui-datepicker-trigger").css("vertical-align","middle");
	});
	
	$("#cslCntTp_schDayEnd").bind("change",  function () {		
		$( "#cslCntTp_schDayStart" ).datepicker( "option", "maxDate",getDate());
		$( "#cslCntTp_schDayEnd" ).datepicker( "option", "maxDate",getDate());
		$(".ui-datepicker-trigger").css("vertical-align","middle");		
	});
	
	
	datePicker("#cslCntTp_schDayStart");
	datePicker("#cslCntTp_schDayEnd");
	setObjectSelectBoxWithCode2("cslCntTp_selSrchIntvLgCd", "전체", "1", "CHILD", "00000000", "all", "CHANGE");
	/*
	setObjectSelectBoxWithCode2("selSrchIntvExCd", "전체", "1", "CHILD", "00000000", "all", "CHANGE");

	$("#selSrchIntvExCd").bind("change", function()
	{
		setObjectSelectBoxWithCode2("cslCntTp_selSrchIntvLgCd", "전체", "2",  "CHILD", $("#selSrchIntvExCd").val(), "", "CHANGE");
	});
	*/
	$("#cslCntTp_selSrchIntvLgCd").bind("change", function()
	{
		setObjectSelectBoxWithCode2("cslCntTp_selSrchIntvMdCd", "전체", "2",  "CHILD", $("#cslCntTp_selSrchIntvLgCd").val(), "", "CHANGE");
	});
	
	$("#cslCntTp_selSrchIntvMdCd").bind("change", function() 
	{
		setObjectSelectBoxWithCode2("selSrchIntvSmCd", "전체", "3",  "CHILD", $("#cslCntTp_selSrchIntvMdCd").val(),"","CHANGE");
	});


	//$("#selSrchIntvExCd").trigger("change");
	$("#cslCntTp_selSrchIntvLgCd").trigger("change");
	
	// 초기화
	init();	
		
	// 초기화 버튼 클릭 이벤트 등록
	$("#cslCntTp_btnStsTypeInit").bind("click", init);
	
	// 조회 버튼 클릭 이벤트 등록
	$("#cslCntTp_btnStsTypeSearch").bind("click", stsTypeSearch);
	
	// 엑셀다운 버튼 클릭 이벤트 등록
	$("#cslCntTp_btnStsTypeExelDown").bind("click", stsTypeExelDown);
});