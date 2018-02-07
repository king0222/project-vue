const mockjs = require('mockjs');


module.exports = {
    'GET /list': function(req, res) {
    	res.json(mockjs.mock({
    		result: 0,
    		'data|3': [{'name': '@name', 'age|1-100': 1, 'id|+1': 11}]
    	}))
    }

}

