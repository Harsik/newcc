var g_popup="CHILD";
var isinitDivDeptRceptList=false;
var isinitDivChargerProcesstList=false;
var isinitDivStatsSttusList=false;
var isinitDivCnslDbSrchList=false;
//** common function **
/*
function initDisplay(){
    $("#csdbmg_DivDeptRceptList").css("display", "block");
    $("#csdbmg_DivChargerProcesstList").css("display", "none");
    $("#csdbmg_DivStatsSttusList").css("display", "none");
}
*/
//see attached file 
function showAttachFiles(tbbsId, id, tablenm){
    $.ajax({
	type : "post",
	dataType: "json",
	async : true,
	url : "/ajax/civilservice/csw.do",
	data : "pJson=" + getJsonFileList(tbbsId, tablenm),
	success : function(data){
	    if(data != null && data != ""){
		//var tr ="<tr><th style='width: 80%; '>첨부파일이름</th>" +"<th style='width: 20%;'>용량</th></tr>";
		var tr ="";
		for(var i in data){
		    var url = "/file/board/jisikSearchFileDown.do?pJson=" + getJsonFileDownload(data[i].SVR_SV_PTH, data[i].LOC_FL_NM);
		    tr += "<tr>";
		    tr += "<td><a href='" + url + "'>" + data[i].LOC_FL_NM + "</a></td>";
		    tr += "<td><span>" + data[i].FL_KB_SZ + "</span></td>";
		    tr += "</tr>";
		}
		id.empty();
		id.append(tr);
	    }
	},
	error : function(data, status, err){
	    networkErrorHandler(data, status, err);
	}
    });
}

//file list 
function getJsonFileList(tbbsId, tableNm){
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMTkuZmlsZUxpc3Q=",
	    "map" : {
		"key" : "value",
		"tbl_nm" : tableNm,
		"tbl_pk": tbbsId,
		"orderby": "crtTime",
	    }
    };
    return encodeURIComponent(JSON.stringify(loParam));
}

//Download file when clicking the file.
function getJsonFileDownload(svr, loc){
    var loParam = {
	    "svrFilePath" : svr,
	    "locFileName" : loc
    };
    return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function reqPopup2(width, height, url, title){
    var width = width;
    var height = height;
    var top = 0;
    var left = Math.ceil((window.screen.width - width)/2);
    // var top = Math.ceil((window.screen.height - height)/2);

    var paramURL = url;
    var option = "width=" + width + ", height=" + height
    + ", toolbar=no, directories=no, scrollbars=auto, location=no, resizable=no, status=no,menubar=no, top="
    + top + ",left=" + left +"";

    var newWindow = window.open(paramURL, title, option);
    newWindow.focus();
    return newWindow;
}


var g_IntvObectCode="";

// organization classification
function getJsonStrCategoryOBJListSetM(ctg_lv) {
    var loParam = {
	    "qt" : "c2VsZWN0TGlzdA==",
	    "mi" : "b20wMjAuY2F0ZWdvcnlPYmpMaXN0",
	    "map" : {
		"key" : "value",
		"categoryGb" : ctg_lv
	    }
    }
    return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function setCategoryCodeListToObjectM(fID, allText, startValue, maingb)
{
    var parentObectCode={}; // 코드 변수		
    var value = "";
    // 초기 코드 가져오기
    $.ajax({
	type : "post",
	async : true,
	url : "/ajax/civilservice/csw.do",
	data : "pJson=" + getJsonStrCategoryOBJListSet("allseq"),
	success : function(data)
	{
	    if(jr != '')
	    {
		// param값을 JSON으로 파싱
		var jr = JSON.parse(data);

		var arrVal=new Array();
		var obectDetail=new Object();
		var objKey ="";

		$.each(jr, function(key, val)
			{
		    var i =0;

		    if(objKey != val.PARNT_CD){
			obectDetail={};
		    }
		    objKey =val.PARNT_CD;

		    var objCildkey =val.CTG_CD;
		    var objCildTp_cd=val.PARNT_CD;
		    var arrObjDtail = {};
		    var objDtail = {};

		    objDtail={
			    "parnt_cd" : val.PARNT_CD,
			    "cd"    : val.CTG_CD,
			    "cd_nm" : val.CD_NM,
			    "ctg_lvl" : val.CTG_LVL,
			    "cd_ord" : val.CD_ORD,
			    "use_yn" : val.USE_YN 
		    };

		    obectDetail[objCildkey]= objDtail;
		    parentObectCode[objKey]=obectDetail;

			});

	    }
	},
	error : function(data, val, err) 
	{
	    networkErrorHandler(data, val, err);
	}
    });
    g_IntvObectCode=parentObectCode;
}



function setSelectBoxWithCode3(selectId, allText, codeType, parentType, parentCode, startValue, cntrCd)
{
	var $selectId = $("#" + selectId);
	
	// 셀렉트 박스 셋팅
	$.ajax({
		type : "post",
		async : true,
		url : "/ajax/main/CommonSetSelectBox.do",
		data : "pJson=" + getJsonStrCommonSetSelectBox(codeType, parentType, parentCode, cntrCd),
		success : function(data)
		{
			$selectId.html("");
			
			// param값을 JSON으로 파싱
			var jr = JSON.parse(data);
			var value = "";
			
			if(allText == "전체")
				value += "<option value='all' selected>전체</option>";
			else if(allText == "미선택")
				value += "<option value='all'>미선택</option>";
			
			$.each(jr, function(key, state)
			{
				value += "<option value='" + state.CD + "'>" + state.CD_NM + "</option>";
			});
			
			$selectId.append(value);
			
			if(startValue != "") {
				$selectId.val(startValue);
			}
			if($(selectId=="csdbch_deptSrchProgrsSttus")){
			    $("#csdbch_deptSrchProgrsSttus").val("all");
			}
			
			$selectId.trigger("change");
			$selectId.trigger("load");
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

function requstHis_popupEvent(tbbsId){
    var width = 1100;
    var height = 831;
    var top = 0;
    var left = Math.ceil((window.screen.width - width)/2);
    // var top = Math.ceil((window.screen.height - height)/2);

    var paramURL = "/web/civilservice/cswDbManage_processDetailHist.do?tbbsId="+tbbsId;
    var option = "width=" + width + ", height=" + height
    + ", toolbar=no, directories=no, scrollbars=auto, location=no, resizable=no, status=no,menubar=no, top="
    + top + ",left=" + left +"";
    var newWindow = window.open(paramURL, "이관이력보기", option);
    newWindow.focus();	
}

function csdbmg_initTabs(id){  
	switch(id){
case "csdbmg_DivDeptRceptList":
	if(isinitDivDeptRceptList == false){
		screenChargerAppn(); 
		isinitDivDeptRceptList=true;
		}
	  break;
case "csdbmg_DivChargerProcesstList":
	if(isinitDivChargerProcesstList == false){ 
		screenProcess();
		isinitDivChargerProcesstList=true;
		}
	  break;
case "csdbmg_DivStatsSttusList":
	 if(isinitDivStatsSttusList == false){ 
		 screenStatistics(); 
		 isinitDivStatsSttusList=true;
		 }	
	  break;
case "csdbmg_DivCnslDbSrchList":
	 if(isinitDivCnslDbSrchList == false){ 
		 screenCnslDbSrch(); 
		 isinitDivCnslDbSrchList=true;
		 }	
	  break;
	}
}

function getJsonStrAdminAgencyUserInfo() 
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNjEuc2VuZGluZ1VzZXJJbmZv",
		"map" : {
			"key" : "value",
			"userId" : sendingUid
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}
//initialization page
function initjisikRewordDiv(){
	var cstabs = $("#csdbmg_CnsltDbProcessManageTabs").tabs();
    // Set screen in the beginning 	
	cstabs.tabs({
		  activate:function (event, ui){
			  var id = ui.newPanel.attr('id');
			  csdbmg_initTabs(id);
		  }
	   });
	csdbmg_initTabs("csdbmg_DivDeptRceptList");
	//first excute, initcode book
	setCategoryCodeListToObjectM();
	$.ajax({
		type : "post",
		async : true,
		dataType : "json",
		url : "/ajax/main/CommonSetSelectBox.do",
		data : "pJson=" + getJsonStrAdminAgencyUserInfo(),
		success : function(data){
			if(data[0]!=undefined){
			sendingUName=data[0].DISPLAYNAME;
			sendingOu=data[0].OU;
			sendingOuName=data[0].ORGFULLNAME;
			sendingUTelNum=data[0].TELEPHONENUMBER
			}
		}
	});
}






