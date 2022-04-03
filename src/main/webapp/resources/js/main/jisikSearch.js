// var g_ctgExCd = "";
var g_ctgLgCd = "";
var g_ctgMdCd = "";
var g_ctgSmCd = "";
var g_cdbGbCd = "";
var g_srchType = "ttl";
var g_srchVal = "";

//파라미터셋팅 지식검색리스트  --- jsh, 기관코드 추가
// function getJsonStrJisikList(ctgExCd, ctgLgCd, ctgMdCd, ctgSmCd, cdbGbCd,srchType,srchVal) {
function getJsonStrJisikList(ctgLgCd, ctgMdCd, ctgSmCd, cdbGbCd,srchType,srchVal) {
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTAuc2VsZWN0SmlzaWtMaXN0",
	    "map" : {
		// "ctg_ex_cd" : ctgExCd,
		"ctg_lg_cd" : ctgLgCd, 
		"ctg_md_cd" : ctgMdCd,
		"ctg_sm_cd" : ctgSmCd,
		"cdb_gb_cd" : cdbGbCd,
		"srch_type" : srchType,
		"srch_val" : separatorCheck(srchVal,' '),
		"show_all" : false,
		"chkNotUsetype": "all"
	    }
    };
    console.log(JSON.stringify(loParam));
    return encodeURIComponent(JSON.stringify(loParam));	
}

//지식검색 상세보기 -- jsh, 창크기 변경
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

function showDetailJisikURL(paramURL){
    var width = 900;
    var height = 900;
    var top = 0;
    var left = (screen.width - width) / 2;

    var paramURL = paramURL+"&JOB=main&popup=CHILD";
    var option = "width=" + width + ", height=" + height
    + ", toolbar=no, directories=no, scrollbars=auto, location=no, resizable=no, status=no,menubar=no, top="
    + top + ",left=" + left +"";

	var newWindow = window.open(paramURL, "지식 검색", option);
	newWindow.focus();
    return  newWindow;
}

//조회버튼 클릭이벤트 ---jsh, 기관코드 추가
function btnJisikSearchClickEvent(){
    // g_ctgExCd = $("#optCounselKnd1").val();
    // g_ctgLgCd = $("#optCounselKnd2").val();
    // g_ctgMdCd = $("#optCounselKnd3").val();
    // g_ctgSmCd = $("#optCounselKnd4").val();
    g_ctgLgCd = $("#optCounselKnd1").val();
    g_ctgMdCd = $("#optCounselKnd2").val();
    g_ctgSmCd = $("#optCounselKnd3").val();
    g_cdbGbCd = $("#optCdbKnd").val();
    g_srchType = $("#tfSrchType").val();
    g_srchVal = $("#tfSrchVal").val();

    // $("#tblJisikSearch").jqGrid("setGridParam", {postData : {pJson : getJsonStrJisikList(g_ctgExCd, g_ctgLgCd, g_ctgMdCd, g_ctgSmCd, g_cdbGbCd,g_srchType, g_srchVal)}, sortname : "TBBS_INQR_CNT", sortorder : "desc"});
    $("#tblJisikSearch").jqGrid("setGridParam", {postData : {pJson : getJsonStrJisikList(g_ctgLgCd, g_ctgMdCd, g_ctgSmCd, g_cdbGbCd,g_srchType, g_srchVal)}, sortname : "TBBS_INQR_CNT", sortorder : "desc"});
    $("#tblJisikSearch").trigger("reloadGrid");
}

//지식검색 조회 후 메인 그리드 업데이트 ---jsh, 기관코드 추가
function btnJisikSearchClickEvent2(){
    // g_ctgExCd = $("#optCounselKnd1").val();
    // g_ctgMdCd = $("#optCounselKnd2").val();
    // g_ctgSmCd = $("#optCounselKnd3").val();
    // g_ctgSmCd = $("#optCounselKnd4").val();
    g_ctgMdCd = $("#optCounselKnd1").val();
    g_ctgSmCd = $("#optCounselKnd2").val();
    g_ctgSmCd = $("#optCounselKnd3").val();
    g_cdbGbCd = $("#optCdbKnd").val();
    g_srchType = $("#tfSrchType").val();
    g_srchVal = $("#tfSrchVal").val();

    // $("#tblJisikSearch").jqGrid("setGridParam", {postData : {pJson : getJsonStrJisikList(g_ctgExCd, g_ctgLgCd, g_ctgMdCd, g_ctgSmCd, g_cdbGbCd, g_srchType, g_srchVal)}, sortname : "TBBS_INQR_CNT", sortorder : "desc"});
    $("#tblJisikSearch").jqGrid("setGridParam", {postData : {pJson : getJsonStrJisikList(g_ctgLgCd, g_ctgMdCd, g_ctgSmCd, g_cdbGbCd, g_srchType, g_srchVal)}, sortname : "TBBS_INQR_CNT", sortorder : "desc"});
    $("#tblJisikSearch").trigger("reloadGrid");
}

//초기화버튼 클릭이벤트 ---jsh, 기관코드 추가
function btnJisikInitClickEvent(){ 
    // g_ctgExCd = "all";
    g_ctgLgCd = "all";
    g_ctgMdCd = "all";
    g_ctgSmCd = "all";
    g_cdbGbCd = "all";
    g_srchType = "ttlCntn";
    g_srchVal = "";

    // $("#optCounselKnd1").val(g_ctgExCd);
    // $("#optCounselKnd2").val(g_ctgLgCd);
    // $("#optCounselKnd3").val(g_ctgMdCd);
    // $("#optCounselKnd4").val(g_ctgSmCd);
    $("#optCounselKnd1").val(g_ctgLgCd);
    $("#optCounselKnd2").val(g_ctgMdCd);
    $("#optCounselKnd3").val(g_ctgSmCd);
    $("#optCdbKnd").val(g_cdbGbCd);
    $("#tfSrchType").val(g_srchType);
    $("#tfSrchVal").val("");

    initSelectData();

    // $("#tblJisikSearch").jqGrid("setGridParam", {postData : {pJson : getJsonStrJisikList(g_ctgExCd, g_ctgLgCd, g_ctgMdCd, g_ctgSmCd, g_cdbGbCd, g_srchType, g_srchVal)}, sortname : "TBBS_INQR_CNT", sortorder : "desc"});
    $("#tblJisikSearch").jqGrid("setGridParam", {postData : {pJson : getJsonStrJisikList(g_ctgLgCd, g_ctgMdCd, g_ctgSmCd, g_cdbGbCd, g_srchType, g_srchVal)}, sortname : "TBBS_INQR_CNT", sortorder : "desc"});
    $("#tblJisikSearch").trigger("reloadGrid");
}

//셀렉트박스 데이터셋팅 --jsh, 기관코드 추가
function initSelectData(){
    setSelectBoxWithCode("optCdbKnd", "전체", "90303", "", "90039", "");	     // 상담DB구분
}

//main 호인입 초기화 설정
function setSelectBoxWithCodeLoad(code1, code2, code3){
    $.ajax({
	type : "post",
	async : true,
	url : getContextPath() + "/ajax/main/CommonSetSelectBox.do",
	data : "pJson=" + getJsonStrIntvCdSetSelectBox("1", ""),
	success : function (data) 
	{
	    $("#optCounselKnd1").html("");

	    // 수신데이터를 JSON으로 Parsing
	    var jr = JSON.parse(data);
	    var value = "";			

	    value += "<option value='all'>전체</option>";

	    $.each(jr, function(key, state) {
		value += "<option value='" + state.CD + "'>" + state.CD_NM + "</option>";
	    });

	    $("#optCounselKnd1").append(value);
	    $("#optCounselKnd1").val(code1);
	    $.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/main/CommonSetSelectBox.do",
		data : "pJson=" + getJsonStrIntvCdSetSelectBox("2", code1),
		success : function(data) {
		    $("#optCounselKnd2").html("");

		    // 수신데이터를 JSON으로 Parsing
		    var jr = JSON.parse(data);
		    var value = "";

		    value += "<option value='all'>전체</option>";

		    $.each(jr, function(key, state) {
			value += "<option value='" + state.CD + "'>" + state.CD_NM + "</option>";
		    });

		    $("#optCounselKnd2").append(value);
		    $("#optCounselKnd2").val(code2);
		    $.ajax({
			type : "post",
			async : true,
			url : getContextPath() + "/ajax/main/CommonSetSelectBox.do",
			data : "pJson=" + getJsonStrIntvCdSetSelectBox("3", code2),
			success : function(data) {
			    $("#optCounselKnd3").html("");
			    // 수신데이터를 JSON으로 Parsing
			    var jr = JSON.parse(data);
			    var value = "";

			    value += "<option value='all'>전체</option>";

			    $.each(jr, function(key, state) {
				value += "<option value='" + state.CD + "'>" + state.CD_NM + "</option>";
			    });

			    $("#optCounselKnd3").append(value);
			    $("#optCounselKnd3").val(code3);
			}
		    });
		}
	    });
	}
    });
}

// 메인화면 로딩 시 부하 감소를 위한 function 변경
function initdivRCTabSearch(){
    initSelectData();	

    btnJisikInitClickEvent();
    /*
	setObjectSelectBoxWithCode("optCounselKnd1", "전체", "1", "","","", "CHANGE"); // 상담유형 초기화
	setObjectSelectBoxWithCode("optCounselKnd2", "전체", "2", "","","", "CHANGE");
	setObjectSelectBoxWithCode("optCounselKnd3", "전체", "3", "","","", "CHANGE");
	*/
    //상담대분류 선택이벤트 등록 --jsh, 기관코드 이벤트 추가
    $("#optCounselKnd1").bind("change", function(){
	// $("#optCounselKnd2, #optCounselKnd3, #optCounselKnd4").empty();
	$("#optCounselKnd2, #optCounselKnd3").empty();
	setObjectSelectBoxWithCode("optCounselKnd2", "전체", "2", "", $("#optCounselKnd1").val(),"", "CHANGE");
    });
    //상담중분류 선택이벤트 등록
    $("#optCounselKnd2").bind("change", function(){
	// $("#optCounselKnd3, #optCounselKnd4").empty();
	$("#optCounselKnd3").empty();
	setObjectSelectBoxWithCode("optCounselKnd3", "전체", "3", "", $("#optCounselKnd2").val(),"", "CHANGE");
    });	

    $("#optCounselKnd1").trigger("change");

    //상담중분류 선택이벤트 등록
    // $("#optCounselKnd3").bind("change", function(){
    // $("#optCounselKnd4").empty();
    // setObjectSelectBoxWithCode("optCounselKnd4", "전체", "4", "", $("#optCounselKnd3").val(),"", "");
    // });


    //조회버튼 클릭이벤트 등록
    $("#btnJisikSearch").bind("click", btnJisikSearchClickEvent);

    $("#tfSrchVal").bind("keydown", function(e){
	if(e.keyCode == 13)
	    btnJisikSearchClickEvent();
    });

    //초기화버튼 클릭이벤트 등록 --jsh, 기관코드 추가
    $("#btnJisikInit").bind("click", btnJisikInitClickEvent);

    $("#tblJisikSearch").jqGrid({
	url : getContextPath() + "/jqgrid/main/jisikList.do",
	datatype : "json",
	mtype : "POST",
	postData : {
	    // pJson : getJsonStrJisikList(g_ctgExCd, g_ctgLgCd, g_ctgMdCd, g_ctgSmCd, g_srchVal)
        pJson : getJsonStrJisikList(g_ctgLgCd, g_ctgMdCd, g_ctgSmCd, g_srchVal)
	},
	jsonReader : {
	    repeatitems: false
	},
	// colNames : ["번호","대분류","기관분류","대분류","중분류","소분류","상담유형", "제목", "등록일", "조회수"],
//	colNames : ["번호","대분류","대분류","중분류","소분류","상담유형", "제목", "등록일", "조회수"],
	colNames : ["번호","대분류","대분류","중분류","소분류","상담유형", "제목", "수정일", "조회수"],
	colModel :
	    [
	     { name : "TBBS_ID", index : "TBBS_ID", hidden : true },
	     { name : "INST_CD", index : "INST_CD", hidden : true },
	     // { name : "INTV_EX_CD", index : "INTV_EX_CD", hidden : true },
	     { name : "INTV_LG_CD", index : "INTV_LG_CD", hidden : true },
	     { name : "INTV_MD_CD", index : "INTV_MD_CD", hidden : true },
	     { name : "INTV_SM_CD", index : "INTV_SM_CD", hidden : true },
	     { name : "INTV_NM", index : "INTV_NM", align : "left", width : 280 },
	     { name : "TBBS_TTL", index : "TBBS_TTL", align : "left", width : 400},
//	     { name : "CRT_DTTM", index : "CRT_DTTM", align : "center", width : 130},
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
	     pager : "#pgJisikSearch",
	     rownumbers : true,
	     rownumWidth : 30,
	     multiselect : false,
	     emptyrecords : "",
	     caption : "",
	     loadui : "enable",
	     viewrecords: true,
	     ondblClickRow : function(rowid){
		 var row = $("#tblJisikSearch").getRowData(rowid);
		 showDetailJisik(row.TBBS_ID);
		 // delaySelect(row.INTV_EX_CD, row.INTV_LG_CD, row.INTV_MD_CD, row.INTV_SM_CD); //jsh, 기관코드 추가
		 //delaySelect(row.INTV_LG_CD, row.INTV_MD_CD, row.INTV_SM_CD); //jsh, 기관코드 추가
	     }
    }).jqGrid("navGrid", "#pgJisikSearch", {
	edit : false, add : false, del : false, search : false
    });
    //화면 넓이에 따라 그리드 넓이 조절
	$(window).bind('resize', function() {
	    jQuery("#tblJisikSearch").setGridWidth($("#divRCTabSearch").width(), true);
	}).trigger('resize');
}

//jsh 기관코드 추가
// function delaySelect(pEX_CD, pLG_CD, pMD_CD, pSM_CD){
function delaySelect(pLG_CD, pMD_CD, pSM_CD){
    // $("#selMainIntvExCd").val(pEX_CD);
    // setObjectSelectBoxWithCode2("selMainIntvLgCd", "", "2", "", pEX_CD, pLG_CD, "CHANGE");
    // setObjectSelectBoxWithCode2("selMainIntvMdCd", "", "3", "", pLG_CD, pMD_CD, "CHANGE");
    // setObjectSelectBoxWithCode2("selMainIntvSmCd", "", "4", "", pMD_CD, pSM_CD, "CHANGE");
    $("#selMainIntvLgCd").val(pLG_CD);
    setObjectSelectBoxWithCode2("selMainIntvMdCd", "", "2", "", pLG_CD, pMD_CD, "CHANGE");
    setObjectSelectBoxWithCode2("selMainIntvSmCd", "", "3", "", pMD_CD, pSM_CD, "CHANGE");

}