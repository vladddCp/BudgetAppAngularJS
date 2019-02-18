(function () {
    'use strict';

    angular.module('inputModule', [])
        .controller('inputController', function ($scope) {
            $scope.allExpenses = [];
            $scope.allIncome = [];
            $scope.description = "";
            $scope.value = 0;
            $scope.type = "inc";
            $scope.id = 0;
            $scope.totalIncome = 0;
            $scope.totalExpense = 0;
            $scope.monthlyBudget = 0;
            $scope.expensePercentage = 0;
            $scope.date = new Date();

            $scope.moneyChangingHands = function () {
                getNextId();

                if ($scope.type == 'inc') {
                    $scope.allIncome.push({

                        id: $scope.id,
                        type: $scope.type,
                        description: $scope.description,
                        value: $scope.value
                    });
                } else if ($scope.type == 'exp') {
                    $scope.allExpenses.push({

                        id: $scope.id,
                        type: $scope.type,
                        description: $scope.description,
                        value: $scope.value

                    });
                }

            };

            var getNextId = function () {
                var nextId = 0;
                //$scope.newItem = "";
                //Create the new ID
                if ($scope.allExpenses.length + $scope.allIncome.length > 0) {
                    nextId = $scope.allExpenses.length + $scope.allIncome.length + 1;
                } else {
                    nextId = 1;
                };
                $scope.id = nextId;
            };

            $scope.addTotal = function () {
                if ($scope.type == 'inc') {
                    $scope.totalIncome += $scope.value;
                } else if ($scope.type == 'exp') {
                    $scope.totalExpense += $scope.value;
                }
                $scope.monthlyBudget = $scope.totalIncome - $scope.totalExpense;
                $scope.expensePercentage = ($scope.totalExpense / $scope.totalIncome) * 100;
            }

            $scope.deleteMoney = function (muney) {
                $scope.allExpenses = $scope.allExpenses.filter(item => item !== muney);
                $scope.allIncome = $scope.allIncome.filter(item => item !== muney);

                if ($scope.type == 'inc') {
                    $scope.totalIncome -= muney.value;
                } else if ($scope.type == 'exp') {
                    $scope.totalExpense -= muney.value;
                }
                $scope.monthlyBudget = $scope.totalIncome - $scope.totalExpense;
                $scope.expensePercentage = ($scope.totalExpense / $scope.totalIncome) * 100;
            }

            $scope.expensePerc = function (money) {
                return Math.round((money.value / $scope.totalIncome) * 100);
            }
        })
})();