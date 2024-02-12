import {Button, Stack, TextField, Typography} from '@mui/material';
import Client from '@wildix/xbees-connect';
import Link from '@mui/material/Link';
import {Link as RouterLink} from 'react-router-dom';

export function InputsView() {
  return (
    <Stack direction="column" spacing={0.5}>
      <Typography variant="subtitle1">Input elements:</Typography>
      <TextField
        required
        fullWidth
        size="small"
        name="name"
        label="Name"
        variant="outlined"
        placeholder="Name placeholder"
      />
      <Link color="primary" to="/" component={RouterLink}>go back</Link>
    </Stack>
  )
}
