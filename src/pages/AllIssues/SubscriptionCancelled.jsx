import React from 'react';

const SubscriptionCancelled = () => {
    return (
         <div>
            <h2> Subscription payment is cancelled. Please try again</h2>
            <Link to="/all-issues">
            <button className='btn btn-primary text-black'>Try Again</button></Link>
        </div>
    );
};

export default SubscriptionCancelled;