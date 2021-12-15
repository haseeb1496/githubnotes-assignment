export const constants = {
  gitClientId: "b947cec4e832a2a391c4",
  redirectUri: "http://localhost:3000",
  gitClientSecret: "6eb6a6ad6e61b10380cd7b3f8289c7937d21ea6b",
  uri: {
    getPublicGists:
      "https://api.github.com/gists/public?page={pageNumber}&per_page={perPage}",
    gitLogin:
      "https://github.com/login/oauth/authorize?client_id={clientId}&login=haseeb1496&redirect_uri={redirectUri}",
    getGitToken:
      "https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token",
    getUserInfo: "https://api.github.com/user",
    createGist: "https://api.github.com/gists",
    getUserGists: "https://api.github.com/users/{username}/gists",
    forkGist: "https://api.github.com/gists/{id}/forks",
    getGist: "https://api.github.com/gists/{id}",
  },
};
