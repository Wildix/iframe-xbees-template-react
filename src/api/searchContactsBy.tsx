import {Contact, ContactQuery} from '@wildix/xbees-connect/dist-types/types';

export async function searchContactsBy(query: ContactQuery | string) {
    const uri = `${window.location.origin}/contacts/search`;
    const url = new URL(uri);

    if (typeof query === 'string') {
        url.searchParams.set('query', query);
    } else {
        const filters = [query.email, query.phone].filter((queryValue) => !!queryValue)
        url.searchParams.set('query', filters.join(','));
    }

    const responseResult = await fetch(url);

    if (!responseResult.ok) {
        return null;
    }

    const result = await (responseResult.json() as Promise<{ data: Contact[] }>);

    return result.data
}

