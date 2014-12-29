<?php

namespace TodoMVC\Bundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class TodoController extends Controller
{
    /**
     * @Route("/api/todo")
     * @Template()
     */
    public function indexAction()
    {
        return array();    
    }

}
