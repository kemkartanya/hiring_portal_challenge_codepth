import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { db } from '../firebase.js'
import { collection, query, where, getDocs } from "firebase/firestore";

const JobResponses = () => {
  const user = localStorage.getItem('userInfo');
  const param = useParams();
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchJobResponses = async () => {
        const jobListingsRef = query(collection(db, 'jobs'), where("jobId", "==", param.id));
  
        try {
          const snapshot = await getDocs(jobListingsRef);
          if (snapshot) {
            setResponses(snapshot);
            console.log(snapshot);
          } else {
            console.error('Job not found');
          }
        } catch (error) {
          console.error('Error fetching job details:', error);
        }
      };
  
      fetchJobResponses();
  }, [param])

  return (
    <>
    {user && (
        <div align='center' className='my-12'>
            <div className='text-3xl font-bold'>Job Responses</div>
            {responses.map((response, index) => {
                <div>{response}</div>
            })}
        </div>
    )}
    </>
  )
}

export default JobResponses