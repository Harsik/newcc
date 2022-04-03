// 조회 조건 및 조회 값
var g_Tr_lv = "";		//tree lvl
var g_Tr_Id = "";		//tree id
var g_Tr_prnt_Id = "";	//tree parnt id
var g_Grd_lv = "";		//select grid lvl
var g_save_type = "";

//파라미터 셋팅 답변조회 getJsonStrSelectAnsCdList
function getJsonStrSelectAnsCdList(tp_cd, cd)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNDQuc2VsZWN0QW5zQ2Q=",
		"map" : {
			"key" : "value",
			"tp_cd" : tp_cd,
			"cd" : cd!=null?cd:"all"	
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//파라미터 셋팅 설문지트리조회 getJsonStrEduSuvyTree
function getJsonStrEduSuvyTree()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNDQuc2VsZWN0RWR1U3V2eVRyZWU=",     
		"map" : {
			"key" : "value"
		}		
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//파라미터 셋팅 트리 선택 그리드 조회 getJsonStrSelectEduSuvyList
function getJsonStrSelectEduSuvyList(parnt_suvy_id)
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNDQuc2VsZWN0RWR1U3V2eVRyZ3RMaXN0",
		"map" : {
			"key" : "value",
			"parnt_suvy_id" : parnt_suvy_id,
		}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

/*
//설문지 next value
function getNextValue() {
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "b20wNDQubmV4dHZhbA==",
			"map" : {}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}
*/
//파라미터 셋팅 설문지 저장 getJsonStrInsertEduSuvyForm
function getJsonStrInsertEduSuvyForm()
{
	var loParam = {
		"qt" : "aW5zZXJ0",
		"mi" : "b20wNDQuaW5zZXJ0RWR1U3V2eUZvcm0=",	/*om044.insertEduSuvyForm*/
		"map" : {
			"key" : "value",
			"suvy_id" : $("#edsvfm_suvy_Id").val(),
			"suvy_nm" : $("#edsvfm_suvy_Nm").val(),
			"parnt_suvy_id" : $("#edsvfm_parnt_Cd").val(),			
			"suvy_ord" : $("#edsvfm_suvy_Ord").val(),
			"qst_type_cd" : $("#edsvfm_qst_Type_Cd").val() != "all" ? $("#edsvfm_qst_Type_Cd").val() : "",
			"ans_type_cd" : $("#edsvfm_ans_Type_Cd").val() != "all" ? $("#edsvfm_ans_Type_Cd").val() : "",
			"use_yn" : $(":input:radio[name=lbrUse_Yn]:checked").val(),
			"suvy_lvl" : g_save_type == "C" ? g_Tr_lv : g_Grd_lv,
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//답변항목 불러오기
function setSelectAsnCdList(tp_cd, cd)
{	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/edu/eduSelectAnsCdList.do",
		data : "pJson=" + getJsonStrSelectAnsCdList(tp_cd, cd),
		success : function(data)
		{
			for(var i in data)
			{
				if (data[i] != undefined || data[i] != null)
				{	
					var ansValue = "";
					
					//답변1
					if (data[i].EXT1_CD != undefined || data[i].EXT1_CD != null)
					{
						ansValue = data[i].EXT1_CD.split(":");
						$("#edsvfm_ans1").html(ansValue[0]);
						$("#edsvfm_scr1").html(ansValue[1]);
					}
					//답변1
					if (data[i].EXT2_CD != undefined || data[i].EXT2_CD != null)
					{
						ansValue = data[i].EXT2_CD.split(":");
						$("#edsvfm_ans2").html(ansValue[0]);
						$("#edsvfm_scr2").html(ansValue[1]);
					}
					//답변1
					if (data[i].EXT3_CD != undefined || data[i].EXT3_CD != null)
					{
						ansValue = data[i].EXT3_CD.split(":");
						$("#edsvfm_ans3").html(ansValue[0]);
						$("#edsvfm_scr3").html(ansValue[1]);
					}
					//답변1
					if (data[i].EXT4_CD != undefined || data[i].EXT4_CD != null)
					{
						ansValue = data[i].EXT4_CD.split(":");
						$("#edsvfm_ans4").html(ansValue[0]);
						$("#edsvfm_scr4").html(ansValue[1]);
					}
					//답변5
					if (data[i].EXT5_CD != undefined || data[i].EXT5_CD != null)
					{
						ansValue = data[i].EXT5_CD.split(":");
						$("#edsvfm_ans5").html(ansValue[0]);
						$("#edsvfm_scr5").html(ansValue[1]);
					}
					
				}
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

// 추가 버튼 클릭 이벤트 등록
function btnInsert_clickEvent()
{
	if($("#edsvfm_suvy_Nm").val() == "") {
		alert("항목명을 입력 해 주세요.");
		$("#edsvfm_suvy_Nm").focus;
		return;
	}
	
	if($("#edsvfm_parnt_Cd").val() == "") {
		alert("부모ID를 입력 해 주세요.");
		$("#edsvfm_parnt_Cd").focus;
		return;
	}
	
	if($("#edsvfm_suvy_Ord").val() == "") {
		alert("순서를 입력 해 주세요.");
		$("#edsvfm_suvy_Ord").focus;
		return;
	}
	
	g_save_type = "C";
	
	$.ajax({
		type : "post",
		aync : true,
		url : getContextPath() + "/ajax/edu/insertEduSuvyForm.do",
		data : "pJson=" + getJsonStrInsertEduSuvyForm(),
		success : function(data) 
		{
			if (data != 0 ) {
				alert("저장되었습니다.");
				
				fnEduSuvyTreeList();
				btnInit_clickEvent();

		   		$("#edsvfm_tblSuvyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectEduSuvyList(g_Tr_Id)}, page : 1, sortname : "SUVY_ORD", sortorder : "asc"});
		   		$("#edsvfm_tblSuvyList").trigger("reloadGrid");
			}
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});	
	
/*	
	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/edu/nextValEduSuvy.do",
		data : "pJson=" + getNextValue(),
		success : function(data) {
			
			$.ajax({
				type : "post",
				aync : true,
				url : getContextPath() + "/ajax/edu/insertEduSuvyForm.do",
				data : "pJson=" + getJsonStrInsertEduSuvyForm(data.KEY_ID),
				success : function(dataSet) 
				{
					if (dataSet != 0 ) {
						alert("저장되었습니다.");
					}
				},
				error : function(dataSet, status, err) {
					networkErrorHandler(dataSet, status, err);
				}
			});					   		
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
*/
}

// 저장 버튼 클릭 이벤트 등록
function btnUpdate_clickEvent()
{
	g_save_type = "U";
	
	btnInsert_clickEvent();
}

// 초기화 버튼 클릭 이벤트 등록
function btnInit_clickEvent()
{
	initFormData();
	$("#edsvfm_suvy_Nm").focus();
}

//eduSuvyTreeList
function fnEduSuvyTreeList()
{
	$.jstree.destroy ();
	$.ajax({
		type : "post",
		async : false,
		url : getContextPath() + "/ajax/edu/getEduSuvyTree.do",
		data : "pJson=" + getJsonStrEduSuvyTree(),
		success : function(data)
		{
			$("#edsvfm_eduSuvyTree").html("");
			
			if(jr != '')
			{
				// param값을 JSON으로 파싱
				var jr = JSON.parse(data);
				$("#edsvfm_eduSuvyTree").jstree({ "core": { "data": jr,"multiple" : false } }).bind("loaded.jstree", 
					function (event, data) { 			  
						 $("#edsvfm_eduSuvyTree").jstree("open_node", "#edsvfm_00000000"); 
						 $("#edsvfm_eduSuvyTree").jstree("select_node", "#edsvfm_00000000"); 
					}
				);
				
				$("#edsvfm_eduSuvyTree").bind("loaded.jstree", function(event, data){

				    var depth = 2; 

				    data.instance.get_container().find('li').each(function (i) {

				        if (data.instance.get_path($(this)).length <= depth) {
				            data.instance.open_node($(this));
				        }
				    });
				});
									 
				//initCodeSpec();
			}
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
	
 
	$("#edsvfm_eduSuvyTree").bind("select_node.jstree", function(event, data)
	{
		g_Tr_lv = data.node.original.lv;
		g_Tr_Id = data.node.original.id;
		g_Tr_prnt_Id = data.node.original.parent;
		
   		$("#edsvfm_tblSuvyList").jqGrid("setGridParam", {postData : {pJson : getJsonStrSelectEduSuvyList(g_Tr_Id)}, page : 1, sortname : "SUVY_ORD", sortorder : "asc"});
   		$("#edsvfm_tblSuvyList").trigger("reloadGrid");
   		
   		btnInit_clickEvent();
   		
   		//부모ID를 자동 입력해 줌
		$("#edsvfm_parnt_Cd").val(g_Tr_Id);
	});	

}

//답변 항목 초기화
function initAnswer()
{
	for (var i = 1; i <= 5; i++)
	{			
		$("#edsvfm_ans" + i).html("");
		$("#edsvfm_scr" + i).html("");			
	}		
}

//초기화면 컨트롤 설정
function initFormData()
{
	$("#edsvfm_suvy_Nm").val("");
	$("#edsvfm_parnt_Cd").val("");
	$("#edsvfm_suvy_Id").val("");
	$("#edsvfm_suvy_Ord").val("");
	$("#edsvfm_qst_Type_Cd").val("all");
	$("#edsvfm_qst_Type_Cd").change();
	
	$("#edsvfm_btnInsert").show();
	$("#edsvfm_btnUpdate").hide();
}
//초기화면 데이터 설정
function initData()
{	
	//질문유형
	setSelectBoxWithCode("edsvfm_qst_Type_Cd","미선택","90117", "CHILD", "", "all");	

	var selValueType = "";
		
	//질문유형 셀렉트 박스 변경 이벤트 등록
	$("#edsvfm_qst_Type_Cd").bind("change", function()
	{
		initAnswer();
		
		selValueType = $("#edsvfm_qst_Type_Cd").val();
		
		if (selValueType == "1001")
			//객관식일때 답변유형
			setSelectBoxWithCode("ans_Type_Cd","미선택","90118", "CHILD", "", "all");
		else
			//주관식일때 답변유형
			$('#edsvfm_ans_Type_Cd').empty().append('<option selected="selected" value="all">없음</option>');
			
	});
	
	//답변유형 셀렉트 박스 변경 이벤트 등록
	$("#edsvfm_ans_Type_Cd").bind("change", function()
	{
		initAnswer();
		
		selValueType = $("#edsvfm_ans_Type_Cd").val();
		
		if (selValueType != "all")
			setSelectAsnCdList("90118", selValueType);
								
	});
}

function initEvent()
{
	// 추가 버튼 클릭 이벤트 등록
	$("#edsvfm_btnInsert").bind("click", btnInsert_clickEvent);	
	// 저장 버튼 클릭 이벤트 등록
	$("#edsvfm_btnUpdate").bind("click", btnUpdate_clickEvent);
	// 초기화 버튼 클릭 이벤트 등록
	$("#edsvfm_btnReset").bind("click", btnInit_clickEvent);
}

// init Page
$(document).ready(function()
{
	initData();
	initFormData();
	initEvent();

	//설문, 평가지 문항 트리 조회
	fnEduSuvyTreeList();
	
	$("#edsvfm_tblSuvyList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/edu/courselist.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrSelectEduSuvyList("")
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["항목ID", "항목명", "순서", "사용", "PARNT_SUVY_ID", "질문유형", "답변유형", "USE_YN", "레벨"],
	   	colModel :
	   	[
			{ name : "SUVY_ID", index : "SUVY_ID", width : 60, align : "center" },
			{ name : "SUVY_NM", index : "SUVY_NM", width : 220, align : "left" },
			{ name : "SUVY_ORD", index : "SUVY_ORD", width : 60, align : "center" },
			{ name : "USE_NM", index : "USE_NM", width : 60, align : "center" },
			{ name : "PARNT_SUVY_ID", index : "PARNT_SUVY_ID", hidden : true },
			{ name : "QST_TYPE_CD", index : "QST_TYPE_CD", hidden : true },
			{ name : "ANS_TYPE_CD", index : "ANS_TYPE_CD", hidden : true },
			{ name : "USE_YN", index : "USE_YN", hidden : true },
			{ name : "SUVY_LVL", index : "SUVY_LVL", hidden : true },
	   	],
	   	sortname : "SUVY_ORD",
	   	sortorder : "desc",
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "592",
	   	width : "100%",
	   	rowNum : 10,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#edsvfm_pgSuvyList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	   	onSelectRow : function(rowid)
	   	{
	   	    var objGrid = $("#edsvfm_tblSuvyList").jqGrid('getRowData', rowid);

	   	    if (rowid == null)
	   	    	return;
	   	    
	   	    (objGrid.SUVY_NM != null && objGrid.SUVY_NM != "") ? $("#edsvfm_suvy_Nm").val(objGrid.SUVY_NM) : $("#edsvfm_suvy_Nm").val();
   	    	(objGrid.PARNT_SUVY_ID != null && objGrid.PARNT_SUVY_ID != "") ? $("#edsvfm_parnt_Cd").val(objGrid.PARNT_SUVY_ID) : $("#edsvfm_parnt_Cd").val();			   		
   	    	(objGrid.SUVY_ID != null && objGrid.SUVY_ID != "") ? $("#edsvfm_suvy_Id").val(objGrid.SUVY_ID) : $("#edsvfm_suvy_Id").val();	
	   		(objGrid.SUVY_ORD != null && objGrid.SUVY_ORD != "") ? $("#edsvfm_suvy_Ord").val(objGrid.SUVY_ORD) : $("#edsvfm_suvy_Ord").val("");
	   		(objGrid.QST_TYPE_CD != null && objGrid.QST_TYPE_CD != "") ? $("#edsvfm_qst_Type_Cd").val(objGrid.QST_TYPE_CD) : $("#edsvfm_qst_Type_Cd").val();
	   		
	   		$("#edsvfm_qst_Type_Cd").change();
	   		
	   		setTimeout(function(){							
	   			(objGrid.ANS_TYPE_CD != null && objGrid.ANS_TYPE_CD != "") ? $("#edsvfm_ans_Type_Cd").val(objGrid.ANS_TYPE_CD) : $("#edsvfm_ans_Type_Cd").val();	   
	   			$("#edsvfm_ans_Type_Cd").change();
	   		}, 300);   		
	   		
	   		$("input:radio[name=lbrUse_Yn]:input[value=" + objGrid.USE_YN + "]").prop("checked", true);
	   		
	   		g_Grd_lv = objGrid.SUVY_LVL;
	   		
	   		$("#edsvfm_btnInsert").hide();
	   		$("#edsvfm_btnUpdate").show();

	   	},
	   	onPaging : function(pgButton)
	   	{	   		
	   		//initCourseSpec();
	   	}
	}).jqGrid("navGrid", "#edsvfm_pgSuvyList", {edit : false, add : false, del : false, search : false});


});