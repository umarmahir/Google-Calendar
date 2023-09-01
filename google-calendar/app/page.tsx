'use client'

import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import ToolBar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Button, Typography } from '@mui/material'

export default function Home() {
  return (
    <>
      <Box
        sx={{
          bgcolor: 'inherit',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <IconButton sx={{ ml: 1, color: 'black' }}>
          <MenuIcon />
        </IconButton>
        <Typography variant='body1' sx={{ fontSize: 20, ml: 3, pb: 0, mb: 0 }}>
          Calendar
        </Typography>
        <button className='rounded-border'>Today</button>
      </Box>
    </>
  )
}
