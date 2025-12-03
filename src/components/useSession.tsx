import { useEffect, useState } from "react";
import { CreateSessionResponse, useBasisTheory } from "@basis-theory/react-elements";
import axios from "axios";

export const useSession = () => {
  const { bt } = useBasisTheory();
  const [session, setSession] = useState<CreateSessionResponse>();

  useEffect(() => {
    const createSession = async () => {
      if (bt && !session) {
        console.log("Creating session");
        const newSession = await bt.sessions.create();
        await axios.post("/api/authorize/display", {
          nonce: newSession.nonce,
        });
        setSession(newSession);
      }
    };

    createSession();
  }, [bt, session]);

  return session;
};
