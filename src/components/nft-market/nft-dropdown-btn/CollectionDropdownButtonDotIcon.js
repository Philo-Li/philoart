/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const options = ['View', 'Buy'];

export default function CollectionDropdownButton({
  setShowViewOnExplorerModal,
  setShowBuyModal,
}) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleMenuItemClick = (event, index) => {
    if (options[index] === 'View') {
      setShowViewOnExplorerModal(true);
    } else if (options[index] === 'Buy') {
      setShowBuyModal(true);
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <ButtonGroup variant="outlined" color="default" ref={anchorRef} aria-label="split button">
          <Button
            color="default"
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="small outlined button group"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <i className="bi bi-three-dots-vertical icon-three-dots-vertical" />
          </Button>
        </ButtonGroup>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} placement="bottom-end" transition>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option === 'View' && <i className="bi bi-pencil-fill icon-margin-right" />}
                        {option === 'Buy' && <i className="bi bi-trash-fill icon-margin-right" />}
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
}
