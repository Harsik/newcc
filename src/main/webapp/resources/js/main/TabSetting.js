var usrId = window.sessionStorage.getItem("USR_ID");

function toSTRING(str) {
	if (str != null) {
		return str.toString()
	} else {
		return 0
	}
}

function addelTab(id) {
	var tabli = 'a[href="#' + id + '"]';// 'a[href="#divRCTabSearch"]'
	if ($(tabli).parent('li').index() < 0) {
		var tabtx = '<li><a href="#' + id + '">' + tab_IdtoName(id)	+ '</a></li>';
		$("#" + id).css("display", "block");
		$("#tabLi").append(tabtx);
		rtabs.tabs("refresh");
		$('a[href="#'+id+'"]').trigger("click");
		if (id == "divRCTabMessage") {editerCall();}
	
	} else {
		$("#" + id).css("display", "none");
		$(tabli).parent('li').remove();
		rtabs.tabs("refresh");
	}
}
function initTapEvent() {
	$("#btn_tabSearch").on("click", function(e) {
		addelTab("divRCTabSearch")
	});
	$("#btn_tabCnslList").on("click", function(e) {
		addelTab("divRCTabCnslList")
	});
	$("#btn_tabSMSList").on("click", function(e) {
		addelTab("divRCTabSMSList")
	});
	/*$("#btn_tabEmrgncyInfo").on("click", function(e) {
		addelTab("divRCTabEmrgncyInfo")
	});*/
	$("#btn_tabMessage").on("click", function(e) {
		addelTab("divRCTabMessage")
	});
	$("#btn_tabHappyCall").on("click", function(e) {
		addelTab("divRCTabHappyCall")
	});
	$("#btn_tabCnsSms").on("click", function(e) {
		addelTab("divRCTabCnsSms")
	});
}
function openTabsetting() {	
	$("#tabSetting").css("display","block");
	$("#tabSetting").dialog({
		width : 300,
		height : 200,
		autoOpen : false,
		show: {effect: 'blind', duration: 300},
		hide: {effect: 'fade', duration: 300},
		modal : true,
		closeOnEscape : true,
		buttons : {
			'저장' : function() {
				saveTabs();
				$(this).dialog('close');
			}
		}
	});

	$("#btn_tabSetting").click(function() {
		$("#tabSetting").dialog("open");
	});
	
	$("#btn_tabSearch").button();
	$("#btn_tabCnslList").button();
	$("#btn_tabSMSList").button();
	$("#btn_tabMessage").button();
	$("#btn_tabHappyCall").button();
	$("#btn_tabCnsSms").button();

}



$(document).ready(function() {
	initTapEvent();
	openTabsetting();
});
