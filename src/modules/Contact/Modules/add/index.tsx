import { useQueryClient } from '@tanstack/react-query';
import { Button, Form, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import { showToaster } from 'utils/functions';
import { REGEX } from 'utils/regex';

import { contactHooks, contactQueryKeys } from 'services/contactUs';

import { RenderTextAreaInput, RenderTextInput } from 'components/common/FormField';
import HeaderToolbar from 'components/common/HeaderToolbar';

import { AddContactFormWrapper } from './AddContact.styled';

const AddContact = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate: mutateCreateContact, isPending } = contactHooks.useCreate();

  const onSubmit = (values: { title: string; description: string }) => {
    mutateCreateContact(values, {
      onSuccess: (response) => {
        showToaster('success', response?.message);
        queryClient.invalidateQueries({ queryKey: contactQueryKeys.all });
        navigate(-1);
      },
      onError: (error) => {
        showToaster('error', error?.message);
      }
    });
  };

  return (
    <>
      <HeaderToolbar title="Contact Admin" backBtn />

      <AddContactFormWrapper>
        <div className="shadow-paper create-sub-admin-flow">
          <Form form={form} layout="vertical" autoComplete="off" onFinish={onSubmit}>
            <Row gutter={[30, 30]} className="d-flex justify-content-center mt-20">
              <RenderTextInput
                colProps={{ xs: 24 }}
                formItemProps={{
                  name: 'title',
                  label: 'Title',
                  required: true,
                  rules: [
                    {
                      required: true,
                      message: 'Please enter title.'
                    },
                    {
                      pattern: REGEX.BLANK_SPACE,
                      message: 'Please enter a valid title.'
                    }
                  ]
                }}
                inputProps={{
                  maxLength: 200,
                  placeholder: 'Enter Title',
                  size: 'large'
                }}
              />

              <RenderTextAreaInput
                colProps={{ xs: 24 }}
                formItemProps={{
                  name: 'description',
                  label: 'Description',
                  required: true,
                  rules: [
                    {
                      required: true,
                      message: 'Please enter description.'
                    },
                    {
                      pattern: REGEX.BLANK_SPACE,
                      message: 'Please enter a valid description.'
                    }
                  ]
                }}
                inputProps={{
                  placeholder: 'Enter Description',
                  size: 'large',
                  rows: 4
                }}
              />
            </Row>

            <Row justify="end" className="mt-30 mb-20 form-action-buttons">
              <Button
                onClick={() => navigate(-1)}
                size="large"
                className="border-lg"
                type="default"
                htmlType="button"
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                size="large"
                className="border-lg"
                disabled={isPending}
                loading={isPending}
                htmlType="submit"
              >
                Submit
              </Button>
            </Row>
          </Form>
        </div>
      </AddContactFormWrapper>
    </>
  );
};

export default AddContact;
