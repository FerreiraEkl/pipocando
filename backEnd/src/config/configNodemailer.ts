import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'smtp.umbler.com',
    secure: false, // true for 465, false for other ports
    port: 587,
    auth: {
        user: "",
        pass: ""
    },
    tls: { rejectUnauthorized: false }
})

export default transporter;
