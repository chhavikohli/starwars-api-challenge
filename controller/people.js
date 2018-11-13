const request = require('request');
let people = [];
const options = {
    url: 'https://swapi.co/api/people'
};
/**
 * Function to sort the array by name
 * @param people
 * @returns {Array}
 * Return sorted array
 */
const sortArray = (people = []) => {
    if (!people.length)
        throw `Array cann't be empty`;
    console.log("=============================", people.length);
    function compare(a, b) {
        // Use toUpperCase() to ignore character casing
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        let comparison = 0;
        if (nameA > nameB) {
            comparison = 1;
        } else if (nameA < nameB) {
            comparison = -1;
        }
        return comparison;
    }

    people.sort(compare);
    return people;


};

/**
 * get function that is accessing info from swapi
 * @param req
 * @param res
 * @param next
 */
exports.get = (req, res, next) => {

    const getPeople = () => {                           // arrow function that will be called recursively until all page are traversed
        function callback(error, response, body) {
            if (!error && response && response.statusCode === 200) {
                const info = JSON.parse(body);          //to receive data in jason format we are using jason parse else normal string will be sent
                options.url = info.next;                //updating url ----------page=1,2,3..9
                if (info.next) {
                    people = people.concat(info.results);
                    return getPeople();
                } else {
                    people = people.concat(info.results);
                    return res.send({success: true, data: sortArray(people)}); //sending response as success and array as final data


                }
            }
        }

        request(options, callback);
    };
    getPeople();
};






