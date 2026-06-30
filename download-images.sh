#!/bin/bash
# Run this script once to download all images from bchiwale.ao to public/images/
# Usage: bash download-images.sh

set -e
DEST="public/images"
mkdir -p "$DEST"

declare -A IMAGES=(
  ["foto1.jpg"]="https://bchiwale.ao/wp-content/uploads/2023/11/foto1.jpg"
  ["about-main-image.jpg"]="https://bchiwale.ao/wp-content/uploads/2024/06/about-main-image.jpg"
  ["home-about-image.jpg"]="https://bchiwale.ao/wp-content/uploads/2024/06/home-about-image.jpg"
  ["whatsapp-geo-1.jpg"]="https://bchiwale.ao/wp-content/uploads/2024/06/Imagem-do-WhatsApp-de-2024-06-29-as-10.39.15_9ad028a1.jpg"
  ["whatsapp-geo-2.jpg"]="https://bchiwale.ao/wp-content/uploads/2024/06/Imagem-do-WhatsApp-de-2024-06-29-as-10.39.16_f665fb33.jpg"
  ["whatsapp-geo-3.jpg"]="https://bchiwale.ao/wp-content/uploads/2024/06/Imagem-do-WhatsApp-de-2024-06-29-as-10.39.19_94653e36.jpg"
  ["whatsapp-geo-4.jpg"]="https://bchiwale.ao/wp-content/uploads/2024/06/Imagem-do-WhatsApp-de-2024-06-29-as-10.39.19_a6104570.jpg"
  ["whatsapp-geo-5.jpg"]="https://bchiwale.ao/wp-content/uploads/2024/06/Imagem-do-WhatsApp-de-2024-06-29-as-10.39.31_636c128f.jpg"
  ["mission-image.jpg"]="https://bchiwale.ao/wp-content/uploads/2024/06/mission-image.jpg"
  ["project-1.jpg"]="https://bchiwale.ao/wp-content/uploads/2024/06/project-1.jpg"
  ["project2.jpg"]="https://bchiwale.ao/wp-content/uploads/2024/06/project2.jpg"
  ["project-3.jpg"]="https://bchiwale.ao/wp-content/uploads/2024/06/project-3.jpg"
  ["project4.jpg"]="https://bchiwale.ao/wp-content/uploads/2024/06/project4.jpg"
  ["project-main-image.jpg"]="https://bchiwale.ao/wp-content/uploads/2024/06/project-main-image.jpg"
  ["service1.jpg"]="https://bchiwale.ao/wp-content/uploads/2024/06/service1.jpg"
  ["service-baner.jpg"]="https://bchiwale.ao/wp-content/uploads/2024/06/service-baner.jpg"
  ["Team16.jpg"]="https://bchiwale.ao/wp-content/uploads/2024/06/Team16.jpg"
  ["team1.jpg"]="https://bchiwale.ao/wp-content/uploads/2024/06/team1.jpg"
  ["team2.jpg"]="https://bchiwale.ao/wp-content/uploads/2024/06/team2.jpg"
  ["team3.jpg"]="https://bchiwale.ao/wp-content/uploads/2024/06/team3.jpg"
  ["team4.jpg"]="https://bchiwale.ao/wp-content/uploads/2024/06/team4.jpg"
  ["team5.jpg"]="https://bchiwale.ao/wp-content/uploads/2024/06/team5.jpg"
  ["team6.jpg"]="https://bchiwale.ao/wp-content/uploads/2024/06/team6.jpg"
  ["Team7.jpg"]="https://bchiwale.ao/wp-content/uploads/2024/06/Team7.jpg"
  ["bannerchiwale1.webp"]="https://bchiwale.ao/wp-content/uploads/2025/04/bannerchiwale1.webp"
  ["bannerchiwale2.webp"]="https://bchiwale.ao/wp-content/uploads/2025/04/bannerchiwale2.webp"
  ["bannerchiwale3.webp"]="https://bchiwale.ao/wp-content/uploads/2025/04/bannerchiwale3.webp"
  ["caminion-1.webp"]="https://bchiwale.ao/wp-content/uploads/2025/04/caminion-1.webp"
  ["chiwale1section.webp"]="https://bchiwale.ao/wp-content/uploads/2025/04/chiwale1section.webp"
  ["geofisico.jpg"]="https://bchiwale.ao/wp-content/uploads/2025/04/geofisico.jpg"
)

SUCCESS=0
FAILED=0

for filename in "${!IMAGES[@]}"; do
  url="${IMAGES[$filename]}"
  echo -n "Downloading $filename ... "
  http_code=$(curl -s -L -o "$DEST/$filename" -w "%{http_code}" --max-time 30 "$url")
  if [ "$http_code" = "200" ]; then
    size=$(du -sh "$DEST/$filename" | cut -f1)
    echo "OK ($size)"
    ((SUCCESS++))
  else
    echo "FAILED (HTTP $http_code)"
    rm -f "$DEST/$filename"
    ((FAILED++))
  fi
done

echo ""
echo "Done: $SUCCESS downloaded, $FAILED failed."
[ "$FAILED" -eq 0 ] && echo "All images ready. Now run: bash update-image-paths.sh"
