const contact = require('./contacts');
const { program } = require('commander');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contactList = await contact.listContacts();
      return console.table(contactList);
      break;

    case 'get':
      const singleContact = await contact.getContactById(id);
      return console.table(singleContact);
      break;

    case 'add':
      const newContact = await contact.addContact({ name, email, phone });
      return console.table(newContact);
      // ... name email phone
      break;

    case 'remove':
      const deleteContact = await contact.removeContact(id);
      return console.table(deleteContact);
      // ... id
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

// invokeAction(argv);
