import transporter from "../config/configNodemailer";
import User from "../schemas/tableSchemas/userSchema";

class emailService {
    notifyRegister(user: User, hash: string) {
        const subject = "Confirmação de cadastro";

        const texts = [
            'Seja bem vindo ao seu novo canal de streaming',
            'Agora você está a um passo de ter os lançamentos do cinema na sua casa',
            'Para finalizar seu cadastro clique no link abaixo!'
        ];

        const email = {
            from: 'accounts@pipocando.app',
            to: user.userMail,
            subject: subject,
            html: this.htmlBody(texts, user.userFirstName, `https://pipocando.app/confirmMail/${hash}`, 'Confirmar email')
        }

        transporter.sendMail(email, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
            }
        });
    }

    recoverMail(user: User, hash: string) {
        const subject = "Alteração de senha";

        const texts = [
            'Foi solicitado alteração de sua senha',
            'Caso não foi você que solicitou alteração ignore este email',
            'Para alterar sua senha clique no link abaixo!'
        ];

        const email = {
            from: 'accounts@pipocando.app',
            to: user.userMail,
            subject: subject,
            html: this.htmlBody(texts, user.userFirstName, `https://pipocando.app/recover/${hash}`, 'Recuperar senha')
        }

        transporter.sendMail(email, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
            }
        });
    }

    htmlBody(texts: Array<string>, user: string, link?: string, linkLabel?: string) {
        var html = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
        html += '<html xmlns="http://www.w3.org/1999/xhtml">';
        html += '<head>';
        html += '   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">';
        html += '   <title>WEG - Budget  </title > ';
        html += '   <meta name="viewport" content="width=device-width">';
        html += '   <!-- Favicon icon -->';
        html += '   <style type="text/css">';
        html += '       @media only screen and(min - device - width: 601px) {';
        html += '           .content {';
        html += '               width: 600px!important;';
        html += '           }';
        html += '           .col387 {';
        html += '               width: 387px!important;';
        html += '           }';
        html += '       }';
        html += '       body {';
        html += '           background-color: rgba(0, 0, 0, 0.8);';
        html += '           background-image: url(https://pipocando.app/assets/images/bg.jpg);';
        html += '           background-repeat: no-repeat;';
        html += '           background-size: cover;';
        html += '           background-blend-mode: color-burn;;';
        html += '       }';
        html += '   </style>';
        html += '</head>';
        html += '<body style="margin: 0; padding: 0;" yahoo="fix">';
        html += '<!--[if (gte mso 9)|(IE)]>';
        html += '   <table width="600" align="center" cellpadding="0" cellspacing="0" border="0">';
        html += '       <tr>';
        html += '           <td>';
        html += '<![endif]-->';
        html += '   <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 600px; margin-top: 25px;" class="content">';
        html += '       <tr>';
        html += '           <td align="center" bgcolor="#00000" style="padding: 20px 20px 20px 20px; color: #ffffff; font-family: Arial, sans-serif; font-size: 36px; font-weight: bold;">';
        html += '               <img src="https://pipocando.app/assets/images/favicon.ico" alt="ProUI Logo" width="152" height="152" style="display:block;">';
        html += '           </td>';
        html += '       </tr>';
        html += '       <tr>';
        html += '           <td align="center" bgcolor="#00000" style="padding: 20px 20px 20px 20px; color: #ffffff; font-family: Arial, sans-serif; font-size: 36px; font-weight: bold;">';
        html += '              Bem vindo ao pipocando.app!';
        html += '           </td>';
        html += '       </tr>';
        html += '       <tr>';
        html += '           <td bgcolor="#ffffff" style="padding: 20px 20px 0 20px; border-bottom: 1px solid #f6f6f6;">';
        html += '               <table width="100%" align="left" border="0" cellpadding="0" cellspacing="0">';
        html += '                   <tr>';
        html += '                       <td style="padding: 0 0 20px 0; color: #555555; font-family: Arial, sans-serif; font-size: 15px; line-height: 24px;">';
        html += '                           Caro(a) ' + user + ',';
        html += '                       </td>';
        html += '                   </tr>';

        for (const text of texts) {
            html += '                   <tr>';
            html += '                       <td style="padding: 0 0 20px 0; color: #555555; font-family: Arial, sans-serif; font-size: 15px; line-height: 24px;">';
            html += text;
            html += '                       </td>';
            html += '                   </tr>';
        }

        html += '               </table>';
        html += '           </td>';
        html += '       </tr>';

        if (link && linkLabel) {
            html += '       <tr>';
            html += '           <td align="center" bgcolor="#f9f9f9" style="padding: 30px 20px 30px 20px; font-family: Arial, sans-serif;">';
            html += '               <table bgcolor="#003478" border="0" cellspacing="0" cellpadding="0" class="buttonwrapper">';
            html += '                   <tr>';
            html += '                       <td align="center" height="50" style=" padding: 0 25px 0 25px; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold;" class="button">';
            html += '                           <a href="' + link + '" style="color: #ffffff; text-align: center; text-decoration: none;">' + linkLabel + '</a>';
            html += '                       </td>';
            html += '                   </tr>';
            html += '               </table>';
            html += '           </td>';
            html += '       </tr>';
        }

        html += '       <tr>';
        html += '           <td style="padding: 15px 10px 15px 10px;">';
        html += '               <table border="0" cellpadding="0" cellspacing="0" width="100%">';
        html += '                   <tr>';
        html += '                       <td align="center" width="100%" style="color: #fff; font-family: Arial, sans-serif; font-size: 12px;">';
        html += '                               2020-21 &copy; <a href="https://pipocando.app" style="color: #0073AA;">pipocando.app</a>';
        html += '                       </td>';
        html += '                   </tr>';
        html += '               </table>';
        html += '           </td>';
        html += '       </tr>';
        html += '   </table>';
        html += '<!--[if (gte mso 9)|(IE)]>';
        html += '           </td>';
        html += '       </tr>';
        html += '   </table>';
        html += '<![endif]-->';
        html += '</body>';
        html += '</html>';

        return html;
    }
}

export default new emailService();