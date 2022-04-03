var oneTimeEx = false;
var isinitTrnsferVocDiv = false;
var isinitjisikRewordDiv = false;
var isinitNoticeDiv = false;
var isinitTrnsferAcceptDiv = false;
var isinitTrnsferVactDiv = false;
var isinitDeptCorprDiv = false;
var uid = "";
var ouCode = "";
var fromDiv = "";
var usrId = "";

function getJsonCCAuth(usrId) {
	var loParam = {
		"qt" : "c2VsZWN0",
		"mi" : "c20wMDIuc2VsQ0NBdXRo",
		"map" : {
			"key" : "value",
			"tp_cd" : "90909",
			"orgId" : usrId
		}
	};

	return encodeURIComponent(JSON.stringify(loParam));
}

function cvsvwk_initTabs(id) {
	switch (id) {
	case "cvsvwk_TrnsferVocDiv":
		if (isinitTrnsferVocDiv == false) {
			initTrnsferVocDiv();
			isinitTrnsferVocDiv = true;
		}
		break;
	case "cvsvwk_jisikRewordDiv":
		if (isinitjisikRewordDiv == false) {
			initjisikRewordDiv();
			isinitjisikRewordDiv = true;
		}
		break;
	case "cvsvwk_NoticeDiv":
		if (isinitNoticeDiv == false) {
			initNoticeDiv();
			isinitNoticeDiv = true;
		}
		break;
	case "cvsvwk_TrnsferAcceptDiv":
		if (isinitTrnsferAcceptDiv == false) {
			initTrnsferAcceptDiv();
			isinitTrnsferAcceptDiv = true;
		}
		break;
	// 20.10.30 휴가자 지정 화면 생성
	case "cvsvwk_TrnsferVactDiv":
		if (isinitTrnsferVactDiv == false) {
			initTrnsferVactDiv();
			isinitTrnsferVactDiv = true;
		}
		break;
	case "cvsvwk_DeptCorprDiv":
		if (isinitDeptCorprDiv == false) {
			initDeptCorprDiv();
			isinitDeptCorprDiv = true;
		}
		break;
	}
}

function getJsonCCAffairsYN(usrId) {
	var loParam = {
			"qt" : "c2VsZWN0",
			"mi" : "b20wNjEuZ2V0Y2NBZmZhaXJzWW4=",
			"map" : {
				"key" : "value",
				"uId" : usrId
			}
	};
	
	return encodeURIComponent(JSON.stringify(loParam));
}

function userCheck(){
	$.ajax({
		type : "post",
		async : false,
		dataType : "json",
		url : getContextPath() + "/ajax/civilservice/csw.do",
		data : "pJson=" + getUserCheck(),
		success : function(data){
			
			if(data.length > 0){
				var ou = data[0].OU;
				var usrNm = data[0].DISPLAYNAME;
	
				window.sessionStorage.setItem("ou", ou);
				window.sessionStorage.setItem("usrNm", usrNm);
				
				var cc_auth = window.sessionStorage.getItem("CC_AUTH");
				var cc_affairs_yn = window.sessionStorage.getItem("CC_AFFAIRS_YN");
				$("#user_Check").html("&nbsp( "+ou+"&nbsp/&nbsp"+usrNm);
				if(cc_affairs_yn=="Y"){
					$("#user_Check").append(" / 서무");
				}
				if(cc_auth=="Y"){
					$("#user_Check").append(" / 콜센터당담자");
				}
				$("#user_Check").append(" )");
			}else{
				$.ajax({
					type : "post",
					async : false,
					dataType : "json",
					url : getContextPath() + "/ajax/civilservice/csw.do",
					data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==","b20wMDMuYXV0aENoZWNr", {
						"userCd" : window.sessionStorage.getItem("USR_GRD_CD")
					}),
					success : function(data){
						if(data[0].RD_YN == "Y"){
							$("#user_Check").html("&nbsp( "+window.sessionStorage.getItem("USR_NM")+" )");
						}else{
							console.log("usrId >>> " + usrId);
							alert("사용자 권한이 없습니다.");
							window.close();
						}
						
					}
				});
			}
		}
	});
}


function getUserCheck() 
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wNjEuc2VuZGluZ1VzZXJJbmZv",
		"map" : {
			"key" : "value",
			"userId" : usrId
		}
	};
	
	console.log('getUserCheck().loParam > ', JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

$(document).ready(function() {
	uid = $("#uid").val();
	ouCode = $("#ouCode").val();
	fromDiv =$("#cvsvwk_fromDiv").val();
	console.log("uid==>"+uid +", ouCode==>"+ouCode+", div==>"+fromDiv);
	
	$("body").show();
	usrId = window.sessionStorage.getItem("usrId") == null ? (window.sessionStorage.getItem("USR_ID") == null ? uid : window.sessionStorage.getItem("USR_ID")) : window.sessionStorage.getItem("usrId");

	if (usrId == null || usrId == "") {
		usrId = uid;
	}
	var cvtabs = $("#cvsvwk_civilServiceWorkLgTabs").tabs();

	cvtabs.tabs({
		activate : function(event, ui) {
			var id = ui.newPanel.attr('id');
			cvsvwk_initTabs(id);
		}
	});

	// 	콜센터담당자 지정 권한여부 확인	
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		url : "/ajax/civilservice/csw.do",
		data : "pJson=" + getJsonCCAuth(usrId),
		success : function(data1) {
			$.ajax({  
				type : "post",
				dataType : "json",
				async : false,
				url : "/ajax/civilservice/csw.do",
				data : "pJson=" + getJsonCCAffairsYN(usrId),
				success : function(data2) {
					var auth = data1.CC_AUTH;
					var affairs = data2.CC_AFFAIRS_YN;
					
					window.sessionStorage.setItem("CC_AUTH", auth);
					window.sessionStorage.setItem("CC_AFFAIRS_YN", affairs);
					
					$("#popDiquest").show();
					
					if (auth != "Y") { 
						$("#cvsvwk_TrnsferAcceptDiv").css("display", "none");
						$('a[href="#cvsvwk_TrnsferAcceptDiv"]').parent('li').remove();
						$("#cvsvwk_DeptCorprDiv").css("display", "none");
						$('a[href="#cvsvwk_DeptCorprDiv"]').parent('li').remove();
						cvtabs.tabs("refresh");
						$("#popDiquest").hide();
					}
				}
			});
		},
		error : function(data1, status, err) {
			networkErrorHandler(data1, status, err);
		}
	});
	
	userCheck();

	cvsvwk_initTabs("cvsvwk_TrnsferVocDiv");
//	cvsvwk_initTabs("cvsvwk_jisikRewordDiv");
	
	var fromDiv =$("#cvsvwk_fromDiv").val();
	
	if(fromDiv != null && fromDiv == "DB") {
		$('a[href="#cvsvwk_jisikRewordDiv"]').trigger("click");
	}
});

// JHIL add
//파라미터 셋팅_getJsonStrUseAuthList
function getJsonStrUseAuthList(usrId) {
	var loParam = {
			"qt" : "c2VsZWN0TGlzdA==",
			"mi" : "b3IwMDIudXNlQXV0aExpc3Q=",
			"map" : {
				"key" : "value",
				"tp_cd" : "90006",
				"usr_id" : usrId,
				"chkNotUse" : true
			}
	};
	
	console.log('getJsonStrUseAuthList.loParam > ', JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

function go_pcrm() {
	var width = 1920;
	var height = 1080;
//	var option = "width=" + width + ", height=" + height 
//		+ ", toolbar=no,directories=no,scrollbars=auto,location=no,resizable=no,status=no,menubar=no";
//
//	var paramURL = "http://" + window.location.hostname + ":8090/monitor/MonitoringMapView.do";
	
//	var formTag = '<form name="f111" id="f111" method="post"><input type="hidden" name="reqUsrId" id="reqUsrId" value=""/><input type="hidden" name="reqUsrNm" id="reqUsrNm" value=""/></form>';
//	$("body").append(formTag);
	
	
	var paramURL = getContextPath() + "/web/pcrm/MonitoringMapView.do";
	var newWindow = window.open(paramURL, "pcrm", "resizable");
	newWindow.moveTo(left, top);
	newWindow.resizeTo(width,height);
	newWindow.focus();
	
//	
//	$("#f111").prop("target",  "pcrm");
//	$("#f111").prop("action", paramURL);
//	$("#reqUsrId").val(usrId);
//	$("#reqUsrNm").val(usrNm);
//	$("#f111").submit();
//
//	$("#f111").remove();
}

