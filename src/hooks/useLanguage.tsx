import { useRouter } from "next/router";
import en from "../components/locales/en";
import fa from "../components/locales/fa";

export const useLanguage = () => {
  const { locale } = useRouter();
  const t = locale === "en" ? en : fa;
  return { t, locale };
};
