import {useNavigate} from 'react-router-dom';
import {Box, IconButton} from '@mui/material';
import {PublicPaths} from './ViewsContainer';
import LogoutIcon from '../assets/icons/LogoutIcon';

export function LogoutButton() {
  const navigate = useNavigate();

  return (
    <Box sx={{position: 'absolute', top: 10, right: 10}}>
      <IconButton onClick={() => navigate(PublicPaths.logout)}>
        <LogoutIcon
          color="black"
        />
      </IconButton>
    </Box>
  );
}
