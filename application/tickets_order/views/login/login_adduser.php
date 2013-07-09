 <!-- 内容部分 -->
 

<?php echo form_open('login/adduser') ?>
 
<div id="Wapper">
        <div class='Index_middle'>
            <div class='reg'>
                        <div class='content'>
                            <div class='item'>
                                <label><br>
                                    </label>

                            </div>
                            <div class='item1'>
                                <label>
                                    <br>用户名：*</label>
                                <div class='cnt'>
                                    <input class="login_input" size='36' value="<?php echo $login_username?>" id="login_username" name="login_username";>
                                </div>
                            </div>
                            <div class='item1'>
                                <label>
                                    <br>密码：*</label>
                                    
                                <div class='cnt'>
                                    <input class="login_input" size='36' value=""  type="password" id="login_pass" name="login_pass";>
                                </div>
                                <label>
                                    <br>再输一遍：*</label>
                                <div class='cnt' >
                                    <input class="login_input" size='36' value=""  type="password" id="login_pass2" name="login_pass2";>
                                    
                                </div>
                            </div>

                            <div class='item3' style=" position:relative;left:0px;top:20px;width:460px;   border:1px  dotted     #3593ea;">

                            </div>
                            <div class='item1'>
                                <label>
                                    <br>姓：*</label>
                                <div class='cnt'>
                                    <input class="login_input" size='30' value="<?php echo $login_firstname?>" id="login_firstname" name="login_firstname";>
                                </div>
                            </div>
                            <div class='item1'>
                                <label>
                                    <br>名：*</label>
                                <div class='cnt'>
                                    <input class="login_input" size='30' value="<?php echo $login_lastname?>" id="login_lastname" name="login_lastname";>
                                </div>
                            </div>
                            <div class='item1'>
                                <label>
                                    <br>邮箱：</label>
                                <div class='cnt'>
                                    <input class="login_input" size='75' value="<?php echo $login_email?>" id="login_email" name="login_email";>
                                </div>
                            </div>
                            <div class='item1'>
                                <label>
                                    <br>电话：*</label>
                                <div class='cnt'>
                                    <input class="login_input" size='75' value="<?php echo $login_cell?>" id="login_cell" name="login_cell";>
                                </div>
                            </div>
                            <div class='item1'>
                                <label>
                                    <br>是否内部员工：*</label>
                                <div class='cnt'>
                                    <input class="login_input" type="hidden" size='75' value="<?php echo $login_cell?>" id="login_is_staff" name="login_is_staff";>
                                          <select class="login_input" id="login_is_staff" name="login_is_staff" value="<?php echo $login_is_staff?>";>
                                          <option value ="0" selected="selected" ></option>
                                          <option value ="1">是</option>
                                          <option value ="0" >否</option>
                                            
                                        </select>
                                </div>
                            </div>
                            <div class='item3' style=" position:relative;left:0px;top:20px;width:460px;   border:1px  dotted     #3593ea;">

                            </div>
                            
                            <div class='item1'>
                                <label style="color:red"><br>
                                    您好，<?php echo $gp_username ?> <br>
                                     <?php 
                                     
                                     echo $gp_message;
                                     echo validation_errors(); ?>
                                    </label>

                            </div>
                            <div class='item3' style=" position:relative;left:0px;top:20px;width:460px;   border:1px  dotted     #3593ea;">

                            </div>
                            <div class='item1'>
                                <button value="" type="submit" class="btn" id="reg" name="reg" >提交</button>
                                
                                <p style="position: relative;top: 25px;"><a href='/index_t.php/login/' style="color:#3593ea;">登陆 &gt;&gt;</a><p>
                            </div>
                            
                         </div>

             </div>
        
        </div>

</div>
</form>