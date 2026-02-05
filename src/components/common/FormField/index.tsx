import React from 'react';

import { Checkbox, Col, DatePicker, Form, Input, InputNumber, Radio, Select, Upload } from 'antd';
import { PatternFormat } from 'react-number-format';

import * as PropType from './types';

export const RenderTextInput: React.FC<PropType.IRenderTextInputProps> = (props) => {
  const { colProps, formItemProps, inputProps, colClassName = '' } = props;
  return (
    <Col {...colProps} className={colClassName}>
      <Form.Item {...formItemProps} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Input {...inputProps} size={inputProps.size ?? 'middle'} />
      </Form.Item>
    </Col>
  );
};

export const RenderTextAreaInput: React.FC<PropType.IRenderTextAreaInputProps> = (props) => {
  const { colProps, formItemProps, inputProps, colClassName = '' } = props;
  return (
    <Col {...colProps} className={colClassName}>
      <Form.Item {...formItemProps} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Input.TextArea {...inputProps} size={inputProps.size ?? 'middle'} />
      </Form.Item>
    </Col>
  );
};

export const RenderNumberInput: React.FC<PropType.IRenderNumberInputProps> = (props) => {
  const { colProps, formItemProps, inputProps, colClassName = '' } = props;
  return (
    <Col {...colProps} className={colClassName}>
      <Form.Item {...formItemProps} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <InputNumber
          {...inputProps}
          size={inputProps.size ?? 'middle'}
          style={{ ...inputProps.style }}
        />
      </Form.Item>
    </Col>
  );
};

export const RenderPasswordInput: React.FC<PropType.IRenderPasswordInputProps> = (props) => {
  const { colProps, formItemProps, inputProps, colClassName = '' } = props;
  return (
    <Col {...colProps} className={colClassName}>
      <Form.Item {...formItemProps} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Input.Password {...inputProps} size={inputProps.size ?? 'middle'} />
      </Form.Item>
    </Col>
  );
};

export const RenderSelect: React.FC<PropType.IRenderSelectProps> = (props) => {
  const { colProps, formItemProps, inputProps, colClassName = '' } = props;
  return (
    <Col {...colProps} className={colClassName}>
      <Form.Item {...formItemProps} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Select {...inputProps} size={inputProps.size ?? 'middle'} />
      </Form.Item>
    </Col>
  );
};

export const RenderSearchInput: React.FC<PropType.IRenderSearchInputProps> = (props) => {
  const { colProps, formItemProps, inputProps, colClassName = '' } = props;
  return (
    <Col {...colProps} className={colClassName}>
      <Form.Item {...formItemProps} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Input.Search {...inputProps} size={inputProps.size ?? 'middle'} />
      </Form.Item>
    </Col>
  );
};

export const RenderDatePickerInput: React.FC<PropType.IRenderDatePickerInputProps> = (props) => {
  const { colProps, formItemProps, inputProps, colClassName = '' } = props;
  return (
    <Col {...colProps} className={colClassName}>
      <Form.Item {...formItemProps} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <DatePicker {...inputProps} size={inputProps.size ?? 'middle'} />
      </Form.Item>
    </Col>
  );
};

export const RenderCheckboxInput: React.FC<PropType.IRenderCheckboxInputProps> = (props) => {
  const { colProps, formItemProps, inputProps, colClassName = '', children } = props;
  return (
    <Col {...colProps} className={colClassName}>
      <Form.Item {...formItemProps} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Checkbox {...inputProps}>{children}</Checkbox>
      </Form.Item>
    </Col>
  );
};

export const RenderCheckboxGroupInput: React.FC<PropType.IRenderCheckboxGroupInputProps> = (
  props
) => {
  const { colProps, formItemProps, inputProps, colClassName = '', options } = props;
  return (
    <Col {...colProps} className={colClassName}>
      <Form.Item {...formItemProps} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Checkbox.Group {...inputProps}>
          {options?.map((option) => (
            <Checkbox {...option} key={option.id || option.value}>
              {option.label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </Form.Item>
    </Col>
  );
};

export const RenderRadioInput: React.FC<PropType.IRenderRadioInputProps> = (props) => {
  const { colProps, formItemProps, inputProps, colClassName = '' } = props;
  return (
    <Col {...colProps} className={colClassName}>
      <Form.Item {...formItemProps} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Radio {...inputProps} />
      </Form.Item>
    </Col>
  );
};

export const RenderRadioGroupInput: React.FC<PropType.IRenderRadioGroupInputProps> = (props) => {
  const { colProps, formItemProps, inputProps, colClassName = '' } = props;
  return (
    <Col {...colProps} className={colClassName}>
      <Form.Item {...formItemProps} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Radio.Group
          {...inputProps}
          size={inputProps.size ?? 'middle'}
          buttonStyle={inputProps?.buttonStyle ?? 'solid'}
        />
      </Form.Item>
    </Col>
  );
};

export const RenderUploadInput: React.FC<PropType.IRenderUploadInputProps> = (props) => {
  const { colProps, formItemProps, inputProps, colClassName = '' } = props;
  return (
    <Col {...colProps} className={colClassName}>
      <Form.Item {...formItemProps} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Upload
          {...inputProps}
          accept={inputProps?.accept ?? 'image/*'}
          beforeUpload={inputProps?.beforeUpload ?? undefined}
        />
      </Form.Item>
    </Col>
  );
};

export const RenderPatternFormatInput: React.FC<PropType.IRenderPatternFormatInputProps> = (
  props
) => {
  const { colProps, formItemProps, inputProps, colClassName = '', format } = props;
  return (
    <Col {...colProps} className={colClassName}>
      <Form.Item
        {...formItemProps}
        validateFirst={true}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        className={`${formItemProps?.className ?? ''} patter-format-wrap`}
        getValueFromEvent={(e) => {
          // Extract only numeric value for form state
          const numericValue = e.target.value.replace(/\D/g, '');
          return numericValue;
        }}
      >
        <PatternFormat
          size="middle"
          {...inputProps}
          format={format ?? '(###) ###-####'}
          customInput={Input}
        />
      </Form.Item>
    </Col>
  );
};

export const TableInput: React.FC<{
  value: string;
  maxLength?: number;
  onChange: (value: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
}> = ({ value, maxLength, onChange, placeholder, style }) => {
  return (
    <Input
      value={value}
      className="border-lg"
      maxLength={maxLength}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      style={style}
    />
  );
};

export const TableTextArea: React.FC<{
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  style?: React.CSSProperties;
}> = ({ value, onChange, rows = 2, placeholder, style }) => {
  return (
    <Input.TextArea
      className="border-lg"
      value={value}
      rows={rows}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      style={{ resize: 'none', ...style }}
    />
  );
};

export const TableInputNumber: React.FC<{
  value: number | undefined;
  onChange: (value: number | null) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  min?: number;
  max?: number;
}> = ({ value, onChange, placeholder, style, min = 0, max = 100 }) => {
  const allowNegative = min < 0;

  return (
    <InputNumber
      className="border-lg"
      value={value}
      controls={false}
      placeholder={placeholder}
      onChange={onChange}
      max={max}
      min={min}
      style={style}
      onKeyDown={(e) => {
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

        // allow control keys
        if (allowedKeys.includes(e.key)) return;

        // allow minus sign only at the start if negative values are allowed
        if (allowNegative && e.key === '-') {
          const input = e.currentTarget as HTMLInputElement;
          const cursorPosition = input.selectionStart || 0;
          const currentValue = input.value || '';
          if (cursorPosition === 0 && !currentValue.includes('-')) {
            return;
          }
        }

        // allow digits only
        if (!/^\d$/.test(e.key)) {
          e.preventDefault();
        }
      }}
    />
  );
};
