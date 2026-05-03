'use client'

import Script from 'next/script'
import { useEffect } from 'react'

export default function Home() {
  return (
    <>
      <nav className="navbar glass">
        <div className="nav-content">
          <div className="logo">
            <i className="fas fa-vote-yea"></i>
            <span>VoteWise</span>
          </div>
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search candidates, elections, or issues..." />
          </div>
          <div className="user-actions">
            <button className="btn-login">Log In</button>
            <button className="btn-signup">Sign Up</button>
          </div>
        </div>
      </nav>

      <div className="app-container">
        <aside className="sidebar">
          <nav className="side-nav">
            <div className="nav-group">
              <span className="group-title">GENERAL</span>
              <a href="#home" className="nav-link active"><i className="fas fa-home"></i> Home</a>
              <a href="#elections" className="nav-link"><i className="fas fa-calendar-alt"></i> Elections</a>
              <a href="#candidates" className="nav-link"><i className="fas fa-users"></i> Candidates</a>
            </div>
            <div className="nav-group">
              <span className="group-title">EDUCATION</span>
              <a href="#issues" className="nav-link"><i className="fas fa-book-open"></i> Issue Explorer</a>
              <a href="#learning" className="nav-link"><i className="fas fa-graduation-cap"></i> Learning Hub</a>
              <a href="#match" className="nav-link"><i className="fas fa-adjust"></i> Candidate Match</a>
            </div>
            <div className="nav-group">
              <span className="group-title">ACCOUNT</span>
              <a href="#dashboard" className="nav-link"><i className="fas fa-user-circle"></i> Dashboard</a>
              <a href="#settings" className="nav-link"><i className="fas fa-cog"></i> Settings</a>
            </div>
          </nav>
        </aside>

        <main id="main-content" className="content-area">
          <div className="loading-state">
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-card"></div>
          </div>
        </main>

        <aside className="right-sidebar">
          <div className="facts-card">
            <h3>Quick Facts</h3>
            <div id="quick-facts-content">
              <p>Select an item to see key details.</p>
            </div>
          </div>
          <div className="ai-assistant-preview">
            <div className="ai-header">
              <i className="fas fa-robot"></i>
              <span>AI Assistant</span>
            </div>
            <p>Have questions about the election? Ask me anything!</p>
            <button id="open-ai-chat" className="btn-ai">Start Chat</button>
          </div>
        </aside>
      </div>

      <div id="ai-chat-bubble" className="ai-bubble">
        <i className="fas fa-comment-dots"></i>
      </div>

      <Script src="/js/utils/api.js" strategy="beforeInteractive" />
      <Script src="/js/components/candidateCard.js" strategy="beforeInteractive" />
      <Script src="/js/components/quiz.js" strategy="beforeInteractive" />
      <Script src="/js/components/timeline.js" strategy="beforeInteractive" />
      <Script src="/js/router.js" strategy="beforeInteractive" />
      <Script src="/js/app.js" strategy="lazyOnload" />
    </>
  )
}
