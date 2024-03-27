import * as React from 'react';
import { useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Popover from '@mui/material/Popover';

import { useMessage } from '../MessageContext';

const NotificationButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const { message } = useMessage();

  return (
    <div>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={message.length} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box p={2}>
          <Typography variant="h6">Notifications</Typography>
          <Typography>
          <ol>
          {message.map((message,index)=>(
            <li key={index}>{message}</li>
          ))}
          </ol>
          </Typography>
          {/* Add more notification content here */}
        </Box>
      </Popover>
    </div>
  );
};

export default NotificationButton;