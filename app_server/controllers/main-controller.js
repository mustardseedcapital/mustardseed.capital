const home = function(req, res) {
  res.render('default-template.ejs', {
    title: 'Express',
    urlBase,
    googleTagId
  });
};

module.exports = {
  home
};