#!/bin/bash
# Run this AFTER download-images.sh succeeds.
# Replaces all bchiwale.ao image URLs in siteData.js with local /images/ paths.

FILE="src/data/siteData.js"

sed -i \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2023/11/foto1\.jpg|/images/foto1.jpg|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2024/06/about-main-image\.jpg|/images/about-main-image.jpg|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2024/06/home-about-image\.jpg|/images/home-about-image.jpg|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2024/06/Imagem-do-WhatsApp-de-2024-06-29-as-10\.39\.15_9ad028a1\.jpg|/images/whatsapp-geo-1.jpg|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2024/06/Imagem-do-WhatsApp-de-2024-06-29-as-10\.39\.16_f665fb33\.jpg|/images/whatsapp-geo-2.jpg|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2024/06/Imagem-do-WhatsApp-de-2024-06-29-as-10\.39\.19_94653e36\.jpg|/images/whatsapp-geo-3.jpg|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2024/06/Imagem-do-WhatsApp-de-2024-06-29-as-10\.39\.19_a6104570\.jpg|/images/whatsapp-geo-4.jpg|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2024/06/Imagem-do-WhatsApp-de-2024-06-29-as-10\.39\.31_636c128f\.jpg|/images/whatsapp-geo-5.jpg|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2024/06/mission-image\.jpg|/images/mission-image.jpg|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2024/06/project-1\.jpg|/images/project-1.jpg|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2024/06/project2\.jpg|/images/project2.jpg|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2024/06/project-3\.jpg|/images/project-3.jpg|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2024/06/project4\.jpg|/images/project4.jpg|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2024/06/project-main-image\.jpg|/images/project-main-image.jpg|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2024/06/service1\.jpg|/images/service1.jpg|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2024/06/service-baner\.jpg|/images/service-baner.jpg|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2024/06/Team16\.jpg|/images/Team16.jpg|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2024/06/team1\.jpg|/images/team1.jpg|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2024/06/team2\.jpg|/images/team2.jpg|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2024/06/team3\.jpg|/images/team3.jpg|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2024/06/team4\.jpg|/images/team4.jpg|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2024/06/team5\.jpg|/images/team5.jpg|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2024/06/team6\.jpg|/images/team6.jpg|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2024/06/Team7\.jpg|/images/Team7.jpg|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2025/04/bannerchiwale1\.webp|/images/bannerchiwale1.webp|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2025/04/bannerchiwale2\.webp|/images/bannerchiwale2.webp|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2025/04/bannerchiwale3\.webp|/images/bannerchiwale3.webp|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2025/04/caminion-1\.webp|/images/caminion-1.webp|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2025/04/chiwale1section\.webp|/images/chiwale1section.webp|g' \
  -e 's|https://bchiwale\.ao/wp-content/uploads/2025/04/geofisico\.jpg|/images/geofisico.jpg|g' \
  "$FILE"

echo "siteData.js updated with local image paths."
echo "Now run: git add public/images/ src/data/siteData.js public/about-video.mp4 && git commit -m 'fix: serve all media locally for Vercel deployment'"
