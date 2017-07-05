module.exports = function(routes){

    routes.sort(compare);

    return routes;

};

function compare(a,b) {

    if (a.travelTime < b.travelTime)
        return -1;
    if (a.travelTime > b.travelTime)
        return 1;
    if (a.travelTime === b.travelTime) {
         if (a.waitingTime < b.waitingTime)
            return -1;
        else
            return 1;
    }
       
}
