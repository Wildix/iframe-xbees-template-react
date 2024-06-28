import {useNavigate} from 'react-router-dom';

import {Box, IconButton} from '@mui/material';

import {PublicPaths} from '../../../app/router/enums';
import LogoutIcon from '../../../assets/icons/LogoutIcon';

export function LogoutButton() {
  const navigate = useNavigate();

  return (
    <Box sx={{position: 'absolute', top: 10, right: 10}}>
      <IconButton onClick={() => navigate(PublicPaths.LOGOUT)}>
        <LogoutIcon color="black" />
      </IconButton>
    </Box>
  );
}
