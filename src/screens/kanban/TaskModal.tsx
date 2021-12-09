import React, { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { useTaskModal, useTaskQueryKey } from "./utils";
import { useDeleteTask, useEditTask } from "utils/task";
import { Button, Form, Input, Modal } from "antd";
import UserSelect from "components/user-select";
import TaskTypeSelect from "components/task-type-select";

interface IProps {}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const TaskModal: React.FC<IProps> = (props) => {
  const [form] = useForm();
  const { editingTaskId, editTaskDetail, closeTask } = useTaskModal();

  const { mutateAsync: editTask } = useEditTask(useTaskQueryKey());
  const { mutateAsync: deleteMutate } = useDeleteTask(useTaskQueryKey());

  const close = () => {
    form.resetFields();
    closeTask();
  };
  const onOk = async () => {
    await editTask({ ...editTaskDetail, ...form.getFieldsValue() });
    close();
  };

  useEffect(() => {
    form.setFieldsValue(editTaskDetail);
  }, [editTaskDetail, form]);

  const deleteTask = () => {
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除看板吗？",
      onOk() {
        close();
        return deleteMutate({ id: Number(editingTaskId) });
      },
    });
  };

  return (
    <Modal
      forceRender={true}
      onOk={onOk}
      onCancel={close}
      visible={!!editingTaskId}
      okText="确认"
      cancelText="取消"
      title="编辑任务"
    >
      <Form {...layout} initialValues={editTaskDetail} form={form}>
        <Form.Item
          label="任务名"
          name="name"
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="经办人"
          name="processorId"
          rules={[{ required: true, message: "请输入经办人" }]}
        >
          <UserSelect defaultOptionName="经办人" />
        </Form.Item>
        <Form.Item
          label="类型"
          name="typeId"
          rules={[{ required: true, message: "请输入类型" }]}
        >
          <TaskTypeSelect />
        </Form.Item>
      </Form>
      <div style={{ textAlign: "right" }}>
        <Button onClick={deleteTask}>删除</Button>
      </div>
    </Modal>
  );
};

export default TaskModal;
