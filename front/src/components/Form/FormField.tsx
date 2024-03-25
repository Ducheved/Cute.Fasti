import { Component, JSX } from 'solid-js';

interface FormFieldProps {
  label: string;
  ico: JSX.Element;
  type?: string;
  value: string;
  onChange: (event: Event) => void;
  error?: string;
  min?: string;
  max?: string;
  children?: JSX.Element;
}

const FormField: Component<FormFieldProps> = (props) => {
  console.log(props.children);
  return (
    <div class="nyaField">
      <label class="nyaLable">
        {props.ico}
        <span class="">{props.label}</span>
      </label>
      {props.children ? props.children : <input type={props.type || 'text'} class="" value={props.value} onInput={props.onChange} min={props.min} max={props.max} />}
      {props.error && (
        <label class="nyaErrorLable">
          <span>{props.error}</span>
        </label>
      )}
    </div>
  );
};

export default FormField;
