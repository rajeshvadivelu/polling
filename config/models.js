/**
 * Default model configuration
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 *
 * For more info on Sails models, see:
 * http://sailsjs.org/#!/documentation/concepts/ORM
 */

module.exports.models = {

  /***************************************************************************
  *                                                                          *
  * Your app's default connection. i.e. the name of one of your app's        *
  * connections (see `config/connections.js`)                                *
  *                                                                          *
  ***************************************************************************/
  connection: 'dbServer',

  /***************************************************************************
  *                                                                          *
  * How and whether Sails will attempt to automatically rebuild the          *
  * tables/collections/etc. in your schema.                                  *
  *                                                                          *
  * See http://sailsjs.org/#!/documentation/concepts/ORM/model-settings.html  *
  *                                                                          *
  ***************************************************************************/
  migrate: 'safe',

  autoPK: false,

  updateOrCreate: function(criteria, values, cb){
      var self = this; // reference for use by callbacks
      // If no values were specified, use criteria
      if (!values) values = criteria.where ? criteria.where : criteria;
      sails.log.info("update or create " + JSON.stringify(criteria));
      this.find(criteria, function (err, result){
        if(err) return cb(err, false);
        sails.log.info("model udpate or created results : " + JSON.stringify(result));
        sails.log.info("model udpate or created criteria : " + JSON.stringify(criteria));
        sails.log.info("model udpate or created values : " + JSON.stringify(values));
        if(result && result.length > 0){
          self.update(criteria, values, cb);
        }else{
          self.create(values, cb);
        }
      });
    }

};
