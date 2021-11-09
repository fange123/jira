import { Select } from "antd";
import React from "react";
import { Raw } from "../type/index";

interface IProps extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value: Raw | undefined | null;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

//TODO:要求自己封装的组件还要可以透传原组件本身的类型属性

type SelectProps = React.ComponentProps<typeof Select>;

const IdSelect: React.FC<IProps> = (props) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  const toNumber = (value: unknown) =>
    isNaN(Number(value)) ? 0 : Number(value);

  return (
    <Select
      value={toNumber(value)}
      onChange={(value) => onChange(Number(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((item) => (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default IdSelect;
