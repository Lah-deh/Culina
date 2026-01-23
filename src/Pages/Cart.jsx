import { Helmet } from "react-helmet";
import { Suspense, lazy } from "react";
import '../Styles/Cart.scss'


const Header = lazy(() => import("../Components/Header"));
const CartPage = lazy(() => import ("../Components/CartPage.jsx"))

const Footer=lazy(() =>import ("../Components/Footer.jsx"));

function Cart() {
  return (
    <>
      <Helmet>
        
        <title>Culina | Intercontinental Dishes in Lagos</title>
        <meta
          name="description"
          content="Culina offers the best intercontinental dishes delivered to your doorstep."
        />
        <meta
          name="keywords"
          content="intercontinental dishes, Lagos, fusion cuisine, food delivery, international cuisine"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

    
        <meta property="og:title" content="Culina | Intercontinental Dishes in Lagos" />
        <meta
          property="og:description"
          content="Order from Culina and enjoy international dishes delivered fresh to your home."
        />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:type" content="website" />

        
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": "Culina",
            "image": "https://yourdomain.com/images/logo.png",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "lekki, Lagos",
              "addressLocality": "Lagos",
              "addressCountry": "NG"
            },
            "servesCuisine": "Intercontinental",
            "url": "https://yourdomain.com"
          }
          `}
        </script>
      </Helmet>

      
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <CartPage/>
        <Footer/>
      </Suspense>
    </>
  );
}

export default Cart;
