var bUSR_NM=window.sessionStorage.getItem("USR_NM");
var bUSR_ID=window.sessionStorage.getItem("USR_ID");
var now=new Date();
var nyear=now.getFullYear();
var nmon=(now.getMonth()+1) > 9 ? ""+(now.getMonth()+1) : "0"+(now.getMonth()+1);

var cDTTM = new Date();

Number.prototype.settodays=function(){ 
	return (this<10?'0'+this:this);
}

Date.prototype.getYMD = function(){ 
	return this.getFullYear()+'-'+(this.getMonth()+1).settodays()+'-'+this.getDate().settodays();
} 

/**
 * date 타입 int 변환
 * @param date
 * @returns
 */
function dateToInt(date){
	date = parseInt(new Date(date).getTime()/1000/60/60/24);
	return date;
}

/**
 * 바이로 리듬 수치 계산
 * @param totalday
 * @returns {String}
 */
function resultmyBiortyTm(totalday){
	var pis = 3.141592654; 
	var physical = Math.sin((totalday / 23) * 2 * pis) * 100; 
	var emotional = Math.sin((totalday / 28) * 2 * pis) * 100; 
	var mental = Math.sin((totalday / 33) * 2 * pis) * 100;
	return parseInt(physical)+"/"+parseInt(emotional)+"/"+parseInt(mental);
}

/**
 * 어제날짜 계산 함수
 * @param date
 * @returns {String}
 */
function setYesterday(date){
	var selectDate = date.split("-");
	var changeDate = new Date();
	changeDate.setFullYear(selectDate[0], selectDate[1]-1, selectDate[2]-1);
	   
	var y = changeDate.getFullYear();
	var m = changeDate.getMonth() + 1;
	var d = changeDate.getDate();
	if(m < 10)    { m = "0" + m; }
	if(d < 10)    { d = "0" + d; }
	   
	var resultDate = y + "-" + m + "-" + d;
	return resultDate;
}

/**
 * 내일날짜 계산 함수
 * @param date
 * @returns {String}
 */
function setPlusday(date){
	var selectDate = date.split("-");
	var changeDate = new Date(selectDate[0],selectDate[1],selectDate[2]);
	var m="",d="";
	   
	if(changeDate.getMonth()<10) m = "0"+changeDate.getMonth();
	else m=changeDate.getMonth();
	   
	if(changeDate.getDate()<10) d="0"+((changeDate.getDate()+1));
	else d=(changeDate.getDate()+1);
	   
	var resultDate = + changeDate.getFullYear() + "-" + m+ "-" +d;
	   
	return resultDate;
}

function prt(v){ 
	var tDTTM = new Date(); 
	
	if(v=="day"){
    	tDTTM.setDate(cDTTM.getDate());
	}if(v=="pmonth"){
		tDTTM.setMonth(cDTTM.getMonth()-1); 
	}if(v=="nmonth"){
		tDTTM.setMonth(cDTTM.getMonth()+1);
	}
	
 	$("#mibotm_tfTbbsStrtDt").val(tDTTM.getYMD());
 	
	var syear=$("#mibotm_syear").val();
	var smonth=$("#mibotm_sm").val();
	var sday=$("#bdays").val();
	
	if(sday==null||sday==""){
		regDate();
	}else{
		regDate(syear+"/"+smonth+"/"+sday);	// 입력한날짜
	}
	
	var rmonth=tDTTM.getYMD().replace(/-/g,"").substring(4,6);
	$("#mibotm_mStitle").html(rmonth).css({"font":"bold","font-size":"1em","font-weight":"bold","color":"red"});
	resultInfoNumerical(tDTTM.getYMD());
	//차트
	resultChartPolygonal(tDTTM.getYMD());
	
}

function regDate(in_userDay){//살아온날짜 현재날짜
	
	var setdays,resultDay,inputDay;
	var nows = $("#mibotm_tfTbbsStrtDt").val().replace(/-/g,"/");
	var todays=dateToInt(nows);// 검색일시
	var userNow=getDate().replace(/-/g,"/");
	
	if(in_userDay==null||in_userDay==""){
		setdays = dateToInt("1900/01/01");// 셋팅날짜;
	}else{
		setdays =  dateToInt(in_userDay);// 셋팅날짜;
	}
	
	inputDay = dateToInt(userNow) - dateToInt("1900/01/01");
	resultDay = todays-setdays;
	var result = $("#mibotm_stitle").html("오늘까지: <label style='font:bold 2em;color:red'>"+inputDay+"</label>&nbsp;일,&nbsp;&nbsp;조회일까지 &nbsp;<label style='font:bold 2em;color:red'>"+resultDay+"</label>&nbsp;일");//날짜계산
	
}

function resultInfoNumerical(vStingDay){
	var valueResult = [
			"바야흐로 당신의 날이다. <br/>세개의 리듬이 모두 고조기, 이 절호의 기회를 최대로 이용하라.",
			"신체적으로 활기차고 감성적으로 신나는 날이다.<br/> 지성리듬이 위험일 이므로 당신의 생각을 주의 깊게 더듬어 보아야 하는 날이다.",
			"높은 신체리듬과 지성리듬으로 행동과 생각이 풍부하지만 감정을 조심하라. <br/>감성리듬이 위험일 이지 않은가! 무기력감에 빠질 위험이 있다.",
			"신체리듬은 저조하고 감성리듬은 위험일이다.<br/> 오로지 기대되는것은 당신의 높은 지성리듬 뿐이다.",
			"신체적으로 힘이 넘치는 것처럼 느껴지지만 감성리듬과 지성리듬이 위험일이므로 의기소침해질 것이다. <br/>행동하기전에 다시 생각하라.",
			"활기차게 기분이 생동하는 날이다. <br/>지성리듬이 저조기에 있으니 모든 일에 사려깊게만 행동하면 목표하는 바를 달성할 수 있다.",
			"당신의 모든 것을 재점검할 날이다. <br/>신체적, 감성적으로 침체되고 지성적으로 위험하다.<br/> 생동감이 없고 적극성도 결여된다. 만사에 조심하라.",
			"육체적인 일을 하기에 적합하다. <br/>그렇지만 지성리듬이 위험하므로 정신 집중을 요하는 일은 피하라.",
			"결코 경솔하게 행동해서는 안되는 날이다.<br/> 신체상태는 활력이 넘치고 있으나 감정을 주의해야 한다. <br/>지성리듬 또한 저조하므로 모든 결정에 있어서 돌다리도 두드려 보고 건너라.",
			"육체적으로 피로를 느끼는 날이지만 감성리듬과 지성리듬이 높으므로 모든것을 극복할 수 있을 것이다. <br/>육체적 상태보다는 지적인 활동에 전념하라.",
			"신체리듬과 지성리듬이 위험일이다. 높은 감성리듬에 기대해야 하나 사고 가능성이 높은 날이다.",
			"신체리듬이 위험일이므로 육체적으로는 지쳐있고 불안정하지만 감성리듬은 고조기이다. <br/>높은 감성 리듬이 당신의 신체 리듬에 도움을 줄 것이다. 낮은 지성리듬을 극복하는 적응하는 현명함도 있어야 한다.",
			"오로지 기대할 데는 지성리듬뿐, 신체리듬이 불안정하므로 끝장난 기분이 들 것이고, 감성적으로 우울하다. 조심해야 할 날이다.",
			"좋은 날을 기다리며 휴식을 취하라.<br/> 신체,감성,지성의 세 리듬이 모두 저조기라는데 대하여 그렇게 불안해 할 필요는 없다.",
			"가급적 만사를 편하게 생각하라.<br/> 세 리듬이 모두 나쁘므로 성급한 결정을 피하고 많은 휴식을 취하라. <br/>육체적으로 무기력하고, 감성리듬이 위험하여 영감이 떠오르지 않는 날이다.",
			"감성리듬의 이점을 최대한 활용하라. <br/>창조적인 일에 전념하면 가장 좋겠다. <br/>육체적으로 피로하고 지성적으로 저조한 날이다.",
			"신체리듬이 높으니 가급적 육체적 활동에 전념하라. <br/>또한 지성리듬도 높으므로 어떤 결정을 내리는 데에 알맞는 날이다. <br/>나쁜 감성리듬에 말려들지 않도록 감정과 정서를 안정시키며 대인관계에 임하라.",
			"감성리듬과 지성리듬이 위험상태이고, 신체리듬마저 저조하여 온갖 불상사가 일어날 수 있는 날이다.<br/> 만사에 신중을 기하고 자중하라.",
			"육체적으로 불안정하고 몹시 지쳐 있는 신체리듬 위험일이다.<br/> 감성리듬과 지성리듬이 높으므로 약간 보완된다.",
			"신체리듬이 저조기이고, 지성리듬이 위험일 이지만 높은 감성 리듬을 잘 이용하며 그런대로 좋은 날이 될 수 있다.",
			"신체리듬과 감성리듬이 위험일이다.<br/> 높은 지성리듬에 냉정한 판단력을 기대한다.<br/> 언행에 신중을 기하라.",
			"육체적으로는 활력이 넘치나 감성리듬이 위험일이고 지성리듬은 저조하므로 말썽이나 함정에 빠지지 않도록 한 번 더 생각하고 행하라.",
			"감성, 지성리듬이 모두 저조하여 위험한 신체리듬을 더욱 악화시킨다.",
			"신체리듬과 감성리듬이 위험일이며 지성리듬도 저조하다.<br/> 둔하고 저조한 상태에 빠져있는 이날은 특별한 주의를 통해 말썽을 피하라.",
			"몸이 무겁고 기분이 우울한 날이지만 높은 지성리듬이 당신을 도와줄 것이다.<br/> 정다운 친구를 만나거나 음악감상을 하거나 무엇이든 즐거운 일을 통해서 이날을 잘 넘겨야 한다. <br/>기분 전환할 일이 필요한 날이다.",
			"신체리듬과 지성리듬이 모두 위험일이며 감성리듬도 저조하여 사는것이 힘들고 지겹다.",
			"모든 리듬이 모두 불안정한 상태인 극히 위험한 날. 조용히 휴식을 취하며 마음을 편히 가지는 것이 좋다.<br/> 판단이나 사건개입에 극도의 주의가 필요하다. 사고 발생가능성이 최고로 높은 날이다." 
	];
	
	var ytoday=setYesterday(vStingDay);	// 오늘
	var tday=vStingDay;					// 오늘
	var pday=setPlusday(vStingDay);		// 내일
		
	var nows1=ytoday.replace(/-/gi,"/");// 어제
	var nows2=tday.replace(/-/gi,"/");	// 오늘
	var nows3=pday.replace(/-/gi,"/");	// 내일
	
	var todays1 = dateToInt(nows1);		// 어제날짜 지수
	var todays2 = dateToInt(nows2);		// 현재날짜 지수
	var todays3 = dateToInt(nows3);		// 다음날짜 지수
	
	var setdays,resultDay1,resultDay2,resultDay3;
	
	// 생년월일
	var uyear=$("#mibotm_syear").val();
	var umonth=$("#mibotm_sm").val();
	var uday=$("#mibotm_bdays").val();
	
	if(uday==null||uday==""){
		setdays= dateToInt("1918/01/01");				// 셋팅날짜;
	}else{
		setdays=dateToInt(uyear+"/"+umonth+"/"+uday);	// 셋팅날짜;
	}
	
	resultDay1=todays1-setdays;
	resultDay2=todays2-setdays;
	resultDay3=todays3-setdays;
	
	//바이오리듬 계산
	var rbiortytm =[resultmyBiortyTm(resultDay1).split("/"),resultmyBiortyTm(resultDay2).split("/"),resultmyBiortyTm(resultDay3).split("/")];
	
	//색상
	//어제
	var yNtinc = 0;
	for(var i= 0 ;i < rbiortytm.length ; i++){
		for(var j= 0 ;j < rbiortytm[i].length ; j++){
			var num = yNtinc+j;
			
			if(Number(rbiortytm[j][i])==0){
				$("#chartData tr td:eq("+num+")").css("color","red");
			}
			
			if(Number(rbiortytm[j][i])>0){
				$("#chartData tr td:eq("+num+")").css("color","blue");
			}
			
			if(Number(rbiortytm[j][i])<0){
				$("#chartData tr td:eq("+num+")").css("color","black");
			}
		}
		yNtinc += 3;
	}
	//데이터	
	//머리
	$("#chartData tr th:eq(1)").html("어제 <font style='color:black;font-size:0.9em;'>("+nows1.substring(5,7)+"월"+nows1.substring(8,10)+"일)</font>");
	$("#chartData tr th:eq(2)").html("오늘<font style='color:red;font-size:0.9em;'>("+nows2.substring(5,7)+"월"+nows2.substring(8,10)+"일)</font>");
	$("#chartData tr th:eq(3)").html("내일<font style='color:black;font-size:0.9em;'>("+nows3.substring(5,7)+"월"+nows3.substring(8,10)+"일)</font>");
	
	//테이블
	$("#chartData tr td:eq(0)").html(rbiortytm[0][0]);
	$("#chartData tr td:eq(1)").html(rbiortytm[1][0]);
	$("#chartData tr td:eq(2)").html(rbiortytm[2][0]);
	
	$("#chartData tr td:eq(3)").html(rbiortytm[0][1]);
	$("#chartData tr td:eq(4)").html(rbiortytm[1][1]);
	$("#chartData tr td:eq(5)").html(rbiortytm[2][1]);
	
	$("#chartData tr td:eq(6)").html(rbiortytm[0][2]);
	$("#chartData tr td:eq(7)").html(rbiortytm[1][2]);
	$("#chartData tr td:eq(8)").html(rbiortytm[2][2]);
	
	//해석: 김대인부장님이 알려주신 패턴
	if(Number(rbiortytm[1][0])>0&&Number(rbiortytm[1][1])>0&&Number(rbiortytm[1][2])>0 ){//고저기 고저기 고저기
		$("#mibotm_stext").html(valueResult[0]);
	}
	if(Number(rbiortytm[1][0])>0&&Number(rbiortytm[1][1])>0&&Number(rbiortytm[1][2])<0){//고저기 고저기 저조기
		$("#mibotm_stext").html(valueResult[1]);
	}
	if(Number(rbiortytm[1][0])>0&&Number(rbiortytm[1][1])>0&&Number(rbiortytm[1][2])==0){//고저기 고저기 위험일
		$("#mibotm_stext").html(valueResult[2]);
	}
	if(Number(rbiortytm[1][0])>0&&Number(rbiortytm[1][1])<0&&Number(rbiortytm[1][2])>0){//고저기 저조기 고저기
		$("#mibotm_stext").html(valueResult[3]);
	}
	if(Number(rbiortytm[1][0])>0&&Number(rbiortytm[1][1])<0&&Number(rbiortytm[1][2])<0){//고저기 저조기 저저기
		$("#mibotm_stext").html(valueResult[4]);
	}
	if(Number(rbiortytm[1][0])>0&&Number(rbiortytm[1][1])<0&&Number(rbiortytm[1][2])==0){//고저기 저조기 위험일
		$("#mibotm_stext").html(valueResult[5]);
	}
	if(Number(rbiortytm[1][0])>0&&Number(rbiortytm[1][1])==0&&Number(rbiortytm[1][2])<0){ //고저기 위험일 고조기
		$("#mibotm_stext").html(valueResult[6]);
	}
	if(Number(rbiortytm[1][0])>0&&Number(rbiortytm[1][1])==0&&Number(rbiortytm[1][2])<0){//고저기 위험일 저조기
		$("#mibotm_stext").html(valueResult[7]);
	}
	if(Number(rbiortytm[1][0])>0&&Number(rbiortytm[1][1])==0&&Number(rbiortytm[1][2])==0){//고저기 위험일 위험일
		$("#mibotm_stext").html(valueResult[8]);
	}
	if(Number(rbiortytm[1][0])<0&&Number(rbiortytm[1][1])>0&&Number(rbiortytm[1][2])>0){//저조기 고저기 고저기
		$("#mibotm_stext").html(valueResult[9]);
	}
	if(Number(rbiortytm[1][0])<0&&Number(rbiortytm[1][1])>0&&Number(rbiortytm[1][2])<0){//저조기 고저기 저조기
		$("#mibotm_stext").html(valueResult[10]);
	}
	if(Number(rbiortytm[1][0])<0&&Number(rbiortytm[1][1])>0&&Number(rbiortytm[1][2])==0){//저조기 고저기 //위험일
		$("#mibotm_stext").html(valueResult[11]);
	}
	if(Number(rbiortytm[1][0])<0&&Number(rbiortytm[1][1])<0&&Number(rbiortytm[1][2])>0){//저조기 저조기 고저기
		$("#mibotm_stext").html(valueResult[12]);
	}
	if(Number(rbiortytm[1][0])<0&&Number(rbiortytm[1][1])<0&&Number(rbiortytm[1][2])<0){//저조기 저조기 저조기
		$("#mibotm_stext").html(valueResult[13]);
	}
	if(Number(rbiortytm[1][0])<0&&Number(rbiortytm[1][1])<0&&Number(rbiortytm[1][2])==0){//저조기 저조기 위험일
		$("#mibotm_stext").html(valueResult[14]);
	}
	if(Number(rbiortytm[1][0])<0&&Number(rbiortytm[1][1])==0&&Number(rbiortytm[1][2])<0){//저조기 위험일 고조기
		$("#mibotm_stext").html(valueResult[15]);
	}
	if(Number(rbiortytm[1][0])<0&&Number(rbiortytm[1][1])==0&&Number(rbiortytm[1][2])<0){//저조기 위험일 저조기
		$("#mibotm_stext").html(valueResult[16]);
	}
	if(Number(rbiortytm[1][0])<0&&Number(rbiortytm[1][1])==0&&Number(rbiortytm[1][2])==0){//저조기 위험일 위험일
		$("#mibotm_stext").html(valueResult[17]);
	}
	if(Number(rbiortytm[1][0])==0&&Number(rbiortytm[1][1])>0&&Number(rbiortytm[1][2])>0){//위험일 고조기 고조기
		$("#mibotm_stext").html(valueResult[18]);
	}
	if(Number(rbiortytm[1][0])==0&&Number(rbiortytm[1][1])>0&&Number(rbiortytm[1][2])<0){//위험일 고조기 저조기
		$("#mibotm_stext").html(valueResult[19]);
	}
	if(Number(rbiortytm[1][0])==0&&Number(rbiortytm[1][1])>0&&Number(rbiortytm[1][2])==0){//위험일 고조기 위험일
		$("#mibotm_stext").html(valueResult[20]);
	}
	if(Number(rbiortytm[1][0])==0&&Number(rbiortytm[1][1])<0&&Number(rbiortytm[1][2]>0)){//위험일 저조기 고조기
		$("#mibotm_stext").html(valueResult[21]);
	}
	if(Number(rbiortytm[1][0])==0&&Number(rbiortytm[1][1])<0&&Number(rbiortytm[1][2])<0){//위험일 저조기 저조기
		$("#mibotm_stext").html(valueResult[22]);
	}
	if(Number(rbiortytm[1][0])>0&&Number(rbiortytm[1][1])<0&&Number(rbiortytm[1][2])==0){//위험일 저조기 위험일
		$("#mibotm_stext").html(valueResult[23]);
	}
	if(Number(rbiortytm[1][0])==0&&Number(rbiortytm[1][1])==0&&Number(rbiortytm[1][2])>0){//위험일 위험일 고조기
		$("#mibotm_stext").html(valueResult[24]);
	}
	if(Number(rbiortytm[1][0])==0&&Number(rbiortytm[1][1])==0&&Number(rbiortytm[1][2])<0){//위험일 위험일 저조기
		$("#mibotm_stext").html(valueResult[25]);
	}
	if(Number(rbiortytm[1][0])==0&&Number(rbiortytm[1][1])==0&&Number(rbiortytm[1][2])==0){//위험일 위험일 위험일
		$("#mibotm_stext").html(valueResult[26]);
	}
}

/**
* 차트 정보 호출
*/
function resultChartPolygonal(cInputDay){
	$("#mibotm_chart").empty();//초기화
	
	var resultb=[];
	var sums=[];
	//var ch_month=cInputDay.substring(6,7);
	var ch_month= cInputDay.split("-")[1];
	
	if(Number(ch_month)>0&&Number(ch_month)<13){
		var lastDay=(new Date(cInputDay.substring(0,4),ch_month,0)).getDate();
		for(i=1;i<=lastDay;i++){
			resultb.push(padLeft(i,2));
		}
		
		for(i=0; i<resultb.length; i++){
			var nows=cInputDay.substring(0,4)+"/"+cInputDay.substring(5,7)+"/"+resultb[i];//어제		 
			var todays=dateToInt(nows);//어제날짜 지수
			var uyear=$("#mibotm_syear").val();
			var umonth=$("#mibotm_sm").val();
			var uday=$("#mibotm_bdays").val();
			
			var totalday="",setdays="";
			
			if(uday==null||uday==""){
				setdays = dateToInt("1910/01/01"); //셋팅날짜;
			}else{
				setdays = dateToInt(uyear+"/"+umonth+"/"+uday); //셋팅날짜;
			}
			
			totalday=todays-setdays;
			
			var pis = 3.141592654; 
			var physical = Math.sin((totalday / 23) * 2 * pis) * 100; 
			var emotional = Math.sin((totalday / 28) * 2 * pis) * 100; 
			var mental = Math.sin((totalday / 33) * 2 * pis) * 100; 	
			sums.push([parseInt(physical),parseInt(emotional),parseInt(mental)]);
			  
		}
	}
	//차트
	var options = {
            'legend':{
                names: resultb
            },
            'dataset':{
                title:'바이오리듬차트', 
                values: sums,
                colorset: ['#DC143C','#FF8C00', '#2EB400'],
                fields:['신체', '감성', '지성']
            },
            'chartDiv' : 'mibotm_chart',
            'chartType' : 'line',
            'leftOffsetValue': 50,
            'bottomOffsetValue': 60,
            'chartSize' : {width:1020, height:290},
            'minValue' : -100,
            'maxValue' : 100,
            'increment' : 10,
            'isGuideLineNeeded' : true
    };
    Nwagon.chart(options);
}

function padLeft(nr, n, str){ 
	return Array(n-String(nr).length+1).join(str||'0')+nr; 
} 

function btnSearch_clickEvent(){//조회버튼클릭
	//입력한 데이터값
	var sdates=$("#mibotm_tfTbbsStrtDt").val();//검색날짜
	var syear=$("#mibotm_syear").val();
	var smonth=$("#mibotm_sm").val();
	var sday=$("#mibotm_bdays").val();
	regDate();
	if(sday==""){
		alert("날짜를 입력해주세요");
		$("#mibotm_bdays").focus();
		return;
	}
	
	if(smonth=="02"&&parseInt(sday)>28){
		regDate();
		alert("2월은 28일까지입니다 입력해주세요");
		$("#mibotm_bdays").val("");
		$("#mibotm_bdays").focus();
	}
	
	regDate(syear+"/"+smonth+"/"+sday);//입력한날짜
	resultInfoNumerical(syear+"-"+smonth+"-"+sday);
	var rmonth;
	
	if((sdates.replace(/-/g,"").substring(4,6))>"9"){
		rmonth="0 "+(sdates.replace(/-/g,"").substring(4,6));
	}else{
		rmonth=sdates.replace(/-/g,"").substring(4,6);
	}
	
	$("#mibotm_mStitle").html(rmonth).css({"font":"bold","font-size":"1em","font-weight":"bold","color":"red"});
	resultChartPolygonal(sdates);
	resultInfoNumerical(sdates);
}

function btnInit_clickEvent(){//버튼초기화클릭
	$("#mibotm_tfTbbsStrtDt").val(getDate());
	$("input:radio[name='serviceType']").removeAttr('checked');
	$("input:radio[name='serviceType']:radio[value='day']").prop("checked",true);
	$("#mibotm_syear, #mibotm_sm").find('option:first').attr('selected', 'selected');
	$("#mibotm_bdays").val("");
	
	var startMonth=getDate().replace(/-/g,"");
	resultInfoNumerical(getDate());
	
	if(startMonth.substring(5,6)>"9"){
		startMonth=getDate().replace(/-/g,"").substring(5,6);
	}else{
		startMonth=getDate().replace(/-/g,"").substring(4,6);
	}
	
	$("#mibotm_mStitle").html(startMonth).css({"font":"bold","font-size":"1em","font-weight":"bold","color":"red"});
	regDate();
	resultInfoNumerical($("#mibotm_tfTbbsStrtDt").val());//바이오리듬 수치
	resultChartPolygonal($("#mibotm_tfTbbsStrtDt").val());//차트
}
$(document).ready(function(){
	
	$("#mibotm_labMainStatusUserNm").html(bUSR_NM);//사용자명
	$("#mibotm_labMainStatusExtnId").html(bUSR_ID);//사용자이름
	
	datePicker("#mibotm_tfTbbsStrtDt");//날짜
	$("#mibotm_tfTbbsStrtDt").val(getDate());
	regDate();
	resultInfoNumerical($("#mibotm_tfTbbsStrtDt").val());
	resultChartPolygonal($("#mibotm_tfTbbsStrtDt").val());
	var radio_indolence=$("input[name='serviceType']:radio");//검색일자
	
	//라디오버튼 이벤트
	radio_indolence.change(function(){
		var serviceType = this.value;
		if(serviceType == "day"){
			prt(serviceType);
		}else if(serviceType == "pmonth") {
			prt(serviceType);
		}else if(serviceType == "nmonth"){
			prt(serviceType);
		}  
	});
	
	//버튼이벤트
	$("#mibotm_btnSearch").bind("click", btnSearch_clickEvent);	
	$("#mibotm_btnInit").bind("click", btnInit_clickEvent);
	
	//숫자입력
	$("#mibotm_bdays").keyup(function(e){
		 regNumber = /^[0-9]*$/;
		 var str = $(this).val();
		if($("#mibotm_bdays").val()>31||$("#mibotm_bdays").val()<0||$("#mibotm_bdays").val()=="00"){
			alert("다시 입력해주세요");
			$("#mibotm_bdays").val("");
			$("#mibotm_bdays").focus();
		}
		if(!regNumber.test(str)) {
		   var res = str.substring(0,str.length-1);
		   $(this).val(res);
		}
	});
	
	//select 년 월 일
	for(var sy= nyear; sy>= 1960; sy--){
		$("#mibotm_syear").append('<option value="'+sy+'">'+sy+'</option>');
	}
	for(var i=1; i<=12; i++){
		var sm= i > 9 ? i : "0"+i;
		$("#mibotm_sm").append('<option value="'+sm+'">'+sm+'</option>');
	}
	startMonth=getDate().replace(/-/g,"").substring(4,6);
	$("#mibotm_mStitle").html(startMonth).css({"font":"bold","font-size":"1em","font-weight":"bold","color":"red"});
});

$(window).load(function(){
	
	var url = "http://www.kma.go.kr/wid/queryDFS.jsp?gridx=62&amp;gridy=114";
	
	$.ajax({
		url : "/web/myinfo/WeatherInfo.do"
		, data : { 'getUrl' : url}
		, type: 'get'
		, async: 'false'
		, contentType: "text/xml"
		, success: function(data) {
			var dataBody = $(data).find("data");
			var skyAlt = dataBody.first().find("wfKor").text();//날씨상태확인
			var skyEn = dataBody.first().find("wfEn").text().replace(/[^a-zA-Z]/gi, "");//날씨상태확인
			var temp = Math.round(dataBody.first().find("temp").text())+"℃";//온도
			var reh = Math.round(dataBody.first().find("reh").text())+"%";//습도
			 
			$("#mibotm_werhr > img").attr("src","/resources/images/ico_"+skyEn+".png");
			$("#mibotm_werhr > em").html(skyAlt);
			$("#mibotm_tmprt > em").html(temp);
			$("#mibotm_humidity > em").html(reh);
		}
		, error: function(data) {
			networkErrorHandler(data, status, err);
		}
	});
	
	/**
    * 측정소 별 대기오염정보 조회 서비스
    * 서비스 ID : SC-OA-09-02
    */
	var arpltnSttus  = ["매우좋음","좋음","보통","나쁨","매우나쁨"];
	var dataTerm = "daily";
	var sServiceKey = "Xad2xqH12no881%2B9TYKLm0GOBayjI1wjfga7p5r5o%2FCqlCZcvub%2FqCbOGhlBbUZHDhMkuIKYR4MQJulEBIUC%2BA%3D%3D"; //인증키 data.go.kr제공
	var sStationCode = "연동";
	
	url = "http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=" + sStationCode + "&dataTerm=" + dataTerm + "&ServiceKey=" + sServiceKey;
	$.ajax({
		url : "/web/myinfo/WeatherInfo.do"
		, data : { 'getUrl' : url}
		, type: 'get'
		, async: 'false'
		, contentType: "text/xml"
		, success: function(data, textStatus, jqXHR) {
			
			var dataMap = jqXHR.responseText.replace("\r\n", "");
	 		dataMap = $.parseXML(dataMap);
	 		var dataBody = $(dataMap).find("item").first();
	 		var pm10Value = dataBody.find("pm10Value").text()+"㎍/㎥";//평균농도
	 		var pm10Grade = dataBody.find("pm10Grade").text();//대기환경
	 		var khaiValue = dataBody.find("khaiValue").text();//대기환경 수치
	 		var pm10Text = arpltnSttus[pm10Grade];
			
	 		$("#mibotm_userDong").html("<label style='font-weight:bold;color:red;display:inline-block;padding-top:3px;'>" + sStationCode + "</label>");
	 		$("#mibotm_dnsty > em").html(pm10Value);
	 		$("#mibotm_arpltn > em").eq(0).html(khaiValue);
	 		$("#mibotm_arpltn > em").eq(1).html("("+pm10Text+")");
			
		}
		, error: function(data) {
			networkErrorHandler(data, status, err);
		}
	});
});