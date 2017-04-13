<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;

class Customers extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        //Helper function - Check if  data is missing in array
        function emptyElementExists($arr) {
            return array_search(NULL, $arr) !== false;
        }

    }

    //GET all user customers
    public  function  customers_get()
    {
        //Get user id
        $data = array(
            'id' => $this->get('id'),
        );

        //Query to retrieve user customers data
        $sql = "SELECT * FROM customers WHERE user_id = ? ";
        $query = $this->db->query($sql, array($data["id"]));

        // Set the response and exit
        $this->response([
            'status' => TRUE,
            'message' => 'Customers Retrieved',
            'data' => $query->result_array()
        ], REST_Controller::HTTP_OK); // OK (200) being the HTTP response code

    }

    //ADD new customer
    public function customerAdd_post()
    {
        //Set The data
        $data = array(
            'name' => $this->post('name'),
            'email' => $this->post('email'),
            'phone' => $this->post('phone'),
            'gender' => $this->post('gender'),
            'city_id' => $this->post('city_id'),
            'age' => $this->post('age'),
            'user_id' => $this->post('user_id')
        );

        // Validate if no data is missing.
        if (emptyElementExists($data))
        {
            //Set the response and exit
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }
        else
        {
            //Query helper
            $this->db->where('id', $this->post('id'));
            $this->db->insert('customers', $data);

            $message = [
                'message' => 'Customer Updated',
                'data' => $data
            ];

            $this->set_response($message, REST_Controller::HTTP_OK); // NO_CONTENT (204) being the HTTP response code
        }
    }

    //UPDATE customer
    public function customerUpdate_post()
    {
        $id = (int) $this->post('id');

        // Validate the id.
        if ($id <= 0)
        {
            // Set the response and exit
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

        else
        {
            //Set The data
            $data = array(
                'name' => $this->post('name'),
                'email' => $this->post('email'),
                'phone' => $this->post('phone'),
                'gender' => $this->post('gender'),
                'city_id' => $this->post('city_id'),
                'age' => $this->post('age')
            );

            //Query helper
            $this->db->where('id', $this->post('id'));
            $this->db->update('customers', $data);

            $message = [
                'message' => 'Customer Updated',
                'data' => $data
            ];

            $this->set_response($message, REST_Controller::HTTP_OK); // NO_CONTENT (204) being the HTTP response code
        }
    }

    //DELETE customer
    public function customer_delete()
    {
        $id = (int) $this->get('id');

        // Validate the id.
        if ($id <= 0)
        {
            // Set the response and exit
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

        else
        {
            //Query helper
            $this->db->delete('customers', array('id' => $id));

            $message = [
                'id' => $id,
                'message' => 'Deleted the resource'
            ];

            $this->set_response($message, REST_Controller::HTTP_NO_CONTENT); // NO_CONTENT (204) being the HTTP response code
        }
    }

    //GET cities from DB
    public function cities_get()
    {
        //Query to retrieve cities data
        $sql = "SELECT * FROM cities";
        $query = $this->db->query($sql);
        // Set the response and exit
        $this->response([
            'status' => TRUE,
            'message' => 'Cities Retrieved',
            'data' => $query->result_array()
        ], REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
    }

}
