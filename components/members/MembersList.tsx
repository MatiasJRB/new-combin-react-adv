import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material'
import { MemberEntity } from '../../entities/roles/MemberEntity'
import { FC } from 'react'

interface MembersListProps {
    members: MemberEntity[]
}

const MembersList: FC<MembersListProps> = ({members}) => {    
    return (
        <Box 
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            margin={8}
        >
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First name</TableCell>
                            <TableCell align="right">Last name</TableCell>
                            <TableCell align="right">Address</TableCell>
                            <TableCell align="right">SSN</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>                        
                        { members?.map((member: MemberEntity) => (
                            <TableRow
                                key={member.ssn}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell scope="row">
                                    {member.firstName}
                                </TableCell>
                                <TableCell align="right">{member.lastName}</TableCell>
                                <TableCell align="right">{member.address}</TableCell>
                                <TableCell align="right">{member.ssn}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
    }

export default MembersList;