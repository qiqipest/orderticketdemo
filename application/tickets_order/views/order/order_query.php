

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
                    <form id="searchform" name="searchform" method="post" class="form" action="/index_t.php/order/order_select">
                    <div class='item'>
                        <label>
                            航班类型：</label>
                        <div class='cnt'>
                           <label style="display: none" > <input name="rdodan" id="rdodan1" type="radio" onclick="showhide(this)" value="2"
                                 style="display: none" />
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
                                value="<?php echo $ddlOrgCity?>" name="ddlOrgCity" onclick="suggestF.display(this,'',event);">

                        </div>
                             
                    </div>
                    <div class='item'>
                        <label>
                            到达城市：</label>
                        <div class='cnt'>
                            <input style="cursor: pointer" id="ddlDesCity" class="text  city" size='26' value="<?php echo $ddlDesCity?>"
                                 name="ddlDesCity" onclick="suggestF.display(this,'ddlOrgCity2',event);">
                        </div>
                            
                    </div>
                    <div class='item'>
                        <label>
                            出发日期：</label>
                        <div class='cnt'>
                            <input size='26' class="text time" type="text" name="control_date_from" id="control_date_from" onclick="new Calendar().show(this);" 
                            value= "<?php echo $control_date_from?>" >
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
                        <button value="" type="submir" class="btn" id="domestic_searching" name="domestic_searching"
                            onclick="return indexformsearch();">
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
        <div id='order_list'>

            <div class='blank'>
            </div>

            <!-- 特价机票 -->
            <div id='sub' class='order_list_menu'>
                <div class='tit'>
                    <div class='name'>
                        查询</div>
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

<?php //phpinfo(); ?>
            <!-- start table--------------------------- -->
                <form method="post" name="ticket_order_submit" id="order_submit" action="/index_t.php/order/order_query/"> 
           <?php //echo form_open('order/order_query') ?>
                <div class='cnt' style="width: 658px;">

                    <div class='switch' style='display'>
                        <div class='order'>
                            <table class='tab' width='100%' cellspacing='0' cellpadding='0'>
                                
                                
                                
                                        <tr>
                                            请输入您的订单号或所留电话进行查询 <div style="color:red;"><?php echo validation_errors();?></div>
                                        </tr>
                                        <tr>
                                            <td align ='right'>
                                                订单号:
                                            </td>
                                            <td>
                                                <div class="inputbox1">
                                                    <input id="order_id" name="order_id" type="text" value="<?php echo $order_id; ?>" size="10" maxlength="10"/> 
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align ='right'>
                                                电话:
                                            </td>
                                            <td>
                                                <div class="inputbox1">
                                                    <input id="order_phone" name="order_phone" type="text" value="<?php echo $order_phone; ?>" size="10" maxlength="20"/> 
                                                </div>
                                            </td>
                                        </tr>
                                        

                                    
                            </table>
                            <div class='blank'>
                            </div>
                            <div class='blank'>
                            </div>
                            <div class='search'>
                            <button type="submit" id="order_query" class='btn1' name="order_query" value = "查询"
                            onclick="" >
                            </button>
             </form>
                            <table class='tab' width='100%' cellspacing='0' cellpadding='0'>
                                <tr>
                                    <div class='title'>
                                    信息显示: <div style="color:red;"><?php echo "$gp_message";?></div>
                                    </div>
                                    <td align ='left'>
                                                详细
                                    </td>
                                    <td align ='left'>
                                                创建时间
                                    </td>
                                    <td align ='left'>
                                                数量
                                    </td>
                                    <td align ='left'>
                                                总价
                                    </td>
                                    
                                </tr>
                                <form method="post" name="ticket_order_submit" id="order_submit" action="/index_t.php/order/order_query/">

                                  <?php foreach ($gp_order_query as $gp_order_query_item):?>
                                    <tr>
                                            <td align ='left'>
                                                <?php echo $gp_order_query_item['order_remarks']; ?>
                                            </td>
                                            <td align ='left'>
                                                <?php echo $gp_order_query_item['order_create_time']; ?>
                                            </td>
                                            <td align ='left'>
                                                <?php echo $gp_order_query_item['order_quantity']; ?>
                                            </td>
                                            <td align ='left'>
                                                <?php echo $gp_order_query_item['order_tot_price']; ?>
                                            </td>
                                            <td align ='left' >
                                                <input id="order_id_del" name="order_id_del" type="hidden" value="<?php echo "$order_id"; ?>" />
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
                                                
                                                
                                                <?php if ($hader_is_staff === 1):?>
                                                <button type="submit"  class='delete_order'  
                                                    onclick=' if(confirm("真的要删除吗？")){return true;}else{return false;}; '>删除
                                                </button>
                                                <?php endif;?>
                                            </td>
                                    </tr>
                                <?php endforeach;?>
                                 </form>
                                 
                            </table>

                        </div>

                    </div>
                    
            </div>
            <!-- end table----------------------------- -->
                
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

