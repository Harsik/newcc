// 재집계버튼 클릭 이벤트
function btnStatRun_clickEvent()
{
	if($("#txtStatStrtDt").val().replace(/-/gi, "") > $("#txtStatEndDt").val().replace(/-/gi, ""))
	{
		alert("시작일자는 종료일자보다 이전이어야 합니다.");
		return;
	}
	
	//$("#btnStatRun").html("집계중");
	$("#btnStatRun").prop("disabled", true);
	
	var strtDate = $("#txtStatStrtDt").val();
	var endDate = $("#txtStatEndDt").val();
	var pList = [];
	
	while(strtDate <= endDate)
	{
		pList.push({"qt" : "aW5zZXJ0",
			"mi" : "c3QwMTIucmVjb3VudFN0YXQ=",
			"map":	{
				 "wrk_dt" : strtDate.replace(/-/gi, "")
			}
		});
		
		var nxDate = new Date(strtDate);
		nxDate.setDate(nxDate.getDate() + 1);
		strtDate = dateFormat(changeDateString(nxDate));
	}
	
	$.ajax({
		type : "post",
		dataType : "json",
		async : false,
		timeout : 2 * 60 * 60 * 1000, //2 hours,
		url : getContextPath() + "/ajax/management/RecountStat.do",
		data : "pJson=" + getJsonStr("YmF0Y2g=",null, pList),
		success : function(data)
		{
			alert("통계 재 집계가 완료 되었습니다.");
			
			$("#btnStatRun").html("재집계");
			$("#btnStatRun").prop("disabled", false);
		},
		error : function(data, status, err) 
		{
			networkErrorHandler(data, status, err);
		}
	});
}

//페이지 초기화
$(document).ready(function()
{
	datePicker("#txtStatStrtDt");
	datePicker("#txtStatEndDt");
	
	$("#txtStatStrtDt").val(getDate());
	$("#txtStatEndDt").val(getDate());
	
	// 재집계버튼 클릭 이벤트
	$("#btnStatRun").bind("click", btnStatRun_clickEvent);
});