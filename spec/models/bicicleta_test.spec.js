var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');


describe('Testing Bicicletas', function(){
    beforeEach(function(done){
        var mongoDB = 'mongodb://127.0.0.1/testdb';
        mongoose.connect(mongoDB, { useNewUrlParser: true});

        const db = mongoose.connection
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function(){
            console.log('we are connected to test database!');
            done();
        });
    });

    afterEach(function(done){
        Bicicleta.deleteMany({}, function(err, success){
            if (err) console.log(err);
            mongoose.disconnect(err); 
            done();
        })
    });

    describe('Bicicletas.createInstance', () => {
        it('crea una instancia de Bicicleta', () =>{
            var bici = Bicicleta.createInstance(1, "verde", "urbana", [-34.5, -56.1]);

            expect(bici.code).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.modelo).toBe("urbana");
            expect(bici.ubicacion[0]).toBe(-34.5);
            expect(bici.ubicacion[1]).toBe(-56.1);
        })
    });

    describe('Bicicleta.allBicics', () => {
        it('comienza vacia', (done) => {
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });
    describe('Bicicleta.add', () => {
        it('agrego solo una bici', (done) =>{
            var aBici = new Bicicleta({code: 1, color:"verde", modelo:"urbana"});
            Bicicleta.add(aBici, function(err, newBici){
                if (err) console.log(err);
                Bicicleta.allBicis(function(err, bicis){
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);
                    expect(bicis[0].color).toEqual(aBici.color);
                    expect(bicis[0].modelo).toEqual(aBici.modelo);

                    done();
                });
            });
        });
    });

    describe('Bicicleta.findByCode', () =>{
        it('debe deevolver la bicic con code 1', (done) =>{
            Bicicleta.allBicis(function(err,bicis){
                expect(bicis.length).toBe(0);


                var aBici = new Bicicleta({code: 1, color:"verde", modelo:"urbana"});
                Bicicleta.add(aBici, function(err, newBici){
                    if (err) console.log(err);
                    
                    var aBici2 = new Bicicleta({code: 2, color:"rojo", modelo:"urbana"});
                    Bicicleta.add(aBici2, function(err, newBici){
                        if (err) console.log(err);
                        Bicicleta.findByCode(1, function(err,targetBici){
                            expect(targetBici.code).toBe(aBici.code);
                            expect(targetBici.color).toBe(aBici.color);
                            expect(targetBici.modelo).toBe(aBici.modelo);

                            done();
                        });
                    });
                });
            });
        });
    });
    describe('Bicicleta.removeByCode', () =>{
        it('debe quedar solo un elemento en lista', (done) =>{
            Bicicleta.allBicis(function(err,bicis){
                expect(bicis.length).toBe(0);


                var aBici = new Bicicleta({code: 1, color:"verde", modelo:"urbana"});
                Bicicleta.add(aBici, function(err, newBici){
                    if (err) console.log(err);
                    
                    var aBici2 = new Bicicleta({code: 2, color:"rojo", modelo:"urbana"});
                    Bicicleta.add(aBici2, function(err, newBici){
                        if (err) console.log(err);
                        Bicicleta.removeByCode(1, function(err,bicis){
                            Bicicleta.allBicis(function(err,bicis){
                                expect(bicis.length).toBe(1);

                                done();
                            });
                        });
                    });
                });
            });
        });
    });
    
    
});




/* 
beforeEach(() => {Bicicleta.allBicis = [];});

describe('Bicicleta.allBicis', function() {
    it('comienza vacia', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

describe('Bicicleta.add', () => {
    it('agregamos una', () =>{
        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta(1, 'rojo', 'urbana', [-34.893627, -56.184318]);
        Bicicleta.add(a);

        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    });
});


describe('Bicicleta.findById', () =>{
    it('Debe devolver la bici con id = 1', () =>{
        expect(Bicicleta.allBicis.length).toBe(0);
        
        var aBici = new Bicicleta(1, "verde", "urbana");
        var aBici2 = new Bicicleta(2, "roja", "montaña");
        Bicicleta.add(aBici);
        Bicicleta.add(aBici2);
        
        var targetBici = Bicicleta.findById(1);
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(aBici.color);
        expect(targetBici.modelo).toBe(aBici.modelo);
        
    });
});

describe('Bicicleta.removeById', () =>{
    it('debe borrar la bici de id = 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        
        var aBici = new Bicicleta(1, "verde", "urbana");
        var aBici2 = new Bicicleta(2, "roja", "montaña");
        Bicicleta.add(aBici);
        Bicicleta.add(aBici2);
        expect(Bicicleta.allBicis.length).toBe(2);
        
        var removeBici = Bicicleta.removeById(1);
        
        expect(Bicicleta.allBicis.length).toBe(1);

    });
}); */