const getAllPost = async () => {
    try {
        const responseApi = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await responseApi.json()
        return data
    } catch (error) {
        console.error('Err', error)
        return null
    }
}

export default getAllPost