<script language="javascript">
function checkspace(checkstr) {
  var str = '';
  for(i = 0; i < checkstr.length; i++) {
    str = str + ' ';
  }
  return (str == checkstr);
}

function check_null(){
  if(checkspace(document.form1.cus_name.value))
  {
    alert('请填写姓名');
    document.form1.cus_name.focus();
    return false;
    }
  if(checkspace(document.form1.cus_phone.value))
  {
    alert('请填写电话');
    document.form1.cus_phone.focus();
    return false;
    }
    return true;
}
</script>

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
                        填写个人信息</div>
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

            <!-- start table----------------------------- -->
                <?php echo form_open('order/order_insert',array('name'=>'form1')) ?>
                <?php $this->session->set_flashdata('submit_flg', '1');?>
                                            <input id="ddlOrgCity" name="ddlOrgCity" type="hidden" value="<?php echo $ddlOrgCity; ?>" />
                                            <input id="ddlDesCity" name="ddlDesCity" type="hidden" value="<?php echo $ddlDesCity; ?>" />
                                            <input id="control_date_from" name="control_date_from" type="hidden" value="<?php echo $control_date_from; ?>" />
                                        
                                        <?php foreach ($gp_catalog_submit as $gp_catalog_submit_item):?>
                                            <div class='menu_left' ailgn = 'left'>
                                            <?php echo $gp_catalog_submit_item['catalog_details']; ?>

                                            
                                                <div class="inputbox">
                                                    <input id="quantity" name="quantity[]" type="text" value="1" size="1" maxlength="2"/> 
                                                </div>
                                                    <div class='menu_q' >
                                                    数量：
                                                    </div>
                                            </div>
                                            

                                        <input id="catalog_detail" name="catalog_detail[]" type="hidden" value="<?php echo $gp_catalog_submit_item['catalog_details']; ?>" />
                                        <input id="catalog_id" name="catalog_id[]" type="hidden" value="<?php echo $gp_catalog_submit_item['catalog_id']; ?>" />
                                        <input id="current_price" name="current_price[]" type="hidden" value="<?php echo $gp_catalog_submit_item['current_price']; ?>" />
                                            

                                        <?php endforeach;?>

                <div class='cnt' style="width: 658px;">

                    <div class='switch' style='display'>
                        <div class='order'>
                            <table class='tab' width='100%' cellspacing='0' cellpadding='0'>
                                        <tr>
                                            请填写个人信息，我们会在接到订单后电话联系您。<?php echo $gp_message?> <?php echo validation_errors(); ?>
                                        </tr>
                                        <tr>
                                            <td align ='right'>
                                                姓名*:
                                            </td>
                                            <td>
                                                <div class="inputbox1">
                                                    <input id="cus_name" name="cus_name" type="text" value="<?php echo $user_name_whole_str?>" size="10" maxlength="10"/> 
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align ='right'>
                                                电话*:
                                            </td>
                                            <td>
                                                <div class="inputbox1">
                                                    <input id="cus_phone" name="cus_phone" type="text" value="<?php echo $phone?>" size="10" maxlength="20"/> 
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align ='right'>
                                                证件号码:
                                            </td>
                                            <td>
                                                <div class="inputbox1">
                                                    <input id="cus_ID" name="cus_ID" type="text" value="" size="30" maxlength="30"/> 
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align ='right'>
                                                备注:
                                            </td>
                                            <td>
                                                   <textarea name="remarks" cols ="50" rows = "3"></textarea>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align ='right'>
                                                付款方式:
                                            </td>
                                            <td>
                                                    <input type='radio' name='payment_type' value='01' checked> 货到现金付款 <br>
                                                    
                                                    <input type='radio' name='payment_type' value='02' disabled="disabled"> 网络付款（建设中...）<br>
                                                    
                                                    <input type='radio' name='payment_type' value='03' disabled="disabled"> 银行转账（建设中...）<br>
                                            </td>
                                        </tr>
                            </table>
                            <table class='tab' width='100%' cellspacing='0' cellpadding='0'>
                            </table>
                        </div>
                        
                        
                        
                        
                    </div>
            <div class='order_submit'>
                <button value="" type="submit" class="btn" id="order_select" name="order_select"
                            onclick="return check_null()" >
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
        </div>
        <!-- end 右 -->
    </div>
    <!-- end 内容部分 -->



