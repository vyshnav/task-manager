app.controller('taskCtrl', function($rootScope, $scope, tmFactory) {
$scope.tasks = [];
$scope.isEditable = [];
$rootScope.task = "Task List!"
// get all Task on Load
tmFactory.getTasks().then(function(data) {
$scope.tasks = data.data;
 console.log("tasks :"+JSON.stringify($scope.tasks));
});
// Save a Task to the server
$scope.saveTask = function() {
	if ($scope.taskInput) {
		tmFactory.saveTask({
			"taskName":  $scope.taskInput			
		}).then(function(data) {
		    $scope.tasks.push(data.data);
		    console.log(data);
		});
	$scope.taskInput = '';
	}
};

// Update the edited Task
$scope.editTask = function($event, i) {
	if ($event.which == 13 && $event.target.value.trim()) {
	var task = $scope.tasks[i];
		console.log("Task editinput :"+$event.target.value.trim());
		tmFactory.updateTask({
			_id: task._id,
			taskName: $event.target.value.trim()
		}).then(function(data) {
			console.log(data);
			if (data.data.ok) {
			   task.taskName = $event.target.value.trim();
			$scope.isEditable[i] = false;
			} else {
			   alert('Oops something went wrong!');
			}
		});
	}
};

// Delete a Task
$scope.deleteTask = function(i) {
tmFactory.deleteTask($scope.tasks[i]._id).then(function(data) {
if (data.data) {
$scope.tasks.splice(i, 1);
}
});
};

});

app.controller('TodoCtrl', function($rootScope, $scope, tmFactory,$stateParams) {

$scope.todos = [];
$scope._id=$stateParams._id;
$scope.isEditable = [];
// get all Todos on Load
$scope.getTodos = function() {
	tmFactory.getTask($scope._id).then(function(data) {
	$rootScope.task = data.data.taskName;	
	$scope.todos = data.data.todos;
	 console.log("todos :"+JSON.stringify($scope.todos));
	});
};
$scope.getTodos();
// Save a Todo to the server
$scope.saveTodo = function($event) {
	if ($event.which == 13 && $scope.todoInput) {
		tmFactory.saveTodo({
			"id": Math.random().toString(16).slice(2),
			"todo": $scope.todoInput,
			"isCompleted": false
		},$scope._id).then(function(data) {
		    $scope.getTodos();
		    console.log(data);
		});
	$scope.todoInput = '';
	}
};
//update the status of the Todo
$scope.updateStatus = function($event, id, i) {
	var cbk = $event.target.checked;
	var _t = $scope.todos[i];
	    console.log("todo :"+JSON.stringify(_t));
		console.log("todo completed :"+cbk);
		tmFactory.updateTodo({
			id: id,
			isCompleted: cbk,
			todo: _t.todo
		},$scope._id).then(function(data) {
			console.log(data);
			if (data.data.ok) {
			   _t.isCompleted = cbk;
			} else {
			    alert('Oops something went wrong!');
			}
		});
};
// Update the edited Todo
$scope.edit = function($event, i) {
	if ($event.which == 13 && $event.target.value.trim()) {
	var _t = $scope.todos[i];
		console.log("Todo editinput :"+$event.target.value.trim());
		tmFactory.updateTodo({
			id: _t.id,
			todo: $event.target.value.trim(),
			isCompleted: _t.isCompleted
		},$scope._id).then(function(data) {
			console.log(data);
			if (data.data.ok) {
			   _t.todo = $event.target.value.trim();
			$scope.isEditable[i] = false;
			} else {
			   alert('Oops something went wrong!');
			}
		});
	}
};
// Delete a Todo
$scope.deleteTodo = function(i) {
tmFactory.deleteTodo($scope._id,$scope.todos[i]).then(function(data) {
if (data.data) {
$scope.todos.splice(i, 1);
}
});
};
});