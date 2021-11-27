import axios from "axios";

export const fetchData = async (actionVal, hasParams, params, hasBody) => {
  try {
    const res = await axios.get(
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_URL_PROD
        : process.env.REACT_APP_URL_DEV,
      {
        params: {
          actionVal,
          moduleVal: "Support",
          ...(hasParams && { ...params }),
        },
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6Ijk5IiwiVVNFUl9JRCI6Ijk5IiwicHJhY3RpY2VfaWQiOiIxOCIsIkNPTVBBTllfSUQiOiIxOCIsInVzZXJOYW1lIjoiRGVtbyBBZG1pbiBBRE0iLCJwcmFjdGljZU5hbWUiOiJTMTAgQ2xpbmljIiwicHJhY3RpY2VfbG9nbyI6Imh0dHBzOlwvXC9zMTBzdGFnaW5nLnMzLWFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL1ByYWN0aWNlTG9nb1wvMjAyMDEyMDlfMTYwNzUwMjkyMl80ODE5LnBuZyIsIm9yZ19jb2RlIjoiTkNUUUhRIiwid2FpbGlzdG1lbnUiOiIiLCJmZWVkYmFja21lbnUiOiJmYWxzZSIsInJvbGVfaWQiOiIxIiwic3RhdHVzIjoiMSIsInR5cGUiOiJDbGluaWMiLCJhdXRoX3Rva2VuIjoiNjc4YjNmYjE4YWQxNWFiNzU4ODNkZjY5NTI0MWU3NzEiLCJyb2xlcyI6WyJhdXRoZW50aWNhdGVkIl0sInJlc1N0YXR1cyI6InN1Y2Nlc3MifQ.wbxEnw-6fgedssd0xM0tKAhndFVTukj6ga9Xr8cTYArMYwWZoiWazyX9WfD28YYr4_kEWxMLB8ozr7MqGrs6jg`,
        },
        ...(hasBody && {
          data: {
            ...params,
          },
        }),
      }
    );

    return res?.data?.data ? res.data.data : res?.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
