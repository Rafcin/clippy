import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosRequestConfig } from "axios";
import { filterProperties, isValidURL } from "@/utils/api";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { endpoint } = req.query;

  if (!endpoint) {
    const out = {
      error: "Missing endpoint URL!",
    };

    res.status(400).json(out);
    return;
  }

  if (!isValidURL(endpoint as string)) {
    const out = {
      error: "Endpoint parameter must be a valid URL!",
    };

    res.status(400).json(out);
    return;
  }

  try {
    const reqConfig: AxiosRequestConfig = {
      //@ts-ignore
      url: endpoint,
      method: "get",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      params: filterProperties({ ...req.query }, ["endpoint"]),
    };

    const endpointReq = await axios(reqConfig);
    const endpointRes = await endpointReq.data;

    res.status(200).json(endpointRes);
  } catch (err: Error | any) {
    const out = {
      error: "Something went wrong...",
      message: err.message,
    };

    res.status(500).json(out);
  }
};

export default handler;
