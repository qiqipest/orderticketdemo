<?php

class Blog extends CI_Controller {

    function __construct()
    {
     parent::__construct();
    }

    function index()
    {
      $data['title'] = "My Blog Title";
      $data['heading'] = "My Blog Heanding";
      $data['todo'] = array('clean hose','eat lunch','call mom');

      $this->load->view('blog_view', $data);
    }
}
?>
