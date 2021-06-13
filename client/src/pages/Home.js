import React, {useEffect} from 'react';
import Typewriter from 'typewriter-effect';
import { Divider, PageHeader } from 'antd';
import NewArrivals from '../components/home/NewArrivals';
import BestSellers from '../components/home/BestSellers';
import CategoryList from '../components/category/CategoryList';
import SubList from '../components/sub/SubList';


const Home = ({history}) => {


    const style1 = {
        width: "100%",
        border: "1px solid rgb(235, 237, 240)",
        marginBottom: "2rem",
        backgroundColor: '#99F6E4',
        color: '#0D9488',
        fontFamily: 'Roboto',
        fontWeight: 700,
        fontSize: '48px',
        textAlign: 'center'

    }

    const style2 = {
        fontSize: '35px',
        textAlign: 'center',
        marginBottom: "2rem",
        fontWeight: '300'
    }

    return (
        <div>
            <PageHeader style={style1}>
                <Typewriter
                    options={{
                        strings: ['Welcome to Timtech', 'Hottest Products', 'Best Sellers'],
                        autoStart: true,
                        loop: true,
                    }}
                />
            </PageHeader>
            <PageHeader style={style2}>New Arrivals</PageHeader>
            <NewArrivals />
            <Divider/>
            <PageHeader style={style2}>Best Sellers</PageHeader>
            <BestSellers/>
            <br />
            <Divider/>
            <PageHeader style={style2}>Categories</PageHeader>
            <CategoryList />
            <br />
            <Divider/>
            <PageHeader style={style2}>Sub Categories</PageHeader>
            <SubList/>
            <br />
            <br/>
        </div>
    )
}

export default Home
