

function fnCVactListInit() {
	
	$("#tblCAcceptList").jqGrid({
		url : "/jqgrid/civilservice/cswCVactList.do",
		datatype : 'json',
		mtype : 'POST',
		postData : {
			pJson : getJsonCVactList()
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["기관/부서명",  "직급",  "성명",  "서무여부", "OUCODE", "ORGFULLNAME","휴가해제", "USR_ID"],
		colModel :
		[
		 	{name : "ORGFULLNAME2", align : "left", width: 150},	
		 	
		 	{name : "POSITION",index : "[POSITION]", align : "left", width: 110 , hidden : false},
		 	
		 	{name : "DISPLAYNAME", align : "center", width: 60},
		 	
		 	{name : "CC_AFFAIRS_YN", align : "center", hidden : true},
		 	
		 	{name : "OUCODE", hidden : true},
		 	{name : "ORGFULLNAME", hidden : true},
		 	
		 	{name:'btn_AFFAIRS', align : "center", width: 60, formatter:buttonFunctionVact},
		 	{name : "USR_ID", hidden : true}
 	
		],
		sortname : "TELEPHONENUMBER",
		sortorder : "asc",
		
	   	gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	   	height : "722",
	    width : "100%",
	   	rowNum : 25,
	   	rowList : [10, 15, 25, 50, 100],
	   	autowidth : true,
	    autoResizable: false,
	   	pager : "#pagingCAcceptList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true
		
	}).jqGrid("navGrid", "#pagingCAcceptList", {edit : false, add : false, del : false, search : false});
	
	
}

function buttonFunctionVact(cellvalue, options, rowObject)
{
	return "<input type='button' class='button' value='해제' onclick='fnSetVact("+'"'+rowObject.USR_ID+'"'+',' +'"'+rowObject.DISPLAYNAME+'"'+ ")' />";
}

// 휴가자 해제 이벤트
function fnSetVact(setUsrID, setUsrNm){
	
	if(setUsrID == ""){
		alert("해제하실 휴가자를 선택하십시요.");
		return false;
	}
	
	if (confirm(setUsrNm+" 휴가자를 해제 하시겠습니까?") == true){

		
		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : "/ajax/civilservice/cswSetVactN.do",
			data : "pJson=" + getSetVact(setUsrID,"N"),
			success : function(data)
			{
				alert("휴가자 해제를 완료하였습니다.");
				btnCswVactSearch_clickEvent();
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
		
	}	
}

//휴가자추가 버튼 클릭 이벤트
function btnCswVactInsert_clickEvent() {
	
	if($("#setUID").val().trim() == ""){
		alert("지정하실 휴가자를 선택하십시요.");
		return false;
	}
	
	if (confirm("["+$("#setUserfullname").val()+"] (을)를\n 휴가자로 지정하시겠습니까?") == true){

		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : "/ajax/civilservice/cswSetVactY.do",
			data : "pJson=" + getSetVact($("#setUID").val().trim(),"Y"),
			success : function(data)
			{
				alert("휴가자 지정을 완료하였습니다.");
				btnCswVactSearch_clickEvent();
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
		
	}		
}

// 초기화 버튼 클릭 이벤트
function btnCswTrnsVactInit_clickEvent() {
	$("#cswSearchOrgVal").val("");
	$("#cswSearchUsrNm").val("");
	$("#setUID").val("");
	$("#setAffrYN").val("");
	$("#setUserfullname").val("");
	btnCswVactSearch_clickEvent();
}

function getSetVact(setUid, setVactYN)  {
	
	loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wNjEudXBkYXRlU2V0VmFjdA==",
		"map" : {
			"key" : "value",
			"setUid" : setUid,
			"setVactYN" : setVactYN		
		}
	}
	
	return  encodeURIComponent(JSON.stringify(loParam));
}


function getJsonCVactList()  {
	var deptId = "48200000000"; // 순천시 oucode(최상위 코드)
	loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b20wNjEuYWRtaW5BZ2VuY3lVc2VyTGlzdA==",
			"map" : {
				"key" : "value",
				"includeYn" : true, //false 이면 재직인 사람 가져옴
				"deptId" : deptId,
				"notLowLev" : true,
				"orgGrupCd" : deptId,
				"srchOrgVal" : $("#cswSearchOrgVal").val(),
				"srchType" : "NAME",
				"srchVal" : $("#cswSearchUsrNm").val(),
				"vactYn" :true		/* 휴가자만 조회 */
			}
	}
	
	return  encodeURIComponent(JSON.stringify(loParam));
}

//담당자 자동완성
function cswOrgDeptUserVact(selectid){
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNjEuY3N3T3JnRGVwdFVzZXI=",
		"map" : {
			"key" : "value", 
			"keyword" : $("#"+selectid).val().replace(/-/g, ''),			
			"selectid" : ""
		}
	};
	
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));	
}

//조회 버튼 클릭 이벤트
function btnCswVactSearch_clickEvent() {
	$("#tblCAcceptList").jqGrid("setGridParam", { postData :  {pJson : getJsonCVactList()}, page : 1, sortname : "TELEPHONENUMBER", sortorder : "asc"});
	$("#tblCAcceptList").trigger("reloadGrid");
}

function fnSetOrgcswVATrans(objInfo) {
	
	var agencyCategory = objInfo.CATEGORY;
	if (agencyCategory == "AA") {
		$("#setUID").val(objInfo.USR_ID);
		$("#setAffrYN").val(objInfo.CC_AFFAIRS_YN);
		$("#setUserfullname").val(objInfo.DEPT_NM+" "+objInfo.USR_NM);
	} else if (agencyCategory == "CC"){
		$("#setUID").val(objInfo.USR_ID);
		$("#setUserfullname").val(objInfo.TEAM_NM+" "+objInfo.USR_NM);
	} else if (agencyCategory == "EA") {
		$("#setUID").val(objInfo.USR_ID);
		$("#setUserfullname").val(objInfo.TEAM_NM+" "+objInfo.USR_NM);
	}
}

function initTrnsferVactDiv(){	

	fnCVactListInit();
	
	$("#btnCswSearch").bind("click", btnCswVactSearch_clickEvent);
	$("#btnCswInsert").bind("click", btnCswVactInsert_clickEvent);
	$("#btnCswTrnsfAccpInit").bind("click", btnCswTrnsVactInit_clickEvent);
	
	$("#cswSearchOrgVal, #cswSearchUsrNm").bind("keydown", function(key) {
		if (key.keyCode == 13) btnCswVactSearch_clickEvent();
	});
	
    $("#setUserfullname").autocomplete({
    	source : function( request, response ) {
	    	$("#setUID").val("");
	         $.ajax({
	                type: 'post',
	                async : true,
	                url: "/ajax/civilservice/cswOrgDeptUser.do",
	                dataType: "json",                       
	                data : "pJson=" + cswOrgDeptUserVact("setUserfullname"),
	                success: function(data) {
	                    //서버에서 json 데이터 response 후 목록에 뿌려주기 위함
	                    response(
	                        $.map(data, function(item) {
	                        	
	                            return { 
	                                label: (item.USERFULLNAME),
	                                value: (item.USERFULLNAME),
	                                hidVal: (item.UID_+"|"+item.DISPLAYNAME+"|"+item.USERFULLNAME+"|"+item.OUCODE+"|"+item.OU+"|"+item.ORGFULLNAME+"|"+item.TELEPHONENUMBER+"|"+item.CC_AFFAIRS_YN)
	                            };
	                        })
	                    );
	                }
	           });
	        },
	        //조회를 위한 최소글자수
	        minLength: 2,
	        select: function( event, ui ) {
	        	var arItem=new Array(7);
	        	var detpUser=ui.item.hidVal;
	            
	        	arItem=(ui.item.hidVal.toString()).split('|');
	        	$("#setUID").val(arItem[0]);
	        	$("#setAffrYN").val(arItem[7]);
	        },
	        focus : function() { // 포커스 자동 입력 해제
				return false;
			},
	       close: function () { }
    });
    
	$("#cntrSearch").on("click", function(e) {
		window.sessionStorage.setItem("fromFlag", "fromcswVA");
		window.sessionStorage.setItem("corpOpenType", "adminAgency");
		openMenuPopup("CM0311");
	});
    
}