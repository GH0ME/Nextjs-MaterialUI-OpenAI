'use client'
import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import ErrorIcon from '@mui/icons-material/Error';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { Fab, IconButton, styled, useTheme } from '@mui/material';
import { ColorModeContext } from '../layout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface NavbarProps {
  apiKey: string
  openDialog: () => void
}

const Navbar: React.FC<NavbarProps> = ({apiKey,openDialog}) => {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  return (
    <NavBox>
      <ModeBox>
        <IconButton onClick={colorMode.toggleColorMode} >
          {theme.palette.mode==='dark'?<Brightness7Icon />:<Brightness4Icon />}
        </IconButton>
        {theme.palette.mode==='dark'?'黑夜模式':'白天模式'}
      </ModeBox>
      <Fab variant="extended" onClick={openDialog}>
        {
          !apiKey?
          <>
            <RedErrorIcon />
            未配置API Key
          </>
          :
          <>
            <GreenSmileIcon />
            已配置API Key
          </>
        }
      </Fab>
    </NavBox>
  )
}

const NavBox = styled("div")(({theme})=>{
  const mode = theme.palette.mode
  const borderColor = mode==="dark"?"#dadada50":"#3f3f3f50"
  return ({
    display: "flex",
    flexGrow: 1,
    padding: "1rem",
    justifyContent: "space-between",
    alignItems: "center",
    background: mode==="dark"?"#1a1a1a":"#f5f5f5",
    borderBottom: `2px solid ${borderColor}`,
  })
})

const ModeBox = styled(Box)`
  display: flex;
  align-items: center;
  font-weight: 600;
`

const RedErrorIcon = styled(ErrorIcon)`
  margin-right: .5rem;
  color: #ff3939;
  font-size: 1.5rem;
`

const GreenSmileIcon = styled(SentimentVerySatisfiedIcon)`
  margin-right: .5rem;
  color: #00c900;
  font-size: 1.5rem;
`

export default Navbar