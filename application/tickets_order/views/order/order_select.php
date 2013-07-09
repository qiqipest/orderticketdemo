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
        <div id='order_list' >

            <div class='blank'>
            </div>

            <!-- 特价机票 -->
            <div id='sub' class='order_list_menu'>
                <div class='tit'>
                    <div class='name'>
                        可选列表</div>
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
            <!-- start table----------------------------- -->
            <?php echo form_open('order/order_submit') ?>
            <!--     <form method="post" name="ticket_order" id="order_submit" action="/order_submit/">-->
                                            <input id="ddlOrgCity" name="ddlOrgCity" type="hidden" value="<?php echo $ddlOrgCity; ?>" />
                                            <input id="ddlDesCity" name="ddlDesCity" type="hidden" value="<?php echo $ddlDesCity; ?>" />
                                            <input id="control_date_from" name="control_date_from" type="hidden" value="<?php echo $control_date_from; ?>" />
                <div class='cnt' style="width: 658px;" >
                    <div class='dancen' >
                    </div>
                    <div class='wangfan'>
                    </div>
                    <div class='switch' style='display' >
                        <div class='order' >
                            <table class='tab' width='100%' cellspacing='0' cellpadding='0' >
                                
                                        <tr >
                                            
                                                   <div style="font-size:12px; font-weight:bold; color:red;"><br><?php echo $gp_message?>
                                                   欢迎来电咨询或在点击订购后，按要求写下详细信息，我们会在第一时间联系您
                                                   </div>
                                        </tr>
                                        <tr>
                                                <td>
                                                    <a href='#'>
                                                        路线
                                                </td>
                                                <td>
                                                    <span class="orange">
                                                        公司
                                                    </span>
                                                </td>
                                                <td>
                                                    <span class='gray'>
                                                        班次
                                                </td>
                                                <td>
                                                        价格
                                                </td>
                                                <td>

                                                </td>
                                            </tr>
                                        <?php $i = 0; ?>
                                        <?php foreach ($gp_catalog as $gp_catalog_item):?>
                                
                                            <input id="catalog_id" name="catalog_id[]" type="hidden" value="<?php echo $gp_catalog_item['catalog_id']; ?>" />
                                            <input id="catalog_detail" name="catalog_detail[]" type="hidden" value="<?php echo $gp_catalog_item['catalog_details']; ?>" />
                                            <input id="current_price" name="current_price[]" type="hidden" value="<?php echo $gp_catalog_item['current_price']; ?>" />
                                            
                                            <tr>
                                                <td>
                                                    <a href='#'>
                                                        <?php echo $gp_catalog_item['catalog_city_from']; ?>
                                                        ➝
                                                        <?php echo $gp_catalog_item['catalog_city_to']; ?>
                                                </td>
                                                <td>
                                                    <span class="orange">
                                                        <?php echo $gp_catalog_item['line_company']; ?>
                                                    </span>
                                                </td>
                                                <td>
                                                    <span class='gray'>
                                                        <?php echo $gp_catalog_item['line_number']; ?></span>
                                                </td>
                                                <td>
                                                    <span class='price'><?php echo $gp_catalog_item['current_price']; ?></span>
                                                </td>
                                                <td>
                                                    <input type="checkbox" name="order_select_chk[]" id="order_select_chk" onclick="" value="<?php echo $i?>" 
                                                    style="display: "  <?php echo set_checkbox('order_select_chk', '1'); ?> />
                                                    
                                                    <?php //echo form_checkbox('order_select', '1', False);?> 

                                                </td>
                                            </tr>
                                            <?php $i = $i+1; ?>
                                
                                
                                

                                
                                
                            
                            

                            <?php endforeach;?>
                            
                            <!--
                                        {% for items in catlog %}
                                            <input id="catalog_id" name="catalog_id" type="hidden" value="{{items.catalog_id}}" />
                                            <input id="catalog_detail" name="catalog_detail" type="hidden" value="{{items.catalog_detail}}" />
                                            <input id="current_price" name="current_price" type="hidden" value="{{items.Current_Price}}" />
                                            <tr>
                                                <td>
                                                    <a href='#'>
                                                        {{items.Catalog_City_From}}
                                                        ➝
                                                        {{items.Catalog_City_To}}</a>
                                                </td>
                                                <td>
                                                    <span class="orange">
                                                        {{items.Line_Company}}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span class='gray'>
                                                        {{items.Line_Date_From}}
                                                        截止</span>
                                                </td>
                                                <td>
                                                    <span class='price'>{{items.Current_Price}}</span>
                                                </td>
                                                <td>
                                                    <input name="order_select" id="order_select" type="checkbox" onclick="" 
                                                    style="display: "/>
                                                </td>
                                            </tr>
                                        {% endfor %}
                                    -->
                            </table>
                        </div>
                        

                        
                        
                        
                    </div>
            <div class='blank'>
            </div>
            <div class='order_submit'>
                <button value="" type="submit" class="btn" id="order_select" name="order_select"
                            onclick="" >
                        </button>
            </div>
                </form>
            <!-- end table----------------------------- -->
                
            </div>

            <!-- end 特价机票 -->
            <div class='blank'>
            </div>
            <!-- 热卖 优惠 回顾 -->
            <!-- end 热卖 优惠 回顾 -->
            <!-- 弹出窗口 -->
            <div id='pop_bg' class='pop_bg' style="display: none">
            </div>
            <div id='pop' class='pop' style='width: 500px; left: 35%; top: 40%; display: none'>
                <div class='title'>
                    <a class='close' href='javascript:void(0)'>×</a> 特惠机票预订
                </div>
                <div class='content'>
                    选择出发日期：
                    <br>
                    出发日期：
                    <input size='26' class="text" type="text" name="txtfrom_time" id="txtfrom_time" mod="notice|calendar"
                        mod_notice_tip="yyyy-mm-dd" mod_address_focusnext="true" mod_calendar_rangestart="#"
                        mod_calendar_rangeend="">
                    返程日期：
                    <input size='26' class="text" type="text" name="txtto_time" id="txtto_time" mod="notice|calendar"
                        mod_notice_tip="yyyy-mm-dd" mod_calendar_rangestart="#" mod_address_focusnext="true"
                        mod_calendar_reference="txtfrom_time" mod_calendar_rangeend="">
                    <div class='blank'>
                    </div>
                    <div class='tc'>
                        <input type='button' class='btn' value='查看' onclick="gofum();" />
                    </div>
                </div>
            </div>
        </div>
        <!-- end 右 -->
    </div>
    <!-- end 内容部分 -->
