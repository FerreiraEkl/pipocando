import { IUser } from '../schemas/interfaces/IUser';
import mercadoPagoConfig from './../config/configMercadoPago';
import { Request, Response } from "express";
import Payment from '../schemas/tableSchemas/paymentSchema';
import mercadopago from 'mercadopago'

import { CreatePreApprovalPayload } from 'mercadopago/models/preapproval/create-payload.model';

var oldAccessToken = mercadopago.configurations.getAccessToken();

class PaymentController {

    constructor() {
        mercadopago.configure({
            client_id: mercadoPagoConfig.client_id,
            client_secret: mercadoPagoConfig.client_secret
        });
    }

    public async makeSignature(req: Request, res: Response) {

        const user = <IUser>JSON.parse(JSON.stringify(req.user));

        var data = new Date(),
            dia = data.getDate().toString(),
            mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            hora = data.getHours().toString(),
            min = data.getMinutes().toString(),
            seg = data.getSeconds().toString(),

            diaF = (dia.length == 1) ? '0' + dia : dia,
            mesF = (mes.length == 1) ? '0' + mes : mes,
            anoF = data.getFullYear(),
            horaF = (hora.length == 1) ? '0' + hora : hora,
            minF = (min.length == 1) ? '0' + min : min,
            segF = (seg.length == 1) ? '0' + seg : seg,
            miliF = data.getMilliseconds();

        var startDate = `${anoF}-${mesF}-${diaF}T${horaF}:${minF}:${segF}.${miliF}-04:00`

        console.log('start date', startDate);

        '2021-01-03T12:22:1.791-04:00'
        console.log('patern', '2020-11-29T14:35:47.699-04:00')

        var preapprovalPayment: CreatePreApprovalPayload;
        preapprovalPayment = {
            payer_email: user.userMail,
            back_url: 'https://pipocando.app/payment/processing',
            reason: 'Assinatura mensal pipocando',
            external_reference: 'pipocando.app',
            auto_recurring: {
                frequency: 1,
                frequency_type: 'months',
                transaction_amount: 10,
                currency_id: 'BRL',
                start_date: `${anoF}-${mesF}-${diaF}T${horaF}:${minF}:${segF}.${miliF}-04:00`,//YYYY-MM-DDTHH:mm:ss.SSS-Z                
            }
        }

        mercadopago.preapproval.create(preapprovalPayment).then(function (data: any) {
            Payment.create({
                userId: user.id,
                paymentStatus: data.body.status,
                payerId: data.body.payer_id,
                transactionId: data.body.id
            }).then(() => {
                console.log(data);
                return res.status(200).json({ success: true, message: data.body.init_point });
            }).catch(function (err: any) {
                console.log(err);
                return res.status(400).json({ success: false, message: err });
            });
        }).catch(function (err: any) {
            console.log(err);
            return res.status(400).json({ success: false, message: err });
        });
    }

    public async checkSignatures(req: Request, res: Response) {
        const user = <IUser>JSON.parse(JSON.stringify(req.user));

        mercadopago.payment.search({
            qs: {
                payerId: 227295991
                // begin_date: mercadopago.utils.date.now().subtract(60).toString(),
                // end_date: mercadopago.utils.date.now().toString()
            }
        }).then(function (data: any) {
            console.log(data);
            for (const payment of data.body.results) {
                console.log(payment.status);
            }
            return res.status(200).json({ success: true, message: data });

        }).catch(function (err: any) {
            console.log(err);
            return res.status(400).json({ success: false, message: err });
        });
    }
    /*
       public async makePayment() {
           var payment = {
               description: 'Buying a PS4',
               transaction_amount: 10500,
               payment_method_id: 'rapipago',
               payer: {
                   email: 'test_user_3931694@testuser.com',
                   identification: {
                       type: 'DNI',
                       number: '34123123'
                   }
               }
           };
   
           // Set the access_token credentials for testing
           mercadopago.configurations.setAccessToken(mercadoPagoConfig.access_token);
   
           mercadopago.payment.create(payment).then(function (data: any) {
               console.log(data);
   
           }).catch(function (err: any) {
               console.log(err);
   
           }).finally(function () {
               mercadopago.configurations.setAccessToken(oldAccessToken);
           });
       }
   
       public async cancelPayment(req: Request, res: Response) {
           mercadopago.configurations.setAccessToken(mercadoPagoConfig.access_token);
   
           mercadopago.payment.cancel(parseInt(req.params.id, 10)).then(function (data: any) {
   
               console.log(data);
   
           }).catch(function (err: any) {
   
               console.log(err);
   
           }).finally(function () {
               mercadopago.configurations.setAccessToken(oldAccessToken);
           });
       }
   
       public async makeDevolution(req: Request, res: Response) {
           mercadopago.configurations.setAccessToken(mercadoPagoConfig.access_token);
   
           mercadopago.payment.refund(parseInt(req.params.id, 10)).then(function (data: any) {
               console.log(data);
   
           }).catch(function (err: any) {
               console.log(err);
   
           }).finally(function () {
               mercadopago.configurations.setAccessToken(oldAccessToken);
           });
       }*/
}

export default new PaymentController()