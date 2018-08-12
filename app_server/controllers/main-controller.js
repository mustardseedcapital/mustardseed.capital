const home = function(req, res) {
  res.render('default-template.ejs', { title: 'Express' });
};

module.exports = {
	home
};