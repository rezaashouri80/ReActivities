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

function App() {

  const [activities,setActivities]=useState<Activity[]>([]);
  const [selectedActivity,setSelectedActivity]=useState<Activity | undefined>(undefined);
  const [editMode,setEditmode]=useState(false);
  const [loading,setLoading]=useState(true);
  const [submiting,setSubmiting]=useState(false);

  useEffect(()=>{
      Agent.Activities.list().then((response)=>{

        let activities:Activity[]=[]

        response.forEach((item)=>
        {
          item.date=item.date.split("T")[0];
          activities.push(item);
        })


        setActivities(activities)
        setLoading(false);
      })
    
  },[])


  function HandleSelectActivity(id:string){

    setSelectedActivity(activities.find(x=>x.id===id));
    setEditmode(false);
  }

  function HandleCancelSelectActivity(){
    setSelectedActivity(undefined);
    setEditmode(false);
  }

  function HandleOpenForm(id? :string){
    id ? HandleSelectActivity(id) : HandleCancelSelectActivity();
    setEditmode(true);
  }

  function HandleCloseForm(){
    setEditmode(false);
  }

  function HandleAddOrEdit(activity:Activity){

    setSubmiting(true);
    if(activity.id){
      Agent.Activities.update(activity).then(()=>{
        setActivities([...activities.filter(a=>a.id!==activity.id),activity]);
        setSelectedActivity(activity)
        setEditmode(false);
        setSubmiting(false);
      })
    }
    else{
      activity.id=uuid();
      Agent.Activities.create(activity).then(()=>{
        setActivities([...activities,activity]);
        setSelectedActivity(activity)
        setEditmode(false);
        setSubmiting(false);
      })
    }


  }

  function HandleDelete(id :string){

    setSubmiting(true);
    Agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(c=>c.id!==id)]);
      setSubmiting(false);

    })

  }

  if (loading)  return <LoadingComponent content='Loading app'/>


  return (
    <Fragment >

      <NavBar openForm={HandleOpenForm} />
      <Container style={{marginTop:'7em'}} >
        <ActivityDashboard 
        activities={activities}
        selectedActivity={selectedActivity}
        selectActivity={HandleSelectActivity}
        cancelActivity={HandleCancelSelectActivity}
        editMode={editMode}
        openForm={HandleOpenForm}
        closeForm={HandleCloseForm}
        addOrEdit={HandleAddOrEdit}
        deleteActivity={HandleDelete}
        submiting={submiting}
        />
      </Container>

  
    </Fragment>
  );
}

export default App;
