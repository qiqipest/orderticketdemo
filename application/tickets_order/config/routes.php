<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	http://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There area two reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router what URI segments to use if those provided
| in the URL cannot be matched to a valid route.
|
*/

//$route['default_controller'] = "welcome";
//$route['default_controller'] = 'pages/view';
//$route['404_override'] = '';
//$route['(:any)'] = 'pages/view/$1';
$route['news'] = 'news';
$route['login/changeprofile_staff'] = 'gp_login/changeprofile_staff';
$route['login/adduser'] = 'gp_login/adduser';
$route['login/login'] = 'gp_login/login';
$route['login/logout'] = 'gp_login/logout';
$route['login/register'] = 'gp_login/register';
$route['login/changepass'] = 'gp_login/changepass';
$route['login/changeprofile'] = 'gp_login/changeprofile';
$route['order/order_submit'] = 'gp_order/order_submit';
$route['order/order_insert'] = 'gp_order/order_insert';
$route['order/order_query'] = 'gp_order/order_query';
$route['order/order_select'] = 'gp_order/order_select';
$route['order/main'] = 'gp_main/main_show';
//$route['order/(:any)'] = 'gp_main/main_show';
$route['order'] = 'gp_main/main_show';

$route['default_controller'] = 'gp_main/main_show';


/* End of file routes.php */
/* Location: ./application/config/routes.php */
