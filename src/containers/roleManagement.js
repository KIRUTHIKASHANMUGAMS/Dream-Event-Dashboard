import React from 'react';
import { Container } from 'react-bootstrap';

import RoleList from "../components/roleManagement/roleList"
import RoleMangeHead from "../components/roleManagement/roleManageHead"
function roleManagement() {
    return (
        <div>
            <Container fluid>
                <RoleMangeHead />
                <RoleList />
            </Container>
        </div>
    )
}

export default roleManagement
