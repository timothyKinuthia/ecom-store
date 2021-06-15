import React, {useState, useEffect, useCallback} from 'react';
import Grid from '@material-ui/core/Grid';
import ProductCard from '../cards/ProductCard';
import LoadingCard from '../cards/LoadingCard';
import { getProducts, getProductsCount } from '../../functions/product';
import {Pagination, Col, Row } from 'antd';


const BestSellers = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productsCount, setProductsCount] = useState(0);
    const [page, setPage] = useState(1);

    const loadProducts = useCallback(() => {
        setLoading(true)
        getProducts('sold', 'desc', page).then(res => {
            setLoading(false);
            setProducts(res.data.products);
        }).catch(err => {
            setLoading(false);
            console.log(err)
        })
    }, [page]);

    useEffect(() => {
        loadProducts();
    }, [page, loadProducts]);

    useEffect(() => {
        getProductsCount().then(res => {
            setProductsCount(res.data.total)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    //SORT, ORDER, LIMIT



    return (
        <>
            {loading ? (<LoadingCard count={3} />) :
            (<Grid container spacing={2} justify="space-around" style={{marginLeft: '1rem', marginRight: '2rem'}} wrap="wrap">
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

export default BestSellers