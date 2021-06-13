import React, { useState, useEffect } from 'react';
import AdminNav from '../../components/nav/AdminNav';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { Divider } from '@material-ui/core';
import { getAllOrders, changeStatus } from '../../functions/admin';
import { toast } from 'react-toastify';
import Orders from '../../components/order/Orders';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);

    const { user } = useSelector(state => ({ ...state }));

    useEffect(() => {
        loadOrders()
    }, [])

    const loadOrders = () => {
        getAllOrders(user.token).then(res => {
            setOrders(res.data)
        })
    }

    const handleStatusChange = (orderId, orderStatus) => {
        changeStatus(orderId, orderStatus, user.token).then(res => {
            toast.success('Status Updated');
            loadOrders();
        })


    }

    return (
        <Grid container>
            <Grid item lg={2} md={2} sm={3} xs={12}>
                <AdminNav/>
            </Grid>
            <Grid item container direction="column" lg={10} md={10} sm={9} xs={12} spacing={3}>
                <Grid item>
                    <h4>All Products</h4>
                </Grid>
                <Divider/>
                <Grid item container spacing={2}>
                    <Orders orders={orders} handleStatusChange={handleStatusChange} />
                </Grid>
            </Grid>
        </Grid>
    ) 
}

export default AdminDashboard
