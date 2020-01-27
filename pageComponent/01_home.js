import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';

const Home = () => {
    //State
    const [data, setData] = useState([]);
    const [rawData, setRawData] = useState('');

    useEffect(() => {
        getData()
    }, [setData])

    const getData = async () => {
        const result = await axios.get('http://localhost:5000/api/getData');
        console.log(result.data);
        setData(result.data);
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: '1',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Value',
            dataIndex: 'data',
            key: '2',
            onFilter: (value, record) => record.value.indexOf(value) === 0,
            sorter: (a, b) => a.data - b.data,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Time and Date',
            dataIndex: 'date',
            key: '3',
            onFilter: (value, record) => record.value.indexOf(value) === 0,
            sorter: (a, b) => a.date.length - b.data.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'x',
            render: (text, record, index) => <a onClick={() => deleteData(index)}>Delete</a>,
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }

    const postData = async () => {
        try {
            await axios.post('http://localhost:5000/api/addData', { data: rawData })
            console.log(`Posted ${rawData}`)
        } catch (err) {
            console.log(err);
        }
    }

    const updateData = async (id) => {

    }

    const deleteData = async (id) => {
        try {
            await axios.put('http://localhost:5000/api/deleteData', { data: id })
            console.log(`Delete ${id}`);
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }



    return (
        <>
            <button onClick={getData}>Refresh Data</button>
            <form onSubmit={handleSubmit}>
                <input
                    value={rawData}
                    type='text'
                    onChange={(event) => setRawData(event.target.value)}
                />

                <button type="submit" onClick={postData}>Submit</button>
            </form>
            <Table columns={columns} dataSource={data} onChange={onChange} />
        </>
    )
}

export default Home