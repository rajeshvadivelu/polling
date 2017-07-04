/**
 * PollController
 *
 * @description :: Server-side logic for managing Polllists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

function incrementVotes(qid, callback) {
	Questions.find({"id" : qid}).populate('options').exec(function(err, question){
		question[0].votes++;
		Questions.updateOrCreate({"id":qid}, question[0], function(err1, updated){
			if (err1) {
				sails.log.error("Error updating question votes : " + err1);
			} 
			callback(err, updated[0].votes);	
		});
	});
}

module.exports = {

	update: function(req, res) {
		var qid = req.body.qid;
		var oid = req.body.oid;
		Optionrank.find({'qid' : qid, 'oid' : oid}).exec(function(err, or){
			sails.log.info("Options rank : " + JSON.stringify(or));
			if (err) {
				sails.log.error("error here : " + err);
				res.send({'updated' : false});
			} else {
				var rec = {};
				rec.qid = qid;
				rec.oid = oid;
				rec.counter = 1;
				if (or.length > 0) {
					rec.counter = or[0].counter + 1;
				}
				sails.log.info("rec : " + JSON.stringify(rec));
				Optionrank.updateOrCreate({"qid" : ""+ rec.qid, "oid" : rec.oid}, rec, function (err1, created) {
	                if (err1) {
	                    sails.log.error("Error insert update option rank " + err1);
	                     res.send({'updated' : false});
	                } else {
	                	incrementVotes(qid, function(err2, votes){
	                		res.send({'updated' : true, votes: votes});
	                	});
	                };
	                
	            });
			}
		});
	},

	updateLike: function(req, res) {
		var qid = req.body.qid;
		var like = req.body.like;
		
		Questions.find({"id" : qid}).populate('options').exec(function(err, question){
			if (err) {
				sails.log.error("Error while getting question details : " + err);
				res.send({});
			}

			sails.log.info("like : " + like);
			if (like == "true") {
				sails.log.info("like if: " + like);
				question[0].likes = question[0].likes + 1;
			} else {
				sails.log.info("like if else : " + like);
				question[0].dislikes = question[0].dislikes + 1;
			}
			Questions.updateOrCreate({"id":qid}, question[0], function(err1, updated){
				if (err1) {
					sails.log.error("Error updating the values");
					res.send({});
				} else {
					res.send({likes: updated[0].likes, dislikes: updated[0].dislikes});
				}
			});
		});
	}
	
};

