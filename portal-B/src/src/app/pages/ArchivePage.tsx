import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import RedesignProjectRecordsUi from '../../imports/RedesignProjectRecordsUi/RedesignProjectRecordsUi';
import { Footer } from '../components/Footer';

export default function ArchivePage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Add click handlers to navigation links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const text = target.textContent?.trim();

      if (text === 'Token Swap') {
        e.preventDefault();
        navigate('/');
      } else if (text === 'Archive') {
        e.preventDefault();
        // Already on archive page, do nothing
      }
    };

    // Add click handler to BORA BI logo
    const handleLogoClick = (e: MouseEvent) => {
      e.preventDefault();
      navigate('/');
    };

    // Find all navigation text elements
    const navTexts = document.querySelectorAll('[data-name="gnb"] p');
    navTexts.forEach(el => {
      el.addEventListener('click', handleClick as any);
      (el as HTMLElement).style.cursor = 'pointer';
      el.addEventListener('mouseenter', () => {
        (el as HTMLElement).style.opacity = '0.7';
        (el as HTMLElement).style.transition = 'opacity 0.3s';
      });
      el.addEventListener('mouseleave', () => {
        (el as HTMLElement).style.opacity = '1';
      });
    });

    // Find BORA BI logo and add click handler
    const boraBILogo = document.querySelector('[data-name="BORA BI"]');
    if (boraBILogo) {
      boraBILogo.addEventListener('click', handleLogoClick as any);
      (boraBILogo as HTMLElement).style.cursor = 'pointer';
      boraBILogo.addEventListener('mouseenter', () => {
        (boraBILogo as HTMLElement).style.opacity = '0.8';
        (boraBILogo as HTMLElement).style.transition = 'opacity 0.3s';
      });
      boraBILogo.addEventListener('mouseleave', () => {
        (boraBILogo as HTMLElement).style.opacity = '1';
      });
    }

    // Make GNB sticky - the gnb element has display:contents, so we need to make its children fixed
    const gnbElement = document.querySelector('[data-name="gnb"]');
    if (gnbElement) {
      // Get all direct children of the gnb element
      const gnbChildren = gnbElement.children;
      Array.from(gnbChildren).forEach(child => {
        const childEl = child as HTMLElement;
        const computedStyle = window.getComputedStyle(childEl);
        const originalLeft = computedStyle.left;

        childEl.style.position = 'fixed';
        childEl.style.zIndex = '1000';

        // Adjust left position to account for centered 1920px container
        // Container is centered at calc(50% - 960px)
        if (originalLeft && originalLeft !== 'auto') {
          const leftValue = parseInt(originalLeft);
          childEl.style.left = `calc(50% - 960px + ${leftValue}px)`;
        }
      });
    }

    // Expand/collapse animation for all expandable History & Archives dropdowns
    const allDropdowns = Array.from(document.querySelectorAll('[data-name="dropdown"]')) as HTMLElement[];
    // Only dropdowns whose next sibling is a content container (not another dropdown) are expandable
    const expandableDropdowns = allDropdowns.filter(d => {
      const next = d.nextElementSibling;
      return next !== null && next.getAttribute('data-name') !== 'dropdown';
    });

    const toggleCleanups: (() => void)[] = [];

    expandableDropdowns.forEach(header => {
      const contentEl = header.nextElementSibling as HTMLElement;
      const innerFlex = header.parentElement as HTMLElement | null;
      const arrowEl = header.querySelector('[data-name="ic-arrow-up"], [data-name="ic-arrow-down"]') as HTMLElement | null;
      const isInitiallyOpen = header.querySelector('[data-name="ic-arrow-up"]') !== null;

      if (innerFlex) innerFlex.style.overflow = 'visible';

      contentEl.style.overflow = 'hidden';
      contentEl.style.transition = 'max-height 280ms ease-out, opacity 260ms ease-out';

      let isOpen = isInitiallyOpen;
      if (isOpen) {
        contentEl.style.maxHeight = `${contentEl.scrollHeight}px`;
        contentEl.style.opacity = '1';
      } else {
        contentEl.style.maxHeight = '0';
        contentEl.style.opacity = '0';
      }

      header.style.cursor = 'pointer';

      const handleToggle = () => {
        isOpen = !isOpen;
        if (isOpen) {
          contentEl.style.maxHeight = `${contentEl.scrollHeight}px`;
          contentEl.style.opacity = '1';
        } else {
          contentEl.style.maxHeight = '0';
          contentEl.style.opacity = '0';
        }
        if (arrowEl) {
          arrowEl.style.transition = 'transform 280ms ease-out';
          arrowEl.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        }
      };

      header.addEventListener('click', handleToggle);
      toggleCleanups.push(() => header.removeEventListener('click', handleToggle));
    });

    return () => {
      navTexts.forEach(el => {
        el.removeEventListener('click', handleClick as any);
      });
      if (boraBILogo) {
        boraBILogo.removeEventListener('click', handleLogoClick as any);
      }
      toggleCleanups.forEach(fn => fn());
    };
  }, [navigate]);

  return (
    <div className="relative size-full overflow-y-auto overflow-x-hidden bg-[#111117]">
      {/* Centered 1920px content */}
      <div className="relative mx-auto" style={{ width: '1920px', minHeight: '100%' }}>
        <RedesignProjectRecordsUi />
      </div>
      <Footer />
    </div>
  );
}
