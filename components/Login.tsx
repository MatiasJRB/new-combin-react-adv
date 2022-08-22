
import { useState } from 'react'
import { Box, Typography, TextField } from '@mui/material'
import { login } from '../services/auth'
import { useRouter } from 'next/router'
import axiosInstance from '../libs/axios'
import { ErrorEntity } from '../entities/CommonEntities'
import LoadingButton from '@mui/lab/LoadingButton'
import LoginIcon from '@mui/icons-material/Login'

const Login = () => {

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<ErrorEntity | undefined>(undefined)
    const [loading, setLoading] = useState(false)
    const router = useRouter()


    const validateInputs = () => {
        if (user.length === 0) {
            setError({ message: 'User is required' })
            return false
        }
        if (password.length === 0) {
            setError({ message: 'Password is required' })
            return false
        }
        return true
    }

    const handleLogin = async () => {
        setLoading(true);
        setError(undefined);
        if (validateInputs()) {
            try {
                const res = await login(user, password);      
                const { data } = res; 
                localStorage.setItem('token', data.token)
                axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + data.token            
                router.push('/home')
                    .finally(() => {
                        setLoading(false);
                    })
            } catch (error: any) {
                setError({message: error.response?.data?.message || 'Something went wrong'} );
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }

    return (
        <div>            
            <Box
                minHeight={'100vh'}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="h5">Please, log in</Typography>
                <TextField
                    color='secondary'
                    margin="normal"
                    label="User"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}                    
                />
                <TextField
                    label="Password"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />
                { error &&
                    <Box
                        display="flex"
                        flexDirection="column"
                        borderRadius={4}
                        margin={2}
                    >
                        <Typography margin={2} variant="body1">{error.message}</Typography>
                    </Box>
                }
                <LoadingButton
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<LoginIcon />}
                    variant="outlined"
                    sx={{
                        margin: 2
                    }}
                    onClick={handleLogin} 
                >
                    <Typography
                        variant="button"
                        color="inherit"
                    >
                        { loading ?  'Loggin In' :  'Log In' }
                    </Typography>
                </LoadingButton>
            </Box>
            
        </div>
    )
    }
export default Login;

