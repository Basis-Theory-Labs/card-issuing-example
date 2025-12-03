import { NextRequest } from 'next/server';
import { BasisTheoryClient } from '@basis-theory/node-sdk';

const bt = new BasisTheoryClient({
  apiKey: process.env.BASIS_THEORY_PRIVATE_KEY,
});

export async function POST(request: NextRequest) {
  const { nonce } = await request.json<any>();

  await bt.sessions.authorize({
    nonce,
    permissions: ['token:use'],
  });

  return new Response(null, { status: 204 });
}
