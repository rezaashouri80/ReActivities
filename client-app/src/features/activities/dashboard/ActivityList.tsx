import React from "react";
import { Button, Grid, Item, Label, List, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activities: Activity[];
    selectActivity:(id:string)=>void;
    deleteActivity:(id:string)=>void;
}

const ActivityList = ({ activities,selectActivity,deleteActivity }: Props) => {


    return(
            <Segment>
                <Item.Group divided>
                    {activities.map(item=>(
                        <Item key={item.id}>
                                <Item.Content>
                                    <Item.Header as='a'>{item.title}</Item.Header>
                                    <Item.Meta>{item.date}</Item.Meta>
                                    <Item.Description>
                                        <div>{item.description}</div>
                                        <div>{item.city},{item.venue}</div>
                                    </Item.Description>
                                    <Item.Extra>
                                        <Button onClick={()=>selectActivity(item.id)} floated='right' content='View' color='blue' />
                                        <Button onClick={()=>deleteActivity(item.id)} floated='right' content='Delete' color='red' />

                                        <Label basic content={item.category} />
                                    </Item.Extra>
                                </Item.Content>
                        </Item>
                    ))}
                </Item.Group>
            </Segment>
    )
}

export default ActivityList;
