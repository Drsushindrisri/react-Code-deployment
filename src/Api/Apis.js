import axios from "axios";

export const fetchData = async (actionVal) => {
  try {
    const res = await axios.get("https://cp-staging.s10health.com/api", {
      params: {
        actionVal,
        module: "Support",
      },
    });
    return res;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
