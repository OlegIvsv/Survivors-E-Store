
const stepTitles = ["User Name", "Phone", "Login & Pass", "Finish"];

export function StepMap({ currentStep }) {
  return (
    <ul className="steps py-3 w-full">
      {stepTitles.map((title, i) => i + 1 <= currentStep ? (
        <li className="step step-accent">{title}</li>
      ) : (
        <li className="step">{title}</li>
      )
      )}
    </ul>
  );
}
