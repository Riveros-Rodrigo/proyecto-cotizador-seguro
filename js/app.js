// constructores
function Seguro(marca, year, tipo){
    this.marca = marca
    this.year = year
    this.tipo= tipo
}

function UI(){}

//llena las opciones de los años
UI.prototype.llenarOpciones = function(){
    const max = new Date().getFullYear(),
    min = max - 20;

    const selectYear = document.querySelector('#year') //guardo el select
    for (let i = max; i > min; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i
        selectYear.appendChild(option)
    }
}

//instanciar
const ui = new UI();

document.addEventListener('DOMContentLoaded', () =>{
    ui.llenarOpciones(); //llena el select con los años
})