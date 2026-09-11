import Header from './components/Header';
import FeatureCard from './components/FeatureCard';
import Button from './components/Button';


function App() {
  return (
    <div className="app-container">
      {/* 1. Header Component */}
      <Header />

      <main>
      
      
        {/* 4. Component Reusability Section */}
        <div className="section-wrapper">
          <div className="section-title-box">
            <h2 className="section-h2">♻️ Component Reusability in Action</h2>
            <span className="ui-badge badge-emerald">Multiple Instances</span>
          </div>

          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Below, the <code>&lt;FeatureCard /&gt;</code>, <code>&lt;Badge /&gt;</code>, and <code>&lt;Button /&gt;</code> functional components are reused multiple times within the parent JSX structure. Each instance renders independently while sharing the clean encapsulated component code.
          </p>

          <div className="cards-grid">
            <FeatureCard />
            <FeatureCard />
            <FeatureCard />
            <FeatureCard />
          </div>
        </div>
      </main>


    </div>
  );
}

export default App;
