const router=require('express').Router()
const {addTodo,getActiveTodo,getTodo,getSingleTodo, updateTodo,postMultipleTodo, deleteTodo}=require('../Controller/todoController')
const checkAuth=require('../authentication/checkAuth')

router.get('/:id',checkAuth,getSingleTodo)
router.put('/:id',updateTodo)
router.get('/',checkAuth,getTodo)
router.get('/todo/ad',getActiveTodo)
router.post('/',addTodo)
router.post('/all',postMultipleTodo)
router.delete('/:id',deleteTodo)

module.exports=router;