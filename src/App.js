import "./App.css";
import './stylesheets/style.scss';

import React from "react";
import { Route, Routes } from "react-router-dom";

import { UserProvider } from "./components/context/userContext"
import EditEvent from "./components/createEvent/editEvent"
import ViewDetails from "./components/eventList/viewDetails";
import Login from "./components/login/login";
import CreateRole from "./components/roleManagement/roleManage"
import Analytics from "./containers/analytics";
import Booking from "./containers/booking";
import CreateEvent from "./containers/createEvent";
import Customer from "./containers/customer";
import Dashboard from "./containers/dashboard";
import EventList from "./containers/eventList";
import RoleManagement from "./containers/roleManagement"
import Setting from "./containers/setting";
import Transaction from "./containers/transaction";
import User from "./containers/user";
import Main from "./layout/main";

function App() {


  return (
    <div className="App">
      <Routes>

        <Route path="/" element={<UserProvider><Login /></UserProvider>} />



        <Route path="dashboard" element={<Main><Dashboard /></Main>} />
        <Route path="eventList" element={<Main><EventList /></Main>} />
        <Route path="roleManagement" element={<Main><RoleManagement /></Main>} />
        <Route path="createRole" element={<Main><CreateRole /></Main>} />
        <Route path="createRole/:id" element={<Main><CreateRole /></Main>} />
        <Route path="user" element={<Main><User /></Main>} />

        <Route path="createEvent/:id" element={<Main><EditEvent /></Main>} />
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
