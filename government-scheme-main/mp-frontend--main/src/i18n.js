import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "nav": { "home": "Home", "find_schemes": "Find Schemes", "my_matches": "My Matches", "login": "Login" },
      "home": {
        "hero_title": "Welfare Made Simple.",
        "hero_subtitle": "Join over 2.4 million citizens finding their perfect match among 3,400+ Central and State welfare programs.",
        "cta": "Find My Schemes", "how_it_works": "How it Works", "tagline": "Next-Gen Welfare Portal",
        "why_login": "Why Should You Login?",
        "why_login_desc": "Logging in creates your digital Citizen Profile which unlocks powerful automation features.",
        "how_to_use": "How to Use Gov-Match",
        "steps": {
          "s1": "Create Profile", "d1": "Answer a few simple questions about your demographic.",
          "s2": "AI Matching", "d2": "Our neural engine scans 3,400+ schemes for you.",
          "s3": "Instant Apply", "d3": "Review the document checklist and launch your application."
        }
      },
      "impact": {
        "title": "Showcase of Welfare Achievement",
        "summary": "This report covers key government schemes from 2022–2026, including Central and State initiatives.",
        "stats": { "reach": "Beneficiaries", "funds": "Disbursed", "schemes": "Schemes", "success": "Success" },
        "budget_title": "Budget Distribution",
        "budget_desc": "Visual breakdown of major scheme allocations for the 2024-25 fiscal year."
      },
      "form": {
        "title": "Tell Us About Yourself", "subtitle": "This data helps our AI find the most accurate matches for you.",
        "name": "Full Name", "age": "Age", "state": "State", "income": "Annual Income", "occupation": "Occupation", "category": "Category", "submit": "Check Eligible Schemes"
      },
      "schemes": {
        "pm_kisan": {
          "name": "PM Kisan Samman Nidhi",
          "desc": "Financial benefit of ₹6000 per year in three equal installments to all landholding farmer families.",
          "benefit1": "₹6000 per year", "benefit2": "Direct Benefit Transfer"
        },
        "kaushal_vikas": {
          "name": "Pradhan Mantri Kaushal Vikas Yojana",
          "desc": "Skill certification scheme to enable youth to take up industry-relevant skill training.",
          "benefit1": "Skill Certification", "benefit2": "Placement Assistance"
        }
      }
    }
  },
  hi: {
    translation: {
      "nav": { "home": "होम", "find_schemes": "योजनाएं खोजें", "my_matches": "मेरे मैच", "login": "लॉगिन" },
      "home": {
        "hero_title": "जनकल्याण अब सरल।",
        "hero_subtitle": "3,400+ केंद्रीय और राज्य कल्याण कार्यक्रमों में से अपने लिए सही योजना खोजें।",
        "cta": "मेरी योजनाएं खोजें", "how_it_works": "यह कैसे काम करता है", "tagline": "अगली पीढ़ी का पोर्टल",
        "why_login": "लॉगिन क्यों करें?",
        "why_login_desc": "लॉगिन करने से आपकी डिजिटल नागरिक प्रोफ़ाइल बनती है जो शक्तिशाली सुविधाओं को अनलॉक करती है।",
        "how_to_use": "Gov-Match का उपयोग कैसे करें",
        "steps": {
          "s1": "प्रोफ़ाइल बनाएं", "d1": "अपनी जनसांख्यिकी के बारे में कुछ सरल प्रश्नों के उत्तर दें।",
          "s2": "एआई मिलान", "d2": "हमारा एआई इंजन आपके लिए 3,400+ योजनाओं को स्कैन करता है।",
          "s3": "तुरंत आवेदन करें", "d3": "दस्तावेज़ चेकलिस्ट की समीक्षा करें और आवेदन शुरू करें।"
        }
      },
      "impact": {
        "title": "कल्याणकारी उपलब्धियों का प्रदर्शन",
        "summary": "यह रिपोर्ट 2022-2026 की प्रमुख सरकारी योजनाओं को कवर करती है, जिसमें केंद्रीय और राज्य पहल शामिल हैं।",
        "stats": { "reach": "लाभार्थी", "funds": "वितरित राशि", "schemes": "योजनाएं", "success": "सफलता" },
        "budget_title": "बजट वितरण",
        "budget_desc": "वित्तीय वर्ष 2024-25 के लिए प्रमुख योजना आवंटन का दृश्य विवरण।"
      },
      "form": {
        "title": "हमें अपने बारे में बताएं", "subtitle": "यह डेटा हमारे एआई को आपके लिए सबसे सटीक मिलान खोजने में मदद करता है।",
        "name": "पूरा नाम", "age": "आयु", "state": "राज्य", "income": "वार्षिक आय", "occupation": "व्यवसाय", "category": "श्रेणी", "submit": "पात्र योजनाओं की जाँच करें"
      },
      "schemes": {
        "pm_kisan": {
          "name": "पीएम किसान सम्मान निधि",
          "desc": "सभी भूमिधारक किसान परिवारों को तीन समान किश्तों में ₹6000 प्रति वर्ष का वित्तीय लाभ।",
          "benefit1": "₹6000 प्रति वर्ष", "benefit2": "प्रत्यक्ष लाभ हस्तांतरण"
        },
        "kaushal_vikas": {
          "name": "प्रधानमंत्री कौशल विकास योजना",
          "desc": "युवाओं को उद्योग-प्रासंगिक कौशल प्रशिक्षण लेने में सक्षम बनाने के लिए कौशल प्रमाणन योजना।",
          "benefit1": "कौशल प्रमाणन", "benefit2": "नियोजन सहायता"
        }
      }
    }
  },
  kn: {
    translation: {
      "nav": { "home": "ಮನೆ", "find_schemes": "ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ", "my_matches": "ನನ್ನ ಹೊಂದಾಣಿಕೆಗಳು", "login": "ಲಾಗಿನ್" },
      "home": {
        "hero_title": "ಜನಕಲ್ಯಾಣ ಈಗ ಸರಳ.",
        "hero_subtitle": "3,400+ ಕೇಂದ್ರ ಮತ್ತು ರಾಜ್ಯ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳಲ್ಲಿ ನಿಮಗಾಗಿ ಸರಿಯಾದ ಆಯ್ಕೆಯನ್ನು ಹುಡುಕಲು ನಮ್ಮ AI ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
        "cta": "ನನ್ನ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ", "how_it_works": "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ", "tagline": "ಮುಂದಿನ ಪೀಳಿಗೆಯ ಕಲ್ಯಾಣ ಪೋರ್ಟಲ್",
        "why_login": "ಲಾಗಿನ್ ಏಕೆ ಮಾಡಬೇಕು?",
        "why_login_desc": "ಲಾಗಿನ್ ಆಗುವುದರಿಂದ ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಪ್ರೊಫೈಲ್ ರಚನೆಯಾಗುತ್ತದೆ, ಇದು ಅನೇಕ ಸೌಲಭ್ಯಗಳನ್ನು ನೀಡುತ್ತದೆ.",
        "how_to_use": "Gov-Match ಬಳಸುವುದು ಹೇಗೆ?",
        "steps": {
          "s1": "ಪ್ರೊಫೈಲ್ ರಚಿಸಿ", "d1": "ನಿಮ್ಮ ಬಗ್ಗೆ ಕೆಲವು ಸರಳ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ.",
          "s2": "AI ಹೊಂದಾಣಿಕೆ", "d2": "ನಮ್ಮ AI ಎಂಜಿನ್ ನಿಮಗಾಗಿ 3,400+ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕುತ್ತದೆ.",
          "s3": "ತಕ್ಷಣ ಅರ್ಜಿ ಹಾಕಿ", "d3": "ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಅರ್ಜಿಯನ್ನು ಪ್ರಾರಂಭಿಸಿ."
        }
      },
      "impact": {
        "title": "ಜನಕಲ್ಯಾಣ ಸಾಧನೆಗಳ ಪ್ರದರ್ಶನ",
        "summary": "ಈ ವರದಿಯು 2022-2026ರ ಪ್ರಮುಖ ಕೇಂದ್ರ ಮತ್ತು ರಾಜ್ಯ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಒಳಗೊಂಡಿದೆ.",
        "stats": { "reach": "ಫಲಾನುಭವಿಗಳು", "funds": "ವಿತರಿಸಿದ ಹಣ", "schemes": "ಯೋಜನೆಗಳು", "success": "ಯಶಸ್ಸು" },
        "budget_title": "ಬಜೆಟ್ ಹಂಚಿಕೆ",
        "budget_desc": "2024-25ನೇ ಹಣಕಾಸು ವರ್ಷದ ಪ್ರಮುಖ ಯೋಜನೆಗಳ ಹಂಚಿಕೆಯ ವಿವರ."
      },
      "form": {
        "title": "ನಿಮ್ಮ ಬಗ್ಗೆ ನಮಗೆ ತಿಳಿಸಿ", "subtitle": "ನಿಮಗಾಗಿ ಹೆಚ್ಚು ನಿಖರವಾದ ಹೊಂದಾಣಿಕೆಗಳನ್ನು ಹುಡುಕಲು ಈ ಡೇಟಾ ನಮ್ಮ AI ಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
        "name": "ಪೂರ್ಣ ಹೆಸರು", "age": "ವಯಸ್ಸು", "state": "ರಾಜ್ಯ", "income": "ವಾರ್ಷಿಕ ಆದಾಯ", "occupation": "ಉದ್ಯೋಗ", "category": "ವರ್ಗ", "submit": "ಅರ್ಹ ಯೋಜನೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ"
      },
      "schemes": {
        "pm_kisan": {
          "name": "ಪಿಎಂ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ",
          "desc": "ಎಲ್ಲಾ ಭೂಹಿಡುವಳಿ ಹೊಂದಿರುವ ರೈತ ಕುಟುಂಬಗಳಿಗೆ ವರ್ಷಕ್ಕೆ 6000 ರೂಪಾಯಿಗಳ ಆರ್ಥಿಕ ನೆರವು.",
          "benefit1": "ವರ್ಷಕ್ಕೆ ₹6000", "benefit2": "ನೇರ ಲಾಭ ವರ್ಗಾವಣೆ"
        },
        "kaushal_vikas": {
          "name": "ಪ್ರಧಾನ ಮಂತ್ರಿ ಕೌಶಲ್ಯ ವಿಕಾಸ ಯೋಜನೆ",
          "desc": "ಯುವಕರು ಉದ್ಯಮ-ಸಂಬಂಧಿತ ಕೌಶಲ್ಯ ತರಬೇತಿಯನ್ನು ಪಡೆಯಲು ಅನುವು ಮಾಡಿಕೊಡುವ ಕೌಶಲ್ಯ ಪ್ರಮಾಣೀಕರಣ ಯೋಜನೆ.",
          "benefit1": "ಕೌಶಲ್ಯ ಪ್ರಮಾಣೀಕರಣ", "benefit2": "ಉದ್ಯೋಗ ನೆರವು"
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;
