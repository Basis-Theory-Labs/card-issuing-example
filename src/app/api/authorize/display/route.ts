import { BasisTheoryClient } from "@basis-theory/node-sdk";
import { NextRequest } from "next/server";

const sessionDuration = (): string =>
  new Date(
    Date.now() +
      1000 * // millis
        60 * // seconds
        60 * // minutes
        1 // hours
  ).toISOString();

const bt = new BasisTheoryClient({
  apiKey: process.env.BASIS_THEORY_PRIVATE_KEY,
});

export async function POST(request: NextRequest) {
  const { nonce, tokenId } = await request.json<any>();

  await bt.sessions.authorize({
    nonce,

    expiresAt: sessionDuration(),
    rules: [
      {
        description: "Allows displaying token",
        priority: 1,
        permissions: ["token:read"],
        conditions: [
          {
            attribute: "id",
            operator: "equals",
            value: tokenId,
          },
        ],
        transform: "reveal",
      },
    ],
  });

  return new Response(null, { status: 204 });
}
