// var g_ctgExCd = "";
var g_ctgLgCd = "";
var g_ctgMdCd = "";
var g_ctgSmCd = "";
//var g_cdbGbCd = "";
var g_srchType = "ttl";
var g_srchVal = "";
var g_popup ="CHILD"
var multyselect = false;
//파라미터셋팅 지식검색리스트  
function getJsonStrJisikList(ctgLgCd, ctgMdCd, ctgSmCd, srchType, srchVal) {
//	if(srchVal==""){
//		alert("검색어를 입력하셔야 합니다.");
//		return false;
//	}else{
		var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wMTAuc2VsZWN0SmlzaWtMaXN0",
			"map" : {
				"ctg_lg_cd" : ctgLgCd, 
				"ctg_md_cd" : ctgMdCd,
				"ctg_sm_cd" : ctgSmCd,
				"cdb_gb_cd" : "040101", // 040101 : 상담DB
				"srch_type" : srchType,
				"chkNotUsetype" : "Y", // Y : 승인건
				"srch_val" : separatorCheck(srchVal,' '),
				"notinorg" : $("#cswDb_checkNotInOrg").prop("checked"),
				//"chkNotUsetype": "all"
			}
		};
		return encodeURIComponent(JSON.stringify(loParam));	
//	}
}

//파라미터셋팅 지식검색리스트 엑셀
function getJsonStrJisikListExcel(ctgLgCd, ctgMdCd, ctgSmCd, srchType, srchVal) {
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wMTAuc2VsZWN0SmlzaWtMaXN0",
			"map" : {
				"ctg_lg_cd" : ctgLgCd, 
				"ctg_md_cd" : ctgMdCd,
				"ctg_sm_cd" : ctgSmCd,
				"cdb_gb_cd" : "040101", // 040101 : 상담DB
				"srch_type" : srchType,
				"chkNotUsetype" : "Y", // Y : 승인건
				"srch_val" : srchVal,
				"notinorg" : $("#cswDb_checkNotInOrg").prop("checked"),
				//"chkNotUsetype": "all"
				
				"title" : "상담DB목록",
				"colWidth" : [30,40,40,40,50,20,20,10],
				"colName" : ["CNTR_NM","RSPN_PRSN", "RSPN_TEL_NO","INTV_NM","TBBS_TTL","CRT_DT_FORMAT","MOD_DT_FORMAT","TBBS_INQR_CNT"],
				"colHeader" : ["담당부서","담당자","전화번호","상담유형","제목","등록일","수정일","조회수"],
				"colAlign" : ["CENTER","CENTER","CENTER","CENTER","CENTER","CENTER","CENTER","CENTER"],
				"sidx" : "CNTR_NM, RSPN_PRSN",
				"sord" : "asc",
			}
	};
	return encodeURIComponent(JSON.stringify(loParam));	
}

//지식검색 상세보기
function showDetailJisik(tbbsId){
	var width = 1050;
	var height = 950;
	var top = 0;
	var left = (screen.width - width) / 2;
	var paramURL = "/web/main/jisikDetail.do?TBBS_ID=" + tbbsId+"&JOB=main" + "&popup=CHILD";
	var option = "width=" + width + ", height=" + height+ ", toolbar=no, directories=no, scrollbars=auto, location=no, resizable=no, status=no,menubar=no, top=" + top + ",left=" + left +"";
	window.sessionStorage.setItem("TBBS_ID", tbbsId);
	var newWindow = window.open(paramURL, "지식 검색", option);
	newWindow.focus();
}
 
//조회버튼 클릭이벤트 
function btnJisikSearchClickEvent(){
	g_ctgLgCd = $("#cswDb_dbSrchCounselKnd1").val();
	g_ctgMdCd = $("#cswDb_dbSrchCounselKnd2").val();
	g_ctgSmCd = $("#cswDb_dbSrchCounselKnd3").val();
//	g_cdbGbCd = $("#cswDb_dbSrchOptCdbKnd").val();
	g_srchType = $("#cswDb_dbSrchTfSrchType").val();
	g_srchVal = $("#cswDb_dbSrchTfSrchVal").val();

    $("#cswDb_dbSrchTblJisikSearch").jqGrid("setGridParam", {postData : {pJson : getJsonStrJisikList(g_ctgLgCd, g_ctgMdCd, g_ctgSmCd, g_srchType, g_srchVal)}, sortname : "TBBS_INQR_CNT", sortorder : "desc"});
	$("#cswDb_dbSrchTblJisikSearch").trigger("reloadGrid");
}

//지식검색 조회 후 메인 그리드 업데이트 
function btnJisikSearchClickEvent2(){
	g_ctgLgCd = $("#cswDb_dbSrchCounselKnd1").val();
	g_ctgMdCd = $("#cswDb_dbSrchCounselKnd2").val();
	g_ctgSmCd = $("#cswDb_dbSrchCounselKnd3").val();
//	g_cdbGbCd = $("#cswDb_dbSrchOptCdbKnd").val();
	g_srchType = $("#cswDb_dbSrchTfSrchType").val();
	g_srchVal = $("#cswDb_dbSrchTfSrchVal").val();
	
    $("#cswDb_dbSrchTblJisikSearch").jqGrid("setGridParam", {postData : {pJson : getJsonStrJisikList(g_ctgLgCd, g_ctgMdCd, g_ctgSmCd, g_srchType, g_srchVal)}, sortname : "TBBS_INQR_CNT", sortorder : "desc"});
	$("#cswDb_dbSrchTblJisikSearch").trigger("reloadGrid");
}

//초기화버튼 클릭이벤트 
function btnJisikInitClickEvent(){ 
	g_ctgLgCd = "all";
	g_ctgMdCd = "all";
	g_ctgSmCd = "all";
//	g_cdbGbCd = "all";
	g_srchType = "all";
	g_srchVal = "";
	$("#cswDb_dbSrchTfLgMdSmSearch_01").val("");
//	$("#cswDb_dbSrchChkNotUsetype").val("all"),
	$("#cswDb_dbSrchCounselKnd1").val(g_ctgLgCd);
	$("#cswDb_dbSrchCounselKnd2").val(g_ctgMdCd);
	$("#cswDb_dbSrchCounselKnd3").val(g_ctgSmCd);
//	$("#cswDb_dbSrchOptCdbKnd").val(g_cdbGbCd);
	$("#cswDb_dbSrchTfSrchType").val(g_srchType);
	$("#cswDb_dbSrchTfSrchVal").val("");
	
	initSelectData();
}

//엑셀저장 클릭 이벤트
function btnJisikExcelClickEvent(){
	g_ctgLgCd = $("#cswDb_dbSrchCounselKnd1").val();
	g_ctgMdCd = $("#cswDb_dbSrchCounselKnd2").val();
	g_ctgSmCd = $("#cswDb_dbSrchCounselKnd3").val();
//	g_cdbGbCd = $("#cswDb_dbSrchOptCdbKnd").val();
	g_srchType = $("#cswDb_dbSrchTfSrchType").val();
	g_srchVal = $("#cswDb_dbSrchTfSrchVal").val();
	
	excelDownLoad(getContextPath() + "/excel/civilservice/cswExcelDown.do",getJsonStrJisikListExcel(g_ctgLgCd, g_ctgMdCd, g_ctgSmCd, g_srchType, g_srchVal));
}

//셀렉트박스 데이터셋팅 
function initSelectData(){
    setObjectSelectBoxWithCode("cswDb_dbSrchCounselKnd1", "전체", "1", "", "00000000", "", "CHANGE");	
}

function changeDeptCharger(){
	var pList1 = [];0
	var Rows = $("#cswDb_dbSrchTblJisikSearch").getRowData();
	for(var i = 0 ; i <= Rows.length; i++ )
	{	
		if(jQuery.isEmptyObject(Rows[i]))
			continue;
		
		if($("#jqg_cswDb_dbSrchTblJisikSearch_"+(i*1+1)).prop("checked")){
				pList1.push({
					"qt" : "aW5zZXJ0",
					"mi" : "b20wMTAuY2hhbmdlRGVwdENoYXJnZXI=",
					"map" : {
						"tbbs_id" : Rows[i].TBBS_ID,
						"cntr_nm" : $("#cswDb_txtDept").val(),
						"rspn_prsn" : $("#cswDb_txtCharger").val(),
						"rspn_tel_no" : $("#cswDb_txttelNo").val(),
						"sendingUid" : sendingUid
					}
				});
			}
		
		}
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/civilservice/cswchangedeptcharger.do",
		data : "pJson=" + getJsonStr("YmF0Y2g=", null, pList1),
		success : function(data) {
			alert("일괄 변경되었습니다.");
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	$("#cswDb_dbSrchbtnJisikSearch").trigger("click");
}

function screenCnslDbSrch() {
	initSelectData();
	btnJisikInitClickEvent();
	
	$("option:disabled").remove(); // 상담유형 option 태그 중 disabled인것 삭제
	
	$("#cswDb_dbSrchCounselKnd1").bind("change", function(){
	    $("#cswDb_dbSrchCounselKnd2, #cswDb_dbSrchCounselKnd3").empty();
		setObjectSelectBoxWithCode("cswDb_dbSrchCounselKnd2", "전체", "2", "", $("#cswDb_dbSrchCounselKnd1").val(),"", "CHANGE");
	});
	
	$("#cswDb_dbSrchCounselKnd2").bind("change", function() {
		$("#cswDb_dbSrchCounselKnd3").empty();
		setObjectSelectBoxWithCode("cswDb_dbSrchCounselKnd3", "전체", "3", "", $("#cswDb_dbSrchCounselKnd2").val(),"", "CHANGE");
	});	
	
	$("#cswDb_dbSrchCounselKnd1").trigger("change");
	$("#cswDb_dbSrchbtnJisikSearch").bind("click", btnJisikSearchClickEvent);
    
	$("#cswDb_dbSrchTfSrchVal").bind("keydown", function(e) {
    	if (e.keyCode == 13) btnJisikSearchClickEvent();
    });
	
	$("#cswDb_dbSrchbtnJisikInit").bind("click", btnJisikInitClickEvent);
	
	$("#cswDb_dbSrchbtnJisikExcel").bind("click", btnJisikExcelClickEvent);

	if(window.sessionStorage.getItem("CC_AUTH")=="Y"){
		multyselect=true;		
		$("#cswDb_checkNotInOrg,#cswDb_NotInOrg,#cswDb_dept,#cswDb_selDept,#cswDb_charger,#cswDb_selCharger,#cswDb_changeDeptCharger,#cswDb_divCh,#cswDb_dbSrchbtnJisikExcel").show();
	}else{
		$("#cswDb_checkNotInOrg,#cswDb_NotInOrg,#cswDb_dept,#cswDb_selDept,#cswDb_charger,#cswDb_selCharger,#cswDb_changeDeptCharger,#cswDb_divCh,#cswDb_dbSrchbtnJisikExcel").hide();
	}
	$("#cswDb_dbSrchTblJisikSearch").jqGrid({
		url : "/jqgrid/civilservice/csw.do",
		datatype : "json",
		mtype : "POST",
		postData : {
            pJson : getJsonStrJisikList(g_ctgLgCd, g_ctgMdCd, g_ctgSmCd, g_srchVal)
		},
		jsonReader : {
			repeatitems: false
		},
        colNames : ["번호",/*"대분류",*/"대분류","중분류","소분류","담당부서","담당자","전화번호","상담유형","제목","유형구분","등록일","수정일","조회수","승인구분"],
	   	colModel :
	   	[
	   	 	{ name : "TBBS_ID", index : "TBBS_ID", hidden : true },
//	   	 	{ name : "INST_CD", index : "INST_CD", hidden : true },
	   	 	{ name : "INTV_LG_CD", index : "INTV_LG_CD", hidden : true },
	   	 	{ name : "INTV_MD_CD", index : "INTV_MD_CD", hidden : true },
	   	 	{ name : "INTV_SM_CD", index : "INTV_SM_CD", hidden : true },
	   	 	{ name : "CNTR_NM", align : "center", index : "CNTR_NM", width : 80 },
	   	 	{ name : "RSPN_PRSN", align : "center", index : "RSPN_PRSN", width : 120 },
	   	 	{ name : "RSPN_TEL_NO", align : "center", index : "RSPN_TEL_NO", width : 120 },
	   	 	{ name : "INTV_NM", index : "INTV_NM", align : "left", width : 240 },
			{ name : "TBBS_TTL", index : "TBBS_TTL", align : "left", width : 300},
			{ name : "CDB_GB_NM", index : "CDB_GB_NM", align : "center", width : 80, hidden : true },
			{ name : "CRT_DT_FORMAT", index : "CRT_DT_FORMAT", align : "center", width : 80},
			{ name : "MOD_DT_FORMAT", index : "MOD_DT_FORMAT", align : "center", width : 80},
			{ name : "TBBS_INQR_CNT", index : "TBBS_INQR_CNT", align : "center", width : 50 },
			{ name : "ARR_YN", index : "ARR_YN", align : "center", width : 80, hidden : true },
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
	    rowList : [25, 50, 75, 100],
	    autowidth : true,
	    pager : "#cswDb_dbSrchPgJisikSearch",
	    pgbuttons : true,
	    rownumbers : true,
	    rownumWidth : 30,
	    multiselect : multyselect,
	    emptyrecords : "",
	    caption : "",
	    loadui : "enable",
	    viewrecords : true,
	   	ondblClickRow : function(rowid){
	   		var row = $("#cswDb_dbSrchTblJisikSearch").getRowData(rowid);
	   		showDetailJisik(row.TBBS_ID)
//	   		opener.showDetailJisik2(row.TBBS_ID);
	   	}
	}).jqGrid("navGrid", "#cswDb_dbSrchTblJisikSearch", {edit : false, add : false, del : false, search : false});
	
	var parentWidth = $("#cswDb_dbSrchTblJisikSearch").parent().width();
	$("#cswDb_dbSrchTblJisikSearch").jqGrid("setGridWidth", parentWidth); // 그리드 너비 설정
	$("#cswDb_chargerJobBtnDbNew").bind("click", chargerJobBtnDbNew);
	$("#cswDb_changeDeptCharger").bind("click",changeDeptCharger);	
}

function chargerJobBtnDbNew(){
	// 22.03.17 해당 부서에 서무 있는지 체크
	var seomooCheck = true;
	
	if(window.sessionStorage.getItem("CC_AFFAIRS_YN") != "Y"){
		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : "/ajax/civilservice/cswGetSeoMooInfoCheck.do",
			data : "pJson=" + getSeoMooInfoCheck(),
			success : function(data) {
				if(data == null){
					alert("부서에 서무가 없습니다. \n 콜센터 담당자에게 서무지정 요청을 해주세요.");
					seomooCheck = false;
				}
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	}
	
	if(seomooCheck){
		clickReqId="";
		clickTbbsId="";
		cdb_req_gb_cd="";
	    window.sessionStorage.setItem("INTV_LG_CD","all");
	    window.sessionStorage.setItem("INTV_MD_CD","all");
	    window.sessionStorage.setItem("INTV_SM_CD","all");
	    reqPopupNew('y');
	}
}

function getSeoMooInfoCheck() {
	var loParam = {
			"qt" : "c2VsZWN0",
			"mi" : "b20wNjEuZ2V0U2VvTW9vSW5mbw==",
			"map" : {
				"key" : "value",
				"oucode" : sendingOuCode
			}
	};
	return encodeURIComponent(JSON.stringify(loParam)); 
}

function getJsonCodeList_cswDbSrch(selectid)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMjAuY2F0ZWdvcnlEZXRhaWxBdXRv",
		"map" : {
			"key" : "value",
			"lvl" : "4",
			"keyword" : $("#"+selectid).val().replace(/-/g, '') 
		}
	};
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));	
}

$(function(){
	var selectid;
	var selIdSeq;
	$("#cswDb_dbSrchTfLgMdSmSearch_01").autocomplete({
		source : function( request, response ) {
			selectid=$(this.element).prop("id");
			arSelId=selectid.split('_');
			selIdSeq=arSelId[2]; // 1 -> 2로 변경
			
		     $.ajax({
		            type: 'post',
		            async : true,
		            url: "/ajax/civilservice/csw.do",
		            dataType: "json",
		            data : "pJson=" + getJsonCodeList_cswDbSrch(selectid),
		            success: function(data) {
		                //서버에서 json 데이터 response 후 목록에 뿌려주기 위함
		                response(
		                    $.map(data, function(item) {
		                        return { 
		                            label: (item.LNAME+" > "+item.MNAME+" > "+item.SNAME),
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
				$("#cswDb_dbSrchCounselKnd1").val(arItem[0]).trigger("change");
				$("#cswDb_dbSrchCounselKnd2").val(arItem[1]).trigger("change");
				$("#cswDb_dbSrchCounselKnd3").val(arItem[2]);
			} 
		}
	});
})
