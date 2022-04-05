const contactsOperation = require('./contacts');
const yargs = require('yargs');
const { hideBin } = require("yargs/helpers");

const arr = hideBin(process.argv);

const { argv } = yargs(arr)

const invoteAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const contacts = await contactsOperation.listContacts();
            console.log(contacts);
            break;
        case "get":
            const contact = await contactsOperation.getContactById(id);
            if (!contact) {
                throw new Error(`Contact with id=${id} not found`)
            }
            console.log(contact);
            break;
        case "add":
            const newContact = await contactsOperation.addContact(name, email, phone);
            console.log(newContact);
            break;
        case "remove":
            const removeContact = await contactsOperation.removeContact(id);
            if (!removeContact) {
                throw new Error(`Contact with id=${id} not found`)
            }
            console.log(removeContact);
            break;
        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

// invoteAction({ action: "listContacts" })
// invoteAction({ action: "get", id: '3' })
// invoteAction({ action: "removeContact", id: '71f0036a-b4a2-4ce2-8fdb-9d325d6aa1ba' })
// invoteAction({ action: "addContact", name: 'Cyrus Jackson',
//     email: 'nibh@semsempererat.com',
//     phone: '(501) 472-5218' })

invoteAction(argv);