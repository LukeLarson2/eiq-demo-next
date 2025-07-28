declare function getAvalaraCredentials(sessionToken: {
    token: string;
}): Promise<{
    username: string;
    password: string;
    companyId: string;
    clientId: string;
    baseUrl: string;
}>;

export { getAvalaraCredentials };
