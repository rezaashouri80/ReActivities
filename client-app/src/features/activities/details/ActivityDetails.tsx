import React from 'react'
import { Button, Card, Icon, Image } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity';

interface Props{
  activity:Activity;
  cancelActivity:()=>void;
  openForm:(id:string)=>void

}

const ActivityDetails = ({activity,cancelActivity,openForm}:Props) => (
  <Card>
    <Image src={`/assets/CategoryImages/${activity.category}.jpg`}  />
    <Card.Content>
      <Card.Header>{activity.title}</Card.Header>
      <Card.Meta>
        <span >{activity.date}</span>
      </Card.Meta>
      <Card.Description>
        {activity.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths='2'>
        <Button onClick={()=> {openForm(activity.id)}} basic color='blue' content='Edit'/>
        <Button basic color='grey' onClick={cancelActivity} content='Cancel'/>
      </Button.Group>
    </Card.Content>
  </Card>
)

export default ActivityDetails;