const dbConn = require('../db/mysql');


const aracAd = (req, res) => {
    dbConn.query(`SELECT CONCAT(satin_alinabilecek_araclar.marka,' ',satin_alinabilecek_araclar.model) as marka_model, satin_alinabilecek_araclar.arac_id from satin_alinabilecek_araclar;`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
}

const aracAd1 = (req, res) => {
    dbConn.query(`
    SELECT CONCAT(mevcut_araclar.marka,' ', mevcut_araclar.model ) as marka_model, mevcut_araclar.mevcut_arac_id from mevcut_araclar `
        , (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        });
}



const araclar = (req, res) => {
    const { arac_id } = req.params;
    const query1 = `
        SELECT CONCAT(satin_alinabilecek_araclar.marka,' ', satin_alinabilecek_araclar.model) as marka_model, 
               satin_alinabilecek_araclar.motor_hacim as motor_hacim,
               satin_alinabilecek_araclar.sanzıman as sanziman,
               satin_alinabilecek_araclar.motor_beygir as motor_beygir,
               satin_alinabilecek_araclar.bakim_maliyet as bakim_maliyet,
               satin_alinabilecek_araclar.yillik_vergi as yillik_vergi,
               satin_alinabilecek_araclar.yakit_tuketim as yakit_tuketim,
               satin_alinabilecek_araclar.emisyon as emisyon,
               satin_alinabilecek_araclar.satın_alim_maliyet as satın_alim_maliyet,
               satin_alinabilecek_araclar.kiralama_fiyat as kiralama_fiyat,
               satin_alinabilecek_araclar.yakıt_turu as yakıt_turu
        FROM satin_alinabilecek_araclar  
        WHERE satin_alinabilecek_araclar.arac_id = ?;
    `;
    const query2 = `
        SELECT CONCAT(satin_alinabilecek_araclar.marka,' ', satin_alinabilecek_araclar.model), 
               kronik_ariza.ariza_ad, 
               kronik_ariza.ariza_aciklama, 
               kronik_ariza.ariza_olasi_maliyet  
        FROM satin_alinabilecek_araclar 
        LEFT JOIN kronik_ariza 
        ON satin_alinabilecek_araclar.arac_id = kronik_ariza.arac_id 
        WHERE satin_alinabilecek_araclar.arac_id = ?;
    `;
    Promise.all([
        new Promise((resolve, reject) => {
            dbConn.query(query1, [arac_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        }),
        new Promise((resolve, reject) => {
            dbConn.query(query2, [arac_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        })
    ])
        .then(results => {
            res.json({ araclar: results[0], kronik_ariza: results[1] });
        })
        .catch(error => console.error('Error:', error));
}

const mevcutAraclar = (req, res) => {
    const { mevcut_arac_id } = req.params;

    new Promise((resolve, reject) => {
        dbConn.query(`SELECT aylik_kiralama_orani.ocak_verisi,
        aylik_kiralama_orani.subat_verisi,aylik_kiralama_orani.mart_verisi,
        aylik_kiralama_orani.nisan_verisi,aylik_kiralama_orani.mayis_verisi,
        aylik_kiralama_orani.haziran_verisi,aylik_kiralama_orani.temmuz_verisi,
        aylik_kiralama_orani.agustos_verisi,aylik_kiralama_orani.eylul_verisi,
        aylik_kiralama_orani.ekim_verisi,aylik_kiralama_orani.kasim_verisi,
        aylik_kiralama_orani.aralik_verisi
        FROM mevcut_araclar LEFT JOIN aylik_kiralama_orani ON aylik_kiralama_orani.oran_id=mevcut_araclar.mevcut_arac_id WHERE mevcut_araclar.mevcut_arac_id = ?;`, [mevcut_arac_id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })
        .then(result => res.json(result))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'An error occurred while querying the database' });
        });
}

const toplamHasilat = (req, res) => {
    const { mevcut_arac_id } = req.params;

    new Promise((resolve, reject) => {
        dbConn.query(`SELECT concat(mevcut_araclar.marka," ",mevcut_araclar.model)AS marka_model,(aylik_kiralama_orani.ocak_verisi+aylik_kiralama_orani.subat_verisi+aylik_kiralama_orani.mart_verisi+aylik_kiralama_orani.nisan_verisi+aylik_kiralama_orani.mayis_verisi+aylik_kiralama_orani.haziran_verisi+aylik_kiralama_orani.temmuz_verisi+aylik_kiralama_orani.agustos_verisi+aylik_kiralama_orani.eylul_verisi+aylik_kiralama_orani.ekim_verisi+aylik_kiralama_orani.kasim_verisi+aylik_kiralama_orani.aralik_verisi)*(mevcut_araclar.kiralama_bedeli)AS toplam_hasilat
        FROM mevcut_araclar,aylik_kiralama_orani
        WHERE mevcut_araclar.mevcut_arac_id=aylik_kiralama_orani.oran_id
        GROUP BY mevcut_araclar.mevcut_arac_id;`, [mevcut_arac_id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })
        .then(result => res.json(result))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'An error occurred while querying the database' });
        });
}

const aracIstatistik = (req, res) => {
    const { mevcut_arac_id } = req.params;

    new Promise((resolve, reject) => {
        dbConn.query(`SELECT * 
        FROM mevcut_araclar;`, [mevcut_arac_id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })
        .then(result => res.json(result))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'An error occurred while querying the database' });
        });
}

const kiralamaSorunlari = (req, res) => {
    const { mevcut_arac_id } = req.params;

    new Promise((resolve, reject) => {
        dbConn.query(`SELECT CONCAT(mevcut_araclar.marka, ' ',mevcut_araclar.model) as model_arac, kiralama_sorunlari.sorun_baslik,kiralama_sorunlari.sorun_aciklama,kiralama_sorunlari.sorun_maliyet
        FROM mevcut_araclar LEFT JOIN kiralama_sorunlari ON mevcut_araclar.mevcut_arac_id = kiralama_sorunlari.mevcut_arac_id
        WHERE mevcut_araclar.mevcut_arac_id = ?;`, [mevcut_arac_id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })
        .then(result => res.json(result))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'An error occurred while querying the database' });
        });
}

const maliyetler = (req, res) => {
    const query = `
        SELECT mevcut_araclar.bakim_maliyet,
               mevcut_araclar.yillik_vergi,
               SUM(kiralama_sorunlari.sorun_maliyet) AS sorunlar_toplam_maliyet,
               CONCAT(mevcut_araclar.marka," ",mevcut_araclar.model) AS marka_model,
               mevcut_araclar.mevcut_arac_id
        FROM mevcut_araclar
        LEFT JOIN kiralama_sorunlari ON mevcut_araclar.mevcut_arac_id=kiralama_sorunlari.mevcut_arac_id
        GROUP BY mevcut_araclar.mevcut_arac_id;
    `;

    dbConn.query(query, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('An error occurred while executing the query.');
        } else {
            res.send(result);
        }
    });
};

const sorunAdet = (req, res) => {
    const query = `
    SELECT COUNT(kiralama_sorunlari.sorun_id)AS sorun_adet,CONCAT(mevcut_araclar.marka," ",mevcut_araclar.model) as marka_model
    FROM mevcut_araclar LEFT JOIN kiralama_sorunlari ON mevcut_araclar.mevcut_arac_id=kiralama_sorunlari.mevcut_arac_id
    GROUP BY mevcut_araclar.mevcut_arac_id;
    `;

    dbConn.query(query, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('An error occurred while executing the query.');
        } else {
            res.send(result);
        }
    });
}

const km = (req, res) => {
    const query = `
    SELECT mevcut_araclar.ortalama_kilometre,CONCAT(mevcut_araclar.marka," ",mevcut_araclar.model)AS marka_model
    FROM mevcut_araclar;
    `;

    dbConn.query(query, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('An error occurred while executing the query.');
        } else {
            res.send(result);
        }
    });

}

const cardIstatistik = (req, res) => {
    const query1 = `SELECT COUNT(mevcut_araclar.mevcut_arac_id)AS arac_sayisi
   FROM mevcut_araclar;`
    const query2 = `SELECT COUNT(kiralama_sorunlari.sorun_id)AS sorun_sayisi
    FROM kiralama_sorunlari;`
    const query3 = `SELECT COUNT(satin_alinabilecek_araclar.arac_id)AS arac_sayisi
    FROM satin_alinabilecek_araclar;`
    const query4 = `SELECT SUM(aylik_kiralama_orani.ocak_verisi+aylik_kiralama_orani.subat_verisi+aylik_kiralama_orani.mart_verisi+aylik_kiralama_orani.nisan_verisi+aylik_kiralama_orani.mayis_verisi+aylik_kiralama_orani.haziran_verisi+aylik_kiralama_orani.temmuz_verisi+aylik_kiralama_orani.agustos_verisi+aylik_kiralama_orani.eylul_verisi+aylik_kiralama_orani.ekim_verisi+aylik_kiralama_orani.kasim_verisi+aylik_kiralama_orani.aralik_verisi)AS senelik_kiralama_sayisi
    FROM aylik_kiralama_orani;`

    Promise.all([
        new Promise((resolve, reject) => {
            dbConn.query(query1, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        }),
        new Promise((resolve, reject) => {
            dbConn.query(query2, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        }),
        new Promise((resolve, reject) => {
            dbConn.query(query3, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        }),
        new Promise((resolve, reject) => {
            dbConn.query(query4, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        })
    ])
        .then(results => {
            res.json({ mevcut_araclar: results[0], sorun_sayisi: results[1], stn_alnblck_sayisi: results[2], toplam_kira: results[3] });
        })
        .catch(error => console.error('Error:', error));
}

const aylaraGoreKiralama = (req, res) => {
    const query = `
    SELECT SUM(aylik_kiralama_orani.ocak_verisi)AS ocak_toplam_satis,SUM(aylik_kiralama_orani.subat_verisi)AS subat_toplam_satis,SUM(aylik_kiralama_orani.mart_verisi)AS mart_toplam_satis,SUM(aylik_kiralama_orani.nisan_verisi) AS nisan_toplam_satis,SUM(aylik_kiralama_orani.mayis_verisi)AS mayis_toplam_satis,SUM(aylik_kiralama_orani.haziran_verisi)AS haziran_toplam_satis,SUM(aylik_kiralama_orani.temmuz_verisi)AS temmuz_toplam_satis,SUM(aylik_kiralama_orani.agustos_verisi)AS agustos_toplam_satis,SUM(aylik_kiralama_orani.eylul_verisi)AS eylul_toplam_satis,SUM(aylik_kiralama_orani.ekim_verisi)AS ekim_toplam_satis,SUM(aylik_kiralama_orani.kasim_verisi)AS kasim_toplam_satis,SUM(aylik_kiralama_orani.aralik_verisi)AS aralik_toplam_satis
FROM aylik_kiralama_orani;
    `;

    dbConn.query(query, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('An error occurred while executing the query.');
        } else {
            res.send(result);
        }
    });
}

// Example usage in Express route
// app.get('/maliyetler/:mevcut_arac_id', maliyetler);



module.exports = {
    araclar,
    aracAd,
    mevcutAraclar,
    aracAd1,
    toplamHasilat,
    aracIstatistik,
    kiralamaSorunlari,
    maliyetler,
    sorunAdet,
    km,
    cardIstatistik,
    aylaraGoreKiralama

}