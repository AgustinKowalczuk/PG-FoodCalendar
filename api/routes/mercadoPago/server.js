const express = require("express");
const router = express.Router()
const { env: { PROD_ACCESS_TOKEN } } = process;

// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

// Agrega credenciales
mercadopago.configure({
  access_token: PROD_ACCESS_TOKEN
});


router.get('/checkout', async (req, res) => {
  let preference = {
    items: [
      {
        title: 'Recipe Calendar',
        unit_price: 500,
        quantity: 1,
      }
    ]
  };

  mercadopago.preferences.create(preference)
  .then(function(response){
  // Este valor reemplazará el string "<%= global.id %>" en tu HTML
    global.id = response.body.id;
  }).catch(function(error){
    console.log(error);
  });
});