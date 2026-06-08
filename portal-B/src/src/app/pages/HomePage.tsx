import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Main from '../../imports/Main/Main';
import gamesBg from '../../imports/games.png';
import blockchainBg from '../../imports/bg.png';

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Add click handlers to navigation links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const text = target.textContent?.trim();

      if (text === 'Archive') {
        e.preventDefault();
        navigate('/archive');
      } else if (text === 'Token Swap') {
        e.preventDefault();
        // Already on home page, do nothing
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

    // Scroll-triggered animations for Games section
    const gamesSection = document.querySelector('[data-name="games"]');
    const gamesObserver = gamesSection ? new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains('games-visible')) {
            entry.target.classList.add('games-visible');
            gamesObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    ) : null;

    if (gamesSection && gamesObserver) {
      gamesObserver.observe(gamesSection);
    }

    // Scroll-triggered animations for Blockchain section
    const blockchainSection = document.querySelector('[data-name="blockchain"]');
    const blockchainObserver = blockchainSection ? new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains('blockchain-visible')) {
            entry.target.classList.add('blockchain-visible');
            blockchainObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    ) : null;

    if (blockchainSection && blockchainObserver) {
      blockchainObserver.observe(blockchainSection);
    }

    // Scroll-triggered animations for News section
    // Use the news background div as the trigger element
    const newsBackground = document.querySelector('[style*="top: 3364px"][style*="height: 1004px"]') as HTMLElement;

    // Find and mark the news cards with stable classes
    const allElements = Array.from(document.querySelectorAll('.absolute')) as HTMLElement[];
    const newsCard1 = allElements.find(el => {
      const style = window.getComputedStyle(el);
      return style.left === '288px' && style.top === '3722px' && el.classList.contains('contents');
    });
    const newsCard2 = allElements.find(el => {
      const style = window.getComputedStyle(el);
      return style.left === '744px' && style.top === '3722px' && el.classList.contains('contents');
    });
    const newsCard3 = allElements.find(el => {
      const style = window.getComputedStyle(el);
      return style.left === '1200px' && style.top === '3722px' && el.classList.contains('contents');
    });

    if (newsCard1) newsCard1.classList.add('news-card-1');
    if (newsCard2) newsCard2.classList.add('news-card-2');
    if (newsCard3) newsCard3.classList.add('news-card-3');

    // Find News title - it's at top: 3503px
    const allTitles = Array.from(document.querySelectorAll('[data-name="title"]')) as HTMLElement[];
    const newsTitle = allTitles.find(el => {
      const style = window.getComputedStyle(el);
      return style.top === '3503px';
    });
    if (newsTitle) newsTitle.classList.add('news-title');

    const newsObserver = newsBackground ? new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains('news-triggered')) {
            entry.target.classList.add('news-triggered');

            // Trigger animations
            if (newsTitle) newsTitle.classList.add('news-visible');
            if (newsCard1) newsCard1.classList.add('news-visible');
            if (newsCard2) newsCard2.classList.add('news-visible');
            if (newsCard3) newsCard3.classList.add('news-visible');

            newsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    ) : null;

    if (newsBackground && newsObserver) {
      newsObserver.observe(newsBackground);
    }

    // Scroll-triggered animations for Whitepaper section
    const whitepaperSection = document.querySelector('[data-name="whitepaper"]');
    const whitepaperObserver = whitepaperSection ? new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains('whitepaper-visible')) {
            entry.target.classList.add('whitepaper-visible');
            whitepaperObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    ) : null;

    if (whitepaperSection && whitepaperObserver) {
      whitepaperObserver.observe(whitepaperSection);
    }

    return () => {
      navTexts.forEach(el => {
        el.removeEventListener('click', handleClick as any);
      });
      if (boraBILogo) {
        boraBILogo.removeEventListener('click', handleLogoClick as any);
      }
      if (gamesObserver) gamesObserver.disconnect();
      if (blockchainObserver) blockchainObserver.disconnect();
      if (newsObserver) newsObserver.disconnect();
      if (whitepaperObserver) whitepaperObserver.disconnect();
    };
  }, [navigate]);

  return (
    <div className="relative size-full overflow-y-auto overflow-x-hidden bg-[#111117]">
      <style>{`
        /* Blockchain section stacking order - above News section */
        [data-name="blockchain"] {
          z-index: 1;
        }

        /* Button hover interactions - only move text and icon content */
        [data-name="card1"] [data-name="btn"],
        [data-name="card2"] [data-name="btn"],
        [data-name="whitepaper"] [data-name="btn"],
        [data-name="channel,contact"] [data-name="btn"] {
          cursor: pointer;
        }

        /* Target the actual text content */
        [data-name="card1"] [data-name="btn"] [data-name="text"] > div > p,
        [data-name="card2"] [data-name="btn"] [data-name="text"] > div > p,
        [data-name="whitepaper"] [data-name="btn"] [data-name="text"] > div > p,
        [data-name="channel,contact"] [data-name="btn"] [data-name="text"] > div > p {
          transition: transform 250ms ease-out;
        }

        /* Target the actual arrow icon */
        [data-name="card1"] [data-name="btn"] [data-name="icon"] [data-name="ic-arrow-right"],
        [data-name="card2"] [data-name="btn"] [data-name="icon"] [data-name="ic-arrow-right"],
        [data-name="whitepaper"] [data-name="btn"] [data-name="icon"] [data-name="ic-arrow-right"],
        [data-name="channel,contact"] [data-name="btn"] [data-name="icon"] [data-name="ic-arrow-right"] {
          transition: transform 250ms ease-out;
        }

        /* Move text left on hover */
        [data-name="card1"] [data-name="btn"]:hover [data-name="text"] > div > p,
        [data-name="card2"] [data-name="btn"]:hover [data-name="text"] > div > p,
        [data-name="whitepaper"] [data-name="btn"]:hover [data-name="text"] > div > p,
        [data-name="channel,contact"] [data-name="btn"]:hover [data-name="text"] > div > p {
          transform: translateX(-4px);
        }

        /* Move arrow right on hover */
        [data-name="card1"] [data-name="btn"]:hover [data-name="icon"] [data-name="ic-arrow-right"],
        [data-name="card2"] [data-name="btn"]:hover [data-name="icon"] [data-name="ic-arrow-right"],
        [data-name="whitepaper"] [data-name="btn"]:hover [data-name="icon"] [data-name="ic-arrow-right"],
        [data-name="channel,contact"] [data-name="btn"]:hover [data-name="icon"] [data-name="ic-arrow-right"] {
          transform: translateX(4px);
        }

        /* Icon-only buttons in News section - target only absolute positioned icons */
        [data-name="icon"].absolute {
          cursor: pointer;
        }

        [data-name="icon"].absolute [data-name="ic-arrow-right"] {
          transition: transform 250ms ease-out;
        }

        [data-name="icon"].absolute:hover [data-name="ic-arrow-right"] {
          transform: translateX(4px);
        }

        /* Hero line-art graphic ambient animation */
        [data-name="img"].absolute.overflow-clip {
          animation: heroFloat 7s ease-in-out infinite;
        }

        @keyframes heroFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        /* Hero entrance animations */
        /* Sub-layer text entrance */
        [data-name="hero"] > p {
          animation: heroTextEnter 0.6s ease-out forwards;
          opacity: 0;
          will-change: transform, opacity;
        }

        /* Card1 entrance */
        [data-name="card1"] > * {
          animation: heroCardEnter 0.65s ease-out 0.15s forwards;
          opacity: 0;
          will-change: transform, opacity;
        }

        /* Card2 entrance - staggered after card1 */
        [data-name="card2"] > * {
          animation: heroCardEnter 0.65s ease-out 0.35s forwards;
          opacity: 0;
          will-change: transform, opacity;
        }

        @keyframes heroTextEnter {
          0% {
            opacity: 0;
            transform: translateY(24px) translateZ(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) translateZ(0);
            will-change: auto;
          }
        }

        @keyframes heroCardEnter {
          0% {
            opacity: 0;
            transform: translateY(32px) translateZ(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) translateZ(0);
            will-change: auto;
          }
        }

        /* Games section scroll-triggered animations */
        /* Hide elements initially */
        [data-name="games"] [data-name="title"],
        [data-name="games"] [data-name="image"] > * {
          opacity: 0;
          transform: translateY(40px);
          will-change: transform, opacity;
        }

        /* Title appears first when section becomes visible */
        [data-name="games"].games-visible [data-name="title"] {
          animation: gamesEnter 0.65s ease-out forwards;
        }

        /* Images appear in staggered sequence after title */
        [data-name="games"].games-visible [data-name="image"] > *:nth-child(1) {
          animation: gamesEnter 0.65s ease-out 0.2s forwards;
        }

        [data-name="games"].games-visible [data-name="image"] > *:nth-child(2) {
          animation: gamesEnter 0.65s ease-out 0.3s forwards;
        }

        [data-name="games"].games-visible [data-name="image"] > *:nth-child(3) {
          animation: gamesEnter 0.65s ease-out 0.4s forwards;
        }

        [data-name="games"].games-visible [data-name="image"] > *:nth-child(4) {
          animation: gamesEnter 0.65s ease-out 0.5s forwards;
        }

        @keyframes gamesEnter {
          0% {
            opacity: 0;
            transform: translateY(40px) translateZ(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) translateZ(0);
            will-change: auto;
          }
        }

        /* Blockchain section scroll-triggered animations */
        /* Hide title and diagram initially */
        [data-name="blockchain"] [data-name="title"],
        [data-name="blockchain"] [data-name="img"] {
          opacity: 0;
          transform: translateY(48px) translateZ(0);
          will-change: transform, opacity;
        }

        /* Title animates first */
        [data-name="blockchain"].blockchain-visible [data-name="title"] {
          animation: blockchainEnter 0.6s ease-out forwards;
        }

        /* Diagram follows 175ms later */
        [data-name="blockchain"].blockchain-visible [data-name="img"] {
          animation: blockchainEnter 0.6s ease-out 0.175s forwards;
        }

        @keyframes blockchainEnter {
          0% {
            opacity: 0;
            transform: translateY(24px) translateZ(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) translateZ(0);
            will-change: auto;
          }
        }

        /* News section scroll-triggered animations */
        /* Hide news title and cards initially - GPU accelerated */
        .news-title,
        .news-card-1,
        .news-card-2,
        .news-card-3 {
          opacity: 0;
          transform: translateY(30px) translateZ(0);
          will-change: transform, opacity;
        }

        /* Title appears first */
        .news-title.news-visible {
          animation: newsEnter 0.65s ease-out forwards;
        }

        /* Card 1 (left - 288px) appears after title */
        .news-card-1.news-visible {
          animation: newsEnter 0.65s ease-out 0.2s forwards;
        }

        /* Card 2 (middle - 744px) appears after card 1 */
        .news-card-2.news-visible {
          animation: newsEnter 0.65s ease-out 0.35s forwards;
        }

        /* Card 3 (right - 1200px) appears after card 2 */
        .news-card-3.news-visible {
          animation: newsEnter 0.65s ease-out 0.5s forwards;
        }

        @keyframes newsEnter {
          0% {
            opacity: 0;
            transform: translateY(30px) translateZ(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) translateZ(0);
            will-change: auto;
          }
        }

        /* Whitepaper section scroll-triggered animations */
        /* Hide title/content (Frame15) and button (Btn2) initially - GPU accelerated */
        [data-name="whitepaper"] > div[style*="top: 4627px"],
        [data-name="whitepaper"] [data-name="btn"][style*="top: 4663px"] {
          opacity: 0;
          transform: translateY(30px) translateZ(0);
          will-change: transform, opacity;
        }

        /* Frame15 (title and description) appears first */
        [data-name="whitepaper"].whitepaper-visible > div[style*="top: 4627px"] {
          animation: whitepaperEnter 0.65s ease-out forwards;
        }

        /* Btn2 (button) appears after Frame15 */
        [data-name="whitepaper"].whitepaper-visible [data-name="btn"][style*="top: 4663px"] {
          animation: whitepaperEnter 0.65s ease-out 0.2s forwards;
        }

        @keyframes whitepaperEnter {
          0% {
            opacity: 0;
            transform: translateY(30px) translateZ(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) translateZ(0);
            will-change: auto;
          }
        }
      `}</style>

      {/* Full-width background layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Games section - background image extends full width */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: '1371px',
            height: '1035px',
            backgroundImage: `url(${gamesBg})`,
            backgroundPosition: 'center center',
            backgroundSize: 'auto',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Blockchain section - background image extends full width */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: '2406px',
            height: '988px',
            backgroundImage: `url(${blockchainBg})`,
            backgroundPosition: 'center center',
            backgroundSize: 'auto',
            backgroundRepeat: 'no-repeat',
            zIndex: 1,
          }}
        />

        {/* News section - light background extends full width */}
        <div
          className="absolute left-0 right-0 bg-[#F5F5F8]"
          style={{
            top: '3364px',
            height: '1004px'
          }}
        />
      </div>

      {/* Centered 1920px content */}
      <div className="relative mx-auto" style={{ width: '1920px', minHeight: '100%' }}>
        <Main />
      </div>
    </div>
  );
}
