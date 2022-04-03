
$(document).ready(function(){
		
	$.ajax({
		type : "post",
		dataType: "json",
		async : false,
		url : "/ajax/civilservice/cswVocDetail.do",
		data : "pJson=" + getVocDetail(),
		success : function(data) {			
			// param값을 JSON으로 파싱	
			
			$.each(data, function(key, state) {
				
				$("#trnr_rqs_dtm_d").html(state.TRNR_RQS_DTM);
				$("#rqs_usr_nm_d").html(state.RQS_USR_NM);
				$("#ctzn_d").html(state.CTZN);
				$("#ctzn_tel_no_d").html(state.CTZN_TEL_NO);
				
				$("#org_ful_nm_d").html(state.ORG_FUL_NM);
				$("#org_usr_nm_d").html(state.ORG_USR_NM);
				
				$("#cvl_rqs_gb_nm_d").html(state.CVL_RQS_GB_NM);
				
				$("input:radio[name='rd_cvl_rslt_rcv_yn_d']").removeAttr("checked");
				$('input:radio[name=rd_cvl_rslt_rcv_yn_d]:input[value='+state.CVL_RSLT_RCV_YN+']').prop('checked', true);	// 결과수신
				
				$("#tntr_cont_d").html(state.TNTR_CONT);
				

					
			});					
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});					
});

//파라미터 셋팅 
function getVocDetail()
{
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "Y20wMzIuc2VsZWN0Vm9jRGV0YWls",
		"map" : {
			"key" : "value",			
			"tckt_id" : $("#tckt_id").val(),
			"ord" : $("#ord").val()
		}
	};
	
	return  encodeURIComponent(JSON.stringify(loParam));
}