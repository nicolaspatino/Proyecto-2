/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function getList()
            {            
                var menu = document.getElementById("moneda1");
                var menu2 = document.getElementById("moneda2");
                var menu3 = document.getElementById("moneda3"); 
                var i=0;
                var lista = valores();
                for (var a in lista) {   
                    menu.options[i] = new Option(a);
                    menu2.options[i] = new Option(a);
                    menu3.options[i] = new Option(a);
                    i+=1;
                }
                return lista;
            }

function calculaValue()
            {
                                   
                var numero = document.getElementById("num");
                var moneda1 = document.getElementById("moneda1");
                var moneda2 = document.getElementById("moneda2");   
                var lista=valores();
                var cambio=0;
                var apoyo=0;
                var valor1=parseFloat(lista[moneda1.value]);
                var valor2=parseFloat(lista[moneda2.value]);
                if (moneda1.value === 'USD'){
                    apoyo= parseFloat(valor1*valor2);
                    cambio=apoyo*numero.value;    
                }
                else{
                    cambio=(1/valor1)*valor2;
                    cambio=cambio*numero.value; 
                }
                document.getElementById("result").value = cambio;

                    return cambio;

            
        }
function valores(){
    
    url ="https://mbsyj73bqa.execute-api.us-east-1.amazonaws.com/prod/recurso";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send(null);
    var lista = xmlHttp.responseText;
    lista= JSON.parse(lista)['rates'];
    return lista;

}
function genera_tabla() {

    var moneda = document.getElementById("moneda3").value;
    if (!exists(moneda)) {
        var monedas = valores();
        var tabla = document.getElementById("tabla");
        var tblBody = document.createElement("tbody");
        for (var k in monedas) {
            var fila = document.createElement("tr");
            for (var j = 0; j < 2; j++) {
                if (k !== moneda) {
                    var columna = document.createElement("td");
                    var celda;
                    try {
                        if (j === 0) {
                            celda = document.createTextNode(k);
                        } else {
                            celda = document.createTextNode(read(k, moneda, monedas));
                        }
                    } catch (e) {

                        if (e instanceof TypeError) {

                        }
                    }

                    columna.appendChild(celda);
                    fila.appendChild(columna);
                }
            }
            tblBody.appendChild(fila);
        }
        tabla.appendChild(tblBody);
    }
}
function exists(moneda) {
    var temp = document.getElementById("tabla");
    if (temp.getElementsByTagName("tbody").length !== 0) {
        removetag( moneda);
    }
    return (temp.getElementsByTagName("tbody").length !== 0);
}
function removetag(moneda) {
    var monedas = getList();
    var tblBody = document.createElement("tbody");
    for (var k in monedas) {
        var fila = document.createElement("tr");
        for (var j = 0; j < 2; j++) {
            if (k !== moneda) {
                var columna = document.createElement("td");
                var celda;
                try {
                    if (j === 0) {
                        celda = document.createTextNode(k);
                    } else {
                        celda = document.createTextNode(read(k, moneda, monedas));
                    }
                } catch (e) {

                }

                columna.appendChild(celda);
                fila.appendChild(columna);
            }
        }
        tblBody.appendChild(fila);
        
        
    }
    var tabla = document.getElementById("tabla");
    var body=tabla.getElementsByTagName("tbody")[0];
    body.parentNode.replaceChild(tblBody,body);
}
function read(moneda1,moneda2,lista){
    var val;
    if (moneda1.value === '"USD"') {
        val=parseFloat(lista[moneda2]);
    } else{
        val=(1/parseFloat(lista[moneda1])*parseFloat(lista[moneda2]));
    }
    return val;
}