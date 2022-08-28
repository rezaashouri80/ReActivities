import { randomUUID } from "crypto";
import { makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import Agent from "../api/agent";
import { Activity } from "../models/activity";
import {v4 as uuid} from 'uuid';

export default class ActivityStore{

    acticityRegistery=new Map<string,Activity>();
    selectedActivity:Activity | undefined = undefined;
    editMode=false;
    loading=false;
    loadingInitial=true;

    get activitiesByDate(){
        return Array.from(this.acticityRegistery.values()).sort((a,b)=>Date.parse(a.date)-Date.parse(b.date));
    }

    constructor(){
        makeAutoObservable(this)
    }

    loadActivities=async ()=>{


        try{
            const activities=await Agent.Activities.list();

            activities.forEach((item)=>{
                item.date=item.date.split('T')[0];
                this.acticityRegistery.set(item.id,item);
            })

            this.setloadingInitial(false);

        }
        catch(error){
            console.log(error);

            this.setloadingInitial(false)
        }
    }

    setloadingInitial=(state:boolean)=>{
        this.loadingInitial=state;
    }

    selectActivity=(id:string)=>{
        this.selectedActivity=this.acticityRegistery.get(id);
    }

    cancelSelectedActivity=()=>{
        this.selectedActivity=undefined;
    }

    openForm=(id?:string)=>{
        id ? this.selectActivity(id) : this.cancelSelectedActivity();

        this.editMode=true;
    }

    closeForm=()=>{
        this.editMode=false;
    }

    createActivity=async (activity:Activity)=>{
        this.loading=true;

        activity.id=uuid();

        try{
            await Agent.Activities.create(activity);

            runInAction(()=>{
                this.acticityRegistery.set(activity.id,activity);
                this.selectedActivity=activity;
                this.editMode=false;
                this.loading=false;
            })
        } catch(error){
            console.log(error);

            runInAction(()=>{
                this.loading=false;
            })
        }

    }

    updateActivity=async (activity:Activity)=>{

        this.loading=true;

        try{
            await Agent.Activities.update(activity);

            runInAction(()=>{
                this.acticityRegistery.set(activity.id,activity);
                this.selectedActivity=activity;
                this.editMode=false;
                this.loading=false;
            })
        } catch(error){
            console.log(error);

            runInAction(()=>{
                this.loading=false;
            })
        }
    }

    deleteActivity=async(id:string)=>{
        this.loading=true;

        try{
            await Agent.Activities.delete(id); 

            runInAction(()=>{
                this.acticityRegistery.delete(id);
                if (this.selectedActivity?.id===id ) this.cancelSelectedActivity();
                this.editMode=false;
                this.loading=false;
            })
        } catch(error){
            console.log(error);

            runInAction(()=>{
                this.loading=false;
            })
        }
    }
}
