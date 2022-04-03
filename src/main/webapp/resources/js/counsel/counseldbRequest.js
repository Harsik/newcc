// 조회 조건 및 조회 값
var g_usrNm = window.sessionStorage.getItem("USR_NM");
var g_usrId = window.sessionStorage.getItem("USR_ID");

var g_deptId = "";
var g_deptNm = "";
var g_orgUsrId = "";
var g_orgUsrNm = "";
var g_orgId = "";

//공지사항 next value
function getNextValue() {
	var loParam = {
			"qt" : "c2VsZWN0T25l",
			"mi" : "b20wMTUubmV4dHZhbA==",
			"map" : {}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(JSON.stringify(loParam));
}

//프로그램 상세 초기화
function initSpec()
{		
	$("#reqGbCd").val("all");
	//$("#deptId").val("");
	//$("#deptNm").val("");
	//$("#orgUsrId").val("");
	//$("#orgUsrNm").val("");
	$("#instCd").val("all");
	$("#intvLgCd").val("all");
	$("#intvMdCd").val("all");
	$("#intvSmCd").val("all");
	$("#reqCont").val("");
	$("#rtnRsn").val("");
	
	$("#reqUsrNm").val(g_usrNm);
	$("#reqUsrId").val(g_usrId);

}

//저장 및 수정 예외 처리
function checkSpec()
{
	var rMsg = "";
	
	if($("#reqGbCd").val() == "all")
		rMsg += "\n\n요청구분을 선택 해 주세요.";
//	if($("#deptNm").val() == "")
//		rMsg += "\n\n담당부서 및 담당자를 선택 해 주세요.";
	if($("#instCd").val() == "all" || $("#intvLgCd").val() == "all" || $("#intvMdCd").val() == "all" || $("#intvSmCd").val() == "all" )
		rMsg += "\n\n상담유형을 선택 해 주세요.";
	if($("#reqCont").val() == "")
		rMsg += "\n\n요청내용을 입력 해 주세요.";	
	
	return rMsg;
}

//초기화 버튼 클릭 이벤트
function btnInit_clickEvent()
{
	initSpec();
}

//프로그램 저장 버튼 클릭 이벤트
function btnUpdate_clickEvent()
{
	var rMsg = checkSpec();
	
	if(rMsg !== "")
	{
		alert(rMsg);
		return;
	}
	if(confirm("상담DB등록을 요청 하시겠습니까?"))
	{
		$.ajax({
			type : "post",
			dataType: "json",
			async : true,
			url : getContextPath() + "/ajax/counsel/counseldbNextValue.do",
			data : "pJson=" + getNextValue(),
			success : function(data)
			{		
				var cdbid = data.CDB_ID;
				
				$.ajax({
					type : "post",
					dataType: "json",
					async : true,
					url : getContextPath() + "/ajax/counsel/counseldbRequest.do",
					data : "pJson=" + getJsonStr("aW5zZXJ0","b20wMTUuaW5zZXJ0",{
						"cdb_id" : cdbid,
						"req_gb_cd" : $("#reqGbCd").val(),
						"inst_cd" : $("#instCd").val(),
						"intv_lg_cd" : $("#intvLgCd").val(),
						"intv_md_cd" : $("#intvMdCd").val(),
						"intv_sm_cd" : $("#intvSmCd").val(),
						"req_cont" : $("#reqCont").val(),
						"org_id" : $("#orgId").val(),
						"dept_id" : $("#deptId").val(),		 
						 
					}),
					success : function(data)
					{
				   		alert("요청되었습니다.");
				   		initSpec();
					},
					error : function(data, status, err) 
					{
						networkErrorHandler(data, status, err);
					}
				});				

			},
			error : function(data, status, err) 
			{
				networkErrorHandler(data, status, err);
			}
		});
	}

}

function initData()
{		
	//요청구분
	setSelectBoxWithCode("reqGbCd", "미선택", "90302", "", "", "");
	
	//요청일자
	$("#reqDt").val(getDate());
	
	//요청자
	$("#reqUsrNm").val(g_usrNm);
	$("#reqUsrId").val(g_usrId);
	
	//처리상태
	setRadioBoxWithCode("actStCd","90301", "", "","");								
	$("#actStCd").prop("disabled", true);
	
	//상담유형(기관구분) 
	setSelectBoxWithCodeIntvLgCd("instCd", "미선택", "1","","","all", "");	
	
	//담당부서, 담당자
	g_deptId = window.sessionStorage.getItem("setReqDbDeptId");
	g_deptNm = window.sessionStorage.getItem("setReqDbDetpNm");
	g_orgUsrId = window.sessionStorage.getItem("setReqDbUsrId");
	g_orgUsrNm = window.sessionStorage.getItem("setReqDbUsrNm");
	g_orgId = window.sessionStorage.getItem("setReqDbOrgId");
	
	$("#deptId").val(g_deptId);
	$("#deptNm").val(g_deptNm);
	$("#orgUsrId").val(g_orgUsrId);
	$("#orgUsrNm").val(g_orgUsrNm);
	$("#orgId").val(g_orgId);
}

// init Page
$(document).ready(function()
{		
	initSpec();
	
	initData();
	
	// 초기화 버튼 클릭 이벤트 등록
	$("#btnInit").bind("click", btnInit_clickEvent);
	
	// 저장 버튼 클릭 이벤트 등록
	$("#btnUpdate").bind("click", btnUpdate_clickEvent);
	
	// 기관구분 선택 시 이벤트
	$("#instCd").bind("change", function(e) 
	{		
		setSelectBoxWithCodeIntvLgCd("intvLgCd", "미선택", "2", "", $("#instCd").val(), "all", "");
	});
	
	// 상담유형 대분류 선택 시 이벤트
	$("#intvLgCd").bind("change", function(e)
	{
		setSelectBoxWithCodeIntvLgCd("intvMdCd", "미선택", "3", "",  $("#intvLgCd").val(), "all", "");	
	});
	
	// 상담유형 중분류 선택 시 이벤트
	$("#intvMdCd").bind("change", function(e)
	{
		setSelectBoxWithCodeIntvLgCd("intvSmCd", "미선택", "4", "", $("#intvMdCd").val(), "all", "");	
	});		
	

});