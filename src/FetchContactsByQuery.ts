import Client from '@wildix/xbees-connect';

const RESPONSE_DELAY = 500;

const fetchContacts = async (query: string): Promise<{id: string, name: string, email: string, phone: string}[]> => {
  const resultContactsList = [
    {id: 't0', name: `Test Mike1 (${query})`, email: 't0@smile.com', phone: '+123 313131221'},
    {id: 't1', name: `Test Jim (${query})`, email: 't1@smile.com', phone: '+123 213131123'}
  ];
  const request = new Promise<typeof resultContactsList>((resolve) => {
    setTimeout(() => resolve(resultContactsList), RESPONSE_DELAY);
  });
  const responseResult = await request
    // .then(validateResponse)
    .catch((error) => {
      console.log('catch', error);
    })

  return responseResult!;
};


const connect = Client.getInstance();
connect.onSuggestContacts(async (query, resolve) => {
  try {
    const contacts = await fetchContacts(query);
    resolve(contacts);
  } catch (error) {
    console.log('catch', error);
  }
});

