<?php
class Gp_order_m extends CI_Model {

    public function __construct()
    {
      $this->load->database();
    }

    public function order_get_city_id($city_name = "")
    {
        //$query = $this->db->get('myticket');
        //return $query->result_array();
      
      $this->db->select('city_id');
      $this->db->from('gp_city');
      $this->db->where('city_name', $city_name);
      $query = $this->db->get();

      if ($query->num_rows() > 0)
      {
        return $query->row_array();
      }else{
        return array('city_id'=>"");
      }
    }
    
    
    public function order_get_route($city_from = "", $city_to = "")
    {

      $this->db->select('route_id');
      $this->db->from('gp_route');
      $this->db->where('route_start_city_id', $city_from);
      $this->db->where('route_to_city_id', $city_to);
      $query = $this->db->get();

      if ($query->num_rows() > 0)
      {
        return $query->row_array();
      }else{
        return array('route_id'=>"");
      }
    }
    
    public function order_remove_order($order_id = "")
    {

        $this->db->where('order_id', $order_id);
        $this->db->delete('gp_order');
        return    mysql_affected_rows();

    }
    
    public function order_delete_order($order_id = "")
    {

        $data = array(
                   'Order_IsRetired' => 1

                );
        $this->db->where('order_id', $order_id);
        $this->db->update('gp_order',$data);
        return    mysql_affected_rows();

    }
    public function order_get_order($order_id = "", $order_phone = "")
    {
      if ($order_id == "" OR $order_phone == "")
      {
        return array();
      }

      
      
      $this->db->select('order_id,order_tot_price,order_remarks,order_create_time,order_quantity');
      $this->db->from('gp_order');
      
      if ($order_id != "")
      {
            $this->db->where('order_id', $order_id);
      }
      if ($order_phone != "")
      {
            $this->db->where('trim(order_phone) ', $order_phone);
      }
      $query = $this->db->get();

      if ($query->num_rows() > 0)
      {
        return $query->result();
      }else{
        return array();
      }
    }
    
    public function order_get_max_id()
    {

      $this->db->select('Max(order_id)+100000000 as order_id');
      $this->db->from('gp_order');

      $query = $this->db->get();

      return $query->row_array();

    }
    
    public function order_get_catalog($route_id = "",$start_date="")
    {

      $this->db->select('catalog_current_price,catalog_line_number,catalog_line_company,
                        catalog_line_time_start,,catalog_line_date_start,catalog_name,catalog_description,catalog_id');
      $this->db->from('gp_catalog');
      
      //$array = array('route_id' => $route_id, 'start_date' => $start_date,'Catalog_Line_Occurrence_Flag' => 0);
      
      $where = "route_id = " . $route_id . " and catalog_line_date_start = str_to_date('".$start_date."','%Y-%m-%d')" . " and Catalog_Line_Occurrence_Flag = 0";
      $this->db->where($where);
      $where =  "route_id = " . $route_id .  " and mod(TIMESTAMPDIFF(day,Catalog_Line_Date_Start,'". $start_date ."'),Catalog_Line_Occurrence) = 0 and Catalog_Line_Occurrence_Flag = 1";
      $this->db->or_where($where);
      
      
      
      
      
      $query = $this->db->get();

      if ($query->num_rows() > 0)
      {
        return $query->result();
      }else{
        return array();
      }
    }
    
    public function order_insert( $data )
    {
     //  $data = array(
     //   'username' => $this->input->post('login_username'),
     //   'first_name' => $this->input->post('login_firstname'),
     //   'last_name' => $this->input->post('login_lastname'),
     //   'email' => $this->input->post('login_email'),
     //   'Phone' => $this->input->post('login_cell'),
     //   'password' => md5($this->input->post('login_pass')),
     //   'is_staff' => 0,
     //   'is_active' => 0,
     //   'is_superuser' => 0,
     //   'last_login' => date("Y-m-d",time()),
     //   'date_joined' => date("Y-m-d",time())
     //   );
        return $this->db->insert('gp_order', $data);

    }
    
    
}