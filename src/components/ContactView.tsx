import {useEffect, useState} from "react";
import Loader from "./Loader";
import DetailsProperty from "./DetailsProperty.tsx";
import {Box, Divider, IconButton, Stack, Typography} from "@mui/material";
import xBeesConnect from "../helpers/xBeesConnect.ts";
import LogoutIcon from "../assets/icons/LogoutIcon.tsx";
import {useUserContext} from "../contexts/UserContext.tsx";

type ContactQuery = { contactEmail?: string, contactPhone?: string | number };

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
        email: data.contactEmail,
        phone: data.contactPhone,
      }
    }

    async function getContextData() {
      const contact = await fetchContactData(query);
      setContact(contact);
    }

    void getContextData();
  }, []);

  async function startCall(phoneNumber: string): Promise<void> {
    return await xBeesConnect().startCall(phoneNumber);
  }

  const [, setUser] = useUserContext();
  const onLogoutClick = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return <Stack>
    <Box sx={{position: "absolute", top: 10, right: 10}}><IconButton onClick={onLogoutClick}><LogoutIcon color="black"/></IconButton></Box>
      {contact ? <>
        <DetailsProperty title="Name" value={contact.name}/>
        {contact.email && <DetailsProperty title="email" value={contact.email} variant="email" />}
        {contact.phone && <DetailsProperty title="phone" value={contact.phone} variant="phone" onClick={() => startCall(contact.phone)} />}
      </> : <Loader />}
      <br/>
      <Divider />
      <br/>
      <Typography variant="caption">
        Edit <code>src/components/ContactView.tsx</code> and save to test
      </Typography>
    </Stack>;
}
