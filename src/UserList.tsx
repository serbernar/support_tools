import React, {useState, useEffect} from 'react';
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import User from './User';
import {v4 as uuid4} from 'uuid';

type UserType = {
    id: string;
    name: string;
};


const UserList: React.FC = () => {
    const [users, setUsers] = useState<UserType[]>([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        }
    }, []);

    const generateId = () => {
        return uuid4();
    };

    const handleAddUser = () => {
        if (inputValue) {
            setUsers(prevUsers => [...prevUsers, {id: generateId(), name: inputValue}]);
            setInputValue("");
            localStorage.setItem("users", JSON.stringify([...users, {id: generateId(), name: inputValue}]));
        }
    };


    const moveUser = (dragId: string, hoverId: string) => {
        const dragIndex = users.findIndex((user: UserType) => user.id === dragId);
        const hoverIndex = users.findIndex((user: UserType) => user.id === hoverId);

        if (dragIndex === hoverIndex) return;

        const draggedUser = users[dragIndex];
        console.log("dragIndex:", dragIndex);
        console.log("hoverIndex:", hoverIndex);
        console.log("draggedUser:", draggedUser);

        const newUsers = [...users];
        newUsers.splice(dragIndex, 1);
        newUsers.splice(hoverIndex, 0, draggedUser);

        setUsers(newUsers);
    };


    return (
        <Box>
            <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter name"
            />
            <Button onClick={handleAddUser}>Add user</Button>
            {
                users.map((user: UserType) => (
                    <User
                        key={user.id}
                        id={user.id}
                        name={user.name}
                        moveUser={moveUser}
                    />
                ))
            }
        </Box>);
}

export default UserList;
