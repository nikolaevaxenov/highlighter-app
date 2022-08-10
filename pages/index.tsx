import type { NextPage } from "next";
import Head from "next/head";
import { useDeferredValue, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { LanguagesEnum } from "../interfaces/languagesEnum";
import { ThemesEnum } from "../interfaces/themesEnum";
import * as themes from "react-syntax-highlighter/dist/cjs/styles/prism";
import styles from "../styles/Home.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home: NextPage = () => {
  const { t } = useTranslation("index");

  const [syntax, setSyntax] = useState("javascript");
  const [theme, setTheme] = useState("dracula");
  const [rawText, setRawText] = useState("");

  const deferredRawText = useDeferredValue(rawText);

  const [showLineNumbers, setShowLineNumbers] = useState(false);
  const [warpLines, setWarpLines] = useState(false);

  const selectHighlighted = () => {
    let range = document.createRange();

    if (deferredRawText !== "") {
      range?.selectNodeContents(
        document.querySelector("pre") as HTMLPreElement
      );

      let sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  };

  const handleCopy = () => {
    selectHighlighted();

    document.execCommand("copy");

    toast.success(t("copyToast"), {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <Head>
        <title>Syntax Highlighter</title>
      </Head>
      <main className={styles.wrapper}>
        <div className={styles.wrapper__inputBox}>
          <label htmlFor="syntax">{t("syntax")}</label>
          <select
            name="syntax"
            value={syntax}
            onChange={(e) => setSyntax(e.target.value)}
          >
            {(Object.keys(LanguagesEnum) as (keyof typeof LanguagesEnum)[]).map(
              (key, index) => (
                <option key={index} value={key}>
                  {key}
                </option>
              )
            )}
          </select>

          <label htmlFor="theme">{t("theme")}</label>
          <select
            name="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            {(Object.keys(ThemesEnum) as (keyof typeof ThemesEnum)[]).map(
              (key, index) => (
                <option key={index} value={key}>
                  {key}
                </option>
              )
            )}
          </select>
          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
          ></textarea>

          <div className={styles.wrapper__checkBoxes}>
            <label htmlFor="lineNumbers">
              <input
                type="checkbox"
                name="lineNumbers"
                id="lineNumbers"
                checked={showLineNumbers}
                onChange={(e) => setShowLineNumbers(e.target.checked)}
              />{" "}
              {t("lineNumbers")}
            </label>

            <label htmlFor="codeWarpLines">
              <input
                type="checkbox"
                name="codeWarpLines"
                id="codeWarpLines"
                checked={warpLines}
                onChange={(e) => setWarpLines(e.target.checked)}
              />{" "}
              {t("warpLines")}
            </label>
          </div>
        </div>
        <div className={styles.wrapper__outputBox}>
          <div
            className={styles.wrapper__highlightedCode}
            id="highlighted"
            onClick={() => selectHighlighted()}
          >
            {deferredRawText && (
              <SyntaxHighlighter
                language={syntax}
                style={themes[theme as keyof typeof themes]}
                showLineNumbers={showLineNumbers}
                wrapLongLines={warpLines}
              >
                {deferredRawText}
              </SyntaxHighlighter>
            )}
          </div>
          {deferredRawText && (
            <button onClick={() => handleCopy()}>{t("copyButton")}</button>
          )}
        </div>
      </main>
      <ToastContainer />
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["index"])),
    },
  };
}

export default Home;
