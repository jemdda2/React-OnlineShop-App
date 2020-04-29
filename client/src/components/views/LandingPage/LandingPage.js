import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Icon, Col, Card, Row } from 'antd';
import Axios from 'axios';

import ImageSlider from '../../utils/ImageSlider'
import CheckBox from './Sections/CheckBox'

const { Meta } = Card;

function LandingPage() {

    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);
    const [PostSize, setPostSize] = useState(0);

    useEffect(() => {

        const variables = {
            skip: Skip,
            limit: Limit
        }

        getProducts(variables);
    }, [])

    const getProducts = (variables) => {
        Axios.post('/api/product/getProducts', variables)
        .then(response => {
            if (response.data.success) {
                setProducts([...Products, ...response.data.products])
                setPostSize(response.data.postSize)
            } else {
                alert('Failed to factch product datas')
            }
        })
    }

    const onLoadMore = () => {
        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit
        }

        getProducts(variables);
        setSkip(skip);
    }

    const renderCards = Products.map((product, index) => {

        return <Col lg={6} md={8} xs={24} key={index}>
            <Card
                Hoverable={true}
                cover={<ImageSlider images={product.images}/>}
            >
                <Meta
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
        </Col>
    })

    const handleFilters = (filters, category) => {

    }

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>


            <div style={{ textAlign: 'center' }}>
                <h2> Let's Travel Anywhere <Icon type="rocket" /> </h2>
            </div>

            {/* { Filter } */}
            <CheckBox 
                handleFilters={filters => handleFilters(filters, "continents")}
            />

            {/* { Search } */}
            {Products.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No post yet...</h2>
                </div>  :
                <div>
                    <Row gutter={[16, 16]}>
                        {renderCards}
                    </Row>
                </div>
                
            }
            <br /><br />

            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={onLoadMore}>Load More</button>
                </div>            
            }

        </div>
    )
}

export default LandingPage
