import { NextRequest, NextResponse } from 'next/server';
import { BasisTheoryClient } from '@basis-theory/node-sdk';
import axios from 'axios';
import * as querystring from 'node:querystring';

const bt = new BasisTheoryClient({
  apiKey: process.env.BASIS_THEORY_PRIVATE_KEY,
});

export async function POST(request: NextRequest) {
  const { issuer } = await request.json<any>();

  let token;
  if (issuer === 'lithic') {
    token = await issueCardLithic();
  } else if (issuer === 'marqeta') {
    token = await issueCardMarqeta();
  } else if (issuer === 'stripe') {
    token = await issueCardStripe();
  } else {
    return new Response(null, { status: 400 });
  }

  return NextResponse.json(token, { status: 200 });
}

const issueCardLithic = async () => {
  const { data } = await axios.post(
    'https://api.basistheory.com/proxy',
    {
      type: 'VIRTUAL',
    },
    {
      headers: {
        Authorization: process.env.LITHIC_API_KEY,
        'BT-API-KEY': process.env.BASIS_THEORY_PRIVATE_KEY,
        'BT-PROXY-KEY': process.env.LITHIC_ISSUER_PROXY_KEY,
      },
    }
  );
  return data.token;
};

const issueCardMarqeta = async () => {
  const { data } = await axios.post(
    'https://api.basistheory.com/proxy',
    {
      card_product_token: process.env.MARQETA_CARD_PRODUCT_TOKEN,
      user_token: process.env.MARQETA_USER_TOKEN,
    },
    {
      headers: {
        'BT-API-KEY': process.env.BASIS_THEORY_PRIVATE_KEY,
        'BT-PROXY-KEY': process.env.MARQETA_ISSUER_PROXY_KEY,
      },
      auth: {
        username: process.env.MARQETA_APPLICATION_TOKEN!,
        password: process.env.MARQETA_ACCESS_TOKEN!,
      },
    }
  );

  return data.token;
};

const issueCardStripe = async () => {
  // Stripe doesn't return the card data during creation, so it must be done in two steps
  // 1. Create the card directly with Stripe
  const {
    data: { id },
  } = await axios.post(
    'https://api.stripe.com/v1/issuing/cards',
    querystring.stringify({
      cardholder: process.env.STRIPE_CARDHOLDER_ID,
      currency: 'usd',
      type: 'virtual',
    }),
    {
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  // 2. Retrieve the card using the Proxy
  const { data } = await axios.get(
    `https://api.basistheory.com/proxy/${id}?expand[]=number&expand[]=cvc`,
    {
      headers: {
        'BT-API-KEY': process.env.BASIS_THEORY_PRIVATE_KEY,
        'BT-PROXY-KEY': process.env.STRIPE_ISSUER_PROXY_KEY,
        Authorization: `Bearer ${process.env.STRIPE_SECRET_API_KEY}`,
      },
    }
  );

  return data.token;
};

export async function GET() {
  const tokens = await bt.tokens.listV2();

  return NextResponse.json(tokens, { status: 200 });
}
