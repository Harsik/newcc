//조회조건 및 조회값
var g_srchtype = "ttl";
var g_srchval = "";
var g_tbbsStrtDt = "";
var g_tbbsEndDt = "";

var currRowid = "";
var currTbbsId = "";
var isModComm = false;

var g_rowId = "";
var g_showNoticeFlag = false;

var isMgr = false;
var usrSelect = window.sessionStorage.getItem("USR_GRD_CD");

function userSelect(){
	//select
	$.ajax({
	    type : "post",
	    dataType: "json",
	    async : false,
	    url : getContextPath() + "/ajax/user/userList.do",
	    data : "pJson=" + getJsonStrUserList(),
	    success : function(data)
	    {
	     $("#k").html("");
	     
	     // param값을 JSON으로 파싱
	     var value = "";
	     value += "<option value='all'>전체</option>";
	     
	     $.each(data, function(key, state)
	     {
	    	
	      value += "<option value='" + state.CD + "'>" + state.CD_NM + "</option>";
	     });
	     
	     $("#optLangList").append(value);
	     $("#optLangList").val("all");
	    },
	    error : function(data, status, err) 
	    {
	    	alert("상담사 리스트를 불러오지 못합니다\n담당자에게 문의해주세요.");
	    }
	   });
}

//파라미터 셋팅 UserList
function getJsonStrUserList()
{
 var loParam = {
  "qt" : "c2VsZWN0TGlzdA==",
  "mi" : "Y2gwMDEubGFuZ2NkTGlzdA==",
  "map" : {
   "key" : "value"
  }
 };
 console.log(JSON.stringify(loParam));
 return  encodeURIComponent(JSON.stringify(loParam));
}

//초기화 버튼
function btnInit_ClicikEvent(){
	 $("#optLangList").val("all");
	
	//현재 월 1일부터 현재일까지 디폴트 셋팅
	 g_tbbsStrtDt = $("#optYear").val().replace(/-/g,"");
	//reload grid
		$("#tblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectmalignancyCustomerList(g_tbbsStrtDt)}, 
			page : 1, sortname : "lang", sortorder : "desc"});
		$("#tblNotifyList").trigger("reloadGrid");
	
}
//검색버튼
function btnSearch_ClicikEvent(){
	
	
	g_tbbsStrtDt = $("#optYear").val().replace(/-/g,"");

	//reload grid
	$("#tblNotifyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectmalignancyCustomerList(g_tbbsStrtDt)}, 
		page : 1, sortname : "lang", sortorder : "desc"});
	$("#tblNotifyList").trigger("reloadGrid");
}
//다운로드버튼
function btnDown_ClicikEvent(){
	var startDay = $("#optYear").val();
	window.open("http://" + window.location.hostname + ":8090/ClipReport4/langCounsel.jsp?startDay="+startDay+"&usr_nm="+encodeURI(encodeURIComponent(window.sessionStorage.getItem("USR_NM"))));
}


//파라미터셋팅 langCounselList
function getJsonStrSelectmalignancyCustomerList(tbbsStrtDt) {
	var loParam = {
		"qt" :	"c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMDEubGFuZ0NvdW5zZQ==",
		"map" : {
			"key" : "value",
			"lang_cd" : $("#optLangList").val(),
			"tbbs_strt_dt" : tbbsStrtDt
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//실행함수
$(document).ready(function(){
	changeTerm();
	$("#btnExcel").css("display","none");
	//권한
	if(usrSelect != null && usrSelect != "")
	{
		if(usrSelect >= "030100"){
			isMngr = true;
		$("#btnExcel").css("display","inline-block");
		}else{
			isMngr = false;
		$("#btnExcel").css("display","none");
		}
	}
	
	
	//현재 월 1일부터 현재일까지 디폴트 셋팅
	$("#tfTbbsStrtDt").val(getDate().substr(0, 8) + "01");
	$("#tfTbbsEndDt").val(getDate());	
	
	//날짜 삽입 방지
	$("#tfTbbsStrtDt").attr("disabled",true); 
	$("#tfTbbsEndDt").attr("disabled",true);
	//날짜
	datePicker("#tfTbbsStrtDt");
	datePicker("#tfTbbsEndDt");
	
	//사용자 리스트
	userSelect();
	
	//초기화버튼
		$("#btnInit").bind("click",btnInit_ClicikEvent);
	//검색버튼
		$("#btnSearch").bind("click",btnSearch_ClicikEvent);
	//다운로드버튼
		$("#btnExcel").bind("click",btnDown_ClicikEvent);
		
   //리스트
		/*//현재 월 1일부터 현재일까지 디폴트 셋팅
		$("#tfTbbsStrtDt").val(getDate().substr(0, 8) + "01");
		$("#tfTbbsEndDt").val(getDate());	*/
		
		//g_tbbsStrtDt = $("#tfTbbsStrtDt").val().replace(/-/g,"");
		//g_tbbsEndDt = $("#tfTbbsEndDt").val().replace(/-/g,"");
		
		$("#tblNotifyList").jqGrid({
			url : getContextPath() + "/jqgrid/board/langCounsel.do",
			datatype : "json",
			mtype : "POST",
			postData : {
				pJson : getJsonStrSelectmalignancyCustomerList(g_tbbsStrtDt)
			},
			jsonReader : {
				repeatitems: false
			},
			colNames : ["어권구분", "1월", "2월","3월","4월", "5월", "6월","7월","8월", "9월", "10월","11월","12월","계"],
			colModel : [
			            { name : "LANG", index : "LANG", width : 40, align: "center"},
			            { name : "M01", index : "M01",align: "center" ,width :20 },
				        { name : "M02", index : "M02", width :20, align: "center" },
			            { name : "M03", index : "M03",align: "center" ,width :20 },
			            { name : "M04", index : "M04",align: "center" ,width :20 },
			            { name : "M05", index : "M05",align: "center" ,width :20 },
			            { name : "M06", index : "M06",align: "center" ,width :20 },
			            { name : "M07", index : "M07",align: "center" ,width :20 },
			            { name : "M08", index : "M08",align: "center" ,width :20 },
			            { name : "M09", index : "M09",align: "center" ,width :20 },
			            { name : "M10", index : "M10",align: "center" ,width :20 },
			            { name : "M11", index : "M11",align: "center" ,width :20 },
			            { name : "M12", index : "M12",align: "center" ,width :20 },
				        { name : "TOTAL", index : "TOTAL", width :20, align: "center" }],
	        sortname : "lang",
	        sortorder : "desc",
	        gridview : true,
	        hidegrid : false,
	        shrinkToFit : true,
	        loadonce : false,
	        scrollOffset : 0,
	        height : "308",
	        width : "80%",
	        rowNum : 10,
	        rowList : [10, 20, 30, 50,70,20,20,20],
	        autowidth : true,
	        pager : "#pgNotifyList",
	        rownumbers : true,
	        rownumWidth : 30,
	        emptyrecords : "",
	        caption : "",
	        loadui : "enable",
	        viewrecords: true,
	        multiselect: false,
	        onCellSelect : function(rowid, iCol, cellContent, e){},
			gridComplete : function(){},
	        error : function(data, status, err)
	        {
	        	networkErrorHandler(data, status, err);
	        }
		}).jqGrid("navGrid", "#pgNotifyList", {edit : false, add : false, del : false, search : false});
		
});



//기간 셀렉트 박스별 상세 검색
function changeTerm()
{
	var d = new Date();
	var termType = "month";
	
	if(termType == "month")
	{
		var currentYear = d.getFullYear();
		var selectBox = "";
		selectBox +=  "<select id = 'optYear' style ='width : 100px; margin-left : 5px;' >";
		for(var i = 2017; i <= currentYear; i++)
		{
			selectBox +=  "<option value = '" + i + "'>" + i + "년"+"</option>";
		}
		selectBox +=  "</select>";
		
		$("#termDetail").empty();
		$("#termDetail").append(selectBox);
		$("#optYear").val(currentYear);
	}
	else if(termType == "day")
	{
		var currentYear = d.getFullYear();
		var optYear =  "";
		var currentMonth = d.getMonth() + 1;
		optYear +=  "<select id = optDayYear style ='width : 100px; margin-left : 5px;'>";
		for(var i = 2015; i <= currentYear; i++)
		{
			optYear +=  "<option value = '" + i + "'>" + i + "년"+"</option>";
		}
		optYear +=  "</select>";
		
		var optMonth = "";
		optMonth += "<select id = optDayMonth style ='width : 100px; margin-left : 10px;'>";
		for(var i = 1; i <= 12; i++)
		{
			optMonth +=  "<option value = '" + i + "'>" + i + "월"+"</option>";
		}
		optMonth += "</select>";
		
		$("#termDetail").empty();
		$("#termDetail").append(optYear);
		$("#termDetail").append(optMonth);
		$("#optDayYear").val(currentYear);
		$("#optDayMonth").val(currentMonth);
		
	}
}