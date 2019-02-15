(function () {
    'use strict';

    angular.module('inputModule', [])
        .controller('inputController', function ($scope, $sce) {

            $scope.money = [];
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
                $scope.money.push({

                    id: $scope.id,
                    type: $scope.type,
                    description: $scope.description,
                    value: $scope.value

                });
                isValid($scope);

            };

            var isValid = function ($scope) {
                var x;
                for (x in $scope.money) {}
            };

            var getNextId = function () {
                var nextId = 0;
                //$scope.newItem = "";
                //Create the new ID
                if ($scope.money.length > 0) {
                    nextId = $scope.money.length + 1;
                } else {
                    nextId = 1;
                };
                $scope.id = nextId;
            };

            $scope.loadMoney = function () {

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

            $scope.addIncomeListItem = function (money) {
                if (money != null) {
                    getNextId();
                    $scope.element = "";
                    $scope.htmll = "";

                    {
                        if (money.type == 'inc') {
                            $scope.element = 'income__list';
                            $scope.htmll = '<div class="item clearfix" id="income-' + money.id + '">' +
                                '<div class="item__description">' + money.description + '</div>' +
                                '<div class="right clearfix">' +
                                '<div class="item__value">+ ' + money.value + '</div>' +
                                '<div class="item__delete">' +
                                '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                                '</div>' +
                                '</div>' +
                                '</div>';

                        }
                        return $sce.trustAsHtml($scope.htmll);
                    }
                }
            }

            $scope.addExpenseListItem = function (money) {
                if (money != null) {
                    getNextId();
                    $scope.element = "";
                    $scope.htmll = "";

                    if ($scope.money.length != 0) {
                        if (money.type == 'exp') {
                            $scope.element = 'expenses__list';
                            $scope.htmll = '<div class="item clearfix" id="expense-' + money.id + '">' +
                                '<div class="item__description">' + money.description + '</div>' +
                                '<div class="right clearfix">' +
                                '<div class="item__value">- ' + money.value + '</div>' +
                                '<div class="item__percentage">' + Math.round((money.value / $scope.totalIncome) * 100) + '%</div>' +
                                '<div class="item__delete">' +
                                '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                                '</div>' +
                                '</div>' +
                                '</div>';


                        }
                        return $sce.trustAsHtml($scope.htmll);
                    }
                }
            }

            $scope.deleteMoney = function (muney) {
                $scope.money = $scope.money.filter(item => item !== muney);

                if ($scope.type == 'inc') {
                    $scope.totalIncome -= muney.value;
                } else if ($scope.type == 'exp') {
                    $scope.totalExpense -= muney.value;
                }
                $scope.monthlyBudget = $scope.totalIncome - $scope.totalExpense;
                $scope.expensePercentage = ($scope.totalExpense / $scope.totalIncome) * 100;
            }

            $scope.deliberatelyTrustDangerousSnippet = function (money) {
                return $sce.trustAsHtml($scope.addListItem(money));
            }


        })
})();