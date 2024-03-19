import { Component } from 'solid-js';

interface FormFieldProps {
  label: Element | string;
  ico: any;
  type?: string;
  value: string;
  onChange: (event: Event) => void;
  error?: string;
  min?: string;
  max?: string;
}

const FormField: Component<FormFieldProps> = (props) => {
  return (
    <div class="nyaField">
      <label class="nyaLable">
        {props.ico}
        <span class="">{props.label}</span>
      </label>
      <input type={props.type || 'text'} class="" value={props.value} onInput={props.onChange} min={props.min} max={props.max} />
      {props.error && (
        <label class="nyaErrorLable">
          <span>{props.error}</span>
        </label>
      )}
    </div>
  );
};

export default FormField;
