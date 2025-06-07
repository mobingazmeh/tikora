import type { Config } from "tailwindcss";
import * as animates from "tailwindcss-animate"

/**
 * پیکربندی Tailwind CSS
 * این فایل شامل تنظیمات مربوط به تم، رنگ‌ها، اندازه‌ها و انیمیشن‌ها است
 */
const config: Config = {
  /* حالت تاریک */
  darkMode: ["class"],
  /* مسیرهای فایل‌های محتوا */
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* تعریف رنگ‌های سفارشی */
      colors: {
        /* رنگ‌های اصلی */
        'primary-100': 'rgba(var(--color-primary-100) , <alpha-value>)',
        'primary-300': 'rgba(var(--color-primary-300) , <alpha-value>)',
        'primary-500': 'rgba(var(--color-primary-500) , <alpha-value>)',
        'primary-700': 'rgba(var(--color-primary-700) , <alpha-value>)',
        /* رنگ‌های ثانویه */
        'secondary-100': 'rgba(var(--color-secondary-100) , <alpha-value>)',
        'secondary-300': 'rgba(var(--color-secondary-300) , <alpha-value>)',
        'secondary-500': 'rgba(var(--color-secondary-500) , <alpha-value>)',
        'secondary-700': 'rgba(var(--color-secondary-700) , <alpha-value>)',
        /* رنگ‌های متنی و توضیحات */
        caption: 'rgba(129, 133, 139 , <alpha-value>)',
        'caption-dark': 'rgba(66, 71, 80 , <alpha-value>)',
        /* رنگ خطا */
        danger: 'rgba(215, 46, 46 , <alpha-value>)',
        /* رنگ‌های طبیعی */
        natural: '#f7f7f7',
        "natural-100":"#f0f0f1",
        'green': {
          DEFAULT: '#00704a',
          'light': '#008c5c',
          'dark': '#005a3d'
        }
      },
      /* تنظیمات گوشه‌های گرد */
      borderRadius: {
        main: '8px',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      /* حداکثر عرض کانتینر */
      maxWidth: {
        'container-lg': '1280px'
      },
      /* ارتفاع‌های سفارشی */
      height: {
        '15': '60px',
        '50': '200px'
      },
      /* عرض‌های سفارشی */
      width: {
        '15': '60px',
        '50': '200px'
      },
      /* اندازه فونت‌ها */
      fontSize: {
        base: '14px',
        md: '16px'
      },
      /* تنظیمات کانتینر */
      container: {
        center: true,
        screens: {
          sm: '600px',
          md: '728px',
          lg: '984px',
          xl: '1240px',
          '2xl': '1440px'
        }
      },
      /* تعریف انیمیشن‌ها */
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      /* تنظیمات انیمیشن‌ها */
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  /* پلاگین‌های مورد استفاده */
  plugins: [animates],
};

export default config;
