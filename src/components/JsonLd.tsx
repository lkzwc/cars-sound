export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Cars Sound",
    "description": "车机魔改音效下载平台",
    "url": "https://carssound.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://carssound.com/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Cars Sound",
    "url": "https://carssound.com",
    "logo": "https://carssound.com/logo.png"
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
