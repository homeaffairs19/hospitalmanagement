var app = angular.module('hospitalApp', []);

// Controller to manage form and display patient list
app.controller('HospitalController', function($scope, $http) {
    // Initialize the patient object
    $scope.patient = {};
    // Initialize an empty array for patients
    $scope.patients = [];

    // Fetch all patients from the backend (GET request)
    $scope.getPatients = function() {
        $http.get('http://localhost:3000/patients')
            .then(function(response) {
                // Populate the patients array with the data from the backend
                $scope.patients = response.data;
            })
            .catch(function(error) {
                console.error('Error fetching patient data:', error);
            });
    };

    // Submit form data to the backend (POST request)
    $scope.submitForm = function() {
        if ($scope.patient.name && $scope.patient.age && $scope.patient.medicalIssue && $scope.patient.doctorAssigned) {
            // POST request to add new patient
            $http.post('http://localhost:3000/patients', $scope.patient)
                .then(function(response) {
                    // Refresh the patient list after adding the new patient
                    $scope.getPatients();
                    // Clear the form fields
                    $scope.patient = {};
                })
                .catch(function(error) {
                    console.error('Error adding patient:', error);
                });
        }
    };

    // Initially load the patients when the page is loaded
    $scope.getPatients();
});
