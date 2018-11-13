const request = require('request');
let planet = [];
const options = {
    url: 'https://swapi.co/api/planets'
};
/**
 *
 * @param planet
 * @returns {Array}
 */
const fullName = (planet = []) => {
    if (!planet.length)
        throw `Array cann't be empty`;
    console.log("=============================", planet.length);
    let i=0;
    while(i<planet.length)
    {
        planet[i].residents=planet[i].name;i++;
    }

    return planet;


};

/**
 * get function that is accessing info from swapi
 * @param req
 * @param res
 * @param next
 */
exports.get = (req, res, next) => {

    const getPlanets = () => {
        function callback(error, response, body) {
            if (!error && response && response.statusCode === 200) {
                const info = JSON.parse(body);
                options.url = info.next;
                if (info.next) {
                    planet = planet.concat(info.results);
                    return getPlanets();
                } else {
                    planet = planet.concat(info.results);
                    return res.send({success: true, data: fullName(planet)});
                    //return res.send({success: true, data: planet});


                }
            }
        }

        request(options, callback);
    };
    getPlanets();
};








