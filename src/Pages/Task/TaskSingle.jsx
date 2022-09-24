import React, { useEffect } from 'react'
import SingleSent from './SingleSent'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleTask } from '../../Redux/User/Action/Thunk/TaskThunk';
import SingleReceived from './SingleReceived';


function TaskSingle() {

    const dispatch = useDispatch();
    const params = useParams();  
    
    console.log(params);

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
                params.type =='inbox' ?
                <SingleReceived data = { singleTask } loadData = {loadData} loading = { loading } />
                :
                <SingleSent data = { singleTask } loading = { loading } loadData = {loadData} />
            }
        </>
    );

}

export default TaskSingle