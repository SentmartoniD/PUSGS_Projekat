import emailjs from "@emailjs/browser"

export const SendEmail = async (msg) => (
    emailjs.send('service_jsr3vhk', 'template_u2q27tw', { user_name: 'Deni', user_email: 'denessentmartoni@gmail.com', message: msg }, 's8B1zFuerOqESsscI')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        })
)