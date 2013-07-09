 <!-- 内容部分 -->
 

<?php echo form_open('login/changepass') ?>
 
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
                                    <br>密码：*</label>
                                    
                                <div class='cnt'>
                                    <input class="login_input" size='36' value=""  type="password" id="login_pass" name="login_pass";>
                                </div>
                            </div>
                            <div class='item1'>
                                <label>
                                    <br>改后密码：*</label>
                                    
                                <div class='cnt'>
                                    <input class="login_input" size='36' value=""  type="password" id="login_pass1" name="login_pass1";>
                                </div>
                                <label>
                                    <br>再输一遍：*</label>
                                <div class='cnt' >
                                    <input class="login_input" size='36' value=""  type="password" id="login_pass2" name="login_pass2";>
                                    
                                </div>
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
                                

                            </div>
                            
                         </div>

             </div>
        
        </div>

</div>
</form>