// var g_ctgExCd = "";
var g_ctgLgCd = "";
var g_ctgMdCd = "";
var g_ctgSmCd = "";
var g_cdbGbCd = "";
var g_srchType = "ttl";
var g_srchVal = "";
g_popup ="CHILD"
    
//파라미터셋팅 지식검색리스트  
function getJsonStrJisikList(ctgLgCd, ctgMdCd, ctgSmCd, cdbGbCd,srchType,srchVal) {
	if(srchVal==""){
		alert("검색어를 입력하셔야 합니다.");
		return false;
	}else{
		var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wMTAuc2VsZWN0SmlzaWtMaXN0",
			"map" : {
				"ctg_lg_cd" : ctgLgCd, 
				"ctg_md_cd" : ctgMdCd,
				"ctg_sm_cd" : ctgSmCd,
				"cdb_gb_cd" : cdbGbCd,
				"srch_type" : srchType,
				"chkNotUsetype" : $("#csdbsc_chkNotUsetype").val(),
				"srch_val" : separatorCheck(srchVal,' '),
				//"chkNotUsetype": "all"
			}
		};
		return encodeURIComponent(JSON.stringify(loParam));	
	}
}

//지식검색 상세보기
function showDetailJisik(tbbsId){
	var width = 900;
	var height = 900;
	var top = 0;
	var left = (screen.width - width) / 2;
	var paramURL = getContextPath() + "/web/main/jisikDetail.do?TBBS_ID=" + tbbsId+"&JOB=main" + "&popup=G-GCHILD";
	var option = "width=" + width + ", height=" + height+ ", toolbar=no, directories=no, scrollbars=auto, location=no, resizable=no, status=no,menubar=no, top=" + top + ",left=" + left +"";
	window.sessionStorage.setItem("TBBS_ID", tbbsId);
	var newWindow = window.open(paramURL, "지식 검색", option);
	newWindow.focus();
}
 
//조회버튼 클릭이벤트 
function btnJisikSearchClickEvent(){
	g_ctgLgCd = $("#csdbsc_optCounselKnd1").val();
	g_ctgMdCd = $("#csdbsc_optCounselKnd2").val();
	g_ctgSmCd = $("#csdbsc_optCounselKnd3").val();
	g_cdbGbCd = $("#csdbsc_optCdbKnd").val();
	g_srchType = $("#csdbsc_tfSrchType").val();
	g_srchVal = $("#csdbsc_tfSrchVal").val();

    $("#csdbsc_tblJisikSearch").jqGrid("setGridParam", {postData : {pJson : getJsonStrJisikList(g_ctgLgCd, g_ctgMdCd, g_ctgSmCd, g_cdbGbCd,g_srchType, g_srchVal)}, sortname : "TBBS_INQR_CNT", sortorder : "desc"});
	$("#csdbsc_tblJisikSearch").trigger("reloadGrid");
}

//지식검색 조회 후 메인 그리드 업데이트 
function btnJisikSearchClickEvent2(){
	g_ctgLgCd = $("#csdbsc_optCounselKnd1").val();
	g_ctgMdCd = $("#csdbsc_optCounselKnd2").val();
	g_ctgSmCd = $("#csdbsc_optCounselKnd3").val();
	g_cdbGbCd = $("#csdbsc_optCdbKnd").val();
	g_srchType = $("#csdbsc_tfSrchType").val();
	g_srchVal = $("#csdbsc_tfSrchVal").val();
	
    $("#csdbsc_tblJisikSearch").jqGrid("setGridParam", {postData : {pJson : getJsonStrJisikList(g_ctgLgCd, g_ctgMdCd, g_ctgSmCd, g_cdbGbCd, g_srchType, g_srchVal)}, sortname : "TBBS_INQR_CNT", sortorder : "desc"});
	$("#csdbsc_tblJisikSearch").trigger("reloadGrid");
}

//초기화버튼 클릭이벤트 
function btnJisikInitClickEvent(){ 
	//g_ctgExCd = "all";
	g_ctgLgCd = "all";
	g_ctgMdCd = "all";
	g_ctgSmCd = "all";
	g_cdbGbCd = "all";
	g_srchType = "ttlCntn";
	g_srchVal = "";
	$("#csdbsc_tfLgMdSmSearch_01").val("");
	$("#csdbsc_chkNotUsetype").val("all"),
	$("#csdbsc_optCounselKnd1").val(g_ctgLgCd);
	$("#csdbsc_optCounselKnd2").val(g_ctgMdCd);
	$("#csdbsc_optCounselKnd3").val(g_ctgSmCd);
	$("#csdbsc_optCdbKnd").val(g_cdbGbCd);
	$("#csdbsc_tfSrchType").val(g_srchType);
	$("#csdbsc_tfSrchVal").val("");
	
	initSelectData();
}

//셀렉트박스 데이터셋팅 
function initSelectData(){
    setObjectSelectBoxWithCode("csdbsc_optCounselKnd1", "전체", "1", g_popup, "00000000", "", "CHANGE");	
    setObjSelectBoxWithCode("csdbsc_optCdbKnd", "전체", "90303", g_popup, "90303", "");	   
}


$(document).ready(function(){
	initSelectData();	
	btnJisikInitClickEvent();
	
	$("#csdbsc_optCounselKnd1").bind("change", function(){
    $("#csdbsc_optCounselKnd2, #csdbsc_optCounselKnd3").empty();
	setObjectSelectBoxWithCode("csdbsc_optCounselKnd2", "전체", "2", g_popup, $("#csdbsc_optCounselKnd1").val(),"", "CHANGE");});
	$("#csdbsc_optCounselKnd2").bind("change", function(){
	$("#csdbsc_optCounselKnd3, #csdbsc_optCounselKnd4").empty();
	setObjectSelectBoxWithCode("csdbsc_optCounselKnd3", "전체", "3", g_popup, $("#csdbsc_optCounselKnd2").val(),"", "CHANGE");});	
	
	$("#csdbsc_optCounselKnd1").trigger("change");
	$("#csdbsc_btnJisikSearch").bind("click", btnJisikSearchClickEvent);
    $("#csdbsc_tfSrchVal").bind("keydown", function(e) {if (e.keyCode == 13) btnJisikSearchClickEvent();});
	$("#csdbsc_btnJisikInit").bind("click", btnJisikInitClickEvent);
	
	$("#csdbsc_tblJisikSearch").jqGrid({
		url : getContextPath() + "/jqgrid/main/jisikList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
            pJson : getJsonStrJisikList(g_ctgLgCd, g_ctgMdCd, g_ctgSmCd, g_srchVal)
		},
		jsonReader : {
			repeatitems: false
		},
        colNames : ["번호","대분류","대분류","중분류","소분류","상담유형", "제목","유형구분","등록일","수정일","조회수","승인구분"],
	   	colModel :
	   	[
	   	 	{ name : "TBBS_ID", index : "TBBS_ID", hidden : true },
	   	 	{ name : "INST_CD", index : "INST_CD", hidden : true },
	   	 	{ name : "INTV_LG_CD", index : "INTV_LG_CD", hidden : true },
	   	 	{ name : "INTV_MD_CD", index : "INTV_MD_CD", hidden : true },
	   	 	{ name : "INTV_SM_CD", index : "INTV_SM_CD", hidden : true },
	   	 	{ name : "INTV_NM", index : "INTV_NM", align : "left", width : 280 },
			{ name : "TBBS_TTL", index : "TBBS_TTL", align : "left", width : 400},
			{ name : "CDB_GB_NM", index : "CDB_GB_NM", align : "center", width : 80},
			{ name : "CRT_DT_FORMAT", index : "CRT_DT_FORMAT", align : "center", width : 80},
			{ name : "MOD_DT_FORMAT", index : "MOD_DT_FORMAT", align : "center", width : 80},
			{ name : "TBBS_INQR_CNT", index : "TBBS_INQR_CNT", align : "center", width : 50 },
			{ name : "ARR_YN", index : "ARR_YN", align : "center", width : 80},
	   	],		
	   	sortname : "TBBS_INQR_CNT",
	   	sortorder : "desc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "702",
	   	width : "100%",
	   	rowNum : 27,
	   	rowList : [25, 50, 70, 100],
	   	autowidth : true,
	   	pager : "#csdbsc_pgJisikSearch",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	ondblClickRow : function(rowid){
	   		var row = $("#csdbsc_tblJisikSearch").getRowData(rowid);
	   		opener.showDetailJisik2(row.TBBS_ID);
	   	}
	}).jqGrid("navGrid", "#csdbsc_pgJisikSearch", {edit : false, add : false, del : false, search : false});
});

$(function(){
	var selectid;
	var selIdSeq;
	$("#csdbsc_tfLgMdSmSearch_01").autocomplete({
		source : function( request, response ) {
			selectid=$(this.element).prop("id");
			arSelId=selectid.split('_');
			selIdSeq=arSelId[2]; // 1 -> 2로 변경
		     $.ajax({
		            type: 'post',
		            async : true,
		            url: getContextPath() + "/ajax/main/getCodeList.do",
		            dataType: "json",
		            data : "pJson=" + getJsonCodeList(selectid),
		            success: function(data) {
			 
		                //서버에서 json 데이터 response 후 목록에 뿌려주기 위함
		                response(
		                    $.map(data, function(item) {
		                        return { 
		                            label: (item.LNAME+" > "+item.MNAME+" > "+item.SNAME) ,
		                            value: $("#"+selectid).val(),
		                            hidVal:  (item.LCODE+"|"+item.MCODE+"|"+item.SCODE)
		                        };
		                    })
		                );
		            }
		       });
		    },
		//조회를 위한 최소글자수
		minLength: 2,
		select: function( event, ui ) {
			ui.item.value="";
		    var arItem=new Array(4);
		    // 만약 검색리스트에서 선택하였을때 선택한 데이터에 의한 이벤트발생
			arItem=(ui.item.hidVal.toString()).split('|');
			
			if(selIdSeq=="01"){
				$("#csdbsc_optCounselKnd1").val(arItem[0]).trigger("change");
				$("#csdbsc_optCounselKnd2").val(arItem[1]).trigger("change");
				$("#csdbsc_optCounselKnd3").val(arItem[2]);
			} 
		}
	});
}) 
