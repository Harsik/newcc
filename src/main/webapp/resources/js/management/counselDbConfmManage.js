var g_popup="CHILD";
var g_dept_cd = "";
var g_parent_cd = "";
//counselDbConfm List
var toggle = true;
var oucode="";

function getJsonStrCounselDbComfmManageList() {
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTUuY291bnNlbERiQ29tZm1NYW5hZ2VMaXN0",
	    "map" : {
		"frDate" : $("#cscfmg_srchSelFrDate").val().replace(/[-, :, \s]/g,""),
		"toDate" : $("#cscfmg_srchSelToDate").val().replace(/[-, :, \s]/g,""),
		"cc_appr_yn": $("#cscfmg_srchConfmSe").val(),
		"deptSe"    : oucode,
		// "ctg_ex_cd" : $("#cscfmg_srchCounselTy1").val(),
		// "ctg_lg_cd" : $("#cscfmg_srchCounselTy2").val(),
		// "ctg_md_cd" : $("#cscfmg_srchCounselTy3").val(),
		// "ctg_sd_cd" : $("#cscfmg_srchCounselTy4").val(),
		"ctg_lg_cd" : $("#cscfmg_srchCounselTy1").val(),
		"ctg_md_cd" : $("#cscfmg_srchCounselTy2").val(),
		"ctg_sd_cd" : $("#cscfmg_srchCounselTy3").val(),
		"srchVal" : $("#cscfmg_srchCounseJobNm").val(),
		"srchStat" : $("#cscfmg_srchStat").val()
	    }
    };
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(JSON.stringify(loParam));	
}

//counselDbConfm click event
function CounselDbComfmManage_clickEvent() {
    $("#cscfmg_tblCounselDbComfm").jqGrid("setGridParam", {postData : { pJson : getJsonStrCounselDbComfmManageList()},page : 1,sortname : "CRT_DT desc, CRT_TM",sortorder : "desc" });
    $("#cscfmg_tblCounselDbComfm").trigger("reloadGrid");
}


function chkNotLowLevDept_clickEvent() 
{
	$("#cscfmg_tblInCorp").jqGrid("setGridParam", { postData :  {pJson : getJsonAdminAgencyUserList()}, sortname : "USR_NM", sortorder : "asc"});
	$("#cscfmg_tblInCorp").trigger("reloadGrid");
}

//파라미터 셋팅_getJsonTeamList
function getJsonTeamList(parentCd)
{
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wNjAuYWRtaW5BZ2VuY3lMaXN0",   // 조직에 속한 하위 부서만 조회
	    "map" : {
		"key" : "value",
		"parentCd" : parentCd == '0' ? null : parentCd,
			"g_cntrFlag" : '010000'
	    }
    };

    console.log(JSON.stringify(loParam));
    return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

/*function fn_TeamList(g_cntrFlag){
    $.jstree.destroy ();
    // 팀 리스트 트리 구조
    $.ajax({
	type : "post",
	async : false,
	url : getContextPath() + "/ajax/counsel/teamUsrList.do",
	data : "pJson=" + getJsonTeamList('0'),
	success : function(data)
	{

	    $("#cscfmg_listTeam").html("");			

	    if(jr != '')
	    {
		var jr = JSON.parse(data);
		console.log(JSON.stringify(jr));
		jr['0']['text']="기관";
		$("#cscfmg_listTeam").jstree({ "core": { "data": jr, "multiple" : false } }).bind("loaded.jstree", 
			function (event, data) {  
		    //$("#cscfmg_listTeam").jstree("select_node", "#cscfmg_6500000"); 
		    $("#cscfmg_listTeam").jstree("open_node", "#cscfmg_6500000"); 
		});

	    }
	},
	error : function(data, status, err) 
	{
	    networkErrorHandler(data, status, err);
	}
    });

    // tree node select event
    $("#cscfmg_listTeam").bind("select_node.jstree", function(event, data)
	    {
	oucode = data.node.id; 
	$( "#cscfmg_MnnstDept").val( data.node.text);
	$("#cscfmg_listTeam").hide();

	    });	
}*/

function getJsonAdminAgencyUserList() 
{	
    var loParam = {};
    loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wNjEuYWRtaW5BZ2VuY3lVc2VyTGlzdA==",
	    "map" : {
		"key" : "value",
		"deptId" : g_dept_cd,
		"parentCd" : (g_parent_cd == "#cscfmg_") ? "0" : g_parent_cd,
			"notLowLev" : false,
			"affairs" : "",
			"notuse" : false
	    }
    };

    console.log(JSON.stringify(loParam));
    return  encodeURIComponent(JSON.stringify(loParam));
}



//counselDbConfm setDeptList
/*function setSelectboxDeptList() {
    var map = {"key" : "value"};
    $.ajax({
	type : "post",
	dataType : "json",
	async : true,
	url : getContextPath() + "/ajax/dept/deptrList.do",
	data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "b20wNjAuY291bnNlbERiQ29tZm1NYW5hZ2VEZXB0TGlzdA==", map),
	success : function(data){
	    var prePCode="";
	    var $selectId=$("#cscfmg_srchDeptSe");
	    var selectValue = "<option value='all' >부서선택</option>";
	    $.each(data, function(key, val){ 
		if(prePCode != val.PARENTOUCODE){
		    selectValue += "<optgroup label='"+val.POU+"'>";
		}
		if(val.USE_YN =="Y"){
		    selectValue += "<option value='"+val.OUCODE+"'>" + val.OU + "</option>";
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
}*/

//initialization
function chargerSrchInit_clickEvent(){
    initDate();
    $("#cscfmg_srchStat").val("030100");
    $("#cscfmg_srchConfmSe").val("N");
    $("#cscfmg_MnnstDept").val("");
    oucode="";
   /* $("#cscfmg_listTeam").hide();
     toggle=!toggle;*/
    //$("#cscfmg_srchConfmSe").val("N");
    $("#cscfmg_srchDeptSe").val("all");
    $("#cscfmg_srchCounseJobNm").val("");
    // $("#cscfmg_srchCounselTy1, #cscfmg_srchCounselTy2, #cscfmg_srchCounselTy3, #cscfmg_srchCounselTy4").val("all");
    $("#cscfmg_srchCounselTy1, #cscfmg_srchCounselTy2, #cscfmg_srchCounselTy3").val("all");
    $("#cscfmg_tblCounselDbComfm").jqGrid("setGridParam", {postData : {pJson : getJsonStrCounselDbComfmManageList() }, page : 1, sortname : "CRT_DT desc, CRT_TM", sortorder : "desc"});
    $("#cscfmg_tblCounselDbComfm").trigger("reloadGrid");
}

//counselDbConfm excelList
function getJsonStrCommentListExcel() {
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTUuY291bnNlbERiQ29tZm1NYW5hZ2VMaXN0",
	    "map" : {
		"key" : "value",
		"frDate" : $("#cscfmg_srchSelFrDate").val().replace(/[-, :, \s]/g,""),
		"toDate" : $("#cscfmg_srchSelToDate").val().replace(/[-, :, \s]/g,""),
		"cc_appr_yn": $("#cscfmg_srchConfmSe").val(),
		"deptSe"    : $("#cscfmg_srchDeptSe").val(),
		// "ctg_ex_cd" : $("#cscfmg_srchCounselTy1").val(),
		// "ctg_lg_cd" : $("#cscfmg_srchCounselTy2").val(),
		// "ctg_md_cd" : $("#cscfmg_srchCounselTy3").val(),
		// "ctg_sd_cd" : $("#cscfmg_srchCounselTy4").val(),
		"ctg_lg_cd" : $("#cscfmg_srchCounselTy1").val(),
		"ctg_md_cd" : $("#cscfmg_srchCounselTy2").val(),
		"ctg_sd_cd" : $("#cscfmg_srchCounselTy3").val(),
		"srchVal" : $("#cscfmg_srchCounseJobNm").val(),
		"title" : "상담DB승인관리" + setDownLoadName($("#cscfmg_srchSelFrDate").val(), $("#cscfmg_srchSelToDate").val()),
		"colWidth" : [15, 15, 60, 20, 20, 15, 15],
		"colName" : ["DEPT_NM","REQUST", "TBBS_TTL", "MOD_DTTM", "ACT_DTTM", "PROGRS", "CC_APPR_YN_NM"],
		"colHeader" : [ "부서명", "요청구분", "업무명","요청일", "처리일자", "처리상태","승인구분"],
		"colAlign" : ["center","center", "center", "center", "center", "center", "center"]
	    }
    };
    console.log(JSON.stringify(loParam));
    return  encodeURIComponent(JSON.stringify(loParam));
}

//excel download
function StatsSrchExceldown_clickEvent(){
    excelDownLoad(getContextPath() + "/excel/management/counselDbConfmManage.do", getJsonStrCommentListExcel());
}

function initDate(){
    datePicker("#cscfmg_srchSelFrDate");
    datePicker("#cscfmg_srchSelToDate");
//    $("#cscfmg_srchSelFrDate").val(getAddDate(getDate(),-7)); //7일전 날짜 셋팅
    $("#cscfmg_srchSelFrDate").val(getPrvDay("M",2,"-")); //2달전 날짜 셋팅 20.06.19
    $("#cscfmg_srchSelToDate").val(getDate());
}

function popupEvent(reqId, tblId, wrkId, reqCd){
    var width = 1050;
    var height = 910;
    var top = 0;
    var left = Math.ceil((window.screen.width - width)/2);
    // var top = Math.ceil((window.screen.height - height)/2);

    var paramURL = getContextPath() + "/web/management/counselDbConfmDetail.do?reqId="+reqId+"&tblId="+tblId+"&wrkId="+wrkId;
    var option = "width=" + width + ", height=" + height
    + ", toolbar=no, directories=no, scrollbars=auto, location=no, resizable=no, status=no,menubar=no, top="
    + top + ",left=" + left +"";

    var newWindow = window.open(paramURL, "상담DB상세내용", option);
    newWindow.focus();
    
}



//Init Page 
$(document).ready(function(){
    //fn_TeamList();
    initDate();
    //setSelectboxDeptList();
//    $("#cscfmg_listTeam").hide();
    /*    
    $("#cscfmg_srchDeptSe").bind("click",function(e){
	if(toggle){$("#cscfmg_listTeam").show();
	}else{$("#cscfmg_listTeam").hide();}
	toggle=!toggle;
    });
    
    $(document).mouseup(function (e){
	var container = $("#cscfmg_listTeam");
	if(container.has(e.target).length === 0 && e.target.id!="srchDeptSe"){
	    container.hide();
	    toggle=true;
	    }
    })*/
    
    setObjectSelectBoxWithCode("cscfmg_srchCounselTy1", "전체", "1", g_popup, "00000000", "", "CHANGE");	
    setObjSelectBoxWithCode("cscfmg_srchStat", "전체", "90301", g_popup, "90301", "");
    $("#cscfmg_srchStat").val("030100");
    $("#cscfmg_srchCounselTy1").bind("change", function(){
	setObjectSelectBoxWithCode("cscfmg_srchCounselTy2", "전체", "2", g_popup, $("#cscfmg_srchCounselTy1").val(),"", "CHANGE");
	});
    $("#cscfmg_srchCounselTy2").bind("change", function(){
	setObjectSelectBoxWithCode("cscfmg_srchCounselTy3", "전체", "3", g_popup, $("#cscfmg_srchCounselTy2").val(),"", "CHANGE");
	});	
    // $("#cscfmg_srchCounselTy3").bind("change", function(){
    // setObjectSelectBoxWithCode("srchCounselTy4", "전체", "4", g_popup, $("#cscfmg_srchCounselTy3").val(),"", "");
    // });
    
    //classification initialization 
    $("#cscfmg_srchCounselTy1").trigger("change");

    //jqgrid
    $("#cscfmg_tblCounselDbComfm").jqGrid({
	url : getContextPath() + "/jqgrid/management/counselDbConfmManage.do",
	datatype : "json",
	mtype : "POST",
	postData : {
	    pJson : getJsonStrCounselDbComfmManageList()
	},
	jsonReader : {
	    repeatitems: false
	},
	colNames : ["번호","게시물ID","WRK_ID","CDB_REQ_GB_CD","부서명","요청구분","제목","요청일","처리일자","처리상태", "승인구분"],
	colModel :
	    [
	     { name : "REQ_ID", index : "REQ_ID", hidden : true },
	     { name : "TBBS_ID", index : "TBBS_ID", hidden : true },
	     { name : "WRK_ID", index : "WRK_ID", hidden : true },	     
	     { name : "CDB_REQ_GB_CD", index : "CDB_REQ_GB_CD", hidden : true },
	     { name : "DEPT_NM", index : "DEPT_NM", align : "center", width : 60 },
	     { name : "REQUST", index : "REQUST", align : "center", width : 40 },
	     { name : "TBBS_TTL", index : "TBBS_TTL", align : "left", width : 200, cellattr: function ( rowId , tv , rowObject , cm , rdata){
			if(rowObject.TBBS_TTL =="등록이 완료되지 않았습니다.") return 'style="color:blue;"'; } },
	     { name : "CRT_DTTM", index : "CRT_DTTM", align : "center", width : 80 },
	     { name : "ACT_DTTM", index : "ACT_DTTM", align : "center", width : 80 },
	     { name : "PROGRS", index : "PROGRS", align : "center", width : 60 },
	     { name : "CC_APPR_YN_NM", index : "CC_APPR_YN", align : "center", width : 50 , cellattr: function ( rowId , tv , rowObject , cm , rdata){
		if(rowObject.CC_APPR_YN_NM =="미승인")
		 return 'style="color:red;"' 
	            } }
	     ],		
	     sortname : "CRT_DT desc, CRT_TM",
	     sortorder : "desc",
	     gridview : true,
	     hidegrid : false,
	     shrinkToFit : true,
	     loadonce : false,
	     scrollOffset : 0,
	     height : "624",
	     width : "100%",
	     rowNum : 24,
	     rowList : [25, 50, 70, 100],
	     autowidth : true,
	     pager : "#cscfmg_pgCounselDbComfm",
	     rownumbers : true,
	     rownumWidth : 30,
	     multiselect : false,
	     emptyrecords : "",
	     caption : "",
	     loadui : "enable",
	     viewrecords: true,
	     ondblClickRow : function(rowid){
		 var row = $("#cscfmg_tblCounselDbComfm").getRowData(rowid);
		 if(row.TBBS_TTL!="등록이 완료되지 않았습니다." && row.TBBS_TTL!="등록된 게시물이 없습니다."){
		     popupEvent(row.REQ_ID, row.TBBS_ID, row.WRK_ID, row.CDB_REQ_GB_CD)
		 }else if(row.TBBS_TTL=="등록이 완료되지 않았습니다."){
		     alert("등록이 완료되지 않았습니다.")
		 }else if(row.TBBS_TTL=="등록된 게시물이 없습니다."){
		     alert("등록된 게시물이 없습니다.")
		 }
	     }
    }).jqGrid("navGrid", "#cscfmg_pgCounselDbComfm", {edit : false, add : false, del : false, search : false});

    $("#cscfmg_srchBtnSearch").bind("keydown", function(e) {if (e.keyCode == 13) CounselDbComfmManage_clickEvent();});
    // add event to this 
    $("#cscfmg_srchBtnSearch").bind("click", CounselDbComfmManage_clickEvent);
    $("#cscfmg_srchBtnSrchInit").bind("click", chargerSrchInit_clickEvent);
    $("#cscfmg_srchBtnExcelDown").bind("click", StatsSrchExceldown_clickEvent);
    $("#cscfmg_MnnstDept").bind("click", function(){$( "#cscfmg_MnnstDept").val("");oucode="";});

});

$(function(){
    $("#cscfmg_MnnstDept").autocomplete({
	source : function( request, response ) {
	    $.ajax({
		type: 'post',
		url: "/ajax/myinfo/jisikReword.do",
		dataType: "json",
		data: "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "b20wNjAuRGJDb25mbU1hbmFnZUxpc3Q==",  {
		    "key" : "value",
		    "orgfullname" : $( "#cscfmg_MnnstDept").val(),  
		}),
		success: function(data) {	                   
		    response($.map(data, function(item) {	                            
			return {
			    label: item.ORGFULLNAME,
			    value: item.OU,
			    id : item
			}
		    })
		    );
		}, error:function(e){  
		    alert("자동완성을 사용할 수 없습니다.");  
		}  
	    });
	},
	minLength: 1,
	focus: function(event, ui) {
	    return false; 
	},
	select: function(event, ui) {
	    oucode =ui.item.id.OUCODE;					// 부서코드
	}
    });
});
