import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const publicPath = express.static(path.join(__dirname, '../'));
const indexPath = path.join(__dirname, '../index.html');

const app = express();
app.use(bodyParser.json());
app.use(publicPath);

app.get('*', (req, res) => {
  res.sendFile(indexPath);
});

app.post('/contact',function(req,res){
  const msg = {
    to: 'ben.riegel@gmail.com',
    from: `${req.body.name} <${req.body.email}>`,
    subject: req.body.subject || " ",
    text: req.body.message,
  };
  sgMail.send(msg, function(error, info){
    if (error){
      res.status(500).send({ error: 'something blew up' });
    } else {
      res.status(200).send({ message: 'message sent' });
    }
  });
});

export default app;
