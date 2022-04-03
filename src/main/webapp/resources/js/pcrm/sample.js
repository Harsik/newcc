var isinitdivStatMapViewTab = false;
var isinitdivStatKeywordTab = false;
var isinitdivStatTypeTrendTab = false;
var isinitdivStatKeywordSummTab = false;
var isinitdivStatCounselTypeTab = false;

$(document).ready(function(){
	
	$(".tabContent").hide();
	$("#sidebar li:first").addClass("active").show();
	$(".tabContent:first").show();

	$('#sidebar li').on('click', function () {

        $("#sidebar li").removeClass("active");
        $(this).addClass("active");
        $(".tabContent").hide();

        var activeTab = $(this).find("a").attr("href");
        initTabs(activeTab);
        return false;
    });
	
	initTabs("#statMapView");
	
});


function initTabs(id){
	$(id).show();
	switch(id){
	case "#statMapView":
		if(isinitdivStatMapViewTab == false){ initdivStatMapViewTab(); isinitdivStatMapViewTab=true;}
		break;
	case "#statKeyword":
		if(isinitdivStatKeywordTab == false){ initdivStatKeywordTab(); isinitdivStatKeywordTab=true;}
		break;
	case "#statTypeTrend":
		if(isinitdivStatTypeTrendTab == false){ initdivStatTypeTrendTab(); isinitdivStatTypeTrendTab=true;}
		break;
	case "#statKeywordSumm":
		if(isinitdivStatKeywordSummTab == false){ initdivStatKeywordSummTab(); isinitdivStatKeywordSummTab=true;}
		break;
	case "#statCounselType":
		if(isinitdivStatCounselTypeTab == false){ initdivStatCounselTypeTab(); isinitdivStatCounselTypeTab=true;}
		break;
	}
}


/*
 * selectbox change 함수
 */
function fnChangeTerm(id) {
	// keywordSumm
    var termType = $("#"+id+"OptTerm").val();
    
    
    if(termType == "year") {
        $("#"+id+"dvYear").show();
        $("#"+id+"dvMonth").hide();
        $("#"+id+"dvWeek").hide();
        $("#"+id+"dvDay").hide();
    }
    else if(termType == "month") {
        $("#"+id+"dvYear").hide();
        $("#"+id+"dvMonth").show();
        $("#"+id+"dvWeek").hide();
        $("#"+id+"dvDay").hide();
    }
    else if(termType == "day") {
        $("#"+id+"dvYear").hide();
        $("#"+id+"dvMonth").hide();
        $("#"+id+"dvWeek").hide();
        $("#"+id+"dvDay").show();
    }
    else if(termType == "week") {
        $("#"+id+"dvYear").hide();
        $("#"+id+"dvMonth").hide();
        $("#"+id+"dvWeek").show();
        $("#"+id+"dvDay").hide();
    }
    
}
