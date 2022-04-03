// 세션에서 불러오기
var usrGrdCd 	= window.sessionStorage.getItem("USR_GRD_CD");
var deptCd		= window.sessionStorage.getItem("DEPT_CD");
var teamCd		= window.sessionStorage.getItem("TEAM_CD");
var cntrCd 		= window.sessionStorage.getItem("CNTR_CD");
var usrId 		= window.sessionStorage.getItem("USR_ID");

// 상담사 불러오기
function getJsonStrUserList(){
	// 권한에 따라 셋팅
	var cntrCd = $("#selSrchCntrCd").val();
	var teamCd = $("#selSrchTeamCd").val();
	var deptCd = $("#selSrchDeptCd").val();
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"notuse" : false,
			"chkRetire" : false,
			"cntr_cd" : cntrCd,
			"team_cd" : teamCd,
			"dept_cd" : deptCd,
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_CustInfo
function getJsonStrCustInfo(custId){
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "Y20wMDMuZ2V0Q3VzdEluZm8=",
		"map" : {
			"key" : "value",
			"cust_id" : custId
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_CustModInfo
function getJsonStrCustModInfo(wrkId){
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "Y2gwMDMuc2VsZWN0T25l",
		"map" : {
			"key" : "value",
			"wrk_id" : wrkId
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 파라미터 셋팅_CustModHistory
function getJsonStrcustModHistory(){
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y2gwMDMuc2VsZWN0TGlzdA==",
			"map" : {
				"key" : "value",
				"cntr_cd" : $("#selSrchCntrCd").val(),
				"team_cd" : $("#selSrchTeamCd").val(),
				"dept_cd" : $("#selSrchDeptCd").val(),
				"usr_id" : $("#counsType1").val(),
				"cust_id" : $("#srchCustID").val(),
				"wrk_cl" : $("#selSrchWrkCl").val()
			}
		};	
		console.log(JSON.stringify(loParam));
		return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_CodeSpec
function getJsonStrCodeSpec(tp_cd, cd){
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "c20wMDIuY29kZXNwZWM=",
		"map" : {
			"key" : "value",
			"tp_cd" : tp_cd,
			"cd" : cd
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

// 민원인선택 버튼 클릭 이벤트
function btnSelectCust_clickEvent(){
	window.sessionStorage.setItem("setCustInfoPopupType", "modal");
	window.sessionStorage.setItem("parentCustId", "");
	window.sessionStorage.setItem("setCustInfoType", "main");
	window.sessionStorage.setItem("setCustInfoPopupSearchNm", "");
	window.sessionStorage.setItem("setCustInfoPopupSearchPhnNum", "");
	
	var width = 1200;
	var height = 728;
	var paramURL = getContextPath() + "/web/counsel/customerManage.do?popup=PCHILD";
	
	var top = window.screenTop + (screen.height - height)/4  ;
	var left = window.screenLeft + (screen.width - width)/4  ;
					
	var option = "width=" + width + ", height=" + height + ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" + top + ",left=" + left +"";
					
	
	//var custId = window.showModalDialog(paramURL, self, "dialogWidth:" + width + "px; dialogHeight:" + height + "px; center=yes; resizable=no; status=no; scroll=no; help=no; ");
	var custId = window.open(paramURL, "modal", option);
	
	// showModalDialog 일때
	//if(custId != null)
	//	setCustInfo(custId);
}

//민원인정보를 가져와 화면에 셋팅
function setCustInfo(custId){
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/counsel/getCustInfo.do",
		data : "pJson=" + getJsonStrCustInfo(custId),
		success : function(data){
			$("#srchCustID").val(data.CUST_ID);
			$("#srchCustNM").val(data.CUST_NM);
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

// 조회 버튼 클릭 이벤트
function btnSearch_clickEvent(){
	$("#tblModHistory").jqGrid("setGridParam", {postData : {pJson : getJsonStrcustModHistory()}, page : 1, sortname : "WRK_DTM", sortorder : "desc"});
	$("#tblModHistory").trigger("reloadGrid");
}

function selAffiliation(){//head 셀렉트박스
	
	//센터 코드 선택했을때
	$("#selSrchCntrCd").bind("change", function(){
		if($("#selSrchCntrCd").val()=="010000"){
			setObjSelectBoxWithCode("selSrchTeamCd", "전체", "", "CHILD", "90003", "");
			
		}
		if($("#selSrchCntrCd").val()=="990000"){
			$("#selSrchTeamCd option[value!='all'],#selSrchDeptCd option[value!='all']").remove();
		}
		setSelectBoxWithAgent("counsType1", "전체", "CHILD","",$("#selSrchCntrCd").val(),"","","","" );
	});
	
	$("#selSrchTeamCd").bind("change", function(){
		
		setSelectBoxWithAgent("counsType1", "전체", "CHILD","",$("#selSrchCntrCd").val(),$("#selSrchTeamCd").val(),"",window.sessionStorage.getItem("USR_ID"),"" );
	});
	
	// 조회 부분 소속 정보 셋팅
	setObjSelectBoxWithCode("selSrchCntrCd", "전체", "", "CHILD", "90002", "");
	$("#selSrchTeamCd,#selSrchDeptCd").append("<option value='all'>전체</option>");
	
}

// 초기화 버튼 클릭 이벤트
function btnInit_clickEvent(){
	initSpec();
	
	// 센터 셀렉트 박스 셋팅
	$("#selSrchCntrCd").val("all");
	
	$("#counsType1 option[value!='all'],#selSrchTeamCd option[value!='all'],#selSrchDeptCd option[value!='all']").remove();
	//$("#counsType1").append("<option value='all'>전체</option>");
	$("#srchCustID").val("");
	$("#srchCustNM").val("");
	$("#selSrchWrkCl").val("all");
	
	$("#tblModHistory").jqGrid("setGridParam", {postData : {pJson : getJsonStrcustModHistory()}, page : 1, sortname : "WRK_DTM", sortorder : "desc"});
	$("#tblModHistory").trigger("reloadGrid");
}

//상세 정보 초기화
function initSpec(){
	$("#tdWrkId").html("");
	$("#tdWrkDtm").html("");
	$("#tdCorpNm").html("");
	$("#tdCustNm").html("");
	$("#tdCntrNm").html("");
	$("#tdUsrNm").html("");
	
	$("#specCustNm").html("");
	$("#specCorpNm").html("");
	$("#specComp").html("");
	$("#specCellNo").html("");
	$("#specOfficeNo").html("");
	$("#specMemo").html("");
	$("#specPhoneNo").html("");
	$("#specFarmNo").html("");
	$("#specEmailAddr").html("");
	$("#specFaxNo").html("");
	$("#specCustType").html("");
	$("#specAddrNo").html("");
}

// 이벤트 등록
function initEvent(){
	
	selAffiliation();
	
	// 민원인선택 버튼 클릭 이벤트
	$("#btnSelectCust").bind("click", btnSelectCust_clickEvent);
	
	// 조회 버튼 클릭 이벤트
	$("#btnSearch").bind("click", btnSearch_clickEvent);
	
	// 초기화 버튼 클릭 이벤트
	$("#btnInit").bind("click", btnInit_clickEvent);
	
	
}

// 그리드 초기화
function initGrid(){
	$("#tblModHistory").jqGrid({
		url : getContextPath() + "/jqgrid/management/custModHistory.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrcustModHistory()
		},
		jsonReader :{
			repeatitems: false
		},
		colNames : ["작업 ID", "작업일시", "작업구분", "민원인명", "소속", "상담사"],
	   	colModel :
	   	[
	   	 	{ name : "WRK_ID", index : "WRK_ID", hidden : true },
	   	 	{ name : "WRK_DTM", index : "WRK_DTM", align : "center" },
			{ name : "WRK_CL", index : "WRK_CL", align : "center" },
			{ name : "CUST_NM", index : "CUST_NM", align : "center" },
			{ name : "CNTR_NM", index : "CNTR_NM", align : "center" },
			{ name : "USR_NM", index : "USR_NM", align : "center" }
	   	],
	   	sortname : "WRK_DTM",
	   	sortorder : "desc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "260",
	   	width : "100%",
	   	rowNum : 10,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#pgModHistory",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid){
	   		initSpec();
	   		
	   		var row = $("#tblModHistory").getRowData(rowid);

	   		// 상세 정보 가져옴
	   		$.ajax({
	   			type : "post",
	   			dataType: "json",
	   			async : true,
	   			url : getContextPath() + "/ajax/counsel/getCustModInfo.do",
	   			data : "pJson=" + getJsonStrCustModInfo(row.WRK_ID),
	   			success : function(data){
	   				$("#tdWrkId").html(data.WRK_ID);
	   				$("#tdWrkDtm").html(data.WRK_DTM);
	   			//	$("#tdCorpNm").html(data.CORP_NM);
	   				$("#tdCustNm").html(data.CUST_NM);
	   				$("#tdCntrNm").html(data.CNTR_NM);
	   				$("#tdUsrNm").html(data.USR_NM);
	   				
	   				var modContArr = data.MOD_CONT.split("\|\|");
	   				
/*	   				$("#specCustNm").html(modContArr[1]);
	   				$("#specCorpNm").html(modContArr[2]);
	   				$("#specCellNo").html(getPhoneNumFormat(modContArr[5]));
	   				$("#specOfficeNo").html(getPhoneNumFormat(modContArr[6]));
	   				$("#specMemo").html(modContArr[10]);
	   				$("#specPhoneNo").html(getPhoneNumFormat(modContArr[7]));
	   				$("#specFarmNo").html(modContArr[11]);
	   				$("#specEmailAddr").html(modContArr[8]);
	   				$("#specFaxNo").html(getPhoneNumFormat(modContArr[9]));
	   				$("#specAddrNo").html(modContArr[12]);*/
	   				
	   				$("#specCustNm").html(modContArr[1]);
	   				$("#specCorpNm").html(modContArr[2]);    //
	   				$("#specCellNo").html(getPhoneNumFormat(modContArr[6]));
	   				$("#specOfficeNo").html(getPhoneNumFormat(modContArr[7]));
	   				$("#specMemo").html(modContArr[11]);
	   				//$("#specPhoneNo").html(getPhoneNumFormat(modContArr[8]));
	   				$("#specFarmNo").html(modContArr[12]);   //
	   				$("#specEmailAddr").html(modContArr[9]); //
	   				$("#specFaxNo").html(getPhoneNumFormat(modContArr[10]));
	   				//$("#specAddrNo").html(modContArr[13]);
	   				//민원인유형
	   				$.ajax({
	   					type : "post",
	   					dataType: "json",
	   					async : true,
	   					url : getContextPath() + "/ajax/management/codespec.do",
	   					data : "pJson=" + getJsonStrCodeSpec("90043", modContArr[3]),
	   					success : function(data){
	   						$("#specCustType").html(data.CD_NM);
	   					},
	   					error : function(data, status, err) {
	   						networkErrorHandler(data, status, err);
	   					}
	   				});
	   				//민원성향
	   				$.ajax({
	   				    type : "post",
	   				    dataType: "json",
	   				    async : true,
	   				    url : getContextPath() + "/ajax/management/codespec.do",
	   				    data : "pJson=" + getJsonStrCodeSpec("90048", modContArr[4]),
	   				    success : function(pData){
	   					$("#specComp").html(pData.CD_NM);
	   					
	   					$.ajax({
	   					    type : "post",
	   					    dataType: "json",
	   					    async : true,
	   					    url : getContextPath() + "/ajax/management/codespec.do",
	   					    data : "pJson=" + getJsonStrCodeSpec("90901", modContArr[5]),
	   					    success : function(data){
	   						if(data){
	   						    $("#specComp").html(pData.CD_NM+">"+data.CD_NM);
	   						}
	   					    },	
	   					    error : function(data, status, err) {
	   						networkErrorHandler(data, status, err);
	   					    }
	   					});
	   				    },
	   				    error : function(data, status, err) {
	   					networkErrorHandler(data, status, err);
	   				    }
	   				});
	   				
	   				
	   				
	   			},
	   			error : function(data, status, err) {
	   				networkErrorHandler(data, status, err);
	   			}
	   		});
	   	},
	   	onPaging : function(pgButton){	   		
	   		initSpec();
	   	}
	}).jqGrid("navGrid", "#pgModHistory", {edit : false, add : false, del : false, search : false});
}

//페이지 초기화
$(document).ready(function(){
	
	initEvent();
	initGrid();
	// 권한에 따른 설정
	if(usrGrdCd != "060100" && usrGrdCd != "090100")
		$("#selSrchCntrCd").prop("disabled", true);
	
});