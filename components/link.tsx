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
        className="text-foreground/80 hover:text-foreground transition-colors duration-300 flex items-center justify-center hover:cursor-pointer hover:text-yellow-500"
    >
        <Icon className="w-6 h-6" />
    </Link>
);