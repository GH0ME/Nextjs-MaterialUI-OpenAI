import React from 'react'

interface headProps {}

const Head: React.FC<headProps> = () => {
    return (
      <>
        <title>🙂AI对话</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/icon/Pikachu.svg" />
      </>
    )
}

export default Head