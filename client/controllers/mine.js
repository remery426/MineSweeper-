myApp.controller('gameController', function ($scope, mineFactory, $interval) {
    var start;
    $scope.setgrid = function (data) {
        $scope.grid = data;
    }
    $scope.allusers = function () {
        mineFactory.allusers(function (data) {
            $scope.allusers = data;
            $scope.beginners = [];
            $scope.intermediate = [];
            $scope.experts = [];
            for (var i = 0; i < $scope.allusers.length; i++) {
                if ($scope.allusers[i].bombs == 10) {
                    $scope.beginners.push($scope.allusers[i]);
                }
                else if ($scope.allusers[i].bombs == 40) {
                    $scope.intermediate.push($scope.allusers[i]);
                }
                else {
                    $scope.experts.push($scope.allusers[i]);
                }
            }
        })
    }

    $scope.allusers();

    $scope.reset = function (rows, columns, bombs) {
        $scope.gameStatus = 'playing'
        $scope.score = 0;
        $scope.time = 0;
        $interval.cancel(start)
        start = undefined;
        mineFactory.reset(rows, columns, bombs, $scope.setgrid)
        $scope.rows = $scope.grid.length;
        $scope.cols = $scope.grid[0].length;
        if ($scope.cols == 9) {
            $scope.bombs = 10;
        }
        else if ($scope.cols == 16) {
            $scope.bombs = 40;
        }
        else {
            $scope.bombs = 99;
        }
    }
    $scope.reset(9, 9, 10)
    $scope.click = function (row, column) {
        if (!angular.isDefined(start)) {
            start = $interval(function () {
                $scope.time++;
            }, 1000)
        }
        if ($scope.grid[row][column].val == 'x') {
            if ($scope.score == 0) {
                $scope.gameStatus = 'brutal'
                $interval.cancel(start)
                start = undefined;
            }
            else {
                $scope.gameStatus = 'lose'
                $interval.cancel(start)
                start = undefined;
            }
        }
        else {
            $scope.grid[row][column].shown = true;
            if ($scope.grid[row][column].val == 0) {
                mineFactory.flood(row, column, $scope.grid)
            }
            mineFactory.checkWin($scope.grid, function (data, score) {
                $scope.gameStatus = data;
                if ($scope.gameStatus == 'win') {
                    $interval.cancel(start)
                    start = undefined;
                    mineFactory.checkTime($scope.time, $scope.bombs, function (check) {
                        $scope.checkHighScore = check;
                    })
                }
                $scope.score = score
            })
        }
    }
    $scope.right = function (row, column) {
        mineFactory.flag(row, column, $scope.grid)
    }
    $scope.addUser = function (newUser) {
        if (!newUser) {
            var newUser = {name:'Anonymous'}
        }
        newUser.bombs = $scope.bombs;
        newUser.time = $scope.time;
        mineFactory.add(newUser);
        $scope.checkHighScore = false;
        mineFactory.allusers(function (data) {
            $scope.allusers = data;
            $scope.beginners = [];
            $scope.intermediate = [];
            $scope.experts = [];
            for (var i = 0; i < $scope.allusers.length; i++) {
                if ($scope.allusers[i].bombs == 10) {
                    $scope.beginners.push($scope.allusers[i]);
                }
                else if ($scope.allusers[i].bombs == 40) {
                    $scope.intermediate.push($scope.allusers[i]);
                }
                else {
                    $scope.experts.push($scope.allusers[i]);
                }
            }
        })
    }
})