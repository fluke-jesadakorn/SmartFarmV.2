import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Form, Icon, Input, Button, Checkbox, List, Card, Row, Col } from 'antd';

const Home = (props) => {
    // const [data, setData] = useState([
    //     {
    //         _id: 0,
    //         id: 0,
    //         data: '',
    //         date: '',
    //     }
    // ]);
    // useEffect(() => {
    //     const getData = async () => {
    //         const result = await axios('http://localhost:5000/api/getData')
    //         setData(result.data);

    //     }
    //     getData();
    // }, [])

    // const handleAddData = e => {
    //     e.preventDefault();
    //     console.log(e)
    // };
    // const handleUpdataData = e => {
    //     e.preventDefault();
    // };
    // const handleDeleteData = e => {
    //     e.preventDefault();
    // };
    // return (
    //     <>
    //         {
    //             data.map((item, key) => {
    //                 <div>{item.id} {item.data} {item.date} </div>
    //             })
    //         }

    //         {JSON.stringify(data)}

    //         <Form>
    //             <Input
    //                 prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
    //                 placeholder="Username"
    //             />
    //             <Button>AddData</Button>
    //         </Form>
    //     </>
    // )
    return (
        <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
        </Row>
      </div>
    )
}

export default Home