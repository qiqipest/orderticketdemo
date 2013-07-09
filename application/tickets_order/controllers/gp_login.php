<?php
class Gp_login extends CI_Controller {

  public function __construct()
  {
    parent::__construct();
    if ($this->session->userdata('gp_s_username') == '')
    {
        $this->session->set_userdata('gp_s_username','guest');
        $this->session->set_userdata('gp_s_is_staff', 0);
    }else{
        
    }

  }
  public function login()
  {
    $this->load->helper('form');
    $data['gp_username'] = $this->session->userdata('gp_s_username');
    $data['gp_message'] = "";
    //********************************************************
    // guest -> register
    //********************************************************
    if  ($this->session->userdata('gp_s_username') != 'guest')
    {
            $data['gp_message'] = "请先退出后重新登陆";
            $this->load->view('templates/gp_header', $data);
            $this->load->view('order/order_select', $data);
            $this->load->view('templates/gp_footer');
            return;
    }


    
    if ($_POST) {

    $this->load->library('form_validation');
    $this->form_validation->set_message('required', '%s不为空');
    $this->form_validation->set_rules('login_username', '用户名', 'required');
    $this->form_validation->set_rules('login_pass', '密码', 'required');

        if ($this->form_validation->run() === FALSE)
        {
            //$data['gp_message'] = "用户名或密码错误，请重新输入";
            $this->load->view('templates/gp_header', $data);
            $this->load->view('login/login', $data);
            $this->load->view('templates/gp_footer');
            return;
        
        }
        
        $this->load->model('gp_login_m');
        $row=$this->gp_login_m->login_getpass($this->input->post('login_username'));

        if(md5($this->input->post('login_pass')) == $row['password'])
        {

                        $this->session->set_userdata('gp_s_username',$row['username']);
                        $this->session->set_userdata('gp_s_is_staff',$row['is_staff']);
                        $data['gp_username'] = $this->session->userdata('gp_s_username');
                        $this->load->view('templates/gp_header', $data);
                        $this->load->view('login/login_result', $data);
                        $this->load->view('templates/gp_footer');
                        return;
        
        }else{
                        $data['gp_message'] = "用户名或密码错误，请重新输入";
                        $this->load->view('templates/gp_header', $data);
                        $this->load->view('login/login', $data);
                        $this->load->view('templates/gp_footer');
                        return;
        }
        
    
    }else{
            $data['gp_message'] = "欢迎登陆";
            $this->load->view('templates/gp_header', $data);
            $this->load->view('login/login', $data);
            $this->load->view('templates/gp_footer');
            return;
    }
    

    
    
  }//login end
  
  public function register()
  {

       $data['gp_username'] = $this->session->userdata('gp_s_username');
       $this->load->helper('form');
       $data['gp_message'] ="";
        
        $data['login_username'] = "";
        $data['login_firstname'] = "";
        $data['login_lastname'] = "";
        $data['login_email'] = "";
        $data['login_cell'] = "";
       
       if ($_POST) {
            $this->load->library('form_validation');
            $this->form_validation->set_message('required',     '%s不为空');
            $this->form_validation->set_rules('login_firstname',    '姓', 'required');
            $this->form_validation->set_rules('login_lastname',     '名', 'required');
            //$this->form_validation->set_rules('login_email',        '邮箱', 'required');
            $this->form_validation->set_rules('login_cell',         '电话', 'required');
            $this->form_validation->set_rules('login_username', '用户名', 'required');
            $this->form_validation->set_rules('login_pass', '密码', 'required');
            $this->form_validation->set_rules('login_pass2', '密码', 'required');
            
            $data['login_firstname'] =  $this->input->post('login_firstname');
            $data['login_lastname'] =   $this->input->post('login_lastname');
            $data['login_email'] =      $this->input->post('login_email');
            $data['login_cell'] =       $this->input->post('login_cell');
            $data['login_username'] =   $this->input->post('login_username');
            
            
            //set_value('login_username', $this->input->post('login_username'));

            if ($this->form_validation->run() === FALSE)
            {
                $data['gp_message'] = "尊敬的顾客，请填写以上，以便我们及时跟您确认订票的信息";
                $this->load->view('templates/gp_header', $data);
                $this->load->view('login/login_register.php', $data);
                $this->load->view('templates/gp_footer');
                return;
            }
            //********************************************************
            //密码是否相同
            //********************************************************
            if ($this->input->post('login_pass2') !== $this->input->post('login_pass'))
            {
                $data['gp_message'] = "尊敬的顾客，您2次输入的密码不匹配，请重新输入";
                $this->load->view('templates/gp_header', $data);
                $this->load->view('login/login_register.php', $data);
                $this->load->view('templates/gp_footer');
                return;
            }
            //********************************************************
            //用户名是否存在
            //********************************************************
            $this->load->model('gp_login_m');
            $row=$this->gp_login_m->login_getpass($this->input->post('login_username'));
            if ($row['password'] != "")
            {
                $data['gp_message'] = "尊敬的顾客，此用户名已被注册。";
                $this->load->view('templates/gp_header', $data);
                $this->load->view('login/login_register', $data);
                $this->load->view('templates/gp_footer');
                return;
            }
            
            //********************************************************
            //插入数据
            //********************************************************

            $result=$this->gp_login_m->login_insert();
            if ($result === False)
            {
                $data['gp_message'] = "尊敬的顾客，可能由于网络原因您未能注册成功，请重新注册 或 致电我们。";
                $this->load->view('templates/gp_header', $data);
                $this->load->view('login/login_register', $data);
                $this->load->view('templates/gp_footer');
                return;
            }
            $this->session->set_userdata('gp_s_username',$this->input->post('login_username'));
            $data['gp_username'] = $this->session->userdata('gp_s_username');
            
            $this->load->view('templates/gp_header', $data);
            $this->load->view('login/login_register_result', $data);
            $this->load->view('templates/gp_footer');
            return;
        }
            $this->load->view('templates/gp_header', $data);
            $this->load->view('login/login_register', $data);
            $this->load->view('templates/gp_footer');
            return;
   } 
   
  public function changepass()
  {
    $this->load->helper('form');
    $data['gp_username'] = $this->session->userdata('gp_s_username');
    $data['gp_message'] = "";
    //********************************************************
    // guest -> register
    //********************************************************
    if  ($this->session->userdata('gp_s_username') == 'guest')
    {
            $this->load->view('templates/gp_header', $data);
            $this->load->view('login/login', $data);
            $this->load->view('templates/gp_footer');
            return;
    }

    //$data['gp_username'] = $this->session->userdata('gp_s_username');
    $data['gp_message'] = "";
    
    if ($_POST) {
        $this->load->library('form_validation');
        $this->form_validation->set_message('required', '%s不为空');
        //$this->form_validation->set_rules('login_username', '用户名', 'required');
        $this->form_validation->set_rules('login_pass', '密码', 'required');
        $this->form_validation->set_rules('login_pass1', '更新密码', 'required');
        $this->form_validation->set_rules('login_pass2', '确认密码', 'required');



        if ($this->form_validation->run() === FALSE)
        {
            //$data['gp_message'] = "用户名或密码错误，请重新输入";
            $this->load->view('templates/gp_header', $data);
            $this->load->view('login/login_changepass', $data);
            $this->load->view('templates/gp_footer');
            return;
        
        }
        
       //********************************************************
       //密码是否相同
       //********************************************************
       if ($this->input->post('login_pass2') !== $this->input->post('login_pass1'))
       {
           $data['gp_message'] = "尊敬的顾客，您2次输入的密码不匹配，请重新输入";
           $this->load->view('templates/gp_header', $data);
           $this->load->view('login/login_changepass.php', $data);
           $this->load->view('templates/gp_footer');
           return;
       }
        
        
        $this->load->model('gp_login_m');
        $row=$this->gp_login_m->login_getpass($this->session->userdata('gp_s_username'));

        if(md5($this->input->post('login_pass')) !== $row['password'])
        {
                $data['gp_message'] = "旧密码不匹配，请重新输入";
                if ($row['password'] === "")
                {
                    $data['gp_message'] = "用户异常，请重新登陆或者致电我们";
                    $this->session->set_userdata('gp_s_username','guest');
                }
                        $this->load->view('templates/gp_header', $data);
                        $this->load->view('login/login_changepass', $data);
                        $this->load->view('templates/gp_footer');
                        return;
        
        }
        
        if($this->gp_login_m->login_changepass($this->session->userdata('gp_s_username'),$this->input->post('login_pass1')) !== 0)
        {
                        
                        $this->load->view('templates/gp_header', $data);
                        $this->load->view('login/login_register_result', $data);
                        $this->load->view('templates/gp_footer');
                        return;
        }
        
        $data['gp_message'] = "更新错误，请重新尝试";
        $this->load->view('templates/gp_header', $data);
        $this->load->view('login/login_changepass', $data);
        $this->load->view('templates/gp_footer');
        return;
    
    }else{
            $this->load->view('templates/gp_header', $data);
            $this->load->view('login/login_changepass', $data);
            $this->load->view('templates/gp_footer');
            return;
    }
    

    
    
  }//changepass end
   
   
  public function changeprofile()
  {
    $this->load->helper('form');
    $data['gp_username'] = $this->session->userdata('gp_s_username');
    $data['gp_message'] = "";
    $this->load->model('gp_login_m');
    //********************************************************
    // guest -> register
    //********************************************************
    if  ($this->session->userdata('gp_s_username') == 'guest')
    {
            $this->load->view('templates/gp_header', $data);
            $this->load->view('login/login', $data);
            $this->load->view('templates/gp_footer');
            return;
    }
    $data['gp_message'] = "";
    $data['login_firstname'] = "";
    $data['login_lastname'] = "";
    $data['login_email'] = "";
    $data['login_cell'] = "";
    $profile = array();
    //********************************************************
    // get profile
    //********************************************************
    $row=$this->gp_login_m->login_getprofile($this->session->userdata('gp_s_username'));
    if(!empty($row))
    {
        $data['login_firstname'] = $row['first_name'];
        $data['login_lastname'] = $row['last_name'];
        $data['login_email'] = $row['email'];
        $data['login_cell'] = $row['Phone'];
    }
    
    //$data['gp_username'] = $this->session->userdata('gp_s_username');

    
    
    if ($_POST) {
        
        if($this->input->post('login_firstname') !='')
        {
            $profile['first_name'] = $this->input->post('login_firstname');
        }
        if($this->input->post('login_firstname') !='')
        {
            $profile['first_name'] = $this->input->post('login_firstname');
        }
        
        if($this->input->post('login_lastname') !='')
        {
            $profile['last_name'] = $this->input->post('login_lastname');
        }
        
        if($this->input->post('login_email') !='')
        {
            $profile['email'] = $this->input->post('login_email');
        }
        
        if($this->input->post('login_cell') !='')
        {
            $profile['Phone'] = $this->input->post('login_cell');
        }
        
        if (empty($profile))
        {
            $data['gp_message'] = "请至少进行一项改动，重新尝试";
            $this->load->view('templates/gp_header', $data);
            $this->load->view('login/login_changeprofile', $data);
            $this->load->view('templates/gp_footer');
            return;
        }

        if($this->gp_login_m->login_changeprofile($this->session->userdata('gp_s_username'),$profile) !== 0)
        {
                        
                        $this->load->view('templates/gp_header', $data);
                        $this->load->view('login/login_register_result', $data);
                        $this->load->view('templates/gp_footer');
                        return;
        }
        
        $data['gp_message'] = "更新错误，请重新尝试";
        $this->load->view('templates/gp_header', $data);
        $this->load->view('login/login_changeprofile', $data);
        $this->load->view('templates/gp_footer');
        return;

        

    
    }else{
            $this->load->view('templates/gp_header', $data);
            $this->load->view('login/login_changeprofile', $data);
            $this->load->view('templates/gp_footer');
            return;
    }
    

    
    
  }//changepofile end
   
  public function logout()
  {
    $this->session->set_userdata('gp_s_username','guest');
    $data['gp_username'] = $this->session->userdata('gp_s_username');
    $data['gp_message'] = "";
    
                            $this->load->view('templates/gp_header', $data);
                            $this->load->view('login/login_register_result', $data);
                            $this->load->view('templates/gp_footer');
  }//logoutend
   

   
  public function adduser()
  {

       $data['gp_username'] = $this->session->userdata('gp_s_username');
       $this->load->helper('form');
       $data['gp_message'] ="";
        
        $data['login_username'] = "";
        $data['login_firstname'] = "";
        $data['login_lastname'] = "";
        $data['login_email'] = "";
        $data['login_cell'] = "";
        $data['login_is_staff'] = "";
       
       if ($_POST) {
            $this->load->library('form_validation');
            $this->form_validation->set_message('required',     '%s不为空');
            $this->form_validation->set_rules('login_firstname',    '姓', 'required');
            $this->form_validation->set_rules('login_lastname',     '名', 'required');
            //$this->form_validation->set_rules('login_email',        '邮箱', 'required');
            $this->form_validation->set_rules('login_cell',         '电话', 'required');
            $this->form_validation->set_rules('login_username', '用户名', 'required');
            $this->form_validation->set_rules('login_pass', '密码', 'required');
            $this->form_validation->set_rules('login_pass2', '密码', 'required');
            $this->form_validation->set_rules('login_is_staff', '是否员工', 'required');
            
            $data['login_firstname'] =  $this->input->post('login_firstname');
            $data['login_lastname'] =   $this->input->post('login_lastname');
            $data['login_email'] =      $this->input->post('login_email');
            $data['login_cell'] =       $this->input->post('login_cell');
            $data['login_username'] =   $this->input->post('login_username');
            $data['login_is_staff'] =   $this->input->post('login_is_staff');
            
            
            //set_value('login_username', $this->input->post('login_username'));

            if ($this->form_validation->run() === FALSE)
            {
                $data['gp_message'] = "请填写以上全部信息";
                $this->load->view('templates/gp_header', $data);
                $this->load->view('login/login_adduser.php', $data);
                $this->load->view('templates/gp_footer');
                return;
            }
            //********************************************************
            //密码是否相同
            //********************************************************
            if ($this->input->post('login_pass2') !== $this->input->post('login_pass'))
            {
                $data['gp_message'] = "您2次输入的密码不匹配，请重新输入";
                $this->load->view('templates/gp_header', $data);
                $this->load->view('login/login_adduser.php', $data);
                $this->load->view('templates/gp_footer');
                return;
            }
            //********************************************************
            //用户名是否存在
            //********************************************************
            $this->load->model('gp_login_m');
            $row=$this->gp_login_m->login_getpass($this->input->post('login_username'));
            if ($row['password'] != "")
            {
                $data['gp_message'] = "此用户名已被注册。";
                $this->load->view('templates/gp_header', $data);
                $this->load->view('login/login_adduser', $data);
                $this->load->view('templates/gp_footer');
                return;
            }
            
            //********************************************************
            //插入数据
            //********************************************************

            $result=$this->gp_login_m->login_insert_staff();
            if ($result === False)
            {
                $data['gp_message'] = "由于网络或其他原因您未能添加成功，请重新注册 或 致电维护人员。";
                $this->load->view('templates/gp_header', $data);
                $this->load->view('login/login_adduser', $data);
                $this->load->view('templates/gp_footer');
                return;
            }
            //$this->session->set_userdata('gp_s_username',$this->input->post('login_username'));
            //$data['gp_username'] = $this->session->userdata('gp_s_username');
            
            $this->load->view('templates/gp_header', $data);
            $this->load->view('login/login_register_result', $data);
            $this->load->view('templates/gp_footer');
            return;
        }
            $this->load->view('templates/gp_header', $data);
            $this->load->view('login/login_adduser', $data);
            $this->load->view('templates/gp_footer');
            return;
   } 
   
   
  public function changeprofile_staff()
  {
    $this->load->helper('form');
    $data['gp_username'] = $this->session->userdata('gp_s_username');
    $data['gp_message'] = "";
    $this->load->model('gp_login_m');
    
    $data['gp_message'] = "";
    $data['login_firstname'] = "";
    $data['login_lastname'] = "";
    $data['login_email'] = "";
    $data['login_cell'] = "";
    $data['login_username'] = "";
    $profile = array();
    
    //********************************************************
    // guest -> register
    //********************************************************
    if  ($this->session->userdata('gp_s_username') == 'guest')
    {
            $this->load->view('templates/gp_header', $data);
            $this->load->view('login/login', $data);
            $this->load->view('templates/gp_footer');
            return;
    }
    if($this->session->userdata('gp_s_is_staff') != 1)
            {
            $data['gp_message'] = "您不是公司员工，不能改动其他用户，请尝试改动自己的信息";
            $this->load->view('templates/gp_header', $data);
            $this->load->view('login/login_changeprofile_staff', $data);
            $this->load->view('templates/gp_footer');
            return;
        }
    


    
    //$data['gp_username'] = $this->session->userdata('gp_s_username');

    
    
    if ($_POST) {
    
    //********************************************************
    // get profile
    //********************************************************
    $row=$this->gp_login_m->login_getprofile($this->input->post('login_username'));
    if(!empty($row))
    {
        $data['login_username'] = $row['username'];
        $data['login_firstname'] = $row['first_name'];
        $data['login_lastname'] = $row['last_name'];
        $data['login_email'] = $row['email'];
        $data['login_cell'] = $row['Phone'];
        $data['login_is_staff'] = $row['is_staff'];
    }
        

        if($this->input->post('login_pass') !='')
        {
            $profile['password'] = $this->input->post('login_pass');
        }
        
        if($this->input->post('login_firstname') !='')
        {
            $profile['first_name'] = $this->input->post('login_firstname');
        }
        
        if($this->input->post('login_lastname') !='')
        {
            $profile['last_name'] = $this->input->post('login_lastname');
        }
        
        if($this->input->post('login_email') !='')
        {
            $profile['email'] = $this->input->post('login_email');
        }
        
        if($this->input->post('login_cell') !='')
        {
            $profile['Phone'] = $this->input->post('login_cell');
        }
        if($this->input->post('login_is_staff') !='')
        {
            $profile['is_staff'] = $this->input->post('login_is_staff');
        }
        
        if ($this->input->post('login_username') == $this->session->userdata('gp_s_username'))
        {
                        $data['gp_message'] = "请修改其他用户。如果更改此用户，请选择修改个人信息";
                        $this->load->view('templates/gp_header', $data);
                        $this->load->view('login/login_changeprofile_staff', $data);
                        $this->load->view('templates/gp_footer');
                        return;
        }
        
        if (empty($profile))
        {
            $data['gp_message'] = "请至少进行一项改动，重新尝试";
            $this->load->view('templates/gp_header', $data);
            $this->load->view('login/login_changeprofile_staff', $data);
            $this->load->view('templates/gp_footer');
            return;
        }
        


        if($this->gp_login_m->login_changeprofile_staff($this->input->post('login_username'),$profile) !== 0)
        {
                        
                        $this->load->view('templates/gp_header', $data);
                        $this->load->view('login/login_register_result', $data);
                        $this->load->view('templates/gp_footer');
                        return;
        }
        
        $data['gp_message'] = "更新错误或未进行更新，请重新尝试";
        $this->load->view('templates/gp_header', $data);
        $this->load->view('login/login_changeprofile_staff', $data);
        $this->load->view('templates/gp_footer');
        return;

        

    
    }else{
            $this->load->view('templates/gp_header', $data);
            $this->load->view('login/login_changeprofile_staff', $data);
            $this->load->view('templates/gp_footer');
            return;
    }
    
    }

   
   
   
   
   
   
}