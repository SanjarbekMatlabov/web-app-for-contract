'use client'
import React, { useState, useEffect } from 'react';
import { FileText, Download, Edit2, Plus, Trash2 } from 'lucide-react';

const ContractWebApp = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    address: '',
    phone: '',
    passport: '',
    tv_zona_size: '',
    tv_zona_mdf: '',
    tv_zona_decor: '',
    tv_zona_shkaf_count: '0',
    tv_zona_shkaf_size: '',
    tv_zona_shkaf_mdf: '',
    shkaf_count: '0',
    tumba_count: '0',
    tumba_size: '',
    tumba_mdf: '',
    tumba_decor: '',
    bra_count: '0',
    bra_type: '',
    sekret_razetka: 'Йўқ',
    elektr_control: 'Йўқ',
    elektr_type: '',
    wifi_ustanovka: 'Йўқ',
    tv_ustanovka: 'Йўқ',
    bambuk: 'Йўқ',
    bambuk_rang: '',
    luver: 'Йўқ',
    luver_rang: '',
    muddat: '15 кун',
    avans: '',
    total_price: ''
  });
  const [decorImages, setDecorImages] = useState([]);
  // Global project price (single total for all items)
  const [totalPrice, setTotalPrice] = useState(0);
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: `${Date.now()}-${Math.random()}`,
      file: file,
      url: URL.createObjectURL(file),
      name: file.name
    }));
    setDecorImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (id) => {
    setDecorImages(prev => prev.filter(img => img.id !== id));
  };
  const [contractNumber, setContractNumber] = useState('');
  const createTvZone = () => ({
    id: `${Date.now()}-${Math.random()}`,
    tv_zona_size: '',
    tv_zona_mdf: '',
    tv_zona_decor: '',
    tv_zona_shkaf_count: '0',
    tv_zona_shkaf_size: '',
    tv_zona_shkaf_mdf: '',
    tumba_count: '0',
    tumba_size: '',
    tumba_mdf: '',
    tumba_decor: '',
    sekret_razetka: 'Йўқ',
    bambuk: 'Йўқ',
    bambuk_rang: '',
    luver: 'Йўқ',
    luver_rang: ''
  });

  const [extraTvZones, setExtraTvZones] = useState([]);

  useEffect(() => {
    const num = Math.floor(Math.random() * 900) + 100;
    setContractNumber(num.toString());
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getCurrentDate = () => {
    const now = new Date();
    return {
      day: String(now.getDate()).padStart(2, '0'),
      month: String(now.getMonth() + 1).padStart(2, '0'),
      year: now.getFullYear()
    };
  };

  const date = getCurrentDate();

  const EditableField = ({ value, field, placeholder, className = "", width = "150px" }) => {
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(field, e.target.value)}
        placeholder={placeholder}
        className={`border-b-2 border-dashed ${value ? 'border-gray-600' : 'border-red-400'
          } bg-transparent px-1 outline-none hover:bg-yellow-50 focus:bg-blue-50 focus:border-blue-500 print:border-none ${className}`}
        style={{ width }}
      />
    );
  };

  const handleTvZoneChange = (id, field, value) => {
    setExtraTvZones(prev =>
      prev.map(zone => (zone.id === id ? { ...zone, [field]: value } : zone))
    );
  };

  const addTvZone = () => {
    setExtraTvZones(prev => [...prev, createTvZone()]);
  };

  const removeTvZone = (id) => {
    setExtraTvZones(prev => prev.filter(zone => zone.id !== id));
  };

  const getItems = () => {
    const items = [];
    let num = 1;
    // TV zona 1
    if (formData.tv_zona_size) {
      let tvDesc = `Ўлчам: ${formData.tv_zona_size}`;
      if (formData.tv_zona_mdf) tvDesc += `, МДФ: ${formData.tv_zona_mdf}`;
      if (formData.tv_zona_decor) tvDesc += `, Декор: ${formData.tv_zona_decor}`;

      items.push({
        num: num++,
        name: 'ТВ зона',
        unit: 'комплект',
        qty: '1',
        price: '',
        description: tvDesc
      });
    }
    if (formData.tv_zona_shkaf_count !== '0' && formData.tv_zona_shkaf_size) {
      let shkafDesc = `Ўлчам: ${formData.tv_zona_shkaf_size}`;
      if (formData.tv_zona_shkaf_mdf) shkafDesc += `, МДФ: ${formData.tv_zona_shkaf_mdf}`;

      items.push({
        num: num++,
        name: 'Шкаф (ТВ зона)',
        unit: 'дона',
        qty: formData.tv_zona_shkaf_count,
        price: '',
        description: shkafDesc
      });
    }
    // Tumba 1
    if (formData.tumba_count !== '0' && formData.tumba_size) {
      let tumbaDesc = `Ўлчам: ${formData.tumba_size}`;
      if (formData.tumba_mdf) tumbaDesc += `, МДФ: ${formData.tumba_mdf}`;
      if (formData.tumba_decor) tumbaDesc += `, ${formData.tumba_decor}`;

      items.push({
        num: num++,
        name: 'Тумба',
        unit: 'комплект',
        qty: formData.tumba_count,
        price: '',
        description: tumbaDesc
      });
    }

    // Sekret razetka 1
    if (formData.sekret_razetka === 'Ҳа') {
      items.push({
        num: num++,
        name: 'Секрет розетка',
        unit: 'дона',
        qty: '1',
        price: '',
        description: ''
      });
    }

    // Bambuk 1
    if (formData.bambuk === 'Ҳа') {
      items.push({
        num: num++,
        name: 'Бамбук',
        unit: 'комплект',
        qty: '1',
        price: '',
        description: formData.bambuk_rang ? `Ранг: ${formData.bambuk_rang}` : ''
      });
    }

    // Luver 1
    if (formData.luver === 'Ҳа') {
      items.push({
        num: num++,
        name: 'Лювер',
        unit: 'комплект',
        qty: '1',
        price: '',
        description: formData.luver_rang ? `Ранг: ${formData.luver_rang}` : ''
      });
    }

    // Extra TV Zones
    extraTvZones.forEach((zone, idx) => {
      if (zone.tv_zona_size) {
        let tvDesc = `Ўлчам: ${zone.tv_zona_size}`;
        if (zone.tv_zona_mdf) tvDesc += `, МДФ: ${zone.tv_zona_mdf}`;
        if (zone.tv_zona_decor) tvDesc += `, Декор: ${zone.tv_zona_decor}`;

        items.push({
          num: num++,
          name: `ТВ зона`,
          unit: 'комплект',
          qty: '1',
          price: '',
          description: tvDesc
        });
      }
      if (zone.tv_zona_shkaf_count !== '0' && zone.tv_zona_shkaf_size) {
        let shkafDesc = `Ўлчам: ${zone.tv_zona_shkaf_size}`;
        if (zone.tv_zona_shkaf_mdf) shkafDesc += `, МДФ: ${zone.tv_zona_shkaf_mdf}`;

        items.push({
          num: num++,
          name: 'Шкаф (ТВ зона)',
          unit: 'дона',
          qty: zone.tv_zona_shkaf_count,
          price: '',
          description: shkafDesc
        });
      }
      if (zone.tumba_count !== '0' && zone.tumba_size) {
        let tumbaDesc = `Ўлчам: ${zone.tumba_size}`;
        if (zone.tumba_mdf) tumbaDesc += `, МДФ: ${zone.tumba_mdf}`;
        if (zone.tumba_decor) tumbaDesc += `, ${zone.tumba_decor}`;

        items.push({
          num: num++,
          name: 'Тумба',
          unit: 'комплект',
          qty: zone.tumba_count,
          price: '',
          description: tumbaDesc
        });
      }

      if (zone.sekret_razetka === 'Ҳа') {
        items.push({
          num: num++,
          name: 'Секрет розетка',
          unit: 'дона',
          qty: '1',
          price: '',
          description: ''
        });
      }

      // Bambuk
      if (zone.bambuk === 'Ҳа') {
        items.push({
          num: num++,
          name: 'Бамбук',
          unit: 'комплект',
          qty: '1',
          price: '',
          description: zone.bambuk_rang ? `Ранг: ${zone.bambuk_rang}` : ''
        });
      }

      // Luver
      if (zone.luver === 'Ҳа') {
        items.push({
          num: num++,
          name: 'Лювер',
          unit: 'комплект',
          qty: '1',
          price: '',
          description: zone.luver_rang ? `Ранг: ${zone.luver_rang}` : ''
        });
      }
    });

    // // Shkaf
    // if (formData.shkaf_count !== '0' && formData.shkaf_count) {
    //   items.push({
    //     num: num++,
    //     name: 'Шкаф',
    //     unit: 'дона',
    //     qty: formData.shkaf_count,
    //     price: '',
    //     description: ''
    //   });
    // }

    // Bra
    if (formData.bra_count !== '0' && formData.bra_type && formData.bra_count) {
      items.push({
        num: num++,
        name: 'Бра',
        unit: 'дона',
        qty: formData.bra_count,
        price: '',
        description: `Тури: ${formData.bra_type}`
      });
    }

    // WiFi
    if (formData.wifi_ustanovka === 'Ҳа') {
      items.push({
        num: num++,
        name: 'WiFi установка',
        unit: 'услуга',
        qty: '1',
        price: '',
        description: 'WiFi ускуналарини ўрнатиш'
      });
    }

    // TV ustanovka
    if (formData.tv_ustanovka === 'Ҳа') {
      items.push({
        num: num++,
        name: 'ТВ установка',
        unit: 'услуга',
        qty: '1',
        price: '',
        description: 'ТВ ни деворга ўрнатиш'
      });
    }

    // Elektr boshqaruv
    if (formData.elektr_control === 'Ҳа' && formData.elektr_type) {
      items.push({
        num: num++,
        name: 'Электр бошқарув',
        unit: 'услуга',
        qty: '1',
        price: '',
        description: `Тури: ${formData.elektr_type}`
      });
    }

    return items;
  };

  const items = getItems();
  const getSummaryRows = () => {
    const totalPrice = parseFloat(formData.total_price) || 0;
    const avans = parseFloat(formData.avans) || 0;
    const qoldiq = totalPrice - avans;

    return [
      {
        type: 'summary',
        label: 'Жами:',
        value: `${totalPrice} $`
      },
      {
        type: 'summary',
        label: 'Аванс (60%):',
        value: `${avans} $`
      },
      {
        type: 'summary',
        label: 'Қолдиқ сумма:',
        value: `${qoldiq} $`
      }
    ];
  };

  // ###############################################################################################################
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Default credentials
  const DEFAULT_USER = {
    username: 'admin',
    password: 'bek2024'
  };

  // Login funksiyasi
  const handleLogin = (e) => {
    e.preventDefault();
    if (
      loginData.username === DEFAULT_USER.username &&
      loginData.password === DEFAULT_USER.password
    ) {
      setIsAuthenticated(true);
      setLoginError('');
      // Save to sessionStorage
      sessionStorage.setItem('isAuthenticated', 'true');
    } else {
      setLoginError('Логин ёки парол нотўғри!');
    }
  };

  // Check authentication on mount
  useEffect(() => {
    const auth = sessionStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);
  const [pudratchiSignature] = useState('/images/qol.jpg');
  const [pudratchiStamp] = useState('/images/stamp.jpg');
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              {/* <Lock className="w-8 h-8 text-white" /> */}
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Тизимга кириш</h2>
            <p className="text-gray-600">Шартнома тузиш учун кириш керак</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Логин
              </label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-blue-600 focus:outline-none"
                placeholder="Логинни киритинг"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Парол
              </label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-blue-600 focus:outline-none"
                placeholder="Паролни киритинг"
                required
              />
            </div>

            {loginError && (
              <div className="bg-red-50 border-2 border-red-500 text-red-700 px-4 py-3 rounded-lg">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Кириш
            </button>
          </form>
        </div>
      </div>
    )
  } else
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 print:p-0 print:bg-white">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6 print:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-800">Шартнома тузиш</h1>
              </div>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                <Download className="w-5 h-5" />
                PDF юклаш
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-xl p-12 print:shadow-none print:rounded-none" id="contract">
            {/* Title */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">ШАРТНОМА №{contractNumber}</h2>
              <p className="text-right text-base">
                Toshkent SH  «{date.day}» {date.month} / {date.year} й.
              </p>
            </div>

            {/* Introduction */}
            <div className="mb-6 text-justify leading-relaxed text-sm">
              <p>
                "Bek Qurilish Developer" МЧЖ нинг Низоми бўйича фаолият юритувчи директор Серобов Ж.Т.,
                бундан буён матнда "Пудратчи" деб юритилади, бир томондан{' '}
                <EditableField
                  value={formData.full_name}
                  field="full_name"
                  placeholder="Тўлиқ исм"
                  className="font-semibold"
                  width="200px"
                />
                {' '}серия и номер паспорта{' '}
                <EditableField
                  value={formData.passport}
                  field="passport"
                  placeholder="AA1234567"
                  width="120px"
                />
                {' '}бундан буён матнда "Буюртмачи" деб юритилади иккинчи томондан ушбу шартномани қуйидагилар бўйича туздик:
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-6">
              <h3 className="text-base font-bold mb-3">1. ШАРТНОМА МАВЗУСИ</h3>
              <p className="mb-3 text-sm">
                Ушбу шартномага биноан Буюртмачи томонидан берилган қуйидаги иш турларини
                бажаришни ва махсулотларни етказиб беришни Пудратчи ўз зиммасига олади: ( forma 1 )
              </p>

              {/* Table */}
              <div className="overflow-x-auto mb-3">
                {items.length > 0 ? (
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr>
                        <th className="border border-gray-800 px-2 py-1 text-left bg-gray-50" style={{ width: '40px' }}>№</th>
                        <th className="border border-gray-800 px-2 py-1 text-left bg-gray-50">Иш/маҳсулотнинг номи</th>
                        <th className="border border-gray-800 px-2 py-1 text-left bg-gray-50" style={{ width: '180px' }}>Тавсиф</th>
                        <th className="border border-gray-800 px-2 py-1 text-center bg-gray-50" style={{ width: '80px' }}>Ўлчов бирлиги</th>
                        <th className="border border-gray-800 px-2 py-1 text-center bg-gray-50" style={{ width: '60px' }}>Миқдори</th>
                        <th className="border border-gray-800 px-2 py-1 text-center bg-gray-50" style={{ width: '80px' }}>Нархи</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.num}>
                          <td className="border border-gray-800 px-2 py-1 text-center">{item.num}</td>
                          <td className="border border-gray-800 px-2 py-1">{item.name}</td>
                          <td className="border border-gray-800 px-2 py-1">{item.description || '-'}</td>
                          <td className="border border-gray-800 px-2 py-1 text-center">{item.unit}</td>
                          <td className="border border-gray-800 px-2 py-1 text-center">{item.qty}</td>
                          <td className="border border-gray-800 px-2 py-1 text-center">{item.price}</td>
                        </tr>
                      ))}
                      {getSummaryRows().map((row, idx) => (
                        <tr key={`summary-${idx}`}>
                          <td colSpan="5" className="border border-gray-800 px-2 py-2 text-right font-bold bg-gray-50">
                            {row.label}
                          </td>
                          <td className="border border-gray-800 px-2 py-2 text-center font-bold bg-gray-50">
                            {row.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-sm text-gray-500 italic">Иш турлари киритилмаган.</p>
                )}
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-6">
              <h3 className="text-base font-bold mb-3">2. ТОМОНЛАРНИНГ ҲУҚУҚ ВА МАЖБУРИЯТЛАРИ</h3>
              <div className="space-y-1 text-sm">
                <p className="font-semibold">2.1. Пудратчи қуйидаги мажбуриятларни ўз зиммасига олади:</p>
                <p className="ml-4">2.1.1. Шартноманинг 1 бандига мувофиқ Пудратчи Буюртмачининг жойлашган жойида ишларни бажаради хамда махсулотларни етказиб беради.</p>
                <p className="ml-4">2.1.2. Кўрсатилган ишларни тўғри ва Сифатли бажаради хамда сифатли махсулотларни ўз вақтида етказиб беради.</p>
                <p className="ml-4">2.1.3. Ушбу шарноманинг 3.1. бандига мувофиқ унинг жорий ҳисобварағига олдиндан тўловни 60% кабул килгандан кейин ушбу шартнома бўйича ишларни бажаришни бошлайди.</p>

                <p className="font-semibold mt-2">2.2. Буюртмачи қуйидаги мажбуриятларни ўз зиммасига олади:</p>
                <p className="ml-4">2.2.1. Пудратчига бажарилган ишларнинг қийматини ушбу шартноманинг 3 қисмида назарда тутилган миқдорда ва муддатларда ўз вақтида тўлайди.</p>
                <p className="ml-4">2.2.2. Пудратчига ушбу шартнома бўйича ишларни муваффақиятли бажариш учун зарур бўлган шарт ва шароитларни яратиб беради.</p>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-6">
              <h3 className="text-base font-bold mb-3">3. ШАРТНОМА НАРХИ, ТЎЛОВЛАР ТАРТИБИ ВА ШАРТЛАРИ</h3>
              <div className="space-y-1 text-sm">
                <p>3.1 Шартнома нархи: <EditableField value={formData.total_price} field="total_price" placeholder="0$" width="100px" /></p>
                <p>3.2 Агар томонлар ушбу шартномага иш ҳажмининг ва махсулотларнинг кўпайиши ёки камайишига олиб келадиган ўзгартиришлар киритсалар, шартнома қиймати томонларнинг ёзма келишуви билан ўзгартирилиши мумкин.</p>
                <p>3.3 Буюртмачи шартнома қийматининг 60% миқдорида аванс тўловини (<EditableField value={formData.avans} field="avans" placeholder="0$" width="100px" />) ушбу шартнома тарафлари имзолаган кундан бошлаб 5 банк кунидан кечиктирмай амалга оширади.</p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-6">
              <h3 className="text-base font-bold mb-3">4. ШАРТНОМАНИНГ АМАЛ КИЛИШ МУДДАТИ</h3>
              <div className="space-y-1 text-sm">
                <p>4.1. Ушбу шартнома иккала томон томонидан имзоланган пайтдан бошлаб кучга киради ва Буюртмачи Бажарилган ишларни тўлиқ қабул қилган вақтгача амал қилади.</p>
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-6">
              <h3 className="text-base font-bold mb-3">5. ТОМОНЛАРНИНГ ЖАВОБГАРЛИСИ</h3>
              <div className="space-y-1 text-sm">
                <p>5.1. Ушбу шартнома бўйича мажбуриятларни бажармаганлик ёки лозим даражада бажармаганлик учун Пудратчи ва Буюртмачи Ўзбекистон Республикасининг 29.08.1998 йилдаги "Тадбиркорлик субъектлари фаолиятининг шартномавий-ҳуқуқий асослари тўғрисида" ги Қонунига мувофиқ жавобгар бўладилар.</p>
              </div>
            </div>

            {/* Section 6 */}
            <div className="mb-6">
              <h3 className="text-base font-bold mb-3">6. ФОРС – МАЖОР</h3>
              <div className="space-y-1 text-sm">
                <p>6.1. Форс - мажор ҳолатларида (табиий офатлар, ҳарбий ҳаракатлар ва бошқалар) томонлардан бирининг ўз мажбуриятларини ўз вақтида тўлиқ ёки қисман бажаришига йўл қўймаслиги ҳолатларида, мажбуриятларнинг бажарилиши бундай ҳолатларнинг давомийлигига мутаносиб равишда ортга сурилади.</p>
                <p>6.2. Шартнома бўйича юқоридаги ҳолатларни ҳисобга олган ҳолда ўз мажбуриятларини бажара олмайдиган томон бошқа томонни бундай ҳолатлар юзага келиши ва тугатилиши тўғрисида дарҳол хабардор қилиши шарт.</p>
              </div>
            </div>

            {/* Section 7 */}
            <div className="mb-6">
              <h3 className="text-base font-bold mb-3">7. БОШҚА ШАРТЛАР</h3>
              <div className="space-y-1 text-sm">
                <p>7.1. Ушбу шартнома бир хил юридик кучга эга бўлган икки нусхада тузилади, томонларнинг ҳар бири биттадан нусхани олади.</p>
                <p>7.2. Ушбу шартномадан келиб чиқиши мумкин бўлган барча низолар ва келишмовчиликлар томонлар ўртасидаги музокаралар орқали ҳал қилинади. Агар томонлар келишувга эриша олмаса, иш Тошкент шаҳри хўжалик судида кўриб чиқилиши учун тақдимнома қиритади.</p>
                <p>7.3. Ушбу шартномада назарда тутилмаган ҳолларда, томонлар Ўзбекистон Республикасининг амалдаги қонунчилигига амал қиладилар.</p>
                <p>7.4. Ушбу шартномага киритилган барча ўзгартиш ва қўшимчалар, агар улар ёзма равишда тузилган ва томонлар томонидан имзоланган ҳолатда амал қилади.</p>
              </div>
            </div>

            {/* Section 8 - Rekvizitlar */}
            <div className="mb-6">
              <h3 className="text-base font-bold mb-3">8. ТОМОНЛАРНИНГ МАНЗИЛЛАРИ ВА БАНК РЕКВИЗИТЛАРИ</h3>
              <div className="grid grid-cols-2 gap-8 text-sm">
                {/* Buyurtmachi */}
                <div>
                  <p className="font-bold mb-2">Буюртмачи</p>
                  <p>ФИО: <EditableField value={formData.full_name} field="full_name" placeholder="___" width="180px" /></p>
                  <p>Адрес: <EditableField value={formData.address} field="address" placeholder="___" width="180px" /></p>
                  <p>Серия и номер паспорта: <EditableField value={formData.passport} field="passport" placeholder="___" width="120px" /></p>
                  <p>Тел.: <EditableField value={formData.phone} field="phone" placeholder="+998" width="120px" /></p>
                </div>

                {/* Pudratchi */}
                <div>
                  <p className="font-bold mb-2">ПУДРАТЧИ</p>
                  <p>"Bek Qurilish Developer" МЧЖ</p>
                  <p>Манзил: 1.Toshkent Sh. Nazarbek tumani Baliqchi 69</p>
                  <p className="ml-14">2.Qarshi sh. Mustaqillik I.Karimov Kucha 10M-Uy</p>
                  <p>ИНН: 309 947 278</p>
                  <p>Банк: "Hamkorbank" ATB Qarshi</p>
                  <p>МФО: 01031</p>
                  <p>Х/р: 20208000605577128001</p>
                  <p>Тел.: +998 93 935 0207</p>
                  <p>Директор: Серобов Ж.Т.</p>
                </div>
              </div>
            </div>
            {decorImages.length > 0 && (
              <div className="mb-6 page-break-before">
                <h3 className="text-base font-bold mb-3">ДЕКОР РАСМЛАРИ</h3>
                <div className="space-y-4">
                  {decorImages.map((img, idx) => (
                    <div key={img.id} className="border-2 border-gray-300 p-3 rounded">
                      <img
                        src={img.url}
                        alt={`Декор ${idx + 1}`}
                        className="w-full h-auto object-contain mb-2"
                        style={{ maxHeight: '400px' }}
                      />
                      <p className="text-sm text-center font-semibold text-gray-700">
                        Декор {idx + 1}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Edit Panel */}
          <div className="bg-white rounded-lg shadow-lg p-6 mt-6 print:hidden">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
              <Edit2 className="w-5 h-5 text-blue-600" />
              Тезкор тахрирлаш
            </h3>

            {/* Mijoz ma'lumotlari */}
            <div className="mb-6 border-b pb-4">
              <h4 className="font-semibold text-lg mb-3 text-blue-700">📋 Мижоз маълумотлари</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-900">Тўлиқ исм</label>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => handleChange('full_name', e.target.value)}
                    placeholder="Исм Фамилия"
                    className="w-full border-2 border-gray-900 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-900">Паспорт серия ва рақами</label>
                  <input
                    type="text"
                    value={formData.passport}
                    onChange={(e) => handleChange('passport', e.target.value)}
                    placeholder="AD1234567"
                    className="w-full border-2 border-gray-900 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-900">Телефон</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+998 88 123 45 67"
                    className="w-full border-2 border-gray-900 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-900">Манзил</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    placeholder="маҳалла, кўча, уй"
                    className="w-full border-2 border-gray-900 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* TV zona 1 */}
            <div className="mb-6 border-2 border-blue-600 rounded-lg p-4 bg-blue-50">
              <h4 className="font-semibold text-lg mb-3 text-blue-700">📺 ТВ зона 1</h4>

              {/* TV zona olchov */}
              <div className="mb-4 bg-white p-3 rounded border border-gray-300">
                <p className="text-sm font-bold mb-2 text-gray-900">ТВ зона</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-900 mb-1">Ўлчам</label>
                    <input
                      type="text"
                      value={formData.tv_zona_size}
                      onChange={(e) => handleChange('tv_zona_size', e.target.value)}
                      placeholder="0.00x0.00"
                      className="w-full border-2 border-gray-900 rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-900 mb-1">МДФ ранги</label>
                    <input
                      type="text"
                      value={formData.tv_zona_mdf}
                      onChange={(e) => handleChange('tv_zona_mdf', e.target.value)}
                      placeholder="Оқ"
                      className="w-full border-2 border-gray-900 rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-900 mb-1">Декор</label>
                    <input
                      type="text"
                      value={formData.tv_zona_decor}
                      onChange={(e) => handleChange('tv_zona_decor', e.target.value)}
                      placeholder="Хай-тек"
                      className="w-full border-2 border-gray-900 rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div className="mt-4 bg-white p-3 rounded border border-gray-300">
                    <label className="block text-sm font-semibold mb-2 text-gray-900">📷 Декор расмлари юклаш</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="w-full border-2 border-gray-900 rounded px-3 py-2 text-sm text-gray-900 focus:border-blue-600 focus:outline-none"
                    />
                    {decorImages.length > 0 && (
                      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
                        {decorImages.map((img, idx) => (
                          <div key={img.id} className="relative border-2 border-gray-300 rounded p-1">
                            <img
                              src={img.url}
                              alt={`Декор ${idx + 1}`}
                              className="w-full h-20 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(img.id)}
                              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700 font-bold"
                            >
                              ×
                            </button>
                            <p className="text-xs text-center mt-1 truncate">{img.name}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-4 bg-white p-3 rounded border border-gray-300">
                <p className="text-sm font-bold mb-2 text-gray-900">Шкаф (ТВ зона учун)</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-900 mb-1">Миқдор</label>
                    <input
                      type="number"
                      value={formData.tv_zona_shkaf_count}
                      onChange={(e) => handleChange('tv_zona_shkaf_count', e.target.value)}
                      className="w-full border-2 border-gray-900 rounded px-3 py-2 text-sm text-gray-900 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-900 mb-1">Ўлчам</label>
                    <input
                      type="text"
                      value={formData.tv_zona_shkaf_size}
                      onChange={(e) => handleChange('tv_zona_shkaf_size', e.target.value)}
                      placeholder="0.00x0.00"
                      className="w-full border-2 border-gray-900 rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-900 mb-1">МДФ ранги</label>
                    <input
                      type="text"
                      value={formData.tv_zona_shkaf_mdf}
                      onChange={(e) => handleChange('tv_zona_shkaf_mdf', e.target.value)}
                      placeholder="Оқ"
                      className="w-full border-2 border-gray-900 rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              {/* Tumba */}
              <div className="mb-4 bg-white p-3 rounded border border-gray-300">
                <p className="text-sm font-bold mb-2 text-gray-900">Тумба</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-900 mb-1">Миқдор</label>
                    <input
                      type="number"
                      value={formData.tumba_count}
                      onChange={(e) => handleChange('tumba_count', e.target.value)}
                      className="w-full border-2 border-gray-900 rounded px-3 py-2 text-sm text-gray-900 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-900 mb-1">Ўлчам</label>
                    <input
                      type="text"
                      value={formData.tumba_size}
                      onChange={(e) => handleChange('tumba_size', e.target.value)}
                      placeholder="0.00x0.00"
                      className="w-full border-2 border-gray-900 rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-900 mb-1">МДФ</label>
                    <input
                      type="text"
                      value={formData.tumba_mdf}
                      onChange={(e) => handleChange('tumba_mdf', e.target.value)}
                      placeholder="Оқ"
                      className="w-full border-2 border-gray-900 rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-900 mb-1">Декор/тавсиф</label>
                    <input
                      type="text"
                      value={formData.tumba_decor}
                      onChange={(e) => handleChange('tumba_decor', e.target.value)}
                      placeholder="Хай-тек без ручка"
                      className="w-full border-2 border-gray-900 rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Sekret razetka, Bambuk, Luver */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded border border-gray-300">
                  <label className="block text-sm font-semibold mb-1 text-gray-900">Секрет розетка</label>
                  <select
                    value={formData.sekret_razetka}
                    onChange={(e) => handleChange('sekret_razetka', e.target.value)}
                    className="w-full border-2 border-gray-900 rounded px-3 py-2 text-gray-900 focus:border-blue-600 focus:outline-none"
                  >
                    <option>Йўқ</option>
                    <option>Ҳа</option>
                  </select>
                </div>

                <div className="bg-white p-3 rounded border border-gray-300">
                  <label className="block text-sm font-semibold mb-1 text-gray-900">Бамбук</label>
                  <div className="flex gap-2">
                    <select
                      value={formData.bambuk}
                      onChange={(e) => handleChange('bambuk', e.target.value)}
                      className="w-1/3 border-2 border-gray-900 rounded px-3 py-2 text-gray-900 focus:border-blue-600 focus:outline-none"
                    >
                      <option>Йўқ</option>
                      <option>Ҳа</option>
                    </select>
                    {formData.bambuk === 'Ҳа' && (
                      <input
                        type="text"
                        value={formData.bambuk_rang}
                        onChange={(e) => handleChange('bambuk_rang', e.target.value)}
                        placeholder="Ранг"
                        className="w-2/3 border-2 border-gray-900 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                      />
                    )}
                  </div>
                </div>

                <div className="bg-white p-3 rounded border border-gray-300">
                  <label className="block text-sm font-semibold mb-1 text-gray-900">Лювер</label>
                  <div className="flex gap-2">
                    <select
                      value={formData.luver}
                      onChange={(e) => handleChange('luver', e.target.value)}
                      className="w-1/3 border-2 border-gray-900 rounded px-3 py-2 text-gray-900 focus:border-blue-600 focus:outline-none"
                    >
                      <option>Йўқ</option>
                      <option>Ҳа</option>
                    </select>
                    {formData.luver === 'Ҳа' && (
                      <input
                        type="text"
                        value={formData.luver_rang}
                        onChange={(e) => handleChange('luver_rang', e.target.value)}
                        placeholder="Ранг"
                        className="w-2/3 border-2 border-gray-900 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Qo'shimcha TV zonalar */}
            <div className="mb-6 border-2 border-dashed border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-gray-900">📺 Қўшимча ТВ зоналар</p>
                <button
                  type="button"
                  onClick={addTvZone}
                  className="inline-flex items-center gap-1 text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  ТВ зона қўшиш
                </button>
              </div>
              {extraTvZones.length === 0 ? (
                <p className="text-sm text-gray-600 font-medium">Ҳозирча қўшимча ТВ зона киритилмаган.</p>
              ) : (
                <div className="space-y-4">
                  {extraTvZones.map((zone, idx) => (
                    <div key={zone.id} className="border-2 border-blue-600 rounded-lg p-4 bg-blue-50">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-bold text-blue-700">📺 ТВ зона {idx + 2}</p>
                        <button
                          type="button"
                          onClick={() => removeTvZone(zone.id)}
                          className="text-red-600 hover:text-red-700 font-semibold"
                          aria-label="ТВ зона ни ўчириш"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* TV zona */}
                      <div className="mb-3 bg-white p-3 rounded border border-gray-300">
                        <p className="text-xs font-bold mb-2 text-gray-900">ТВ зона</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-gray-900 mb-1">Ўлчам</label>
                            <input
                              type="text"
                              value={zone.tv_zona_size}
                              onChange={(e) => handleTvZoneChange(zone.id, 'tv_zona_size', e.target.value)}
                              className="w-full border-2 border-gray-900 rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                              placeholder="0.00x0.00"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-900 mb-1">МДФ</label>
                            <input
                              type="text"
                              value={zone.tv_zona_mdf}
                              onChange={(e) => handleTvZoneChange(zone.id, 'tv_zona_mdf', e.target.value)}
                              className="w-full border-2 border-gray-900 rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                              placeholder="rangi"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-900 mb-1">Декор</label>
                            <input
                              type="text"
                              value={zone.tv_zona_decor}
                              onChange={(e) => handleTvZoneChange(zone.id, 'tv_zona_decor', e.target.value)}
                              className="w-full border-2 border-gray-900 rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                              placeholder="Хай-тек"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Tumba */}
                      <div className="mb-3 bg-white p-3 rounded border border-gray-300">
                        <p className="text-xs font-bold mb-2 text-gray-900">Тумба</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-gray-900 mb-1">Миқдор</label>
                            <input
                              type="number"
                              value={zone.tumba_count}
                              onChange={(e) => handleTvZoneChange(zone.id, 'tumba_count', e.target.value)}
                              className="w-full border-2 border-gray-900 rounded px-3 py-2 text-sm text-gray-900 focus:border-blue-600 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-900 mb-1">Ўлчам</label>
                            <input
                              type="text"
                              value={zone.tumba_size}
                              onChange={(e) => handleTvZoneChange(zone.id, 'tumba_size', e.target.value)}
                              className="w-full border-2 border-gray-900 rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                              placeholder="0.00x0.00"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-900 mb-1">МДФ</label>
                            <input
                              type="text"
                              value={zone.tumba_mdf}
                              onChange={(e) => handleTvZoneChange(zone.id, 'tumba_mdf', e.target.value)}
                              className="w-full border-2 border-gray-900 rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                              placeholder="Rangi"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-900 mb-1">Декор</label>
                            <input
                              type="text"
                              value={zone.tumba_decor}
                              onChange={(e) => handleTvZoneChange(zone.id, 'tumba_decor', e.target.value)}
                              className="w-full border-2 border-gray-900 rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                              placeholder="Хай-тек"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Sekret va Luver */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-white p-3 rounded border border-gray-300">
                          <label className="block text-xs font-semibold mb-1 text-gray-900">Секрет розетка</label>
                          <select
                            value={zone.sekret_razetka}
                            onChange={(e) => handleTvZoneChange(zone.id, 'sekret_razetka', e.target.value)}
                            className="w-full border-2 border-gray-900 rounded px-3 py-2 text-sm text-gray-900 focus:border-blue-600 focus:outline-none"
                          >
                            <option>Йўқ</option>
                            <option>Ҳа</option>
                          </select>
                        </div>
                        <div className="bg-white p-3 rounded border border-gray-300">
                          <label className="block text-xs font-semibold mb-1 text-gray-900">Бамбук + Лювер</label>
                          <div className="flex gap-2">
                            <select
                              value={zone.taroq_luver}
                              onChange={(e) => handleTvZoneChange(zone.id, 'taroq_luver', e.target.value)}
                              className="w-1/3 border-2 border-gray-900 rounded px-3 py-2 text-sm text-gray-900 focus:border-blue-600 focus:outline-none"
                            >
                              <option>Йўқ</option>
                              <option>Ҳа</option>
                            </select>
                            {zone.taroq_luver === 'Ҳа' && (
                              <input
                                type="text"
                                value={zone.luver_decor}
                                onChange={(e) => handleTvZoneChange(zone.id, 'luver_decor', e.target.value)}
                                placeholder="Хай-тек"
                                className="w-2/3 border-2 border-gray-900 rounded px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Qo'shimcha xizmatlar */}
            <div className="mb-6 border-t-2 border-gray-300 pt-4">
              <h4 className="font-semibold text-lg mb-3 text-blue-700">🔧 Қўшимча хизматлар</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-900">Бра сони</label>
                  <input
                    type="number"
                    value={formData.bra_count}
                    onChange={(e) => handleChange('bra_count', e.target.value)}
                    className="w-full border-2 border-gray-900 rounded px-3 py-2 text-gray-900 focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-900">Бра тури</label>
                  <input
                    type="text"
                    value={formData.bra_type}
                    onChange={(e) => handleChange('bra_type', e.target.value)}
                    placeholder="Девор бра"
                    className="w-full border-2 border-gray-900 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-900">WiFi ўрнатиш</label>
                  <select
                    value={formData.wifi_ustanovka}
                    onChange={(e) => handleChange('wifi_ustanovka', e.target.value)}
                    className="w-full border-2 border-gray-900 rounded px-3 py-2 text-gray-900 focus:border-blue-600 focus:outline-none"
                  >
                    <option>Йўқ</option>
                    <option>Ҳа</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-900">ТВ ўрнатиш</label>
                  <select
                    value={formData.tv_ustanovka}
                    onChange={(e) => handleChange('tv_ustanovka', e.target.value)}
                    className="w-full border-2 border-gray-900 rounded px-3 py-2 text-gray-900 focus:border-blue-600 focus:outline-none"
                  >
                    <option>Йўқ</option>
                    <option>Ҳа</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-900">Электр бошқарув</label>
                  <div className="flex gap-2">
                    <select
                      value={formData.elektr_control}
                      onChange={(e) => handleChange('elektr_control', e.target.value)}
                      className="w-1/3 border-2 border-gray-900 rounded px-3 py-2 text-gray-900 focus:border-blue-600 focus:outline-none"
                    >
                      <option>Йўқ</option>
                      <option>Ҳа</option>
                    </select>
                    {formData.elektr_control === 'Ҳа' && (
                      <select
                        value={formData.elektr_type}
                        onChange={(e) => handleChange('elektr_type', e.target.value)}
                        className="w-2/3 border-2 border-gray-900 rounded px-3 py-2 text-gray-900 focus:border-blue-600 focus:outline-none"
                      >
                        <option value="">Танланг...</option>
                        <option>Пулт орқали</option>
                        <option>Сенсор орқали</option>
                        <option>Vkluchatel орқали</option>
                      </select>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* To'lov ma'lumotlari */}
            <div className="border-t-2 border-gray-300 pt-4">
              <h4 className="font-semibold text-lg mb-3 text-blue-700">💰 Тўлов маълумотлари</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-900">Жами нарх</label>
                  <input
                    type="text"
                    value={formData.total_price}
                    onChange={(e) => handleChange('total_price', e.target.value)}
                    placeholder="narx $"
                    className="w-full border-2 border-gray-900 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-900">Аванс (60%)</label>
                  <input
                    type="text"
                    value={formData.avans}
                    onChange={(e) => handleChange('avans', e.target.value)}
                    placeholder="narx $"
                    className="w-full border-2 border-gray-900 rounded px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
  #contract,
  #contract * {
    color: #000 !important;
  }

  @media print {
  .page-break-before {
    page-break-before: always !important;
    margin-top: 0 !important;
    padding-top: 20px !important;
  }
  
  /* Rasmlar uchun */
  img {
    max-width: 100% !important;
    height: auto !important;
    page-break-inside: avoid !important;
  }
  
  /* Rasm container */
  .space-y-4 > div {
    margin-bottom: 15px !important;
    page-break-inside: avoid !important;
  }
    @page {
      margin: 15mm;
      size: A4;
    }
    
    body { 
      margin: 0; 
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    /* Brauzer header/footer ni olib tashlash */
    @page {
      margin-top: 0;
      margin-bottom: 0;
    }
    
    html, body {
      height: 100%;
      margin: 0 !important;
      padding: 0 !important;
    }
    
    .print\\:hidden { 
      display: none !important; 
    }
    .print\\:shadow-none { 
      box-shadow: none !important; 
    }
    .print\\:rounded-none {
      border-radius: 0 !important;
    }
    .print\\:p-0 {
      padding: 0 !important;
    }
    .print\\:bg-white {
      background: white !important;
    }
    
    /* Telefon va planshetlarda ham to'g'ri chop etish */
    #contract {
      max-width: 100% !important;
      width: 210mm !important;
      min-height: 297mm !important;
      padding: 15mm !important;
      margin: 0 auto !important;
      box-sizing: border-box !important;
      overflow: visible !important;
    }
    
    /* Text va jadvallar uchun */
    #contract * {
      max-width: 100% !important;
      word-wrap: break-word !important;
      overflow-wrap: break-word !important;
    }
    
    /* Jadval uchun maxsus */
    #contract table {
      width: 100% !important;
      table-layout: fixed !important;
      font-size: 10px !important;
    }
    
    #contract table td,
    #contract table th {
      padding: 4px 2px !important;
      font-size: 10px !important;
      line-height: 1.3 !important;
    }
    
    /* Input maydonlar */
    input {
      border: none !important;
      background: transparent !important;
      padding: 0 !important;
      font-size: inherit !important;
    }
    
    textarea {
      border: none !important;
      background: transparent !important;
    }
    
    /* Margin va padding optimizatsiya */
    .mb-6, .mb-3 {
      margin-bottom: 8px !important;
    }
    
    h3 {
      font-size: 11px !important;
      margin-top: 10px !important;
      margin-bottom: 6px !important;
    }
    
    p {
      font-size: 10px !important;
      line-height: 1.4 !important;
      margin-bottom: 4px !important;
    }
    
    /* Grid uchun */
    .grid {
      display: block !important;
    }
    
    .grid > div {
      width: 48% !important;
      display: inline-block !important;
      vertical-align: top !important;
      margin-bottom: 6px !important;
    }
  }
`}</style>
      </div>
    );
};

export default ContractWebApp;