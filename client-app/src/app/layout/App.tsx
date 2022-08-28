import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, Icon, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import Agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { factory } from 'typescript';
import { observe } from 'mobx';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  const{activityStore}=useStore();


  useEffect(()=>{
      Agent.Activities.list().then((response)=>{

        activityStore.loadActivities();
      })
    
  },[activityStore])


  

  
  

  if (activityStore.loadingInitial)  return <LoadingComponent content='Loading app'/>


  return (
    <Fragment >

      <NavBar  />
      <Container style={{marginTop:'7em'}} >
        <ActivityDashboard 
        />
      </Container>

  
    </Fragment>
  );
}

export default observer(App);
