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
    actions: {
      clear: string;
      setVisible: string;
      setNotVisible: string;
    };
  };
}
