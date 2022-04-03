// 페이지 초기화
$(document).ready(function()
{
	// 선택 버튼 클릭 이벤트 등록
	$("#btnCmpnCustmSearchChoice").bind("click", btnCmpnCustmSearchChoice_ClickEvent);
	// 조회 버튼 클릭 이벤트 등록
	$("#findCmpnCustmSearch").bind("click", findCmpnCustmSearch_clickEvent);	
	// 초기화 버튼 클릭 이벤트 등록
	$("#btnCmpnCustmSearchInit").bind("click", initCmpnCustmSearch_clickEvent);
	// 초기화 버튼 클릭 이벤트 등록
	$("#btnCmpnCustmSearchInit2").bind("click", initCmpnCustmSearch2_clickEvent);
	
	$("#cmpnCustmSearch").jqGrid(
	{
		url : getContextPath() + "/jqgrid/campaign/cmpnCustomSearchList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrCmpnCustmSearchList("", "", "", "")
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : [ "고객명", "핸드폰번호", "사무실번호", "회사/부서", "식별번호", "사업자번호", "법인번호", "생년월일", "주소일련번호", "주소"],
		colModel : 
		[
			{ name : "OWNER_NM", index : "OWNER_NM", width : "130", align : "center" },
			{ name : "HTEL_NO", index : "HTEL_NO", width : "100", align : "center" },
			{ name : "TEL_NO", index : "TEL_NO", width : "100", align : "center" },
			{ name : "ADDRESS_NM", index : "ADDRESS_NM", width : "100", align : "center" },
			{ name : "FARM_UNIQUE_NO", index : "FARM_UNIQUE_NO", width : "100", align : "center" },
			{ name : "CORP_NO", index : "CORP_NO", hidden : true },
			{ name : "LEGAL_NO", index : "LEGAL_NO", hidden : true },
			{ name : "BIRTH_YMD", index : "BIRTH_YMD", hidden : true },
			{ name : "ADDRESS_NO", index : "ADDRESS_NO", hidden : true },
			{ name : "ADDR", index : "ADDR", hidden : true }
		],
		sortname : "OWNER_NM",
		sortorder : "asc",
		gridview : true,
		hidegrid : false,
		shrinkToFit : true,
		loadonce : false,
		scrollOffset : 0,
		height : "260",
		width : "90%",
		rowNum : 10,
		rowList : [10, 20, 30, 50, 100],
		autowidth : true,
		pager : "#pgInnerCustmSearch",
		pgbuttons : true,
		rownumbers : true,
		rownumWidth : 30,
		multiselect : false,
		emptyrecords : "",
		caption : "",
		loadui : "enable",
		viewrecords : true,
		onSelectRow : function(rowid)
		{
			var row = $("#cmpnCustmSearch").getRowData(rowid);	
			var htel = getPhoneNumFormat(row.HTEL_NO);
			var tel = getPhoneNumFormat(row.TEL_NO);
			
	   		$("#cmpnCustmSearch1").html(row.OWNER_NM);
	   		$("#cmpnCustmSearch2").html(row.ADDRESS_NM);
	   		$("#cmpnCustmSearch3").html(row.CORP_NO);
	   		$("#cmpnCustmSearch4").html(htel);
	   		$("#cmpnCustmSearch5").html(tel);
	   		$("#cmpnCustmSearch6").html(row.FARM_UNIQUE_NO);
	   		$("#cmpnCustmSearch7").html(row.BIRTH_YMD);
	   		$("#cmpnCustmSearch8").html(row.LEGAL_NO);
	   		$("#cmpnCustmSearch9").html(row.ADDRESS_NO);
	   		$("#cmpnCustmSearch10").html(row.ADDR);
		},
	}).jqGrid("navGrid", "#pgInnerCustmSearch", {edit : false, add : false, del : false, search : false});
});

// 선택 클릭이벤트
function btnCmpnCustmSearchChoice_ClickEvent()
{
	window.sessionStorage.setItem("custm1", $("#cmpnCustmSearch1").text());
	window.sessionStorage.setItem("custm2", $("#cmpnCustmSearch5").text());
	window.sessionStorage.setItem("custm3", $("#cmpnCustmSearch4").text());
	window.sessionStorage.setItem("custm4", $("#cmpnCustmSearch2").text());
	window.sessionStorage.setItem("custm5", $("#cmpnCustmSearch10").text());
	
	opener.parent.setCustmInfo(window.sessionStorage.getItem("custm1"), window.sessionStorage.getItem("custm2"), window.sessionStorage.getItem("custm3"), window.sessionStorage.getItem("custm4"), window.sessionStorage.getItem("custm5"));
	self.close();
}

// 조회 버튼 클릭
function findCmpnCustmSearch_clickEvent()
{
	tfContact = $("#findCmpnCustmSearch1").val();
	tfNm = $("#findCmpnCustmSearch2").val();
	optCustmComp = $("#findCmpnCustmSearch3").val();
	optCustmType = $("#findCmpnCustmSearch4").val();
	
	$("#cmpnCustmSearch").jqGrid("setGridParam", {postData : {pJson : getJsonStrCmpnCustmSearchList(tfContact, tfNm, optCustmComp, optCustmType)}, page : 1, sortname : "OWNER_NM", sortorder : "asc"});
	$("#cmpnCustmSearch").trigger("reloadGrid");
}

// 초기화 버튼 클릭
function initCmpnCustmSearch_clickEvent()
{
	$("#findCmpnCustmSearch1").val("");
	$("#findCmpnCustmSearch2").val("");
	$("#findCmpnCustmSearch3").val("");
	$("#findCmpnCustmSearch4").val("");
	
	$("#cmpnCustmSearch").jqGrid("setGridParam", {postData : {pJson : getJsonStrCmpnCustmSearchList("", "", "", "")}, page : 1, sortname : "OWNER_NM", sortorder : "asc"});
	$("#cmpnCustmSearch").trigger("reloadGrid");
}

// 초기화 버튼 클릭(고객상세정보)
function initCmpnCustmSearch2_clickEvent()
{
	$("#cmpnCustmSearch1").html("");
	$("#cmpnCustmSearch2").html("");
	$("#cmpnCustmSearch3").html("");
	$("#cmpnCustmSearch4").html("");
	$("#cmpnCustmSearch5").html("");
	$("#cmpnCustmSearch6").html("");
	$("#cmpnCustmSearch7").html("");
	$("#cmpnCustmSearch8").html("");
	$("#cmpnCustmSearch9").html("");
	$("#cmpnCustmSearch10").html("");
	
	$("#cmpnCustmSearch").resetSelection();
}

// 고객 검색
function getJsonStrCmpnCustmSearchList(tfContact, tfNm, optCustmComp, optCustmType)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMDMuZ2V0Q3VzdEluZm9WaWV3",
		"map" : {
			"key" : "value",
			"tfContact" : tfContact,
			"tfNm" : tfNm,
			"optCustmComp" : optCustmComp,
			"optCustmType" : optCustmType,
		}
	};

	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}