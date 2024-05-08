import { useRouter } from 'next/router'
import { useConfig } from 'nextra-theme-docs'
import ClientInfo from './src/clientinfo';
import styles from './src/footer.module.css';

export default {
  logo: <span>🔥 Mojo</span>,
  faviconGlyph: '🔥',
  project: {
    link: 'https://github.com/shadowqcom/mojo_CN'
  },
  chat: {
    link: '/chat',
    icon: (
      <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M41.4193 7.30899C41.4193 7.30899 45.3046 5.79399 44.9808 9.47328C44.8729 10.9883 43.9016 16.2908 43.1461 22.0262L40.5559 39.0159C40.5559 39.0159 40.3401 41.5048 38.3974 41.9377C36.4547 42.3705 33.5408 40.4227 33.0011 39.9898C32.5694 39.6652 24.9068 34.7955 22.2086 32.4148C21.4531 31.7655 20.5897 30.4669 22.3165 28.9519L33.6487 18.1305C34.9438 16.8319 36.2389 13.8019 30.8426 17.4812L15.7331 27.7616C15.7331 27.7616 14.0063 28.8437 10.7686 27.8698L3.75342 25.7055C3.75342 25.7055 1.16321 24.0823 5.58815 22.459C16.3807 17.3729 29.6555 12.1786 41.4193 7.30899Z" fill="#333" />
      </svg>
    )
  },
  docsRepositoryBase: 'https://github.com/shadowqcom/mojo_CN',
  sidebar: {
    defaultMenuCollapseLevel: 1, // 默认折叠菜单
  },
  toc: {
    backToTop: true
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Mojo'
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Mojo中文网，Mojo官网，Mojo社区，开发者社区" />
      <meta property="og:description" content="Mojo编程语言中文网官网，AI编程语言Mojo中文网，AI开发人员的新语言，Mojo 结合了 Python 的可用性和 C 的性能。" />
    </>
  ),
  footer: {
    text: (
      <div className={styles.footer}>
        <p>Mojo中文网 | Mojo官网 | Mojo社区 | 开发者社区</p>
        <p>copyright © {new Date().getFullYear()}{' '}
          <a href="https://github.com/shadowqcom/mojo_CN" target="_blank">Mojo_CN</a>
          . All Rights Reserved.
        </p>
        <ClientInfo />
      </div>
    ),
  }
}