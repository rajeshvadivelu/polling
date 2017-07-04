/**
 * PolllistController
 *
 * @description :: Server-side logic for managing Polllists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	adminView : function(req, res) {
		req.session.isAdmin = true;
        res.redirect("/");
	},
	nonAdminView : function(req, res) {
		req.session.isAdmin = false;
        res.redirect("/");
	},
	view: function(req, res) {
		Questions.find().populate('options').sort('createdAt DESC').exec(function(err, results){
			if (err) {
				sails.log.error("error here : " + err);
			} else {
				sails.log.info("polling result : " + JSON.stringify(results));
				res.view('pollingList',{
		          "results" : results
		        }); 
			}
		});
	}
	
};

