// constructores
function Seguro(marca, year, tipo){
    this.marca = marca
    this.year = year
    this.tipo= tipo
}

//realiza la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function(){
    let cantidad;
    const base = 2000;
    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
    
        default:
            break;
    }

    //leer el año
    const diferencia = new Date().getFullYear() - this.year;
    //cada año que la dif es mayor, el costo va reducirse un 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    /* Si el seguro es básico se multiplica por un 30% más
    Si el seguro es completo se multiplica por un 50% más
    */
    if(this.tipo === 'basico'){
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;
    }
    return cantidad;
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

//muestra alertas en pantalla
UI.prototype.mostrarAlerta = function(mensaje, tipo){
    const div = document.createElement('div');
    if(tipo === 'error'){
        div.classList.add('error')
    } else{
        div.classList.add('correcto')
    }

    div.classList.add('mensaje', 'mt-10')
    div.textContent = mensaje;

    //insertar en el HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'))

    //limpio html
    setTimeout(() => {
        div.remove()
    }, 3000);
}

UI.prototype.mostrarResultado = function(total, seguro){
    //crear el resultado
    const div = document.createElement('div')
    div.classList.add('mt-10');
    div.innerHTML = `
    <p class="header">Tu Resumen</p>
    <p class="font-bold">Total: ${total}</p>
    `;
    const resultadoDiv = document.querySelector('#resultado');
    //mostrar spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block'
    setTimeout(() => {
        spinner.style.display = 'none'; //se borra spinner
        resultadoDiv.appendChild(div);//se muestra el resultado
    }, 3000);
}

//instanciar
const ui = new UI();

document.addEventListener('DOMContentLoaded', () =>{
    ui.llenarOpciones(); //llena el select con los años
})

eventListeners(); 
function eventListeners(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();

    //leer la marca seleccionada
    const marca = document.querySelector('#marca').value;

    //leer año seleccionado
    const year = document.querySelector("#year").value;

    //leer el tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if (marca === '' || year === '' || tipo === '') {
        ui.mostrarAlerta('Todos los campos son obligatorios', 'error');
        return
    }
    ui.mostrarAlerta('Cotizando...', 'exito');

    //instanciar el seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    //utilizar el prototype que va a cotizar
    ui.mostrarResultado(total, seguro);
}