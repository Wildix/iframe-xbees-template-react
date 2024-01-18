import {useNavigate} from 'react-router-dom';
import {Box, IconButton} from '@mui/material';
import LogoutIcon from '../assets/icons/LogoutIcon';
import {PublicPaths} from '../roots';

export function LogoutButton() {
  const navigate = useNavigate();

  return (
    <Box sx={{position: 'absolute', top: 10, right: 10}}>
      <IconButton onClick={() => navigate(PublicPaths.LOGOUT)}>
        <LogoutIcon
          color="black"
        />
      </IconButton>
    </Box>
  );
}
