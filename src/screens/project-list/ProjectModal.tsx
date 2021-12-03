import React, { useEffect } from "react";
import { Button, Drawer, Form, Input, Spin } from "antd";
import { useProjectModal } from "./utils";
import UserSelect from "components/user-select";
import { useAddProject, useEditProject } from "utils/project";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";

interface IProps {}

const ProjectModal: React.FC<IProps> = (props) => {
  const { projectModalOpen, close, editProject, isLoading } = useProjectModal();
  const [form] = useForm();
  const title = editProject ? "编辑项目" : "创建项目";
  const useMutateProject = editProject ? useEditProject : useAddProject;
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject();
  const onFinish = (value: any) => {
    mutateAsync({ ...editProject, ...value }).then((res) => {
      form.resetFields();
      close();
    });
  };

  useEffect(() => {
    form.setFieldsValue(editProject);
  }, [editProject, form]);
  return (
    <Drawer visible={projectModalOpen} width="100%" onClose={close}>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <>
          <h1>{title}</h1>
          <ErrorBox error={error} />
          <Form
            form={form}
            layout="vertical"
            style={{ width: "40rem" }}
            onFinish={onFinish}
          >
            <Form.Item
              label="项目名称"
              name="name"
              rules={[{ required: true, message: "请输入项目名称" }]}
            >
              <Input placeholder="请输入项目名称" />
            </Form.Item>
            <Form.Item
              label="部门"
              name="organization"
              rules={[{ required: true, message: "请输入部门名称" }]}
            >
              <Input placeholder="请输入部门名称" />
            </Form.Item>
            <Form.Item
              label="负责人"
              name="personId"
              rules={[{ required: true, message: "请输入负责人名称" }]}
            >
              <UserSelect defaultOptionName="负责人" />
            </Form.Item>
            <Form.Item>
              <Button loading={mutateLoading} type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </Drawer>
  );
};

export default ProjectModal;
