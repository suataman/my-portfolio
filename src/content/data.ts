import type { Locale } from "@/i18n/routing";

/** A string written in every supported language. */
export type L = Record<Locale, string>;

export const pick = (value: L, locale: string): string =>
  value[locale as Locale] ?? value.en;

export const profile = {
  name: "Umut Şuataman",
  email: "suatamanumut@gmail.com",
  location: { en: "Istanbul, Türkiye", tr: "İstanbul, Türkiye" } satisfies L,
  links: {
    github: "https://github.com/suataman",
    linkedin: "https://www.linkedin.com/in/umutsuataman",
    medium: "https://medium.com/@suatamanumut",
  },
  cv: {
    ml: "/cv/Umut_Suataman_CV_ML_EN.pdf",
    web: "/cv/Umut_Suataman_CV_Web_EN.pdf",
  },
  githubUser: "suataman",
};

export type Metric = { label: string; value: string };

export type Project = {
  slug: string;
  repo?: string; // GitHub repo name under profile.githubUser
  title: L;
  summary: L;
  context: L;
  tags: string[];
  image?: { src: string; alt: L; width: number; height: number };
  overview: L;
  highlights: L[];
  pipeline: L[];
  metrics?: { caption: L; columns: string[]; rows: (string | number)[][] };
  links?: { label: string; href: string }[];
  note?: L;
};

export const featuredProjects: Project[] = [
  {
    slug: "uav-detection-tracking",
    repo: "Fixed-Wing-UAV-Detection-Tracking",
    title: {
      en: "Fixed-Wing UAV Detection & Tracking",
      tr: "Sabit Kanatlı İHA Tespit ve Takibi",
    },
    summary: {
      en: "Real-time detection and tracking of fixed-wing UAVs in video with YOLOv8 and OpenCV.",
      tr: "YOLOv8 ve OpenCV ile videodaki sabit kanatlı İHA'ların gerçek zamanlı tespiti ve takibi.",
    },
    context: {
      en: "TEKNOFEST Combat UAV · MİSYA team",
      tr: "TEKNOFEST Savaşan İHA · MİSYA takımı",
    },
    tags: ["Python", "YOLOv8", "OpenCV", "Object Tracking"],
    image: {
      src: "/images/projects/uav-detection.png",
      alt: {
        en: "Tracking window showing a fixed-wing UAV locked inside a target box with FPS, confidence, yaw, pitch and distance overlays",
        tr: "Hedef kutusu içinde kilitlenmiş sabit kanatlı İHA; FPS, güven skoru, yaw, pitch ve mesafe bilgileri ekranda",
      },
      width: 1348,
      height: 935,
    },
    overview: {
      en: "Built for the TEKNOFEST Combat UAV competition: the system finds an enemy fixed-wing aircraft in the camera stream and keeps it locked while it moves across the frame. A YOLOv8 detector finds the target, then a tracker follows it between detections so the pipeline stays fast enough for real time.",
      tr: "TEKNOFEST Savaşan İHA yarışması için geliştirildi: sistem kamera görüntüsündeki rakip sabit kanatlı İHA'yı bulur ve kadrajda hareket ederken kilitli tutar. YOLOv8 dedektörü hedefi bulur, ardından bir takipçi tespitler arasında hedefi izler; böylece sistem gerçek zamanlı çalışacak kadar hızlı kalır.",
    },
    highlights: [
      {
        en: "YOLOv8 model for detecting fixed-wing UAVs in sky footage",
        tr: "Gökyüzü görüntülerinde sabit kanatlı İHA tespiti için YOLOv8 modeli",
      },
      {
        en: "Detection + tracking loop with automatic tracker reset to recover from drift",
        tr: "Sapmaları düzeltmek için otomatik sıfırlanan tespit + takip döngüsü",
      },
      {
        en: "Live overlay: FPS, detection confidence, yaw / pitch offsets and estimated distance to target",
        tr: "Canlı ekran bilgisi: FPS, tespit güven skoru, yaw / pitch sapmaları ve hedefe tahmini mesafe",
      },
    ],
    pipeline: [
      { en: "UAV video stream", tr: "İHA video akışı" },
      { en: "YOLOv8 detection", tr: "YOLOv8 tespiti" },
      { en: "Object tracking", tr: "Nesne takibi" },
      { en: "Yaw / pitch & distance", tr: "Yaw / pitch ve mesafe" },
      { en: "Real-time overlay", tr: "Gerçek zamanlı çıktı" },
    ],
    note: {
      en: "A demo video is available in the GitHub repository.",
      tr: "Demo videosu GitHub reposunda yer alıyor.",
    },
  },
  {
    slug: "heart-disease-prediction",
    repo: "Heart_Disease_Prediction_Analysis",
    title: {
      en: "Heart Disease Risk Prediction",
      tr: "Kalp Hastalığı Risk Tahmini",
    },
    summary: {
      en: "Comparing four ML models on clinical data. Best model: Logistic Regression with 0.90 ROC-AUC.",
      tr: "Klinik veride dört ML modelinin karşılaştırması. En iyi model: 0.90 ROC-AUC ile Lojistik Regresyon.",
    },
    context: {
      en: "Huawei × Türkiye AI Academy bootcamp · final project",
      tr: "Huawei × Türkiye Yapay Zeka Akademisi bootcamp · bitirme projesi",
    },
    tags: ["Python", "scikit-learn", "pandas", "seaborn", "matplotlib"],
    overview: {
      en: "An end-to-end machine-learning study on a heart-disease dataset of 270 patients and 13 clinical features. I explored the data, built a reproducible preprocessing pipeline and compared four classifiers, choosing the final model by recall as well as accuracy, because a missed patient costs more than a false alarm.",
      tr: "270 hasta ve 13 klinik özellik içeren kalp hastalığı veri seti üzerinde uçtan uca bir makine öğrenmesi çalışması. Veriyi inceledim, tekrarlanabilir bir ön işleme hattı kurdum ve dört sınıflandırıcıyı karşılaştırdım. Gözden kaçan bir hasta, yanlış alarmdan daha maliyetli olduğu için final modeli doğruluğun yanında recall'a göre de seçtim.",
    },
    highlights: [
      {
        en: "Exploratory data analysis and feature inspection with pandas, seaborn and matplotlib",
        tr: "pandas, seaborn ve matplotlib ile keşifsel veri analizi",
      },
      {
        en: "Stratified 80/20 train-test split and 5-fold cross-validation",
        tr: "Tabakalı 80/20 eğitim-test ayrımı ve 5 katlı çapraz doğrulama",
      },
      {
        en: "Logistic Regression reached 0.917 recall: it caught 11 of every 12 sick patients",
        tr: "Lojistik Regresyon 0.917 recall'a ulaştı: her 12 hastanın 11'ini yakaladı",
      },
      {
        en: "Results written up as an article on Medium",
        tr: "Sonuçlar Medium'da makale olarak yayımlandı",
      },
    ],
    pipeline: [
      { en: "Raw clinical data", tr: "Ham klinik veri" },
      { en: "EDA & preprocessing", tr: "EDA ve ön işleme" },
      { en: "Train 4 models", tr: "4 model eğitimi" },
      { en: "Cross-validation", tr: "Çapraz doğrulama" },
      { en: "ROC / recall analysis", tr: "ROC / recall analizi" },
    ],
    metrics: {
      caption: {
        en: "Test-set results (stratified 20% hold-out)",
        tr: "Test seti sonuçları (tabakalı %20 ayrılmış veri)",
      },
      columns: ["Model", "Accuracy", "ROC-AUC"],
      rows: [
        ["Logistic Regression", "0.852", "0.899"],
        ["Random Forest", "0.833", "0.867"],
        ["SVM (RBF)", "0.815", "0.886"],
        ["KNN", "0.796", "0.884"],
      ],
    },
    links: [{ label: "Medium", href: "https://medium.com/@suatamanumut" }],
  },
  {
    slug: "gps-free-autonomous-flight",
    title: {
      en: "GPS-free Autonomous Flight",
      tr: "GPS'siz Otonom Uçuş",
    },
    summary: {
      en: "Visual-inertial localization for a UAV with no GPS, integrated over ROS2 and tested in Gazebo + ArduPilot.",
      tr: "GPS olmadan İHA için görsel-ataletsel konumlama; ROS2 üzerinden entegre edildi, Gazebo + ArduPilot'ta test edildi.",
    },
    context: {
      en: "Internship · Misya Aviation & Software Technologies",
      tr: "Staj · Misya Havacılık ve Yazılım Teknolojileri",
    },
    tags: ["ROS2", "VIO", "ArduPilot", "Gazebo Harmonic", "Sensor Fusion"],
    overview: {
      en: "When GPS is jammed or unavailable, a drone has to work out where it is from what it sees. During my internship at Misya I worked on visual-inertial odometry (VIO): fusing camera and IMU data to estimate the vehicle's pose, then and testing it with the ArduPilot flight stack in simulation.",
      tr: "GPS karıştırıldığında ya da hiç olmadığında, bir İHA nerede olduğunu gördüklerinden çıkarmak zorundadır. Misya'daki stajımda görsel-ataletsel odometri (VIO) üzerinde çalıştım: kamera ve IMU verisini birleştirip aracın konumunu tahmin etmek, ve bunu simülasyonda ArduPilot ile test etmek.",
    },
    highlights: [
      {
        en: "Camera + IMU sensor integration and data flow over ROS2 topics",
        tr: "ROS2 topic'leri üzerinden kamera + IMU sensör entegrasyonu ve veri akışı",
      },
      {
        en: "VIO-based pose estimation as a replacement for GPS",
        tr: "GPS yerine VIO tabanlı konum tahmini",
      },
      {
        en: "Flight tests with ArduPilot in a Gazebo Harmonic simulation",
        tr: "Gazebo Harmonic simülasyonunda ArduPilot ile uçuş testleri",
      },
    ],
    pipeline: [
      { en: "Camera + IMU", tr: "Kamera + IMU" },
      { en: "ROS2 topics", tr: "ROS2 topic'leri" },
      { en: "VIO pose estimate", tr: "VIO konum tahmini" },
      { en: "ArduPilot", tr: "ArduPilot" },
      { en: "Gazebo simulation", tr: "Gazebo simülasyonu" },
    ],
    note: {
      en: "Internship work: the source code is not public.",
      tr: "Staj çalışması: kaynak kodu herkese açık değil.",
    },
  },
  {
    slug: "image-processor-webapp",
    repo: "image-processor-webapp",
    title: { en: "Image Processor Webapp", tr: "Görüntü İşleme Web Uygulaması" },
    summary: {
      en: "A web app that runs OpenCV operations (crop, rotate, flip, resize) on uploaded images.",
      tr: "Yüklenen görsellerde OpenCV işlemleri (kırpma, döndürme, çevirme, yeniden boyutlandırma) yapan web uygulaması.",
    },
    context: {
      en: "Where computer vision meets the web",
      tr: "Görüntü işleme ile web'in buluştuğu nokta",
    },
    tags: ["Python", "OpenCV", "JavaScript", "Web"],
    overview: {
      en: "A small full-stack tool that puts OpenCV behind a browser UI. Users upload an image, pick an operation and download the processed result. The Python side does the image processing; the JavaScript front end handles upload and preview.",
      tr: "OpenCV'yi bir tarayıcı arayüzünün arkasına koyan küçük bir full-stack araç. Kullanıcı görsel yükler, işlemi seçer ve işlenmiş sonucu indirir. Görüntü işleme Python tarafında, yükleme ve önizleme JavaScript ön yüzünde yapılır.",
    },
    highlights: [
      {
        en: "Crop, rotate, flip and resize operations powered by OpenCV",
        tr: "OpenCV ile kırpma, döndürme, çevirme ve yeniden boyutlandırma",
      },
      {
        en: "Upload → process → preview → download flow in the browser",
        tr: "Tarayıcıda yükle → işle → önizle → indir akışı",
      },
      {
        en: "Original and processed files stored side by side",
        tr: "Orijinal ve işlenmiş dosyalar yan yana saklanır",
      },
    ],
    pipeline: [
      { en: "Upload image", tr: "Görsel yükleme" },
      { en: "Choose operation", tr: "İşlem seçimi" },
      { en: "OpenCV processing", tr: "OpenCV işleme" },
      { en: "Preview & download", tr: "Önizleme ve indirme" },
    ],
  },
];

export type OtherProject = {
  repo: string;
  title: string;
  description: L;
  language: string;
};

export const otherProjects: OtherProject[] = [
  {
    repo: "Data_Science_Fund",
    title: "Data Science Fundamentals",
    description: {
      en: "Notebooks covering the fundamentals for data-science learners.",
      tr: "Veri bilimine yeni başlayanlar için temel konuları anlatan notebook'lar.",
    },
    language: "Jupyter Notebook",
  },
  {
    repo: "chat-sentiment-app",
    title: "Chat Sentiment App",
    description: {
      en: "Full-stack chat app with live AI sentiment analysis.",
      tr: "Canlı yapay zekâ duygu analizi yapan full-stack sohbet uygulaması.",
    },
    language: "C#",
  },
  {
    repo: "descriptive-sound-analysis",
    title: "Descriptive Sound Analysis",
    description: {
      en: "Descriptive statistical analysis of letter sounds.",
      tr: "Harf seslerinin tanımlayıcı istatistiksel analizi.",
    },
    language: "Java",
  },
];

export type Experience = {
  org: string;
  role: L;
  period: string;
  kind: L;
  description: L;
  tags: string[];
};

export const experience: Experience[] = [
  {
    org: "Misya Havacılık ve Yazılım Teknolojileri",
    role: { en: "Autonomous UAV Intern", tr: "Otonom İHA Stajyeri" },
    period: "2025",
    kind: { en: "Internship", tr: "Staj" },
    description: {
      en: "GPS-free autonomous flight: VIO-based localization, ROS2 sensor integration and data flow, simulation with Gazebo Harmonic and ArduPilot.",
      tr: "GPS'siz otonom uçuş: VIO tabanlı konumlama, ROS2 ile sensör entegrasyonu ve veri akışı, Gazebo Harmonic ve ArduPilot ile simülasyon.",
    },
    tags: ["ROS2", "VIO", "ArduPilot", "Gazebo"],
  },
  {
    org: "MİSYA · TEKNOFEST Combat UAV",
    role: { en: "Software Team Member", tr: "Yazılım Ekibi Üyesi" },
    period: "2024 – 2025",
    kind: { en: "Competition team", tr: "Yarışma takımı" },
    description: {
      en: "Built the YOLOv8-based real-time target detection and tracking system for the team's combat UAV.",
      tr: "Takımın savaşan İHA'sı için YOLOv8 tabanlı gerçek zamanlı hedef tespit ve takip sistemini geliştirdim.",
    },
    tags: ["YOLOv8", "OpenCV", "Python"],
  },
  {
    org: "BTC Bilişim Hizmetleri",
    role: { en: "ERP Intern", tr: "ERP Stajyeri" },
    period: "2024",
    kind: { en: "Internship", tr: "Staj" },
    description: {
      en: "Worked with SAP-based ERP systems and learned how enterprise software processes and data flows are run.",
      tr: "SAP tabanlı ERP sistemleriyle çalıştım; kurumsal yazılım süreçlerinin ve veri akışlarının nasıl yürütüldüğünü öğrendim.",
    },
    tags: ["SAP", "ERP"],
  },
  {
    org: "IEEE BAUN · TEKNOFEST TravelArt",
    role: { en: "Back-End Developer", tr: "Back-End Geliştirici" },
    period: "2022 – 2023",
    kind: { en: "Competition team", tr: "Yarışma takımı" },
    description: {
      en: "Built backend modules for data management, authentication and content in a tourism-tech web app, from planning to deployment.",
      tr: "Turizm teknolojisi web uygulamasında veri yönetimi, kimlik doğrulama ve içerik için backend modülleri geliştirdim; planlamadan yayına kadar sürece dahil oldum.",
    },
    tags: ["Backend", "REST API", "Auth"],
  },
];

export const skillGroups: { title: L; items: string[] }[] = [
  {
    title: { en: "Machine Learning & Data", tr: "Makine Öğrenmesi ve Veri" },
    items: ["Python", "scikit-learn", "TensorFlow / Keras", "pandas", "NumPy", "matplotlib", "seaborn", "Jupyter"],
  },
  {
    title: { en: "Computer Vision", tr: "Görüntü İşleme" },
    items: ["OpenCV", "YOLOv8", "Object Detection", "Object Tracking"],
  },
  {
    title: { en: "Robotics & Autonomy", tr: "Robotik ve Otonomi" },
    items: ["ROS2", "Gazebo Harmonic", "ArduPilot", "VIO", "Sensor Integration"],
  },
  {
    title: { en: "Software & Web", tr: "Yazılım ve Web" },
    items: ["Java", "C#", "React", "Next.js", "Node.js", "REST APIs", "MySQL", "Firebase", "Git"],
  },
];

export const education = {
  school: { en: "Balıkesir University", tr: "Balıkesir Üniversitesi" } satisfies L,
  degree: {
    en: "B.Sc. Computer Engineering",
    tr: "Bilgisayar Mühendisliği Lisans",
  } satisfies L,
  period: "2025",
};

export type Certificate = {
  /** Stable unique key (kebab-case). */
  id: string;
  title: L;
  issuer: string;
  /** Free-form date, e.g. "2024" or "Mar 2025". */
  date?: string;
  /** Scan/photo in public/certificates/. Width/height = real pixel size. */
  image?: { src: string; width: number; height: number };
  /** Online verification link (Coursera, Credly, etc.). */
  url?: string;
};

/** Newest first. To add one: put the image in public/certificates/ and append an entry. */
export const certificates: Certificate[] = [
  {
    id: "huawei-ds-ml-bootcamp",
    title: {
      en: "Data Science & Machine Learning Bootcamp",
      tr: "Veri Bilimi ve Makine Öğrenmesi Bootcamp",
    },
    issuer: "Huawei × Türkiye Yapay Zeka Akademisi",
    image: { src: "/certificates/huawei-bootcamp.jpg", width: 1600, height: 1131 },
  },
];
