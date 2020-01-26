import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [data, setData] = useState([])
    const [test, setTest] = useState('')
    const getData = async () => {
        const result = await axios.get('http://localhost:5000/api/getData')
        console.log(result.data)
        setData(result.data)
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
                <div key={index}>{item.id}</div>
            )}
            <form onSubmit = {handleSubmit}>
                <input
                    value={test}
                    type='text'
                    onChange={(event) => setTest(event.target.value)}
                />

                <button type="submit">Submit</button>
            </form>
            <div>Test: {test}</div>
        </>
    )
}
export default Home