// 조회 조건 및 조회 값

var g_usrId = window.sessionStorage.getItem("USR_ID");

var date = new Date(getDate());
var oneMonth = new Date(date);
//oneMonth.setDate(oneMonth.getDate() - 30);
var nm = new Date(oneMonth);

var year = nm.getFullYear();
var month = nm.getMonth() + 1;
var day = nm.getDate();

if(month < 10)
	month = "0"+month;
if(day < 10)
	day = "0"+day;

var newMonth = year + "-" + month;
var newMonDay = year + "-" + month + "-" + day;

var isinitdivKpiData = false;
var isinitdivKpiResult = false;

var agtTabs;

//파라미터 셋팅 getJsonStrSelectKpiDataList
function getJsonStrSelectKpiDataList()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b2gwMjUuc2VsZWN0S3BpRGF0YUxpc3Q=",
		"map" : {
			"key" : "value",
			"yymm" : $("#agtkpi_selDate").val().replace(/[-, :, \s]/g,"").substring(0, 6),	
			"prdctvFrYm" : $("#agtkpi_selFrDate").val().replace(/[-, :, \s]/g,""),
			"prdctvToYm" : $("#agtkpi_selToDate").val().replace(/[-, :, \s]/g,""),
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 getJsonStrSelectKpiResultList
function getJsonStrSelectKpiResultList()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b2gwMjUuc2VsZWN0S3BpUmVzdWx0TGlzdA==",
		"map" : {
			"key" : "value",
			"yymm" : $("#agtkpi_selDate").val().replace(/[-, :, \s]/g,"").substring(0, 6),	
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 getJsonStrKpiResultListDelete
function getJsonStrKpiResultListDelete()
{
	var loParam = {
		"qt" : "ZGVsZXRl",
		"mi" : "b2gwMjUuZGVsZXRlS3BpUmVzdWx0",
		"map" : {
			"key" : "value",
			"yymm" : $("#agtkpi_selDate").val().replace(/[-, :, \s]/g,"").substring(0, 6),	
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 getJsonStrAgtKpiDataListExcel
/*
 * [colHeader 파라메터 설정]
 * 
 * "상담품질(40점), R, 3, 7" : 헤더타이틀, Row 병합, 시작위치, 병합 Cols 갯수
 * "USR_ID, C, 0, 3" : 셀 데이터 컬럼명, Col 병합, 시작위치, 병합 Rows 갯수
 */
function getJsonStrAgtKpiDataListExcel()
{
	var rptTitle = $("#agtkpi_selDate").val().replace(/[-, :, \s]/g,"").substring(0, 6);
	
	rptTitle = rptTitle.substring(0, 4) + "년" + rptTitle.substring(4, 6) + "월_상담사_등급평가_결과_보고";
	
	rptTitle = rptTitle;
	 
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b2gwMjUuc2VsZWN0S3BpRGF0YUxpc3Q=",
		"map" : {
			"key" : "value",
			"yymm" : $("#agtkpi_selDate").val().replace(/[-, :, \s]/g,"").substring(0, 6),	
			"prdctvFrYm" : $("#agtkpi_selFrDate").val().replace(/[-, :, \s]/g,""),
			"prdctvToYm" : $("#agtkpi_selToDate").val().replace(/[-, :, \s]/g,""),			
			"sidx" : "USR_NM",
			"sord" : "asc",
			"title" : rptTitle,
			"colWidth" : [15, 15, 15, 
			              8, 8, 8, 8, 8, 8, 8, 
			              8, 8, 8, 8, 8,
			              8, 8, 8, 8, 8, 8, 8, 8,
			              8, 8, 8, 8, 8, 
			              8, 8, 8, 8, 8, 8, 8,
			              10, 10, 10, 10],
			"colName" : ["USR_ID", "EMP_NO", "USR_NM", 
			             "QLT_1", "QLT_2", "QLT_3", "QLT_4", "QLT_5", "QLT_6", "QLT_7", 				
			             "PRDT_1", "PRDT_2", "PRDT_3", "PRDT_4", "PRDT_5", 				
			             "FCR_1", "FCR_2", "FCR_3", "FCR_4", "FCR_5", "FCR_6", "FCR_7", "FCR_8", 				
			             "BSN_KNWG_1", "BSN_KNWG_3", "BSN_KNWG_4", "BSN_KNWG_5", 				
			             "ABLT_1", "ABLT_2", "ABLT_3", "ABLT_4", "ABLT_5", "ABLT_6", "ABLT_7", 			
			             "TOTA_SCR", "RNK", "GRD", "PREV_MONTH_GRD"],
	        "colHeader1" : ["상담품질, R, 3, 7", "생산성, R, 10, 5", "1차처리율, R, 15, 8", "업무지식테스트, R, 23, 4", "상담역량, R, 27, 7"],
            "colHeader2" : ["처리율입력정확도, R, 18, 4"],				           
			"colHeader3" : ["USR_ID, C, 0, 3", "사번, C, 0, 3", "성명, C, 0, 3", 
				           "1차, C, 1, 2", "2차, C, 1, 2", "평균, C, 1, 2", "모니터링 오안내, C, 1, 2", "총계, C, 1, 2", "순위, C, 1, 2", "득점, C, 1, 2", 
				           "응답호, C, 1, 2","근무일수, C, 1, 2", "CPD, C, 1, 2", "순위, C, 1, 2", "득점, C, 1, 2", 
				           "총상담대장, C, 1, 2", "처리건수, C, 1, 2", "직접 상담률, C, 1, 2", "표본수, C, 2, 1", "오분류, C, 2, 1", "FCR 점수, C, 2, 1", "점수, C, 2, 1", "순위, C, 1, 2",
				           "1차, C, 1, 2", "평균, C, 1, 2", "순위, C, 1, 2", "득점, C, 1, 2",
				           "칭찬, C, 1, 2", "불친절, C, 1, 2", "DB, C, 1, 2", "오안내, C, 1, 2", "상담태도, C, 1, 2", "근무가점, C, 1, 2", "소계, C, 1, 2", 
				           "총점, C, 0, 3", "순위, C, 0, 3", "등급, C, 0, 3", "전월 등급, C, 0, 3"],
			"colAlign" : ["center", "center", "center", 
			              "center", "center", "center", "center", "center", "center", "center", 
			              "center", "center", "center", "center", "center", 
			              "center", "center", "center", "center", "center", "center", "center", "center",
			              "center", "center", "center", "center", 
			              "center", "center", "center", "center", "center", "center", "center",
			              "center", "center", "center", "center"]
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}


//jqGrid init
function initKpiDataList(objNm, tabIndex) 
{ 
	var parmmi = "";
	
	if (tabIndex == "1") {
		parmmi = "b2gwMjUuc2VsZWN0S3BpRGF0YUxpc3Q=";
	} else {
		parmmi = "b2gwMjUuc2VsZWN0S3BpUmVzdWx0TGlzdA==";
	}
	
	var postData = getJsonStr("c2VsZWN0TGlzdA==", parmmi, {
		"key" : "value" ,
		"yymm" : $("#agtkpi_selDate").val().replace(/[-, :, \s]/g,"").substr(0, 6),	
		"prdctvFrYm" : $("#agtkpi_selFrDate").val().replace(/[-, :, \s]/g,""),
		"prdctvToYm" : $("#agtkpi_selToDate").val().replace(/[-, :, \s]/g,""),	
	});
	
	$("#tbl" + objNm).jqGrid(
		{
			url : getContextPath() + "/jqgrid/kpi/kpiDataList.do",
			datatype : "json",
			mtype : "POST",
			postData : {
				pJson : postData
			},
			jsonReader :
			{
				repeatitems: false
			},
			colNames : ["USR_ID", "사번", "성명", 
			            "1차", "2차", "평균", "모니터링<br>오안내", "총계", "순위", "득점", 
			            "응답호","근무일수", "CPD", "순위", "득점", 
			            "총상담대장", "처리건수", "직접<br>상담률", "표본수", "오분류", "FCR<br>점수", "점수", "순위",
			            "1차", "평균", "순위", "득점",
			            "칭찬", "불친절", "DB", "오안내", "상담<br>태도", "근무<br>가점", "소계", 
			            "총점", "순위", "등급", "전월<br>등급"],
			colModel :
			[
			 	{ name : "USR_ID", index : "USR_ID", hidden:true },
				{ name : "EMP_NO", index : "EMP_NO", width : 70, align : "center" },
				{ name : "USR_NM", index : "USR_NM", width : 70, align : "center" },
				
				{ name : "QLT_1", index : "QLT_1", width : 50, align : "center" },
				{ name : "QLT_2", index : "QLT_2", width : 50, align : "center" },
				{ name : "QLT_3", index : "QLT_3", width : 50, align : "center" },
				{ name : "QLT_4", index : "QLT_4", width : 50, align : "center" },
				{ name : "QLT_5", index : "QLT_5", width : 50, align : "center" },		
				{ name : "QLT_6", index : "QLT_6", width : 50, align : "center" },			
				{ name : "QLT_7", index : "QLT_7", width : 50, align : "center" },
				
				{ name : "PRDT_1", index : "PRDT_1", width : 50, align : "center" },
				{ name : "PRDT_2", index : "PRDT_2", width : 50, align : "center" },
				{ name : "PRDT_3", index : "PRDT_3", width : 50, align : "center" },
				{ name : "PRDT_4", index : "PRDT_4", width : 50, align : "center" },
				{ name : "PRDT_5", index : "PRDT_5", width : 50, align : "center" },
				
				{ name : "FCR_1", index : "FCR_1", width : 50, align : "center" },
				{ name : "FCR_2", index : "FCR_2", width : 50, align : "center" },
				{ name : "FCR_3", index : "FCR_3", width : 50, align : "center" },
				{ name : "FCR_4", index : "FCR_4", width : 50, align : "center" },
				{ name : "FCR_5", index : "FCR_5", width : 50, align : "center" },
				{ name : "FCR_6", index : "FCR_6", width : 50, align : "center" },
				{ name : "FCR_7", index : "FCR_7", width : 50, align : "center" },
				{ name : "FCR_8", index : "FCR_8", width : 50, align : "center" },
				
				{ name : "BSN_KNWG_1", index : "BSN_KNWG_1", width : 50, align : "center" },
				{ name : "BSN_KNWG_3", index : "BSN_KNWG_3", width : 50, align : "center" },
				{ name : "BSN_KNWG_4", index : "BSN_KNWG_4", width : 50, align : "center" },
				{ name : "BSN_KNWG_5", index : "BSN_KNWG_5", width : 50, align : "center" },
				
				{ name : "ABLT_1", index : "ABLT_1", width : 50, align : "center" },
				{ name : "ABLT_2", index : "ABLT_2", width : 50, align : "center" },
				{ name : "ABLT_3", index : "ABLT_3", width : 50, align : "center" },
				{ name : "ABLT_4", index : "ABLT_4", width : 50, align : "center" },
				{ name : "ABLT_5", index : "ABLT_5", width : 50, align : "center" },
				{ name : "ABLT_6", index : "ABLT_6", width : 50, align : "center" },
				{ name : "ABLT_7", index : "ABLT_7", width : 50, align : "center" },
				
				{ name : "TOTA_SCR", index : "TOTA_SCR", width : 50, align : "center" },
				{ name : "RNK", index : "RNK", width : 50, align : "center" },
				{ name : "GRD", index : "GRD", width : 50, align : "center" },
				{ name : "PREV_MONTH_GRD", index : "PREV_MONTH_GRD", width : 50, align : "center" },
			],
			sortname : "USR_NM",
			sortorder : "asc",
			gridview : true,
			hidegrid : false,
			shrinkToFit : true,
			loadonce : false,
			scrollOffset : 0,
			height : "680",
			//width : "1863",
			width : "100%",
			rowNum : 25,
			rowList : [25, 50, 70],
			//autowidth : false,		//true,
			autowidth : true,
			pager : "#pg" + objNm,
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
		   	gridComplete : function()
		   	{
		   	},
		   	loadComplete: function() {
		   		
	            var ids = $("#" + objNm).getDataIDs() ;
	            
	            $.each(ids, function(idx, rowId) {
	            	var rowData = $("#" + objNm).getRowData(rowId) ;
	            	if(rowData.EMP_NO =="계"){
	            		$("#" + objNm).setRowData( rowId ,false,{background:"#EAEAEA"});
	            	}
	            	 
	           }) ;
	    
		   	},		   	
		   	error : function(data, status, err) 
		   	{
		   		networkErrorHandler(data, status, err);		
			}
		}).jqGrid("navGrid", "#" + objNm, {edit : false, add : false, del : false, search : false});

	var parmTitle = "";
	
	if (tabIndex == "1") {
		parmTitle = '<table style="width:100%;border-spacing:0px;">' +
	        '<tr><td id="hdr_b1" colspan="8">1차 처리율</td></tr>' +
	        '<tr>' +
	        '<td></td>' +
	        '<td></td>' +
	        '<td id="hdr_r1"></td>' +
	        '<td id="hdr_t1" colspan="4">처리율입력정확도</td>' +
	        '<td id="hdr_l1"></td>' +
	        '</tr>' +
	        '</table>';
	} else {
		parmTitle = '<table style="width:100%;border-spacing:0px;">' +
	        '<tr><td id="hdr_b2" colspan="8">1차 처리율</td></tr>' +
	        '<tr>' +
	        '<td></td>' +
	        '<td></td>' +
	        '<td id="hdr_r2"></td>' +
	        '<td id="hdr_t2" colspan="4">처리율입력정확도</td>' +
	        '<td id="hdr_l2"></td>' +
	        '</tr>' +
	        '</table>';
	}
	
	//Group Header 1Row
	jQuery("#" + objNm).jqGrid('setGroupHeaders', {
        useColSpanStyle: true, 
        groupHeaders:[
            {startColumnName: 'QLT_1', numberOfColumns: 7, titleText: '상담품질'},
        	{startColumnName: 'PRDT_1', numberOfColumns: 5, titleText: '생산성'},
        	
        	/*{startColumnName: 'FCR_1', numberOfColumns: 8, titleText: '1차 처리율(20점)'},*/
        	
        	{startColumnName: "FCR_1", numberOfColumns: 8, titleText: parmTitle },      	
        	
        	{startColumnName: 'BSN_KNWG_1', numberOfColumns: 4, titleText: '업무지식테스트'},
        	{startColumnName: 'ABLT_1', numberOfColumns: 7, titleText: '상담역량'},
        ]   
      });
	
/*	//Group Header 2Row
	jQuery("#agtkpi_tblKpiDataList").jqGrid('setGroupHeaders', {
		useColSpanStyle: true, 
		groupHeaders:[
		    {startColumnName: 'FCR_1', numberOfColumns: 3, titleText: ''},
			{startColumnName: 'FCR_4', numberOfColumns: 4, titleText: '처리율입력정확도'},
		]   
	});	*/
	
	if (tabIndex == "1") {
		$("th[title=DetailsTitle]").removeAttr("title");
		$("#agtkpi_hdr_b1").css({
		    borderBottomWidth: "1px",
		    borderBottomColor: "#c5dbec", // the color from jQuery UI which you use
		    borderBottomStyle: "solid",
		    padding: "4px 0 6px 0"
		});
		$("#agtkpi_hdr_r1").css({
		    borderRightWidth: "1px",
		    borderRightColor: "#c5dbec", // the color from jQuery UI which you use
		    borderRightStyle: "solid",
		    padding: "4px 0 6px 0"
		});
		$("#agtkpi_hdr_l1").css({
		    borderLeftWidth: "1px",
		    borderLeftColor: "#c5dbec", // the color from jQuery UI which you use
		    borderLeftStyle: "solid",
		    padding: "4px 0 6px 0"
		});
		$("#agtkpi_hdr_t1").css({
			//'text-align': "center",
		    padding: "4px 0 6px 0"
		});	
		
	} else {
		$("th[title=DetailsTitle]").removeAttr("title");
		$("#agtkpi_hdr_b2").css({
		    borderBottomWidth: "1px",
		    borderBottomColor: "#c5dbec", // the color from jQuery UI which you use
		    borderBottomStyle: "solid",
		    padding: "4px 0 6px 0"
		});
		$("#agtkpi_hdr_r2").css({
		    borderRightWidth: "1px",
		    borderRightColor: "#c5dbec", // the color from jQuery UI which you use
		    borderRightStyle: "solid",
		    padding: "4px 0 6px 0"
		});
		$("#agtkpi_hdr_l2").css({
		    borderLeftWidth: "1px",
		    borderLeftColor: "#c5dbec", // the color from jQuery UI which you use
		    borderLeftStyle: "solid",
		    padding: "4px 0 6px 0"
		});
		$("#agtkpi_hdr_t2").css({
			//'text-align': "center",
		    padding: "4px 0 6px 0"
		});	
	}
	
}

//등급평가 탭 활성화 체크
function checkTab_Disabled()
{
	/*

	var tabIndex = "";
	
	 if( document.all["agtkpi_divKpiData"].style.display == "block" ){
		 tabIndex = "1";
	 }else{
		 tabIndex = "2";
	 }	
	 
	 return tabIndex;*/ 
	return agtTabs.tabs('option', 'active')+1;
}

//excel down 버튼 이벤트
function btnExcelDown_clickEvent()
{
	excelDownLoad(getContextPath() + "/excel/mprows/mpRowsExcelDown.do", getJsonStrAgtKpiDataListExcel());
}

//excel upload 버튼 이벤트
function btnExcelUpload_clickEvent()
{
	if ($("#agtkpi_xlFile").val() == "") {
		alert("업로드할 파일을 선택해 주세요.");
		return;
	}
	
	if (!confirm("등급평가를 업로드 하시겠습니까?"))
		return;
	  
	var fullDate = $("#agtkpi_selDate").val().replace(/[-, :, \s]/g,"").substring(0, 6);	
	var pyear = fullDate.substring(0, 4);
	var pMonth = fullDate.substring(4, 6);
	
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/kpi/deleteKpiResultList.do",
		data : "pJson=" + getJsonStrKpiResultListDelete(),
		success : function(data)
		{
			gAppendHidden("agtkpi_frm1", "callback", "cbExcelUpload");
			gAppendHidden("agtkpi_frm1", "COLUMN_NAME", "year,month,login_usr_id");
			gAppendHidden("agtkpi_frm1", "COLUMN_VALUE", pyear + "," + pMonth + "," + window.sessionStorage.getItem("USR_ID"));
			gAppendHidden("agtkpi_frm1", "MAPPER_NAME", "oh025");
			gAppendHidden("agtkpi_frm1", "SERVICE_NAME", "insertXLFile");	
			gAppendHidden("agtkpi_frm1", "HEADER_NAME", "row,col");
			gAppendHidden("agtkpi_frm1", "HEADER_COUNT", "1,1");
			gSubmitPost("agtkpi_frm1", true);	
			
			setTimeout(function(){
				btnSearch_clickEvent();
				
				//file box 초기화
				$("#agtkpi_xlFile").replaceWith( $("#agtkpi_xlFile").clone(true) );
				alert("업로드가 완료되었습니다.");
			}, 2000);

		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
	

}
/*
//등급평가 탭 버튼
function divKpiDataBtn_clickEvent()
{
	$("#agtkpi_divKpiDataBtn").attr("class", "left_tab_img_l");
	$("#agtkpi_divKpiResultBtn").attr("class", "left_tab_img_gray_l");
	
	$("#agtkpi_divKpiData").css("display", "block");
	$("#agtkpi_divKpiResult").css("display", "none");
}

//등급평가결과 탭 버튼
function divKpiResultBtn_clickEvent()
{
	$("#agtkpi_divKpiDataBtn").attr("class", "left_tab_img_gray_l");
	$("#agtkpi_divKpiResultBtn").attr("class", "left_tab_img_l");
	
	$("#agtkpi_divKpiData").css("display", "none");
	$("#agtkpi_divKpiResult").css("display", "block");
}
*/
//평가등급 조회 버튼 이벤트
function btnSearch_clickEvent()
{
	var tabIndex = checkTab_Disabled();
	
	//등급평가
	if (tabIndex == "1") {
		$("#tblagtkpi_KpiDataList").jqGrid("setGridParam", { postData : { pJson : getJsonStrSelectKpiDataList() }, page : 1, sortname : "USR_NM", sortorder : "asc" });
		$("#tblagtkpi_KpiDataList").trigger("reloadGrid");
	} else {
		//등급평가결과
		$("#tblagtkpi_KpiResultList").jqGrid("setGridParam", { postData : { pJson : getJsonStrSelectKpiResultList() }, page : 1, sortname : "USR_NM", sortorder : "asc" });
		$("#tblagtkpi_KpiResultList").trigger("reloadGrid");		
	}
}

//평가등급 초기화 버튼 이벤트
function btnInit_clickEvent()
{
	$("#agtkpi_selDate").val(newMonth);
	$("#agtkpi_tblKpiDataList").clearGridData();
	$("#agtkpi_tblKpiResultList").clearGridData();
	
	//file box 초기화
	$("#agtkpi_xlFile").replaceWith( $("#agtkpi_xlFile").clone(true) );

}

// 초기 이벤트 셋팅
function initEvent()
{
	//등급평가 탭 버튼
	//$("#agtkpi_divKpiDataBtn").bind("click", divKpiDataBtn_clickEvent);
	//등급평가결과 탭 버튼
	//$("#agtkpi_divKpiResultBtn").bind("click", divKpiResultBtn_clickEvent);
	
	//평가등급 조회 버튼 이벤트
	$("#agtkpi_btnSearch").bind("click", btnSearch_clickEvent);
	//평가등급 초기화 버튼 이벤트
	$("#agtkpi_btnInit").bind("click", btnInit_clickEvent);
	
	//excel down upload 버튼 이벤트
	$("#agtkpi_btnExcelDown").bind("click", btnExcelDown_clickEvent);
	$("#agtkpi_btnExcelUpload").bind("click", btnExcelUpload_clickEvent);
	
	
	// 해당월 변경 이벤트 등록
	$("#agtkpi_selDate").bind("change", function()
	{
		// 날짜 차이 알아 내기
		var selDt = new Date($("#agtkpi_selDate").val());
		var diff = date - selDt;
		var currDay = 24 * 60 * 60 * 1000;	// 시 * 분 * 초 * 밀리세컨
		var currMonth = currDay * 30;		// 월 만듬
		var currYear = currMonth * 12; 		// 년 만듬
		
		var addMon = parseInt((diff/currMonth) + 1)
		
		//alert(parseInt(diff/currMonth));
		
		$("#agtkpi_selFrDate").val(getPrvDay("M", addMon, "-").substring(0,7) + "-" +"26");
		$("#agtkpi_selToDate").val($("#agtkpi_selDate").val().substring(0,7) + "-" +"25");		
	});
	
}

// 초기 데이터 셋팅
function initData()
{	
	//해당월 일자
	datePicker("#agtkpi_selDate");
	datePicker("#agtkpi_selFrDate");
	datePicker("#agtkpi_selToDate");
 
	$("#agtkpi_selDate").val(newMonth + "-" +"25");
	$("#agtkpi_selFrDate").val(getPrvDay("M", 1, "-").substring(0,7) + "-" +"26");
	$("#agtkpi_selToDate").val(newMonth + "-" +"25");
	
	//등급평가
	//initKpiDataList("agtkpi_KpiDataList", "1"); 
	//등급평가결과
	//initKpiDataList("agtkpi_KpiResultList", "2"); 

}
	
$(document).ready(function()
{  
	
/*	
	//Month picker 설정	
	$.datepicker.regional['ko'] = {
		closeText: '닫기',
		prevText: '이전달',
		nextText: '다음달',
		currentText: '오늘',
		monthNames: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)','7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNames: ['일','월','화','수','목','금','토'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: 'Wk',
		dateFormat: 'yy-mm-dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: '',
		showOn: 'both',
		buttonText: "달력",
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		yearRange: 'c-99:c+99'
	};
   
	$.datepicker.setDefaults($.datepicker.regional['ko']);
	 
	var datepicker_default = {
		showOn: 'both',
		buttonText: "선택",
		currentText: "이번달",
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		yearRange: 'c-99:c+99',
		showOtherMonths: true,
		selectOtherMonths: true
	}
 
	datepicker_default.closeText = "선택";
	datepicker_default.dateFormat = "yy-mm";
	
	datepicker_default.onClose = function (dateText, inst) {
		var month = $("#agtkpi_ui-datepicker-div .ui-datepicker-month :selected").val();
		var year = $("#agtkpi_ui-datepicker-div .ui-datepicker-year :selected").val();
		$(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
		$(this).datepicker('setDate', new Date(year, month, 1));
	}
 
	datepicker_default.beforeShow = function () {
		var selectDate = $("#agtkpi_selDate").val().split("-");
		var year = Number(selectDate[0]);
		var month = Number(selectDate[1]) - 1;
		$(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
	}

    $("#agtkpi_selDate").datepicker(datepicker_default);	
*/
	//등급평가 초기화
	initEvent();
	initData();
	
	agtTabs = $("#pop_body").tabs();
	agtTabs.tabs({
		  activate:function (event, ui){
			  var id = ui.newPanel.attr('id');
			  agtkpi_initTabs(id);	
		  }
	});
	agtkpi_initTabs("agtkpi_divKpiData");	
		
});

function agtkpi_initTabs(id){  
		switch(id){
		case "agtkpi_divKpiData":
			if(isinitdivKpiData == false){
				//등급평가
				initKpiDataList("agtkpi_KpiDataList", "1"); 
				isinitdivKpiData=true;
				}
			break;
		case "agtkpi_divKpiResult":
			if(isinitdivKpiResult == false){ 		
				//등급평가결과
				initKpiDataList("agtkpi_KpiResultList", "2"); 
				isinitdivKpiResult=true;
				}
			break;
	}
}