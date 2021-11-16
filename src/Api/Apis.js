import axios from "axios";

export const fetchData = async (actionVal) => {
  try {
    const res = await axios.get("https://cp-staging.s10health.com/api", {
      params: {
        actionVal,
        module: "Support",
      },
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6Ijk4MSIsIlVTRVJfSUQiOiI5ODEiLCJwcmFjdGljZV9pZCI6IjE3NSIsIkNPTVBBTllfSUQiOiIxNzUiLCJ1c2VyTmFtZSI6IkRpdnlhIEQiLCJwcmFjdGljZU5hbWUiOiJTMTAgSGVhbHRoIFNhZmVDYXJlIFB2dCBMdGQiLCJwcmFjdGljZV9sb2dvIjoiaHR0cHM6XC9cL3MxMHByZC5zMy1hcC1zb3V0aGVhc3QtMS5hbWF6b25hd3MuY29tXC9QcmFjdGljZUxvZ29cLzIwMjEwMzE2XzE2MTU5MDY0OTVfMjE1Ny5wbmciLCJvcmdfY29kZSI6IkpIVVA2RSIsIndhaWxpc3RtZW51IjoiZmFsc2UiLCJmZWVkYmFja21lbnUiOiJmYWxzZSIsInJvbGVfaWQiOiIxNyIsInN0YXR1cyI6IjEiLCJ0eXBlIjoiV2VsbG5lc3MiLCJhdXRoX3Rva2VuIjoiNjQxOThiODc3NTI5ZjlkMTg0NDA4NWFjYzUyZGJjMjMiLCJyb2xlcyI6WyJhdXRoZW50aWNhdGVkIl0sInJlc1N0YXR1cyI6InN1Y2Nlc3MifQ.38jmnIy3siwzhSoZXWTBnR6aPXzZ3Wd2zHRr7pAeAYEjlTzgrN9bT12mFev1hJPzzHORY8ltS7zhXuHjt4bnxA`,
      },
    });

    return res?.data ? res.data : {};
  } catch (error) {
    throw new Error(`${error}`);
  }
};
