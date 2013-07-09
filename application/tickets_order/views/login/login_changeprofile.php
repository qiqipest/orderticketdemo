 <!-- 内容部分 -->
 

<?php echo form_open('login/changeprofile') ?>
 
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
                                    <br>姓：</label>
                                <div class='cnt'>
                                    <input class="login_input" size='30' value="<?php echo $login_firstname?>" id="login_firstname" name="login_firstname";>
                                </div>
                            </div>
                            <div class='item1'>
                                <label>
                                    <br>名：</label>
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
                                    <br>电话：</label>
                                <div class='cnt'>
                                    <input class="login_input" size='75' value="<?php echo $login_cell?>" id="login_cell" name="login_cell";>
                                </div>
                            </div>
                            <div class='item3' style=" position:relative;left:0px;top:20px;width:460px;   border:1px  dotted     #3593ea;">

                            </div>
                            
                            <div class='item1'>
                                <label style="color:red"><br>
                                    您好，<?php echo $gp_username ?> <br>
                                     <?php 
                                     
                                     echo $gp_message;
                                     //echo validation_errors(); 
                                     ?>
                                    </label>

                            </div>
                            <div class='item3' style=" position:relative;left:0px;top:20px;width:460px;   border:1px  dotted     #3593ea;">

                            </div>
                            <div class='item1'>
                                <button value="" type="submit" class="btn" id="reg" name="reg" >提交</button>
                                
                                <p style="position: relative;top: 25px;"><a href='/index_t.php/gp_login/' style="color:#3593ea;">登陆 &gt;&gt;</a><p>
                            </div>
                            
                         </div>

             </div>
        
        </div>

</div>
</form>