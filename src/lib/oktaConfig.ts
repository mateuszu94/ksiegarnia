export const oktaConfig = {
  clientId: "0oad0dhr9plHx4XpS5d7",
  issuer: "https://dev-19223419.okta.com/oauth2/default",
  redirectUri: "http://localhost:3000/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true,
};
