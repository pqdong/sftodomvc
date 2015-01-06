<?php

namespace TodoMVC\Bundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use TodoMVC\Bundle\Entity\Todo;

class DefaultController extends Controller
{
    /**
     * @Route("/")     
     * @Template()
     */
    public function indexAction()
    {
    	$todos = $this->getDoctrine()
			->getRepository('TodoMVCBundle:Todo')
			->findAll();

        return array('todos' => $todos);
    }
}
