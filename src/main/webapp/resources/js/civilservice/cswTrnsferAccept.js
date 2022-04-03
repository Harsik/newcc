

function fnCAcceptListInit() {
	
	$("#cstrac_tblCAcceptList").jqGrid({
		url : "/jqgrid/civilservice/cswCAcceptList.do",
		datatype : 'json',
		mtype : 'POST',
		postData : {
			pJson : getJsonCAcceptList()
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : ["기관/부서명",  "직급",  "성명",  "서무여부", "민원 사무분장", "OUCODE", "ORGFULLNAME","담당자해제", "USR_ID"],
		colModel :
		[
		 	{name : "ORGFULLNAME2", align : "left", width: 150},	
		 	
		 	{name : "POSITION",index : "[POSITION]", align : "left", width: 110 , hidden : false},
		 	
		 	{name : "DISPLAYNAME", align : "center", width: 60},
		 	
		 	{name : "CC_AFFAIRS_YN", align : "center", hidden : true},
		 	{name : "JOBTITLE", align : "left", width: 300},
		 	
		 	{name : "OUCODE", hidden : true},
		 	{name : "ORGFULLNAME", hidden : true},
		 	
		 	{name:'btn_AFFAIRS', align : "center", width: 60, formatter:buttonFunction},
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
	   	pager : "#cstrac_pagingCAcceptList",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true
		
	}).jqGrid("navGrid", "#cstrac_pagingCAcceptList", {edit : false, add : false, del : false, search : false});
	
	
}

function buttonFunction(cellvalue, options, rowObject)
{
	return "<input type='button' class='button' value='해제' onclick='fnSetAffairs("+'"'+rowObject.USR_ID+'"'+',' +'"'+rowObject.DISPLAYNAME+'"'+ ")' />";
}

// 콜센터담당자 해제 이벤트
function fnSetAffairs(setUsrID, setUsrNm){
	
	if(setUsrID == ""){
		alert("해제하실 담당자를 선택하십시요.");
		return false;
	}
	
	if (confirm(setUsrNm+" 담당자를 해제 하시겠습니까?") == true){

		
		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : "/ajax/civilservice/cswSetAffairsN.do",
			data : "pJson=" + getSetAffairs(setUsrID,"N"),
			success : function(data)
			{
				alert("담당자 해제를 완료하였습니다.");
				btnCswSearch_clickEvent();
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
		
	}	
}

//콜센터담당자추가 버튼 클릭 이벤트
function btnCswInsert_clickEvent() {
	
	if($("#cstrac_setUID").val().trim() == ""){
		alert("지정하실 담당자를 선택하십시요.");
		return false;
	}
	
//	if ($("#cstrac_setAffrYN").val() != "Y") {
//		alert("서무 담당자만 지정하실 수 있습니다.");
//		return false;
//	}
	
	if (confirm("["+$("#cstrac_setUserfullname").val()+"] (을)를\n 콜센터담당자로 지정하시겠습니까?") == true){

		$.ajax({
			type : "post",
			dataType: "json",
			async : false,
			url : "/ajax/civilservice/cswSetAffairsY.do",
			data : "pJson=" + getSetAffairs($("#cstrac_setUID").val().trim(),"Y"),
			success : function(data)
			{
				alert("담당자 지정을 완료하였습니다.");
				btnCswSearch_clickEvent();
			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
		
	}		
}

// 콜센터담당자지정 초기화 버튼 클릭 이벤트
function btnCswTrnsfAccpInit_clickEvent() {
	$("#cstrac_cswSearchOrgVal").val("");
	$("#cstrac_cswSearchUsrNm").val("");
	$("#cstrac_setUID").val("");
	$("#cstrac_setAffrYN").val("");
	$("#cstrac_setUserfullname").val("");
	btnCswSearch_clickEvent();
}

function getSetAffairs(setUid, setAffairsYN)  {
	
	loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wNjEudXBkYXRlU2V0QWZmYWlycw==",
		"map" : {
			"key" : "value",
			"setUid" : setUid,
			"setAffairsYN" : setAffairsYN		
		}
	}
	
	return  encodeURIComponent(JSON.stringify(loParam));
}


function getJsonCAcceptList()  {
	
	var deptId = "48200000000"; // 순천시 oucode(최상위 코드)
	
	
	
	/*
	if( $(':radio[name="cswOrgGrupCd"]:checked').val() == "do" ){
		deptId = "6500000";
	}else{
		deptId = $(':radio[name="cswOrgGrupCd"]:checked').val();
	}
	*/

		loParam = {
				"qt" : "c2VsZWN0TGlzdA==",
				"mi" : "b20wNjEuYWRtaW5BZ2VuY3lVc2VyTGlzdA==",
				"map" : {
					"key" : "value",
					"deptId" : deptId,
					"notLowLev" : true,
					"orgGrupCd" : deptId,
					/*"orgGrupCd" : $(':radio[name="cswOrgGrupCd"]:checked').val(),*/
					"srchOrgVal" : $("#cstrac_cswSearchOrgVal").val(),
					"srchType" : "NAME",
					"srchVal" : $("#cstrac_cswSearchUsrNm").val(),
					"affairsYn" :true		/* 콜센터 담당자만 조회 */
				}
		}
	
	return  encodeURIComponent(JSON.stringify(loParam));
}

//담당자 자동완성
function cswOrgDeptUser2(selectid){
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNjEuY3N3T3JnRGVwdFVzZXI=",
		"map" : {
			"key" : "value", 
			"keyword" : $("#"+selectid).val().replace(/-/g, ''),			
//			"selectid" : selectid
			"selectid" : ""
		}
	};
	
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));	
}

//조회 버튼 클릭 이벤트
function btnCswSearch_clickEvent() {
	$("#cstrac_tblCAcceptList").jqGrid("setGridParam", { postData :  {pJson : getJsonCAcceptList()}, page : 1, sortname : "TELEPHONENUMBER", sortorder : "asc"});
	$("#cstrac_tblCAcceptList").trigger("reloadGrid");
}

function fnSetOrgcswTATrans(objInfo) {
	
	var agencyCategory = objInfo.CATEGORY;
	if (agencyCategory == "AA") {
		//$("#tfCntrId").val(objInfo.DEPT_CD);
		//$("#tfCntrNm").val(objInfo.DEPT_NM);
		$("#cstrac_setUID").val(objInfo.USR_ID);
		$("#cstrac_setAffrYN").val(objInfo.CC_AFFAIRS_YN);
		//$("#tfRespNm").val(objInfo.USR_NM);
		//$("#tfResponTel").val(objInfo.TEL_NO);
		$("#cstrac_setUserfullname").val(objInfo.DEPT_NM+" "+objInfo.USR_NM);
	} else if (agencyCategory == "CC"){
		//$("#tfCntrId").val(objInfo.TEAM_CD);
		//$("#tfCntrNm").val(objInfo.TEAM_NM);
		$("#cstrac_setUID").val(objInfo.USR_ID);
		//$("#tfRespNm").val(objInfo.USR_NM);
		//$("#tfResponTel").val(objInfo.TEL_NO);
		$("#cstrac_setUserfullname").val(objInfo.TEAM_NM+" "+objInfo.USR_NM);
	} else if (agencyCategory == "EA") {
		//$("#tfCntrId").val("externAgency");
		//$("#tfCntrNm").val(objInfo.TEAM_NM);
		$("#cstrac_setUID").val(objInfo.USR_ID);
		//$("#tfRespNm").val(objInfo.USR_NM);
		//$("#tfResponTel").val(objInfo.TEL_NO);
		$("#cstrac_setUserfullname").val(objInfo.TEAM_NM+" "+objInfo.USR_NM);
	}
}

function initTrnsferAcceptDiv(){	

	fnCAcceptListInit();
	
	$("#cstrac_btnCswSearch").bind("click", btnCswSearch_clickEvent);
	$("#cstrac_btnCswInsert").bind("click", btnCswInsert_clickEvent);
	$("#cstrac_btnCswTrnsfAccpInit").bind("click", btnCswTrnsfAccpInit_clickEvent);
	
	// 기관구분이벤트
	/*$("input[name=cswOrgGrupCd]").change(function() {  
		btnCswSearch_clickEvent();
	});*/ 
	
	$("#cstrac_cswSearchOrgVal, #cstrac_cswSearchUsrNm").bind("keydown", function(key) {
		if (key.keyCode == 13) btnCswSearch_clickEvent();
	});
	
    $("#cstrac_setUserfullname").autocomplete({
    	source : function( request, response ) {
	    	$("#cstrac_setUID").val("");
	         $.ajax({
	                type: 'post',
	                async : true,
	                url: "/ajax/civilservice/cswOrgDeptUser.do",
	                dataType: "json",                       
	                data : "pJson=" + cswOrgDeptUser2("cstrac_setUserfullname"),
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
	        	$("#cstrac_setUID").val(arItem[0]);
	        	$("#cstrac_setAffrYN").val(arItem[7]);
	        },
	        focus : function() { // 포커스 자동 입력 해제
				return false;
			},
	       close: function () { }
    });
    
	$("#cstrac_cntrSearch").on("click", function(e) {
		window.sessionStorage.setItem("fromFlag", "fromcswTA");
		window.sessionStorage.setItem("corpOpenType", "adminAgency");
		openMenuPopup("CM0311");
	});
    
}