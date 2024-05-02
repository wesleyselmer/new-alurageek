import { conectaApi } from "./conectaApi.js";

const form__produto = document.querySelector(".form__produto");
const inputNome   = document.querySelector("#nome");
const inputPreco  = document.querySelector("#preco");
const inputImagem = document.querySelector("#imagem");

let validaNome    = false;
let validaPreco   = false;
let validaImagem  = false;


function validaCampo(campo) {
    if (!(campo.value.length > 0)) {
        campo.style.border = "3px solid red";
        document.querySelector(`#erro__${campo.name}`).classList.remove("hidden");
        return false;
    } else {
        return true;
    }
}

function limpaCampo(campo) {
        campo.style.border = "3px solid var(--cor-borda)";
        document.querySelector(`#erro__${campo.name}`).classList.add("hidden");
}

async function criarProduto(evento) {

    evento.preventDefault();
    
    if(validaNome && validaPreco && validaImagem) {
        
        try {
            await conectaApi.criaProduto(inputNome.value, inputPreco.value, inputImagem.value);
            alert("Envio concluído!");
        } catch (e) {
            alert(e);
        }
    }
}

inputNome.addEventListener("focusout", function(){ validaNome = validaCampo(nome);});
inputPreco.addEventListener("focusout", function(){ validaPreco = validaCampo(preco);});
inputImagem.addEventListener("focusout", function(){ validaImagem = validaCampo(imagem);});
inputNome.addEventListener("focus", function(){ limpaCampo(nome);});
inputPreco.addEventListener("focus", function(){ limpaCampo(preco);});
inputImagem.addEventListener("focus", function(){ limpaCampo(imagem);});
form__produto.addEventListener("submit", evento => {
    console.log("entrou função Submit!");
    if (validaCampo(nome) && validaCampo(preco) && validaCampo(imagem)) {
        criarProduto(evento);
    }
});