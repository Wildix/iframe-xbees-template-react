import ContactsRepository from './ContactsRepository';
import {Contact} from '@wildix/xbees-connect/dist-types/types';

// Function to simulate delay (replace this with an appropriate delay mechanism)
const delay = (timeout: number = 1000) => new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

async function searchHandler(resource: Request | string | URL) {
  await delay()
  const urlObject = new URL(resource.toString());

  const query = urlObject.searchParams.get('query') as string;
  const queryStrings = query.split(',');

  const contacts = queryStrings.reduce((results, queryString) => {
    results.push(...ContactsRepository.getInstance().find(queryString));

    return results;
  }, [] as Contact[]);


  // Returning a response with a delay
  return Promise.resolve(new Response(JSON.stringify({data: contacts}), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  }));
}

async function addContactHandler(options: RequestInit) {
  if (options.method && options.method.toUpperCase() === 'POST') {
    await delay(500);
    const contactFormData = new FormData();
    const {body} = options;

    if (body instanceof FormData) {
      body.forEach((value, key) => {
        contactFormData.append(key, value);
      });

      const contact = {
        name: contactFormData.get('name')?.toString(),
        email: contactFormData.get('email')?.toString(),
        phone: contactFormData.get('phone')?.toString(),
      };

      // @ts-expect-error contact
      const id = ContactsRepository.getInstance().addOrUpdate(contact);

      return Promise.resolve(new Response(JSON.stringify({ status: 'ok', id }), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      }));
    }
  }
}

export default function startFetchRequestsInterceptor() {
  const { fetch: originalFetch } = window;

  // @ts-expect-error window.fetch
  window.fetch = (resource, config) => {
    if (resource.toString().includes(`${window.location.origin}/contacts/search`)) {
      return searchHandler(resource);
    }

    if (resource.toString().includes(`${window.location.origin}/contacts`)) {
      return addContactHandler(config!);
    }

    return originalFetch(resource, config);
  };
}
