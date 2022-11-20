xhttp = new XMLHttpRequest();
var lista;
var api = "https://gabrielestvam.herokuapp.com/api/produto/";

function listar() 
{
     xhttp.open("GET", api);
    xhttp.send();
    xhttp.onload = function () 
    {
        lista = this.responseText;
        lista = JSON.parse(lista);
        texto = "";
        i = 0;
        for (const u of lista) 
        {
            texto += `<tr onclick='editar(${i})'><td>${u.id}</td><td>${u.nome}</td><td>${u.descricao}</td><td>${u.valor}</td></tr>`;
            i++;
        }
        document.getElementById('lista').innerHTML = texto;
    }
}

function editar(i) 
{
    u = lista[i];
    document.getElementById("id").value = u.id;
    document.getElementById("nome").value = u.nome;
    document.getElementById("descricao").value = u.descricao;
    document.getElementById("valor").value = u.valor;
    
}

function gravar() 
{
    var produto = {};
    produto.id = document.getElementById("id").value;
    produto.nome = document.getElementById("nome").value;
    produto.descricao = document.getElementById("descricao").value;
    produto.valor = document.getElementById("valor").value;
    
   
    if (produto.id > 0) 
    {
        acao = "PUT"; 
    } 
    else 
    {
        acao = "POST"; 
    }

    xhttp.open(acao, api);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(produto));
    xhttp.onload = function () 
    {
        listar();
        limpar();
    }
}

function limpar() 
{
    document.getElementById("id").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
    
}

function apagar() 
{
    id = document.getElementById("id").value;
    xhttp.open("DELETE", api + id);
    xhttp.send();
    xhttp.onload = function () 
    {
        alert(this.responseText);
        listar();
        limpar();
    }
}
listar();