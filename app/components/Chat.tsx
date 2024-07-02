import { Avatar, styled } from '@mui/material'
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import React from 'react'
import { green, yellow } from '@mui/material/colors';
import { ChatProps } from '../page';
import { useTheme } from '@mui/material';
import { modeProps } from '../layout';


export const Chat: React.FC<ChatProps> = ({role,content}) => {
    const theme = useTheme()
    return (
      <ChatBox>
        <Avatar sx={{bgcolor: role==='assistant'?yellow[700]:green[700],color:"#000000",userSelect:'none'}}>
          {role==='assistant'?<SmartToyTwoToneIcon/>:<PersonOutlineTwoToneIcon/>}
        </Avatar>
        <ChatMainBox>
          <Role>{role==='assistant'?'ChatGPT':'用户'}</Role>
          <Content>{content==="loading"?Loading(theme.palette.mode):content}</Content>
        </ChatMainBox>
      </ChatBox>
    )
}

const Loading = (mode: 'dark'|'light')=>{
  return (
    <svg width="50" height="50">
      <Eyes mode={mode} className="eye" cx="25" cy="25" r="14"></Eyes>
      <Mouth mode={mode} className="mouth" cx="25" cy="25" r="14"></Mouth>
    </svg>
  )
}

const ChatBox = styled("div")`
  display: flex;
  margin: 1rem 1rem 2rem 1rem;
  column-gap: 1rem;
  width: 90%;
`

const ChatMainBox = styled("div")(({theme})=>{

  return ({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '.5rem',
    
  })
})

const Role = styled("h1")(({theme})=>({
  [theme.breakpoints.down('md')]: {
    fontSize: '1.2rem',
    fontWeight: 500
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.5rem',
    fontWeight: 600
  }
}))

const Content = styled("p")(({theme})=>({
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.3rem',
  }
}))

const Eyes = styled("circle")(({mode}:modeProps)=>({
  "@keyframes eyeAni": {
    "40%": {
      strokeDasharray: "0, 77"    /* 间距改为7/8 */
    },
    "80%, 100%": {
        transform: "rotate(675deg)",  /* 间距恢复为3/4 */
        strokeDasharray: "0, 66"
    }
  },
  fill: "none",
  stroke: mode==='dark'?"#ffffff":"#000000",
  strokeWidth: 4,
  strokeLinecap: "round",
  strokeDasharray: "0, 28",
  transformOrigin: "center",
  transform: "rotate(-45deg)",
  animation: "eyeAni 2.2s ease-in-out infinite",
}))

const Mouth = styled("circle")(({mode}:modeProps)=>({
  "@keyframes mouthAni": {
    "40%": {
      strokeDasharray: "44, 22"    /* 间距改为1/4 */
    },
    "80%, 100%": {
        transform: "rotate(720deg)",  /* 间距恢复为1/2 */
        strokeDasharray: "44, 44"
    }
  },
  fill: "none",
  stroke: mode==='dark'?"#ffffff":"#000000",
  strokeWidth: 3,
  strokeLinecap: "round",
  strokeDasharray: "44, 44",
  transformOrigin: "center",  /* transform动画时以自身中心作为基点 */
  animation: "mouthAni 2.2s ease-out infinite",
}))