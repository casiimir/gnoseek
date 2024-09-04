"use client";

import {
  FacebookShareButton,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  XIcon,
} from "react-share";

/**
 * Props for the SocialShare component
 * @interface SocialShareProps
 * @property {string} title - The title to be shared
 * @property {string} url - The URL to be shared
 */
interface SocialShareProps {
  title: string;
  url: string;
}

/**
 * SocialShare component for sharing content on various social media platforms
 * @param {SocialShareProps} props - The props for the component
 * @returns {JSX.Element} The rendered SocialShare component
 */
const SocialShare: React.FC<SocialShareProps> = ({
  title,
  url,
}: SocialShareProps): JSX.Element => {
  return (
    <div className="flex gap-2">
      <TwitterShareButton
        url={url}
        title={title}
        hashtags={["gnoseek", "casiimir"]}
      >
        <XIcon size={32} round={true} />
      </TwitterShareButton>

      <RedditShareButton url={url} title={title}>
        <RedditIcon size={32} round={true} />
      </RedditShareButton>

      <LinkedinShareButton url={url} title={title}>
        <LinkedinIcon size={32} round={true} />
      </LinkedinShareButton>

      <FacebookShareButton url={url} title={title}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>

      <TelegramShareButton url={url} title={title}>
        <TelegramIcon size={32} round={true} />
      </TelegramShareButton>
    </div>
  );
};

export default SocialShare;
