import { useState, type FormEvent } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('contact_messages').insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      subject: form.subject,
      message: form.message,
    });
    setLoading(false);
    if (!error) {
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    }
  };

  return (
    <section id="contact" className="relative bg-zinc-950 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="w-16 h-[2px] bg-amber-400 mb-6" />
          <span className="text-amber-400 text-sm font-semibold tracking-[0.3em] uppercase">
            Contact
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-white leading-tight">
            Let's Build <span className="text-amber-400">Together</span>
          </h2>
          <p className="mt-6 text-zinc-400 text-lg leading-relaxed">
            Have a project in mind? We'd love to hear about it. Reach out and
            let's start a conversation about bringing your vision to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-amber-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Visit Us</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Second Floor, Altf- A100, 
Sector 58 
                  <br />
                  Noida, Uttar Pradesh 201301.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-amber-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Call Us</h4>
                <p className="text-zinc-400 text-sm">+91 9811795416 </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-amber-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Email Us</h4>
                <p className="text-zinc-400 text-sm"> tkarchitects.in@gmail.com</p>
              </div>
            </div>

            <div className="pt-8 border-t border-zinc-800">
              <h4 className="text-white font-semibold mb-3">Office Hours</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Monday — Friday: 9:30 AM — 6:00 PM
                <br />
                Saturday: By Appointment
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <CheckCircle
                    size={48}
                    className="text-amber-400 mx-auto mb-4"
                  />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Message Sent
                  </h3>
                  <p className="text-zinc-400">
                    Thank you for reaching out. We'll get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-amber-400 text-sm font-semibold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2 font-medium">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2 font-medium">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                      className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      placeholder="Project Inquiry"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-2 font-medium">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-4 bg-amber-400 text-zinc-950 font-semibold text-sm tracking-wider uppercase hover:bg-amber-300 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-amber-400/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
