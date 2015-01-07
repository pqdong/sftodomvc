<?php

namespace TodoMVC\Bundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\View\View;
use TodoMVC\Bundle\Entity\Todo;
use Symfony\Component\HttpFoundation\Request;

class TodoController extends Controller implements ClassResourceInterface
{    
    public function cgetAction()
    {
        $todos = $this->getDoctrine()
            ->getRepository('TodoMVCBundle:Todo')
            ->findAll();

        $view = View::create();

        $view->setData($todos);

        return $view;
    } // "get_todos"	[GET] /todos

    public function cpostAction(Request $request)
    {
        $todo = new Todo();

        $todo->setTitle($request->get('title'));
        $todo->setCompleted($request->get('completed'));

        $em = $this->getDoctrine()->getManager();

        $em->persist($todo);
        $em->flush();

        $view = View::create();

        $view->setData($todo);

        return $view;
    } // "post_todos"   [POST] /todos

    public function putAction($id, Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $todo = $em->getRepository('TodoMVCBundle:Todo')->find($id);

        if(!$todo) {
            throw $this->createNotFoundException();
        }

        $todo->setTitle($request->get('title'));
        $todo->setCompleted($request->get('completed'));

        $em->flush();

        $view = View::create();

        $view->setData($todo);

        return $view;
    } // "put_todos"    [PUT] /todos/{$id}

    public function deleteAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $todo = $em->getRepository('TodoMVCBundle:Todo')->find($id);

        if(!$todo) {
            throw $this->createNotFoundException();
        }

        $em->remove($todo);
        $em->flush();

        $view = View::create();

        $view->setData(null);

        return $view;
    } // "delete_todos"     [DELETE] /todos/{$id}
}
