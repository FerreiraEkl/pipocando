
class mercadoPagoConfig {
    public client_id: string = process.env.MP_CLIENT_ID || '';
    public client_secret: string = process.env.MP_CLIENT_SECRET || '';
    public access_token: string = process.env.MP_ACCESS_TOKEN || '';
    //public port: number = 8080;

}
export default new mercadoPagoConfig();

