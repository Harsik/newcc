//조회조건 및 조회값
var g_srchtype = "ttl";
var g_srchval = "";
var g_tbbsStrtDt = "";
var g_tbbsEndDt = "";
var g_popup = "CHILD";

var usrSelect = window.sessionStorage.getItem("USR_GRD_CD");
var d = new Date();
var currentYear = d.getFullYear();
var currentMonth = d.getMonth() + 1;

if(currentMonth < 10)
	currentMonth = "0"+currentMonth;
var currentYM = currentYear + "-" + currentMonth;

//파라미터셋팅 malignancyList
function getJsonStrSelectmalignancyCustomerList() {
	var termType = $("#mgCtm_optTerm").val();
	var schStartDt = "";
	var schEndDt = "";
	if(termType == "month") {	
		schStartDt = $('#mgCtm_schMonthStart').val()+"-01";
		schEndDt = $('#mgCtm_schMonthEnd').val()+"-31";
		

		var schStartDt1 = new Date(schStartDt)  
		var schEndDt1 = new Date(schEndDt)  
		
		if( ( (schEndDt1.getTime() - schStartDt1.getTime()) / ( 1000 * 60 * 60 * 24 ) ) > 396 ){ // 검색기간이 1년1개월 보다 크면 차단
			alert("13개월 이상 검색할 수 없습니다.");
			return false;
		}
		
	}
	else if(termType == "day") {		
		schStartDt = $("#mgCtm_schDayStart").val();
		schEndDt = $("#mgCtm_schDayEnd").val();
		var schStartDt1 = new Date(schStartDt)  
		var schEndDt1 = new Date(schEndDt)  
		
		/*if( ( (schEndDt1.getTime() - schStartDt1.getTime()) / ( 1000 * 60 * 60 * 24 ) ) > 31 ){ // 검색기간이 1년1개월 보다 크면 차단
			alert("31일 이상 검색할 수 없습니다.");
			return false;
		}*/
		
	}
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "Y20wMDMubWFsaWduYW5jeUxpc3Q=",
	    "map" : {
		"key" : "value",
		"tbbs_strt_dt" : schStartDt.replace(/-/g, ""),
		"tbbs_end_dt" : schEndDt.replace(/-/g, ""),
		//"usr_id" : $("#mgCtm_optUsrNmList").val(),
		"cdbActStCds" : $("#mgCtm_optDtCustmComp").val()!=null?$("#mgCtm_optDtCustmComp").val():"all",
		"customer_tel":$("#mgCtm_customer_tel").val().replace(/-/g,""),
	    }
    };
    console.log(JSON.stringify(loParam));
    return  encodeURIComponent(JSON.stringify(loParam));
}

//엑셀다운로드
function getJsondaymalignancyCustomerExcel(){
	var termType = $("#mgCtm_optTerm").val();
var schStartDt = "";
var schEndDt = "";
if(termType == "month") {	
	schStartDt = $('#mgCtm_schMonthStart').val()+"01";
	schEndDt = $('#mgCtm_schMonthEnd').val()+"31";
	
	var schStartDt1 = new Date(schStartDt)  
	var schEndDt1 = new Date(schEndDt)  
	
	if( ( (schEndDt1.getTime() - schStartDt1.getTime()) / ( 1000 * 60 * 60 * 24 ) ) > 396 ){ // 검색기간이 1년1개월 보다 크면 차단
		alert("13개월 이상 검색할 수 없습니다.");
		return false;
	}
	
}
else if(termType == "day") {		
	schStartDt = $("#mgCtm_schDayStart").val();
	schEndDt = $("#mgCtm_schDayEnd").val();
	var schStartDt1 = new Date(schStartDt)  
	var schEndDt1 = new Date(schEndDt)  
	
	/*if( ( (schEndDt1.getTime() - schStartDt1.getTime()) / ( 1000 * 60 * 60 * 24 ) ) > 31 ){ // 검색기간이 1년1개월 보다 크면 차단
		alert("31일 이상 검색할 수 없습니다.");
		return false;
	}*/
	
}
malignancyStrtDt=schStartDt.replace(/-/g, "");
malignancyEndDt=schEndDt.replace(/-/g, "");
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "Y20wMDMubWFsaWduYW5jeUxpc3Q=",
	    "map" : {
		"key" : "value",
		"tbbs_strt_dt" : malignancyStrtDt,
		"tbbs_end_dt" : malignancyEndDt,
		"cdbActStCds" : $("#mgCtm_optDtCustmComp").val()!=null?$("#mgCtm_optDtCustmComp").val():"all",
		"customer_tel":$("#mgCtm_customer_tel").val().replace(/-/g,""),
		"sidx" : 'CALLNUM',
		"sord" : "DESC",
	    }
    };
	    loParam.map.viciousCustomers="propensity";
	    loParam.map.title="특이고객_현황" + setDownLoadName(malignancyStrtDt, malignancyEndDt);
	    loParam.map.colWidth=[20,20,20,20,20,50,20];
	    loParam.map.colName=["CUST_NM", "TELEPHONE_INFM", "CELLPHONE_INFM", "EXT_CD","LG_CD", "MEMO","CALLNUM"];
	    loParam.map.colHeader=["민원인명", "전화번호", "휴대폰번호","민원인성향","고객성향", "메모", "콜수"];
	    loParam.map.colAlign=["center", "center", "center", "left", "left","left", "center"];

	    console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//초기화 버튼
function btnInit_ClicikEvent(){
	 $("#mgCtm_optUsrNmList").val("all");
	 //$("#mgCtm_tfTbbsStrtDt").val(getDate().substr(0, 8) + "01");
	 //$("#mgCtm_tfTbbsEndDt").val(getDate());
	 
	 $("#mgCtm_schDayStart").val(getDate().substr(0, 8) + "01");
	 $("#mgCtm_schDayEnd").val(getDate());
	 $("#mgCtm_customer_tel").val("");
	 $("#cst_comp_cd").val("all");
	 $("#cst_comp_cd2").val("all");
	 $("#mgCtm_optDtCustmComp").val("all");
	//현재 월 1일부터 현재일까지 디폴트 셋팅
	 //g_tbbsStrtDt = $("#mgCtm_tfTbbsStrtDt").val().replace(/-/g,"");
	 //g_tbbsEndDt = $("#mgCtm_tfTbbsEndDt").val().replace(/-/g,"");
	 
	 $("#mgCtm_tblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectmalignancyCustomerList()}, page : 1, sortname : "CALLNUM", sortorder : "desc"});
	 $("#mgCtm_tblNotifyList").trigger("reloadGrid");
}
//검색버튼
function btnSearch_ClicikEvent(){
	
	/*g_tbbsStrtDt = $("#mgCtm_tfTbbsStrtDt").val().replace(/-/g,"");
	g_tbbsEndDt = $("#mgCtm_tfTbbsEndDt").val().replace(/-/g,"");
	
	var rMsg = "";
	if(g_tbbsStrtDt != "" || g_tbbsEndDt != "") {
		if(g_tbbsStrtDt == "") {
			rMsg += "\n시작일자를 입력해주세요.";
		}
		if(g_tbbsEndDt == "") {
			rMsg += "\n종료일자를 입력해주세요.";
		} else {
			var d_tbbsStrtDt = new Date(g_tbbsStrtDt.substr(0, 4), g_tbbsStrtDt.substr(4, 2), g_tbbsStrtDt.substr(6, 2));
			var d_tbbsEndDt = new Date(g_tbbsEndDt.substr(0, 4), g_tbbsEndDt.substr(4, 2), g_tbbsEndDt.substr(6, 2));
			if(d_tbbsStrtDt > d_tbbsEndDt) {
				rMsg += "\n시작일이 종료일보다 큽니다.";
			}
		}
	}
	
	if(rMsg != "") {
		alert(rMsg);
		return;
	}*/
	
	    $("#mgCtm_tblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectmalignancyCustomerList()}, page : 1, sortname : "CALLNUM", sortorder : "desc"});
	    $("#mgCtm_tblNotifyList").trigger("reloadGrid");
	
}

//다운로드버튼
function btnDown_ClicikEvent(){
	//엑셀출력
	//var strDay = $("#mgCtm_tfTbbsStrtDt").val().replace(/-/gi, "");
	//var endDay = $("#mgCtm_tfTbbsEndDt").val().replace(/-/gi, "");
	excelDownLoad(getContextPath() + "/excel/statistics/malignancyCustomerExcel.do",getJsondaymalignancyCustomerExcel());
}

function selectType(){
	$("#cst_comp_cd2").attr("disabled", true);
	setObjSelectBoxWithCode("cst_comp_cd", "전체", "",g_popup,"90048", "");
	setObjSelectBoxWithCode("cst_comp_cd2", "미선택", "",g_popup,"90901", "");
	$("#cst_comp_cd option[value='010000'],#cst_comp_cd option[value='020000']").remove();
	$("#cst_comp_cd").bind("change", function(e) 
	{
		var code = $("#cst_comp_cd").val();
		
		if (code != "all" &&code != "010000" && code != "020000") 
		{
			$("#cst_comp_cd2").prop("disabled", false);
		}
	});
	//setSelectBoxWithAgent("mgCtm_optUsrNmList", "전체", g_popup,"","010000","","","","" );
    setSelectBoxWithCode2("mgCtm_optDtCustmComp", "전체", "90048", g_popup, "", "");
}


/*// 고객 특이미원
function propensity_grid() {
    
    ["USR_NM", "TELEPHONE_INFM", "CELLPHONE_INFM", "EXT_CD", "MEMO","MOD_DT", "MOD_USR_NM"]
	var pMap = {};
	pMap.tblId = "mgCtm_tblNotifyList";
	pMap.url   = "/jqgrid/statics/malignancyCustomer.do";
	pMap.postData = getJsonStrSelectmalignancyCustomerList();
	pMap.colNames = ["민원인명", "전화번호", "휴대폰번호", "민원인성향", "메모", "콜수"];
	pMap.colModel = [
         { name : "CUST_NM", 		index : "CUST_NM", 		width :15, align: "center"},
         { name : "TELEPHONE_INFM", 	index : "TELEPHONE_INFM",	width :15, align: "center"},
         { name : "CELLPHONE_INFM", 	index : "CELLPHONE_INFM", 	width :15, align: "center"},
         { name : "EXT_CD", 		index : "EXT_CD", 		width :25, align: "left",
             formatter: function (cellvalue, options, rowobj) {
        	 var str = rowobj.EXT_CD==null?"":rowobj.EXT_CD;
        	 var str2 = rowobj.LG_CD==null?"":rowobj.LG_CD;
        	 return str2==""?str:str+" > "+str2;
             }
         },
         { name : "MEMO", 		index : "MEMO", 		width :60, align: "left"},
         { name : "CALLNUM", 		index : "CALLNUM", 		width :10, align: "center"}
   	];
	pMap.rowNum = "21";
	pMap.sortname = "CALLNUM";
	pMap.width = "600";
	pMap.height = "548";
	pMap.cellEdit = false;
	pMap.pager = "mgCtm_pgNotifyList";
	pMap.rowNumber = true;
	pMap.autowidth = true;
	pMap.selectEvent = function(rowid){
		var row = $("#mgCtm_tblNotifyList").getRowData(rowid);		
	}
	init_grid(pMap);
}


//그리드 생성
function init_grid(pMap) {
    $("#"+pMap.tblId).jqGrid({
		url : getContextPath() + pMap.url,
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : pMap.postData
		},
		jsonReader :{
			repeatitems: false
		},
		colNames : pMap.colNames,
	   	colModel : pMap.colModel,
	   	sortname : pMap.sortname,
	   	sortorder : "desc",
	   	gridview : false,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : pMap.height,
	   	width : pMap.width,
	   	rowNum : pMap.rowNum,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#"+pMap.pager,
	   	rownumbers : pMap.rowNumber,
	   	cellEdit : pMap.cellEdit,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : window[pMap.selectEvent],
	   	onCellSelect : window[pMap.cellEvent],
	   	gridComplete : window[pMap.completeEvent]	   	
	}).jqGrid("navGrid", "#"+pMap.pager, {edit : false, add : false, del : false, search : false});
    
	var newWidth = $("#sub_grid_EXT_CD").width() + $("#sub_grid_LG_CD").outerWidth(true);
	$("#mgCtm_tblNotifyList").jqGrid("setLabel", "EXT_CD", "고객성향", "", {style: "width:"+newWidth+" px;", colspan: "2"});
	$("#mgCtm_tblNotifyList").jqGrid("setLabel", "LG_CD", "", "", {style: "display: none"});
}*/

function initpropensity_grid(){
	$("#mgCtm_tblNotifyList").jqGrid(
			{
				url : getContextPath() + "/jqgrid/statics/malignancyCustomer.do",
				datatype : "json",
				mtype : "POST",
				postData : {
					pJson : getJsonStrSelectmalignancyCustomerList()
				},
				jsonReader :
				{
					repeatitems: false
				},
				colNames : ["CUST_ID", "민원인명", "전화번호", "휴대폰번호", "민원인성향", "메모", "콜수"],
			
			   	colModel :
			   	[
			   		 { name : "CUST_ID", 		index : "CUST_ID", 		width :15, align: "center", hidden:true },
			         { name : "CUST_NM", 		index : "CUST_NM", 		width :15, align: "center"},
			         { name : "TELEPHONE_INFM", 	index : "TELEPHONE_INFM",	width :15, align: "center"},
			         { name : "CELLPHONE_INFM", 	index : "CELLPHONE_INFM", 	width :15, align: "center"},
			         { name : "EXT_CD", 		index : "EXT_CD", 		width :25, align: "left",
			             formatter: function (cellvalue, options, rowobj) {
			        	 var str = rowobj.EXT_CD==null?"":rowobj.EXT_CD;
			        	 var str2 = rowobj.LG_CD==null?"":rowobj.LG_CD;
			        	 return str2==""?str:str+" > "+str2;
			             }
			         },
			         { name : "MEMO", 		index : "MEMO", 		width :60, align: "left"},
			         { name : "CALLNUM", 		index : "CALLNUM", 		width :10, align: "center",cellattr: function ( rowId , tv , rowObject , cm , rdata){
			            	return 'style="text-decoration: underline;cursor:pointer;"' 
			            }}
			   	],
			   	sortname : "CALLNUM",
			   	sortorder : "desc",
			   	gridview : false,
			   	hidegrid : false,
			   	shrinkToFit : true,
			   	loadonce : false,
			   	scrollOffset : 0,
			   	height : "600",
			   	width : "548",
			   	rowNum : 21,
			   	rowList : [10, 20, 30, 50, 100],
			   	autowidth : true,
			   	pager : "#mgCtm_pgNotifyList",
			   	rownumbers : true,
			   	rownumWidth : 30,
			   	multiselect : false,
			   	emptyrecords : "",
			   	caption : "",
			   	loadui : "enable",
			   	viewrecords: true,
				cellEdit : false,
				rowNumber : true,
				autowidth : true,
				onCellSelect : function(rowid, iCol, cellContent, e)
			    {
			            var tempiCol=7;
			        	var row = $("#mgCtm_tblNotifyList").getRowData(rowid);
			        	window.sessionStorage.setItem("cust_id",row.CUST_ID);
			        	var termType = $("#mgCtm_optTerm").val();
			        	
			        	var schStartDt = "";
			        	var schEndDt = "";
			        	if(termType == "month") {	
			        		schStartDt = $('#mgCtm_schMonthStart').val()+"01";
			        		schEndDt = $('#mgCtm_schMonthEnd').val()+"31";
			        		
			        		var schStartDt1 = new Date(schStartDt)  
			        		var schEndDt1 = new Date(schEndDt)  
			        		
			        		if( ( (schEndDt1.getTime() - schStartDt1.getTime()) / ( 1000 * 60 * 60 * 24 ) ) > 396 ){ // 검색기간이 1년1개월 보다 크면 차단
			        			alert("13개월 이상 검색할 수 없습니다.");
			        			return false;
			        		}
			        		
			        	}
			        	else if(termType == "day") {		
			        		schStartDt = $("#mgCtm_schDayStart").val();
			        		schEndDt = $("#mgCtm_schDayEnd").val();
			        		var schStartDt1 = new Date(schStartDt)  
			        		var schEndDt1 = new Date(schEndDt)  
			        		
			        		/*if( ( (schEndDt1.getTime() - schStartDt1.getTime()) / ( 1000 * 60 * 60 * 24 ) ) > 31 ){ // 검색기간이 1년1개월 보다 크면 차단
			        			alert("31일 이상 검색할 수 없습니다.");
			        			return false;
			        		}*/
			        		
			        	}
			        	
			        	window.sessionStorage.setItem("schStartDt",schStartDt);
			        	window.sessionStorage.setItem("schEndDt",schEndDt);
			        	if(iCol==tempiCol){
			        		openMenuPopup("CM0002");
			        	}
			     },
			   	gridComplete : function()
			   	{
					$('#mgCtm_optDtCustmComp option[value="010000"]').remove();
					$('#mgCtm_optDtCustmComp option[value="020000"]').remove();   		   		
			   	}
			}).jqGrid("navGrid", "#cslist_pgCounselList", {edit : false, add : false, del : false, search : false});
}
function changeTerm() {
	
	var termType = $("#mgCtm_optTerm").val();
	
	if(termType == "month") {	
		$("#mgCtm_dvYear").hide();
		$("#mgCtm_dvMonth").show();
		$("#mgCtm_dvDay").hide();
		
		$('#mgCtm_schMonthStart').val( currentYM );
		$('#mgCtm_schMonthEnd').val( currentYM );		
	}
	else if(termType == "day") {	
		$("#mgCtm_dvYear").hide();
		$("#mgCtm_dvMonth").hide();
		$("#mgCtm_dvDay").show();
		
		$("#mgCtm_schDayStart").val(getPrvDay("M","1","-"));
		$("#mgCtm_schDayEnd").val(getDate());
	}
}
//실행함수
$(document).ready(function(){
    
    $("#btnExcel").css("display","none");
    //권한
    if(usrSelect != null && usrSelect != "")
    {
	if(usrSelect >= "030100"){
	    isMngr = true;
	    $("#btnExcel").css("display","inline-block");
	}else{
	    isMngr = false;
	    $("#btnExcel").css("display","none");
	}
    }

    //현재 월 1일부터 현재일까지 디폴트 셋팅
    //$("#mgCtm_tfTbbsStrtDt").val(getDate().substr(0, 8) + "01");
    //$("#mgCtm_tfTbbsEndDt").val(getDate());	

    //날짜
    //datePicker("#mgCtm_tfTbbsStrtDt");
    //datePicker("#mgCtm_tfTbbsEndDt");

    $("#mgCtm_btnInit").bind("click",btnInit_ClicikEvent);
    $("#mgCtm_btnSearch").bind("click",btnSearch_ClicikEvent);
    $("#mgCtm_btnExcel").bind("click",btnDown_ClicikEvent);


    //g_tbbsStrtDt = $("#mgCtm_tfTbbsStrtDt").val().replace(/-/g,"");
    //g_tbbsEndDt = $("#mgCtm_tfTbbsEndDt").val().replace(/-/g,"");		

	$("#mgCtm_schMonthStart").MonthPicker({
		MaxMonth: 0
    });
	
	$("#mgCtm_schMonthEnd").MonthPicker({
		MaxMonth: 0
    });
	/*$("#mgCtm_schDayStart").bind("change",  function () {
		$( "#mgCtm_schDayEnd" ).datepicker( "option", "minDate", $("#mgCtm_schDayStart").val() );
		var toDay = new Date(getDate());
		var maxDay = new Date(getAddDate($("#mgCtm_schDayStart").val(), 31));
		
		if((toDay.getTime() - maxDay.getTime()) < 0){
			// 현재 날짜가 작은경우
			$( "#mgCtm_schDayEnd" ).datepicker( "option", "maxDate", getDate());
		}else{
			$( "#mgCtm_schDayEnd" ).datepicker( "option", "maxDate", getAddDate($("#mgCtm_schDayStart").val(), 31) );
		}
		$( "#mgCtm_schDayStart" ).datepicker( "option", "maxDate",getDate());			

		$(".ui-datepicker-trigger").css("vertical-align","middle");
	});
	
	$("#mgCtm_schDayEnd").bind("change",  function () {
		//$( "#mgCtm_schDayStart" ).datepicker( "option", "minDate", getAddDate($("#mgCtm_schDayEnd").val(), -31) );
		//$( "#mgCtm_schDayStart" ).datepicker( "option", "maxDate", $("#mgCtm_schDayEnd").val() );
		$( "#mgCtm_schDayStart" ).datepicker( "option", "maxDate",getDate());
		$( "#mgCtm_schDayEnd" ).datepicker( "option", "maxDate",getDate());
		$(".ui-datepicker-trigger").css("vertical-align","middle");
		
	});*/
	datePicker("#mgCtm_schDayStart");
	datePicker("#mgCtm_schDayEnd");	

    changeTerm();

    //고객별 특이민원 init
    initpropensity_grid();
    //propensity_grid();
    selectType();
    $("#mgCtm_optTerm").val("day");

	// 기간 조회조건 change 이벤트
	$("#mgCtm_optTerm").bind("change", changeTerm);		
     
});
