//json
//파라미터 셋팅 UserList
function getJsonStrUserList_Emrgncy()
{
	// 권한에 따라 셋팅
	var cntrCd = g_usrGrdCd =="090100"?"":window.sessionStorage.getItem("CNTR_CD");
	
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0TGlzdA==",
		"map" : {
			"key" : "value",
			"notuse" : false,
			"chkRetire" : $("input[id=chkNotUse]:checkbox").prop("checked"),
			"cntr_cd" : cntrCd,
			"sidx" : "CNTR_CD, USR_GRD_CD DESC, CD_ORD, USR_ID",
			"sord" : "asc",	
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 CounselList
function getJsonStremrgyInfoList()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMDEuZW1yZ25jeWxpc3Q=",
		"map" : {
			"key" : "value",
			"emrgncy_start" : $('#selEmrgncyStart').val().replace(/-/g, ""),
			"emrgncy_end" : $("#selEmrgncyEnd").val().replace(/-/g, ""),
			//"mlsfc" : $("#selemSrchIntvMdCd").val(),
			"rcv_usr" : $("#selemrgncylNm").val(),
			"act_stcd" : $("#selEmStCd").val(),
			"rpt" : $("#tfSrchemUsr").val(),
			"rpt_cntct" : $("#tfSrchemTelNo").val().replace(/-/g, ""),
			"qst_cont" :  $("#tfSrchemSub").val(),
			"selemSrchIntvLgCd":$("#selemSrchIntvLgCd").val(),
			"selemSrchIntvMdCd":$("#selemSrchIntvMdCd").val(),
			"selemSrchIntvSmCd":$("#selemSrchIntvSmCd").val(),
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}


function getJsonEmrgncyInfoExcel(){//긴급정보 엑셀가져오기
	
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "Y2gwMDEuZW1yZ25jeWxpc3Q=",
			"map" : {
				"key" : "value",
				"emrgncy_start" : $('#selEmrgncyStart').val().replace(/-/g, ""),
				"emrgncy_end" : $("#selEmrgncyEnd").val().replace(/-/g, ""),
				"mlsfc" : $("#selemSrchIntvMdCd").val(),
				"rcv_usr" : $("#selemrgncylNm").val(),
				"act_stcd" : $("#selEmStCd").val(),
				"rpt" : $("#tfSrchemUsr").val(),
				"rpt_cntct" : $("#tfSrchemTelNo").val().replace(/-/g, ""),
				"qst_cont" :  $("#tfSrchemSub").val(),
				"title" : "긴급정보 ("+($("#selemSrchIntvMdCd").val()=="all"?"전체":$("#selemSrchIntvMdCd").val()=="90010100"?"버스결행 정보":"로드킬 정보")+")",
				"sidx" : "RCV_DT_FORMAT",
				"sord" : "ASC",
				"colWidth" : [20,10,40,80,10,20,10],
				"colName" : ["RCV_DT_FORMAT", "RCV_USR_NM", "INTV_NM", "RCV_CONT", "RPT","RPT_CNTCT_INFM","ACT_ST_NM"],
				"colHeader" : ["접수일시","상담사","상담유형", "신고내용", "신고자","연락처","상담결과"],
				"colAlign" : ["center","center", "center", "center","center", "center", "center"]//,
				//"rows" : "10"
			}
		};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));		
}

//초기화
function initEmrgncy_Data(){
	datePicker("#selEmrgncyStart");//시작날짜
	$("#selEmrgncyStart").val(getDate());//시작날짜
	
	datePicker("#selEmrgncyEnd");//날짜
	$("#selEmrgncyEnd").val(getDate());//오늘날짜 기준
	
	/*2018.10.12 상담유형 세팅 변경 부분 */
	setObjectSelectBoxWithCode("selemSrchIntvLgCd", "전체", "1", "", "","",""); // 상담유형 대분류
	setObjectSelectBoxWithCode("selemSrchIntvMdCd", "전체", "2", "", "","",""); // 상담유형 중분류
	setObjectSelectBoxWithCode("selemSrchIntvSmCd", "전체", "3", "", "","",""); // 상담유형 소분류
	/*2018.10.12 상담유형 세팅 변경 부분 끝*/
	
	$("#selemrgncylNm").val("all");//상담사
	
	$("#tfSrchemUsr").val("");//신고자
	
	$("#tfSrchemSub").val("");//신고내용
	
	$("#tfSrchemTelNo").val("");//전화번호 초기화
	
	//상세내용 초기화
	$("#rcvDtemr").text("");
	$("#crncySe").html("");
	$("#cvplUsr").html("");
	$("#cvplSe").html("");
	$("#crncyNum").html("");
	$("#crncyTime").html("");
	$("#emrgncyMemo").html("");
	$("#emr_CnslType").html("");
	$("#modifyDt").html("");
	$("#sttemntUsr").html("");
	$("#emrgncyTelno").html("");
	$("#chrgDept").html("");
	$("#cnsltType").html("");
	$("#sttemntCont").html("");
	$("#answerCont").html("");
	$("#cnsltResult").html("");
	$("#cvplIncln").html("");
	$("#emrSaveDt").html("");
	$("#tblemrgncyInfoList").jqGrid("setGridParam", { postData :  { pJson : getJsonStremrgyInfoList()},page : 1,sortname : "RCV_DT_FORMAT",sortorder : "desc"});
	$("#tblemrgncyInfoList").trigger("reloadGrid");
	//$("#selemrgncylNm").val("all");
	//$("#selemrgncylNm").val(window.sessionStorage.getItem("USR_ID"));
}
//초기 이벤트 함수
function emrgncyMainInitEvent(){
	datePicker("#selEmrgncyStart");//시작날짜
	$("#selEmrgncyStart").val(getDate());//시작날짜
	
	datePicker("#selEmrgncyEnd");//날짜
	$("#selEmrgncyEnd").val(getDate());//오늘날짜 기준
	
	var g_ListPopup = "CHILD";

	/*2018.10.12 상담유형 세팅 변경 부분 */
	/*2018.10.22 상담유형 세팅 변경 부분 */
	setObjectSelectBoxWithCode("selemSrchIntvLgCd", "전체", "1", "", "","",""); // 상담유형 대분류
	//setObjectSelectBoxWithCode("selemSrchIntvMdCd", "전체", "2", "", "","",""); // 상담유형 중분류
	//setObjectSelectBoxWithCode("selemSrchIntvSmCd", "전체", "3", "", "","",""); // 상담유형 소분류
	
	$("#selemSrchIntvLgCd").bind("change", function()	{
		setObjectSelectBoxWithCode("selemSrchIntvMdCd", "전체", "2", "", $("#selemSrchIntvLgCd").val(),"","CHANGE");
	});
	
	$("#selemSrchIntvMdCd").bind("change", function()	{
		setObjectSelectBoxWithCode("selemSrchIntvSmCd", "전체", "3", "", $("#selemSrchIntvMdCd").val(),"","CHANGE");
	});
	$("#selemSrchIntvLgCd").trigger("change");
	/*2018.10.12 상담유형 세팅 변경 부분 끝*/
	/*2018.10.22 상담유형 세팅 변경 부분 끝*/
	
	setSelectBoxWithCode("selEmStCd", "전체", "90013", "", "", "");	// 상담결과 셋팅	
	
	$("#selemrgncylNm").val("all");//상담사
	
	$("#tfSrchemUsr").val("");//신고자
	
	$("#tfSrchemSub").val("");//신고내용
	$("#emrSaveDt").html("");
	emrgncyInfoList();
}

//엑셀저장 버튼 클릭 이벤트
function btnExelSave_clickEmrevent()
{
	var url = getContextPath() + "/excel/main/emrgncyInfo.do?pJson=" + getJsonEmrgncyInfoExcel();
	window.open(url);
}

//jqgrid
function emrgncyInfoList(){
	$("#tblemrgncyInfoList").jqGrid(
			{
				url : getContextPath() + "/jqgrid/main/emrgncyInfo.do",
				datatype : "json",
				mtype : "POST",
				postData : {
					pJson : getJsonStremrgyInfoList()
				},
				jsonReader :
				{
					repeatitems: false
				},
				colNames : ["접수일시", "상담사","상담유형", "신고내용", "신고자", "연락처", "상담결과","CUST_NM","CST_TYPE_NM","CST_COMP_NM","CALL_GB_NM","CNTCT_INFM_FORMAT","CALL_TIME","ACT_TYPE_NM","MOD_INFO","CRT_INFO","ACT_CONT"],
			   	colModel :
			   	[
					{ name : "RCV_DT_FORMAT", index : "RCV_DT_FORMAT", align : "center", width : 120},//접수일시
					{ name : "RCV_USR_NM", index : "RCV_USR_NM", align : "center", width : 60 },//상담사
					{ name : "INTV_NM", index : "CUST_NM", align : "left", width : 270},//상담유형
					{ name : "RCV_CONT", index : "LANG_NM", align : "left", width : 210 },//문의내용
					{ name : "RPT", index : "CNTCT_INFM_FORMAT", align : "center", width : 50 },//신고자
					{ name : "RPT_CNTCT_INFM", index : "INTV_NM", align : "left", width : 80 },//연락처
					{ name : "ACT_ST_NM", index : "ACT_TYPE_NM", align : "center", width : 60 },//상담결과
					
					{ name : "CUST_NM", index : "CUST_NM", align : "center", width : 60,hidden:true},//민원인
					{ name : "CST_TYPE_NM", index : "CST_TYPE_NM", align : "center", width : 60,hidden:true},//민원인구분
					{ name : "CST_COMP_NM", index : "CST_COMP_NM", align : "center", width : 60,hidden:true},//민원인성향
					{ name : "CALL_GB_NM", index : "CALL_GB_NM", align : "center", width : 60 ,hidden:true},//통화구분
					{ name : "CNTCT_INFM_FORMAT", index : "CNTCT_INFM_FORMAT", align : "center", width : 60 ,hidden:true},//통화번호
					{ name : "CALL_TIME", index : "CALL_TIME", align : "center", width : 60 ,hidden:true},//통화시간
					{ name : "ACT_TYPE_NM", index : "ACT_TYPE_NM", align : "center", width : 60 ,hidden:true},//처리유형
					{ name : "MOD_INFO", index : "MOD_INFO", align : "center", width : 60 ,hidden:true},//수정날짜
					{ name : "CRT_INFO", index : "CRT_INFO", align : "center", width : 60 ,hidden:true},//등록날짜
					{ name : "ACT_CONT", index : "ACT_CONT", align : "center", width : 60 ,hidden:true}//답변내용
			   	],
			   	sortname : "RCV_DT_FORMAT",
			   	sortorder : "desc",
			   	gridview : true,
			   	hidegrid : false,
			   	shrinkToFit : true,
			   	loadonce : false,
			   	scrollOffset : 0,
			   	height : "350",
			   	width : "100%",
			   	rowNum : 10,
			   	rowList : [10, 20, 30, 50, 100],
			   	autowidth : true,
			   	pager : "#pgEmrgncyList",
			   	rownumbers : true,
			   	rownumWidth : 30,
			   	multiselect : false,
			   	emptyrecords : "",
			   	caption : "",
			   	loadui : "enable",
			   	viewrecords: true,
			   	onSelectRow : function(rowid)
			   	{
			   		var RCV_USR_NM=$("#tblemrgncyInfoList").getCell(rowid, "RCV_USR_NM");//상담사
			   		var RCV_DT_FORMAT=$("#tblemrgncyInfoList").getCell(rowid, "RCV_DT_FORMAT");//접수일시
			   		var INTV_NM=$("#tblemrgncyInfoList").getCell(rowid, "INTV_NM");//상담유형
			   		var RPT=$("#tblemrgncyInfoList").getCell(rowid, "RPT");//신고자
			   		var RPT_CNTCT_INFM=$("#tblemrgncyInfoList").getCell(rowid, "RPT_CNTCT_INFM");//연락처
			   		var ACT_ST_NM=$("#tblemrgncyInfoList").getCell(rowid, "ACT_ST_NM");//상담결과
			   		var RCV_CONT=$("#tblemrgncyInfoList").getCell(rowid, "RCV_CONT");//신고내용
			   		
			   		
			   		var CUST_NM=$("#tblemrgncyInfoList").getCell(rowid, "CUST_NM");//민원인
			   		var CST_TYPE_NM=$("#tblemrgncyInfoList").getCell(rowid, "CST_TYPE_NM");//민원인 구분
			   		var CST_COMP_NM=$("#tblemrgncyInfoList").getCell(rowid, "CST_COMP_NM");//민원인 성향
			   		var CALL_GB_NM=$("#tblemrgncyInfoList").getCell(rowid, "CALL_GB_NM");//통화구분
			   		var CNTCT_INFM_FORMAT=$("#tblemrgncyInfoList").getCell(rowid, "CNTCT_INFM_FORMAT");//통화번호
			   		var CALL_TIME=$("#tblemrgncyInfoList").getCell(rowid, "CALL_TIME");//통화시간
			   		var ACT_TYPE_NM=$("#tblemrgncyInfoList").getCell(rowid, "ACT_TYPE_NM");//처리유형
			   		var CALL_TIME=$("#tblemrgncyInfoList").getCell(rowid, "CALL_TIME");//통화시간
			   		var ACT_TYPE_NM=$("#tblemrgncyInfoList").getCell(rowid, "ACT_TYPE_NM");//처리유형
			   		var MOD_INFO=$("#tblemrgncyInfoList").getCell(rowid, "MOD_INFO");//수정정보
			   		var CRT_INFO=$("#tblemrgncyInfoList").getCell(rowid, "CRT_INFO");//등록정보
			   		var ACT_CONT=$("#tblemrgncyInfoList").getCell(rowid, "ACT_CONT");//답변내용
			   		
			   		//--------------------------------------
			   		$("#rcvDtemr").html(RCV_DT_FORMAT);//접수일시
			   		$("#cvplUsr").html(CUST_NM);//민원인
			   		$("#cvplSe").html(CST_TYPE_NM);//민원인 구분
			   		$("#cvplIncln").html(CST_COMP_NM);//민원인 성향
			   		$("#crncySe").html(CALL_GB_NM);//통화구분
			   		
			   		$("#crncyNum").html(CNTCT_INFM_FORMAT);//통화번호
			   		$("#crncyTime").html(CALL_TIME);//통화시간
			   		$("#emr_CnslType").html(ACT_TYPE_NM);//처리유형
			   		$("#cnsltResult").html(ACT_ST_NM);//상담결과
			   		$("#emrSaveDt").html(CRT_INFO);//등록일시
			   		
			   		$("#modifyDt").html(MOD_INFO);//수정일시
			   		$("#cnsltType").html(INTV_NM);//상담유형
			   		$("#emrgncyTelno").html(RPT_CNTCT_INFM);//신고자전화번호
			   		$("#sttemntUsr").html(RPT);//신고자
			   		$("#sttemntCont").html(RCV_CONT);
			   		$("#answerCont").html(ACT_CONT);
			   		
			   	},
			   	onPaging : function(pgButton){ },
			   	error : function(data, status, err) { networkErrorHandler(data, status, err); },
				gridComplete : function(){}
			}).jqGrid("navGrid", "#pgEmrgncyList", {edit : false, add : false, del : false, search : false});
	//화면 넓이에 따라 그리드 넓이 조절
	$(window).bind('resize', function() {
	    jQuery("#tblemrgncyInfoList").setGridWidth($("#divRCTabEmrgncyInfo").width(), true);
	}).trigger('resize');
}

//검색했을때
function emrgncy_SearchClickEvent(){
	$("#tblemrgncyInfoList").jqGrid("setGridParam", {postData :  {pJson : getJsonStremrgyInfoList()}, page : 1, sortname : "RCV_DT_FORMAT", sortorder : "desc"});
	$("#tblemrgncyInfoList").trigger("reloadGrid");
}

// 메인화면 로딩 시 부하 감소를 위한 function 변경
function initdivRCTabEmrgncyInfo(){
	emrgncyMainInitEvent();
	$("#btnemrInit").bind("click",initEmrgncy_Data);//초기화
	$("#btnemrExcel").bind("click",btnExelSave_clickEmrevent);//엑셀다운로드
	$("#btnSearchEmr").bind("click",emrgncy_SearchClickEvent);//검색하기
	//setSelectBoxWithAgent("selemrgncylNm", "전체", "main",window.sessionStorage.getItem("USR_ID"),"010000","","","","" );
}