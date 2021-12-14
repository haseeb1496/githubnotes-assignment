import axios from "axios";
import { constants } from "./constants";

export const getPublicGists = (pageNumber: any, perPage: any) =>
  axios.get(
    constants.uri.getPublicGists
      .replace("{pageNumber}", pageNumber)
      .replace("{perPage}", perPage)
  );

export const searchPublicGists = (
  pageNumber: any,
  perPage: any,
  searchString: string
) =>
  axios.get(
    constants.uri.searchPublicGists
      .replace("{searchString}", encodeURIComponent(searchString))
      .replace("{pageNumber}", pageNumber)
      .replace("{perPage}", perPage)
  );

export const getGitToken = (code: string) =>
  axios.post(
    constants.uri.getGitToken,
    {
      client_id: constants.gitClientId,
      client_secret: constants.gitClientSecret,
      code,
    },
    { headers: { Accept: "application/json" } }
  );

export const getUserInfo = () =>
  axios.get(constants.uri.getUserInfo, {
    headers: { Authorization: `token ${localStorage.getItem("token")}` },
  });

export const createGist = (body: any) =>
  axios.post(
    constants.uri.createGist,
    { ...body, public: true },
    {
      headers: { Authorization: `token ${localStorage.getItem("token")}` },
    }
  );

export const getUserGists = (username: string) =>
  axios.get(constants.uri.getUserGists.replace("{username}", username));

export const getGist = (id: any) =>
  axios.get(constants.uri.getGist.replace("{id}", id));

export const deleteGist = (id: any) =>
  axios.delete(constants.uri.getGist.replace("{id}", id), {
    headers: { Authorization: `token ${localStorage.getItem("token")}` },
  });

export const forkGist = (id: string) =>
  axios.post(
    constants.uri.forkGist.replace("{id}", id),
    {},
    {
      headers: { Authorization: `token ${localStorage.getItem("token")}` },
    }
  );
