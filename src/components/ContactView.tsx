import {useEffect, useState} from "react";
import Loader from "./Loader";

type ContactQuery = { email?: string, phone?: string | number };

interface ContactViewProps {
  query: ContactQuery
}

export function ContactView({query}: ContactViewProps) {
  const [contact, setContact] = useState<any>(null);

  useEffect(() => {
    async function fetchContactData(data: ContactQuery) {
      console.log("fetchContactData", {data});
      return {
        name: "Test User",
        ...data,
      }
    }

    async function getContextData() {
      const contact = await fetchContactData(query);
      setContact(contact);
    }

    void getContextData();
  }, []);

  return <div className="card">
    <h4>Data to show inside x-bees:</h4>
      {contact ? <div>
        <h4>Name: <strong>{contact.name}</strong></h4>
        <h4>email: <strong>{contact.email}</strong></h4>
        <h4>phone: <strong>{contact.phone}</strong></h4>
      </div> : <Loader />}
      <p>
        Edit <code>src/components/ContactView.tsx</code> and save to test
      </p>
    </div>;
}
