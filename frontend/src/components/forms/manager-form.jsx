import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Form, Input, Select, Row, Col } from "antd"
import { MANAGER, FORM } from "lib/common-types"
import { defaultValidateMessages, defaultFormLayout } from "lib/constants"
import useTeams from "data/use-teams"

const ManagerForm = ({ form, initialManager, onSubmit }) => {
  const { teams, loadingTeams, loadTeams } = useTeams()

  useEffect(() => {
    loadTeams()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Form
      {...defaultFormLayout}
      form={form}
      initialValues={initialManager}
      validateMessages={defaultValidateMessages}
      onFinish={onSubmit}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
            <Input type="text" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
            <Input type="text" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Job Title" name="jobTitle" rules={[{ required: true }]}>
        <Input type="text" />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{ required: true }, { type: "email" }]}>
        <Input type="email" />
      </Form.Item>
      <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
        <Input type="tel" />
      </Form.Item>
      <Form.Item label="Team" name="teamId" rules={[{ required: true }]}>
        <Select>
          {loadingTeams ||
            teams.map(({ id, name }) => (
              <Select.Option value={id} key={id}>
                {name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
    </Form>
  )
}

ManagerForm.defaultProps = {
  initialManager: {},
}
ManagerForm.propTypes = {
  form: PropTypes.shape(FORM).isRequired,
  initialManager: PropTypes.shape(MANAGER),
  onSubmit: PropTypes.func.isRequired,
}

export default ManagerForm
