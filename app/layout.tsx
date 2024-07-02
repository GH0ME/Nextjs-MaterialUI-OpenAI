'use client'
import Head from './head'
import { ThemeProvider, createTheme, styled, useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline'
import { createContext, useCallback, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import './global.css'
import { KeyDialog } from './components/KeyDialog';

export const ColorModeContext = createContext({toggleColorMode:()=>{}})

export const ApiKeyContext = createContext({apiKey:''})

export interface modeProps {
  mode:'dark'|'light'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [apiKey,setApiKey] = useState('')
  const [open,setOpen] = useState(false)
  
  const [mode,setMode] = useState<'light'|'dark'>('dark')
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background:{
            default: mode==='dark'?'#303030':'#ebebeb',
          },
        },
      }),
    [mode],
  );
  const apiKeyMemo = useMemo(
    ()=>({
      apiKey:apiKey
    }),[apiKey]
  )

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const openDialog = useCallback(()=>{
    setOpen(true)
  },[])

  const closeDialog = useCallback(()=>{
    setOpen(false)
  },[])

  const changeApiKey = useCallback((key:string)=>{
    setApiKey(key)
  },[])

  return (
    <html lang="en">
      <Head/>
      <ApiKeyContext.Provider value={apiKeyMemo}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <body>
              <ColumnDiv>
                  <Navbar apiKey={apiKey} openDialog={openDialog} />
                  <KeyDialog open={open} 
                  fullScreen={fullScreen} 
                  closeDialog={closeDialog}
                  changeApiKey={changeApiKey}
                  apiKey={apiKey} />
                  <main>
                    {children}
                  </main>
              </ColumnDiv>
            </body>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </ApiKeyContext.Provider>
    </html>
  );
}

const ColumnDiv = styled("div")`
  height: 100%;
  display: flex;
  flex-direction: column;
`