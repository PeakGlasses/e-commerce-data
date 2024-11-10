import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function CheckoutReturn() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchParams, _] = useSearchParams();
    const [status, setStatus] = useState<{
        status: string;
        payment_status: string;
        customer_email: string;
    }>({
        status: "",
        payment_status: "",
        customer_email: "",
    });
    useEffect(() => {
        console.log("Calling API...");
        fetch(
            `http://localhost:8000/api/payments/${searchParams.get("session_id")}`,
            {
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((json) => setStatus(json))
            .catch((err) => console.error(err));
    }, []);

    if (status.status == "open") {
        // Remount embedded Checkout
        return <>still going on ...</>;
    } else if (status.status == "complete") {
        // Show success page
        // Optionally use session.payment_status or session.customer_email
        // to customize the success page
        return <>success</>;
    }
    return <div>hello</div>;
}
