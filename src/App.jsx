import { useState } from 'react'
import './App.css'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import JobListing from './pages/JobListing';
import JobDetails from './pages/JobDetails';
import JobApplication from './pages/JobApplication';
import JobResponses from './pages/JobResponses';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Login />} />
      <Route path='/job-listing-creation' element={<JobListing />} />
      <Route path='/job-details/:id' element={<JobDetails />} />
      <Route path='/job-application/:id' element={<JobApplication />} />
      <Route path='/job-responses/:id' element={<JobResponses />} />
    </Route>
  )
);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
