import { ChatProps } from "./page"

export interface apiReqProps {
  apiKey: string
  messages: ChatProps[]
}

export const apiHttpClient = async(req:apiReqProps)=>{
  const envUrl = 'http://localhost:3000'
  let response
  try{
    //由于不上传env 这里我直接写地址
    response = await fetch(`${envUrl}/api/getChat`,{
      method: "POST",
      body:JSON.stringify(req)
    }).then(res=>res.json()).then(res=>res)
  }catch(error){
    return {error:"请检查ApiKey是否有效或余额是否充足🙂"}
  }
  

  if(response.status === 500){
    return {error:"服务器出现问题🙂"}
  }else if(response.status === 400){
    return {error:"请检查ApiKey是否有效或余额是否充足🙂"}
  }else{
    return response
  }
}