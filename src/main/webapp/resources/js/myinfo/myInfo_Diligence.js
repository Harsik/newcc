	var isMgr = false;
	var usrSelect = window.sessionStorage.getItem("USR_GRD_CD");
	var g_cntrCd = window.sessionStorage.getItem("CNTR_CD");
	var cDTTM = new Date();
	Number.prototype.settodays=function()
	{ 
		return (this<10?'0'+this:this);
	}
	
	Date.prototype.getYMD = function()
	{ 
		return this.getFullYear()+'-'+(this.getMonth()+1).settodays()+'-'+this.getDate().settodays();
	} 
	
$(document).ready(function()
{	

	
	var optSrchType=$("#midlgc_optSrchType");
	var selFrDate=$("#midlgc_selFrDate");
	var selToDate=$("#midlgc_selToDate");
	var serviceType=$("input[name='serviceType']:radio");
	

	
	search_items();//검색
	initControl();
	initEvent();
	initData();
	
	if(usrSelect != null && usrSelect != "")
	{
		if(usrSelect >= "030100"){
			isMgr = true;
			$("#midlgc_searchSel").css("display","inline-block");
			$("th:eq(0),td:eq(0)").css("display","inline-block");
			$("#midlgc_sel_left").css({"float":"left","position":"absolute","top":"78px","left":"200px"});
			$("#midlgc_nemo_30").css({"float":"left","position":"absolute","top":"80px","left":"660px"});

			optSrchType.attr("disabled",true); 
			selFrDate.attr("disabled",false);
			selToDate.attr("disabled",false);
			serviceType.attr("disabled",true);
			
			var search_Select=$("#midlgc_searchSel");//체크박스 게시일자
			//관리자일경우
			search_Select.change(function(){//날짜이벤트
				if(search_Select.is(":checked")){
					optSrchType.attr("disabled",false);
		    		selFrDate.attr("disabled",false);
		    		selToDate.attr("disabled",false);
		    		serviceType.attr("disabled",false); 
		    	}else{
		    		optSrchType.attr("disabled",true);
		    		selFrDate.attr("disabled",true);
		    		selToDate.attr("disabled",true);
		    		serviceType.attr("disabled",true); 
		    	}
			});
		} else {
			//상담사일경우
			isMgr = false;
			$("#midlgc_searchSel").css("display","none");
			optSrchType.attr("disabled",false);
    		selFrDate.attr("disabled",false);
    		selToDate.attr("disabled",false);
    		serviceType.attr("disabled",false); 
    		
			$("th:eq(0),td:eq(0)").css("display","none");
			$("#midlgc_comtable").css("display","none");
			$("#midlgc_sel_left").css({"float":"left","position":"absolute","top":"78px","left":"20px"});
			$("#midlgc_nemo_30").css({"float":"left","position":"absolute","top":"80px","left":"460px"});
		}
	}
});

function search_items(){
	var ch_usrList=$("#midlgc_searchSel");//상담사
	var radio_indolence=$("input[name='serviceType']:radio");//검색일자
	var search_today=$("#midlgc_searchDay");//검색하는날
	var sh_fday=$("#midlgc_selToDate");//끝나는날
	var sh_lday=$("#midlgc_selFrDate");//시작하는날
	var ch_dereliction=$("#midlgc_search_latenes");//근무태만확인
	var se_dereliction=$("#midlgc_commType");//근무태만 검색
	
	
	sh_fday.attr("disabled",true); 
	sh_lday.attr("disabled",true);
	
	se_dereliction.attr("disabled",true); 
	
	search_today.change(function(){//날짜이벤트
    	if(search_today.is(":checked")){
    		sh_fday.attr("disabled",false);
    		sh_lday.attr("disabled",false);
    		radio_indolence.attr("disabled",false); 
    	}else{
    		sh_fday.attr("disabled",true);
    		sh_lday.attr("disabled",true);
    		radio_indolence.attr("disabled",true); 
    	}
    });
	//라디오버튼 이벤트
	radio_indolence.change(function(){
	      var serviceType = this.value;
	      if(serviceType == "day"){
	    	prt(serviceType);
          } 
          else if(serviceType == "week") 
          {
        	  prt(serviceType);
          } 
          else if(serviceType == "month")
          {
        	  prt(serviceType);
          }  
	});
}getDate()
	function prt(v){ 
	 var tDTTM = new Date(); 
	 if(v=="day"){
    	 tDTTM.setDate(cDTTM.getDate());
	 }if(v=="week"){
		 tDTTM.setDate(cDTTM.getDate()-7); 
	 }if(v=="month"){
		 tDTTM.setMonth(cDTTM.getMonth()-1);
	 }
	 	$("#midlgc_selFrDate").val(tDTTM.getYMD());
	}
	
function btnSearch_clickEvent(isFlag)
{
	var usrid = $("#midlgc_optSrchType").val();
	var commType = $("#midlgc_commType").val();
	var frDt = $("#midlgc_selFrDate").val();
	var toDt = $("#midlgc_selToDate").val();
	
	if(usrSelect != null && usrSelect != "")
	{
		if(usrSelect >= "030100")
			isMgr = true;
		 else 
			isMgr = false;
	}
	
	if(frDt != null)
		frDt = frDt.replace(/[-, :, \s]/g,"");
	if(toDt != null)
		toDt = toDt.replace(/[-, :, \s]/g,"");
	
	$("#midlgc_tblGroup").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "b2gwMjEuY29t", {
		"key" : "value",	
		"usr_id" : isMgr ? $("#midlgc_optSrchType").val():window.sessionStorage.getItem("USR_ID"),
		"commute" : commType,
		"cntrcd":g_cntrCd,
		"fr_dt" : frDt,
		"to_dt" : toDt
	})} , page : (isFlag ? $(this).getGridParam("page") : 1), sortname : "WRK_DT_FORMAT", sortorder : "desc"});
	$("#midlgc_tblGroup").trigger("reloadGrid");
}

//초기화 버튼 클릭 이벤트
function btnInit_clickEvent() 
{
	$("#midlgc_optSrchType").val("all");
	$("#midlgc_commType").val("all");
	$("#midlgc_selFrDate").val(getDate());
	$("#midlgc_selToDate").val(getDate());
	
	if(usrSelect != null && usrSelect != "") {
		if(usrSelect >= "030100"){
		$("input:radio[name='serviceType']").removeAttr('checked');
		$("input:radio[name='serviceType']:radio[value='day']").prop("checked",true);
		$("#midlgc_searchSel").attr('checked',false);
		$("#midlgc_search_latenes").attr('checked', false);
		$("#midlgc_searchDay").attr('checked', false);
		$("#midlgc_optSrchType").attr("disabled",true); 
		$("input[name='serviceType']:radio").attr("disabled",true); 
		$("#midlgc_selToDate").attr("disabled",true); 
		$("#midlgc_selFrDate").attr("disabled",true);
		$("#midlgc_commType").attr("disabled",true);
	} else {
		isMgr = false;
		$("input:radio[name='serviceType']").removeAttr('checked');
		$("input:radio[name='serviceType']:radio[value='day']").prop("checked",true);
		$("#midlgc_searchSel").attr('checked', false);
		$("#midlgc_optSrchType").attr("disabled",false); 
		$("input[name='serviceType']:radio").attr("disabled",false); 
		$("#midlgc_selToDate").attr("disabled",false); 
		$("#midlgc_selFrDate").attr("disabled",false);
		$("#midlgc_commType").attr("disabled",false);
	  }
	}
	btnSearch_clickEvent();
	init_infoPanel();
}


function btnDelete_clickEvent()
{
	var deleteId = $("#midlgc_deleteUsr").val();
	if(deleteId == "") {
		alert("선택된 이력이 없습니다.");
		return;
	}
	var wrkdt = $("#midlgc_wrkDt").html().replace(/[-, :]/g,"");
	
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
	var deleteUsr = $("#midlgc_deleteUsr").val();
	if(deleteUsr == "") {
		alert("선택된 이력이 없습니다.");
		return;
	}
	var wrk_dt = $("#midlgc_wrkDt").html().replace(/[-, :]/g,"");
	var dty_cd = $("#midlgc_dyt_cd").val();
	var aawTime = $("#midlgc_aawTime").val().replace(/[-, :]/g,"");
	var lvofTime = $("#midlgc_lvofTime").val().replace(/[-, :]/g,"");
	
	if(!confirm("이력을 수정하시겠습니까?"))
		return;
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/user/userProp.do",
		data : "pJson=" + getJsonStr("dXBkYXRl", "b2gwMjEudXNlckNvbW11dGVQcm9w", {
			"key" : "value",
			"usr_id" : deleteUsr,
			"wrk_dt" : wrk_dt,
			"dty_cd" : dty_cd,
			"aawTime" : aawTime,
			"lvofTime" : lvofTime
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
function btnExcel_clickEvent()
{
	excelDownLoad(getContextPath() + "/excel/user/userInfoList.do", getJsonStrUserInfoListExcel());
	
	//var url = getContextPath() + "/excel/user/userInfoList.do?pJson=" + getJsonStrUserInfoListExcel();
	//window.open(url);
}

//파라미터 셋팅 userInfoListExcel
function getJsonStrUserInfoListExcel()
{	
	userInfos();
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b2gwMjEuY29t",
		"map" : {
			"key" : "value",
			"usr_id" : isMgr ? $("#midlgc_optSrchType").val():window.sessionStorage.getItem("USR_ID"),
			"commute" : $("#midlgc_commType").val(),
			"fr_dt" : $("#midlgc_selFrDate").val().replace(/[-, :, \s]/g,""),
			"to_dt" : $("#midlgc_selToDate").val().replace(/[-, :, \s]/g,""),
			"cntrcd": g_cntrCd,
			"sidx" : $("#midlgc_tblGroup").getGridParam("sortname"),
			"sord" : $("#midlgc_tblGroup").getGridParam("sortorder"),
			"title" : 
				isMgr ? "근태이력" + setDownLoadName($("#midlgc_selFrDate").val(), $("#midlgc_selToDate").val()):
				"근태이력("+window.sessionStorage.getItem("USR_NM")+"_"+window.sessionStorage.getItem("USR_ID")+")" + setDownLoadName($("#midlgc_selFrDate").val(), $("#midlgc_selToDate").val()),
			"colWidth" : isMgr ? [20, 20, 20, 20, 20,20,20]:[20, 20, 20, 20/*, 20*/],
			"colName" : 
				isMgr ? ["WRK_DT_FORMAT","TEAM_NM", "USR_NM","DYT_CD", "AAW_TIME_FORMAT", "LVOF_TIME_FORMAT","USR_ID"]:
						["WRK_DT_FORMAT","DYT_CD", "AAW_TIME_FORMAT", "LVOF_TIME_FORMAT"],
			"colHeader" : isMgr ? ["근무일", "소속", "상담사", "근태", "출근시각", "퇴근시각", "유저아이디"] : ["근무일","근태유형", "출근시각", "퇴근시각"],
			"colAlign" : isMgr ? ["center", "center", "center", "center", "center","center", "center"] :["center", "center", "center", "center", "center"]
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

function initControl() {
	//$('#midlgc_selFrDate').val(getDate());
	 var utDTTM = new Date(); 
	 utDTTM.setDate(cDTTM.getDate()-7); 
	 $("#midlgc_selFrDate").val(utDTTM.getYMD());
	 $('#midlgc_selToDate').val(getDate());
	
	datePicker('#midlgc_selFrDate');
	datePicker('#midlgc_selToDate');
	
	userInfos();
	$("#midlgc_tblGroup").jqGrid(
			{
				url : getContextPath() + "/jqgrid/user/userInfo.do",
				datatype : "json",
				mtype : "POST",
				postData : {
					pJson : getJsonStr("c2VsZWN0TGlzdA==", "b2gwMjEuY29t", {
						"key" : "value",
						"usr_id" :/* isMgr ? $("#midlgc_optSrchType").val():*/window.sessionStorage.getItem("USR_ID"),
						"commute" : $("#midlgc_commType").val(),
						"cntrcd":g_cntrCd,
						"fr_dt" : utDTTM.getYMD().replace(/[-, :, \s]/g,""),
						"to_dt" : getDate().replace(/[-, :, \s]/g,"")
					})
				},
				jsonReader :
				{
					repeatitems: false
				},
				colNames : isMgr ? ["근무일자","상담소속","상담사",/* "지각여부", */"출근시각", "퇴근시각", "유저아이디","비고"]:
								   ["근무일자"/*,"지각여부"*/, "출근시각", "퇴근시각", "유저아이디","비고"],
			   	colModel : isMgr ?
			   	[
			   	 	{ name : "WRK_DT_FORMAT", index : "WRK_DT_FORMAT", align : "center", width : 40 },
					{ name : "TEAM_NM", index : "TEAM_NM", align : "center", width : 100 },
					{ name : "USR_NM", index : "USR_NM", align : "center", width : 50 },
					{ name : "AAW_TIME_FORMAT", index : "AAW_TIME_FORMAT", align : "center", width : 40 },
					{ name : "LVOF_TIME_FORMAT", index : "LVOF_TIME_FORMAT", align : "center", width : 40 },
					{ name : "USR_ID", index : "USR_ID", hidden : true },
					{ name : "AAAA", index : "AAA", align : "center", width :80 }
			   	]:[
				   	 	{ name : "WRK_DT_FORMAT", index : "WRK_DT_FORMAT", align : "center", width : 40 },
						{ name : "AAW_TIME_FORMAT", index : "AAW_TIME_FORMAT", align : "center", width : 40 },
						{ name : "LVOF_TIME_FORMAT", index : "LVOF_TIME_FORMAT", align : "center", width : 40 },
						{ name : "USR_ID", index : "USR_ID", hidden : true },
						{ name : "AAAA", index : "AAA", align : "center", width :80 }
				   	] ,
			   	sortname : "WRK_DT_FORMAT",
			   	sortorder : "desc",
			   	gridview : true,
			   	hidegrid : false,
			   	shrinkToFit : true,
			   	loadonce : false,
			   	scrollOffset : 0,
			   	height : isMgr ? "302" :"410",
			   	width : "80%",
			   	rowNum : 15,
			   	rowList : [10, 20, 30, 50, 100],
			   	autowidth : true,
			   	pager : "#midlgc_innerGrpPager",
			   	rownumbers : true,
			   	rownumWidth : 30,
			   	multiselect : false,
			   	emptyrecords : "",
			   	caption : "",
			   	loadui : "enable",
			   	viewrecords: true,
			   	onSelectRow : function(rowid)
			   	{
			   		var row = $("#midlgc_tblGroup").getRowData(rowid);//해당아이디
			   		$.ajax({
						type : "post",
						dataType: "json",
						async : true,
						url : getContextPath() + "/ajax/user/userCommuteSpec.do",
						data : "pJson=" + getJsonStr("c2VsZWN0T25l","b2gwMjEuY29tbXV0ZUluZm8=", {
							"key" : "value",
							"usr_id" : row.USR_ID,
							"wrk_dt" : row.WRK_DT_FORMAT
						}), 
						success : function(data)
						{
							init_infoPanel();
							
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
								
								var totalTime = getDiffTime(totime1, totime2);
								
								this.deleteId = data.USR_ID;
								
							
								$("#midlgc_cntr").html(data.CNTR);
								$("#midlgc_wrkDt").html(data.WRK_DT);
								//20191031 사용안해서 주석처리 
								/*$("#midlgc_dyt_cd").val(data.DYT_CD);*/								
								$("#midlgc_crtNm").html(data.CRT_NM);
								$("#midlgc_aawTime").val(data.AAW_TIME);
								$("#midlgc_lvofTime").val(data.LVOF_TIME);
								$("#midlgc_crtDtTm").html(data.CRT_DTTM);
								$("#midlgc_modNm").html(data.MOD_NM);
								$("#midlgc_modDtTm").html(data.MOD_DTTM);
								$("#midlgc_deleteUsr").val(data.USR_ID);
								
								if(data.LVOF_TIME != "" && data.LVOF_TIME != null)
									$("#midlgc_totalTime").html(totalTime);
								else
									$("#midlgc_totalTime").html("");
									
								$("#midlgc_divBtn").show();
							}
						},
						error : function(data, status, err) 
						{
							networkErrorHandler(data, status, err);
						}
					});
			   	},
			}).jqGrid("navGrid", "#midlgc_innerGrpPager", {edit : false, add : false, del : false, search : false});
}

function initEvent() {
	$("#midlgc_btnSearch").bind("click", btnSearch_clickEvent);	
	$("#midlgc_btnDelete").bind("click", btnDelete_clickEvent);
	$("#midlgc_btnInit").bind("click",btnInit_clickEvent);
	$("#midlgc_btnProp").bind("click", btnProUp_clickEvent);
	$("#midlgc_btnExcel").bind("click", btnExcel_clickEvent);
}

function initData() {
	setSelectBoxWithCode("midlgc_commType","전체","90042", "", "", "all");
	setSelectBoxWithCode("midlgc_dyt_cd","","90042", "", "");
	
	var map = {};
	if(window.sessionStorage.getItem("USR_GRD_CD") > '090100')
	{
		map = 
		{
			"key" : "value",
			//"orderBy" : "usr_nm",
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		};
	}
	else
	{
		map = 
		{
			"key" : "value",
			//"orderBy" : "usr_nm",
			"cntr_cd" : "010000",
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		};
	}
	
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
			
			$("#midlgc_optSrchType").append(value);
			
		},
		error : function(data, status, err){
			networkErrorHandler(data, status, err);
		}	
	});
}

function init_infoPanel() {
	$("#midlgc_cntr").html("");
	$("#midlgc_dyt_cd").val("");
	$("#midlgc_wrkDt").html("");
	$("#midlgc_aawTime").val("");
	$("#midlgc_crtNm").html("");
	$("#midlgc_crtDtTm").html("");
	$("#midlgc_totalTime").html("");
	$("#midlgc_lvofTime").val("");
	$("#midlgc_modNm").html("");
	$("#midlgc_modDtTm").html("");
	$("#midlgc_deleteUsr").val("");
	
	$("#midlgc_divBtn").hide();
}

function userInfos(){//근태설정
	if(usrSelect != null && usrSelect != "")
	{
		if(usrSelect >= "030100")
			isMgr = true;
		 else 
			isMgr = false;
	}
}