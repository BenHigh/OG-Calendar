var path = require("path");

module.exports = {
  home: function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  },

  //changed this directory from client/build/dash.html
  
  dash: function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build/dash.html'));
  }
  // ,
  // corForm: function(req, res) {
  //   res.render('corForm');
  // },
  // cusForm: function(req, res) {
  //   res.render('cusForm');
  // },
  // renderCorRes: function(req, res) {
  //   res.render('corRes');
  // },
  // renderCusRes: function(req, res) {
  //   res.render('cusRes');
  // }
};
