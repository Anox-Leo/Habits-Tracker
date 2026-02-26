import React from 'react';
import '../styles/components/SkipLink.css';

interface SkipLinkProps {
  targetId: string;
}

/**
 * Accessibility (WCAG 2.4.1): Skip navigation link.
 * Allows keyboard users to skip directly to the main content.
 */
function SkipLink({ targetId }: SkipLinkProps) {
  return (
    <a href={`#${targetId}`} className="skip-link">
      Skip to main content
    </a>
  );
}

export default SkipLink;
