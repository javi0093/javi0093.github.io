var Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = function(req, res){
    Bicicleta.find({},  function(err, bicicletas){
        res.status(200).json({
            bicicletas: bicicletas
        });
    });
};


exports.bicicleta_create = function(req, res){
  
    var bici = new Bicicleta();
    bici.id = req.body.id;
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat, req.body.lng];
  
    Bicicleta.add(bici);
  
    res.status(200).json({bicicleta: bici});
  }

/* el código escrito en clase que no funciona:
exports.bicicleta_create = function(req, res){
    var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion = [req.boy.lat, req.body.lng];

    Bicicleta.add(bici);

    res.status(200).json({
        bicicleta: bici
    });
}  */

exports.bicicleta_delete = function(req, res){
    Bicicleta.removeById(req.body.id);
    res.status(204).send();
}



 
 exports.bicicleta_update = function(req, res){
    var bici = Bicicleta.findById(req.body.id);
    bici.id= req.body.id;
    var bici2 = req.body.newid;
    if(bici2 == null){
        bici.id= req.body.id;
    }
    else{
        bici.id= req.body.newid;
    } 
    if (req.body.color == null){
        req.body.color = bici.color
    }
    else{
        bici.color = req.body.color;
    }
    if (req.body.modelo == null){
        req.body.modelo = bici.modelo
    }
    else{
        bici.modelo = req.body.modelo;
    }
    if (req.body.lat == null){
        req.body.lat = bici.ubicacion[0];
    }
    else{
        bici.ubicacion[0] = req.body.lat;
    }
    if (req.body.lng == null){
        req.body.lng = bici.ubicacion[0];
    }
    else{
        bici.ubicacion[1] = req.body.lng;
    }
 

    res.status(200).json({bicicleta_editada: bici});
 }


 