const fs = require('fs').promises;
const path = require('path');
const crypto=require('crypto');
const contactsPath = path.join(__dirname, './db/contacts.json');


    
    const listContacts = async () => {
      try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        return contacts;
      } catch (error) {
        throw error.message;
      }
    };
    
    const getContactById = async (id) => {
      try {
        const contacts = await listContacts();
        const contactId=String(id)
        const contactsById = contacts.filter(
          (contact) => contact.id === contactId
        );
        if (!contactsById) {
          throw new Error(`Contacts with id=${contactId} not found`);
        }
        return contactsById;
      } catch (error) {
        throw error;
      }
    };
    
    const removeContact = async (id) => {
      try {
        const contacts = await listContacts();
         const contactId=String(id);
        const requiredContactIdx = contacts.findIndex(
          (item) => item.id === contactId
        );
    
        if (requiredContactIdx === -1) {
          throw new Error(`Contacts with id=${contactId} not found`);
        }
    
        const renewedContacts = contacts.filter(
          (contact) => contact.id !== contactId
        );
    
        await fs.writeFile(contactsPath, JSON.stringify(renewedContacts));
    
        return contacts[requiredContactIdx];
      } catch (error) {
        throw error;
      }
    };
    
    const addContact = async (name, email, phone) => {
      try {
        const contacts = await listContacts();
        const newContact = {
          id: crypto.randomUUID(),
          name,
          email,
          phone,
        };
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        return newContact;
      } catch (error) {
        throw error;
      }
    };
    
 
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};