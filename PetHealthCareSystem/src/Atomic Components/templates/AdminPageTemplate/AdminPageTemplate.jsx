import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CreateIcon from '@mui/icons-material/Create';
import ViewListIcon from '@mui/icons-material/ViewList';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import Dashboard from "../../templates/AdminPageTemplate/Dashboard/Dashboard";
import AccountManagement from "../../templates/AdminPageTemplate/AccountManagement/AccountManagement";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const AdminPageTemplate = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('Dashboard');
  const [accountManagementOpen, setAccountManagementOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuClick = (component) => {
    setSelectedComponent(component);
  };

  const handleAccountManagementClick = () => {
    setAccountManagementOpen(!accountManagementOpen);
  };

  return (
    <Box sx={{ display: 'flex' }} >
      <CssBaseline  />
      <AppBar position="fixed" open={open} style={{ background: '#282828'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            ADMIN DASHBOARD
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={() => handleMenuClick('Dashboard')}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={handleAccountManagementClick}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText primary="Account Management" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
            <Collapse in={accountManagementOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuClick('CreateAccount')}>
                  <ListItemIcon>
                    <CreateIcon />
                  </ListItemIcon>
                  <ListItemText primary="Create Account" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuClick('ViewAccount')}>
                  <ListItemIcon>
                    <ViewListIcon />
                  </ListItemIcon>
                  <ListItemText primary="View Account" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuClick('DeleteAccount')}>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Delete Account" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} onClick={() => handleMenuClick('UpdateAccount')}>
                  <ListItemIcon>
                    <UpdateIcon />
                  </ListItemIcon>
                  <ListItemText primary="Update Account" />
                </ListItemButton>
              </List>
            </Collapse>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ background: 'rgb(249, 250, 251)'}}>
        <DrawerHeader />
        {selectedComponent === 'Dashboard' && <Dashboard />}
        {selectedComponent === 'AccountManagement' && <AccountManagement />}
        {selectedComponent === 'CreateAccount' && <div>Create Account Component</div>}
        {selectedComponent === 'ViewAccount' && <div>View Account Component</div>}
        {selectedComponent === 'DeleteAccount' && <div>Delete Account Component</div>}
        {selectedComponent === 'UpdateAccount' && <div>Update Account Component</div>}
      </Box>
    </Box>
  );
}

export default AdminPageTemplate;
