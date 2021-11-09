import { Select } from "antd";
import React from "react";
import { Raw } from "../type/index";

interface IProps
  extends Omit<
    SelectProps,
    "value" | "onChange" | "defaultOptionValue" | "options"
  > {
  value: Raw | undefined | null;
  onChange: (value?: number) => void;
  defaultOptionValue?: string;
  options: { name: string; id: number }[];
}

//TODO:要求自己封装的组件还要可以透传原组件本身的类型属性

type SelectProps = React.ComponentProps<typeof Select>;

const IdSelect: React.FC<IProps> = (props) => {
  const { value, onChange, defaultOptionValue, options, ...restProps } = props;
  return (
    <Select
      value={toNumber(value)}
      onChange={(value) => onChange(Number(value) || undefined)}
      {...restProps}
    >
      {defaultOptionValue ? (
        <Select.Option value={0}>{defaultOptionValue}</Select.Option>
      ) : null}
      {options?.map((item) => (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));

export default IdSelect;
