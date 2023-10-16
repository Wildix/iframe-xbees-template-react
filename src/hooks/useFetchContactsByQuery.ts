import {useCallback, useEffect} from "react";
import xBeesConnect from "../helpers/xBeesConnect.ts";
import {useUserContext} from "../contexts/UserContext.tsx";

const RESPONSE_DELAY = 500;

export default function useFetchContactsByQuery() {
  const [user] = useUserContext();
  const getContactsResponse = useCallback( async (query: string) => {
    const connect = xBeesConnect();
    if (!user) {
      return void connect?.isNotAuthorized?.();
    }
    const fetchContacts = async (query: string): Promise<{id: string, name: string, email: string, phone: string}[]> => {
      const resultContactsList = [
        {id: "t0", name: `Test Mike1 (${query})`, email: "t0@smile.com", phone: "+123 313131221"},
        {id: "t1", name: `Test Jim (${query})`, email: "t1@smile.com", phone: "+123 213131123"}
      ];
      const request = new Promise<typeof resultContactsList>((resolve) => {
        setTimeout(() => resolve(resultContactsList), RESPONSE_DELAY);
      });
      const responseResult = await request
          // .then(validateResponse)
          .catch((e) => {
            console.log('catch', e);
          })
      return responseResult!;
    };

    try {
      const filteredContacts = await fetchContacts(query);

      const preparedResponse = connect.getSearchResponseCreator().prepareResponse(
        filteredContacts.map((record: any) => connect.SearchResultItemBuilder()
              .id(record.id)
              .name(record.name)
              .email(record.email)
              .phone(record.phone)
              // .homeNumber(record.home)
              // .mobileNumber(record.mobile)
              // .officeNumber(record.office)
              // .homeMobileNumber(record.home_mobile)
              // .faxNumber(record.fax)
              // .organization(record.organization)
              .create()),
          query
      );

      await preparedResponse.send();
    } catch (e) {
      console.error(e)
    }
  }, [user]);

  useEffect(() => {
    const connect = xBeesConnect();
    connect.addEventListener("xBeesGetContactsAutoSuggest", getContactsResponse);

    return () => {
      connect.removeEventListener("xBeesGetContactsAutoSuggest", getContactsResponse);
    }
  }, [getContactsResponse])

}
