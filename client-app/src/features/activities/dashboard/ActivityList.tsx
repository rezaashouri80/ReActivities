import { observable } from "mobx";
import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Grid, Item, Label, List, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";



const ActivityList = () => {

    const {activityStore}=useStore();

    const {deleteActivity,activitiesByDate,loading}=activityStore

    const[target,setTarget]=useState('');

    function HandleDelete(event:SyntheticEvent<HTMLButtonElement>,id:string){

        setTarget(event.currentTarget.name);
        deleteActivity(id);
    }

    return(
            <Segment>
                <Item.Group divided>
                    {activitiesByDate.map(item=>(
                        <Item key={item.id}>
                                <Item.Content>
                                    <Item.Header as='a'>{item.title}</Item.Header>
                                    <Item.Meta>{item.date}</Item.Meta>
                                    <Item.Description>
                                        <div>{item.description}</div>
                                        <div>{item.city},{item.venue}</div>
                                    </Item.Description>
                                    <Item.Extra>
                                        <Button onClick={()=>{
                                            activityStore.closeForm();
                                            activityStore.selectActivity(item.id);}} floated='right' content='View' color='blue' />
                                        <Button 
                                        name={item.id}
                                        loading={loading && target==item.id} 
                                        onClick={(e)=>HandleDelete(e,item.id)} 
                                        floated='right' content='Delete' color='red' />

                                        <Label basic content={item.category} />
                                    </Item.Extra>
                                </Item.Content>
                        </Item>
                    ))}
                </Item.Group>
            </Segment>
    )
}

export default observer(ActivityList);
