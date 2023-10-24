import React from 'react';
import UserList from './UserList';
import Bucket from './Bucket';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

const App: React.FC = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <UserList/>
                <Bucket time="8:00"/>
                <Bucket time="9:00"/>
            </div>
        </DndProvider>
    );
}

export default App;
