export interface OverviewData {
  thumbnail?: string;
  name?: string;
  link?: string;
  description?: string;
}

export interface OverviewSectionProps {
  overview: OverviewData | undefined;
  imageType?: string;
  nameLabel?: string;
  altText?: string;
}
