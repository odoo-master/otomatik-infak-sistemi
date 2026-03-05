# Küresel Otomatik İnfak Sistemi (Global Automatic Infaq System)

Bu proje, kaynak dağılımını tembellik konsepti üzerinden yeniden yorumlayan, tamamen otonom ve şefkat odaklı kavramsal bir simülasyon arayüzüdür.

## 🎯 Projenin Amacı

Projenin temel felsefesi **"Tembellik Aksiyomu"**na dayanmaktadır. Bu aksiyoma göre: *"Bekleyen enerji israftır, akıt gitsin!"* 

Sistem, elde tutulan ve kullanılmayan atıl kaynakların (enerji, para, zaman, yetenek vb.) birikmesini sistem için bir yük olarak görür. Bu yükten kurtulmak ve "Pijamalı ve Mutlu" (Home Comfort Mode) durumuna geri dönmek için sistem, elindeki atıl kaynakları ihtiyaç duyan düğümlere (örneğin; Eğitim Bursu Ağı, Acil Gıda Gönüllüleri) **tamamen otomatik ve anonim** olarak dağıtır.

Amaç, yardım etme (infak) eylemini bireyin aktif karar alma yorgunluğundan çıkarıp, sistemin doğal bir boşaltım/dengeleme refleksi haline getirmektir.

## 🌟 Temel Özellikler

- **Otonom Dağıtım Protokolü:** Sistemde biriken her kaynak ("Atıl Kaynak"), kullanıcı müdahalesine gerek kalmadan en çok ihtiyaç duyan düğüme otomatik olarak aktarılır.
- **Şefkat Katsayısı (Mercy Index):** Kullanıcı, sistemin duyarlılık eşiğini bu endeks üzerinden ayarlayabilir. Katsayı arttıkça sistem düğümlerin ihtiyaçlarına daha hassas tepki verir.
- **Home Comfort Mode (Pijamalı ve Mutlu):** Sistem tıkır tıkır işlerken kullanıcının tek yapması gereken arkasına yaslanıp denge ve huzurun sağlanmasını izlemektir.
- **Anonim Aktarım:** Veren elin alan eli görmediği, kaynakların tamamen anonim olarak hedeflere ulaştığı bir ağ mimarisi simüle edilir.

## 🛠 Teknik Altyapı

Bu proje, sadelik ve şıklık prensibiyle herhangi bir ağır framework (React, Vue vb.) kullanılmadan geliştirilmiştir.

- **HTML5:** Yapısal iskelet (`index.html`)
- **Vanilla CSS:** Modern, "Glassmorphism" (cam efekti) tabanlı, karanlık mod (dark-mode) arayüz tasarımı ve akıcı animasyonlar (`style.css`)
- **Vanilla Text/Javascript:** Tembellik aksiyomunun çalışma mantığını, havuzdaki kaynakların birikmesini ve düğümlere dağıtılmasının mantığını simüle eden motor (`app.js`)

## 🚀 Nasıl Çalıştırılır?

Projenin çalışması için herhangi bir kurulum veya derleme işlemine (build process) gerek yoktur:

1. Proje dosyalarını indirin veya klonlayın.
2. Klasör içindeki `index.html` dosyasını favori tarayıcınızda (Chrome, Safari, Firefox vb.) açın.
3. Sistemin otomatik olarak atıl kaynakları üretmesini ve ihtiyaç sahibi düğümlere aktarmasını izleyin. İsterseniz "Dengeyi Sağla" butonu ile manuel olarak da süreci hızlandırabilirsiniz.

---
*"Denge sağlandı, huzur baki."*
