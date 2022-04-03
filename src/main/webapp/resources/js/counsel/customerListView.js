//파라미터 셋팅_CustCntctInfmView
function getJsonStrCustCntctInfmView()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMDMuZ2V0Q3VzdEluZm9WaWV3",
		"map" : {
			"key" : "value",
			"phonenum" : window.sessionStorage.getItem("phonenum_view")
		}
	};
	
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

$(document).ready(function()
{
	$("#tblCustList").jqGrid({
		url : getContextPath() + "/ajax/counsel/getCustListView.do",
		datatype : "json",
		mtype : "POST",
		postData : {
			pJson : getJsonStrCustCntctInfmView()
		},
		jsonReader :
		{
			repeatitems: false
		},
		colNames : [ "민원인명", "회사/부서", "핸드폰번호", "집전화번호", "식별번호", "주소일련번호"],
		colModel : 
		[
            { name : "OWNER_NM", align : "center" },
            { name : "ADDRESS_NM", align : "center" },
            { name : "HTEL_NO", align : "center" },
            { name : "TEL_NO", align : "center" },
            { name : "FARM_UNIQUE_NO", align : "center" },
            { name : "ADDRESS_NO", align : "center" }
		],
		sortname : "OWNER_NM",
		sortorder : "asc",
		scroll : true,
		gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	height : "200",
	   	width : "100%",
	   	rowNum : "100000",
	   	autowidth : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords : true,
	   	ondblClickRow : function(rowid)
	   	{
	   		var row = $("#tblCustList").getRowData(rowid);
	   		
	   		opener.parent.setCustInfoFromView(row.OWNER_NM, row.ADDRESS_NM, row.HTEL_NO, row.TEL_NO, row.FARM_UNIQUE_NO, row.ADDRESS_NO);
			self.close();
	   	}
	});
});