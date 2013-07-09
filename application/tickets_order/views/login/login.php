 <!-- 内容部分 -->
 

 <?php echo form_open('login/login') ?>
 
<div id="Wapper">
        <div class='Index_middle'>
            <div class='login'>
                        <div class='content'>
                            <div class='item'>
                                <label><br>
                                    </label>

                            </div>
                            <div class='item1'>
                                <label>
                                    <br>用户名：</label>
                                <div class='cnt'>
                                    <input class="login_input" size='36' value="" id="login_username" name="login_username";>
                                </div>
                            </div>
                            <div class='item1'>
                                <label>
                                    <br>密码：</label>
                                    
                                <div class='cnt'>
                                    <input class="login_input" size='36' value=""  type="password" id="login_pass" name="login_pass";>
                                </div>
                            </div>
                            <div class='item1'>
                                <label style="color:red"><br>
                                     <?php 
                                     echo $gp_message;
                                     echo validation_errors(); ?>
                                    </label>

                            </div>
                            <div class='item1'>
                                <button value="" type="submit" class="btn" id="reg" name="reg" >登陆
                                </button>
                                <p style="position: relative;top: 30px; width:110px;"><a href='/index_t.php/gp_login/regester' style="color:#3593ea;">注册 &gt;&gt;</a>后优惠更多<p>
                            </div>
                            
                         </div>

             </div>
        
        </div>

</div>
</form>