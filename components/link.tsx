import Link from 'next/link';

interface SocialLinkProps {
    href: string;
    icon: React.ElementType;
    label: string;
}

export const SocialLink = ({ href, icon: Icon, label }: SocialLinkProps) => (
    <Link
        href={href}
        aria-label={label}
        target="_blank"
        rel="noopener noreferrer"
        data-hide-cursor
        className="text-inherit opacity-80 hover:opacity-100 hover:text-yellow-500 transition-all duration-300 flex items-center justify-center hover:cursor-pointer"
    >
        <Icon className="w-6 h-6" />
    </Link>
);