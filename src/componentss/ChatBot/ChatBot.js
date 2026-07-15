// ChatBot.js
// A chatbot widget that appears on all pages.
// Detects language (Arabic/English) and replies accordingly.
// Unknown messages are sent to Telegram so Madien can reply personally.

import React, { useState, useEffect, useRef } from 'react'
import ChatIcon from '@mui/icons-material/Chat'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import styles from './chat.module.css'

// ===== Telegram Config =====
const BOT_TOKEN = '8283138361:AAEt5Mjj1gNEq4gRNVYqH9jzL_uza1uOyAw'
const CHAT_ID   = '2054461400'

// ===== Send message to Telegram =====
const sendToTelegram = async (text) => {
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}`
    await fetch(url)
  } catch (err) {
    console.error('Telegram error:', err)
  }
}

// ===== Detect language =====
const isArabic = (text) => /[\u0600-\u06FF]/.test(text)

// ===== Bot replies =====
const getReply = (input) => {
  const text   = input.toLowerCase().trim()
  const arabic = isArabic(input)

  // Greeting
  if (text.includes('hello') || text.includes('hi') || text.includes('hey') ||
      text.includes('اهلا') || text.includes('مرحبا') || text.includes('السلام')) {
    return arabic
      ? ['أهلاً وسهلاً! 👋 أنا مساعد مدين — كيف أقدر أساعدك؟',
         '⏳ سيتم الرد عليك قريباً من مدين.']
      : ['Hello! 👋 I\'m Madien\'s assistant — how can I help you?',
         '⏳ Madien will reply to you soon.']
  }

  // Projects
  if (text.includes('project') || text.includes('مشروع') ||
      text.includes('مشاريع') || text.includes('شغل')) {
    return arabic
      ? ['عندنا مشروع موقع مستشفى متكامل 🏥 — معمول باحترافية عالية بكل التفاصيل.',
         '⏳ سيتم الرد عليك قريباً من مدين.']
      : ['We have an amazing Hospital Website project 🏥 — built professionally with full details.',
         '⏳ Madien will reply to you soon.']
  }

  // More projects
  if (text.includes('more') || text.includes('other') || text.includes('تاني') ||
      text.includes('غير') || text.includes('اكثر')) {
    return arabic
      ? ['برده عندنا متجر إلكتروني متكامل 🛒 — فيه كل حاجة من المنتجات للدفع.',
         '⏳ سيتم الرد عليك قريباً من مدين.']
      : ['We also have a full E-commerce Store 🛒 — everything from products to checkout.',
         '⏳ Madien will reply to you soon.']
  }

  // Price
  if (text.includes('price') || text.includes('cost') || text.includes('how much') ||
      text.includes('سعر') || text.includes('بكام') || text.includes('تكلف')) {
    return arabic
      ? ['السعر بيختلف من مشروع للتاني 💰 — بيتحدد على حسب حجم المشروع وعدد الصفحات.',
         '⏳ سيتم الرد عليك قريباً من مدين.']
      : ['Pricing depends on the project 💰 — based on size, pages, and complexity.',
         '⏳ Madien will reply to you soon.']
  }

  // Who is Madien
  if (text.includes('madien') || text.includes('who') || text.includes('مدين') ||
      text.includes('مين') || text.includes('انت')) {
    return arabic
      ? ['مدين مطور Frontend محترف 👨‍💻 — بيبني مواقع سريعة واحترافية بأنيميشن متحرك.',
         '⏳ سيتم الرد عليك قريباً من مدين.']
      : ['Madien is a professional Frontend Developer 👨‍💻 — building fast, animated web interfaces.',
         '⏳ Madien will reply to you soon.']
  }

  // Contact
  if (text.includes('contact') || text.includes('reach') || text.includes('whatsapp') ||
      text.includes('تواصل') || text.includes('واتس')) {
    return arabic
      ? ['تقدر تتواصل مع مدين على واتساب أو LinkedIn أو Facebook أو Instagram 📱',
         '⏳ سيتم الرد عليك قريباً من مدين.']
      : ['You can reach Madien on WhatsApp, LinkedIn, Facebook, or Instagram 📱',
         '⏳ Madien will reply to you soon.']
  }

  // Unknown — send to Telegram
  sendToTelegram(`📩 New message from portfolio visitor:\n\n"${input}"`)
  return arabic
    ? ['⏳ سيتم الرد عليك قريباً من مدين.']
    : ['⏳ Madien will reply to you soon.']
}

function ChatBot() {
  const [isOpen, setIsOpen]     = useState(false)
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: 'Hello! 👋 / أهلاً! 👋\nI\'m Madien\'s assistant. How can I help you? Please enter your number. \nأنا مساعد مدين — كيف أقدر أساعدك؟',
    },
  ])
  const [input, setInput]   = useState('')
  const [typing, setTyping] = useState(false)
  const messagesEndRef       = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const handleSend = async () => {
    const text = input.trim()
    if (!text) return

    setMessages(prev => [...prev, { from: 'user', text }])
    setInput('')
    setTyping(true)

    const replies = getReply(text)

    for (let i = 0; i < replies.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800))
      setMessages(prev => [...prev, { from: 'bot', text: replies[i] }])
    }

    setTyping(false)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <div className={styles.wrapper}>

      {isOpen && (
        <div className={styles.chatWindow}>

          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <div className={styles.avatar}>M</div>
              <div>
                <p className={styles.headerName}>Madien's Assistant</p>
                <p className={styles.headerStatus}>● Online</p>
              </div>
            </div>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
              <CloseIcon fontSize="small" />
            </button>
          </div>

          {/* Messages */}
          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.from === 'bot' ? styles.botMsg : styles.userMsg}
              >
                {msg.text}
              </div>
            ))}

            {typing && (
              <div className={styles.botMsg}>
                <span className={styles.typingDot} />
                <span className={styles.typingDot} />
                <span className={styles.typingDot} />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={styles.inputRow}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type a message... / اكتب رسالة..."
              className={styles.input}
            />
            <button className={styles.sendBtn} onClick={handleSend}>
              <SendIcon fontSize="small" />
            </button>
          </div>

        </div>
      )}

      
      <button
        className={styles.toggleBtn}
        onClick={() => setIsOpen(v => !v)}
        aria-label="Open chat"
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </button>

    </div>
  )
}
export default ChatBot