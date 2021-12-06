import axios from "axios";

export const fetchData = async (actionVal, payloadType, body, moduleVal) => {
  const payload = new FormData();

  if (payloadType === "formData") {
    for (const key in body) {
      payload.append(key, body[key]);
    }
  }

  try {
    const res = await axios({
      method: "post",
      url: process.env.REACT_APP_URL_PROD,
      params: {
        actionVal,
        moduleVal: moduleVal || "Support",
        ...(payloadType === "query" && { ...body }),
      },
      headers: {
        Authorization: process.env.REACT_APP_BEARER_TOKEN,
      },
      ...((payloadType === "formData" || payloadType === "reqBody") && {
        data: payloadType === "formData" ? payload : { ...body },
      }),
    });

    return res?.data?.data ? res.data.data : res?.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
