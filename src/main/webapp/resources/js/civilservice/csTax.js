var tmpStartDate;
var tmpEndDate;

function btnTaxInit_clickEvent() {	
		
		$("#cstax_tfSrchJuminNo").val("");
		$("#cstax_hidTaxSsNumber").val("");
}

function btnTaxSearch_clickEvent() {
	tmpStartDate="";
	tmpEndDate="";
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/civilservice/csw.do",
		data : "pJson=" + getJsonTaxUser(),
		success : function(data){
			
			if(data != null) {
					
				$("#cstax_reg_nm").html(data.REG_NM);
				$("#cstax_addr").html(data.ADDR);
				
				$("#cstax_tblCsTaxList").jqGrid("setGridParam", { postData :  {pJson : getJsonTaxList()}, page : 1});
				$("#cstax_tblCsTaxList").trigger("reloadGrid");				
				
			}
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
		

}

function getJsonTaxList() {
	
	if($("#cstax_hidTaxSsNumber").val().trim() == "" ) {
		alert("ARS인증을 하십시요.");
		return false;
	}
	tmpStartDate= new Date(); // 날짜 초기값 세팅 
	loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b2gwNTEudGF4TGlzdA==",
			"map" : {
				"key" : "value",
				"tpr_no" : $("#cstax_hidTaxSsNumber").val().trim()
			}
	}
	return  encodeURIComponent(JSON.stringify(loParam));
	
}



function getJsonTaxUser(){
	if($("#cstax_hidTaxSsNumber").val().trim() == "" ) {
		alert("ARS인증을 하십시요.");
		return false;
	}	
	var loParam = {
			"qt" : "c2VsZWN0",
			"mi" : "b2gwNTEudGF4VXNlcg==",
			"map" : {
				"key" : "value",
				"tpr_no" : $("#cstax_hidTaxSsNumber").val().trim()
			}
	};
		
	return encodeURIComponent(JSON.stringify(loParam));
}

function fnTaxInit() {
	
	$("#cstax_cn_emp").html("");
	$("#cstax_tax1").html("");
	$("#cstax_tax2").html("");
	$("#cstax_tax3").html("");
	$("#cstax_tax4").html("");
	$("#cstax_tax5").html("");
	$("#cstax_tax6").html("");
	$("#cstax_tax7").html("");
	/*$("#cstax_tax8").html(""); */
	$("#cstax_tax9").html("");
	$("#cstax_tax10").html("");
	$("#cstax_tax11").html("");
	$("#cstax_tax12").html("");	
	$("#cstax_tax13").html("");
	$("#cstax_tax14").html("");
	$("#cstax_tax15").html("");
	$("#cstax_tax16").html("");
	$("#cstax_tax17").html("");
	$("#cstax_tax18").html("");
}

function getJsonStri3List(){
	
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b2gwNTEuc2VsZWN0aTI=",
			"map" : {
				"key" : "value",
				"civilnum" : $("#civilnum").val(),
				"frDt":$("#selFrDate").val().replace(/[-, :, \s]/g,""),
				"toDt":$("#selToDate").val().replace(/[-, :, \s]/g,"")
			}
	}
	return  encodeURIComponent(JSON.stringify(loParam));
}

function getJsonStri4List(){
	
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b2gwNTEuc2VsZWN0aTM=",
			"map" : {
				"key" : "value",
				"civilnum" : $("#civilnum").val(),
				"frDt":$("#selFrDate").val().replace(/[-, :, \s]/g,""),
				"toDt":$("#selToDate").val().replace(/[-, :, \s]/g,"")
			}
	}
	return  encodeURIComponent(JSON.stringify(loParam));
}

function initdivTaxTab(){
	txtabs = $("#cstax_table").tabs();
	$(".ui-widget-header").css("border","0px");
	$(".ui-widget-header").css("background","#fff");


	$("#i3_List").jqGrid({
		url : getContextPath() + "/jqgrid/civilservice/csTaxList.do",
		datatype : 'json',
		mtype : 'POST',
		postData : {		
			pJson : getJsonStri3List()
		},
		jsonReader :
		{
			repeatitems: false
		},
		
		colNames : ["세목명", "고지일자","체납액", "납기일자"],
		colModel :
		[
		 	{name : "세목명", index:"세목명", align : "center", width:"210px" },
		 	{name : "고지일자", index:"고지일자", align : "center", width:"80px"},
		 	{name : "체납액", index:"체납액", align : "center", width:"100px"},
		 	{name : "납기일자", index:"납기일자", align : "center", width:"100px"},
		],
		
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : false,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "440",
	   	width : "100%",	
	   	rowNum : 999999,
	   	autowidth : true,
	   	pgbuttons : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	rowNum : "10000",
	   	multiselect : false,
	   	emptyrecords : "0",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,	 	
	   	onSelectRow : function(rowid) 
		{
			fnTaxInit();
			var tax = $("#i3_List").getRowData(rowid);

			$("#i3_cn_emp").html(tax.CN_EMP);
			$("#i3_tax1").html(tax.대표세목명);
			$("#i3_tax2").html(tax.과세년월);
			$("#i3_tax3").html(tax.과세구분);
			$("#i3_tax4").html(tax.최초납기);
			$("#i3_tax5").html(tax.납기);
			$("#i3_tax6").html(tax.납부일);
			$("#i3_tax7").html(tax.감액유무);
			$("#i3_tax11").html(tax.부과일자);
			$("#i3_tax12").html(changeNumberFormat(tax.미납액));			
			$("#i3_tax13").html(tax.전자납부번호);
			$("#i3_tax15").html(tax.징수결정일);
			$("#i3_tax16").html(tax.가상계좌번호);	
			$("#i3_tax17").html(tax.가상계좌은행);
			$("#i3_tax18").html(tax.예금주명);
			
		}
	}).jqGrid("navGrid", "#i3_pagingList",{edit : false, add : false, del : false, search : false});

	$("#i4_List").jqGrid({
		url : getContextPath() + "/jqgrid/civilservice/csTaxList.do",
		datatype : 'json',
		mtype : 'POST',
		postData : {	
			pJson : getJsonStri4List()
		},
		jsonReader :
		{
			repeatitems: false
		},
		
		colNames : ["압류순번", "세목명","본세", "가산금","압류일자", "압류물건","압류부서", "압류해제일"],
		colModel :
		[
		 	{name : "압류순번", index:"압류순번", align : "center", width:"210px" },
		 	{name : "세목명", index:"세목명", align : "center", width:"80px"},
		 	{name : "본세", index:"본세", align : "center", width:"100px"},
		 	{name : "가산금", index:"가산금", align : "center", width:"100px"},
		 	{name : "압류일자", index:"압류일자", align : "center", width:"210px" },
		 	{name : "압류물건", index:"압류물건", align : "center", width:"80px"},
		 	{name : "압류부서", index:"압류부서", align : "center", width:"100px"},
		 	{name : "압류해제일", index:"압류해제일", align : "center", width:"100px"}
		],
		
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : false,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "440",
	   	width : "100%",	
	   	rowNum : 999999,
	   	autowidth : true,
	   	pgbuttons : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	rowNum : "10000",
	   	multiselect : false,
	   	emptyrecords : "0",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,	
	  
	}).jqGrid("navGrid", "#i4_pagingList",{edit : false, add : false, del : false, search : false});
	
	
	$("#cstax_tblCsTaxList").jqGrid({
		url : getContextPath() + "/jqgrid/civilservice/csTaxList.do",
		datatype : 'json',
		mtype : 'POST',
		postData : {			
		},
		jsonReader :
		{
			repeatitems: true
		},
		
		colNames : [/*"GB",*/"기본", "성명/상호", "행정동", "과세번호", "대표세목코드", "회계세목명", "과세년월", "과세구분","최초납기", "납기", "납부일", "감액유무", "부과취소유무", 
		            "부과일자", "미납액","전자납부번호", "징수결정일", "가상계좌번호", "가상계좌은행", "예금주명"],
		colModel :
		[
		 	//{name : "GB", hidden : true},
			{name : "GB", align : "center", width:"60px", hidden : false},
		 	{name : "CN_EMP", align : "center", width:"210px" },
		 	{name : "행정동", align : "center", width:"100px", hidden : true},	
		 	{name : "과세번호", align : "center", width:"80px", hidden : false},
		 	{name : "대표세목코드", align : "center", width:"100px", hidden : true},
		 	{name : "대표세목명", align:"center", width:"185", hidden : false},
		 	{name : "과세년월", align : "center", width:"80px"},
		 	{name : "과세구분", align : "center", width:"80px", hidden : false},
		 	{name : "최초납기", align : "center", width:"100px", hidden : true},
		 	{name : "납기", align : "center", width:"100px", hidden : false},
		 	{name : "납부일", align : "center", width:"100px", hidden : true},
		 	{name : "감액유무", align : "center", width:"60px", hidden : true},
		 	{name : "부과취소유무", align : "center", width:"100px", hidden : true},
		 	
		 	{name : "부과일자", align : "center", width:"100px", hidden : false},
		 	{name : "미납액", align : "right", width:"100px", hidden : false,  formatter:'integer'},
		 	{name : "전자납부번호", align : "center", width:"150px", hidden : false},
		 	
		 	{name : "징수결정일", align : "center", width:"100px", hidden : true},
		 	{name : "가상계좌번호", align : "center", width:"100px", hidden : true},
		 	{name : "가상계좌은행", align : "center", width:"100px", hidden : true},
		 	{name : "예금주명", align : "center", width:"100px", hidden : true},
		],
		
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : false,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "440",
	   	width : "100%",	
	   	rowNum : 999999,
	   	autowidth : true,
	   	pgbuttons : true,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	rowNum : "10000",
	   	multiselect : false,
	   	emptyrecords : "0",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,	
		onSelectRow : function(rowid) 
		{
			fnTaxInit();
			var tax = $("#cstax_tblCsTaxList").getRowData(rowid);

			$("#cstax_cn_emp").html(tax.CN_EMP);
			$("#cstax_tax1").html(tax.대표세목명);
			$("#cstax_tax2").html(tax.과세년월);
			$("#cstax_tax3").html(tax.과세구분);
			$("#cstax_tax4").html(tax.최초납기);
			$("#cstax_tax5").html(tax.납기);
			$("#cstax_tax6").html(tax.납부일);
			$("#cstax_tax7").html(tax.감액유무);
			$("#cstax_tax11").html(tax.부과일자);
			$("#cstax_tax12").html(changeNumberFormat(tax.미납액));			
			$("#cstax_tax13").html(tax.전자납부번호);
			$("#cstax_tax15").html(tax.징수결정일);
			$("#cstax_tax16").html(tax.가상계좌번호);	
			$("#cstax_tax17").html(tax.가상계좌은행);
			$("#cstax_tax18").html(tax.예금주명);
			
		},
		
		loadComplete : function(xhr)
	   	{			
	   		var inqr_cond = "tpr_no:" + $("#cstax_hidTaxSsNumber").val() + " / page:" + $("#cstax_tblCsWaterList").getGridParam('page');
	   			   		
	   		tmpEndDate = new Date();// 날짜 초기값 세팅 
	   		var ans_tm = tmpEndDate.getTime() - tmpStartDate.getTime();
	   		ans_tm = Math.floor(ans_tm/1000); // 초간격

	   		var loParamH = {
	   				"qt" : "aW5zZXJ0",
	   				"mi" : "b2gwNTEuaW5zZXJ0SGlzdG9yeQ==",
	   				"map" : {
	   					"key" : "value",
	   					"tckt_id" : tckt_id,
	   					"lnk_stm_cd" : "300000", // 300000 세정(90295)
	   					"inqr_scr" : "csTax",
	   					"inqr_cond" : inqr_cond,
	   					"ans_tm" : ans_tm,
	   					"rslt_cd" : "00000",	//정상
	   					"rslt" : ""
	   				}
	   		};
			$.ajax({
				type : "post",
				dataType: "json",
				async : false,
				url : getContextPath() + "/ajax/civilservice/insertHistory.do",
				data : "pJson=" + encodeURIComponent(JSON.stringify(loParamH)),
				success : function(data)
				{
					
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});
			
			fnTaxInit();
	   	},	
	   	loadError : function(xhr, status, error)
	   	{
	   		if(flagM != 0){
		   		
	   			var inqr_cond = 
	   				"tpr_no:" + $("#cstax_hidTaxSsNumber").val()+
	   				" / page:" + $("#cstax_tblCsWaterList").getGridParam('page');
		   				   		
		   		tmpEndDate = new Date();// 날짜 초기값 세팅 
		   		var ans_tm = tmpEndDate.getTime() - tmpStartDate.getTime();
		   		ans_tm = Math.floor(ans_tm/1000); // 초간격

		   		var loParamH = {
		   				"qt" : "aW5zZXJ0",
		   				"mi" : "b2gwNTEuaW5zZXJ0SGlzdG9yeQ==",
		   				"map" : {
		   					"key" : "value",
		   					"tckt_id" : tckt_id,
		   					"lnk_stm_cd" : "300000", // 300000 세정(90295)
		   					"inqr_scr" : "csTax",
		   					"inqr_cond" : inqr_cond,
		   					"ans_tm" : ans_tm,
		   					"rslt_cd" : "00001",	// 통신오류
		   					"rslt" : error
		   				}
		   		};
		   		
				$.ajax({
					type : "post",
					dataType: "json",
					async : false,
					url : getContextPath() + "/ajax/civilservice/insertHistory.do",
					data : "pJson=" + encodeURIComponent(JSON.stringify(loParamH)),
					success : function(data)
					{
						
					},
					error : function(data, status, err) 
					{
						networkErrorHandler(data, status, err);
					}
				});
	   		}
	   		
	   	}	   	
	}).jqGrid("navGrid",{edit : false, add : false, del : false, search : false});
	

	
	// 세무 조회 버튼 클릭 이벤트 등록
	//$("#cstax_btnTaxSearch").bind("click", btnTaxSearch_clickEvent);

	
	
}

