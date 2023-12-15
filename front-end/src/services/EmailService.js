import emailjs from "@emailjs/browser"

export const SendEmail = async (msg) => (
    emailjs.send(`${process.env.REACT_APP_SERVICE_ID}`, `${process.env.REACT_APP_TEMPLATE_ID}`, { user_name: 'Deni', user_email: 'denessentmartoni@gmail.com', message: msg }, `${process.env.REACT_APP_EMAILJS_PUBLICKEY}`)
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        })
)