fetch('http://localhost:3000/api/cardIstatistik')
    .then(response => response.json())
    .then(data => {
        document.getElementById('aracSayisi').innerText = data.mevcut_araclar[0].arac_sayisi;
        document.getElementById('stn_alnblck_sayisi').innerText = data.stn_alnblck_sayisi[0].arac_sayisi;
        document.getElementById('sorunSayisi').innerText = data.sorun_sayisi[0].sorun_sayisi;
        document.getElementById('kiralamaSayisi').innerText = data.toplam_kira[0].senelik_kiralama_sayisi;
    })
    .catch(error => console.error('Error:', error));