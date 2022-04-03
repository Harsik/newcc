var cdb_req_gb_cd = opener.opener.cdb_req_gb_cd;
var nowProcessStats_Se = opener.opener.nowProcessStats_Se;

// 등록버튼 클릭 이벤트
function btnInsert_clickEvent(tbbs_id) {
	if($("#csdbpr_popupCtns").val().trim()==""){
		alert("내용을 입력해주세요.");
		$("#csdbpr_popupCtns").focus();
		return false;
	}
	
	if(news=="y"){
		opener.opener.$("#csdbpr_chargerTblTbbsid").val(tbbsId);
		opener.opener.hisTbbs_id2="all";
	}
	opener.opener.$("#csdbpr_chargerJobProcessCtns").val($("#csdbpr_popupCtns").val()); //process
	opener.opener.clickProcessStats_Se="030100"; //처리완료
	window.close(); //popup
	opener.initSaveAfterEvent();
	opener.window.close(); //regist
	
    if((cdb_req_gb_cd == "010100" && nowProcessStats_Se=="010200") || (cdb_req_gb_cd == "010100" && nowProcessStats_Se=="020100") || (cdb_req_gb_cd == "010100" && nowProcessStats_Se=="020300")){
    	//신규
    	alert("등록요청 되었습니다.\n콜센터에서 확인 후 최종 승인하여야\n상담DB조회 화면에서 검색됩니다.");
    }else if((cdb_req_gb_cd == "020100" && nowProcessStats_Se=="010200") || (cdb_req_gb_cd == "020100" && nowProcessStats_Se=="020100") || (cdb_req_gb_cd == "020100" && nowProcessStats_Se=="020300")){
		//수정
    	alert("수정요청 되었습니다.\n콜센터에서 확인 후 최종 승인하여야\n상담DB조회 화면에서 검색됩니다.");
    }else if((cdb_req_gb_cd == "030100" && nowProcessStats_Se=="010200") || (cdb_req_gb_cd == "030100" && nowProcessStats_Se=="020100") || (cdb_req_gb_cd == "030100" && nowProcessStats_Se=="020300")){
		//삭제
    	alert("삭제요청 되었습니다.\n콜센터에서 확인 후 최종 승인하여야\n상담DB조회 화면에서 제외됩니다.");
    }else{
    	alert("등록요청 되었습니다.\n콜센터에서 확인 후 최종 승인하여야합니다.");
    }
}

// 취소버튼 클릭이벤트
function btnCancel_clickEvent() {
	window.close();
	if(news=="N"){
		opener.window.close();
	}
}

// Init page
$(document).ready(function() {
	if(opener.$("#csdbrg_optUseYN").val()=="N"){
		$("#h1").text("삭제사유를 입력해주세요");
		$('#csdbpr_popupCtns').attr('placeholder','삭제사유를 입력해주세요');
		$("#insertBtn").text("삭제요청");
	}
	
	$(window).bind("beforeunload", function (e){
		if(news=="N"){
			opener.window.close();
		}else{
			window.close();
		}
	});
		
	// 등록 버튼 클릭 이벤트 등록
	$("#insertBtn").bind("click", btnInsert_clickEvent);
	// 취소 버튼 클릭 이벤트 등록
	$("#cancleBtn").bind("click", btnCancel_clickEvent);
});