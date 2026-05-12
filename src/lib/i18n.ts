/**
 * Internationalisation — locale list + translation strings.
 *
 * English is the primary; the seven others ship hand-translated for the
 * critical UI surfaces (nav, hero, CTAs, footer column titles, final CTA).
 * Anything not in the map falls back to the English copy in `copy.ts`,
 * so the site stays functional while translations are being filled in.
 *
 * NOTE: these translations are first-pass and should be reviewed by native
 * speakers before final launch — particularly tone-of-voice nuance in
 * Vietnamese, Thai, Chinese, and Swahili.
 */

export type Locale = "en" | "fr" | "es" | "pt-BR" | "th" | "vi" | "zh" | "sw";

export const DEFAULT_LOCALE: Locale = "en";

export const locales: ReadonlyArray<{
  code: Locale;
  label: string;
  short: string;
  flag: string;
}> = [
  { code: "en",    label: "English",       short: "EN", flag: "🇬🇧" },
  { code: "fr",    label: "Français",      short: "FR", flag: "🇫🇷" },
  { code: "es",    label: "Español",       short: "ES", flag: "🇪🇸" },
  { code: "pt-BR", label: "Português (BR)", short: "BR", flag: "🇧🇷" },
  { code: "th",    label: "ไทย",            short: "TH", flag: "🇹🇭" },
  { code: "vi",    label: "Tiếng Việt",    short: "VI", flag: "🇻🇳" },
  { code: "zh",    label: "中文",           short: "中", flag: "🇨🇳" },
  { code: "sw",    label: "Kiswahili",     short: "SW", flag: "🇹🇿" },
];

export type TranslationKey =
  // Nav
  | "nav.howItWorks"
  | "nav.modes"
  | "nav.compare"
  | "nav.faq"
  | "nav.signIn"
  | "nav.cta"
  // Hero
  | "hero.eyebrow"
  | "hero.title.0"
  | "hero.title.1"
  | "hero.title.2"
  | "hero.subtitle"
  | "hero.ctaPrimary"
  | "hero.ctaSecondary"
  | "hero.liveLabel"
  | "hero.liveCount"
  // Final CTA
  | "finalCta.title.0"
  | "finalCta.title.1"
  | "finalCta.body"
  | "finalCta.cta"
  // Footer column titles
  | "footer.product"
  | "footer.company"
  | "footer.resources"
  | "footer.legal"
  | "footer.tagline";

type TMap = Partial<Record<TranslationKey, string>>;

/** No `en` entry — English values live in copy.ts as the source-of-truth. */
export const translations: Record<Exclude<Locale, "en">, TMap> = {
  fr: {
    "nav.howItWorks":   "Comment ça marche",
    "nav.modes":        "Modes",
    "nav.compare":      "Comparer",
    "nav.faq":          "FAQ",
    "nav.signIn":       "Connexion",
    "nav.cta":          "Entrer dans l'arène",

    "hero.eyebrow":     "Arène de trading basée sur les compétences · En direct",
    "hero.title.0":     "Tradez.",
    "hero.title.1":     "Affrontez.",
    "hero.title.2":     "Gagnez.",
    "hero.subtitle":
      "L'arène pour les traders qui veulent le prouver. Affrontez en 1v1 ou en tournois avec de vrais prize pools. Pas de prop firms, pas de spreads — juste de l'edge, exécuté.",
    "hero.ctaPrimary":  "Entrer dans l'arène",
    "hero.ctaSecondary":"Comment ça marche",
    "hero.liveLabel":   "En direct",
    "hero.liveCount":   "1 847 traders en match",

    "finalCta.title.0": "Et",
    "finalCta.title.1": "vous ?",
    "finalCta.body":
      "Créez votre compte. Déposez quand vous êtes prêt. Le prochain match commence dans quelques secondes.",
    "finalCta.cta":     "Créer un compte",

    "footer.product":   "Produit",
    "footer.company":   "Société",
    "footer.resources": "Ressources",
    "footer.legal":     "Mentions légales",
    "footer.tagline":   "Tradez. Affrontez. Gagnez.",
  },

  es: {
    "nav.howItWorks":   "Cómo funciona",
    "nav.modes":        "Modos",
    "nav.compare":      "Comparar",
    "nav.faq":          "FAQ",
    "nav.signIn":       "Iniciar sesión",
    "nav.cta":          "Entrar a la arena",

    "hero.eyebrow":     "Arena de trading basada en habilidad · En vivo",
    "hero.title.0":     "Opera.",
    "hero.title.1":     "Compite.",
    "hero.title.2":     "Gana.",
    "hero.subtitle":
      "La arena para traders que quieren demostrarlo. Empareja en duelos 1v1 o torneos con premios reales. Sin prop firms, sin spreads — solo edge, ejecutado.",
    "hero.ctaPrimary":  "Entrar a la arena",
    "hero.ctaSecondary":"Cómo funciona",
    "hero.liveLabel":   "En vivo",
    "hero.liveCount":   "1.847 traders emparejados",

    "finalCta.title.0": "¿Dónde",
    "finalCta.title.1": "estás?",
    "finalCta.body":
      "Crea tu cuenta. Deposita cuando estés listo. El próximo match empieza en segundos.",
    "finalCta.cta":     "Crear cuenta",

    "footer.product":   "Producto",
    "footer.company":   "Empresa",
    "footer.resources": "Recursos",
    "footer.legal":     "Legal",
    "footer.tagline":   "Opera. Compite. Gana.",
  },

  "pt-BR": {
    "nav.howItWorks":   "Como funciona",
    "nav.modes":        "Modos",
    "nav.compare":      "Comparar",
    "nav.faq":          "FAQ",
    "nav.signIn":       "Entrar",
    "nav.cta":          "Entrar na arena",

    "hero.eyebrow":     "Arena de trading baseada em habilidade · Ao vivo",
    "hero.title.0":     "Opere.",
    "hero.title.1":     "Compita.",
    "hero.title.2":     "Ganhe.",
    "hero.subtitle":
      "A arena para traders que querem provar. Entre em duelos 1v1 ou torneios com prêmios reais. Sem prop firms, sem spreads — só edge, executado.",
    "hero.ctaPrimary":  "Entrar na arena",
    "hero.ctaSecondary":"Como funciona",
    "hero.liveLabel":   "Ao vivo",
    "hero.liveCount":   "1.847 traders em match",

    "finalCta.title.0": "Onde",
    "finalCta.title.1": "você está?",
    "finalCta.body":
      "Crie sua conta. Deposite quando estiver pronto. O próximo match começa em segundos.",
    "finalCta.cta":     "Criar conta",

    "footer.product":   "Produto",
    "footer.company":   "Empresa",
    "footer.resources": "Recursos",
    "footer.legal":     "Legal",
    "footer.tagline":   "Opere. Compita. Ganhe.",
  },

  th: {
    "nav.howItWorks":   "วิธีการทำงาน",
    "nav.modes":        "โหมด",
    "nav.compare":      "เปรียบเทียบ",
    "nav.faq":          "คำถามที่พบบ่อย",
    "nav.signIn":       "เข้าสู่ระบบ",
    "nav.cta":          "เข้าสู่สนาม",

    "hero.eyebrow":     "เวทีเทรดที่อิงทักษะ · ถ่ายทอดสด",
    "hero.title.0":     "เทรด.",
    "hero.title.1":     "แข่ง.",
    "hero.title.2":     "ชนะ.",
    "hero.subtitle":
      "เวทีสำหรับเทรดเดอร์ที่ต้องการพิสูจน์ฝีมือ จับคู่ดวล 1v1 หรือทัวร์นาเมนต์ที่มีเงินรางวัลจริง ไม่มี prop firm ไม่มีสเปรด — แค่ฝีมือล้วนๆ",
    "hero.ctaPrimary":  "เข้าสู่สนาม",
    "hero.ctaSecondary":"วิธีการทำงาน",
    "hero.liveLabel":   "ถ่ายทอดสด",
    "hero.liveCount":   "1,847 คนกำลังแข่ง",

    "finalCta.title.0": "แล้ว",
    "finalCta.title.1": "คุณล่ะ?",
    "finalCta.body":
      "สร้างบัญชีของคุณ ฝากเมื่อคุณพร้อม แมตช์ถัดไปเริ่มในไม่กี่วินาที",
    "finalCta.cta":     "สร้างบัญชี",

    "footer.product":   "ผลิตภัณฑ์",
    "footer.company":   "บริษัท",
    "footer.resources": "ทรัพยากร",
    "footer.legal":     "กฎหมาย",
    "footer.tagline":   "เทรด. แข่ง. ชนะ.",
  },

  vi: {
    "nav.howItWorks":   "Cách hoạt động",
    "nav.modes":        "Chế độ",
    "nav.compare":      "So sánh",
    "nav.faq":          "Câu hỏi",
    "nav.signIn":       "Đăng nhập",
    "nav.cta":          "Vào đấu trường",

    "hero.eyebrow":     "Đấu trường giao dịch dựa trên kỹ năng · Trực tiếp",
    "hero.title.0":     "Giao dịch.",
    "hero.title.1":     "Thi đấu.",
    "hero.title.2":     "Chiến thắng.",
    "hero.subtitle":
      "Đấu trường dành cho traders muốn chứng minh bản thân. Tham gia đấu 1v1 hoặc giải đấu với giải thưởng thực. Không prop firm, không spread — chỉ có kỹ năng được thực thi.",
    "hero.ctaPrimary":  "Vào đấu trường",
    "hero.ctaSecondary":"Cách hoạt động",
    "hero.liveLabel":   "Trực tiếp",
    "hero.liveCount":   "1.847 traders đang thi đấu",

    "finalCta.title.0": "Còn",
    "finalCta.title.1": "bạn?",
    "finalCta.body":
      "Tạo tài khoản. Nạp tiền khi sẵn sàng. Trận kế tiếp bắt đầu trong vài giây.",
    "finalCta.cta":     "Tạo tài khoản",

    "footer.product":   "Sản phẩm",
    "footer.company":   "Công ty",
    "footer.resources": "Tài nguyên",
    "footer.legal":     "Pháp lý",
    "footer.tagline":   "Giao dịch. Thi đấu. Chiến thắng.",
  },

  zh: {
    "nav.howItWorks":   "运作方式",
    "nav.modes":        "模式",
    "nav.compare":      "对比",
    "nav.faq":          "常见问题",
    "nav.signIn":       "登录",
    "nav.cta":          "进入竞技场",

    "hero.eyebrow":     "基于技能的交易竞技场 · 直播中",
    "hero.title.0":     "交易.",
    "hero.title.1":     "竞技.",
    "hero.title.2":     "获胜.",
    "hero.subtitle":
      "为想要证明自己的交易者打造的竞技场。参与 1v1 对决或锦标赛，真实奖金池。无 prop firm，无点差——只有被执行的优势。",
    "hero.ctaPrimary":  "进入竞技场",
    "hero.ctaSecondary":"运作方式",
    "hero.liveLabel":   "直播中",
    "hero.liveCount":   "1,847 名交易者已匹配",

    "finalCta.title.0": "你",
    "finalCta.title.1": "呢?",
    "finalCta.body":
      "创建账户。准备好时充值。下一场比赛几秒后开始。",
    "finalCta.cta":     "创建账户",

    "footer.product":   "产品",
    "footer.company":   "公司",
    "footer.resources": "资源",
    "footer.legal":     "法律",
    "footer.tagline":   "交易. 竞技. 获胜.",
  },

  sw: {
    "nav.howItWorks":   "Jinsi inavyofanya kazi",
    "nav.modes":        "Mitindo",
    "nav.compare":      "Linganisha",
    "nav.faq":          "Maswali",
    "nav.signIn":       "Ingia",
    "nav.cta":          "Ingia jukwaani",

    "hero.eyebrow":     "Jukwaa la biashara linaloegemea ujuzi · Moja kwa moja",
    "hero.title.0":     "Biashara.",
    "hero.title.1":     "Shindana.",
    "hero.title.2":     "Shinda.",
    "hero.subtitle":
      "Jukwaa kwa wafanyabiashara wanaotaka kuthibitisha. Pambana 1v1 au shiriki kwenye michuano yenye zawadi za kweli. Hakuna prop firm, hakuna spread — ni ujuzi tu uliotekelezwa.",
    "hero.ctaPrimary":  "Ingia jukwaani",
    "hero.ctaSecondary":"Jinsi inavyofanya kazi",
    "hero.liveLabel":   "Moja kwa moja",
    "hero.liveCount":   "1,847 wafanyabiashara wameunganishwa",

    "finalCta.title.0": "Wewe je,",
    "finalCta.title.1": "uko wapi?",
    "finalCta.body":
      "Fungua akaunti yako. Weka pesa ukiwa tayari. Pambano linalofuata linaanza ndani ya sekunde.",
    "finalCta.cta":     "Fungua akaunti",

    "footer.product":   "Bidhaa",
    "footer.company":   "Kampuni",
    "footer.resources": "Rasilimali",
    "footer.legal":     "Sheria",
    "footer.tagline":   "Biashara. Shindana. Shinda.",
  },
};

/**
 * Lookup helper used by the React context. Returns the translated value for
 * the locale, or the English fallback string, or the key itself if neither
 * is found (always returns a string — never undefined).
 */
export function lookup(locale: Locale, key: TranslationKey, fallback: string): string {
  if (locale === "en") return fallback;
  const t = translations[locale];
  return t?.[key] ?? fallback;
}
