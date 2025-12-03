import { useEffect, useState } from "react";
import { CreateSessionResponse, Token, useBasisTheory } from "@basis-theory/react-elements";

export const useToken = (id?: string, session?: CreateSessionResponse) => {
  const [token, setToken] = useState<Token>();
  const { bt } = useBasisTheory();

  useEffect(() => {
    const retrieveToken = async () => {
      if (bt && id && session) {
        setToken(await bt.tokens.retrieve(id, { apiKey: session.sessionKey }));
      }
    };
    retrieveToken();
  }, [bt, id, session]);

  if (!session) {
    return undefined;
  }

  return token;
};
