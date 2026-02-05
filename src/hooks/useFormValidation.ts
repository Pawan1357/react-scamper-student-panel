import { useState } from 'react';

import { FormInstance } from 'antd';

export function useFormValidation(form: FormInstance) {
  const [isFormValid, setIsFormValid] = useState(false);

  const onFieldsChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length > 0);
    const touched = form.isFieldsTouched(true);
    setIsFormValid(touched && !hasErrors);
  };

  return { isFormValid, onFieldsChange };
}
