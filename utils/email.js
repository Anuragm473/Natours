const nodemailer = require('nodemailer');
const pug=require('pug');
const htmlToText=require('html-to-text')
module.exports=class Email{
  constructor(user,url){
    this.to=user.name 
    this.firstName=user.name.split(' ')[0]
    this.url=url
    this.from=`Anurag Mishra <anurag47mishra@gmail.com>`
  }
  
  newTransport(){
      return nodemailer.createTransport({
        service:'sendGrid',auth:{
          user:process.env.EMAIL_USERNAME,
          pass:process.env.EMAIL_PASSWORD
        }
      })
  }

  async send(template,subject){
    const html=pug.renderFile(`${__dirname}/../views/email/${template}.pug`,{
      firstName:this.firstName,
      url:this.url,
      subject
    })

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
      // html:
    };
     
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome(){
    await this.send('welcome','Welcome to the natours Family')
  }
}



