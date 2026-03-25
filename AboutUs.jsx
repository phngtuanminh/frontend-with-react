import { useEffect, useRef, useState } from "react";

const team = [
  {
    name: "Phong Tuan Minh",
    role: "Founder & Lead Instructor",
    bio: "10+ years of frontend engineering experience. Passionate about making React accessible to every developer.",
    avatar: "PTM",
    color: "#e8d5b7",
  },
  {
    name: "Nguyen Lan Anh",
    role: "Curriculum Designer",
    bio: "Former UX engineer at top tech firms. Designs learning paths that bridge theory and real-world practice.",
    avatar: "NLA",
    color: "#b7d5e8",
  },
  {
    name: "Tran Minh Khoa",
    role: "Senior React Engineer",
    bio: "Open-source contributor and React enthusiast. Brings cutting-edge patterns directly into the classroom.",
    avatar: "TMK",
    color: "#d5e8b7",
  },
];

const stats = [
  { value: "12,000+", label: "Students Enrolled" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "150+", label: "Hours of Content" },
  { value: "40+", label: "Real-World Projects" },
];

const values = [
  {
    icon: "⚡",
    title: "Practical First",
    desc: "Every concept is tied to real code you'll actually ship.",
  },
  {
    icon: "🔍",
    title: "Deep Understanding",
    desc: "We don't just show you how — we explain the why behind every pattern.",
  },
  {
    icon: "🤝",
    title: "Community Driven",
    desc: "Learn alongside thousands of developers at every level.",
  },
  {
    icon: "🚀",
    title: "Always Current",
    desc: "Content updated continuously with the latest React features and best practices.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

function StatCard({ value, label, delay }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        textAlign: "center",
        padding: "2rem 1rem",
      }}
    >
      <div style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#c8a96e", lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ marginTop: "0.5rem", fontSize: "0.85rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#9a8b7a" }}>
        {label}
      </div>
    </div>
  );
}

function TeamCard({ member, delay }) {
  const [ref, visible] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        background: hovered ? "#1e1a14" : "#17140f",
        border: `1px solid ${hovered ? "#c8a96e" : "#2e2820"}`,
        borderRadius: "2px",
        padding: "2.5rem 2rem",
        cursor: "default",
        boxShadow: hovered ? "0 12px 40px rgba(200,169,110,0.12)" : "none",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms, background 0.3s, border 0.3s, box-shadow 0.3s`,
      }}
    >
      <div style={{
        width: 64, height: 64, borderRadius: "50%",
        background: member.color,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700, fontSize: "1rem",
        color: "#17140f",
        marginBottom: "1.5rem",
        letterSpacing: "0.05em",
      }}>
        {member.avatar}
      </div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#f0e6d3", marginBottom: "0.3rem" }}>
        {member.name}
      </div>
      <div style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c8a96e", marginBottom: "1rem" }}>
        {member.role}
      </div>
      <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "#7a6e62", margin: 0 }}>
        {member.bio}
      </p>
    </div>
  );
}

function ValueCard({ value, delay }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        display: "flex", gap: "1rem", alignItems: "flex-start",
      }}
    >
      <span style={{ fontSize: "1.4rem", lineHeight: 1, marginTop: "2px" }}>{value.icon}</span>
      <div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: "#f0e6d3", marginBottom: "0.35rem" }}>
          {value.title}
        </div>
        <p style={{ fontSize: "0.875rem", color: "#7a6e62", lineHeight: 1.7, margin: 0 }}>
          {value.desc}
        </p>
      </div>
    </div>
  );
}

export default function AboutUs() {
  const [heroRef, heroVisible] = useInView(0.05);

  return (
    <>
      {/* Google Font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lora:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #100e0a; }

        .about-divider {
          width: 48px; height: 1px;
          background: linear-gradient(90deg, transparent, #c8a96e, transparent);
          margin: 0 auto;
        }

        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineGrow {
          from { width: 0; }
          to   { width: 48px; }
        }
      `}</style>

      <main style={{ background: "#100e0a", color: "#f0e6d3", minHeight: "100vh", fontFamily: "'Lora', Georgia, serif" }}>

        {/* ── HERO ── */}
        <section
          ref={heroRef}
          style={{
            position: "relative",
            padding: "clamp(5rem, 12vw, 9rem) 2rem clamp(4rem, 8vw, 7rem)",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          {/* Background texture lines */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 79px, #1e1a1410 80px)",
            opacity: 0.6,
          }} />

          <div style={{
            opacity: heroVisible ? 1 : 0,
            animation: heroVisible ? "fadeDown 0.9s ease forwards" : "none",
          }}>
            <p style={{
              fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase",
              color: "#c8a96e", marginBottom: "1.5rem",
            }}>
              Est. 2021 · Hanoi, Vietnam
            </p>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.8rem, 8vw, 6rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#f0e6d3",
              marginBottom: "1rem",
            }}>
              We Teach React<br />
              <em style={{ fontStyle: "italic", color: "#c8a96e" }}>the Right Way.</em>
            </h1>

            <div className="about-divider" style={{ marginTop: "2rem", marginBottom: "2rem" }} />

            <p style={{
              maxWidth: 540,
              margin: "0 auto",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "#9a8b7a",
            }}>
              ReactForge is a Vietnamese-born frontend education studio dedicated to
              producing world-class React developers through deep, project-driven learning.
            </p>
          </div>
        </section>

        {/* ── STATS ── */}
        <section style={{
          borderTop: "1px solid #2e2820",
          borderBottom: "1px solid #2e2820",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          maxWidth: 900,
          margin: "0 auto",
        }}>
          {stats.map((s, i) => (
            <StatCard key={s.label} value={s.value} label={s.label} delay={i * 120} />
          ))}
        </section>

        {/* ── MISSION ── */}
        <section style={{ maxWidth: 720, margin: "0 auto", padding: "clamp(4rem, 8vw, 7rem) 2rem" }}>
          <p style={{
            fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase",
            color: "#c8a96e", marginBottom: "1.5rem", textAlign: "center",
          }}>Our Mission</p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
            textAlign: "center", lineHeight: 1.3,
            color: "#f0e6d3", marginBottom: "2rem",
          }}>
            Closing the gap between<br />
            <em style={{ color: "#c8a96e" }}>learning and building.</em>
          </h2>
          <div className="about-divider" style={{ marginBottom: "2.5rem" }} />
          <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "#7a6e62", textAlign: "center" }}>
            Too many developers finish tutorials still unable to build real products.
            ReactForge was born from that frustration. We combine rigorous conceptual
            depth with hands-on projects so that when you finish our course, you don't
            just understand React — you can architect, build, and ship with it.
          </p>
        </section>

        {/* ── VALUES ── */}
        <section style={{
          background: "#0d0b08",
          borderTop: "1px solid #2e2820",
          borderBottom: "1px solid #2e2820",
          padding: "clamp(4rem, 8vw, 7rem) 2rem",
        }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <p style={{
              fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase",
              color: "#c8a96e", marginBottom: "1rem", textAlign: "center",
            }}>What We Stand For</p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
              textAlign: "center", color: "#f0e6d3", marginBottom: "3.5rem",
            }}>
              Our Core Values
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2.5rem 4rem",
            }}>
              {values.map((v, i) => <ValueCard key={v.title} value={v} delay={i * 100} />)}
            </div>
          </div>
        </section>

        {/* ── TEAM ── */}
        <section style={{ maxWidth: 960, margin: "0 auto", padding: "clamp(4rem, 8vw, 7rem) 2rem" }}>
          <p style={{
            fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase",
            color: "#c8a96e", marginBottom: "1rem", textAlign: "center",
          }}>The People</p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
            textAlign: "center", color: "#f0e6d3", marginBottom: "3rem",
          }}>
            Meet the Team
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}>
            {team.map((m, i) => <TeamCard key={m.name} member={m} delay={i * 150} />)}
          </div>
        </section>

        {/* ── FOOTER CTA ── */}
        <section style={{
          borderTop: "1px solid #2e2820",
          padding: "clamp(3rem, 6vw, 5rem) 2rem",
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
            color: "#f0e6d3",
            marginBottom: "2rem",
          }}>
            Ready to master React?
          </p>
          <a
            href="#"
            style={{
              display: "inline-block",
              padding: "0.85rem 2.5rem",
              border: "1px solid #c8a96e",
              color: "#c8a96e",
              fontFamily: "'Lora', serif",
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              textDecoration: "none",
              transition: "background 0.25s, color 0.25s",
            }}
            onMouseEnter={e => { e.target.style.background = "#c8a96e"; e.target.style.color = "#100e0a"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#c8a96e"; }}
          >
            Start Learning Today
          </a>
          <p style={{ marginTop: "3rem", fontSize: "0.75rem", color: "#3a342c", letterSpacing: "0.1em" }}>
            © {new Date().getFullYear()} ReactForge · Hanoi, Vietnam
          </p>
        </section>

      </main>
    </>
  );
}
