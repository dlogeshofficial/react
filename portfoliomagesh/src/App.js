import React, { useState, useEffect } from 'react';
import './App.css';
import logoImg from './asset/logo.png';
import qrImg from './asset/CEOqrcode.png';

const translations = {
  en: {
    title: 'Samyuktha Yachts',
    ceo: 'V. Mageswaran D.M.E., M.B.A.',
    position: 'CEO of Yachts',
    email: 'mageswaran@samykuthayachts.com',
    phone: '+971-557491107',
    location: 'United Arab Emirates',
    connect: 'Connect Wallet',
    connected: 'Connected:',
    booking: 'Yacht Bookings',
    dir: 'ltr'
  },
  ta: {
    title: 'சம்யுக்தா யாட்ச்',
    ceo: 'வி. மகேஸ்வரன் D.M.E., M.B.A.',
    position: 'தலைமை நிர்வாக அதிகாரி (CEO)',
    email: 'mageswaran@samykuthayachts.com',
    phone: '+971-557491107',
    location: 'ஐக்கிய அரபு அமீரகம்',
    connect: 'வாலட்டை இணைக்கவும்',
    connected: 'இணைக்கப்பட்டது:',
    booking: 'யாட்ச் முன்பதிவு',
    dir: 'ltr'
  },
  hi: {
    title: 'संयुक्त यॉट्स',
    ceo: 'वी. मगेश्वरन D.M.E., M.B.A.',
    position: 'सीईओ (CEO)',
    email: 'mageswaran@samykuthayachts.com',
    phone: '+971-557491107',
    location: 'संयुक्त अरब अमीरात',
    connect: 'वॉलेट कनेक्ट करें',
    connected: 'जुड़ा हुआ:',
    booking: 'यॉट बुकिंग',
    dir: 'ltr'
  },
  ar: {
    title: 'ساميوكثا لليخوت',
    ceo: 'ف. ماجيسواران D.M.E., M.B.A.',
    position: 'الرئيس التنفيذي (CEO)',
    email: 'mageswaran@samykuthayachts.com',
    phone: '+971-557491107',
    location: 'الإمارات العربية المتحدة',
    connect: 'ربط المحفظة',
    connected: 'متصل:',
    booking: 'حجوزات اليخوت',
    dir: 'rtl'
  }
};

function App() {
  const [lang, setLang] = useState('en');
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  const [showQR, setShowQR] = useState(false);

  const t = translations[lang];

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    } else {
      setShowQR(true);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts.length > 0 ? accounts[0] : null);
      });
    }
  }, []);

  return (
    <div className="App" dir={t.dir}>
      <header className="header">
        <div className="lang-switcher">
          <button onClick={() => setLang('en')}>EN</button>
          <button onClick={() => setLang('ta')}>தமிழ்</button>
          <button onClick={() => setLang('hi')}>हिन्दी</button>
          <button onClick={() => setLang('ar')}>العربية</button>
        </div>
        <button className="connect-btn" onClick={connectWallet}>
          {account ? `${t.connected} ${account.slice(0, 6)}...${account.slice(-4)}` : t.connect}
        </button>
      </header>

      <main className="content">
        <div className="logo-container">
          <img src={logoImg} alt="Samyuktha Yachts Logo" className="logo-img" />
        </div>

        <section className="hero">
          <h1>{t.title}</h1>
          <h2>{t.booking}</h2>
          <div className="ceo-info">
            <h3>{t.ceo}</h3>
            <p>{t.position}</p>
          </div>
        </section>

        <section className="contact-details">
          <p><strong>Email:</strong> <a href={`mailto:${t.email}`}>{t.email}</a></p>
          <p><strong>Phone:</strong> <a href={`tel:${t.phone}`}>{t.phone}</a></p>
          <p><strong>Location:</strong> {t.location}</p>
        </section>

        <div className="qr-container">
          <img src={qrImg} alt="CEO QR Code" className="qr-img" />
        </div>
        
        {error && <p className="error">{error}</p>}
      </main>

      {showQR && (
        <div className="modal-overlay" onClick={() => setShowQR(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowQR(false)}>&times;</button>
            <h3>{t.booking}</h3>
            <img src={qrImg} alt="QR Code" className="modal-qr" />
            <p>{t.phone}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
