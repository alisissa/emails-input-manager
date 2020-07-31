require('../src/styles.scss');

"use strict";

function EmailInputManager(container, options) {
  // check if element exists
  if (document.getElementById(container)) {
    // check if options exist 
    let title = 'Board name';
    if (options) {
      title = options.title ? options.title : title;
    }

    // emailsList to count emails and check their validity
    let emailsList = [];

    // create container
    const containerDiv = document.createElement('div');
    containerDiv.className = 'container';

    // create input area
    const inputAreaDiv = document.createElement('div');
    inputAreaDiv.className = 'container_input-area';

    // create title section
    const titleDiv = document.createElement('div');
    titleDiv.className = 'container_input-area_title';
    titleDiv.innerHTML = `Share <strong>` + title + `</strong> with others`;

    // create emails block
    const emailsBlock = document.createElement('div');
    emailsBlock.className = 'container_input-area_content';
    // create input 
    const inputEmail = document.createElement('input');
    inputEmail.setAttribute('type', 'text');
    inputEmail.placeholder = 'add more people…';

    // add inputEmail event listeners
    inputEmail.addEventListener('blur', () => {
      const inputVal = inputEmail.value;
      handleEmailInput(inputVal);
    });

    inputEmail.addEventListener('keyup', (event) => {
      if (event.keyCode === 13 || event.keyCode === 188) {
        const inputVal = inputEmail.value;
        handleEmailInput(inputVal);
      }
    });

    // handle paste emails to inout
    // inputEmail.addEventListener('input', () => {
    //   const inputVal = inputEmail.value;
    //   handleEmailInput(inputVal);
    //   inputEmail.value = '';
    // });

    inputEmail.onpaste = (event) => {
      let clipboardData = '';
      if (typeof event.clipboardData === 'undefined') {
        clipboardData = window.clipboardData.getData('Text');
      } else {
        clipboardData = event.clipboardData.getData('text/plain');
      }
      setTimeout(() => {
        handleEmailInput(clipboardData);
      }, 0)
    }

    const handleEmailInput = (value) => {
      const emails = value.split(',')
      for (let i = 0; i < emails.length; i++) {
        if (emails[i].length > 0) {
          const uniqueId = new Date().getTime();
          emailsBlock.insertBefore(createEmailBlock(emails[i], uniqueId), inputEmail);
          emailsList.push({ id: uniqueId, email: emails[i] });
        }
      }
      inputEmail.value = '';
    }

    // append the input to the emailBlock section
    emailsBlock.appendChild(inputEmail);

    // append elements to inputAreaDiv
    inputAreaDiv.appendChild(titleDiv);
    inputAreaDiv.appendChild(emailsBlock);


    // create actions area
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'container_actions';

    // create add email button
    let btnAddEmail = document.createElement("button");
    btnAddEmail.innerHTML = "Add email";
    actionsDiv.appendChild(btnAddEmail)
    btnAddEmail.onclick = () => {
      const randomEmail = generateRandomEmail();
      const uniqueId = new Date().getTime();
      emailsBlock.insertBefore(createEmailBlock(randomEmail, uniqueId), inputEmail);
      emailsList.push({ id: uniqueId, email: randomEmail });
    };

    // create valid emails count button
    let btnCountValidEmails = document.createElement("button");
    btnCountValidEmails.innerHTML = "Get emails count";
    actionsDiv.appendChild(btnCountValidEmails);
    btnCountValidEmails.onclick = () => {
      alert('Valid emails count: ' + emailsList.filter(item => isEmailValid(item.email)).length);
    };

    // append areas to container
    containerDiv.appendChild(inputAreaDiv);
    containerDiv.appendChild(actionsDiv);

    // add input area and actions to container
    document.getElementById(container).appendChild(containerDiv);

    const createEmailBlock = (email, uniqueId) => {
      let emailBlock = document.createElement('div');
      emailBlock.className = 'container_input-area_email-block'
      emailBlock.dataset.uniqueId = uniqueId;

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

    // generate random email
    const generateRandomEmail = () => {
      const domains = [
        '@gmail.com',
        '@miro.com',
        '@live.com'
      ];
      const randomDomain = domains[Math.floor(Math.random() * (3))];
      return Math.random().toString(36).substring(7) + randomDomain;
    };

    // remove email from emailsBlock and emailList by index
    const removeEmail = (emailBlock) => {
      const uniqueId = emailBlock.dataset.uniqueId;
      emailsList = emailsList.filter(item => item.id !== parseInt(uniqueId));
      emailsBlock.removeChild(emailBlock);
    }

    const isEmailValid = (email) => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

  }
};

module.exports = EmailInputManager;
