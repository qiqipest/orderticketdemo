<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link href="/resource/css/global.css" rel="stylesheet" type="text/css" />
<!-- <link href="./css/flights.css" rel="stylesheet" type="text/css" /> -->
<link href="/resource/css/bw.css" rel="stylesheet" type="text/css" />
<link href="/resource/css/base.css" rel="stylesheet" type="text/css" />
<link href="/resource/css/city.css" rel="stylesheet" type="text/css" />
<!--
<link href="/styles/global.css" rel="stylesheet" type="text/css" /><link href="/styles/flights.css" rel="stylesheet" type="text/css" /><link href="/images/favicon.ico" type="images/x-icon" rel="Bookmark" /><link href="/images/favicon.ico" type="images/x-icon" rel="shortcut icon" />
-->
<!--        <script src="./js/jquery-1.10.1.min.js" type="text/javascript"></script>-->
        <script src="/resource/js/comme.js" type="text/javascript"></script>
        <script src="/resource/js/WdatePicker.js" type="text/javascript"></script>
        <script src="/resource/js/bw.js" type="text/javascript"></script>
<!--        <script src="./js/b.js" type="text/javascript"></script> -->
        <script src="/resource/js/photochange.js" type="text/javascript"></script>
        <script src="/resource/js/jquery-1.3.2.min.js" type="text/javascript"></script>
        <script src="/resource/js/comme.js" type="text/javascript"></script>
        <script src="/resource/js/tuna_100324_jsLoader.js" type="text/javascript"></script>
        <script type="text/javascript" charset="utf-8" src="/resource/js/fltInternational1_gb2312.js"></script>
        <script type="text/javascript" charset="utf-8" src="/resource/js/fltInternational0_gb2312.js"></script>
        <script type="text/javascript" charset="utf-8" src="/resource/js/tuna_100324.js"></script>
        <script src="/resource/js/index_domestic.js" type="text/javascript"></script>
        <script src="/resource/js/selected_city.js" type="text/javascript"></script>
        <script src="/resource/js/Calendar3.js" type="text/javascript"></script>

        

<?php
if($this->session->userdata('gp_s_is_staff') == '')
{   
    $hader_is_staff = 0;
}
else{
    if($this->session->userdata('gp_s_is_staff') == 1)
    {   $hader_is_staff = 1;
    }else{
        $hader_is_staff = 0;
    }

}
?>
        
        
        
</title><meta name="Description" content="上海和谐票务有限公司订票服务平台，专业提供：机票预订，火车票预订，票务服务"><meta name="keywords" content="上海和谐票务有限公司，机票预订，订票，车票，预定，票务">
</head>
<body>
    <!-- 头部 -->
    <div id="WarningMsg" style="">
    <div class='content'>
        <strong>温馨提示：</strong>和谐票务有限公司可申请美联航、达美、AA、加航、英航、维珍、卡航、阿联酋、汉莎、国泰、国航、东航飞国际所有航线，承接国际月结大客户
        <div style="position: absolute; right: 5px; top: 2px; font-weight: bold; cursor: pointer;
            margin-left: 5px;" onclick="document.getElementById('WarningMsg').style.display='none';">
            ×
        </div>
    </div>
</div>
<!-- 头部 -->
<div id="Header">
    <div class='top'>
        <div class='middle'>
            <div class='right'>
                您好: <?php echo $gp_username ?> | 
                <?php 
                if ($gp_username == 'guest')
                {
                     echo "<a href='/index_t.php/login/login' style='padding-left: 1px'>登陆</a> | ";

                     echo "<a href='/index_t.php/login/register' style='padding-left: 1px'>注册</a> | ";

                }else{
                     echo "<a href='/index_t.php/login/changepass' style='padding-left: 1px'>修改密码</a> | ";
                     echo "<a href='/index_t.php/login/changeprofile' style='padding-left: 1px'>修改个人信息</a> | ";
                     if ($hader_is_staff === 1)
                     {
                        echo "<a href='/index_t.php/login/adduser' style='padding-left: 1px'>添加用户</a> | ";
                        echo "<a href='/index_t.php/login/changeprofile_staff' style='padding-left: 1px'>修改用户信息</a> | ";
                     }
                     echo "<a href='/index_t.php/login/logout' style='padding-left: 1px'>退出</a> | ";

                     
                }
                
                echo "<a href='/index_t.php/order/order_query' style='padding-left: 1px'>订单查询</a> | ";
                ?>

                <a href='/index_t.php/order'>帮助中心</a> | <a href='/index_t.php/order'>意见反馈</a>
            </div>
            
			<div class='left'>
				<span class='tel'>021-56590166</span>
                            <!-----
				<a href='/integral/login.aspx'>登录</a>
				<a href='/integral/regist'>注册</a>
                -->
			</div>
			
            
        </div>
    </div>
    <div class='middle banner'>
        <a class='logo' title='和谐票务' href='/'></a>
        <div class='ad'>
            <img src='/resource/images/banner4.jpg' height="47" width="480">
        </div>
        <div class='tel'>
            全国服务热线 <strong>021-56590166</strong>
        </div>
    </div>
    <div class='nav'>
        <div class='right_bg'>
        </div>
        <ul class='middle' >
            <li id="r01"><a href='/index_t.php/order/main'><strong>首页</strong></a></li>
            <li id="r02"><a href="/reserve"><strong>国际机票</strong></a></li>
            <li id="r05"><a href='/stuList'><span class='hot'>HOT</span><strong>国内机票</strong></a></li>
            <li id="r03"><a href='/team'><strong>团队机票</strong></a></li>
            <!-----   <li id="r04" ><a href='/speca'><strong>商务头等</strong></a><div class="hot">优惠</div></li>----->
            <li id="r04"><a href='/speca'><strong>商务头等</strong></a></li>
            <!--  <li id="r05" ><a href='/flight_watch'><strong>在线选座</strong></a></li>-->
         <!--   <li id="r06"><a href="/zx"><strong>航空资讯</strong></a></li>-->
            <li id="r07"><a href='/bank'><strong>公司介绍</strong></a></li>
            <li id="r08"><a href='/zizhi.html'><strong>服务特色</strong></a></li>
        </ul>
    </div>
</div>
<!-- end 头部 -->

<script type="text/javascript"> 

window.onbeforeunload = function() 
{     
    var n = window.event.screenX - window.screenLeft;     
    var b = n > document.documentElement.scrollWidth-20;      
    if(b && window.event.clientY < 0 || window.event.altKey) 
    {
            document.cookie="GrouponUserAuth"+"="+escape('');

    } 
//    else
//    {
//         alert("是刷新而非关闭");
//    }   
 }
</script>



    <!-- end 头部 -->