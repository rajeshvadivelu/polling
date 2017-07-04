/**
 * QuestionsController
 *
 * @description :: Server-side logic for managing Polllists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	add: function(req, res) {
		var question = req.body.question;
		var options = req.body.options;
		Questions.create({'question' : question}).exec(function(err, q){
			sails.log.info("New Question : " + JSON.stringify(q));
			if (err) {
				sails.log.error("error here : " + err);
				res.send({'added' : false});
			} else {
				Questions.findOne({id: q.id}).populate('options').exec(function(err1, q1){
					sails.log.info("All options : " + JSON.stringify(options));
					options.forEach(function(e,i){
						sails.log.info("options : " + e.tag);
						q1.options.push({qid: q1.id, name: e.tag});
					});
					sails.log.info("question with options : " + JSON.stringify(q1));
					Questions.updateOrCreate({"id":q1.id}, q1, function(err2, updated){
						if (err2) {
							sails.log.error("Error adding with option : " + err2);
							res.send({'added' : false});
						} else {
							res.send({'added' : true});
						}
					});
				});
				
			}
		});
	},

	delete: function(req, res) {
		var qid = req.body.qid;
		Questions.findOne({id: qid}).populate('options').exec(function(err, q){
			Questions.destroy({"id":q.id}, function(err2, deleted){
				if (err2) {
					sails.log.error("Error deleting question : " + err2);
					res.send({'deleted' : false});
				} else {
					res.send({'deleted' : true});
				}
			});
		});
	}
	
};

