<?php
class Gp_main extends CI_Controller {

  public function __construct()
  {
    parent::__construct();
    //$this->load->model('news_model');

  }
  public function main_show()
  {
    if ($this->session->userdata('gp_s_username') == '')
    {
        $data['gp_username'] = $this->session->set_userdata('gp_s_username','guest');

    }else{
        
    }
        $data['gp_username'] = $this->session->userdata('gp_s_username');


    $this->load->view('templates/gp_header', $data);
    $this->load->view('templates/gp_body', $data);
    //$this->load->view('news/index', $data);
    
    $this->load->view('templates/gp_footer');
  }
}