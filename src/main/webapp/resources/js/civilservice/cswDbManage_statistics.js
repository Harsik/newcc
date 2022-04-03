
//statistics list
function getJsonStrStatsSttusList(){
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTUuY25sdFN0YXRpc3RpY3NMaXN0",
	    "map" : {
		"key" : "value",
		"frDt" : $("#csdbst_StatsSrchSelFrDate").val().replace(/[-, :, \s]/g,""),
		"toDt" : $("#csdbst_StatsSrchSelToDate").val().replace(/[-, :, \s]/g,""),
		"oucode" : window.sessionStorage.getItem("CC_AUTH") == "Y" ? "all" : sendingOuCode,
		"orgFulNm" : $("#csdbst_StatsSrchRequstAt").val(),
		"checkboxYN" : $("#csdbst_chkStaticsDeptAllCount").is(":checked") ? true : false
	    }
    }; 
    return  encodeURIComponent(JSON.stringify(loParam));
}

//dept setting
function setSelectboxDeptList(){
    var map = {
	    "key" : "value",
	    "sendingOuCode" : sendingOuCode
    };
    $.ajax({
	type : "post",
	dataType : "json",
	async : true,
	url : "/ajax/civilservice/csw.do",
	data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "b20wNjAuc2VsZWN0Ym94RGVwdExpc3Q=", map),
	success : function(data){
	    var prePCode="";
	    var $selectId=$("#csdbst_StatsSrchRequstSe");
	    $selectId.empty();
	    var selectValue = "<option value='all' >부서선택</option>";	    
	    
	    $.each(data, function(key, val){ 
		if(prePCode != val.PARENTOUCODE){
		    selectValue += "<optgroup label='"+val.POU+"'>";
		}
		if(val.USE_YN =="Y" && sendingOuCode !=""){
		    selectValue += "<option value='"+val.OUCODE+"'>" + val.OU + "</option>";
		}
		prePCode=val.PARENTOUCODE;
	    });
	    $selectId.append(selectValue);
	    if(sendingOuCode !=""){
	   $selectId.val(sendingOuCode); // 부서 셋팅
	    }
	    $selectId.trigger("change");
	},
	error : function(dData, status, err)
	{	
	    networkErrorHandler(dData, status, err);
	}	
    });
}

//charger list
function setSelectboxChargerList(){
    var map = {
	    "key" : "value",
	    "oucode" : sendingOuCode
    };	

    $.ajax({
	type : "post",
	dataType : "json",
	async : true,
	url : "/ajax/civilservice/csw.do",
	data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "b20wNjEuc2VsZWN0Ym94Q2hhcmdlckxpc3Q=", map),
	success : function(data){
	    var prePCode="";
	    var $selectId=$("#csdbst_StatsSrchDbSe");
	    $selectId.empty();
	    var selectValue = "<option value='all' >담당자선택</option>";
	   
	    $.each(data, function(key, val){ 
/*		if(prePCode != val.PARENTOUCODE){
		selectValue += "<optgroup label='"+val.POU+"'>";
		}*/
		if(val.USE_YN =="Y" && sendingOuCode!=""){
//		    selectValue += "<option value='"+val.UID_+"'>" + val.NAMEPOSITION + "</option>";
		    selectValue += "<option value='"+val.UID_+"'>" + val.DISPLAYNAME + "</option>";
		}
		
		prePCode=val.PARENTOUCODE;
	    });
	    $selectId.append(selectValue);
	},
	error : function(dData, status, err)
	{
	    networkErrorHandler(dData, status, err);
	}	
    });
}

//search 
function StatsSrchSearch_clickEvent(){
    $("#csdbst_tblStatsSttusList").jqGrid("setGridParam", {postData : {pJson : getJsonStrStatsSttusList()}, page : 1, sortname : "TOT", sortorder : "DESC"});
    $("#csdbst_tblStatsSttusList").trigger("reloadGrid");
    
    $("#csdbst_tblStatsSttusList_Dept").jqGrid("setGridParam", {postData : {pJson : getJsonStrStatsSttusList()}, page : 1, sortname : "TOT", sortorder : "DESC"});
    $("#csdbst_tblStatsSttusList_Dept").trigger("reloadGrid");
}

//init
function StatsSrchInit_clickEvent(){
    //setchargerInit();
    //setSelectboxDept();
    initStatsDate();
    $("#csdbst_StatsSrchRequstAt").val("");
    $("#csdbst_tblStatsSttusList").jqGrid("setGridParam", {postData : {pJson : getJsonStrStatsSttusList()}, page : 1, sortname : "TOT", sortorder : "DESC"});
    $("#csdbst_tblStatsSttusList").trigger("reloadGrid");
}


function initStatsDate(){
    datePicker("#csdbst_StatsSrchSelFrDate");
    datePicker("#csdbst_StatsSrchSelToDate");
    $("#csdbst_StatsSrchSelFrDate").val(getDate1());
    $("#csdbst_StatsSrchSelToDate").val(getDate());
}

//dept init setting
function setchargerInit(){
    var $selectId=$("#csdbst_StatsSrchDbSe");
    $selectId.html("");
    var selectValue = "";
    selectValue += "<option value='all'>담당자선택</option>";
    $selectId.append(selectValue);
}

//파라미터 셋팅 counselListExcel
function getJsonStrStatsListExcel(){

    if($("#csdbst_StatsSrchDbSe").val()!="all"){
	statUsr_id = $("#csdbst_StatsSrchDbSe").val();}	

    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTUuY25sdFN0YXRpc3RpY3NMaXN0",
	    "map" : {
		"key" : "value",
		"frDt" : $("#csdbst_StatsSrchSelFrDate").val().replace(/[-, :, \s]/g,""),
		"toDt" : $("#csdbst_StatsSrchSelToDate").val().replace(/[-, :, \s]/g,""),
		"oucode" : window.sessionStorage.getItem("CC_AUTH") == "Y" ? "all" : sendingOuCode, 
		"uid" : $("#csdbst_StatsSrchDbSe").val(),
		"orgFulNm" : $("#csdbst_StatsSrchRequstAt").val(),
		"checkboxYN" : $("#csdbst_chkStaticsDeptAllCount").is(":checked") ? true : false,
		"title" : "상담DB요청처리_전체_현황" + setDownLoadName($("#csdbst_StatsSrchSelFrDate").val(), $("#csdbst_StatsSrchSelToDate").val()),
		"colWidth" : [30, 15, 20, 15, 15, 15, 15, 15],
		"colName" : ["OU","DISPLAYNAME", "TOT", "NEW_REQ", "MOD_REQ", "DEL_REQ", "FNS_REQ", "RTN_REQ"],
		"colHeader" : [ "부서명", "담당자", "총건수","신규", "수정", "삭제", "처리완료", "반송"],
		"colAlign" : ["center","center", "center", "center", "center", "center", "center", "center" ]
	    }
    };
    
    if ($("#csdbst_chkStaticsDeptAllCount").is(":checked")) {
		loParam.map.title = "상담DB요청처리 부서별 통계현황("+$("#csdbst_StatsSrchSelFrDate").val()+"~"+$("#csdbst_StatsSrchSelToDate").val()+")"
		loParam.map.colWidth.splice(1,1);
		loParam.map.colName.splice(1,1);
		loParam.map.colHeader.splice(1,1);
		loParam.map.colAlign.splice(1,1);
		return  encodeURIComponent(JSON.stringify(loParam));
	} else {
		return  encodeURIComponent(JSON.stringify(loParam));
	};
}

//excel다운
function StatsSrchExceldown_clickEvent(){
    excelDownLoad("/excel/civilservice/cswDbManage_statistics.do", getJsonStrStatsListExcel());
}

//function dbManage_DeptList_TextChangeEvent(){
//    $("#csdbst_StatsSrchRequstAt").autocomplete({
//	maxShowItems: 5,
//	source : function( request, response ) {
//	    $.ajax({
//		type: 'post',
//		url: "/ajax/civilservice/csw.do",
//		dataType: "json",
//		data: "pJson=" +  getJsonStr("c2VsZWN0TGlzdA==", "b20wNjAuY25zbHREYlN0YXRpc3RpY3NEZXB0TGlzdA==", {
//		    "key" : "value",
//		    "deptname" :$("#csdbst_StatsSrchRequstAt").val()
//		}),
//		success: function(data) {	                   
//		    response( 
//			    $.map(data, function(item) {	                            
//				return {
//				    label: (item.OU),
//				    value: item.OU,
//				    id : item
//				}
//			    })
//		    );
//		}, error:function(e){  
//		    alert("자동완성을 사용할 수 없습니다.");  
//		}  
//	    });
//	},
//	minLength: 1,
//	focus: function( event, ui ) {
//	    return false; 
//	},
//	select: function( event, ui ) {
//	    //uid =ui.item.id.UID_;
//	   deptCode =ui.item.id.OUCODE;
//	   $("#csdbch_deptVal").val(deptCode);
//	}
//    });
//}

function screenStatistics(){

//	if (window.sessionStorage.getItem("CC_AUTH") == "Y") {
//		sendingOuCode = "";
//	};
//	if(sendingOuCode==""){
//	    $("#csdbst_StatsSrchDbSe").attr('disabled', true);
//	}
    
    setSelectboxDeptList();
    initStatsDate();
    setchargerInit();
    //$("#csdbst_StatsSrchRequstSe").val(sendingOuCode);
    
    $("#csdbst_tblStatsSttusList").jqGrid({
	url : "/jqgrid/civilservice/csw.do",
	datatype : "json",
	mtype : "POST",
	postData : {
	    pJson : getJsonStrStatsSttusList()
	},
	jsonReader :
	{
	    repeatitems: false
	},
	colNames : ["번호", "부서코드", "담당부서", "담당자", "총건수", "사용자ID", "부서ID", "기관ID","신규", "수정", "삭제", "처리완료", "반송"],
	colModel :
	    [
	     { name : "COMM_ID", index : "COMM_ID", hidden : true },
	     { name : "OUCODE", index : "OUCODE", align : "center", width : 160, hidden : true },
	     { name : "OU", index : "OU", align : "center", width : 160 },
	     { name : "DISPLAYNAME", index : "DISPLAYNAME", align : "center", width : 160 },
	     { name : "TOT", index : "TOT", align : "center", width : 160 },
	     { name : "UID_", index : "UID_", hidden : true },
	     { name : "OUCODE", index : "OUCODE", hidden : true },
	     { name : "PARENTOUCODE", index : "PARENTOUCODE", hidden : true },
	     { name : "NEW_REQ", index : "NEW_REQ", align : "center", width : 160 },
	     { name : "MOD_REQ", index : "MOD_REQ", align : "center", width : 160 },
	     { name : "DEL_REQ", index : "DEL_REQ", align : "center", width : 160 },
	     { name : "FNS_REQ", index : "FNS_REQ", align : "center", width : 160 },
	     { name : "RTN_REQ", index : "RTN_REQ", align : "center", width : 160 }
	     ],
	     sortname : "OUCODE",
	     sortorder : "desc",
	     gridview : true,
	     hidegrid : false,
	     shrinkToFit : true,
	     loadonce : false,
	     scrollOffset : 0,
	     height : "700",
	     width : "100%",
	     rowNum : 25,
	     rowList : [7, 15, 25, 50, 100],
	     autowidth : true,
	     pager : "#csdbst_pgStatsSttusList",
	     pgbuttons : true,
	     rownumbers : true,
	     rownumWidth : 30,
	     multiselect : false,
	     emptyrecords : "",
	     caption : "",
	     loadui : "enable",
	     viewrecords : true,
    }).jqGrid("navGrid", "#csdbst_pgStatsSttusList", {edit : false, add : false, del : false, search : false});
    
    $("#csdbst_StatsSrchRequstSe").bind("change", setSelectboxChargerList);
    $("#csdbst_StatsSrchSearch").bind("click", StatsSrchSearch_clickEvent);
    $("#csdbst_StatsSrchInit").bind("click", StatsSrchInit_clickEvent);
    $("#csdbst_StatsSrchExcelDown").bind("click", StatsSrchExceldown_clickEvent);
//	$("#csdbst_StatsSrchRequstAt").bind("keydown", dbManage_DeptList_TextChangeEvent);
	$("#csdbst_StatsSrchRequstAt").bind("keydown", function(key) {
		if (key.keyCode == 13) StatsSrchSearch_clickEvent();
	});
	
	if (window.sessionStorage.getItem("CC_AUTH") != "Y") {
		$("#csdbst_chkStaticsDeptAllCount").parent().hide();
	};
	
	$("#csdbst_deptStatistics").hide();
	
	// 부서별 통계 체크이벤트 등록
	$("#csdbst_chkStaticsDeptAllCount").bind("change", csdbstChkStaticsDeptAllCount);
}

function csdbstChkStaticsDeptAllCount() {
	 if($("#csdbst_chkStaticsDeptAllCount").is(":checked")) {
		    setTblStatsSttusListDept();
	    	$("#csdbst_allStatistics").hide();
	    	$("#csdbst_deptStatistics").show();
	 } else {
	    	$("#csdbst_allStatistics").show();
	    	$("#csdbst_deptStatistics").hide();
	 };
}

function setTblStatsSttusListDept() {
	$("#csdbst_tblStatsSttusList_Dept").jqGrid({
		url : "/jqgrid/civilservice/csw.do",
		datatype : "json",
		mtype : "POST",
		postData : {
		    pJson : getJsonStrStatsSttusList()
		},
		jsonReader :
		{
		    repeatitems: false
		},
		colNames : ["번호", "부서코드", "담당부서", "총건수", "부서ID", "기관ID","신규", "수정", "삭제", "처리완료", "반송"],
		colModel :
		    [
		     { name : "COMM_ID", 	index : "COMM_ID", 		hidden : true },
		     { name : "OUCODE", index : "OUCODE", align : "center", width : 195, hidden : true },
		     { name : "OU",	 	index : "OU", 			align : "center", 	width : 190 },
		     { name : "TOT", 		index : "TOT", 			align : "center", 	width : 190 },
		     { name : "OUCODE", 	index : "OUCODE", 		hidden : true },
		     { name : "PARENTOUCODE",	index : "PARENTOUCODE",	 	hidden : true },
		     { name : "NEW_REQ", 	index : "NEW_REQ", 		align : "center",	width : 195 },
		     { name : "MOD_REQ", 	index : "MOD_REQ", 		align : "center",	width : 195 },
		     { name : "DEL_REQ", 	index : "DEL_REQ", 		align : "center",	width : 195 },
		     { name : "FNS_REQ",	index : "FNS_REQ",		align : "center", 	width : 195 },
		     { name : "RTN_REQ", 	index : "RTN_REQ", 		align : "center",	width : 195 }
		     ],
		     sortname : "OUCODE",
		     sortorder : "desc",
		     gridview : true,
		     hidegrid : false,
		     shrinkToFit : true,
		     loadonce : false,
		     scrollOffset : 0,
		     height : "700",
		     width : "100%",
		     rowNum : 25,
		     rowList : [7, 15, 25, 50, 100],
		     autowidth : true,
		     pager : "#csdbst_pgStatsSttusList_Dept",
		     pgbuttons : true,
		     rownumbers : true,
		     rownumWidth : 30,
		     multiselect : false,
		     emptyrecords : "",
		     caption : "",
		     loadui : "enable",
		     viewrecords : true,
	    }).jqGrid("navGrid", "#csdbst_pgStatsSttusList_Dept", {edit : false, add : false, del : false, search : false});
}
