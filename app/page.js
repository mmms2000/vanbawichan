"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const experiences = [
  ["2026", "제6회 대상그룹 대학생 스마트폰 영화제", "최종 선정"],
  ["2026", "한국철도공사(KORAIL) 제2회 「철도를 담다」", "공모전 수상"],
  ["2025", "대한민국-키르기스스탄 교육협력 컨퍼런스", "공식 행사 사진 촬영"],
  ["2024.12 - 2025.02", "KNN 뉴미디어국 인턴", "뉴미디어 제작 실무"],
  ["2024, 2026", "부산 영화의전당 사진 공모전", "총 2회 수상"],
  ["2022 - 현재", "부산 수영로교회 미얀마 예배부", "미디어 총괄"],
  ["2025", "부산대학교 글로벌 엠버서더", "미디어 담당"],
];

const experiencePhotos = [
  ["experience-01.png", "Filming city view at dusk"],
  ["experience-02.png", "Operating a broadcast camera"],
  ["experience-03.png", "Editing media at a workstation"],
  ["experience-04.png", "Directing a camera crew"],
];

const works = [
  ["work-01.png", "26 MM | 20.0 SEC | F13 | ISO 100"],
  ["work-02.png", "31 MM | 1/90 SEC | F11 | ISO 250"],
  ["work-03.png", "18 MM | 1/500 SEC | F5 | ISO 200"],
  ["work-04.png", "18 MM | 1/90 SEC | F4 | ISO 250"],
  ["work-05.png", "25 MM | 1/8 SEC | F4 | ISO 100"],
  ["work-06.png", "18 MM | 20.0 SEC | F22 | ISO 125"],
  ["work-07.png", "76 MM | 1/3 SEC | F6.7 | ISO 125"],
  ["work-08.png", "63 MM | 1/125 SEC | F4 | ISO 6400"],
  ["work-09.png", "18 MM | 1/125 SEC | F4 | ISO 125"],
  ["work-10.png", "26 MM | 20.0 SEC | F16 | ISO 125"],
];

const videos = [
  ["PROMOTION VIDEO", "https://www.youtube.com/watch?v=sGgFbcInyuY"],
  ["SHORT FILM", "https://www.youtube.com/watch?v=vo3lPwPvxyU"],
  ["COMPETITION", "https://www.youtube.com/watch?v=bQ6na5dehnQ"],
  ["MV", "https://www.youtube.com/watch?v=DDCfZFqSwMQ"],
];

const maxMessageLength = 300;

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [showHeroArrow, setShowHeroArrow] = useState(true);
  const messageRef = useRef(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactAttempted, setContactAttempted] = useState(false);
  const [contactStatus, setContactStatus] = useState({ state: "idle", message: "" });

  useEffect(() => {
    const revealItems = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const nextY = window.scrollY;
      setProgress(max > 0 ? Math.min(100, (nextY / max) * 100) : 0);
      setShowHeroArrow(nextY < 20);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!messageRef.current) return;
    messageRef.current.style.height = "auto";
    messageRef.current.style.height = `${messageRef.current.scrollHeight}px`;
  }, [contactForm.message]);

  const updateContactField = (event) => {
    const { name, value } = event.target;
    const nextValue = name === "message" ? value.slice(0, maxMessageLength) : value;
    setContactForm((current) => ({ ...current, [name]: nextValue }));
    if (contactStatus.state !== "idle") setContactStatus({ state: "idle", message: "" });
  };

  const sendContactMail = async (event) => {
    event.preventDefault();
    setContactAttempted(true);

    if (Object.values(contactForm).some((value) => !value.trim())) {
      setContactStatus({ state: "error", message: "빈칸을 모두 입력해주세요." });
      return;
    }

    setContactStatus({ state: "sending", message: "문의 메일을 보내는 중입니다." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "메일 전송에 실패했습니다.");

      setContactForm({ name: "", email: "", message: "" });
      setContactAttempted(false);
      setContactStatus({ state: "sent", message: "문의가 메일로 전송되었습니다." });
    } catch (error) {
      setContactStatus({ state: "error", message: error.message || "메일 전송에 실패했습니다." });
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
          <a href="#video">Video</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="top" className="reference-hero">
        <div className="hero-title" data-reveal>
          <p><span>VAN</span><span>BAWI</span><span>CHAN</span></p>
          <h1>Creator Portfolio, 반보이찬</h1>
        </div>
        <Image
          src="/portfolio-assets/cover-camera.png"
          alt="Van Bawi Chan filming with a camera"
          width={903}
          height={866}
          className="cover-photo"
          priority
        />
        <a
          href="#about"
          className={`circle-link hero-arrow ${showHeroArrow ? "is-visible" : "is-hidden"}`}
          aria-label="Scroll to about"
          onClick={() => setShowHeroArrow(false)}
        >
          ↓
        </a>
      </section>

      <section id="about" className="reference-section about-reference">
        <div className="reference-copy" data-reveal>
          <p className="section-kicker">ABOUT ME</p>
          <h2>VAN BAWI CHAN</h2>
          <strong>2003.07.21, 미얀마</strong>
          <p>
            안녕하세요. 사진작가이자 영상 디렉터 반보이찬입니다.<br />
            미얀마에서 태어나 한국에서 15년 동안 살아오며,<br />
            제2의 고향인 한국에서의 순간들을 사진과 영상으로 기록해 왔습니다.
          </p>
          <p>
            저에게 순간은 눈으로 바라보는 것만으로는 아쉽고,<br />
            다시 꺼내볼 수 있도록 담아내야 할 소중한 이야기입니다.<br />
            저는 평범한 순간도 저만의 시선과 감각으로 담아내어,<br />
            시간이 지나도 기억에 남는 하나의 작품이자 걸작으로 만들어가는 예술가입니다.
          </p>
          <dl>
            <div><dt>Email</dt><dd>VANBAWICHAN2003@GMAIL.COM</dd></div>
            <div><dt>Instagram</dt><dd>@VANBAWICHAN</dd></div>
          </dl>
        </div>
        <Image
          src="/portfolio-assets/about-portrait.png"
          alt="Portrait of Van Bawi Chan"
          width={684}
          height={577}
          className="about-photo"
          data-reveal
        />
      </section>

      <section className="experience-reference">
        <div className="section-kicker experience-title" data-reveal>EXPERIENCE</div>
        <div className="experience-copy">
          <div className="experience-list">
            {experiences.map(([year, title, body], index) => (
              <article data-reveal key={`${year}-${title}`} style={{ "--delay": `${index * 60}ms` }}>
                <span>{year}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="experience-photo-grid" data-reveal>
          {experiencePhotos.map(([image, alt]) => (
            <Image
              src={`/portfolio-assets/${image}`}
              alt={alt}
              width={668}
              height={476}
              key={image}
              sizes="(max-width: 920px) 94vw, 34vw"
            />
          ))}
        </div>
      </section>

      <section id="work" className="scroll-work">
        <div className="sticky-work-title">
          <p className="section-kicker">PHOTO WORKS</p>
          <h2>사진의 흐름을 자연스럽게 따라가는 포트폴리오.</h2>
        </div>
        {works.map(([image, meta], index) => (
          <article className="work-reveal" data-reveal key={image}>
            <Image
              src={`/work-crops/${image}`}
              alt={`Photography work ${index + 1}`}
              width={1547}
              height={871}
              sizes="(max-width: 768px) 96vw, 86vw"
            />
            <div>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>A6400 | SELP18105G | {meta}</p>
            </div>
          </article>
        ))}
      </section>

      <section id="video" className="video-reference">
        <div data-reveal>
          <p className="section-kicker">VISUAL NARRATIVES</p>
          <h2 className="video-title">영상으로 확장되는 시선.</h2>
        </div>
        <div className="video-links">
          {videos.map(([title, url], index) => (
            <a href={url} target="_blank" rel="noreferrer" data-reveal key={title} style={{ "--delay": `${index * 70}ms` }}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{title}</strong>
              <small>YOUTUBE</small>
            </a>
          ))}
        </div>
      </section>

      <section className="sns-reference">
        <div data-reveal>
          <p className="section-kicker">SNS</p>
          <a href="https://www.instagram.com/vanbawichan/?hl=en" target="_blank" rel="noreferrer">@VANBAWICHAN</a>
        </div>
        <Image
          src="/portfolio-assets/sns-preview.png"
          alt="Instagram profile preview"
          width={573}
          height={594}
          data-reveal
        />
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-heading" data-reveal>
          <p className="kicker">THANK YOU</p>
          <h2 className="contact-title"><span>새로운 시선을 넘어,</span><span>브랜드의 마스터 피스를 만들 준비가 되어 있습니다.</span></h2>
        </div>
        <div className="contact-inner" data-reveal>
          <div className="contact-grid">
            <div className="contact-links" aria-label="Contact links">
              <a href="mailto:VANBAWICHAN2003@GMAIL.COM" className="icon-link" aria-label="Send email to Van Bawi Chan">
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
              <a
                href="https://www.youtube.com/@VanBawiChan"
                className="icon-link"
                aria-label="Open Van Bawi Chan YouTube"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4.5 8.2c.2-1.1 1.1-1.9 2.2-2.1 1.8-.3 5.3-.3 5.3-.3s3.5 0 5.3.3c1.1.2 2 .9 2.2 2.1.3 1.8.3 3.8.3 3.8s0 2-.3 3.8c-.2 1.1-1.1 1.9-2.2 2.1-1.8.3-5.3.3-5.3.3s-3.5 0-5.3-.3c-1.1-.2-2-.9-2.2-2.1-.3-1.8-.3-3.8-.3-3.8s0-2 .3-3.8Z" />
                  <path d="m10.5 9.4 4.2 2.6-4.2 2.6Z" />
                </svg>
                <span>YouTube</span>
              </a>
            </div>

            <form className="contact-form" onSubmit={sendContactMail} noValidate>
              <label>
                <span>이름</span>
                <input
                  className={contactAttempted && !contactForm.name.trim() ? "is-invalid" : ""}
                  name="name"
                  value={contactForm.name}
                  onChange={updateContactField}
                  placeholder="Name"
                  type="text"
                  aria-invalid={contactAttempted && !contactForm.name.trim()}
                />
              </label>
              <label>
                <span>메일</span>
                <input
                  className={contactAttempted && !contactForm.email.trim() ? "is-invalid" : ""}
                  name="email"
                  value={contactForm.email}
                  onChange={updateContactField}
                  placeholder="Email"
                  type="email"
                  aria-invalid={contactAttempted && !contactForm.email.trim()}
                />
              </label>
              <label>
                <span>문의 내용 <b>{contactForm.message.length}/{maxMessageLength}</b></span>
                <textarea
                  ref={messageRef}
                  className={contactAttempted && !contactForm.message.trim() ? "is-invalid" : ""}
                  name="message"
                  value={contactForm.message}
                  onChange={updateContactField}
                  placeholder="Message"
                  rows="5"
                  maxLength={maxMessageLength}
                  aria-invalid={contactAttempted && !contactForm.message.trim()}
                />
              </label>
              <button type="submit" disabled={contactStatus.state === "sending"}>
                {contactStatus.state === "sending" ? "보내는 중" : "문의하기"}
              </button>
              {contactStatus.message ? <p className={`contact-status ${contactStatus.state}`}>{contactStatus.message}</p> : null}
            </form>
          </div>
        </div>
        <Image
          src="/portfolio-assets/thank-you-camera.png"
          alt="Van Bawi Chan taking a photo"
          width={919}
          height={992}
          className="contact-photo"
          data-reveal
        />
      </section>
    </main>
  );
}
