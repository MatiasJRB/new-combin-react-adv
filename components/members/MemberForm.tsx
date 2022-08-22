
import { Box, Button, Typography, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save';
import { useState,  FC } from 'react'
import { insertMember } from '../../services/members'
import { validateSSN } from '../../utils/helper'
import { ErrorEntity, SuccessEntity } from '../../entities/CommonEntities'
import { MemberEntity } from '../../entities/roles/MemberEntity'

interface MemberFormProps {
    handleAddMember: (member: MemberEntity) => void
}

const MemberForm: FC<MemberFormProps> = ({ handleAddMember }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [ssn, setSsn] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<ErrorEntity | undefined>(undefined)
    const [success, setSuccess] = useState<SuccessEntity | undefined>(undefined)

    const handleReset = () => {
        setFirstName('')
        setLastName('')
        setAddress('')
        setSsn('')
        setError(undefined)
        setTimeout(() => {
            setSuccess(undefined)
        } , 3000)
    }

    const validateInputs = () => {
        if (firstName.length === 0) {
            setError({ message: 'First name is required' })
            return false
        }
        if (lastName.length === 0) {
            setError({ message: 'Last name is required' })
            return false
        }
        if (address.length === 0) {
            setError({ message: 'Address is required' })
            return false
        }
        if (ssn.length === 0) {
            setError({ message: 'SSN is required' })
            return false
        }

        if (!validateSSN(ssn)) {
            setError({ message: 'SSN is not valid. Please use the following format: 123-45-6789' })
            return false
        }
        return true
    }


    const handleSubmit = async () => {
        setLoading(true)
        if (validateInputs()) {
            try {
                const newMember = await insertMember({
                    firstName,
                    lastName,
                    address,
                    ssn
                })
                handleAddMember(newMember)
                setSuccess({
                    message: 'Member added successfully'
                })
                handleReset()

            } catch (error: any) {
                setError({ message: error.response?.data?.message || 'Something went wrong' })
            }
        }
        setLoading(false)
    }
        

    return (
        <Box
            margin={8}
            display="flex"
            flexDirection="column"
        >
            <TextField
                label="First name*"
                margin="normal"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                
            />
            <TextField
                label="Last name*"
                margin="normal"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
                label="Address*"
                margin="normal"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
                label="SSN*"
                margin="normal"
                fullWidth
                value={ssn}
                onChange={(e) => setSsn(e.target.value)}
            />
            { (error || success) &&
                <Box sx={{
                    textAlign: 'center',
                    my:2,
                    py:2
                }}>
                    <Typography 
                        sx={{
                            mx: 2
                        }}
                    >
                        {error ? error.message : success ? success.message : 'Something went wrong'}
                    </Typography>
                </Box>
            }
            <Box
                display="flex"
                flexDirection="row"
                margin={2}
                justifyContent="space-around"
            >
                <Button
                    size="large"
                    onClick={handleReset}
                >
                    <Typography 
                        variant="button"
                        color="inherit"
                    >
                        Reset
                    </Typography>
                </Button>
                <LoadingButton
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="outlined"
                    onClick={handleSubmit}
                >
                    <Typography
                        variant="button"
                        color="inherit"
                    >
                        { loading ?  'Saving' : success ? 'Saved' : 'Save' }
                    </Typography>
                </LoadingButton>
            </Box>
        </Box>
    );
    }

export default MemberForm;