import { navigateTo } from "../../Router";
import styles from "./home.styles.css";

export function HomeScene(){

    //Verificacion de roles
    const role = localStorage.getItem('role');
    let CardButton;
    let addflight;
    //segun cada role se crearan botones diferentes
    if(role == "Admin"){
        CardButton = `
        <button class="edit ${styles.btn}" data-id="edit">Editar</button>
        <button class="delete ${styles.btn}" data-id="delete">Borrar</button>
        `;
        addflight = `<button id="create" class="${styles.btncreate}">Add flight</button>`;
    }
    if(role == "User"){
        CardButton = `<button class="buy ${styles.btn}">Reservar</button>`;
    }

    //page content
    const pageContent = `
    <div class="${styles.homeContainer}">
        <div class="${styles.header}">
            <h1>Vuelos Disponibles</h1>
        </div>
        <div id="flightsCards" class="${styles.flightCards}"></div>
        ${addflight || ''}
    </div>
    `;

    const logic = () => {
        // cargar los vuelos
        const allFlights = "http://localhost:3000/flights";
        const loadFlights = async () => {
            const response = await fetch(allFlights);
            const flights = await response.json();
            flights.forEach(flight => {
                appendFlightsToList(flight);
            });
            //se llama a esta funcion que corresponde a los eventlisteners de los botones
            addEventListeners();
        };

        // añade la tarjeta de cada vuelo
        const appendFlightsToList = (flight) => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <div class="${styles.card}">
                    <div class="info ${styles.info}">
                        <h3>${flight.flightNumber}</h3>
                        <h6>Origen:</h6>
                        <h4>${flight.origin}</h4>
                        <h6>Destino:</h6>
                        <h4>${flight.destination}</h4>
                        <small>departure: ${flight.departure}</small><br>
                        <small>arrival: ${flight.arrival}</small>
                    </div>
                    <div class="buttons">
                        ${CardButton}
                    </div>
                </div>
            `;
            
            //cambia el data-id de cada boton por el correspondiente para poder llamar el vuelo en el json
            const deleteButton = card.querySelector('.delete');
            if (deleteButton) {
                deleteButton.setAttribute('data-id', flight.id);
            }

            const editbutton = card.querySelector('.edit');
            if (editbutton) {
                editbutton.setAttribute('data-id', flight.id);
            }
            document.getElementById("flightsCards").appendChild(card);
        };

        // la funcion de funciones de los event listeners de los botones
        const addEventListeners = () => {
            if(role == "User"){
                const $buttonBuy = document.querySelectorAll('.buy');
                $buttonBuy.forEach(button => {
                    button.addEventListener('click', (e) => {
                        //traigo toda la informacion de cada boton y la epaso a unas constantes que luego pasare por la sessionstorage hacia las otras vistas
                        const card = e.target.closest('.card');
                        const id = e.target.getAttribute('data-id');
                        const flightNumber = card.querySelector('h3').textContent;
                        const origin = card.querySelector('h4').textContent;
                        const destination = card.querySelector('h4').textContent;
                        const departure = card.querySelector('small:nth-child(6)').textContent.split(' ')[1];
                        const arrival = card.querySelector('small:nth-child(8)').textContent.split(' ')[1];

                        // Crear la información del producto
                        const flightInfo = { id, flightNumber, origin, destination, departure, arrival };
                        sessionStorage.setItem('flightInfo', JSON.stringify(flightInfo));

                        // Navegar a la página de orden
                        navigateTo('/order');
                    });
                });
            }
            if(role == "Admin"){
                const $buttonEdit = document.querySelectorAll('.edit');
                const $buttonDelete = document.querySelectorAll('.delete');
                const $buttonCreate = document.querySelector('#create');
                
                $buttonEdit.forEach(button => {
                    button.addEventListener('click', () => {
                        //traigo toda la informacion de cada boton y la epaso a unas constantes que luego pasare por la sessionstorage hacia las otras vistas
                        const card = button.closest('.card');
                        const id = button.getAttribute('data-id');
                        const flightNumber = card.querySelector('h3').textContent;
                        const origin = card.querySelector('h4').textContent;
                        const destination = card.querySelector('h4').textContent;
                        const departure = card.querySelector('small:nth-child(6)').textContent.split(' ')[1];
                        const arrival = card.querySelector('small:nth-child(8)').textContent.split(' ')[1]; 
                        const flightInfo = { id, flightNumber, origin, destination, departure, arrival };
                        sessionStorage.setItem('flightInfo', JSON.stringify(flightInfo));
                        
            
                        navigateTo('/editproduct');
                    });
                });

                $buttonDelete.forEach(button => {
                    button.addEventListener('click', async (e) => {
                        //borrar las tarjetas
                        const id = e.target.getAttribute('data-id'); 
                        const fflightNumber = e.target.closest('.card').querySelector('h3').textContent; 
                        const confirmed = confirm(`¿Estás seguro de que deseas eliminar el vuelo "${fflightNumber}"?`);
                        if (confirmed) {
                            const response = await fetch(`http://localhost:3000/flights/${id}`, {
                                method: 'DELETE',
                            });
                            if(response.ok){
                                const card = button.closest('.card'); 
                                if (card) {
                                    card.remove(); 
                                }
                            }
                        }
                    });
                });
                

                $buttonCreate.addEventListener('click', () => {
                    navigateTo('/addflight');
                });
            }
        };

        loadFlights();



    };

    return {
        pageContent,
        logic
    };
}
