require('../src/styles.scss');

"use strict";

const EmailInputManager = (container, options) => {
  // check if element exists
  if (document.getElementById(container)) {
    // check if options exist 
    let title = 'Board name';
    if (options) {
      title = options.title ? options.title : title;
    }
    // generate the main container html
    document.getElementById(container).innerHTML = `<div class="container">
    <div class="container_input-area">
      <div class="container_input-area_title">Share <strong>` + title + `</strong> with others</div>
      <div id="emailsContainer" class="container_input-area_content">
        <input id="inputEmail" type="text" placeholder="add more people…" />
      </div>
    </div>
    <div class="container_actions">
      <button id="btnAddEmail">Add email</button>
      <button id="btnCountEmails">Get emails count</button>
    </div>
  </div>`;

    // get main controls
    const emailsContainer = document.getElementById('emailsContainer');
    const inputEmail = document.getElementById('inputEmail');
    const btnAddEmail = document.getElementById('btnAddEmail');
    const btnCountEmails = document.getElementById('btnCountEmails');

    let emailsList = [];

    const createEmailBlock = email => {
      let emailBlock = document.createElement('div');
      emailBlock.className = 'container_input-area_email-block'

      let spanEmail = document.createElement('span')
      spanEmail.innerHTML = email;
      emailBlock.appendChild(spanEmail);

      let spanDelete = document.createElement('span')
      spanDelete.className = 'container_input-area_email-delete';
      emailBlock.appendChild(spanDelete);

      return emailBlock;
    };

    // add random email
    btnAddEmail.onclick = () => {
      const randomEmail = generateRandomEmail();
      emailsContainer.insertBefore(createEmailBlock(randomEmail), inputEmail);
      emailsList.push(randomEmail);
    };

    // generate random email
    function generateRandomEmail() {
      const domains = [
        '@gmail.com',
        '@miro.com',
        '@live.com'
      ];
      const randomDomain = domains[Math.floor(Math.random() * (3))];
      return Math.random().toString(36).substring(7) + randomDomain;
    };

    // 
    btnCountEmails.onclick = () => {
      alert('Valid emails count: ' + emailsList.length);
    };
  }
};

module.exports = EmailInputManager;
