export interface CommonClasses {
  outer?: string;
  wrapper?: string;
  label?: string;
  inner?: string;
  prefix?: string;
  suffix?: string;
  input?: string;
  help?: string;
  message?: string;
  'input-btn'?: string;
}

export interface FieldsetClasses {
  fieldset?: string;
  legend?: string;
  options?: string;
  option?: string;
}
export interface PluginOptions {
  theme: {
    classes: {
      global: CommonClasses &
        FieldsetClasses & {
          'input-icon'?: string;
        };
      groups: {
        inputText: CommonClasses;
        inputCheckable: CommonClasses;
        inputFieldset: CommonClasses & FieldsetClasses;
      };
      fields: {
        checkboxes: CommonClasses & FieldsetClasses;
        checkbox: CommonClasses;
        color: CommonClasses;
        date: CommonClasses;
        datetimeLocal: CommonClasses;
        email: CommonClasses;
        file: CommonClasses;
        number: CommonClasses;
        password: CommonClasses;
        radio: CommonClasses & FieldsetClasses;
        range: CommonClasses;
        search: CommonClasses;
        select: CommonClasses & {
          'input-icon'?: string;
        };
        tel: CommonClasses;
        textarea: CommonClasses;
        text: CommonClasses;
        time: CommonClasses;
        url: CommonClasses;
      };
    };
    icons: {
      clear: string;
      visibilityOn: string;
      visibilityOff: string;
      select: string;
    };
  };
  messages: {
    required: string;
    text: {
      minLength: string;
      maxLength: string;
      pattern: string;
    };
    password: {
      confirm: string;
    };
    email: {
      valid: string;
    };
    url: {
      valid: string;
    };
    number: {
      min: string;
      max: string;
    };
    file: {
      accept: string;
      maxSize: string;
    };
    date: {
      valid: string;
      min: string;
      max: string;
    };
    datetime: {
      valid: string;
      min: string;
      max: string;
    };
    time: {
      valid: string;
      min: string;
      max: string;
    };
    actions: {
      clear: string;
      setVisible: string;
      setNotVisible: string;
    };
  };
}
