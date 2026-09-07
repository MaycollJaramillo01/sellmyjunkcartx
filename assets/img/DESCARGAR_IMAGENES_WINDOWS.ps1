$ErrorActionPreference = 'Stop'
$dest = Join-Path $PSScriptRoot 'imagenes'
New-Item -ItemType Directory -Force -Path $dest | Out-Null

Write-Host 'Descargando 01_ojos_variante_1.webp...'
Invoke-WebRequest -Uri 'https://content.app-sources.com/s/544134501380735751/uploads/Autos_/ojosrpoom-3681180_1-5058932.png?format=webp' -OutFile (Join-Path $dest '01_ojos_variante_1.webp')
Write-Host 'Descargando 02_vehiculos_estacionados.webp...'
Invoke-WebRequest -Uri 'https://content.app-sources.com/s/544134501380735751/uploads/Descargado/pfrm_expl_unsplsh-iHce8QZFQOk-0253009.webp?format=webp' -OutFile (Join-Path $dest '02_vehiculos_estacionados.webp')
Write-Host 'Descargando 03_interseccion_trafico.webp...'
Invoke-WebRequest -Uri 'https://content.app-sources.com/s/544134501380735751/uploads/Descargado/pfrm_expl_unsplsh-TcSweD8mGN0-0140505.webp?format=webp' -OutFile (Join-Path $dest '03_interseccion_trafico.webp')
Write-Host 'Descargando 04_auto_blanco.webp...'
Invoke-WebRequest -Uri 'https://content.app-sources.com/s/544134501380735751/thumbnails/640x480/Im%C3%A1genes/pngtree-sporty-white-car-with-modern-design-for-speed-enthusiasts-and-automotive-png-image_15914202_1-9015815.png?format=webp' -OutFile (Join-Path $dest '04_auto_blanco.webp')
Write-Host 'Descargando 05_ojos_variante_2.webp...'
Invoke-WebRequest -Uri 'https://content.app-sources.com/s/544134501380735751/uploads/Autos_/ojosrpoom-3681180.png?format=webp' -OutFile (Join-Path $dest '05_ojos_variante_2.webp')
Write-Host 'Descargando 06_auto_estacionamiento.webp...'
Invoke-WebRequest -Uri 'https://content.app-sources.com/s/544134501380735751/uploads/Descargado/pfrm_expl_unsplsh-zCgCV0id4s0-9018915.webp?format=webp' -OutFile (Join-Path $dest '06_auto_estacionamiento.webp')
Write-Host 'Descargando 07_operador_tow_truck.webp...'
Invoke-WebRequest -Uri 'https://content.app-sources.com/s/544134501380735751/uploads/Autos_/WhatsApp_Image_2026-02-06_at_9.29.17_AM_1-0384610.jpeg?format=webp' -OutFile (Join-Path $dest '07_operador_tow_truck.webp')
Write-Host 'Descargando 08_firma_venta_auto.webp...'
Invoke-WebRequest -Uri 'https://content.app-sources.com/s/544134501380735751/uploads/Autos_/WhatsApp_Image_2026-02-06_at_9.29.17_AM-0384610.jpeg?format=webp' -OutFile (Join-Path $dest '08_firma_venta_auto.webp')
Write-Host 'Descargando 09_auto_en_grua.webp...'
Invoke-WebRequest -Uri 'https://content.app-sources.com/s/544134501380735751/uploads/Autos_/WhatsApp_Image_2026-02-06_at_9.29.17_AM_2-0384610.jpeg?format=webp' -OutFile (Join-Path $dest '09_auto_en_grua.webp')

Write-Host ''
Write-Host 'Listo. Las imagenes estan en:' $dest