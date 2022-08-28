import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, ItemGroup, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";



const ActivityForm=()=>
{
    const {activityStore}=useStore();

    const {selectedActivity,closeForm,createActivity,updateActivity,loading}=activityStore;

    const initialState=selectedActivity ?? {id:'',city:'',category:'',venue:'',date:'',description:'',title:''}

    const [activity,setActivity]=useState(initialState);

    const handleInputChange=(event:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
        const {name,value}=event.target;
        setActivity({...activity,[name]:value})
    }

    const handleSubmit=()=>{

        activity.id ? updateActivity(activity):createActivity(activity);

    }

    return(

        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input value={activity.title} onChange={handleInputChange} name='title' placeholder='Title' />
                <Form.TextArea value={activity.description} onChange={handleInputChange} name='description' placeholder='Description'/>
                <Form.Input value={activity.category} onChange={handleInputChange} name='category' placeholder='Category' />
                <Form.Input value={activity.venue} onChange={handleInputChange} name='venue' placeholder='Venue' />
                <Form.Input type="date" value={activity.date} onChange={handleInputChange} name='date' placeholder='date' />
                <Form.Input value={activity.city} onChange={handleInputChange} name='city' placeholder='City' />
                <Button loading={loading} floated="right" positive type="submit" content='Submit'/>
                <Button floated="right" type="button" onClick={closeForm} content='cancel' />
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm);