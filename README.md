# **Emails Input Manager**

## Demo

https://emails-input-manager.s3.amazonaws.com/index.html

## Getting Started

Add resources:
```
<link rel="stylesheet" href="./dist/email-input-manager.min.css">
<script src="./dist/email-input-manager.js"></script>
```

Create div element with id:
```
<div id="emails-container-1"></div>
```

Configure EmailInputManager:
```
EmailInputManager('emails-container-1', {
  title: 'My Board Name'
});
```

Features:
- Email block can be created by pressing Enter, comma or by losing focus on the
input field.
- A Block can be deleted by pressing X
- Email input width is dependant on the container
- When emails area exceeds input height, the emails area becomes scrollable
- Pasted email(s) are be converted into email blocks immediately. 
- "Add email" button adds a random email to the list.
- "Get emails count" button shows an alert with valid emails count.
- You can create several EmailInputManagers on the same page.
- Title can be set through options
