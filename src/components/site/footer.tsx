import { Logo } from "@/components/ui/logo";
import { footer } from "@/lib/copy";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-elev/60">
      <div className="container-x py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_3fr]">
          <div>
            <a href="/" aria-label="01LOT home">
              <Logo />
            </a>
            <p className="mt-4 text-[13.5px] text-text-dim max-w-xs leading-relaxed">
              {footer.tagline}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h4 className="eyebrow">{col.title}</h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-[13.5px] text-text-dim transition-colors hover:text-orange"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 border-t border-line pt-6 text-[12px] text-text-muted">
          {footer.meta}
        </div>
      </div>
    </footer>
  );
}
