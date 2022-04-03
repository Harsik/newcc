// 분류 타입 코드
var G_CAT_TP_CD = "92001";
// 제품 타입 코드
var G_PROD_TP_CD = "92002";

// 분류 검색 조건
var g_catLv = "";
var g_catType = "";
var g_catCond = "";
var g_catVal = "";

var g_cat_tp_cd = "";
var g_cat_cd = "";
var g_cat_seq = "";
var g_cat_parnt_tp_cd = "";
var g_cat_parnt_cd = "";

// 제품 검색 조건
var g_prodLv = "";
var g_prodType = "";
var g_prodCond = "";
var g_prodVal = "";

var g_prod_tp_cd = "";
var g_prod_cd = "";
var g_prod_seq = "";
var g_prod_parnt_tp_cd = "";
var g_prod_parnt_cd = "";

// 로그인 사용자 권한
var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");

// 색인어 수정할 때 인지 추가 할 때 인지
var indxState = "";

// 모달 정보
var g_selectType = "";
var g_catInfo = "";
var g_prodInfo = "";

var newWindow = null;
//파라미터 셋팅 CatList
function getJsonStrCatList(catLv, catType, catCond, srchVal, tp_cd)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNjEuY2F0TGlzdA==",
		"map" : {
			"key" : "value",
			"catLv" : catLv,
			"catType" : catType,
			"catCond" : catCond,
			"srchVal" : srchVal,
			"tp_cd" : tp_cd,
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 CatTree
function getJsonStrCatTree(cat_seq, tp_cd, parnt_cd)
{
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wNjEuY2F0VHJlZQ==",
			"map" : {
				"key" : "value",
				"cat_seq" : cat_seq,
				"tp_cd" : tp_cd,
				"parnt_cd" : parnt_cd,
			}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 CatDetail
function getJsonStrCatDetail(tp_cd, cd, cat_seq)
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "b20wNjEuY2F0RGV0YWls",
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

//파라미터 셋팅 CatSeqList
function getJsonStrCatSeqList(tp_cd)
{
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wNjEuY2F0U2VxTGlzdA==",
			"map" : {
				"key" : "value",
				"tp_cd" : tp_cd,
			}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 catMod
function getJsonStrCatMod(tp_cd, cd, cat_seq, changeCd, cd_nm, eng_cd_nm, dsc, parnt_tp_cd, parnt_cd, hs_cd, link, seq)
{
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "b20wNjEuY2F0VXBkYXRl",
			"map" : {
				"key" : "value",
				"tp_cd" : tp_cd,
				"cd" : cd,
				"cat_seq" : cat_seq,
				"changeCd" : changeCd,
				"cd_nm" : cd_nm,
				"eng_cd_nm" : eng_cd_nm,
				"dsc" : dsc,
				"parnt_tp_cd" : parnt_tp_cd,
				"parnt_cd" : parnt_cd,
				"hs_cd" : hs_cd,
				"link" : link,
				"seq" : seq,
			}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 catDel
function getJsonStrCatDel(tp_cd, cd, cat_seq)
{
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "b20wNjEuY2F0RGVsZXRl",
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

//파라미터 셋팅 catInsert
function getJsonStrCatIns(tp_cd, cd, cat_seq, cd_nm, parnt_tp_cd, parnt_cd, eng_cd_nm, dsc, hs_cd, link)
{
	var loParam = {
			"qt" : "aW5zZXJ0",
			"mi" : "b20wNjEuY2F0SW5zZXJ0",
			"map" : {
				"key" : "value",
				"tp_cd" : tp_cd,
				"cd" : cd,
				"cat_seq" : cat_seq,
				"cd_nm" : cd_nm,
				"parnt_tp_cd" : parnt_tp_cd,
				"parnt_cd" : parnt_cd,
				"eng_cd_nm" : eng_cd_nm,
				"dsc" : dsc,
				"hs_cd" : hs_cd,
				"link" : link,
			}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 catcdlist
function getJsonStrCatUpdCd(cd, length, outCd, cat_seq, tp_cd)
{
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wNjEuY2F0VXBkQ2Q=",
			"map" : {
				"key" : "value",
				"cd" : cd,
				"length" : length,
				"outCd" : outCd,
				"cat_seq" : cat_seq,
				"tp_cd" : tp_cd
			}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 catIndxDel
function getJsonStrCatIndxDel(tp_cd, cd, indx, cat_seq)
{
	var loParam = {
			"qt" : "ZGVsZXRl",
			"mi" : "b2QwNjIuaW5keERlbGV0ZQ==",
			"map" : {
				"key" : "value",
				"tp_cd" : tp_cd,
				"cd" : cd,
				"indx" : indx,
				"cat_seq" : cat_seq,
			}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 catIndxIns
function getJsonStrCatIndxIns(tp_cd, cd, indx, cat_seq)
{
	var loParam = {
			"qt" : "aW5zZXJ0",
			"mi" : "b2QwNjIuaW5keEluc2VydA==",
			"map" : {
				"key" : "value",
				"tp_cd" : tp_cd,
				"cd" : cd,
				"indx" : indx,
				"cat_seq" : cat_seq,
			}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 getDeptNm
function getJsonStrGetDeptNm(tp_cd, cd, cat_seq)
{
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "b20wNjEuZ2V0RGVwdE5hbWU=",
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

//파라미터 셋팅 getSeq
function getJsonStrGetSeq()
{
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "b2gwNjMuZ2V0U2Vx",
			"map" : {
				"key" : "value",
			}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 addTbl_pk4
function getJsonStrAddTbl_pk4(tp_cd, cd, cat_seq, seq)
{
	var loParam = {
			"qt" : "dXBkYXRl",
			"mi" : "b20wMTkuYWRkVGJsX3BrNA==",
			"map" : {
				"key" : "value",
				"tbl_nm" : "om061",
				"tp_cd" : tp_cd,
				"cd" : cd,
				"cat_seq" : cat_seq,
				"seq" : seq,
			}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 InsertFile
function getJsonStrInsertFile(fl_id)
{
	var loParam = {
			"qt" : "aW5zZXJ0",
			"mi" : "b20wMTkuaW5zZXJ0Q2F0RmlsZQ==",
			"map" : {
				"key" : "value",
				"fl_id" : fl_id,
			}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 insertFile
function getJsonStrInsertCatFile(tp_cd, cd, cat_seq)
{
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wMTkuZHVtbXlTZWxlY3Q=",
		"map" : {
			"key" : "value",
			"tbl_nm" : "om061",
		    "tbl_pk": tp_cd,
		    "tbl_pk2" : cd,
		    "tbl_pk3" : cat_seq,
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 selectFile
function getJsonStrSelectFile(tp_cd, cd, cat_seq)
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
				"tbl_pk4" : "category",
			}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
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

// 그리드 셋팅
function tbl_init_grid(pMap)
{
	var catColNames;
	var catColModel;
	
	if(pMap.tbl_name == "tblCategory")
	{
		catColNames = ["분류코드", "나라", "인증", "분류항목명", "색인어", "분류키", "분류타입코드"];
		catColModel =
	   	[
			{ name : "CD", index : "CD", align : "left", width : 30},
			{ name : "CD_COUNTRY", index : "CD_COUNTRY", align : "left", width : 40},
			{ name : "CD_CAT", index : "CD_CAT", align : "left", width : 40},
			{ name : "CD_NM", index : "CD_NM", align : "left"},
			{ name : "INDX", index : "INDX", align : "center", width : 100},
			{ name : "CAT_SEQ", index : "CAT_SEQ", align : "center", hidden: true},
			{ name : "TP_CD", index : "TP_CD", align : "center", hidden: true}
	   	];
	}
	else
	{
		catColNames = ["분류코드", "분류항목명", "색인어", "분류키", "분류타입코드"];
		catColModel =
	   	[
			{ name : "CD", index : "CD", align : "left", width : 50},
			{ name : "CD_NM", index : "CD_NM", align : "left"},
			{ name : "INDX", index : "INDX", align : "center", width : 100},
			{ name : "CAT_SEQ", index : "CAT_SEQ", align : "center", hidden: true},
			{ name : "TP_CD", index : "TP_CD", align : "center", hidden: true}
	   	];
	}
	
	$("#"+pMap.tbl_name).jqGrid(
	{
		/*url : getContextPath() + "/ajax/counsel/categoryList.do",*/
		datatype : "json",
		mtype : "POST",
		/*postData : {
			pJson : getJsonStrTestSelect()
		},*/
		jsonReader :
		{
			repeatitems: false
		},
		colNames : catColNames,
		colModel : catColModel,
	   	sortname : "CD",
	   	sortorder : "asc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "520",
	   	width : "100%",
	   	rowNum : 20,
	   	rowList : [10, 20, 30],
	   	autowidth : true,
	   	pager : "#"+pMap.pg_name,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : window[pMap.selectEvent],
	}).jqGrid("navGrid", "#"+pMap.pg_name, {edit : false, add : false, del : false, search : false});
}

//그리드 셋팅
function tblDummy_init_grid(pMap)
{
	var catColNames;
	var catColModel;
	
	if(pMap.tbl_name == "tblDummyCategory")
	{
		catColNames = ["분류코드", "나라", "인증", "분류항목명", "색인어", "분류키", "분류타입코드"];
		catColModel =
	   	[
			{ name : "CD", index : "CD", align : "left", width : 30},
			{ name : "CD_COUNTRY", index : "CD_COUNTRY", align : "left", width : 40},
			{ name : "CD_CAT", index : "CD_CAT", align : "left", width : 40},
			{ name : "CD_NM", index : "CD_NM", align : "left"},
			{ name : "INDX", index : "INDX", align : "center", width : 100},
			{ name : "CAT_SEQ", index : "CAT_SEQ", align : "center", hidden: true},
			{ name : "TP_CD", index : "TP_CD", align : "center", hidden: true}
	   	];
	}
	else
	{
		catColNames = ["분류코드", "분류항목명", "색인어", "분류키", "분류타입코드"];
		catColModel =
	   	[
			{ name : "CD", index : "CD", align : "left", width : 50},
			{ name : "CD_NM", index : "CD_NM", align : "left"},
			{ name : "INDX", index : "INDX", align : "center", width : 100},
			{ name : "CAT_SEQ", index : "CAT_SEQ", align : "center", hidden: true},
			{ name : "TP_CD", index : "TP_CD", align : "center", hidden: true}
	   	];
	}
	
	$("#"+pMap.tbl_name).jqGrid(
	{
		/*url : getContextPath() + "/ajax/counsel/categoryList.do",*/
		datatype : "json",
		mtype : "POST",
		/*postData : {
			pJson : getJsonStrTestSelect
		},*/
		jsonReader :
		{
			repeatitems: false
		},
		colNames : catColNames,
		colModel : catColModel,
	   	sortname : "CD",
	   	sortorder : "asc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "520",
	   	width : "100%",
	   	rowNum : 20,
	   	rowList : [10, 20, 30],
	   	autowidth : true,
	   	pager : "#" + pMap.pg_name,
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	}).jqGrid("navGrid", "#" + pMap.pg_nanme, {edit : false, add : false, del : false, search : false});
}

// 트리 리스트 셋팅
function tree_init(pMap)
{
	$("#" + pMap.div).html("Loading ...");
	
	$("#" + pMap.div).jstree({
		'core' :
		{
			'data' :
			{
				'dataType' : "json",
				'url' : function (node) 
				{
					return getContextPath() + "/ajax/counsel/catTree.do";
			    },
			    'data' : function (node)
			    {
			    	return node.id == "#" ? "pJson=" + getJsonStrCatTree($("#" + pMap.select_box).val(), pMap.tp_cd, "lvOne") : "pJson=" + getJsonStrCatTree($("#" + pMap.select_box).val(), pMap.tp_cd, node.id);
			    },
			},
			"themes":{ "icons":false, "dots" : true  },
		},
	}).bind('loaded.jstree', function (e, data) {
		$("#" + pMap.div).jstree("open_node", $("#ktr"));
	});
	/*$("#" + pMap.div).jstree("open_node", $("#ktr"));*/
}

// 분류 트리 리스트 새로고침
function categoryTree_refresh()
{
	$("#divCatTree").jstree({
		'core' :
		{
			'data' :
			{
				'dataType' : "json",
				'url' : function (node) 
				{
					return getContextPath() + "/ajax/counsel/catTree.do";
			    },
			    'data' : function (node)
			    {
			    	return node.id == "#" ? "pJson=" + getJsonStrCatTree($("#optCatLv").val(), G_CAT_TP_CD, "lvOne") : "pJson=" + getJsonStrCatTree($("#optCatLv").val(), G_CAT_TP_CD, node.id);
			    },
			},
			"themes":{ "icons":false, "dots" : true  }
		}
	});
	$('#divCatTree').jstree("deselect_all");
	$('#divCatTree').jstree(true).refresh();
}

// 제품 트리 리스트 새로고침
function productTree_refresh()
{
	$("#divProdTree").jstree({
		'core' :
		{
			'data' :
			{
				'dataType' : "json",
				'url' : function (node) 
				{
					return getContextPath() + "/ajax/counsel/catTree.do";
			    },
			    'data' : function (node)
			    {
			    	return node.id == "#" ? "pJson=" + getJsonStrCatTree($("#optProdLv").val(), G_PROD_TP_CD, "lvOne") : "pJson=" + getJsonStrCatTree($("#optProdLv").val(), G_PROD_TP_CD, node.id);
			    },
			},
			"themes":{ "icons":false, "dots" : true  }
		}
	});
	$('#divProdTree').jstree("deselect_all");
	$('#divProdTree').jstree(true).refresh();
}

// 분류 초기화 버튼 클릭 이벤트
function btnCatInit_clickEvent(state)
{
	$("#divCatDetail").css("display", "none");
	$("#divDummyCatList").css("display", "block");
	$("#divCatList").css("display", "none");
	
	$("#btnCatMod").hide();
	$("#btnCatSave").hide();
	$("#btnCatDel").hide();
	$("#btnCatSelect").hide();
	$("#tblCatMod").hide();
	
	$("#tfCatModLv").val("");
	$("#tfCatModLink").val("");
	$("#tfCatSrchVal").val("");
	$("#optCatLv")[0].selectedIndex = 0;
	$("#optCatType")[0].selectedIndex = 0;
	$("#optCatCond")[0].selectedIndex = 0;
	
	g_cat_tp_cd = "";
	g_cat_cd = "";
	g_cat_seq = "";
	g_cat_parnt_tp_cd = "";
	g_cat_parnt_cd = "";
	
	if(state != "tab")
		categoryTree_refresh();
	
}

// 제품 초기화 버튼 클릭 이벤트
function btnProdInit_clickEvent(state)
{
	$("#divProdDetail").css("display", "none");
	$("#divDummyProdList").css("display", "block");
	$("#divProdList").css("display", "none");
	
	$("#btnProdMod").hide();
	$("#btnProdSave").hide();
	$("#btnProdDel").hide();
	$("#btnProdSelect").hide();
	$("#tblProdMod").hide();
	
	$("#tfProdModLv").val("");
	$("#tfProdModHsCd").val("");
	
	$("#tfProdSrchVal").val("");
	$("#optProdLv")[0].selectedIndex = 0;
	$("#optProdType")[0].selectedIndex = 0;
	$("#optProdCond")[0].selectedIndex = 0;
	
	g_prod_tp_cd = "";
	g_prod_cd = "";
	g_prod_seq = "";
	g_prod_parnt_tp_cd = "";
	g_prod_parnt_cd = "";
	
	if(state != "tab")
		productTree_refresh();
	
}

// 분류 조회 버튼 클릭 이벤트
function btnCatSearch_clickEvent()
{
	$("#divCatDetail").css("display", "none");
	$("#divDummyCatList").css("display", "none");
	$("#divCatList").css("display", "block");
	
	g_catLv = $("#optCatLv").val();
	g_catType = $("#optCatType").val();
	g_catCond = $("#optCatCond").val();
	g_catVal = $("#tfCatSrchVal").val().trim().split(" ");
	
	$("#tblCategory").jqGrid("setGridParam", {url : getContextPath() + "/jqgrid/counsel/categoryList.do", postData : {pJson : getJsonStrCatList(g_catLv, g_catType, g_catCond, g_catVal, G_CAT_TP_CD)} , page : 1, sortname : "CD", sortorder : "asc"}).trigger("reloadGrid");
	
	categoryTree_refresh();
}

// 제품 조회 버튼 클릭 이벤트
function btnProdSearch_clickEvent()
{
	$("#divProdDetail").css("display", "none");
	$("#divDummyProdList").css("display", "none");
	$("#divProdList").css("display", "block");
	
	g_prodLv = $("#optProdLv").val();
	g_prodType = $("#optProdType").val();
	g_prodCond = $("#optProdCond").val();
	g_prodVal = $("#tfProdSrchVal").val().trim().split(" ");
	
	$("#tblProduct").jqGrid("setGridParam", {url : getContextPath() + "/jqgrid/counsel/categoryList.do", postData : { pJson : getJsonStrCatList(g_prodLv, g_prodType, g_prodCond, g_prodVal, G_PROD_TP_CD)} , page : 1, sortname : "CD", sortorder : "asc"}).trigger("reloadGrid");
	
	var resizeWidth = $('#divProdList').width();
	$('#tblProduct').setGridWidth(resizeWidth - 5, true);
	
	productTree_refresh();
}

// 분류 색인어 뷰
function indxView(tp_cd, cd, viewData, cat_seq)
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
			$("#"+viewData.parntId).html("");
			$.each(data, function(key, state) {
				if(usrGrdCd == "090100" || usrGrdCd == "060100" || usrGrdCd == "050100" || usrGrdCd == "030100")
					catIndx = "<div id = '" + viewData.divId + key + "'><label class = '"+ viewData.lblClassNm +"'>" + state.INDX + "</label> <label id = '" + viewData.labId + key +"' style = 'cursor: pointer;'>X</label></div>";
				else
					catIndx = state.INDX + "<br/>";
				
				$("#"+viewData.parntId).append(catIndx);
				
				$("#" + viewData.labId+key).bind("click", function() {
					catIndxDelete(key, tp_cd, cd, state.INDX, viewData.divId, cat_seq);
				});
			});
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err, "categorySearch.js : 711");
		}
	});
}

// 파일 목록 보여주는 함수
function fileView(tp_cd, cd, cat_seq, viewData)
{
	$.ajax({
		type : "post",
		async : true,
		dataType: "json",
		url : getContextPath() + "/ajax/counsel/catFile.do",
		data : "pJson=" + getJsonStrSelectFile(tp_cd, cd, cat_seq),
		success : function(data)
		{
			$.each(data, function(key, state) {
				var url = getContextPath() + "/file/counsel/categoryFileDown.do?pJson=" + getJsonCategoryFileDown(state.SVRFL_PTH, state.LOCFL_NM);
				
				if(viewData.type == "select")
					catIndx = "<tr><td><a href='" + url + "'>" + state.LOCFL_NM + "</a> <span>(" + state.FL_KB_SZ + ")</span> </td></tr>";
				else if(usrGrdCd == "090100" || usrGrdCd == "060100" || usrGrdCd == "050100" || usrGrdCd == "030100")
					catIndx = "<tr><td><a href='" + url + "' fl_id = '" + state.FL_ID + "' tbl_nm = '" + state.TBL_NM + "' tbl_pk = '" + state.TBL_PK + "' tbl_pk2 = '" + state.TBL_PK2 + "' tbl_pk3 = '" + state.TBL_PK3 + "'>" + state.LOCFL_NM + "</a> <span>(" + state.FL_KB_SZ + ")</span> <label class = 'deleteFile' style = 'cursor: pointer;'>X</label></td></tr>";
				else
					catIndx = "<tr><td><a href='" + url + "'>" + state.LOCFL_NM + "</a> <span>(" + state.FL_KB_SZ + ")</span> </td></tr>";
				
				$("#" + viewData.tblId).append(catIndx);
				
				// X 버튼 클릭 이벤트 등록
				$(".deleteFile").bind("click", event, function()
				{
					/*$("#CATEGORY").prop("disabled", false);
					$("#PRODUCT").prop("disabled", false);*/
					
					if($("#CatfileInfos tr").length < 6)
						$("#CATEGORY").prop("disabled", false);
					if($("#prodfileInfos tr").length < 6)
						$("#PRODUCT").prop("disabled", false);
					
					event.target.parentElement.id = "deleteTarget";
					$("#deleteTarget").parent().remove();
					
				});
				
			});
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err, "categorySearch.js : 759");
		}
	});
}

// 분류 상세
function catTable_init(tp_cd, cd, cat_seq)
{
	$.ajax({
		type : "post",
		async : true,
		dataType: "json",
		url : getContextPath() + "/ajax/counsel/catDetail.do",
		data : "pJson=" + getJsonStrCatDetail(tp_cd, cd, cat_seq),
		success : function(data)
		{
			$("#divCatDetail").css("display", "block");
			$("#divDummyCatList").css("display", "none");
			$("#divCatList").css("display", "none");
			
			var catName = "";
			var catLv = "";
			var catCd = "";
			var catDsc = "";
			var catUrl = "";
			var viewData = {};
			var catFileList = "<tr id = 'catFileBase'>";
			catFileList += '<td><input type="file" id="CATEGORY" name="CATEGORY" class="file_board" style="width:300px;" /></td>';
			catFileList += '<td style="width: 50%; text-align: right; "><img src="/resources/images/btn_fileadd.png" alt="파일추가" onclick = "btnCatFileAdd()" class="icon_add" style="cursor: pointer"/></td>';
			catFileList += "</tr>";
			
			if($("#optCatLv").val() != undefined)
				catLv = data.CAT_SEQ;
			if(data.CD != undefined)
				catCd = data.VIEW_CD;
			if(data.CD_NM != undefined)
				catName += "<label id = 'txtCatKorNm'>" + data.CD_NM + "</label><br/>";
			if(data.ENG_CD_NM != undefined)
				catName += "<label id = 'txtCatEngNm'>" + data.ENG_CD_NM + "</label>";
			if(data.DSC != undefined)
				catDsc = data.DSC;
			if(data.URL != undefined)
				catUrl = "<a href = '" +data.URL+"' target='_blank'>"+data.URL+"</a>";
			
			$("#txtCatLv").html(catLv);
			$("#txtCatCd").html(catCd);
			$("#divCatNm").html(catName);
			$("#txtCatDsc").html(catDsc);
			$("#divCatLink").html(catUrl);
			$("#txtCatIndx").html("");
			$("#divCatFile").html("");
			$("#txtCatModDt").html(data.MOD_DT);
			$("#txtCatModUsrNm").html(data.MOD_USR_NM);
			
			viewData.tblId = "divCatFile";
			viewData.type = "select";
			fileView(tp_cd, cd, cat_seq, viewData);
			
			viewData.divId = "divViewIndx";
			viewData.labId = "txtViewIndx";
			viewData.parntId = "txtCatIndx";
			viewData.lblClassNm = "indx";
			
			indxView(tp_cd, cd, viewData, cat_seq);
			
			if(usrGrdCd == "090100" || usrGrdCd == "060100" || usrGrdCd == "050100" || usrGrdCd == "030100")
			{
				$("#btnCatMod").show();
				$("#btnCatDel").show();
				$("#btnCatSave").hide();
				$("#btnCatAdd").hide();
			}
			
			// 모달인지 아닌지
			if(g_selectType == "")
				$("#btnCatSelect").hide();
			else
				$("#btnCatSelect").show();
			
			$("#tblCatMod").hide();
			$("#tblCatView").show();
			$("#btnCatList").show();
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err, "categorySearch.js : 844");
		}
	});
}

//제품 상세
function prodTable_init(tp_cd, cd, cat_seq)
{
	$.ajax({
		type : "post",
		async : true,
		dataType: "json",
		url : getContextPath() + "/ajax/counsel/catDetail.do",
		data : "pJson=" + getJsonStrCatDetail(tp_cd, cd, cat_seq),
		success : function(data)
		{
			$("#divProdDetail").css("display", "block");
			$("#divDummyProdList").css("display", "none");
			$("#divProdList").css("display", "none");
			
			var catName = "";
			var catLv = "";
			var catCd = "";
			var catDsc = "";
			var hsCd = "";
			var viewData = {};
			
			if($("#optProdLv").val() != undefined)
				catLv = data.CAT_SEQ;
			if(data.CD != undefined)
				catCd = data.CD;
			if(data.CD_NM != undefined)
				catName += "<label id = 'txtProdKorNm'>" + data.CD_NM + "</label><br/>";
			if(data.ENG_CD_NM != undefined)
				catName += "<label id = 'txtProdEngNm'>" + data.ENG_CD_NM + "</label>";
			if(data.DSC != undefined)
				catDsc = data.DSC;
			if(data.HS_CD != undefined)
				hsCd = data.HS_CD;
			
			$("#txtProdLv").html(catLv);
			$("#txtProdCd").html(catCd);
			$("#divProdNm").html(catName);
			$("#txtProdDsc").html(catDsc);
			$("#txtProdIndx").html("");
			$("#txtProdHsCd").html(hsCd);
			$("#divProdFile").html("");
			$("#txtProdModDt").html(data.MOD_DT);
			$("#txtProdModUsrNm").html(data.MOD_USR_NM);
			
			viewData.tblId = "divProdFile";
			viewData.type = "select";
			fileView(tp_cd, cd, cat_seq, viewData);
			
			viewData.divId = "divViewIndx";
			viewData.labId = "txtViewIndx";
			viewData.parntId = "txtProdIndx";
			viewData.lblClassNm = "indxProd";
			
			indxView(tp_cd, cd, viewData, cat_seq);
			
			if(usrGrdCd == "090100" || usrGrdCd == "060100" || usrGrdCd == "050100" || usrGrdCd == "030100")
			{
				$("#btnProdMod").show();
				$("#btnProdDel").show();
				$("#btnProdSave").hide();
				$("#btnProdAdd").hide();
			}
			
			// 모달인지 아닌지
			if(g_selectType == "")
				$("#btnProdSelect").hide();
			else
				$("#btnProdSelect").show();
			
			$("#tblProdMod").hide();
			$("#tblProdView").show();
			$("#btnProdList").show();
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err, "categorySearch.js : 925");
		}
	});
}

// 색인어 삭제 함수
function catIndxDelete(key, tp_cd, cd, indx, removeDiv, lv)
{
	if(confirm("삭제 하시겠습니까?"))
	{
		$.ajax({
			type : "post",
			async : true,
			dataType: "json",
			url : getContextPath() + "/ajax/counsel/catIndxDel.do",
			data : "pJson=" + getJsonStrCatIndxDel(tp_cd, cd, indx, lv),
			success : function(data)
			{
				if(data != null)
				{
					$("#"+removeDiv+key).remove();
					alert("삭제되었습니다.");
				}
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err, "categorySearch.js : 951");
			}
		});
	}
}

//조회 조건 중 차수 셀렉트박스 셋팅하는 함수
function seqList_init(pMap)
{
	$.ajax({
		type : "post",
		async : true,
		dataType: "json",
		url : getContextPath() + "/ajax/counsel/catSeqList.do",
		data : "pJson=" + getJsonStrCatSeqList(pMap.tp_cd),
		success : function(data)
		{
			$("#" + pMap.select_box).html("");
			// param값을 JSON으로 파싱
			var value = "";
			$.each(data, function(key, state)
			{
				value += "<option value='" + state.CAT_SEQ + "'>" + state.CAT_SEQ + "</option>";
			});
			
			$("#" + pMap.select_box).append(value);
			$("#" + pMap.select_box).trigger("change");
			
			// 트리 리스트
			tree_init(pMap);
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err, "categorySearch.js : 984");
		}
	});
	
}

//탭 이벤트 등록
function divCatTab_clickEvent()
{
	switch (event.target.id) 
	{
		case "divCatSrchTab":
		{
			$("#divCatSrchTab").attr("class","left_tab_img");
			$("#divProdTab").attr("class","left_tab_img_gray");
			
			$(".divCatSrchTabBody").css("display","block");
			$(".divProdTabBody").css("display","none");
			
			btnCatInit_clickEvent("tab");
			
			resizeWidth = $('#divDummyCatList').width();
			$('#tblDummyCategory').setGridWidth(resizeWidth - 5, true);
			
		}
		break;
		
		case "divProdTab":
		{
			$("#divCatSrchTab").attr("class","left_tab_img_gray");
			$("#divProdTab").attr("class","left_tab_img");
			
			$(".divCatSrchTabBody").css("display","none");
			$(".divProdTabBody").css("display","block");
			
			btnProdInit_clickEvent("tab");
			
			var resizeWidth = $('#divDummyProdList').width();
			$('#tblDummyProduct').setGridWidth(resizeWidth - 5, true);
			
		}
		break;
			
	}
}

//분류 코드 셀렉트 박스
function catCdSelectBox()
{
	var value = "";
	var catCd = g_cat_cd;
	var catCdLength = g_cat_cd.length;
	var cat_seq = $("#txtCatModLv").html();
	var currentVal = g_cat_cd;
	$("#optCatModCd").html("");
	
	var cd =  catCd.substring(0, catCdLength-2);
	
	var length = catCdLength;
	
	$.ajax({
		type : "post",
		async : true,
		dataType: "json",
		url : getContextPath() + "/ajax/counsel/catUpdCd.do",
		data : "pJson=" + getJsonStrCatUpdCd(cd, length, g_cat_cd, cat_seq, G_CAT_TP_CD),
		success : function(data)
		{
			var i = 0;
			var cnt = 0;
			var dataLength = data.length;
			for( i ; i < 100 ; i++)
			{
				var isBoolean = true;
				var a = i;
				
				if(i < 10)
					a = "0" + a;
				if(data[cnt] != undefined && data[cnt].CD.substr(data[cnt].CD.length-2) == a)
				{
					isBoolean = false;
					if( cnt < dataLength -1  )
						cnt++;
				}
				
				if(isBoolean)
					value += "<option value = '" + g_cat_cd.substr(0, g_cat_cd.length -2)+a +"'>" + a +"</option>";
			}
			
			$("#optCatModCd").append(value);
			$("#optCatModCd").val(currentVal);
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err, "categorySearch.js : 1078");
		}
	});
}


// 제품 코드 셀렉트 박스
function prodCdSelectBox()
{
	var value = "";
	var catCd = $("#txtProdCd").html();
	var catCdLength = $("#txtProdCd").html().length;
	var cat_seq = $("#txtProdModLv").html();
	var currentVal = $("#txtProdCd").html(); 
	$("#optProdModCd").html("");
	
	var cd =  catCd.substring(0, catCdLength-1);
	
	var length = catCdLength;
	
	$.ajax({
		type : "post",
		async : true,
		dataType: "json",
		url : getContextPath() + "/ajax/counsel/catUpdCd.do",
		data : "pJson=" + getJsonStrCatUpdCd(cd, length, g_prod_cd, cat_seq, G_PROD_TP_CD),
		success : function(data)
		{
			if( catCdLength == 1 )
			{
				for(var i = 0; i < 10 ; i++)
				{
					var isBoolean = true;
					for(var j = 0; j < data.length; j++)
					{
						if( data[j].CD == i)
							isBoolean = false;
					}
					if(isBoolean)
						value += "<option value = '" + i +"'>" + i +"</option>";
				}
			}
			else
			{
				for(var i = 0; i < 10 ; i++)
				{
					var isBoolean = true;
					for(var j = 0; j < data.length; j++)
					{
						var lastCd = data[j].CD.substr(data[j].CD.length-1, 1);
						if( lastCd == i)
							isBoolean = false;
					}
					if(isBoolean)
						value += "<option value = '"+catCd.substring(0, catCdLength-1) + i +"'>" + catCd.substring(0, catCdLength-1) + i +"</option>";
				}
			}
			$("#optProdModCd").append(value);
			$("#optProdModCd").val(currentVal);
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err, "categorySearch.js : 1140");
		}
	});
}

// 분류 추가 코드 셀렉트 박스
function catAddCdSelectBox()
{
	var value = "";
	
	if(g_cat_cd != null)
	{
		var cat_seq = $("#txtCatModLv").html();
		
		var catCdLength = g_cat_cd.length;
		$("#optCatModCd").html("");
		
		var length = catCdLength + 2;
	
		$.ajax({
			type : "post",
			async : true,
			dataType: "json",
			url : getContextPath() + "/ajax/counsel/catUpdCd.do",
			data : "pJson=" + getJsonStrCatUpdCd(g_cat_cd, length, "", cat_seq, G_CAT_TP_CD),
			success : function(data)
			{
				var i = 0;
				var cnt = 0;
				var dataLength = data.length;
				for( i ; i < 100 ; i++)
				{
					var isBoolean = true;
					var a = i;
					
					if(i < 10)
						a = "0" + a;
					if(data[cnt] != undefined && data[cnt].CD.substr(data[cnt].CD.length-2) == a)
					{
						isBoolean = false;
						if( cnt < dataLength -1  )
							cnt++;
					}
					
					if(isBoolean)
						value += "<option value = '" + g_cat_cd + a +"'>" + a +"</option>";
				}
				
				$("#optCatModCd").append(value);
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err, "categorySearch.js : 1192");
			}
		});
	}
	else
	{
		var cat_seq = $("#tfCatModLv").val();
		$("#optCatModCd").html("");
		if(cat_seq =="")
		{
			
			value = "";
			value = "<option>차수를 입력해주세요.</option>";
			$("#optCatModCd").append(value);
		}
		else
		{
			$.ajax({
				type : "post",
				async : true,
				dataType: "json",
				url : getContextPath() + "/ajax/counsel/catUpdCd.do",
				data : "pJson=" + getJsonStrCatUpdCd("", "2", "", cat_seq, G_CAT_TP_CD),
				success : function(data)
				{
					var i = 0;
					var cnt = 0;
					var dataLength = data.length;
					for( i ; i < 100 ; i++)
					{
						var isBoolean = true;
						var a = i;
						
						if(i < 10)
							a = "0" + a;
						if(data[cnt] != undefined && data[cnt].CD.substr(data[cnt].CD.length-2) == a)
						{
							isBoolean = false;
							if( cnt < dataLength -1  )
								cnt++;
						}
						
						if(isBoolean)
							value += "<option value = '" + a +"'>" + a +"</option>";
					}
					$("#optCatModCd").append(value);
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err, "categorySearch.js : 1241");
				}
			});
		}
	}
}

// 제품 추가 코드 셀렉트 박스
function prodAddCdSelectBox()
{
	var value = "";
	
	if(g_prod_cd != null)
	{
		var catCd = g_prod_cd;
		var cat_seq = $("#txtProdModLv").html();
		
		var catCdLength = catCd.length;
		$("#optProdModCd").html("");
		
		var cd = catCd.substring(0, catCdLength);
		var length = catCdLength + 1;
	
		$.ajax({
			type : "post",
			async : true,
			dataType: "json",
			url : getContextPath() + "/ajax/counsel/catUpdCd.do",
			data : "pJson=" + getJsonStrCatUpdCd(cd, length, "", cat_seq, G_PROD_TP_CD),
			success : function(data)
			{
				for(var i = 0; i < 10 ; i++)
				{
					var isBoolean = true;
					for(var j = 0; j < data.length; j++)
					{
						var lastCd = data[j].CD.substr(data[j].CD.length-1, 1);
						if( lastCd == i)
							isBoolean = false;
					}
					
					if(isBoolean)
						value += "<option value = '"+catCd + i +"'>" + catCd + i +"</option>";
				}
				$("#optProdModCd").append(value);
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err, "categorySearch.js : 1289");
			}
		});
	}
	else
	{
		var cat_seq = $("#tfProdModLv").val();
		$("#optProdModCd").html("");
		if(cat_seq =="")
		{
			
			value = "";
			value = "<option>차수를 입력해주세요.</option>";
			$("#optProdModCd").append(value);
		}
		else
		{
			$.ajax({
				type : "post",
				async : true,
				dataType: "json",
				url : getContextPath() + "/ajax/counsel/catUpdCd.do",
				data : "pJson=" + getJsonStrCatUpdCd("", "1", "", cat_seq, G_PROD_TP_CD),
				success : function(data)
				{
					for(var i = 0; i < 10 ; i++)
					{
						var isBoolean = true;
						for(var j = 0; j < data.length; j++)
						{
							if( data[j].CD == i)
								isBoolean = false;
						}
						
						if(isBoolean)
							value += "<option value = '"+ i +"'>" + i +"</option>";
					}
					$("#optProdModCd").append(value);
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err, "categorySearch.js : 1330");
				}
			});
		}
	}
}

// 분류 뷰 테이블 수정 버튼 클릭 함수
function btnCatMod_clickEvent()
{
	indxState = "update";
	
	$("#btnCatMod").hide();
	$("#btnCatSave").show();
	$("#btnCatAdd").hide();
	$("#btnCatDel").hide();
	$("#btnCatSelect").hide();
	$("#btnCatList").hide();
	
	$("#tblCatMod").show();
	$("#tblCatView").hide();
	
	$("#tfCatModLv").hide();
	$("#txtCatModLv").show();
	
	$("#txtCatModLv").html($("#txtCatLv").html());
	$("#optCatModCd").val($("#txtCatCd").html());
	$("#tfCatModKorNm").val($("#txtCatKorNm").html());
	$("#tfCatModEngNm").val($("#txtCatEngNm").html());
	$("#tfCatModDsc").val($("#txtCatDsc").html());
	$("#tfCatModLink").val($("#divCatLink").text());
	$("#tfIndxVal").val("");
	
	catCdSelectBox();
	
	$("#CatfileInfos").html();
	
	var catFileList = "<tr id = 'catFileBase'>";
	catFileList += '<td><input type="file" id="CATEGORY" name="CATEGORY" class="file_board" style="width:300px;" /></td>';
	catFileList += '<td style="width: 50%; text-align: right; "><img src="/resources/images/btn_fileadd.png" alt="파일추가" onclick = "btnCatFileAdd()" class="icon_add" style="cursor: pointer"/></td>';
	catFileList += "</tr>";
	
	$("#CatfileInfos").html(catFileList);
	
	if($("#divCatFile tr").length >4)
		$("#CATEGORY").prop("disabled", true);
	else
		$("#CATEGORY").prop("disabled", false);
	
	var viewData = {};
	
	viewData.tblId = "CatfileInfos";
	fileView(g_cat_tp_cd, g_cat_cd, g_cat_seq, viewData);
	
	viewData.divId = "divCatModIndx";
	viewData.labId = "delCatModIndx";
	viewData.parntId = "txtCatModIndx";
	viewData.lblClassNm = "indx";
	
	indxView(g_cat_tp_cd, g_cat_cd, viewData, g_cat_seq);
	
}

// 제품 뷰 테이블 수정 버튼 클릭 함수
function btnProdMod_clickEvent()
{
	indxState = "update";
	
	$("#btnProdMod").hide();
	$("#btnProdSave").show();
	$("#btnProdAdd").hide();
	$("#btnProdDel").hide();
	$("#btnProdSelect").hide();
	$("#btnProdList").hide();
	
	$("#tblProdMod").show();
	$("#tblProdView").hide();
	
	$("#tfProdModLv").hide();
	$("#txtProdModLv").show();
	
	$("#txtProdModLv").html($("#txtProdLv").html());
	$("#optProdModCd").val($("#txtProdCd").html());
	$("#tfProdModKorNm").val($("#txtProdKorNm").html());
	$("#tfProdModEngNm").val($("#txtProdEngNm").html());
	$("#tfProdModDsc").val($("#txtProdDsc").html());
	$("#tfProdIndxVal").val("");
	$("#tfProdModHsCd").val($("#txtProdHsCd").html());
	
	prodCdSelectBox();
	
	$("#prodfileInfos").html();
	
	var catFileList = "<tr id = 'prodFileBase'>";
	catFileList += '<td><input type="file" id="PRODUCT" name="PRODUCT" class="file_board" style="width:300px;" /></td>';
	catFileList += '<td style="width: 50%; text-align: right; "><img src="/resources/images/btn_fileadd.png" alt="파일추가" onclick = "btnProdFileAdd()" class="icon_add" style="cursor: pointer"/></td>';
	catFileList += "</tr>";
	
	$("#prodfileInfos").html(catFileList);
	
	if($("#divProdFile tr").length >4)
		$("#PRODUCT").prop("disabled", true);
	else
		$("#PRODUCT").prop("disabled", false);
	
	var viewData = {};
	
	viewData.tblId = "prodfileInfos";
	fileView(g_prod_tp_cd, g_prod_cd, g_prod_seq, viewData);
	
	viewData.divId = "divProdModIndx";
	viewData.labId = "delProdModIndx";
	viewData.parntId = "txtProdModIndx";
	viewData.lblClassNm = "indxProd";
	
	indxView(g_prod_tp_cd, g_prod_cd, viewData, g_prod_seq);
}

// 하위분류추가 버튼 클릭 함수
function btnCatInsert_clickEvent()
{
	if(g_cat_tp_cd == "" && g_cat_cd == "")
	{
		alert("상위 분류를 선택해 주세요.");
		return;
	}
	
	indxState = "insert";
	
	$("#divCatDetail").css("display", "block");
	$("#divDummyCatList").css("display", "none");
	$("#divCatList").css("display", "none");
	
	$("#btnCatMod").hide();
	$("#btnCatSave").hide();
	$("#btnCatAdd").show();
	$("#btnCatDel").hide();
	$("#btnCatSelect").hide();
	$("#btnCatList").hide();
	
	$("#tblCatMod").show();
	$("#tblCatView").hide();
	
	if(g_cat_cd == null)
	{
		$("#tfCatModLv").show();
		$("#txtCatModLv").hide();
		$("#tfCatModLv").html();
	}
	else
	{
		$("#tfCatModLv").hide();
		$("#txtCatModLv").show();
		$("#txtCatModLv").html($("#txtCatLv").html().trim());
	}
	
	$("#optCatModCd").html("");
	$("#txtCatModIndx").html("");
	$("#tfCatModKorNm").val("");
	$("#tfCatModEngNm").val("");
	$("#tfCatModDsc").val("");
	$("#tfIndxVal").val("");
	
	var catFileList = "<tr id = 'catFileBase'>";
	catFileList += '<td><input type="file" id="CATEGORY" name="CATEGORY" class="file_board" style="width:300px;" /></td>';
	catFileList += '<td style="width: 50%; text-align: right; "><img src="/resources/images/btn_fileadd.png" alt="파일추가" onclick = "btnCatFileAdd()" class="icon_add" style="cursor: pointer"/></td>';
	catFileList += "</tr>";
	
	$("#CatfileInfos").html(catFileList);
	
	catAddCdSelectBox();
}

// 하위제품추가 버튼 클릭 함수
function btnProdInsert_clickEvent()
{
	if(g_prod_tp_cd == "" && g_prod_cd == "")
	{
		alert("상위 제품를 선택해 주세요.");
		return;
	}
	
	indxState = "insert";
	
	$("#divProdDetail").css("display", "block");
	$("#divDummyProdList").css("display", "none");
	$("#divProdList").css("display", "none");
	
	$("#btnProdMod").hide();
	$("#btnProdSave").hide();
	$("#btnProdAdd").show();
	$("#btnProdDel").hide();
	$("#btnProdSelect").hide();
	$("#btnProdList").hide();
	
	$("#tblProdMod").show();
	$("#tblProdView").hide();
	
	if(g_prod_cd == null)
	{
		$("#tfProdModLv").show();
		$("#txtProdModLv").hide();
		$("#tfProdModLv").html();
	}
	else
	{
		$("#tfProdModLv").hide();
		$("#txtProdModLv").show();
		$("#txtProdModLv").html($("#txtProdLv").html().trim());
	}
	
	$("#optProdModCd").html("");
	$("#txtProdModIndx").html("");
	$("#tfProdModKorNm").val("");
	$("#tfProdModEngNm").val("");
	$("#tfProdModDsc").val("");
	$("#tfProdIndxVal").val("");
	
	var catFileList = "<tr id = 'prodFileBase'>";
	catFileList += '<td><input type="file" id="PRODUCT" name="PRODUCT" class="file_board" style="width:300px;" /></td>';
	catFileList += '<td style="width: 50%; text-align: right; "><img src="/resources/images/btn_fileadd.png" alt="파일추가" onclick = "btnProdFileAdd()" class="icon_add" style="cursor: pointer"/></td>';
	catFileList += "</tr>";
	
	$("#prodfileInfos").html(catFileList);
	
	prodAddCdSelectBox();
}

// 분류 뷰 테이블 삭제 버튼 클릭 함수
function btnCatDel_clickEvent()
{
	if(confirm("삭제 하시겠습니까?"))
	{
		$.ajax({
			type : "post",
			async : true,
			dataType: "json",
			url : getContextPath() + "/ajax/counsel/catDel.do",
			data : "pJson=" + getJsonStrCatDel(g_cat_tp_cd, g_cat_cd, g_cat_seq),
			success : function(data)
			{
				if(data != null)
				{
					$.ajax({
						type : "post",
						async : true,
						dataType: "json",
						url : getContextPath() + "/ajax/counsel/catIndxDel.do",
						data : "pJson=" + getJsonStrCatIndxDel(g_cat_tp_cd, g_cat_cd, "", g_cat_seq),
						success : function(data)
						{
						},
						error : function(data, status, err) 
						{
							networkErrorHandler(data, status, err, "categorySearch.js : 1584");
						}
					});
					
					g_cat_cd = "";
					g_cat_tp_cd = "";
					g_cat_seq = "";
					g_cat_parnt_tp_cd = "";
					g_cat_parnt_cd = "";
					
					if($("#tfCatSrchVal").val().trim() != "")
					{
						$("#divDummyCatList").css("display", "none");
						$("#divCatList").css("display", "block");
					}
					else
					{
						$("#divDummyCatList").css("display", "block");
						$("#divCatList").css("display", "none");
					}
					$("#divCatDetail").css("display", "none");
					
					categoryTree_refresh();
					alert("삭제되었습니다.");
				}
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err, "categorySearch.js : 1612");
			}
		});
	}
}

// 제품 뷰 테이블 삭제 버튼 클릭 함수
function btnProdDel_clickEvent()
{
	if(confirm("삭제 하시겠습니까?"))
	{
		$.ajax({
			type : "post",
			async : true,
			dataType: "json",
			url : getContextPath() + "/ajax/counsel/catDel.do",
			data : "pJson=" + getJsonStrCatDel(g_prod_tp_cd, g_prod_cd, g_prod_seq),
			success : function(data)
			{
				if(data != null)
				{
					$.ajax({
						type : "post",
						async : true,
						dataType: "json",
						url : getContextPath() + "/ajax/counsel/catIndxDel.do",
						data : "pJson=" + getJsonStrCatIndxDel(g_prod_tp_cd, g_prod_cd, "", g_prod_seq),
						success : function(data)
						{
						},
						error : function(data, status, err) 
						{
							networkErrorHandler(data, status, err, "categorySearch.js : 1644");
						}
					});
					
					g_prod_cd = "";
					g_prod_tp_cd = "";
					g_prod_seq = "";
					g_prod_parnt_tp_cd = "";
					g_prod_parnt_cd = "";
					
					if($("#tfProdSrchVal").val().trim() != "")
					{
						$("#divDummyProdList").css("display", "none");
						$("#divProdList").css("display", "block");
					}
					else
					{
						$("#divDummyProdList").css("display", "block");
						$("#divProdList").css("display", "none");
					}
					$("#divProdDetail").css("display", "none");
					
					categoryTree_refresh();
					alert("삭제되었습니다.");
				}
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err, "categorySearch.js : 1672");
			}
		});
	}
}

// 분류 뷰 테이블 선택 버튼 클릭 함수
function btnCatSelect_clickEvent(tp_cd, cd, cat_seq)
{
	var length = $("#divKorCatList")[0].childNodes.length;
	
	if(g_selectType == "productSelect")
	{
		alert("제품만 선택 가능 합니다.");
		return;
	}
	if( g_selectType == "categorySelect" && length > 0 )
	{
		alert("조회조건은 1개만 선택 가능 합니다.");
		return;
	}
	if(length >= 5)
	{
		alert("최대 5개까지 설정할 수 있습니다.");
		return;
	}
	var isOverlap = true;
	var target = $(".txtSelectVal");
	for(var i = 0 ; i < $("#divKorCatList")[0].childNodes.length; i++)
	{
		if(target[i].getAttribute("tp_cd") == tp_cd && target[i].getAttribute("cd") == cd && target[i].getAttribute("cat_seq") == cat_seq || tp_cd == null)
			isOverlap = false;
	}
	
	if(isOverlap)
	{
		$.ajax({
			type : "post",
			async : true,
			dataType: "json",
			url : getContextPath() + "/ajax/counsel/getDeptName.do",
			data : "pJson=" + getJsonStrGetDeptNm(tp_cd, cd, cat_seq),
			success : function(data)
			{
				var value = "";
				
				value += "<div><label class='txtSelectVal' cat_seq = '" + cat_seq + "' tp_cd = '" + tp_cd + "' cd = '" + cd + "' cd_nm = '"+ data.CD_NM +"'>"+data.DEPT_NM+"</label> <label class = 'dummyCatList' style = 'cursor : pointer'>X</label></div>";
				
				$("#divKorCatList").append(value);
				
				$(".dummyCatList").bind("click", event, function() {
					event.target.parentElement.id = "deleteTarget";
					$("#deleteTarget").remove();
				});
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err, "categorySearch.js : 1729");
			}
		});
	}
	else
		alert("이미 선택된 분류입니다.");
}

// 제품 뷰 테이블 선택 버튼 클릭 함수
function btnProdSelect_clickEvent(tp_cd, cd, cat_seq)
{
	var length = $("#divCountryProdList")[0].childNodes.length;
	
	if(g_selectType == "categorySelect")
	{
		alert("인증만 선택 가능 합니다.");
		return;
	}
	if( g_selectType == "productSelect" && length > 0 )
	{
		alert("조회조건은 1개만 선택 가능 합니다.");
		return;
	}
	if(length >= 5)
	{
		alert("최대 5개까지 설정할 수 있습니다.");
		return;
	}
	var isOverlap = true;
	var target = $(".txtProdSelectVal");
	for(var i = 0 ; i < $("#divCountryProdList")[0].childNodes.length; i++)
	{
		if(target[i].getAttribute("tp_cd") == tp_cd && target[i].getAttribute("cd") == cd && target[i].getAttribute("cat_seq") == cat_seq || g_prod_tp_cd == null)
			isOverlap = false;
	}
	
	if(isOverlap)
	{
		$.ajax({
			type : "post",
			async : true,
			dataType: "json",
			url : getContextPath() + "/ajax/counsel/getDeptName.do",
			data : "pJson=" + getJsonStrGetDeptNm(tp_cd, cd, cat_seq),
			success : function(data)
			{
				var value = "";
				
				value += "<div><label class='txtProdSelectVal' cat_seq = '" + cat_seq + "' tp_cd = '" + tp_cd + "' cd = '" + cd + "' cd_nm = '"+ data.CD_NM +"'>"+ data.DEPT_NM + "</label> <label class = 'dummyProdList' style = 'cursor : pointer'>X</label></div>";
				
				$("#divCountryProdList").append(value);
				
				$(".dummyProdList").bind("click", event, function() {
					event.target.parentElement.id = "deleteTarget";
					$("#deleteTarget").remove();
				});
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err, "categorySearch.js : 1788");
			}
		});
		
	}
	else
		alert("이미 선택된 분류입니다.");
}

// 색인어 추가 버튼 클릭 함수
function btnIndxAdd_clickEvent()
{
	var indx = $("#tfIndxVal").val().trim();
	
	if(indx == "")
		alert("색인어를 입력해주세요.");
	else if($("#txtCatModIndx")[0].childNodes.length >= 5)
		alert("최대 5개까지 설정할 수 있습니다.");
	else if(indxState == "update")
	{
		var leng = $(".indx").length;
		
		for(var i = 0 ; i < leng ; i++)
		{
			if($(".indx")[i].innerHTML == indx)
			{
				alert("이미 있는 색인어 입니다.");
				return;
			}
		}
		
		if(confirm("추가 하시겠습니까?"))
		{
			$.ajax({
				type : "post",
				async : true,
				dataType: "json",
				url : getContextPath() + "/ajax/counsel/catDel.do",
				data : "pJson=" + getJsonStrCatIndxIns(g_cat_tp_cd, g_cat_cd, indx, g_cat_seq),
				success : function(data)
				{
					if(data != null)
					{
						alert("추가되었습니다.");
						
						var viewData = {};
						viewData.divId = "divCatModIndx";
						viewData.labId = "delCatModIndx";
						viewData.parntId = "txtCatModIndx";
						viewData.lblClassNm = "indx";
						
						indxView(g_cat_tp_cd, g_cat_cd, viewData, g_cat_seq);
					}
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err, "categorySearch.js : 1844");
				}
			});
		}
	}
	else if(indxState=="insert")
	{
		var leng = $(".dummyIndx").length;
		
		for(var i = 0 ; i < leng ; i++)
		{
			if($(".dummyIndx")[i].innerHTML == indx)
			{
				alert("이미 있는 색인어 입니다.");
				return;
			}
		}
		
		var value = "";
		value = "<div class = 'dummy'><label class = 'dummyIndx'>"+indx+"</label> <label class='dummyLab' style = 'pointer:cursor;'>X</labe></div>";
		
		$("#txtCatModIndx").append(value);
		
		$(".dummyLab").bind("click", event, function() {
			event.target.parentElement.innerHTML = "";
		});
	}
	
	$("#tfIndxVal").val("");
	$("#tfIndxVal").focus();
}

// 제품 색인어 추가 버튼 클릭 함수
function btnProdIndxAdd_clickEvent()
{
	var indx = $("#tfProdIndxVal").val().trim();
	
	if(indx == "")
		alert("색인어를 입력해주세요.");
	else if($("#txtProdModIndx")[0].childNodes.length >= 5)
		alert("최대 5개까지 설정할 수 있습니다.");
	else if(indxState == "update")
	{
		var leng = $(".indxProd").length;
		
		for(var i = 0 ; i < leng ; i++)
		{
			if($(".indxProd")[i].innerHTML == indx)
			{
				alert("이미 있는 색인어 입니다.");
				return;
			}
		}
		
		if(confirm("추가 하시겠습니까?"))
		{
			$.ajax({
				type : "post",
				async : true,
				dataType: "json",
				url : getContextPath() + "/ajax/counsel/catDel.do",
				data : "pJson=" + getJsonStrCatIndxIns(g_prod_tp_cd, g_prod_cd, indx, g_prod_seq),
				success : function(data)
				{
					if(data != null)
					{
						alert("추가되었습니다.");
						
						var viewData = {};
						viewData.divId = "divProdModIndx";
						viewData.labId = "delProdModIndx";
						viewData.parntId = "txtProdModIndx";
						viewData.lblClassNm = "indxProd";
						
						indxView(g_prod_tp_cd, g_prod_cd, viewData, g_prod_seq);
					}
				},
				error : function(data, status, err) 
				{
					networkErrorHandler(data, status, err, "categorySearch.js : 1923");
				}
			});
		}
	}
	else if(indxState=="insert")
	{
		var leng = $(".dummyProdIndx").length;
		
		for(var i = 0 ; i < leng ; i++)
		{
			if($(".dummyProdIndx")[i].innerHTML == indx)
			{
				alert("이미 있는 색인어 입니다.");
				return;
			}
		}
		
		var value = "";
		value = "<div class = 'dummyProd'><label class = 'dummyProdIndx'>"+indx+"</label> <label class='dummyProdLab' style = 'pointer:cursor;'>X</labe></div>";
		
		$("#txtProdModIndx").append(value);
		
		$(".dummyProdLab").bind("click", event, function() {
			event.target.parentElement.innerHTML = "";
		});
	}
	
	$("#tfProdIndxVal").val("");
	$("#tfProdIndxVal").focus();
}

//업로드 파일 체크
function validatorRe(frmName, objName)
{
	var rMsg = "";

	//파일 업로드 용량 체크
	var nLimitSize = 10; //제한사이즈 MB
	var formName = $("#" + frmName + "input[name=" + objName + "]");
	for(var i=0; i<formName.length; i++){
		if(formName[i].value !=""){
			var nRtn=fileCheck(formName[i] , nLimitSize);
			if(nRtn>nLimitSize){ 
				rMsg += "\n\n("+nRtn+"MB) 첨부파일 사이즈는 "+nLimitSize+"MB 이내로 등록 가능합니다.";
			}
			
			//파일 확장자 체크
			if (fileExtnsCheck(formName[i]) == false)
				rMsg += "\n\n[" + (i+1) + "번 파일] : EXE/DLL/JSP/JS/ASP/PHP/HTML/HTM 파일은 업로드 하실 수 없습니다!";
		}
	}
	return rMsg;
}

// 분류 뷰 테이블 저장 버튼 클릭 함수
function btnCatSave_clickEvent()
{
	var rMsg = validatorRe("frm1", "CATEGORY");
	
	if(rMsg != ""){
		alert(rMsg);
		return;
	}
	
	if(confirm("저장 하시겠습니까?"))
	{
		var cat_seq = $("#txtCatModLv").html().trim();
		var changeCd = $("#optCatModCd").val();
		var cd_nm = $("#tfCatModKorNm").val().trim();
		var eng_cd_nm = $("#tfCatModEngNm").val().trim();
		var dsc = $("#tfCatModDsc").val().trim();
		var link = $("#tfCatModLink").val();
		var oh063_seq = "";
		var catFileInfos = $("#CatfileInfos a");
		
		$.ajax({
			type : "post",
			async : true,
			dataType: "json",
			url : getContextPath() + "/ajax/counsel/catMod.do",
			data : "pJson=" + getJsonStrGetSeq(),
			success : function(data)
			{
				oh063_seq = data.NEXTVAL;
				
				$.ajax({
					type : "post",
					async : true,
					dataType: "json",
					url : getContextPath() + "/ajax/counsel/catMod.do",
					data : "pJson=" + getJsonStrCatMod(g_cat_tp_cd, g_cat_cd, cat_seq, changeCd, cd_nm, eng_cd_nm, dsc, g_cat_parnt_tp_cd, g_cat_parnt_cd, "", link, oh063_seq),
					success : function(data)
					{
						if(data != null)
						{
							// 코드 값 변경 시 기존 색인어 삭제
							if(changeCd != g_cat_cd)
							{
								$.ajax({
									type : "post",
									async : true,
									dataType: "json",
									url : getContextPath() + "/ajax/counsel/catIndxDel.do",
									data : "pJson=" + getJsonStrCatIndxDel(g_cat_tp_cd, g_cat_cd, "", g_cat_seq),
									success : function(data)
									{
									},
									error : function(data, status, err) 
									{
										networkErrorHandler(data, status, err, "categorySearch.js : 2003");
									}
								});
							}
							// 첨부파일 이력 저장
							$.ajax({
								type : "post",
								async : true,
								dataType: "json",
								url : getContextPath() + "/ajax/counsel/catIndxDel.do",
								data : "pJson=" + getJsonStrAddTbl_pk4(g_cat_tp_cd, g_cat_cd, g_cat_seq, oh063_seq),
								success : function(data)
								{
									// 현재 첨부파일 저장
									for(var i = 0; i < catFileInfos.length; i++)
									{
										$.ajax({
											type : "post",
											async : true,
											dataType: "json",
											url : getContextPath() + "/ajax/counsel/catIndxDel.do",
											data : "pJson=" + getJsonStrInsertFile(catFileInfos[i].getAttribute("fl_id")),
											success : function(data)
											{
											},
											error : function(data, status, err) 
											{
												networkErrorHandler(data, status, err, "categorySearch.js : 2030");
											}
										});
									}
								},
								error : function(data, status, err) 
								{
									networkErrorHandler(data, status, err, "categorySearch.js : 2037");
								}
							});
							
							// 첨부파일 저장
							gAppendHidden("frm1", "pJson", getJsonStrInsertCatFile(g_cat_tp_cd, g_cat_cd, cat_seq));
							gSubmitPost("frm1", true);
							
							g_cat_cd = "";
							g_cat_tp_cd = "";
							g_cat_seq = "";
							g_cat_parnt_tp_cd = "";
							g_cat_parnt_cd = "";
							
							if($("#tfCatSrchVal").val().trim() != "")
							{
								$("#divDummyCatList").css("display", "none");
								$("#divCatList").css("display", "block");
							}
							else
							{
								$("#divDummyCatList").css("display", "block");
								$("#divCatList").css("display", "none");
							}
							$("#divCatDetail").css("display", "none");
							
							alert("저장되었습니다.");
							
							categoryTree_refresh();
							
						}
					},
					error : function(data, status, err) 
					{
						networkErrorHandler(data, status, err, "categorySearch.js : 2071");
					}
				});
				
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err, "categorySearch.js : 2078");
			}
		});
	}
}

// 제품 뷰 테이블 저장 버튼 클릭 함수
function btnProdSave_clickEvent()
{
	var rMsg = validatorRe("frm2", "PRODUCT");
	
	if(rMsg != ""){
		alert(rMsg);
		return;
	}
	
	if(confirm("저장 하시겠습니까?"))
	{
		var cat_seq = $("#txtProdModLv").html().trim();
		var changeCd = $("#optProdModCd").val();
		var cd_nm = $("#tfProdModKorNm").val().trim();
		var eng_cd_nm = $("#tfProdModEngNm").val().trim();
		var dsc = $("#tfProdModDsc").val().trim();
		var hs_cd = $("#tfProdModHsCd").val().trim();
		var oh063_seq = "";
		var catFileInfos = $("#prodfileInfos a");
		
		$.ajax({
			type : "post",
			async : true,
			dataType: "json",
			url : getContextPath() + "/ajax/counsel/catMod.do",
			data : "pJson=" + getJsonStrGetSeq(),
			success : function(data)
			{
				oh063_seq = data.NEXTVAL;
		
				$.ajax({
					type : "post",
					async : true,
					dataType: "json",
					url : getContextPath() + "/ajax/counsel/catMod.do",
					data : "pJson=" + getJsonStrCatMod(g_prod_tp_cd, g_prod_cd, cat_seq, changeCd, cd_nm, eng_cd_nm, dsc, g_prod_parnt_tp_cd, g_prod_parnt_cd, hs_cd, "", oh063_seq),
					success : function(data)
					{
						if(data != null)
						{
							if(changeCd != g_prod_cd)
							{
								$.ajax({
									type : "post",
									async : true,
									dataType: "json",
									url : getContextPath() + "/ajax/counsel/catIndxDel.do",
									data : "pJson=" + getJsonStrCatIndxDel(g_prod_tp_cd, g_prod_cd, "", g_prod_seq),
									success : function(data)
									{
									},
									error : function(data, status, err) 
									{
										networkErrorHandler(data, status, err, "categorySearch.js : 2131");
									}
								});
							}
							
							// 첨부파일 이력 저장
							$.ajax({
								type : "post",
								async : true,
								dataType: "json",
								url : getContextPath() + "/ajax/counsel/catIndxDel.do",
								data : "pJson=" + getJsonStrAddTbl_pk4(g_prod_tp_cd, g_prod_cd, g_prod_seq, oh063_seq),
								success : function(data)
								{
									// 현재 첨부파일 저장
									for(var i = 0; i < catFileInfos.length; i++)
									{
										$.ajax({
											type : "post",
											async : true,
											dataType: "json",
											url : getContextPath() + "/ajax/counsel/catIndxDel.do",
											data : "pJson=" + getJsonStrInsertFile(catFileInfos[i].getAttribute("fl_id")),
											success : function(data)
											{
											},
											error : function(data, status, err) 
											{
												networkErrorHandler(data, status, err, "categorySearch.js : 2159");
											}
										});
									}
								},
								error : function(data, status, err) 
								{
									networkErrorHandler(data, status, err, "categorySearch.js : 2166");
								}
							});
							
							// 첨부파일 저장
							gAppendHidden("frm2", "pJson", getJsonStrInsertCatFile(g_prod_tp_cd, g_prod_cd, g_prod_seq));
							gSubmitPost("frm2", true);
							
							g_prod_cd = "";
							g_prod_tp_cd = "";
							g_prod_seq = "";
							g_prod_parnt_tp_cd = "";
							g_prod_parnt_cd = "";
							
							if($("#tfProdSrchVal").val().trim() != "")
							{
								$("#divDummyProdList").css("display", "none");
								$("#divProdList").css("display", "block");
							}
							else
							{
								$("#divDummyProdList").css("display", "block");
								$("#divProdList").css("display", "none");
							}
							$("#divProdDetail").css("display", "none");
							
							alert("저장되었습니다.");
							
							productTree_refresh();
						}
					},
					error : function(data, status, err) 
					{
						networkErrorHandler(data, status, err, "categorySearch.js : 2199");
					}
				});
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err, "categorySearch.js : 2205");
			}
		});
	}
}

// 분류 뷰 테이블 추가 버튼 클릭 함수
function btnCatAdd_clickEvent()
{
	var rMsg = validatorRe("frm1", "CATEGORY");
	
	if(rMsg != ""){
		alert(rMsg);
		return;
	}
	
	if(confirm("추가 하시겠습니까?"))
	{
		var tp_cd = G_CAT_TP_CD;
		var cd = $("#optCatModCd").val().trim();
		var cat_seq="";
		if(g_cat_seq != null)
			cat_seq = $("#txtCatModLv").html();
		else
			cat_seq = $("#tfCatModLv").val().trim();
		var cd_nm = $("#tfCatModKorNm").val().trim();
		var eng_cd_nm = $("#tfCatModEngNm").val().trim();
		var dsc = $("#tfCatModDsc").val().trim();
		var indxLeng = $(".dummyIndx").length;
		var indx = $(".dummyIndx");
		var link = $("#tfCatModLink").val().trim();
		
		$.ajax({
			type : "post",
			async : true,
			dataType: "json",
			url : getContextPath() + "/ajax/counsel/catMod.do",
			data : "pJson=" + getJsonStrCatIns(tp_cd, cd, cat_seq, cd_nm, g_cat_tp_cd, g_cat_cd, eng_cd_nm, dsc,"", link),
			success : function(data)
			{
				if(data != null)
				{
					
					// 첨부파일 저장
					gAppendHidden("frm1", "pJson", getJsonStrInsertCatFile(tp_cd, cd, cat_seq));
					gSubmitPost("frm1", true);
					
					g_cat_cd = "";
					g_cat_tp_cd = "";
					g_cat_seq = "";
					g_cat_parnt_tp_cd = "";
					g_cat_parnt_cd = "";
					
					if($("#tfCatSrchVal").val().trim() != "")
					{
						$("#divDummyCatList").css("display", "none");
						$("#divCatList").css("display", "block");
					}
					else
					{
						$("#divDummyCatList").css("display", "block");
						$("#divCatList").css("display", "none");
					}
					$("#divCatDetail").css("display", "none");
					
					for(var i = 0; i < indxLeng; i++)
					{
						$.ajax({
							type : "post",
							async : true,
							dataType: "json",
							url : getContextPath() + "/ajax/counsel/catDel.do",
							data : "pJson=" + getJsonStrCatIndxIns(tp_cd, cd, indx[i].innerHTML, cat_seq),
							success : function(data)
							{
							},
							error : function(data, status, err) 
							{
								networkErrorHandler(data, status, err, "categorySearch.js : 2276");
							}
						});
					}
					
					alert("추가되었습니다.");
					categoryTree_refresh();
				}
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err, "categorySearch.js : 2287");
			}
		});
	}
}

// 제품 뷰 테이블 추가 버튼 클릭 함수
function btnProdAdd_clickEvent()
{
	var rMsg = validatorRe("frm2", "PRODUCT");
	
	if(rMsg != ""){
		alert(rMsg);
		return;
	}
	
	if(confirm("추가 하시겠습니까?"))
	{
		var tp_cd = G_PROD_TP_CD;
		var cd = $("#optProdModCd").val().trim();
		var cat_seq="";
		if(g_prod_seq != null)
			cat_seq = $("#txtProdModLv").html();
		else
			cat_seq = $("#tfProdModLv").val().trim();
		var cd_nm = $("#tfProdModKorNm").val().trim();
		var eng_cd_nm = $("#tfProdModEngNm").val().trim();
		var dsc = $("#tfProdModDsc").val().trim();
		var indxLeng = $(".dummyProdIndx").length;
		var indx = $(".dummyProdIndx");
		var hs_cd = $("#tfProdModHsCd").val();
		
		$.ajax({
			type : "post",
			async : true,
			dataType: "json",
			url : getContextPath() + "/ajax/counsel/catMod.do",
			data : "pJson=" + getJsonStrCatIns(tp_cd, cd, cat_seq, cd_nm, g_prod_tp_cd, g_prod_cd, eng_cd_nm, dsc, hs_cd),
			success : function(data)
			{
				if(data != null)
				{
					// 제품 첨부파일 저장
					gAppendHidden("frm2", "pJson", getJsonStrInsertCatFile(tp_cd, cd, cat_seq));
					gSubmitPost("frm2", true);
					
					g_prod_cd = "";
					g_prod_tp_cd = "";
					g_prod_seq = "";
					g_prod_parnt_tp_cd = "";
					g_prod_parnt_cd = "";
					
					if($("#tfProdSrchVal").val().trim() != "")
					{
						$("#divDummyProdList").css("display", "none");
						$("#divProdList").css("display", "block");
					}
					else
					{
						$("#divDummyProdList").css("display", "block");
						$("#divProdList").css("display", "none");
					}
					$("#divProdDetail").css("display", "none");
					
					for(var i = 0; i < indxLeng; i++)
					{
						$.ajax({
							type : "post",
							async : true,
							dataType: "json",
							url : getContextPath() + "/ajax/counsel/catDel.do",
							data : "pJson=" + getJsonStrCatIndxIns(tp_cd, cd, indx[i].innerHTML, cat_seq),
							success : function(data)
							{
							},
							error : function(data, status, err) 
							{
								networkErrorHandler(data, status, err, "categorySearch.js : 2357");
							}
						});
					}
					
					alert("추가되었습니다.");
					productTree_refresh();
				}
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err, "categorySearch.js : 2368");
			}
		});
	}
}

// 인증 첨부파일 입력부분 추가 함수
function btnCatFileAdd()
{
	var fileLength = $("#CatfileInfos tr").length;
	var value = "";
	if(fileLength > 4)
	{
		alert("5개까지 등록 할 수 있습니다.");
	}
	else
	{
		value += "<tr>";
		value += "<td><input type = 'file' id = 'CATEGORY' name = 'CATEGORY' style = 'width : 300px;' /></td>";
		value += "<td><img src='/resources/images/btn_cancel.png' class = 'btnCatRmFileBox' style = 'cursor: pointer; margin-top: 4px; margin-left: 4px;' alt = '취소' /></td>";
		value += "</tr>";
		
		$("#catFileBase").after(value);
		
		// 파일 취소 버튼 클릭 이벤트 등록
		$(".btnCatRmFileBox").bind("click", event, function()
		{
			event.target.parentElement.id = "deleteTarget";
			$("#deleteTarget").parent().remove();
		});
	}
}

//제품 첨부파일 입력부분 추가 함수
function btnProdFileAdd()
{
	var fileLength = $("#prodfileInfos tr").length;
	var value = "";
	if(fileLength > 4)
	{
		alert("5개까지 등록 할 수 있습니다.");
	}
	else
	{
		value += "<tr>";
		value += "<td><input type = 'file' id = 'PRODUCT' name = 'PRODUCT' style = 'width : 300px;' /></td>";
		value += "<td><img src='/resources/images/btn_cancel.png' class = 'btnProdRmFileBox' style = 'cursor: pointer; margin-top: 4px; margin-left: 4px;' alt = '취소' /></td>";
		value += "</tr>";
		
		$("#prodFileBase").after(value);
		
		// 파일 취소 버튼 클릭 이벤트 등록
		$(".btnProdRmFileBox").bind("click", event, function()
		{
			event.target.parentElement.id = "deleteTarget";
			$("#deleteTarget").parent().remove();
		});
	}
}

//분류 목록 버튼 클릭 이벤트
function btnCatBack_clickEvent()
{
	$("#divCatDetail").hide();
	$("#divCatList").show();
}

//제품 목록 버튼 클릭 이벤트
function btnProdBack_clickEvent()
{
	$("#divProdDetail").hide();
	$("#divProdList").show();
	
	var resizeWidth = $('#divProdList').width();
	$('#tblProduct').setGridWidth(resizeWidth - 5, true);
}

// 분류 수정이력 버튼 클릭 이벤트
function btnCatList_clickEvent(event)
{
	var width = 650;
	var height = 830;
	var top = window.screenTop + (screen.height - height) / 2;
	var left = window.screenLeft + (screen.width - width) / 2;
	
	var paramURL = getContextPath() + "/web/counsel/categoryRecord.do";
	var option = "width=" + width + ", height=" + height 
		+ ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no, top=" 
		+ top + ",left=" + left +"";
	var s_tp_cd = "";
	var s_cd = "";
	var s_cat_seq = "";
	
	if(event.data == "prod")
	{
		s_tp_cd = g_prod_tp_cd;
		s_cd = g_prod_cd;
		s_cat_seq = g_prod_seq;
		
	}
	else if(event.data =="cat")
	{
		s_tp_cd = g_cat_tp_cd;
		s_cd = g_cat_cd;
		s_cat_seq = g_cat_seq;
	}
	
	sessionStorage.setItem("category_cat_seq", s_cat_seq);
	sessionStorage.setItem("category_tp_cd", s_tp_cd);
	sessionStorage.setItem("category_cd", s_cd);
	if( newWindow != null )
		newWindow.selfClose();
	newWindow = window.open(paramURL, "수정이력", option);
	newWindow.focus();
	
}

// 취소 버튼 클릭 이벤트
function btnCancel_clickEvent()
{
	self.close();
}

// 완료 버튼 클릭 이벤트
function btnCatConfirm_clickEvent()
{
	var categoryData=[];
	var productData=[];
	
	for(var i =0 ; i < $(".txtSelectVal").length ; i++)
	{
		var cat_seq = $(".txtSelectVal")[i].getAttribute("cat_seq");
		var tp_cd = $(".txtSelectVal")[i].getAttribute("tp_cd");
		var cd = $(".txtSelectVal")[i].getAttribute("cd");
		var value = $(".txtSelectVal")[i].textContent;
//		var value = $(".txtSelectVal")[i].getAttribute("cd_nm");
		categoryData.push({"cat_seq" : cat_seq, "tp_cd" : tp_cd, "cd" : cd, "value" : value});
	}
	for(var i =0 ; i < $(".txtProdSelectVal").length ; i++)
	{
		var cat_seq = $(".txtProdSelectVal")[i].getAttribute("cat_seq");
		var tp_cd = $(".txtProdSelectVal")[i].getAttribute("tp_cd");
		var cd = $(".txtProdSelectVal")[i].getAttribute("cd");
		var value = $(".txtProdSelectVal")[i].textContent;
//		var value = $(".txtProdSelectVal")[i].textContent("cd_nm");
		
		productData.push({"cat_seq" : cat_seq, "tp_cd" : tp_cd, "cd" : cd, "value" : value});
	}
	
	var returnValue = 
	{ 
			"category" : categoryData,
			"product" : productData
	}; 
	
	window.returnValue = returnValue;
	window.close();
}

// 분류 그리드 로우 선택 함수
function tblCategoryList_SelectRow(rowid)
{
	var currentRow = $("#tblCategory").jqGrid('getRowData', rowid);
	
	g_cat_tp_cd = currentRow.TP_CD;
	g_cat_cd = currentRow.CD;
	g_cat_seq = currentRow.CAT_SEQ;
	
	catTable_init(currentRow.TP_CD, currentRow.CD, currentRow.CAT_SEQ);
}

// 제품 그리드 로우 선택 함수
function tblProductList_SelectRow(rowid)
{
	var currentRow = $("#tblProduct").jqGrid('getRowData', rowid);
	
	g_prod_tp_cd = currentRow.TP_CD;
	g_prod_cd = currentRow.CD;
	g_prod_seq = currentRow.CAT_SEQ;
	
	prodTable_init(currentRow.TP_CD, currentRow.CD, currentRow.CAT_SEQ);
}

// 분류 초기 컨트롤 셋팅
function initCatControl()
{
	$("#divDummyCatList").hide();
	$("#divCatList").show();
	$("#divCatDetail").hide();
	$("#btnCatMod").hide();
	$("#btnCatSave").hide();
	$("#btnCatAdd").hide();
	$("#btnCatDel").hide();
	$("#btnCatSelect").hide();
	$("#btnCatInsert").hide();
	$("#tblCatMod").hide();
	$("#btnCatList").hide();
	
	if(usrGrdCd == "090100" || usrGrdCd == "060100" || usrGrdCd == "050100" || usrGrdCd == "030100")
		$("#btnCatInsert").show();

}

// 제품 초기 컨트롤 셋팅
function initProdControl()
{
	$("#divDummyProdList").hide();
	$("#divProdList").show();
	$("#divProdDetail").hide();
	$("#btnProdMod").hide();
	$("#btnProdSave").hide();
	$("#btnProdAdd").hide();
	$("#btnProdDel").hide();
	$("#btnProdSelect").hide();
	$("#btnProdInsert").hide();
	$("#tblProdMod").hide();
	$("#btnProdList").hide();
	
	if(usrGrdCd == "090100" || usrGrdCd == "060100" || usrGrdCd == "050100" || usrGrdCd == "030100")
		$("#btnProdInsert").show();
}

// 분류 초기 이벤트 셋팅
function initCatEvent()
{
	
	// tree node select event
	$("#divCatTree").bind("select_node.jstree", function(event, data)
	{
		if(data.node.original.id != "ktr")
		{
			data.instance.toggle_node(data.node);
			g_cat_tp_cd = data.node.original.TP_CD;
			g_cat_cd = data.node.original.CD;
			g_cat_seq = data.node.original.CAT_SEQ;
			g_cat_parnt_tp_cd = data.node.original.PARNT_TP_CD;
			g_cat_parnt_cd = data.node.original.PARNT_CD;
			
			catTable_init(g_cat_tp_cd, g_cat_cd, g_cat_seq);
			
		}
		else
		{
			g_cat_tp_cd = null;
			g_cat_cd = null;
			g_cat_seq = null;
			g_cat_parnt_tp_cd = null;
			g_cat_parnt_cd = null;
		}
	});
	
	// 분류 초기화 버튼 클릭 이벤트 등록
	$("#btnCatInit").bind("click", btnCatInit_clickEvent);
	// 분류 조회 버튼 클릭 이벤트 등록
	$("#btnCatSearch").bind("click", btnCatSearch_clickEvent);
	// 분류 검색어 텍스트인풋 엔터 키 이벤트 등록
	$("#tfCatSrchVal").bind("keydown", function (key) {
		if (key.keyCode == 13)
			btnCatSearch_clickEvent();
	});
	// 분류 하위분류추가 버튼 클릭 이벤트
	$("#btnCatInsert").bind("click", btnCatInsert_clickEvent);
	// 분류 뷰 테이블 수정 버튼 클릭 이벤트
	$("#btnCatMod").bind("click", btnCatMod_clickEvent);
	// 분류 뷰 테이블 삭제 버튼 클릭 이벤트
	$("#btnCatDel").bind("click", btnCatDel_clickEvent);
	// 분류 뷰 테이블 선택 버튼 클릭 이벤트
	$("#btnCatSelect").bind("click", function() {
		btnCatSelect_clickEvent(g_cat_tp_cd, g_cat_cd, g_cat_seq);
	});
	// 분류 뷰 테이블 저장 버튼 클릭 이벤트
	$("#btnCatSave").bind("click", btnCatSave_clickEvent);
	// 분류 뷰 테이블 추가 버튼 클릭 이벤트
	$("#btnCatAdd").bind("click", btnCatAdd_clickEvent);
	// 분류 색인어 추가 버튼 클릭 이벤트
	$("#btnIndxAdd").bind("click", btnIndxAdd_clickEvent);
	// 분류 색인어 텍스트인풋 엔터 키 이벤트 등록
	$("#tfIndxVal").bind("keydown", function (key) {
		if (key.keyCode == 13)
			btnIndxAdd_clickEvent();
	});
	// 분류 색인어 텍스트인풋 엔터 키 이벤트 등록
	$("#tfCatModLv").bind("focusout", catAddCdSelectBox);
	// 분류이력 버튼 클릭 이벤트 등록
	$("#btnCatList").bind("click", "cat",btnCatList_clickEvent);
	// 분류 목록 버튼 클릭 이벤트 등록
	$("#btnCatBack").bind("click", btnCatBack_clickEvent);
}

// 제품 초기 이벤트 셋팅
function initProdEvent()
{
	// tree node select event
	$("#divProdTree").bind("select_node.jstree", function(event, data)
	{
		if(data.node.original.id != "ktr")
		{
			data.instance.toggle_node(data.node);
			
			g_prod_tp_cd = data.node.original.TP_CD;
			g_prod_cd = data.node.original.CD;
			g_prod_seq = data.node.original.CAT_SEQ;
			g_prod_parnt_tp_cd = data.node.original.PARNT_TP_CD;
			g_prod_parnt_cd = data.node.original.PARNT_CD;
			
			prodTable_init(g_prod_tp_cd, g_prod_cd, g_prod_seq);
			
		}
		else
		{
			g_prod_tp_cd = null;
			g_prod_cd = null;
			g_prod_seq = null;
			g_prod_parnt_tp_cd = null;
			g_prod_parnt_cd = null;
		}
	});
	
	// 분류 초기화 버튼 클릭 이벤트 등록
	$("#btnProdInit").bind("click", btnProdInit_clickEvent);
	// 분류 조회 버튼 클릭 이벤트 등록
	$("#btnProdSearch").bind("click", btnProdSearch_clickEvent);
	// 분류 검색어 텍스트인풋 엔터 키 이벤트 등록
	$("#tfProdSrchVal").bind("keydown", function (key) {
		if (key.keyCode == 13)
			btnProdSearch_clickEvent();
	});
	// 분류 하위분류추가 버튼 클릭 이벤트
	$("#btnProdInsert").bind("click", btnProdInsert_clickEvent);
	// 분류 뷰 테이블 수정 버튼 클릭 이벤트
	$("#btnProdMod").bind("click", btnProdMod_clickEvent);
	// 분류 뷰 테이블 삭제 버튼 클릭 이벤트
	$("#btnProdDel").bind("click", btnProdDel_clickEvent);
	// 분류 뷰 테이블 선택 버튼 클릭 이벤트
	$("#btnProdSelect").bind("click", function() {
		btnProdSelect_clickEvent(g_prod_tp_cd, g_prod_cd, g_prod_seq);
	});
	// 분류 뷰 테이블 저장 버튼 클릭 이벤트
	$("#btnProdSave").bind("click", btnProdSave_clickEvent);
	// 분류 뷰 테이블 추가 버튼 클릭 이벤트
	$("#btnProdAdd").bind("click", btnProdAdd_clickEvent);
	// 분류 색인어 추가 버튼 클릭 이벤트
	$("#btnProdIndxAdd").bind("click", btnProdIndxAdd_clickEvent);
	// 분류 색인어 텍스트인풋 엔터 키 이벤트 등록
	$("#tfProdIndxVal").bind("keydown", function (key) {
		if (key.keyCode == 13)
			btnProdIndxAdd_clickEvent();
	});
	// 분류 색인어 텍스트인풋 엔터 키 이벤트 등록
	$("#tfProdModLv").bind("focusout", prodAddCdSelectBox);
	// 분류이력 버튼 클릭 이벤트 등록
	$("#btnProdList").bind("click", "prod",btnCatList_clickEvent);
	// 분류 목록 버튼 클릭 이벤트 등록
	$("#btnProdBack").bind("click", btnProdBack_clickEvent);
}

// 분류 초기 데이터 셋팅
function initCatData()
{
	var seqList = {};
	
	seqList.tp_cd = G_CAT_TP_CD;
	seqList.select_box = "optCatLv";
	seqList.div = "divCatTree";
	seqList_init(seqList);
	
	var category = {};
	category.tbl_name = "tblCategory";
	category.pg_name = "pgCategory";
	category.selectEvent = "tblCategoryList_SelectRow";
	tbl_init_grid(category);
	
	var dummy = {};
	dummy.tbl_name = "tblDummyCategory";
	dummy.pg_name = "pgDummyCategory";
	tblDummy_init_grid(dummy);
}

// 제품 초기 데이터 셋팅
function initProdData()
{
	var seqList = {};
	
	seqList.tp_cd = G_PROD_TP_CD;
	seqList.select_box = "optProdLv";
	seqList.div = "divProdTree";
	seqList_init(seqList);
	
	var category = {};
	category.tbl_name = "tblProduct";
	category.pg_name = "pgProduct";
	category.selectEvent = "tblProductList_SelectRow";
	tbl_init_grid(category);
	
	var dummy = {};
	dummy.tbl_name = "tblDummyProduct";
	dummy.pg_name = "pgDummyProduct";
	tblDummy_init_grid(dummy);
}

//init Page
$(document).ready(function()
{	
	initCatData();
	initCatControl();
	initCatEvent();
	
	initProdData();
	initProdControl();
	initProdEvent();
	
	// 탭 이벤트 등록
	$("#divCatTab").bind("click", event, divCatTab_clickEvent);
	// 취소 버튼 클릭 이벤트 등록
	$("#btnCatCancel").bind("click", btnCancel_clickEvent);
	// 완료 버튼 클릭 이벤트 등록
	$("#btnCatConfirm").bind("click", btnCatConfirm_clickEvent);
	
	if(window.dialogArguments != undefined)
	{
		g_selectType = window.dialogArguments.selectType;
		g_catInfo = window.dialogArguments.catInfo; 
		g_prodInfo = window.dialogArguments.prodInfo; 
		
		for(var i = 0 ; i < g_catInfo.length; i++)
		{
			if( g_catInfo[i].cat_seq != null && g_catInfo[i].cat_seq != "")
			{
				var cat_seq = g_catInfo[i].cat_seq;
				var tp_cd = g_catInfo[i].tp_cd;
				var cd = g_catInfo[i].cd;
				btnCatSelect_clickEvent(tp_cd, cd, cat_seq);
			}
		}
		
		for(var i = 0 ; i < g_prodInfo.length; i++)
		{
			if( g_prodInfo[i].cat_seq != null && g_prodInfo[i].cat_seq != "")
			{
				var cat_seq = g_prodInfo[i].cat_seq;
				var tp_cd = g_prodInfo[i].tp_cd;
				var cd = g_prodInfo[i].cd;
				btnProdSelect_clickEvent(tp_cd, cd, cat_seq);
			}
		}
	}
	
	// 모달이 아닐 경우
	if(g_selectType == "")
		$("#catFooter").hide();
	else if(g_selectType == "category" || g_selectType == "categorySelect")
	{
		$("#divCatSrchTab").attr("class","left_tab_img");
		$("#divProdTab").attr("class","left_tab_img_gray");
		
		$(".divCatSrchTabBody").css("display","block");
		$(".divProdTabBody").css("display","none");
		
		btnCatInit_clickEvent("tab");
		
		resizeWidth = $('#divDummyCatList').width();
		$('#tblDummyCategory').setGridWidth(resizeWidth - 5, true);
	}
	else if(g_selectType == "product" || g_selectType == "productSelect")
	{
		$("#divCatSrchTab").attr("class","left_tab_img_gray");
		$("#divProdTab").attr("class","left_tab_img");
		
		$(".divCatSrchTabBody").css("display","none");
		$(".divProdTabBody").css("display","block");
		
		btnProdInit_clickEvent("tab");
		
		var resizeWidth = $('#divDummyProdList').width();
		$('#tblDummyProduct').setGridWidth(resizeWidth - 5, true);
	}
	
});