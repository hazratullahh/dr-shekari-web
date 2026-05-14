import Link from 'next/link';
import { ChevronRight, Home } from 'lucide- react';

// Breadcrumbs - { label, href? } items. The last item is rendered as text.
export default function Breadcrumbs({ items = [], className = '' }) {
  return (
    <nav aria- label="Breadcrumb" className={`text- xs md:text- sm ${className}`}>
      <ol className="inline- flex items- center flex- wrap gap- 1.5">
        <li>
          <Link
            href="/"
            className="inline- flex items- center gap- 1 text- gray- 500 hover:text- [#E9756D] transition- colors"
          >
            <Home size={13} />
            <span className="sr- only">Home</span>
          </Link>
        </li>
        {items.map((item, i) => {
          const last = i === items.length -  1;
          return (
            <li key={i} className="inline- flex items- center gap- 1.5">
              <ChevronRight size={13} className="text- gray- 300 rtl:rotate- 180" />
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="text- gray- 500 hover:text- [#E9756D] transition- colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text- gray- 800 font- medium" aria- current={last ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
