function cbExcelUpload()
{
	$.ajax({
		type : "post",
		dataType: "json",
		async : true,
		url : getContextPath() + "/ajax/campaign/cmpgCustScntUpdate.do",
		data : "pJson=" + getJsonStr("dXBkYXRl","Y20wMTIudXBkYXRlQ3VzdFNjbnQ=",{
			 "cmpg_id" : opener.getCmpgId()
		}),
		success : function(data) {				
			alert("엑셀 업로드가 완료되었습니다.");
			opener.btnSearch_7_clickEvent();
			window.close();
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

function btnXLUpload_clickEvent()
{
	gAppendHidden("frm1", "CALLBACK", "cbExcelUpload");
	gAppendHidden("frm1", "COLUMN_NAME", "cmpg_id,selt_usr_id");
	gAppendHidden("frm1", "COLUMN_VALUE", opener.getCmpgId() + "," + window.sessionStorage.getItem("USR_ID"));
	gAppendHidden("frm1", "MAPPER_NAME", "cm012");
	gAppendHidden("frm1", "SERVICE_NAME", "insertXLFile");	
	gAppendHidden("frm1", "HEADER_NAME", "row,col");
	gAppendHidden("frm1", "HEADER_COUNT", "1,0");	
	gSubmitPost("frm1", true);
}

function initEvent()
{
    $("#btnXLUpload").bind("click", btnXLUpload_clickEvent);
}

$(function()
{
	initEvent();
});
