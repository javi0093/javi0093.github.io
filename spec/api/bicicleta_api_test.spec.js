var Bicicleta = require('../../models/bicicleta');
beforeEach(() => {Bicicleta.allBicis = [];});
const request = require('request');
var server = require('../../bin/www');



/* Éste es el hecho en clase, no funciona porque siempre pasa el test sin importar nada
describe('Bicicleta API', () => {
    describe('GET BICICLETAS /', () => {
        it('Status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);
            
            var a = new Bicicleta(1, 'rojo', 'urbana', [-34.893627, -56.184318]);
            Bicicleta.add(a);
            
            expect(Bicicleta.allBicis.length).toBe(1);
            
            request.get('http://localhost:3000/api/bicicletas', function(error, response, body){
                expect(response.statusCode).toBe(200);
            });
        });
    });
});*/


describe('BICICLETAS API', () => {
    describe('GET BICICLETAS /', () => {
        it('Status 200', (done)=>{
            expect(Bicicleta.allBicis.length).toBe(0);
            var headers = {'content-type' : 'application/json'};
            
            var a = new Bicicleta(1, 'rojo', 'urbana', [-34.893627, -56.184318]);
            Bicicleta.add(a);
            
            expect(Bicicleta.allBicis.length).toBe(1);

            request.get({
                headers: headers,
                url: 'http://localhost:3000/api/bicicletas'
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
});
    







describe('POST BICICLETAS /create', () => {
    it('Status 200', (done)=>{
        var headers = {'content-type' : 'application/json'};
        var abici = '{"id": 10, "color": "rojo", "modelo": "urbana", "lat": -34, "lng": -54}';
        request.post({
            headers: headers,
            url: 'http://localhost:3000/api/bicicletas/create',
            body: abici
        }, function(error, response, body){
            expect(response.statusCode).toBe(200);
            expect(Bicicleta.findById(10).color).toBe("rojo");
            done();
        });
    });
});



describe('DELETE BICICLETAS /delete', () => {
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
});