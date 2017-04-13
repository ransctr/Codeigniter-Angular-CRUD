<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;

/**
 * This is an example of a few basic user interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Users extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        //Helper function - Check if  data is missing in array
        function emptyElementExists($arr) {
            return array_search(NULL, $arr) !== false;
        }

    }


    //USER REGISTRATION REQUEST
    public function userReg_post()
    {
        //Set The data
        $data = array(
            'email' => $this->post('email'),
            'password' => $this->post('password'),
            'firstname' => $this->post('firstname'),
            'lastname' => $this->post('lastname')
        );

        // Validate if no data is missing.
        if (emptyElementExists($data))
        {
            //Set the response and exit
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }
        else {
            //Chick if email already exists
            $query = $this->db->query("SELECT * FROM users WHERE email='" . $data["email"] . "' ");
            $result = $query->row_array();
            if(count($result ) ==0){
                //inserting new user to users table
                $this->db->insert('users', $data);
                $this->set_response([
                    'status' => TRUE,
                    'message' => 'User Created'
                ], REST_Controller::HTTP_OK); // CREATED (201) being the HTTP response code
            } else{
                $this->set_response([
                    'status' => FALSE,
                    'message' => 'Email already exists'
                ], REST_Controller::HTTP_OK); // CREATED (201) being the HTTP response code
            }

        }

    }

    //USER LOGIN REQUEST
    public function userLogin_post()
    {
        //Retrieving data from request body
        $data = array(
            'email' => $this->post('email'),
            'password' => $this->post('password'),
        );

        // Validate if no data is missing.
        if (emptyElementExists($data))
        {
            // Set the response and exit
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }
        else {

            //Query to search for username/email
            $query = $this->db->query("SELECT * FROM users WHERE email='" . $data["email"] . "' ");

            //Defining result vars
            $email_res = '';
            $password_res = '';

            //Returning results as object
            foreach ($query->result() as $row) {
                $email_res = $row->firstname;
                $password_res = $row->password;
            }

            //Checking if found and setting response respectively
            if (!empty($email_res)) {
                //USER FOUND
                //Check if password match
                if ($password_res === $data["password"]) {
                    //PASSWORD MATCH - send user data
                    $this->response([
                        'status' => TRUE,
                        'message' => 'User Found',
                        'data' => $query->first_row()
                    ], REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
                } else {
                    //WRONG PASSWORD
                    $this->set_response([
                        'status' => FALSE,
                        'message' => 'Wrong password'
                    ], REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
                }

            } else {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'User Not Exists'
                ], REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
        }

    }



}
