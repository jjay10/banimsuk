import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const foodImages = {
  noodle: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=60&w=650&auto=format&fit=crop",
  curry: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=60&w=650&auto=format&fit=crop",
  rice: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=60&w=650&auto=format&fit=crop",
  thai: "https://images.unsplash.com/photo-1559847844-5315695dadae?q=60&w=650&auto=format&fit=crop",
  soup: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=60&w=650&auto=format&fit=crop",
  fried: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=60&w=650&auto=format&fit=crop",
  seafood: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?q=60&w=650&auto=format&fit=crop",
  drink: "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=60&w=650&auto=format&fit=crop",
};

const allMenus = [
  { category: "ก๋วยเตี๋ยวเรือ", name: "ก๋วยเตี๋ยวเรือหมูน้ำตก", desc: "น้ำซุปเข้มข้น หอมเครื่องเทศ หมูนุ่ม ลูกชิ้นแน่น", price: "40.-", image: foodImages.noodle },
  { category: "ก๋วยเตี๋ยวเรือ", name: "ก๋วยเตี๋ยวเรือเนื้อน้ำตก", desc: "เนื้อนุ่ม น้ำตกเข้มข้น รสจัดจ้าน", price: "50.-", image: foodImages.noodle },
  { category: "ก๋วยเตี๋ยวเรือ", name: "ก๋วยเตี๋ยวเรือหมูพิเศษ", desc: "เครื่องแน่น หมูสด หมูตุ๋น ลูกชิ้น", price: "55.-", image: foodImages.noodle },
  { category: "ก๋วยเตี๋ยวเรือ", name: "เกาเหลาหมูน้ำตก", desc: "เกาเหลาเครื่องหมูแน่น น้ำซุปเข้ม", price: "60.-", image: foodImages.soup },
  { category: "ก๋วยเตี๋ยวเรือ", name: "แคบหมู", desc: "กรอบ หอม ทานคู่ก๋วยเตี๋ยวเรือ", price: "15.-", image: foodImages.fried },
  { category: "ขนมจีน", name: "ขนมจีนน้ำยากะทิ", desc: "น้ำยากะทิหอมมัน เครื่องแกงถึงรส", price: "45.-", image: foodImages.curry },
  { category: "ขนมจีน", name: "ขนมจีนน้ำยาป่า", desc: "รสจัดจ้าน หอมสมุนไพร ไม่ใส่กะทิ", price: "45.-", image: foodImages.curry },
  { category: "ขนมจีน", name: "ขนมจีนแกงเขียวหวานไก่", desc: "แกงเขียวหวานเข้มข้น ไก่นุ่ม หอมกะทิ", price: "55.-", image: foodImages.curry },
  { category: "ขนมจีน", name: "ขนมจีนน้ำยาปู", desc: "เนื้อปูหอมมัน น้ำยาเข้มข้น", price: "75.-", image: foodImages.seafood },
  { category: "ข้าวกะเพรา", name: "กะเพราหมูสับราดข้าว", desc: "ผัดไฟแรง หอมกะเพราแท้", price: "50.-", image: foodImages.rice },
  { category: "ข้าวกะเพรา", name: "กะเพราไก่ราดข้าว", desc: "ไก่นุ่ม ผัดแห้ง หอมเผ็ดกำลังดี", price: "50.-", image: foodImages.rice },
  { category: "ข้าวกะเพรา", name: "กะเพราเนื้อราดข้าว", desc: "เนื้อหอม ผัดจัดจ้านถึงเครื่อง", price: "65.-", image: foodImages.rice },
  { category: "ข้าวกะเพรา", name: "กะเพราหมูกรอบราดข้าว", desc: "หมูกรอบแน่น ผัดกะเพราเข้มข้น", price: "65.-", image: foodImages.rice },
  { category: "ข้าวกะเพรา", name: "กะเพราทะเลราดข้าว", desc: "กุ้ง หมึก สดใหม่ ผัดไฟแรง", price: "75.-", image: foodImages.seafood },
  { category: "ข้าวกะเพรา", name: "เพิ่มไข่ดาว", desc: "ไข่ดาวกรอบนอก ไข่แดงเยิ้ม", price: "10.-", image: foodImages.fried },
  { category: "กับข้าว", name: "ต้มยำรวมมิตร", desc: "กุ้ง หมึก หมู ไก่ น้ำต้มยำแซ่บ", price: "120.-", image: foodImages.soup },
  { category: "กับข้าว", name: "แกงจืดเต้าหู้หมูสับ", desc: "น้ำซุปใส หอมหวาน ทานง่าย", price: "90.-", image: foodImages.soup },
  { category: "กับข้าว", name: "ยำวุ้นเส้นทะเล", desc: "ยำรสแซ่บ กุ้งหมึกสด", price: "120.-", image: foodImages.seafood },
  { category: "กับข้าว", name: "ปีกไก่ทอด", desc: "ทอดกรอบนอก นุ่มใน", price: "90.-", image: foodImages.fried },
  { category: "เครื่องดื่ม", name: "น้ำเปล่า", desc: "น้ำดื่มเย็นสดชื่น", price: "10.-", image: foodImages.drink },
  { category: "เครื่องดื่ม", name: "ชาไทยเย็น", desc: "ชาไทยหอมมัน หวานกำลังดี", price: "35.-", image: foodImages.drink },
  { category: "เครื่องดื่ม", name: "ชาเขียวเย็น", desc: "ชาเขียวหอมละมุน สดชื่น", price: "35.-", image: foodImages.drink },
];

function priceNumber(price) {
  return Number(String(price).replace(/[^0-9]/g, "") || 0);
}

function lineLink(text) {
  return `https://line.me/R/share?text=${encodeURIComponent(text)}`;
}

function loadSaved(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    return fallback;
  }
}

function Btn({ children, onClick, style = {}, outline = false }) {
  return (
    <button
      onClick={onClick}
      style={{
        border: outline ? "1px solid rgba(255,255,255,.35)" : 0,
        background: outline ? "rgba(255,255,255,.08)" : "#8B4513",
        color: "white",
        borderRadius: 999,
        padding: "12px 18px",
        fontWeight: 900,
        cursor: "pointer",
        transition: "transform .18s ease, box-shadow .18s ease",
        ...style,
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(.96)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {children}
    </button>
  );
}

const defaultSite = {
  shopName: "บ้านอิ่มสุข",
  slogan: "อาหารไทยรสพรีเมียม อิ่มอร่อยทุกมื้อ",
  headline: "บ้านอิ่มสุข สุรินทร์",
  highlight: "ก๋วยเตี๋ยวเรือ ขนมจีน กะเพรา ปราสาท",
  intro: "ร้านบ้านอิ่มสุข อำเภอปราสาท จังหวัดสุรินทร์ ก๋วยเตี๋ยวเรือ ขนมจีน และกะเพรา อร่อยเข้มข้น วัตถุดิบสดใหม่ เปิดทุกวัน พร้อมสั่งกลับบ้านและเดลิเวอรี่",
  phone: "0xx-xxx-xxxx",
  line: "@imsuk",
  address: "ร้านบ้านอิ่มสุข อำเภอปราสาท จังหวัดสุรินทร์",
  mapEmbedUrl: "https://www.google.com/maps?q=ปราสาท%20สุรินทร์&output=embed",
  mainColor: "#8B4513",
  accentColor: "#D4AF37",
  openTime: "08:00 - 20:00",
  deliveryFee: "20",
  shopStatus: "เปิดอยู่",
  bestseller1: "ก๋วยเตี๋ยวเรือหมูน้ำตก",
  bestseller2: "ขนมจีนน้ำยากะทิ",
  bestseller3: "กะเพราหมูกรอบราดข้าว",
  bestsellerCount: "120+",
  review1: "ก๋วยเตี๋ยวเรือน้ำเข้มข้น อร่อยมากค่ะ",
  review2: "ขนมจีนสด น้ำยาหอมมัน ให้เยอะ คุ้มราคา",
  review3: "กะเพราหมูกรอบเด็ดมาก สั่งซ้ำแน่นอน",
  heroImages: [
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=65&w=850&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544025162-d76694265947?q=65&w=850&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=65&w=850&auto=format&fit=crop",
  ],
};

function ImsukRestaurantWebsite() {
  const isAdminMode = typeof window !== "undefined" && window.location.search.includes("admin=1");
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const adminOpen = isAdminMode && adminLoggedIn;
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [adminCategory, setAdminCategory] = useState("ทั้งหมด");
  const [menus, setMenus] = useState(() => loadSaved("imsuk_menus", allMenus));
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "", spicy: "เผ็ดกลาง", note: "" });
  const [orderType, setOrderType] = useState("รับเอง");
  const [newMenu, setNewMenu] = useState({ category: "", name: "", price: "", desc: "", image: "" });
  const [site, setSite] = useState(() => loadSaved("imsuk_site", defaultSite));

  const categories = ["ทั้งหมด", ...Array.from(new Set(menus.map((m) => m.category)))];
  const visibleMenus = selectedCategory === "ทั้งหมด" ? menus : menus.filter((m) => m.category === selectedCategory);
  const adminMenus = adminCategory === "ทั้งหมด" ? menus.map((item, index) => ({ item, index })) : menus.map((item, index) => ({ item, index })).filter(({ item }) => item.category === adminCategory);
  const bestsellerNames = [site.bestseller1, site.bestseller2, site.bestseller3];

  const cartTotal = cart.reduce((sum, item) => sum + priceNumber(item.price) * item.qty, 0);
  const deliveryFee = orderType === "จัดส่ง" ? priceNumber(site.deliveryFee) : 0;
  const grandTotal = cartTotal + deliveryFee;
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  const cartText = cart.length
    ? [
        `สวัสดีครับ ร้าน${site.shopName}`,
        "ผมต้องการสั่งอาหาร:",
        ...cart.map((item, i) => `${i + 1}. ${item.name} x${item.qty} = ${priceNumber(item.price) * item.qty} บาท`),
        `ค่าอาหาร ${cartTotal} บาท`,
        `ค่าจัดส่ง ${deliveryFee} บาท`,
        `ยอดสุทธิ ${grandTotal} บาท`,
        `รูปแบบ: ${orderType}`,
        `ชื่อผู้สั่ง: ${customer.name || "-"}`,
        `เบอร์โทร: ${customer.phone || "-"}`,
        `ระดับความเผ็ด: ${customer.spicy}`,
        `หมายเหตุ: ${customer.note || "-"}`,
        `ที่อยู่/รับเอง: ${orderType === "จัดส่ง" ? customer.address || "-" : "รับเองที่ร้าน"}`,
      ].join("\n")
    : `สวัสดีครับ ร้าน${site.shopName} ผมต้องการสั่งอาหารครับ`;

  useEffect(() => {
    localStorage.setItem("imsuk_site", JSON.stringify(site));
  }, [site]);

  useEffect(() => {
    localStorage.setItem("imsuk_menus", JSON.stringify(menus));
  }, [menus]);

  const resetSavedData = () => {
    if (!confirm("ต้องการรีเซ็ตข้อมูลทั้งหมดกลับค่าเริ่มต้นใช่ไหม?")) return;
    localStorage.removeItem("imsuk_site");
    localStorage.removeItem("imsuk_menus");
    setSite(defaultSite);
    setMenus(allMenus);
  };

  const updateSite = (key, value) => setSite({ ...site, [key]: value });
  const updateMenu = (index, key, value) => {
    const next = [...menus];
    next[index] = { ...next[index], [key]: value };
    setMenus(next);
  };
  const addToCart = (item) => {
    const found = cart.find((x) => x.name === item.name);
    if (found) setCart(cart.map((x) => (x.name === item.name ? { ...x, qty: x.qty + 1 } : x)));
    else setCart([...cart, { ...item, qty: 1 }]);
    const box = document.getElementById("cartBox");
    if (box) {
      box.style.transform = "scale(1.02)";
      setTimeout(() => (box.style.transform = "scale(1)"), 180);
    }
  };
  const decreaseCart = (name) => setCart(cart.map((x) => (x.name === name ? { ...x, qty: x.qty - 1 } : x)).filter((x) => x.qty > 0));
  const removeFromCart = (name) => setCart(cart.filter((x) => x.name !== name));

  const addMenu = () => {
    if (!newMenu.name) return alert("ใส่ชื่อเมนูก่อน");
    setMenus([...menus, { ...newMenu, image: newMenu.image || foodImages.thai }]);
    setNewMenu({ category: "", name: "", price: "", desc: "", image: "" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f0b08", color: "white", fontFamily: "Arial, sans-serif" }}>
      <style>{`
        @keyframes pulseLine { 0%{box-shadow:0 0 0 0 rgba(6,199,85,.65)} 70%{box-shadow:0 0 0 14px rgba(6,199,85,0)} 100%{box-shadow:0 0 0 0 rgba(6,199,85,0)} }
        @keyframes floatImg { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes shine { 0%{left:-90px} 100%{left:120%} }
        @media(max-width:640px){.heroImages{grid-template-columns:1fr!important}.heroImg{height:220px!important}.menuGrid{grid-template-columns:1fr!important}.catScroll{overflow-x:auto!important;flex-wrap:nowrap!important;justify-content:flex-start!important}.mobileCart{display:flex!important}.floatLine{bottom:76px!important}.floatAdmin{bottom:76px!important} body{padding-bottom:90px}}
      `}</style>

      <button className="floatLine" onClick={() => (window.location.href = lineLink(cartText))} style={{ position: "fixed", left: 16, bottom: 16, zIndex: 50, border: 0, borderRadius: 999, padding: "13px 18px", background: "#06C755", color: "white", fontWeight: 900, animation: "pulseLine 1.8s infinite", cursor: "pointer" }}>LINE สั่งอาหาร</button>

      <div className="mobileCart" style={{ display: "none", position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 49, background: "rgba(15,11,8,.96)", borderTop: "1px solid rgba(255,255,255,.12)", padding: 10, alignItems: "center", justifyContent: "space-between" }}>
        <strong style={{ color: site.accentColor }}>🛒 {totalQty} รายการ / {grandTotal} บาท</strong>
        <button onClick={() => document.getElementById("cart")?.scrollIntoView({ behavior: "smooth" })} style={{ border: 0, borderRadius: 999, padding: "10px 16px", background: site.accentColor, color: "#111", fontWeight: 900 }}>ดูตะกร้า</button>
      </div>

      <header style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(15,11,8,.92)", borderBottom: "1px solid rgba(255,255,255,.1)", backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0, color: site.accentColor, fontSize: 34 }}>{site.shopName}</h1>
            <p style={{ margin: 0, color: "rgba(255,255,255,.6)", fontSize: 13 }}>Boat Noodle • Khanom Jeen • Kaprao</p>
          </div>
          {isAdminMode && adminLoggedIn && <Btn outline onClick={() => setAdminLoggedIn(false)}>ออกจากแอดมิน</Btn>}
        </div>
      </header>

      {isAdminMode && !adminLoggedIn && (
        <section style={{ background: "white", color: "#222", padding: 24 }}>
          <div style={{ maxWidth: 520, margin: "0 auto", background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 22, padding: 24 }}>
            <h2 style={{ marginTop: 0 }}>เข้าสู่ระบบแอดมิน</h2>
            <p style={{ color: "#666" }}>ใส่รหัสผ่านเพื่อแก้ไขข้อมูลร้าน</p>
            <input type="password" placeholder="รหัสผ่านแอดมิน" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} style={inputStyle} />
            <button onClick={() => { if (adminPassword === "1234") setAdminLoggedIn(true); else alert("รหัสผ่านไม่ถูกต้อง"); }} style={{ border: 0, borderRadius: 999, padding: "12px 18px", background: "#111", color: "white", fontWeight: 900, cursor: "pointer" }}>เข้าหลังบ้าน</button>
            <p style={{ color: "#999", fontSize: 13 }}>ค่าเริ่มต้นรหัสผ่าน: 1234</p>
          </div>
        </section>
      )}

      {adminOpen && (
        <section style={{ background: "white", color: "#222", padding: 24 }}>
          <h2 style={{ maxWidth: 1200, margin: "0 auto 16px" }}>หลังบ้านแก้หน้าเว็บ</h2>
          <div style={{ maxWidth: 1200, margin: "0 auto 16px", display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={resetSavedData} style={{ border: 0, borderRadius: 999, background: "#ef4444", color: "white", padding: "10px 14px", fontWeight: 900, cursor: "pointer" }}>รีเซ็ตข้อมูลทั้งหมด</button>
            <span style={{ color: "#666", alignSelf: "center" }}>ระบบบันทึกอัตโนมัติแล้ว รีเฟรชรูป/เมนูจะไม่หาย</span>
          </div>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12 }}>
            {[["shopName", "ชื่อร้าน"], ["headline", "หัวข้อใหญ่"], ["highlight", "ข้อความไฮไลต์"], ["slogan", "สโลแกน"], ["phone", "เบอร์โทร"], ["line", "LINE"], ["address", "ที่อยู่"], ["openTime", "เวลาเปิด"], ["deliveryFee", "ค่าส่ง"], ["bestseller1", "เมนูขายดี 1"], ["bestseller2", "เมนูขายดี 2"], ["bestseller3", "เมนูขายดี 3"], ["bestsellerCount", "จำนวนขายแล้ว"], ["review1", "รีวิว 1"], ["review2", "รีวิว 2"], ["review3", "รีวิว 3"]].map(([key, label]) => (
              <label key={key} style={{ fontWeight: 800 }}>{label}<input value={site[key] || ""} onChange={(e) => updateSite(key, e.target.value)} style={inputStyle} /></label>
            ))}
            <label style={{ fontWeight: 800 }}>สถานะร้าน<select value={site.shopStatus} onChange={(e) => updateSite("shopStatus", e.target.value)} style={inputStyle}><option>เปิดอยู่</option><option>ปิดแล้ว</option><option>พักรับออเดอร์</option></select></label>
            <label style={{ fontWeight: 800 }}>สีหลัก<input type="color" value={site.mainColor} onChange={(e) => updateSite("mainColor", e.target.value)} style={{ ...inputStyle, height: 48 }} /></label>
            <label style={{ fontWeight: 800 }}>สีทอง<input type="color" value={site.accentColor} onChange={(e) => updateSite("accentColor", e.target.value)} style={{ ...inputStyle, height: 48 }} /></label>
            <label style={{ gridColumn: "1 / -1", fontWeight: 800 }}>ข้อความแนะนำร้าน<textarea value={site.intro} onChange={(e) => updateSite("intro", e.target.value)} style={{ ...inputStyle, minHeight: 80 }} /></label>
            <label style={{ gridColumn: "1 / -1", fontWeight: 800 }}>ลิงก์แผนที่<input value={site.mapEmbedUrl} onChange={(e) => updateSite("mapEmbedUrl", e.target.value)} style={inputStyle} /></label>
            <div style={{ gridColumn: "1 / -1", background: "#fff7ed", padding: 14, borderRadius: 16 }}>
              <strong>รูปหน้าปก 3 รูป</strong>
              {site.heroImages.map((img, i) => <input key={i} value={img} onChange={(e) => { const next = [...site.heroImages]; next[i] = e.target.value; updateSite("heroImages", next); }} style={inputStyle} />)}
            </div>
          </div>

          <div style={{ maxWidth: 1200, margin: "24px auto" }}>
            <h3>➕ เพิ่มเมนูใหม่</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 }}>
              <input placeholder="หมวดหมู่" value={newMenu.category} onChange={(e) => setNewMenu({ ...newMenu, category: e.target.value })} style={inputStyle} />
              <input placeholder="ชื่อเมนู" value={newMenu.name} onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })} style={inputStyle} />
              <input placeholder="ราคา" value={newMenu.price} onChange={(e) => setNewMenu({ ...newMenu, price: e.target.value })} style={inputStyle} />
              <input placeholder="ลิงก์รูป" value={newMenu.image} onChange={(e) => setNewMenu({ ...newMenu, image: e.target.value })} style={inputStyle} />
              <button onClick={addMenu} style={{ border: 0, borderRadius: 12, background: "#16a34a", color: "white", fontWeight: 900 }}>+ เพิ่มเมนู</button>
            </div>

            <h3>แก้เมนูอาหาร</h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>{categories.map((cat) => <button key={cat} onClick={() => setAdminCategory(cat)} style={{ border: 0, borderRadius: 999, padding: "9px 13px", background: adminCategory === cat ? site.accentColor : "#eee", fontWeight: 900 }}>{cat}</button>)}</div>
            <div style={{ maxHeight: 520, overflow: "auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 10 }}>
              {adminMenus.map(({ item, index }) => (
                <div key={index} style={{ background: "#f7f7f7", borderRadius: 16, padding: 12 }}>
                  <button onClick={() => setMenus(menus.filter((_, i) => i !== index))} style={{ float: "right", border: 0, borderRadius: 999, background: "#ef4444", color: "white", padding: "6px 10px" }}>ลบ</button>
                  <input value={item.category} onChange={(e) => updateMenu(index, "category", e.target.value)} style={inputStyle} />
                  <input value={item.name} onChange={(e) => updateMenu(index, "name", e.target.value)} style={inputStyle} />
                  <input value={item.price} onChange={(e) => updateMenu(index, "price", e.target.value)} style={inputStyle} />
                  <textarea value={item.desc} onChange={(e) => updateMenu(index, "desc", e.target.value)} style={inputStyle} />
                  <input value={item.image} onChange={(e) => updateMenu(index, "image", e.target.value)} style={inputStyle} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ position: "relative", overflow: "hidden" }}>
        <img src={site.heroImages[0]} alt="อาหาร" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.42) blur(1px)", transform: "scale(1.04)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.8), rgba(15,11,8,.98))" }} />
        <div style={{ position: "relative", maxWidth: 1250, margin: "0 auto", padding: "70px 16px 82px" }}>
          <div className="heroImages" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 34 }}>
            {site.heroImages.map((img, i) => <img className="heroImg" key={i} src={img} alt={`รูปหน้าปก ${i + 1}`} style={{ width: "100%", height: 320, objectFit: "cover", borderRadius: 34, border: i === 0 ? `2px solid ${site.accentColor}` : "1px solid rgba(255,255,255,.16)", boxShadow: "0 30px 80px rgba(0,0,0,.55)", animation: `floatImg ${5 + i}s ease-in-out infinite` }} />)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 30, alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-block", color: site.accentColor, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.18)", padding: "10px 16px", borderRadius: 999 }}>✨ {site.slogan}</div>
              <h2 style={{ fontSize: "clamp(42px,6vw,68px)", lineHeight: 1.05, margin: "18px 0 0" }}>{site.headline}<br /><span style={{ color: site.accentColor }}>{site.highlight}</span></h2>
              <div style={{ width: 80, height: 4, borderRadius: 999, background: site.accentColor, margin: "18px 0 14px" }} />
              <p style={{ fontSize: 18, lineHeight: 1.8, color: "rgba(255,255,255,.82)" }}>{site.intro}</p>
            </div>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
                {[ ["🍜", "น้ำซุปเข้มข้น"], ["🌿", "วัตถุดิบสดใหม่"], ["🔥", "ผัดไฟแรง"], [site.shopStatus === "เปิดอยู่" ? "🟢" : site.shopStatus === "ปิดแล้ว" ? "🔴" : "🟡", site.shopStatus], ["⏰", `เปิด ${site.openTime}`] ].map(([icon, text]) => <div key={text} style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.14)", borderRadius: 18, padding: 15 }}><div style={{ fontSize: 24 }}>{icon}</div><strong>{text}</strong></div>)}
              </div>
              <div style={{ marginTop: 14, background: `linear-gradient(135deg, ${site.mainColor}, rgba(0,0,0,.35))`, borderRadius: 22, padding: 18, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -30, bottom: -30, width: 70, background: "linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent)", animation: "shine 3.5s infinite" }} />
                <p style={{ margin: 0, color: site.accentColor, fontWeight: 900 }}>เมนูขายดี</p>
                {[site.bestseller1, site.bestseller2, site.bestseller3].map((name) => {
                  const item = menus.find((m) => m.name === name);
                  return <Btn key={name} onClick={() => item && addToCart(item)} style={{ marginTop: 8, width: "100%", background: site.accentColor, color: "#111" }}>+ สั่ง {name}</Btn>;
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cart" style={{ maxWidth: 1200, margin: "0 auto", padding: "30px 16px 0" }}>
        <div id="cartBox" style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 32, padding: 20, transition: "transform .2s ease" }}>
          <h2 style={{ margin: 0, fontSize: 28 }}>🛒 ตะกร้าสั่งอาหาร</h2>
          {cart.length === 0 ? <p style={{ color: "rgba(255,255,255,.65)" }}>ยังไม่มีสินค้าในตะกร้า</p> : cart.map((item) => <div key={item.name} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 10, alignItems: "center", marginTop: 10, background: "rgba(0,0,0,.22)", padding: 10, borderRadius: 14 }}><span>{item.name} x{item.qty}</span><div><button onClick={() => decreaseCart(item.name)} style={smallBtnStyle}>−</button><button onClick={() => addToCart(item)} style={smallBtnStyle}>+</button><button onClick={() => removeFromCart(item.name)} style={{ ...smallBtnStyle, background: "#ef4444", color: "white" }}>ลบ</button></div></div>)}
          <div style={{ marginTop: 14, color: "rgba(255,255,255,.86)" }}>จำนวนรวม: {totalQty} รายการ<br />ค่าอาหาร: {cartTotal} บาท<br />ค่าจัดส่ง: {deliveryFee} บาท<br /><strong style={{ color: site.accentColor, fontSize: 22 }}>ยอดสุทธิ {grandTotal} บาท</strong></div>
          <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 }}>
            <input placeholder="ชื่อผู้สั่ง" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} style={darkInputStyle} />
            <input placeholder="เบอร์โทร" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} style={darkInputStyle} />
            <select value={orderType} onChange={(e) => setOrderType(e.target.value)} style={darkInputStyle}><option>รับเอง</option><option>จัดส่ง</option></select>
            {orderType === "จัดส่ง" && <input placeholder="ที่อยู่จัดส่ง" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} style={darkInputStyle} />}
            <select value={customer.spicy} onChange={(e) => setCustomer({ ...customer, spicy: e.target.value })} style={darkInputStyle}><option>ไม่เผ็ด</option><option>เผ็ดน้อย</option><option>เผ็ดกลาง</option><option>เผ็ดมาก</option></select>
            <input placeholder="หมายเหตุ เช่น ไม่ใส่ผงชูรส / แยกน้ำ" value={customer.note} onChange={(e) => setCustomer({ ...customer, note: e.target.value })} style={darkInputStyle} />
          </div>
          <div style={{ marginTop: 16 }}><Btn onClick={() => (window.location.href = lineLink(cartText))} style={{ background: "#06C755" }}>ส่งออเดอร์เข้า LINE</Btn> <span style={{ color: "rgba(255,255,255,.65)", marginLeft: 10 }}>LINE: {site.line}</span></div>
        </div>
      </section>

      <section id="menu" style={{ maxWidth: 1200, margin: "0 auto", padding: "70px 16px" }}>
        <div style={{ textAlign: "center", marginBottom: 35 }}>
          <p style={{ color: site.accentColor, fontWeight: 900 }}>Signature Menu</p>
          <h2 style={{ fontSize: "clamp(34px,5vw,54px)", margin: 0 }}>เมนูอาหารร้าน{site.shopName}</h2>
          <div className="catScroll" style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 25 }}>{categories.map((cat) => <button key={cat} onClick={() => setSelectedCategory(cat)} style={{ border: 0, borderRadius: 999, padding: "10px 18px", fontWeight: 900, cursor: "pointer", background: selectedCategory === cat ? site.accentColor : "rgba(255,255,255,.08)", color: selectedCategory === cat ? "#111" : "white", transform: selectedCategory === cat ? "scale(1.06)" : "scale(1)", transition: "all .2s" }}>{cat}</button>)}</div>
        </div>
        <div className="menuGrid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 22 }}>
          {visibleMenus.map((item, i) => (
            <div key={`${item.name}-${i}`} style={{ position: "relative", background: "rgba(255,255,255,.09)", border: bestsellerNames.includes(item.name) ? `2px solid ${site.accentColor}` : "1px solid rgba(255,255,255,.1)", borderRadius: 30, overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,.25)" }}>
              {bestsellerNames.includes(item.name) && <><div style={badgeStyle}>🔥 ขายดี</div><div style={{ ...badgeStyle, left: "auto", right: 12, background: "#22c55e" }}>ขายแล้ว {site.bestsellerCount}</div></>}
              <img loading="lazy" decoding="async" src={item.image} alt={item.name} style={{ width: "100%", height: 210, objectFit: "cover" }} />
              <div style={{ padding: 20 }}><p style={{ color: site.accentColor, fontSize: 12, fontWeight: 900 }}>{item.category}</p><h3>{item.name}</h3><p style={{ color: "rgba(255,255,255,.65)" }}>{item.desc}</p><div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}><strong style={{ color: site.accentColor, fontSize: 22 }}>{item.price}</strong><Btn onClick={() => addToCart(item)} style={{ background: site.mainColor }}>+ ตะกร้า</Btn></div></div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "10px 16px 70px" }}>
        <div style={{ textAlign: "center", marginBottom: 26 }}><p style={{ color: site.accentColor, fontWeight: 900 }}>Customer Reviews</p><h2 style={{ fontSize: "clamp(32px,5vw,48px)", margin: 0 }}>เสียงจากลูกค้า</h2></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18 }}>{[site.review1, site.review2, site.review3].map((review, i) => <div key={i} style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 28, padding: 24 }}><div style={{ color: site.accentColor }}>★★★★★</div><p>“{review}”</p><p style={{ color: "rgba(255,255,255,.5)" }}>— ลูกค้าบ้านอิ่มสุข</p></div>)}</div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "70px 16px" }}>
        <div style={{ background: `linear-gradient(135deg, ${site.mainColor}, #130c08)`, borderRadius: 38, padding: 30, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 22 }}><div><p style={{ color: site.accentColor, fontWeight: 900 }}>Order Now</p><h2>สั่งอาหารร้าน{site.shopName}</h2><p>โทรสั่งอาหาร หรือเพิ่ม LINE ร้าน เพื่อสั่งล่วงหน้าได้ทันที</p></div><div style={{ display: "grid", gap: 12 }}><Btn style={{ background: "white", color: "#111" }}>☎️ โทร: {site.phone}</Btn><Btn onClick={() => (window.location.href = lineLink(cartText))} style={{ background: "#06C755" }}>LINE: {site.line}</Btn></div></div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "50px 16px" }}>
        <h2>📍 แผนที่ร้าน</h2>
        <div style={{ borderRadius: 24, overflow: "hidden", border: "1px solid rgba(255,255,255,.15)" }}><iframe title="map" src={site.mapEmbedUrl} width="100%" height="320" style={{ border: 0 }} loading="lazy" /></div>
        <p>{site.address}</p><Btn onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`, "_blank")} style={{ background: site.accentColor, color: "#111" }}>เปิดใน Google Maps</Btn>
      </section>

      <footer style={{ textAlign: "center", padding: 24, color: "rgba(255,255,255,.5)", borderTop: "1px solid rgba(255,255,255,.1)" }}>© ร้าน{site.shopName} — เว็บร้านอาหารพร้อมหลังบ้านแก้ไขได้</footer>
    </div>
  );
}

const inputStyle = { width: "100%", boxSizing: "border-box", padding: 10, marginTop: 6, marginBottom: 8, border: "1px solid #ddd", borderRadius: 10 };
const darkInputStyle = { width: "100%", boxSizing: "border-box", padding: 12, border: "1px solid rgba(255,255,255,.18)", borderRadius: 12, background: "rgba(0,0,0,.28)", color: "white" };
const smallBtnStyle = { border: 0, borderRadius: 999, padding: "7px 11px", marginLeft: 5, fontWeight: 900, cursor: "pointer" };
const badgeStyle = { position: "absolute", top: 12, left: 12, zIndex: 2, background: "linear-gradient(135deg,#ef4444,#f97316)", color: "white", padding: "7px 12px", borderRadius: 999, fontWeight: 900, fontSize: 13 };

createRoot(document.getElementById("root")).render(<ImsukRestaurantWebsite />);
