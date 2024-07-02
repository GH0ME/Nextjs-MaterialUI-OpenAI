import { NextApiRequest, NextApiResponse } from "next"

interface messageProps {
  role: "assistant"
  content: string
}

const handler = async(request:NextApiRequest,response:NextApiResponse)=>{
  const {apiKey,messages} = JSON.parse(request.body)
  console.log({apiKey,messages});
  
  const testKey = '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'

  const result = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "model": "openai/gpt-3.5-turbo-1106",
      "messages": messages,
    })
  }).then((res=>res?.json()||res)).then(res=>res)

  console.log({result});

  if(result?.error){
    console.log('go error');
    return response.status(400).send({...result.error,status:400})
  }else{
    const message:messageProps = result.choices[0].message
    console.log({message});
    return response.status(200).send(message)
  }  
}

export default handler