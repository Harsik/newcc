var temDate = "";

function getJsonStrcustMnUserImg(usrid) {
	var loParam = {
		"qt" : "c2VsZWN0",
		"mi" : "b20wMDEuc2VsZWN0",
		"map" : {
			"key" : "value",
			"usr_id" : usrid
		}
	};

	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function getJsonStrcustMnTypeCnt(usrid) {
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y2gwMDEuY25zVXNyQ291bnRpbmc=",
		"map" : {
			"key" : "value",
			"usr_id" : usrid,
			"crt_dt" : temDate
		}
	};

	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

//function
function initcustomerManagement() {
	var today = new Date();
	var day = today.getDay();
	if (day != 1) {
		temDate = getPrevDate("1").replace(/-/gi, "");
	} else {
		temDate = getPrevDate("3").replace(/-/gi, "");
	}
	var usrid = window.sessionStorage.getItem("USR_ID");
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/login/userImg.do",
		data : "pJson=" + getJsonStroperMnUserImg(usrid),
		success : function(data) {
			if(data!=null){
				$("#custMn_usr_nm").html(data.USR_NM);
				if(data.SVRFL_PTH != undefined)
				$("#custMn_img_face").attr("src", getImgUrl() + replaceFileUrl(data.SVRFL_PTH));
				//else
				//$("#custMn_img_face").attr("src", "<c:url value='/resources/images/counselor.jpg'/>");
			}
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/login/userStat.do",
		data : "pJson=" + getJsonStroperMnTypeCnt(usrid),
		success : function(data) {
			if(data!=""){
			var sum = 0;
			var txt = "";
				for(var i=0;i<data.length;i++){
					txt += data[i].TYPE_NM + " " + data[i].CNT +" 건 <br>"; 
					sum += data[i].CNT*1;					
				}
				$("#custMn_etcnt").html(txt);
				$("#custMn_sumcnt").html("상담 민원 총 "+sum+"건");
			}
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}			
	});
}