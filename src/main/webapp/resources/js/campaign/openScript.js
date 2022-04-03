//페이지 초기화
$(document).ready(function()
{
	openScript();
});

function openScript()
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/campaign/cmpgScript.do",
		data : "pJson=" + getJsonStrCmpgScript(),
		success : function(data)
		{
			$("#cmpgScript").val(data.CMPG_DSC);
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

//스크립트 불러오기
function getJsonStrCmpgScript()
{
	var loParam = {
		"qt" : "c2VsZWN0T25l",
		"mi" : "Y20wMTAuc2VsZWN0",
		"map" : {
			"key" : "value",
			"cmpg_id" : window.sessionStorage.getItem("campaignId")
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}