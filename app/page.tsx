'use client'
import { Alert, Button, Container, TextareaAutosize, styled } from "@mui/material";
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';
import { blue, grey } from "@mui/material/colors";
import { Chat } from "./components/Chat";
import { useContext, useRef, useState } from "react";
import { apiHttpClient } from "./service";
import { ApiKeyContext } from "./layout";

export interface ChatProps {
  role: 'assistant' | 'user'
  content: string
}

const defaultPrompts:ChatProps[] = [
  {role:'user',content:'接下来请你使用中文回答我的问题'},
  {role:'assistant',content:'好的，我接下来将会使用中文来回答您的问题'}
]

export default function Home() {
  const [chats,setChats] = useState<ChatProps[]>([])
  const [openAlert,setOpenAlert] = useState(false)
  const [alertType,setAlertType] = useState<'noKey'|'noMessage'|'errorKey'>('noKey')
  const apiKey = useContext(ApiKeyContext)
  //标记计时器 可清除
  let timeout:NodeJS.Timeout|null = null
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const sendMessages = async()=>{
    const nowApiKey = apiKey.apiKey
    if(!nowApiKey||!messageRef.current?.value){
      if(!openAlert&&!timeout){
        setAlertType(!nowApiKey?"noKey":"noMessage")
        setOpenAlert(true)
        timeout = setTimeout(()=>{
          setOpenAlert(false)
          timeout&&clearTimeout(timeout)
        },4000)
      }
      return
    }
    
    const userMessage:ChatProps = {role:'user',content:messageRef.current?.value||''}
    const newAksChats = [...chats,userMessage]

    setChats([...newAksChats,{role:"assistant",content:"loading"}])

    const result = await apiHttpClient({
      apiKey:nowApiKey,
      messages:[...defaultPrompts,...newAksChats]
    })
    messageRef.current!.value = ""

    if(result?.error){
      setAlertType('errorKey')
      setOpenAlert(true)
      timeout = setTimeout(()=>{
        setOpenAlert(false)
        timeout&&clearTimeout(timeout)
      },4000)
      setChats(newAksChats)
    }else{
      const newAnswerChats = [...newAksChats,result]
      setChats(newAnswerChats)
    }
  }

  return (
      <>
        <MainBox>
          <DialogBox>
            <Chat key={Math.random().toFixed(3)+'assistant'} role='assistant' content='你好呀~ 请问有什么可以帮到您?' />
            {chats.map((chat)=>{
              return <Chat key={Math.random().toFixed(3)+chat.role} role={chat.role} content={chat.content} />
            })}
          </DialogBox>
          <TextBox>
            <ShockAlert open={openAlert} severity={alertType==='noKey'?"warning":"error"}>
              {alertType==='noKey'?"请配置API KEY":alertType==='errorKey'?"请检查ApiKey是否有效或余额是否充足🙂":"请输入聊天内容"}
            </ShockAlert>
            <TextArea ref={messageRef} placeholder="给“ChatGPT”发送消息"/>
            <SendBtn onClick={sendMessages}><SmartToyTwoToneIcon/></SendBtn>
          </TextBox>
        </MainBox>
      </>
  );
}

const MainBox = styled(Container)(({theme})=>{
  const mode = theme.palette.mode
  const borderColor = mode==="dark"?"#dadada50":"#3f3f3f50"
  return ({
    display:"flex",
    flexDirection: "column",
    padding: "1rem 0 !important",
    background: theme.palette.mode==="dark"?"#f2f2f268":"#e0e0e0",
    [theme.breakpoints.down('lg')]: {
      width: "100%",
      height: "100%",
    },
    [theme.breakpoints.up('lg')]: {
      width: "1200px",
      height: "100%",
      backdropFilter: "blur(4px)",
      border: `2px solid ${borderColor}`,
      borderWidth: '0px 2px 0px 2px'
    }
  })
})

const DialogBox = styled("div")(({theme})=>({
  overflowY: 'auto',
  [theme.breakpoints.down('sm')]: {
    // flexGrow: 5,
    padding: '0',
    height: '80vh',
    maxHeight: '80vh',
  },
  [theme.breakpoints.up('sm')]: {
    // flexGrow: 5,
    padding: '1rem',
    height: '80vh',
    maxHeight: '80vh'
  },
  "::-webkit-scrollbar": {
    width: "4px",
  },
  "::-webkit-scrollbar-thumb": {
    borderRadius: "2px",
    background: "#ffffffda"
  },
  "::-webkit-scrollbar-track": {
    borderRadius: "0",
    background: "#00000071"
  }
}))

const TextBox = styled("div")`
  position: relative;
  padding: 0 1rem;
`

const TextArea = styled(TextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 1rem 4.5rem 1rem 1rem;
  border-radius: 12px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  resize: none;

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    outline: 0;
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
)

const SendBtn = styled(Button)(({theme})=>{
  return ({
    position: "absolute",
    right: "1.5rem",
    bottom: "1rem",
    padding: "6px",
    border: `2px solid ${blue[200]}`
  })
})

interface shockProps {
  open:boolean
}

const ShockAlert = styled(Alert)(({open}:shockProps)=>
  ({
    "@keyframes shock": {
      "0%":{
        top: '-3.5rem',
        opacity: 1
      },
      "3%":{
        top: '-4rem'
      },
      "6%":{
        top: '-3.3rem'
      },
      "9%":{
        top: '-4rem'
      },
      "11%":{
        top: '-3.5rem'
      },
      "90%":{
        opacity: 1
      },
      "100%":{
        opacity: 0
      },
    },
    opacity: 0,
    position: 'absolute',
    width: '50%',
    top: '-3.5rem',
    animation: open ? 'shock 4s forwards ease-out':'',

  })
)

// 封装一个 创建响应式样式组件 模板 
// interface styledProps {
//   tag: string | OverridableComponent<any>
//   options: ({theme}:{theme:Theme})=>({})
// }
// export const getResponsiveStyled = (props:styledProps)=>{
//   const {tag,options} = props

//   return styled(tag as unknown as ComponentClass<{}, any>)(options) as StyledComponent<any, React.DetailedHTMLProps<React.HTMLAttributes<any>, any>, {}>
// }

// 例子
// const Test = getResponsiveStyled({
//   tag:"div",
//   options: ({theme}:{theme:Theme})=>{
//     const mode = theme.palette.mode
//     //...判定操作
//     //响应式
//     return ({
//       [theme.breakpoints.down('lg')]: {},
//       [theme.breakpoints.up('lg')]: {}
//     })
//   }
// })