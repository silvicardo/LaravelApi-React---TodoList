<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Todo;

class TodoController extends Controller
{

    public function index()
    {
      $todos = Todo::all();
      return response()->json($todos);
    }


    public function create(Request $request)
    {

      $userData = $request->validate([
        'task'=>'required|max:50'
      ]);

      $userData['completed'] = false;

      $newTodo = new Todo;
      $newTodo->fill($userData);
      $newTodo->save();

      return response()->json($newTodo);

    }


    public function show($id)
    {

      $todo = Todo::find($id);

      if (empty($todo)) {
         return response()->json(['error' => 'Todo id not valid']);
       }

      return response()->json($todo);

    }


    public function update(Request $request, $id)
    {

       $userData = $request->all();

      // if ((empty($userData['task'])) && (empty($userData['completed']))) {
      //  return response()->json(['error' => 'Missing update data']);
      //  }

       $todoToUpdate = Todo::find($id);

       if(empty($todoToUpdate)) {
           return response()->json(['error' => 'Todo-ID not found, operation failed']);
        }

      $todoToUpdate->update($userData);
      return response()->json($todoToUpdate);

    }


    public function destroy($id)
    {
      $todo = Todo::find($id);

       if (empty($todo)) {
         return response()->json(['error' => 'Todo id not valid']);
       }

       $todo->delete();
       return response()->json([]);
    }
}
