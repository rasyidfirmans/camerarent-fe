import { Facebook, GitHub, Instagram, YouTube, X } from "@mui/icons-material";

const Footer = () => {
  return (
    <div className="Footer flex justify-center items-center bg-white border-t border-blue-light w-full px-8 py-2">
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-center justify-center w-full gap-12 p-2">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook fontSize="small" className="text-blue" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram fontSize="small" className="text-blue" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub fontSize="small" className="text-blue" />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTube fontSize="small" className="text-blue" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <X fontSize="small" className="text-blue" />
          </a>
        </div>
        <p className="text-blue text-xs p-2">
          © 2025 | Camerarent. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
