import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, User, MessageSquare, Loader } from 'lucide-react'
import emailjs from '@emailjs/browser'

const PersonalInfo = {
  name: 'GHOST Cyber Command',
  email: 'mashfaq0710@gmail.com',
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const hasSubmitted = useRef(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isSubmitting || hasSubmitted.current) {
      return
    }

    if (!formData.name || !formData.email || !formData.message) {
      // Using alert for now since toast is not installed
      alert('Please fill in all fields')
      return
    }

    setIsSubmitting(true)
    hasSubmitted.current = true

    const serviceID = 'service_5jwgdh4'
    const ownerTemplateID = 'template_6nz2zmg'
    const thankYouTemplateID = 'template_ucjxsgn'
    const publicKey = 'YcbcdbTNalqmZsylf'

    // Params for owner notification email
    const ownerTemplateParams = {
      from_name: formData.name,
      from_email: formData.email,
      to_name: PersonalInfo.name,
      to_email: 'mashfaq0710@gmail.com', // Add this explicitly
      message: formData.message,
      reply_to: formData.email,
    }

    // Params for thank you email to user
    const thankYouTemplateParams = {
      from_name: PersonalInfo.name,
      from_email: 'mashfaq0710@gmail.com',
      to_name: formData.name,
      to_email: formData.email, // User's email
      message: formData.message,
      reply_to: 'mashfaq0710@gmail.com',
    }

    // Send email to owner
    const ownerEmailPromise = emailjs.send(
      serviceID,
      ownerTemplateID,
      ownerTemplateParams,
      publicKey
    )

    // Send thank you email to user
    const thankYouEmailPromise = emailjs.send(
      serviceID,
      thankYouTemplateID,
      thankYouTemplateParams,
      publicKey
    )

    Promise.all([ownerEmailPromise, thankYouEmailPromise])
      .then(() => {
        alert('Message sent successfully! Check your email for confirmation.')
        setFormData({ name: '', email: '', message: '' })
        setIsSubmitting(false)
        hasSubmitted.current = false
      })
      .catch((error) => {
        console.error('EmailJS Error:', error)
        alert('Failed to send message. Please try again or contact us directly.')
        setIsSubmitting(false)
        hasSubmitted.current = false
      })
  }

  return (
    <div className="h-full p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold neon-blue mb-2">Contact GHOST</h1>
        <p className="text-gray-400">Get in touch with our team for inquiries and support</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-6"
          >
            <h2 className="text-xl font-bold mb-4 text-ghost-neon-blue flex items-center gap-2">
              <Mail className="w-6 h-6" />
              Send Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-ghost-dark border border-white/10 rounded-lg text-sm focus:outline-none focus:border-ghost-neon-blue/50"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 bg-ghost-dark border border-white/10 rounded-lg text-sm focus:outline-none focus:border-ghost-neon-blue/50"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your message..."
                  rows={6}
                  className="w-full px-4 py-3 bg-ghost-dark border border-white/10 rounded-lg text-sm focus:outline-none focus:border-ghost-neon-blue/50 resize-none"
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-ghost-neon-blue/20 border border-ghost-neon-blue/50 rounded-lg hover:bg-ghost-neon-blue/30 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span className="font-bold">Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span className="font-bold">Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-4"
          >
            <h3 className="text-lg font-bold mb-4 text-ghost-neon-blue">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-ghost-neon-blue" />
                <div>
                  <div className="text-xs text-gray-400">Email</div>
                  <div className="text-sm font-bold">{PersonalInfo.email}</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-ghost-blue/50 glass rounded-lg border border-ghost-neon-blue/20 p-4"
          >
            <h3 className="text-lg font-bold mb-4 text-ghost-neon-blue">Response Time</h3>
            <div className="space-y-2">
              <div className="text-sm text-gray-400">
                We typically respond within 24-48 hours during business days.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}


