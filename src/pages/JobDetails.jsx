import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase.js'
import { doc, getDoc } from "firebase/firestore";
import Navbar from '../components/Navbar.jsx';

const JobDetails = () => {
  const user = localStorage.getItem('userInfo');
  const param = useParams();
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      const jobListingsRef = doc(db, 'jobs', param.id);

      try {
        const snapshot = await getDoc(jobListingsRef);
        if (snapshot.exists()) {
          setJobDetails(snapshot.data());
        } else {
          console.error('Job not found');
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [param]);

  return (
    <>
    {user && (
      <div>
        <Navbar />
        <div align='center' className='my-12'>
            <div className='text-3xl font-bold'>Job Details</div>
            {jobDetails ? (
                <div className='my-5' >
                <div className='text-xl'>{jobDetails.title}</div>
                <p className='text-base'>Description: {jobDetails.description}</p> 
                <p className='text-base mb-3'>Location: {jobDetails.location}</p>
                <Link to={`/job-application/${param.id}`} className='bg-[#008080] p-2 m-2 rounded'>
                Job Link
                </Link>
                <Link to={`/job-responses/${param.id}`} className='bg-[#008080] p-2 m-2 rounded'>
                    View Responses
                </Link>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
      </div>
    )}
    </>
  );
};

export default JobDetails;
