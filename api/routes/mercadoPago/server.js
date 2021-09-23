const express = require("express");
const router = express.Router()
const { env: { PROD_ACCESS_TOKEN, FRONT_URL } } = process;

// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

// Agrega credenciales
mercadopago.configure({
  access_token: PROD_ACCESS_TOKEN
});


router.get('/checkout', async (req, res,next) => {
  let preference = {
    items: [
      {
        title: 'Recipe Calendar',
        unit_price: 500,
        quantity: 1,
      }
    ],
    payer: {
      name: 'Prueba',
      surname: 'MercadoPago'
    },
    back_urls: {
      success : `${FRONT_URL}/checkout`,
      failure : `${FRONT_URL}/checkout`,
      pending : `${FRONT_URL}/checkout`
  },
  auto_return: 'approved'
      
  };
  try {
   const response= await mercadopago.preferences.create(preference);
   
     res.send(response.body.init_point);
  } catch (error) {
    console.log(error);
    next(error)
    
  }   
});

router.get('/checkout/success', (req, res, next) => {
  const { status, payment_id, merchant_order_id } = req.query;
  console.log(req.query);
  res.redirect(FRONT_URL);
});

module.exports= router;