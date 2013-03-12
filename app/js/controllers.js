/* App Controllers */


function DeptoListCtrl(Depto, $location, $scope) {

    $scope.orderProp = 'age';
    $scope.deptos = Depto.query({order:$scope.orderProp, name:$scope.query});
    var deptos = $scope.deptos;
    
    $scope.remove = function (depto) {
        var ok = Depto.delete({_id: depto._id}, function (res) {
            console.log('indexOf: '+deptos.indexOf(depto));
            if (res.ok === 1) {
                deptos.splice(deptos.indexOf(depto), 1);
            } else {
                alert(JSON.stringify(res.ok));
            }
        })
    }
    
}
DeptoListCtrl.$inject = ['Depto', '$location', '$scope'];


function DeptoDetailCtrl(Depto, $routeParams, $scope) {  
    $scope.depto = Depto.get({_id: $routeParams._id}, function(depto) {
        $scope.cursos = depto.details;
    });
    /*$scope.setImage = function(imageUrl) {
        $scope.mainImageUrl = imageUrl;
    }*/
}
DeptoDetailCtrl.$inject = ['Depto', '$routeParams', '$scope'];


function DeptoEditCtrl(Depto, $routeParams, $location, $scope) {
    $scope.depto = Depto.get({_id: $routeParams._id})
    
    $scope.save = function () {
        Depto.save({}, $scope.depto, function (res) { if (res.ok === 1) { $location.path("/departamentos");}} ) 
    }
}
DeptoEditCtrl.$inject = ['Depto', '$routeParams', '$location', '$scope'];

function DeptoNewCtrl(Depto, $routeParams, $scope) {   
     $scope.depto = Depto.get({_id: $routeParams.dep_id}, function(depto) {
        for (var curso in depto.details) {
        	if( depto.details[curso].id == $routeParams._id){
        	    $scope.curso=depto.details[curso];
        		$scope.cursosMateria = depto.details[curso].cursos;
        		}
        }
    });
}
DeptoNewCtrl.$inject = ['Depto', '$routeParams', '$scope'];

function DeptoAggreCtrl(Depto, $routeParams, $scope) {   
    $scope.count = Depto.count();
    $scope.distinct = Depto.distinct({}, {key:"carrier"});
    console.log($scope.distinct)
    $scope.group = Depto.group({}, {
                            keys: {carrier:true },   cond: {}, 
                            initial: {sum: 0, count:0, max:0, avg:0}, 
                            reduce: "function(doc,out){out.sum += doc.age; out.count += 1; out.max = Math.max(out.max, doc.age); out.avg = out.sum/out.count;}"
                        })
    $scope.mapReduce = Depto.mapReduce({},{ 
                            "map": "function(){emit(this.details.android.os, 1);}", 
                            "reduce": "function(key, values){return values.length;}"  
                        });
}
DeptoAggreCtrl.$inject = ['Depto', '$routeParams', '$scope'];