import { navigateTo } from "../../Router";
import styles from "./create-flight.styles.css";

export function CreateNewFlightScene(){
    const pageContent = `
    <div class="${styles.container}">
        <form class="${styles.createForm}">
            <h1>New Flight</h1>
            <input type="text" placeholder="Flight Number" id="flightNumber" maxlength="20">
            <input type="text" placeholder="Origin" id="origin">
            <input type="text" placeholder="Destination" id="destination">
            <input type="date" id="departure">
            <input type="date" id="arrival">
            <button type="submit" id="createflightbtn" class="${styles.createbtn}">Add Flight</button>
        </form>
    </div>
    `;


    const logic = () => {
        const createflightbtn = document.getElementById("createflightbtn");
        createflightbtn.addEventListener("click", async (e) => {
            e.preventDefault();
            
            const $flightNumber = document.getElementById("flightNumber").value;
            const $origin = document.getElementById("origin").value;
            const $destination = document.getElementById("destination").value;
            const $departure = document.getElementById("departure").value;
            const $arrival = document.getElementById("arrival").value;

            const apiUrl = "http://localhost:3000/flights";

            const productData = {
                flightNumber: $flightNumber,
                origin: $origin,
                destination: $destination,
                departure: $departure,
                arrival: $arrival
            };

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productData)
            });
            if(response.ok){
                alert("Flight created successfully");
                navigateTo('/home')
            } else{
                console.log("Oops something went wrong...");
            }
            });
        
    };

    return {
        pageContent,
        logic
    }
}