//init page
$(document).ready(function(){
	// 상담유형 셋팅
	selCounselType();
	
	// 그리드 셋팅
	setGrid();
	
	// 조회
	$("#csdbcg_btnJisikSearch").bind("click", btnSearchClickEvent);
	
	$("#csdbcg_tfSrchVal").bind("keydown", function(e){
		if(e.keyCode == 13) btnSearchClickEvent();
	});
	
	// 초기화
	$("#csdbcg_btnJisikInit").bind("click", btnInitClickEvent);
	
	// 일괄변경
	$("#csdbcg_btnAllChange").bind("click", btnAllChangeClickEvent);
});

// 검색
var srchVal = "";
var srchType = "ttl";

function btnSearchClickEvent(){
	$("#csdbcg_tblJisikSearch").jqGrid("setGridParam", {postData : {pJson : getJsonStrJisikList()}, sortname : "TBBS_INQR_CNT", sortorder : "desc"});
    $("#csdbcg_tblJisikSearch").trigger("reloadGrid");
}

function getJsonStrJisikList(){
	srchType = $("#csdbcg_tfSrchType").val();
	srchVal  = $("#csdbcg_tfSrchVal").val();
		
	var loParam = {
		    "qt" : "c2VsZWN0TGlzdA==",
		    "mi" : "b20wMTAuc2VsZWN0SmlzaWtMaXN0",
		    "map" : {
			"ctg_lg_cd" : $("#csdbcg_optCounselKnd1").val(), 
			"ctg_md_cd" : $("#csdbcg_optCounselKnd2").val(),
			"ctg_sm_cd" : $("#csdbcg_optCounselKnd3").val(),
			"cdb_gb_cd" : "all", // 040101 : 상담DB, 040102 : 참고DB, 040103 : 기타
			"srch_type" : srchType,
			"srch_val" : separatorCheck(srchVal,' '),
			"show_all" : false,
			"chkNotUsetype": "all"
		    }
	    };
	    console.log(JSON.stringify(loParam));
	    return encodeURIComponent(JSON.stringify(loParam));	
}

function setGrid(){
	$("#csdbcg_tblJisikSearch").jqGrid({
		url : getContextPath() + "/jqgrid/main/jisikList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
	        pJson : getJsonStrJisikList()
		},
		jsonReader : {
		    repeatitems: false
		},
		colNames : ["번호","대분류","대분류","중분류","소분류","상담유형", "제목", "수정일", "조회수"],
		colModel :
		    [
		     { name : "TBBS_ID", index : "TBBS_ID", hidden : true },
		     { name : "INST_CD", index : "INST_CD", hidden : true },
		     { name : "INTV_LG_CD", index : "INTV_LG_CD", hidden : true },
		     { name : "INTV_MD_CD", index : "INTV_MD_CD", hidden : true },
		     { name : "INTV_SM_CD", index : "INTV_SM_CD", hidden : true },
		     { name : "INTV_NM", index : "INTV_NM", align : "left", width : 280 },
		     { name : "TBBS_TTL", index : "TBBS_TTL", align : "left", width : 400},
		     { name : "MOD_DTTM", index : "MOD_DTTM", align : "center", width : 130},
		     { name : "TBBS_INQR_CNT", index : "TBBS_INQR_CNT", align : "center", width : 50 }
		     ],		
		     sortname : "TBBS_INQR_CNT",
		     sortorder : "desc",
		     gridview : true,
		     hidegrid : false,
		     shrinkToFit : true,
		     loadonce : false,
		     scrollOffset : 0,
		     height : "650",
		     width : "100%",
		     rowNum : 25,
		     rowList : [25, 50, 70, 100],
		     autowidth : true,
		     pager : "#csdbcg_pgJisikSearch",
		     rownumbers : true,
		     rownumWidth : 30,
		     multiselect : true,
		     emptyrecords : "",
		     caption : "",
		     loadui : "enable",
		     viewrecords: true,
		     ondblClickRow : function(rowid){
			 var row = $("#csdbcg_tblJisikSearch").getRowData(rowid);
			 showDetailJisik(row.TBBS_ID);
		     }
	    }).jqGrid("navGrid", "#csdbcg_pgJisikSearch", {
		edit : false, add : false, del : false, search : false
	    });
	
	    //화면 넓이에 따라 그리드 넓이 조절
		$(window).bind('resize', function() {
		    jQuery("#csdbcg_tblJisikSearch").setGridWidth($("#divRCTabSearch").width(), true);
		}).trigger('resize');
}

function btnInitClickEvent(){
	$("#csdbcg_optCounselKnd1,#csdbcg_optCounselKnd2,#csdbcg_optCounselKnd3").val("all");
	$("#csdbcg_optLgCd,#csdbcg_optMdCd,#csdbcg_optSmcd").val("all");
	$("#csdbcg_tfSrchType").val("ttlCntn");
	$("#csdbcg_tfSrchVal").val("");
	
	btnSearchClickEvent();
}

function btnAllChangeClickEvent(){
	var optLgNm = $("#csdbcg_optLgCd option:selected").text();
	var optMdNm = $("#csdbcg_optMdCd option:selected").text();
	var optSmNm = $("#csdbcg_optSmcd option:selected").text();
	var fullCdNm = optLgNm + " > " + optMdNm + " > " + optSmNm
	
	if($("#csdbcg_optLgCd").val() == "all") {
		alert("대분류를 선택하여 주세요.");
		$("#csdbcg_optLgCd").focus();
		return false;
	}else if($("#csdbcg_optMdCd").val() == "all") {
		alert("중분류를 선택하여 주세요.");
		$("#csdbcg_optMdCd").focus();
		return false;
	}else if($("#csdbcg_optSmcd").val() == "all") {
		alert("소분류를 선택하여 주세요.");
		$("#csdbcg_optSmcd").focus();
		return false;
	}
	
	tbbsIds = [];
	
	var Rows = $("#csdbcg_tblJisikSearch").getRowData();
	for(var i = 0; i <= Rows.length; i++) {
		if(jQuery.isEmptyObject(Rows[i]))
			continue;
		if($("#jqg_csdbcg_tblJisikSearch_"+(i*1+1)).prop("checked")) {
			tbbsIds.push(Rows[i].TBBS_ID);
		}
	}
	
	if(tbbsIds.length == 0) {
		alert("상담DB를 선택해주세요.");
		return false;
	}
	
	if(!confirm(tbbsIds.length + "건을 "+fullCdNm+" (으)로 변경하시겠습니까?")) {
		return;
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/management/counselDbChange.do",
		data : "pJson=" + getJsonCounselDbChange(tbbsIds),
		success : function(data) {
			alert("일괄 변경되었습니다.");
			btnSearchClickEvent();
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
}
	
function getJsonCounselDbChange(tbbsIds){
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wMTAuY291bnNlbERiQWxsQ2hhbmdl",
		"map" : {
			"key" 		: "value",
			"tbbsIds" 	: tbbsIds,
			"ctg_lg_cd" : $("#csdbcg_optLgCd").val(),
			"ctg_md_cd" : $("#csdbcg_optMdCd").val(),
			"ctg_sm_cd" : $("#csdbcg_optSmcd").val(),
			"usr_id"	: window.sessionStorage.getItem("USR_ID")
		}
	};
		
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//지식검색 상세보기
function showDetailJisik(tbbsId){
    var width = 1100;
    var height = 900;
    var top = 0;
    var left = (screen.width - width) / 2;

    var paramURL = getContextPath() + "/web/main/jisikDetail.do?TBBS_ID=" + tbbsId+"&JOB=main&popup=CHILD";
    var option = "width=" + width + ", height=" + height
    + ", toolbar=no, directories=no, scrollbars=auto, location=no, resizable=no, status=no,menubar=no, top="
    + top + ",left=" + left +"";

    window.sessionStorage.setItem("TBBS_ID", tbbsId);
    window.sessionStorage.setItem("popup", "CHILD");
    
    // 21.06.24 지식검색 무한대로 띄우게 해달라는 요청
    //var newWindow = window.open(paramURL, "지식 검색", option);
    var newWindow = window.open(paramURL, "", option);
	newWindow.focus();
	return newWindow;
}

function selCounselType(){
	var g_popup = "CHILD";
	
	// 검색용 selectBox
	setObjectSelectBoxWithCode2("csdbcg_optCounselKnd1", "전체", "1", g_popup, "00000000", "all", "CHANGE");
    $("#csdbcg_optCounselKnd1").bind("change", function()
    {
       	setObjectSelectBoxWithCode2("csdbcg_optCounselKnd2", "전체", "2", g_popup, $("#csdbcg_optCounselKnd1").val(),"all","CHANGE");
    });
    $("#csdbcg_optCounselKnd2").bind("change", function()
    {
    	setObjectSelectBoxWithCode2("csdbcg_optCounselKnd3", "전체", "3", g_popup, $("#csdbcg_optCounselKnd2").val(),"all","CHANGE");
    });
    $("#csdbcg_optCounselKnd1").trigger("change");
    
    // 일괄 변경용 selectBox
    setObjectSelectBoxWithCode2("csdbcg_optLgCd", "전체", "1", g_popup, "00000000", "all", "CHANGE");	
    $("#csdbcg_optLgCd").bind("change", function()
    {
    	setObjectSelectBoxWithCode2("csdbcg_optMdCd", "전체", "2", g_popup, $("#csdbcg_optLgCd").val(),"all","CHANGE");
    });
	$("#csdbcg_optMdCd").bind("change", function()
	{
	    setObjectSelectBoxWithCode2("csdbcg_optSmcd", "전체", "3", g_popup, $("#csdbcg_optMdCd").val(),"all","CHANGE");
	});
	$("#csdbcg_optLgCd").trigger("change");
}