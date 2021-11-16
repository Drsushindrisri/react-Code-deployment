import axios from "axios";

export const fetchData = async (actionVal) => {
  try {
    const config = {
      url: "https://api-staging.s10health.com:8080/",
      params: {
        actionVal,
        moduleVal: "Support",
      },
      method: "get",
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6IjcxNCIsIlVTRVJfSUQiOiI3MTQiLCJwcmFjdGljZV9pZCI6IjIzIiwiQ09NUEFOWV9JRCI6IjIzIiwidXNlck5hbWUiOiJTaW1idSBBZG1pbiIsInByYWN0aWNlTmFtZSI6IlMxMEhlYWx0aCBTcG9ydHMgTWVkaWNpbmUgJiBIaWdoIFBlcmZvcm1hbmNlIENlbnRyZSIsInByYWN0aWNlX2xvZ28iOiJodHRwczpcL1wvczEwc3RhZ2luZy5zMy1hcC1zb3V0aGVhc3QtMS5hbWF6b25hd3MuY29tXC9QcmFjdGljZUxvZ29cLzIwMjAxMTMwXzE2MDY3MjkxOTZfMTM0Ni5qcGVnIiwib3JnX2NvZGUiOiI3QjhZWlAiLCJ3YWlsaXN0bWVudSI6IiIsImZlZWRiYWNrbWVudSI6ImZhbHNlIiwicm9sZV9pZCI6IjEiLCJzdGF0dXMiOiIxIiwidHlwZSI6IkNsaW5pYyIsImF1dGhfdG9rZW4iOiI3Y2E5N2ZiYTEwMmMwNGM2ZDlhNDU0ODYyMTUwODI3ZSIsInJvbGVzIjpbImF1dGhlbnRpY2F0ZWQiXSwicmVzU3RhdHVzIjoic3VjY2VzcyJ9.rmcbEsjom0VUgOGeV4yT3lZpyHwg18trGpAcoXLDX-ChhfnvwSVL7fURBVF_jmAd7ZOMhVG2j6QJsTndu9xuUw`,
      },
    };

    const res = await axios(config);
    return res?.data ? res.data : {};
  } catch (error) {
    return [];
  }
};