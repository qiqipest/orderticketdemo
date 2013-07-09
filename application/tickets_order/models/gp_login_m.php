<?php
class Gp_login_m extends CI_Model {

    public function __construct()
    {
      $this->load->database();
    }

    public function login_getpass($username = "")
    {
        //$query = $this->db->get('myticket');
        //return $query->result_array();
      
      $this->db->select('username, password, is_staff');
      $this->db->from('gp_auth_user');
      $this->db->where('username', $username);
      $query = $this->db->get();

      if ($query->num_rows() > 0)
      {
        return $query->row_array();
      }else{
        return array('password'=>"" , 'is_staff' =>0);
      }
    }

    public function login_getID($username = "")
    {
        //$query = $this->db->get('myticket');
        //return $query->result_array();
      
      $this->db->select('ID');
      $this->db->from('gp_auth_user');
      $this->db->where('username', $username);
      $query = $this->db->get();

      if ($query->num_rows() > 0)
      {
        return $query->row_array();
      }else{
        return array('ID' =>0);
      }
    }
    
    
    public function login_get_name_phone($username = "")
    {
        //$query = $this->db->get('myticket');
        //return $query->result_array();
      
      $this->db->select('username, first_name, last_name, phone');
      $this->db->from('gp_auth_user');
      $this->db->where('username', $username);
      $query = $this->db->get();

      if ($query->num_rows() > 0)
      {
        return $query->row_array();
      }else{
        return array('first_name'=>"" ,'last_name' =>"", 'phone' =>"");
      }
    }
    
    public function login_getstaff($username = "")
    {
        //$query = $this->db->get('myticket');
        //return $query->result_array();
      
      $this->db->select('username, is_staff');
      $this->db->from('gp_auth_user');
      $this->db->where('username', $username);
      $query = $this->db->get();

      if ($query->num_rows() > 0)
      {
        return $query->row_array();
      }else{
        return array('is_staff'=>"");
      }
    }
    
    public function login_insert()
    {
       $data = array(
        'username' => $this->input->post('login_username'),
        'first_name' => $this->input->post('login_firstname'),
        'last_name' => $this->input->post('login_lastname'),
        'email' => $this->input->post('login_email'),
        'Phone' => $this->input->post('login_cell'),
        'password' => md5($this->input->post('login_pass')),
        'is_staff' => 0,
        'is_active' => 0,
        'is_superuser' => 0,
        'last_login' => date("Y-m-d",time()),
        'date_joined' => date("Y-m-d",time())
        );
        return $this->db->insert('gp_auth_user', $data);

    }
    public function login_changepass($username = "", $pass ="")
    {

        $data = array(
                       'password' => md5($pass)
                    );

        $this->db->where('username', $username);
        $this->db->update('gp_auth_user', $data);
        return    mysql_affected_rows();

    }
    
    public function login_changeprofile($username,$data)
    {
        $data['last_login'] = date("Y-m-d",time());
        $this->db->where('username', $username);
        $this->db->update('gp_auth_user', $data);
        return    mysql_affected_rows();

    }
    
    public function login_getprofile($username = "")
    {
        //$query = $this->db->get('myticket');
        //return $query->result_array();
      
      $this->db->select('username,password,first_name, last_name ,email , Phone,is_staff');
      $this->db->from('gp_auth_user');
      $this->db->where('username', $username);
      $query = $this->db->get();

      if ($query->num_rows() > 0)
      {
        return $query->row_array();
      }else{
        return array();
      }
    }
    
    public function login_insert_staff()
    {
       $data = array(
        'username' => $this->input->post('login_username'),
        'first_name' => $this->input->post('login_firstname'),
        'last_name' => $this->input->post('login_lastname'),
        'email' => $this->input->post('login_email'),
        'Phone' => $this->input->post('login_cell'),
        'password' => md5($this->input->post('login_pass')),
        'is_staff' => $this->input->post('login_is_staff'),
        'is_active' => 0,
        'is_superuser' => 0,
        'last_login' => date("Y-m-d",time()),
        'date_joined' => date("Y-m-d",time())
        );
        return $this->db->insert('gp_auth_user', $data);

    }
    
    public function login_changeprofile_staff($username,$data)
    {
        $data['last_login'] = date("Y-m-d",time());
        $this->db->where('username', $username);
        $this->db->update('gp_auth_user', $data);
        return    mysql_affected_rows();

    }

  
}