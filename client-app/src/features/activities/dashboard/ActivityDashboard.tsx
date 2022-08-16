import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
    activities: Activity[];
    selectedActivity:Activity | undefined;
    selectActivity:(id:string)=> void;
    cancelActivity:()=>void;
    editMode:boolean;
    openForm:(id:string)=>void;
    closeForm:()=>void;
    addOrEdit:(activity:Activity)=>void;
    deleteActivity:(id:string)=>void;
}

const ActivityDashboard = ({ activities,deleteActivity ,selectedActivity,addOrEdit,selectActivity,cancelActivity,editMode,openForm,closeForm}: Props) => {

    return (
        <Grid>
            <Grid.Column width='10'>
               <ActivityList activities={activities}  selectActivity={selectActivity} deleteActivity={deleteActivity} />
            </Grid.Column>
            <Grid.Column width='6'>
               {selectedActivity && !editMode &&
               <ActivityDetails activity={selectedActivity} openForm={openForm} cancelActivity={cancelActivity} />
            }
            {
                editMode && 
                <ActivityForm closeForm={closeForm} activity={selectedActivity} addOrEdit={addOrEdit}/>
            }
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard;