function btnWaterInit_clickEvent(){
	$("#csWater_chk_chenap,#csWater_chk_junggi").prop("checked", false);
	$("#csWater_summ_junggi,#csWater_summ_chenap,#csWater_summ_totMney").html("");
	$("#cswter_tblWaterList").clearGridData();
	$("#cvsvif_mkey").val("");
	$("#csWater_tbl").find("label").text("");
}

function suyonggaSearchPopup(){
	var width = 1100;
	var height = 740;
	
	var top = ((screen.height - height) / 2) / 2;
	var left = (screen.width - width) / 2;

	var paramURL = getContextPath() + "/web/civilservice/csWaterSearch.do";
	var newWindow = window.open(paramURL, "수용가번호찾기", "resizable");
	
	newWindow.moveTo(left, top);
	newWindow.resizeTo(width,height);
	newWindow.focus();
}

function btnWaterSMS_clickEvent(){
	var width = "500";
	var height = "180";
	
	var left = Math.ceil((window.screen.width - width)/2);
	var top = Math.ceil((window.screen.height - height)/2);
	
	window.sessionStorage.setItem("SMS_CD", "csWater");
	
	var newWindow = window.open("", "csSmsSend", "resizable");
	newWindow.resizeTo("500","401");
	newWindow.moveTo(left, top);
	newWindow.focus();
	
	document.csWater_Smsform.target ="csSmsSend"; 
	document.csWater_Smsform.action="/web/civilservice/csSmsSend.do"; 
	document.csWater_Smsform.submit();
}

function fnBtnCsWaterList(){
	$("#csWater_chk_chenap,#csWater_chk_junggi").prop("checked", false);
	$("#cswter_tblWaterList").clearGridData();
	$("#csWater_tbl").find("label").text("");
	
	var fsuy_no = $("#cvsvif_mkey").val().replace(/[-, :, \s]/g, ""); //수용가번호(외부처리용)
	var suy_no 	= ""; //수용가번호(내부연계처리용)
	
	// step01 : 수용가 기본정보
	$.ajax({
        type : "post",
        dataType: "json",
        async : true,
        url : getContextPath() + "/ajax/counsel/csWaterSuyonga.do",
        data : "pJson=" + getJsonStr("c2VsZWN0T25l", "bG9jYWxfc3Vkby5iYXNpY0luZm8=", { "fsuy_no" : fsuy_no }),
        success : function(data1)
        {
            console.log(">>>> step01 result : " + JSON.stringify(data1));
            
            if(data1 != null){
                $("#suyNm").html(data1.SUY_NAME1);    //성명/상호
                $("#syuNo").html(data1.FSUYNO);       //수용가번호
                $("#eSuyNo").html(data1.ESUYNO);      //전자수용가번호
                $("#newAddr").html(data1.SUY_ADDR2);  //신주소
                $("#oldAddr").html(data1.SUY_ADDR1);  //구주소
                
                suy_no = data1.SUY_NO;
                
                // step02 : 가상계좌 정보
                $.ajax({
                    type : "post",
                    dataType: "json",
                    async : true,
                    url : getContextPath() + "/ajax/counsel/csWaterAccount.do",
                    data : "pJson=" + getJsonStr("c2VsZWN0TGlzdA==", "bG9jYWxfc3Vkby5hY2NvdW50SW5mbw==", { "suy_no" : suy_no }),
                    success : function(data2)
                    {
                        console.log(">>>> step02 result : " + JSON.stringify(data2));
                        
                        $.each(data2 , function(i){
                        	$("#account"+i).html("(" + data2[i].BANKNAME + ") " + fnWaterAccountFmtter(data2[i].DPSTNUM));
                        	$("#csWater_account"+i).val(fnWaterAccountFmtter(data2[i].DPSTNUM));
                        });
                        
                        // step03 : 체납액 정보
                        $.ajax({
                            type : "post",
                            dataType: "json",
                            async : true,
                            url : getContextPath() + "/ajax/counsel/csWaterChenab.do",
                            data : "pJson=" + getJsonStr("c2VsZWN0T25l", "bG9jYWxfc3Vkby5ub3RwYXlJbmZv", { "suy_no" : suy_no }),
                            success : function(data3)
                            {
                                console.log(">>>> step03 result : " + JSON.stringify(data3));
                                
                                $("#unPaid").html(numberFormat(data3.TOTAL));
                                $("#csWater_summ_junggi").html(data3.JUNGGI);
                                $("#csWater_summ_chenap").html(data3.CHENAP);
                                $("#csWater_summ_totMney").html("0");
                                
                            },
                    		error : function(data3, status, err)
                    	    {
                    	        alert("data3 ERROR !!!! ");
                    	    }
                    	});
                        
                    },
            		error : function(data2, status, err)
            	    {
            	        alert("data2 ERROR !!!! ");
            	    }
            	}); 
                
                $("#cswter_tblWaterList").jqGrid("setGridParam", {
                	datatype : "json",
                	postData : {pJson : getJsonStr("c2VsZWN0TGlzdA==", "bG9jYWxfc3Vkby5nb2ppTGlzdA==", { "suy_no" : suy_no })} , 
                	page : 1, sortname : "GOJIMON", sortorder : "desc"
                }).trigger("reloadGrid");
            }
            
        },
		error : function(data1, status, err)
	    {
	        alert("data1 ERROR !!!! ");
	    }
	});    
}

// 상하수도 계좌 포맷 - 1: 농협, 9:광주
function fnWaterAccountFmtter(num){
	
	if(num != null || num != ""){
		if(num.charAt(0) == "1"){ // 농협
			num = num.slice(0,6) + "-" + num.slice(6,8) + "-" + num.slice(8);
		}else if(num.charAt(0) == "9"){	// 광주
			num = num.slice(0,3) + "-" + num.slice(3,6) + "-" + num.slice(6);
		}else{
			num = "";
		}
	}else{
		num = "";
	}
	
	return num;
}

function fnCurrencyFmtter(cellvalue, options, rowObject) {
    
    return changeNumberFormat(String(cellvalue));
}


function initdivWaterTab(){
	
	// 상수도 누적정보
	$("#cswter_tblWaterList").jqGrid(
	{
		url : getContextPath() + "/jqgrid/civilservice/csWaterAccrueList.do",
		datatype : "local",
		mtype : "POST",
		colNames : 
		[	"고지년월", "검침일자", "지침", "사용량", "상수도", "하수도", "지하수", "물이용부담금", 
			"납기내", "납기후", "수납일", "납기마감일", "수납종류", "사용기간",
			"구경", "상수도업종", "하수도업종", "지하수업종", "상수세대수", "상수도조정", "하수도조정", "지하수조정", "전월지침"
		],
		colModel :
		[
			{ name : "고지년월"	, index : "고지년월"	, align : "center", width : 100 },                  //고지년월 : GOJIYM
			{ name : "검침일자"	, index : "검침일자"	, align : "center", width : 100 },                  //검침일자 : NOWGUMDATE
			{ name : "지침"		, index : "지침" 		, align : "right" , width : 80 , formatter:fnCurrencyFmtter },  //지침 : NOWGUMCHIM
			{ name : "사용량"    	, index : "사용량"    , align : "right" , width : 100 , formatter:fnCurrencyFmtter },  //사용량 : NOWUSED
		    { name : "상수도"   	, index : "상수도"   	, align : "right" , width : 100, formatter:fnCurrencyFmtter },  //상수도 : SNABGUM
		    { name : "하수도"   	, index : "하수도"   	, align : "right" , width : 100, formatter:fnCurrencyFmtter },  //하수도 : HNABGUM
		    { name : "지하수"   	, index : "지하수"   	, align : "right" , width : 100, formatter:fnCurrencyFmtter },  //지하수 : JNABGUM
		    { name : "물이용부담금" , index : "물이용부담금", align : "right" , width : 110, formatter:fnCurrencyFmtter },  //물이용부담금 : WBNABGUM
		    { name : "납기내금액"  , index : "납기내금액" , align : "right" , width : 100, formatter:fnCurrencyFmtter },  //납기내 : BEFORE
		    { name : "납기후금액"  , index : "납기후금액" , align : "right" , width : 100, formatter:fnCurrencyFmtter },  //납기후 : AFTER
		    { name : "수납일"  	, index : "수납일"	, align : "center", width : 100, },  				//수납일 : SUNABDATE
		    { name : "납기마감일"  , index : "납기마감일" , align : "center", width : 100 },                  //납기마감일 : NABGIDATE
		    { name : "수납종류" 	, index : "수납종류"	, align : "center", width : 130 },                   //수납종류 : OCRCODE_NM
		    { name : "사용기간" 	, index : "사용기간" 	, align : "center", width : 80, hidden:true },   //사용기간 : ICHECODE_NM
		    { name : "구경" 		, index : "구경" 		, align : "center", width : 80, hidden:true },   //구경 : SGUNAME
		    { name : "상수도업종" 	, index : "상수도업종" , align : "center", width : 80, hidden:true },   //상수도업종 : SUPNAME
		    { name : "하수도업종" 	, index : "하수도업종" , align : "center", width : 80, hidden:true },   //하수도업종 : HUPNAME
		    { name : "지하수업종" 	, index : "지하수업종" , align : "center", width : 80, hidden:true },   //지하수업종 : JUPNAME
		    { name : "상수세대수" 	, index : "상수세대수" , align : "center", width : 80, hidden:true },   //상수세대수 : SGAGUSU
		    { name : "상수도조정" 	, index : "상수도조정" , align : "center", width : 80, hidden:true },   //상수도조정 : SJONAME
		    { name : "하수도조정" 	, index : "하수도조정" , align : "center", width : 80, hidden:true },   //하수도조정 : HJONAME
		    { name : "지하수조정" 	, index : "지하수조정" , align : "center", width : 80, hidden:true },   //지하수조정 : JJONAME
		    { name : "전월지침" 	, index : "전월지침" 	, align : "center", width : 80, hidden:true, formatter:fnCurrencyFmtter },   //전월지침 : BEFCHIM
	    ],
	    sortname : "TYYMM",
	    sortorder : "DESC",
	    gridview : true,
	   	hidegrid : false,
	   	shrinkToFit : true,
	   	loadonce : false,
	   	scrollOffset : 0,
	    height : "485px",
	    width : "100%",
	   	rowNum : 21,
	   	rowList : [10, 20, 30, 50, 100],
	   	autowidth : true,
	   	pager : "#cswter_pg",
	   	rownumbers : true,
	   	rownumWidth : 30,
	   	multiselect : false,
	   	emptyrecords : "",
	   	caption : "",
	   	loadui : "enable",
	   	viewrecords: true,
	    onSelectRow : function ( rowid ) {
	    	// 기존 테이블 초기화
	    	$("#sangsuUp,#hasuUp,#jihaUp").html("");
	    	$("#gugCode,#sJojungCd,#hJojungCd,#jJojungCd").html("");
	    	$("#gugCode,#gaguSu,#gojiKind").html("");
	    	$("#usagePeriod,#gichim,#preGichim").html("");
	    	
	    	var dataJson = $("#cswter_tblWaterList").jqGrid('getRowData', rowid);
//	    	console.log(dataJson);
	    	
//	    	$("#gyeryangNum").html("-"); //계랑기번호
	    	$("#sangsuUp").html(dataJson.상수도업종); //상수도업종
	    	$("#hasuUp").html(dataJson.하수도업종); //하수도업종
	    	$("#jihaUp").html(dataJson.지하수업종); //지하수업종
	    	$("#gugCode").html(dataJson.구경); //구경
	    	$("#sJojungCd").html(dataJson.상수도조정); //상수도조정
	    	$("#hJojungCd").html(dataJson.하수도조정); //하수도조정
	    	$("#jJojungCd").html(dataJson.지하수조정); //지하수조정
	    	$("#account").html(dataJson.가상계좌); //가상계좌
	    	$("#gaguSu").html(dataJson.상수세대수); //상수세대수
	    	$("#unPaid").html(dataJson.총미납액); //총미납액
	    	$("#gojiKind").html(dataJson.수납종류); //고지종류
	    	$("#usagePeriod").html(dataJson.사용기간); //사용기간
	    	$("#gichim").html(dataJson.지침); //당월지침
	    	$("#preGichim").html(dataJson.전월지침); //전월지침
	    },
	    loadComplete : function(status, err) {
	   		var ids = $("#cswter_tblWaterList").getDataIDs();
			$.each(ids,function(idx, rowId){
				rowData = $("#cswter_tblWaterList").getRowData(rowId);
				if(rowData.수납일 == ""){
					$("#cswter_tblWaterList #"+rowId+" td:eq(0)~").css("color","red");
				}
			});
		}
	});	
	
	
	$("#cvsvif_btn_search").bind("click", fnBtnCsWaterList);
	
	// 수용가번호 찾기 버튼 클릭이벤트
	$("#cvsvif_btn_syuNosearch").bind("click", suyonggaSearchPopup);
	
	$("#cvsvif_nm,#cvsvif_addr,#cvsvif_mkey").bind("keydown", function(key){
		if (key.keyCode == 13)
			fnBtnCsWaterList();
	});
	
	$("#cvsvif_mkey").bind("keyup", function(key){
		var regexp = /^([0-9]|-)*$/; // 숫자와 하이픈만 허용.
//		var regexp = /^([0-9])*$/; // 숫자만 허용.
		var v = $(this).val();
		if( !regexp.test(v) ) {
			$(this).val(v.replace(/[^0-9]|-/g,""));
		};
		
		var numlength = v.replace(/[^0-9]/g,"").length;
		if(numlength == 4 || numlength == 7 || numlength == 10 || numlength == 14 || numlength == 16 ){
			v += "-";
			$(this).val(v);
		} else {
			
		}
		
	});

	$("#csWater_btnSMS").on("click", btnWaterSMS_clickEvent);
	
	$("#cvsvif_btn_init").on("click", btnWaterInit_clickEvent);
	
	$("#csWater_chk_junggi,#csWater_chk_chenap").click( function() {
		clickCheckBoxSumm(this.id, this.checked, "csWater");
	});
}