import React, { useState } from 'react';
import { db } from '../firebase.js'
import { collection, addDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';

const JobListing = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobListingsRef = collection(db, "jobs");

    try {
      // Push a new job listing to the 'jobListings' node in Firebase
      const newJobListingRef = await addDoc(jobListingsRef, {
        title: jobTitle,
        description: jobDescription,
        location: jobLocation,
      });

      // Job listing created successfully
      alert('Job listing created successfully!');

      // You can get the ID of the newly created job listing if needed
      console.log('New Job Listing ID:', newJobListingRef.id);

      // Clear the form fields after submission
      setJobTitle('');
      setJobDescription('');
      setJobLocation('');

      navigate(`/job-details/${newJobListingRef.id}`);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the job listing');
    }
  };

  return (
    <div align='center' className='my-12'>
      <div className='text-3xl font-bold'>Create a Job Listing</div>
      <form className='my-5' onSubmit={handleSubmit}>
        <input
        type="text"
        value={jobTitle}
        placeholder='Enter Job Title'
        className='bg-black border p-2 m-2 rounded w-1/2'
        onChange={(e) => setJobTitle(e.target.value)}
        required
        />
        <br />

        <textarea
        value={jobDescription}
        rows={8}
        placeholder='Enter Job Description'
        className='bg-black border p-2 m-2 rounded w-1/2'
        onChange={(e) => setJobDescription(e.target.value)}
        required
        />
        <br />

        <input
        type="text"
        value={jobLocation}
        placeholder='Enter Job Location'
        className='bg-black border p-2 m-2 rounded w-1/2'
        onChange={(e) => setJobLocation(e.target.value)}
        required
        />
        <br />
        <button className='bg-[#008080] p-2 m-2 rounded' type="submit">Create Job Listing</button>
      </form>
    </div>
  );
};

export default JobListing;
