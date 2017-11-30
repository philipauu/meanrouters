console.log('loaded frontend app');

var frontend_app = angular.module('patient_app', ['ngRoute']);
frontend_app.config(do_routes);
frontend_app.controller('all_patients', do_all_patients);
frontend_app.controller('single_patient', do_single_patient);

function do_routes($routeProvider) {
    console.log('doing frontend routes stuff');
    $routeProvider
        .when('/', {
            templateUrl: 'partials/patients.html',
            controller: 'all_patients'
        })
        .when('/patient/:_id', {
            templateUrl: 'partials/patient_record.html',
            controller: 'single_patient'
        });
    console.log('end of routes');
}

function do_all_patients($scope, $http) {
    console.log('getting all patients');
    $http.get('/api/v8/read').then(function (server_object) {
        console.log(server_object);
        $scope.patients = server_object.data;
    });
}
cd
function do_single_patient($scope, $http, $routeParams) {
    console.log('getting single patient');
    console.log($routeParams);
    $scope.read = function () {
        console.log('getting patient record from backend');
        $http.get('/api/v8/read/' + $routeParams._id)
            .then(function (server_object) {
                console.log(server_object);
                $scope.patient = server_object.data;
            });
    }
    $scope.read();
}