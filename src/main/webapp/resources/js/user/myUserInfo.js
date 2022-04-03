	var isMgr = false;
	var usrSelect = window.sessionStorage.getItem("USR_GRD_CD");

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

	
	var optSrchType=$("#optSrchType");
	var selFrDate=$("#selFrDate");
	var selToDate=$("#selToDate");
	var serviceType=$("input[name='serviceType']:radio");
	

	
	 search_items();//검색
	initControl();
	initEvent();
	initData();
	
	if(usrSelect != null && usrSelect != "")
	{
		if(usrSelect >= "030100"){
			isMgr = true;
			$("th:eq(0),td:eq(0)").css("display","inline-block");
			$("#sel_left").css({"float":"left","position":"absolute","top":"78px","left":"200px"});
			$("#nemo_30").css({"float":"left","position":"absolute","top":"80px","left":"660px"});

			optSrchType.attr("disabled",true); 
			selFrDate.attr("disabled",false);
			selToDate.attr("disabled",false);
			serviceType.attr("disabled",true);
			
			var search_Select=$("#searchSel");//체크박스 게시일자
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
			optSrchType.attr("disabled",false);
    		selFrDate.attr("disabled",false);
    		selToDate.attr("disabled",false);
    		serviceType.attr("disabled",false); 
    		
			$("th:eq(0),td:eq(0)").css("display","none");
			$("#comtable").css("display","none");
			$("#sel_left").css({"float":"left","position":"absolute","top":"78px","left":"20px"});
			$("#nemo_30").css({"float":"left","position":"absolute","top":"80px","left":"460px"});
		}
	}
});

function search_items(){
	var ch_usrList=$("#searchSel");//상담사
	var radio_indolence=$("input[name='serviceType']:radio");//검색일자
	var search_today=$("#searchDay");//검색하는날
	var sh_fday=$("#selToDate");//끝나는날
	var sh_lday=$("#selFrDate");//시작하는날
	var ch_dereliction=$("#search_latenes");//근무태만확인
	var se_dereliction=$("#commType");//근무태만 검색
	
	
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
	 	$("#selFrDate").val(tDTTM.getYMD());
	}
	
function btnSearch_clickEvent(isFlag)
{
	var usrid = $("#optSrchType").val();
	var commType = $("#commType").val();
	var frDt = $("#selFrDate").val();
	var toDt = $("#selToDate").val();
	
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
	
	$("#tblGroup").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "b2gwMjEuY29t", {
		"key" : "value",	
		"usr_id" : isMgr ? $("#optSrchType").val():window.sessionStorage.getItem("USR_ID"),
		"commute" : commType,
		"fr_dt" : frDt,
		"to_dt" : toDt
	})} , page : (isFlag ? $(this).getGridParam("page") : 1), sortname : "WRK_DT_FORMAT", sortorder : "desc"});
	$("#tblGroup").trigger("reloadGrid");
}

//초기화 버튼 클릭 이벤트
function btnInit_clickEvent() 
{
	$("#optSrchType").val("all");
	$("#commType").val("all");
	$("#selFrDate").val(getDate());
	$("#selToDate").val(getDate());
	
	if(usrSelect != null && usrSelect != "") {
		if(usrSelect >= "030100"){
		$("input:radio[name='serviceType']").removeAttr('checked');
		$("input:radio[name='serviceType']:radio[value='day']").prop("checked",true);
		$("#searchSel").attr('checked',false);
		$("#search_latenes").attr('checked', false);
		$("#searchDay").attr('checked', false);
		$("#optSrchType").attr("disabled",true); 
		$("input[name='serviceType']:radio").attr("disabled",true); 
		$("#selToDate").attr("disabled",true); 
		$("#selFrDate").attr("disabled",true);
		$("#commType").attr("disabled",true);
	} else {
		isMgr = false;
		$("input:radio[name='serviceType']").removeAttr('checked');
		$("input:radio[name='serviceType']:radio[value='day']").prop("checked",true);
		$("#searchSel").attr('checked', false);
		$("#optSrchType").attr("disabled",false); 
		$("input[name='serviceType']:radio").attr("disabled",false); 
		$("#selToDate").attr("disabled",false); 
		$("#selFrDate").attr("disabled",false);
		$("#commType").attr("disabled",false);
	  }
	}
	btnSearch_clickEvent();
	init_infoPanel();
}


function btnDelete_clickEvent()
{
	var deleteId = $("#deleteUsr").val();
	if(deleteId == "") {
		alert("선택된 이력이 없습니다.");
		return;
	}
	var wrkdt = $("#wrkDt").html().replace(/[-, :]/g,"");
	
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
	var deleteUsr = $("#deleteUsr").val();
	if(deleteUsr == "") {
		alert("선택된 이력이 없습니다.");
		return;
	}
	var wrk_dt = $("#wrkDt").html().replace(/[-, :]/g,"");
	var dty_cd = $("#dyt_cd").val();
	var aawTime = $("#aawTime").val().replace(/[-, :]/g,"");
	var lvofTime = $("#lvofTime").val().replace(/[-, :]/g,"");
	
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
			"usr_id" : isMgr ? $("#optSrchType").val():window.sessionStorage.getItem("USR_ID"),
			"commute" : $("#commType").val(),
			"fr_dt" : $("#selFrDate").val().replace(/[-, :, \s]/g,""),
			"to_dt" : $("#selToDate").val().replace(/[-, :, \s]/g,""),
			"sidx" : $("#tblGroup").getGridParam("sortname"),
			"sord" : $("#tblGroup").getGridParam("sortorder"),
			"title" : 
				isMgr ? "근태이력" + setDownLoadName($("#selFrDate").val(), $("#selToDate").val()):
				"근태이력("+window.sessionStorage.getItem("USR_NM")+"_"+window.sessionStorage.getItem("USR_ID")+")" + setDownLoadName($("#selFrDate").val(), $("#selToDate").val()),
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
	//$('#selFrDate').val(getDate());
	 var utDTTM = new Date(); 
	 utDTTM.setDate(cDTTM.getDate()-7); 
	 $("#selFrDate").val(utDTTM.getYMD());
	 $('#selToDate').val(getDate());
	
	datePicker('#selFrDate');
	datePicker('#selToDate');
	
	userInfos();
	$("#tblGroup").jqGrid(
			{
				url : getContextPath() + "/jqgrid/user/userInfo.do",
				datatype : "json",
				mtype : "POST",
				postData : {
					pJson : getJsonStr("c2VsZWN0TGlzdA==", "b2gwMjEuY29t", {
						"key" : "value",
						"usr_id" :/* isMgr ? $("#optSrchType").val():*/window.sessionStorage.getItem("USR_ID"),
						"commute" : $("#commType").val(),
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
			   	pager : "#innerGrpPager",
			   	rownumbers : true,
			   	rownumWidth : 30,
			   	multiselect : false,
			   	emptyrecords : "",
			   	caption : "",
			   	loadui : "enable",
			   	viewrecords: true,
			   	onSelectRow : function(rowid)
			   	{
			   		var row = $("#tblGroup").getRowData(rowid);//해당아이디
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
							
						
							$("#cntr").html(data.CNTR);
							$("#wrkDt").html(data.WRK_DT);
							$("#dyt_cd").val(data.DTY_CD);
							$("#crtNm").html(data.CRT_NM);
							$("#aawTime").val(data.AAW_TIME);
							$("#lvofTime").val(data.LVOF_TIME);
							$("#crtDtTm").html(data.CRT_DTTM);
							$("#modNm").html(data.MOD_NM);
							$("#modDtTm").html(data.MOD_DTTM);
							$("#deleteUsr").val(data.USR_ID);
							
							if(data.LVOF_TIME != "" && data.LVOF_TIME != null)
								$("#totalTime").html(totalTime);
							else
								$("#totalTime").html("");
								
							$("#divBtn").show();
						},
						error : function(data, status, err) 
						{
							networkErrorHandler(data, status, err);
						}
					});
			   	},
			}).jqGrid("navGrid", "#innerGrpPager", {edit : false, add : false, del : false, search : false});
}

function initEvent() {
	$("#btnSearch").bind("click", btnSearch_clickEvent);	
	$("#btnDelete").bind("click", btnDelete_clickEvent);
	$("#btnInit").bind("click",btnInit_clickEvent);
	$("#btnProp").bind("click", btnProUp_clickEvent);
	$("#btnExcel").bind("click", btnExcel_clickEvent);
}

function initData() {
	setSelectBoxWithCode("commType","전체","90042", "", "", "all");
	setSelectBoxWithCode("dyt_cd","","90042", "", "");
	
	var map = {};
	if(window.sessionStorage.getItem("USR_GRD_CD") == '090100')
	{
		map = 
		{
			"key" : "value",
			"orderBy" : "usr_nm",
		};
	}
	else
	{
		map = 
		{
			"key" : "value",
			"orderBy" : "usr_nm",
			"team_cd" : "010100"
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
			
			$("#optSrchType").append(value);
			
		},
		error : function(data, status, err){
			networkErrorHandler(data, status, err);
		}	
	});
}

function init_infoPanel() {
	$("#cntr").html("");
	$("#dyt_cd").val("");
	$("#wrkDt").html("");
	$("#aawTime").val("");
	$("#crtNm").html("");
	$("#crtDtTm").html("");
	$("#totalTime").html("");
	$("#lvofTime").val("");
	$("#modNm").html("");
	$("#modDtTm").html("");
	$("#deleteUsr").val("");
	
	$("#divBtn").hide();
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