import Header from './components/Header'
import Hero from './components/Hero'
import MembershipSteps from './components/MembershipSteps'
import GalaSection from './components/GalaSection'
import MembershipBenefits from './components/MembershipBenefits'
import MembershipForm from './components/MembershipForm'
import AssociationSection from './components/AssociationSection'
import Footer from './components/Footer'
import MobileAdhesionCTA from './components/MobileAdhesionCTA'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MembershipSteps />
        {/* Mobile : le formulaire passe avant le Gala (order) ; desktop : Gala à gauche. */}
        <div id="adhesion" className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:px-8">
          <div className="order-2 lg:order-1">
            <GalaSection />
            <MembershipBenefits />
          </div>
          <MembershipForm className="order-1 lg:order-2" />
        </div>
        <AssociationSection />
      </main>
      <Footer />
      <MobileAdhesionCTA />
    </>
  )
}
