const { send, json } = require('micro')
const cors = require('micro-cors')()
const Mailchimp = require('mailchimp-api-v3')

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID

function addToList(emailAddress) {
  const mailchimp = new Mailchimp(MAILCHIMP_API_KEY)
  return mailchimp.request({
    method: 'post',
    path: '/lists/' + MAILCHIMP_LIST_ID + '/members',
    body: {
      email_address: emailAddress,
      status: 'subscribed',
    },
  })
}

const call = async (req, res) => {
  const body = await json(req)
  try {
    await addToList(body.email)
    send(res, 200)
  } catch (error) {
    // send(res, 400)
    res.statusCode = 400
    res.json({ error })
  }
}

module.exports = cors(call)
