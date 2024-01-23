const getAllProducts = async (skip) => {
    try {
        const responseApi = await fetch(
            `https://dummyjson.com/products?limit=10
            &skip=${skip}`
        )
        const data = await responseApi.json()
        return data
    } catch (error) {
        console.error('Err', error)
        return null
    }
}


const searchProduct = async (search) => {
    try {
        const responseApi = await fetch(
            `https://dummyjson.com/products/search?q=${search}`
        )
        const data = await responseApi.json()
        return data
    } catch (error) {
        console.error('Err', error)
        return null
    }
}



export {
    getAllProducts,
    searchProduct
}