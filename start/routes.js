'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('api/auth/register','AuthenticationController.register')
Route.post('api/auth/login','AuthenticationController.login')
Route.get('api/auth/user','AuthenticationController.getUser')
Route.patch('api/auth/password/changePassword','AuthenticationController.changePassword')

Route.get('api/task/getAll','TaskController.getAll')
Route.post('api/task/create','TaskController.create')
Route.delete('api/task/delete/:id','TaskController.delete')
Route.patch('api/task/update/:id','TaskController.update')
Route.get('api/task/get/:id','TaskController.get')

