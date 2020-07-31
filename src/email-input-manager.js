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
      emailBlock.dataset.indexNumber = emailsList.length;

      let spanEmail = document.createElement('span')
      spanEmail.innerHTML = email;
      if (!isEmailValid(email)) {
        spanEmail.className = 'container_input-area_email-block_error';
      }
      emailBlock.appendChild(spanEmail);

      let spanDelete = document.createElement('span')
      spanDelete.className = 'container_input-area_email-delete';

      spanDelete.addEventListener('click', function () {
        removeEmail(this.parentNode);
      });

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

    // count valid emails
    btnCountEmails.onclick = () => {
      alert('Valid emails count: ' + emailsList.filter(email => isEmailValid(email)).length);
    };

    inputEmail.addEventListener('blur', (event) => {
      const inputVal = event.target.value;
      handleEmailInput(inputVal);
      event.target.value = '';
    });

    inputEmail.addEventListener('keydown', (event) => {
      if (event.keyCode === 13 || event.keyCode === 188) {
        const inputVal = event.target.value;
        handleEmailInput(inputVal);
        event.target.value = '';
      }
    });

    const handleEmailInput = (value) => {
      const emails = value.split(',')
      for (let i = 0; i < emails.length; i++) {
        if (emails[i].length > 0) {
          emailsContainer.insertBefore(createEmailBlock(emails[i]), inputEmail);
          emailsList.push(emails[i]);
        }
      }
    }

    const removeEmail = (emailBlock) => {
      const blockIndex = emailBlock.dataset.indexNumber;
      emailsList.splice(blockIndex, 1);
      emailsContainer.removeChild(emailBlock);
    }

    const isEmailValid = (email) => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

  }
};

module.exports = EmailInputManager;
