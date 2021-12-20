import React, { useEffect } from "react";
import { Button, Drawer, DrawerProps, Form, Input, Spin } from "antd";
import styled from "styled-components";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useAddEpic } from "utils/epic";
import { useEpicsQueryKey } from "./utils";
import { useProjectIdInUrl } from "screens/kanban/utils";

type IProps = Pick<DrawerProps, "visible"> & { onClose: () => void };

const CreateEpic: React.FC<IProps> = (props) => {
  const [form] = useForm();
  const { mutate: addEpic, isLoading, error } = useAddEpic(useEpicsQueryKey());
  const projectId = useProjectIdInUrl();

  const onFinish = async (values: any) => {
    await addEpic({ ...values, projectId });
    props.onClose();
  };

  useEffect(() => {
    form.resetFields();
  }, [form, props.visible]);

  return (
    <Drawer
      visible={props.visible}
      onClose={props.onClose}
      forceRender={true}
      destroyOnClose={true}
      width="100%"
    >
      <Container>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <>
            <h1>创建任务组</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout="vertical"
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label="任务组名称"
                name="name"
                rules={[{ required: true, message: "请输入任务组名称" }]}
              >
                <Input placeholder="请输入任务组名称" />
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button loading={isLoading} type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

export default CreateEpic;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  flex-direction: column;
`;
