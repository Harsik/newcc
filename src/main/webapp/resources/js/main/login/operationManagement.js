var temDate ="";

function getJsonStroperMnUserImg(usrid){
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

function getJsonStroperMnUserCnt(){
	var loParam = {
			"qt" : "c2VsZWN0",
			"mi" : "Y2gwMDEuY25zQ291bnRpbmc=",
			"map" : {
				"key" : "value",
				"crt_dt" : temDate
			}
		};
		
		console.log(JSON.stringify(loParam));
		return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));	
}

function getJsonStroperMnTypeCnt(usrid){
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
function initoperationManagement(){
	var today = new Date();
	var day = today.getDay();
	if(day!=1){
		temDate = getPrevDate("1").replace(/-/gi,"");
	}else{
		temDate = getPrevDate("3").replace(/-/gi,"");
	}
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/main/userCheck.do",
		data : "pJson=" + getJsonStroperMnUserCnt(),
		success : function(data) {
			if(data!=null){
			var bestid = data.USR_ID;
			$.ajax({
				type : "post",
				dataType: "json",
				async : true,
				url : getContextPath() + "/ajax/login/userImg.do",
				data : "pJson=" + getJsonStroperMnUserImg(bestid),
				success : function(data) {
					if(data!=null){
						$("#operMn_usr_nm").html(data.USR_NM);
						if(data.SVRFL_PTH != undefined)
						$("#operMn_img_face").attr("src", getImgUrl() + replaceFileUrl(data.SVRFL_PTH));
						//else
						//$("#operMn_img_face").attr("src", "<c:url value='/resources/images/counselor.jpg'/>");
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
				data : "pJson=" + getJsonStroperMnTypeCnt(bestid),
				success : function(data) {
					if(data!=""){
					var sum = 0;
					var txt = "";
						for(var i=0;i<data.length;i++){
							txt += data[i].TYPE_NM + " " + data[i].CNT +" 건 <br>"; 
							sum += data[i].CNT*1;					
						}
						$("#operMn_etcnt").html(txt);
						$("#operMn_sumcnt").html("상담 민원 총 "+sum+"건");
					}
				},
				error : function(data, status, err) {
					networkErrorHandler(data, status, err);
				}			
			});
		}
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}