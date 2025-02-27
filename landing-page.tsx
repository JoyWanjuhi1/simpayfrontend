"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Shield, Zap, Users, Mail, Phone, MapPin, CreditCard, Menu, X, ArrowUp } from "lucide-react"

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

export default function LandingPage() {
  const [showLoginDropdown, setShowLoginDropdown] = useState(false)
  const [showLearnMorePopup, setShowLearnMorePopup] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)

      const sections = ["home", "about", "features", "signup", "contact", "faq"]
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showLoginDropdown && !event.target.closest(".relative")) {
        setShowLoginDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showLoginDropdown])

  return (
    <div className="min-h-screen">
      {/* Enhanced Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 fixed w-full z-50 transition-all duration-300">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => scrollToSection("home")}>
            SimPay
          </div>
          <div className="hidden md:flex space-x-6 items-center">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "features", label: "Features" },
              { id: "signup", label: "Sign Up" },
              { id: "contact", label: "Contact" },
              { id: "faq", label: "FAQ" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`text-gray-700 hover:text-blue-600 transition-colors relative py-2
                  ${activeSection === id ? "text-blue-600 font-semibold" : ""}
                `}
              >
                {label}
                {activeSection === id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transition-all duration-300" />
                )}
              </button>
            ))}
            <div className="relative">
              <Button
                variant="ghost"
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setShowLoginDropdown((prev) => !prev)}
              >
                Login
              </Button>
              {showLoginDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 z-50">
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                      <Input
                        type="email"
                        placeholder="Email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        className="mb-2"
                      />
                    </div>
                    <div>
                      <Input
                        type="password"
                        placeholder="Password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        className="mb-2"
                      />
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Login</Button>
                    <div className="text-center text-sm text-gray-600">
                      Don't have an account?{" "}
                      <button
                        onClick={() => {
                          scrollToSection("signup")
                          setShowLoginDropdown(false)
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        Sign up
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-lg mt-2 p-4 space-y-2">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "features", label: "Features" },
              { id: "signup", label: "Sign Up" },
              { id: "contact", label: "Contact" },
              { id: "faq", label: "FAQ" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => {
                  scrollToSection(id)
                  setIsMobileMenuOpen(false)
                }}
                className={`block w-full text-left px-4 py-2 rounded-md transition-colors
                  ${activeSection === id ? "text-blue-600 bg-blue-50 font-semibold" : "text-gray-700 hover:text-blue-600"}
                `}
              >
                {label}
              </button>
            ))}
            <Button
              variant="ghost"
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => {
                setShowLoginDropdown((prev) => !prev)
                setIsMobileMenuOpen(false)
              }}
            >
              Login
            </Button>
          </div>
        )}
      </nav>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => scrollToSection("home")}
          className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      {/* Hero Section */}
      <section id="home" className="relative h-[700px] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-95" />
          <Image src="/image2.jpeg" alt="Hero background" fill className="object-cover" priority sizes="100vw" />
        </div>
        <div className="container mx-auto relative z-10 px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up">Welcome to SimPay</h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-up animation-delay-100">
                Making payments seamless, secure, and accessible to everyone
              </p>
              <div className="flex gap-4 animate-fade-up animation-delay-200">
                <Button
                  size="lg"
                  variant="default"
                  className="bg-white text-blue-600 hover:bg-white/90"
                  onClick={() => scrollToSection("signup")}
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white/10"
                  onClick={() => setShowLearnMorePopup(true)}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learn More Popup */}
      {showLearnMorePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">About SimPay</h2>
            <p className="text-gray-700 mb-4">
              SimPay offers a secure and user-friendly platform for all your payment needs. Whether you're paying for
              goods or services, we make it fast, simple, and secure.
            </p>
            <p className="text-gray-700 mb-4">
              Our platform supports multiple payment options, allowing you to transact with ease and confidence.
            </p>
            
            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setShowLearnMorePopup(false)}>
              Close
            </Button>
          </div>
        </div>
      )}

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">About Us</h2>
          <p className="text-lg text-gray-700 mb-8">
            SimPay is dedicated to making payments seamless, secure, and accessible to everyone. Whether you're an
            individual looking to make quick, hassle-free payments or a business seeking a reliable payment solution,
            we've got you covered. Our mission is to simplify financial transactions, empowering you to focus on what
            matters most.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <CardHeader className="flex justify-center">
                <Shield className="w-12 h-12 text-blue-600" />
              </CardHeader>
              <CardContent>
                <CardTitle>Secure Transactions</CardTitle>
                <p>
                  Your security is our top priority. We employ bank-level encryption and fraud prevention measures to
                  safeguard every payment you make.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardHeader className="flex justify-center">
                <CreditCard className="w-12 h-12 text-blue-600" />
              </CardHeader>
              <CardContent>
                <CardTitle>Multiple Payment Options</CardTitle>
                <p>
                  From credit cards to mobile wallets, we support a wide range of payment methods, giving you the
                  flexibility to choose how you pay.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardHeader className="flex justify-center">
                <Zap className="w-12 h-12 text-blue-600" />
              </CardHeader>
              <CardContent>
                <CardTitle>Fast and Reliable</CardTitle>
                <p>
                  Experience lightning-fast payment processing with minimal downtime, ensuring your transactions are
                  always completed on time.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardHeader className="flex justify-center">
                <Users className="w-12 h-12 text-blue-600" />
              </CardHeader>
              <CardContent>
                <CardTitle>Customer-Centric Service</CardTitle>
                <p>
                  Our support team is always ready to assist you. We believe in building long-term relationships with
                  our users by delivering exceptional service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose SimPay?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="flex justify-center">
                <Shield className="w-12 h-12 text-blue-600" />
              </CardHeader>
              <CardContent>
                <CardTitle>Secure Transactions</CardTitle>
                <p>Experience top-notch security for all your payment needs.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex justify-center">
                <Zap className="w-12 h-12 text-blue-600" />
              </CardHeader>
              <CardContent>
                <CardTitle>Fast Payments</CardTitle>
                <p>Send and receive money instantly with our efficient system.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex justify-center">
                <Users className="w-12 h-12 text-blue-600" />
              </CardHeader>
              <CardContent>
                <CardTitle>User-Friendly Interface</CardTitle>
                <p>Navigate and manage your payments with ease.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Signup Section */}
      <section id="signup" className="py-20 px-4 bg-blue-50">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-center mb-8">Sign Up</h2>
            <form className="space-y-6">
              <Input placeholder="Full Name" className="mb-4" />
              <Input type="email" placeholder="Email Address" className="mb-4" />
              <Input type="password" placeholder="Password" className="mb-4" />
              <Input type="password" placeholder="Confirm Password" className="mb-4" />
              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                Sign Up
              </Button>
            </form>
          </div>
          <div className="flex justify-center">
            <Image
              src="/image3.jpeg"
              alt="Sign Up Illustration"
              width={600}
              height={600}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
              <p className="mb-6">We'd love to hear from you! Reach out with any questions or concerns.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  contact@simpay.com
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-600" />
                  +254 0777777
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  123 SimPay Malindi Kenya
                </li>
              </ul>
            </div>
            <form className="space-y-4">
              <Input placeholder="Your Name" className="mb-4" />
              <Input type="email" placeholder="Your Email" className="mb-4" />
              <Textarea placeholder="Your Message" className="mb-4" />
              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-blue-100">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1">
            <img src="image7.jpeg" alt="FAQ Illustration" className="w-full max-w-lg mx-auto lg:mx-0 rounded-2xl" />
          </div>
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-bold text-center lg:text-left mb-8">Frequently Asked Questions</h2>
            <details className="border-b py-4">
              <summary className="font-bold cursor-pointer">Is SimPay secure?</summary>
              <p className="text-gray-700 mt-2">
                Yes, we use bank-level encryption and fraud prevention measures to ensure your payments are safe.
              </p>
            </details>
            <details className="border-b py-4">
              <summary className="font-bold cursor-pointer">What payment methods are supported?</summary>
              <p className="text-gray-700 mt-2">We support credit cards, mobile wallets, and more.</p>
            </details>
            <details className="border-b py-4">
              <summary className="font-bold cursor-pointer">How do I sign up for SimPay?</summary>
              <p className="text-gray-700 mt-2">
                Signing up is easy! Click the "Sign Up" button, fill in your details, and start enjoying secure online
                payments.
              </p>
            </details>
            <details className="border-b py-4">
              <summary className="font-bold cursor-pointer">Are there any fees for transactions?</summary>
              <p className="text-gray-700 mt-2">
                Our platform offers competitive transaction rates. Please refer to the pricing section for details.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-6 bg-gray-900 text-center text-white">
        <p className="text-sm">&copy; 2025 SimPay. All rights reserved.</p>
      </footer>
    </div>
  )
}

