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
                var lista = ["JPY", "USD", "COP", "EUR", "BRL", "CAD", "AUD", "CHF", "GBP"];
                var i;
                for (i = 0; i < lista.length; i++) {
                    menu.options[i] = new Option(lista[i]);
                    menu2.options[i] = new Option(lista[i]);
                    menu3.options[i] = new Option(lista[i]);
                }
                return lista;
            }

function getVarsUrl()
            {
                try {
                var numero = document.getElementById("num");
                var moneda1 =document.getElementById("moneda1");
                var moneda2 =document.getElementById("moneda2"); 
                url ="https://mbsyj73bqa.execute-api.us-east-1.amazonaws.com/prod/recurso";
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open("GET", url, false); // false for synchronous request
                xmlHttp.send(null);
                var lista = xmlHttp.responseText;
                
                }catch(err){}
            
        }

function genera_tabla() {
   var moneda = document.getElementById("moneda3").value;
    var monedas = getList();    
    
    var body = document.getElementsByTagName("body")[0];
 
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");
    for (var i = 0; i < 5; i++) {
        var fila = document.createElement("tr");
        for (var j = 0; j < 2; j++) {
            if (monedas[i] != moneda) {
                var columna = document.createElement("td");
                var celda;
                if (j == 0) {
                    celda = document.createTextNode(monedas[i]);
                } else {
                    celda = document.createTextNode(read(monedas[i], moneda));
                }
                columna.appendChild(celda);
                fila.appendChild(columna);
            }
        }
        tblBody.appendChild(fila);
    }
    tabla.appendChild(tblBody);
    body.appendChild(tabla);
    tabla.setAttribute("border", "2");
}
function read(moneda1, moneda2) {
    url ="https://mbsyj73bqa.execute-api.us-east-1.amazonaws.com/prod/recurso";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send(null);
    var lista = xmlHttp.responseText;
    lista= JSON.parse(lista);
    var k;
    for (k = 0; k < lista.length; ++k){
        console.log(lista[k]);        
    }
    
}