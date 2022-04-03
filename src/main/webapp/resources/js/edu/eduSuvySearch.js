
var g_usrId = window.opener.document.getElementById("rpedcp_getUsrId").value;
var g_parnt_Suvy_Id = window.opener.document.getElementById("rpedcp_getSuvyId").value;
var g_edu_Id = window.opener.document.getElementById("rpedcp_getEduId").value;

var g_ans_id = [];		//질문 suvy_id

//selectbox 답변유형 불러오기
function getJsonStrSuvyAnsList(tp_cd, cd)
{	
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "c20wMDIuc2VsYm94U3BsaXRDb2Rl",
		"map" : {
			"key" : "value",
			"tp_cd" : tp_cd,
			"cd" : cd,
		}
	};
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//selectbox 답변유형 불러오기
function setSelectBoxWithSuvyAnsList(objSelbox, tp_cd, cd)
{	
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/edu/eduSuvyAnsList.do",
		data : "pJson=" + getJsonStrSuvyAnsList(tp_cd, cd),
		success : function(data)
		{
			$("#" + objSelbox).html("");
			
			// param값을 JSON으로 파싱
			var value = "";
			
			value += "<option value=''>미선택</option>";
			
			$.each(data, function(key, state)
			{
				value += "<option value='" + state.CD + "'>" + state.CD_NM + "</option>";
			});
			
			$("#" + objSelbox).append(value);

		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

//set selectbox value 
function setSelectBoxValue(objSelbox) 
{
	$("#ans_" + objSelbox).val($("#sel_" + objSelbox).val());
}

function chkScr()
{
	var sRtn = "";	
	var objVal = "";
	
	$(".select").each(function() {
		objVal = ($(this).val());

		if (objVal == "")
			sRtn = sRtn + "[" + $("#"+this.id).parent().prev().text() + "] \n";		
	});	
	
	return sRtn;
}

//출력버튼
function btnPrint_clickEvent()
{
//	window.open("http://172.17.10.35:8090/oz70/ozhviewer/eduSuvySrch.jsp?usr_id="+g_usrId+"&suv_id="+g_parnt_Suvy_Id+"&edu_id=" +g_edu_Id);
	window.open("http://172.17.100.100:8090/oz70/ozhviewer/eduSuvySrch.jsp?usr_id="+g_usrId+"&suv_id="+g_parnt_Suvy_Id+"&edu_id=" +g_edu_Id);
}

//저장버튼
function btnSave_clickEvent()
{
	if (g_usrId != window.sessionStorage.getItem("USR_ID")) {
		alert("본인만 저장 가능합니다.");
		return;
	}
	
	var scrMsg = chkScr();
	
	if (scrMsg != "") {
		alert(scrMsg + " 항목을 확인하세요.");
		return;
	}
	
	var pList1 = [];
	
	for(var qusetionSeq = 0; qusetionSeq <= g_ans_id.length-1; qusetionSeq++) {

		var $answer = $("#ans_" + g_ans_id[qusetionSeq]);
		if($answer.val()) {
			//if($answer.attr("type") == "text") {
			var ansSuvy_Id = g_ans_id[qusetionSeq];
			var ansSuvy_Nm = $answer.val().trim();
		
			pList1.push({
				"qt" : "dXBkYXRl",
				"mi" : "b20wNDUuc2F2ZUFndFN1dnk=",
				"map": {
					"edu_Id" : g_edu_Id,
					"suvy_Id" : ansSuvy_Id,
					"ans_Nm" : ansSuvy_Nm,
				}});
			//} 
		}
	}

	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/edu/saveAgtSuvy.do",
		data : "pJson=" + getJsonStr("YmF0Y2g=", null, pList1),
		success : function(data) {
			alert("저장되었습니다.");
			
			opener.parent.$("#tblCmplt").jqGrid("setGridParam", {postData : { pJson : opener.parent.getJsonStrCmpltAgtList(g_edu_Id, opener.parent.$("#srchTeamCd").val(), opener.parent.$("#selAgent").val()) }, page : 1, sortname : "USR_NM", sortorder : "asc", }).trigger("reloadGrid");
			
			self.close();
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
}

// 초기 이벤트 셋팅
function initEvent()
{
	//출력버튼
	$("#btnPrint").bind("click", btnPrint_clickEvent);
	//저장버튼
	$("#btnSave").bind("click", btnSave_clickEvent);

}

// 초기 데이터 셋팅
function initData()
{
	initSuvyQa2(g_parnt_Suvy_Id);
}

function initSuvyQa2(parnt_Suvy_Id)
{
	var rowId = "";	
	var rowLv="";
	var rowSeq="";
	var rowAnsCd = "";
	
	var arrSpanCnt=new Array();
	var arrTrId=new Array();
	var arrText=new Array();
 
	//질의 가져오기
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : getContextPath() + "/ajax/edu/eduSuvyAnswer.do",
		data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "b20wNDQuc2VsZWN0U3V2eUFuc3dlcg==", {
			"parnt_Suvy_Id" : parnt_Suvy_Id
		}),
		success : function(data) {		
		     
		    var trNum=0;
		    var rowNum=0;
		    var totNum=0;
		    var rowType="";
		     $.each(data, function(qusetionSeq, question) {
		    	rowLv = question.LV;
		    	rowSeq = question.SEQ;
		    	rowId = question.ID;
		    	rowAnsCd = question.ANS_TYPE_CD;
		    	
		    	// span tr
		    	 if(Number(rowLv)==1 && Number(rowSeq)!=1){
		    		 arrSpanCnt[trNum]=rowNum;
		    		 console.log("trNum:"+trNum+" SpnCnt:"+arrSpanCnt[trNum])
		    		 trNum++;
		    		 rowNum=0;
		    		 arrSpanCnt[trNum]=0; //초기화
		    	 }else if(Number(rowLv)!=1){
		    		//span count
		    		 rowNum++;
		    	 }
		    	
		    	 if(question.QST_TYPE_CD=="1002"){
		    		 rowType="E"; // text box
		    	 }
		    	 else if(question.QST_TYPE_CD=="1001"){
		    		 rowType="M"; // 
		    	 }else{
		    		 rowType="M"; //
		    	 }
		    	 
		    	 arrTrId[totNum]="tr_"+trNum+"_"+rowLv+"_"+rowSeq+"_"+totNum+"_"+rowType+"_"+rowId+"_"+rowAnsCd;
		    	 arrText[totNum]=question.TEXT;
		    	 g_ans_id[totNum] = rowId;
		    	 console.log(arrTrId[totNum]+ " totNum:"+totNum);
     	 		    	 
//		    	  console.log("trNum:"+trNum+" rowLv:"+rowLv+" rowSeq:"+rowSeq+" rowNum:"+rowNum+" totNum:"+totNum+" Type:"+rowType+" SpnCnt:"+arrSpanCnt[trNum]); //trNum 아직 초기화
		    	 totNum++;
		    });
			
		  	$("#suvyQa").empty();   
		     
		  	 var content = "<table class='profile_tbl'>"+
							"<tr>"+
								"<th class='line_rt' style = 'width : 12%'>구분</th>"+
								"<th class='line_rt' style = 'width : 42%'>평가내용</th>"+
								"<th class='line_rt' style = 'width : 13%'>만족도</th>"+
								"<th class='line_rt' style = 'width : 5%'>점수</th>"+
							"</tr>";
		  	
			for(var i=0; i<totNum; i++){
				var arrTr=arrTrId[i].split('_');
				var trNum=arrTr[1];
				var rowLv=arrTr[2];
				var rowSeq=arrTr[3];
				var nRow=arrTr[4];
				var type=arrTr[5];
				var objId=arrTr[6];
				var objAnsCd=arrTr[7];
				var rowSpan=arrSpanCnt[arrTr[1]];
			
				console.log("trNum:"+arrTr[1]+ " rowLv:"+arrTr[2]+ " rowSeq:"+arrTr[3]+ " row:"+arrTr[4]+ " rowType:"+arrTr[5]+ " spCnt:"+arrSpanCnt[arrTr[1]]+ " suvyID:"+arrTr[6])
				
				if(rowLv==1){
					content += "<tr id='tr_"+trNum+"_"+rowLv+"_"+rowSeq+"_"+nRow+"'>";
				}
				
				if(Number(nRow)!=0 && Number(rowSeq)==1 && Number(rowSpan)>0){
					 content += "<th class='line_rt' id='td_"+trNum+"_"+rowLv+"_"+rowSeq+"_"+nRow+"_"+type+"' rowspan='"+rowSpan+"'>"+arrText[i-1]+"</th>";
				}
				
				if(Number(rowLv)!=1){
					 content += "<td class='line_b'>"+arrText[i]+"</td>"+
				 				 "<td class='line_b'><select class='select' id='sel_" + objId + "' onChange='setSelectBoxValue(" + objId + ")'></select></td>"+
				 				 "<td class='line_b'><input type='text' class='text_ol' id='ans_" + objId + "' style='text-align:center' readonly></td>"+
					 			 "</tr>";
					 
					//답변유형 불러오기
					 setSelectBoxWithSuvyAnsList("sel_" + objId, "90118", objAnsCd);
				}	
				
				// 주관식
				if(type!="M"){
					 content += "<th class='line_rt'>"+arrText[i]+"</th>" +
						 		"<td class='line_b' colspan='3'>"+
						 		"<textarea rows='10' cols='110' id='ans_" + objId + "' maxlength='1800'></textarea>"+
						 		"</td>";
				}
						
			}
			
			$("#suvyQa").append(content);
			 
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});	
	
	setTimeout(function(){
		//선택답안 체크
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/edu/selectAgtSuvy.do",
			data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "b20wNDUuc2VsZWN0QWd0U3V2eQ==", {
				"edu_Id" : g_edu_Id,
				"usr_Id" : g_usrId
			}),
			success : function(data) {
				//console.log(data);
				
				$.each(data, function(index, state) {
					if (state.QST_TYPE_CD == "1001") {
						state.ANS_NM != null ? $("#sel_" + state.SUVY_ID).val(state.ANS_NM) : $("#sel_" + state.SUVY_ID).val("");
						$("#sel_" + state.SUVY_ID).change();
					} else {
						$("#ans_" + state.SUVY_ID).val(state.ANS_NM);
					}
				});
			},
			error : function(data, status, err) {
				networkErrorHandler(data, status, err);
			}
		});
	}, 650);
	
}

	                
// 초기셋팅
$(function()
{ 
	initEvent();
	initData();

});