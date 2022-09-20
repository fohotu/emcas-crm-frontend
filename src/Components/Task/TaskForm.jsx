import React from 'react'

function TaskForm() {
  return (
    <div>
        <Card>
            <Form form = {form}  name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                 <Form.Item
                        name = "title"
                        rules = {[
                                    {
                                        required: true,
                                        message: 'Please input task title!',
                                    },
                                    {
                                        min:3,
                                    },
                                ]}
                        >
                            <Input  />
                    </Form.Item>
                    <Form.Item
                        name = "description"
                        rules = {[
                            {
                                required: true,
                                message: 'Please input task description!',
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name = "files" >
                            <Upload {...uploadOptions} >
                                <Button type = "danger" shape = "round" size="large" icon={<UploadOutlined />}>Загрузить файл</Button>
                            </Upload>
                    </Form.Item> 
                    <Form.Item 
                        name = "category"
                        label = "Выберите категорию"
                        rules = {[
                            {
                                required: true,
                                message: 'Please select category!',
                            },
                        ]}
                    >
                        <Radio.Group options={options}  onChange ={(e) =>{setCategory(e.target.value)}} />                 
                    </Form.Item>  
                    <Form.Item
                            name = "job"
                            rules = {[
                            {
                                required: true,
                                message: 'Please select job!',
                            },
                            ]}
                        >
                        <Select>
                            {
                                workList.map((work) => {
                                    return (
                                        <Select.Option key = {work.id} value={work.id}>{work.title}</Select.Option>
                                    ) 
                                })
                            }
                        </Select>
                    </Form.Item>    

                </Form>    
            </Card>
    </div>
  )
}

export default TaskForm