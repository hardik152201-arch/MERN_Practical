import Badge from './Badge';
import Button from './Button';


const FeatureCard = () => {
  return (
    <div className="ui-card">
      <div className="card-header">
        <h3 className="card-title">Reusable Component Instance</h3>
        <Badge />
      </div>
      
      <p className="card-desc">
        This is a stand-alone functional component. By instantiating it multiple times in the parent component, React creates separate DOM elements with zero code duplication.
      </p>

      <div className="concept-highlights">
        <span className="concept-pill">Functional</span>
        <span className="concept-pill">JSX Output</span>
        <span className="concept-pill">Reusable</span>
      </div>

      <div className="card-footer">
        <span className="ui-badge badge-cyan">Instance Ready</span>
        <Button />
      </div>
    </div>
  );
};

export default FeatureCard;
