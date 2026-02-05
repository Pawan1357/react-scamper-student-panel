import React, { useEffect } from 'react';

import { Avatar, Col, Row } from 'antd';
import { useParams } from 'react-router-dom';

import { IMAGE_URL } from 'utils/constants';
import { formatDate } from 'utils/constants/day';
import { ImageTypeEnum } from 'utils/constants/enum';
import { formatPhoneDynamic, getInitials, showToaster } from 'utils/functions';

import { contactHooks } from 'services/contactUs';

import HeaderToolbar from 'components/common/HeaderToolbar';
import { LabeledTitle } from 'components/common/LabeledTitle';
import { Loader } from 'components/common/Loader';

import {
  AdminResponseContent,
  AdminResponseFooter,
  ContactDetailCard,
  ContactDetailCardWrapper,
  ContactDetailSection,
  ContactDetailTitle,
  ContactUsViewWrapper,
  ResponseSignature,
  ResponseSignatureInfo
} from './ContactUsView.styled';

const ViewContactUs: React.FC = () => {
  const { contactUsId } = useParams<{ contactUsId: string }>();

  const { data, isLoading, isError, error } = contactHooks.useGetContactById(contactUsId || '');

  useEffect(() => {
    if (isError) {
      showToaster('error', error?.message || 'Failed to fetch faq details.');
    }
  }, [isError, error]);

  if (isLoading) return <Loader />;

  return (
    <>
      <HeaderToolbar title="View Message" backBtn />

      <ContactUsViewWrapper>
        <ContactDetailCardWrapper>
          <ContactDetailCard>
            <ContactDetailTitle level={2}>User Details</ContactDetailTitle>
            <ContactDetailSection>
              <Row gutter={[24, 24]} wrap>
                <Col xs={24} sm={12} lg={5}>
                  <LabeledTitle label="Name" title={data?.data?.user_details?.name || '-'} />
                </Col>
                <Col xs={24} sm={12} lg={5}>
                  <LabeledTitle
                    label="User type"
                    title={data?.data?.user_details?.user_type || '-'}
                  />
                </Col>
                <Col xs={24} sm={12} lg={5}>
                  <LabeledTitle label="School" title={data?.data?.user_details?.school || '-'} />
                </Col>
                <Col xs={24} sm={12} lg={5}>
                  <LabeledTitle label="Email" title={data?.data?.user_details?.email || '-'} />
                </Col>
                <Col xs={24} sm={12} lg={4}>
                  <LabeledTitle
                    label="Phone number"
                    title={
                      data?.data?.user_details?.phone_number
                        ? formatPhoneDynamic(`${data?.data?.user_details?.phone_number}`)
                        : data?.data?.user_details?.phone_number || '-'
                    }
                  />
                </Col>
              </Row>
            </ContactDetailSection>
          </ContactDetailCard>
        </ContactDetailCardWrapper>

        <ContactDetailCardWrapper>
          <ContactDetailCard>
            <ContactDetailTitle level={2}>Contact Details</ContactDetailTitle>
            <ContactDetailSection>
              <Row gutter={[24, 24]}>
                <Col xs={24} sm={12} md={8}>
                  <LabeledTitle label="Title" title={data?.data?.title || '-'} />
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <LabeledTitle
                    label="Created On"
                    title={data?.data?.created_at ? formatDate(data?.data?.created_at) : '-'}
                  />
                </Col>
                <Col xs={24}>
                  <div className="description-section">
                    <p className="description-label">Description</p>
                    <p className="description-text">{data?.data?.description || '-'}</p>
                  </div>
                </Col>
              </Row>
            </ContactDetailSection>
          </ContactDetailCard>
        </ContactDetailCardWrapper>

        {data?.data?.response && (
          <ContactDetailCardWrapper>
            <ContactDetailCard>
              <ContactDetailTitle level={2}>Admin Response</ContactDetailTitle>
              <ContactDetailSection>
                <Row gutter={[24, 24]}>
                  <Col xs={24}>
                    <AdminResponseContent>
                      <div className="description-admin">
                        <p className="description-text">{data?.data?.response || '-'}</p>
                      </div>
                    </AdminResponseContent>
                    <AdminResponseFooter>
                      <ResponseSignature>
                        <Avatar
                          size={40}
                          src={
                            data?.data?.resolved_by?.profile_pic
                              ? `${IMAGE_URL}scamper/${ImageTypeEnum.PROFILE_PIC}/${data?.data?.resolved_by?.profile_pic}`
                              : null
                          }
                          alt="Admin"
                        >
                          {getInitials('', '', data?.data?.resolved_by?.name || '')}
                        </Avatar>
                        <ResponseSignatureInfo>
                          <span className="admin-name">{data?.data?.resolved_by?.name}</span>
                          <span className="admin-date">
                            {data?.data?.resolved_time
                              ? formatDate(data?.data?.resolved_time, 'DD-MM-YYYY HH:mm A')
                              : null}
                          </span>
                        </ResponseSignatureInfo>
                      </ResponseSignature>
                    </AdminResponseFooter>
                  </Col>
                </Row>
              </ContactDetailSection>
            </ContactDetailCard>
          </ContactDetailCardWrapper>
        )}
      </ContactUsViewWrapper>
    </>
  );
};

export default ViewContactUs;
