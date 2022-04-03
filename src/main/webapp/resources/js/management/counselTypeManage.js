var categoryGb="";
var parntCd = "";
var depth=4;

// 코드 상세 초기화
function initCodeSpec()
{
	//$("#cslTpMng_btnAddCategory").show();
	$("#cslTpMng_btnModCategory").hide();
	$("#cslTpMng_btnInitCotegory").show();
	$("#cslTpMng_tfCategory_cd").prop("disabled", true);
	$("#cslTpMng_tfParnt_cd").prop("disabled", true);
	$("#cslTpMng_tfCategory_gb").prop("disabled", true);
	
	$("#cslTpMng_tfCategory_cd").val("");
	$("#cslTpMng_tfCategory_nm").val("");
	$("#cslTpMng_tfOrder_no").val("");
	$("input:radio[name=rdUse_yn]:input[value=Y]").prop("checked", true);
	$("#cslTpMng_tfParnt_cd").val(parntCd);
	$("#cslTpMng_tfCategory_gb").val(categoryGb);
	$("#cslTpMng_tfExt1_cd").val("");
	$("#cslTpMng_tfExt2_cd").val("");
	$("#cslTpMng_tfMemo").val("");
}


//파라미터 셋팅_CategoryAll
function getJsonStrCategoryAll()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMjAuY2F0ZWdvcnlhbGw=",     /*om020.categoryall*/
		"map" : {
			"key" : "value"
		}		
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}


//파라미터 셋팅_CategoryList
function getJsonStrCategoryList(categoryGb, parntCd, notuse)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMjAuY2F0ZWdvcnlsaXN0", /*om020.categorylist*/
		"map" : {
			"key" : "value",
			"categoryGb" : categoryGb,
			"parntCd" : parntCd,
			"notuse" : notuse	
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}


//파라미터 셋팅_CategorySpec
function getJsonStrCategorySpec(categoryGb, categoryCd)
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b20wMjAuY2F0ZWdvcnlzcGVj", /*om020.categoryspec*/
		"map" : {
			"key" : "value",
			"categoryGb" : categoryGb,
			"categoryCd" : categoryCd
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}




//파라미터 셋팅_CategorySpecDup
function getJsonStrCategorySpecDup(categoryGb, parntCd, categoryNm)
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b20wMjAuY2F0ZWdvcnlzcGVjZHVw", /*om020.categoryspecdup*/
		"map" : {
			"key" : "value",
			"categoryGb" : categoryGb,
			"parntCd" : parntCd,
			"categoryNm" : categoryNm			
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_UpdateCotegory
function getJsonStrUpdateCotegory()
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wMjAudXBkYXRl",    /*om020.update*/
		"map" : {
			"key" : "value",
			"categoryGb" : $("#cslTpMng_tfCategory_gb").val(),
			"categoryCd" : $("#cslTpMng_tfCategory_cd").val(),
			"categoryNm" : $("#cslTpMng_tfCategory_nm").val(),
			"parntCd" : $("#cslTpMng_tfParnt_cd").val(),	
			"ext1Cd" : $("#cslTpMng_tfExt1_cd").val(),
			"ext2Cd" : $("#cslTpMng_tfExt2_cd").val(),			
			"memo" : $("#cslTpMng_tfMemo").val(),
			"orderNo" : $("#cslTpMng_tfOrder_no").val()==""?"10":$("#cslTpMng_tfOrder_no").val(),
			"useYn" : $(":radio[name='rdUse_yn']:checked").val()
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_UpdateCotegoryOrder
function getJsonStrUpdateCotegoryOrder(categoryGb, categoryCd, orderNo)
{
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wMjAudXBkYXRl",    /*om020.update*/
		"map" : {
			"key" : "value",
			"categoryGb" : categoryGb,
			"categoryCd" : categoryCd,			
			"orderNo" : orderNo
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅_InsertCotegory
function getJsonStrInsertCotegory()
{
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMjAuaW5zZXJ0",	/*om020.insert*/
		"map" : {
			"key" : "value",
			"categoryGb" : $("#cslTpMng_tfCategory_gb").val(),
			"categoryNm" : $("#cslTpMng_tfCategory_nm").val(),
			"parntCd" : $("#cslTpMng_tfParnt_cd").val(),
			"ext1Cd" : $("#cslTpMng_tfExt1_cd").val(),
			"ext2Cd" : $("#cslTpMng_tfExt2_cd").val(),
			"memo" : $("#cslTpMng_tfMemo").val(),
			"orderNo" : $("#cslTpMng_tfOrder_no").val()==""?"10":$("#cslTpMng_tfOrder_no").val(),
			"useYn" : $(":radio[name='rdUse_yn']:checked").val()
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//코드 미사용포함 체크박스 클릭 이벤트
function chkNotUseCode_clickEvent()
{
	
	$("#cslTpMng_tblCategory").jqGrid("setGridParam", {postData : {pJson : getJsonStrCategoryList(categoryGb, parntCd, $("input[id=cslTpMng_chkNotUseCode]:checkbox").prop("checked"))}, page : 1, sortname : "CD_ORD", sortorder : "asc"});
	$("#cslTpMng_tblCategory").trigger("reloadGrid");
	
	initCodeSpec();
}


//조회 버튼 클릭 이벤트
function btnSearch_clickEvent()
{
	
	if(categoryGb == "") {
		$.jstree.reference('#jstree').deselect_all();
		$.jstree.reference('#jstree').select_node('000000');			
	}else{
		$.jstree.reference('#jstree').select_node(parntCd);
	}

	$("#cslTpMng_tblCategory").jqGrid("setGridParam", {postData : {pJson : getJsonStrCategoryList(categoryGb, parntCd, $("input[id=cslTpMng_chkNotUseCode]:checkbox").prop("checked"))}, page : 1, sortname : "CD_ORD", sortorder : "asc"});
	$("#cslTpMng_tblCategory").trigger("reloadGrid");
	
	initCodeSpec();
}

// 초기화 버튼 클릭 이벤트
function btnInit_clickEvent()
{
	fnCatagoryall();
	alert("카테고리를 초기화 합니다.");
	$.jstree.reference('#jstree').deselect_all();
	$.jstree.reference('#jstree').select_node('000000');

}


//catagoryall
function fnCatagoryall()
{
	$.jstree.destroy ();
	$.ajax({
		type : "post",
		async : false,
		url : getContextPath() + "/ajax/management/getCategoryAll.do",
		data : "pJson=" + getJsonStrCategoryAll(),
		success : function(data)
		{
			$("#jstree").html("");
			
			if(jr != '')
			{
				// param값을 JSON으로 파싱
				var jr = JSON.parse(data);
//				$("#jstree").jstree({ "core": { "data": jr,"multiple" : false } }).bind("loaded.jstree", function (event, data) { $(this).jstree("open_all"); });
				$("#jstree").jstree({ "core": { "data": jr,"multiple" : false } }).bind("loaded.jstree", 
						function (event, data) { 
					  
							 $("#jstree").jstree("open_node", "#00000000"); 
							 $("#jstree").jstree("select_node", "#00000000"); 
					});
									 
				//initCodeSpec();
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
	
 
	$("#jstree").bind("select_node.jstree", function(event, data)
			{
				categoryGb = data.node.original.lv;
				parntCd = data.node.original.id;
				
				//	$("#jstree").jstree("open_node", "#"+parntCd); 
				if(categoryGb < "3"){
		   		$("#cslTpMng_tblCategory").jqGrid("setGridParam", {postData : {pJson : getJsonStrCategoryList(categoryGb, parntCd, $("input[id=cslTpMng_chkNotUseCode]:checkbox").prop("checked"))}, page : 1, sortname : "CD_ORD", sortorder : "asc"});
		   		$("#cslTpMng_tblCategory").trigger("reloadGrid");
		   		$("#cslTpMng_btnAddCategory").show();
				} else{
			   		$("#cslTpMng_btnAddCategory").hide();
				}
		   		initCodeSpec();
			});	

}


//validator
function fnValidator()
{
    var rMsg = "";    
	
	if($("#cslTpMng_tfCategory_gb").val() == "")
		rMsg += "\n\n대분류는 등록할 수 없습니다.";
	
	if($("#cslTpMng_tfCategory_nm").val() == "")
		rMsg += "\n\n상담유형명을 입력 해 주세요.";
	
	if(depth < $("#cslTpMng_tfCategory_gb").val())
		rMsg += "\n\n최대 유형구분값을 초과하였습니다.";
    
	return rMsg;
}


//순서저장
function btnOrderSave_clickEvent()
{
	
	var rowNum = $("#cslTpMng_tblCategory").getGridParam("rowNum");
	var currentPageNum = $("#cslTpMng_tblCategory").getGridParam("page");
	var selRow;
	
	var gUpdcnt = 0;
	var gRowLength = $("#cslTpMng_tblCategory").getGridParam("reccount");		
	
		
	
	if(confirm("저장 하시겠습니까?"))
	{
		
		for(var i = 1 ; i <= currentPageNum * rowNum; i++ )
		{
			var currentRow = $("#cslTpMng_tblCategory").getRowData(i);
			if(jQuery.isEmptyObject(currentRow)){
				continue;
			}			
		
			//alert("gRowLength=>"+gRowLength +"::"+i+"::"+currentRow.CATEGORY_GB +"::"+currentRow.CATEGORY_CD +"::"+currentRow.CD_ORD);
			
			if( !currentRow.CD_ORD ) {
				selRow = $("#cslTpMng_tblCategory").getGridParam("selrow");
				$("#cslTpMng_tblCategory").find("#" + selRow).find("td[aria-describedby=tblCategory_CATEGORY_GB]").trigger("click");
				currentRow = $("#cslTpMng_tblCategory").getRowData(i);
			}
			
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/management/updateCategoryOrder.do",
				data : "pJson=" + getJsonStrUpdateCotegoryOrder(currentRow.CATEGORY_GB, currentRow.CATEGORY_CD, currentRow.CD_ORD),
				success : function(data)
				{
					gUpdcnt++;
					if(gUpdcnt == gRowLength) alert("저장되었습니다.");		   		
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});		
		
		}
	}
}


//추가
function btnAddCategory_clickEvent()
{
	
	var rMsg = fnValidator();
	
	if(rMsg !== "")
	{
		alert(rMsg);
		return;
	}
	
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,		
		url : getContextPath() + "/ajax/management/getCategorySpecDup.do",
		data : "pJson=" + getJsonStrCategorySpecDup(categoryGb, parntCd, $("#cslTpMng_tfCategory_nm").val()),
		
		success : function(data)
		{
			if(data != null)
			{
				alert("해당카테고리에 중복된 상담유형이 존재 합니다.\n" +
						"유형순서 : " + data.CD_ORD + "\n" +
						"유형코드 : " + data.CTG_CD + "\n" + 
						"유형이름 : " + data.CTG_CD_NM + "\n");
				$("#cslTpMng_tfCategory_nm").focus();
			}
			else
			{
				$.ajax({
					type : "post",
					dataType: "json",
					async : true,
					url : getContextPath() + "/ajax/management/insertCategory.do",
					data : "pJson=" + getJsonStrInsertCotegory(),
					success : function(data)
					{
						$("#cslTpMng_tblCategory").trigger("reloadGrid");						

				   		$("#cslTpMng_tblCategory").jqGrid("setGridParam", {postData : {pJson : getJsonStrCategoryList(categoryGb, parntCd, $("input[id=cslTpMng_chkNotUseCode]:checkbox").prop("checked"))}, page : 1, sortname : "CD_ORD", sortorder : "asc"});
				   		$("#cslTpMng_tblCategory").trigger("reloadGrid");
				   		
				   		
				   		initCodeSpec();
				   		fnCatagoryall();
				   		
				   		alert("추가되었습니다.");
				   		$.jstree.reference('#jstree').select_node(parntCd);
					},
					error : function(data, status, err) 
					{
						networkErrorHandler(data, status, err);
					}
				});
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
	
	
}

//수정 버튼 클릭 이벤트
function btnModCategory_clickEvent()
{
	
	var rMsg = fnValidator();
	
	if(rMsg !== "")
	{
		alert(rMsg);
		return;
	}
	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/management/updateCategory.do",
		data : "pJson=" + getJsonStrUpdateCotegory(),
		success : function(data)
		{
			// 중분류 미사용 처리시 하위 유형도 N처리
			if($(":radio[name='rdUse_yn']:checked").val()=="N" && $("#cslTpMng_tfCategory_gb").val() == "2"){
				$.ajax({
					type : "post",
					dataType: "json",
					async : true,
					url : getContextPath() + "/ajax/management/deleteCategory.do",
					data : "pJson=" + getJsonStrDeleteCategory(),
					success : function(data)
					{
				   		
					},
					error : function(data, status, err) 
					{
						networkErrorHandler(data, status, err);
					}
				});
			}
			
	   		$("#cslTpMng_tblCategory").trigger("reloadGrid");
	   		
	   		initCodeSpec();
	   		
	   		fnCatagoryall();
	   		
	   		alert("수정되었습니다.");
	   		$.jstree.reference('#jstree').select_node(parntCd);
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

// 파라미터 셋팅_DeleteCategory
function getJsonStrDeleteCategory(){
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wMjAuZGVsZXRl",    /*om020.delete*/
		"map" : {
			"key" : "value",
			"parntCd" : $("#cslTpMng_tfCategory_cd").val(),			
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}


// init Page
$(document).ready(function()
{	
	// 카테고리 전체 리스트 갖고오기
	fnCatagoryall();	
	
	// 코드 jqgrid
	$("#cslTpMng_tblCategory").jqGrid(
	{
		url : getContextPath() + "/jqgrid/management/getCategoryList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrCategoryList("", "", $("input[id=cslTpMng_chkNotUseCode]:checkbox").prop("checked"))
		},
	   	colNames : ["유형구분",  "유형코드", "유형명", "순서", "사용여부"],
	   	colModel :
	   	[
	   		{ name : "CTG_LVL", index : "CTG_LVL", width : 80, align : "center" },
	   		{ name : "CD", index : "CD", width : 120, align : "center" },
	   		{ name : "CD_NM", index : "CD_NM", width : 200 },
	   		{ name : "CD_ORD", index : "CD_ORD", width : 80, align : "center", editable:true, editrules:{number:true, minValue:1, maxValue:999}, sorttype:'number', formatter:'integer'},
	   		{ name : "USE_YN", index : "USE_YN", width : 80, align : "center" },
	   	],
	   	sortname : "CD_ORD",
	   	sortorder : "asc",
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
	   	pager : "#cslTpMng_pagingCode",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
	   	cellEdit: true,
	   	cellsubmit:'clientArray',
	   	afterSaveCell : function(rowid,name,val,iRow,ICol){ // 로우 데이터 변경하고 엔터치거나 다른 셀 클릭했을때 발동
           // alert("afterSaveCell==>"+rowid+val+name);
        },
	   	onSelectRow : function(rowid)
	   	{
	   		$("#cslTpMng_btnAddCategory").hide();
	   		$("#cslTpMng_btnModCategory").show();
	   		$("#cslTpMng_btnInitCotegory").show();
	   		$("#cslTpMng_tfCategory_gb").prop("disabled", true);
	   		$("#cslTpMng_tfCategory_cd").prop("disabled", true);
	   		$("#cslTpMng_tfParnt_cd").prop("disabled", true);
	   		
	   		var row = $("#cslTpMng_tblCategory").getRowData(rowid);
	   		
	   		$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/management/getCategorySpec.do",
				data : "pJson=" + getJsonStrCategorySpec(row.CTG_LVL, row.CD),
				success : function(data)
				{
					$("#cslTpMng_tfCategory_cd").val(data.CTG_CD);
			   		$("#cslTpMng_tfCategory_nm").val(data.CTG_CD_NM);
			   		$("#cslTpMng_tfOrder_no").val(data.CD_ORD);
			   		$("input:radio[name=rdUse_yn]:input[value=" + data.USE_YN + "]").prop("checked", true);
			   		$("#cslTpMng_tfParnt_cd").val(data.PARNT_CD);
			   		$("#cslTpMng_tfCategory_gb").val(data.CTG_LVL);
			   		$("#cslTpMng_tfExt1_cd").val(data.EXT1_CD);
			   		$("#cslTpMng_tfExt2_cd").val(data.EXT2_CD);
			   		$("#cslTpMng_tfMemo").val(data.MEMO);
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err);
				}
			});
	   	},
	   	onPaging : function(pgButton)
	   	{
	   		initCodeSpec();
	   	}
	}).jqGrid("navGrid", "#cslTpMng_pagingCode", {edit : false, add : false, del : false, search : false});
	

	
	// 조회 버튼 클릭 이벤트 등록
	$("#btnSearch").bind("click", btnSearch_clickEvent);
	
	// 초기화 버튼 클릭 이벤트 등록
	$("#btnInit").bind("click", btnInit_clickEvent);
	
	// 미사용포함 체크 클릭 이벤트 등록
	$("#cslTpMng_chkNotUseCode").bind("click", chkNotUseCode_clickEvent);
	
	
	// 순서저장
	$("#btnOrderSave").bind("click", btnOrderSave_clickEvent);
	
	//  추가 버튼 클릭 이벤트 등록
	$("#cslTpMng_btnAddCategory").bind("click", btnAddCategory_clickEvent);
	
	// 수정 버튼 클릭 이벤트 등록
	$("#cslTpMng_btnModCategory").bind("click", btnModCategory_clickEvent);
	
	// 코드 상세 초기화 버튼 클릭 이벤트 등록
	$("#cslTpMng_btnInitCotegory").bind("click", function(e)
	{
		$("#cslTpMng_tblCategory").trigger("reloadGrid");
		initCodeSpec();
	});
	
	$("#cslTpMng_btnAddCategory").hide();
	$("#cslTpMng_btnInitCotegory").hide();
});

