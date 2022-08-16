import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, Icon, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {

  const [activities,setActivities]=useState<Activity[]>([]);
  const [selectedActivity,setSelectedActivity]=useState<Activity | undefined>(undefined);
  const [editMode,setEditmode]=useState(false);


  useEffect(()=>{
    axios.get<Activity[]>("http://localhost:5000/api/activities").then((response)=>{
      console.log(response)
      setActivities(response.data)
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

    activity.id ? setActivities([...activities.filter(a=>a.id!==activity.id),activity]) :
    setActivities([...activities,{...activity,id:uuid()}]);
    setEditmode(false);
    setSelectedActivity(activity);
  }

  function HandleDelete(id :string){
    setActivities([...activities.filter(c=>c.id!==id)]);
  }
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
        />
      </Container>

  
    </Fragment>
  );
}

export default App;
