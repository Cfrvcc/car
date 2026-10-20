# Təmiz Minimalist Ağ-Qara (Apple Üslubu) Yenidənqurma Planı

İstifadəçinin seçiminə əsasən, sayt tamamilə **Apple minimalizmi (monoxrom ağ və qara)** üslubunda yenidən qurulacaq. Əvvəlki qarışıq rənglər, yaşıl/sarı işıqlar və zəng düyməsindəki telefon nömrəsi tamamilə ləğv edilir.

---

## 1. Vizual Konsept və Rəng Qamması (Apple Minimalist)
- **Fon və Atmosfer:** Dərin təmiz qara (OLED Black `#000000`) və mat tünd qrafit (`#121214`), incə ağ kənarlıqlar (`border-white/10`) və zərif Apple şüşə effekti.
- **Mətn və Tipoqrafiya:** Yüksək dəqiqlikli təmiz ağ başlıqlar, açıq boz alt mətnlər, heç bir artıq bəzək olmadan saf tipoqrafik iyerarxiya.
- **Rənglərin Sadələşdirilməsi:** Bütün parlaq göy/yaşıl/sarı elementlər təmiz monoxrom (ağ, qara, gümüşü) rənglərlə əvəzlənir.

---

## 2. Nömrənin Tam Gizlədilməsi və Tək Toxunuşlu Əlaqə Kartı
- **Nömrə Vizual Olaraq Yoxdur:** Əsas səhifədə, kartlarda və düymələrdə heç bir telefon nömrəsi yazılmayacaq.
- **Tək Toxunuşlu Əsas Kart:** 
  - Təmiz, monoxrom Apple üslublu böyük əsas düymə: **"Sürücü ilə Əlaqə"** və ya **"Zəng Et"** (təmiz ağ düymə, qara şriftlə).
  - Yanında təmiz minimalist **"WhatsApp"** və **"SMS"** tək toxunuşlu kartları.
  - Toxunan kimi birbaşa zəng açılır və ya WhatsApp-a keçir — ziyarətçinin nömrəni oxumasına ehtiyac qalmır.

---

## 3. Avtomobil və Sürücü Kimliyi
- **10-VX-900** rəsmi dövlət nömrə nişanı yüksək dəqiqlikli, təmiz minimalist çərçivədə.
- **Cəlal Cəfərov** adı incə və zərif şriftlə.
- Sürücü statusu: Zərif minimalist bildiriş çərçivəsi ("Müvəqqəti parklanıb · Əlaqə aktivdir").

---

## 4. Təcili Xəbərdarlıqlar və Sosial Şəbəkələr
- **Xəbərdarlıq Kartları:** Minimalist Apple siyahı formatında, incə xətlərlə ayrılmış, monoxrom nişanlarla tərtib olunmuş 6 sürətli seçim.
- **Sosial Şəbəkələr:** Telegram, Instagram və TikTok loqoları təmiz ağ/boz monoxrom üslubda, sadə keçid oxu ilə.
- **Mobil Alt Panel:** Ekranın aşağısında yalnız zəruri, zərif iki düymə: "Zəng Et" və "WhatsApp".

---

## 5. İcra Addımları
1. `src/index.css` faylında rəngli qradientləri çıxarıb, Apple monoxrom dərin qara və ağ dizayn sistemini təyin etmək.
2. `src/components/ContactCard.tsx` komponentini yenidən yazmaq: telefon nömrəsini tam gizlətmək, minimalist tək toxunuşlu düymələr quraşdırmaq.
3. `src/App.tsx` və digər modalları monoxrom Apple üslubuna uyğunlaşdırmaq.
4. `compile_applet` və `npm run build` edərək tək fayl kimi hazır vəziyyətə gətirmək.
