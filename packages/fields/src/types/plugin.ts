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
          'input-btn'?: string;
          'input-icon'?: string;
        };
      groups: {
        inputText: CommonClasses & {
          'input-btn'?: string;
        };
        inputCheckable: CommonClasses;
        inputFieldset: CommonClasses & FieldsetClasses;
      };
      fields: {
        checkboxes: CommonClasses & FieldsetClasses;
        checkbox: CommonClasses;
        color: CommonClasses;
        date: CommonClasses & {
          'input-btn'?: string;
        };
        datetimeLocal: CommonClasses & {
          'input-btn'?: string;
        };
        email: CommonClasses & {
          'input-btn'?: string;
        };
        file: CommonClasses & {
          'input-btn'?: string;
        };
        number: CommonClasses & {
          'input-btn'?: string;
        };
        password: CommonClasses & {
          'input-btn'?: string;
        };
        radio: CommonClasses & FieldsetClasses;
        range: CommonClasses;
        search: CommonClasses & {
          'input-btn'?: string;
        };
        select: CommonClasses & {
          'input-icon'?: string;
        };
        tel: CommonClasses & {
          'input-btn'?: string;
        };
        textarea: CommonClasses & {
          'input-btn'?: string;
        };
        text: CommonClasses & {
          'input-btn'?: string;
        };
        time: CommonClasses & {
          'input-btn'?: string;
        };
        url: CommonClasses & {
          'input-btn'?: string;
        };
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
