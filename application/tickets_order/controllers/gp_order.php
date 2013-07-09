<?php
class Gp_order extends CI_Controller {

  public function __construct()
  {
    parent::__construct();
    //$this->load->model('news_model');

  }
  public function order_select()
  {
    if ($this->session->userdata('gp_s_username') == '')
    {
        $data['gp_username'] = $this->session->set_userdata('gp_s_username','guest');

    }else{

    }
    $data['gp_username'] = $this->session->userdata('gp_s_username');
    $data['ddlOrgCity'] = '';
    $data['ddlDesCity'] = '';
    $data['control_date_from'] = '';
    $data['gp_message'] ="";
    $data['gp_catalog'] = array();

    
    $this->load->helper('form');
    $this->load->model('gp_order_m');
    
    if ($_POST) {
        if($this->input->post('ddlOrgCity') !='')
        {
            $data['ddlOrgCity'] = $this->input->post('ddlOrgCity');
        }
        if($this->input->post('ddlDesCity') !='')
        {
            $data['ddlDesCity'] = $this->input->post('ddlDesCity');
        }        
        if($this->input->post('control_date_from') !='')
        {
            $data['control_date_from'] = $this->input->post('control_date_from');
        }
    
        $row=$this->gp_order_m->order_get_city_id($this->input->post('ddlOrgCity'));
        $city_id_from = $row['city_id'];
        $row=$this->gp_order_m->order_get_city_id($this->input->post('ddlDesCity'));
        $city_id_to = $row['city_id'];
        
        if ($city_id_from == "" OR $city_id_to == "" )
            {
                $data['gp_message'] = "暂无您所选城市信息";
                $this->load->view('templates/gp_header', $data);
                $this->load->view('order/order_select', $data);
                $this->load->view('templates/gp_footer');
                return;
            }
            
        $row=$this->gp_order_m->order_get_route($city_id_from,$city_id_to);
        $route_id = $row['route_id'];

        if ($route_id == "" )
            {
                $data['gp_message'] = "暂无您所需路线";
                $this->load->view('templates/gp_header', $data);
                $this->load->view('order/order_select', $data);
                $this->load->view('templates/gp_footer');
                return;
            }
        $row_r = array();
        $row_r = $this->gp_order_m->order_get_catalog($route_id,$this->input->post('control_date_from'));
        if (empty($row_r))
            {
                $data['gp_message'] = "没有搜索到可用班次";
                $this->load->view('templates/gp_header', $data);
                $this->load->view('order/order_select', $data);
                $this->load->view('templates/gp_footer');
                return;
            }else{
                foreach ($row_r as $row_item){
                
                $data['gp_message'] = "请选择所需路线";
                $data['gp_catalog'][]= array('catalog_city_from' =>$this->input->post('ddlOrgCity'),
                                            'catalog_city_to' => $this->input->post('ddlDesCity'),
                                            'line_company' => $row_item->catalog_line_company,
                                            'line_date_from' => $this->input->post('control_date_from'),
                                            'line_number' => $row_item->catalog_line_number,
                                            'current_price' => $row_item->catalog_current_price,
                                            'catalog_details' => $this->input->post('ddlOrgCity') . "->" . $this->input->post('ddlDesCity') . "  " . $row_item->catalog_line_company. $row_item->catalog_line_number . "  单价:" . $row_item->catalog_current_price ,
                                            //'catalog_details' => $row_item->catalog_description,
                                            'catalog_id' => $row_item->catalog_id
                                            );
                }

                $this->load->view('templates/gp_header', $data);
                $this->load->view('order/order_select', $data);
                $this->load->view('templates/gp_footer');
                return;
            }
                $data['gp_message'] = "系统升级，请电话联系客服。";
                $this->load->view('templates/gp_header', $data);
                $this->load->view('order/order_select', $data);
                $this->load->view('templates/gp_footer');
                return;
    
    }
    $data['gp_message'] = "其他错误，请电话联系客服。";
    $this->load->view('templates/gp_header', $data);
    $this->load->view('order/order_select', $data);
    $this->load->view('templates/gp_footer');
  }
  
  
  public function order_submit()
  {
    if ($this->session->userdata('gp_s_username') == '')
    {
        $data['gp_username'] = $this->session->set_userdata('gp_s_username','guest');

    }else{

    }
    $data['gp_username'] = $this->session->userdata('gp_s_username');
    $data['ddlOrgCity'] = '';
    $data['ddlDesCity'] = '';
    $data['control_date_from'] = '';
    $data['gp_message'] ="";
    $data['gp_catalog'] = array();
    $data['gp_catalog_submit'] = array();
    
    $data['user_name_whole_str'] = '';
    $data['phone'] = '';


    
    $this->load->helper('form');
    $this->load->model('gp_order_m');
    
    if ($_POST) {
            $this->load->library('form_validation');
            $this->form_validation->set_message('required',     '%s不为空');
            $this->form_validation->set_rules('cus_name',    '姓名', 'required');
            $this->form_validation->set_rules('cus_phone',     '电话', 'required');

        if($this->input->post('ddlOrgCity') !='')
        {
            $data['ddlOrgCity'] = $this->input->post('ddlOrgCity');
        }
        if($this->input->post('ddlDesCity') !='')
        {
            $data['ddlDesCity'] = $this->input->post('ddlDesCity');
        }        
        if($this->input->post('control_date_from') !='')
        {
            $data['control_date_from'] = $this->input->post('control_date_from');
        }


        
        $local_catalog_id = $this->input->post('catalog_id');
        $local_order_checkbox_selected = $this->input->post('order_select_chk');
        $local_catalog_detail = $this->input->post('catalog_detail');
        $local_price = $this->input->post('current_price');
        
        if ( !empty($local_order_checkbox_selected))
        {
            $e = 0;
            foreach($local_order_checkbox_selected as $local_order_checkbox_selected_item)
            {
            //    if ($local_order_checkbox_selected_item == "1")
            //    {
                    $data['gp_catalog_submit'][]= array(
                                                'catalog_details' => $local_catalog_detail[$local_order_checkbox_selected_item],
                                                'current_price' => $local_price[$local_order_checkbox_selected_item],
                                                'catalog_id' => $local_catalog_id[$local_order_checkbox_selected_item]
                                                );
             //   }

                $e = $e+1;
            }
        } else {
        $data['gp_message'] = "如果没有您所需的班次，请在备注标明您的所需，我们会电话跟您联系";
        
        
        }
        

        
        
        $this->load->model('gp_login_m');
        if ($this->session->userdata('gp_s_username') != 'guest')
        {
            $row=$this->gp_login_m->login_get_name_phone($this->session->userdata('gp_s_username'));
            
            $data['user_name_whole_str'] = $row['first_name'] . $row['last_name'];
            $data['phone'] = $row['phone'];
        }
        
        
            if ($this->form_validation->run() === FALSE)
            {
                $data['gp_message'] = $data['gp_message'] . "尊敬的顾客，请填写姓名和电话，以便我们及时跟您确认订票的信息";
                $this->load->view('templates/gp_header', $data);
                $this->load->view('order/order_submit', $data);
                $this->load->view('templates/gp_footer');
                return;
            }
            
                //$data['gp_message'] = "暂无您所选城市信息";
                $this->load->view('templates/gp_header', $data);
                $this->load->view('order/order_submit', $data);
                $this->load->view('templates/gp_footer');
                return;

            

    
    }
    $data['gp_message'] = "其他错误，请电话联系客服。";
    $this->load->view('templates/gp_header', $data);
    $this->load->view('order/order_submit', $data);
    $this->load->view('templates/gp_footer');
    return;
  }
  
  public function order_insert()
  {
    if ($this->session->userdata('gp_s_username') == '')
    {
        $data['gp_username'] = $this->session->set_userdata('gp_s_username','guest');

    }else{

    }
    $data['gp_username'] = $this->session->userdata('gp_s_username');
    $data['ddlOrgCity'] = '';
    $data['ddlDesCity'] = '';
    $data['control_date_from'] = '';
    $data['gp_message'] ="";
    $data['gp_catalog'] = array();
    $data['gp_catalog_submit'] = array();
    
    $data['user_name_whole_str'] = '';
    $data['phone'] = '';
    $data['order_id'] = '';


    
    $this->load->model('gp_order_m');
    $this->load->model('gp_login_m');
    $row=$this->gp_login_m->login_getID($this->session->userdata('gp_s_username'));
    $user_id=$row['ID'];
    
    if ($_POST & $this->session->flashdata('submit_flg')=='1') {

        if($this->input->post('ddlOrgCity') !='')
        {
            $data['ddlOrgCity'] = $this->input->post('ddlOrgCity');
        }
        if($this->input->post('ddlDesCity') !='')
        {
            $data['ddlDesCity'] = $this->input->post('ddlDesCity');
        }        
        if($this->input->post('control_date_from') !='')
        {
            $data['control_date_from'] = $this->input->post('control_date_from');
        }

        $local_catalog_id = $this->input->post('catalog_id');
        $local_catalog_detail = $this->input->post('catalog_detail');
        $local_price = $this->input->post('current_price');
        $local_quantity = $this->input->post('quantity');
        $local_remarks = $this->input->post('remarks');

        $local_remarks = $this->input->post('remarks');
        $local_payment_type = $this->input->post('payment_type');
        $local_cus_ID = $this->input->post('cus_ID');
        $local_cus_phone = $this->input->post('cus_phone');
        $local_cus_name = $this->input->post('cus_name');

        $this->db->trans_begin();
        
       
        if (!empty($local_catalog_id))
        {
              for ($i=0; $i < sizeof($local_catalog_id); $i++)
              {
                   $data_insert = "";
                   $data_insert = array(
                        'Catalog_ID' => $local_catalog_id[$i],
                        'Order_Quantity' => $local_quantity[$i],
                        'Order_TOT_Price' => $local_price[$i] * $local_quantity[$i],
                        'Customer_ID' => $user_id,
                        'Order_Phone' => $local_cus_phone,
                        'Order_Remarks' => "顾客姓名:[" . $local_cus_name . "]电话:[" . $local_cus_phone . "]证件号码[" . $local_cus_ID . "]班次备注:[" . $local_catalog_detail[$i] . "]客户备注:" . $local_remarks ,
                        'Order_IsPaid' => 0,
                        'Order_Payment_type' => $local_payment_type,
                        'Order_IsDelivered' => 0,
                        'Order_IsRetired' => 0,
                        'Order_Create_Time' => date('Y-m-d H:i:s'),
                        'Order_Modify_Time' =>  date('Y-m-d H:i:s')
                        );
                    $result=$this->gp_order_m->order_insert($data_insert);
                    if ($result === False)
                    {
                        $data['gp_message'] = "尊敬的顾客，由于未知原因未能生成订单，请重新选择 或 致电我们。";
                        $this->load->view('templates/gp_header', $data);
                        $this->load->view('order/order_error', $data);
                        $this->load->view('templates/gp_footer');
                        $this->db->trans_rollback();
                        return;
                    } else{
                   
                    }
                    $row=$this->gp_order_m->order_get_max_id();
                    $data['order_id'] = $data['order_id'] . " 号码:" . substr($row['order_id'],1) ;
                    

               }
        } else {
            $data_insert = "";
            $data_insert = array(
                'Catalog_ID' => 0,
                'Order_Quantity' => 0,
                'Order_TOT_Price' =>  0,
                'Customer_ID' => $user_id,
                'Order_Phone' => $local_cus_phone,
                'Order_Remarks' => "顾客姓名:[" . $local_cus_name . "]电话:[" . $local_cus_phone . "]证件号码[" . $local_cus_ID . "]班次备注:[" . $local_catalog_detail . "]客户备注:" . $local_remarks ,
                'Order_IsPaid' => 0,
                'Order_Payment_type' => $local_payment_type,
                'Order_IsDelivered' => 0,
                'Order_IsRetired' => 0,
                'Order_Create_Time' => date('Y-m-d H:i:s'),
                'Order_Modify_Time' =>  date('Y-m-d H:i:s')
                );
            $result=$this->gp_order_m->order_insert($data_insert);
            if ($result === False)
            {
                $data['gp_message'] = "尊敬的顾客，可能由于未知原因未能生成订单，请重新选择 或 致电我们。";
                $this->load->view('templates/gp_header', $data);
                $this->load->view('order/order_error', $data);
                $this->load->view('templates/gp_footer');
                $this->db->trans_rollback();
                return;
            } else{
            
            }
             $row=$this->gp_order_m->order_get_max_id();
             $data['order_id'] = $data['order_id'] . " 号码:" . substr($row['order_id'],1);
        }

       $this->db->trans_commit();
                $data['gp_message'] = "尊敬的顾客，订单提交成功。";
                $this->load->view('templates/gp_header', $data);
                $this->load->view('order/order_success', $data);
                $this->load->view('templates/gp_footer');
                $this->db->trans_rollback();
                return;

    
    }
    $data['gp_message'] = "其他错误，请重新查询或电话联系客服。";
    $this->load->view('templates/gp_header', $data);
    $this->load->view('order/order_error', $data);
    $this->load->view('templates/gp_footer');
    return;
  }
  
  public function order_query()
  {
    if ($this->session->userdata('gp_s_username') == '')
    {
        $data['gp_username'] = $this->session->set_userdata('gp_s_username','guest');

    }else{

    }
    $data['gp_username'] = $this->session->userdata('gp_s_username');
    $data['ddlOrgCity'] = '';
    $data['ddlDesCity'] = '';
    $data['control_date_from'] = '';
    $data['gp_message'] ="";
    $data['order_id'] = '';
    $data['order_phone'] = '';
    $data['gp_order_query'] = array();
    
    $this->load->helper('form');
    $this->load->model('gp_order_m');
    
    if ($_POST) {
        if($this->input->post('ddlOrgCity') !='')
        {
            $data['ddlOrgCity'] = $this->input->post('ddlOrgCity');
        }
        if($this->input->post('ddlDesCity') !='')
        {
            $data['ddlDesCity'] = $this->input->post('ddlDesCity');
        }        
        if($this->input->post('control_date_from') !='')
        {
            $data['control_date_from'] = $this->input->post('control_date_from');
        }
        
            $this->load->library('form_validation');
            $this->form_validation->set_message('required',     '%s不为空');
            $this->form_validation->set_rules('order_id',    '订单号', 'required');
            $this->form_validation->set_rules('order_phone',     '电话', 'required');
            if ($this->form_validation->run() === FALSE)
            {
                $data['gp_message'] =  "根据订单号和电话查询，或致电客服。";
                $this->load->view('templates/gp_header', $data);
                $this->load->view('order/order_query', $data);
                $this->load->view('templates/gp_footer');
                return;
            }
        $data['order_id'] = $this->input->post('order_id');
        $data['order_phone'] =$this->input->post('order_phone');
        
        $row_r = $this->gp_order_m->order_get_order($data['order_id'],$data['order_phone']);
        if (empty($row_r))
            {
                $data['gp_message'] = "没有搜索到订单，请重新选择";
                //$data['gp_order_query'] = array();
                $this->load->view('templates/gp_header', $data);
                $this->load->view('order/order_query', $data);
                $this->load->view('templates/gp_footer');
                return;
            }else{
            
                foreach ($row_r as $row_item){
                
                $data['gp_message'] = "查询结果";
                $data['gp_order_query'][]= array('order_id' =>$row_item->order_id,
                                            'order_tot_price' => $row_item->order_tot_price,
                                            'order_remarks' => $row_item->order_remarks,
                                            'order_create_time' => $row_item->order_create_time,
                                            'order_quantity' => $row_item->order_quantity
                                            );
                }
            
            
            }
        $order_id_del = $this->input->post('order_id_del');
        if ( $order_id_del != "")
        {
            $del_m = $this->gp_order_m->order_delete_order($order_id_del);
            if ($del_m != 0)
            {
                $data['gp_message'] = "删除了" . $del_m . "行";
            }else{
                $data['gp_message'] = "0行删除";
            }
            
            
        }
    
    $this->load->view('templates/gp_header', $data);
    $this->load->view('order/order_query', $data);
    $this->load->view('templates/gp_footer');
    return;
    }

    
    
    $data['gp_message'] = "选择订单号。";
    $this->load->view('templates/gp_header', $data);
    $this->load->view('order/order_query', $data);
    $this->load->view('templates/gp_footer');
    return;
  }
  
  
  
  
  
  
  
  
  
  
  
}