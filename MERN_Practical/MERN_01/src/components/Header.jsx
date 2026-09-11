import Badge from './Badge';

// Functional Component demonstrating JSX and Component Composition
const Header = () => {
  // JSX Expressions / Variables inside functional component
  const appTitle = "React Core Mastery";
  const conceptCount = 3;
  
  return (
    <header className="main-header">
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <Badge />
        <span className="ui-badge badge-cyan">✨ React JSX Engine</span>
      </div>
      <h1 className="header-title">{appTitle}</h1>
      <p className="header-subtitle">
        A simple project demonstrating {conceptCount} fundamental building blocks of modern React: 
        <strong> Functional Components</strong>, <strong>JSX Syntax</strong>, and <strong>Component Reusability</strong>.
      </p>
    </header>
  );
};

export default Header;
