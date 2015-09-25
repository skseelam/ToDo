var app = angular.module('ToDoApp', []);

app.controller('ToDoController', function ($scope, dataPersist, $log, $window, $rootScope)
{
    $scope.toDoList = dataPersist.loadData('toDoItems') || [];
    $scope.addTaskFlag = false;
    $scope.showTaskCompleted = false;
    $scope.projects = [{ 'label': 'Personal', 'taskCount': 0, 'colorClass': 'icon-circle icon-red' }, { 'label': 'Shopping', 'taskCount': 0, 'colorClass': 'icon-circle icon-lightgrey' }, { 'label': 'Work', 'taskCount': 0, 'colorClass': 'icon-circle icon-lightblue' }, { 'label': 'Movies To Watch', 'taskCount': 0, 'colorClass': 'icon-circle icon-pink'}];
    $scope.selectedProject = 'Inbox';
    $scope.orderByProperty = 'expireDate';
    $scope.showSettingsMenu = false;

    $scope.showToDoItems = function (index)
    {
        $scope.selectedProject = isNaN(index) ? index : $scope.projects[index].label;
    }


    $scope.addNewTask = function ()
    {
        var newTask = {};
        newTask.title = $scope.newTaskTitle;
        newTask.IsCompleted = false;
        newTask.priority = $scope.newTaskPriority;
        newTask.expireDate = $scope.newTaskDate;
        newTask.project = $scope.selectedProject;
        $scope.toDoList.push(newTask);
        $scope.addTaskFlag = false;
        dataPersist.saveData('toDoItems', $scope.toDoList);
    }


    $scope.deteleTask = function (index)
    {
        if (window.confirm('Are you sure you want to delete?'))
            $scope.toDoList.splice(index, index + 1);
        dataPersist.saveData('toDoItems', $scope.toDoList);
    }

    $scope.cancelTaskAddition = function ()
    {
        $scope.addTaskFlag = false;
    }


});


app.factory('dataPersist', function ($window, $rootScope)
{
    angular.element($window).on('storage', function (event)
    {
        if (event.key === 'toDoItem')
        {
            $rootScope.$apply();
        }
    });

    return {
        loadData: function (key)
        {
            if ($window.localStorage)
            {
                return $window.localStorage.getItem(key) == "" ? [] : JSON.parse($window.localStorage.getItem(key));
            }
        },

        saveData: function (key, data)
        {
            $window.localStorage.setItem(key, JSON.stringify(data));
        }
    }

});
