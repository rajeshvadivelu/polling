/**
 * Optionrank.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'option_rank',
  attributes: {
  	id: { 
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        }, 
  	qid: { 
        type: 'integer',
        required: true
    }, 
    oid: {
  		type: 'integer',
        required: true
  	},
  	counter: {
  		type: 'integer'
  	}
  }
};

