/**
 * Questions.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'questions',
  attributes: {
        id: { 
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        }, 
        question: {
            type: 'string',
            required: true
        },
        votes: {
          type: 'integer'
        },
        likes: {
        	type: 'integer'
        },
        dislikes: {
        	type: 'integer'
        },
        options: {
      		collection: 'options',
      		via: 'qid'
    	}
  }
};

