import fs from 'fs/promises';
import { nanoid } from 'nanoid';

const contactsPath = "./db/contacts.json"

const readContacts = async (pathFile) => { 
  const data = await fs.readFile(pathFile);
  return JSON.parse(data);
};

const writeContacts = async (newContacts, pathFile) => { 
  const data = JSON.stringify(newContacts);
  await fs.writeFile(pathFile, data, 'utf8');
};

export const listContacts = async () => {
try {
  return await readContacts(contactsPath);
  } catch (error) {
    console.error("Error fetching contacts: ", error);
    throw error;
  }

};

export const getContactById = async (contactId) => {
  try {
    const contacts = await readContacts(contactsPath);
    return contacts.find((contact) => contact.id === contactId) || null;

  } catch (error) {
    console.error("Error fetching contacts: ", error);
    throw error;
  }
}

export const removeContact = async (contactId) => {
  try {
    let contacts = await readContacts(contactsPath);
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index !== -1) {
    contacts.splice(index, 1);
    }
    await writeContacts(contacts, contactsPath);
    return contacts;
  } catch (error) {
    console.error("Error fetching contacts: ", error);
    throw error;
  }
}

export const addContact = async (name, email, phone) => {
  try {
    let contacts = await readContacts(contactsPath);
    const newContact = {
      "id": nanoid(),
      name,
      email,
      phone,
    }
    contacts.push(newContact);
    await writeContacts(contacts, contactsPath);
    return contacts;
  } catch (error) {
    console.error("Error fetching contacts: ", error);
    throw error;
  }
}


