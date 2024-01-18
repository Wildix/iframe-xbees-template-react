export async function addContact() {
    const url = new URL(`${window.location.origin}/contacts`);

    const form: HTMLFormElement = document.getElementById('contactForm') as HTMLFormElement;
    const formData = new FormData(form!);

    // Make the Fetch API request
    const response = await fetch(url, {
        method: 'POST',
        body: formData,
    })

    if (!response) {
        console.error('response', response)

        return;
    }

    const data = await response.json();

    console.info('Success', data)

    return data;
}
