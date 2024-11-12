import "./App.css";
import "./stylesheets/style.css";
import "./stylesheets/responsive.css";

import React from "react";
import {Route, Routes } from "react-router-dom";

import ViewDetails from "./components/eventList/viewDetails";
import Login from "./components/login/login";
import Analytics from "./containers/analytics";
import Booking from "./containers/booking";
import CreateEvent from "./containers/createEvent";
import Customer from "./containers/customer";
import Dashboard from "./containers/dashboard";
import EventList from "./containers/eventList";
import Setting from "./containers/setting";
import Transaction from "./containers/transaction";
import Main from "./layout/main";

function App() {


  return (
    <div className="App">
      <Routes>
    
        <Route path="/" element={<Login />} />

        
    
            <Route path="dashboard" element={<Main><Dashboard /></Main>} />
            <Route path="eventList" element={<Main><EventList /></Main>} />
            <Route path="createEvent" element={<Main><CreateEvent /></Main>} />
            <Route path="booking" element={<Main><Booking /></Main>} />
            <Route path="viewDetails/:id" element={<Main><ViewDetails /></Main>} />
            <Route path="customer" element={<Main><Customer /></Main>} />
            <Route path="transaction" element={<Main><Transaction /></Main>} />
            <Route path="settings" element={<Main><Setting /></Main>} />
            <Route path="analytics" element={<Main><Analytics /></Main>} />
      
        
      </Routes>
    </div>
  );
}

export default App;
