import Link from 'antd/es/typography/Link';

import { AccessStatus } from '../AccessStatus';
import { LabeledTitleWrapper } from './style';

export const LabeledTitle = ({
  label,
  title,
  link,
  titleClassName = '',
  description = '',
  tag,
  tagBgColor = '',
  isYearsTag = false
}: {
  label: string;
  title?: string;
  titleClassName?: string;
  description?: string;
  link?: string;
  tag?: string;
  tagBgColor?: string;
  isYearsTag?: boolean;
}) => {
  return (
    <LabeledTitleWrapper>
      <p className="label">{label}</p>
      {title && <h3 className={`title ${titleClassName}`}>{title}</h3>}
      {description && (
        <div>
          <p className={titleClassName} dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      )}
      {link && (
        <Link
          className="chapter-link"
          href={link?.startsWith('http') ? `${link}` : `https://${link}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link}
        </Link>
      )}
      {tag && <AccessStatus isYearsTag={isYearsTag} status={tag} bgColor={tagBgColor} />}
    </LabeledTitleWrapper>
  );
};
