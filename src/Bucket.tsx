import React from 'react';

interface BucketProps {
    time: string;
}

const Bucket: React.FC<BucketProps> = ({ time }) => {
    return (
        <div>
            <h2>{time}</h2>
        </div>
    );
}

export default Bucket;
