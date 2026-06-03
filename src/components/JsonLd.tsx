export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CarSound",
    "description": "车机魔改音效下载平台",
    "url": "https://carsound.top",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://carsound.top/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CarSound",
    "url": "https://carsound.top",
    "logo": "https://carsound.top/logo.png"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
    </>
  );
}
