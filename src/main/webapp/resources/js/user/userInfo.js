
var infoUsrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
var g_cntrCd = window.sessionStorage.getItem("CNTR_CD");

//파라미터 셋팅 userInfoListExcel
function getJsonStrUserInfoListExcel(){			
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b2gwMjEuY29t",
		"map" : {
			"key" : "value",	
			"usr_id" : $("#usrInf_optSrchType").val(),
			"commute" : $("#usrInf_commType").val(),
			"fr_dt" : $("#usrInf_selFrDate").val().replace(/[-, :, \s]/g,""),
			"to_dt" : $("#usrInf_selToDate").val().replace(/[-, :, \s]/g,""),
			"sidx" : $("#usrInf_tblGroup").getGridParam("sortname"),
			"sord" : $("#usrInf_tblGroup").getGridParam("sortorder"),
			"title" : "근태이력" + setDownLoadName($("#usrInf_selFrDate").val(), $("#usrInf_selToDate").val()),
			"colWidth" : [20, 20, 20, 20, 20, 20, 20],
			"colName" : ["WRK_DT_FORMAT", "TEAM_NM", "USR_NM", "DYT_CD", "AAW_TIME_FORMAT", "LVOF_TIME_FORMAT", "USR_ID"],
			"colHeader" : ["근무일", "소속", "상담사", "근태", "출근시각", "퇴근시각", "유저아이디"],
			"colAlign" : ["center", "center", "center", "center", "center", "center", "center"]
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

function btnSearch_clickEvent(isFlag){
	var usrid = $("#usrInf_optSrchType").val();
	var usrInf_commType = $("#usrInf_commType").val();
	var frDt = $("#usrInf_selFrDate").val();
	var toDt = $("#usrInf_selToDate").val();
	
	if(frDt != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if(toDt != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");
	
	$("#usrInf_tblGroup").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "b2gwMjEuY29t", {
		"key" : "value",	
		"usr_id" : usrid,
		"commute" : usrInf_commType,
		/*"cntrcd" : g_cntrCd,*/
		"fr_dt" : frDt,
		"to_dt" : toDt
	})} , page : (isFlag ? $(this).getGridParam("page") : 1), sortname : "WRK_DT_FORMAT", sortorder : "desc"});
	$("#usrInf_tblGroup").trigger("reloadGrid");
}

//초기화 버튼 클릭 이벤트
function btnInit_clickEvent() 
{
   	$("#usrInf_userList").prop("disabled",false);
	$("#usrInf_userList").val("all");
	$("#usrInf_btnInsertUser").show();
	$("#usrInf_optSrchType").val("all");
	$("#usrInf_commType").val("all");
	$("#usrInf_selFrDate").val(getDate());
	$("#usrInf_selToDate").val(getDate());
	$("#usrInf_btnDelete").hide();
	//GeneralManager(센터장)급 이상만 추가,수정,삭제 권한 부여
	if(infoUsrGrdCd == "050100" || infoUsrGrdCd == "090100"){
	$("#usrInf_clickPrevent").css("pointer-events", "auto");
	}
	
	btnSearch_clickEvent();
	init_infoPanel();
}


function btnDelete_clickEvent()
{
	var deleteId = $("#usrInf_deleteUsr").val();
	if(deleteId == "") {
		alert("선택된 이력이 없습니다.");
		return;
	}
	var wrkdt = $("#usrInf_wrkDt").val().replace(/[-, :]/g,"");
	
	if(!confirm("이력을 삭제하시겠습니까?"))
		return;
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/user/userDeleteSpec.do",
		data : "pJson=" + getJsonStr("dXBkYXRl", "b2gwMjEuZGVsZXRlSW5mbw==", {
			"key" : "value",
			"usr_id" : deleteId,
			"wrk_dt" : wrkdt
		}),
		success : function(data)
		{
			btnSearch_clickEvent(true);
			alert("삭제되었습니다");
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

function btnProUp_clickEvent()
{
	var usrInf_deleteUsr = $("#usrInf_deleteUsr").val();
	if(usrInf_deleteUsr == "") {
		alert("선택된 이력이 없습니다.");
		return;
	}
	var wrk_dt = $("#usrInf_wrkDt").val().replace(/[-, :]/g,"");
	var dty_cd = $("#usrInf_dyt_cd").val();
	
	var timeRegExp =/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;			
	var usrInf_aawTime = $("#usrInf_aawTime").val();
	var usrInf_lvofTime = $("#usrInf_lvofTime").val();
	
        if(!timeRegExp.test(usrInf_aawTime)) {          
            alert("출근시간이 바르지 않습니다.");
             return;
         }else {
             usrInf_aawTime= usrInf_aawTime.replace(/[-, :]/g,"")+"00";
         }
        
         if(usrInf_lvofTime!="") {
             if(!timeRegExp.test(usrInf_lvofTime)) {          
                 alert("퇴근시간이 바르지 않습니다.");
                  return;
              }else{
         	 usrInf_lvofTime =usrInf_lvofTime.replace(/[-, :]/g,"")+"00";
              }  
         }
         
         if(!usrInf_aawTime) {
             alert("출근시간을 입력해주세요.");
             return;
         }
	
	
	
	if(!confirm("이력을 수정하시겠습니까?"))
		return;
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/user/userProp.do",
		data : "pJson=" + getJsonStr("dXBkYXRl", "b2gwMjEudXNlckNvbW11dGVQcm9w", {
			"key" : "value",
			"usr_id" : usrInf_deleteUsr,
			"wrk_dt" : wrk_dt,
			"dty_cd" : dty_cd,
			"aawTime" : usrInf_aawTime,
			"lvofTime" : usrInf_lvofTime
		}),
		success : function(data)
		{
			btnSearch_clickEvent(true);
			init_infoPanel();
			
			alert("수정되었습니다.");
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
	
}

//엑셀저장버튼 클릭 이벤트
function btnExcel_clickEvent(){
	excelDownLoad(getContextPath() + "/excel/user/userInfoList.do", getJsonStrUserInfoListExcel());
}

function initControl() {
	$("#usrInf_btnDelete").hide();
	$("#usrInf_btnProp").hide();
    	datePicker("#usrInf_wrkDt");
    	$("#usrInf_clickPrevent").css("pointer-events", "auto");
    	
	$('#usrInf_selFrDate').val(getDate());
	$('#usrInf_selToDate').val(getDate());
	
	datePicker('#usrInf_selFrDate');
	datePicker('#usrInf_selToDate');
	
	$("#usrInf_tblGroup").jqGrid(
			{
				url : getContextPath() + "/jqgrid/user/userInfo.do",
				datatype : "json",
				mtype : "POST",
				postData : {
					pJson : getJsonStr("c2VsZWN0TGlzdA==", "b2gwMjEuY29t", {
						"key" : "value",	
						"usr_id" : $("#usrInf_optSrchType").val(),
						"commute" : $("#usrInf_commType").val(),
						/*"cntrcd" : g_cntrCd,*/
						"fr_dt" : getDate().replace(/[-, :, \s]/g,""),
						"to_dt" : getDate().replace(/[-, :, \s]/g,"")
					})
				},
				jsonReader :
				{
					repeatitems: false
				},
				colNames : ["근무일", "소속", "상담사", "근태", "출근시각", "퇴근시각", "유저아이디"],
			   	colModel :
			   	[
			   	 	{ name : "WRK_DT_FORMAT", index : "WRK_DT_FORMAT", align : "center", width : 60 },
					{ name : "TEAM_NM", index : "TEAM_NM", align : "center", width : 100 },
					{ name : "USR_NM", index : "USR_NM", align : "center", width : 50 },
					{ name : "DYT_CD", index : "DYT_CD", align : "center", width : 40 },
					{ name : "AAW_TIME_FORMAT", index : "AAW_TIME_FORMAT", align : "center", width : 60 },
					{ name : "LVOF_TIME_FORMAT", index : "LVOF_TIME_FORMAT", align : "center", width : 60 },
					{ name : "USR_ID", index : "USR_ID", hidden : true }
			   	],
			   	sortname : "WRK_DT_FORMAT",
			   	sortorder : "desc",
			   	gridview : true,
			   	hidegrid : false,
			   	shrinkToFit : true,
			   	loadonce : false,
			   	scrollOffset : 0,
			   	height : "390",
			   	width : "100%",
			   	rowNum : 15,
			   	rowList : [10, 20, 30, 50, 100],
			   	autowidth : true,
			   	pager : "#usrInf_innerGrpPager",
			   	rownumbers : true,
			   	rownumWidth : 30,
			   	multiselect : false,
			   	emptyrecords : "",
			   	caption : "",
			   	loadui : "enable",
			   	viewrecords: true,
			   	onSelectRow : function(rowid)	{
			   		var row = $("#usrInf_tblGroup").getRowData(rowid);	   		
			   		
			   		$("#usrInf_clickPrevent").css("pointer-events", "none");
			   		$("#usrInf_wrkDt").val("");
			   	    	$("#usrInf_userList").prop("disabled",true);
			   	    	$("#usrInf_userList").val("all");
			   	    	$("#usrInf_btnInsertUser").hide();

			   	    	$.ajax({
						type : "post",
						dataType: "json",
						async : true,
						url : getContextPath() + "/ajax/user/userCommuteSpec.do",
						data : "pJson=" + getJsonStr("c2VsZWN0T25l", "b2gwMjEuY29tbXV0ZUluZm8=", {
							"key" : "value",
							"usr_id" : row.USR_ID,
							"wrk_dt" : row.WRK_DT_FORMAT
						}), 
						success : function(data){
							
							init_infoPanel();
							
							//근태 이력이 있다면 수행
							if (data != null)
							{
								var time1 = getDate() + data.AAW_TIME;
								var time2 = getDate() + data.LVOF_TIME;
								
								time1=time1.replace(/[-, :]/g,"");
								time2=time2.replace(/[-, :]/g,"");
								
								var year1 = time1.substr(0,4);
								var month1 = time1.substr(4,2);
								var day1 = time1.substr(6,2);
								var hour1 = time1.substr(8,2);
								var minute1 = time1.substr(10,2);
								var second1 = time1.substr(12,2);
								
								var year2 = time2.substr(0,4);
								var month2 = time2.substr(4,2);
								var day2 = time2.substr(6,2);
								var hour2 = time2.substr(8,2);
								var minute2 = time2.substr(10,2);
								var second2 = time2.substr(12,2);
								
								var totime1 = new Date(year1, month1, day1, hour1, minute1, second1);
								var totime2 = new Date(year2, month2, day2, hour2, minute2, second2);
								
								var usrInf_totalTime = getDiffTime(totime1, totime2);
								
								this.deleteId = data.USR_ID;
								
							
								$("#cntr").html(data.CNTR);
								$("#usrInf_wrkDt").val(data.WRK_DT);
								$("#usrInf_dyt_cd").val(data.PNCT_CD);
//								$("#usrInf_crtNm").html(data.CRT_NM);
								$("#crtNm").html(data.CRT_NM);
								$("#usrInf_aawTime").val(data.AAW_TIME);
								$("#usrInf_lvofTime").val(data.LVOF_TIME);
								$("#usrInf_crtDtTm").html(data.CRT_DTTM);
								$("#usrInf_modNm").html(data.MOD_NM);
								$("#usrInf_modDtTm").html(data.MOD_DTTM);
								$("#usrInf_deleteUsr").val(data.USR_ID);
								
								if(data.LVOF_TIME != "" && data.LVOF_TIME != null)
									$("#usrInf_totalTime").html(usrInf_totalTime);
								else
									$("#usrInf_totalTime").html("");
								
//								$("#usrInf_divBtn").show();
								$("#usrInf_btnDelete").show();
								$("#usrInf_btnProp").show();
							}							
							
						},
						error : function(data, status, err) {
							networkErrorHandler(data, status, err);
						}
					});
			   	},
			}).jqGrid("navGrid", "#usrInf_innerGrpPager", {edit : false, add : false, del : false, search : false});
}

function initEvent() {
	$("#usrInf_btnInsertUser").bind("click", addLoginStatus_clickEvent);	
	$("#usrInf_userList").bind("change", function(){
	    var user=$("#usrInf_userList  option:selected").text();
	    
	    if($("#usrInf_userList").val()=="all"){
		$("#cntr").html("")
	    }else{ 
		$("#cntr").html(user)
	    }
	});	
	$("#usrInf_btnSearch").bind("click", btnSearch_clickEvent);	
	$("#usrInf_btnDelete").bind("click", btnDelete_clickEvent);
	$("#usrInf_btnInit").bind("click",btnInit_clickEvent);
	$("#usrInf_btnProp").bind("click", btnProUp_clickEvent);
	$("#usrInf_btnExcel").bind("click", btnExcel_clickEvent);
}

function initData() {
	setSelectBoxWithCode("usrInf_commType","전체","90042","CHILD", "", "all");
	setSelectBoxWithCode("usrInf_dyt_cd","","90042","CHILD","", "");
	
	
	var map = {
		"key" : "value",
		//"orderBy" : "usr_nm",
		"cntr_cd" : infoUsrGrdCd =="090100"?"":window.sessionStorage.getItem("CNTR_CD"),
		"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
		"sord" : "asc",		
	};
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/user/useInfo.do",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "b20wMDEuc2VsZWN0TGlzdA==", map),
		success : function(data){
			
			var jr = JSON.parse(data);
			var value = "";
			value += "<option value='all' selected>전체</option>";
			$.each(jr, function(key, state){
				value += "<option value='" + state.USR_ID + "'>" + state.USR_NM + "</option>";
				
			});
			$("#usrInf_optSrchType").append(value);
			$("#usrInf_userList").append(value);			
		},
		error : function(data, status, err){
			networkErrorHandler(data, status, err);
		}	
	});
}

function init_infoPanel() {
	$("#cntr").html("");
//	$("#usrInf_dyt_cd").val("");
	$("#usrInf_wrkDt").val("");
	$("#usrInf_aawTime").val("");
	$("#usrInf_crtNm").html("");
	$("#usrInf_crtDtTm").html("");
	$("#usrInf_totalTime").html("");
	$("#usrInf_lvofTime").val("");
	$("#usrInf_modNm").html("");
	$("#usrInf_modDtTm").html("");
	$("#usrInf_deleteUsr").val("");
//	$("#usrInf_divBtn").hide();
	$("#usrInf_btnDelete").hide();
	$("#usrInf_btnProp").hide();
}


//근태이력 추가
function getJsonStrInsertUserLoginStatus(wrk_dt,usrInf_deleteUsr,usrInf_aawTime,usrInf_lvofTime, dty_cd) {
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b2gwMjEuYWRkVXNlckluZm8=",
		"map" : {
			"key" : "value",
			"wrk_dt" : wrk_dt,
			"usr_id" : usrInf_deleteUsr,
			"aaw_time" : usrInf_aawTime.replace(/[-, :]/g,""),
			"lvof_time" : usrInf_lvofTime.replace(/[-, :]/g,""),
			"dty_cd" :dty_cd
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function addLoginStatus_clickEvent() {
        var usrInf_deleteUsr =$("#usrInf_userList  option:selected").val();
        var wrk_dt = $("#usrInf_wrkDt").val().replace(/[-, :]/g,"");
        var usrInf_aawTime = $("#usrInf_aawTime").val();
        var usrInf_lvofTime = $("#usrInf_lvofTime").val();
        var dty_cd = $("#usrInf_dyt_cd").val(); //근무유형
        var timeRegExp =/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;

        if(!usrInf_deleteUsr || usrInf_deleteUsr=="all") {
            alert("상담사를 선택해주세요.");
            return;
        }  
        if(!dty_cd){
            alert("근태상태를 입력해주세요.");
            return;
        }
        if(!wrk_dt) {
            alert("출근일을 입력해주세요.");
            return;
        } 
        if(!timeRegExp.test(usrInf_aawTime)) {          
           alert("출근시간이 바르지 않습니다.");
            return;
        }else {
            usrInf_aawTime= usrInf_aawTime+"00";
        }
        if(usrInf_lvofTime!="") {
            if(!timeRegExp.test(usrInf_lvofTime)) {          
                alert("퇴근시간이 바르지 않습니다.");
                 return;
             }else{
        	 usrInf_lvofTime =usrInf_lvofTime+"00";
             }  
        }
        if(!usrInf_aawTime) {
            alert("출근시간을 입력해주세요.");
            return;
        }  
	if(!confirm("이력을 추가하시겠습니까?")){   
	    return;
	}
	
	// 근태현황 테이블에 저장
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/main/insertUserLoginStatus.do",
		data : "pJson=" + getJsonStr("c2VsZWN0", "b2gwMjEudXNlckNoZWNr", {"key":"value", "workDate" : wrk_dt, "usr_id": usrInf_deleteUsr}),
		success : function(data) {
		    
		    if(JSON.stringify(data)=="null" || data.USE_YN=="N"){  
			$.ajax({
			    type : "post",
			    dataType: "json",
			    async : true,
			    url : getContextPath() + "/ajax/main/insertUserLoginStatus.do",
			    data : "pJson=" + getJsonStrInsertUserLoginStatus(wrk_dt,usrInf_deleteUsr,usrInf_aawTime,usrInf_lvofTime,dty_cd),
			    success : function(data) {
				
				btnSearch_clickEvent(true);
				init_infoPanel();
				alert("수정되었습니다.");
				
			    },
			    error : function(data, status, err) {
				//networkErrorHandler(data, status, err);
			    }
			});

		    } else {	
			alert("등록된 사용자가 있습니다.");
		    }
			
		},
		error : function(data, status, err) {
			//networkErrorHandler(data, status, err);
		}
	});
}



$(function()
{	
	initControl();
	initEvent();
	initData();
	
    	//GeneralManager(센터장)급 이상만 추가,수정,삭제 권한 부여
    	if(infoUsrGrdCd == "050100" || infoUsrGrdCd == "090100"){
    	    $("#usrInf_userInfoTable").css("pointer-events", "auto");
    	    $("#usrInf_divBtn").show();
    	}else{
    	    $("#usrInf_userInfoTable, #usrInf_clickPrevent").css("pointer-events", "none");
    	    $("#usrInf_divBtn").hide();
    	}
});