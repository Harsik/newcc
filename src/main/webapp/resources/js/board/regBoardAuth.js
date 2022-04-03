//선택된 권한을 저장한 배열
var deptArr = [];

//파라미터 셋팅 AuthList
function getJsonStrAuthList(usrGrdCd) {
	var loParam = {
			"qt" :	"c2VsZWN0TGlzdA==",
			"mi" : "c20wMDIuYXV0aExpc3Q=",
			"map" : {
				"key" : "value",
				"usr_grd_cd" : usrGrdCd
			}
	};	
	console.log(JSON.stringify(loParam));
	return  encodeURIComponent(JSON.stringify(loParam));
}

//권한 등록버튼 클릭이벤트
function btnInsertAuthClickEvent() {
	setReturnValue(deptArr);
	
	window.returnValue = deptArr;
	window.close();
}

//초기화버튼 이벤트
function btnInitAuthClickEvent() {
	deptArr = [];
	$("#deptList").jstree("deselect_all");
}

$(document).ready(function() {
	//저장된 권한부서 배열
	getDialogArguments();
	var arr = window.dialogArguments;
	var usrGrdCd = window.sessionStorage.getItem("USR_GRD_CD");
	
	$.ajax({
		type : "post",
		async : true,
		url : getContextPath() + "/ajax/board/authList.do",
		data : "pJson=" + getJsonStrAuthList(usrGrdCd),
		success : function(data) {
		    	
			$("#deptList").html("");
			$("#deptList").jstree({ 
//				"core" : { "data": JSON.parse(data) },
				"core" : { "data": JSON.parse(data.toLowerCase()) },
				"checkbox" : {
					"keep_selected_style" : false
				},
				"plugins" : [ "checkbox", "search" ]
			
			}).on("loaded.jstree", function() {
			    $(this).jstree('open_all');
			    
			    //부모창으로부터 받은 ID 트리에 셋팅
			    if(arr != null && arr.length >= 0) {
				    for(var i = 0; i <arr.length; i++) {
				    	$("#deptList").jstree("select_node", "#" + arr[i]);
				    }
			    }
			});
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
	
	//트리 검색 설정
	var to = false;
	$("#tfSrchVal").keyup(function() {
		if(to) { 
			clearTimeout(to); 
		}
		to = setTimeout(function () {
			var v = $("#tfSrchVal").val();
			$("#deptList").jstree(true).search(v);
		}, 250);
	});
	
	//트리 선택변경 이벤트
	$("#deptList").bind("changed.jstree", function() {
		deptArr = $(this).jstree("get_selected");
	});
	
	//권한등록버튼 클릭이벤트 등록
	$("#btnInsertAuth").bind("click", btnInsertAuthClickEvent);
	//초기화버튼 클릭이벤트 등록
	$("#btnInitAuth").bind("click", btnInitAuthClickEvent);
});