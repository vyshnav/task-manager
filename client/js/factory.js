app.factory('tmFactory', function($http) {
	var urlBase = '/api';
	var _tmService = {};
	_tmService.getTasks = function() {
	return $http.get(urlBase);
	};
	_tmService.deleteTask = function(id) {
	return $http.delete(urlBase + '/delete/task/' + id);
	};
	_tmService.saveTask = function(todo) {
		var promise = $http({
					method:"post",
					url: urlBase+'/addtask/',
					data: todo
				});
				return promise;
	};

	_tmService.updateTask = function(task) {
	return $http.put(urlBase +'/edit/task', task);
	};

	_tmService.getTask = function(id) {
	return $http.get(urlBase+'/task/' + id);
	};

	_tmService.saveTodo = function(todo,id) {
		var promise = $http({
					method:"post",
					url: urlBase +'/task/add/todo/' + id,
					data: todo
				});
				return promise;
	};
	_tmService.updateTodo = function(todo,_id) {
	   return $http.put(urlBase+'/task/edit/todo/' + _id, todo);
	};
	_tmService.deleteTodo = function(_id,todo) {
		console.log('Done!'+JSON.stringify(todo));
	return $http.put(urlBase + '/task/delete/todo/' + _id, todo);
	};
	return _tmService;
});

