import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const socials = [
  { label: "Facebook", icon: Facebook },
  { label: "Instagram", icon: Instagram },
  { label: "LinkedIn", icon: Linkedin },
  { label: "Twitter", icon: Twitter }
];

export function ShareToSiteFooter() {
  return (
    <footer className="text-muted-foreground flex items-center justify-between gap-3 border-t pt-4 text-sm">
      <span>@2025 Buildatics</span>
      <div className="flex items-center gap-4">
        {socials.map(({ label, icon: Icon }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="hover:text-foreground transition-colors"
          >
            <Icon className="size-4" />
          </a>
        ))}
      </div>
    </footer>
  );
}
