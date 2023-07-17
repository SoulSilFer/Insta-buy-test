import React from 'react';
import { Popover } from '@mui/material';

type Props = {
  open: boolean;
  children: React.ReactNode;
  handleClose: (value: boolean) => void;
  anchorEl: HTMLButtonElement | null;
  id: 'simple-popover' | undefined;
};

export const PopoverComp: React.FC<Props> = ({
  open,
  children,
  handleClose,
  anchorEl,
  id
}) => {
  return (
    <>
      <Popover
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        open={open}
        id={id}
      >
        {children}
      </Popover>
    </>
  );
};
