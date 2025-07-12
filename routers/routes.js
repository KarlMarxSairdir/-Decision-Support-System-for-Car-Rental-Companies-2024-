const router = require("express").Router();

const { araclar } = require('../controller/controller');
const { aracAd } = require('../controller/controller');
const {mevcutAraclar } = require('../controller/controller');
const {aracAd1} = require('../controller/controller');
const {toplamHasilat} = require('../controller/controller');
const {aracIstatistik} = require('../controller/controller');
const {kiralamaSorunlari} = require('../controller/controller');
const {maliyetler} = require('../controller/controller');
const {sorunAdet} = require('../controller/controller');
const {km} = require('../controller/controller');
const {cardIstatistik} = require('../controller/controller');
const {aylaraGoreKiralama} = require('../controller/controller');

router.get('/araclar', araclar);
router.get('/aracAd', aracAd); 
router.get('/araclar/:arac_id', araclar);
router.get('/mevcutAraclar/:mevcut_arac_id', mevcutAraclar);
router.get('/mevcutAraclar', mevcutAraclar);
router.get('/aracAd1', aracAd1);
router.get('/aracAd1/:mevcut_arac_id', aracAd1);
router.get('/toplamHasilat', toplamHasilat);
router.get('/aracIstatistik', aracIstatistik);
router.get('/aracIstatistik/:mevcut_arac_id', aracIstatistik);
router.get('/kiralamaSorunlari', kiralamaSorunlari);
router.get('/kiralamaSorunlari/:mevcut_arac_id', kiralamaSorunlari);
router.get('/maliyetler', maliyetler);
router.get('/sorunAdet', sorunAdet);
router.get('/km', km);
router.get('/cardIstatistik', cardIstatistik);
router.get('/aylaraGoreKiralama', aylaraGoreKiralama);




module.exports = router;