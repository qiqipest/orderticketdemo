<div id="Wapper">
    您好，<?php echo $gp_username ?>，操作成功。欢迎登陆和谐票务系统。
    <span id="jumpTo">5</span>秒后自动跳转
<!--    页面<span id="timeout">4.00</span>秒后自动跳转到网站首页。
    <script type="text/javascript">
    var duration=3900;
    var timer=null;
    var endTime = new Date().getTime() + duration + 100;
    function interval()
    {
     var n=(endTime-new Date().getTime())/1000;
     if(n<0) return;
     document.getElementById("timeout").innerHTML = n.toFixed(4);
     setTimeout(interval, 10);
    }
    window.onload=function()
    {
     timer=setTimeout("window.location.href='/index_t.php/order'", duration);
     interval();
    }

    </script> -->
    <script type="text/javascript">     
    function countDown(secs,surl){     
     //alert(surl);     
     var jumpTo = document.getElementById('jumpTo');
     jumpTo.innerHTML=secs;  
     if(--secs>0){     
         setTimeout("countDown("+secs+",'"+surl+"')",1000);     
         }     
     else{       
         location.href=surl;     
         }     
     }     
    </script> 
    <script type="text/javascript">countDown(5,'/index_t.php/order');</script>
    
</div>