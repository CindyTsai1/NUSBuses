module.exports = function(stops){

    stops.sort(compare);

    return stops;

};

function compare(a,b) {

    return a.distance - b.distance;
       
};
