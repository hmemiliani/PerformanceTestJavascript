import { navigateTo } from "../../Router";
import styles from "./order.styles.css";

export function OrderScene() {
    const pageContent = `
    <div class="${styles.orderContainer}">
        <div class="${styles.header}">
            <h1>Confirmar vuelo</h1>
        </div>
        <div id="orderDetails" class="${styles.orderDetails}"></div>
        <button id="confirmF" class="${styles.btn}">Confirmar Reserva</button>
    </div>
    `;

    const logic = () => {
        const flightInfo = JSON.parse(sessionStorage.getItem('flightInfo'));

        if (!flightInfo) {
            alert("No hay información del vuelo disponible.");
            navigateTo('/');
            return;
        }

        const orderDetails = document.getElementById('orderDetails');
        orderDetails.innerHTML = `
            <h4>${flightInfo.flightNumber}</h4>
            <h6>Origen:</h6>
            <h4>${flightInfo.origin}</h4>
            <h6>Destino:</h6>
            <h4>${flightInfo.destination}</h4>
            <small>Departure: ${flightInfo.departure}</small><br>
            <small>Arrival: ${flightInfo.arrival}</small>
        `;

        document.getElementById('confirmF').addEventListener('click', () => {
            alert("Vuelo Reservado");
            navigateTo('/');
        });
    };

    return {
        pageContent,
        logic
    };
}
