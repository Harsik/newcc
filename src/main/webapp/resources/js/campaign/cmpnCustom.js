// 페이지 초기화
$(document).ready(function() {
	datePicker("#tfFrdt");
	datePicker("#tfTodt");
	
	$("#tfFrdt").val(getDate());
	$("#tfTodt").val(getDate());
		
	setPhoneNumFormat("tfCntctVal");
	
	setSelectBoxWithCode("selCustComp", "전체", "90048", "GCHILD", "", "all"); 	//고객성향
	setSelectBoxWithCodeIntvLgCd("selIntvLgCd", "전체", "1","","","all", "");	//대분류
	
	//대분류 변경시 세팅
	$("#selIntvLgCd").on("change", function(event) {
		console.log("selIntvLgCd changed");
		if(event.target.value == "all") {
			$("#selIntvMdCd, #selIntvSmCd").empty().append("<option value='all'>전체</option>");
		} else {
			setSelectBoxWithCodeIntvLgCd("selIntvMdCd", "전체", "2", "", $(this).val(), "");	//중분류
		}
	});
	//중분류 변경시 세팅
	$("#selIntvMdCd").on("change", function(event) {
		console.log("selIntvMdCd changed");
		if(event.target.value == "all") {
			$("#selIntvSmCd").empty().append("<option value='all'>전체</option>");
		} else {
			setSelectBoxWithCodeIntvLgCd("selIntvSmCd", "전체", "3", "", $(this).val(), "");	//소분류
		}
	});
	
	// 저장 버튼 클릭 이벤트 등록
	$("#btnCmpnCustmSave").bind("click", btnCmpnCustm_ClickEvent);
	// 조회 버튼 클릭 이벤트 등록
	$("#btnCmpnCustmSrch").bind("click", btnCmpnCustmSearch_clickEvent);	
	// 초기화 버튼 클릭 이벤트 등록
	$("#btnCmpnCustmInit").bind("click", initCmpnCustm_clickEvent);
	// 검색 엔터 이벤트 등록
	$("#tfCntctVal").keydown(function (key){
		if (key.keyCode == 13)	btnCmpnCustmSearch_clickEvent();
	});
	
	$("#cmpnCustm").jqGrid(
	{
		url : getContextPath() + "/jqgrid/campaign/cmpnCustomSel.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrCmpnCustmList()
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : [ "고객명", "고객구분", "전화번호", "핸드폰번호", "전화", "SMS", "고객성향", "성별코드", "고객구분코드", "고객성향코드", "고객ID"],
		colModel : 
		[
		 	/*{ name : "TARGET_YN", index:"TARGET_YN", formatter:'checkbox', editoptions:{value : "1:0", defaultVaule : "0"}, formatoptions:{disabled:false}, align : "center", width : 20, resizable: false, sortable : false },*/
		 	{ name : "CUST_NM", index : "CUST_NM", width : 10, align : "center" },
		 			 	
			{ name : "CUST_GB_NM", index : "CUST_GB_NM", width : 10, align : "center" },			
			{ name : "TEL", index : "TEL", width : 10, align : "center" },
			{ name : "MOBILE", index : "MOBILE", width : 10, align : "center" },
			{ name : "TEL_YN", index : "TEL_YN", width : 10, align : "center" },
			{ name : "SMS_YN", index : "SMS_YN", width : 10, align : "center" },
			{ name : "CST_COMP_NM2", index : "CST_COMP_NM2", width : 20, align : "left" },
			{ name : "GNDR", index : "GNDR", hidden : true },
			{ name : "CUST_GB_CD", index : "CUST_GB_CD", hidden : true },
			{ name : "CST_COMP_CD", index : "CST_COMP_CD", hidden : true },
			{ name : "CUST_ID", index : "CUST_ID", hidden : true }
		],
		sortname : "CUST_NM",
		sortorder : "asc",
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
		pager : "#pgInnerCustm",
		//pgbuttons : true,
		rownumbers : true,
		rownumWidth : 30,
		emptyrecords : "",
		caption : "",
		loadui : "enable",
		multiselect: true,
		viewrecords : true,
		onSelectRow : function(rowid) {
		 $("#cmpnCustm").jqGrid('setGridParam', 'selarrrow');
		},
		gridComplete : function() {
			var rowIdArr = $("#cmpnCustm").getDataIDs();
			
			for(var i = 0; i < rowIdArr.length; i++) {
				$("#cmpnCustm").setCell(rowIdArr[i], "TEL", getPhoneNumFormat($("#cmpnCustm").getRowData(rowIdArr[i]).TEL));
				$("#cmpnCustm").setCell(rowIdArr[i], "MOBILE", getPhoneNumFormat($("#cmpnCustm").getRowData(rowIdArr[i]).MOBILE));
			}
		}
	}).jqGrid("navGrid", "#pgInnerCustm", {edit : false, add : false, del : false, search : false});
	
	// 멀티 헤더 설정 
	$("#cmpnCustm").setGroupHeaders(
    {
        useColSpanStyle: true,
        groupHeaders: [
            { "numberOfColumns": 2, "titleText": "수신동의", "startColumnName": "TEL_YN" }]
    });		

	
});
//end of document ready event

var parent = window.opener;	//부모창객체

// 고객등록 클릭이벤트
function btnCmpnCustm_ClickEvent()
{
	var rows = $("#cmpnCustm").getGridParam('selarrrow');
	var ids = $("#cmpnCustm").jqGrid('getDataIDs');
	var pList1 = [];

	if(!rows || rows.length <= 0) {
		alert("선택된 목록이 없습니다.");
		return;
	}
    
	console.log(ids);
	for(var i = 0; i < ids.length; i++) {
        var check = false;
    
        $.each(rows, function(index, value) {
        	console.log(value);
            if (value == ids[i]) check = true;
            console.log(check);
        });
        
        if(check) {
        	var rowdata = $("#cmpnCustm").getRowData(ids[i]);
        	
        	//일반전화 핸드폰 둘 다 없으면 대상배제
        	if(!rowdata.TEL.replace(/-/gi, "") && !rowdata.MOBILE.replace(/-/gi, ""))
        		continue;
        	
        	/*
        	if(rowdata.MOBILE == ""){
        		rowdata.MOBILE = rowdata.TEL;
        		rowdata.TEL = "";
        	}*/
        	
        	pList1.push({
        		"qt" : "aW5zZXJ0",
				"mi" : "Y20wMTIubWVyZ2U=",
				"map" : {
					"cmpg_id" : window.sessionStorage.getItem("cmpnId"),
					"cust_id" : rowdata.CUST_ID,
					"cust_nm" : rowdata.CUST_NM,
					"gndr" : rowdata.GNDR,
					"cust_gb_cd" : rowdata.CUST_GB_CD,
					"tel" : rowdata.TEL.replace(/-/gi, ""),
					"mobile" : rowdata.MOBILE.replace(/-/gi, "")
				}
        	});
        }
    }
	
	parent.console.log(pList1);
    
    $.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/campaign/insertSurvey.do",
		data : "pJson=" + getJsonStr("YmF0Y2g=", null, pList1),
		success : function(data) {		
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/campaign/cmpgCustScntUpdate.do",
				data : "pJson=" + getJsonStr("dXBkYXRl","Y20wMTIudXBkYXRlQ3VzdFNjbnQ=", {
					"cmpg_id" : window.sessionStorage.getItem("cmpnId")
				}),
				success : function(data) {
					alert("캠페인 대상이 선정되었습니다.");
					
					self.close();
					
					parent.$("#tbl012").jqGrid("setGridParam", {postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "Y20wMTIuY21wZ1RhcmdldExpc3Q=", {
						"cmpg_id": window.sessionStorage.getItem("cmpnId"),
						"check2" : $('input:checkbox[name=check2]').is(':checked')
					})} , page : 1, sortname : "CUST_ID", sortorder : "asc"}).trigger("reloadGrid");
					
					parent.select_cntEvent();
					
					parent.$("#tbl010").jqGrid('setCell', parent.obj010.id, 'TRGT_CUST_CNT', parent.stotCnt);
					parent.$("#surveyNmCnt_2").html(parent.stotCnt);
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});
			
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
    });
}

// 조회 버튼 클릭
function btnCmpnCustmSearch_clickEvent()
{
	var frdt = $("#tfFrdt").val().replace(/-/gi, "");
	var todt = $("#tfTodt").val().replace(/-/gi, "");
	var custComp = $("#selCustComp").val();
	var cntctType = $("#selCntctType").val();
	var cntctVal = $("#tfCntctVal").val().replace(/[-,\s]/g,"");
	var intvLgCd = $("#selIntvLgCd").val();
	var intvMdCd = $("#selIntvMdCd").val();
	var intvSmCd = $("#selIntvSmCd").val();
	
	$("#cmpnCustm").jqGrid("setGridParam", {
		postData : {
			pJson : getJsonStrCmpnCustmList(frdt, todt, custComp, cntctType, cntctVal, intvLgCd, intvMdCd, intvSmCd)
		}, 
		page : 1, 
		sortname : "CUST_NM", 
		sortorder : "asc"
	}).trigger("reloadGrid");
}

// 초기화 버튼 클릭
function initCmpnCustm_clickEvent()
{
	$("#tfFrdt").val(getDate());
	$("#tfTodt").val(getDate());
	$("#selCustComp option:first").prop("selected", true);
	$("#selCntctType option:first").prop("selected", true);
	$("#tfCntctVal").val("");
	$("#selIntvLgCd option:first").prop("selected", true);
	$("#selIntvLgCd").trigger("change");
	
	$("#cmpnCustm").jqGrid("setGridParam", {
		postData : {
			pJson : getJsonStrCmpnCustmList()
		}, 
		page : 1, 
		sortname : "CUST_NM", 
		sortorder : "asc"
	}).trigger("reloadGrid");
}

//파라미터 셋팅_getJsonStrCustmList
function getJsonStrCmpnCustmList(frdt, todt, custComp, cntctType, cntctVal, intvLgCd, intvMdCd, intvSmCd)
{
	if (frdt == null || frdt == "")
		frdt = $("#tfFrdt").val().replace(/-/gi, "");

	if (todt == null || todt == "")
		todt = $("#tfTodt").val().replace(/-/gi, "");	
	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMDMuY21wbkN1c3RMaXN0",
		"map" : {
			"key" : "value",
			"frdt" : frdt,
			"todt" : todt,
			"custComp" : custComp,
			"cntctType" : cntctType,
			"cntctVal" : cntctVal,
			"intvLgCd" : intvLgCd,
			"intvMdCd" : intvMdCd,
			"intvSmCd" : intvSmCd,
			"telyn" : "Y" //2020.01.15 hhs 민원인 select문 수정
		}
	};

	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}