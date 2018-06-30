var controller = require('./controller');

module.exports = function(router){
    router.post('/authenticate', controller.authenticate);

    router.post('/user', controller.addUser);

    router.post('/machine', controller.addMachine);
    
    router.post('/expense', controller.addExpense);
    
    router.post('/order', controller.addOrder);
    
    router.post('/product', controller.addProduct);
    
    router.get('/users', controller.getAllUsers);
    
    router.get('/machines', controller.getAllMachines);

    router.get('/machine/:machineID/info', controller.getMachineByID);
    
    router.get('/expenses', controller.getAllExpenses);
    
    router.get('/orders', controller.getAllOrders);
    
    router.get('/products', controller.getAllProducts);

    router.get('/messages', controller.getAllMessages);

    router.get('/income', controller.getIncome);

    router.put('/user', controller.updatePassword);
    
    router.put('/machine', controller.updateMachine);
    
    router.put('/expense', controller.updateExpense);
    
    router.route('/machine/:machineID').delete(controller.deleteMachine);
    
    // router.route('/expense/expenseID').delete(controller.deleteExpense);
    
    router.route('/product/:name').delete(controller.deleteProduct);

    return router;
}