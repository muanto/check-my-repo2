import React, { useState } from "react";
// import axios from "axios";

export interface UsePushMoreIODataType {
  username: string;
  repositoryName: string;
}
export type UsePushMoreIOState = "idle" | "loading" | "success" | "error";

// const pushMoreUrl = "https://pushmore.io/webhook/34LQgwoNxStyVqk9Tk3dmiwM";
const pushMoreUrl = "http://localhost:5500/send-telegram-message";

const usePushMoreIO = () => {
  const [state, setState] = useState<UsePushMoreIOState>("idle");
  const sendData = React.useCallback(async (data: UsePushMoreIODataType) => {
    setState("loading");
    try {
      // Axios causa problemi con i test
      // await axios.post(pushMoreUrl, data);

      const payLoad = {
        sender: "Antonio Murolo",
        repoUrl: `https://github.com/${data.username}/${data.repositoryName}`,
      };
      await fetch(pushMoreUrl, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(payLoad),
      });

      setState("success");
    } catch (error) {
      setState("error");
    }
  }, []);

  return { sendData, state };
};

export default usePushMoreIO;
