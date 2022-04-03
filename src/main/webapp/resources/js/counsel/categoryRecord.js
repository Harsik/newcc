
//파라미터 셋팅 CatRcdList
function getJsonStrCatRcdList()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b2gwNjMuY2F0UmNkTGlzdA==",
		"map" : {
			"key" : "value",
			"cat_seq" : sessionStorage.getItem("category_cat_seq"),
			"tp_cd" : sessionStorage.getItem("category_tp_cd"),
			"cd" : sessionStorage.getItem("category_cd"),
		}
	};
	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 CatRcdDetail
function getJsonStrCatRcdDetail(seq)
{
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "b2gwNjMuY2F0UmNkRGV0YWls",
			"map" : {
				"key" : "value",
				"seq" : seq
			}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅_fileDown
function getJsonCategoryFileDown(svr, loc)
{		
	var loParam = {
			"svrFilePath" : svr,
			"locFileName" : loc
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅 selectFile
function getJsonStrSelectFile(tp_cd, cd, cat_seq, seq)
{
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wMTkuZmlsZUxpc3Q=",
			"map" : {
				"key" : "value",
				"tbl_nm" : "om061",
				"tbl_pk": tp_cd,
				"tbl_pk2" : cd,
				"tbl_pk3" : cat_seq,
				"seq" : seq,
			}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 CatIndxList
function getJsonStrCatIndxList(tp_cd, cd, cat_seq)
{
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b2QwNjIuY2F0SW5keExpc3Q=",
			"map" : {
				"key" : "value",
				"tp_cd" : tp_cd,
				"cd" : cd,
				"cat_seq" : cat_seq,
			}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

function selfClose()
{
	self.close();
}

// 그리드 셋팅
function tbl_init_grid()
{
	
	$("#tblCategoryRcd").jqGrid(
	{
		url : getContextPath() + "/jqgrid/counsel/categoryList.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrCatRcdList
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["수정일시", "수정자", "이력키"],
		colModel :
	   	[
			{ name : "MOD_DT_FORMAT", index : "MOD_DT_FORMAT", align : "center", width : 100},
			{ name : "MOD_USR_NM", index : "MOD_USR_NM", align : "center", width : 70},
			{ name : "SEQ", index : "SEQ", align : "center", hidden : true},
	   	],
	   	sortname : "MOD_DT_FORMAT",
	   	sortorder : "desc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "260",
	   	width : "100%",
	   	rowNum : 10,
	   	rowList : [10, 20, 30],
	   	autowidth : true,
	   	pager : "#pgCategoryRcd",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function( rowid )
	   	{
	   		var row = $("#tblCategoryRcd").getRowData(rowid);
	   		
	   		$.ajax({
	   			type : "post",
	   			async : true,
	   			dataType: "json",
	   			url : getContextPath() + "/ajax/counsel/catTree.do",
	   			data : "pJson=" + getJsonStrCatRcdDetail(row.SEQ),
	   			success : function(data)
	   			{
	   				var catURL = "";
	   				$("#txtCatLvRcd").html("");
	   				$("#txtCatCdRcd").html("");
	   				$("#divCatNmRcd").html("");
	   				$("#divCatLinkRcd").html("");
	   				$("#txtCatHsCdRcd").html("");
	   				$("#txtCatDscRcd").html("");
	   				
	   				$("#txtCatLvRcd").html(data.CAT_SEQ);
	   				if(data.TP_CD == "92001")
	   					$("#txtCatCdRcd").html(data.VIEW_CD);
	   				else
	   					$("#txtCatCdRcd").html(data.CD);
	   				$("#divCatNmRcd").html(data.CD_NM);
	   				if( data.URL != undefined )
	   					catURL = "<a href = '" +data.URL+"' target='_blank'>"+data.URL+"</a>";
	   				$("#divCatLinkRcd").html(catURL);
	   				$("#txtCatHsCdRcd").html(data.HS_CD);
	   				$("#txtCatDscRcd").html(data.DSC);
	   				$("#divCatFileRcd").html("");
	   				$("#txtCatIndxRcd").html("");
	   				fileView(data.TP_CD, data.CD, data.CAT_SEQ, data.SEQ);
	   				indxView(data.CAT_SEQ, data.TP_CD, data.CD);
	   			},
	   			error : function(data, status, err) 
	   			{
	   				networkErrorHandler(data, status, err, "categoryRecord.js : 169");
	   			}
	   		});
		}
	}).jqGrid("navGrid", "#pgCategoryRcd", {edit : false, add : false, del : false, search : false});
}

//분류 색인어 뷰
function indxView( cat_seq, tp_cd, cd)
{
	var catIndx = "";
	
	$.ajax({
		type : "post",
		async : true,
		dataType: "json",
		url : getContextPath() + "/ajax/counsel/catDetail.do",
		data : "pJson=" + getJsonStrCatIndxList(tp_cd, cd, cat_seq),
		success : function(data)
		{
			$.each(data, function(key, state) {
				$("#txtCatIndxRcd").append(catIndx);
			});
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err, "categoryRecord.js : 195");
		}
	});
}

//파일 목록 보여주는 함수
function fileView(tp_cd, cd, cat_seq, seq)
{
	var catIndx = "";
	
	$.ajax({
		type : "post",
		async : true,
		dataType: "json",
		url : getContextPath() + "/ajax/counsel/catFile.do",
		data : "pJson=" + getJsonStrSelectFile(tp_cd, cd, cat_seq, seq),
		success : function(data)
		{
			$("#divCatFileRcd").html("");
			$.each(data, function(key, state) {
				var url = getContextPath() + "/file/counsel/categoryFileDown.do?pJson=" + getJsonCategoryFileDown(state.SVRFL_PTH, state.LOCFL_NM);
				
				catIndx = "<tr><td><a href='" + url + "'>" + state.LOCFL_NM + "</a> <span>(" + state.FL_KB_SZ + ")</span> </td></tr>";
				
				$("#divCatFileRcd").append(catIndx);
				
			});
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err, "categoryRecord.js : 225");
		}
	});
}

function closeIt()
{
	opener.newWindow = null;
}

//init Page
$(document).ready(function()
{	
	tbl_init_grid();
	
	// F5(새로고침) 막는 함수
	$(document).keydown(function (e) {
		var allowPageList = new Array('/a.php', '/b.php');
		var bBlockF5Key = true;
		for (number in allowPageList) {
		var regExp = new RegExp('^' + allowPageList[number] + '.*', 'i');
			if (regExp.test(document.location.pathname)) {
				bBlockF5Key = false;
				break;
			}
		};
		
		if (bBlockF5Key)
		{
			if (e.which === 116)
			{
				if (typeof event == "object") {
					event.keyCode = 0;
				}
				return false;
			}
			else if (e.which === 82 && e.ctrlKey)
			{
				return false;
			}
		}
	});
});