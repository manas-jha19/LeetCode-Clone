import axios from "axios";

const JUDGE0_BASE_URL = "https://api.onlinecompiler.io/api/judge0";
function getHeaders(): Record<string, string> {
  const api_key = process.env.ONLINECOMPILER_API_KEY;

  if (!api_key) {
    throw new Error("ONLINECOMPILER_API_KEY is missing");
  }
  return {
    "X-Auth-Token": api_key,
    "Content-Type": "application/json",
  };
}

export function getJudge0LanguageId(language: string) {
  const languageMap: Record<string, number> = {
    PYTHON: 71,
    JAVASCRIPT: 102,
    JAVA: 62,
  };

  const languageStore = languageMap[language.toUpperCase()];

  if (!languageStore) {
    throw new Error(`Unsupported lanugage = ${language}`);
  }
  return languageStore;
}

export async function submitBatch(submissions: any[]) {
  // const options = {
  //   method: "POST",
  //   url: "https://judge0-extra-ce1.p.rapidapi.com/submissions/batch",
  //   params: {
  //     base64_encoded: "false",
  //   },
  //   headers: {
  //     "x-rapidapi-key": "246d25b599msh3654d029f4d6099p1b5bf9jsn141c758ee80a",
  //     "x-rapidapi-host": "judge0-extra-ce1.p.rapidapi.com",
  //     "Content-Type": "application/json",
  //   },
  //   data: {
  //     submissions: submissions,
  //   },
  // };
  // const { data } = await axios.request(options);
  // return data;

  const { data } = await axios.post(
    `${JUDGE0_BASE_URL}/submissions/batch`,
    {
      submissions,
    },
    {
      params: {
        base64_encoded: "false",
      },
      headers: getHeaders(),
      timeout: 30000,
    },
  );

  return data;
}

export async function pollBatchResults(tokens: string[]) {
  // while (true) {
  //   const options = {
  //     method: "GET",
  //     url: "https://judge0-extra-ce1.p.rapidapi.com/submissions/batch",
  //     params: {
  //       tokens: tokens.join(","),
  //       base64_encoded: "true",
  //       fields: "*",
  //     },
  //     headers: {
  //       "x-rapidapi-key": "246d25b599msh3654d029f4d6099p1b5bf9jsn141c758ee80a",
  //       "x-rapidapi-host": "judge0-extra-ce1.p.rapidapi.com",
  //     },
  //   };
  //   const { data } = await axios.request(options);
  //   const results = data.submissions;
  //   const isAllDone = results.every(
  //     (result: any) => result.status.id !== 1 && result.status.id !== 2,
  //   );
  //   if (isAllDone) {
  //     return results;
  //   }
  //   await sleep(1000);
  // }

  if (tokens.length === 0) {
    return [];
  }

  const maxAttempts = 90;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const { data } = await axios.get(`${JUDGE0_BASE_URL}/submissions/batch`, {
      params: {
        tokens: tokens.join(","),
        base64_encoded: "false",
        fields: "*",
      },
      headers: getHeaders(),
      timeout: 15000,
    });

    const results = data.submissions;

    if (!Array.isArray(results)) {
      throw new Error("Invalid response from OnlineCompiler API");
    }

    const isAllDone = results.every(
      (result: any) =>
        result.status && result.status.id !== 1 && result.status.id !== 2,
    );

    if (isAllDone) {
      return results;
    }

    await sleep(1000);
  }

  throw new Error("Code execution timed out");
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
