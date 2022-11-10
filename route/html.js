router.get('/produit', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/produit.html'));
   });