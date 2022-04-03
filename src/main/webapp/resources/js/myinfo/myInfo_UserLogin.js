// 조회 조건 및 조회 값
var s_srchtype = "all";
var s_srchval = "";
var s_frDt = "";
var s_toDt = "";

var gUsrGrdCd = getUserGrdCode();

//라디오박스 선택시날짜변경
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
	var radio_indolence=$("input[name='serviceType']:radio");//검색일자
	
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
	
	datePicker("#miuslg_loginInfoDtStr");
	datePicker("#miuslg_loginInfoDtEnd");
	
	//당일날자 셋팅
	var today = new Date().toISOString().substring(0, 10);
	$("#miuslg_loginInfoDtStr").val(today);
	$("#miuslg_loginInfoDtEnd").val(today);
	s_frDt = $("#miuslg_loginInfoDtStr").val().replace(/-/g,"");
	s_toDt = $("#miuslg_loginInfoDtEnd").val().replace(/-/g,"");
	
	//팀장급 미만일시
	if(gUsrGrdCd < 30000) {
		$("#miuslg_optSrchtype").val("loginId").prop("disabled", true);
		$("#miuslg_idSrchVal").val(window.sessionStorage.getItem("USR_NM")).prop("disabled", true);
		s_srchtype = $("#miuslg_optSrchtype").val();
		s_srchval = $("#miuslg_idSrchVal").val();
		$(".search_tbl th:eq(0),.sel,.nemo_20").css("display","none");
	}
	$("#miuslg_loginInfoList").jqGrid(
			{
				url : getContextPath() + "/jqgrid/user/loginInfo.do",
				datatype : "json",
				mtype : "POST",
				postData : 
				{
					pJson : getJsonStrMyInfoLoginInfo(s_srchtype, s_srchval, s_frDt, s_toDt)
				},
				jsonReader :
				{
					repeatitems: false
				},
				colNames : ["로그인일자", "이름", "로그인시각", "로그아웃시각", "내선번호", "로그인PC-IP"],
				colModel :
				[
					{ name : "LGN_DT", index : "LGN_DT", align : "center", width : 40 },
					{ name : "USR_NM", index : "USR_NM", align : "center", width : 40 },
					{ name : "LGN_TM", index : "LGN_TM", align : "center", width : 40 },
					{ name : "LGT_TM", index : "LGT_TM", align : "center", width : 40 },
					{ name : "EXTN_NO", index : "EXTN_NO", align : "center", width : 40 },			
					{ name : "LGN_PC_IP", index : "LGN_PC_IP", align : "center", width : 50 },			
				],
				sortname : "LGN_DT",
				sortorder : "desc",
				gridview : true,
				hidegrid : false,
				shrinkToFit : true,
				loadonce : false,
				scrollOffset : 0,
			   	height : "520",
			   	width : "100%",
			   	rowNum : 20,
			   	rowList : [20, 40, 60],
			   	autowidth : true,
			   	pager : "#miuslg_pgLoginInfoList",
			   	rownumbers : true,
			   	rownumWidth : 30,
			   	multiselect : false,
			   	emptyrecords : "",
			   	caption : "",
			   	loadui : "enable",
			   	viewrecords: true,
			   	onSelectRow : function(rowid)
			   	{
			   		
			   	},
			   	onPaging : function(pgButton)
			   	{	   		
				   		
			   	}
			}).jqGrid("navGrid", "#miuslg_pgLoginInfoList", {edit : false, add : false, del : false, search : false});
	
	// 검색타입 선택 이벤트 등록
	//$("#miuslg_optSrchtype").bind("change", optSrchtype_changeEvent);
	// 조회 버튼 클릭 이벤트 등록
	$("#miuslg_btnSearch").bind("click", btnSearch_clickEvent);
	// 초기화 버튼 클릭 이벤트 등록
	$("#miuslg_btnInit").bind("click", btnInit_initEvent);
	// 검색어 텍스트인풋 엔터키 이벤트 등록
	$("#miuslg_idSrchVal").bind("keydown", function (key)
	{
		if (key.keyCode == 13)
			btnSearch_clickEvent();
	});
	//엑셀저장버튼 클릭 이벤트 등록
	$("#miuslg_btnExcel").bind("click", btnExcel_clickEvent);
	
});

//나의로그인
function getJsonStrMyInfoLoginInfo(s_srchtype, s_srchval, s_frDt, s_toDt){
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b2gwMjAubG9naW5JbmZvTGlzdA==",
		"map" : {
			"optSrchType" : s_srchtype,
			"idSrchVal" : s_srchval,
			"frDt" : s_frDt,
			"toDt" : s_toDt,
			"login_usr_id":window.sessionStorage.getItem("USR_ID")
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//검색타입 선택 이벤트
function optSrchtype_changeEvent()
{
	if($("#miuslg_optSrchtype").val() == "all")
	{
		$("#miuslg_idSrchVal").prop("disabled", true);
		$("#miuslg_idSrchVal").val("");
	}
	else
		$("#miuslg_idSrchVal").prop("disabled", false);
}

//조회 버튼 클릭 이벤트
function btnSearch_clickEvent()
{
	s_srchtype = $("#miuslg_optSrchtype").val();
	s_srchval = $("#miuslg_idSrchVal").val();
	s_frDt = $("#miuslg_loginInfoDtStr").val().replace(/-/g,"");
	s_toDt = $("#miuslg_loginInfoDtEnd").val().replace(/-/g,"");

	$("#miuslg_loginInfoList").jqGrid("setGridParam", {postData : {pJson : getJsonStrMyInfoLoginInfo(s_srchtype, s_srchval, s_frDt, s_toDt)}, page : 1, sortname : "LGN_DT", sortorder : "desc"});
	$("#miuslg_loginInfoList").trigger("reloadGrid");
	
}

//초기화 버튼 클릭 이벤트
function btnInit_initEvent()
{
	$("input:radio[name='serviceType']").removeAttr('checked');
	$("input:radio[name='serviceType']:radio[value='day']").prop("checked",true);
	s_srchtype = $("#miuslg_optSrchtype").val("all");
	s_srchval = $("#miuslg_idSrchVal").val("");
	$("#miuslg_loginInfoDtStr").val(getDate());
	$("#miuslg_loginInfoDtEnd").val(getDate());
	s_frDt = $("#miuslg_loginInfoDtStr").val().replace(/-/g,"");
	s_toDt = $("#miuslg_loginInfoDtEnd").val().replace(/-/g,"");
	// 2020.01.20 hhs 초기화 버튼 클릭 권한 추가
	if(gUsrGrdCd < 30000) {
		$("#miuslg_optSrchtype").val("loginId").prop("disabled", true);
		$("#miuslg_idSrchVal").val(window.sessionStorage.getItem("USR_NM")).prop("disabled", true);
		s_srchtype = $("#miuslg_optSrchtype").val();
		s_srchval = $("#miuslg_idSrchVal").val();
		$(".search_tbl th:eq(0),.sel,.nemo_20").css("display","none");
		
		$("#miuslg_loginInfoList").jqGrid("setGridParam", {postData : {pJson : getJsonStrMyInfoLoginInfo(s_srchtype, s_srchval, s_frDt, s_toDt)}, page : 1, sortname : "LGN_DT", sortorder : "desc"});
	}

	$("#miuslg_loginInfoList").jqGrid("setGridParam", {postData : {pJson : getJsonStrMyInfoLoginInfo(s_srchtype, s_srchval, s_frDt,s_toDt)}, page : 1, sortname : "LGN_DT", sortorder : "desc"});
	$("#miuslg_loginInfoList").trigger("reloadGrid");
}

//파라미터 셋팅 loginInfoListExcel
function getJsonStrMyInfoLoginInfoExcel(srchtype, srchval, frDt, toDt)
{			
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b2gwMjAubG9naW5JbmZvTGlzdA==",
		"map" : {
			"key" : "value",
			"optSrchType" : srchtype,
			"idSrchVal" : srchval,
			"frDt" : frDt,
			"toDt" : toDt,
			"sidx" : $("#miuslg_loginInfoList").getGridParam("sortname"),
			"sord" : $("#miuslg_loginInfoList").getGridParam("sortorder"),
			"login_usr_id":"",
			"title" : "로그인이력" + setDownLoadName(frDt, toDt),
			"colWidth" : [20, 20, 20, 20, 20, 20],
			"colName" : ["LGN_DT", "USR_NM", "LGN_TM", "LGT_TM", "EXTN_NO", "LGN_PC_IP"],
			"colHeader" : ["로그인일자", "이름", "로그인시각", "로그아웃시각", "내선번호", "로그인PC-IP"],
			"colAlign" : ["center", "center", "center", "center", "center", "center"]
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

function prt(v){ //날짜계산
	 var tDTTM = new Date(); 
	 if(v=="day"){
  	 tDTTM.setDate(cDTTM.getDate());
	 }if(v=="week"){
		 tDTTM.setDate(cDTTM.getDate()-7); 
	 }if(v=="month"){
		 tDTTM.setMonth(cDTTM.getMonth()-1);
	 }	 
	 $("#miuslg_loginInfoDtStr").val(tDTTM.getYMD());
	}

//엑셀저장버튼 클릭이벤트
function btnExcel_clickEvent()
{
	excelDownLoad(getContextPath() + "/excel/user/loginInfoList.do", getJsonStrMyInfoLoginInfoExcel(s_srchtype, s_srchval, s_frDt, s_toDt));
	
	//var url = getContextPath() + "/excel/user/loginInfoList.do?pJson=" + getJsonStrMyInfoLoginInfoExcel(s_srchtype, s_srchval, s_frDt, s_toDt);
	//window.open(url);
}