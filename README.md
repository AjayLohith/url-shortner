<div align="left" style="position: relative;">
  <!-- <img src="https://img.icons8.com/external-tal-revivo-regular-tal-revivo/96/external-readme-is-a-easy-to-build-a-developer-hub-that-adapts-to-the-user-logo-regular-tal-revivo.png"
       align="right" width="30%" style="margin: -20px 0 0 20px;"> -->

  <h1>URL-SHORTNER</h1>

  <p align="left">
   
 An open-source, scalable URL shortening service with rate limiting,
        and a modern frontend experience.
    
  </p>

  <p align="left">
    <!-- <img src="https://img.shields.io/github/license/AjayLohith/url-shortner?style=flat&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license"> -->
    <img src="https://img.shields.io/github/last-commit/AjayLohith/url-shortner?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
    <img src="https://img.shields.io/github/languages/top/AjayLohith/url-shortner?style=flat&color=0080ff" alt="repo-top-language">
    <img src="https://img.shields.io/github/languages/count/AjayLohith/url-shortner?style=flat&color=0080ff" alt="repo-language-count">
  </p>

  <p align="left">Built with the tools and technologies:</p>

  <p align="left">
    <img src="https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white" alt="npm">
    <img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&logo=HTML5&logoColor=white" alt="HTML5">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
    <img src="https://img.shields.io/badge/Docker-2496ED.svg?style=flat&logo=Docker&logoColor=white" alt="Docker">
    <img src="https://img.shields.io/badge/java-%23ED8B00.svg?style=flat&logo=openjdk&logoColor=white" alt="java">
    <img src="https://img.shields.io/badge/Supabase-3ECF8E.svg?style=flat&logo=supabase&logoColor=white" alt="Supabase">
    <img src="https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=flat&logo=postgresql&logoColor=white" alt="PostgreSQL">
    <img src="https://img.shields.io/badge/Vercel-000000.svg?style=flat&logo=vercel&logoColor=white" alt="Vercel">
    <img src="https://img.shields.io/badge/Render-46E3B7.svg?style=flat&logo=render&logoColor=black" alt="Render">
    <img src="https://img.shields.io/badge/CSS3-1572B6.svg?style=flat&logo=css3&logoColor=white" alt="CSS3">
    <img src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=vite&logoColor=white" alt="Vite">
    <img src="https://img.shields.io/badge/Redis-DC382D.svg?style=flat&logo=redis&logoColor=white" alt="Redis">

  </p>
</div>

<br clear="right">

<hr>

<h2>📍 Overview</h2>
  
  SnapLink is an open-source URL shortening service designed to simplify link sharing and management.
   It features a scalable Spring Boot backend with Redis caching and a modern React frontend,
  enabling users to generate, customize, and track short URLs efficiently.
 


<hr>

<h2>👾 Features</h2>

<ul>
  <li>🔗 <strong>URL Shortening & Validation</strong> – Generate concise short URLs with optional custom slugs and strict validation.</li>
  <li>⚡ <strong>High-Performance Backend</strong> – Built with Spring Boot, Redis caching, and persistent storage for fast redirection.</li>
  <li>🔌 <strong>REST API Integration</strong> – Clean REST APIs for seamless integration with external services.</li>
  <li>🎨 <strong>Modern Frontend</strong> – React + Tailwind CSS powered UI for an intuitive user experience.</li>
  <!-- <li>📊 <strong>Analytics & Insights</strong> – Track URL clicks and engagement metrics.</li> -->
  <li>🛡️ <strong>Rate Limiting</strong> – Protect APIs using Redis-backed rate limiting.</li>
  <li>🐳 <strong>Docker Ready</strong> – Easy containerized deployment.</li>
</ul>

<hr>

<h2>📁 Project Structure</h2>

<pre><code>
└── url-shortner/
    ├── backend        # Spring Boot backend service
    ├── frontend       # React frontend application
    └── README.md
</code></pre>

<hr>

<h2>🚀 Getting Started</h2>

<h3>☑️ Prerequisites</h3>

<ul>
  <li><strong>Java:</strong> 17+</li>
  <li><strong>Node.js & npm</strong></li>
  <li><strong>Docker</strong> (optional, recommended)</li>
</ul>

<h3>⚙️ Installation</h3>

<h4>Build from source</h4>

<pre><code>
git clone https://github.com/AjayLohith/url-shortner
cd url-shortner
</code></pre>

<h4>Backend Setup</h4>

<pre><code>
cd backend
./mvnw spring-boot:run
</code></pre>

<h4>Frontend Setup</h4>

<pre><code>
cd frontend
npm install
npm run dev
</code></pre>

<h4>Using Docker</h4>

<pre><code>
docker build -t url-shortner .
docker run -p 8080:8080 url-shortner
</code></pre>

<hr>

<h3>🤖 Usage</h3>

<ul>
  <li>Access the frontend at <code>http://localhost:5173</code></li>
  <li>Backend API runs at <code>http://localhost:8080</code></li>
  <li>Create short URLs and track analytics via the dashboard or REST APIs</li>
</ul>

<hr>

<h3>🧪 Testing</h3>

<pre><code>
cd backend
./mvnw test
</code></pre>

<hr>

<h2>📌 Project Roadmap</h2>

<ul>
  <li>✅ Core URL shortening</li>
  <li>✅ Redis-based caching & rate limiting</li>
  <li>⬜ Authentication & user accounts</li>
  <li>⬜ Advanced analytics dashboard</li>
  <li>⬜ Custom domain support</li>
</ul>

<hr>

<h2>🔰 Contributing</h2>

<p>
  Contributions are welcome! Feel free to fork the repository, create a feature branch,
  and submit a pull request.
</p>




