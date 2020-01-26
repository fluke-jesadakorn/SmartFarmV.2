import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [data, setData] = useState([])
    const [rawData, setRawData] = useState('')
    const getData = async () => {
        const result = await axios.get('http://localhost:5000/api/getData')
        console.log(result.data)
        setData(result.data)
    }

    const postData = async () => {
        try {
            await axios.post('http://localhost:5000/api/addData', { data: rawData })
            console.log(`Posted ${rawData}`)
        } catch (err) {
            console.log(err)
        }
    }

    const updateData = async(id) => {

    }

    const deleteData = async (id) => {

    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    useEffect(() => {
        getData()
    }, [setData])
    // if (loading) return <p>Loading...</p>
    // if (error) return <p>Error!</p>

    return (
        <>
            {data.map((item, index) =>
                <div key={index.id}>{item.id}</div>
            )}
            <form onSubmit={handleSubmit}>
                <input
                    value={rawData}
                    type='text'
                    onChange={(event) => setRawData(event.target.value)}
                />

                <button type="submit" onClick={postData}>Submit</button>
            </form>
            <button onClick = {getData}>Refresh Data</button>
        </>
    )
}
export default Home