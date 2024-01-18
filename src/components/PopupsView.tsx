import {Button, Stack, Typography} from '@mui/material';
import Link from '@mui/material/Link';
import {Link as RouterLink} from 'react-router-dom';


export function PopupsView() {
  const url = window.location.href;

  const target = 'Template Integrations';

  return (
    <Stack spacing={0.5}>
      <Typography variant="subtitle1">Show popup:</Typography>
      <Stack direction="row" spacing={0.5}>
        <Typography variant="subtitle1">Buttons:</Typography>
        <Button variant="contained" color="primary" onClick={() => window.open(url, target)}>Popup via script</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            const popupWidth = 650;
            const popupHeight = 850;
            const top = window.outerHeight / 2 + window.screenY - popupHeight / 2;
            const left = window.outerWidth / 2 + window.screenX - popupWidth / 2;

            return window.open(url, target, `
            scrollbars=yes,
            width=${popupWidth},
            height=${popupHeight},
            top=${top},
            left=${left}`
            );
          }}
        >
          Popup via script
        </Button>
      </Stack>
      <Stack direction="row" spacing={0.5}>
        <Typography variant="subtitle1">Links:</Typography>
        <Button variant="contained" color="primary" component={Link} href={url} target={target}>Popup via link</Button>
      </Stack>
      <Link color="primary" to="/" component={RouterLink}>go back</Link>
    </Stack>
  )
}
