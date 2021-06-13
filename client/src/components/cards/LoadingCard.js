
import React from 'react';
import {Skeleton, Card} from 'antd'

const LoadingCard = ({ count }) => {
    const cards = () => {
        let totalCards = []

        for (let i = 0; i < count; i++){
            totalCards.push(
                <Card key={i} className='col md-4'>
                    <Skeleton active></Skeleton>
                </Card>
            )
        }

        return totalCards;
    }

    return <div className='row pb-5' >{cards()}</div>
}

export default LoadingCard;