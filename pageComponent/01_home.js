import React, { useEffect } from 'react';
import axios from 'axios'
import { Form, Icon, Input, Button, Checkbox, List, Card } from 'antd';


const data = [
    {
        title: 'Title 1',
        content: 'One'
    },
    {
        title: 'Title 2',
        content: 'One'
    },
    {
        title: 'Title 3',
        content: 'One'
    },
    {
        title: 'Title 4',
        content: 'One'
    },
];

const Home = (props) => {
    useEffect(async () => {
        const result = await axios.get('http://localhost:5000/api/getData')
        console.log(result.data)
    })
    const { getFieldDecorator } = props.form;

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                // setROI(values.test);
            }
        });
    };

    return (
        <>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <Card title={item.title}>{item.content}</Card>
                    </List.Item>
                )}
            />

            <Form onSubmit={handleSubmit} className="login-form">

                <Form.Item>
                    <p>Adding Test</p>
                    {getFieldDecorator('gridSize', {
                        rules: [{ required: false, message: 'Grid size (%)' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Grid size %"
                        />,
                    )}
                </Form.Item>

                <Form.Item>
                    <p>Delete</p>
                    {getFieldDecorator('gridSize', {
                        rules: [{ required: true, message: 'Grid size (%)' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Grid size %"
                        />,
                    )}
                </Form.Item>

                <Form.Item>
                    <p>Delete</p>
                    {getFieldDecorator('gridSize', {
                        rules: [{ required: true, message: 'Grid size (%)' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Grid size %"
                        />,
                    )}
                </Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Save
            </Button>
            </Form>
        </>
            )
        }
        
const WrappedHomeForm = Form.create({name: 'test' })(Home);
export default WrappedHomeForm