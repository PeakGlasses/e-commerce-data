import { loadStripe } from "@stripe/stripe-js";
import { useCallback } from "react";
import {
    EmbeddedCheckout,
    EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { changePriceToCents } from "../utils/utils";

const stripePromise = loadStripe(
    "pk_test_51QDgz0AX3BJTFxF4hEIWo8ULbPEr2RGyNuFel0TgF8ph8HRpeVeCQk6zoVm63SKdWe5Frds0RKbr0Jurmirr5wGS008MkYnZpn"
);

export function Checkout() {
    const fetchClientSecret = useCallback(async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // Create a Checkout Session
        const res = await fetch(
            "http://localhost:8000/api/payments/create-checkout-session",
            {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({
                    currency: "cad",
                    items: [
                        {
                            name: "Sunglasses",
                            price: changePriceToCents(50.0),
                            quantity: 2,
                        },
                        {
                            name: "Hat",
                            price: changePriceToCents(25.0),
                            quantity: 1,
                        },
                    ],
                }),
            }
        );
        const data = await res.json();
        return data.clientSecret;
    }, []);

    const options = { fetchClientSecret };

    return (
        <div id="checkout">
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </div>
    );
}
