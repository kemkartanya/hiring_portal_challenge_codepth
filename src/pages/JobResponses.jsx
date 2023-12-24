import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase.js';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import Navbar from '../components/Navbar.jsx';

const JobResponses = () => {
  const param = useParams();
  const [responses, setResponses] = useState([]);
  const navigate = useNavigate();
  const user = localStorage.getItem("userInfo");
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

  useEffect(() => {
    const fetchJobResponses = async () => {
      const jobListingsRef = query(collection(db, 'applications'), where('jobId', '==', param.id));

      try {
        const snapshot = await getDocs(jobListingsRef);
        if (snapshot) {
          // Use forEach to iterate over the documents and extract data
          const responseData = [];
          snapshot.forEach((doc) => {
            responseData.push(doc.data());
          });
          setResponses(responseData);
          // console.log(responseData);
        } else {
          console.error('Job not found');
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobResponses();
  }, [param]);

  return (
    <>
    {user && (
      <div>
        <Navbar />
        <div align='center' className='my-12'>
          <div className='text-3xl font-bold'>Job Responses</div>
          <div className='flex flex-wrap items-center justify-center my-5'>
            {jobDetails ? (
                <div className='my-5 m-5' >
                    <div className='text-xl'>{jobDetails.title}</div>
                    <p className='text-base'>Description: {jobDetails.description}</p> 
                    <p className='text-base mb-3'>Location: {jobDetails.location}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}

            {responses.map((response, index) => (
              <div className='m-3 border w-fit p-3 rounded-xl' key={index}>
                <div>{response.name}</div>
                <div>{response.email}</div>
                <div>{response.applicationText}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default JobResponses;