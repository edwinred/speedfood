import * as React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { urlMain } from '../Axios';
import { IonContent, IonPage } from '@ionic/react';
import { Link } from 'react-router-dom';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51PGTA0P3QrwGa9Cf51I4hbsk6MmeUmXeHmlIeZdPAQsbcXMVWJycy7I9PGW8zQN8o82Y8KLUku0qQoafm7SjaJTt00IA403qnv');

const Pago = () => {
    
  const fetchClientSecret = React.useCallback(() => {
    // Create a Checkout Session
    return fetch(`${urlMain}/api/pagos/create-checkout-session`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({monto: 100})
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = {fetchClientSecret};

  return (
    <IonPage>
        <IonContent fullscreen>
        <div>
            <Link to={"/app/carrito"}>Cerrar</Link>
            </div>

    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
        >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
            </IonContent>
    </IonPage>
  )
}

export default Pago