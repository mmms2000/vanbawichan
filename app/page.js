"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const experiences = [
  {
    year: "2020",
    title: "콘텐츠 부문 대상",
    body: "공모전과 기관 프로젝트를 통해 기획력과 제작 완성도를 증명했습니다.",
  },
  {
    year: "2021 - 2022",
    title: "영상 총괄 디렉팅",
    body: "촬영, 편집, 색 보정, 사운드까지 콘텐츠 제작 흐름을 주도했습니다.",
  },
  {
    year: "2023 - 현재",
    title: "전속 크리에이터",
    body: "브랜드의 메인 콘텐츠를 기획하고 제작하며 꾸준한 협업 결과를 만들고 있습니다.",
  },
];

const works = [
  { image: "/work-crops/work-01.png", meta: "26 MM | 20.0 SEC | F13 | ISO 100" },
  { image: "/work-crops/work-02.png", meta: "31 MM | 1/90 SEC | F11 | ISO 250" },
  { image: "/work-crops/work-03.png", meta: "18 MM | 1/500 SEC | F5 | ISO 200" },
  { image: "/work-crops/work-04.png", meta: "18 MM | 1/90 SEC | F4 | ISO 250" },
  { image: "/work-crops/work-05.png", meta: "25 MM | 1/8 SEC | F4 | ISO 100" },
  { image: "/work-crops/work-06.png", meta: "18 MM | 20.0 SEC | F22 | ISO 125" },
];

const skills = [
  ["Planning", "시장 조사와 타겟 분석을 바탕으로 맞춤형 콘텐츠를 설계합니다."],
  ["Production", "촬영 장비와 제작 툴을 활용해 높은 밀도의 결과물을 만듭니다."],
  ["Analysis", "Studio와 GA4 기반으로 지속 시간, 유입 경로, 반응을 읽습니다."],
  ["Communication", "클라이언트의 니즈를 명확히 파악하고 제작 방향을 정돈합니다."],
];

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState({
    state: "idle",
    message: "",
  });

  const brands = useMemo(
    () => ["Brand 1", "Brand 2", "Brand 3", "Brand 4", "Brand 5", "Brand 6"],
    []
  );

  useEffect(() => {
    const revealItems = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.16 }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const nextY = window.scrollY;
      setScrollY(nextY);
      setProgress(max > 0 ? Math.min(100, (nextY / max) * 100) : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const updateContactField = (event) => {
    const { name, value } = event.target;
    setContactForm((current) => ({ ...current, [name]: value }));
  };

  const sendContactMail = async (event) => {
    event.preventDefault();
    setContactStatus({ state: "sending", message: "문의 메일을 보내는 중입니다." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "메일 전송에 실패했습니다.");
      }

      setContactForm({ name: "", email: "", message: "" });
      setContactStatus({ state: "sent", message: "문의가 메일로 전송되었습니다." });
    } catch (error) {
      setContactStatus({
        state: "error",
        message: error.message || "메일 전송에 실패했습니다.",
      });
    }
  };

  return (
    <main>
      <div className="progress" style={{ transform: `scaleX(${progress / 100})` }} />

      <nav className="site-nav" aria-label="Primary navigation">
        <a href="#top" className="brand-mark">VBC</a>
        <div>
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="top" className="hero">
        <div
          className="hero-media"
          style={{ transform: `translate3d(0, ${scrollY * 0.08}px, 0)` }}
          aria-hidden="true"
        >
          <Image
            src="/pdf-pages/slide-04.png"
            alt=""
            width={1920}
            height={1080}
            className="hero-slide main"
            priority
          />
          <Image
            src="/pdf-pages/slide-05.png"
            alt=""
            width={1920}
            height={1080}
            className="hero-slide ghost"
          />
        </div>
        <div className="hero-copy">
          <p className="kicker" data-reveal>Creator Portfolio</p>
          <h1 data-reveal><span>VAN</span><span>BAWI</span><span>CHAN</span></h1>
          <div className="hero-bottom" data-reveal>
            <p>기획, 촬영, 편집, 분석까지 연결하는 모던 크리에이터 포트폴리오.</p>
            <a href="#work" className="circle-link" aria-label="View portfolio work">↓</a>
          </div>
        </div>
      </section>

      <section id="about" className="section about-section">
        <div className="section-label" data-reveal>About</div>
        <div className="about-grid">
          <div data-reveal>
            <h2>브랜드의 흐름을 읽고, 영상의 리듬으로 설계합니다.</h2>
          </div>
          <div className="about-copy" data-reveal>
            <p>
              Van Bawi Chan은 콘텐츠의 첫 아이디어부터 완성된 화면까지 직접 다루는
              크리에이터입니다. 흑백의 단단한 톤 위에 촬영 정보와 제작 의도를 선명하게
              남기며, 브랜드가 필요로 하는 메시지를 시각적인 경험으로 변환합니다.
            </p>
            <dl>
              <div><dt>Email</dt><dd>VANBAWICHAN2003@GMAIL.COM</dd></div>
              <div><dt>Instagram</dt><dd>@VANBAWICHAN</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section experience-section">
        <div className="section-label" data-reveal>Experience</div>
        <div className="timeline">
          {experiences.map((item, index) => (
            <article className="timeline-item" data-reveal key={item.year} style={{ "--delay": `${index * 90}ms` }}>
              <span>{item.year}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="work" className="work-section">
        <div className="sticky-heading">
          <p className="kicker" data-reveal>Selected Work</p>
          <h2 data-reveal>프레임마다 남긴 속도, 빛, 의도.</h2>
        </div>
        <div className="work-track">
          {works.map((work, index) => (
            <article className="work-card" data-reveal key={work.image} style={{ "--delay": `${index * 70}ms` }}>
              <div className="work-frame">
                <Image
                  src={work.image}
                  alt={`Portfolio work ${index + 1}`}
                  width={1547}
                  height={871}
                  sizes="(max-width: 768px) 96vw, 92vw"
                />
              </div>
              <div className="work-caption">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>A6400 | SELP18105G | {work.meta}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section personal-section">
        <div className="section-label" data-reveal>Personal Work</div>
        <div className="personal-panel" data-reveal>
          <span>Documentary</span>
          <h2>일상의 재발견</h2>
          <p>
            상업적인 틀에서 벗어나 크리에이터 고유의 미학적 실험을 진행한 자체 기획
            다큐멘터리. 독창적인 색 보정과 사운드 디자인을 중심에 둡니다.
          </p>
        </div>
      </section>

      <section className="section collaboration-section">
        <div className="section-label" data-reveal>Collaboration</div>
        <div className="brand-grid">
          {brands.map((brand, index) => (
            <div className="brand-cell" data-reveal key={brand} style={{ "--delay": `${index * 70}ms` }}>
              <span>{brand}</span>
              <p>협업 브랜드</p>
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="section skills-section">
        <div className="section-label" data-reveal>Core Skills</div>
        <div className="skills-grid">
          {skills.map(([title, body], index) => (
            <article className="skill-card" data-reveal key={title} style={{ "--delay": `${index * 80}ms` }}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-inner" data-reveal>
          <p className="kicker">Thank You</p>
          <h2>귀사의 브랜드에 새로운 흐름을 만들 준비가 되어 있습니다.</h2>
          <div className="contact-grid">
            <div className="contact-links" aria-label="Contact links">
              <a
                href="mailto:VANBAWICHAN2003@GMAIL.COM"
                className="icon-link"
                aria-label="Send email to Van Bawi Chan"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 6.5h16v11H4z" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
                <span>Gmail</span>
              </a>
              <a
                href="https://www.instagram.com/vanbawichan/?hl=en"
                className="icon-link"
                aria-label="Open Van Bawi Chan Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="4" y="4" width="16" height="16" rx="5" />
                  <circle cx="12" cy="12" r="3.6" />
                  <circle cx="16.8" cy="7.2" r="0.8" />
                </svg>
                <span>Instagram</span>
              </a>
            </div>

            <form className="contact-form" onSubmit={sendContactMail}>
              <label>
                <span>이름</span>
                <input
                  name="name"
                  value={contactForm.name}
                  onChange={updateContactField}
                  placeholder="Name"
                  type="text"
                  required
                />
              </label>
              <label>
                <span>메일</span>
                <input
                  name="email"
                  value={contactForm.email}
                  onChange={updateContactField}
                  placeholder="Email"
                  type="email"
                  required
                />
              </label>
              <label>
                <span>문의 내용</span>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={updateContactField}
                  placeholder="Message"
                  rows="5"
                  required
                />
              </label>
              <button type="submit" disabled={contactStatus.state === "sending"}>
                {contactStatus.state === "sending" ? "보내는 중" : "문의하기"}
              </button>
              {contactStatus.message ? (
                <p className={`contact-status ${contactStatus.state}`}>{contactStatus.message}</p>
              ) : null}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
