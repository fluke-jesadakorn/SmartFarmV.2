import React from 'react';
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
    const { getFieldDecorator } = props.form;
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

            <Form.Item>
                <p>Adding Test</p>
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
        </>
    )
}

const WrappedHomeForm = Form.create({ name: 'test' })(Home);
export default WrappedHomeForm