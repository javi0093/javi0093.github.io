var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var server = require('../../bin/www');
var request = require('request');

var base_url = "http://127.0.0.1:3000/api/bicicletas";

beforeAll(async ()=>{
    await mongoose.disconnect();
});
describe('BICICLETAS API', () => {
    beforeEach(function(done){
        var mongoDB = 'mongodb://127.0.0.1/testdb';
        mongoose.connect(mongoDB, { useNewUrlParser: true});

        const db = mongoose.connection;
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
    
    
    describe("GET BICICLETAS /", () => {
        it("Status 200", (done) => {
            request.get(base_url + "/", function(error, response, body){
                expect(response.statusCode).toBe(200);
                var result = JSON.parse(body);
                console.log(result);
                expect(result.bicicletas.length).toBe(0);
                done();
            });
        });
    });
    describe("POST BICICLETAS /create", () => {
        it("Status 200", (done)=>{
            var headers = {'content-type' : 'application/json'};
            var aBici = '{"id": 10, "color": "rojo", "modelo": "urbana", "lat": -34, "lng": -54}';
            request.post({
                headers: headers,
                url: base_url + '/create',
                body: aBici
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);
                var bici = JSON.parse(body).bicicleta;
                console.log(bici);

                expect(bici.color).toBe("rojo");
                expect(bici.ubicacion[0]).toBe(-34);
                expect(bici.ubicacion[1]).toBe(-54);
                done();
            });
        });
    });
    
});

    










/*describe('DELETE BICICLETAS /delete', () => {
    it('Status 200', (done)=>{

        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta(1, 'rojo', 'urbana', [-34.893627, -56.184318]);
        Bicicleta.add(a);
        var b = new Bicicleta(2, 'blanca', 'urbana', [-34.888628, -56.188610]);
        Bicicleta.add(b);

        var headers = {'content-type' : 'application/json'};
        var aBici = '{"id": 2}';
        request.delete({
            headers: headers,
            url: 'http://localhost:3000/api/bicicletas/delete',
            body: aBici
            }, 
            function(error, response, body){
                expect(response.statusCode).toBe(204);
                expect(Bicicleta.allBicis.length).toBe(1);
                done();
            });
    });
});



describe('UPDATE BICICLETAS /update', () => {
    it('Status 200', (done)=>{

        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta(1, 'rojo', 'urbana', [-34.893627, -56.184318]);
        Bicicleta.add(a);


        var headers = {'content-type' : 'application/json'};
        var aBici = '{"id": 1, "newid": 2, "color": "azul", "modelo": "montaña", "lat": -34, "lng": -54}';
        
        request.post({
            headers: headers,
            url: 'http://localhost:3000/api/bicicletas/update',
            body: aBici
            }, 
            function(error, response, body){
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(2).color).toBe("azul");
                expect(Bicicleta.findById(2).modelo).toBe("montaña");
                expect(Bicicleta.findById(2).ubicacion[0]).toBe(-34);
                expect(Bicicleta.findById(2).ubicacion[1]).toBe(-54);
                done();
            });
    });
});*/