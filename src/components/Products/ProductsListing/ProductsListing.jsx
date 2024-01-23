import React, { memo, useContext } from 'react'
import Card from '../../Card/Card';
import { MainContext } from '../../../providers/context/MainContext';

function ProductsListing({ products, handle }) {
    const { count } = useContext(MainContext)


    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                    <h2>COUNT = {count}</h2>
                {
                    products.map((product, index) => {
                        return <Card
                            title={product.title}
                            description={product.description}
                            image={product.thumbnail}
                        />
                    })
                }
            </div>
            <button
                onClick={handle}
            >Load More</button>
        </>
    )
}

export default memo(ProductsListing)