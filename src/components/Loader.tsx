import {CircularProgress, Stack} from '@mui/material';

export default function Loader() {
  return <Stack sx={{width: '100%'}} alignItems="center"><CircularProgress /></Stack>;
}
