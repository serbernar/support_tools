import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface UserProps {
    id: string;
    name: string;
    moveUser: (dragId: string, hoverId: string) => void;
}

const User: React.FC<UserProps> = ({ id, name, moveUser }) => {
    const ref = React.useRef(null);

    const [, drop] = useDrop({
        accept: 'USER',
        hover: (item: any) => {
            if (!ref.current) return;
            moveUser(item.id, id);
            item.id = id;
        }
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'USER',
        item: { id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    drag(drop(ref));

    return (
        <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
            {name}
        </div>
    );
}

export default User;
