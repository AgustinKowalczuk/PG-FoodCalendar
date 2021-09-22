const express = require("express");
const router = express.Router()
const { env: { PROD_ACCESS_TOKEN } } = process;

// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

// Agrega credenciales
mercadopago.configure({
  access_token: PROD_ACCESS_TOKEN
});


router.get('/checkout', async (req, res,next) => {
  console.log('entré a checkout');
  let preference = {
    items: [
      {
        title: 'Recipe Calendar',
        unit_price: 500,
        quantity: 1,
      }
    ],
    back_urls: {
      success : "http://localhost:3001/checkout/success",
      failure : "http://localhost:3000/checkout",
      pending : "http://localhost:3001/checkout/pending"
  }
      
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
  console.log(req.query);
})

module.exports= router;