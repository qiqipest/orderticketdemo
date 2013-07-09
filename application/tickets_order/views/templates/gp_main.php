 <!-- 内容部分 -->
    <div id="Wapper">
        <!-- 左 -->
        <div id='Index_left'>
            <!-- 搜索 -->
            <div class='search'>
                <div class='menu'>
                </div>
                <div class='content'>
                    <div style="height: 0px;" id="jsContainer" class="jsContainer">
                        <textarea style="display: none" id="jsSaveStatus"></textarea>
                        <div style="z-index: 999; position: absolute; display: none; overflow: hidden" id="tuna_alert">
                        </div>
                        <div style="z-index: 120; position: absolute; visibility: hidden" id="tuna_jmpinfo">
                        </div>
                        <div style="z-index: 99999; display: none; top: 0px" id="tuna_calendar" class="tuna_calendar">
                        </div>
                    </div>
                    <form id="searchform" name="searchform" method="post" class="form" action="/order/">
                    
                    
                    <div class='item'>
                        <label>
                            航班类型：</label>
                        <div class='cnt'>
                           <label style="display: none" > <input name="rdodan" id="rdodan1" type="radio" onclick="showhide(this)" value="2"
                                 style="display: none"/>
                            往返</label>
                           <label> <input name="rdodan" id="rdodan2" type='radio' onclick="showhide(this)" value="1" checked/>
                            单程</label> &nbsp;&nbsp; <!--<a style="cursor: pointer" href="/team">联程</a>-->
                            <input id="rdotype" name="rdotype" type="hidden" value="" />
                            <input id="tickettype" name="tickettype" type="hidden" value="1" />
                        </div>
                    </div>
                    <div class='item'>
                        <label>
                            出发城市：</label>
                        <div class='cnt'>
                            <input class="text  city" size='26' style="cursor: pointer" id="ddlOrgCity" class="flightListInp"
                                value="中文/拼音" name="ddlOrgCity" onclick="suggestF.display(this,'',event);">

                        </div>
                             
                    </div>
                    <div class='item'>
                        <label>
                            到达城市：</label>
                        <div class='cnt'>
                            <input style="cursor: pointer" id="ddlDesCity" class="text  city" size='26' value="中文/拼音"
                                 name="ddlDesCity" onclick="suggestF.display(this,'ddlOrgCity2',event);">
                        </div>
                            
                    </div>
                    <div class='item'>
                        <label>
                            出发日期：</label>
                        <div class='cnt'>
                            <input size='26' class="text time" type="text" name="control_date_from" id="control_date_from" onclick="new Calendar().show(this);" >
                        </div>
                    </div>
                    <div class='item' id="d_date2" style="display: none">
                        <label>
                            返程日期：</label>
                        <div class='cnt'>
                            <input size='26' class="text time" type="text" name="control_date_to" id="control_date_to" onclick="new Calendar().show(this);" readonly="readonly">
                        </div>
                    </div>
                    <div class='item submit'>
                        <button value="" type="submit" class="btn" id="domestic_searching" name="domestic_searching"
                            onclick="return indexformsearch();" >
                        </button>
                        <a class='yz' href='http://www.travelsky.com/' target="_blank">机票验真&gt;&gt;</a>
                    </div>
                    </form>
                </div>
            </div>
            <!-- end 搜索 -->
            <!-- 留学生专场 -->

            <!-- end 留学生专场 -->
            <!-- 最新预订航线 -->
            <div class='title'>
                最新预订航线</div>
            <div  id="demo" class='content'  style="clear: both; overflow: hidden; height: 90px;  margin: 0 auto;">
              <div id="demo1">
                <ul> 
                
                    <li><dfn class='gray'>[63分钟前]</dfn><a class='blue' href='#'>
                     往返到广州 洛杉矶 CZ327
                     </a></li>
                    
                    <li><dfn class='gray'>[38分钟前]</dfn><a class='blue' href='#'>
                     往返到上海 法兰克福 CA935
                     </a></li>
                    
                    <li><dfn class='gray'>[49分钟前]</dfn><a class='blue' href='#'>
                     往返到广州 洛杉矶 CZ327
                     </a></li>
                    
                    <li><dfn class='gray'>[50分钟前]</dfn><a class='blue' href='#'>
                     往返到上海 多伦多 EK303
                     </a></li>
                    
                    <li><dfn class='gray'>[83分钟前]</dfn><a class='blue' href='#'>
                     往返到上海 东京 DL296
                     </a></li>
                    
                   
                </ul>
                </div>

            </div>
            <!-- end 最新预订航线 -->
        </div>
        <!-- end 左 -->
        <!-- 右 -->
        <div id='Index_right'>
            <div class='main'>
                <div class='banner'>
                    <div id="imgADPlayer">
                    </div>
                </div>
                <div class='post'>
                    <!--<a href="/images/other/cata.jpg" target="_blank">
                        <img src='images/renzhen.jpg' alt="齐星认证" width='208' height='70'></a>-->
                        	<div class='rz'>
					<p>中国航协权威认证</p>
					<h2><a href='http://www.cata.org.cn/clientWeb/frm_Single_Search.aspx?name=%u9F50%u661F&type=agentname&leixing=%u5BA2%u8FD0&chengshi=&chengqu=' target="_blank">航协号：XXXXXXX</a></h2>
				</div>
                    <ul class='bao'>
                        <li><a href='#'>1.天天低价</a></li>
                        <li><a href='#'>2.订单成功100%出票</a></li>
                        <li><a href='#'>3.便捷支付,支持票到付款</a></li>
                        <li><a href='#'>4.尊享“退改”秘书服务</a></li>
                    </ul>
                </div>
            </div>
            <div class='blank'>
            </div>
            <div>
                <img src='/resource/images/banner7.jpg'  width='680' height='86' /></div>
            <div class='blank'>
            </div>
            <!-- 特价票 -->
            <div id='sub' class='submenu'>
                <div class='tit'>
                    <div class='name'>
                        特价票</div>
                    <ul>
                     <!--   <li class='current'>美洲</li>
                        <li >美洲</li>
                        <li>欧洲</li>
                        <li>澳洲</li>
                        <li>东南亚</li>
                        <li>日韩</li>
                        <li>港澳台</li>-->
                    </ul>
                </div>
                
            </div>
            <!-- end 特价机票 -->
            <div class='blank'>
            </div>
            <!-- 热卖 优惠 回顾 -->
            <!-- end 热卖 优惠 回顾 -->
            <!-- 弹出窗口 -->
            
        </div>
        <!-- end 右 -->
    </div>
    <!-- end 内容部分 -->