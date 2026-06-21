declare global {
  interface Window {
    trackAffiliateClick?: (productId: string, productTitle: string) => void;
    plausible?: (eventName: string, options?: { props?: Record<string, string> }) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackAffiliateClick(productId: string, productTitle: string) {
  console.log('[Affiliate Klick]', { productId, productTitle });

  if (typeof window.plausible === 'function') {
    window.plausible('Affiliate Klick', {
      props: { productId, productTitle }
    });
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'affiliate_click', {
      product_id: productId,
      product_title: productTitle
    });
  }
}

export function initAffiliateTracking() {
  window.trackAffiliateClick = trackAffiliateClick;

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const link = target?.closest<HTMLAnchorElement>('[data-affiliate-link]');

    if (!link) return;

    const productId = link.dataset.productId ?? 'unbekannt';
    const productTitle = link.dataset.productTitle ?? 'Unbekanntes Produkt';
    trackAffiliateClick(productId, productTitle);
  });
}
