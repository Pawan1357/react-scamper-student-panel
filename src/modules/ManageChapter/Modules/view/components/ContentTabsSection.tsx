import React from 'react';

import { Carousel, Empty, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { ImageTypeEnum } from 'utils/constants/enum';

import { CurriculumItemCard } from 'components/common/CurriculumItemCard';
import CommonMedia from 'modules/ManageChapter/components/Media/CommonMedia';
import { defaultCarouselSettings } from 'modules/ManageChapter/components/Media/carouselSettings';

import { ContentTabsCard, HiddenHeading } from '../ViewChapter.styled';
import type { ContentTabsSectionProps } from '../types';

export const ContentTabsSection: React.FC<ContentTabsSectionProps> = ({
  activeTab,
  onTabChange,
  lessons,
  gallery,
  resources
}) => {
  const handleTabChange: TabsProps['onChange'] = (key) => {
    if (key === 'lessons' || key === 'gallery' || key === 'resources') {
      onTabChange(key);
    }
  };

  const tabItems: TabsProps['items'] = [
    {
      key: 'lessons',
      label: 'Lessons',
      children: (
        <section aria-label="Lessons list">
          <CurriculumItemCard isDetailIcon listData={lessons} btnText="View" />
        </section>
      )
    },
    {
      key: 'gallery',
      label: 'Images and Videos',
      children:
        gallery.length > 0 ? (
          <CommonMedia
            mode="gallery"
            urlName={ImageTypeEnum.CHAPTER}
            Carousel={Carousel}
            data={gallery}
            itemsPerSlide={4}
            carouselSettings={defaultCarouselSettings}
          />
        ) : (
          <Empty description="No media available" />
        )
    },
    {
      key: 'resources',
      label: 'Downloadable Content',
      children: resources?.filter((val) => val?.is_downloadable)?.length ? (
        <CommonMedia
          mode="resources"
          urlName={ImageTypeEnum.CHAPTER}
          Carousel={Carousel}
          data={resources?.filter((val) => val?.is_downloadable) || []}
          itemsPerSlide={4}
          carouselSettings={defaultCarouselSettings}
        />
      ) : (
        <Empty description="No downloadable content available" />
      )
    }
    // {
    //   key: 'rubrics',
    //   label: 'Rubrics',
    //   children: rubrics?.length ? (
    //     <section aria-label="Rubrics table">
    //       <FinalRubricsSummaryComponent rubrics={rubrics || []} />
    //       <RubricTableWrapper>
    //         <table role="grid">
    //           <thead>
    //             <tr>
    //               <th scope="col">Title</th>
    //               <th scope="col">Exemplary</th>
    //               <th scope="col">Effective</th>
    //               <th scope="col">Acceptable</th>
    //               <th scope="col">Developing</th>
    //               <th scope="col">Incomplete</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {rubrics?.map((row, i) => (
    //               <tr key={i}>
    //                 <th scope="row">{row?.parameter || '-'}</th>
    //                 <td>{row?.exemplary || '-'}</td>
    //                 <td>{row?.effective || '-'}</td>
    //                 <td>{row?.acceptable || '-'}</td>
    //                 <td>{row?.developing || '-'}</td>
    //                 <td>{row?.incomplete || '-'}</td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>
    //       </RubricTableWrapper>
    //     </section>
    //   ) : (
    //     <Empty description="No rubrics available" />
    //   )
    // }
  ];

  return (
    <ContentTabsCard bordered={false}>
      <HiddenHeading id="chapter-content-tabs">Chapter content tabs</HiddenHeading>
      <Tabs
        animated
        aria-labelledby="chapter-content-tabs"
        activeKey={activeTab}
        items={tabItems}
        onChange={handleTabChange}
      />
    </ContentTabsCard>
  );
};
