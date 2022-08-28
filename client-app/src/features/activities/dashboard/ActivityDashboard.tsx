import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";



const ActivityDashboard = () => {


    const {activityStore}=useStore();

    const {editMode,selectedActivity}=activityStore;

    return (
        <Grid>
            <Grid.Column width='10'>
               <ActivityList  />
            </Grid.Column>
            <Grid.Column width='6'>
               {selectedActivity && !editMode &&
               <ActivityDetails   />
            }
            {
                editMode && 
                <ActivityForm    />
            }
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard);