import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { db } from '../firebase.js'
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import 'firebase/database';

const JobApplication = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicationText, setApplicationText] = useState('');

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

  const handleApply = async (e) => {
    e.preventDefault();

    const jobApplicationsRef = collection(db, 'applications');

    try {
      // Push a new application to the 'jobApplications' node in Firebase
      await addDoc(jobApplicationsRef, {
        name: applicantName,
        email: applicantEmail,
        applicationText: applicationText,
        jobId: param.id,
      });

      // Application submitted successfully
      alert('Application submitted successfully!');
      
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('An error occurred while submitting the application');
    }
  };

  return (
    <div align='center' className='my-12'>
      <div className='text-3xl font-bold'>Job Application</div>
      <div className='flex justify-center'>
        {jobDetails ? (
            <div className='my-5 m-5' >
                <div className='text-xl'>{jobDetails.title}</div>
                <p className='text-base'>Description: {jobDetails.description}</p> 
                <p className='text-base mb-3'>Location: {jobDetails.location}</p>
            </div>
        ) : (
            <p>Loading...</p>
        )}

        <form onSubmit={handleApply} className='my-5 m-5'>
            <input
            type="text"
            value={applicantName}
            placeholder='your name'
            className='bg-black border p-2 m-2 rounded'
            onChange={(e) => setApplicantName(e.target.value)}
            required
            />
            <br />

            <input
            type="email"
            value={applicantEmail}
            placeholder='your email'
            className='bg-black border p-2 m-2 rounded'
            onChange={(e) => setApplicantEmail(e.target.value)}
            required
            />
            <br />

            <textarea
            value={applicationText}
            placeholder='application text'
            className='bg-black border p-2 m-2 rounded'
            onChange={(e) => setApplicationText(e.target.value)}
            required
            />
            <br />

            <button className='bg-[#008080] p-2 m-2 rounded' type="submit">Submit Application</button>
        </form>
      </div>  
    </div>
  );
};

export default JobApplication;
