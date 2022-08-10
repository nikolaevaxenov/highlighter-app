import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import styles from "./Footer.module.scss";

export default function Footer() {
  const router = useRouter();
  const languageRef = useRef<HTMLSelectElement>(null);

  const handleLocaleChange = () => {
    router.push(router.route, router.asPath, {
      locale: languageRef.current?.value,
    });
  };

  return (
    <footer className={styles.footer}>
      <Link href="https://github.com/nikolaevaxenov/">
        <a target="_blank">
          © 2022 <u>Nikolaev-Axenov</u>
        </a>
      </Link>
      <div className={styles.footer__languageSwitch}>
        <select
          onChange={handleLocaleChange}
          ref={languageRef}
          value={router.locale}
        >
          <option value="ru">🇷🇺 Русский</option>
          <option value="en">🇺🇸 English</option>
        </select>
      </div>
    </footer>
  );
}
