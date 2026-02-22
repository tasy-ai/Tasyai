import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  canonical, 
  ogTitle, 
  ogDescription, 
  ogImage, 
  ogType = 'website' 
}) => {
  const siteName = 'Tasyai';
  const siteUrl = 'https://tasyai.com';
  const currentUrl = canonical || (typeof window !== 'undefined' ? window.location.href : siteUrl);
  
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Smart Job Searching & Talent Platform`;
  const defaultDescription = 'Tasyai is a cutting-edge job searching platform connecting talents with startups. Find your next career opportunity or the perfect team member.';
  const defaultKeywords = 'tasyai, job searching, career growth, startup hiring, talent platform, recruitment AI, job board';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="application-name" content={siteName} />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description || defaultDescription} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || description || defaultDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} /> }

      {/* Structured Data (JSON-LD) - Boosting Brand Discovery */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": siteName,
          "alternateName": "Tasyai Platform",
          "url": siteUrl,
          "logo": `${siteUrl}/logo.png`,
          "description": defaultDescription,
          "sameAs": [
            "https://twitter.com/tasyai",
            "https://github.com/tasyai"
          ]
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": siteName,
          "alternateName": ["Tasyai AI", "Tasy-ai"],
          "url": siteUrl,
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${siteUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
