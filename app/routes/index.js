var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'pg://postgres:postgres@postgres/feed';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});

router.get('/api/leaderboard', function(req, res){
  var results = [];
   pg.connect(connectionString, function(err, client, done){
       if(err){
         done();
         console.log(err);
         return res.status(500).json({ success: false, data: err});
       }
       var query = client.query("SELECT * FROM log WHERE (logged >= date_trunc('week', CURRENT_TIMESTAMP - interval '1 week') AND logged <= date_trunc('week', CURRENT_TIMESTAMP));");
       var counter = 0;
       var b1 = {};
       var b2 = {};
       var b3 = {};
       var b4 = {};
       b1.energy_sum_week = 0;
       b2.energy_sum_week = 0;
       b3.energy_sum_week = 0;
       b4.energy_sum_week = 0;
       b1.zne_sum_week = 30000;
       b2.zne_sum_week = 30000;
       b3.zne_sum_week = 30000;
       b4.zne_sum_week = 30000;
       query.on('row', function(row){
           //results.push(row);
                  if(row['address'] == 215){
                     b1.energy_sum_week = row['kitchen'] + row['plugload'] + row['lights'] + row['ev'] + row['hvac'] + row['instahot'] - row['solar'];
                   }
                   else if (row['address'] == 1590) {
                     b2.energy_sum_week = row['kitchen'] + row['plugload'] + row['lights'] + row['ev'] + row['hvac'] + row['instahot'] - row['solar'];

                   } else if (row['address'] == 1605) {
                     console.log(row);
                     b3.energy_sum_week = row['kitchen'] + row['plugload'] + row['lights'] + row['ev'] + row['hvac'] + row['instahot'] - row['solar'];

                   } else if (row['address'] == 1715) {
                     b4.energy_sum_week = row['kitchen'] + row['plugload'] + row['lights'] + row['ev'] + row['hvac'] + row['instahot'] - row['solar'];
                   }

       });
       query.on('end', function(){
         done();
         //make zne lower than everything
         results.push(b1);
         results.push(b2);
         results.push(b3);
         results.push(b4);
         res.json(results);

       });

  });

});

router.get('/api/all', function(req, res){
        pg.connect(connectionString, function (err, client, done) {
      var sendError = function(err) {
      console.log(err);
      return res.sendStatus(500);
      };

      if (err) return sendError(err);

      client.query("select * from log;", function(err, results) {
            // Done with the client.
            done();

            // Handle any errors.
            if (err) return sendError(err);

            // Return result
            return res.json(results);
            });
    });
});

router.get('/api/current', function(req, res){
        pg.connect(connectionString, function (err, client, done) {
      var sendError = function(err) {
      console.log(err);
      return res.sendStatus(500);
      };

      if (err) return sendError(err);


      client.query("SELECT * FROM log WHERE (logged >= date_trunc('week', CURRENT_TIMESTAMP - interval '1 week') AND logged <= date_trunc('week', CURRENT_TIMESTAMP));", function(err, results) {
            // Done with the client.
            done();

            // Handle any errors.
            if (err) return sendError(err);

            // Return result
            return res.json(results);
            });
    });
});

module.exports = router;
