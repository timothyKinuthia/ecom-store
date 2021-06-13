import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import {Pagination, Col, Row } from 'antd';
import ProductCard from '../cards/ProductCard';
import { getProducts, getProductsCount } from '../../functions/product';
import LoadingCard from '../cards/LoadingCard';


const NewArrivals = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productsCount, setProductsCount] = useState(0);
    const [page, setPage] = useState(1);


    useEffect(() => {
        loadProducts();
    }, [page])

    useEffect(() => {
        getProductsCount().then(res => {
            setProductsCount(res.data.total)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    //SORT, ORDER, LIMIT
    const loadProducts = () => {
        setLoading(true)
        getProducts('createdAt', 'desc', page).then(res => {
            setLoading(false);
            setProducts(res.data.products);
        }).catch(err => {
            setLoading(false);
            console.log(err)
        })
    }


    return (
        <>
            {loading ? (<LoadingCard count={3} />) :
            (<Grid container spacing={2} style={{marginLeft: '1rem', marginRight: '2rem'}} justify="space-around" wrap="wrap">
                {products.length > 0 && products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </Grid>)}
            <Row style={{padding: '2rem 0'}} justify="center">
                <Col span={12} offset={6}>
                    <Pagination current={page} total={(productsCount/3) * 10} onChange={val => setPage(val)} />
                </Col>
            </Row>
        </>
    )
}

export default NewArrivals