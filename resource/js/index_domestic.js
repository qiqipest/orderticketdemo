function showhide(_tob)
{
    if(_tob.value==1){
    $('d_date2').style.display='none';
    }
    if(_tob.value==2){
    $('d_date2').style.display='';
    }
}
function showhide2(_tob,dv)
{   
    if(parseInt(_tob)==1){
    g(dv).style.display='none';
    }
    if(parseInt(_tob)==2){
    g(dv).style.display='';
    }
}
function formCheck()
{     
    if ($("domestic_search_StartInput").value==''||$("domestic_search_StartInput").value=='中文/拼音')
    {
	    alert("出发城市不能为空！");
	    $("domestic_search_StartInput").focus();
	    return false;
    }
    if ($("domestic_search_txtDDatePeriod").value==''||$("domestic_search_txtDDatePeriod").value=='yyyy-mm-dd')
    {
	    alert("出发日期不能为空！");
	    $("domestic_search_txtDDatePeriod").focus();
	    return false;
    }
    if ($("domestic_search_txtdest_city").value==''||$("domestic_search_txtdest_city").value=='中文/拼音')
    {
	    alert("目的城市不能为空！");
	    $("domestic_search_txtdest_city").focus();
	    return false;
    }
 
    if ($("d_date").style.display=="block")
    {
	
	    if ($("domestic_search_txtADatePeriod").value==''||$("domestic_search_txtADatePeriod").value=='yyyy-mm-dd')
	    {
		    alert("返程日期不能为空！");
		    $("domestic_search_txtADatePeriod").focus();
		    return false;
	    }

	    d1 = $("domestic_search_txtDDatePeriod").value;
	    d2 = $("domestic_search_txtADatePeriod").value;
	    if (compareDate(d1,d2))
	    {
		    alert("返程日期必须晚于出发日期！");
		    return false;
	    }
    }

                var r_journey=check1("r_journey");
                var dCity=document.getElementById("domestic_search_StartInput").value;    //出发城市
                var dCityCode=document.getElementById("domestic_search_hidDCityCode").value;
                var dest_city=document.getElementById("domestic_search_txtdest_city").value;
                var destcityCode=document.getElementById("domestic_search_hidDestcityCode").value;
                var dDatePeriod=document.getElementById("domestic_search_txtDDatePeriod").value;//出发日期
                var aDatePeriod=document.getElementById("domestic_search_txtADatePeriod").value;
                var airCompany=document.getElementById("domestic_search_selAirCompany").value;
                var params="r_journey=" +r_journey+ "&StartInput=" +escape(dCity) + "&hidDCityCode=" +dCityCode + "&txtdest_city=" +escape( dest_city)+ "&hidDestcityCode=" +destcityCode + "&txtDDatePeriod=" + dDatePeriod+ "&txtADatePeriod=" + aDatePeriod + "&aircompany="+airCompany;
       if(r_journey=="1"){
          var params="r_journey=" +r_journey+ "&StartInput=" +escape(dCity) + "&hidDCityCode=" +dCityCode + "&txtdest_city=" +escape( dest_city)+ "&hidDestcityCode=" +destcityCode + "&txtDDatePeriod=" + dDatePeriod+ "&txtADatePeriod=yyyy-mm-dd&aircompany="+airCompany;
       window.location.href= "/searchwait.aspx?"+params;
       }
       if(r_journey=="2")
       {
          var params="r_journey=" +r_journey+ "&StartInput=" +escape(dCity) + "&hidDCityCode=" +dCityCode + "&txtdest_city=" +escape( dest_city)+ "&hidDestcityCode=" +destcityCode + "&txtDDatePeriod=" + dDatePeriod+ "&txtADatePeriod=" + aDatePeriod + "&aircompany="+airCompany;
       window.location.href= "/searchwait.aspx?"+params;
      }
     return true;
	
}
function compareDate(DateOne,DateTwo)
{ 
    var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ("-"));
    var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ("-")+1);
    var OneYear = DateOne.substring(0,DateOne.indexOf ("-"));

    var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ("-"));
    var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ("-")+1);
    var TwoYear = DateTwo.substring(0,DateTwo.indexOf ("-"));
    if (Date.parse(OneMonth+"/"+OneDay+"/"+OneYear) >
    Date.parse(TwoMonth+"/"+TwoDay+"/"+TwoYear))
    {
        return true;
    }
    else
    {
        return false;
    }
}

function g(o){return document.getElementById(o);}				
function HoverLi(n,m,q){
if(n==1)
{
g(q+2).className="c2";
g(q+3).className="c3";
g(q+1).className="c1 cur1";
}
if(n==2)
{
g(q+2).className="c2 cur1";
g(q+3).className="c3";
g(q+1).className="c1";
}
if(n==3)
{
g(q+2).className="c2";
g(q+3).className="c3 cur1";
g(q+1).className="c1";
}
}


function formCheckindex()
{   
    if (g("StartInput").value==''||g("StartInput").value=='中文/拼音')
    {
	    alert("出发城市不能为空！");
	    g("StartInput").focus();
	    return false;
    }
    if (g("txtDDatePeriod").value==''||g("txtDDatePeriod").value=='yyyy-mm-dd')
    {
	    alert("出发日期不能为空！");
	    g("txtDDatePeriod").focus();
	    return false;
    }
    if (g("txtdest_city").value==''||g("txtdest_city").value=='中文/拼音')
    {
	    alert("目的城市不能为空！");
	    g("txtdest_city").focus();
	    return false;
    }
 
    if (g("d_date2").style.display=="block")
    {
	
	    if (g("txtADatePeriod").value==''||g("txtADatePeriod").value=='yyyy-mm-dd')
	    {
		    alert("返程日期不能为空！");
		    g("txtADatePeriod").focus();
		    return false;
	    }

	    d1 = g("txtDDatePeriod").value;
	    d2 = g("txtADatePeriod").value;
	    if (compareDate(d1,d2))
	    {
		    alert("返程日期必须晚于出发日期！");
		    return false;
	    }
    }
    var params="rdodan="+g("rdotype").value+"&tickettype=1&hidDCityCode="+g("hidDCityCode").value+"&StartInput=" +g("StartInput").value+"&hidDestcityCode=" + g("hidDestcityCode").value+"&txtdest_city=" +g("txtdest_city").value+"&txtDDatePeriod=" + g("txtDDatePeriod").value+"&txtADatePeriod=" +g("txtADatePeriod").value;
 document.form_inter1.action="jp/searchwait.aspx?"+params
     document.forms["form_inter1"].submit();
     return true;
	
}
//首页机票搜索
function indexformsearch()
{       

    if ($("ddlOrgCity").value==''||$("ddlOrgCity").value=='中文/拼音')
    {  
	    alert("出发城市不能为空！");
	    $("ddlOrgCity").focus();
	    return false;
    }
    if ($("control_date_from").value==''||$("control_date_from").value=='yyyy-mm-dd')
    {
	    alert("出发日期不能为空！");
	    $("control_date_from").focus();
	    return false;
    }
    if ($("ddlDesCity").value==''||$("ddlDesCity").value=='中文/拼音')
    {
	    alert("目的城市不能为空！");
	    $("ddlDesCity").focus();
	    return false;
    }
    if ($("d_date2").style.display=="block"||$("d_date2").style.display=="")
    {
	
	    if ($("control_date_to").value==''||$("control_date_to").value=='yyyy-mm-dd')
	    {
		    alert("返程日期不能为空！");
		    $("control_date_to").focus();
		    return false;
	    }

	    d1 = $("control_date_from").value;
	    d2 = $("control_date_to").value;
	    if (compareDate(d1,d2))
	    {
		    alert("返程日期必须晚于出发日期！");
		    return false;
	    }
    }
            g("rtype").value=check1("rdodan");//航程类型
            g("fromcitycode").value=g("StartCity").value;
            g("fromcity").value=g("StartInput").value;
            g("tocitycode").value=g("EndCity").value;
            g("tocity").value=g("EndInput").value;
            g("fromtime").value=g("txtDDatePeriod2").value;
            g("totime").value=g("txtADatePeriod2").value;
            g("chktype").value=check1("cbtype");//舱位
            g("ticketid").value=g("tickettype").value;//类型
            
               var r_journey=check1("rdodan");
                var fromcitycode=g("StartCity").value;    //出发城市
                var fromcity=g("StartInput").value;
                var tocitycode=g("EndCity").value;
                var tocity=g("EndInput").value;
                var fromtime=g("txtDDatePeriod2").value;//出发日期
                var totime=g("txtADatePeriod2").value;
                var chktype=check1("cbtype");
                var ticketId=g("tickettype").value;
    //var params="triptype=" +r_journey+"&fromcitycode=" +escape(fromcitycode) + "&fromcityname=" +escape(fromcity) + "&tocitycode=" +escape(tocitycode)+ "&tocityname=" +escape(tocity) + "&fromdate=" + fromtime+ "&returndate=" + totime + "&cbtype="+chktype+"&ticketId="+ticketId+"&custormertype=";
    //window.location.href= "/order"+params;
     // document.forms["frmshow"].action="/jpcity/search_wait.aspx";
    // document.forms["frmshow"].submit();
    return true;
	
}

//国际机票搜索
function formChecksearch()
{       
    if ($("StartInput").value==''||$("StartInput").value=='中文/拼音')
    {  
	    alert("出发城市不能为空！");
	    $("StartInput").focus();
	    return false;
    }
    if ($("txtDDatePeriod").value==''||$("txtDDatePeriod").value=='yyyy-mm-dd')
    {
	    alert("出发日期不能为空！");
	    $("txtDDatePeriod").focus();
	    return false;
    }
    if ($("EndInput").value==''||$("EndInput").value=='中文/拼音')
    {
	    alert("目的城市不能为空！");
	    $("EndInput").focus();
	    return false;
    }
    if ($("d_date2").style.display=="block"||$("d_date2").style.display=="")
    {
	
	    if ($("txtADatePeriod").value==''||$("txtADatePeriod").value=='yyyy-mm-dd')
	    {
		    alert("返程日期不能为空！");
		    $("txtADatePeriod").focus();
		    return false;
	    }

	    d1 = $("txtDDatePeriod").value;
	    d2 = $("txtADatePeriod").value;
	    if (compareDate(d1,d2))
	    {
		    alert("返程日期必须晚于出发日期！");
		    $("txtADatePeriod").focus();
		    return false;
	    }
    }
            g("rtype").value=check1("rdodan");
            g("fromcitycode").value=g("StartCity").value;
            g("fromcity").value=g("StartInput").value;
            g("tocitycode").value=g("EndCity").value;
            g("tocity").value=g("EndInput").value;
            g("fromtime").value=g("txtDDatePeriod").value;
            g("totime").value=g("txtADatePeriod").value;
            g("chktype").value=check1("cbtype");//舱位
            g("ticketid").value=g("tickettype").value;//类型
               var r_journey=check1("rdodan");
                var fromcitycode=g("StartCity").value;    //出发城市
                var fromcity=g("StartInput").value;
                var tocitycode=g("EndCity").value;
                var tocity=g("EndInput").value;
                var fromtime=g("txtDDatePeriod").value;//出发日期
                var totime=g("txtADatePeriod").value;
                var chktype=check1("cbtype");
                var ticketId=g("tickettype").value;
     var params="triptype=" +r_journey+"&fromcitycode=" +escape(fromcitycode) + "&fromcityname=" +escape(fromcity) + "&tocitycode=" +escape(tocitycode)+ "&tocityname=" +escape(tocity) + "&fromdate=" + fromtime+ "&returndate=" + totime + "&cbtype="+chktype+"&ticketId="+ticketId+"&custormertype=";
    window.location.href= "/jpcity/search_wait.aspx?"+params;
     // document.forms["frmshow"].action="/jpcity/search_wait.aspx";
     // document.forms["frmshow"].submit();
    return true;
	
}

//留学生机票搜索
function formChecksearch2()
{     
    if ($("StartInput2").value==''||$("StartInput2").value=='中文/拼音')
    {  
	    alert("出发城市不能为空！");
	    $("StartInput2").focus();
	    return false;
    }
    if ($("txtDDatePeriod3").value==''||$("txtDDatePeriod3").value=='yyyy-mm-dd')
    {
	    alert("出发日期不能为空！");
	    $("txtDDatePeriod3").focus();
	    return false;
    }
    if ($("EndInput2").value==''||$("EndInput2").value=='中文/拼音')
    {
	    alert("目的城市不能为空！");
	    $("EndInput2").focus();
	    return false;
    }
    if ($("dvliu").style.display=="block")
    {
	
	    if ($("txtADatePeriod3").value==''||$("txtADatePeriod3").value=='yyyy-mm-dd')
	    {
		    alert("返程日期不能为空！");
		    $("txtADatePeriod3").focus();
		    return false;
	    }

	    d1 = $("txtDDatePeriod3").value;
	    d2 = $("txtADatePeriod3").value;
	    if (compareDate(d1,d2))
	    {
		    alert("返程日期必须晚于出发日期！");
		    return false;
	    }
	    
    }    
           g("rtype").value=check1("rddan2");
            g("fromcitycode").value=g("StartCity2").value;
            g("fromcity").value=g("StartInput2").value;
            g("tocitycode").value=g("EndCity2").value;
            g("tocity").value=g("EndInput2").value;
            g("chktype").value=check1("cbtype2");//舱位
            g("ticketid").value=2;//类型
            g("fromtime").value=g("txtDDatePeriod3").value;
            g("totime").value=g("txtADatePeriod3").value;
               var r_journey=check1("rddan2");
                var fromcitycode=g("StartCity2").value;    //出发城市
                var fromcity=g("StartInput2").value;
                var tocitycode=g("EndCity2").value;
                var tocity=g("EndInput2").value;
                var fromtime=g("txtDDatePeriod3").value;//出发日期
                var totime=g("txtADatePeriod3").value;
                var chktype="";
                var ticketId=2;
                 var params="triptype=" +r_journey+"&fromcitycode=" +escape(fromcitycode) + "&fromcityname=" +escape(fromcity) + "&tocitycode=" +escape(tocitycode)+ "&tocityname=" +escape(tocity) + "&fromdate=" + fromtime+ "&returndate=" + totime + "&cbtype="+chktype+"&ticketId="+ticketId+"&custormertype=";
    window.location.href= "/jpcity/search_wait.aspx?"+params;
    return true;
	
}
 function check1(obj)
   {
    var o=document.getElementsByName(obj);
    var len=o.length;   
    for (var i=0;i<len ;i++ )
    { if( o[i].checked==true )
     {  
       return  o[i].value;
     }
    }
   }
   
    function zhuform(r_journey,tickettype,dCityCode,dCity,dest_city,destcityCode)
 { 
           g("rtype").value=r_journey;
            g("fromcitycode").value=dCityCode;
            g("fromcity").value=dCity;
            g("tocitycode").value=destcityCode;
            g("tocity").value=dest_city;
            g("fromtime").value=g("txtfrom_time").value;
            g("totime").value=g("txtto_time").value;
            g("ticketid").value=tickettype;//类型
           if(r_journey==1){
            g("txtto_time").disabled = true;
            g("txtto_time").readonly=true;
            }
            else
            {
               g("txtto_time").disabled = false;
               g("txtto_time").readonly=false;
            }
            G.pop();
   
 }
 function gofum()
 {         
            g("fromtime").value=g("txtfrom_time").value;
            g("totime").value=g("txtto_time").value;
             if (g("txtfrom_time").value==''||g("txtfrom_time").value=='yyyy-mm-dd')
    {
	    alert("出发日期不能为空！");
	    g("txtfrom_time").focus();
	    return false;
    }
    if( g("txtto_time").disabled==false){
    if ($("txtto_time").value==''||$("txtto_time").value=='yyyy-mm-dd')
	    {
		    alert("返程日期不能为空！");
		    $("txtto_time").focus();
		    return false;
	    }

	    d1 = $("txtfrom_time").value;
	    d2 = $("txtto_time").value;
	    if (compareDate(d1,d2))
	    {
		    alert("返程日期必须晚于出发日期！");
		    return false;
	    }
	    }
	           var r_journey=g("rtype").value;
                var fromcitycode=g("fromcitycode").value;    //出发城市
                var fromcity=g("fromcity").value;
                var tocitycode=g("tocitycode").value;
                var tocity=g("tocity").value;
                var fromtime=g("fromtime").value;//出发日期
                var totime=g("totime").value;
                var chktype=check1("cbtype");
                var ticketId=g("ticketid").value;
	       var params="triptype=" +r_journey+"&fromcitycode=" +escape(fromcitycode) + "&fromcityname=" +escape(fromcity) + "&tocitycode=" +escape(tocitycode)+ "&tocityname=" +escape(tocity) + "&fromdate=" + fromtime+ "&returndate=" + totime + "&cbtype="+chktype+"&ticketId="+ticketId+"&custormertype=";
    window.location.href= "/jpcity/search_wait.aspx?"+params;
           // document.forms["frmshow"].action="/jpcity/search_wait.aspx";
          //  document.forms["frmshow"].submit();
 }
 
 function Fligt(obj)
 {
  if(obj!=""||obj!='undefined'){
  var flightlength=obj.split('^').length;
     var arr=new Array();
     for(var i=0,v=obj.split('^').length;i<v;i++)
	{
	  
	arr.push(obj.split('^')[i]);
	}
	return  (arr[1]+ "到"+arr[3]+" "+arr[11]);
	}
	else
	return null;
 }
 
  function   dvspeed()//设置图片滚动(从下往上)
 {   
    
var speed=30 
document.getElementById("demo2").innerHTML=document.getElementById("demo1").innerHTML   
function Marquee(){   
if(document.getElementById("demo2").offsetTop-document.getElementById("demo").scrollTop<=0)
{   
document.getElementById("demo").scrollTop-=document.getElementById("demo1").offsetHeight   
}
else
{   
document.getElementById("demo").scrollTop++   
}   
}   
var MyMar=setInterval(Marquee,speed)   
document.getElementById("demo").onmouseover=function() {clearInterval(MyMar)}   
document.getElementById("demo").onmouseout=function() {MyMar=setInterval(Marquee,speed)}  
}



//新国际机票搜索
function formnewsearch()
{       
    if ($("StartInput").value==''||$("StartInput").value=='中文/拼音')
    {  
	    alert("出发城市不能为空！");
	    $("StartInput").focus();
	    return false;
    }
    if ($("txtDDatePeriod").value==''||$("txtDDatePeriod").value=='yyyy-mm-dd')
    {
	    alert("出发日期不能为空！");
	    $("txtDDatePeriod").focus();
	    return false;
    }
    if ($("EndInput").value==''||$("EndInput").value=='中文/拼音')
    {
	    alert("目的城市不能为空！");
	    $("EndInput").focus();
	    return false;
    }
    if ($("d_date2").style.display=="block"||$("d_date2").style.display=="")
    {
	
	    if ($("txtADatePeriod").value==''||$("txtADatePeriod").value=='yyyy-mm-dd')
	    {
		    alert("返程日期不能为空！");
		    $("txtADatePeriod").focus();
		    return false;
	    }

	    d1 = $("txtDDatePeriod").value;
	    d2 = $("txtADatePeriod").value;
	    if (compareDate(d1,d2))
	    {
		    alert("返程日期必须晚于出发日期！");
		    $("txtADatePeriod").focus();
		    return false;
	    }
    }
            g("rtype").value=check1("rdodan");
            g("fromcitycode").value=g("StartCity").value;
            g("fromcity").value=g("StartInput").value;
            g("tocitycode").value=g("EndCity").value;
            g("tocity").value=g("EndInput").value;
            g("fromtime").value=g("txtDDatePeriod").value;
            g("totime").value=g("txtADatePeriod").value;
            g("chktype").value=check1("cbtype");//舱位
            g("ticketid").value=g("tickettype").value;//类型
               var r_journey=check1("rdodan");
                var fromcitycode=g("StartCity").value;    //出发城市
                var fromcity=g("StartInput").value;
                var tocitycode=g("EndCity").value;
                var tocity=g("EndInput").value;
                var fromtime=g("txtDDatePeriod").value;//出发日期
                var totime=g("txtADatePeriod").value;
                var chktype=check1("cbtype");
                var ticketId=g("tickettype").value;
     var params="triptype=" +r_journey+"&fromcitycode=" +escape(fromcitycode) + "&fromcityname=" +escape(fromcity) + "&tocitycode=" +escape(tocitycode)+ "&tocityname=" +escape(tocity) + "&fromdate=" + fromtime+ "&returndate=" + totime + "&cbtype="+chktype+"&ticketId="+ticketId+"&custormertype=";
    window.location.href= "/jpsearch/jp_wait.aspx?"+params;
     // document.forms["frmshow"].action="/jpcity/search_wait.aspx";
     // document.forms["frmshow"].submit();
    return true;
	
}

//留学生机票搜索
function formnewsearch2()
{     
    if ($("StartInput2").value==''||$("StartInput2").value=='中文/拼音')
    {  
	    alert("出发城市不能为空！");
	    $("StartInput2").focus();
	    return false;
    }
    if ($("txtDDatePeriod3").value==''||$("txtDDatePeriod3").value=='yyyy-mm-dd')
    {
	    alert("出发日期不能为空！");
	    $("txtDDatePeriod3").focus();
	    return false;
    }
    if ($("EndInput2").value==''||$("EndInput2").value=='中文/拼音')
    {
	    alert("目的城市不能为空！");
	    $("EndInput2").focus();
	    return false;
    }
    if ($("dvliu").style.display=="block")
    {
	
	    if ($("txtADatePeriod3").value==''||$("txtADatePeriod3").value=='yyyy-mm-dd')
	    {
		    alert("返程日期不能为空！");
		    $("txtADatePeriod3").focus();
		    return false;
	    }

	    d1 = $("txtDDatePeriod3").value;
	    d2 = $("txtADatePeriod3").value;
	    if (compareDate(d1,d2))
	    {
		    alert("返程日期必须晚于出发日期！");
		    return false;
	    }
	    
    }    
           g("rtype").value=check1("rddan2");
            g("fromcitycode").value=g("StartCity2").value;
            g("fromcity").value=g("StartInput2").value;
            g("tocitycode").value=g("EndCity2").value;
            g("tocity").value=g("EndInput2").value;
            g("chktype").value=check1("cbtype2");//舱位
            g("ticketid").value=2;//类型
            g("fromtime").value=g("txtDDatePeriod3").value;
            g("totime").value=g("txtADatePeriod3").value;
               var r_journey=check1("rddan2");
                var fromcitycode=g("StartCity2").value;    //出发城市
                var fromcity=g("StartInput2").value;
                var tocitycode=g("EndCity2").value;
                var tocity=g("EndInput2").value;
                var fromtime=g("txtDDatePeriod3").value;//出发日期
                var totime=g("txtADatePeriod3").value;
                var chktype="";
                var ticketId=2;
                 var params="triptype=" +r_journey+"&fromcitycode=" +escape(fromcitycode) + "&fromcityname=" +escape(fromcity) + "&tocitycode=" +escape(tocitycode)+ "&tocityname=" +escape(tocity) + "&fromdate=" + fromtime+ "&returndate=" + totime + "&cbtype="+chktype+"&ticketId="+ticketId+"&custormertype=";
    window.location.href= "/jpsearch/jp_wait.aspx?"+params;
    return true;
	
}

