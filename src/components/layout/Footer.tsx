import SocialIcon from "@/components/ui/SocialIcon";
import { socialLinks, personalInfo } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-[#3c3c50]/40 bg-[#0a0a0e]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[#505050] text-sm">
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              className="text-[#505050] hover:text-[#8a9a8a] transition-colors"
            >
              <SocialIcon name={link.icon} className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
