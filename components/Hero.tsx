'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Clock, Download, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';

// ─────────────────────────────────────────
// Hero Section
// Left column: identity + links + timeline
// ─────────────────────────────────────────

const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};

export function Hero() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.08 }}
      className="flex flex-col gap-10 h-full"
    >
      {/* ── Identity ── */}
      <motion.div variants={itemVariants} className="flex flex-col gap-5">
        {/* Avatar Circle Container */}
        <div className="relative w-20 h-20 rounded-full overflow-hidden border border-[var(--border-primary)] bg-[var(--surface-secondary)] flex items-center justify-center shadow-xs">
          <Image 
            src="/images/avatar-new2.jpg" 
            alt="Viswa V" 
            fill 
            className="object-cover" 
            priority
          />
        </div>

        {/* Name */}
        <div>
          <h1
            className="text-display-l text-[var(--text-primary)] font-heading leading-none tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Viswa V
          </h1>
          <p
            className="mt-1 text-heading-l text-[var(--text-secondary)] font-heading font-normal"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Product Designer
          </p>
        </div>


        {/* Meta info */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-body-s text-[var(--text-secondary)] font-semibold">
            <Clock className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span>2+ Years Experience</span>
          </div>
          <div className="flex items-center gap-2 text-body-s text-[var(--text-secondary)] font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 flex-shrink-0"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <a href="tel:+918825432562" className="hover:text-[var(--text-primary)] transition-colors">+91 88254 32562</a>
          </div>
          <div className="flex items-center gap-2 text-body-s text-[var(--text-secondary)] font-semibold">
            <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span>India</span>
          </div>
        </div>
      </motion.div>

      {/* ── Action Buttons (Same Row Layout) ── */}
      <motion.div variants={itemVariants} className="flex items-center gap-3 flex-wrap">
        <Button
          variant="primary"
          size="md"
          leftIcon={<Download className="w-4 h-4" />}
          aria-label="Download resume"
          onClick={() => {
            window.open('/resume.pdf', '_blank', 'noopener,noreferrer');
          }}
        >
          Resume
        </Button>

        {/* LinkedIn Button - Icon Only */}
        <Button
          variant="secondary"
          size="md"
          aria-label="View LinkedIn profile (opens in new tab)"
          onClick={() => window.open('https://www.linkedin.com/in/viswa-v14/', '_blank', 'noopener,noreferrer')}
          className="aspect-square p-0 w-10 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Linkedin-Icon--Streamline-Svg-Logos" className="w-4 h-4">
            <path fill="#0a66c2" d="M20.273125 20.2735H16.79115V14.820475c0 -1.300325 -0.023225 -2.97425 -1.810975 -2.97425 -1.813525 0 -2.091 1.41675 -2.091 2.879575v5.547325H9.4072V9.0595h3.3427v1.532475h0.046775c0.6816 -1.165425 1.948925 -1.861475 3.298075 -1.8114 3.529125 0 4.179825 2.32135 4.179825 5.3413l-0.00145 6.151625ZM5.4784 7.526675c-1.115975 0.0002 -2.0208 -0.904325 -2.021 -2.0203 -0.0002 -1.116 0.9043 -2.02085 2.020275 -2.02105 1.11595 -0.0002 2.020775 0.904325 2.020975 2.020325 0.0001 0.5359 -0.2127 1.049925 -0.591575 1.428925 -0.378875 0.379025 -0.892775 0.592 -1.428675 0.5921Zm1.740975 12.746825H3.733775V9.0595h3.4856v11.214ZM22.009025 0.2517525H1.98409C1.0376725 0.24107175 0.26155 0.99919 0.25 1.94562V22.05405c0.011155 0.946875 0.787215 1.70575 1.73409 1.695825H22.009025c0.94875 0.01175 1.72785 -0.747075 1.740975 -1.695825V1.94417c-0.013525 -0.9483 -0.7927 -1.7063755 -1.740975 -1.69402" strokeWidth="0.25"></path>
          </svg>
        </Button>

        {/* Email Button - Icon Only */}
        <Button
          variant="secondary"
          size="md"
          aria-label="Send email to Viswa"
          onClick={() => (window.location.href = 'mailto:viswav1401@gmail.com')}
          className="aspect-square p-0 w-10 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Google-Gmail--Streamline-Svg-Logos" className="w-4 h-4">
            <path fill="#4285f4" d="M5.5909 20.814775V11.735225L2.775025 9.159075 0.25 7.72955V19.2125c0 0.886575 0.7183525 1.602275 1.6022725 1.602275H5.5909Z" strokeWidth="0.25"></path>
            <path fill="#34a853" d="M18.408925 20.814775h3.73865c0.8866 0 1.602275 -0.71835 1.602275 -1.602275V7.72955l-2.86 1.637475 -2.480925 2.3682v9.07955Z" strokeWidth="0.25"></path>
            <path fill="#ea4335" d="m5.590925 11.735225 -0.38315 -3.5477 0.38315 -3.395475 6.4091 4.8068 6.409075 -4.8068 0.42865 3.21215 -0.42865 3.731025 -6.409075 4.806825 -6.4091 -4.806825Z" strokeWidth="0.25"></path>
            <path fill="#fbbc04" d="M18.408925 4.79205v6.943175l5.340925 -4.005675v-2.136375c0 -1.981475 -2.261875 -3.111075 -3.84545 -1.922725l-1.495475 1.1216Z" strokeWidth="0.25"></path>
            <path fill="#c5221f" d="m0.25 7.72955 2.456375 1.842275 2.884525 2.1634V4.79205l-1.49545 -1.1216C2.5092 2.4821 0.25 3.6117 0.25 5.593175v2.136375Z" strokeWidth="0.25"></path>
          </svg>
        </Button>

        {/* WhatsApp Button - Icon Only */}
        <Button
          variant="secondary"
          size="md"
          aria-label="Contact Viswa on WhatsApp"
          onClick={() => window.open('https://wa.me/918825432562', '_blank', 'noopener,noreferrer')}
          className="aspect-square p-0 w-10 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 96 96" id="Whatsapp-Icon--Streamline-Svg-Logos" className="w-4 h-4">
            <path fill="url(#whatsapp-grad-a)" d="M3.20676 47.591c-.00237 7.924 2.06817 15.6613 6.00506 22.4808l-6.38174 23.301 23.84542-6.2524c6.5694 3.5806 13.9665 5.4706 21.4944 5.4725h.0199c24.7897 0 44.9692-20.1724 44.9796-44.9664.0048-12.0148-4.6698-23.3123-13.1629-31.812C71.5149 7.3153 60.2212 2.63217 48.1879 2.62695 23.3953 2.62695 3.21718 22.798 3.20676 47.591Z"></path>
            <path fill="url(#whatsapp-grad-b)" d="M1.60084 47.5769C1.598 55.7861 3.74293 63.8001 7.82006 70.8637L1.20947 95l24.70063-6.4765c6.8058 3.7109 14.4683 5.6672 22.2657 5.6701h.0199c25.6791 0 46.5836-20.8979 46.5945-46.5793.0042-12.4465-4.8386-24.15-13.6349-32.9544C72.3577 5.85655 60.6598 1.00521 48.1957 1 22.5119 1 1.61126 21.8945 1.60084 47.5769ZM16.3103 69.6474l-.9221-1.4641c-3.8772-6.1647-5.92355-13.2884-5.92071-20.6036C9.47603 26.2337 26.8483 8.86713 48.2104 8.86713 58.5551 8.8714 68.2777 12.904 75.59 20.221c7.3123 7.3175 11.3359 17.0448 11.333 27.3905-.0095 21.3465-17.3822 38.7154-38.7273 38.7154h-.0151c-6.9503-.0038-13.7666-1.8701-19.7114-5.3971l-1.4148-.8392-14.6578 3.8431 3.9137-14.2863Z"></path>
            <path fill="#ffffff" d="M36.55 28.1053c-.8723-1.9389-1.9777-1.9777-2.6197-2.0118-.6789-.0289-1.4555-.0271-2.2311-.0271-.7766 0-2.0379.2919-3.1044 1.4565-1.0675 1.1651-4.0753 3.9815-4.0753 9.7093 0 5.7284 4.1724 11.2634 4.7538 12.041.5823.7761 8.0542 12.9065 19.8876 17.5731 9.8349 3.8781 11.8363 3.1068 13.9708 2.9125 2.1345-.1938 6.8882-2.8154 7.8581-5.5341.9704-2.7182.9704-5.0484.6795-5.535-.291-.4852-1.0675-.7766-2.2317-1.3585-1.1646-.5823-6.8882-3.3991-7.9552-3.7876-1.0675-.388-1.8436-.5818-2.6202.5837-.7761 1.1642-3.0059 3.7858-3.6853 4.5624-.679.778-1.3584.8751-2.5226.2928-1.1646-.5842-4.9143-1.8123-9.3624-5.7781-3.4612-3.086-5.7976-6.8968-6.477-8.0624-.679-1.1641-.0725-1.7948.5112-2.3752.5231-.5216 1.1647-1.3593 1.747-2.0388.5809-.6799.7746-1.1651 1.1627-1.9417.3885-.777.1943-1.4569-.0967-2.0392-.2914-.5823-2.5538-6.3396-3.5891-8.6418Z"></path>
            <defs>
              <linearGradient id="whatsapp-grad-a" x1="4519.8" x2="4519.8" y1="9077.23" y2="2.631" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1faf38"></stop>
                <stop offset="1" stopColor="#60d669"></stop>
              </linearGradient>
              <linearGradient id="whatsapp-grad-b" x1="4680.25" x2="4680.25" y1="9401.01" y2=".988" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f9f9f9"></stop>
                <stop offset="1" stopColor="#ffffff"></stop>
              </linearGradient>
            </defs>
          </svg>
        </Button>
      </motion.div>



      {/* ── Experience Timeline ── */}
      <motion.div variants={itemVariants} className="flex-1">
        <ExperienceTimeline />
      </motion.div>
    </motion.div>
  );
}
