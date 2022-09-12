import React, { useEffect } from 'react'
import SingleSent from './SingleSent'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleTask } from '../../Redux/User/Action/Thunk/TaskThunk';
import SingleReceived from './SingleReceived';


function TaskSingle() {

    const dispatch = useDispatch();
    const params = useParams();  
    
    const loadData = () => {
        dispatch(getSingleTask(params.id));
    }

    useEffect(() => { 
        loadData();
    },[params.id])

    const { singleTask, loading } = useSelector(state => state.task);

   

    
    return (
        <>
           { 
           /*
                <SingleSent data = { singleTask } loading = { loading } />
            */
            }
           { <SingleReceived data = { singleTask } loadData = {loadData} loading = { loading } /> }
        </>
    );

}

export default TaskSingle