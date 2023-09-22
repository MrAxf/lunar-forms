export interface PluginOptions {
  theme: {
    classes: {
      outer: string;
      wrapper: string;
      label: string;
      inner: string;
      prefix: string;
      suffix: string;
      input: string;
      'input-btn': string;
      'input-icon': string;
      help: string;
      message: string;
      fieldset: string;
      legend: string;
      options: string;
      option: string;
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
      minLenght: string;
      maxLenght: string;
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
    actions: {
      clear: string;
      setVisible: string;
      setNotVisible: string;
    };
  };
}
