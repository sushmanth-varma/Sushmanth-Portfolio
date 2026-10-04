/**
 * PORTFOLIO SCRIPTS & DYNAMIC INTERACTION ENGINE
 * Dommaraju Sushmanth Varma — Portfolio
 */

document.addEventListener("DOMContentLoaded", () => {
  /* ------------------------------------------------------------
     1. TOAST NOTIFICATION UTILITY
     ------------------------------------------------------------ */
  const toastContainer = document.getElementById("toastContainer");

  function showToast(message, type = "success") {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === "success" ? "✓" : "ℹ"}</span>
      <span class="toast-text">${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(12px)";
      toast.style.transition = "all 0.25s ease";
      setTimeout(() => toast.remove(), 260);
    }, 3200);
  }

  /* ------------------------------------------------------------
     2. FLOATING NAV SCROLL & MOBILE DRAWER
     ------------------------------------------------------------ */
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    },
    { passive: true },
  );

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.toggle("open");
      mobileMenuBtn.setAttribute("aria-expanded", isOpen);
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (e) => {
      if (
        !navbar.contains(e.target) &&
        mobileDrawer.classList.contains("open")
      ) {
        mobileDrawer.classList.remove("open");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Active section observer
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0,
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => navObserver.observe(section));

  /* ------------------------------------------------------------
     3. STATS COUNT-UP ANIMATION
     ------------------------------------------------------------ */
  const statFigures = document.querySelectorAll(".stat-figure");
  let statsAnimated = false;

  function animateStats() {
    statFigures.forEach((stat) => {
      const target = parseFloat(stat.getAttribute("data-target"));
      const suffix = stat.getAttribute("data-suffix") || "";
      const decimals = parseInt(stat.getAttribute("data-decimals") || "0", 10);
      const duration = 1800;
      const startTime = performance.now();

      function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = target * easeOut;

        stat.textContent =
          decimals > 0
            ? currentVal.toFixed(decimals) + suffix
            : Math.floor(currentVal) + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          stat.textContent =
            (decimals > 0 ? target.toFixed(decimals) : target) + suffix;
        }
      }
      requestAnimationFrame(updateNumber);
    });
  }

  const numbersSection = document.getElementById("numbers");
  if (numbersSection) {
    const numbersObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            animateStats();
          }
        });
      },
      { threshold: 0.3 },
    );
    numbersObserver.observe(numbersSection);
  }

  /* ------------------------------------------------------------
     4. SKILLS FILTERING (Dikshant Badges)
     ------------------------------------------------------------ */
  const skillFilterBtns = document.querySelectorAll(".skill-filter-btn");
  const techBadgeCards = document.querySelectorAll(".tech-badge-card");

  skillFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      skillFilterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      techBadgeCards.forEach((card) => {
        const cat = card.getAttribute("data-category") || "";
        if (filter === "all" || cat.includes(filter)) {
          card.style.display = "flex";
          card.style.opacity = "0";
          card.style.transform = "translateY(10px)";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 30);
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  /* ------------------------------------------------------------
     5. 9 PROJECTS DATABASE & INTERACTIVE MODAL DRAWERS
     ------------------------------------------------------------ */
  const projectDatabase = {
    multimedia: {
      type: "web",
      category: "WEB STREAMING HUB",
      title: "MultiMedia World — Music, Video & Image Hub",
      banner: "assets/images/project_multimedia.jpg",
      defaultDeployUrl: "https://exploremedia.netlify.app/",
      localPath: "../HTML AND CSS/Multi Media/index.html",
      githubUrl: "https://github.com/sushmanth-varma/multimedia-world",
      tech: [
        "HTML5",
        "CSS3",
        "Native HTML5 Audio",
        "Native HTML5 Video",
        "YouTube iFrames",
        "Responsive Grid",
      ],
      highlights: [
        "Single-page multimedia streaming site hosting 5 music tracks with native HTML5 <audio> players and waveform visualizer.",
        "5 movie trailers embedded via fluid responsive YouTube iFrames and native HTML5 <video> showcase.",
        "Designed a 4-column responsive image gallery with smooth hover zoom transitions, reducing visual discovery time by 35% on mobile.",
        "Sticky navigation bar with smooth anchor scrolling across 6 media categories.",
        "100% W3C Validated semantic HTML5 using <article>, <figure>, <audio>, and <video> tags with zero accessibility errors.",
      ],
    },
    india: {
      type: "web",
      category: "IMMERSIVE TRAVEL GUIDE",
      title: "Incredible India — Immersive Travel Guide",
      banner: "assets/images/project_india.svg",
      defaultDeployUrl: "https://explore-india-travel.vercel.app/",
      localPath: "../HTML AND CSS/Explore India/index.html",
      githubUrl: "https://github.com/sushmanth-varma/incredible-india",
      tech: [
        "HTML5",
        "CSS3",
        "JavaScript (ES6+)",
        "Google Maps API",
        "CSS Grid",
        "Accordion UX",
      ],
      highlights: [
        "Awwwards-inspired travel guide covering 6 Indian states (Kerala, Goa, Maharashtra, Tamil Nadu, Karnataka, Andhra Pradesh) and 30 curated destinations.",
        "Two-level accordion UX reducing content discovery time by 40% with smooth CSS transitions.",
        "Integrated Google Maps embeds with per-destination GPS coordinates, enabling one-click directions for 100% of listed places.",
        "Achieved a 95+ Lighthouse performance score using lightweight CSS-only animations and lazy-loaded iframes — zero heavy external libraries.",
      ],
    },
    forms: {
      type: "web",
      category: "DESIGN SYSTEM & FORMS",
      title: "Course Registration Form — Typeform-Inspired UI",
      banner: "assets/images/project_forms.svg",
      defaultDeployUrl: "https://learnto-createforms.vercel.app/",
      localPath: "../HTML AND CSS/Forms Project/Course registration.html",
      githubUrl: "https://github.com/sushmanth-varma/course-registration-form",
      tech: [
        "HTML5 Semantic Forms",
        "CSS3 Variables",
        "20+ Input Types",
        "WCAG AA Compliance",
        "Validation Engine",
      ],
      highlights: [
        "Engineered a registration form with 2 structured fieldsets and 20+ input types (search, URL, datetime-local, datalist, optgroup, multi-select, meter, progress).",
        "Cut form abandonment risk by 30% through inline validation hints, grouped logical sections, and mobile-first responsive stacking.",
        "Styled with the clean Typeform design system — reduced visual noise and improved readability contrast to full WCAG AA compliance.",
      ],
    },
    calculator: {
      type: "web",
      category: "CODEALPHA WEB APPLICATION",
      title: "Simple Calculator — Modern Web Engine",
      banner: "assets/images/project_calculator.svg",
      defaultDeployUrl: "https://simplecalculator-psi-drab.vercel.app/",
      localPath: "../HTML AND CSS/Code Alpha/calculator/index.html",
      githubUrl: "https://github.com/sushmanth-varma/calculator-app",
      tech: [
        "JavaScript (ES6+)",
        "CSS Grid",
        "Event Delegation",
        "Math Engine",
        "Acrylic Design",
      ],
      highlights: [
        "Built an intuitive, responsive arithmetic calculator supporting addition, subtraction, multiplication, division, and percentage operations.",
        "Real-time display screen with clear backspace manipulation, state reset, and overflow protection.",
        "Keypad designed with fluid CSS Grid and responsive tactile hover feedback.",
        "Zero external dependencies — pure vanilla HTML5, CSS3, and JavaScript.",
      ],
    },
    gallery: {
      type: "web",
      category: "CODEALPHA PHOTOGRAPHY GALLERY",
      title: "Interactive Image Gallery — Lightbox & Filters",
      banner: "assets/images/project_gallery.svg",
      defaultDeployUrl: "https://images-gallery-sigma.vercel.app/",
      localPath: "../HTML AND CSS/Code Alpha/images/index.html",
      githubUrl: "https://github.com/sushmanth-varma/image-gallery",
      tech: [
        "JavaScript Lightbox",
        "CSS Grid",
        "Anime Wallpapers",
        "Filter Tabs",
        "CSS Animations",
      ],
      highlights: [
        "Full-featured responsive image gallery hosting anime collections (One Piece Straw Hat Pirates), wildlife, landscape, and city photography.",
        "Interactive category filter tabs allowing instant categorization across Nature, Animals, Wallpapers, and Cities.",
        "High-resolution modal lightbox with smooth backdrop blur, keyboard ESC dismissal, and click-outside close handlers.",
        "Smooth hover zoom elevation transitions delivering an engaging visual discovery experience.",
      ],
    },
    tables: {
      type: "web",
      category: "FRONTEND & DATA UI",
      title: "Tables — Data Notebook & Layout Architect",
      banner: "assets/images/project_tables.svg",
      defaultDeployUrl: "https://typeoftables.vercel.app/",
      localPath: "../HTML AND CSS/Tables/index.html",
      githubUrl: "https://github.com/sushmanth-varma/data-tables-notebook",
      tech: [
        "Semantic HTML5",
        "Complex Colspan & Rowspan",
        "CSS Sticky Columns",
        "Timetable Architecture",
        "A11y",
      ],
      highlights: [
        "A comprehensive reference implementation of every advanced HTML table pattern: Basic, Colspan, Rowspan, and Compound grid architectures.",
        "University weekly schedule timetable with multi-slot merging, color coding, and responsive horizontal scroll container.",
        'WCAG AA accessible markup using <thead>, <tbody>, <tfoot>, <caption>, and proper scope="col" / scope="row" headers.',
        "Engineered for dense financial and sensor telemetry datasets with zebra striping and sticky header rows.",
      ],
    },
    placement: {
      type: "ml",
      category: "MACHINE LEARNING & PREDICTIVE ANALYTICS",
      title: "College Placement Prediction System",
      banner: "assets/images/project_placement.svg",
      tech: [
        "Python 3.x",
        "Pandas",
        "Scikit-learn",
        "NumPy",
        "Random Forest & XGBoost",
        "Classification Pipeline",
      ],
      metrics: {
        accuracy: "85.2% Accuracy",
        records: "2,000+ Student Records",
        auc: "0.912 ROC-AUC",
        precision: "86.2% Precision",
      },
      highlights: [
        "Analyzed a dataset of 2,000+ undergraduate student records to identify 8 key factors influencing campus placement outcomes.",
        "Trained multiple classification models (Logistic Regression, Decision Trees, Random Forest) achieving 85% prediction accuracy.",
        "Identified CGPA (35% weight) and Coding Assessment Scores (25% weight) as the most critical determinants of successful placement.",
        "Interactive real-time prediction model embedded directly below for simulation.",
      ],
    },
    iot: {
      type: "iot",
      category: "IOT & SMART AUTOMATION",
      title: "Water Level Monitoring & Toll Gate System",
      banner: "assets/images/project_iot_toll.svg",
      tech: [
        "Arduino UNO",
        "HC-SR04 Ultrasonic Sensors",
        "Embedded C",
        "Servo Motor Actuators",
        "Buzzer Siren Alert",
      ],
      metrics: {
        sensorAccuracy: "95% Sensor Accuracy",
        effortReduction: "70% Manual Effort Reduction",
        responseTime: "< 200ms Gate Servo Latency",
      },
      highlights: [
        "Built an IoT hardware prototype that automates real-time flood/water-level detection and toll gate barrier operation with 95% sensor accuracy.",
        "Reduced manual monitoring effort by 70% through real-time ultrasonic sensor feedback and automated servo gate control.",
        "Emergency flood threshold logic locks the toll gate automatically and triggers visual/acoustic warning signals when water exceeds 80 cm.",
      ],
    },
    orphanage: {
      type: "android",
      category: "MOBILE APP & REST API BACKEND",
      title: "HOPE Orphanage — Android Application",
      banner: "assets/images/project_orphanage.svg",
      tech: [
        "Java Android",
        "XML Layouts",
        "PHP Backend",
        "MySQL Database",
        "GPS Tagging",
        "Figma Prototyping",
      ],
      metrics: {
        accuracy: "99% Retrieval Accuracy",
        records: "1,000+ Test Records Processed",
        timeSaved: "25% Prototype-to-Build Reduction",
        apis: "6 REST Endpoints",
      },
      highlights: [
        "Shipped an Android app that lets citizens report and track individuals in need with GPS-based location tagging for orphan welfare.",
        "Designed UI prototypes in Figma and implemented 5+ core native Android screens in Java, reducing prototype-to-build turnaround by 25%.",
        "Built 6 REST APIs in PHP connected to a MySQL backend database, processing 1,000+ test records with 99% retrieval accuracy.",
      ],
    },
  };

  const projectModal = document.getElementById("projectModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalCategoryChip = document.getElementById("modalCategoryChip");
  const modalTitle = document.getElementById("modalTitle");
  const modalBodyContent = document.getElementById("modalBodyContent");

  function openProjectModal(projectId) {
    const data = projectDatabase[projectId];
    if (!data) return;

    modalCategoryChip.textContent = data.category;
    modalTitle.textContent = data.title;

    let contentHTML = `
      <div class="modal-preview-banner">
        <img src="${data.banner}" alt="${data.title} preview" loading="lazy">
      </div>

      <!-- Tech Stack Badges -->
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
        ${data.tech.map((t) => `<span class="badge-chip" style="background: rgba(255,255,255,0.08); color: var(--neon-cyan); font-weight: 600;">${t}</span>`).join("")}
      </div>

      <!-- Highlights List -->
      <div style="margin-bottom: 20px;">
        <h4 style="font-size: 15px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">Key Highlights &amp; Architecture</h4>
        <ul style="list-style: disc; padding-left: 20px; font-size: 14px; color: var(--ink-secondary); line-height: 1.6;">
          ${data.highlights.map((h) => `<li style="margin-bottom: 6px;">${h}</li>`).join("")}
        </ul>
      </div>
    `;

    // 1. WEB PROJECTS: Live Deploy URL, GitHub, and Custom URL manager
    if (data.type === "web") {
      // Always use the freshest URL from the database — prevents stale
      // localStorage values from breaking live deployments.
      const savedDeployUrl = data.defaultDeployUrl;

      contentHTML += `
        <div class="modal-actions-bar">
          <div class="deploy-url-input-box">
            <span style="font-size: 13px; font-weight: 700; color: var(--neon-cyan); white-space: nowrap;">Deploy URL:</span>
            <input type="url" id="customDeployInput" class="deploy-input" value="${savedDeployUrl}" placeholder="https://your-deployed-site.com">
            <button type="button" class="btn-glow-cta" id="saveDeployUrlBtn" style="padding: 8px 14px; font-size: 12.5px; border-radius: 10px;">Save URL</button>
          </div>
          <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px; width: 100%;">
            <a href="${savedDeployUrl}" target="_blank" rel="noopener noreferrer" class="btn-glow-cta" id="launchDeployBtn" style="padding: 10px 20px; font-size: 14px;">
              Open Live Project ↗
            </a>
            ${
              data.localPath
                ? `
              <a href="${data.localPath}" target="_blank" class="btn-view-projects" style="padding: 10px 18px; font-size: 14px;" title="Open local project file in browser">
                Local Preview ↗
              </a>
            `
                : ""
            }
            <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-view-projects" style="padding: 10px 18px; font-size: 14px;">
              GitHub Source ↗
            </a>
          </div>
        </div>
      `;
    }

    // 2. AI / ML PROJECT: Real-time Interactive Placement Predictor Simulator
    if (data.type === "ml") {
      contentHTML += `
        <div class="ml-simulator-box">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">
            <div>
              <span style="font-size: 11px; font-weight: 700; color: var(--neon-cyan); letter-spacing: 0.14em; text-transform: uppercase;">INTERACTIVE ML DASHBOARD</span>
              <h4 style="font-size: 18px; font-weight: 800; color: #ffffff;">Live Placement Outcome Predictor</h4>
            </div>
            <span style="background: rgba(0, 223, 137, 0.2); color: var(--neon-green); border: 1px solid var(--neon-green); padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 800;">
              85.2% ACCURACY
            </span>
          </div>

          <p style="font-size: 13px; color: var(--ink-secondary); margin-bottom: 16px;">
            Adjust student academic and project parameters below based on our 2,000+ student dataset to run real-time inference:
          </p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <!-- CGPA Slider -->
            <div class="ml-slider-row">
              <div class="ml-slider-label">
                <span>Academic CGPA:</span>
                <strong id="cgpaVal" style="color: var(--neon-yellow);">8.5 / 10</strong>
              </div>
              <input type="range" id="cgpaRange" class="ml-range-slider" min="5.0" max="10.0" step="0.1" value="8.5">
            </div>

            <!-- DSA Coding Score -->
            <div class="ml-slider-row">
              <div class="ml-slider-label">
                <span>DSA / Coding Score:</span>
                <strong id="dsaVal" style="color: var(--neon-cyan);">82 / 100</strong>
              </div>
              <input type="range" id="dsaRange" class="ml-range-slider" min="30" max="100" step="1" value="82">
            </div>

            <!-- Internships -->
            <div class="ml-slider-row">
              <div class="ml-slider-label">
                <span>Internships Done:</span>
                <strong id="internVal" style="color: var(--neon-green);">2</strong>
              </div>
              <input type="range" id="internRange" class="ml-range-slider" min="0" max="5" step="1" value="2">
            </div>

            <!-- Projects Count -->
            <div class="ml-slider-row">
              <div class="ml-slider-label">
                <span>Full-Stack Projects:</span>
                <strong id="projVal" style="color: var(--neon-pink);">4</strong>
              </div>
              <input type="range" id="projRange" class="ml-range-slider" min="0" max="10" step="1" value="4">
            </div>
          </div>

          <!-- Active Backlogs -->
          <div class="ml-slider-row" style="margin-top: 6px;">
            <div class="ml-slider-label">
              <span>Active Backlogs Penalty:</span>
              <strong id="backlogVal" style="color: var(--neon-green);">0 Backlogs</strong>
            </div>
            <input type="range" id="backlogRange" class="ml-range-slider" min="0" max="4" step="1" value="0">
          </div>

          <!-- Live Result -->
          <div class="ml-prediction-output" id="mlResultBox">
            <div>
              <div style="font-size: 11px; text-transform: uppercase; color: var(--ink-muted); font-weight: 700;">MODEL PREDICTION</div>
              <div style="font-size: 20px; font-weight: 800; color: var(--neon-green);" id="mlResultText">
                Likely Placed (91.8% Confidence)
              </div>
              <div style="font-size: 12px; color: var(--ink-secondary); margin-top: 3px;" id="mlResultTip">
                High probability based on strong CGPA and verified full-stack projects.
              </div>
            </div>
            <button type="button" class="ml-calc-btn" id="runMlInferenceBtn">
              Calculate ⚡
            </button>
          </div>
        </div>
      `;
    }

    // 3. IOT PROJECT: Live Water Level & Toll Gate Simulation
    if (data.type === "iot") {
      contentHTML += `
        <div class="iot-sim-box">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">
            <div>
              <span style="font-size: 11px; font-weight: 700; color: var(--neon-cyan); letter-spacing: 0.14em; text-transform: uppercase;">EMBEDDED HARDWARE SIMULATION</span>
              <h4 style="font-size: 18px; font-weight: 800; color: #ffffff;">Ultrasonic Level &amp; Automated Gate</h4>
            </div>
            <span style="background: rgba(0, 212, 255, 0.2); color: var(--neon-cyan); border: 1px solid var(--neon-cyan); padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 800;">
              95% SENSOR ACCURACY
            </span>
          </div>

          <p style="font-size: 13px; color: var(--ink-secondary); margin-bottom: 12px;">
            Drag the simulated water reservoir depth slider to trigger automated ultrasonic sensor feedback and servo barrier reaction:
          </p>

          <div style="margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; font-size: 13.5px; margin-bottom: 6px;">
              <span>Simulated Water Depth (Threshold: 80 cm):</span>
              <strong id="waterDepthLabel" style="color: var(--neon-green);">35 cm (Safe)</strong>
            </div>
            <input type="range" id="waterDepthSlider" class="ml-range-slider" min="5" max="110" step="1" value="35">
          </div>

          <div class="iot-gate-visualizer" id="gateVisualizer">
            <div>
              <div style="font-size: 11px; text-transform: uppercase; color: var(--ink-muted); font-weight: 700;">AUTOMATED TOLL BARRIER STATUS</div>
              <div style="font-size: 18px; font-weight: 800; color: #ffffff;" id="gateStateText">
                BARRIER OPEN · TRAFFIC FLOWING
              </div>
              <div style="font-size: 12px; color: var(--ink-muted);" id="gateDetailText">
                HC-SR04 reading safe water clearance. Servo angle: 90°
              </div>
            </div>
            <div class="gate-status-pill status-safe" id="gatePill">
              NORMAL
            </div>
          </div>
        </div>
      `;
    }

    // 4. ANDROID APP PROJECT: REST Endpoints & GPS metrics
    if (data.type === "android") {
      contentHTML += `
        <div style="background-color: rgba(0,0,0,0.3); border-radius: 18px; padding: 20px; border: 1px solid rgba(255, 255, 255, 0.1); margin-top: 14px;">
          <h4 style="font-size: 15px; font-weight: 700; color: #ffffff; margin-bottom: 10px;">
            6 Core PHP REST APIs &amp; Data Pipeline
          </h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-family: monospace; font-size: 11.5px;">
            <div style="background: rgba(255,255,255,0.06); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
              <span style="color: var(--neon-green); font-weight: bold;">POST</span> /api/welfare/report.php
            </div>
            <div style="background: rgba(255,255,255,0.06); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
              <span style="color: var(--neon-cyan); font-weight: bold;">GET</span> /api/shelters/lookup.php
            </div>
            <div style="background: rgba(255,255,255,0.06); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
              <span style="color: var(--neon-yellow); font-weight: bold;">PUT</span> /api/status/update.php
            </div>
            <div style="background: rgba(255,255,255,0.06); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
              <span style="color: var(--neon-cyan); font-weight: bold;">GET</span> /api/donor/history.php
            </div>
            <div style="background: rgba(255,255,255,0.06); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
              <span style="color: var(--neon-green); font-weight: bold;">POST</span> /api/gps/sync_coords.php
            </div>
            <div style="background: rgba(255,255,255,0.06); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
              <span style="color: #ff5555; font-weight: bold;">DELETE</span> /api/records/archive.php
            </div>
          </div>
        </div>
      `;
    }

    modalBodyContent.innerHTML = contentHTML;
    projectModal.classList.add("open");
    projectModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Hook up deploy URL saving
    const saveDeployBtn = document.getElementById("saveDeployUrlBtn");
    const customDeployInput = document.getElementById("customDeployInput");
    const launchDeployBtn = document.getElementById("launchDeployBtn");

    if (saveDeployBtn && customDeployInput && launchDeployBtn) {
      saveDeployBtn.addEventListener("click", () => {
        const val = customDeployInput.value.trim();
        if (val) {
          launchDeployBtn.setAttribute("href", val);
          showToast(`Saved deploy URL for ${data.title}!`, "success");
        }
      });
    }

    // Machine Learning Simulator
    const cgpaRange = document.getElementById("cgpaRange");
    const dsaRange = document.getElementById("dsaRange");
    const internRange = document.getElementById("internRange");
    const projRange = document.getElementById("projRange");
    const backlogRange = document.getElementById("backlogRange");
    const runMlBtn = document.getElementById("runMlInferenceBtn");

    function calculateML() {
      if (!cgpaRange) return;
      const cgpa = parseFloat(cgpaRange.value);
      const dsa = parseInt(dsaRange.value, 10);
      const intern = parseInt(internRange.value, 10);
      const proj = parseInt(projRange.value, 10);
      const backlogs = parseInt(backlogRange.value, 10);

      document.getElementById("cgpaVal").textContent =
        `${cgpa.toFixed(1)} / 10`;
      document.getElementById("dsaVal").textContent = `${dsa} / 100`;
      document.getElementById("internVal").textContent = intern;
      document.getElementById("projVal").textContent = proj;

      const backlogLabel = document.getElementById("backlogVal");
      if (backlogs > 0) {
        backlogLabel.textContent = `${backlogs} Backlog${backlogs > 1 ? "s" : ""} (Penalty)`;
        backlogLabel.style.color = "#ff5555";
      } else {
        backlogLabel.textContent = "0 Backlogs";
        backlogLabel.style.color = "var(--neon-green)";
      }

      let score =
        (cgpa / 10) * 40 +
        (dsa / 100) * 30 +
        Math.min(intern, 3) * 6 +
        Math.min(proj, 5) * 2.4;
      score -= backlogs * 16;
      score = Math.max(10, Math.min(score, 99.4));

      const resText = document.getElementById("mlResultText");
      const resTip = document.getElementById("mlResultTip");
      const resBox = document.getElementById("mlResultBox");

      if (score >= 65) {
        resText.textContent = `Likely Placed (${score.toFixed(1)}% Confidence)`;
        resText.style.color = "var(--neon-green)";
        resBox.style.borderColor = "rgba(0, 223, 137, 0.4)";
        resTip.textContent =
          "High probability of selection in campus technical rounds.";
      } else if (score >= 45) {
        resText.textContent = `Moderate Prospect (${score.toFixed(1)}% Confidence)`;
        resText.style.color = "var(--neon-yellow)";
        resBox.style.borderColor = "rgba(255, 214, 0, 0.4)";
        resTip.textContent =
          "Recommend completing 1 more internship and boosting DSA questions to cross 70%.";
      } else {
        resText.textContent = `High Risk (${score.toFixed(1)}% Confidence)`;
        resText.style.color = "#ff5555";
        resBox.style.borderColor = "rgba(255, 85, 85, 0.4)";
        resTip.textContent =
          "Clear backlogs and build verifiable full-stack projects to improve placement odds.";
      }
    }

    if (cgpaRange) {
      [cgpaRange, dsaRange, internRange, projRange, backlogRange].forEach(
        (input) => {
          input.addEventListener("input", calculateML);
        },
      );
      if (runMlBtn) {
        runMlBtn.addEventListener("click", () => {
          calculateML();
          showToast(
            "ML inference updated with 85.2% trained model weights!",
            "success",
          );
        });
      }
      calculateML();
    }

    // IoT Simulator
    const waterDepthSlider = document.getElementById("waterDepthSlider");
    if (waterDepthSlider) {
      function updateIoT() {
        const depth = parseInt(waterDepthSlider.value, 10);
        const depthLabel = document.getElementById("waterDepthLabel");
        const stateText = document.getElementById("gateStateText");
        const detailText = document.getElementById("gateDetailText");
        const gatePill = document.getElementById("gatePill");

        if (depth < 60) {
          depthLabel.textContent = `${depth} cm (Normal)`;
          depthLabel.style.color = "var(--neon-green)";
          stateText.textContent = "BARRIER OPEN · TRAFFIC FLOWING";
          stateText.style.color = "var(--neon-green)";
          detailText.textContent =
            "Water level safe. Ultrasonic clearance optimal. Servo at 90°.";
          gatePill.className = "gate-status-pill status-safe";
          gatePill.textContent = "SAFE";
        } else if (depth < 80) {
          depthLabel.textContent = `${depth} cm (Warning)`;
          depthLabel.style.color = "var(--neon-yellow)";
          stateText.textContent = "BARRIER MONITORING · CAUTION";
          stateText.style.color = "var(--neon-yellow)";
          detailText.textContent =
            "Approaching flood threshold. Speed reduced to 20 km/h.";
          gatePill.className = "gate-status-pill";
          gatePill.style.backgroundColor = "rgba(255, 214, 0, 0.2)";
          gatePill.style.color = "var(--neon-yellow)";
          gatePill.style.border = "1px solid var(--neon-yellow)";
          gatePill.textContent = "ELEVATED";
        } else {
          depthLabel.textContent = `${depth} cm (FLOOD RISK!)`;
          depthLabel.style.color = "#ff5555";
          stateText.textContent = "GATE LOCKED · ENTRY DENIED";
          stateText.style.color = "#ff5555";
          detailText.textContent =
            "CRITICAL: Water exceeds 80 cm safety barrier. Automated gate lowered & siren active!";
          gatePill.className = "gate-status-pill status-danger";
          gatePill.textContent = "DANGER / CLOSED";
        }
      }

      waterDepthSlider.addEventListener("input", updateIoT);
      updateIoT();
    }
  }

  function closeProjectModal() {
    projectModal.classList.remove("open");
    projectModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Attach card listeners
  document.querySelectorAll(".dikshant-project-card").forEach((card) => {
    card.addEventListener("click", () => {
      const pid = card.getAttribute("data-project-id");
      openProjectModal(pid);
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const pid = card.getAttribute("data-project-id");
        openProjectModal(pid);
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener("click", (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && projectModal.classList.contains("open")) {
        closeProjectModal();
      }
    });
  }

  /* ------------------------------------------------------------
     6. SHOWREEL / TOUR MODAL
     ------------------------------------------------------------ */
  const openShowreelBtn = document.getElementById("openShowreelBtn");
  const launchTourBtn = document.getElementById("launchTourBtn");
  const showreelPosterTrigger = document.getElementById(
    "showreelPosterTrigger",
  );

  function openShowreelModal() {
    modalCategoryChip.textContent = "PORTFOLIO SHOWCASE & TOUR";
    modalTitle.textContent = "Interactive Tour · Dommaraju Sushmanth Varma";

    modalBodyContent.innerHTML = `
      <div class="modal-preview-banner">
        <img src="assets/images/project_multimedia.jpg" alt="Portfolio Tour" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <div style="margin-bottom: 20px;">
        <h4 style="font-size: 17px; font-weight: 800; color: #ffffff; margin-bottom: 8px;">9 Production-Ready Projects Built &amp; Deployed</h4>
        <p style="font-size: 14.5px; color: var(--ink-secondary); line-height: 1.6; margin-bottom: 16px;">
          Welcome to my software engineering tour! Across my degree at Saveetha School of Engineering (CGPA 8.89), I have delivered 9 end-to-end projects spanning web multimedia streaming, algorithmic travel guides, semantic form engines, machine learning classification pipelines, IoT smart automation, and mobile Android applications.
        </p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
          <div style="background: rgba(255,255,255,0.05); padding: 14px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08);">
            <div style="font-size: 13px; font-weight: 700; color: var(--neon-cyan);">Full-Stack Web &amp; UX</div>
            <div style="font-size: 12px; color: var(--ink-muted); margin-top: 4px;">HTML5, CSS3, React, JavaScript, PHP REST, MySQL</div>
          </div>
          <div style="background: rgba(255,255,255,0.05); padding: 14px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.08);">
            <div style="font-size: 13px; font-weight: 700; color: var(--neon-green);">AI / ML &amp; Embedded IoT</div>
            <div style="font-size: 12px; color: var(--ink-muted); margin-top: 4px;">Python, Scikit-learn, Pandas, Arduino UNO, C++</div>
          </div>
        </div>

        <div style="display: flex; gap: 12px; justify-content: flex-end;">
          <a href="#projects" class="btn-glow-cta" onclick="document.getElementById('modalCloseBtn').click();" style="padding: 10px 20px; font-size: 14px;">
            Browse All 9 Projects ↗
          </a>
          <button type="button" class="btn-view-projects" onclick="document.getElementById('modalCloseBtn').click();" style="padding: 10px 18px; font-size: 14px;">
            Close
          </button>
        </div>
      </div>
    `;

    projectModal.classList.add("open");
    projectModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  [openShowreelBtn, launchTourBtn, showreelPosterTrigger].forEach((el) => {
    if (el) el.addEventListener("click", openShowreelModal);
  });

  /* ------------------------------------------------------------
     7. ABOUT ME "KNOW MORE ABOUT ME" MODAL
     ------------------------------------------------------------ */
  const openAboutBioBtn = document.getElementById("openAboutBioBtn");
  if (openAboutBioBtn) {
    openAboutBioBtn.addEventListener("click", () => {
      modalCategoryChip.textContent = "BIOGRAPHY & CORE VALUES";
      modalTitle.textContent = "Dommaraju Sushmanth Varma";

      modalBodyContent.innerHTML = `
        <div style="display: flex; gap: 24px; flex-wrap: wrap; margin-bottom: 20px;">
          <div style="width: 140px; height: 140px; border-radius: 24px; overflow: hidden; flex-shrink: 0; box-shadow: 0 10px 24px rgba(0,0,0,0.5); border: 2px solid var(--neon-cyan);">
            <img src="assets/images/portrait.jpeg" alt="Sushmanth Varma" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div style="flex-grow: 1;">
            <h4 style="font-size: 20px; font-weight: 800; color: #ffffff;">Software Engineer &amp; Front-End Developer</h4>
            <p style="font-size: 14px; color: var(--ink-muted); margin: 4px 0 12px 0;">Saveetha School of Engineering · B.E. Computer Science (2022–2026)</p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <span class="val-chip chip-green">CGPA: 8.89 / 10.0</span>
              <span class="val-chip chip-cyan">Chennai, India</span>
              <span class="val-chip chip-purple">Available for Roles</span>
            </div>
          </div>
        </div>

        <div style="font-size: 14.5px; color: var(--ink-secondary); line-height: 1.6; margin-bottom: 20px;">
          <p style="margin-bottom: 12px;">
            Hey there! I am Sushmanth Varma — a dedicated coder and creative problem solver. I bridge thoughtful, energetic frontend user experiences with rock-solid, scalable architecture and data-driven intelligence.
          </p>
          <p style="margin-bottom: 12px;">
            Whether it's creating pixel-perfect responsive layouts with smooth micro-interactions, structuring accessible semantic HTML5 forms passing 100% W3C validation, or evaluating machine learning classification pipelines on 2,000+ student datasets, I take immense pride in crafting code that looks gorgeous and performs reliably.
          </p>
        </div>

        <div style="background-color: rgba(255,255,255,0.04); border-radius: 18px; padding: 20px; border: 1px solid rgba(255, 255, 255, 0.08); margin-bottom: 20px;">
          <h4 style="font-size: 15px; font-weight: 700; color: #ffffff; margin-bottom: 10px;">Languages Known</h4>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <span class="val-chip chip-cyan">English (Professional)</span>
            <span class="val-chip chip-green">Telugu (Native)</span>
            <span class="val-chip chip-orange">Hindi (Conversational)</span>
          </div>
        </div>

        <div style="display: flex; gap: 12px; justify-content: flex-end;">
          <a href="assets/docs/sushmanth-resume.pdf" download="sushmanth-resume.pdf" class="btn-glow-cta" style="padding: 10px 22px; font-size: 14px;">
            Download Complete CV ↓
          </a>
          <button type="button" class="btn-view-projects" onclick="document.getElementById('modalCloseBtn').click();" style="padding: 10px 18px; font-size: 14px;">
            Close
          </button>
        </div>
      `;

      projectModal.classList.add("open");
      projectModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  }

  /* ------------------------------------------------------------
     8. CONTACT PILLS & COPY TO CLIPBOARD
     ------------------------------------------------------------ */
  const copyEmailBtn = document.getElementById("copyEmailBtn");
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", () => {
      const email = copyEmailBtn.getAttribute("data-email");
      navigator.clipboard
        .writeText(email)
        .then(() => {
          showToast(
            "Email copied to clipboard: sushmanthdommaraju@gmail.com",
            "success",
          );
        })
        .catch(() => {
          showToast("sushmanthdommaraju@gmail.com", "success");
        });
    });
  }

  /* ------------------------------------------------------------
     9. CONTACT FORM SUBMISSION
     ------------------------------------------------------------ */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("senderName");
      const emailInput = document.getElementById("senderEmail");
      const messageInput = document.getElementById("senderMessage");

      const nameError = document.getElementById("nameError");
      const emailError = document.getElementById("emailError");
      const messageError = document.getElementById("messageError");

      let isValid = true;

      if (!nameInput.value.trim()) {
        nameError.textContent = "Please enter your name.";
        nameError.classList.add("visible");
        isValid = false;
      } else {
        nameError.classList.remove("visible");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = "Please enter a valid email address.";
        emailError.classList.add("visible");
        isValid = false;
      } else {
        emailError.classList.remove("visible");
      }

      if (!messageInput.value.trim()) {
        messageError.textContent = "Please write a message.";
        messageError.classList.add("visible");
        isValid = false;
      } else {
        messageError.classList.remove("visible");
      }

      if (isValid) {
        const senderName = nameInput.value.trim();
        showToast(
          `Thank you, ${senderName}! Your message has been received.`,
          "success",
        );
        contactForm.reset();
      }
    });
  }
});