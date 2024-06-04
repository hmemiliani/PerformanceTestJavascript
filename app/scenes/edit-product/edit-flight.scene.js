import { navigateTo } from "../../Router";
import styles from "./edit-flight.styles.css";

export function EditFlightScene() {
    const flightInfo = JSON.parse(sessionStorage.getItem('flightInfo') || '{}');
    const { id, flightNumber, origin, destination, departure, arrival} = flightInfo;
    

    const pageContent = `
        <div class="${styles.editProductContainer}">
            <div class="${styles.header}">
            <h1>Editar vuelo</h1>
            </div>
            <form id="editProductForm" class="${styles.editform}">
                <label for="flightNumber">Flight Number:</label>
                <input type="text" placeholder="Flight Number" id="flightNumber" maxlength="20" value="${flightNumber}" disabled>
                
                <label for="origin">Origin:</label>
                <input type="text" placeholder="Origin" id="origin" value="${origin}" required>
                
                <label for="destination">Destination:</label>
                <input type="text" placeholder="Destination" id="destination" value="${destination}" required><br>
            
                <label for="departure">Departure:</label>
                <input type="date" id="departure" value="${departure}" required><br>
             
                <label for="arrival">arrival:</label>
                <input type="date" id="arrival" value="${arrival}" required><br>
            
                <button type="submit" class="${styles.edithbtn}">Save Changes</button>
            </form>
        </div>

    `;

    const logic = () => {
        const form = document.getElementById('editProductForm');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            // obtengo los valores del formulario
            const updatedProduct = {
                flightNumber: form.elements.flightNumber.value,
                origin: form.elements.origin.value,
                destination: form.elements.destination.value,
                departure: form.elements.departure.value,
                arrival: form.elements.arrival.value
            };

            // hagp la solicitud PUT para actualizar el producto
            try {
                const response = await fetch(`http://localhost:3000/flights/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedProduct)
                });

                if (response.ok) {
                    alert("Flight updated!")
                    navigateTo('/');
                } else {
                    console.error('Error updating product:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating product:', error);
            }
        });
    };

    return {
        pageContent,
        logic
    };
}
