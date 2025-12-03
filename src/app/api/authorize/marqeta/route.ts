import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  const { token } = await request.json<any>();

  const {
    data: { control_token },
  } = await axios.post(
    "https://sandbox-api.marqeta.com/v3/pins/controltoken",
    {
      card_token: process.env.MARQETA_CARD_TOKEN,
      controltoken_type: "SET_PIN",
    },
    {
      auth: {
        username: process.env.MARQETA_APPLICATION_TOKEN as string,
        password: process.env.MARQETA_ACCESS_TOKEN as string,
      },
    }
  );

  await axios.put(
    "https://api.basistheory.com/proxy",
    {
      control_token,
      pin: `{{ ${token.id} }}`,
    },
    {
      headers: {
        "BT-PROXY-URL": "https://sandbox-api.marqeta.com/v3/pins",
        "BT-API-KEY": process.env.BASIS_THEORY_PRIVATE_KEY,
      },
      auth: {
        username: process.env.MARQETA_APPLICATION_TOKEN as string,
        password: process.env.MARQETA_ACCESS_TOKEN as string,
      },
    }
  );

  return NextResponse.json({ control_token });
}
