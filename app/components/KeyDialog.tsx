import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import React from 'react'

interface KeyDialogProps {
  open: boolean
  fullScreen: boolean
  apiKey: string
  closeDialog: () => void
  changeApiKey: (key: string) => void
}

export const KeyDialog: React.FC<KeyDialogProps> = ({open,fullScreen,apiKey,closeDialog,changeApiKey}) => {
    return (
      <Dialog 
        open={open} 
        fullScreen={fullScreen} 
        onClose={closeDialog}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>)=>{
            event.preventDefault()
            const formData = new FormData(event.currentTarget)
            const formJson = Object.fromEntries((formData as any).entries());
            const apiKey:string = formJson.apiKey;
            changeApiKey(apiKey)
            closeDialog();
          }
        }}
      >
        <DialogTitle>OpenRouter API Key</DialogTitle>
        <DialogContent>
          <DialogContentText>
          请输入您的 OpenRouter API Key
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="apiKey"
            name="apiKey"
            label={apiKey?apiKey:"API Key"}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>取消</Button>
          <Button type="submit">{apiKey?'更新':'确认'}</Button>
        </DialogActions>
      </Dialog>
    )
}