// const rp = require('request-promise');
const mustache = require('mustache');
const mjml = require('mjml');
const postmark = require('postmark');
const { conf } = require('../../../config/env');

const eventTypes = { EXPIRED: 'EXPIRED', LOST_OR_STOLEN: 'LOST_OR_STOLEN' };

const client = new postmark.ServerClient(conf.store.POSTMARK_API_KEY);

const send = content => {
  const eventType =
    content.reasonMessage === 'Expired card' ? eventTypes.EXPIRED : eventTypes.LOST_OR_STOLEN;
  const mjmlTemplates = {
    EXPIRED: `
  <mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-image width="700px" src="https://i.ibb.co/h193zdz/af-header.png"></mj-image>
        <mj-image width="100px" src="https://i.ibb.co/HxhmNd4/expired-icon-2x.png"></mj-image>
        <mj-text font-size="20px" color="#093148" font-family="arial">Hi {{customerFirstName}}</mj-text>
        <mj-text font-size="20px" color="#093148" font-family="arial">Your credit card on file has expired and your subscription is set up to renew in 2 months</mj-text>
        <mj-text font-size="20px" color="#093148" font-family="arial">To keep receiving the content you love from Agora Financial please update your credit card info.</mj-text>
        <mj-button background-color="#093148" font-size="15px" font-size="20px" href="#"> UPDATE CREDIT CARD</mj-button>
        <mj-divider border-color="#093148"></mj-divider>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`,
    LOST_OR_STOLEN: `
    <mjml>
    <mj-body>
      <mj-section>
        <mj-column>
          <mj-image width="700px" src="https://i.ibb.co/h193zdz/af-header.png"></mj-image>
          <mj-image width="100px" src="https://i.ibb.co/hW12xMB/offer-icon-2x.png"></mj-image>
          <mj-text font-size="20px" color="#093148" font-family="arial">Hi {{customerFirstName}}</mj-text>
          <mj-text font-size="20px" color="#093148" font-family="arial">Your credit card has been lost or stolen.</mj-text>
          <mj-text font-size="20px" color="#093148" font-family="arial">To keep receiving the content you love from Agora Financial please update your credit card info.</mj-text>
          <mj-button background-color="#093148" font-size="15px" font-size="20px" href="#"> UPDATE CREDIT CARD</mj-button>
          <mj-divider border-color="#093148"></mj-divider>
        </mj-column>
      </mj-section>
    </mj-body>
    </mjml>
`
  };

  const renderedMJML = mustache.render(mjmlTemplates[eventType], content);

  const { html } = mjml(renderedMJML);

  const titles = { EXPIRED: 'Card Expiration', LOST_OR_STOLEN: 'Card Lost or Stolen' };

  client.sendEmail({
    From: conf.store.MAILER_FROM_EMAIL,
    To: conf.store.MAILER_TO_EMAIL ? conf.store.MAILER_TO_EMAIL : content.customerEmail,
    Subject: titles[eventType],
    HtmlBody: html
  });
};

module.exports = {
  send
};
