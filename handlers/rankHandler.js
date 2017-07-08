module.exports = function(routes){

    routes.sort(compare);

    return routes;

};

function compare(a,b) {

    if (a.travelTime === b.travelTime) {
         return a.waitingTime - b.waitingTime;
    }else{
         return a.travelTime - b.travelTime;
    }
       
}
