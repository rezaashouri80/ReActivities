import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react';

function App() {

  const [activities,setActivities]=useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/api/activities").then((response)=>{
      console.log(response)
      setActivities(response.data)
    })
  },[])


  return (
    <div >
      <Header as='h2'  content='Reacticities'>
      <Icon name='users' />
      Reacticities
        <List>
          {activities.map((item:any)=>(
              <List.Item key={item.id}>
                {item.title}
              </List.Item>
          )

          )}
        </List>
      </Header>


    </div>
  );
}

export default App;
