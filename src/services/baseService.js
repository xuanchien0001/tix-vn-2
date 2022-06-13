import axios from "axios";
import { DOMAIN_API, TOKEN } from "../util/setting/config";

export class baseService {
  get = (url) => {
    return axios({
      type: "GET",
      url: `${DOMAIN_API}/${url}`,
    });
  };

  post = (url, model) => {
    return axios({
      method: "POST",
      url: `${DOMAIN_API}/${url}`,
      data: model,
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  };

  delete = (url) => {
    return axios({
      method: "DELETE",
      url: `${DOMAIN_API}/${url}`,
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  };
}
