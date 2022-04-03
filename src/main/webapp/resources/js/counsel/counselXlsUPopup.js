function cbExcelUpload(data)
{ 

	this.close();
}

function btnXLUpload_clickEvent()
{
	if($("#xlFile").val() == "")
	{
		alert("엑셀 파일을 선택해 주세요!");
		return;
	}
	else
	{
		var ext = $('#xlFile').val().split('.').pop().toLowerCase();
	      if($.inArray(ext, ['xls','xlsx']) == -1) {
	    	  alert('확장자 '+ext+' 파일입니다. \n\n 엑셀 파일만 업로드 할 수 있습니다.');
	    	  return;
	      }
	}
	
	
	gAppendHidden("frm1", "callback", "cbExcelUpload");
	gAppendHidden("frm1", "COLUMN_NAME", "login_usr_id");
	gAppendHidden("frm1", "COLUMN_VALUE", window.sessionStorage.getItem("USR_ID"));
	gAppendHidden("frm1", "MAPPER_NAME", "ch009");
	gAppendHidden("frm1", "SERVICE_NAME", "counselXls");
	gAppendHidden("frm1", "HEADER_NAME", "hh");
	gAppendHidden("frm1", "HEADER_COUNT", "1,15");
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