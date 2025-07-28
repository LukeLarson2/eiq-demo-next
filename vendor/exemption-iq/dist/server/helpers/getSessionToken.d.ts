declare function getSessionToken({ username, password, }: {
    username: string;
    password: string;
}): Promise<any>;

export { getSessionToken };
