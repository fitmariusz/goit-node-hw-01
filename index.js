import { Command}  from 'commander'
import { listContacts, getContactById, removeContact, addContact} from './contacts.js'

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name between \"\"")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();


const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      try {
        const contacts = await listContacts();
        console.table(contacts);
      } catch (error) {
        console.error("Error listing contacts: ", error);
      }   
      break;

    case "get":
      try {
        const contact = await getContactById(id);
        console.table(contact);
      } catch (error) {
        console.error("Error getting contact: ", error);
      }
      break;

    case "add":
      try {
        const contact = await addContact(name, email, phone);
        console.table(contact);
      } catch (error) {
        console.error("Error adding contact: ", error);
      }
      break;

    case "remove":
      try {
        const contact = await removeContact(id);
        console.table(contact);
      } catch (error) {
        console.error("Error removing contacts: ", error);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);












// program.option(
//   "-f, --file [string]", "file for save","results.txt"
// )

// const flags = program.parse(process.args).opts();
// // // listContacts()

// console.log(flags);

// try {
//         const allContacts = await listContacts();
//         console.table(allContacts);
//       } catch (error) {
//         console.error("Error listing contacts: ", error);
// }
      




// try {
//         const contact = await getContactById('05olLMgyVQdWRwgKfg5J6');
//         console.table(contact);
//       } catch (error) {
//         console.error("Error listing contacts: ", error);
// }


// try {
//         const contact = await removeContact('05olLMgyVQdWRwgKfg5J6');
//         console.table(contact);
//       } catch (error) {
//         console.error("Error listing contacts: ", error);
// }


// try {
//   const contact = await addContact('Antoni Sława', 'aslawa@gmail.com', '222-555-555');
//         console.table(contact);
//       } catch (error) {
//         console.error("Error listing contacts: ", error);
// }
