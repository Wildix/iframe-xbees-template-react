import Client from '@wildix/xbees-connect';
import {Contact} from '@wildix/xbees-connect/dist-types/types';
import {initialContacts} from './initialContacts';

export default class ContactsRepository {
    private static instance: unknown = null;

    static getInstance(): ContactsRepository {
        if (!this.instance) {
            this.instance = new ContactsRepository();
        }

        return this.instance as ContactsRepository;
    }

    public refreshFromStorage() {
        try {
            const contactsStore = Client.getInstance().getFromStorage<Contact[]>('contacts');

            this.contacts.length = 0

            if (contactsStore && contactsStore.length > 0) {
                this.contacts.push(...contactsStore)
            } else {
                this.contacts.push(...initialContacts())
            }
        } catch (someError) {
            console.error(someError)
        }
    }

    public persistToStorage() {
        try {
            Client.getInstance().saveToStorage('contacts', JSON.stringify(this.contacts));
        } catch (error) {
            console.error(error)
        }
    }

    private contacts: Contact[] = [];

    public addOrUpdate(contact: Contact) {
        const find = this.contacts.find((savedContact) => savedContact.email === contact.email);

        let id = `id${new Date().getTime()}`;

        if (!find) {
          this.contacts.push({...contact, id});
        } else {
            id = find.id;
            find.phone = contact.phone;
            find.name = contact.name;
        }

        this.persistToStorage();

        return id;
    }

    public find(query: string) {
        return this.contacts.filter(
            (contact) =>
                contact.name.toLowerCase().includes(query.toLowerCase()) ||
                (contact.email && contact.email.toLowerCase().includes(query.toLowerCase())) ||
                (contact.phone && contact.phone.toLowerCase().includes(query.toLowerCase()))
        )
    }
}
