"use strict";

const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 3333));
app.use('/', express.static('./'));

app.get('/images', (req, res) => {
  res.send([
    'http://corp.moneyforward.com/wp-content/themes/wordpress/images/bnr_moneyforward.png',
    'http://corp.moneyforward.com/wp-content/themes/wordpress/images/bnr_mfcolud01.png',
    'http://corp.moneyforward.com/wp-content/themes/wordpress/images/bnr_mfcolud02.png',
    'http://corp.moneyforward.com/wp-content/themes/wordpress/images//bnr_mfcolud03.png',
    'http://corp.moneyforward.com/wp-content/themes/wordpress/images/bnr_mfcolud04.png',
    'http://corp.moneyforward.com/wp-content/themes/wordpress/images/bnr_mfcolud05.png'
  ]);
});

app.listen(app.get('port'), function() {
  console.log('Please visit http://localhost:' + app.get('port') + '/');
});
