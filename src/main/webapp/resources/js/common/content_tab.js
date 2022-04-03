var TabObject = {};
var orderTab = [];
var swapTab = [];
var usrId = window.sessionStorage.getItem("USR_ID");
var overidx;
var rtabs = {};
var isinitSearch = false;
var isinitCnslList = false;
var isinitSMSList = false;
var isinitEmrgncyInfo = false;
var isinitMessage = false;
var isinitHappyCall = false;
var isinitCnsSms = false;
var isinitSample = false;

function getJsonUpdateTab(tab_order) {
	var loParam = {
		"qt" : "dXBkYXRl",
		"mi" : "b20wMDEudXBkYXRlVGFiT3JkZXI=",
		"map" : {
			"key" : "value",
			"usr_id" : usrId,
			"tab_order" : tab_order
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function getJsonStrTab() {
	var loParam = {
		"qt" : "c2VsZWN0TGlzdA==",
		"mi" : "b20wMDEuc2VsZWN0VGFiT3JkZXI=",//om001.selectTabOrder
		"map" : {
			"key" : "value",
			"usr_id" : usrId
		}
	};
	console.log(JSON.stringify(loParam));
	return encodeURIComponent(encodeURIComponent(JSON.stringify(loParam)));
}

function tab_IdtoName(id) {
	switch (id) {
	case "divRCTabSearch":
		return "지식검색"
		break;
	case "divRCTabCnslList":
		return "상담이력"
		break;
	case "divRCTabSMSList":
		return "SMS이력"
		break;
	case "divRCTabEmrgncyInfo":
		return "긴급정보"
		break;
	case "divRCTabMessage":
		return "쪽지"
		break;
	case "divRCTabHappyCall":
		return "해피콜"
		break;
	case "divRCTabCnsSms":
		return "문자상담"
		break;
	case "divRCTabSample":
		return "영상상담"
		break;
	}
}

function saveTabs() {
	var order = "";

	for (var i = 0; i < $("#tabLi").children().children().length; i++) {
		order += $("#tabLi").children().children().eq(i).attr("href").replace("#", "") + ",";
	}
	order = order.substr(0, order.length - 1);

	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/main/contentTab.do",
		data : "pJson=" + getJsonUpdateTab(order),
		success : function(data) {
		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});
}

function initTabs(id) {
	switch (id) {
	case "divRCTabSearch":
		if (isinitSearch == false) {
			initdivRCTabSearch();
			isinitSearch = true;
		}
		break;
	case "divRCTabCnslList":
		if (isinitCnslList == false) {
			initdivRCTabCnslList();
			isinitCnslList = true;
		}
		break;
	case "divRCTabSMSList":
		if (isinitSMSList == false) {
			initdivRCTabSMSList();
			isinitSMSList = true;
		}
		break;
	case "divRCTabEmrgncyInfo":
		if (isinitEmrgncyInfo == false) {
			initdivRCTabEmrgncyInfo();
			isinitEmrgncyInfo = true;
		}
		break;
	case "divRCTabMessage":
		if (isinitMessage == false) {
			initdivRCTabMessage();
			isinitMessage = true;
		}
		break;
	case "divRCTabHappyCall":
		if (isinitHappyCall == false) {
			initdivRCTabHappyCall();
			isinitHappyCall = true;
		}
		break;
	case "divRCTabCnsSms":
		if (isinitCnsSms == false) {
			initdivRCTabCnsSms();
			isinitCnsSms = true;
		}
		break;
	case "divRCTabSample":
		if (isinitSample == false) {
			initdivRCTabSample();
			isinitSample = true;
		}
		break;
	}
}

function modicss() {
	$(".kmain_tbl_tab ui-tabs-panel ui-corner-bottom ui-widget-content").css("padding", "0px");
	$(".ui-tabs .ui-tabs-nav").css("min-height", "30px");
	$(".ui-tabs .ui-tabs-panel").css("padding", "0.5em 0.5em"); // 탭과 위젯 크기 수정
	$("#selMainActtypecd").parent('td').css("padding", "2px 0px 2px 3px"); //receipt_info.jsp 민원접수 - 처리유형  수정 
	$("#divRCTabCnslList").find("#search2").css("margin-bottom", "5px");
	$("#divRCTabEmrgncyInfo").find("#search2").css("margin-bottom", "5px");
	$("#divRCTabEmrgncyInfo").find("#item_type").css("margin-bottom", "80px");//emrgncyinfo.jsp id가 item_type인 div가 2개라 밑에 있는 div의 id를 item_type2로 수정
	//$("#divRCTabHappyCall").find("#cmpntable").css("margin-bottom","15px");
}

function initcontenttab() {
	$(".r-contents").css("height", $(".l-contents").height());

	$.ajax({
		type : "post",
		dataType : "json",
		async : true,
		url : getContextPath() + "/ajax/main/contentTab.do",
		data : "pJson=" + getJsonStrTab(),
		success : function(data) {
			orderTab = data;

			//orderTab안에 있는 Tab의 jsp를 보이도록
			for ( var i in orderTab) {
				var txt = '<li><a href="#' + orderTab[i].EXT2_CD + '">' + orderTab[i].CD_NM + '</a></li>';
				$("#" + orderTab[i].EXT2_CD).css("display", "block");
				$("#tabLi").append(txt);
			}
			rtabs = $("#divRContentTab").tabs();

			rtabs.tabs({
				activate : function(event, ui) {
					var id = ui.newPanel.attr('id');
					initTabs(id);
				}
			});
			var id = orderTab[0].EXT2_CD;
			initTabs(id);

			//탭 드래그 정렬 가능

			rtabs.find(".ui-tabs-nav").sortable({
				axis : "x",
				stop : function() {
					rtabs.tabs("refresh");
				}
			});

			//sortable 설정 불러오기
			var tabSortable = window.localStorage.getItem("tabSortable");
			if (tabSortable == "on") {
				$(".ui-tabs-nav").sortable("enable");
				$("#btn_tabLocked").attr("src", "/resources/images/unlocked.png");
			} else if (tabSortable == "off") {
				$(".ui-tabs-nav").sortable("disable");
				$("#btn_tabLocked").attr("src", "/resources/images/locked.png");
			} else {
				$(".ui-tabs-nav").sortable("disable");
				$("#btn_tabLocked").attr("src", "/resources/images/locked.png");
			}

			modicss();

		},
		error : function(data, status, err) {
			networkErrorHandler(data, status, err);
		}
	});

	$("#btn_tabLocked").click(function(e) {
		var tabSortable = window.localStorage.getItem("tabSortable");
		if (tabSortable == "off") {
			$(".ui-tabs-nav").sortable("enable");
			window.localStorage.setItem("tabSortable", "on");
			$("#btn_tabLocked").attr("src", "/resources/images/unlocked.png");
		} else {
			$(".ui-tabs-nav").sortable("disable");
			window.localStorage.setItem("tabSortable", "off");
			$("#btn_tabLocked").attr("src", "/resources/images/locked.png");
			saveTabs();
		}
	});
	$("#divRContentTab").css("height", $(".l-contents").height() - 2.93 * 2 - 1 * 2);//메인 우측 높이 = 메인 좌측 높이 - 우측 패딩 위아래 - 우측 보더 위아래
}