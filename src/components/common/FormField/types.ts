import React from 'react';

import {
  CheckboxProps,
  ColProps,
  DatePickerProps,
  FormItemProps,
  InputNumberProps,
  InputProps,
  RadioGroupProps,
  RadioProps,
  SelectProps,
  UploadProps
} from 'antd';
import type * as AntdType from 'antd';
import { CheckboxGroupProps, CheckboxOptionType } from 'antd/es/checkbox';
import { TextAreaProps } from 'antd/es/input';
import { PatternFormatProps } from 'react-number-format';

// Generic interface for shared properties
interface IBaseInputProps<InputPropsType> {
  colProps?: ColProps;
  formItemProps?: FormItemProps;
  inputProps: InputPropsType;
  colClassName?: string;
}

// Interfaces using the base interface
// Types
export type IRenderTextInputProps = IBaseInputProps<InputProps>;
export type IRenderPasswordInputProps = IBaseInputProps<InputProps>;
export type IRenderNumberInputProps = IBaseInputProps<InputNumberProps>;
export type IRenderTextAreaInputProps = IBaseInputProps<TextAreaProps>;
export type IRenderSelectProps = IBaseInputProps<SelectProps>;
export type IRenderSearchInputProps = IBaseInputProps<InputProps>;
export type IRenderDatePickerInputProps = IBaseInputProps<DatePickerProps>;
export interface IRenderCheckboxInputProps extends IBaseInputProps<CheckboxProps> {
  children?: React.ReactNode;
}
export type IRenderUploadInputProps = IBaseInputProps<UploadProps>;
export type IRenderRadioGroupInputProps = IBaseInputProps<RadioGroupProps>;
export type IRenderRadioInputProps = IBaseInputProps<RadioProps>;

// Interface
export interface IRenderCheckboxGroupInputProps<T = any>
  extends IBaseInputProps<CheckboxGroupProps<T>> {
  options?: Array<CheckboxOptionType<T>>;
  checkboxName?: string;
}

export interface IRenderPatternFormatInputProps
  extends IBaseInputProps<Omit<PatternFormatProps<AntdType.InputProps>, 'format'>> {
  format?: PatternFormatProps['format'];
}
