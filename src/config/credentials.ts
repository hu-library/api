const credentials = {
    type:                           process.env.G_CREDENTIAL_TYPE           || '',
    project_id:                     process.env.G_CREDENTIAL_PROJECT_ID     || '',
    private_key_id:                 process.env.G_CREDENTIAL_PRIVATE_KEY_ID || '',
    private_key:                    process.env.G_CREDENTIAL_PRIVATE_KEY    || '',
    client_email:                   process.env.G_CREDENTIAL_CLIENT_EMAIL   || '',
    client_id:                      process.env.G_CREDENTIAL_CLIENT_ID      || '',
    auth_uri:                       process.env.G_CREDENTIAL_AUTH_URI       || '',
    token_uri:                      process.env.G_CREDENTIAL_TOKEN_URI      || '',
    auth_provider_x509_cert_url:    process.env.G_CREDENTIAL_PROVIDER_URL   || '',
    client_x509_cert_url:           process.env.G_CREDENTIAL_CLIENT_URL     || ''
};
if (credentials.private_key) {
    credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
}

export default credentials;
