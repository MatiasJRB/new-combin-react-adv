
import { Dialog, DialogTitle, Typography, Box, Button } from '@mui/material'
import { useState } from 'react'
import LogOut from '@mui/icons-material/Logout'
import LoadingButton from '@mui/lab/LoadingButton'
import { logout } from '../services/auth'
import { useRouter } from 'next/router'
  





const LogOutDialog = () => {
    const [open, setOpen] = useState(true)
    const [loading, setLoading] = useState(false)
    const handleCloseDialog = () => {
        setOpen(false)
    }
    const router = useRouter()

    const handleLogOut = () => {
        setLoading(true)
        logout()       
        router.push('/')
            .finally(() => {
                setOpen(false)
                setLoading(false)
            })
    }
    
    return (
        <Dialog  open={open}>
            <DialogTitle>Are you sure that you want to log out?</DialogTitle>     
            <Box
                display="flex"
                width="100%"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <Button onClick={handleCloseDialog} 
                    sx={{
                        width: '100%'
                    }} >
                    <Typography variant="button">No</Typography>
                </Button>
                <LoadingButton
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<LogOut />}
                    fullWidth
                    onClick={handleLogOut} 
                >
                    <Typography
                        variant="button"
                        color="inherit"
                    >
                        { loading ?  'Loggin Out' :  'Log out' }
                    </Typography>
                </LoadingButton>
            </Box>
        </Dialog>
    )
}

export default LogOutDialog;