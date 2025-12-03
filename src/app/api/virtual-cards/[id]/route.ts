import { BasisTheoryClient } from '@basis-theory/node-sdk';

const bt = new BasisTheoryClient({
  apiKey: process.env.BASIS_THEORY_PRIVATE_KEY,
});

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await bt.tokens.delete(params.id);
  return new Response(null, { status: 204 });
}
