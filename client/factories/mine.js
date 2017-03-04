myApp.factory('mineFactory', function ($http) {
    var factory = {}
    function Cell(x, y, value) {
        this.val = value;
        this.shown = false;
        this.flagged = false;
        this.x = x;
        this.y = y;
    }
    factory.reset = function (rows, cols, bombs, cb) {
        var count_arr = []
        for (var x = 0; x < rows; x++) {
            var row = []
            for (var i = 0; i < cols; i++) {
                row.push(new Cell(x, i, 0));
            }
            count_arr.push(row)
        }
        var count = bombs;
        while (count > 0) {
            var row_var = Math.floor(rows * Math.random())
            var column_var = Math.floor(cols * Math.random())
            if (count_arr[row_var][column_var].val != 'x') {
                count_arr[row_var][column_var].val = 'x'
                count -= 1
            }
        }
        for (var y = 0; y < rows; y++) {
            for (var x = 0; x < cols; x++) {
                if (count_arr[y][x].val != "x") {
                    count = 0;
                    if ((y - 1) >= 0 && count_arr[(y - 1)][x].val == 'x') {
                        count += 1
                    }
                    if ((y + 1) <= rows-1 && count_arr[(y + 1)][x].val == 'x') {
                        count += 1
                    }
                    if ((x + 1) <= cols-1 && count_arr[y][x + 1].val == 'x') {
                        count += 1
                    }
                    if ((x - 1) >= 0 && count_arr[y][x - 1].val == 'x') {
                        count += 1
                    }
                    if ((x - 1) >= 0 && (y - 1) >= 0 && count_arr[y - 1][x - 1].val == 'x') {
                        count += 1
                    }
                    if ((x - 1) >= 0 && (y + 1) <= rows-1 && count_arr[y + 1][x - 1].val == 'x') {
                        count += 1
                    }
                    if ((x + 1) <= cols-1 && (y + 1) <= rows-1 && count_arr[y + 1][x + 1].val == 'x') {
                        count += 1
                    }
                    if ((x + 1) <= cols-1 && (y - 1) >= 0 && count_arr[y - 1][x + 1].val == 'x') {
                        count += 1
                    }
                    count_arr[y][x].val = count;

                }

            }
        }
        cb(count_arr)
    }
    factory.flood = function (y, x, grid) {
         grid[y][x].shown = true;
        if (grid[y][x].val == 0 ) {
            if ((y - 1) >= 0) {
            if( grid[y-1][x].shown ==false){
                    factory.flood(y-1,x,grid)
                }
            }
            if ((y + 1) < grid.length ) {
                if(grid[y+1][x].shown ==false){
                    factory.flood(y+1,x,grid)
                }
            }
            if ((x - 1) >= 0) {
                if( grid[y][x-1].shown ==false){
                    factory.flood(y,x-1,grid)
                }
            }
            if ((x + 1) < grid[0].length) {
                if( grid[y][x+1].shown ==false){
                    factory.flood(y,x+1,grid)
                }
            }
            if ((x + 1) < grid[0].length && (y+1) < grid.length) {
                if( grid[y+1][x+1].shown == false){
                    factory.flood(y+1,x+1,grid)
                }
            }
            if ((x + 1) < grid[0].length && (y-1) >= 0){
                if( grid[y-1][x+1].shown ==false){
                    factory.flood(y-1,x+1,grid)
                }
            }
            if ((x - 1) >= 0 && (y+1) < grid.length) {
                if( grid[y+1][x-1].shown ==false){
                    factory.flood(y+1,x-1,grid)
                }
            }
            if ((x - 1) >= 0 && (y-1) >= 0) {
                if( grid[y-1][x-1].shown ==false){
                    factory.flood(y-1,x-1,grid)
                }
            }
        }
        
    }
    factory.checkWin = function(grid, cb){
        var count = 0;
        for(var i = 0; i < grid.length; i++){
            for(var j = 0; j < grid[0].length; j++){
                if(grid[i][j].shown == true){
                    count++;
                }
            }
        }
        if(grid[0].length == 9){
            var bombs = 10;
        }
        else if(grid[0].length == 16){
            var bombs = 40;
        }
        else{
            var bombs = 99;
        }
        if(count >= (grid.length*grid[0].length - bombs)){
            cb('win', count)
        }
        else{
            cb('playing',count)
        }
    }
    factory.flag = function(y,x,grid){
        if(grid[y][x].flagged == false){
            grid[y][x].flagged = true;
        }
        else{
            grid[y][x].flagged = false;
        }
    }
    factory.checkTime = function(time, bombs, cb){
        $http.post('/highscore', {time: time, bombs: bombs}).then(function(output){
            cb(output.data)
        })
    }
    factory.add = function(user){
        $http.post('/add', user)
    }
    factory.allusers = function(cb){
        $http.get('/allusers').then(function(output){
            cb(output.data);
        })
    }
    return factory;
})