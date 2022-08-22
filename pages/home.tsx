import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/layouts/main/Header'
import Footer from '../components/layouts/main/Footer'
import { Grid } from '@mui/material'
import MemberForm from '../components/members/MemberForm'
import MembersList from '../components/members/MembersList'
import { findAllMembers } from '../services/members'
import { useEffect, useState } from 'react'
import { MemberEntity } from '../entities/roles/MemberEntity'
import { useIdleTimer } from 'react-idle-timer'


const Home: NextPage = () => {  

  const [members, setMembers] = useState<MemberEntity[]>([])
  

  useEffect(() => {    
    findAllMembers()
      .then(members => {
        setMembers(members)
      })
  }, [])

  const getAllMembers = async () => {
    const members: MemberEntity[] = await findAllMembers()
    setMembers(members)     
  }

  const periodInMinutes = 1

  const idleTimer = useIdleTimer({
    onIdle: getAllMembers,
    timeout: 1000 * 60 * periodInMinutes,
    startOnMount: true,
    events: [
      'mousemove',
      'keydown',
      'wheel',
      'DOMMouseScroll',
      'mousewheel',
      'mousedown',
      'touchstart',
      'touchmove',
      'MSPointerDown',
      'MSPointerMove',
      'visibilitychange'
    ],
  })

  const handleAddMember = async (newMember: MemberEntity) => {
    setMembers([...members, newMember])
  }

  return (
    <div >
      <Head>
        <title>New Combin</title>
        <meta name="description" content="By Matias Rios" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      
      <div>
        <Header/>
        <div>
          <Grid 
            container  
          >
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <MemberForm handleAddMember={handleAddMember}/>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <MembersList members={members} />
            </Grid>
          </Grid>
        </div>
        <Footer/>
      </div>

      
    </div>
  )
}


export default Home
