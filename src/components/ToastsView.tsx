import {Button, Stack, Typography} from '@mui/material';
import Client from '@wildix/xbees-connect';
import Link from '@mui/material/Link';
import {Link as RouterLink} from 'react-router-dom';

export function ToastsView() {
  return (
    <Stack direction="column" spacing={0.5}>
      <Typography variant="subtitle1">Show Toast:</Typography>
      <Button variant="outlined" color="info" onClick={() => Client.getInstance().showToast('The template integration shows test INFO', 'INFO')}>info</Button>
      <Button variant="outlined" color="secondary" onClick={() => Client.getInstance().showToast('The template integration shows test NOTICE', 'NOTICE')}>notice</Button>
      <Button variant="outlined" color="warning" onClick={() => Client.getInstance().showToast('The template integration shows test WARNING', 'WARNING')}>warning</Button>
      <Button variant="outlined" color="error" onClick={() => Client.getInstance().showToast('The template integration shows test ERROR', 'ERROR')}>error</Button>
      <Button variant="outlined" color="success" onClick={() => Client.getInstance().showToast('The template integration shows test SUCCESS', 'SUCCESS')}>success</Button>
      <Link color="primary" to="/" component={RouterLink}>go back</Link>
    </Stack>
  )
}
