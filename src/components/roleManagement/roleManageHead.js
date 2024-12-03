import React from 'react';
import {  useNavigate } from 'react-router-dom';

import Button from '../button/button';
import Card from '../card/card';

function RoleHead() {
const navigate=useNavigate()

   
const handleClick=()=>{
    navigate("/createRole")
}
  
    return (
        <div className='mb-3'>
            <Card>
                <div className='d-flex justify-content-between align-items-center'>
                    <h3>Role Management</h3>
                    <div className='d-flex justify-content-between gap-2'>
                        <Button type="button" name="Create Role"      featureName="Role Management"
                            permissionName="Create" onClick={handleClick} />
                    </div>
                </div>
            </Card>

       
        </div>
    );
}

export default RoleHead;
