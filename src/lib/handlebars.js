const { format } = require("timeago.js");
const helpers = {}

helpers.timeago = ( timestamp ) => { //Esto es lo que me mostrara en los links , ejemplo, 2 minutes ago
    return format( timestamp )
};

module.exports = helpers;