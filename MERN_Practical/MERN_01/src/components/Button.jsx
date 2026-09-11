
const Button = () => {
  return (
    <button className="ui-button btn-primary" onClick={() => alert('Functional Component Action Triggered!')}>
      <span>Explore Component</span>
      <span>→</span>
    </button>
  );
};

export default Button;
