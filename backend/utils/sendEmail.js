const nodeMailer = require("nodemailer");
const OAuth2 = require('google-auth-library');

//ensure that the Gmail to be used doesnt have 2FA and if so go to the manage settings of your Gmail and add an app to get a password 
const sendEmail = async (options) => {

    const transporter = nodeMailer.createTransport({
        // host: process.env.SMPT_HOST,
        // port: process.env.SMPT_PORT,
        host: "smtp.mailtrap.io",
        port: 2525,
        // service: 'gmail',
        // type: "SMTP", 
        secure: false,
        auth: {
            
            // user: process.env.SMPT_MAIL,
            // pass: process.env.SMPT_PASSWORD,
            // user: "50c85c38319e60",
            // pass: "647b2efbbb5347"
            user: process.env.SMPT_MAIL1,
            pass: process.env.SMPT_PASSWORD1,
        },
        secureConnection: false,
    },  
    )
    //this options are in Under controller in the Get resetPassword Token in try and catch 

    const mailOptions = { 
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;



/*
const nodeMailer = require("nodemailer");
const OAuth2 = require('google-auth-library');

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({

        service: process.env.SMPT_SERVICE,
        auth: {
            type: 'OAuth2',
            user: "securesally@gmail.com",
            pass: "edzfubweacryufjc",
            clientId: "784062222551-2amrp6ca187skd0i3pvc708k6lkuoljq.apps.googleusercontent.com",
            clientSecret: "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",
            refreshToken: "1//04hGX6iw12dIbCgYIARAAGAQSNwF-L9Ir1FyeOvXSECjgHJR6vAASct66Gbs8REsmxK7ltehNJXfC1q7uplmG15lm-D8lu0bg_l4",
            accessToken: "ya29.A0AVA9y1vx63dipvUQnLfbbtxCiGGqjSFgQIglFY6tq6ooZuY4_9OlpI_TN7wD2jJo4cLE-xgJBwr3qGw2oxfSUAP0qOFOQn7gIVppuvT1WiePy2i9_x_YBG7IGZzj5W-GOQJfKHucS0mzCvn2U-u_4mckfpCmYUNnWUtBVEFTQVRBU0ZRRTY1ZHI4NmpMVm9iV3Awd2FBcTUyR0xmaFQxUQ0163",
        },
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
*/