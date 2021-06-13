import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import { toast } from 'react-toastify';
import AdminNav from '../../../components/nav/AdminNav';
import { getProductsByCount, removeProduct } from '../../../functions/product';
import Grid from '@material-ui/core/Grid';
import {Spin} from 'antd';
import AdminCard from '../../../components/cards/AdminCard';
import { Divider } from '@material-ui/core';

const AllProducts = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = useSelector(state => ({ ...state }));

    useEffect(() => {
        loadProducts();
    }, [])

    const loadProducts = () => {
        setLoading(true);
        getProductsByCount(100).then(res => {
            setProducts(res.data.products);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            console.log(err);
            toast.error(err.response.data.error);
        })
    }

    const handleRemove = slug => {
        if (window.confirm('Delete product?')) {
            removeProduct(slug, user.token).then(res => {
            loadProducts();
            toast.warning(`"${slug}" is deleted`)
            }).catch(err => {
                console.log(err);
                toast.error(err.response.data.error)
            })
        }
    }

    return (
        <Grid container>
            <Grid item lg={2} md={2} sm={3} xs={12}>
                <AdminNav/>
            </Grid>
            <Grid item container direction="column" lg={10} md={10} sm={9} xs={12} spacing={3}>
                <Grid item>
                    {loading ? <Spin size="large" /> : <h4>All Products</h4>}
                </Grid>
                <Divider/>
                <Grid item container spacing={2}>
                    {products.length > 0 && products.map(product => (
                        <AdminCard key={product._id} product={product} handleRemove={handleRemove} />
                    ))}
                </Grid>
            </Grid>
        </Grid>
    ) 
}

export default AllProducts